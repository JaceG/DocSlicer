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

// App mode type
export type AppMode = 'split' | 'merge';
