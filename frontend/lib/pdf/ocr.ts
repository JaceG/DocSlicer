/**
 * PDF OCR Library
 * 
 * Provides OCR (Optical Character Recognition) functionality:
 * - Makes scanned PDFs searchable
 * - Extracts text from image-based PDFs
 * - Supports multiple languages
 * 
 * Uses Tesseract.js for client-side OCR processing.
 */

import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { OcrSettings, OcrPageResult, OcrLanguage } from '@/types';

// Tesseract.js worker instance (lazy loaded)
let tesseractWorker: any = null;

/**
 * Language codes mapping for Tesseract
 */
const LANGUAGE_MAP: Record<OcrLanguage, string> = {
	'eng': 'eng',
	'spa': 'spa',
	'fra': 'fra',
	'deu': 'deu',
	'ita': 'ita',
	'por': 'por',
	'chi_sim': 'chi_sim',
	'chi_tra': 'chi_tra',
	'jpn': 'jpn',
	'kor': 'kor',
	'ara': 'ara',
	'rus': 'rus',
};

/**
 * Language display names
 */
export const LANGUAGE_NAMES: Record<OcrLanguage, string> = {
	'eng': 'English',
	'spa': 'Spanish',
	'fra': 'French',
	'deu': 'German',
	'ita': 'Italian',
	'por': 'Portuguese',
	'chi_sim': 'Chinese (Simplified)',
	'chi_tra': 'Chinese (Traditional)',
	'jpn': 'Japanese',
	'kor': 'Korean',
	'ara': 'Arabic',
	'rus': 'Russian',
};

/**
 * Initialize Tesseract worker
 */
async function initTesseract(languages: OcrLanguage[]): Promise<any> {
	// Dynamic import of Tesseract.js
	const Tesseract = await import('tesseract.js');
	
	const langString = languages.map(l => LANGUAGE_MAP[l]).join('+');
	
	const worker = await Tesseract.createWorker(langString, 1, {
		logger: (m: any) => {
			// Progress logging can be captured here
			console.log('Tesseract:', m);
		},
	});
	
	return worker;
}

/**
 * Render a PDF page to an image for OCR processing
 */
async function renderPageToImage(
	file: File,
	pageNumber: number,
	scale: number = 2
): Promise<HTMLCanvasElement> {
	// Dynamic import of pdfjs-dist
	const pdfjsLib = await import('pdfjs-dist');
	
	// Set worker
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
		viewport: viewport,
	}).promise;
	
	return canvas;
}

/**
 * Perform OCR on a single page
 */
async function ocrPage(
	worker: any,
	canvas: HTMLCanvasElement,
	pageNumber: number
): Promise<OcrPageResult> {
	const result = await worker.recognize(canvas);
	
	return {
		pageNumber,
		text: result.data.text,
		confidence: result.data.confidence,
		wordCount: result.data.words?.length || 0,
	};
}

/**
 * Perform OCR on entire PDF
 */
export async function performOcr(
	file: File,
	settings: OcrSettings,
	onProgress?: (progress: number, currentPage?: number) => void
): Promise<OcrPageResult[]> {
	onProgress?.(5);
	
	// Initialize Tesseract with selected languages
	const worker = await initTesseract(settings.languages);
	tesseractWorker = worker;
	
	onProgress?.(15);
	
	// Get page count
	const pdfjsLib = await import('pdfjs-dist');
	pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
	
	const arrayBuffer = await file.arrayBuffer();
	const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
	const totalPages = pdf.numPages;
	
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
	
	const results: OcrPageResult[] = [];
	const baseProgress = 15;
	const progressPerPage = 80 / pagesToProcess.length;
	
	for (let i = 0; i < pagesToProcess.length; i++) {
		const pageNum = pagesToProcess[i];
		onProgress?.(baseProgress + i * progressPerPage, pageNum);
		
		try {
			// Render page to canvas
			const canvas = await renderPageToImage(file, pageNum, 2);
			
			// Apply preprocessing if enabled
			if (settings.enhanceScans) {
				enhanceCanvas(canvas);
			}
			
			// Perform OCR
			const result = await ocrPage(worker, canvas, pageNum);
			results.push(result);
		} catch (error) {
			console.error(`OCR failed for page ${pageNum}:`, error);
			results.push({
				pageNumber: pageNum,
				text: '',
				confidence: 0,
				wordCount: 0,
			});
		}
	}
	
	// Cleanup worker
	await worker.terminate();
	tesseractWorker = null;
	
	onProgress?.(100);
	
	return results;
}

/**
 * Enhance canvas for better OCR results
 */
function enhanceCanvas(canvas: HTMLCanvasElement): void {
	const ctx = canvas.getContext('2d')!;
	const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
	const data = imageData.data;
	
	// Convert to grayscale and increase contrast
	for (let i = 0; i < data.length; i += 4) {
		const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
		
		// Apply threshold for better OCR
		const enhanced = gray > 128 ? 255 : 0;
		
		data[i] = enhanced;
		data[i + 1] = enhanced;
		data[i + 2] = enhanced;
	}
	
	ctx.putImageData(imageData, 0, 0);
}

/**
 * Create a searchable PDF with OCR text layer
 */
export async function createSearchablePdf(
	file: File,
	ocrResults: OcrPageResult[],
	onProgress?: (progress: number) => void
): Promise<Blob> {
	onProgress?.(10);
	
	const arrayBuffer = await file.arrayBuffer();
	const pdfDoc = await PDFDocument.load(arrayBuffer);
	const pages = pdfDoc.getPages();
	const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
	
	onProgress?.(30);
	
	// Add invisible text layer to each page
	for (const result of ocrResults) {
		const page = pages[result.pageNumber - 1];
		if (!page || !result.text) continue;
		
		// Add text as invisible layer
		// This is a simplified approach - a production implementation
		// would need to position text more precisely based on OCR word positions
		const fontSize = 10;
		const textLines = result.text.split('\n');
		let y = page.getHeight() - 20;
		
		for (const line of textLines) {
			if (y < 20) break;
			
			page.drawText(line, {
				x: 20,
				y,
				size: fontSize,
				font,
				color: rgb(1, 1, 1), // White (invisible on white background)
				opacity: 0.01, // Nearly invisible but still searchable
			});
			
			y -= fontSize * 1.2;
		}
	}
	
	onProgress?.(90);
	
	const pdfBytes = await pdfDoc.save();
	
	onProgress?.(100);
	
	return new Blob([pdfBytes], { type: 'application/pdf' });
}

/**
 * Get OCR statistics
 */
export function getOcrStats(results: OcrPageResult[]): {
	totalPages: number;
	totalCharacters: number;
	totalWords: number;
	averageConfidence: number;
	pagesWithText: number;
} {
	const totalPages = results.length;
	let totalCharacters = 0;
	let totalWords = 0;
	let totalConfidence = 0;
	let pagesWithText = 0;
	
	results.forEach(result => {
		totalCharacters += result.text.length;
		totalWords += result.wordCount;
		totalConfidence += result.confidence;
		if (result.text.trim()) pagesWithText++;
	});
	
	return {
		totalPages,
		totalCharacters,
		totalWords,
		averageConfidence: totalPages > 0 ? totalConfidence / totalPages : 0,
		pagesWithText,
	};
}

/**
 * Cancel ongoing OCR operation
 */
export async function cancelOcr(): Promise<void> {
	if (tesseractWorker) {
		await tesseractWorker.terminate();
		tesseractWorker = null;
	}
}
