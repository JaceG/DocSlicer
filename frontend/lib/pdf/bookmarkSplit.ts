// PDF Split by Bookmarks using pdf-lib and pdfjs-dist
import { PDFDocument } from 'pdf-lib';
import { PdfBookmark, BookmarkSplitSettings } from '@/types';
import JSZip from 'jszip';

// Blob store for split PDFs
const bookmarkSplitBlobStore = new Map<string, { blob: Blob; url: string; timestamp: number }>();

/**
 * Extract bookmarks from a PDF using pdfjs-dist
 * Returns a flat list of bookmarks with page numbers
 */
export async function extractBookmarks(file: File): Promise<PdfBookmark[]> {
	// Dynamically import pdfjs-dist to avoid SSR issues
	const pdfjsLib = await import('pdfjs-dist');
	
	// Set worker
	pdfjsLib.GlobalWorkerOptions.workerSrc = 
		'https://unpkg.com/pdfjs-dist@4.0.379/build/pdf.worker.min.mjs';

	const arrayBuffer = await file.arrayBuffer();
	const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
	const pdfDocument = await loadingTask.promise;

	const outline = await pdfDocument.getOutline();
	if (!outline || outline.length === 0) {
		return [];
	}

	const bookmarks: PdfBookmark[] = [];

	// Recursive function to process outline items
	async function processOutlineItem(
		item: any, 
		level: number
	): Promise<PdfBookmark | null> {
		let pageNumber = 1;

		if (item.dest) {
			try {
				let dest = item.dest;
				if (typeof dest === 'string') {
					dest = await pdfDocument.getDestination(dest);
				}
				if (dest && dest[0]) {
					const pageRef = dest[0];
					const pageIndex = await pdfDocument.getPageIndex(pageRef);
					pageNumber = pageIndex + 1;
				}
			} catch {
				// If we can't resolve the destination, use page 1
				pageNumber = 1;
			}
		}

		const bookmark: PdfBookmark = {
			title: item.title || 'Untitled',
			pageNumber,
			level,
			children: [],
		};

		if (item.items && item.items.length > 0) {
			for (const child of item.items) {
				const childBookmark = await processOutlineItem(child, level + 1);
				if (childBookmark) {
					bookmark.children!.push(childBookmark);
				}
			}
		}

		return bookmark;
	}

	for (const item of outline) {
		const bookmark = await processOutlineItem(item, 0);
		if (bookmark) {
			bookmarks.push(bookmark);
		}
	}

	return bookmarks;
}

/**
 * Get flat list of bookmarks up to a certain level
 */
export function flattenBookmarks(
	bookmarks: PdfBookmark[], 
	maxLevel: number = 0
): PdfBookmark[] {
	const result: PdfBookmark[] = [];

	function flatten(items: PdfBookmark[]) {
		for (const item of items) {
			if (item.level <= maxLevel) {
				result.push(item);
			}
			if (item.children) {
				flatten(item.children);
			}
		}
	}

	flatten(bookmarks);
	return result.sort((a, b) => a.pageNumber - b.pageNumber);
}

/**
 * Split PDF by bookmarks
 */
export async function splitByBookmarks(
	file: File,
	bookmarks: PdfBookmark[],
	settings: BookmarkSplitSettings,
	totalPages: number,
	onProgress?: (progress: number) => void
): Promise<Array<{ name: string; url: string; pageRange: { start: number; end: number } }>> {
	onProgress?.(10);

	const arrayBuffer = await file.arrayBuffer();
	const sourcePdf = await PDFDocument.load(arrayBuffer);
	onProgress?.(20);

	// Get bookmarks at the specified level
	const flatBookmarks = flattenBookmarks(bookmarks, settings.splitLevel);
	
	if (flatBookmarks.length === 0) {
		throw new Error('No bookmarks found at the specified level');
	}

	const outputFiles: Array<{ name: string; url: string; pageRange: { start: number; end: number } }> = [];

	for (let i = 0; i < flatBookmarks.length; i++) {
		const bookmark = flatBookmarks[i];
		const nextBookmark = flatBookmarks[i + 1];

		const startPage = bookmark.pageNumber;
		const endPage = nextBookmark ? nextBookmark.pageNumber - 1 : totalPages;

		if (startPage > endPage) continue;

		// Create new PDF for this section
		const newPdf = await PDFDocument.create();
		const pages = await newPdf.copyPages(
			sourcePdf,
			Array.from({ length: endPage - startPage + 1 }, (_, idx) => startPage - 1 + idx)
		);

		pages.forEach(page => newPdf.addPage(page));

		const pdfBytes = await newPdf.save();
		const blob = new Blob([pdfBytes], { type: 'application/pdf' });
		const url = URL.createObjectURL(blob);

		// Generate filename based on settings
		let fileName: string;
		const sanitizedTitle = bookmark.title.replace(/[^a-zA-Z0-9\s-]/g, '').trim();
		
		switch (settings.namingPattern) {
			case 'number-title':
				fileName = `${String(i + 1).padStart(2, '0')}_${sanitizedTitle}.pdf`;
				break;
			case 'custom':
				fileName = `${settings.customPrefix || 'section'}_${i + 1}_${sanitizedTitle}.pdf`;
				break;
			case 'title':
			default:
				fileName = `${sanitizedTitle}.pdf`;
				break;
		}

		const blobKey = `bookmark_split_${Date.now()}_${i}`;
		bookmarkSplitBlobStore.set(blobKey, { blob, url, timestamp: Date.now() });

		outputFiles.push({
			name: fileName,
			url,
			pageRange: { start: startPage, end: endPage },
		});

		onProgress?.(20 + ((i + 1) / flatBookmarks.length) * 70);
	}

	onProgress?.(100);
	return outputFiles;
}

/**
 * Create a ZIP file from split PDFs
 */
export async function createZipFromBookmarkSplit(
	files: Array<{ name: string; url: string }>
): Promise<string> {
	const zip = new JSZip();

	for (const file of files) {
		const response = await fetch(file.url);
		const blob = await response.blob();
		zip.file(file.name, blob);
	}

	const zipBlob = await zip.generateAsync({ type: 'blob' });
	return URL.createObjectURL(zipBlob);
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
export function cleanupBookmarkSplitBlobUrl(url: string): void {
	URL.revokeObjectURL(url);
}

/**
 * Cleanup all blob store entries
 */
export function cleanupAllBookmarkSplitBlobs(): void {
	bookmarkSplitBlobStore.forEach((entry) => {
		URL.revokeObjectURL(entry.url);
	});
	bookmarkSplitBlobStore.clear();
}
