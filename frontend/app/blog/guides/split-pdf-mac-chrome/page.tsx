import { Metadata } from 'next';
import Link from 'next/link';
import { BlogLayout, BlogPost } from '@/components/blog/BlogLayout';
import { Apple, Chrome, Scissors } from 'lucide-react';

export const metadata: Metadata = {
	title: 'How to Split PDF on Mac with Chrome (2026 Guide)',
	description:
		'Step-by-step guide to splitting PDF files on Mac using Google Chrome. Free, fast, and works alongside Preview.',
	keywords: [
		'split pdf mac',
		'split pdf chrome',
		'mac chrome pdf splitter',
		'chrome pdf tools mac',
		'split pdf online',
	],
	openGraph: {
		title: 'How to Split PDF on Mac with Chrome (2026 Guide)',
		description:
			'Learn how to split PDF files on Mac using Google Chrome browser.',
		url: 'https://www.docslicer.com/blog/guides/split-pdf-mac-chrome',
	},
	alternates: {
		canonical:
			'https://www.docslicer.com/blog/guides/split-pdf-mac-chrome',
	},
};

const postData: BlogPost = {
	slug: 'split-pdf-mac-chrome',
	title: 'How to Split PDF on Mac with Chrome (2026 Guide)',
	description:
		'Step-by-step guide to splitting PDF files on Mac using Google Chrome. Free, fast, and works alongside Preview.',
	date: '2026-01-05',
	readTime: '4 min read',
	category: 'Platform Guides',
	author: 'DocSlicer Team',
	tags: ['mac', 'chrome', 'split pdf', 'browser tools', 'pdf tutorial'],
	featured: false,
};

export default function MacChromePage() {
	return (
		<BlogLayout post={postData}>
			<div className='prose prose-lg max-w-none'>
				<div className='flex items-center gap-4 mb-8 p-6 bg-gradient-to-r from-blue-50 to-gray-50 dark:from-blue-900/20 dark:to-gray-800/50 rounded-xl border border-blue-200 dark:border-blue-800'>
					<div className='flex gap-3'>
						<Apple className='h-8 w-8 text-gray-800 dark:text-gray-200' />
						<Chrome className='h-8 w-8 text-blue-600' />
					</div>
					<div>
						<h2 className='text-xl font-bold text-gray-900 dark:text-white mb-1 mt-0'>
							Mac + Chrome
						</h2>
						<p className='text-gray-600 dark:text-gray-400 mb-0'>
							World's most popular browser on macOS
						</p>
					</div>
				</div>

				<p className='text-xl text-gray-700 dark:text-gray-300 leading-relaxed'>
					Google Chrome is the most popular browser worldwide, and it
					works beautifully on Mac. While macOS has Preview built-in
					for PDF handling, Chrome offers excellent web-based tools
					like DocSlicer for more advanced splitting features.
				</p>

				<h2>Method 1: Chrome's Print Feature</h2>

				<div className='bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 border border-gray-200 dark:border-gray-700'>
					<h3 className='mt-0'>Quick Steps:</h3>
					<ol className='space-y-3'>
						<li>
							<strong>Open PDF</strong> in Chrome (drag to browser
							window)
						</li>
						<li>
							<strong>Press</strong> <code>⌘P</code> for print
						</li>
						<li>
							<strong>Choose</strong> "Save as PDF"
						</li>
						<li>
							<strong>Select Custom</strong> pages (e.g., "1-5")
						</li>
						<li>
							<strong>Save</strong> to your Mac
						</li>
					</ol>
				</div>

				<div className='bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-6 rounded-r-lg'>
					<h3 className='text-yellow-900 dark:text-yellow-100 mt-0'>
						Limitations
					</h3>
					<ul className='text-yellow-800 dark:text-yellow-200 mb-0'>
						<li>Only one split at a time</li>
						<li>No batch processing</li>
						<li>Limited preview options</li>
					</ul>
				</div>

				<h2 className='flex items-center gap-2'>
					<Scissors className='h-6 w-6 text-blue-600' />
					Method 2: DocSlicer in Chrome (Recommended)
				</h2>

				<div className='bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-2 border-green-200 dark:border-green-800 rounded-xl p-6'>
					<h3 className='mt-0'>Why DocSlicer in Chrome on Mac?</h3>
					<ul className='text-gray-800 dark:text-gray-200 mb-0'>
						<li>
							<strong>Familiar Interface</strong> - Chrome works
							the same on all devices
						</li>
						<li>
							<strong>Multiple Ranges</strong> - Split once,
							create many PDFs
						</li>
						<li>
							<strong>Cloud Sync</strong> - Access from any device
							with Chrome
						</li>
						<li>
							<strong>100% Private</strong> - Local processing on
							your Mac
						</li>
					</ul>
				</div>

				<div className='bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 border border-gray-200 dark:border-gray-700'>
					<h3 className='mt-0'>How to Use:</h3>
					<ol className='space-y-3'>
						<li>
							Open Chrome on your Mac and visit{' '}
							<Link
								href='/'
								className='text-blue-600 hover:underline'>
								DocSlicer.com
							</Link>
						</li>
						<li>Upload your PDF from Finder</li>
						<li>
							Preview pages and add multiple ranges
						</li>
						<li>Process all splits simultaneously</li>
						<li>
							Download individually or as ZIP
						</li>
					</ol>
				</div>

				<h2>Mac + Chrome Pro Tips</h2>

				<div className='grid md:grid-cols-2 gap-4'>
					<div className='bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800'>
						<h3 className='text-base font-semibold mt-0'>
							Keyboard Shortcuts
						</h3>
						<ul className='text-sm mb-0 space-y-1'>
							<li>
								<code>⌘T</code> - New tab
							</li>
							<li>
								<code>⌘W</code> - Close tab
							</li>
							<li>
								<code>⌘P</code> - Print/Save as PDF
							</li>
							<li>
								<code>⌘S</code> - Save download
							</li>
						</ul>
					</div>
					<div className='bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800'>
						<h3 className='text-base font-semibold mt-0'>
							Mac Integration
						</h3>
						<ul className='text-sm mb-0 space-y-1'>
							<li>Drag PDFs from Finder into Chrome</li>
							<li>Downloads go to ~/Downloads</li>
							<li>Use Handoff between Mac and iPhone</li>
							<li>iCloud sync available if enabled</li>
						</ul>
					</div>
				</div>

				<h2>Chrome vs Safari vs Preview on Mac</h2>

				<div className='bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 border border-gray-200 dark:border-gray-700'>
					<ul className='mb-0 space-y-2'>
						<li>
							<strong>Preview</strong> - Best for simple, offline
							splits
						</li>
						<li>
							<strong>Safari</strong> - Best battery life,
							optimized for Mac
						</li>
						<li>
							<strong>Chrome</strong> - Best for cross-platform
							use, familiar interface
						</li>
						<li>
							<strong>DocSlicer</strong> - Works great in all
							three!
						</li>
					</ul>
				</div>

				<h2>FAQ</h2>

				<div className='bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 border border-gray-200 dark:border-gray-700'>
					<h3 className='text-lg font-semibold mt-0'>
						Does Chrome drain battery faster than Safari on Mac?
					</h3>
					<p className='mb-0'>
						Yes, Safari is more energy-efficient on macOS. However,
						Chrome's performance has improved significantly. For
						occasional PDF splitting, the difference is minimal.
					</p>
				</div>

			</div>
		</BlogLayout>
	);
}
