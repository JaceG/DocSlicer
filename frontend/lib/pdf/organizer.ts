/**
 * PDF Organizer Library
 * Handles page rotation, deletion, and reordering
 * All processing uses pdf-lib for manipulation
 */

import { OrganizeFile, PageInfo, RotationDegrees } from '@/types';
import { degrees, PDFDocument } from 'pdf-lib';

// Store PDF blobs in memory
const blobStore = new Map<string, Blob>();

export interface OrganizeResult {
	success: boolean;
	downloadUrl?: string;
	blobKey?: string;
	pageCount?: number;
	error?: string;
}

/**
 * Rotate a page by specified degrees
 */
export function rotatePageInfo(page: PageInfo, direction: 'cw' | 'ccw'): PageInfo {
	const rotations: RotationDegrees[] = [0, 90, 180, 270];
	const currentIndex = rotations.indexOf(page.rotation);
	const newIndex = direction === 'cw' 
		? (currentIndex + 1) % 4 
		: (currentIndex - 1 + 4) % 4;
	
	return {
		...page,
		rotation: rotations[newIndex],
	};
}

/**
 * Toggle page deletion state
 */
export function togglePageDeletion(page: PageInfo): PageInfo {
	return {
		...page,
		deleted: !page.deleted,
	};
}

/**
 * Reorder pages by moving a page from one index to another
 */
export function reorderPages(pages: PageInfo[], fromIndex: number, toIndex: number): PageInfo[] {
	const result = [...pages];
	const [removed] = result.splice(fromIndex, 1);
	result.splice(toIndex, 0, removed);
	return result;
}

/**
 * Apply all organize operations and create a new PDF
 */
export async function applyOrganizeOperations(
	file: File,
	pages: PageInfo[],
	outputFileName: string,
	onProgress?: (progress: number) => void
): Promise<OrganizeResult> {
	try {
		onProgress?.(10);

		// Load the source PDF
		const arrayBuffer = await file.arrayBuffer();
		const sourcePdf = await PDFDocument.load(arrayBuffer, {
			ignoreEncryption: true,
		});

		onProgress?.(30);

		// Create a new PDF
		const newPdf = await PDFDocument.create();

		// Filter out deleted pages and get the ones to keep
		const pagesToKeep = pages.filter(p => !p.deleted);
		
		if (pagesToKeep.length === 0) {
			return {
				success: false,
				error: 'Cannot create PDF with no pages. At least one page must remain.',
			};
		}

		onProgress?.(40);

		// Copy pages in the new order with rotations applied
		for (let i = 0; i < pagesToKeep.length; i++) {
			const pageInfo = pagesToKeep[i];
			// pageNumber is 1-indexed, pdf-lib uses 0-indexed
			const [copiedPage] = await newPdf.copyPages(sourcePdf, [pageInfo.pageNumber - 1]);
			
			// Apply rotation if needed
			if (pageInfo.rotation !== 0) {
				const currentRotation = copiedPage.getRotation().angle;
				copiedPage.setRotation(degrees(currentRotation + pageInfo.rotation));
			}
			
			newPdf.addPage(copiedPage);
			
			onProgress?.(40 + Math.round((i / pagesToKeep.length) * 40));
		}

		onProgress?.(80);

		// Save the PDF
		const pdfBytes = await newPdf.save();

		onProgress?.(90);

		// Create blob and URL
		const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
		const blobKey = `organize_${outputFileName}_${Date.now()}`;
		blobStore.set(blobKey, blob);

		const downloadUrl = URL.createObjectURL(blob);

		onProgress?.(100);

		return {
			success: true,
			downloadUrl,
			blobKey,
			pageCount: pagesToKeep.length,
		};
	} catch (error) {
		console.error('PDF organize error:', error);
		return {
			success: false,
			error: error instanceof Error ? error.message : 'Failed to organize PDF',
		};
	}
}

/**
 * Rotate specific pages in a PDF
 */
