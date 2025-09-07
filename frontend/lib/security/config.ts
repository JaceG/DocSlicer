// Security configuration for the PDF/EPUB Slicer application
export const SECURITY_CONFIG = {
	// File upload limits
	MAX_FILE_SIZE: 50 * 1024 * 1024, // 50MB
	MAX_FILES_PER_SESSION: 5,

	// Rate limiting
	MAX_UPLOADS_PER_MINUTE: 3,
	MAX_SLICES_PER_MINUTE: 10,
	COOLDOWN_PERIOD_MS: 60 * 1000, // 1 minute

	// Memory limits
	MAX_MEMORY_USAGE_MB: 500, // 500MB total memory for processing
	MAX_CONCURRENT_SLICES: 3,

	// File validation
	ALLOWED_MIME_TYPES: ['application/pdf'],

	ALLOWED_EXTENSIONS: ['.pdf'],

	// Content limits
	MAX_PDF_PAGES: 1000,
	MAX_PAGE_RANGES: 20,

	// Browser storage limits
	MAX_BLOB_STORE_SIZE_MB: 200, // 200MB max for in-memory storage
	MAX_BLOB_STORE_ITEMS: 50,

	// Processing timeouts
	SLICE_TIMEOUT_MS: 30 * 1000, // 30 seconds per slice
	UPLOAD_TIMEOUT_MS: 60 * 1000, // 60 seconds for upload processing

	// Error messages
	ERRORS: {
		FILE_TOO_LARGE:
			'File size exceeds the 50MB limit. Please use a smaller file.',
		INVALID_FILE_TYPE: 'Only PDF files are supported.',
		TOO_MANY_FILES:
			'Maximum 5 files allowed per session. Please refresh to start over.',
		RATE_LIMIT_EXCEEDED:
			'Too many uploads. Please wait before uploading again.',
		MEMORY_LIMIT_EXCEEDED:
			'Memory limit exceeded. Please refresh and try with a smaller file.',
		TOO_MANY_PAGES:
			'Document has too many pages. Maximum 1000 pages supported.',
		TOO_MANY_RANGES: 'Maximum 20 page ranges allowed.',
		SLICE_TIMEOUT:
			'Slicing took too long and was cancelled. Please try a smaller range.',
		CONCURRENT_LIMIT:
			'Too many slices running. Please wait for current slices to complete.',
		BLOB_STORE_FULL:
			'Storage limit reached. Please download and clear existing slices.',
		PROCESSING_ERROR:
			'An error occurred while processing your file. Please try again.',
		CORRUPTED_FILE: 'File appears to be corrupted or damaged.',
		BROWSER_NOT_SUPPORTED:
			'Your browser does not support all required features.',
	},
} as const;

// Type for security error codes
export type SecurityErrorCode = keyof typeof SECURITY_CONFIG.ERRORS;

// Security validation functions
export class SecurityValidator {
	private static uploadTimes: number[] = [];
	private static sliceTimes: number[] = [];
	private static sessionFileCount = 0;
	private static currentMemoryUsage = 0;
	private static activeSources = 0;

	// Validate file before upload
	static validateFile(file: File): { valid: boolean; error?: string } {
		// Check file size
		if (file.size > SECURITY_CONFIG.MAX_FILE_SIZE) {
			return {
				valid: false,
				error: SECURITY_CONFIG.ERRORS.FILE_TOO_LARGE,
			};
		}

		// Check file type by MIME type
		if (!SECURITY_CONFIG.ALLOWED_MIME_TYPES.includes(file.type as any)) {
			return {
				valid: false,
				error: SECURITY_CONFIG.ERRORS.INVALID_FILE_TYPE,
			};
		}

		// Check file extension as additional validation
		const extension = file.name
			.toLowerCase()
			.slice(file.name.lastIndexOf('.'));
		if (!SECURITY_CONFIG.ALLOWED_EXTENSIONS.includes(extension as any)) {
			return {
				valid: false,
				error: SECURITY_CONFIG.ERRORS.INVALID_FILE_TYPE,
			};
		}

		// Check session file count
		if (this.sessionFileCount >= SECURITY_CONFIG.MAX_FILES_PER_SESSION) {
			return {
				valid: false,
				error: SECURITY_CONFIG.ERRORS.TOO_MANY_FILES,
			};
		}

		return { valid: true };
	}

