// PDF Password Removal using pdf-lib
import { PDFDocument } from 'pdf-lib';

// Blob store for unlocked PDFs
const unlockedBlobStore = new Map<string, { blob: Blob; url: string; timestamp: number }>();

/**
 * Remove password protection from a PDF
 * The user must provide the correct password to unlock
 */
export async function unlockPdf(
	file: File,
	password: string,
	onProgress?: (progress: number) => void
): Promise<{ url: string; blobKey: string }> {
	onProgress?.(10);

	const arrayBuffer = await file.arrayBuffer();
	onProgress?.(30);

	try {
		// Try to load with the provided password
		const pdfDoc = await PDFDocument.load(arrayBuffer, {
			password: password,
			ignoreEncryption: false,
		});
		onProgress?.(50);

		// Save without encryption
		const pdfBytes = await pdfDoc.save({
			useObjectStreams: false,
		});
		onProgress?.(80);

		// Create blob and URL
		const blob = new Blob([pdfBytes], { type: 'application/pdf' });
		const url = URL.createObjectURL(blob);
		const blobKey = `unlock_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

		// Store in blob store
		unlockedBlobStore.set(blobKey, { blob, url, timestamp: Date.now() });

		onProgress?.(100);

		return { url, blobKey };
	} catch (error) {
		// Check if it's a password error
		if (error instanceof Error) {
			if (error.message.includes('password') || error.message.includes('encrypted')) {
				throw new Error('Incorrect password. Please try again.');
			}
		}
		throw error;
	}
}

/**
 * Check if a PDF is password protected
 */
export async function isPdfPasswordProtected(file: File): Promise<boolean> {
	try {
		const arrayBuffer = await file.arrayBuffer();
		await PDFDocument.load(arrayBuffer);
		return false; // Loaded successfully without password
	} catch (error) {
		if (error instanceof Error) {
			if (error.message.includes('password') || error.message.includes('encrypted')) {
				return true;
			}
		}
		return false; // Some other error
	}
}

/**
 * Download an unlocked PDF
 */
export function downloadUnlockedPdf(url: string, fileName: string): void {
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
export function cleanupUnlockedBlobUrl(url: string): void {
	URL.revokeObjectURL(url);
}

/**
 * Cleanup blob store entry
 */
export function cleanupUnlockedBlobStoreEntry(blobKey: string): void {
	const entry = unlockedBlobStore.get(blobKey);
	if (entry) {
		URL.revokeObjectURL(entry.url);
		unlockedBlobStore.delete(blobKey);
	}
}

/**
 * Get blob store size
 */
export function getUnlockedBlobStoreSize(): number {
	return unlockedBlobStore.size;
}
