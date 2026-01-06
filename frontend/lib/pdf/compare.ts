/**
 * PDF Comparison/Diff Library
 * 
 * Provides functionality to compare two PDF documents:
 * - Visual comparison (overlay)
 * - Text comparison
 * - Highlight differences
 */

import { PDFDocument, rgb } from 'pdf-lib';
import { ComparisonSettings, PageDifference, UploadedFile } from '@/types';

/**
 * Parse hex color to RGB values
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
	return { r: 1, g: 0, b: 0 }; // Default red
}

/**
 * Render PDF page to canvas
 */
async function renderPageToCanvas(
	file: File,
	pageNumber: number,
	scale: number = 1.5
): Promise<HTMLCanvasElement> {
	const pdfjsLib = await import('pdfjs-dist');
	pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
	
	const arrayBuffer = await file.arrayBuffer();
	const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
	const page = await pdf.getPage(pageNumber);
	
	const viewport = page.getViewport({ scale });
	const canvas = document.createElement('canvas');
	const context = canvas.getContext('2d')!;
	
	canvas.height = viewport.height;
	canvas.width = viewport.width;
	
	await page.render({
		canvasContext: context,
		viewport,
	}).promise;
	
	return canvas;
}

/**
 * Compare two images pixel by pixel
 */
function compareImages(
	canvas1: HTMLCanvasElement,
	canvas2: HTMLCanvasElement,
	sensitivity: number
): {
	changePercentage: number;
	diffCanvas: HTMLCanvasElement;
} {
	const width = Math.max(canvas1.width, canvas2.width);
	const height = Math.max(canvas1.height, canvas2.height);
	
	const diffCanvas = document.createElement('canvas');
	diffCanvas.width = width;
	diffCanvas.height = height;
	const diffCtx = diffCanvas.getContext('2d')!;
	
	// Draw first image as base
	diffCtx.drawImage(canvas1, 0, 0);
	
	const ctx1 = canvas1.getContext('2d')!;
	const ctx2 = canvas2.getContext('2d')!;
	
	const imageData1 = ctx1.getImageData(0, 0, canvas1.width, canvas1.height);
	const imageData2 = ctx2.getImageData(0, 0, canvas2.width, canvas2.height);
	const diffData = diffCtx.getImageData(0, 0, width, height);
	
	let differentPixels = 0;
	const threshold = (100 - sensitivity) * 2.55; // Convert to 0-255 range
	
	const minWidth = Math.min(canvas1.width, canvas2.width);
	const minHeight = Math.min(canvas1.height, canvas2.height);
	
	for (let y = 0; y < minHeight; y++) {
		for (let x = 0; x < minWidth; x++) {
			const i = (y * minWidth + x) * 4;
			
			const r1 = imageData1.data[i];
			const g1 = imageData1.data[i + 1];
			const b1 = imageData1.data[i + 2];
			
			const r2 = imageData2.data[i];
			const g2 = imageData2.data[i + 1];
			const b2 = imageData2.data[i + 2];
			
			const diff = Math.abs(r1 - r2) + Math.abs(g1 - g2) + Math.abs(b1 - b2);
			
			if (diff > threshold) {
				differentPixels++;
				// Highlight difference in red
				const di = (y * width + x) * 4;
				diffData.data[di] = 255;     // R
				diffData.data[di + 1] = 0;   // G
				diffData.data[di + 2] = 0;   // B
				diffData.data[di + 3] = 180; // A (semi-transparent)
			}
		}
	}
	
	diffCtx.putImageData(diffData, 0, 0);
	
	const totalPixels = minWidth * minHeight;
	const changePercentage = (differentPixels / totalPixels) * 100;
	
	return { changePercentage, diffCanvas };
}

/**
 * Extract text from PDF page
 */
