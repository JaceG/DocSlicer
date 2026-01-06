/**
 * Images to PDF Converter
 * Converts multiple images (JPG, PNG, etc.) into a single PDF
 * All processing happens client-side
 */

import { PDFDocument, PageSizes, degrees } from 'pdf-lib';
import { ImageFile, ImagesToPdfSettings, PageSize, RotationDegrees } from '@/types';

// Store PDF blobs in memory
const blobStore = new Map<string, Blob>();

export interface ImagesToPdfResult {
	success: boolean;
	downloadUrl?: string;
	blobKey?: string;
	pageCount?: number;
	error?: string;
}

// Page size dimensions in points (72 points = 1 inch)
const PAGE_DIMENSIONS: Record<PageSize, [number, number]> = {
	a4: PageSizes.A4,
	letter: PageSizes.Letter,
	legal: PageSizes.Legal,
	fit: [0, 0], // Will be calculated based on image
};

// Margin presets in points (1mm ≈ 2.83 points)
const MM_TO_POINTS = 2.83465;

/**
 * Load an image and get its dimensions
 */
async function loadImage(file: File): Promise<{ 
	data: ArrayBuffer; 
	width: number; 
	height: number;
	type: 'png' | 'jpg';
}> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = async (e) => {
			const data = e.target?.result as ArrayBuffer;
			
			// Create image to get dimensions
			const blob = new Blob([data]);
			const url = URL.createObjectURL(blob);
			const img = new Image();
			
			img.onload = () => {
				URL.revokeObjectURL(url);
				const type = file.type === 'image/png' ? 'png' : 'jpg';
				resolve({ data, width: img.width, height: img.height, type });
			};
			
			img.onerror = () => {
				URL.revokeObjectURL(url);
				reject(new Error(`Failed to load image: ${file.name}`));
			};
			
			img.src = url;
		};
		reader.onerror = () => reject(new Error(`Failed to read file: ${file.name}`));
		reader.readAsArrayBuffer(file);
	});
}

/**
 * Apply rotation to dimensions
 */
function getRotatedDimensions(
	width: number, 
	height: number, 
	rotation: RotationDegrees
): { width: number; height: number } {
	if (rotation === 90 || rotation === 270) {
		return { width: height, height: width };
	}
	return { width, height };
}

/**
 * Calculate image placement on page
 */
function calculateImagePlacement(
	imgWidth: number,
	imgHeight: number,
	pageWidth: number,
	pageHeight: number,
	margin: number,
	fit: 'contain' | 'cover' | 'fill'
): { x: number; y: number; width: number; height: number } {
	const availableWidth = pageWidth - (margin * 2);
	const availableHeight = pageHeight - (margin * 2);
	
	if (fit === 'fill') {
		return {
			x: margin,
			y: margin,
			width: availableWidth,
			height: availableHeight,
		};
	}
	
	const imgRatio = imgWidth / imgHeight;
	const pageRatio = availableWidth / availableHeight;
	
	let finalWidth: number;
	let finalHeight: number;
	
	if (fit === 'contain') {
		if (imgRatio > pageRatio) {
			finalWidth = availableWidth;
			finalHeight = availableWidth / imgRatio;
		} else {
			finalHeight = availableHeight;
			finalWidth = availableHeight * imgRatio;
		}
	} else { // cover
		if (imgRatio > pageRatio) {
			finalHeight = availableHeight;
			finalWidth = availableHeight * imgRatio;
		} else {
			finalWidth = availableWidth;
			finalHeight = availableWidth / imgRatio;
		}
	}
	
	// Center the image
	const x = margin + (availableWidth - finalWidth) / 2;
	const y = margin + (availableHeight - finalHeight) / 2;
	
	return { x, y, width: finalWidth, height: finalHeight };
}

/**
 * Convert multiple images to a single PDF
 */
