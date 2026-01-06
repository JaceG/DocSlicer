/**
 * PDF Metadata Editor Library
 * 
 * Provides functionality to read and edit PDF metadata:
 * - Title, Author, Subject, Keywords
 * - Creator, Producer
 * - Creation/Modification dates
 * - Custom metadata fields
 */

import { PDFDocument } from 'pdf-lib';
import { PdfMetadata } from '@/types';

/**
 * Read metadata from a PDF file
 */
export async function readMetadata(file: File): Promise<PdfMetadata> {
	const arrayBuffer = await file.arrayBuffer();
	const pdfDoc = await PDFDocument.load(arrayBuffer);
	
	const title = pdfDoc.getTitle() || '';
	const author = pdfDoc.getAuthor() || '';
	const subject = pdfDoc.getSubject() || '';
	const keywordsStr = pdfDoc.getKeywords() || '';
	const creator = pdfDoc.getCreator() || '';
	const producer = pdfDoc.getProducer() || '';
	const creationDate = pdfDoc.getCreationDate();
	const modificationDate = pdfDoc.getModificationDate();
	
	// Parse keywords (usually comma or semicolon separated)
	const keywords = keywordsStr
		.split(/[,;]/)
		.map(k => k.trim())
		.filter(k => k.length > 0);
	
	// Try to extract custom metadata from info dict
	const customFields: Array<{ key: string; value: string }> = [];
	
	// Note: pdf-lib doesn't expose all custom fields easily
	// In a production app, you might need to parse the raw PDF info dictionary
	
	return {
		title,
		author,
		subject,
		keywords,
		creator,
		producer,
		creationDate,
		modificationDate,
		customFields,
	};
}

/**
 * Write metadata to a PDF file
 */
export async function writeMetadata(
	file: File,
	metadata: PdfMetadata,
	onProgress?: (progress: number) => void
): Promise<Blob> {
	onProgress?.(10);
	
	const arrayBuffer = await file.arrayBuffer();
	const pdfDoc = await PDFDocument.load(arrayBuffer);
	
	onProgress?.(30);
	
	// Set standard metadata fields
	if (metadata.title !== undefined) {
		pdfDoc.setTitle(metadata.title);
	}
	
	if (metadata.author !== undefined) {
		pdfDoc.setAuthor(metadata.author);
	}
	
	if (metadata.subject !== undefined) {
		pdfDoc.setSubject(metadata.subject);
	}
	
	if (metadata.keywords !== undefined) {
		pdfDoc.setKeywords(metadata.keywords);
	}
	
	if (metadata.creator !== undefined) {
		pdfDoc.setCreator(metadata.creator);
	}
	
	if (metadata.producer !== undefined) {
		pdfDoc.setProducer(metadata.producer);
	}
	
	// Set dates if provided
	if (metadata.creationDate) {
		pdfDoc.setCreationDate(metadata.creationDate);
	}
	
	if (metadata.modificationDate) {
		pdfDoc.setModificationDate(metadata.modificationDate);
	} else {
		// Update modification date to now
		pdfDoc.setModificationDate(new Date());
	}
	
	onProgress?.(70);
	
	// Note: Custom fields would require lower-level PDF manipulation
	// pdf-lib's setCustomMetadata could be used if available
	
	const pdfBytes = await pdfDoc.save();
	
	onProgress?.(100);
	
	return new Blob([pdfBytes], { type: 'application/pdf' });
}

/**
 * Remove all metadata from a PDF
 */
export async function removeMetadata(
	file: File,
	onProgress?: (progress: number) => void
): Promise<Blob> {
	onProgress?.(10);
	
	const arrayBuffer = await file.arrayBuffer();
	const pdfDoc = await PDFDocument.load(arrayBuffer);
	
	onProgress?.(30);
	
	// Clear all standard metadata
	pdfDoc.setTitle('');
	pdfDoc.setAuthor('');
	pdfDoc.setSubject('');
	pdfDoc.setKeywords([]);
	pdfDoc.setCreator('');
	pdfDoc.setProducer('');
	
	onProgress?.(70);
	
	const pdfBytes = await pdfDoc.save();
	
	onProgress?.(100);
	
	return new Blob([pdfBytes], { type: 'application/pdf' });
}

/**
 * Copy metadata from one PDF to another
 */
export async function copyMetadata(
	sourceFile: File,
	targetFile: File,
	onProgress?: (progress: number) => void
): Promise<Blob> {
	onProgress?.(10);
	
	// Read source metadata
	const sourceMetadata = await readMetadata(sourceFile);
	
	onProgress?.(40);
	
	// Apply to target
	return writeMetadata(targetFile, sourceMetadata, (p) => {
		onProgress?.(40 + p * 0.6);
	});
}

/**
 * Get metadata as formatted text for display
 */
export function formatMetadataForDisplay(metadata: PdfMetadata): string {
	const lines: string[] = [];
	
	if (metadata.title) {
		lines.push(`Title: ${metadata.title}`);
	}
	if (metadata.author) {
		lines.push(`Author: ${metadata.author}`);
	}
	if (metadata.subject) {
		lines.push(`Subject: ${metadata.subject}`);
	}
	if (metadata.keywords.length > 0) {
		lines.push(`Keywords: ${metadata.keywords.join(', ')}`);
	}
	if (metadata.creator) {
		lines.push(`Creator: ${metadata.creator}`);
	}
	if (metadata.producer) {
		lines.push(`Producer: ${metadata.producer}`);
	}
	if (metadata.creationDate) {
		lines.push(`Created: ${metadata.creationDate.toLocaleString()}`);
	}
	if (metadata.modificationDate) {
		lines.push(`Modified: ${metadata.modificationDate.toLocaleString()}`);
	}
	
	metadata.customFields.forEach(field => {
		lines.push(`${field.key}: ${field.value}`);
	});
	
	return lines.join('\n');
}

/**
 * Validate metadata values
 */
export function validateMetadata(metadata: Partial<PdfMetadata>): {
	valid: boolean;
	errors: string[];
} {
	const errors: string[] = [];
	
	// Check for excessively long values
	if (metadata.title && metadata.title.length > 500) {
		errors.push('Title is too long (max 500 characters)');
	}
	
	if (metadata.author && metadata.author.length > 200) {
		errors.push('Author is too long (max 200 characters)');
	}
	
	if (metadata.subject && metadata.subject.length > 1000) {
		errors.push('Subject is too long (max 1000 characters)');
	}
	
	if (metadata.keywords && metadata.keywords.length > 50) {
		errors.push('Too many keywords (max 50)');
	}
	
	// Check for invalid characters (control characters)
	const hasControlChars = (str: string) => /[\x00-\x1F\x7F]/.test(str);
	
	if (metadata.title && hasControlChars(metadata.title)) {
		errors.push('Title contains invalid characters');
	}
	
	if (metadata.author && hasControlChars(metadata.author)) {
		errors.push('Author contains invalid characters');
	}
	
	return {
		valid: errors.length === 0,
		errors,
	};
}

/**
 * Common metadata presets
 */
export const METADATA_PRESETS = {
	clear: {
		title: '',
		author: '',
		subject: '',
		keywords: [] as string[],
		creator: '',
		producer: '',
		customFields: [] as Array<{ key: string; value: string }>,
	},
	minimal: {
		creator: 'PDF Slicer',
		producer: 'PDF Slicer',
	},
};
