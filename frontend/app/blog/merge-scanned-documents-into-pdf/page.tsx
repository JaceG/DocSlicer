import { Metadata } from 'next';
import Link from 'next/link';
import { BlogLayout, BlogPost } from '@/components/blog/BlogLayout';
import { Scan, Layers, FileText, Zap, CheckCircle2, AlertCircle, Printer } from 'lucide-react';

export const metadata: Metadata = {
	title: 'How to Merge Scanned Documents into One Searchable PDF',
	description:
		'Learn how to combine multiple scanned documents into a single PDF file. Perfect for digitizing paperwork, organizing receipts, and creating searchable document archives.',
	keywords: [
		'combine scanned documents',
		'merge scans into pdf',
		'digitize paperwork',
		'scan to pdf',
		'organize scanned documents',
		'searchable pdf',
		'paperless office',
	],
	openGraph: {
		title: 'How to Merge Scanned Documents into One Searchable PDF',
		description:
			'Complete guide to merging scanned documents into organized, searchable PDFs. Perfect for going paperless.',
		url: 'https://www.pdfwonderkit.com/blog/merge-scanned-documents-into-pdf',
	},
	alternates: {
		canonical: 'https://www.pdfwonderkit.com/blog/merge-scanned-documents-into-pdf',
	},
};

const postData: BlogPost = {
	slug: 'merge-scanned-documents-into-pdf',
	title: 'How to Merge Scanned Documents into One Searchable PDF',
	description:
		'Learn how to combine multiple scanned documents into a single PDF file. Perfect for digitizing paperwork, organizing receipts, and creating searchable document archives.',
	date: '2026-01-05',
	readTime: '8 min read',
	category: 'Productivity',
	author: 'PDF Wonder Kit Team',
	tags: [
		'merge-pdf',
		'scanning',
		'paperless',
	],
	featured: false,
	toolSlug: 'merge',
	ctaTitle: 'Ready to Organize Your Scanned Documents?',
	ctaDescription: 'PDF Wonder Kit makes it easy to merge scanned documents into organized, professional PDFs — all while keeping your files completely private.',
};

