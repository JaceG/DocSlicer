'use client';

import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { ConvertibleFileType, SupportedFileType } from '@/types';
import { MIME_TYPE_MAP, EXTENSION_MAP, CONVERSION_WARNINGS } from './types';

// Detect if a file can be converted to PDF
export function detectFileType(file: File): SupportedFileType | null {
	const mimeType = file.type.toLowerCase();
	const fileName = file.name.toLowerCase();
	const extension = fileName.slice(fileName.lastIndexOf('.'));

	// Check if it's already a PDF
	if (mimeType === 'application/pdf' || extension === '.pdf') {
		return 'pdf';
	}

	// Check by MIME type first
	if (mimeType && MIME_TYPE_MAP[mimeType]) {
		return MIME_TYPE_MAP[mimeType];
	}

	// Fallback to extension
	if (extension && EXTENSION_MAP[extension]) {
		return EXTENSION_MAP[extension];
	}

	return null;
}

// Check if file type requires conversion
export function requiresConversion(fileType: SupportedFileType | null): fileType is ConvertibleFileType {
	return fileType !== null && fileType !== 'pdf';
}

// Get warning for file type
export function getConversionWarning(fileType: ConvertibleFileType) {
	return CONVERSION_WARNINGS[fileType];
}

// Main conversion function
export async function convertToPdf(
	file: File,
	fileType: ConvertibleFileType,
	onProgress?: (progress: number, status: string) => void
): Promise<File> {
	onProgress?.(0, 'Initializing conversion...');

	try {
		let pdfBytes: Uint8Array;

		// Route to appropriate converter based on file type
		switch (fileType) {
			// Images
			case 'jpg':
			case 'jpeg':
			case 'png':
			case 'gif':
			case 'webp':
			case 'bmp':
			case 'tiff':
				pdfBytes = await convertImageToPdf(file, fileType, onProgress);
				break;

			// Plain text
			case 'txt':
				pdfBytes = await convertTextToPdf(file, onProgress);
				break;

			// Markdown
			case 'md':
				pdfBytes = await convertMarkdownToPdf(file, onProgress);
				break;

			// HTML
			case 'html':
				pdfBytes = await convertHtmlToPdf(file, onProgress);
				break;

			// RTF
			case 'rtf':
				pdfBytes = await convertRtfToPdf(file, onProgress);
				break;

			// Word documents (DOCX/DOC)
			case 'docx':
			case 'doc':
				pdfBytes = await convertWordToPdf(file, fileType, onProgress);
				break;

			// OpenDocument formats
			case 'odt':
				pdfBytes = await convertOdtToPdf(file, onProgress);
				break;

			// Presentations
			case 'pptx':
			case 'ppt':
			case 'odp':
				pdfBytes = await convertPresentationToPdf(file, fileType, onProgress);
				break;

			// EPUB
			case 'epub':
				pdfBytes = await convertEpubToPdf(file, onProgress);
				break;

			default:
				throw new Error(`Conversion not supported for file type: ${fileType}`);
		}

		onProgress?.(100, 'Conversion complete!');

		// Create new File object with converted content
		const newFileName = file.name.replace(/\.[^/.]+$/, '.pdf');
		// Create a regular array buffer copy to avoid TypeScript SharedArrayBuffer issues
		const arrayBuffer = new ArrayBuffer(pdfBytes.length);
		new Uint8Array(arrayBuffer).set(pdfBytes);
		const pdfBlob = new Blob([arrayBuffer], { type: 'application/pdf' });
		const pdfFile = new File([pdfBlob], newFileName, {
			type: 'application/pdf',
		});

		return pdfFile;
	} catch (error) {
		console.error('Conversion error:', error);
		throw new Error(
			error instanceof Error 
				? `Conversion failed: ${error.message}` 
				: 'Conversion failed. Please try a different file.'
		);
	}
}

