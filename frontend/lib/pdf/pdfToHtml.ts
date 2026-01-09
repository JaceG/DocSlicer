/**
 * PDF to HTML Converter
 * Converts PDF documents to HTML with text extraction and image support
 * Uses pdfjs-dist for PDF processing
 */

import {
	ExtractedImage,
	ExtractedPage,
	PdfToHtmlSettings,
	PdfToHtmlTask,
	HtmlTheme,
	UploadedFile,
} from '@/types';

// Store blobs in memory
const blobStore = new Map<string, Blob>();

export interface PdfToHtmlResult {
	success: boolean;
	htmlContent?: string;
	outputUrl?: string;
	zipUrl?: string;
	blobKey?: string;
	error?: string;
	stats?: {
		totalPages: number;
		totalImages: number;
		totalCharacters: number;
	};
}

/**
 * Main conversion function
 */
export async function convertPdfToHtml(
	file: UploadedFile,
	settings: PdfToHtmlSettings,
	onProgress?: (progress: number, status: string, currentPage?: number) => void
): Promise<PdfToHtmlResult> {
	try {
		onProgress?.(5, 'Loading PDF...');

		// Dynamically import pdfjs to avoid SSR issues
		const pdfjsLib = await import('pdfjs-dist');
		pdfjsLib.GlobalWorkerOptions.workerSrc = '/js/pdf.worker.min.mjs';

		const arrayBuffer = await file.file.arrayBuffer();
		const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

		const totalPages = pdf.numPages;
		onProgress?.(10, 'PDF loaded', 0);

		// Determine which pages to process
		let pagesToProcess: number[] = [];
		if (settings.pageSelection === 'all') {
			pagesToProcess = Array.from({ length: totalPages }, (_, i) => i + 1);
		} else if (settings.pageSelection === 'range' && settings.pageRange) {
			const start = Math.max(1, settings.pageRange.start);
			const end = Math.min(totalPages, settings.pageRange.end);
			pagesToProcess = Array.from({ length: end - start + 1 }, (_, i) => start + i);
		} else if (settings.pageSelection === 'specific' && settings.specificPages) {
			pagesToProcess = settings.specificPages.filter(p => p >= 1 && p <= totalPages);
		}

		if (pagesToProcess.length === 0) {
			return {
				success: false,
				error: 'No valid pages selected for conversion',
			};
		}

		const extractedPages: ExtractedPage[] = [];
		let totalImages = 0;
		let totalCharacters = 0;

		// Process each page
		for (let i = 0; i < pagesToProcess.length; i++) {
			const pageNum = pagesToProcess[i];
			const progressBase = 10 + (i / pagesToProcess.length) * 60;
			
			onProgress?.(progressBase, `Processing page ${pageNum}...`, pageNum);

			const page = await pdf.getPage(pageNum);
			const extractedPage: ExtractedPage = {
				pageNumber: pageNum,
				text: '',
				images: [],
			};

			// Extract text if enabled
			if (settings.extractText) {
				try {
					const textContent = await page.getTextContent();
					const textItems = textContent.items as Array<{ str: string; transform?: number[] }>;
					
					// Group text by approximate Y position for better line breaks
					const lines: Map<number, string[]> = new Map();
					
					for (const item of textItems) {
						if (item.str) {
							// Use transform to get Y position, round to group lines
							const yPos = item.transform ? Math.round(item.transform[5] / 10) * 10 : 0;
							if (!lines.has(yPos)) {
								lines.set(yPos, []);
							}
							lines.get(yPos)!.push(item.str);
						}
					}
					
					// Sort by Y position (descending for top-to-bottom reading)
					const sortedLines = Array.from(lines.entries())
						.sort((a, b) => b[0] - a[0])
						.map(([, texts]) => texts.join(' '));
					
					extractedPage.text = sortedLines.join('\n');
					totalCharacters += extractedPage.text.length;
				} catch (textError) {
					console.warn(`Failed to extract text from page ${pageNum}:`, textError);
				}
			}

			// Extract/render images based on mode
			if (settings.extractImages === 'render-pages' || settings.extractImages === 'both') {
				try {
					const renderedImage = await renderPageAsImage(
						page,
						pageNum,
						settings.imageFormat,
						settings.imageScale,
						settings.imageQuality
					);
					extractedPage.renderedImage = renderedImage;
					totalImages++;
				} catch (renderError) {
					console.warn(`Failed to render page ${pageNum}:`, renderError);
				}
			}

			if (settings.extractImages === 'embedded' || settings.extractImages === 'both') {
				try {
					const embeddedImages = await extractEmbeddedImages(
						page,
						pageNum,
						settings.imageFormat,
						settings.imageQuality
					);
					extractedPage.images = embeddedImages;
					totalImages += embeddedImages.length;
				} catch (imgError) {
					console.warn(`Failed to extract images from page ${pageNum}:`, imgError);
				}
			}

			extractedPages.push(extractedPage);
		}

		onProgress?.(75, 'Generating HTML...');

		// Generate HTML content
		const htmlContent = generateHtml(
			extractedPages,
			settings,
			file.name,
			{ totalPages: pagesToProcess.length, totalImages, totalCharacters }
		);

		onProgress?.(85, 'Packaging output...');

		let outputUrl: string | undefined;
		let zipUrl: string | undefined;
		let blobKey: string | undefined;

		if (settings.outputMode === 'single-file') {
			// Single HTML file with embedded base64 images
			const htmlBlob = new Blob([htmlContent], { type: 'text/html' });
			blobKey = `pdf_to_html_${Date.now()}`;
			blobStore.set(blobKey, htmlBlob);
			outputUrl = URL.createObjectURL(htmlBlob);
		} else {
			// ZIP package with HTML + images folder
			const JSZip = (await import('jszip')).default;
			const zip = new JSZip();

			// Generate HTML with relative image paths for ZIP
			const zipHtmlContent = generateHtml(
				extractedPages,
				settings,
				file.name,
				{ totalPages: pagesToProcess.length, totalImages, totalCharacters },
				true // Use relative paths
			);

			zip.file('index.html', zipHtmlContent);

			// Add images to zip
			const imagesFolder = zip.folder('images');
			if (imagesFolder) {
				for (const page of extractedPages) {
					if (page.renderedImage?.blob) {
						imagesFolder.file(page.renderedImage.fileName, page.renderedImage.blob);
					}
					for (const img of page.images) {
						if (img.blob) {
							imagesFolder.file(img.fileName, img.blob);
						}
					}
				}
			}

			const zipBlob = await zip.generateAsync({ type: 'blob' });
			blobKey = `pdf_to_html_zip_${Date.now()}`;
			blobStore.set(blobKey, zipBlob);
			zipUrl = URL.createObjectURL(zipBlob);
		}

		onProgress?.(100, 'Complete!');

		return {
			success: true,
			htmlContent,
			outputUrl,
			zipUrl,
			blobKey,
			stats: {
				totalPages: pagesToProcess.length,
				totalImages,
				totalCharacters,
			},
		};
	} catch (error) {
		console.error('PDF to HTML conversion error:', error);
		return {
			success: false,
			error: error instanceof Error ? error.message : 'Failed to convert PDF to HTML',
		};
	}
}

