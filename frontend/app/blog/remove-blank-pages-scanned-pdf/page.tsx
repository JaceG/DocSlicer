import { Metadata } from 'next';
import Link from 'next/link';
import { BlogLayout, BlogPost } from '@/components/blog/BlogLayout';
import {
	FileX,
	CheckCircle2,
	Zap,
	Shield,
	AlertTriangle,
	Printer,
	FileText,
	HardDrive,
	Minimize2,
} from 'lucide-react';

const postData: BlogPost = {
	slug: 'remove-blank-pages-scanned-pdf',
	title: 'How to Remove Blank Pages from Scanned PDFs Automatically',
	description:
		'Automatically detect and delete blank pages from scanned documents. Fix duplex scanning issues, clean up PDFs, and reduce file size. Free and completely private.',
	date: '2026-01-06',
	readTime: '8 min read',
	category: 'Tutorials',
	author: 'PDF Wonder Kit Team',
	tags: [
		'remove-blank-pages-pdf',
		'delete-empty-pages',
		'clean-up-scanned-pdf',
		'duplex-scanning',
	],
	featured: true,
	toolSlug: 'blank-pages',
	ctaTitle: 'Ready to Remove Blank Pages?',
	ctaDescription:
		'Automatically detect and remove all blank pages from your PDF. Perfect for cleaning up scanned documents. 100% private — your files never leave your device.',
};

