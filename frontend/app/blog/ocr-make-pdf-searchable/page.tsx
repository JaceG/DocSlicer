import { Metadata } from 'next';
import Link from 'next/link';
import { BlogLayout, BlogPost } from '@/components/blog/BlogLayout';
import {
	ScanSearch,
	CheckCircle2,
	Zap,
	Shield,
	Search,
	Copy,
	Eye,
	FileText,
} from 'lucide-react';

const postData: BlogPost = {
	slug: 'ocr-make-pdf-searchable',
	title: 'How to Make Scanned PDFs Searchable with OCR',
	description:
		'Convert scanned documents into searchable text with OCR (Optical Character Recognition). Extract text, enable search, and improve accessibility. Free and private.',
	date: '2026-01-06',
	readTime: '9 min read',
	category: 'Tutorials',
	author: 'PDF Wonder Kit Team',
	tags: [
		'ocr-pdf',
		'make-pdf-searchable',
		'extract-text-from-scan',
		'pdf-ocr-online',
	],
	featured: true,
	toolSlug: 'ocr',
	ctaTitle: 'Ready to OCR Your PDF?',
	ctaDescription:
		'Convert scanned PDFs to searchable text with OCR. Extract text, enable find function, improve accessibility. 100% private — your files never leave your device.',
};

export const metadata: Metadata = {
	title: postData.title,
	description: postData.description,
	keywords: [
		'OCR PDF',
		'make PDF searchable',
		'extract text from scan',
		'PDF OCR online',
		'convert image to text',
		'searchable PDF',
		'OCR tool free',
		'text recognition PDF',
	],
	authors: [{ name: postData.author }],
	openGraph: {
		title: postData.title,
		description: postData.description,
		type: 'article',
		publishedTime: postData.date,
		authors: [postData.author],
		tags: postData.tags,
		url: `https://www.pdfwonderkit.com/blog/${postData.slug}`,
	},
	twitter: {
		card: 'summary_large_image',
		title: postData.title,
		description: postData.description,
	},
	alternates: {
		canonical: `https://www.pdfwonderkit.com/blog/${postData.slug}`,
	},
};

