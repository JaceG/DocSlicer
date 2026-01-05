import { ConvertibleFileType, ConversionQuality, ConversionWarning } from '@/types';

// Detailed warnings for each convertible file type
export const CONVERSION_WARNINGS: Record<ConvertibleFileType, ConversionWarning> = {
	// E-books
	epub: {
		fileType: 'epub',
		quality: 'fair',
		title: 'EPUB Conversion',
		description: 'EPUBs are designed for reflowing text, not fixed pages. The PDF will have a fixed layout that may differ from your e-reader display.',
		caveats: [
			'Page numbers won\'t match your e-reader',
			'Complex formatting may not convert perfectly',
			'Embedded fonts may be substituted',
			'Tables and multi-column layouts may shift',
			'DRM-protected files cannot be converted'
		]
	},

	// Word Processors
	docx: {
		fileType: 'docx',
		quality: 'good',
		title: 'Word Document Conversion',
		description: 'Microsoft Word documents generally convert well, but some formatting features may not translate perfectly.',
		caveats: [
			'Track changes and comments will be removed',
			'Some fonts may be substituted if not available',
			'Complex headers/footers may simplify',
			'Form fields become static text'
		]
	},
	doc: {
		fileType: 'doc',
		quality: 'fair',
		title: 'Legacy Word Document Conversion',
		description: 'Older .doc format has limited conversion support. Consider saving as .docx first for better results.',
		caveats: [
			'Older format has limited support',
			'Complex formatting may be lost',
			'Some embedded objects may not convert',
			'Recommend converting to .docx first in Word'
		]
	},
	odt: {
		fileType: 'odt',
		quality: 'good',
		title: 'OpenDocument Text Conversion',
		description: 'LibreOffice/OpenOffice documents convert well to PDF.',
		caveats: [
			'Some advanced formatting may simplify',
			'Custom fonts may be substituted',
			'Macros and scripts are ignored'
		]
	},
	rtf: {
		fileType: 'rtf',
		quality: 'good',
		title: 'Rich Text Format Conversion',
		description: 'RTF files have good conversion support for basic formatting.',
		caveats: [
			'Advanced formatting may not convert',
			'Embedded objects may be lost',
			'Tables may have spacing differences'
		]
	},

	// Plain Text
	txt: {
		fileType: 'txt',
		quality: 'excellent',
		title: 'Plain Text Conversion',
		description: 'Plain text files convert perfectly, but have no formatting to preserve.',
		caveats: [
			'No formatting in the original file',
			'Default fonts and margins will be applied',
			'Long lines may wrap differently than expected'
		]
	},
	md: {
		fileType: 'md',
		quality: 'good',
		title: 'Markdown Conversion',
		description: 'Markdown formatting will be rendered and converted to PDF.',
		caveats: [
			'Styling depends on our default theme',
			'Some extended Markdown syntax may not be supported',
			'Code blocks may have different highlighting'
		]
	},
	html: {
		fileType: 'html',
		quality: 'fair',
		title: 'HTML Conversion',
		description: 'HTML pages will be rendered and converted. External resources may not load.',
		caveats: [
			'External images/CSS may not load',
			'JavaScript interactivity is lost',
			'Complex layouts may not render correctly',
			'Local file references won\'t work'
		]
	},

	// Presentations
	pptx: {
		fileType: 'pptx',
		quality: 'fair',
		title: 'PowerPoint Conversion',
		description: 'Presentations convert to PDF slides. Animations and transitions are lost.',
		caveats: [
			'Animations and transitions are removed',
			'Speaker notes may not be included',
			'Embedded videos become still images',
			'Some fonts may be substituted',
			'Slide builds show final state only'
		]
	},
	ppt: {
		fileType: 'ppt',
		quality: 'poor',
		title: 'Legacy PowerPoint Conversion',
		description: 'Older .ppt format has very limited conversion support. Recommend saving as .pptx first.',
		caveats: [
			'Legacy format has minimal support',
			'Most formatting will be lost',
			'Strongly recommend converting to .pptx first',
			'Results may be unusable'
		]
	},
	odp: {
		fileType: 'odp',
		quality: 'fair',
		title: 'OpenDocument Presentation Conversion',
		description: 'LibreOffice/OpenOffice presentations will be converted to PDF slides.',
		caveats: [
			'Animations and transitions are removed',
			'Some effects may not convert',
			'Custom fonts may be substituted'
		]
	},

	// Images
	jpg: {
		fileType: 'jpg',
		quality: 'excellent',
		title: 'JPEG Image Conversion',
		description: 'JPEG images will be placed on a PDF page at full resolution.',
		caveats: [
			'Image will be centered on the page',
			'Large images may increase file size',
			'Multiple images become multiple pages'
		]
	},
	jpeg: {
		fileType: 'jpeg',
		quality: 'excellent',
		title: 'JPEG Image Conversion',
		description: 'JPEG images will be placed on a PDF page at full resolution.',
		caveats: [
			'Image will be centered on the page',
			'Large images may increase file size',
			'Multiple images become multiple pages'
		]
	},
	png: {
		fileType: 'png',
		quality: 'excellent',
		title: 'PNG Image Conversion',
		description: 'PNG images convert perfectly, preserving transparency.',
		caveats: [
			'Transparency is preserved',
			'Large images may increase file size',
			'Image will be scaled to fit page'
		]
	},
	gif: {
		fileType: 'gif',
		quality: 'good',
		title: 'GIF Image Conversion',
		description: 'GIF images convert to PDF. Animated GIFs show only the first frame.',
		caveats: [
			'Animation is lost (first frame only)',
			'Transparency is preserved',
			'Limited color palette maintained'
		]
	},
	webp: {
		fileType: 'webp',
		quality: 'excellent',
		title: 'WebP Image Conversion',
		description: 'WebP images will be converted to PDF at full quality.',
		caveats: [
			'Animation is lost for animated WebP',
			'Transparency is preserved',
			'Image will be scaled to fit page'
		]
	},
	bmp: {
		fileType: 'bmp',
		quality: 'excellent',
		title: 'BMP Image Conversion',
		description: 'Bitmap images convert perfectly to PDF.',
		caveats: [
			'Uncompressed format may create large PDFs',
			'No quality loss during conversion'
		]
	},
	tiff: {
		fileType: 'tiff',
		quality: 'excellent',
		title: 'TIFF Image Conversion',
		description: 'TIFF images (often from scans) convert well to PDF.',
		caveats: [
			'Multi-page TIFFs become multi-page PDFs',
			'High resolution images preserved',
			'Large files may take longer to process'
		]
	}
};

