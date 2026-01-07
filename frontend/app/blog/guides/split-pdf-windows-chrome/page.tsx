import { Metadata } from 'next';
import Link from 'next/link';
import { BlogLayout, BlogPost } from '@/components/blog/BlogLayout';
import { Chrome, Monitor, Download, FileText, Scissors } from 'lucide-react';

export const metadata: Metadata = {
	title: 'How to Split PDF on Windows with Chrome (2026 Guide)',
	description:
		'Step-by-step guide to splitting PDF files on Windows using Google Chrome. Free, secure, and no software installation required.',
	keywords: [
		'split pdf windows',
		'split pdf chrome',
		'windows chrome pdf splitter',
		'pdf splitter windows',
		'chrome pdf tools',
		'split pdf online',
	],
	openGraph: {
		title: 'How to Split PDF on Windows with Chrome (2026 Guide)',
		description:
			'Learn how to split PDF files on Windows using Google Chrome. Free and secure browser-based solution.',
		url: 'https://www.pdfwonderkit.com/blog/guides/split-pdf-windows-chrome',
	},
	alternates: {
		canonical:
			'https://www.pdfwonderkit.com/blog/guides/split-pdf-windows-chrome',
	},
};

const postData: BlogPost = {
	slug: 'split-pdf-windows-chrome',
	title: 'How to Split PDF on Windows with Chrome (2026 Guide)',
	description:
		'Step-by-step guide to splitting PDF files on Windows using Google Chrome. Free, secure, and no software installation required.',
	date: '2026-01-05',
	readTime: '4 min read',
	category: 'Platform Guides',
	author: 'PDF Wonder Kit Team',
	tags: [
		'windows',
		'chrome',
		'split pdf',
		'browser tools',
		'pdf tutorial',
	],
	featured: false,
};

