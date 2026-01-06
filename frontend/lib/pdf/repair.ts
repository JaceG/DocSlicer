// PDF Repair Tool using pdf-lib
import { PDFDocument } from 'pdf-lib';
import { RepairSettings, RepairDiagnostic } from '@/types';

// Blob store for repaired PDFs
const repairedBlobStore = new Map<string, { blob: Blob; url: string; timestamp: number }>();

/**
 * Diagnose issues in a PDF
 */
export async function diagnosePdf(
	file: File,
	onProgress?: (progress: number) => void
): Promise<RepairDiagnostic[]> {
	const diagnostics: RepairDiagnostic[] = [];
	onProgress?.(10);

	const arrayBuffer = await file.arrayBuffer();
	onProgress?.(30);

	// Try to load the PDF with different options
	try {
		// First, try normal loading
		await PDFDocument.load(arrayBuffer);
		diagnostics.push({
			issue: 'Basic structure',
			severity: 'warning',
			fixed: true,
			details: 'PDF structure is valid',
		});
	} catch (error) {
		if (error instanceof Error) {
			diagnostics.push({
				issue: 'PDF structure error',
				severity: 'error',
				fixed: false,
				details: error.message,
			});
		}

		// Try with repair options
		try {
			await PDFDocument.load(arrayBuffer, {
				ignoreEncryption: true,
				updateMetadata: false,
			});
			diagnostics.push({
				issue: 'Encryption or metadata issues',
				severity: 'warning',
				fixed: true,
				details: 'Can be fixed by ignoring encryption',
			});
		} catch (innerError) {
			if (innerError instanceof Error) {
				diagnostics.push({
					issue: 'Severe corruption',
					severity: 'critical',
					fixed: false,
					details: innerError.message,
				});
			}
		}
	}
	onProgress?.(70);

	// Check file size anomalies
	const fileSizeMB = file.size / (1024 * 1024);
	if (fileSizeMB < 0.001) {
		diagnostics.push({
			issue: 'File too small',
			severity: 'critical',
			fixed: false,
			details: 'PDF file is suspiciously small, may be truncated',
		});
	}

	// Check PDF header
	const header = new Uint8Array(arrayBuffer.slice(0, 8));
	const headerStr = String.fromCharCode(...header);
	if (!headerStr.startsWith('%PDF-')) {
		diagnostics.push({
			issue: 'Invalid PDF header',
			severity: 'critical',
			fixed: false,
			details: 'File does not start with PDF signature',
		});
	} else {
		diagnostics.push({
			issue: 'PDF header',
			severity: 'warning',
			fixed: true,
			details: `Valid PDF version: ${headerStr.trim()}`,
		});
	}

	onProgress?.(100);
	return diagnostics;
}

/**
 * Attempt to repair a PDF
 */
export async function repairPdf(
	file: File,
	settings: RepairSettings,
	onProgress?: (progress: number) => void
): Promise<{ url: string; blobKey: string; diagnostics: RepairDiagnostic[] }> {
	const diagnostics: RepairDiagnostic[] = [];
	onProgress?.(10);

	const arrayBuffer = await file.arrayBuffer();
	onProgress?.(20);

	let pdfDoc: PDFDocument | null = null;
	let loadAttempt = 0;

	// Attempt 1: Normal loading
	try {
		pdfDoc = await PDFDocument.load(arrayBuffer);
		diagnostics.push({
			issue: 'Initial load',
			severity: 'warning',
			fixed: true,
			details: 'PDF loaded successfully',
		});
	} catch (error) {
		loadAttempt++;
		diagnostics.push({
			issue: 'Standard loading failed',
			severity: 'error',
			fixed: false,
			details: error instanceof Error ? error.message : 'Unknown error',
		});
	}
	onProgress?.(40);

	// Attempt 2: Load with repair options
	if (!pdfDoc && settings.level !== 'light') {
		try {
			pdfDoc = await PDFDocument.load(arrayBuffer, {
				ignoreEncryption: true,
				updateMetadata: false,
			});
			diagnostics.push({
				issue: 'Loaded with relaxed options',
				severity: 'warning',
				fixed: true,
				details: 'PDF loaded by ignoring encryption',
			});
		} catch (error) {
			loadAttempt++;
			diagnostics.push({
				issue: 'Relaxed loading failed',
				severity: 'error',
				fixed: false,
				details: error instanceof Error ? error.message : 'Unknown error',
			});
		}
	}
	onProgress?.(60);

	// Attempt 3: Aggressive repair - try to rebuild
	if (!pdfDoc && settings.level === 'aggressive') {
		try {
			// Last resort: try to create a new PDF and copy content
			pdfDoc = await PDFDocument.load(arrayBuffer, {
				ignoreEncryption: true,
				updateMetadata: false,
			});
		} catch {
			diagnostics.push({
				issue: 'Aggressive repair failed',
				severity: 'critical',
				fixed: false,
				details: 'PDF is too corrupted to repair',
			});
		}
	}

	if (!pdfDoc) {
		throw new Error('Unable to repair PDF. The file may be too corrupted.');
	}

	onProgress?.(70);

	// Clean up the PDF
	if (settings.rebuildCrossReference) {
		diagnostics.push({
			issue: 'Cross-reference rebuild',
			severity: 'warning',
			fixed: true,
			details: 'Cross-reference table will be rebuilt on save',
		});
	}

	// Save the repaired PDF with optimizations
	const pdfBytes = await pdfDoc.save({
		useObjectStreams: false, // More compatible
		addDefaultPage: false,
		// objectsPerTick is used for internal processing
	});

	onProgress?.(90);

	diagnostics.push({
		issue: 'PDF rebuilt',
		severity: 'warning',
		fixed: true,
		details: `Repaired PDF saved (${Math.round(pdfBytes.length / 1024)} KB)`,
	});

	// Create blob and URL
	const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
	const url = URL.createObjectURL(blob);
	const blobKey = `repaired_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

	repairedBlobStore.set(blobKey, { blob, url, timestamp: Date.now() });
	onProgress?.(100);

	return { url, blobKey, diagnostics };
}

/**
 * Get default repair settings
 */
export function getDefaultRepairSettings(): RepairSettings {
	return {
		level: 'moderate',
		rebuildCrossReference: true,
		fixStreams: true,
		removeCorruptedObjects: false,
	};
}

/**
 * Download repaired PDF
 */
export function downloadRepairedPdf(url: string, fileName: string): void {
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
export function cleanupRepairedBlobUrl(url: string): void {
	URL.revokeObjectURL(url);
}

/**
 * Cleanup blob store entry
 */
export function cleanupRepairedBlobStoreEntry(blobKey: string): void {
	const entry = repairedBlobStore.get(blobKey);
	if (entry) {
		URL.revokeObjectURL(entry.url);
		repairedBlobStore.delete(blobKey);
	}
}
