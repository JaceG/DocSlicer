import { Metadata } from 'next';
import Link from 'next/link';
import { BlogLayout, BlogPost } from '@/components/blog/BlogLayout';
import { Apple, FileText, Scissors } from 'lucide-react';

export const metadata: Metadata = {
	title: 'How to Split PDF on Mac with Safari (2026 Guide)',
	description:
		'Step-by-step guide to splitting PDF files on Mac using Safari. Free, secure, and leverages macOS built-in tools plus browser-based solutions.',
	keywords: [
		'split pdf mac',
		'split pdf safari',
		'mac safari pdf splitter',
		'pdf splitter mac',
		'safari pdf tools',
		'split pdf online mac',
	],
	openGraph: {
		title: 'How to Split PDF on Mac with Safari (2026 Guide)',
		description:
			'Learn how to split PDF files on Mac using Safari. Free and secure browser-based solution.',
		url: 'https://www.docslicer.com/blog/guides/split-pdf-mac-safari',
	},
	alternates: {
		canonical:
			'https://www.docslicer.com/blog/guides/split-pdf-mac-safari',
	},
};

const postData: BlogPost = {
	slug: 'split-pdf-mac-safari',
	title: 'How to Split PDF on Mac with Safari (2026 Guide)',
	description:
		'Step-by-step guide to splitting PDF files on Mac using Safari. Free, secure, and leverages macOS built-in tools plus browser-based solutions.',
	date: '2026-01-05',
	readTime: '4 min read',
	category: 'Platform Guides',
	author: 'DocSlicer Team',
	tags: ['mac', 'safari', 'split pdf', 'browser tools', 'pdf tutorial'],
	featured: false,
};