// Convert images to PDF
async function convertImageToPdf(
	file: File,
	fileType: ConvertibleFileType,
	onProgress?: (progress: number, status: string) => void
): Promise<Uint8Array> {
	onProgress?.(20, 'Loading image...');

	const arrayBuffer = await file.arrayBuffer();
	const imageBytes = new Uint8Array(arrayBuffer);

	onProgress?.(40, 'Creating PDF...');

	const pdfDoc = await PDFDocument.create();

	let image;
	
	// Handle different image types
	if (fileType === 'jpg' || fileType === 'jpeg') {
		image = await pdfDoc.embedJpg(imageBytes);
	} else if (fileType === 'png') {
		image = await pdfDoc.embedPng(imageBytes);
	} else {
		// For other formats, we need to convert via canvas first
		onProgress?.(30, 'Converting image format...');
		const pngBytes = await convertImageToPng(file);
		image = await pdfDoc.embedPng(pngBytes);
	}

	onProgress?.(60, 'Embedding image...');

	// Calculate page size to fit image while maintaining aspect ratio
	const maxWidth = 595.28; // A4 width in points
	const maxHeight = 841.89; // A4 height in points
	const margin = 36; // 0.5 inch margin

	const availableWidth = maxWidth - margin * 2;
	const availableHeight = maxHeight - margin * 2;

	let width = image.width;
	let height = image.height;

	// Scale down if necessary
	const scaleX = availableWidth / width;
	const scaleY = availableHeight / height;
	const scale = Math.min(scaleX, scaleY, 1); // Don't scale up

	width *= scale;
	height *= scale;

	// Create page with A4 size
	const page = pdfDoc.addPage([maxWidth, maxHeight]);

	// Center image on page
	const x = (maxWidth - width) / 2;
	const y = (maxHeight - height) / 2;

	page.drawImage(image, {
		x,
		y,
		width,
		height,
	});

	onProgress?.(80, 'Saving PDF...');

	return await pdfDoc.save();
}

// Convert other image formats to PNG via canvas
async function convertImageToPng(file: File): Promise<Uint8Array> {
	return new Promise((resolve, reject) => {
		const img = new Image();
		const url = URL.createObjectURL(file);

		img.onload = () => {
			const canvas = document.createElement('canvas');
			canvas.width = img.width;
			canvas.height = img.height;
			
			const ctx = canvas.getContext('2d');
			if (!ctx) {
				URL.revokeObjectURL(url);
				reject(new Error('Could not get canvas context'));
				return;
			}

			ctx.drawImage(img, 0, 0);
			
			canvas.toBlob((blob) => {
				URL.revokeObjectURL(url);
				if (!blob) {
					reject(new Error('Could not convert image'));
					return;
				}
				
				blob.arrayBuffer().then((buffer) => {
					resolve(new Uint8Array(buffer));
				});
			}, 'image/png');
		};

		img.onerror = () => {
			URL.revokeObjectURL(url);
			reject(new Error('Failed to load image'));
		};

		img.src = url;
	});
}

// Convert plain text to PDF
async function convertTextToPdf(
	file: File,
	onProgress?: (progress: number, status: string) => void
): Promise<Uint8Array> {
	onProgress?.(20, 'Reading text file...');

	const text = await file.text();

	onProgress?.(40, 'Creating PDF...');

	const pdfDoc = await PDFDocument.create();
	const font = await pdfDoc.embedFont(StandardFonts.Courier);
	
	const fontSize = 10;
	const lineHeight = fontSize * 1.4;
	const margin = 50;
	const pageWidth = 595.28; // A4
	const pageHeight = 841.89;
	const maxWidth = pageWidth - margin * 2;
	const maxLines = Math.floor((pageHeight - margin * 2) / lineHeight);

	// Split text into lines
	const lines = text.split('\n');
	const wrappedLines: string[] = [];

	// Word wrap each line
	for (const line of lines) {
		if (line.length === 0) {
			wrappedLines.push('');
			continue;
		}

		const words = line.split(' ');
		let currentLine = '';

		for (const word of words) {
			const testLine = currentLine ? `${currentLine} ${word}` : word;
			const width = font.widthOfTextAtSize(testLine, fontSize);

			if (width <= maxWidth) {
				currentLine = testLine;
			} else {
				if (currentLine) wrappedLines.push(currentLine);
				currentLine = word;
			}
		}
		if (currentLine) wrappedLines.push(currentLine);
	}

	onProgress?.(60, 'Creating pages...');

	// Create pages
	let lineIndex = 0;
	while (lineIndex < wrappedLines.length) {
		const page = pdfDoc.addPage([pageWidth, pageHeight]);
		let y = pageHeight - margin;

		for (let i = 0; i < maxLines && lineIndex < wrappedLines.length; i++) {
			page.drawText(wrappedLines[lineIndex], {
				x: margin,
				y,
				size: fontSize,
				font,
				color: rgb(0, 0, 0),
			});
			y -= lineHeight;
			lineIndex++;
		}

		onProgress?.(60 + (lineIndex / wrappedLines.length) * 20, 'Creating pages...');
	}

	onProgress?.(80, 'Saving PDF...');

	return await pdfDoc.save();
}