export async function convertImagesToPdf(
	images: ImageFile[],
	settings: ImagesToPdfSettings,
	outputFileName: string,
	onProgress?: (progress: number) => void
): Promise<ImagesToPdfResult> {
	try {
		if (images.length === 0) {
			return {
				success: false,
				error: 'No images provided',
			};
		}

		onProgress?.(5);

		const pdfDoc = await PDFDocument.create();
		const marginPoints = settings.margin * MM_TO_POINTS;

		for (let i = 0; i < images.length; i++) {
			const imageFile = images[i];
			
			try {
				// Load image
				const imageData = await loadImage(imageFile.file);
				
				// Apply rotation to get effective dimensions
				const effectiveDims = getRotatedDimensions(
					imageData.width, 
					imageData.height, 
					imageFile.rotation
				);
				
				// Determine page dimensions
				let pageWidth: number;
				let pageHeight: number;
				
				if (settings.pageSize === 'fit') {
					// Page size matches image + margins
					pageWidth = effectiveDims.width + (marginPoints * 2);
					pageHeight = effectiveDims.height + (marginPoints * 2);
				} else {
					const baseDims = PAGE_DIMENSIONS[settings.pageSize];
					
					// Determine orientation
					if (settings.orientation === 'auto') {
						// Use image orientation
						if (effectiveDims.width > effectiveDims.height) {
							pageWidth = Math.max(baseDims[0], baseDims[1]);
							pageHeight = Math.min(baseDims[0], baseDims[1]);
						} else {
							pageWidth = Math.min(baseDims[0], baseDims[1]);
							pageHeight = Math.max(baseDims[0], baseDims[1]);
						}
					} else if (settings.orientation === 'landscape') {
						pageWidth = Math.max(baseDims[0], baseDims[1]);
						pageHeight = Math.min(baseDims[0], baseDims[1]);
					} else {
						pageWidth = Math.min(baseDims[0], baseDims[1]);
						pageHeight = Math.max(baseDims[0], baseDims[1]);
					}
				}
				
				// Add page
				const page = pdfDoc.addPage([pageWidth, pageHeight]);
				
				// Embed image
				const embeddedImage = imageData.type === 'png'
					? await pdfDoc.embedPng(imageData.data)
					: await pdfDoc.embedJpg(imageData.data);
				
				// Calculate placement
				const placement = calculateImagePlacement(
					effectiveDims.width,
					effectiveDims.height,
					pageWidth,
					pageHeight,
					marginPoints,
					settings.imageFit
				);
				
				// Draw image with rotation if needed
				if (imageFile.rotation !== 0) {
					// For rotated images, we need to adjust the drawing
					page.drawImage(embeddedImage, {
						x: placement.x,
						y: placement.y,
						width: placement.width,
						height: placement.height,
						rotate: degrees(imageFile.rotation),
					});
				} else {
					page.drawImage(embeddedImage, {
						x: placement.x,
						y: placement.y,
						width: placement.width,
						height: placement.height,
					});
				}
				
			} catch (imgError) {
				console.warn(`Failed to process image ${imageFile.name}:`, imgError);
				// Continue with other images
			}
			
			onProgress?.(10 + Math.round((i / images.length) * 80));
		}

		if (pdfDoc.getPageCount() === 0) {
			return {
				success: false,
				error: 'Failed to process any images',
			};
		}

		onProgress?.(90);

		// Save PDF
		const pdfBytes = await pdfDoc.save();
		const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
		const blobKey = `images_to_pdf_${Date.now()}`;
		blobStore.set(blobKey, blob);

		const downloadUrl = URL.createObjectURL(blob);

		onProgress?.(100);

		return {
			success: true,
			downloadUrl,
			blobKey,
			pageCount: pdfDoc.getPageCount(),
		};
	} catch (error) {
		console.error('Images to PDF error:', error);
		return {
			success: false,
			error: error instanceof Error ? error.message : 'Failed to convert images to PDF',
		};
	}
}

/**
 * Create thumbnail from image file
 */
export async function createImageThumbnail(
	file: File,
	maxWidth: number = 150
): Promise<string> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = (e) => {
			const img = new Image();
			img.onload = () => {
				const canvas = document.createElement('canvas');
				const scale = maxWidth / img.width;
				canvas.width = maxWidth;
				canvas.height = img.height * scale;
				
				const ctx = canvas.getContext('2d');
				if (ctx) {
					ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
					resolve(canvas.toDataURL('image/jpeg', 0.7));
				} else {
					reject(new Error('Failed to get canvas context'));
				}
			};
			img.onerror = () => reject(new Error('Failed to load image'));
			img.src = e.target?.result as string;
		};
		reader.onerror = () => reject(new Error('Failed to read file'));
		reader.readAsDataURL(file);
	});
}

// Cleanup utilities
export function downloadFile(url: string, fileName: string): void {
	const link = document.createElement('a');
	link.href = url;
	link.download = fileName;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}

export function cleanupImagesToPdfBlobUrl(url: string): void {
	if (url.startsWith('blob:')) {
		URL.revokeObjectURL(url);
	}
}

export function cleanupImagesToPdfBlobStoreEntry(blobKey: string): void {
	if (blobStore.has(blobKey)) {
		blobStore.delete(blobKey);
	}
}

// Default settings
export const DEFAULT_IMAGES_TO_PDF_SETTINGS: ImagesToPdfSettings = {
	pageSize: 'a4',
	orientation: 'auto',
	imageFit: 'contain',
	margin: 10,
	quality: 90,
};
