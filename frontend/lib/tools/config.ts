import {
	Scissors,
	Layers,
	FileDown,
	RotateCw,
	Image as ImageIcon,
	FileImage,
	Hash,
	Lock,
	Unlock,
	Droplet,
	BookOpen,
	FileX,
	Wrench,
	Highlighter,
	PenTool,
	FileText,
	Scan,
	GitCompare,
	Info,
	Code,
	LucideIcon,
} from 'lucide-react';
import { AppMode } from '@/types';

export interface ToolConfig {
	id: AppMode;
	slug: string; // URL-friendly slug
	label: string;
	shortLabel: string;
	description: string;
	longDescription: string; // For SEO meta description
	icon: LucideIcon;
	activeClasses: string;
	colorClass: string;
	keywords: string[]; // For SEO
}

export const ALL_TOOLS: ToolConfig[] = [
	{
		id: 'split',
		slug: 'split',
		label: 'PDF Splitter',
		shortLabel: 'Split',
		description: 'Extract specific pages from your PDF',
		longDescription:
			'Split PDF documents into separate files by page ranges. Extract chapters, sections, or specific pages. 100% private - processing happens in your browser.',
		icon: Scissors,
		activeClasses: 'bg-blue-500 hover:bg-blue-600 ring-blue-400',
		colorClass: 'bg-gradient-to-br from-blue-500 to-blue-600',
		keywords: [
			'split PDF',
			'PDF splitter',
			'extract PDF pages',
			'divide PDF',
			'separate PDF pages',
		],
	},
	{
		id: 'merge',
		slug: 'merge',
		label: 'PDF Merger',
		shortLabel: 'Merge',
		description: 'Combine multiple PDFs into one',
		longDescription:
			'Merge multiple PDF files into a single document. Combine reports, portfolios, or related documents with drag-and-drop reordering. 100% private.',
		icon: Layers,
		activeClasses: 'bg-indigo-500 hover:bg-indigo-600 ring-indigo-400',
		colorClass: 'bg-gradient-to-br from-indigo-500 to-indigo-600',
		keywords: [
			'merge PDF',
			'combine PDF',
			'PDF merger',
			'join PDF files',
			'concatenate PDF',
		],
	},
	{
		id: 'compress',
		slug: 'compress',
		label: 'PDF Compressor',
		shortLabel: 'Compress',
		description: 'Reduce file size while keeping quality',
		longDescription:
			'Compress PDF files to reduce size without losing quality. Choose from multiple compression levels for screen, ebook, or print. 100% private.',
		icon: FileDown,
		activeClasses: 'bg-emerald-500 hover:bg-emerald-600 ring-emerald-400',
		colorClass: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
		keywords: [
			'compress PDF',
			'reduce PDF size',
			'PDF compressor',
			'shrink PDF',
			'optimize PDF',
		],
	},
	{
		id: 'organize',
		slug: 'organize',
		label: 'PDF Organizer',
		shortLabel: 'Organize',
		description: 'Rotate, delete, and reorder pages',
		longDescription:
			'Organize PDF pages with ease. Rotate sideways pages, delete unwanted pages, and reorder with drag-and-drop. 100% private browser processing.',
		icon: RotateCw,
		activeClasses: 'bg-purple-500 hover:bg-purple-600 ring-purple-400',
		colorClass: 'bg-gradient-to-br from-purple-500 to-purple-600',
		keywords: [
			'rotate PDF',
			'delete PDF pages',
			'reorder PDF',
			'rearrange PDF pages',
			'PDF organizer',
		],
	},
	{
		id: 'images-to-pdf',
		slug: 'images-to-pdf',
		label: 'Image to PDF Converter',
		shortLabel: 'IMG→PDF',
		description: 'Convert images into a PDF document',
		longDescription:
			'Convert JPG, PNG, GIF, WebP images to PDF. Create photo albums, presentations, or scan archives. Drag to reorder. 100% private.',
		icon: ImageIcon,
		activeClasses: 'bg-orange-500 hover:bg-orange-600 ring-orange-400',
		colorClass: 'bg-gradient-to-br from-orange-500 to-orange-600',
		keywords: [
			'JPG to PDF',
			'PNG to PDF',
			'image to PDF',
			'convert images to PDF',
			'photo to PDF',
		],
	},
	{
		id: 'pdf-to-images',
		slug: 'pdf-to-images',
		label: 'PDF to Image Converter',
		shortLabel: 'PDF→IMG',
		description: 'Export PDF pages as images',
		longDescription:
			'Convert PDF pages to high-quality JPG or PNG images. Export individual pages or entire documents. Perfect for presentations. 100% private.',
		icon: FileImage,
		activeClasses: 'bg-cyan-500 hover:bg-cyan-600 ring-cyan-400',
		colorClass: 'bg-gradient-to-br from-cyan-500 to-cyan-600',
		keywords: [
			'PDF to JPG',
			'PDF to PNG',
			'PDF to image',
			'convert PDF to images',
			'extract PDF images',
		],
	},
	{
		id: 'page-numbers',
		slug: 'page-numbers',
		label: 'PDF Page Numberer',
		shortLabel: 'Numbers',
		description: 'Add customizable page numbers',
		longDescription:
			'Add page numbers to your PDF documents. Customize position, format, font, and starting number. Professional results. 100% private.',
		icon: Hash,
		activeClasses: 'bg-rose-500 hover:bg-rose-600 ring-rose-400',
		colorClass: 'bg-gradient-to-br from-rose-500 to-rose-600',
		keywords: [
			'add page numbers to PDF',
			'PDF page numbering',
			'number PDF pages',
			'PDF page numbers',
		],
	},
	{
		id: 'protect',
		slug: 'protect',
		label: 'PDF Password Protection',
		shortLabel: 'Protect',
		description: 'Add password protection to your PDF',
		longDescription:
			'Protect PDF files with password encryption. Secure sensitive documents with strong 256-bit AES encryption. 100% private - never uploaded.',
		icon: Lock,
		activeClasses: 'bg-amber-500 hover:bg-amber-600 ring-amber-400',
		colorClass: 'bg-gradient-to-br from-amber-500 to-amber-600',
		keywords: [
			'password protect PDF',
			'encrypt PDF',
			'lock PDF',
			'secure PDF',
			'PDF password',
		],
	},
	{
		id: 'unlock',
		slug: 'unlock',
		label: 'PDF Password Remover',
		shortLabel: 'Unlock',
		description: 'Remove password from your PDF',
		longDescription:
			'Remove password protection from PDF files you own. Unlock PDFs for easier access and sharing. 100% private browser processing.',
		icon: Unlock,
		activeClasses: 'bg-sky-500 hover:bg-sky-600 ring-sky-400',
		colorClass: 'bg-gradient-to-br from-sky-500 to-sky-600',
		keywords: [
			'unlock PDF',
			'remove PDF password',
			'PDF unlocker',
			'decrypt PDF',
			'unlock protected PDF',
		],
	},
	{
		id: 'watermark',
		slug: 'watermark',
		label: 'PDF Watermark Tool',
		shortLabel: 'Watermark',
		description: 'Add text or image watermarks',
		longDescription:
			'Add custom text or image watermarks to PDF documents. Protect your intellectual property with customizable positioning and opacity. 100% private.',
		icon: Droplet,
		activeClasses: 'bg-violet-500 hover:bg-violet-600 ring-violet-400',
		colorClass: 'bg-gradient-to-br from-violet-500 to-violet-600',
		keywords: [
			'add watermark to PDF',
			'PDF watermark',
			'watermark PDF online',
			'stamp PDF',
		],
	},
	{
		id: 'split-bookmarks',
		slug: 'split-by-bookmarks',
		label: 'PDF Chapter Splitter',
		shortLabel: 'Chapters',
		description: 'Auto-split by bookmarks/TOC',
		longDescription:
			'Automatically split PDF by bookmarks or table of contents. Separate chapters, sections, or topics into individual files. 100% private.',
		icon: BookOpen,
		activeClasses: 'bg-teal-500 hover:bg-teal-600 ring-teal-400',
		colorClass: 'bg-gradient-to-br from-teal-500 to-teal-600',
		keywords: [
			'split PDF by bookmarks',
			'split PDF chapters',
			'PDF bookmark splitter',
			'split PDF by TOC',
		],
	},
	{
		id: 'remove-blanks',
		slug: 'remove-blank-pages',
		label: 'Blank Page Remover',
		shortLabel: 'Blanks',
		description: 'Detect and remove blank pages',
		longDescription:
			'Automatically detect and remove blank pages from scanned PDFs. Clean up documents with unwanted empty pages. 100% private processing.',
		icon: FileX,
		activeClasses: 'bg-red-500 hover:bg-red-600 ring-red-400',
		colorClass: 'bg-gradient-to-br from-red-500 to-red-600',
		keywords: [
			'remove blank pages PDF',
			'delete empty pages',
			'PDF blank page remover',
			'clean up PDF',
		],
	},
	{
		id: 'repair',
		slug: 'repair',
		label: 'PDF Repair Tool',
		shortLabel: 'Repair',
		description: 'Fix corrupted or damaged PDFs',
		longDescription:
			'Repair corrupted or damaged PDF files. Recover content from broken PDFs and fix common issues. 100% private - files stay on your device.',
		icon: Wrench,
		activeClasses: 'bg-stone-500 hover:bg-stone-600 ring-stone-400',
		colorClass: 'bg-gradient-to-br from-stone-500 to-stone-600',
		keywords: [
			'repair PDF',
			'fix corrupted PDF',
			'PDF repair tool',
			'recover PDF',
			'fix damaged PDF',
		],
	},
	{
		id: 'annotate',
		slug: 'annotate',
		label: 'PDF Annotator',
		shortLabel: 'Annotate',
		description: 'Add highlights, notes, and shapes',
		longDescription:
			'Annotate PDF documents with highlights, text boxes, arrows, and shapes. Add comments and notes. Perfect for reviews. 100% private.',
		icon: Highlighter,
		activeClasses: 'bg-pink-500 hover:bg-pink-600 ring-pink-400',
		colorClass: 'bg-gradient-to-br from-pink-500 to-pink-600',
		keywords: [
			'annotate PDF',
			'highlight PDF',
			'PDF annotations',
			'add notes to PDF',
			'mark up PDF',
		],
	},
	{
		id: 'sign',
		slug: 'sign',
		label: 'PDF Signature Tool',
		shortLabel: 'Sign',
		description: 'Add your signature to documents',
		longDescription:
			'Add digital signatures to PDF documents. Draw, type, or upload your signature. Sign contracts and forms online. 100% private.',
		icon: PenTool,
		activeClasses: 'bg-lime-500 hover:bg-lime-600 ring-lime-400',
		colorClass: 'bg-gradient-to-br from-lime-500 to-lime-600',
		keywords: [
			'sign PDF',
			'add signature to PDF',
			'PDF signature',
			'digital signature PDF',
			'e-sign PDF',
		],
	},
	{
		id: 'forms',
		slug: 'fill-forms',
		label: 'PDF Form Filler',
		shortLabel: 'Forms',
		description: 'Fill out PDF forms online',
		longDescription:
			'Fill out PDF forms online without printing. Complete interactive forms, add text, and save. Perfect for applications. 100% private.',
		icon: FileText,
		activeClasses: 'bg-fuchsia-500 hover:bg-fuchsia-600 ring-fuchsia-400',
		colorClass: 'bg-gradient-to-br from-fuchsia-500 to-fuchsia-600',
		keywords: [
			'fill PDF form',
			'PDF form filler',
			'complete PDF form online',
			'fillable PDF',
		],
	},
	{
		id: 'ocr',
		slug: 'ocr',
		label: 'PDF OCR Tool',
		shortLabel: 'OCR',
		description: 'Make scanned PDFs searchable',
		longDescription:
			'Convert scanned PDFs to searchable text with OCR. Extract text from images and make documents searchable. 100% private browser processing.',
		icon: Scan,
		colorClass: 'bg-gradient-to-br from-yellow-500 to-yellow-600',
		activeClasses: 'bg-yellow-500 hover:bg-yellow-600 ring-yellow-400',
		keywords: [
			'OCR PDF',
			'PDF to searchable text',
			'extract text from PDF',
			'make PDF searchable',
		],
	},
	{
		id: 'compare',
		slug: 'compare',
		label: 'PDF Comparison Tool',
		shortLabel: 'Compare',
		description: 'Compare two PDFs side by side',
		longDescription:
			'Compare two PDF documents side by side. Highlight differences between versions. Perfect for legal and version control. 100% private.',
		icon: GitCompare,
		activeClasses: 'bg-slate-500 hover:bg-slate-600 ring-slate-400',
		colorClass: 'bg-gradient-to-br from-slate-500 to-slate-600',
		keywords: [
			'compare PDF',
			'PDF comparison',
			'PDF diff',
			'compare PDF documents',
			'find PDF differences',
		],
	},
	{
		id: 'metadata',
		slug: 'edit-metadata',
		label: 'PDF Metadata Editor',
		shortLabel: 'Metadata',
		description: 'Edit PDF title, author, and properties',
		longDescription:
			'Edit PDF metadata including title, author, subject, and keywords. Update document properties easily. 100% private processing.',
		icon: Info,
		activeClasses: 'bg-zinc-500 hover:bg-zinc-600 ring-zinc-400',
		colorClass: 'bg-gradient-to-br from-zinc-500 to-zinc-600',
		keywords: [
			'edit PDF metadata',
			'change PDF properties',
			'PDF metadata editor',
			'update PDF info',
		],
	},
	{
		id: 'pdf-to-html',
		slug: 'pdf-to-html',
		label: 'PDF to HTML Converter',
		shortLabel: 'PDF→HTML',
		description: 'Convert PDF to HTML with text and images',
		longDescription:
			'Convert PDF documents to clean HTML with extracted text and images. Choose between embedded base64 images or separate files. 100% private browser processing.',
		icon: Code,
		activeClasses: 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 ring-orange-400',
		colorClass: 'bg-gradient-to-br from-orange-500 to-red-500',
		keywords: [
			'PDF to HTML',
			'convert PDF to HTML',
			'PDF HTML converter',
			'extract PDF text',
			'PDF to web page',
		],
	},
];

// Get tool by slug (for routing)
export function getToolBySlug(slug: string): ToolConfig | undefined {
	return ALL_TOOLS.find((tool) => tool.slug === slug);
}

// Get tool by id (for internal use)
export function getToolById(id: AppMode): ToolConfig | undefined {
	return ALL_TOOLS.find((tool) => tool.id === id);
}

// Get all slugs (for generateStaticParams)
export function getAllToolSlugs(): string[] {
	return ALL_TOOLS.map((tool) => tool.slug);
}

// Total tool count (for dynamic display across the app)
export const TOOLS_COUNT = ALL_TOOLS.length;
