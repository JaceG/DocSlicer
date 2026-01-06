/**
 * Add Page Numbers to PDF
 * Adds customizable page numbers to PDF documents
 */

import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { PageNumberSettings, PageNumberFormat, PageNumberPosition, UploadedFile } from '@/types';

// Store PDF blobs in memory
const blobStore = new Map<string, Blob>();

export interface PageNumberResult {
	success: boolean;
	downloadUrl?: string;
	blobKey?: string;
	pageCount?: number;
	error?: string;
}

// Margin presets in points (1mm ≈ 2.83 points)
const MM_TO_POINTS = 2.83465;

/**
 * Convert number to roman numerals
 */
function toRoman(num: number, uppercase: boolean = false): string {
	const romanNumerals: [number, string][] = [
		[1000, 'm'], [900, 'cm'], [500, 'd'], [400, 'cd'],
		[100, 'c'], [90, 'xc'], [50, 'l'], [40, 'xl'],
		[10, 'x'], [9, 'ix'], [5, 'v'], [4, 'iv'], [1, 'i']
	];
	
	let result = '';
	for (const [value, numeral] of romanNumerals) {
		while (num >= value) {
			result += numeral;
			num -= value;
		}
	}
	
	return uppercase ? result.toUpperCase() : result;
}

/**
 * Convert number to alpha (a, b, c, ..., aa, ab, ...)
 */
function toAlpha(num: number, uppercase: boolean = false): string {
	let result = '';
	while (num > 0) {
		num--;
		result = String.fromCharCode(97 + (num % 26)) + result;
		num = Math.floor(num / 26);
	}
	return uppercase ? result.toUpperCase() : result;
}

/**
 * Format page number according to settings
 */
function formatPageNumber(pageNum: number, format: PageNumberFormat): string {
	switch (format) {
		case 'numeric':
			return pageNum.toString();
		case 'roman':
			return toRoman(pageNum, false);
		case 'roman-upper':
			return toRoman(pageNum, true);
		case 'alpha':
			return toAlpha(pageNum, false);
		case 'alpha-upper':
			return toAlpha(pageNum, true);
		default:
			return pageNum.toString();
	}
}

/**
 * Parse hex color to RGB values (0-1 range)
 */
function parseColor(hexColor: string): { r: number; g: number; b: number } {
	const hex = hexColor.replace('#', '');
	return {
		r: parseInt(hex.substring(0, 2), 16) / 255,
		g: parseInt(hex.substring(2, 4), 16) / 255,
		b: parseInt(hex.substring(4, 6), 16) / 255,
	};
}

/**
 * Calculate text position on page
 */
function getTextPosition(
	position: PageNumberPosition,
	pageWidth: number,
	pageHeight: number,
	textWidth: number,
	margin: number
): { x: number; y: number } {
	const marginPoints = margin * MM_TO_POINTS;
	
	let x: number;
	let y: number;
	
	// Horizontal position
	if (position.includes('left')) {
		x = marginPoints;
	} else if (position.includes('right')) {
		x = pageWidth - marginPoints - textWidth;
	} else {
		x = (pageWidth - textWidth) / 2;
	}
	
	// Vertical position
	if (position.includes('top')) {
		y = pageHeight - marginPoints - 12; // 12pt from top
	} else {
		y = marginPoints;
	}
	
	return { x, y };
}

/**
 * Add page numbers to a PDF
 */
export async function addPageNumbers(
	file: UploadedFile,
	settings: PageNumberSettings,
	outputFileName: string,
	onProgress?: (progress: number) => void
): Promise<PageNumberResult> {
	try {
		onProgress?.(10);

		const arrayBuffer = await file.file.arrayBuffer();
		const pdfDoc = await PDFDocument.load(arrayBuffer, {
			ignoreEncryption: true,
		});

		onProgress?.(30);

		// Embed font
		const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
		const pages = pdfDoc.getPages();
		const totalPages = pages.length;

		const color = parseColor(settings.fontColor);

		for (let i = 0; i < totalPages; i++) {
			// Skip first page if requested
			if (settings.skipFirstPage && i === 0) {
				continue;
			}

			const page = pages[i];
			const { width, height } = page.getSize();

			// Calculate page number (accounting for startNumber and skipped pages)
			const displayNumber = settings.skipFirstPage
				? settings.startNumber + i - 1
				: settings.startNumber + i;

			// Format the page number
			const formattedNumber = formatPageNumber(displayNumber, settings.format);
			const fullText = `${settings.prefix}${formattedNumber}${settings.suffix}`;

			// Calculate text width for positioning
			const textWidth = font.widthOfTextAtSize(fullText, settings.fontSize);

			// Get position
			const pos = getTextPosition(
				settings.position,
				width,
				height,
				textWidth,
				settings.margin
			);

			// Draw page number
			page.drawText(fullText, {
				x: pos.x,
				y: pos.y,
				size: settings.fontSize,
				font,
				color: rgb(color.r, color.g, color.b),
			});

			onProgress?.(30 + Math.round((i / totalPages) * 50));
		}

		onProgress?.(80);

		// Save PDF
		const pdfBytes = await pdfDoc.save();
		const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
		const blobKey = `page_numbers_${Date.now()}`;
		blobStore.set(blobKey, blob);

		const downloadUrl = URL.createObjectURL(blob);

		onProgress?.(100);

		return {
			success: true,
			downloadUrl,
			blobKey,
			pageCount: totalPages,
		};
	} catch (error) {
		console.error('Add page numbers error:', error);
		return {
			success: false,
			error: error instanceof Error ? error.message : 'Failed to add page numbers',
		};
	}
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

export function cleanupPageNumbersBlobUrl(url: string): void {
	if (url.startsWith('blob:')) {
		URL.revokeObjectURL(url);
	}
}

export function cleanupPageNumbersBlobStoreEntry(blobKey: string): void {
	if (blobStore.has(blobKey)) {
		blobStore.delete(blobKey);
	}
}

// Default settings
export const DEFAULT_PAGE_NUMBER_SETTINGS: PageNumberSettings = {
	position: 'bottom-center',
	format: 'numeric',
	startNumber: 1,
	prefix: '',
	suffix: '',
	fontSize: 12,
	fontColor: '#000000',
	skipFirstPage: false,
	margin: 15,
};
