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
export type AppMode = 
	| 'split' 
	| 'merge' 
	| 'compress' 
	| 'organize' 
	| 'images-to-pdf' 
	| 'pdf-to-images' 
	| 'page-numbers'
	| 'protect'
	| 'unlock'
	| 'watermark'
	| 'split-bookmarks'
	| 'remove-blanks'
	| 'repair'
	| 'annotate'
	| 'sign'
	| 'forms'
	| 'ocr'
	| 'compare'
	| 'metadata'
	| 'pdf-to-html';

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

// ===== PASSWORD PROTECTION TYPES =====

export type EncryptionLevel = 'aes-128' | 'aes-256';

export interface ProtectionSettings {
	userPassword: string;        // Password to open the PDF
	ownerPassword?: string;      // Password for full access (optional)
	encryptionLevel: EncryptionLevel;
	permissions: {
		printing: boolean;
		copying: boolean;
		modifying: boolean;
		annotating: boolean;
	};
}

export interface ProtectTask {
	id: string;
	file: UploadedFile;
	settings: ProtectionSettings;
	outputFileName: string;
	status: 'pending' | 'processing' | 'completed' | 'error';
	progress?: number;
	outputUrl?: string;
	blobKey?: string;
	error?: string;
}

// ===== PASSWORD REMOVAL TYPES =====

export interface UnlockTask {
	id: string;
	file: UploadedFile;
	password: string;
	outputFileName: string;
	status: 'pending' | 'processing' | 'completed' | 'error';
	progress?: number;
	outputUrl?: string;
	blobKey?: string;
	error?: string;
}

// ===== WATERMARK TYPES =====

export type WatermarkType = 'text' | 'image';
export type WatermarkPosition = 
	| 'center' 
	| 'top-left' 
	| 'top-right' 
	| 'bottom-left' 
	| 'bottom-right'
	| 'diagonal';

export interface TextWatermarkSettings {
	type: 'text';
	text: string;
	fontSize: number;
	fontColor: string;
	opacity: number; // 0-100
	rotation: number; // degrees
	position: WatermarkPosition;
}

export interface ImageWatermarkSettings {
	type: 'image';
	imageFile: File;
	imageDataUrl?: string;
	width: number;  // percentage of page width
	opacity: number; // 0-100
	position: WatermarkPosition;
}

export type WatermarkSettings = TextWatermarkSettings | ImageWatermarkSettings;

export interface WatermarkTask {
	id: string;
	file: UploadedFile;
	settings: WatermarkSettings;
	outputFileName: string;
	status: 'pending' | 'processing' | 'completed' | 'error';
	progress?: number;
	outputUrl?: string;
	blobKey?: string;
	error?: string;
}

// ===== SPLIT BY BOOKMARKS TYPES =====

export interface PdfBookmark {
	title: string;
	pageNumber: number;
	level: number; // nesting level (0 = top level)
	children?: PdfBookmark[];
}

export interface BookmarkSplitSettings {
	splitLevel: number; // 0 = top level only, 1 = include sub-chapters, etc.
	includeSubBookmarks: boolean;
	namingPattern: 'title' | 'number-title' | 'custom';
	customPrefix?: string;
}

export interface BookmarkSplitTask {
	id: string;
	file: UploadedFile;
	bookmarks: PdfBookmark[];
	settings: BookmarkSplitSettings;
	status: 'pending' | 'processing' | 'completed' | 'error';
	progress?: number;
	outputFiles: Array<{
		name: string;
		url: string;
		pageRange: { start: number; end: number };
	}>;
	zipUrl?: string;
	blobKey?: string;
	error?: string;
}

// ===== BLANK PAGE DETECTION TYPES =====

export interface BlankPageSettings {
	threshold: number; // 0-100, percentage of page that must be blank
	detectWhitePages: boolean;
	detectSolidColorPages: boolean;
	minContentArea: number; // percentage of page that must have content
}

export interface BlankPageInfo {
	pageNumber: number;
	isBlank: boolean;
	blankScore: number; // 0-100, how blank the page is
	thumbnail?: string;
}

export interface RemoveBlanksTask {
	id: string;
	file: UploadedFile;
	settings: BlankPageSettings;
	detectedBlanks: BlankPageInfo[];
	selectedForRemoval: Set<number>;
	outputFileName: string;
	status: 'pending' | 'analyzing' | 'ready' | 'processing' | 'completed' | 'error';
	progress?: number;
	outputUrl?: string;
	blobKey?: string;
	error?: string;
}