/**
 * Render a full page as an image
 */
async function renderPageAsImage(
	page: any,
	pageNum: number,
	format: 'png' | 'jpg' | 'webp',
	scale: number,
	quality: number
): Promise<ExtractedImage> {
	const viewport = page.getViewport({ scale });
	
	const canvas = document.createElement('canvas');
	canvas.width = viewport.width;
	canvas.height = viewport.height;
	
	const context = canvas.getContext('2d');
	if (!context) {
		throw new Error('Failed to get canvas context');
	}

	await page.render({
		canvasContext: context,
		viewport: viewport,
	}).promise;

	const mimeTypes: Record<string, string> = {
		png: 'image/png',
		jpg: 'image/jpeg',
		webp: 'image/webp',
	};

	const mimeType = mimeTypes[format];
	const qualityValue = format === 'png' ? undefined : quality / 100;
	const dataUrl = canvas.toDataURL(mimeType, qualityValue);

	// Create blob
	const response = await fetch(dataUrl);
	const blob = await response.blob();

	const fileName = `page_${pageNum}.${format}`;

	return {
		id: `page_render_${pageNum}`,
		pageNumber: pageNum,
		imageIndex: 0,
		dataUrl,
		fileName,
		width: viewport.width,
		height: viewport.height,
		blob,
	};
}