async function extractPageText(file: File, pageNumber: number): Promise<string> {
	const pdfjsLib = await import('pdfjs-dist');
	pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
	
	const arrayBuffer = await file.arrayBuffer();
	const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
	const page = await pdf.getPage(pageNumber);
	const textContent = await page.getTextContent();
	
	return textContent.items
		.map((item: any) => item.str)
		.join(' ');
}

/**
 * Compare text between two strings
 */
function compareText(text1: string, text2: string): {
	additions: number;
	deletions: number;
	modifications: number;
} {
	const words1 = text1.split(/\s+/).filter(w => w);
	const words2 = text2.split(/\s+/).filter(w => w);
	
	const set1 = new Set(words1);
	const set2 = new Set(words2);
	
	let additions = 0;
	let deletions = 0;
	
	// Words in doc2 but not in doc1 (additions)
	words2.forEach(word => {
		if (!set1.has(word)) additions++;
	});
	
	// Words in doc1 but not in doc2 (deletions)
	words1.forEach(word => {
		if (!set2.has(word)) deletions++;
	});
	
	// Modifications are approximated
	const modifications = Math.min(additions, deletions);
	
	return {
		additions: additions - modifications,
		deletions: deletions - modifications,
		modifications,
	};
}

/**
 * Compare two PDF documents
 */
export async function comparePdfs(
	file1: File,
	file2: File,
	settings: ComparisonSettings,
	onProgress?: (progress: number) => void
): Promise<{
	differences: PageDifference[];
	summary: {
		totalPages: number;
		pagesWithChanges: number;
		totalAdditions: number;
		totalDeletions: number;
	};
}> {
	onProgress?.(5);
	
	const pdfjsLib = await import('pdfjs-dist');
	pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
	
	// Get page counts
	const arrayBuffer1 = await file1.arrayBuffer();
	const arrayBuffer2 = await file2.arrayBuffer();
	
	const pdf1 = await pdfjsLib.getDocument({ data: arrayBuffer1 }).promise;
	const pdf2 = await pdfjsLib.getDocument({ data: arrayBuffer2 }).promise;
	
	const pageCount1 = pdf1.numPages;
	const pageCount2 = pdf2.numPages;
	const maxPages = Math.max(pageCount1, pageCount2);
	
	onProgress?.(15);
	
	const differences: PageDifference[] = [];
	let totalAdditions = 0;
	let totalDeletions = 0;
	let pagesWithChanges = 0;
	
	for (let pageNum = 1; pageNum <= maxPages; pageNum++) {
		const progress = 15 + ((pageNum - 1) / maxPages) * 80;
		onProgress?.(progress);
		
		const pageDiff: PageDifference = {
			pageNumber: pageNum,
			hasChanges: false,
			changePercentage: 0,
			additions: 0,
			deletions: 0,
			modifications: 0,
		};
		
		// Handle pages that exist in only one document
		if (pageNum > pageCount1) {
			pageDiff.hasChanges = true;
			pageDiff.additions = 1;
			pageDiff.changePercentage = 100;
			totalAdditions++;
			pagesWithChanges++;
			differences.push(pageDiff);
			continue;
		}
		
		if (pageNum > pageCount2) {
			pageDiff.hasChanges = true;
			pageDiff.deletions = 1;
			pageDiff.changePercentage = 100;
			totalDeletions++;
			pagesWithChanges++;
			differences.push(pageDiff);
			continue;
		}
		
		try {
			if (settings.mode === 'visual' || settings.mode === 'overlay') {
				// Visual comparison
				const canvas1 = await renderPageToCanvas(file1, pageNum);
				const canvas2 = await renderPageToCanvas(file2, pageNum);
				
				const { changePercentage, diffCanvas } = compareImages(
					canvas1,
					canvas2,
					settings.sensitivity
				);
				
				pageDiff.changePercentage = changePercentage;
				pageDiff.hasChanges = changePercentage > 0.1; // Threshold for "no change"
				pageDiff.diffImageUrl = diffCanvas.toDataURL('image/png');
			}
			
			if (settings.mode === 'text') {
				// Text comparison
				const text1 = await extractPageText(file1, pageNum);
				const text2 = await extractPageText(file2, pageNum);
				
				const textDiff = compareText(text1, text2);
				pageDiff.additions = textDiff.additions;
				pageDiff.deletions = textDiff.deletions;
				pageDiff.modifications = textDiff.modifications;
				pageDiff.hasChanges = textDiff.additions > 0 || textDiff.deletions > 0 || textDiff.modifications > 0;
				
				totalAdditions += textDiff.additions;
				totalDeletions += textDiff.deletions;
			}
			
			if (pageDiff.hasChanges) {
				pagesWithChanges++;
			}
		} catch (error) {
			console.error(`Error comparing page ${pageNum}:`, error);
			pageDiff.hasChanges = true; // Mark as changed if comparison fails
		}
		
		differences.push(pageDiff);
	}
	
	onProgress?.(100);
	
	return {
		differences,
		summary: {
			totalPages: maxPages,
			pagesWithChanges,
			totalAdditions,
			totalDeletions,
		},
	};
}

