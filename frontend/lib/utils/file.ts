import { FileType } from '@/types';
import { SECURITY_CONFIG, SecurityValidator } from '@/lib/security/config';

// File type detection for PDF files only
export function getFileType(file: File): FileType | null {
	const mimeType = file.type.toLowerCase();
	const fileName = file.name.toLowerCase();

	// Check by MIME type first
	if (mimeType === 'application/pdf') {
		return 'pdf';
	}

	// Fallback to file extension
	const extension = fileName.slice(fileName.lastIndexOf('.'));
	if (extension === '.pdf') {
		return 'pdf';
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

// Enhanced file validation with security checks
export function validateFile(file: File): {
	valid: boolean;
	error?: string;
	errorCode?: string;
} {
	// Use security validator for comprehensive validation
	const securityResult = SecurityValidator.validateFile(file);
	if (!securityResult.valid) {
		return {
			valid: false,
			error: securityResult.error,
			errorCode: Object.keys(SECURITY_CONFIG.ERRORS).find(
				(key) =>
					SECURITY_CONFIG.ERRORS[
						key as keyof typeof SECURITY_CONFIG.ERRORS
					] === securityResult.error
			),
		};
	}

	// Additional file content validation
	if (file.size === 0) {
		return {
			valid: false,
			error: 'File appears to be empty',
			errorCode: 'CORRUPTED_FILE',
		};
	}

	// Check for suspicious file names
	const suspiciousPatterns = [
		/\.(exe|bat|cmd|scr|vbs|js|jar)$/i, // Executable extensions
		/[<>:"|?*]/, // Invalid filename characters
		/\.\./, // Directory traversal
	];

	for (const pattern of suspiciousPatterns) {
		if (pattern.test(file.name)) {
			return {
				valid: false,
				error: 'Invalid filename detected',
				errorCode: 'INVALID_FILE_TYPE',
			};
		}
	}

	return { valid: true };
}

// Rate limiting validation
export function validateUploadRate(): {
	allowed: boolean;
	error?: string;
	errorCode?: string;
} {
	const rateResult = SecurityValidator.checkUploadRateLimit();
	if (!rateResult.allowed) {
		return {
			allowed: false,
			error: rateResult.error,
			errorCode: 'RATE_LIMIT_EXCEEDED',
		};
	}
	return { allowed: true };
}

// Slice rate limiting validation
export function validateSliceRate(): {
	allowed: boolean;
	error?: string;
	errorCode?: string;
} {
	const rateResult = SecurityValidator.checkSliceRateLimit();
	if (!rateResult.allowed) {
		return {
			allowed: false,
			error: rateResult.error,
			errorCode: 'RATE_LIMIT_EXCEEDED',
		};
	}
	return { allowed: true };
}

export function generateFileId(): string {
	return `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
