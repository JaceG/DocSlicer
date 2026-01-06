export type FileType = 'pdf';

// File types that can be converted to PDF
export type ConvertibleFileType = 
	| 'epub'
	| 'docx'
	| 'doc'
	| 'txt'
	| 'rtf'
	| 'odt'
	| 'pptx'
	| 'ppt'
	| 'odp'
	| 'html'
	| 'md'
	| 'jpg'
	| 'jpeg'
	| 'png'
	| 'gif'
	| 'webp'
	| 'bmp'
	| 'tiff';

// All supported file types (PDF + convertible)
export type SupportedFileType = FileType | ConvertibleFileType;

export interface UploadedFile {
	id: string;
	name: string;
	type: FileType;
	size: number;
	file: File;
	pageCount?: number;
	url?: string;
	thumbnail?: string;
	convertedFrom?: ConvertibleFileType; // Track if file was converted
}

// Quality warning levels for conversion
export type ConversionQuality = 'excellent' | 'good' | 'fair' | 'poor';

export interface ConversionWarning {
	fileType: ConvertibleFileType;
	quality: ConversionQuality;
	title: string;
	description: string;
	caveats: string[];
}

export interface PageRange {
	id?: string;
	start: number;
	end: number;
	name?: string;
}

export interface SliceTask {
	id: string;
	fileId: string;
	fileName: string;
	range: PageRange;
	status: 'pending' | 'processing' | 'completed' | 'error';
	progress?: number;
	outputUrl?: string;
	blobKey?: string;
	error?: string;
}

export interface ViewerState {
	currentPage: number;
	scale: number;
	totalPages: number;
	selectedPages: Set<number>;
}

// Merge functionality types
export interface MergeFile {
	id: string;
	name: string;
	file: File;
	size: number;
	pageCount?: number;
	order: number;
	thumbnail?: string;
}

export interface MergeTask {
	id: string;
	files: MergeFile[];
	outputFileName: string;
	status: 'pending' | 'processing' | 'completed' | 'error';
	progress?: number;
	outputUrl?: string;
	blobKey?: string;
	error?: string;
	totalPages?: number;
}

// App mode type - expanded for new features
export type AppMode = 'split' | 'merge' | 'compress' | 'organize' | 'images-to-pdf' | 'pdf-to-images' | 'page-numbers';

// Compression functionality types
export type CompressionLevel = 'screen' | 'ebook' | 'printer' | 'prepress';

export interface CompressionSettings {
	level: CompressionLevel;
	imageQuality: number; // 0-100
	removeMetadata: boolean;
	grayscale: boolean;
}

export interface CompressFile {
	id: string;
	name: string;
	file: File;
	size: number;
	pageCount?: number;
	thumbnail?: string;
}

export interface CompressTask {
	id: string;
	file: CompressFile;
	settings: CompressionSettings;
	outputFileName: string;
	status: 'pending' | 'processing' | 'completed' | 'error';
	progress?: number;
	outputUrl?: string;
	blobKey?: string;
	error?: string;
	originalSize: number;
	compressedSize?: number;
	compressionRatio?: number; // Percentage saved
}

// ===== PAGE ORGANIZATION TYPES (Rotate, Delete, Reorder) =====

export type RotationDegrees = 0 | 90 | 180 | 270;

export interface PageInfo {
	pageNumber: number;
	rotation: RotationDegrees;
	deleted: boolean;
	thumbnail?: string;
}

export interface OrganizeFile {
	id: string;
	name: string;
	file: File;
	size: number;
	pageCount: number;
	pages: PageInfo[];
}

export interface OrganizeTask {
	id: string;
	file: OrganizeFile;
	outputFileName: string;
	status: 'pending' | 'processing' | 'completed' | 'error';
	progress?: number;
	outputUrl?: string;
	blobKey?: string;
	error?: string;
	operations: {
		rotations: number;
		deletions: number;
		reorders: number;
	};
}

// ===== IMAGES TO PDF TYPES =====

export interface ImageFile {
	id: string;
	name: string;
	file: File;
	size: number;
	width?: number;
	height?: number;
	order: number;
	thumbnail?: string;
	rotation: RotationDegrees;
}

export type PageSize = 'a4' | 'letter' | 'legal' | 'fit';
export type PageOrientation = 'portrait' | 'landscape' | 'auto';
export type ImageFit = 'contain' | 'cover' | 'fill';

export interface ImagesToPdfSettings {
	pageSize: PageSize;
	orientation: PageOrientation;
	imageFit: ImageFit;
	margin: number; // in mm
	quality: number; // 0-100
}

export interface ImagesToPdfTask {
	id: string;
	images: ImageFile[];
	settings: ImagesToPdfSettings;
	outputFileName: string;
	status: 'pending' | 'processing' | 'completed' | 'error';
	progress?: number;
	outputUrl?: string;
	blobKey?: string;
	error?: string;
}

// ===== PDF TO IMAGES TYPES =====

export type ImageFormat = 'png' | 'jpg' | 'webp';
export type ImageScale = 1 | 1.5 | 2 | 3;

export interface PdfToImagesSettings {
	format: ImageFormat;
	scale: ImageScale;
	quality: number; // 0-100, for jpg
	pageSelection: 'all' | 'range' | 'specific';
	pageRange?: { start: number; end: number };
	specificPages?: number[];
}

export interface ExportedImage {
	pageNumber: number;
	dataUrl: string;
	fileName: string;
	blob?: Blob;
}

export interface PdfToImagesTask {
	id: string;
	file: UploadedFile;
	settings: PdfToImagesSettings;
	status: 'pending' | 'processing' | 'completed' | 'error';
	progress?: number;
	exportedImages: ExportedImage[];
	zipUrl?: string;
	blobKey?: string;
	error?: string;
}

// ===== PAGE NUMBERS TYPES =====

export type PageNumberPosition = 
	| 'bottom-center' 
	| 'bottom-left' 
	| 'bottom-right' 
	| 'top-center' 
	| 'top-left' 
	| 'top-right';

export type PageNumberFormat = 
	| 'numeric'      // 1, 2, 3
	| 'roman'        // i, ii, iii
	| 'roman-upper'  // I, II, III
	| 'alpha'        // a, b, c
	| 'alpha-upper'; // A, B, C

export interface PageNumberSettings {
	position: PageNumberPosition;
	format: PageNumberFormat;
	startNumber: number;
	prefix: string;
	suffix: string;
	fontSize: number;
	fontColor: string;
	skipFirstPage: boolean;
	margin: number; // distance from edge in mm
}

export interface PageNumberTask {
	id: string;
	file: UploadedFile;
	settings: PageNumberSettings;
	outputFileName: string;
	status: 'pending' | 'processing' | 'completed' | 'error';
	progress?: number;
	outputUrl?: string;
	blobKey?: string;
	error?: string;
}