/**
 * Extract embedded images from a PDF page
 */
async function extractEmbeddedImages(
	page: any,
	pageNum: number,
	format: 'png' | 'jpg' | 'webp',
	quality: number
): Promise<ExtractedImage[]> {
	const images: ExtractedImage[] = [];
	
	try {
		const pdfjsLib = await import('pdfjs-dist');
		const opList = await page.getOperatorList();
		
		let imageIndex = 0;
		
	for (let i = 0; i < opList.fnArray.length; i++) {
		// Check for image operations
		if (opList.fnArray[i] === pdfjsLib.OPS.paintImageXObject) {
				try {
					const imgName = opList.argsArray[i][0];
					const imgData = await page.objs.get(imgName);
					
					if (imgData && imgData.data) {
						// Create canvas from image data
						const canvas = document.createElement('canvas');
						canvas.width = imgData.width;
						canvas.height = imgData.height;
						
						const ctx = canvas.getContext('2d');
						if (ctx) {
							const imageData = ctx.createImageData(imgData.width, imgData.height);
							
							// Copy pixel data - handle different formats
							if (imgData.data.length === imgData.width * imgData.height * 4) {
								// RGBA format
								imageData.data.set(imgData.data);
							} else if (imgData.data.length === imgData.width * imgData.height * 3) {
								// RGB format - convert to RGBA
								for (let j = 0; j < imgData.width * imgData.height; j++) {
									imageData.data[j * 4] = imgData.data[j * 3];
									imageData.data[j * 4 + 1] = imgData.data[j * 3 + 1];
									imageData.data[j * 4 + 2] = imgData.data[j * 3 + 2];
									imageData.data[j * 4 + 3] = 255;
								}
							} else {
								// Grayscale or other format
								const pixelCount = imgData.width * imgData.height;
								for (let j = 0; j < pixelCount; j++) {
									const value = imgData.data[j] || 0;
									imageData.data[j * 4] = value;
									imageData.data[j * 4 + 1] = value;
									imageData.data[j * 4 + 2] = value;
									imageData.data[j * 4 + 3] = 255;
								}
							}
							
							ctx.putImageData(imageData, 0, 0);
							
							const mimeTypes: Record<string, string> = {
								png: 'image/png',
								jpg: 'image/jpeg',
								webp: 'image/webp',
							};
							
							const mimeType = mimeTypes[format];
							const qualityValue = format === 'png' ? undefined : quality / 100;
							const dataUrl = canvas.toDataURL(mimeType, qualityValue);
							
							const response = await fetch(dataUrl);
							const blob = await response.blob();
							
							const fileName = `page_${pageNum}_img_${imageIndex + 1}.${format}`;
							
							images.push({
								id: `embedded_${pageNum}_${imageIndex}`,
								pageNumber: pageNum,
								imageIndex,
								dataUrl,
								fileName,
								width: imgData.width,
								height: imgData.height,
								blob,
							});
							
							imageIndex++;
						}
					}
				} catch (imgError) {
					console.warn(`Failed to extract image ${imageIndex} from page ${pageNum}:`, imgError);
				}
			}
		}
	} catch (error) {
		console.warn(`Error accessing page operator list:`, error);
	}
	
	return images;
}

/**
 * Generate HTML content from extracted pages
 */
