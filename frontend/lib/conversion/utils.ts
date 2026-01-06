'use client';

import { ConvertibleFileType, SupportedFileType } from '@/types';
import { MIME_TYPE_MAP, EXTENSION_MAP, CONVERSION_WARNINGS } from './types';

// Detect if a file can be converted to PDF
export function detectFileType(file: File): SupportedFileType | null {
	const mimeType = file.type.toLowerCase();
	const fileName = file.name.toLowerCase();
	const extension = fileName.slice(fileName.lastIndexOf('.'));

	// Check if it's already a PDF
	if (mimeType === 'application/pdf' || extension === '.pdf') {
		return 'pdf';
	}

	// Check by MIME type first
	if (mimeType && MIME_TYPE_MAP[mimeType]) {
		return MIME_TYPE_MAP[mimeType];
	}

	// Fallback to extension
	if (extension && EXTENSION_MAP[extension]) {
		return EXTENSION_MAP[extension];
	}

	return null;
}

// Check if file type requires conversion
export function requiresConversion(fileType: SupportedFileType | null): fileType is ConvertibleFileType {
	return fileType !== null && fileType !== 'pdf';
}

// Get warning for file type
export function getConversionWarning(fileType: ConvertibleFileType) {
	return CONVERSION_WARNINGS[fileType];
}
