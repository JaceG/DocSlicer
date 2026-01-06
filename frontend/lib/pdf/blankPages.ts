// Blank Page Detection and Removal using pdfjs-dist and pdf-lib
import { PDFDocument } from 'pdf-lib';
import { BlankPageSettings, BlankPageInfo } from '@/types';

// Blob store for processed PDFs
const blankPagesRemovalBlobStore = new Map<string, { blob: Blob; url: string; timestamp: number }>();

/**
 * Analyze a page to determine if it's blank
 * Uses canvas rendering and pixel analysis
 */
async function analyzePageBlankness(
	pdfDocument: any,
	pageNumber: number,
	settings: BlankPageSettings
): Promise<BlankPageInfo> {
	const page = await pdfDocument.getPage(pageNumber);
	const viewport = page.getViewport({ scale: 0.5 }); // Lower scale for faster analysis

	// Create canvas for rendering
	const canvas = document.createElement('canvas');
	canvas.width = viewport.width;
	canvas.height = viewport.height;
	const ctx = canvas.getContext('2d')!;

	// Fill with white background
	ctx.fillStyle = 'white';
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	// Render the page
	await page.render({
		canvasContext: ctx,
		viewport: viewport,
	}).promise;

	// Analyze pixels
	const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
	const pixels = imageData.data;
	const totalPixels = pixels.length / 4;

	let whitePixels = 0;
	let nearWhitePixels = 0;
	const threshold = 250; // Consider pixels with RGB > 250 as white

	for (let i = 0; i < pixels.length; i += 4) {
		const r = pixels[i];
		const g = pixels[i + 1];
		const b = pixels[i + 2];

		// Check if pixel is white or near-white
		if (r >= threshold && g >= threshold && b >= threshold) {
			whitePixels++;
		}
		
		// For solid color detection, check if all channels are similar
		if (settings.detectSolidColorPages) {
			const diff = Math.max(Math.abs(r - g), Math.abs(g - b), Math.abs(r - b));
			if (diff < 10 && (r > 240 || r < 15)) {
				nearWhitePixels++;
			}
		}
	}

	const whitePercentage = (whitePixels / totalPixels) * 100;
	const blankScore = Math.min(100, Math.round(whitePercentage));
	const isBlank = blankScore >= settings.threshold;

	// Generate thumbnail for preview
	const thumbnailCanvas = document.createElement('canvas');
	const thumbnailSize = 100;
	thumbnailCanvas.width = thumbnailSize;
	thumbnailCanvas.height = Math.round(thumbnailSize * (viewport.height / viewport.width));
	const thumbnailCtx = thumbnailCanvas.getContext('2d')!;
	thumbnailCtx.drawImage(canvas, 0, 0, thumbnailCanvas.width, thumbnailCanvas.height);
	const thumbnail = thumbnailCanvas.toDataURL('image/jpeg', 0.6);

	return {
		pageNumber,
		isBlank,
		blankScore,
		thumbnail,
	};
}

/**
 * Detect blank pages in a PDF
 */
export async function detectBlankPages(
	file: File,
	settings: BlankPageSettings,
	onProgress?: (progress: number) => void
): Promise<BlankPageInfo[]> {
	onProgress?.(5);

	// Dynamically import pdfjs-dist
	const pdfjsLib = await import('pdfjs-dist');
	pdfjsLib.GlobalWorkerOptions.workerSrc = 
		'https://unpkg.com/pdfjs-dist@4.0.379/build/pdf.worker.min.mjs';

	const arrayBuffer = await file.arrayBuffer();
	const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
	const pdfDocument = await loadingTask.promise;
	onProgress?.(15);

	const totalPages = pdfDocument.numPages;
	const blankPages: BlankPageInfo[] = [];

	for (let i = 1; i <= totalPages; i++) {
		const pageInfo = await analyzePageBlankness(pdfDocument, i, settings);
		blankPages.push(pageInfo);
		onProgress?.(15 + ((i / totalPages) * 80));
	}

	onProgress?.(100);
	return blankPages;
}

/**
 * Remove specified pages from a PDF
 */
export async function removePages(
	file: File,
	pagesToRemove: Set<number>,
	onProgress?: (progress: number) => void
): Promise<{ url: string; blobKey: string; removedCount: number }> {
	onProgress?.(10);

	const arrayBuffer = await file.arrayBuffer();
	const sourcePdf = await PDFDocument.load(arrayBuffer);
	onProgress?.(30);

	const totalPages = sourcePdf.getPageCount();
	const pagesToKeep: number[] = [];

	for (let i = 1; i <= totalPages; i++) {
		if (!pagesToRemove.has(i)) {
			pagesToKeep.push(i - 1); // pdf-lib uses 0-based indexing
		}
	}

	if (pagesToKeep.length === 0) {
		throw new Error('Cannot remove all pages from PDF');
	}

	onProgress?.(50);

	const newPdf = await PDFDocument.create();
	const copiedPages = await newPdf.copyPages(sourcePdf, pagesToKeep);
	copiedPages.forEach(page => newPdf.addPage(page));

	onProgress?.(70);

	const pdfBytes = await newPdf.save();
	const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
	const url = URL.createObjectURL(blob);
	const blobKey = `blank_removed_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

	blankPagesRemovalBlobStore.set(blobKey, { blob, url, timestamp: Date.now() });
	onProgress?.(100);

	return { 
		url, 
		blobKey, 
		removedCount: pagesToRemove.size 
	};
}

/**
 * Get default blank page detection settings
 */
export function getDefaultBlankPageSettings(): BlankPageSettings {
	return {
		threshold: 98, // 98% white to be considered blank
		detectWhitePages: true,
		detectSolidColorPages: false,
		minContentArea: 2, // At least 2% content
	};
}

/**
 * Download file
 */
export function downloadFile(url: string, fileName: string): void {
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
export function cleanupBlankRemovalBlobUrl(url: string): void {
	URL.revokeObjectURL(url);
}

/**
 * Cleanup blob store entry
 */
export function cleanupBlankRemovalBlobStoreEntry(blobKey: string): void {
	const entry = blankPagesRemovalBlobStore.get(blobKey);
	if (entry) {
		URL.revokeObjectURL(entry.url);
		blankPagesRemovalBlobStore.delete(blobKey);
	}
}
