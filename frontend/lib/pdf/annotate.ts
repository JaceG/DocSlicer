/**
 * PDF Annotation Library
 * 
 * Provides functionality to add annotations to PDF documents:
 * - Highlights, underlines, strikethroughs
 * - Text boxes
 * - Arrows and shapes
 * - Freehand drawings
 */

import { PDFDocument, rgb, PDFPage } from 'pdf-lib';
import {
	Annotation,
	HighlightAnnotation,
	TextBoxAnnotation,
	ArrowAnnotation,
	ShapeAnnotation,
	FreehandAnnotation,
} from '@/types';

/**
 * Parse hex color to RGB values (0-1 range)
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	if (result) {
		return {
			r: parseInt(result[1], 16) / 255,
			g: parseInt(result[2], 16) / 255,
			b: parseInt(result[3], 16) / 255,
		};
	}
	return { r: 1, g: 1, b: 0 }; // Default yellow
}

/**
 * Draw a highlight annotation on a page
 */
function drawHighlight(
	page: PDFPage,
	annotation: HighlightAnnotation
): void {
	const { x, y, width, height, color, opacity } = annotation;
	const { r, g, b } = hexToRgb(color);
	const pageHeight = page.getHeight();
	
	// Convert to PDF coordinates (origin at bottom-left)
	const pdfY = pageHeight - y - height;
	
	page.drawRectangle({
		x,
		y: pdfY,
		width,
		height,
		color: rgb(r, g, b),
		opacity: opacity / 100,
	});
}

/**
 * Draw a text box annotation on a page
 */
async function drawTextBox(
	page: PDFPage,
	annotation: TextBoxAnnotation,
	pdfDoc: PDFDocument
): Promise<void> {
	const { x, y, width, height, text, fontSize, fontColor, backgroundColor, borderColor, opacity } = annotation;
	const pageHeight = page.getHeight();
	const pdfY = pageHeight - y - height;
	
	// Draw background if specified
	if (backgroundColor) {
		const bgColor = hexToRgb(backgroundColor);
		page.drawRectangle({
			x,
			y: pdfY,
			width,
			height,
			color: rgb(bgColor.r, bgColor.g, bgColor.b),
			opacity: opacity / 100,
		});
	}
	
	// Draw border if specified
	if (borderColor) {
		const bColor = hexToRgb(borderColor);
		page.drawRectangle({
			x,
			y: pdfY,
			width,
			height,
			borderColor: rgb(bColor.r, bColor.g, bColor.b),
			borderWidth: 1,
			opacity: opacity / 100,
		});
	}
	
	// Draw text
	const textColor = hexToRgb(fontColor);
	const font = await pdfDoc.embedFont('Helvetica' as any);
	
	page.drawText(text, {
		x: x + 5,
		y: pdfY + height - fontSize - 5,
		size: fontSize,
		font,
		color: rgb(textColor.r, textColor.g, textColor.b),
		opacity: opacity / 100,
	});
}

/**
 * Draw an arrow annotation on a page
 */
function drawArrow(
	page: PDFPage,
	annotation: ArrowAnnotation
): void {
	const { startX, startY, endX, endY, color, opacity, strokeWidth } = annotation;
	const { r, g, b } = hexToRgb(color);
	const pageHeight = page.getHeight();
	
	// Convert to PDF coordinates
	const pdfStartY = pageHeight - startY;
	const pdfEndY = pageHeight - endY;
	
	// Draw the line
	page.drawLine({
		start: { x: startX, y: pdfStartY },
		end: { x: endX, y: pdfEndY },
		thickness: strokeWidth,
		color: rgb(r, g, b),
		opacity: opacity / 100,
	});
	
	// Calculate arrowhead
	const angle = Math.atan2(pdfEndY - pdfStartY, endX - startX);
	const arrowLength = 15;
	const arrowAngle = Math.PI / 6; // 30 degrees
	
	const arrow1X = endX - arrowLength * Math.cos(angle - arrowAngle);
	const arrow1Y = pdfEndY - arrowLength * Math.sin(angle - arrowAngle);
	const arrow2X = endX - arrowLength * Math.cos(angle + arrowAngle);
	const arrow2Y = pdfEndY - arrowLength * Math.sin(angle + arrowAngle);
	
	// Draw arrowhead lines
	page.drawLine({
		start: { x: endX, y: pdfEndY },
		end: { x: arrow1X, y: arrow1Y },
		thickness: strokeWidth,
		color: rgb(r, g, b),
		opacity: opacity / 100,
	});
	
	page.drawLine({
		start: { x: endX, y: pdfEndY },
		end: { x: arrow2X, y: arrow2Y },
		thickness: strokeWidth,
		color: rgb(r, g, b),
		opacity: opacity / 100,
	});
}

