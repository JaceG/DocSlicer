import { FileType } from '@/types';

export function getFileType(file: File): FileType | null {
	const extension = file.name.split('.').pop()?.toLowerCase();
	const mimeType = file.type.toLowerCase();

	if (extension === 'pdf' || mimeType === 'application/pdf') {
		return 'pdf';
	}

	if (extension === 'epub' || mimeType === 'application/epub+zip') {
		return 'epub';
	}

	return null;
}

export function formatFileSize(bytes: number): string {
	if (bytes === 0) return '0 Bytes';

	const k = 1024;
	const sizes = ['Bytes', 'KB', 'MB', 'GB'];
	const i = Math.floor(Math.log(bytes) / Math.log(k));

	return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export function validateFile(file: File): { valid: boolean; error?: string } {
	const maxSize = 100 * 1024 * 1024; // 100MB

	if (file.size > maxSize) {
		return { valid: false, error: 'File size exceeds 100MB limit' };
	}

	const fileType = getFileType(file);
	if (!fileType) {
		return {
			valid: false,
			error: 'Invalid file type. Only PDF and EPUB files are supported',
		};
	}

	return { valid: true };
}

export function generateFileId(): string {
	return `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
