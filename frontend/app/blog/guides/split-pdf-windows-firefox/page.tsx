import { Metadata } from 'next';
import Link from 'next/link';
import { BlogLayout, BlogPost } from '@/components/blog/BlogLayout';
import { Monitor, Scissors } from 'lucide-react';

export const metadata: Metadata = {
	title: 'How to Split PDF on Windows with Firefox (2026 Guide)',
	description:
		'Step-by-step guide to splitting PDF files on Windows using Firefox. Free, open-source, and privacy-focused solution.',
	keywords: [
		'split pdf windows',
		'split pdf firefox',
		'windows firefox pdf splitter',
		'firefox pdf tools',
		'split pdf online',
	],
	openGraph: {
		title: 'How to Split PDF on Windows with Firefox (2026 Guide)',
		description:
			'Learn how to split PDF files on Windows using Firefox browser.',
		url: 'https://www.docslicer.com/blog/guides/split-pdf-windows-firefox',
	},
	alternates: {
		canonical:
			'https://www.docslicer.com/blog/guides/split-pdf-windows-firefox',
	},
};

const postData: BlogPost = {
	slug: 'split-pdf-windows-firefox',
	title: 'How to Split PDF on Windows with Firefox (2026 Guide)',
	description:
		'Step-by-step guide to splitting PDF files on Windows using Firefox. Free, open-source, and privacy-focused solution.',
	date: '2026-01-05',
	readTime: '4 min read',
	category: 'Platform Guides',
	author: 'DocSlicer Team',
	tags: [
		'windows',
		'firefox',
		'split pdf',
		'browser tools',
		'pdf tutorial',
	],
	featured: false,
};

export default function WindowsFirefoxPage() {
	return (
		<BlogLayout post={postData}>
			<div className='prose prose-lg max-w-none'>
				<div className='flex items-center gap-4 mb-8 p-6 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl border border-orange-200 dark:border-orange-800'>
					<div className='flex gap-3'>
						<Monitor className='h-8 w-8 text-orange-600' />
						<svg
							className='h-8 w-8'
							viewBox='0 0 24 24'
							fill='none'>
							<circle
								cx='12'
								cy='12'
								r='10'
								fill='url(#firefox-gradient)'
							/>
							<path
								d='M12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20C16.42 20 20 16.42 20 12C20 7.58 16.42 4 12 4ZM14.5 16L12 14L9.5 16L10.5 13L8 11H11L12 8L13 11H16L13.5 13L14.5 16Z'
								fill='white'
							/>
							<defs>
								<linearGradient
									id='firefox-gradient'
									x1='4'
									y1='4'
									x2='20'
									y2='20'
									gradientUnits='userSpaceOnUse'>
									<stop stopColor='#FF9500' />
									<stop offset='1' stopColor='#FF3B30' />
								</linearGradient>
							</defs>
						</svg>
					</div>
					<div>
						<h2 className='text-xl font-bold text-gray-900 dark:text-white mb-1 mt-0'>
							Windows + Firefox
						</h2>
						<p className='text-gray-600 dark:text-gray-400 mb-0'>
							Privacy-focused open-source browser
						</p>
					</div>
				</div>

				<p className='text-xl text-gray-700 dark:text-gray-300 leading-relaxed'>
					Firefox is the privacy champion among browsers, making it an
					excellent choice for handling sensitive PDFs on Windows.
					Whether you're using Firefox's built-in tools or a
					browser-based solution like DocSlicer, your files stay
					private.
				</p>

				<h2>Method 1: Firefox's Built-In Print Feature</h2>

				<div className='bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 border border-gray-200 dark:border-gray-700'>
					<h3 className='mt-0'>Steps:</h3>
					<ol className='space-y-3'>
						<li>
							<strong>Open PDF</strong> in Firefox
						</li>
						<li>
							<strong>Press</strong> <code>Ctrl+P</code> to print
						</li>
						<li>
							<strong>Select</strong> "Microsoft Print to PDF"
						</li>
						<li>
							<strong>Choose Custom pages</strong> and enter range
						</li>
						<li>
							<strong>Save</strong> your split PDF
						</li>
					</ol>
				</div>

				<div className='bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-6 rounded-r-lg'>
					<h3 className='text-yellow-900 dark:text-yellow-100 mt-0'>
						Limitations
					</h3>
					<ul className='text-yellow-800 dark:text-yellow-200 mb-0'>
						<li>One range at a time only</li>
						<li>No batch processing capabilities</li>
						<li>Manual process for each split</li>
					</ul>
				</div>

				<h2 className='flex items-center gap-2'>
					<Scissors className='h-6 w-6 text-orange-600' />
					Method 2: DocSlicer in Firefox (Recommended)
				</h2>

				<div className='bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-2 border-green-200 dark:border-green-800 rounded-xl p-6'>
					<h3 className='mt-0'>Why DocSlicer in Firefox?</h3>
					<ul className='text-gray-800 dark:text-gray-200 mb-0'>
						<li>
							<strong>Maximum Privacy</strong> - Firefox + local
							processing = zero tracking
						</li>
						<li>
							<strong>Multiple Ranges</strong> - Split once,
							create many
						</li>
						<li>
							<strong>Open Source Spirit</strong> - Free tools
							working together
						</li>
						<li>
							<strong>Batch Export</strong> - ZIP download
							available
						</li>
					</ul>
				</div>

				<div className='bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 border border-gray-200 dark:border-gray-700'>
					<h3 className='mt-0'>How to Use:</h3>
					<ol className='space-y-3'>
						<li>
							Open Firefox and visit{' '}
							<Link
								href='/'
								className='text-orange-600 hover:underline'>
								DocSlicer.com
							</Link>
						</li>
						<li>Upload your PDF (drag & drop supported)</li>
						<li>Preview and select multiple page ranges</li>
						<li>Process all ranges simultaneously</li>
						<li>Download individually or as ZIP</li>
					</ol>
				</div>

				<h2>Firefox Pro Tips for Windows</h2>

				<div className='bg-orange-50 dark:bg-orange-900/20 rounded-lg p-6 border border-orange-200 dark:border-orange-800'>
					<h3 className='mt-0'>Enhanced Privacy Settings</h3>
					<ul className='mb-0'>
						<li>
							Firefox blocks trackers by default—perfect for
							sensitive docs
						</li>
						<li>Enable "Strict" tracking protection for maximum privacy</li>
						<li>No telemetry sent to Mozilla if you disable it</li>
						<li>
							DocSlicer's local processing + Firefox = ultimate
							privacy combo
						</li>
					</ul>
				</div>

				<h2>FAQ</h2>

				<div className='bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 border border-gray-200 dark:border-gray-700'>
					<h3 className='text-lg font-semibold mt-0'>
						Why choose Firefox for splitting PDFs?
					</h3>
					<p className='mb-0'>
						Firefox is open-source and privacy-focused. Combined with
						DocSlicer's local processing, you get the most private
						PDF splitting experience possible. No tracking, no data
						collection.
					</p>
				</div>

			</div>
		</BlogLayout>
	);
}
