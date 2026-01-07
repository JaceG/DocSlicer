import { Metadata } from 'next';
import Link from 'next/link';
import { BlogLayout, BlogPost } from '@/components/blog/BlogLayout';
import {
	RotateCw,
	CheckCircle2,
	Zap,
	Shield,
	ArrowUpDown,
	Trash2,
	FileText,
	Camera,
	Presentation,
} from 'lucide-react';

const postData: BlogPost = {
	slug: 'rotate-reorder-pdf-pages',
	title: 'How to Rotate and Reorder PDF Pages (Complete Organization Guide)',
	description:
		'Fix scanned documents by rotating and rearranging PDF pages. Perfect for correcting orientation, organizing presentations, and cleaning up document structure. Free and private.',
	date: '2026-01-06',
	readTime: '9 min read',
	category: 'Tutorials',
	author: 'PDF Wonder Kit Team',
	tags: [
		'rotate-pdf-pages',
		'reorder-pdf',
		'rearrange-pdf',
		'delete-pdf-pages',
	],
	featured: true,
	toolSlug: 'organize',
	ctaTitle: 'Ready to Organize Your PDF?',
	ctaDescription:
		'Rotate, reorder, and delete pages in any PDF. Fix scanned documents and reorganize presentations. 100% private — your files never leave your device.',
};