export const metadata: Metadata = {
	title: postData.title,
	description: postData.description,
	keywords: [
		'remove blank pages PDF',
		'delete empty pages',
		'clean up scanned PDF',
		'duplex scanning blank pages',
		'remove white pages PDF',
		'PDF blank page remover',
		'delete blank pages automatically',
		'clean PDF scan',
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

export default function RemoveBlankPagesPDFPost() {
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
							Removing blank pages automatically scans your PDF for empty pages
							and deletes them. Perfect for fixing duplex scanning issues (where
							odd pages are blank) or cleaning up accidentally scanned empty
							pages. Upload your PDF and get a cleaned version in seconds.
						</p>
						<Link
							href='/blank-pages'
							className='inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors'>
							Remove Blank Pages Free →
						</Link>
					</div>
				</div>
			</div>

			<p className='text-xl text-gray-700 dark:text-gray-300 leading-relaxed'>
				Duplex scanners often create PDFs with alternating blank pages. A
				100-page document becomes 200 pages with every other page blank.
				Manually deleting hundreds of blank pages is tedious — automatic
				detection finds and removes them instantly.
			</p>

			<p>
				This guide covers why blank pages appear, how to automatically remove
				them, when to be careful (pages that look blank but aren't), and how
				this improves file size and readability.
			</p>

			<h2>Why PDFs Have Blank Pages</h2>

			<div className='not-prose space-y-4 my-8'>
				<div className='flex items-start gap-3 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800'>
					<Printer className='h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5' />
					<div>
						<h3 className='font-semibold text-gray-900 dark:text-white mb-1'>
							Duplex Scanning Issues
						</h3>
						<p className='text-sm text-gray-600 dark:text-gray-400 mb-0'>
							<strong>Most common cause.</strong> Duplex scanners scan both
							sides of the page. If your original document is single-sided, every
							second page will be blank (the back of each sheet).
						</p>
					</div>
				</div>

				<div className='flex items-start gap-3 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800'>
					<FileText className='h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5' />
					<div>
						<h3 className='font-semibold text-gray-900 dark:text-white mb-1'>
							Intentional Blank Pages
						</h3>
						<p className='text-sm text-gray-600 dark:text-gray-400 mb-0'>
							Books often have blank pages for chapter breaks ("This page
							intentionally left blank"). These might be okay to keep or remove
							depending on your use case.
						</p>
					</div>
				</div>

				<div className='flex items-start gap-3 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800'>
					<AlertTriangle className='h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5' />
					<div>
						<h3 className='font-semibold text-gray-900 dark:text-white mb-1'>
							Scanning Mistakes
						</h3>
						<p className='text-sm text-gray-600 dark:text-gray-400 mb-0'>
							Accidentally scanned blank pages (feeder jam, wrong settings) or
							filler pages between documents in batch scanning.
						</p>
					</div>
				</div>
			</div>

			<h2>How to Remove Blank Pages Automatically</h2>

			<div className='not-prose bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-8 rounded-2xl border-2 border-blue-200 dark:border-blue-800 mb-8'>
				<h3 className='text-xl font-bold text-gray-900 dark:text-white mb-6'>
					Using PDF Wonder Kit's Blank Page Remover
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
								<Link
									href='/blank-pages'
									className='text-blue-600 hover:underline'>
									pdfwonderkit.com/blank-pages
								</Link>{' '}
								and upload your PDF. Works with any size document.
							</p>
						</div>
					</div>

					<div className='flex items-start gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg'>
						<div className='flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-bold flex-shrink-0'>
							2
						</div>
						<div>
							<p className='font-semibold text-gray-900 dark:text-white mb-1'>
								Automatic Detection
							</p>
							<p className='text-gray-700 dark:text-gray-300 text-sm'>
								The tool scans every page for content. Blank pages are identified
								automatically (white/near-white pages with no text or images).
							</p>
						</div>
					</div>

					<div className='flex items-start gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg'>
						<div className='flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-bold flex-shrink-0'>
							3
						</div>
						<div>
							<p className='font-semibold text-gray-900 dark:text-white mb-1'>
								Review Detected Pages
							</p>
							<p className='text-gray-700 dark:text-gray-300 text-sm'>
								Preview shows which pages will be removed. If a page is falsely
								detected as blank, you can unmark it.
							</p>
						</div>
					</div>

					<div className='flex items-start gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg'>
						<div className='flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-bold flex-shrink-0'>
							4
						</div>
						<div>
							<p className='font-semibold text-gray-900 dark:text-white mb-1'>
								Remove and Download
							</p>
							<p className='text-gray-700 dark:text-gray-300 text-sm'>
								Click "Remove Blank Pages" and download your cleaned PDF. Page
								numbers automatically renumber.
							</p>
						</div>
					</div>
				</div>

				<div className='mt-6 p-4 bg-green-100 dark:bg-green-900/30 rounded-lg'>
					<p className='text-sm text-green-800 dark:text-green-300 flex items-center gap-2 mb-0'>
						<Shield className='h-4 w-4' />
						<strong>Total time: 10-30 seconds.</strong> 200-page document with
						100 blank pages? Done in 15 seconds.
					</p>
				</div>
			</div>

			<h2>Benefits of Removing Blank Pages</h2>

			<div className='not-prose grid md:grid-cols-2 gap-6 my-8'>
				<div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6'>
					<div className='flex items-start gap-4'>
						<div className='p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex-shrink-0'>
							<HardDrive className='h-6 w-6 text-white' />
						</div>
						<div>
							<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
								Smaller File Size
							</h3>
							<p className='text-sm text-gray-600 dark:text-gray-400'>
								Each blank page still takes space (50-200KB depending on scan
								quality). Removing 100 blank pages can save 5-20MB.
							</p>
						</div>
					</div>
				</div>

				<div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6'>
					<div className='flex items-start gap-4'>
						<div className='p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex-shrink-0'>
							<FileText className='h-6 w-6 text-white' />
						</div>
						<div>
							<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
								Easier Reading
							</h3>
							<p className='text-sm text-gray-600 dark:text-gray-400'>
								No more clicking through blank pages. Your 200-page scan becomes
								a clean 100-page document that's faster to navigate.
							</p>
						</div>
					</div>
				</div>

				<div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6'>
					<div className='flex items-start gap-4'>
						<div className='p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex-shrink-0'>
							<Printer className='h-6 w-6 text-white' />
						</div>
						<div>
							<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
								Saves Printing Costs
							</h3>
							<p className='text-sm text-gray-600 dark:text-gray-400'>
								Printing 100 pages instead of 200 cuts paper and ink costs in
								half. Essential for offices and schools.
							</p>
						</div>
					</div>
				</div>

				<div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6'>
					<div className='flex items-start gap-4'>
						<div className='p-3 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex-shrink-0'>
							<Minimize2 className='h-6 w-6 text-white' />
						</div>
						<div>
							<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
								Professional Appearance
							</h3>
							<p className='text-sm text-gray-600 dark:text-gray-400'>
								Sharing a PDF with alternating blank pages looks unprofessional.
								Clean documents show attention to detail.
							</p>
						</div>
					</div>
				</div>
			</div>

			<h2>When to Be Careful</h2>

			<div className='not-prose bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-500 rounded-xl p-6 my-8'>
				<h3 className='text-lg font-bold text-amber-900 dark:text-amber-100 mb-4 flex items-center gap-2'>
					<AlertTriangle className='h-5 w-5' />
					Not All "Blank" Pages Should Be Removed
				</h3>
				<div className='space-y-3 text-sm text-amber-800 dark:text-amber-200'>
					<div>
						<h4 className='font-semibold mb-1'>Pages with Very Light Content</h4>
						<p>
							Some pages have very light text or watermarks that might be
							detected as blank. Always preview before removing.
						</p>
					</div>
					<div>
						<h4 className='font-semibold mb-1'>
							Legal Documents with Required Blank Pages
						</h4>
						<p>
							Some contracts or forms have intentional blank pages (for
							signatures, notes, etc.). Check if these are required before
							removing.
						</p>
					</div>
					<div>
						<h4 className='font-semibold mb-1'>Books with Chapter Breaks</h4>
						<p>
							Traditional book formatting uses blank pages to start chapters on
							right-hand pages. Removing these changes the layout.
						</p>
					</div>
				</div>
			</div>

			<h2>Duplex Scanning: The #1 Cause of Blank Pages</h2>

			<div className='not-prose bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-xl p-6 my-8'>
				<h3 className='text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3'>
					What Is Duplex Scanning?
				</h3>
				<p className='text-sm text-blue-800 dark:text-blue-200 mb-3'>
					<strong>Duplex</strong> means "double-sided." Duplex scanners
					automatically scan both sides of each page in one pass. Great for
					efficiency, but problematic for single-sided documents.
				</p>
				<div className='bg-white dark:bg-gray-800 p-4 rounded-lg mb-3'>
					<h4 className='font-semibold text-gray-900 dark:text-white mb-2'>
						Example:
					</h4>
					<ul className='text-sm text-gray-700 dark:text-gray-300 space-y-1'>
						<li>• You scan a 10-page single-sided document</li>
						<li>
							• Duplex scanner scans front + back of each page = 20 scans
						</li>
						<li>
							• Result: PDF with pages 1, blank, 2, blank, 3, blank... (20 total
							pages)
						</li>
						<li>• Remove blank pages → clean 10-page PDF</li>
					</ul>
				</div>
				<p className='text-sm text-blue-800 dark:text-blue-200 mb-0'>
					<strong>Prevention:</strong> Most scanners have a "simplex" (single-sided)
					mode. Use it for single-sided documents. But if you forgot and already
					scanned, blank page removal is the fastest fix.
				</p>
			</div>

			<h2>Tips for Best Results</h2>

			<div className='not-prose grid md:grid-cols-2 gap-6 my-8'>
				<div className='bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800'>
					<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-3'>
						Always Preview First
					</h3>
					<p className='text-sm text-gray-600 dark:text-gray-400'>
						Check the detected blank pages before removing. Occasionally very
						light content is misdetected as blank.
					</p>
				</div>

				<div className='bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl border border-green-200 dark:border-green-800'>
					<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-3'>
						Keep the Original
					</h3>
					<p className='text-sm text-gray-600 dark:text-gray-400'>
						Save a backup of the original PDF before removing pages, just in case
						you need to restore something.
					</p>
				</div>

				<div className='bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-xl border border-purple-200 dark:border-purple-800'>
					<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-3'>
						Adjust Sensitivity
					</h3>
					<p className='text-sm text-gray-600 dark:text-gray-400'>
						Some tools let you adjust detection sensitivity (strict vs. lenient).
						If light pages are kept, increase sensitivity. If content pages are
						deleted, decrease it.
					</p>
				</div>

				<div className='bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-6 rounded-xl border border-amber-200 dark:border-amber-800'>
					<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-3'>
						Batch Process Multiple Files
					</h3>
					<p className='text-sm text-gray-600 dark:text-gray-400'>
						If you have many scanned PDFs with blank pages, process them all at
						once. Most tools support batch operations.
					</p>
				</div>
			</div>

			<h2>Frequently Asked Questions</h2>

			<div className='not-prose space-y-4 my-8'>
				<div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6'>
					<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
						Will this remove pages with light text or watermarks?
					</h3>
					<p className='text-gray-600 dark:text-gray-400 text-sm mb-0'>
						Good tools detect any content (text, images, lines) and won't remove
						those pages. However, very faint watermarks might be missed. Always
						preview the results.
					</p>
				</div>

				<div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6'>
					<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
						Does removing blank pages reduce file size significantly?
					</h3>
					<p className='text-gray-600 dark:text-gray-400 text-sm mb-0'>
						Yes! Even "blank" scanned pages contain image data (50-200KB per
						page). Removing 100 blank pages saves 5-20MB. For large document
						archives, this adds up quickly.
					</p>
				</div>

				<div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6'>
					<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
						Will page numbers automatically update?
					</h3>
					<p className='text-gray-600 dark:text-gray-400 text-sm mb-0'>
						The physical page count updates automatically. If your PDF has page
						numbers printed on the pages themselves, those stay the same (page "5"
						is still labeled "5" even if it's now the 3rd page in the file).
					</p>
				</div>

				<div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6'>
					<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
						Can I remove every other page automatically?
					</h3>
					<p className='text-gray-600 dark:text-gray-400 text-sm mb-0'>
						Yes, but use a different tool for that. "Remove blank pages"
						specifically detects empty pages. If you want to delete pages 2, 4, 6,
						8... (all even pages), use a page deletion or extraction tool instead.
					</p>
				</div>

				<div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6'>
					<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
						Does this work on text PDFs or only scanned PDFs?
					</h3>
					<p className='text-gray-600 dark:text-gray-400 text-sm mb-0'>
						Works on both! Any PDF with blank pages (scanned images or text-based)
						can be cleaned. Scanned PDFs are the most common use case because of
						duplex scanning issues.
					</p>
				</div>
			</div>

			<h2>Conclusion</h2>

			<p>
				Removing blank pages transforms bloated scanned documents into clean,
				professional files. Whether you're fixing duplex scanning mistakes or
				cleaning up batch scans, automatic detection saves hours of manual page
				deletion.
			</p>

			<p className='text-lg font-semibold'>
				<strong>Quick Summary:</strong>
			</p>

			<ul>
				<li>
					✓ <strong>Automatic detection</strong> — finds all blank pages
					instantly
				</li>
				<li>
					✓ <strong>Reduces file size</strong> — save 5-20MB on large documents
				</li>
				<li>
					✓ <strong>Improves readability</strong> — no more clicking through
					empty pages
				</li>
				<li>
					✓ <strong>Saves printing costs</strong> — fewer pages to print
				</li>
				<li>
					✓ <strong>Fast processing</strong> — 200 pages in 15 seconds
				</li>
				<li>
					✓ <strong>Free tools available</strong> — no software needed
				</li>
			</ul>

			<p>
				The key is to always preview detected pages before removing them, to
				ensure no important content is accidentally deleted.
			</p>

			<div className='not-prose bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-8 my-8 text-center'>
				<h3 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
					Clean Up Your Scanned PDF
				</h3>
				<p className='text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto'>
					Try PDF Wonder Kit's free blank page remover — automatically detect and
					delete empty pages in seconds. No signup required, completely private.
				</p>
				<Link
					href='/blank-pages'
					className='inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-lg'>
					Remove Blank Pages Free →
				</Link>
			</div>
		</BlogLayout>
	);
}
