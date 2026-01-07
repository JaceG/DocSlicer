import { Metadata } from 'next';
import Link from 'next/link';
import { BlogLayout, BlogPost } from '@/components/blog/BlogLayout';
import { Apple, Scissors } from 'lucide-react';

export const metadata: Metadata = {
	title: 'How to Split PDF on Mac with Firefox (2026 Guide)',
	description:
		'Step-by-step guide to splitting PDF files on Mac using Firefox. Privacy-focused and open-source solution.',
	keywords: [
		'split pdf mac',
		'split pdf firefox',
		'mac firefox pdf splitter',
		'firefox pdf tools mac',
		'split pdf online',
	],
	openGraph: {
		title: 'How to Split PDF on Mac with Firefox (2026 Guide)',
		description:
			'Learn how to split PDF files on Mac using Firefox browser.',
		url: 'https://www.pdfwonderkit.com/blog/guides/split-pdf-mac-firefox',
	},
	alternates: {
		canonical:
			'https://www.pdfwonderkit.com/blog/guides/split-pdf-mac-firefox',
	},
};

const postData: BlogPost = {
	slug: 'split-pdf-mac-firefox',
	title: 'How to Split PDF on Mac with Firefox (2026 Guide)',
	description:
		'Step-by-step guide to splitting PDF files on Mac using Firefox. Privacy-focused and open-source solution.',
	date: '2026-01-05',
	readTime: '4 min read',
	category: 'Platform Guides',
	author: 'PDF Wonder Kit Team',
	tags: ['mac', 'firefox', 'split pdf', 'browser tools', 'pdf tutorial'],
	featured: false,
};

export default function MacFirefoxPage() {
	return (
		<BlogLayout post={postData}>
			<div className='prose prose-lg max-w-none'>
				<div className='flex items-center gap-4 mb-8 p-6 bg-gradient-to-r from-orange-50 to-gray-50 dark:from-orange-900/20 dark:to-gray-800/50 rounded-xl border border-orange-200 dark:border-orange-800'>
					<div className='flex gap-3'>
						<Apple className='h-8 w-8 text-gray-800 dark:text-gray-200' />
						<svg
							className='h-8 w-8'
							viewBox='0 0 24 24'
							fill='none'>
							<circle
								cx='12'
								cy='12'
								r='10'
								fill='url(#firefox-mac-gradient)'
							/>
							<path
								d='M12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20C16.42 20 20 16.42 20 12C20 7.58 16.42 4 12 4ZM14.5 16L12 14L9.5 16L10.5 13L8 11H11L12 8L13 11H16L13.5 13L14.5 16Z'
								fill='white'
							/>
							<defs>
								<linearGradient
									id='firefox-mac-gradient'
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
							Mac + Firefox
						</h2>
						<p className='text-gray-600 dark:text-gray-400 mb-0'>
							Privacy-first browser for Mac users
						</p>
					</div>
				</div>

				<p className='text-xl text-gray-700 dark:text-gray-300 leading-relaxed'>
					Firefox on Mac combines Mozilla's privacy-first philosophy
					with macOS's elegant design. For users who value privacy and
					open-source software, Firefox + PDF Wonder Kit offers the most
					private PDF splitting experience on Mac.
				</p>

				<h2>Method 1: Firefox Print Feature</h2>

				<div className='bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 border border-gray-200 dark:border-gray-700'>
					<h3 className='mt-0'>Steps:</h3>
					<ol className='space-y-3'>
						<li>
							<strong>Open PDF</strong> in Firefox
						</li>
						<li>
							<strong>Press</strong> <code>⌘P</code>
						</li>
						<li>
							<strong>Select</strong> "Save as PDF"
						</li>
						<li>
							<strong>Choose</strong> page range
						</li>
						<li>
							<strong>Save</strong> to your Mac
						</li>
					</ol>
				</div>

				<h2 className='flex items-center gap-2'>
					<Scissors className='h-6 w-6 text-orange-600' />
					Method 2: PDF Wonder Kit in Firefox (Recommended)
				</h2>

				<div className='bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-2 border-green-200 dark:border-green-800 rounded-xl p-6'>
					<h3 className='mt-0'>Why Firefox + PDF Wonder Kit on Mac?</h3>
					<ul className='text-gray-800 dark:text-gray-200 mb-0'>
						<li>
							<strong>Ultimate Privacy</strong> - No tracking from
							browser or tool
						</li>
						<li>
							<strong>Open Source</strong> - Both Firefox and
							PDF Wonder Kit respect your privacy
						</li>
						<li>
							<strong>Multiple Ranges</strong> - Advanced
							splitting features
						</li>
						<li>
							<strong>Works Offline</strong> - After initial load
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
								PDF Wonder Kit.com
							</Link>
						</li>
						<li>Upload your PDF (fully private processing)</li>
						<li>Select multiple page ranges</li>
						<li>Process all splits at once</li>
						<li>Download with zero tracking</li>
					</ol>
				</div>

				<h2>Why Choose Firefox on Mac?</h2>

				<div className='bg-orange-50 dark:bg-orange-900/20 rounded-lg p-6 border border-orange-200 dark:border-orange-800'>
					<ul className='mb-0 space-y-2'>
						<li>
							<strong>Privacy by Default</strong> - Enhanced
							Tracking Protection blocks trackers
						</li>
						<li>
							<strong>Open Source</strong> - Transparent code you
							can audit
						</li>
						<li>
							<strong>No Telemetry</strong> - Can be completely
							disabled
						</li>
						<li>
							<strong>Great for Sensitive Docs</strong> - Perfect
							for confidential PDFs
						</li>
					</ul>
				</div>

				<h2>Firefox vs Safari vs Chrome on Mac</h2>

				<div className='overflow-x-auto'>
					<table className='min-w-full border-collapse'>
						<thead>
							<tr className='bg-gray-100 dark:bg-gray-800'>
								<th className='border px-4 py-2 text-left'>
									Browser
								</th>
								<th className='border px-4 py-2 text-left'>
									Best For
								</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td className='border px-4 py-2'>
									<strong>Safari</strong>
								</td>
								<td className='border px-4 py-2'>
									Battery life, Mac integration
								</td>
							</tr>
							<tr>
								<td className='border px-4 py-2'>
									<strong>Chrome</strong>
								</td>
								<td className='border px-4 py-2'>
									Cross-platform, familiar interface
								</td>
							</tr>
							<tr>
								<td className='border px-4 py-2'>
									<strong>Firefox</strong>
								</td>
								<td className='border px-4 py-2'>
									Privacy, open-source values
								</td>
							</tr>
						</tbody>
					</table>
				</div>

				<h2>FAQ</h2>

				<div className='bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 border border-gray-200 dark:border-gray-700'>
					<h3 className='text-lg font-semibold mt-0'>
						Is Firefox slower than Safari on Mac?
					</h3>
					<p className='mb-0'>
						Modern Firefox performs excellently on Mac. While Safari
						is slightly more optimized for macOS, Firefox's
						performance is great for typical use, including PDF
						splitting with PDF Wonder Kit.
					</p>
				</div>

			</div>
		</BlogLayout>
	);
}
