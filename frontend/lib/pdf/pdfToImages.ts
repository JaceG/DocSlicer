/**
 * PDF to Images Exporter
 * Converts PDF pages to JPG/PNG images
 * Uses pdfjs-dist for rendering
 */

import { ExportedImage, ImageFormat, PdfToImagesSettings, UploadedFile } from '@/types';

// Store blobs in memory
const blobStore = new Map<string, Blob>();

export interface PdfToImagesResult {
	success: boolean;
	images: ExportedImage[];
	zipUrl?: string;
	blobKey?: string;
	error?: string;
}

/**
 * Export PDF pages to images
 */
export async function exportPdfToImages(
	file: UploadedFile,
	settings: PdfToImagesSettings,
	onProgress?: (progress: number) => void
): Promise<PdfToImagesResult> {
	try {
		onProgress?.(5);

		// Dynamically import pdfjs to avoid SSR issues
		const pdfjsLib = await import('pdfjs-dist');
		
		// Set worker path
		pdfjsLib.GlobalWorkerOptions.workerSrc = '/js/pdf.worker.min.mjs';

		const arrayBuffer = await file.file.arrayBuffer();
		const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
		
		const totalPages = pdf.numPages;
		
		onProgress?.(10);

		// Determine which pages to export
		let pagesToExport: number[] = [];
		
		if (settings.pageSelection === 'all') {
			pagesToExport = Array.from({ length: totalPages }, (_, i) => i + 1);
		} else if (settings.pageSelection === 'range' && settings.pageRange) {
			const start = Math.max(1, settings.pageRange.start);
			const end = Math.min(totalPages, settings.pageRange.end);
			pagesToExport = Array.from({ length: end - start + 1 }, (_, i) => start + i);
		} else if (settings.pageSelection === 'specific' && settings.specificPages) {
			pagesToExport = settings.specificPages.filter(p => p >= 1 && p <= totalPages);
		}

		if (pagesToExport.length === 0) {
			return {
				success: false,
				images: [],
				error: 'No valid pages selected for export',
			};
		}

		const exportedImages: ExportedImage[] = [];
		const baseName = file.name.replace(/\.pdf$/i, '');
		
		// Get MIME type and extension
		const mimeTypes: Record<ImageFormat, string> = {
			png: 'image/png',
			jpg: 'image/jpeg',
			webp: 'image/webp',
		};
		
		const mimeType = mimeTypes[settings.format];
		const extension = settings.format === 'jpg' ? 'jpg' : settings.format;

		for (let i = 0; i < pagesToExport.length; i++) {
			const pageNum = pagesToExport[i];
			
			try {
				const page = await pdf.getPage(pageNum);
				const viewport = page.getViewport({ scale: settings.scale });
				
				// Create canvas
				const canvas = document.createElement('canvas');
				canvas.width = viewport.width;
				canvas.height = viewport.height;
				
				const context = canvas.getContext('2d');
				if (!context) {
					throw new Error('Failed to get canvas context');
				}
				
				// Render page
				await page.render({
					canvasContext: context,
					viewport: viewport,
				}).promise;
				
				// Convert to data URL
				const quality = settings.format === 'png' ? undefined : settings.quality / 100;
				const dataUrl = canvas.toDataURL(mimeType, quality);
				
				// Create blob for ZIP
				const response = await fetch(dataUrl);
				const blob = await response.blob();
				
				const fileName = `${baseName}_page_${pageNum}.${extension}`;
				
				exportedImages.push({
					pageNumber: pageNum,
					dataUrl,
					fileName,
					blob,
				});
				
			} catch (pageError) {
				console.warn(`Failed to export page ${pageNum}:`, pageError);
			}
			
			onProgress?.(10 + Math.round((i / pagesToExport.length) * 80));
		}

		if (exportedImages.length === 0) {
			return {
				success: false,
				images: [],
				error: 'Failed to export any pages',
			};
		}

		onProgress?.(90);

		// Create ZIP if multiple images
		let zipUrl: string | undefined;
		let blobKey: string | undefined;

		if (exportedImages.length > 1) {
			// Dynamically import JSZip
			const JSZip = (await import('jszip')).default;
			const zip = new JSZip();
			
			for (const img of exportedImages) {
				if (img.blob) {
					zip.file(img.fileName, img.blob);
				}
			}
			
			const zipBlob = await zip.generateAsync({ type: 'blob' });
			blobKey = `pdf_to_images_${Date.now()}`;
			blobStore.set(blobKey, zipBlob);
			zipUrl = URL.createObjectURL(zipBlob);
		}

		onProgress?.(100);

		return {
			success: true,
			images: exportedImages,
			zipUrl,
			blobKey,
		};
	} catch (error) {
		console.error('PDF to images error:', error);
		return {
			success: false,
			images: [],
			error: error instanceof Error ? error.message : 'Failed to export PDF to images',
		};
	}
}

/**
 * Download a single image
 */
export function downloadImage(dataUrl: string, fileName: string): void {
	const link = document.createElement('a');
	link.href = dataUrl;
	link.download = fileName;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}

/**
 * Download file from URL
 */
export function downloadFile(url: string, fileName: string): void {
	const link = document.createElement('a');
	link.href = url;
	link.download = fileName;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}

// Cleanup utilities
export function cleanupPdfToImagesBlobUrl(url: string): void {
	if (url.startsWith('blob:')) {
		URL.revokeObjectURL(url);
	}
}

export function cleanupPdfToImagesBlobStoreEntry(blobKey: string): void {
	if (blobStore.has(blobKey)) {
		blobStore.delete(blobKey);
	}
}

// Default settings
export const DEFAULT_PDF_TO_IMAGES_SETTINGS: PdfToImagesSettings = {
	format: 'png',
	scale: 2,
	quality: 90,
	pageSelection: 'all',
};