// Convert Markdown to PDF (simplified - renders as styled text)
async function convertMarkdownToPdf(
	file: File,
	onProgress?: (progress: number, status: string) => void
): Promise<Uint8Array> {
	onProgress?.(20, 'Reading Markdown file...');

	const text = await file.text();

	// Convert basic Markdown to plain text (simplified conversion)
	// Strip markdown syntax for basic PDF rendering
	const plainText = text
		.replace(/^#{1,6}\s+(.*)$/gm, '$1') // Headers
		.replace(/\*\*([^*]+)\*\*/g, '$1') // Bold
		.replace(/\*([^*]+)\*/g, '$1') // Italic
		.replace(/`([^`]+)`/g, '$1') // Inline code
		.replace(/^\s*[-*+]\s+/gm, '• ') // Lists
		.replace(/^\s*\d+\.\s+/gm, '  ') // Numbered lists
		.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Links
		.replace(/```[\s\S]*?```/g, (match) => match.replace(/```\w*\n?/g, '')); // Code blocks

	// Create a temporary text file and convert
	const textFile = new File([plainText], 'temp.txt', { type: 'text/plain' });
	return await convertTextToPdf(textFile, onProgress);
}

// Convert HTML to PDF (simplified - renders text content)
async function convertHtmlToPdf(
	file: File,
	onProgress?: (progress: number, status: string) => void
): Promise<Uint8Array> {
	onProgress?.(20, 'Reading HTML file...');

	const html = await file.text();

	// Parse HTML and extract text content
	const parser = new DOMParser();
	const doc = parser.parseFromString(html, 'text/html');
	
	// Get text content, preserving some structure
	const body = doc.body;
	const textContent = extractTextFromHtml(body);

	// Create a temporary text file and convert
	const textFile = new File([textContent], 'temp.txt', { type: 'text/plain' });
	return await convertTextToPdf(textFile, onProgress);
}