	// Check upload rate limiting
	static checkUploadRateLimit(): { allowed: boolean; error?: string } {
		const now = Date.now();

		// Clean old timestamps
		this.uploadTimes = this.uploadTimes.filter(
			(time) => now - time < SECURITY_CONFIG.COOLDOWN_PERIOD_MS
		);

		if (this.uploadTimes.length >= SECURITY_CONFIG.MAX_UPLOADS_PER_MINUTE) {
			return {
				allowed: false,
				error: SECURITY_CONFIG.ERRORS.RATE_LIMIT_EXCEEDED,
			};
		}

		return { allowed: true };
	}

	// Check slice rate limiting
	static checkSliceRateLimit(): { allowed: boolean; error?: string } {
		const now = Date.now();

		// Clean old timestamps
		this.sliceTimes = this.sliceTimes.filter(
			(time) => now - time < SECURITY_CONFIG.COOLDOWN_PERIOD_MS
		);

		if (this.sliceTimes.length >= SECURITY_CONFIG.MAX_SLICES_PER_MINUTE) {
			return {
				allowed: false,
				error: SECURITY_CONFIG.ERRORS.RATE_LIMIT_EXCEEDED,
			};
		}

		if (this.activeSources >= SECURITY_CONFIG.MAX_CONCURRENT_SLICES) {
			return {
				allowed: false,
				error: SECURITY_CONFIG.ERRORS.CONCURRENT_LIMIT,
			};
		}

		return { allowed: true };
	}

	// Record upload attempt
	static recordUpload(): void {
		this.uploadTimes.push(Date.now());
		this.sessionFileCount++;
	}

	// Record slice attempt
	static recordSlice(): void {
		this.sliceTimes.push(Date.now());
		this.activeSources++;
	}

	// Record slice completion
	static completeSlice(): void {
		this.activeSources = Math.max(0, this.activeSources - 1);
	}

	// Validate document limits
	static validateDocumentLimits(pageCount: number): {
		valid: boolean;
		error?: string;
	} {
		if (pageCount > SECURITY_CONFIG.MAX_PDF_PAGES) {
			return {
				valid: false,
				error: SECURITY_CONFIG.ERRORS.TOO_MANY_PAGES,
			};
		}

		return { valid: true };
	}

	// Validate page range limits
	static validateRangeCount(currentRanges: number): {
		valid: boolean;
		error?: string;
	} {
		if (currentRanges >= SECURITY_CONFIG.MAX_PAGE_RANGES) {
			return {
				valid: false,
				error: SECURITY_CONFIG.ERRORS.TOO_MANY_RANGES,
			};
		}

		return { valid: true };
	}

	// Check memory usage
	static checkMemoryUsage(additionalMB: number = 0): {
		safe: boolean;
		error?: string;
	} {
		const totalUsage = this.currentMemoryUsage + additionalMB;

		if (totalUsage > SECURITY_CONFIG.MAX_MEMORY_USAGE_MB) {
			return {
				safe: false,
				error: SECURITY_CONFIG.ERRORS.MEMORY_LIMIT_EXCEEDED,
			};
		}

		return { safe: true };
	}

	// Update memory usage tracking
	static updateMemoryUsage(deltaMB: number): void {
		this.currentMemoryUsage = Math.max(
			0,
			this.currentMemoryUsage + deltaMB
		);
	}

	// Reset session (for new document)
	static resetSession(): void {
		this.sessionFileCount = 0;
		this.currentMemoryUsage = 0;
		this.activeSources = 0;
	}

	// Get current session stats (for debugging)
	static getSessionStats() {
		return {
			fileCount: this.sessionFileCount,
			memoryUsage: this.currentMemoryUsage,
			activeSources: this.activeSources,
			recentUploads: this.uploadTimes.length,
			recentSlices: this.sliceTimes.length,
		};
	}
}

// Browser capability detection
export function checkBrowserSupport(): {
	supported: boolean;
	missing?: string[];
} {
	// Only run on client-side
	if (typeof window === 'undefined') {
		return { supported: true }; // Assume supported on server
	}

	const missing: string[] = [];

	// Check for required features
	if (!window.File) missing.push('File API');
	if (!window.FileReader) missing.push('FileReader API');
	if (!window.URL || !window.URL.createObjectURL) missing.push('URL API');
	if (!window.Worker) missing.push('Web Workers');
	if (!window.crypto || !window.crypto.getRandomValues)
		missing.push('Crypto API');

	// Check for modern JS features
	try {
		eval('async () => {}');
	} catch (e) {
		missing.push('Async/Await');
	}

	try {
		eval('new Map()');
	} catch (e) {
		missing.push('ES6 Map');
	}

	return {
		supported: missing.length === 0,
		missing: missing.length > 0 ? missing : undefined,
	};
}