function generateHtml(
	pages: ExtractedPage[],
	settings: PdfToHtmlSettings,
	fileName: string,
	stats: { totalPages: number; totalImages: number; totalCharacters: number },
	useRelativePaths: boolean = false
): string {
	const title = fileName.replace(/\.pdf$/i, '');
	const css = getThemeStyles(settings.theme);
	
	let pagesHtml = '';
	
	for (const page of pages) {
		let pageContent = '';
		
		// Add rendered page image if available
		if (page.renderedImage) {
			const imgSrc = useRelativePaths 
				? `images/${page.renderedImage.fileName}`
				: page.renderedImage.dataUrl;
			pageContent += `
			<div class="page-render">
				<img src="${imgSrc}" alt="Page ${page.pageNumber}" class="rendered-page" />
			</div>`;
		}
		
		// Add extracted text if available
		if (page.text && settings.extractText) {
			const escapedText = escapeHtml(page.text);
			pageContent += `
			<div class="page-text">
				<pre>${escapedText}</pre>
			</div>`;
		}
		
		// Add embedded images if available
		if (page.images.length > 0) {
			pageContent += `<div class="embedded-images">`;
			for (const img of page.images) {
				const imgSrc = useRelativePaths 
					? `images/${img.fileName}`
					: img.dataUrl;
				pageContent += `
				<figure class="embedded-image">
					<img src="${imgSrc}" alt="Image ${img.imageIndex + 1} from page ${page.pageNumber}" />
					<figcaption>Image ${img.imageIndex + 1}</figcaption>
				</figure>`;
			}
			pageContent += `</div>`;
		}
		
		pagesHtml += `
		<article class="page" id="page-${page.pageNumber}">
			<header class="page-header">
				${settings.includePageNumbers ? `<span class="page-number">Page ${page.pageNumber}</span>` : ''}
			</header>
			<div class="page-content">
				${pageContent || '<p class="no-content">No extractable content on this page</p>'}
			</div>
		</article>`;
	}
	
	return `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>${escapeHtml(title)}</title>
	<meta name="generator" content="PDF Wonder Kit - PDF to HTML Converter">
	<meta name="description" content="Converted from PDF: ${escapeHtml(fileName)}">
	<style>
${css}
	</style>
</head>
<body>
	<header class="document-header">
		<h1>${escapeHtml(title)}</h1>
		<div class="document-stats">
			<span>${stats.totalPages} page${stats.totalPages !== 1 ? 's' : ''}</span>
			${stats.totalImages > 0 ? `<span>${stats.totalImages} image${stats.totalImages !== 1 ? 's' : ''}</span>` : ''}
			${stats.totalCharacters > 0 ? `<span>${stats.totalCharacters.toLocaleString()} characters</span>` : ''}
		</div>
	</header>
	
	<nav class="page-nav">
		<span>Jump to page:</span>
		${pages.map(p => `<a href="#page-${p.pageNumber}">${p.pageNumber}</a>`).join('')}
	</nav>
	
	<main class="document-content">
		${pagesHtml}
	</main>
	
	<footer class="document-footer">
		<p>Generated by <a href="https://pdfwonderkit.com" target="_blank" rel="noopener">PDF Wonder Kit</a></p>
		<p>Converted from: ${escapeHtml(fileName)}</p>
	</footer>
</body>
</html>`;
}

/**
 * Get CSS styles for the selected theme
 */