export default function MergeScannedDocumentsPage() {
	return (
		<BlogLayout post={postData}>
			<div className='prose prose-lg max-w-none'>
				{/* Introduction */}
				<div className='bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-l-4 border-green-500 p-6 rounded-r-lg mb-8'>
					<div className='flex items-start gap-3'>
						<Scan className='h-6 w-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-1' />
						<div>
							<h3 className='text-green-900 dark:text-green-100 mt-0 mb-2'>
								Going Paperless? Start Here.
							</h3>
							<p className='text-green-800 dark:text-green-200 mb-0'>
								You've scanned a stack of documents—receipts,
								invoices, medical records, or important
								paperwork—but now you're left with dozens of
								separate files cluttering your computer. Wouldn't
								it be better to have everything organized in one
								searchable PDF?
							</p>
						</div>
					</div>
				</div>

				<p className='text-xl text-gray-700 dark:text-gray-300 leading-relaxed'>
					In this guide, you'll learn how to merge scanned documents
					into a single, organized PDF—and optionally make it searchable
					with OCR (Optical Character Recognition). Whether you're
					digitizing old paperwork, organizing tax documents, or
					creating a paperless office, this guide has you covered.
				</p>

				{/* Why Merge Scanned Documents */}
				<h2 className='flex items-center gap-2'>
					<Layers className='h-6 w-6 text-purple-600' />
					Why Merge Scanned Documents?
				</h2>

				<div className='grid md:grid-cols-2 gap-4'>
					<div className='bg-blue-50 dark:bg-blue-900/20 rounded-lg p-5 border border-blue-200 dark:border-blue-800'>
						<h3 className='text-base font-bold text-blue-900 dark:text-blue-100 mt-0 mb-3'>
							📁 Better Organization
						</h3>
						<ul className='text-sm text-blue-800 dark:text-blue-200 mb-0 space-y-2'>
							<li>
								One file instead of 50 scattered scans
							</li>
							<li>
								Easier to find what you need
							</li>
							<li>
								Simpler backup and archiving
							</li>
							<li>
								Professional appearance when sharing
							</li>
						</ul>
					</div>

					<div className='bg-green-50 dark:bg-green-900/20 rounded-lg p-5 border border-green-200 dark:border-green-800'>
						<h3 className='text-base font-bold text-green-900 dark:text-green-100 mt-0 mb-3'>
							💼 Business Benefits
						</h3>
						<ul className='text-sm text-green-800 dark:text-green-200 mb-0 space-y-2'>
							<li>
								Create complete project files
							</li>
							<li>
								Organize client documentation
							</li>
							<li>
								Consolidate expense reports
							</li>
							<li>
								Build audit-ready records
							</li>
						</ul>
					</div>

					<div className='bg-purple-50 dark:bg-purple-900/20 rounded-lg p-5 border border-purple-200 dark:border-purple-800'>
						<h3 className='text-base font-bold text-purple-900 dark:text-purple-100 mt-0 mb-3'>
							🏠 Personal Use Cases
						</h3>
						<ul className='text-sm text-purple-800 dark:text-purple-200 mb-0 space-y-2'>
							<li>
								Tax documents (receipts, W-2s, 1099s)
							</li>
							<li>
								Medical records and test results
							</li>
							<li>
								Home improvement receipts/warranties
							</li>
							<li>
								Legal documents and contracts
							</li>
						</ul>
					</div>

					<div className='bg-orange-50 dark:bg-orange-900/20 rounded-lg p-5 border border-orange-200 dark:border-orange-800'>
						<h3 className='text-base font-bold text-orange-900 dark:text-orange-100 mt-0 mb-3'>
							🎯 Efficiency Gains
						</h3>
						<ul className='text-sm text-orange-800 dark:text-orange-200 mb-0 space-y-2'>
							<li>
								Search text across all pages
							</li>
							<li>
								Email one file instead of many
							</li>
							<li>
								Print entire sets at once
							</li>
							<li>
								Share with consistent page numbers
							</li>
						</ul>
					</div>
				</div>

				{/* Scanning Best Practices */}
				<h2 className='flex items-center gap-2'>
					<Printer className='h-6 w-6 text-indigo-600' />
					Scanning Best Practices (Do This First!)
				</h2>

				<p>
					Before merging, proper scanning technique makes a huge
					difference in the final PDF quality.
				</p>

				<div className='bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-6 rounded-r-lg'>
					<h3 className='text-yellow-900 dark:text-yellow-100 mt-0'>
						⚡ Recommended Scanner Settings
					</h3>
					<div className='grid md:grid-cols-2 gap-4 text-yellow-800 dark:text-yellow-200'>
						<div>
							<p className='font-semibold mb-2'>For Text Documents:</p>
							<ul className='text-sm mb-0 space-y-1'>
								<li>
									<strong>Resolution:</strong> 300 DPI (optimal
									for OCR)
								</li>
								<li>
									<strong>Color:</strong> Grayscale (smaller
									files, good quality)
								</li>
								<li>
									<strong>Format:</strong> PDF or JPG
								</li>
								<li>
									<strong>Compression:</strong> Medium (balances
									size and quality)
								</li>
							</ul>
						</div>
						<div>
							<p className='font-semibold mb-2'>For Photos/Graphics:</p>
							<ul className='text-sm mb-0 space-y-1'>
								<li>
									<strong>Resolution:</strong> 300-600 DPI
								</li>
								<li>
									<strong>Color:</strong> Full color (24-bit)
								</li>
								<li>
									<strong>Format:</strong> JPG or PNG
								</li>
								<li>
									<strong>Compression:</strong> Low (preserve
									detail)
								</li>
							</ul>
						</div>
					</div>
				</div>

				<h3>Common Scanning Mistakes to Avoid:</h3>

				<div className='space-y-3'>
					<div className='flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800'>
						<AlertCircle className='h-5 w-5 text-red-600 flex-shrink-0 mt-0.5' />
						<div>
							<p className='font-semibold text-red-900 dark:text-red-100 mb-1'>
								Scanning at Too Low Resolution
							</p>
							<p className='text-sm text-red-800 dark:text-red-200 mb-0'>
								150 DPI looks fine on screen but becomes blurry
								when printed. Always use 300 DPI minimum for
								documents you might print later.
							</p>
						</div>
					</div>

					<div className='flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800'>
						<AlertCircle className='h-5 w-5 text-red-600 flex-shrink-0 mt-0.5' />
						<div>
							<p className='font-semibold text-red-900 dark:text-red-100 mb-1'>
								Using Color for Text-Only Documents
							</p>
							<p className='text-sm text-red-800 dark:text-red-200 mb-0'>
								A 10-page document scanned in color can be 5-10x
								larger than grayscale with no quality benefit for
								text.
							</p>
						</div>
					</div>

					<div className='flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800'>
						<AlertCircle className='h-5 w-5 text-red-600 flex-shrink-0 mt-0.5' />
						<div>
							<p className='font-semibold text-red-900 dark:text-red-100 mb-1'>
								Scanning Crooked Pages
							</p>
							<p className='text-sm text-red-800 dark:text-red-200 mb-0'>
								Most modern scanners have auto-straightening.
								Enable it! Otherwise, use your scanner's alignment
								guides.
							</p>
						</div>
					</div>
				</div>

				{/* How to Merge */}
				<h2 className='flex items-center gap-2'>
					<Layers className='h-6 w-6 text-blue-600' />
					How to Merge Scanned Documents
				</h2>

				<h3>Method 1: Using PDF Wonder Kit (Recommended)</h3>

				<div className='bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800 mb-6'>
					<div className='flex items-center gap-3 mb-4'>
						<div className='bg-blue-600 rounded-full p-2'>
							<Zap className='h-5 w-5 text-white' />
						</div>
						<div>
							<p className='font-bold text-blue-900 dark:text-blue-100 mb-0'>
								Fast, Private, and Browser-Based
							</p>
							<p className='text-sm text-blue-800 dark:text-blue-200 mb-0'>
								No uploads, no installation, works with any file
								format
							</p>
						</div>
					</div>

					<h4 className='text-base font-semibold mt-4 mb-3'>
						Step-by-Step Instructions:
					</h4>
					<ol className='space-y-3'>
						<li>
							<strong>Organize your scanned files</strong>
							<br />
							<span className='text-sm text-gray-600 dark:text-gray-400'>
								Rename files in the order you want them merged:
								<br />
								<code className='text-xs'>01_receipt.pdf</code>,{' '}
								<code className='text-xs'>02_invoice.pdf</code>,{' '}
								<code className='text-xs'>03_statement.pdf</code>
							</span>
						</li>
						<li>
							<strong>Go to{' '}
								<Link
									href='/'
									className='text-blue-600 hover:underline'>
									PDF Wonder Kit.com
								</Link>
							</strong>
						</li>
						<li>
							<strong>Click "Merge PDFs" mode</strong>
						</li>
						<li>
							<strong>Upload your scanned documents</strong>
							<br />
							<span className='text-sm text-gray-600 dark:text-gray-400'>
								You can drag and drop multiple files at once.
								Supports PDF, JPG, PNG, and other image formats.
							</span>
						</li>
						<li>
							<strong>Reorder files if needed</strong>
							<br />
							<span className='text-sm text-gray-600 dark:text-gray-400'>
								Use the up/down arrows to arrange pages in the
								correct order
							</span>
						</li>
						<li>
							<strong>Name your output file</strong>
							<br />
							<span className='text-sm text-gray-600 dark:text-gray-400'>
								Example:{' '}
								<code className='text-xs'>
									Tax_Documents_2025.pdf
								</code>
							</span>
						</li>
						<li>
							<strong>Click "Start Merging"</strong>
						</li>
						<li>
							<strong>Download your merged PDF</strong>
							<br />
							<span className='text-sm text-gray-600 dark:text-gray-400'>
								Your files are processed locally in your
								browser—completely private!
							</span>
						</li>
					</ol>
				</div>

				<div className='bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-6 rounded-r-lg'>
					<h4 className='text-green-900 dark:text-green-100 mt-0'>
						✅ Why PDF Wonder Kit is Perfect for Scanned Documents:
					</h4>
					<ul className='text-green-800 dark:text-green-200 mb-0'>
						<li>
							<strong>Accepts any format:</strong> PDF, JPG, PNG,
							TIFF—all work
						</li>
						<li>
							<strong>No file size limits:</strong> Premium users
							can merge up to 100 MB
						</li>
						<li>
							<strong>Unlimited pages:</strong> Combine hundreds
							of scans if needed
						</li>
						<li>
							<strong>Complete privacy:</strong> Files never leave
							your device
						</li>
						<li>
							<strong>Fast processing:</strong> Merge 50 pages in
							under 10 seconds
						</li>
					</ul>
				</div>

				{/* Image to PDF Conversion */}
				<h2>Converting Image Scans to PDF</h2>

				<p>
					If your scanner only outputs JPG or PNG files, you'll need to
					convert them to PDF before merging. Here's how:
				</p>

				<div className='grid md:grid-cols-2 gap-4'>
					<div className='bg-gray-50 dark:bg-gray-800/50 rounded-lg p-5 border border-gray-200 dark:border-gray-700'>
						<h3 className='text-base font-semibold mt-0'>
							Option 1: Convert During Merge
						</h3>
						<p className='text-sm mb-2'>
							PDF Wonder Kit automatically converts images to PDF when
							you upload them in merge mode.
						</p>
						<ol className='text-sm mb-0 space-y-1'>
							<li>Upload JPG/PNG files</li>
							<li>They're auto-converted to PDF</li>
							<li>All merged into one document</li>
						</ol>
					</div>

					<div className='bg-gray-50 dark:bg-gray-800/50 rounded-lg p-5 border border-gray-200 dark:border-gray-700'>
						<h3 className='text-base font-semibold mt-0'>
							Option 2: Convert First, Then Merge
						</h3>
						<p className='text-sm mb-2'>
							If you want more control over individual pages:
						</p>
						<ol className='text-sm mb-0 space-y-1'>
							<li>Convert each image to PDF individually</li>
							<li>Edit/crop if needed</li>
							<li>Then merge all PDFs together</li>
						</ol>
					</div>
				</div>

				{/* Real-World Examples */}
				<h2>Real-World Examples</h2>

				<div className='space-y-6'>
					<div className='bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 border border-gray-200 dark:border-gray-700'>
						<h3 className='text-lg font-semibold mt-0 mb-3'>
							Example 1: Tax Season Receipts
						</h3>
						<p className='text-sm mb-3'>
							<strong>Scenario:</strong> You have 75 receipts for
							business expenses that need to be organized for your
							accountant.
						</p>
						<div className='bg-white dark:bg-gray-900 rounded p-4 border border-gray-300 dark:border-gray-700'>
							<p className='text-sm mb-2'>
								<strong>Step 1:</strong> Scan all receipts at 300
								DPI, grayscale
							</p>
							<p className='text-sm mb-2'>
								<strong>Step 2:</strong> Rename files by
								category:
								<br />
								<code className='text-xs'>01_Office_Supplies_Jan.pdf</code>
								<br />
								<code className='text-xs'>02_Software_Subscription_Jan.pdf</code>
								<br />
								<code className='text-xs'>03_Travel_Uber_Jan.pdf</code>
							</p>
							<p className='text-sm mb-2'>
								<strong>Step 3:</strong> Merge all into{' '}
								<code className='text-xs'>Business_Expenses_Q1_2025.pdf</code>
							</p>
							<p className='text-sm mb-0'>
								<strong>Result:</strong> One organized PDF with
								all receipts in chronological order, ready for
								your accountant
							</p>
						</div>
					</div>

					<div className='bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 border border-gray-200 dark:border-gray-700'>
						<h3 className='text-lg font-semibold mt-0 mb-3'>
							Example 2: Medical Records
						</h3>
						<p className='text-sm mb-3'>
							<strong>Scenario:</strong> You're switching doctors
							and need to provide your complete medical history.
						</p>
						<div className='bg-white dark:bg-gray-900 rounded p-4 border border-gray-300 dark:border-gray-700'>
							<p className='text-sm mb-2'>
								<strong>Step 1:</strong> Gather and scan:
								<br />• Lab results from past 2 years
								<br />• Prescription history
								<br />• Vaccination records
								<br />• Previous diagnoses
							</p>
							<p className='text-sm mb-2'>
								<strong>Step 2:</strong> Organize by date and
								type
							</p>
							<p className='text-sm mb-2'>
								<strong>Step 3:</strong> Merge into{' '}
								<code className='text-xs'>Medical_History_Smith_John.pdf</code>
							</p>
							<p className='text-sm mb-0'>
								<strong>Result:</strong> Complete medical file
								that's easy to share with new providers
							</p>
						</div>
					</div>

					<div className='bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 border border-gray-200 dark:border-gray-700'>
						<h3 className='text-lg font-semibold mt-0 mb-3'>
							Example 3: Project Documentation
						</h3>
						<p className='text-sm mb-3'>
							<strong>Scenario:</strong> A construction project with
							permits, plans, invoices, and photos that need to be
							archived.
						</p>
						<div className='bg-white dark:bg-gray-900 rounded p-4 border border-gray-300 dark:border-gray-700'>
							<p className='text-sm mb-2'>
								<strong>Step 1:</strong> Scan/collect all
								documents
							</p>
							<p className='text-sm mb-2'>
								<strong>Step 2:</strong> Create logical sections:
								<br />• Section 1: Permits and approvals (pages
								1-10)
								<br />• Section 2: Architectural plans (pages
								11-30)
								<br />• Section 3: Invoices and receipts (pages
								31-50)
								<br />• Section 4: Progress photos (pages 51-75)
							</p>
							<p className='text-sm mb-2'>
								<strong>Step 3:</strong> Merge with clear naming:{' '}
								<code className='text-xs'>Kitchen_Remodel_Complete_Documentation.pdf</code>
							</p>
							<p className='text-sm mb-0'>
								<strong>Result:</strong> Complete project archive
								for warranties, future reference, or resale value
							</p>
						</div>
					</div>
				</div>

				{/* Making PDFs Searchable */}
				<h2>Making Your Merged PDF Searchable (OCR)</h2>

				<p>
					Scanned documents are just images—you can't search the text.
					OCR (Optical Character Recognition) solves this by converting
					images of text into actual selectable, searchable text.
				</p>

				<div className='bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-6 rounded-r-lg'>
					<h3 className='text-blue-900 dark:text-blue-100 mt-0'>
						When Do You Need OCR?
					</h3>
					<div className='grid md:grid-cols-2 gap-4 text-blue-800 dark:text-blue-200'>
						<div>
							<p className='font-semibold mb-2 text-sm'>
								✅ You NEED OCR if:
							</p>
							<ul className='text-sm mb-0 space-y-1'>
								<li>You want to search text in the PDF</li>
								<li>You need to copy/paste text</li>
								<li>
									You want screen readers to work (accessibility)
								</li>
								<li>You're archiving for future reference</li>
							</ul>
						</div>
						<div>
							<p className='font-semibold mb-2 text-sm'>
								❌ You DON'T need OCR if:
							</p>
							<ul className='text-sm mb-0 space-y-1'>
								<li>Documents are just for visual reference</li>
								<li>They're photos or graphics (not text)</li>
								<li>You only need to print/view them</li>
								<li>File size is a concern (OCR increases size)</li>
							</ul>
						</div>
					</div>
				</div>

				<h3>How to Add OCR to Your Scanned PDFs:</h3>

				<div className='space-y-4'>
					<div className='bg-gray-50 dark:bg-gray-800/50 rounded-lg p-5 border border-gray-200 dark:border-gray-700'>
						<h4 className='text-base font-semibold mt-0'>
							Option 1: Scan with OCR Enabled
						</h4>
						<p className='text-sm mb-2'>
							Many modern scanners and scanner apps have built-in
							OCR:
						</p>
						<ul className='text-sm mb-0 space-y-1'>
							<li>
								<strong>Adobe Scan (Mobile):</strong> Free app
								with excellent OCR
							</li>
							<li>
								<strong>Microsoft Office Lens:</strong> Built into
								OneDrive
							</li>
							<li>
								<strong>Google Drive:</strong> Right-click → Open
								with → Google Docs
							</li>
							<li>
								<strong>HP Smart / Epson Scan:</strong> Most
								modern printer apps have OCR
							</li>
						</ul>
					</div>

					<div className='bg-gray-50 dark:bg-gray-800/50 rounded-lg p-5 border border-gray-200 dark:border-gray-700'>
						<h4 className='text-base font-semibold mt-0'>
							Option 2: Add OCR After Merging
						</h4>
						<p className='text-sm mb-2'>
							If you've already merged your PDFs without OCR:
						</p>
						<ul className='text-sm mb-0 space-y-1'>
							<li>
								<strong>Adobe Acrobat Pro:</strong> Tools →
								Recognize Text → In This File
							</li>
							<li>
								<strong>Online OCR Tools:</strong> Upload merged
								PDF, process with OCR, download
							</li>
							<li>
								<strong>PDF Element:</strong> Desktop software
								with OCR features
							</li>
						</ul>
					</div>
				</div>

				<div className='bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-6 rounded-r-lg'>
					<h4 className='text-yellow-900 dark:text-yellow-100 mt-0'>
						⚠️ OCR Limitations
					</h4>
					<ul className='text-yellow-800 dark:text-yellow-200 mb-0'>
						<li>
							<strong>Quality matters:</strong> Blurry or low-res
							scans produce poor OCR results
						</li>
						<li>
							<strong>Handwriting is tough:</strong> Most OCR works
							best on typed/printed text
						</li>
						<li>
							<strong>File size increases:</strong> OCR adds text
							layer, increasing file size 20-50%
						</li>
						<li>
							<strong>Not 100% accurate:</strong> Always
							proofread critical documents
						</li>
					</ul>
				</div>

				{/* Organization Tips */}
				<h2>Document Organization Pro Tips</h2>

				<div className='grid md:grid-cols-2 gap-4'>
					<div className='bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-5 border border-blue-200 dark:border-blue-800'>
						<h3 className='text-base font-bold text-blue-900 dark:text-blue-100 mt-0 mb-3'>
							📅 Date-Based Naming
						</h3>
						<p className='text-sm text-blue-800 dark:text-blue-200 mb-2'>
							Use ISO format for easy sorting:
						</p>
						<code className='text-xs block mb-1'>
							2025-01-15_Medical_Labs.pdf
						</code>
						<code className='text-xs block mb-1'>
							2025-02-03_Tax_Receipts.pdf
						</code>
						<code className='text-xs block'>
							2025-03-20_Insurance_Claims.pdf
						</code>
					</div>

					<div className='bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-5 border border-green-200 dark:border-green-800'>
						<h3 className='text-base font-bold text-green-900 dark:text-green-100 mt-0 mb-3'>
							📂 Category-Based Structure
						</h3>
						<p className='text-sm text-green-800 dark:text-green-200 mb-2'>
							Organize by type:
						</p>
						<ul className='text-xs mb-0 space-y-1'>
							<li>Medical/Labs/</li>
							<li>Taxes/Receipts_2025/</li>
							<li>Insurance/Auto/Claims/</li>
							<li>Home/Warranties/Appliances/</li>
						</ul>
					</div>

					<div className='bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-5 border border-purple-200 dark:border-purple-800'>
						<h3 className='text-base font-bold text-purple-900 dark:text-purple-100 mt-0 mb-3'>
							📋 Add Cover Pages
						</h3>
						<p className='text-sm text-purple-800 dark:text-purple-200 mb-0'>
							For large merged PDFs, create a simple cover page in
							Word/Google Docs listing:
							<br />• Document title
							<br />• Date range
							<br />• Table of contents
							<br />• Contact info
						</p>
					</div>

					<div className='bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg p-5 border border-orange-200 dark:border-orange-800'>
						<h3 className='text-base font-bold text-orange-900 dark:text-orange-100 mt-0 mb-3'>
							💾 Backup Strategy
						</h3>
						<p className='text-sm text-orange-800 dark:text-orange-200 mb-0'>
							After merging important documents:
							<br />• Save to cloud storage (Google Drive,
							Dropbox)
							<br />• Keep a local backup on external drive
							<br />• Consider encrypted storage for sensitive
							docs
						</p>
					</div>
				</div>

				{/* FAQ */}
				<h2>Frequently Asked Questions</h2>

				<div className='space-y-6'>
					<div className='bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 border border-gray-200 dark:border-gray-700'>
						<h3 className='text-lg font-semibold mt-0'>
							Can I merge scanned images with existing PDFs?
						</h3>
						<p className='mb-0'>
							Absolutely! PDF Wonder Kit automatically handles mixed
							inputs. Upload JPGs, PNGs, and PDFs all at once, and
							they'll be merged into a single PDF in the order you
							specify.
						</p>
					</div>

					<div className='bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 border border-gray-200 dark:border-gray-700'>
						<h3 className='text-lg font-semibold mt-0'>
							Will merging reduce scan quality?
						</h3>
						<p className='mb-0'>
							No. Merging is lossless—your scanned images are
							embedded in the PDF at their original resolution. The
							quality is identical to viewing the scans individually.
						</p>
					</div>

					<div className='bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 border border-gray-200 dark:border-gray-700'>
						<h3 className='text-lg font-semibold mt-0'>
							How many scans can I merge at once?
						</h3>
						<p className='mb-0'>
							Free users can merge up to 3 documents per month
							(great for testing). Premium users ($2/month) get
							unlimited merges with file sizes up to 100 MB each.
							You can easily merge 100+ scanned pages in one go.
						</p>
					</div>

					<div className='bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 border border-gray-200 dark:border-gray-700'>
						<h3 className='text-lg font-semibold mt-0'>
							What's the best file format for scanned documents?
						</h3>
						<p className='mb-0'>
							<strong>For archiving:</strong> PDF with OCR
							(searchable text)
							<br />
							<strong>For sharing:</strong> Compressed PDF (smaller
							file size)
							<br />
							<strong>For editing later:</strong> Keep original
							high-res images separate
						</p>
					</div>

					<div className='bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 border border-gray-200 dark:border-gray-700'>
						<h3 className='text-lg font-semibold mt-0'>
							Can I split a merged PDF later if I need to?
						</h3>
						<p className='mb-0'>
							Yes! Use PDF Wonder Kit's "Split PDF" mode to extract
							specific pages or ranges. This is helpful if you later
							realize you need one document from the merged set.
						</p>
					</div>
				</div>

			</div>
		</BlogLayout>
	);
}