export const metadata: Metadata = {
	title: postData.title,
	description: postData.description,
	keywords: [
		'rotate PDF pages',
		'reorder PDF',
		'rearrange PDF',
		'delete PDF pages',
		'organize PDF pages',
		'fix PDF orientation',
		'rotate PDF 90 degrees',
		'change PDF page order',
		'PDF page organizer',
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

export default function RotateReorderPDFPagesPost() {
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
							PDF page organization lets you rotate pages (fix orientation),
							reorder pages (drag to rearrange), and delete unwanted pages. Upload
							your PDF, make changes visually with thumbnails, and download the
							corrected file. Perfect for fixing scanned documents.
						</p>
						<Link
							href='/organize'
							className='inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors'>
							Organize PDF Pages Free →
						</Link>
					</div>
				</div>
			</div>

			<p className='text-xl text-gray-700 dark:text-gray-300 leading-relaxed'>
				Scanned documents rarely come out perfect. Pages are upside down,
				landscape pages mixed with portrait, and pages in the wrong order. PDF
				page organization tools let you fix all of these issues without
				rescanning or recreating the document.
			</p>

			<p>
				This guide covers everything about organizing PDF pages: rotating pages to
				fix orientation, reordering pages by dragging, deleting unwanted pages,
				and common use cases for each operation.
			</p>

			<h2>Three Main Operations</h2>

			<div className='not-prose grid md:grid-cols-3 gap-6 my-8'>
				<div className='bg-white dark:bg-gray-800 border-2 border-blue-500 rounded-xl p-6'>
					<div className='flex items-center gap-3 mb-4'>
						<div className='p-3 bg-blue-600 rounded-xl'>
							<RotateCw className='h-6 w-6 text-white' />
						</div>
						<h3 className='text-lg font-semibold text-gray-900 dark:text-white m-0'>
							Rotate Pages
						</h3>
					</div>
					<p className='text-sm text-gray-600 dark:text-gray-400 mb-3'>
						Fix orientation issues by rotating pages 90°, 180°, or 270°
						clockwise.
					</p>
					<div className='text-xs text-gray-500 dark:text-gray-400'>
						<strong>Common for:</strong> Scanned documents, mixed orientation PDFs
					</div>
				</div>

				<div className='bg-white dark:bg-gray-800 border-2 border-purple-500 rounded-xl p-6'>
					<div className='flex items-center gap-3 mb-4'>
						<div className='p-3 bg-purple-600 rounded-xl'>
							<ArrowUpDown className='h-6 w-6 text-white' />
						</div>
						<h3 className='text-lg font-semibold text-gray-900 dark:text-white m-0'>
							Reorder Pages
						</h3>
					</div>
					<p className='text-sm text-gray-600 dark:text-gray-400 mb-3'>
						Change page sequence by dragging thumbnails to new positions.
					</p>
					<div className='text-xs text-gray-500 dark:text-gray-400'>
						<strong>Common for:</strong> Presentations, reports, document
						assembly
					</div>
				</div>

				<div className='bg-white dark:bg-gray-800 border-2 border-red-500 rounded-xl p-6'>
					<div className='flex items-center gap-3 mb-4'>
						<div className='p-3 bg-red-600 rounded-xl'>
							<Trash2 className='h-6 w-6 text-white' />
						</div>
						<h3 className='text-lg font-semibold text-gray-900 dark:text-white m-0'>
							Delete Pages
						</h3>
					</div>
					<p className='text-sm text-gray-600 dark:text-gray-400 mb-3'>
						Remove unwanted pages completely from the PDF.
					</p>
					<div className='text-xs text-gray-500 dark:text-gray-400'>
						<strong>Common for:</strong> Removing cover pages, blank pages,
						duplicates
					</div>
				</div>
			</div>

			<h2>How to Organize PDF Pages (Step by Step)</h2>

			<div className='not-prose bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-8 rounded-2xl border-2 border-blue-200 dark:border-blue-800 mb-8'>
				<h3 className='text-xl font-bold text-gray-900 dark:text-white mb-6'>
					Using PDF Wonder Kit's Page Organizer
				</h3>

				<div className='space-y-4'>
					<div className='flex items-start gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg'>
						<div className='flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-bold flex-shrink-0'>
							1
						</div>
						<div>
							<p className='font-semibold text-gray-900 dark:text-white mb-1'>
								Upload Your PDF
							</p>
							<p className='text-gray-700 dark:text-gray-300 text-sm'>
								Visit{' '}
								<Link href='/organize' className='text-blue-600 hover:underline'>
									pdfwonderkit.com/organize
								</Link>{' '}
								and upload your PDF. All pages appear as draggable thumbnails.
							</p>
						</div>
					</div>

					<div className='flex items-start gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg'>
						<div className='flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-bold flex-shrink-0'>
							2
						</div>
						<div>
							<p className='font-semibold text-gray-900 dark:text-white mb-1'>
								Rotate Pages (If Needed)
							</p>
							<p className='text-gray-700 dark:text-gray-300 text-sm'>
								Click the rotate button on any page to turn it 90° clockwise.
								Click multiple times for 180° or 270° rotation.
							</p>
						</div>
					</div>

					<div className='flex items-start gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg'>
						<div className='flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-bold flex-shrink-0'>
							3
						</div>
						<div>
							<p className='font-semibold text-gray-900 dark:text-white mb-1'>
								Reorder Pages (If Needed)
							</p>
							<p className='text-gray-700 dark:text-gray-300 text-sm'>
								Drag page thumbnails to new positions. The visual interface shows
								exactly how your PDF will look.
							</p>
						</div>
					</div>

					<div className='flex items-start gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg'>
						<div className='flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-bold flex-shrink-0'>
							4
						</div>
						<div>
							<p className='font-semibold text-gray-900 dark:text-white mb-1'>
								Delete Unwanted Pages (If Needed)
							</p>
							<p className='text-gray-700 dark:text-gray-300 text-sm'>
								Click the delete/trash icon on any page to remove it. Deleted
								pages disappear from the thumbnail view.
							</p>
						</div>
					</div>

					<div className='flex items-start gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg'>
						<div className='flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-bold flex-shrink-0'>
							5
						</div>
						<div>
							<p className='font-semibold text-gray-900 dark:text-white mb-1'>
								Apply and Download
							</p>
							<p className='text-gray-700 dark:text-gray-300 text-sm'>
								Click "Apply Changes" and download your organized PDF. Page
								numbers automatically update.
							</p>
						</div>
					</div>
				</div>

				<div className='mt-6 p-4 bg-green-100 dark:bg-green-900/30 rounded-lg'>
					<p className='text-sm text-green-800 dark:text-green-300 flex items-center gap-2 mb-0'>
						<Shield className='h-4 w-4' />
						<strong>Your file never leaves your device</strong> — all processing
						is done locally in your browser.
					</p>
				</div>
			</div>

			<h2>Rotating Pages: Fix Orientation</h2>

			<div className='not-prose bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-xl p-6 my-8'>
				<h3 className='text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3'>
					Common Rotation Scenarios
				</h3>
				<div className='space-y-4'>
					<div>
						<h4 className='font-semibold text-blue-800 dark:text-blue-200 mb-2'>
							📄 Mixed Document Scanning
						</h4>
						<p className='text-sm text-blue-800 dark:text-blue-200'>
							You scanned a document with both portrait and landscape pages. All
							landscape pages need to be rotated 90° to match the portrait
							orientation.
						</p>
					</div>
					<div>
						<h4 className='font-semibold text-blue-800 dark:text-blue-200 mb-2'>
							📱 Mobile Photos to PDF
						</h4>
						<p className='text-sm text-blue-800 dark:text-blue-200'>
							Photos taken on a phone might have incorrect orientation when
							converted to PDF. Rotate to correct upside-down or sideways images.
						</p>
					</div>
					<div>
						<h4 className='font-semibold text-blue-800 dark:text-blue-200 mb-2'>
							🔄 Feeder Jam Recovery
						</h4>
						<p className='text-sm text-blue-800 dark:text-blue-200'>
							Paper jam in the scanner resulted in some pages being fed backwards.
							These pages scan upside down (180° rotation needed).
						</p>
					</div>
				</div>
			</div>

			<h2>Reordering Pages: Change Sequence</h2>

			<div className='not-prose space-y-4 my-8'>
				<div className='flex items-start gap-3 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800'>
					<Presentation className='h-5 w-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5' />
					<div>
						<h3 className='font-semibold text-gray-900 dark:text-white mb-1'>
							Presentation Preparation
						</h3>
						<p className='text-sm text-gray-600 dark:text-gray-400 mb-0'>
							Rearrange slides for better flow. Move the summary to the front, put
							backup slides at the end, or change the order based on audience
							feedback.
						</p>
					</div>
				</div>

				<div className='flex items-start gap-3 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800'>
					<FileText className='h-5 w-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5' />
					<div>
						<h3 className='font-semibold text-gray-900 dark:text-white mb-1'>
							Document Assembly
						</h3>
						<p className='text-sm text-gray-600 dark:text-gray-400 mb-0'>
							Combine scanned documents that were scanned out of order. Put pages
							in the correct sequence without rescanning.
						</p>
					</div>
				</div>

				<div className='flex items-start gap-3 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800'>
					<Camera className='h-5 w-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5' />
					<div>
						<h3 className='font-semibold text-gray-900 dark:text-white mb-1'>
							Photo Album Organization
						</h3>
						<p className='text-sm text-gray-600 dark:text-gray-400 mb-0'>
							Reorder photos chronologically or thematically after converting them
							to PDF. Create a custom sequence for storytelling.
						</p>
					</div>
				</div>
			</div>

			<h2>Deleting Pages: Remove Unwanted Content</h2>

			<div className='not-prose grid md:grid-cols-2 gap-6 my-8'>
				<div className='bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6'>
					<h3 className='text-lg font-semibold text-red-900 dark:text-red-100 mb-3'>
						Common Pages to Delete
					</h3>
					<ul className='text-sm text-red-800 dark:text-red-200 space-y-2'>
						<li>
							• <strong>Cover pages</strong> — Remove publisher covers from ebooks
						</li>
						<li>
							• <strong>Blank pages</strong> — Delete scanning mistakes or
							intentional blanks
						</li>
						<li>
							• <strong>Duplicate pages</strong> — Scanner fed the same page twice
						</li>
						<li>
							• <strong>Advertising pages</strong> — Remove ads from downloaded
							documents
						</li>
						<li>
							• <strong>Irrelevant content</strong> — Keep only the sections you
							need
						</li>
					</ul>
				</div>

				<div className='bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-6'>
					<h3 className='text-lg font-semibold text-amber-900 dark:text-amber-100 mb-3 flex items-center gap-2'>
						⚠️ Before Deleting
					</h3>
					<ul className='text-sm text-amber-800 dark:text-amber-200 space-y-2'>
						<li>
							• <strong>Keep a backup</strong> — Save the original before deleting
							pages
						</li>
						<li>
							• <strong>Check dependencies</strong> — Some pages reference others
							(ToC, index)
						</li>
						<li>
							• <strong>Legal documents</strong> — Don't delete pages from
							contracts without permission
						</li>
						<li>
							• <strong>Page numbers</strong> — Deleting changes numbering; may
							affect citations
						</li>
					</ul>
				</div>
			</div>

			<h2>Tips for Better Organization</h2>

			<div className='not-prose grid md:grid-cols-2 gap-6 my-8'>
				<div className='bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800'>
					<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-3'>
						Use Thumbnail View
					</h3>
					<p className='text-sm text-gray-600 dark:text-gray-400'>
						Large thumbnails make it easier to identify which pages need rotation
						or reordering. Zoom in if needed to read text on thumbnails.
					</p>
				</div>

				<div className='bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl border border-green-200 dark:border-green-800'>
					<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-3'>
						Do Multiple Operations at Once
					</h3>
					<p className='text-sm text-gray-600 dark:text-gray-400'>
						Rotate, reorder, and delete in the same session. This is more
						efficient than processing the file multiple times.
					</p>
				</div>

				<div className='bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-xl border border-purple-200 dark:border-purple-800'>
					<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-3'>
						Preview Before Finalizing
					</h3>
					<p className='text-sm text-gray-600 dark:text-gray-400'>
						Review your changes in the thumbnail view before applying. Ensure all
						rotations are correct and page order makes sense.
					</p>
				</div>

				<div className='bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-6 rounded-xl border border-amber-200 dark:border-amber-800'>
					<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-3'>
						Name Your Output File Clearly
					</h3>
					<p className='text-sm text-gray-600 dark:text-gray-400'>
						Save the organized version with a different name (e.g.,
						"Report_Organized.pdf") so you always have the original.
					</p>
				</div>
			</div>

			<h2>Frequently Asked Questions</h2>

			<div className='not-prose space-y-4 my-8'>
				<div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6'>
					<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
						Can I rotate multiple pages at once?
					</h3>
					<p className='text-gray-600 dark:text-gray-400 text-sm mb-0'>
						Some tools allow batch rotation (e.g., "rotate all pages 90°" or
						"rotate pages 1-10"). Look for "Select Multiple" or "Rotate All"
						options to speed up the process.
					</p>
				</div>

				<div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6'>
					<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
						Does rotating pages reduce quality?
					</h3>
					<p className='text-gray-600 dark:text-gray-400 text-sm mb-0'>
						No! Rotation is lossless — the page is simply displayed differently.
						Quality remains identical whether it's a scanned image or text-based
						PDF.
					</p>
				</div>

				<div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6'>
					<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
						Can I undo changes after downloading?
					</h3>
					<p className='text-gray-600 dark:text-gray-400 text-sm mb-0'>
						Once you download the organized PDF, changes are permanent in that
						file. If you need to undo, keep the original PDF before organizing.
						You can always re-upload and organize differently.
					</p>
				</div>

				<div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6'>
					<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
						Will bookmarks and links still work after reordering?
					</h3>
					<p className='text-gray-600 dark:text-gray-400 text-sm mb-0'>
						It depends. Internal page links and bookmarks update automatically in
						most tools. However, if you delete pages that bookmarks point to, those
						bookmarks may break. Always preview the final PDF.
					</p>
				</div>

				<div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6'>
					<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
						Can I add new pages while organizing?
					</h3>
					<p className='text-gray-600 dark:text-gray-400 text-sm mb-0'>
						Most organize tools focus on rearranging existing pages. To add new
						pages, use a PDF merge tool first to combine files, then use the
						organize tool to arrange everything.
					</p>
				</div>
			</div>

			<h2>Conclusion</h2>

			<p>
				PDF page organization is essential for fixing scanned documents,
				preparing presentations, and creating clean, professional files. Rotating,
				reordering, and deleting pages lets you correct mistakes without
				rescanning or recreating documents.
			</p>

			<p className='text-lg font-semibold'>
				<strong>Quick Summary:</strong>
			</p>

			<ul>
				<li>
					✓ <strong>Rotate pages</strong> — fix orientation in 90° increments
				</li>
				<li>
					✓ <strong>Reorder pages</strong> — drag and drop to rearrange
				</li>
				<li>
					✓ <strong>Delete pages</strong> — remove unwanted content
				</li>
				<li>
					✓ <strong>Visual interface</strong> — see changes before applying
				</li>
				<li>
					✓ <strong>Lossless operations</strong> — no quality degradation
				</li>
				<li>
					✓ <strong>Free tools available</strong> — no software needed
				</li>
			</ul>

			<p>
				The key is to always keep a backup of your original file before making
				changes, in case you need to start over or restore deleted pages.
			</p>

			<div className='not-prose bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-8 my-8 text-center'>
				<h3 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
					Organize Your PDF Pages
				</h3>
				<p className='text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto'>
					Try PDF Wonder Kit's free page organizer — rotate, reorder, and delete
					pages with an easy visual interface. No signup required, completely
					private.
				</p>
				<Link
					href='/organize'
					className='inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-lg'>
					Organize Pages Free →
				</Link>
			</div>
		</BlogLayout>
	);
}