function getThemeStyles(theme: HtmlTheme): string {
	const themes: Record<HtmlTheme, string> = {
		modern: `
		:root {
			--bg-primary: #f8fafc;
			--bg-secondary: #ffffff;
			--text-primary: #1e293b;
			--text-secondary: #64748b;
			--accent: #3b82f6;
			--border: #e2e8f0;
			--shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
		}
		body {
			font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
			background: var(--bg-primary);
			color: var(--text-primary);
			line-height: 1.7;
			margin: 0;
			padding: 0;
		}
		.document-header {
			background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
			color: white;
			padding: 3rem 2rem;
			text-align: center;
		}
		.document-header h1 {
			margin: 0 0 1rem 0;
			font-size: 2.5rem;
			font-weight: 700;
		}
		.document-stats {
			display: flex;
			gap: 2rem;
			justify-content: center;
			flex-wrap: wrap;
			opacity: 0.9;
		}
		.document-stats span {
			background: rgba(255,255,255,0.2);
			padding: 0.5rem 1rem;
			border-radius: 9999px;
			font-size: 0.9rem;
		}
		.page-nav {
			background: var(--bg-secondary);
			padding: 1rem 2rem;
			display: flex;
			gap: 0.75rem;
			flex-wrap: wrap;
			align-items: center;
			border-bottom: 1px solid var(--border);
			position: sticky;
			top: 0;
			z-index: 100;
			box-shadow: var(--shadow);
		}
		.page-nav span {
			color: var(--text-secondary);
			font-weight: 500;
		}
		.page-nav a {
			color: var(--accent);
			text-decoration: none;
			padding: 0.25rem 0.75rem;
			border-radius: 0.375rem;
			transition: all 0.2s;
		}
		.page-nav a:hover {
			background: var(--accent);
			color: white;
		}
		.document-content {
			max-width: 1000px;
			margin: 0 auto;
			padding: 2rem;
		}
		.page {
			background: var(--bg-secondary);
			border-radius: 1rem;
			margin-bottom: 2rem;
			overflow: hidden;
			box-shadow: var(--shadow);
		}
		.page-header {
			background: linear-gradient(to right, #f1f5f9, #e2e8f0);
			padding: 1rem 1.5rem;
			border-bottom: 1px solid var(--border);
		}
		.page-number {
			font-weight: 600;
			color: var(--accent);
		}
		.page-content {
			padding: 1.5rem;
		}
		.page-text pre {
			white-space: pre-wrap;
			word-wrap: break-word;
			font-family: 'JetBrains Mono', 'Fira Code', monospace;
			font-size: 0.9rem;
			line-height: 1.8;
			background: #f8fafc;
			padding: 1.5rem;
			border-radius: 0.5rem;
			border-left: 4px solid var(--accent);
			overflow-x: auto;
		}
		.rendered-page {
			max-width: 100%;
			height: auto;
			display: block;
			margin: 0 auto;
			border-radius: 0.5rem;
			box-shadow: var(--shadow);
		}
		.embedded-images {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
			gap: 1rem;
			margin-top: 1rem;
		}
		.embedded-image {
			margin: 0;
		}
		.embedded-image img {
			width: 100%;
			height: auto;
			border-radius: 0.5rem;
			box-shadow: 0 2px 4px rgba(0,0,0,0.1);
		}
		.embedded-image figcaption {
			text-align: center;
			font-size: 0.8rem;
			color: var(--text-secondary);
			margin-top: 0.5rem;
		}
		.no-content {
			color: var(--text-secondary);
			font-style: italic;
			text-align: center;
			padding: 2rem;
		}
		.document-footer {
			text-align: center;
			padding: 2rem;
			color: var(--text-secondary);
			font-size: 0.9rem;
		}
		.document-footer a {
			color: var(--accent);
		}
		`,
		
		classic: `
		:root {
			--bg-primary: #f5f5dc;
			--bg-secondary: #fffef9;
			--text-primary: #333;
			--text-secondary: #666;
			--accent: #8b4513;
			--border: #d4c4a8;
		}
		body {
			font-family: 'Georgia', 'Times New Roman', serif;
			background: var(--bg-primary);
			color: var(--text-primary);
			line-height: 1.8;
			margin: 0;
			padding: 0;
		}
		.document-header {
			background: var(--accent);
			color: #fffef9;
			padding: 3rem 2rem;
			text-align: center;
			border-bottom: 4px double var(--border);
		}
		.document-header h1 {
			margin: 0 0 1rem 0;
			font-size: 2.5rem;
			font-weight: normal;
			font-style: italic;
		}
		.document-stats {
			display: flex;
			gap: 2rem;
			justify-content: center;
			flex-wrap: wrap;
		}
		.document-stats span {
			border: 1px solid rgba(255,255,255,0.3);
			padding: 0.5rem 1rem;
			font-size: 0.9rem;
		}
		.page-nav {
			background: var(--bg-secondary);
			padding: 1rem 2rem;
			display: flex;
			gap: 0.5rem;
			flex-wrap: wrap;
			align-items: center;
			border-bottom: 2px solid var(--border);
		}
		.page-nav span {
			color: var(--text-secondary);
		}
		.page-nav a {
			color: var(--accent);
			text-decoration: underline;
			padding: 0.25rem;
		}
		.page-nav a:hover {
			color: #5d2e0a;
		}
		.document-content {
			max-width: 900px;
			margin: 0 auto;
			padding: 2rem;
		}
		.page {
			background: var(--bg-secondary);
			border: 1px solid var(--border);
			margin-bottom: 2rem;
			box-shadow: 3px 3px 0 var(--border);
		}
		.page-header {
			background: linear-gradient(to right, #f5f0e1, #ebe3d1);
			padding: 1rem 1.5rem;
			border-bottom: 1px solid var(--border);
		}
		.page-number {
			font-weight: bold;
			color: var(--accent);
		}
		.page-content {
			padding: 1.5rem;
		}
		.page-text pre {
			white-space: pre-wrap;
			word-wrap: break-word;
			font-family: 'Courier New', monospace;
			font-size: 0.95rem;
			line-height: 1.9;
			background: #f9f6ef;
			padding: 1.5rem;
			border-left: 3px solid var(--accent);
		}
		.rendered-page {
			max-width: 100%;
			height: auto;
			display: block;
			margin: 0 auto;
			border: 1px solid var(--border);
		}
		.embedded-images {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
			gap: 1rem;
			margin-top: 1rem;
		}
		.embedded-image {
			margin: 0;
		}
		.embedded-image img {
			width: 100%;
			height: auto;
			border: 1px solid var(--border);
		}
		.embedded-image figcaption {
			text-align: center;
			font-size: 0.85rem;
			color: var(--text-secondary);
			margin-top: 0.5rem;
			font-style: italic;
		}
		.no-content {
			color: var(--text-secondary);
			font-style: italic;
			text-align: center;
			padding: 2rem;
		}
		.document-footer {
			text-align: center;
			padding: 2rem;
			color: var(--text-secondary);
			font-size: 0.9rem;
			border-top: 2px solid var(--border);
		}
		.document-footer a {
			color: var(--accent);
		}
		`,
		
		minimal: `
		body {
			font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
			background: #fff;
			color: #222;
			line-height: 1.6;
			margin: 0;
			padding: 2rem;
			max-width: 800px;
			margin: 0 auto;
		}
		.document-header {
			padding: 2rem 0;
			border-bottom: 1px solid #eee;
			margin-bottom: 2rem;
		}
		.document-header h1 {
			margin: 0 0 0.5rem 0;
			font-size: 1.75rem;
			font-weight: 600;
		}
		.document-stats {
			display: flex;
			gap: 1rem;
			color: #666;
			font-size: 0.875rem;
		}
		.page-nav {
			padding: 1rem 0;
			display: flex;
			gap: 0.5rem;
			flex-wrap: wrap;
			align-items: center;
			font-size: 0.875rem;
		}
		.page-nav span {
			color: #666;
		}
		.page-nav a {
			color: #0066cc;
			text-decoration: none;
		}
		.page-nav a:hover {
			text-decoration: underline;
		}
		.page {
			margin-bottom: 3rem;
			padding-bottom: 2rem;
			border-bottom: 1px solid #eee;
		}
		.page-header {
			margin-bottom: 1rem;
		}
		.page-number {
			font-size: 0.75rem;
			color: #999;
			text-transform: uppercase;
			letter-spacing: 0.05em;
		}
		.page-text pre {
			white-space: pre-wrap;
			word-wrap: break-word;
			font-family: 'SF Mono', 'Monaco', monospace;
			font-size: 0.875rem;
			line-height: 1.7;
			background: #f9f9f9;
			padding: 1rem;
			border-radius: 4px;
		}
		.rendered-page {
			max-width: 100%;
			height: auto;
			display: block;
		}
		.embedded-images {
			display: flex;
			flex-wrap: wrap;
			gap: 1rem;
			margin-top: 1rem;
		}
		.embedded-image {
			margin: 0;
		}
		.embedded-image img {
			max-width: 300px;
			height: auto;
		}
		.embedded-image figcaption {
			font-size: 0.75rem;
			color: #666;
			margin-top: 0.25rem;
		}
		.no-content {
			color: #999;
			font-style: italic;
		}
		.document-footer {
			padding: 2rem 0;
			color: #999;
			font-size: 0.75rem;
		}
		.document-footer a {
			color: #0066cc;
		}
		`,
		
		dark: `
		:root {
			--bg-primary: #0f172a;
			--bg-secondary: #1e293b;
			--text-primary: #f1f5f9;
			--text-secondary: #94a3b8;
			--accent: #38bdf8;
			--border: #334155;
		}
		body {
			font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
			background: var(--bg-primary);
			color: var(--text-primary);
			line-height: 1.7;
			margin: 0;
			padding: 0;
		}
		.document-header {
			background: linear-gradient(135deg, #1e3a5f 0%, #312e81 100%);
			padding: 3rem 2rem;
			text-align: center;
		}
		.document-header h1 {
			margin: 0 0 1rem 0;
			font-size: 2.5rem;
			font-weight: 700;
		}
		.document-stats {
			display: flex;
			gap: 2rem;
			justify-content: center;
			flex-wrap: wrap;
			color: var(--text-secondary);
		}
		.document-stats span {
			background: rgba(255,255,255,0.1);
			padding: 0.5rem 1rem;
			border-radius: 9999px;
			font-size: 0.9rem;
		}
		.page-nav {
			background: var(--bg-secondary);
			padding: 1rem 2rem;
			display: flex;
			gap: 0.75rem;
			flex-wrap: wrap;
			align-items: center;
			border-bottom: 1px solid var(--border);
			position: sticky;
			top: 0;
			z-index: 100;
		}
		.page-nav span {
			color: var(--text-secondary);
			font-weight: 500;
		}
		.page-nav a {
			color: var(--accent);
			text-decoration: none;
			padding: 0.25rem 0.75rem;
			border-radius: 0.375rem;
			transition: all 0.2s;
		}
		.page-nav a:hover {
			background: var(--accent);
			color: var(--bg-primary);
		}
		.document-content {
			max-width: 1000px;
			margin: 0 auto;
			padding: 2rem;
		}
		.page {
			background: var(--bg-secondary);
			border-radius: 1rem;
			margin-bottom: 2rem;
			overflow: hidden;
			border: 1px solid var(--border);
		}
		.page-header {
			background: rgba(255,255,255,0.05);
			padding: 1rem 1.5rem;
			border-bottom: 1px solid var(--border);
		}
		.page-number {
			font-weight: 600;
			color: var(--accent);
		}
		.page-content {
			padding: 1.5rem;
		}
		.page-text pre {
			white-space: pre-wrap;
			word-wrap: break-word;
			font-family: 'JetBrains Mono', 'Fira Code', monospace;
			font-size: 0.9rem;
			line-height: 1.8;
			background: rgba(0,0,0,0.3);
			padding: 1.5rem;
			border-radius: 0.5rem;
			border-left: 4px solid var(--accent);
			overflow-x: auto;
			color: #e2e8f0;
		}
		.rendered-page {
			max-width: 100%;
			height: auto;
			display: block;
			margin: 0 auto;
			border-radius: 0.5rem;
		}
		.embedded-images {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
			gap: 1rem;
			margin-top: 1rem;
		}
		.embedded-image {
			margin: 0;
		}
		.embedded-image img {
			width: 100%;
			height: auto;
			border-radius: 0.5rem;
		}
		.embedded-image figcaption {
			text-align: center;
			font-size: 0.8rem;
			color: var(--text-secondary);
			margin-top: 0.5rem;
		}
		.no-content {
			color: var(--text-secondary);
			font-style: italic;
			text-align: center;
			padding: 2rem;
		}
		.document-footer {
			text-align: center;
			padding: 2rem;
			color: var(--text-secondary);
			font-size: 0.9rem;
		}
		.document-footer a {
			color: var(--accent);
		}
		`,
	};
	
	return themes[theme];
}

/**
 * Escape HTML special characters
 */
function escapeHtml(text: string): string {
	const htmlEntities: Record<string, string> = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		"'": '&#39;',
	};
	return text.replace(/[&<>"']/g, char => htmlEntities[char]);
}

/**
 * Download HTML file
 */
export function downloadHtmlFile(url: string, fileName: string): void {
	const link = document.createElement('a');
	link.href = url;
	link.download = fileName;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}

/**
 * Cleanup blob URL
 */
export function cleanupPdfToHtmlBlobUrl(url: string): void {
	if (url.startsWith('blob:')) {
		URL.revokeObjectURL(url);
	}
}

/**
 * Cleanup blob store entry
 */
export function cleanupPdfToHtmlBlobStoreEntry(blobKey: string): void {
	if (blobStore.has(blobKey)) {
		blobStore.delete(blobKey);
	}
}

/**
 * Default settings
 */
export const DEFAULT_PDF_TO_HTML_SETTINGS: PdfToHtmlSettings = {
	outputMode: 'single-file',
	theme: 'modern',
	extractText: true,
	extractImages: 'render-pages',
	imageFormat: 'png',
	imageQuality: 90,
	imageScale: 2,
	includePageNumbers: true,
	pageSelection: 'all',
};