export default function MacSafariPage() {
	return (
		<BlogLayout post={postData}>
			<div className='prose prose-lg max-w-none'>
				{/* Introduction */}
				<div className='flex items-center gap-4 mb-8 p-6 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800/50 dark:to-blue-900/20 rounded-xl border border-gray-200 dark:border-gray-700'>
					<div className='flex gap-3'>
						<Apple className='h-8 w-8 text-gray-800 dark:text-gray-200' />
						<svg
							className='h-8 w-8'
							viewBox='0 0 24 24'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'>
							<circle
								cx='12'
								cy='12'
								r='10'
								fill='url(#safari-gradient)'
							/>
							<path
								d='M12 4L13.5 9.5L19 11L13.5 12.5L12 18L10.5 12.5L5 11L10.5 9.5L12 4Z'
								fill='white'
							/>
							<defs>
								<linearGradient
									id='safari-gradient'
									x1='2'
									y1='2'
									x2='22'
									y2='22'
									gradientUnits='userSpaceOnUse'>
									<stop stopColor='#00C4F0' />
									<stop offset='1' stopColor='#0070F3' />
								</linearGradient>
							</defs>
						</svg>
					</div>
					<div>
						<h2 className='text-xl font-bold text-gray-900 dark:text-white mb-1 mt-0'>
							Mac + Safari
						</h2>
						<p className='text-gray-600 dark:text-gray-400 mb-0'>
							Native macOS browser with powerful PDF features
						</p>
					</div>
				</div>

				<p className='text-xl text-gray-700 dark:text-gray-300 leading-relaxed'>
					Need to split a PDF on your Mac using Safari? Mac users have
					a unique advantage: macOS includes powerful PDF tools
					built-in to Preview. However, for more advanced features,
					browser-based tools like DocSlicer offer even more
					flexibility.
				</p>

				<p>
					Safari is Apple's native browser and works seamlessly with
					macOS PDF features. Let's explore both the built-in Mac
					tools and the browser-based solution for splitting PDFs.
				</p>

				{/* Method 1: Mac Preview (Built-in) */}
				<h2 className='flex items-center gap-2'>
					<Apple className='h-6 w-6 text-gray-800 dark:text-gray-200' />
					Method 1: macOS Preview (Free & Built-in)
				</h2>

				<p>
					Every Mac comes with Preview, a powerful PDF tool that many
					users overlook:
				</p>

				<div className='bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 border border-gray-200 dark:border-gray-700'>
					<h3 className='mt-0 flex items-center gap-2'>
						<FileText className='h-5 w-5 text-blue-600' />
						Steps to Split PDFs with Mac Preview:
					</h3>
					<ol className='space-y-3'>
						<li>
							<strong>Open your PDF</strong> in Preview (default
							app on Mac, or right-click → Open With → Preview)
						</li>
						<li>
							<strong>View thumbnails</strong> by clicking View →
							Thumbnails in the menu bar (or <code>⌘⌥2</code>)
						</li>
						<li>
							<strong>Select pages</strong> in the thumbnail
							sidebar:
							<ul>
								<li>
									Click to select individual pages, or{' '}
									<code>⌘+click</code> for multiple
								</li>
								<li>
									<code>Shift+click</code> to select a range
								</li>
							</ul>
						</li>
						<li>
							<strong>Drag selected pages</strong> to your Desktop
							or a folder to create a new PDF with just those
							pages
						</li>
						<li>
							Or <strong>File → Export as PDF</strong> to save the
							selected pages
						</li>
					</ol>
				</div>

				<div className='bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-6 rounded-r-lg'>
					<h3 className='text-green-900 dark:text-green-100 flex items-center gap-2 mt-0'>
						<span className='text-2xl'>✅</span>
						Advantages of Mac Preview
					</h3>
					<ul className='text-green-800 dark:text-green-200 mb-0'>
						<li>Completely free and built into macOS</li>
						<li>Works offline</li>
						<li>Fast and responsive</li>
						<li>Direct drag-and-drop splitting</li>
						<li>No file size limits</li>
					</ul>
				</div>

				<div className='bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-6 rounded-r-lg mt-4'>
					<h3 className='text-yellow-900 dark:text-yellow-100 flex items-center gap-2 mt-0'>
						<span className='text-2xl'>⚠️</span>
						Limitations of Mac Preview
					</h3>
					<ul className='text-yellow-800 dark:text-yellow-200 mb-0'>
						<li>Must manually select and export each range</li>
						<li>No batch processing for multiple splits</li>
						<li>Can be tedious for complex splitting tasks</li>
						<li>No ZIP download for multiple files</li>
					</ul>
				</div>

				{/* Method 2: DocSlicer in Safari */}
				<h2 className='flex items-center gap-2'>
					<Scissors className='h-6 w-6 text-blue-600' />
					Method 2: DocSlicer in Safari (Recommended for Advanced
					Splitting)
				</h2>

				<p>
					For more powerful features—especially when you need to create
					multiple split ranges at once—DocSlicer works perfectly in
					Safari on your Mac.
				</p>

				<div className='bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-2 border-green-200 dark:border-green-800 rounded-xl p-6'>
					<h3 className='mt-0 flex items-center gap-2 text-green-900 dark:text-green-100'>
						<span className='text-2xl'>🔒</span>
						Why Use DocSlicer in Safari on Mac?
					</h3>
					<ul className='text-gray-800 dark:text-gray-200 mb-0'>
						<li>
							<strong>100% Private</strong> - Files never leave
							your Mac
						</li>
						<li>
							<strong>Multiple Page Ranges</strong> - Create many
							splits at once
						</li>
						<li>
							<strong>Live Preview</strong> - See all pages before
							splitting
						</li>
						<li>
							<strong>No Installation</strong> - Works directly in
							Safari
						</li>
						<li>
							<strong>Batch Export</strong> - Download all splits
							as a ZIP
						</li>
						<li>
							<strong>Cross-Device</strong> - Works on your iPhone
							and iPad too
						</li>
					</ul>
				</div>

				<div className='bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 border border-gray-200 dark:border-gray-700'>
					<h3 className='mt-0 flex items-center gap-2'>
						<svg
							className='h-5 w-5'
							viewBox='0 0 24 24'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'>
							<circle
								cx='12'
								cy='12'
								r='10'
								fill='url(#safari-sm-gradient)'
							/>
							<path
								d='M12 4L13.5 9.5L19 11L13.5 12.5L12 18L10.5 12.5L5 11L10.5 9.5L12 4Z'
								fill='white'
							/>
							<defs>
								<linearGradient
									id='safari-sm-gradient'
									x1='2'
									y1='2'
									x2='22'
									y2='22'
									gradientUnits='userSpaceOnUse'>
									<stop stopColor='#00C4F0' />
									<stop offset='1' stopColor='#0070F3' />
								</linearGradient>
							</defs>
						</svg>
						How to Split PDFs in Safari with DocSlicer:
					</h3>
					<ol className='space-y-3'>
						<li>
							<strong>Open Safari</strong> on your Mac and navigate
							to{' '}
							<Link
								href='/'
								className='text-blue-600 hover:underline'>
								DocSlicer.com
							</Link>
						</li>
						<li>
							<strong>Upload your PDF</strong> by dragging and
							dropping it, or clicking to browse from Finder
						</li>
						<li>
							<strong>Preview all pages</strong> with beautiful
							thumbnails
						</li>
						<li>
							<strong>Add page ranges</strong> - As many as you
							need (e.g., 1-5, 10-15, 20-25)
						</li>
						<li>
							<strong>Click "Start Slicing"</strong> to process
							everything at once
						</li>
						<li>
							<strong>Download</strong> individual PDFs or a ZIP
							file (Premium)
						</li>
					</ol>
				</div>

				<p>
					All processing happens locally in Safari on your Mac. Your
					PDF is never uploaded to any server—it stays private and
					secure on your device.
				</p>

				{/* Mac-Specific Tips */}
				<h2 className='flex items-center gap-2'>
					<Apple className='h-6 w-6 text-gray-800 dark:text-gray-200' />
					Mac + Safari Pro Tips
				</h2>

				<div className='grid md:grid-cols-2 gap-4'>
					<div className='bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800'>
						<h3 className='text-base font-semibold text-blue-900 dark:text-blue-100 mt-0'>
							Keyboard Shortcuts
						</h3>
						<ul className='text-sm text-blue-800 dark:text-blue-200 mb-0 space-y-1'>
							<li>
								<code>⌘O</code> - Open file dialog
							</li>
							<li>
								<code>⌘S</code> - Save/download
							</li>
							<li>
								<code>⌘⌥2</code> - Show thumbnails in Preview
							</li>
							<li>
								<code>Space</code> - Quick Look any PDF file
							</li>
						</ul>
					</div>

					<div className='bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800'>
						<h3 className='text-base font-semibold text-blue-900 dark:text-blue-100 mt-0'>
							File Management
						</h3>
						<ul className='text-sm text-blue-800 dark:text-blue-200 mb-0 space-y-1'>
							<li>Downloads go to ~/Downloads by default</li>
							<li>
								Quick Look PDFs with Space bar before opening
							</li>
							<li>
								Drag PDFs from Finder directly into Safari
							</li>
							<li>
								Use Spotlight (<code>⌘Space</code>) to quickly
								find PDFs
							</li>
						</ul>
					</div>
				</div>

				{/* Comparison Table */}
				<h2>Comparison: Mac Preview vs DocSlicer in Safari</h2>

				<div className='overflow-x-auto'>
					<table className='min-w-full border-collapse'>
						<thead>
							<tr className='bg-gray-100 dark:bg-gray-800'>
								<th className='border border-gray-300 dark:border-gray-700 px-4 py-2 text-left'>
									Feature
								</th>
								<th className='border border-gray-300 dark:border-gray-700 px-4 py-2 text-left'>
									Mac Preview
								</th>
								<th className='border border-gray-300 dark:border-gray-700 px-4 py-2 text-left'>
									DocSlicer in Safari
								</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td className='border border-gray-300 dark:border-gray-700 px-4 py-2'>
									Multiple page ranges
								</td>
								<td className='border border-gray-300 dark:border-gray-700 px-4 py-2'>
									⚠️ Manual process
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
									✅ Sidebar thumbnails
								</td>
								<td className='border border-gray-300 dark:border-gray-700 px-4 py-2'>
									✅ Full page viewer
								</td>
							</tr>
							<tr>
								<td className='border border-gray-300 dark:border-gray-700 px-4 py-2'>
									Batch processing
								</td>
								<td className='border border-gray-300 dark:border-gray-700 px-4 py-2'>
									❌ One range at a time
								</td>
								<td className='border border-gray-300 dark:border-gray-700 px-4 py-2'>
									✅ Process all at once
								</td>
							</tr>
							<tr>
								<td className='border border-gray-300 dark:border-gray-700 px-4 py-2'>
									ZIP download
								</td>
								<td className='border border-gray-300 dark:border-gray-700 px-4 py-2'>
									❌ Not available
								</td>
								<td className='border border-gray-300 dark:border-gray-700 px-4 py-2'>
									✅ Premium feature
								</td>
							</tr>
							<tr>
								<td className='border border-gray-300 dark:border-gray-700 px-4 py-2'>
									Works offline
								</td>
								<td className='border border-gray-300 dark:border-gray-700 px-4 py-2'>
									✅ Completely offline
								</td>
								<td className='border border-gray-300 dark:border-gray-700 px-4 py-2'>
									⚠️ Needs initial page load
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
							Does DocSlicer work on iPhone and iPad with Safari?
						</h3>
						<p className='text-gray-700 dark:text-gray-300 mb-0'>
							Yes! DocSlicer works perfectly in Safari on iOS and
							iPadOS. You can split PDFs on your iPhone or iPad
							just as easily as on your Mac.
						</p>
					</div>

					<div className='bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 border border-gray-200 dark:border-gray-700'>
						<h3 className='text-lg font-semibold text-gray-900 dark:text-white mt-0'>
							Should I use Preview or DocSlicer on my Mac?
						</h3>
						<p className='text-gray-700 dark:text-gray-300 mb-0'>
							For simple, one-off splits, Preview is fantastic and
							completely free. For complex tasks with multiple
							page ranges, batch processing, or when you need a
							ZIP download, DocSlicer in Safari is the better
							choice.
						</p>
					</div>

					<div className='bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 border border-gray-200 dark:border-gray-700'>
						<h3 className='text-lg font-semibold text-gray-900 dark:text-white mt-0'>
							Is Safari on Mac better than Chrome for splitting
							PDFs?
						</h3>
						<p className='text-gray-700 dark:text-gray-300 mb-0'>
							Safari is optimized for macOS and tends to be more
							energy-efficient, which means better battery life on
							MacBooks. Both Safari and Chrome work identically
							with DocSlicer, so choose whichever you prefer.
						</p>
					</div>
				</div>

			</div>
		</BlogLayout>
	);
}