export default function WindowsChromePage() {
	return (
		<BlogLayout post={postData}>
			<div className='prose prose-lg max-w-none'>
				{/* Introduction */}
				<div className='flex items-center gap-4 mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-800'>
					<div className='flex gap-3'>
						<Monitor className='h-8 w-8 text-blue-600' />
						<Chrome className='h-8 w-8 text-blue-600' />
					</div>
					<div>
						<h2 className='text-xl font-bold text-gray-900 dark:text-white mb-1 mt-0'>
							Windows + Chrome
						</h2>
						<p className='text-gray-600 dark:text-gray-400 mb-0'>
							The most popular browser on the most popular OS
						</p>
					</div>
				</div>

				<p className='text-xl text-gray-700 dark:text-gray-300 leading-relaxed'>
					Need to split a PDF on your Windows PC using Google Chrome?
					You have two main options: using Chrome's built-in PDF viewer
					or using a browser-based tool that works directly in Chrome.
				</p>

				<p>
					Chrome is the most popular browser on Windows, and it comes
					with a built-in PDF viewer. However, it's limited in
					functionality. For more powerful features like splitting PDFs
					into multiple page ranges, you'll want to use a dedicated
					tool.
				</p>

				{/* Method 1: Chrome Built-in (Limited) */}
				<h2 className='flex items-center gap-2'>
					<Chrome className='h-6 w-6 text-blue-600' />
					Method 1: Chrome's Built-In Print Feature (Limited)
				</h2>

				<p>
					Chrome's built-in PDF viewer can save specific pages, but it's
					quite limited:
				</p>

				<div className='bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 border border-gray-200 dark:border-gray-700'>
					<h3 className='mt-0 flex items-center gap-2'>
						<FileText className='h-5 w-5 text-blue-600' />
						Steps to Use Chrome's Built-in Feature:
					</h3>
					<ol className='space-y-3'>
						<li>
							<strong>Open your PDF</strong> in Google Chrome (drag
							and drop the file into a Chrome window, or
							right-click the PDF → Open with → Google Chrome)
						</li>
						<li>
							<strong>Click the Print icon</strong> in the top-right
							corner (or press <code>Ctrl+P</code>)
						</li>
						<li>
							<strong>Select "Save as PDF"</strong> as the
							destination
						</li>
						<li>
							<strong>Under "Pages"</strong>, select "Custom" and
							enter the page numbers you want (e.g., "1-5" or
							"1,3,5,7")
						</li>
						<li>
							<strong>Click Save</strong> and choose where to save
							your split PDF
						</li>
					</ol>
				</div>

				<div className='bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-6 rounded-r-lg'>
					<h3 className='text-yellow-900 dark:text-yellow-100 flex items-center gap-2 mt-0'>
						<span className='text-2xl'>⚠️</span>
						Limitations of Chrome's Built-in Method
					</h3>
					<ul className='text-yellow-800 dark:text-yellow-200 mb-0'>
						<li>Can only create one split at a time</li>
						<li>No preview of selected pages</li>
						<li>Must repeat process for multiple ranges</li>
						<li>Can't batch export multiple ranges</li>
						<li>Loses some PDF metadata and formatting</li>
					</ul>
				</div>

				{/* Method 2: PDF Wonder Kit in Chrome */}
				<h2 className='flex items-center gap-2'>
					<Scissors className='h-6 w-6 text-blue-600' />
					Method 2: PDF Wonder Kit in Chrome (Recommended)
				</h2>

				<p>
					For a much more powerful and user-friendly experience, use
					PDF Wonder Kit directly in Chrome. It's completely free and works
					entirely in your browser—no downloads or installations needed.
				</p>

				<div className='bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-2 border-green-200 dark:border-green-800 rounded-xl p-6'>
					<h3 className='mt-0 flex items-center gap-2 text-green-900 dark:text-green-100'>
						<span className='text-2xl'>🔒</span>
						Why Use PDF Wonder Kit in Chrome?
					</h3>
					<ul className='text-gray-800 dark:text-gray-200 mb-0'>
						<li>
							<strong>100% Private</strong> - Your files never leave
							your computer
						</li>
						<li>
							<strong>Multiple Page Ranges</strong> - Create
							multiple splits at once
						</li>
						<li>
							<strong>Live Preview</strong> - See your pages before
							splitting
						</li>
						<li>
							<strong>No Installation</strong> - Works directly in
							Chrome
						</li>
						<li>
							<strong>Batch Export</strong> - Download all splits as
							a ZIP file
						</li>
					</ul>
				</div>

				<div className='bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 border border-gray-200 dark:border-gray-700'>
					<h3 className='mt-0 flex items-center gap-2'>
						<Chrome className='h-5 w-5 text-blue-600' />
						How to Split PDFs in Chrome with PDF Wonder Kit:
					</h3>
					<ol className='space-y-3'>
						<li>
							<strong>Open Chrome</strong> on your Windows PC and
							navigate to{' '}
							<Link
								href='/'
								className='text-blue-600 hover:underline'>
								PDF Wonder Kit.com
							</Link>
						</li>
						<li>
							<strong>Drag and drop</strong> your PDF file into the
							upload area, or click to browse
						</li>
						<li>
							<strong>Preview your PDF</strong> - PDF Wonder Kit will
							show you all pages with thumbnails
						</li>
						<li>
							<strong>Select page ranges</strong> - Click to add as
							many ranges as you need (e.g., pages 1-5, 10-15,
							20-25)
						</li>
						<li>
							<strong>Click "Start Slicing"</strong> to process all
							your ranges at once
						</li>
						<li>
							<strong>Download</strong> your split PDFs
							individually or as a ZIP file (Premium feature)
						</li>
					</ol>
				</div>

				<p>
					The entire process happens in your Chrome browser on your
					Windows PC. Your PDF never gets uploaded to any server, which
					means it's completely private and secure.
				</p>

				{/* Windows-Specific Tips */}
				<h2 className='flex items-center gap-2'>
					<Monitor className='h-6 w-6 text-blue-600' />
					Windows + Chrome Pro Tips
				</h2>

				<div className='grid md:grid-cols-2 gap-4'>
					<div className='bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800'>
						<h3 className='text-base font-semibold text-blue-900 dark:text-blue-100 mt-0'>
							Keyboard Shortcuts
						</h3>
						<ul className='text-sm text-blue-800 dark:text-blue-200 mb-0 space-y-1'>
							<li>
								<code>Ctrl+O</code> - Open file dialog
							</li>
							<li>
								<code>Ctrl+S</code> - Save/download
							</li>
							<li>
								<code>Ctrl+P</code> - Print preview (for Chrome
								built-in method)
							</li>
						</ul>
					</div>

					<div className='bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800'>
						<h3 className='text-base font-semibold text-blue-900 dark:text-blue-100 mt-0'>
							File Management
						</h3>
						<ul className='text-sm text-blue-800 dark:text-blue-200 mb-0 space-y-1'>
							<li>Default downloads go to Downloads folder</li>
							<li>
								Change download location: Chrome Settings →
								Downloads
							</li>
							<li>
								Drag PDFs directly from File Explorer into Chrome
							</li>
						</ul>
					</div>
				</div>

				{/* Comparison Table */}
				<h2>Comparison: Chrome Built-in vs PDF Wonder Kit</h2>

				<div className='overflow-x-auto'>
					<table className='min-w-full border-collapse'>
						<thead>
							<tr className='bg-gray-100 dark:bg-gray-800'>
								<th className='border border-gray-300 dark:border-gray-700 px-4 py-2 text-left'>
									Feature
								</th>
								<th className='border border-gray-300 dark:border-gray-700 px-4 py-2 text-left'>
									Chrome Built-in
								</th>
								<th className='border border-gray-300 dark:border-gray-700 px-4 py-2 text-left'>
									PDF Wonder Kit in Chrome
								</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td className='border border-gray-300 dark:border-gray-700 px-4 py-2'>
									Multiple page ranges
								</td>
								<td className='border border-gray-300 dark:border-gray-700 px-4 py-2'>
									❌ One at a time
								</td>
								<td className='border border-gray-300 dark:border-gray-700 px-4 py-2'>
									✅ Unlimited ranges
								</td>
							</tr>
							<tr>
								<td className='border border-gray-300 dark:border-gray-700 px-4 py-2'>
									Page preview
								</td>
								<td className='border border-gray-300 dark:border-gray-700 px-4 py-2'>
									❌ No thumbnails
								</td>
								<td className='border border-gray-300 dark:border-gray-700 px-4 py-2'>
									✅ Full thumbnail preview
								</td>
							</tr>
							<tr>
								<td className='border border-gray-300 dark:border-gray-700 px-4 py-2'>
									Batch download
								</td>
								<td className='border border-gray-300 dark:border-gray-700 px-4 py-2'>
									❌ Manual each time
								</td>
								<td className='border border-gray-300 dark:border-gray-700 px-4 py-2'>
									✅ ZIP download option
								</td>
							</tr>
							<tr>
								<td className='border border-gray-300 dark:border-gray-700 px-4 py-2'>
									Privacy
								</td>
								<td className='border border-gray-300 dark:border-gray-700 px-4 py-2'>
									✅ Local processing
								</td>
								<td className='border border-gray-300 dark:border-gray-700 px-4 py-2'>
									✅ Local processing
								</td>
							</tr>
							<tr>
								<td className='border border-gray-300 dark:border-gray-700 px-4 py-2'>
									Cost
								</td>
								<td className='border border-gray-300 dark:border-gray-700 px-4 py-2'>
									Free
								</td>
								<td className='border border-gray-300 dark:border-gray-700 px-4 py-2'>
									Free (Premium: $2/month)
								</td>
							</tr>
						</tbody>
					</table>
				</div>

				{/* FAQ */}
				<h2>Frequently Asked Questions</h2>

				<div className='space-y-6'>
					<div className='bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 border border-gray-200 dark:border-gray-700'>
						<h3 className='text-lg font-semibold text-gray-900 dark:text-white mt-0'>
							Does PDF Wonder Kit work offline in Chrome on Windows?
						</h3>
						<p className='text-gray-700 dark:text-gray-300 mb-0'>
							After the initial page load, PDF Wonder Kit works
							entirely in your browser. If you have an active
							internet connection to load the page, all PDF
							processing happens locally on your Windows PC. Your
							files never get uploaded.
						</p>
					</div>

					<div className='bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 border border-gray-200 dark:border-gray-700'>
						<h3 className='text-lg font-semibold text-gray-900 dark:text-white mt-0'>
							Is Chrome on Windows better than Edge for splitting
							PDFs?
						</h3>
						<p className='text-gray-700 dark:text-gray-300 mb-0'>
							Both Chrome and Edge (which is also Chromium-based)
							work great with PDF Wonder Kit. Chrome might feel more
							familiar to most users, but Edge is optimized for
							Windows and may perform slightly better. Both work
							identically with PDF Wonder Kit.
						</p>
					</div>

					<div className='bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 border border-gray-200 dark:border-gray-700'>
						<h3 className='text-lg font-semibold text-gray-900 dark:text-white mt-0'>
							What file size can I split in Chrome on Windows?
						</h3>
						<p className='text-gray-700 dark:text-gray-300 mb-0'>
							PDF Wonder Kit supports PDFs up to 25MB for free users
							and 100MB for Premium users. Chrome itself can
							handle very large PDFs, but browser-based tools have
							practical memory limits.
						</p>
					</div>
				</div>

			</div>
		</BlogLayout>
	);
}