// Extract text from HTML while preserving basic structure
function extractTextFromHtml(element: Element, depth: number = 0): string {
	let text = '';

	for (const node of element.childNodes) {
		if (node.nodeType === Node.TEXT_NODE) {
			const content = node.textContent?.trim();
			if (content) {
				text += content + ' ';
			}
		} else if (node.nodeType === Node.ELEMENT_NODE) {
			const el = node as Element;
			const tagName = el.tagName.toLowerCase();

			// Add line breaks for block elements
			if (['p', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li', 'br'].includes(tagName)) {
				text = text.trim() + '\n';
			}

			// Add prefix for list items
			if (tagName === 'li') {
				text += '• ';
			}

			// Add extra spacing for headers
			if (tagName.match(/^h[1-6]$/)) {
				text += '\n';
			}

			text += extractTextFromHtml(el, depth + 1);

			// Add line break after block elements
			if (['p', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol'].includes(tagName)) {
				text += '\n';
			}
		}
	}

	return text;
}

// Convert RTF to PDF (simplified - basic text extraction)
async function convertRtfToPdf(
	file: File,
	onProgress?: (progress: number, status: string) => void
): Promise<Uint8Array> {
	onProgress?.(20, 'Reading RTF file...');

	const rtfContent = await file.text();

	// Basic RTF to plain text conversion
	// Strip RTF control words and extract text
	let plainText = rtfContent
		// Remove RTF header
		.replace(/^{\\rtf[^}]*}/m, '')
		// Remove font table
		.replace(/{\\fonttbl[^}]*}/g, '')
		// Remove color table
		.replace(/{\\colortbl[^}]*}/g, '')
		// Remove style sheets
		.replace(/{\\stylesheet[^}]*}/g, '')
		// Remove control words
		.replace(/\\[a-z]+\d* ?/g, ' ')
		// Remove escaped characters
		.replace(/\\'[0-9a-f]{2}/gi, '')
		// Remove braces
		.replace(/[{}]/g, '')
		// Clean up whitespace
		.replace(/\s+/g, ' ')
		.trim();

	// Create a temporary text file and convert
	const textFile = new File([plainText], 'temp.txt', { type: 'text/plain' });
	return await convertTextToPdf(textFile, onProgress);
}

// Convert Word documents (DOCX) - basic extraction
async function convertWordToPdf(
	file: File,
	fileType: 'docx' | 'doc',
	onProgress?: (progress: number, status: string) => void
): Promise<Uint8Array> {
	onProgress?.(20, 'Reading Word document...');

	if (fileType === 'doc') {
		// Legacy .doc format - very limited support
		onProgress?.(30, 'Legacy format detected - extracting text...');
		const content = await file.text();
		// Extract readable text from binary DOC
		const text = content.replace(/[^\x20-\x7E\n\r\t]/g, ' ').replace(/\s+/g, ' ').trim();
		const textFile = new File([text || 'Unable to extract text from legacy .doc format. Please save as .docx and try again.'], 'temp.txt', { type: 'text/plain' });
		return await convertTextToPdf(textFile, onProgress);
	}

	// DOCX is a ZIP file - we need to extract content
	const JSZip = (await import('jszip')).default;
	const zip = await JSZip.loadAsync(file);

	onProgress?.(40, 'Extracting content...');

	// Get the main document content
	const documentXml = await zip.file('word/document.xml')?.async('string');
	
	if (!documentXml) {
		throw new Error('Could not read document content');
	}

	onProgress?.(60, 'Parsing document...');

	// Parse XML and extract text
	const parser = new DOMParser();
	const xmlDoc = parser.parseFromString(documentXml, 'application/xml');
	
	// Extract text from w:t elements (Word text elements)
	const textElements = xmlDoc.getElementsByTagName('w:t');
	const paragraphs: string[] = [];
	let currentParagraph = '';

	// Also track paragraph elements for line breaks
	const allNodes = xmlDoc.getElementsByTagName('*');
	
	for (let i = 0; i < allNodes.length; i++) {
		const node = allNodes[i];
		
		if (node.localName === 't') {
			currentParagraph += node.textContent || '';
		} else if (node.localName === 'p' && currentParagraph) {
			paragraphs.push(currentParagraph.trim());
			currentParagraph = '';
		}
	}
	
	if (currentParagraph) {
		paragraphs.push(currentParagraph.trim());
	}

	const text = paragraphs.filter(p => p).join('\n\n');

	// Create a temporary text file and convert
	const textFile = new File([text || 'No text content found in document'], 'temp.txt', { type: 'text/plain' });
	return await convertTextToPdf(textFile, onProgress);
}

