/**
 * PDF Digital Signature Library
 * 
 * Provides functionality to add visual signatures to PDF documents:
 * - Draw signatures on canvas
 * - Type signatures with fonts
 * - Upload signature images
 * - Place signatures on specific pages
 */

import { PDFDocument } from 'pdf-lib';
import { SignatureData, SignaturePlacement, SignSettings } from '@/types';

/**
 * Create a signature image from drawn canvas data
 */
export function createSignatureFromCanvas(
	canvas: HTMLCanvasElement
): SignatureData {
	const dataUrl = canvas.toDataURL('image/png');
	return {
		type: 'draw',
		dataUrl,
		width: canvas.width,
		height: canvas.height,
	};
}

/**
 * Create a signature image from typed text
 */
export async function createSignatureFromText(
	text: string,
	fontFamily: string = 'cursive',
	fontSize: number = 48,
	color: string = '#000000'
): Promise<SignatureData> {
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d')!;
	
	// Measure text
	ctx.font = `${fontSize}px ${fontFamily}`;
	const metrics = ctx.measureText(text);
	const padding = 20;
	
	canvas.width = metrics.width + padding * 2;
	canvas.height = fontSize * 1.5 + padding * 2;
	
	// Draw text
	ctx.fillStyle = 'transparent';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.font = `${fontSize}px ${fontFamily}`;
	ctx.fillStyle = color;
	ctx.textBaseline = 'middle';
	ctx.fillText(text, padding, canvas.height / 2);
	
	return {
		type: 'type',
		dataUrl: canvas.toDataURL('image/png'),
		width: canvas.width,
		height: canvas.height,
	};
}

/**
 * Create a signature from an uploaded image file
 */
export async function createSignatureFromImage(
	file: File
): Promise<SignatureData> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => {
			const img = new Image();
			img.onload = () => {
				// Create canvas to normalize the image
				const canvas = document.createElement('canvas');
				const maxWidth = 400;
				const maxHeight = 200;
				
				let width = img.width;
				let height = img.height;
				
				// Scale down if too large
				if (width > maxWidth) {
					height = (height * maxWidth) / width;
					width = maxWidth;
				}
				if (height > maxHeight) {
					width = (width * maxHeight) / height;
					height = maxHeight;
				}
				
				canvas.width = width;
				canvas.height = height;
				
				const ctx = canvas.getContext('2d')!;
				ctx.drawImage(img, 0, 0, width, height);
				
				resolve({
					type: 'upload',
					dataUrl: canvas.toDataURL('image/png'),
					width,
					height,
				});
			};
			img.onerror = () => reject(new Error('Failed to load image'));
			img.src = reader.result as string;
		};
		reader.onerror = () => reject(new Error('Failed to read file'));
		reader.readAsDataURL(file);
	});
}

/**
 * Format date for signature
 */
function formatDate(format: string): string {
	const date = new Date();
	const options: Record<string, Intl.DateTimeFormatOptions> = {
		'MM/DD/YYYY': { month: '2-digit', day: '2-digit', year: 'numeric' },
		'DD/MM/YYYY': { day: '2-digit', month: '2-digit', year: 'numeric' },
		'YYYY-MM-DD': { year: 'numeric', month: '2-digit', day: '2-digit' },
		'MMM DD, YYYY': { month: 'short', day: 'numeric', year: 'numeric' },
	};
	
	const opts = options[format] || options['MM/DD/YYYY'];
	return date.toLocaleDateString('en-US', opts);
}

/**
 * Apply digital signature to PDF
 */
export async function applySignature(
	file: File,
	settings: SignSettings,
	onProgress?: (progress: number) => void
): Promise<Blob> {
	onProgress?.(5);
	
	const arrayBuffer = await file.arrayBuffer();
	const pdfDoc = await PDFDocument.load(arrayBuffer);
	const pages = pdfDoc.getPages();
	
	onProgress?.(20);
	
	// Extract image data from data URL
	const base64Data = settings.signature.dataUrl.split(',')[1];
	const imageBytes = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));
	
	// Embed the signature image
	const signatureImage = await pdfDoc.embedPng(imageBytes);
	
	onProgress?.(40);
	
	// Apply signature to each placement
	const total = settings.placements.length;
	let processed = 0;
	
	for (const placement of settings.placements) {
		const page = pages[placement.pageNumber - 1];
		if (!page) continue;
		
		const pageHeight = page.getHeight();
		const pdfY = pageHeight - placement.y - placement.height;
		
		// Draw signature
		page.drawImage(signatureImage, {
			x: placement.x,
			y: pdfY,
			width: placement.width,
			height: placement.height,
		});
		
		// Add date if requested
		if (settings.addDate && settings.datePosition !== 'none') {
			const dateText = formatDate(settings.dateFormat);
			const font = await pdfDoc.embedFont('Helvetica' as any);
			const fontSize = 10;
			
			let dateX = placement.x;
			let dateY = pdfY;
			
			if (settings.datePosition === 'below') {
				dateY = pdfY - fontSize - 5;
			} else if (settings.datePosition === 'right') {
				dateX = placement.x + placement.width + 10;
				dateY = pdfY + placement.height / 2;
			}
			
			page.drawText(dateText, {
				x: dateX,
				y: dateY,
				size: fontSize,
				font,
			});
		}
		
		processed++;
		onProgress?.(40 + (processed / total) * 50);
	}
	
	onProgress?.(95);
	
	const pdfBytes = await pdfDoc.save();
	
	onProgress?.(100);
	
	return new Blob([pdfBytes], { type: 'application/pdf' });
}

/**
 * Available signature fonts
 */
export const SIGNATURE_FONTS = [
	{ name: 'Brush Script', value: 'Brush Script MT, cursive' },
	{ name: 'Lucida Handwriting', value: 'Lucida Handwriting, cursive' },
	{ name: 'Comic Sans', value: 'Comic Sans MS, cursive' },
	{ name: 'Cursive', value: 'cursive' },
	{ name: 'Georgia Italic', value: 'Georgia, serif' },
];

/**
 * Available date formats
 */
export const DATE_FORMATS = [
	{ label: 'MM/DD/YYYY', value: 'MM/DD/YYYY' },
	{ label: 'DD/MM/YYYY', value: 'DD/MM/YYYY' },
	{ label: 'YYYY-MM-DD', value: 'YYYY-MM-DD' },
	{ label: 'MMM DD, YYYY', value: 'MMM DD, YYYY' },
];
