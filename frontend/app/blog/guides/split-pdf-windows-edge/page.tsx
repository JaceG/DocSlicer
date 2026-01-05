import { Metadata } from 'next';
import Link from 'next/link';
import { BlogLayout, BlogPost } from '@/components/blog/BlogLayout';
import { Monitor, FileText, Scissors } from 'lucide-react';

export const metadata: Metadata = {
	title: 'How to Split PDF on Windows with Edge (2026 Guide)',
	description:
		'Step-by-step guide to splitting PDF files on Windows using Microsoft Edge. Free, secure, and optimized for Windows 11.',
	keywords: [
		'split pdf windows',
		'split pdf edge',
		'windows edge pdf splitter',
		'microsoft edge pdf',
		'edge pdf tools',
		'split pdf online',
	],
	openGraph: {
		title: 'How to Split PDF on Windows with Edge (2026 Guide)',
		description:
			'Learn how to split PDF files on Windows using Microsoft Edge. Native Windows solution.',
		url: 'https://www.docslicer.com/blog/guides/split-pdf-windows-edge',
	},
	alternates: {
		canonical:
			'https://www.docslicer.com/blog/guides/split-pdf-windows-edge',
	},
};

const postData: BlogPost = {
	slug: 'split-pdf-windows-edge',
	title: 'How to Split PDF on Windows with Edge (2026 Guide)',
	description:
		'Step-by-step guide to splitting PDF files on Windows using Microsoft Edge. Free, secure, and optimized for Windows 11.',
	date: '2026-01-05',
	readTime: '4 min read',
	category: 'Platform Guides',
	author: 'DocSlicer Team',
	tags: [
		'windows',
		'microsoft edge',
		'split pdf',
		'browser tools',
		'pdf tutorial',
	],
	featured: false,
};