// Convert ODT (OpenDocument Text)
async function convertOdtToPdf(
	file: File,
	onProgress?: (progress: number, status: string) => void
): Promise<Uint8Array> {
	onProgress?.(20, 'Reading OpenDocument file...');

	// ODT is a ZIP file
	const JSZip = (await import('jszip')).default;
	const zip = await JSZip.loadAsync(file);

	onProgress?.(40, 'Extracting content...');

	const contentXml = await zip.file('content.xml')?.async('string');
	
	if (!contentXml) {
		throw new Error('Could not read document content');
	}

	onProgress?.(60, 'Parsing document...');

	const parser = new DOMParser();
	const xmlDoc = parser.parseFromString(contentXml, 'application/xml');
	
	// Extract text from text:p elements
	const paragraphs = xmlDoc.getElementsByTagName('text:p');
	const textContent: string[] = [];

	for (let i = 0; i < paragraphs.length; i++) {
		const text = paragraphs[i].textContent?.trim();
		if (text) {
			textContent.push(text);
		}
	}

	const text = textContent.join('\n\n');
	const textFile = new File([text || 'No text content found'], 'temp.txt', { type: 'text/plain' });
	return await convertTextToPdf(textFile, onProgress);
}

// Convert presentations
async function convertPresentationToPdf(
	file: File,
	fileType: 'pptx' | 'ppt' | 'odp',
	onProgress?: (progress: number, status: string) => void
): Promise<Uint8Array> {
	onProgress?.(20, 'Reading presentation...');

	if (fileType === 'ppt') {
		// Legacy format - very limited
		const text = 'Legacy .ppt format has very limited support.\n\nPlease save your presentation as .pptx in PowerPoint and try again for better results.';
		const textFile = new File([text], 'temp.txt', { type: 'text/plain' });
		return await convertTextToPdf(textFile, onProgress);
	}

	const JSZip = (await import('jszip')).default;
	const zip = await JSZip.loadAsync(file);

	onProgress?.(40, 'Extracting slides...');

	const pdfDoc = await PDFDocument.create();
	const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
	const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
	
	const pageWidth = 841.89; // A4 landscape
	const pageHeight = 595.28;
	const margin = 50;

	if (fileType === 'pptx') {
		// Find all slide files
		const slideFiles = Object.keys(zip.files)
			.filter(name => name.match(/ppt\/slides\/slide\d+\.xml$/))
			.sort((a, b) => {
				const numA = parseInt(a.match(/slide(\d+)/)?.[1] || '0');
				const numB = parseInt(b.match(/slide(\d+)/)?.[1] || '0');
				return numA - numB;
			});

		for (let i = 0; i < slideFiles.length; i++) {
			onProgress?.(40 + (i / slideFiles.length) * 40, `Processing slide ${i + 1}...`);

			const slideXml = await zip.file(slideFiles[i])?.async('string');
			if (!slideXml) continue;

			const parser = new DOMParser();
			const xmlDoc = parser.parseFromString(slideXml, 'application/xml');

			// Extract text from slide
			const textElements = xmlDoc.getElementsByTagName('a:t');
			const texts: string[] = [];

			for (let j = 0; j < textElements.length; j++) {
				const text = textElements[j].textContent?.trim();
				if (text) texts.push(text);
			}

			// Create slide page
			const page = pdfDoc.addPage([pageWidth, pageHeight]);
			
			// Draw slide number
			page.drawText(`Slide ${i + 1}`, {
				x: pageWidth - margin - 50,
				y: margin,
				size: 10,
				font,
				color: rgb(0.5, 0.5, 0.5),
			});

			// Draw text content
			let y = pageHeight - margin;
			const lineHeight = 20;
			
			for (const text of texts) {
				if (y < margin) break;
				
				// Simple word wrap
				const words = text.split(' ');
				let line = '';
				
				for (const word of words) {
					const testLine = line ? `${line} ${word}` : word;
					const width = font.widthOfTextAtSize(testLine, 14);
					
					if (width <= pageWidth - margin * 2) {
						line = testLine;
					} else {
						if (y >= margin) {
							page.drawText(line, {
								x: margin,
								y,
								size: 14,
								font,
								color: rgb(0, 0, 0),
							});
							y -= lineHeight;
						}
						line = word;
					}
				}
				
				if (line && y >= margin) {
					page.drawText(line, {
						x: margin,
						y,
						size: 14,
						font,
						color: rgb(0, 0, 0),
					});
					y -= lineHeight * 1.5;
				}
			}
		}
	} else if (fileType === 'odp') {
		// ODP format
		const contentXml = await zip.file('content.xml')?.async('string');
		if (contentXml) {
			const parser = new DOMParser();
			const xmlDoc = parser.parseFromString(contentXml, 'application/xml');
			
			const frames = xmlDoc.getElementsByTagName('draw:frame');
			let slideNum = 0;
			let currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
			let y = pageHeight - margin;

			for (let i = 0; i < frames.length; i++) {
				const text = frames[i].textContent?.trim();
				if (text) {
					if (y < margin) {
						slideNum++;
						currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
						y = pageHeight - margin;
					}

					currentPage.drawText(text.substring(0, 100), {
						x: margin,
						y,
						size: 14,
						font,
						color: rgb(0, 0, 0),
					});
					y -= 24;
				}
			}
		}
	}

	onProgress?.(80, 'Saving PDF...');

	return await pdfDoc.save();
}

