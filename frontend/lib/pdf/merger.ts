import { MergeTask, MergeFile } from '@/types';

// Store PDF blobs in memory to prevent them from being garbage collected
const mergeBlobStore = new Map<string, Blob>();

export interface MergeResult {
	success: boolean;
	downloadUrl?: string;
	error?: string;
	blobKey?: string;
	pageCount?: number;
}

export async function mergePDFs(
	files: MergeFile[],
	outputFileName: string
): Promise<MergeResult> {
	try {
		const formData = new FormData();
		
		// Add each file with its order
		files.forEach((mergeFile, index) => {
			formData.append(`file_${index}`, mergeFile.file);
			formData.append(`order_${index}`, mergeFile.order.toString());
		});
		
		formData.append('fileCount', files.length.toString());
		formData.append('outputFileName', outputFileName);

		const response = await fetch('/api/merge-pdf', {
			method: 'POST',
			body: formData,
		});

		if (!response.ok) {
			const error = await response.json();
			return {
				success: false,
				error: error.error || 'Failed to merge PDFs',
			};
		}

		// Get the blob and store it persistently
		const blob = await response.blob();
		const blobKey = `merge_${outputFileName}_${Date.now()}`;

		// Store the blob in our persistent store
		mergeBlobStore.set(blobKey, blob);

		// Create a blob URL for download
		const downloadUrl = URL.createObjectURL(blob);

		// Get page count from header if available
		const pageCountHeader = response.headers.get('X-Page-Count');
		const pageCount = pageCountHeader ? parseInt(pageCountHeader) : undefined;

		return {
			success: true,
			downloadUrl,
			blobKey,
			pageCount,
		};
	} catch (error) {
		console.error('PDF merge error:', error);
		return {
			success: false,
			error: 'Network error occurred',
		};
	}
}

export function downloadFile(url: string, fileName: string): void {
	const link = document.createElement('a');
	link.href = url;
	link.download = fileName;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}

// Cleanup blob URLs to prevent memory leaks
export function cleanupMergeBlobUrl(url: string): void {
	if (url.startsWith('blob:')) {
		URL.revokeObjectURL(url);
	}
}

// Cleanup blob store entry
export function cleanupMergeBlobStoreEntry(blobKey: string): void {
	if (mergeBlobStore.has(blobKey)) {
		mergeBlobStore.delete(blobKey);
		console.log(`Cleaned up merge blob store entry: ${blobKey}`);
	}
}

// Get blob store size for debugging
export function getMergeBlobStoreSize(): number {
	return mergeBlobStore.size;
}

// Clear all blob store entries (for debugging or cleanup)
export function clearMergeBlobStore(): void {
	mergeBlobStore.clear();
	console.log('Cleared all merge blob store entries');
}