/**
 * Generate comparison report PDF
 */
export async function generateComparisonReport(
	file1: File,
	file2: File,
	differences: PageDifference[],
	settings: ComparisonSettings,
	onProgress?: (progress: number) => void
): Promise<Blob> {
	onProgress?.(10);
	
	const pdfDoc = await PDFDocument.create();
	
	// Add summary page
	const summaryPage = pdfDoc.addPage([612, 792]); // Letter size
	const font = await pdfDoc.embedFont('Helvetica' as any);
	const boldFont = await pdfDoc.embedFont('Helvetica-Bold' as any);
	
	let y = 750;
	const leftMargin = 50;
	
	summaryPage.drawText('PDF Comparison Report', {
		x: leftMargin,
		y,
		size: 24,
		font: boldFont,
	});
	
	y -= 40;
	summaryPage.drawText(`Document 1: ${file1.name}`, { x: leftMargin, y, size: 12, font });
	y -= 20;
	summaryPage.drawText(`Document 2: ${file2.name}`, { x: leftMargin, y, size: 12, font });
	y -= 30;
	
	const pagesWithChanges = differences.filter(d => d.hasChanges).length;
	summaryPage.drawText(`Summary:`, { x: leftMargin, y, size: 14, font: boldFont });
	y -= 20;
	summaryPage.drawText(`• Total pages compared: ${differences.length}`, { x: leftMargin + 20, y, size: 12, font });
	y -= 18;
	summaryPage.drawText(`• Pages with changes: ${pagesWithChanges}`, { x: leftMargin + 20, y, size: 12, font });
	y -= 18;
	summaryPage.drawText(`• Pages unchanged: ${differences.length - pagesWithChanges}`, { x: leftMargin + 20, y, size: 12, font });
	
	y -= 40;
	summaryPage.drawText('Page Details:', { x: leftMargin, y, size: 14, font: boldFont });
	y -= 25;
	
	// List pages with changes
	for (const diff of differences) {
		if (y < 50) {
			// Add new page if needed
			const newPage = pdfDoc.addPage([612, 792]);
			y = 750;
		}
		
		const status = diff.hasChanges ? '⚠ Changed' : '✓ Unchanged';
		const changeText = diff.hasChanges ? ` (${diff.changePercentage.toFixed(1)}% different)` : '';
		
		summaryPage.drawText(`Page ${diff.pageNumber}: ${status}${changeText}`, {
			x: leftMargin + 20,
			y,
			size: 11,
			font,
			color: diff.hasChanges ? rgb(0.8, 0, 0) : rgb(0, 0.6, 0),
		});
		y -= 18;
	}
	
	onProgress?.(90);
	
	const pdfBytes = await pdfDoc.save();
	
	onProgress?.(100);
	
	return new Blob([pdfBytes], { type: 'application/pdf' });
}