export default function OCRMakePDFSearchablePost() {
	return (
		<BlogLayout post={postData}>
			{/* Quick Answer */}
			<div className='not-prose bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-800 rounded-xl p-6 mb-8'>
				<div className='flex items-start gap-4'>
					<div className='bg-green-500 rounded-full p-2 flex-shrink-0'>
						<Zap className='w-5 h-5 text-white' />
					</div>
					<div>
						<h2 className='text-lg font-bold text-gray-900 dark:text-white mb-2'>
							Quick Answer
						</h2>
						<p className='text-gray-700 dark:text-gray-300 mb-3'>
							OCR (Optical Character Recognition) converts images
							of text into actual selectable, searchable text.
							Upload your scanned PDF, OCR recognizes the text,
							and you get a searchable PDF where you can find,
							copy, and read text aloud. Essential for scanned
							documents.
						</p>
						<Link
							href='/ocr'
							className='inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors'>
							OCR PDF Free →
						</Link>
					</div>
				</div>
			</div>

			<p className='text-xl text-gray-700 dark:text-gray-300 leading-relaxed'>
				Scanned PDFs are just pictures of text — you can see it, but you
				can't search, copy, or edit it. OCR transforms these images into
				actual text data, making them searchable, accessible, and
				editable like any digital document.
			</p>

			<h2>What Is OCR?</h2>

			<div className='not-prose bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-xl p-6 my-8'>
				<h3 className='text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3'>
					OCR = Optical Character Recognition
				</h3>
				<p className='text-sm text-blue-800 dark:text-blue-200 mb-3'>
					OCR is software that looks at images and identifies
					characters (letters, numbers, symbols). It converts visual
					text into machine-readable text data.
				</p>
				<div className='grid md:grid-cols-2 gap-4'>
					<div className='bg-white dark:bg-gray-800 p-4 rounded-lg'>
						<h4 className='font-semibold text-gray-900 dark:text-white mb-2'>
							Before OCR (Image-only PDF)
						</h4>
						<ul className='text-sm text-gray-600 dark:text-gray-400 space-y-1'>
							<li>✗ Can't search for words</li>
							<li>✗ Can't copy/paste text</li>
							<li>✗ Screen readers can't read it</li>
							<li>✗ Large file sizes</li>
						</ul>
					</div>
					<div className='bg-white dark:bg-gray-800 p-4 rounded-lg'>
						<h4 className='font-semibold text-gray-900 dark:text-white mb-2'>
							After OCR (Searchable PDF)
						</h4>
						<ul className='text-sm text-gray-600 dark:text-gray-400 space-y-1'>
							<li>✓ Full-text search</li>
							<li>✓ Copy/paste text</li>
							<li>✓ Screen reader compatible</li>
							<li>✓ Text editing possible</li>
						</ul>
					</div>
				</div>
			</div>

			<h2>Why Use OCR on PDFs?</h2>

			<div className='not-prose space-y-4 my-8'>
				<div className='flex items-start gap-3 bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800'>
					<Search className='h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5' />
					<div>
						<h3 className='font-semibold text-gray-900 dark:text-white mb-1'>
							Make Documents Searchable
						</h3>
						<p className='text-sm text-gray-600 dark:text-gray-400 mb-0'>
							Find information instantly with Ctrl+F instead of
							manually scanning pages. Essential for research,
							legal discovery, or any document over 10 pages.
						</p>
					</div>
				</div>

				<div className='flex items-start gap-3 bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800'>
					<Copy className='h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5' />
					<div>
						<h3 className='font-semibold text-gray-900 dark:text-white mb-1'>
							Enable Copy/Paste
						</h3>
						<p className='text-sm text-gray-600 dark:text-gray-400 mb-0'>
							Extract quotes, data, or entire sections without
							retyping. Saves hours when working with contracts,
							forms, or reference materials.
						</p>
					</div>
				</div>

				<div className='flex items-start gap-3 bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800'>
					<Eye className='h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5' />
					<div>
						<h3 className='font-semibold text-gray-900 dark:text-white mb-1'>
							Accessibility Compliance
						</h3>
						<p className='text-sm text-gray-600 dark:text-gray-400 mb-0'>
							Screen readers can read OCR'd text aloud for
							visually impaired users. Required for ADA/WCAG
							compliance on government and public websites.
						</p>
					</div>
				</div>

				<div className='flex items-start gap-3 bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800'>
					<FileText className='h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5' />
					<div>
						<h3 className='font-semibold text-gray-900 dark:text-white mb-1'>
							Archive & Data Extraction
						</h3>
						<p className='text-sm text-gray-600 dark:text-gray-400 mb-0'>
							Convert paper archives into digital, searchable
							databases. Extract data from forms, invoices, or
							receipts for analysis.
						</p>
					</div>
				</div>
			</div>

			<h2>How to OCR a PDF</h2>

			<div className='not-prose bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-8 rounded-2xl border-2 border-blue-200 dark:border-blue-800 mb-8'>
				<h3 className='text-xl font-bold text-gray-900 dark:text-white mb-6'>
					Using PDF Wonder Kit's OCR Tool
				</h3>

				<div className='space-y-4'>
					<div className='flex items-start gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg'>
						<div className='flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-bold flex-shrink-0'>
							1
						</div>
						<div>
							<p className='font-semibold text-gray-900 dark:text-white mb-1'>
								Upload Scanned PDF
							</p>
							<p className='text-gray-700 dark:text-gray-300 text-sm'>
								Visit{' '}
								<Link
									href='/ocr'
									className='text-blue-600 hover:underline'>
									pdfwonderkit.com/ocr
								</Link>{' '}
								and upload your image-only PDF.
							</p>
						</div>
					</div>

					<div className='flex items-start gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg'>
						<div className='flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-bold flex-shrink-0'>
							2
						</div>
						<div>
							<p className='font-semibold text-gray-900 dark:text-white mb-1'>
								Select Language
							</p>
							<p className='text-gray-700 dark:text-gray-300 text-sm'>
								Choose document language (English, Spanish,
								French, etc.). Accuracy depends on correct
								language selection.
							</p>
						</div>
					</div>

					<div className='flex items-start gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg'>
						<div className='flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-bold flex-shrink-0'>
							3
						</div>
						<div>
							<p className='font-semibold text-gray-900 dark:text-white mb-1'>
								OCR Processing
							</p>
							<p className='text-gray-700 dark:text-gray-300 text-sm'>
								Tool analyzes each page, identifies text, and
								creates a text layer. Takes 1-5 seconds per
								page.
							</p>
						</div>
					</div>

					<div className='flex items-start gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg'>
						<div className='flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-bold flex-shrink-0'>
							4
						</div>
						<div>
							<p className='font-semibold text-gray-900 dark:text-white mb-1'>
								Download Searchable PDF
							</p>
							<p className='text-gray-700 dark:text-gray-300 text-sm'>
								Get your OCR'd PDF. Original images intact, but
								now with searchable text layer underneath.
							</p>
						</div>
					</div>
				</div>

				<div className='mt-6 p-4 bg-green-100 dark:bg-green-900/30 rounded-lg'>
					<p className='text-sm text-green-800 dark:text-green-300 flex items-center gap-2 mb-0'>
						<Shield className='h-4 w-4' />
						<strong>Your file never leaves your device</strong> —
						all OCR processing is done locally in your browser.
					</p>
				</div>
			</div>

			<h2>OCR Accuracy Tips</h2>

			<div className='not-prose grid md:grid-cols-2 gap-6 my-8'>
				<div className='bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl border border-green-200 dark:border-green-800'>
					<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-3'>
						Use High-Quality Scans
					</h3>
					<p className='text-sm text-gray-600 dark:text-gray-400'>
						300 DPI minimum for best results. Blurry or
						low-resolution scans produce poor OCR accuracy (lots of
						mistakes).
					</p>
				</div>

				<div className='bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800'>
					<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-3'>
						Clean, Straight Pages
					</h3>
					<p className='text-sm text-gray-600 dark:text-gray-400'>
						Skewed pages reduce accuracy. Use scanner's
						auto-straighten feature. Remove coffee stains or marks
						if possible.
					</p>
				</div>

				<div className='bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-xl border border-purple-200 dark:border-purple-800'>
					<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-3'>
						Good Lighting/Contrast
					</h3>
					<p className='text-sm text-gray-600 dark:text-gray-400'>
						Black text on white background works best. Faded or
						handwritten text struggles. Avoid shadows or glare.
					</p>
				</div>

				<div className='bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-6 rounded-xl border border-amber-200 dark:border-amber-800'>
					<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-3'>
						Standard Fonts
					</h3>
					<p className='text-sm text-gray-600 dark:text-gray-400'>
						Printed text (Times, Arial, Helvetica) has 95-99%
						accuracy. Decorative or handwritten fonts are 60-80%
						accurate at best.
					</p>
				</div>
			</div>

			<h2>Common Use Cases</h2>

			<div className='not-prose space-y-4 my-8'>
				<div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6'>
					<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
						Legacy Document Digitization
					</h3>
					<p className='text-gray-600 dark:text-gray-400 text-sm mb-0'>
						Companies with boxes of paper records scan them, OCR
						them, and create searchable digital archives. Essential
						for legal, medical, and historical records.
					</p>
				</div>

				<div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6'>
					<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
						Academic Research
					</h3>
					<p className='text-gray-600 dark:text-gray-400 text-sm mb-0'>
						Researchers scan old books/articles, OCR them, then
						search across thousands of pages for relevant passages.
						Dramatically speeds literature reviews.
					</p>
				</div>

				<div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6'>
					<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
						Form Data Extraction
					</h3>
					<p className='text-gray-600 dark:text-gray-400 text-sm mb-0'>
						Scan filled-out forms, OCR them, extract data
						automatically into spreadsheets. Used for surveys,
						applications, invoices, receipts.
					</p>
				</div>

				<div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6'>
					<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
						Legal E-Discovery
					</h3>
					<p className='text-gray-600 dark:text-gray-400 text-sm mb-0'>
						Law firms OCR thousands of documents for lawsuits,
						enabling keyword searches across case files to find
						relevant evidence quickly.
					</p>
				</div>
			</div>

			<h2>Limitations of OCR</h2>

			<div className='not-prose bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-500 rounded-xl p-6 my-8'>
				<h3 className='text-lg font-bold text-amber-900 dark:text-amber-100 mb-4'>
					What OCR Can't Do
				</h3>
				<ul className='text-sm text-amber-800 dark:text-amber-200 space-y-2'>
					<li>
						• <strong>Handwriting:</strong> Very poor accuracy
						(40-70%) unless trained on specific handwriting
					</li>
					<li>
						• <strong>Low-quality scans:</strong> Blurry, faded, or
						low-resolution images produce garbage text
					</li>
					<li>
						• <strong>Complex layouts:</strong> Multi-column
						documents, tables, or images with text overlays confuse
						OCR
					</li>
					<li>
						• <strong>Non-Latin scripts:</strong> Some tools
						struggle with Chinese, Arabic, Hebrew unless
						specifically trained
					</li>
					<li>
						• <strong>Perfect accuracy:</strong> Even best-case is
						95-99% accurate. Expect some typos.
					</li>
				</ul>
			</div>

			<h2>Frequently Asked Questions</h2>

			<div className='not-prose space-y-4 my-8'>
				<div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6'>
					<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
						Does OCR replace the original scanned image?
					</h3>
					<p className='text-gray-600 dark:text-gray-400 text-sm mb-0'>
						No! OCR adds an invisible text layer underneath the
						image. You still see the original scan, but now you can
						search/copy the text. This is called a "searchable image
						PDF."
					</p>
				</div>

				<div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6'>
					<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
						How long does OCR take?
					</h3>
					<p className='text-gray-600 dark:text-gray-400 text-sm mb-0'>
						1-5 seconds per page depending on text density and image
						quality. A 50-page document takes 2-5 minutes.
					</p>
				</div>

				<div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6'>
					<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
						Does OCR work on photos from my phone?
					</h3>
					<p className='text-gray-600 dark:text-gray-400 text-sm mb-0'>
						Yes, if the photo is clear and well-lit. Phone cameras
						work but scanners are better (more consistent lighting,
						no perspective distortion).
					</p>
				</div>

				<div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6'>
					<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
						Can I edit the OCR'd text?
					</h3>
					<p className='text-gray-600 dark:text-gray-400 text-sm mb-0'>
						You can copy/paste it. To edit in place, you'd need PDF
						editing software (Adobe Acrobat) or convert to Word
						first.
					</p>
				</div>
			</div>

			<h2>Conclusion</h2>

			<p>
				OCR transforms unusable scanned images into searchable,
				accessible documents. It's essential for digitizing archives,
				enabling research, and ensuring accessibility compliance. While
				not perfect, modern OCR achieves 95-99% accuracy on quality
				scans.
			</p>

			<p className='text-lg font-semibold'>
				<strong>Quick Summary:</strong>
			</p>

			<ul>
				<li>
					✓ <strong>Makes scans searchable</strong> — find any word
					instantly
				</li>
				<li>
					✓ <strong>Enable copy/paste</strong> — extract text without
					retyping
				</li>
				<li>
					✓ <strong>Accessibility compliance</strong> — screen reader
					compatible
				</li>
				<li>
					✓ <strong>95-99% accuracy</strong> on quality scans
				</li>
				<li>
					✓ <strong>Free tools available</strong> — no expensive
					software needed
				</li>
			</ul>

			<div className='not-prose bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-8 my-8 text-center'>
				<h3 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
					OCR Your PDF Now
				</h3>
				<p className='text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto'>
					Convert your scanned PDF to searchable text. Extract data,
					enable search, improve accessibility. No signup required,
					completely private.
				</p>
				<Link
					href='/ocr'
					className='inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-lg'>
					OCR PDF Free →
				</Link>
			</div>
		</BlogLayout>
	);
}