export default function WindowsEdgePage() {
	return (
		<BlogLayout post={postData}>
			<div className='prose prose-lg max-w-none'>
				<div className='flex items-center gap-4 mb-8 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl border border-blue-200 dark:border-blue-800'>
					<div className='flex gap-3'>
						<Monitor className='h-8 w-8 text-blue-600' />
						<svg
							className='h-8 w-8'
							viewBox='0 0 24 24'
							fill='none'>
							<path
								d='M3.5 21L10 19V12H3.5V21ZM10.5 19L20.5 17V12H10.5V19ZM3.5 11.5H10V4.5L3.5 6V11.5ZM10.5 11.5H20.5V3.5L10.5 5V11.5Z'
								fill='url(#edge-gradient)'
							/>
							<defs>
								<linearGradient
									id='edge-gradient'
									x1='3.5'
									y1='3.5'
									x2='20.5'
									y2='21'
									gradientUnits='userSpaceOnUse'>
									<stop stopColor='#0078D4' />
									<stop offset='1' stopColor='#0EA5E9' />
								</linearGradient>
							</defs>
						</svg>
					</div>
					<div>
						<h2 className='text-xl font-bold text-gray-900 dark:text-white mb-1 mt-0'>
							Windows + Edge
						</h2>
						<p className='text-gray-600 dark:text-gray-400 mb-0'>
							Microsoft's native browser optimized for Windows
						</p>
					</div>
				</div>

				<p className='text-xl text-gray-700 dark:text-gray-300 leading-relaxed'>
					Microsoft Edge is the default browser on Windows 11 and comes
					with excellent PDF viewing capabilities. Whether you're using
					Edge's built-in features or a browser-based tool like
					DocSlicer, splitting PDFs on Windows with Edge is fast and
					secure.
				</p>

				<p>
					Edge is built on Chromium (same as Chrome) but optimized
					specifically for Windows. It offers better battery life on
					laptops and deeper Windows integration than other browsers.
				</p>

				<h2>Method 1: Edge's Built-In Print Feature</h2>

				<div className='bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 border border-gray-200 dark:border-gray-700'>
					<h3 className='mt-0'>Steps to Use Edge's Print Feature:</h3>
					<ol className='space-y-3'>
						<li>
							<strong>Open your PDF</strong> in Microsoft Edge
							(drag and drop or right-click → Open with → Edge)
						</li>
						<li>
							<strong>Click the Print icon</strong> or press{' '}
							<code>Ctrl+P</code>
						</li>
						<li>
							<strong>Select "Microsoft Print to PDF"</strong> as
							printer
						</li>
						<li>
							<strong>Choose "Custom"</strong> under Pages and
							enter your range (e.g., "1-5")
						</li>
						<li>
							<strong>Click Print</strong> and save your split PDF
						</li>
					</ol>
				</div>

				<div className='bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-6 rounded-r-lg'>
					<h3 className='text-yellow-900 dark:text-yellow-100 mt-0'>
						Limitations
					</h3>
					<ul className='text-yellow-800 dark:text-yellow-200 mb-0'>
						<li>Only one range at a time</li>
						<li>No batch processing</li>
						<li>Limited preview</li>
					</ul>
				</div>

				<h2 className='flex items-center gap-2'>
					<Scissors className='h-6 w-6 text-blue-600' />
					Method 2: DocSlicer in Edge (Recommended)
				</h2>

				<div className='bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-2 border-green-200 dark:border-green-800 rounded-xl p-6'>
					<h3 className='mt-0'>Why Use DocSlicer in Edge?</h3>
					<ul className='text-gray-800 dark:text-gray-200 mb-0'>
						<li>
							<strong>Optimized for Windows</strong> - Smooth
							performance on Windows 11
						</li>
						<li>
							<strong>Multiple Page Ranges</strong> - Create
							unlimited splits
						</li>
						<li>
							<strong>100% Private</strong> - Files stay on your
							PC
						</li>
						<li>
							<strong>Batch Download</strong> - ZIP all splits
						</li>
					</ul>
				</div>

				<div className='bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 border border-gray-200 dark:border-gray-700'>
					<h3 className='mt-0'>How to Use DocSlicer in Edge:</h3>
					<ol className='space-y-3'>
						<li>
							<strong>Open Edge</strong> and go to{' '}
							<Link
								href='/'
								className='text-blue-600 hover:underline'>
								DocSlicer.com
							</Link>
						</li>
						<li>
							<strong>Upload your PDF</strong> by dragging or
							browsing
						</li>
						<li>
							<strong>Preview all pages</strong> with thumbnails
						</li>
						<li>
							<strong>Add multiple page ranges</strong> at once
						</li>
						<li>
							<strong>Click "Start Slicing"</strong> to process
						</li>
						<li>
							<strong>Download</strong> individually or as ZIP
						</li>
					</ol>
				</div>

				<h2>Windows + Edge Pro Tips</h2>

				<div className='grid md:grid-cols-2 gap-4'>
					<div className='bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800'>
						<h3 className='text-base font-semibold mt-0'>
							Windows Integration
						</h3>
						<ul className='text-sm mb-0 space-y-1'>
							<li>Right-click PDFs → Open with Edge</li>
							<li>Set Edge as default PDF viewer</li>
							<li>Use Windows Search to find PDFs</li>
						</ul>
					</div>
					<div className='bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800'>
						<h3 className='text-base font-semibold mt-0'>
							Edge Features
						</h3>
						<ul className='text-sm mb-0 space-y-1'>
							<li>Better battery life than Chrome</li>
							<li>Built-in tracking prevention</li>
							<li>Syncs with Microsoft account</li>
						</ul>
					</div>
				</div>

				<h2>Frequently Asked Questions</h2>

				<div className='space-y-6'>
					<div className='bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 border border-gray-200 dark:border-gray-700'>
						<h3 className='text-lg font-semibold mt-0'>
							Is Edge better than Chrome for PDFs on Windows?
						</h3>
						<p className='mb-0'>
							Edge is optimized for Windows and typically offers
							better performance and battery life. Both work great
							with DocSlicer, but Edge is the native choice for
							Windows users.
						</p>
					</div>

					<div className='bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 border border-gray-200 dark:border-gray-700'>
						<h3 className='text-lg font-semibold mt-0'>
							Does this work on Windows 10 and Windows 11?
						</h3>
						<p className='mb-0'>
							Yes! DocSlicer works in Edge on both Windows 10 and
							Windows 11. Edge is pre-installed on both versions.
						</p>
					</div>
				</div>
			</div>
		</BlogLayout>
	);
}
