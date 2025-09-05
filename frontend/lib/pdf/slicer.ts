import { PageRange, SliceTask } from '@/types';
import JSZip from 'jszip';

// Store PDF blobs in memory to prevent them from being garbage collected
const blobStore = new Map<string, Blob>();

export interface SliceResult {
	success: boolean;
	downloadUrl?: string;
	error?: string;
	blobKey?: string;
}

export async function slicePDF(
	file: File,
	range: PageRange,
	fileName: string
): Promise<SliceResult> {
	try {
		const formData = new FormData();
		formData.append('file', file);
		formData.append('startPage', range.start.toString());
		formData.append('endPage', range.end.toString());
		formData.append('fileName', fileName);

		const response = await fetch('/api/slice-pdf', {
			method: 'POST',
			body: formData,
		});

		if (!response.ok) {
			const error = await response.json();
			return {
				success: false,
				error: error.error || 'Failed to slice PDF',
			};
		}

		// Get the blob and store it persistently
		const blob = await response.blob();
		const blobKey = `${fileName}_${Date.now()}`;

		// Store the blob in our persistent store
		blobStore.set(blobKey, blob);

		// Create a blob URL for download
		const downloadUrl = URL.createObjectURL(blob);

		return {
			success: true,
			downloadUrl,
			blobKey, // Return the key for later retrieval
		};
	} catch (error) {
		console.error('PDF slicing error:', error);
		return {
			success: false,
			error: 'Network error occurred',
		};
	}
}

export async function processSliceTasks(
	file: File,
	tasks: SliceTask[],
	onTaskUpdate: (taskId: string, updates: Partial<SliceTask>) => void
): Promise<void> {
	for (const task of tasks) {
		if (task.status !== 'pending') continue;

		// Update task status to processing
		onTaskUpdate(task.id, { status: 'processing' });

		try {
			const result = await slicePDF(file, task.range, task.fileName);

			if (result.success && result.downloadUrl) {
				onTaskUpdate(task.id, {
					status: 'completed',
					outputUrl: result.downloadUrl,
					blobKey: result.blobKey,
				});
			} else {
				onTaskUpdate(task.id, {
					status: 'error',
					error: result.error || 'Unknown error occurred',
				});
			}
		} catch (error) {
			onTaskUpdate(task.id, {
				status: 'error',
				error: 'Failed to process task',
			});
		}

		// Add a small delay between tasks to prevent overwhelming the server
		await new Promise((resolve) => setTimeout(resolve, 100));
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

// Create a ZIP file from multiple PDF blobs
export async function createZipFromTasks(
	tasks: SliceTask[],
	zipFileName: string
): Promise<string> {
	const zip = new JSZip();

	for (const task of tasks) {
		if (task.blobKey && blobStore.has(task.blobKey)) {
			try {
				// Get the blob from our persistent store
				const blob = blobStore.get(task.blobKey)!;

				// Add the blob to the ZIP with the task's filename
				zip.file(task.fileName, blob);
				console.log(`Added ${task.fileName} to ZIP from blob store`);
			} catch (error) {
				console.warn(
					`Failed to add ${task.fileName} to ZIP from blob store:`,
					error
				);
			}
		} else if (task.outputUrl) {
			try {
				// Fallback: Fetch the blob data from the URL
				const response = await fetch(task.outputUrl);
				const blob = await response.blob();

				// Add the blob to the ZIP with the task's filename
				zip.file(task.fileName, blob);
				console.log(`Added ${task.fileName} to ZIP from URL fallback`);
			} catch (error) {
				console.warn(
					`Failed to add ${task.fileName} to ZIP from URL:`,
					error
				);
			}
		} else {
			console.warn(`No blob or URL available for ${task.fileName}`);
		}
	}

	// Generate the ZIP file
	const zipBlob = await zip.generateAsync({ type: 'blob' });

	// Create a download URL for the ZIP
	return URL.createObjectURL(zipBlob);
}

// Download multiple tasks as a ZIP file
export async function downloadTasksAsZip(
	tasks: SliceTask[],
	baseFileName: string
): Promise<void> {
	try {
		const timestamp = new Date()
			.toISOString()
			.slice(0, 19)
			.replace(/[-:]/g, '');
		const zipFileName = `${baseFileName}_sliced_${timestamp}.zip`;

		const zipUrl = await createZipFromTasks(tasks, zipFileName);
		downloadFile(zipUrl, zipFileName);

		// Cleanup the ZIP URL after a delay
		setTimeout(() => {
			cleanupBlobUrl(zipUrl);
		}, 1000);
	} catch (error) {
		console.error('Failed to create ZIP file:', error);
		throw error;
	}
}

// Cleanup blob URLs to prevent memory leaks
export function cleanupBlobUrl(url: string): void {
	if (url.startsWith('blob:')) {
		URL.revokeObjectURL(url);
	}
}

// Cleanup blob store entry
export function cleanupBlobStoreEntry(blobKey: string): void {
	if (blobStore.has(blobKey)) {
		blobStore.delete(blobKey);
		console.log(`Cleaned up blob store entry: ${blobKey}`);
	}
}

// Get blob store size for debugging
export function getBlobStoreSize(): number {
	return blobStore.size;
}

// Clear all blob store entries (for debugging or cleanup)
export function clearBlobStore(): void {
	blobStore.clear();
	console.log('Cleared all blob store entries');
}