// MIME type mappings
export const MIME_TYPE_MAP: Record<string, ConvertibleFileType> = {
	// E-books
	'application/epub+zip': 'epub',
	
	// Word Processors
	'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
	'application/msword': 'doc',
	'application/vnd.oasis.opendocument.text': 'odt',
	'application/rtf': 'rtf',
	'text/rtf': 'rtf',
	
	// Plain Text
	'text/plain': 'txt',
	'text/markdown': 'md',
	'text/x-markdown': 'md',
	'text/html': 'html',
	
	// Presentations
	'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'pptx',
	'application/vnd.ms-powerpoint': 'ppt',
	'application/vnd.oasis.opendocument.presentation': 'odp',
	
	// Images
	'image/jpeg': 'jpg',
	'image/png': 'png',
	'image/gif': 'gif',
	'image/webp': 'webp',
	'image/bmp': 'bmp',
	'image/tiff': 'tiff',
};

// Extension to type mappings (fallback)
export const EXTENSION_MAP: Record<string, ConvertibleFileType> = {
	'.epub': 'epub',
	'.docx': 'docx',
	'.doc': 'doc',
	'.odt': 'odt',
	'.rtf': 'rtf',
	'.txt': 'txt',
	'.md': 'md',
	'.markdown': 'md',
	'.html': 'html',
	'.htm': 'html',
	'.pptx': 'pptx',
	'.ppt': 'ppt',
	'.odp': 'odp',
	'.jpg': 'jpg',
	'.jpeg': 'jpeg',
	'.png': 'png',
	'.gif': 'gif',
	'.webp': 'webp',
	'.bmp': 'bmp',
	'.tiff': 'tiff',
	'.tif': 'tiff',
};

// Get quality color class for UI
export function getQualityColorClass(quality: ConversionQuality): string {
	switch (quality) {
		case 'excellent':
			return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30';
		case 'good':
			return 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30';
		case 'fair':
			return 'text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-900/30';
		case 'poor':
			return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30';
	}
}

// Get quality badge text
export function getQualityText(quality: ConversionQuality): string {
	switch (quality) {
		case 'excellent':
			return 'Excellent Quality';
		case 'good':
			return 'Good Quality';
		case 'fair':
			return 'Fair Quality';
		case 'poor':
			return 'Poor Quality';
	}
}