// Convert EPUB to PDF
async function convertEpubToPdf(
	file: File,
	onProgress?: (progress: number, status: string) => void
): Promise<Uint8Array> {
	onProgress?.(20, 'Reading EPUB file...');

	const JSZip = (await import('jszip')).default;
	const zip = await JSZip.loadAsync(file);

	onProgress?.(30, 'Parsing EPUB structure...');

	// Find the container.xml to get content location
	const containerXml = await zip.file('META-INF/container.xml')?.async('string');
	if (!containerXml) {
		throw new Error('Invalid EPUB: Missing container.xml');
	}

	// Parse to find OPF file location
	const parser = new DOMParser();
	const containerDoc = parser.parseFromString(containerXml, 'application/xml');
	const rootfileEl = containerDoc.querySelector('rootfile');
	const opfPath = rootfileEl?.getAttribute('full-path');

	if (!opfPath) {
		throw new Error('Invalid EPUB: Cannot find content.opf');
	}

	onProgress?.(40, 'Reading content files...');

	// Get the OPF file
	const opfXml = await zip.file(opfPath)?.async('string');
	if (!opfXml) {
		throw new Error('Invalid EPUB: Cannot read content.opf');
	}

	const opfDoc = parser.parseFromString(opfXml, 'application/xml');
	
	// Get the directory containing the OPF
	const opfDir = opfPath.includes('/') ? opfPath.substring(0, opfPath.lastIndexOf('/') + 1) : '';

	// Get spine items (reading order)
	const spineItems = opfDoc.querySelectorAll('spine itemref');
	const manifest = opfDoc.querySelector('manifest');
	
	const contentTexts: string[] = [];

	for (let i = 0; i < spineItems.length; i++) {
		onProgress?.(40 + (i / spineItems.length) * 30, `Processing chapter ${i + 1}...`);

		const idref = spineItems[i].getAttribute('idref');
		if (!idref) continue;

		// Find item in manifest
		const manifestItem = manifest?.querySelector(`item[id="${idref}"]`);
		const href = manifestItem?.getAttribute('href');
		
		if (!href) continue;

		// Resolve path relative to OPF
		const contentPath = opfDir + href;
		
		const content = await zip.file(contentPath)?.async('string');
		if (!content) continue;

		// Parse HTML and extract text
		const contentDoc = parser.parseFromString(content, 'text/html');
		const bodyText = contentDoc.body?.textContent?.trim();
		
		if (bodyText) {
			contentTexts.push(bodyText);
		}
	}

	onProgress?.(70, 'Creating PDF pages...');

	// Join all text and convert to PDF
	const fullText = contentTexts.join('\n\n---\n\n');
	const textFile = new File([fullText], 'temp.txt', { type: 'text/plain' });
	
	return await convertTextToPdf(textFile, (progress, status) => {
		onProgress?.(70 + (progress / 100) * 30, status);
	});
}
