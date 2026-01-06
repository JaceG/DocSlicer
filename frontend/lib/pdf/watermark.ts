// PDF Watermark Addition using pdf-lib
import { PDFDocument, rgb, degrees, StandardFonts } from 'pdf-lib';
import { WatermarkSettings, WatermarkPosition } from '@/types';

// Blob store for watermarked PDFs
const watermarkedBlobStore = new Map<string, { blob: Blob; url: string; timestamp: number }>();

/**
 * Convert hex color to RGB values (0-1 range)
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	if (!result) {
		return { r: 0.5, g: 0.5, b: 0.5 }; // Default gray
	}
	return {
		r: parseInt(result[1], 16) / 255,
		g: parseInt(result[2], 16) / 255,
		b: parseInt(result[3], 16) / 255,
	};
}

/**
 * Calculate position coordinates based on position setting
 */
function calculatePosition(
	position: WatermarkPosition,
	pageWidth: number,
	pageHeight: number,
	textWidth: number,
	textHeight: number
): { x: number; y: number } {
	const margin = 50;

	switch (position) {
		case 'top-left':
			return { x: margin, y: pageHeight - margin - textHeight };
		case 'top-right':
			return { x: pageWidth - margin - textWidth, y: pageHeight - margin - textHeight };
		case 'bottom-left':
			return { x: margin, y: margin };
		case 'bottom-right':
			return { x: pageWidth - margin - textWidth, y: margin };
		case 'center':
		case 'diagonal':
		default:
			return { x: (pageWidth - textWidth) / 2, y: (pageHeight - textHeight) / 2 };
	}
}

/**
 * Add a text watermark to all pages of a PDF
 */
export async function addTextWatermark(
	file: File,
	settings: Extract<WatermarkSettings, { type: 'text' }>,
	onProgress?: (progress: number) => void
): Promise<{ url: string; blobKey: string }> {
	onProgress?.(10);

	const arrayBuffer = await file.arrayBuffer();
	const pdfDoc = await PDFDocument.load(arrayBuffer);
	onProgress?.(30);

	const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
	const pages = pdfDoc.getPages();
	const totalPages = pages.length;

	const { r, g, b } = hexToRgb(settings.fontColor);
	const opacity = settings.opacity / 100;

	for (let i = 0; i < totalPages; i++) {
		const page = pages[i];
		const { width, height } = page.getSize();

		const textWidth = font.widthOfTextAtSize(settings.text, settings.fontSize);
		const textHeight = settings.fontSize;

		const { x, y } = calculatePosition(
			settings.position,
			width,
			height,
			textWidth,
			textHeight
		);

		// For diagonal watermark, rotate the text
		const rotation = settings.position === 'diagonal' 
			? degrees(45) 
			: degrees(settings.rotation);

		page.drawText(settings.text, {
			x,
			y,
			size: settings.fontSize,
			font,
			color: rgb(r, g, b),
			opacity,
			rotate: rotation,
		});

		onProgress?.(30 + ((i + 1) / totalPages) * 50);
	}

	const pdfBytes = await pdfDoc.save();
	onProgress?.(90);

	// Create blob and URL
	const blob = new Blob([pdfBytes], { type: 'application/pdf' });
	const url = URL.createObjectURL(blob);
	const blobKey = `watermark_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

	watermarkedBlobStore.set(blobKey, { blob, url, timestamp: Date.now() });
	onProgress?.(100);

	return { url, blobKey };
}

/**
 * Add an image watermark to all pages of a PDF
 */
export async function addImageWatermark(
	file: File,
	settings: Extract<WatermarkSettings, { type: 'image' }>,
	onProgress?: (progress: number) => void
): Promise<{ url: string; blobKey: string }> {
	onProgress?.(10);

	const arrayBuffer = await file.arrayBuffer();
	const pdfDoc = await PDFDocument.load(arrayBuffer);
	onProgress?.(20);

	// Load the watermark image
	const imageArrayBuffer = await settings.imageFile.arrayBuffer();
	let image;

	const imageType = settings.imageFile.type;
	if (imageType === 'image/png') {
		image = await pdfDoc.embedPng(imageArrayBuffer);
	} else if (imageType === 'image/jpeg' || imageType === 'image/jpg') {
		image = await pdfDoc.embedJpg(imageArrayBuffer);
	} else {
		throw new Error('Unsupported image format. Please use PNG or JPG.');
	}
	onProgress?.(40);

	const pages = pdfDoc.getPages();
	const totalPages = pages.length;
	const opacity = settings.opacity / 100;

	for (let i = 0; i < totalPages; i++) {
		const page = pages[i];
		const { width: pageWidth, height: pageHeight } = page.getSize();

		// Calculate image dimensions based on width percentage
		const imageWidth = (settings.width / 100) * pageWidth;
		const aspectRatio = image.height / image.width;
		const imageHeight = imageWidth * aspectRatio;

		const { x, y } = calculatePosition(
			settings.position,
			pageWidth,
			pageHeight,
			imageWidth,
			imageHeight
		);

		page.drawImage(image, {
			x,
			y,
			width: imageWidth,
			height: imageHeight,
			opacity,
		});

		onProgress?.(40 + ((i + 1) / totalPages) * 50);
	}

	const pdfBytes = await pdfDoc.save();
	onProgress?.(95);

	// Create blob and URL
	const blob = new Blob([pdfBytes], { type: 'application/pdf' });
	const url = URL.createObjectURL(blob);
	const blobKey = `watermark_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

	watermarkedBlobStore.set(blobKey, { blob, url, timestamp: Date.now() });
	onProgress?.(100);

	return { url, blobKey };
}

/**
 * Add watermark (dispatches to text or image based on settings)
 */
export async function addWatermark(
	file: File,
	settings: WatermarkSettings,
	onProgress?: (progress: number) => void
): Promise<{ url: string; blobKey: string }> {
	if (settings.type === 'text') {
		return addTextWatermark(file, settings, onProgress);
	} else {
		return addImageWatermark(file, settings, onProgress);
	}
}

/**
 * Download a watermarked PDF
 */
export function downloadWatermarkedPdf(url: string, fileName: string): void {
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
export function cleanupWatermarkedBlobUrl(url: string): void {
	URL.revokeObjectURL(url);
}

/**
 * Cleanup blob store entry
 */
export function cleanupWatermarkedBlobStoreEntry(blobKey: string): void {
	const entry = watermarkedBlobStore.get(blobKey);
	if (entry) {
		URL.revokeObjectURL(entry.url);
		watermarkedBlobStore.delete(blobKey);
	}
}