// ===== PDF REPAIR TYPES =====

export type RepairLevel = 'light' | 'moderate' | 'aggressive';

export interface RepairSettings {
	level: RepairLevel;
	rebuildCrossReference: boolean;
	fixStreams: boolean;
	removeCorruptedObjects: boolean;
}

export interface RepairDiagnostic {
	issue: string;
	severity: 'warning' | 'error' | 'critical';
	fixed: boolean;
	details?: string;
}

export interface RepairTask {
	id: string;
	file: UploadedFile;
	settings: RepairSettings;
	diagnostics: RepairDiagnostic[];
	outputFileName: string;
	status: 'pending' | 'diagnosing' | 'repairing' | 'completed' | 'error';
	progress?: number;
	outputUrl?: string;
	blobKey?: string;
	error?: string;
	originalSize: number;
	repairedSize?: number;
}

// ===== PDF ANNOTATION TYPES =====

export type AnnotationType = 'highlight' | 'underline' | 'strikethrough' | 'textbox' | 'arrow' | 'rectangle' | 'circle' | 'freehand';

export interface AnnotationBase {
	id: string;
	type: AnnotationType;
	pageNumber: number;
	color: string;
	opacity: number;
}

export interface HighlightAnnotation extends AnnotationBase {
	type: 'highlight' | 'underline' | 'strikethrough';
	x: number;
	y: number;
	width: number;
	height: number;
}

export interface TextBoxAnnotation extends AnnotationBase {
	type: 'textbox';
	x: number;
	y: number;
	width: number;
	height: number;
	text: string;
	fontSize: number;
	fontColor: string;
	backgroundColor?: string;
	borderColor?: string;
}

export interface ArrowAnnotation extends AnnotationBase {
	type: 'arrow';
	startX: number;
	startY: number;
	endX: number;
	endY: number;
	strokeWidth: number;
}

export interface ShapeAnnotation extends AnnotationBase {
	type: 'rectangle' | 'circle';
	x: number;
	y: number;
	width: number;
	height: number;
	strokeWidth: number;
	filled: boolean;
}

export interface FreehandAnnotation extends AnnotationBase {
	type: 'freehand';
	points: Array<{ x: number; y: number }>;
	strokeWidth: number;
}

export type Annotation = 
	| HighlightAnnotation 
	| TextBoxAnnotation 
	| ArrowAnnotation 
	| ShapeAnnotation 
	| FreehandAnnotation;

export interface AnnotateTask {
	id: string;
	file: UploadedFile;
	annotations: Annotation[];
	outputFileName: string;
	status: 'pending' | 'processing' | 'completed' | 'error';
	progress?: number;
	outputUrl?: string;
	blobKey?: string;
	error?: string;
}

// ===== DIGITAL SIGNATURE TYPES =====

export type SignatureType = 'draw' | 'type' | 'upload';

export interface SignatureData {
	type: SignatureType;
	dataUrl: string; // Base64 image of the signature
	width: number;
	height: number;
}

export interface SignaturePlacement {
	pageNumber: number;
	x: number;
	y: number;
	width: number;
	height: number;
}

export interface SignSettings {
	signature: SignatureData;
	placements: SignaturePlacement[];
	addDate: boolean;
	dateFormat: string;
	datePosition: 'below' | 'right' | 'none';
}

export interface SignTask {
	id: string;
	file: UploadedFile;
	settings: SignSettings;
	outputFileName: string;
	status: 'pending' | 'processing' | 'completed' | 'error';
	progress?: number;
	outputUrl?: string;
	blobKey?: string;
	error?: string;
}

// ===== PDF FORMS FILLER TYPES =====

export type FormFieldType = 'text' | 'checkbox' | 'radio' | 'dropdown' | 'signature' | 'date';

export interface FormField {
	id: string;
	name: string;
	type: FormFieldType;
	pageNumber: number;
	x: number;
	y: number;
	width: number;
	height: number;
	value: string | boolean;
	options?: string[]; // For dropdown/radio
	required: boolean;
	readonly: boolean;
}

export interface FormsTask {
	id: string;
	file: UploadedFile;
	fields: FormField[];
	filledFields: Map<string, string | boolean>;
	outputFileName: string;
	status: 'pending' | 'loading' | 'filling' | 'processing' | 'completed' | 'error';
	progress?: number;
	outputUrl?: string;
	blobKey?: string;
	error?: string;
}

// ===== OCR TYPES =====