export async function rotatePdfPages(
	file: File,
	pageRotations: Map<number, RotationDegrees>,
	outputFileName: string,
	onProgress?: (progress: number) => void
): Promise<OrganizeResult> {
	try {
		onProgress?.(10);

		const arrayBuffer = await file.arrayBuffer();
		const pdfDoc = await PDFDocument.load(arrayBuffer, {
			ignoreEncryption: true,
		});

		onProgress?.(40);

		const pages = pdfDoc.getPages();
		
		pageRotations.forEach((rotation, pageNumber) => {
			const page = pages[pageNumber - 1]; // Convert to 0-indexed
			if (page && rotation !== 0) {
				const currentRotation = page.getRotation().angle;
				page.setRotation(degrees(currentRotation + rotation));
			}
		});

		onProgress?.(70);

		const pdfBytes = await pdfDoc.save();
		const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
		const blobKey = `rotate_${outputFileName}_${Date.now()}`;
		blobStore.set(blobKey, blob);

		const downloadUrl = URL.createObjectURL(blob);

		onProgress?.(100);

		return {
			success: true,
			downloadUrl,
			blobKey,
			pageCount: pages.length,
		};
	} catch (error) {
		console.error('PDF rotation error:', error);
		return {
			success: false,
			error: error instanceof Error ? error.message : 'Failed to rotate PDF pages',
		};
	}
}

/**
 * Delete specific pages from a PDF
 */
export async function deletePdfPages(
	file: File,
	pagesToDelete: number[], // 1-indexed page numbers
	outputFileName: string,
	onProgress?: (progress: number) => void
): Promise<OrganizeResult> {
	try {
		onProgress?.(10);

		const arrayBuffer = await file.arrayBuffer();
		const sourcePdf = await PDFDocument.load(arrayBuffer, {
			ignoreEncryption: true,
		});

		const totalPages = sourcePdf.getPageCount();
		const pagesToKeep = [];
		
		for (let i = 1; i <= totalPages; i++) {
			if (!pagesToDelete.includes(i)) {
				pagesToKeep.push(i - 1); // Convert to 0-indexed
			}
		}

		if (pagesToKeep.length === 0) {
			return {
				success: false,
				error: 'Cannot delete all pages. At least one page must remain.',
			};
		}

		onProgress?.(30);

		const newPdf = await PDFDocument.create();
		const copiedPages = await newPdf.copyPages(sourcePdf, pagesToKeep);
		copiedPages.forEach(page => newPdf.addPage(page));

		onProgress?.(70);

		const pdfBytes = await newPdf.save();
		const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
		const blobKey = `delete_${outputFileName}_${Date.now()}`;
		blobStore.set(blobKey, blob);

		const downloadUrl = URL.createObjectURL(blob);

		onProgress?.(100);

		return {
			success: true,
			downloadUrl,
			blobKey,
			pageCount: pagesToKeep.length,
		};
	} catch (error) {
		console.error('PDF deletion error:', error);
		return {
			success: false,
			error: error instanceof Error ? error.message : 'Failed to delete PDF pages',
		};
	}
}

/**
 * Reorder pages in a PDF
 */
export async function reorderPdfPages(
	file: File,
	newOrder: number[], // Array of 1-indexed page numbers in new order
	outputFileName: string,
	onProgress?: (progress: number) => void
): Promise<OrganizeResult> {
	try {
		onProgress?.(10);

		const arrayBuffer = await file.arrayBuffer();
		const sourcePdf = await PDFDocument.load(arrayBuffer, {
			ignoreEncryption: true,
		});

		onProgress?.(30);

		const newPdf = await PDFDocument.create();
		
		// Convert to 0-indexed for pdf-lib
		const zeroIndexedOrder = newOrder.map(p => p - 1);
		const copiedPages = await newPdf.copyPages(sourcePdf, zeroIndexedOrder);
		copiedPages.forEach(page => newPdf.addPage(page));

		onProgress?.(70);

		const pdfBytes = await newPdf.save();
		const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
		const blobKey = `reorder_${outputFileName}_${Date.now()}`;
		blobStore.set(blobKey, blob);

		const downloadUrl = URL.createObjectURL(blob);

		onProgress?.(100);

		return {
			success: true,
			downloadUrl,
			blobKey,
			pageCount: newOrder.length,
		};
	} catch (error) {
		console.error('PDF reorder error:', error);
		return {
			success: false,
			error: error instanceof Error ? error.message : 'Failed to reorder PDF pages',
		};
	}
}

// Blob cleanup utilities
export function downloadFile(url: string, fileName: string): void {
	const link = document.createElement('a');
	link.href = url;
	link.download = fileName;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}

export function cleanupOrganizeBlobUrl(url: string): void {
	if (url.startsWith('blob:')) {
		URL.revokeObjectURL(url);
	}
}

export function cleanupOrganizeBlobStoreEntry(blobKey: string): void {
	if (blobStore.has(blobKey)) {
		blobStore.delete(blobKey);
	}
}