/**
 * Draw a shape annotation (rectangle or circle) on a page
 */
function drawShape(
	page: PDFPage,
	annotation: ShapeAnnotation
): void {
	const { type, x, y, width, height, color, opacity, strokeWidth, filled } = annotation;
	const { r, g, b } = hexToRgb(color);
	const pageHeight = page.getHeight();
	const pdfY = pageHeight - y - height;
	
	if (type === 'rectangle') {
		page.drawRectangle({
			x,
			y: pdfY,
			width,
			height,
			borderColor: rgb(r, g, b),
			borderWidth: strokeWidth,
			color: filled ? rgb(r, g, b) : undefined,
			opacity: opacity / 100,
		});
	} else if (type === 'circle') {
		// Draw as ellipse
		const centerX = x + width / 2;
		const centerY = pdfY + height / 2;
		page.drawEllipse({
			x: centerX,
			y: centerY,
			xScale: width / 2,
			yScale: height / 2,
			borderColor: rgb(r, g, b),
			borderWidth: strokeWidth,
			color: filled ? rgb(r, g, b) : undefined,
			opacity: opacity / 100,
		});
	}
}

/**
 * Draw a freehand annotation on a page
 */
function drawFreehand(
	page: PDFPage,
	annotation: FreehandAnnotation
): void {
	const { points, color, opacity, strokeWidth } = annotation;
	const { r, g, b } = hexToRgb(color);
	const pageHeight = page.getHeight();
	
	if (points.length < 2) return;
	
	// Draw lines between consecutive points
	for (let i = 0; i < points.length - 1; i++) {
		const start = points[i];
		const end = points[i + 1];
		
		page.drawLine({
			start: { x: start.x, y: pageHeight - start.y },
			end: { x: end.x, y: pageHeight - end.y },
			thickness: strokeWidth,
			color: rgb(r, g, b),
			opacity: opacity / 100,
		});
	}
}

/**
 * Apply annotations to a PDF
 */
export async function applyAnnotations(
	file: File,
	annotations: Annotation[],
	onProgress?: (progress: number) => void
): Promise<Blob> {
	onProgress?.(5);
	
	const arrayBuffer = await file.arrayBuffer();
	const pdfDoc = await PDFDocument.load(arrayBuffer);
	const pages = pdfDoc.getPages();
	
	onProgress?.(20);
	
	// Group annotations by page
	const annotationsByPage = new Map<number, Annotation[]>();
	annotations.forEach(annotation => {
		const pageAnnotations = annotationsByPage.get(annotation.pageNumber) || [];
		pageAnnotations.push(annotation);
		annotationsByPage.set(annotation.pageNumber, pageAnnotations);
	});
	
	// Apply annotations to each page
	let processed = 0;
	const total = annotationsByPage.size;
	
	for (const [pageNumber, pageAnnotations] of annotationsByPage) {
		const page = pages[pageNumber - 1];
		if (!page) continue;
		
		for (const annotation of pageAnnotations) {
			switch (annotation.type) {
				case 'highlight':
				case 'underline':
				case 'strikethrough':
					drawHighlight(page, annotation as HighlightAnnotation);
					break;
				case 'textbox':
					await drawTextBox(page, annotation as TextBoxAnnotation, pdfDoc);
					break;
				case 'arrow':
					drawArrow(page, annotation as ArrowAnnotation);
					break;
				case 'rectangle':
				case 'circle':
					drawShape(page, annotation as ShapeAnnotation);
					break;
				case 'freehand':
					drawFreehand(page, annotation as FreehandAnnotation);
					break;
			}
		}
		
		processed++;
		onProgress?.(20 + (processed / total) * 70);
	}
	
	onProgress?.(95);
	
	const pdfBytes = await pdfDoc.save();
	
	onProgress?.(100);
	
	// Create a new Uint8Array to ensure Blob compatibility
	return new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
}

/**
 * Get page dimensions for annotation positioning
 */
export async function getPageDimensions(
	file: File
): Promise<Array<{ width: number; height: number }>> {
	const arrayBuffer = await file.arrayBuffer();
	const pdfDoc = await PDFDocument.load(arrayBuffer);
	const pages = pdfDoc.getPages();
	
	return pages.map(page => ({
		width: page.getWidth(),
		height: page.getHeight(),
	}));
}