export type OcrLanguage = 'eng' | 'spa' | 'fra' | 'deu' | 'ita' | 'por' | 'chi_sim' | 'chi_tra' | 'jpn' | 'kor' | 'ara' | 'rus';

export interface OcrSettings {
	languages: OcrLanguage[];
	pageSelection: 'all' | 'range' | 'specific';
	pageRange?: { start: number; end: number };
	specificPages?: number[];
	preserveLayout: boolean;
	deskew: boolean;
	enhanceScans: boolean;
}

export interface OcrPageResult {
	pageNumber: number;
	text: string;
	confidence: number; // 0-100
	wordCount: number;
}

export interface OcrTask {
	id: string;
	file: UploadedFile;
	settings: OcrSettings;
	results: OcrPageResult[];
	outputFileName: string;
	status: 'pending' | 'loading-engine' | 'processing' | 'completed' | 'error';
	progress?: number;
	currentPage?: number;
	outputUrl?: string;
	blobKey?: string;
	error?: string;
	totalCharacters?: number;
	averageConfidence?: number;
}

// ===== PDF COMPARISON/DIFF TYPES =====

export type ComparisonMode = 'visual' | 'text' | 'overlay';

export interface ComparisonSettings {
	mode: ComparisonMode;
	highlightAdditions: boolean;
	highlightDeletions: boolean;
	highlightModifications: boolean;
	colorAdditions: string;
	colorDeletions: string;
	colorModifications: string;
	sensitivity: number; // 0-100
}

export interface PageDifference {
	pageNumber: number;
	hasChanges: boolean;
	changePercentage: number;
	additions: number;
	deletions: number;
	modifications: number;
	diffImageUrl?: string;
}

export interface CompareTask {
	id: string;
	file1: UploadedFile;
	file2: UploadedFile;
	settings: ComparisonSettings;
	differences: PageDifference[];
	outputFileName: string;
	status: 'pending' | 'analyzing' | 'completed' | 'error';
	progress?: number;
	outputUrl?: string;
	blobKey?: string;
	error?: string;
	summary: {
		totalPages: number;
		pagesWithChanges: number;
		totalAdditions: number;
		totalDeletions: number;
	};
}

// ===== METADATA EDITOR TYPES =====

export interface PdfMetadata {
	title: string;
	author: string;
	subject: string;
	keywords: string[];
	creator: string;
	producer: string;
	creationDate?: Date;
	modificationDate?: Date;
	// Custom metadata fields
	customFields: Array<{ key: string; value: string }>;
}

export interface MetadataTask {
	id: string;
	file: UploadedFile;
	originalMetadata: PdfMetadata;
	newMetadata: PdfMetadata;
	outputFileName: string;
	status: 'pending' | 'loading' | 'processing' | 'completed' | 'error';
	progress?: number;
	outputUrl?: string;
	blobKey?: string;
	error?: string;
}

// ===== PDF TO HTML TYPES =====

export type HtmlOutputMode = 'single-file' | 'zip-package';
export type HtmlTheme = 'modern' | 'classic' | 'minimal' | 'dark';
export type ImageExtractionMode = 'embedded' | 'render-pages' | 'both';

export interface PdfToHtmlSettings {
	outputMode: HtmlOutputMode;
	theme: HtmlTheme;
	extractText: boolean;
	extractImages: ImageExtractionMode;
	imageFormat: 'png' | 'jpg' | 'webp';
	imageQuality: number; // 0-100
	imageScale: number; // 1-3
	includePageNumbers: boolean;
	pageSelection: 'all' | 'range' | 'specific';
	pageRange?: { start: number; end: number };
	specificPages?: number[];
}

export interface ExtractedImage {
	id: string;
	pageNumber: number;
	imageIndex: number;
	dataUrl: string;
	fileName: string;
	width: number;
	height: number;
	blob?: Blob;
}

export interface ExtractedPage {
	pageNumber: number;
	text: string;
	images: ExtractedImage[];
	renderedImage?: ExtractedImage; // Full page render
}

export interface PdfToHtmlTask {
	id: string;
	file: UploadedFile;
	settings: PdfToHtmlSettings;
	extractedPages: ExtractedPage[];
	outputFileName: string;
	status: 'pending' | 'extracting-text' | 'extracting-images' | 'generating-html' | 'completed' | 'error';
	progress?: number;
	currentPage?: number;
	htmlContent?: string;
	outputUrl?: string;
	zipUrl?: string;
	blobKey?: string;
	error?: string;
	stats?: {
		totalPages: number;
		totalImages: number;
		totalCharacters: number;
	};
}
