import { Metadata } from 'next';
import Link from 'next/link';
import { BlogLayout, BlogPost } from '@/components/blog/BlogLayout';
import {
	AlertTriangle,
	CheckCircle2,
	Monitor,
	Apple,
	Terminal,
	Globe,
	Zap,
	Shield,
	Clock,
} from 'lucide-react';

const postData: BlogPost = {
	slug: 'how-to-split-pdf-on-computer',
	title: 'How to Split a PDF on Your Computer (Complete Guide 2026)',
	description:
		'Learn every method to split PDFs on Windows, Mac, and Linux — from built-in tools to online options. Plus, discover the easiest way to do it in seconds.',
	date: '2026-01-05',
	readTime: '8 min read',
	category: 'Tutorials',
	author: 'DocSlicer Team',
	tags: ['split pdf', 'windows', 'mac', 'linux', 'tutorial', 'how to'],
	featured: true,
};

export const metadata: Metadata = {
	title: postData.title,
	description: postData.description,
	keywords: [
		'how to split pdf',
		'split pdf windows',
		'split pdf mac',
		'split pdf linux',
		'extract pages from pdf',
		'pdf splitter free',
		'divide pdf into pages',
		'separate pdf pages',
	],
	authors: [{ name: postData.author }],
	openGraph: {
		title: postData.title,
		description: postData.description,
		type: 'article',
		publishedTime: postData.date,
		authors: [postData.author],
		tags: postData.tags,
		url: `https://www.docslicer.com/blog/${postData.slug}`,
	},
	twitter: {
		card: 'summary_large_image',
		title: postData.title,
		description: postData.description,
	},
	alternates: {
		canonical: `https://www.docslicer.com/blog/${postData.slug}`,
	},
};

// Comparison data
const methodComparison = [
	{
		method: 'PDF Slicer (Online)',
		time: '30 seconds',
		difficulty: 'Very Easy',
		privacy: 'Files never uploaded',
		cost: 'Free',
		recommended: true,
	},
	{
		method: 'Adobe Acrobat',
		time: '2-3 minutes',
		difficulty: 'Easy',
		privacy: 'Local processing',
		cost: '$14.99/month',
		recommended: false,
	},
	{
		method: 'Preview (Mac)',
		time: '3-5 minutes',
		difficulty: 'Medium',
		privacy: 'Local processing',
		cost: 'Free (Mac only)',
		recommended: false,
	},
	{
		method: 'Command Line',
		time: '1-2 minutes',
		difficulty: 'Hard',
		privacy: 'Local processing',
		cost: 'Free',
		recommended: false,
	},
	{
		method: 'Other Online Tools',
		time: '1-2 minutes',
		difficulty: 'Easy',
		privacy: '⚠️ Files uploaded to servers',
		cost: 'Free/Paid',
		recommended: false,
	},
];

export default function HowToSplitPDFPost() {
	return (
		<BlogLayout post={postData}>
			{/* Quick Answer Box */}
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
							The fastest way to split a PDF is to use a browser-based
							tool like{' '}
							<Link
								href='/'
								className='text-blue-600 font-semibold hover:underline'>
								PDF Slicer
							</Link>
							. Just open your file, select the pages you want,
							and download. It takes about 30 seconds and your
							files never leave your device.
						</p>
						<Link
							href='/'
							className='inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors'>
							Try it now — it's free →
						</Link>
					</div>
				</div>
			</div>

			<p>
				Need to extract specific pages from a large PDF? Maybe you want
				to send just chapter 3 of a report, or separate a 100-page
				document into smaller files. Whatever your reason, splitting a
				PDF is a common task — but the method you choose matters more
				than you might think.
			</p>

			<p>
				In this guide, we'll cover{' '}
				<strong>every way to split a PDF</strong> on Windows, Mac, and
				Linux. We'll also explain the pros and cons of each method,
				especially when it comes to{' '}
				<strong>privacy and security</strong>.
			</p>

			{/* Table of Contents */}
			<div className='not-prose bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 my-8'>
				<h3 className='text-lg font-bold text-gray-900 dark:text-white mb-4'>
					📑 In This Guide
				</h3>
				<ul className='space-y-2'>
					<li>
						<a
							href='#windows'
							className='text-blue-600 hover:underline flex items-center gap-2'>
							<Monitor className='h-4 w-4' />
							How to Split PDF on Windows
						</a>
					</li>
					<li>
						<a
							href='#mac'
							className='text-blue-600 hover:underline flex items-center gap-2'>
							<Apple className='h-4 w-4' />
							How to Split PDF on Mac
						</a>
					</li>
					<li>
						<a
							href='#linux'
							className='text-blue-600 hover:underline flex items-center gap-2'>
							<Terminal className='h-4 w-4' />
							How to Split PDF on Linux
						</a>
					</li>
					<li>
						<a
							href='#online'
							className='text-blue-600 hover:underline flex items-center gap-2'>
							<Globe className='h-4 w-4' />
							Online PDF Splitters (and Why Privacy Matters)
						</a>
					</li>
					<li>
						<a
							href='#comparison'
							className='text-blue-600 hover:underline flex items-center gap-2'>
							<CheckCircle2 className='h-4 w-4' />
							Method Comparison Table
						</a>
					</li>
					<li>
						<a
							href='#easiest'
							className='text-blue-600 hover:underline flex items-center gap-2'>
							<Zap className='h-4 w-4' />
							The Easiest Way to Split a PDF
						</a>
					</li>
				</ul>
			</div>

			<h2 id='windows'>How to Split a PDF on Windows</h2>

			<p>
				Windows doesn't have a built-in PDF splitter, so you'll need to
				use third-party software or an online tool. Here are your
				options:
			</p>

			<h3>Option 1: Adobe Acrobat Pro (Paid)</h3>

			<p>
				If you have Adobe Acrobat Pro, splitting PDFs is
				straightforward:
			</p>

			<ol>
				<li>Open your PDF in Adobe Acrobat Pro</li>
				<li>
					Go to <strong>Tools → Organize Pages</strong>
				</li>
				<li>
					Click <strong>Split</strong> in the toolbar
				</li>
				<li>
					Choose how you want to split (by page count, file size, or
					bookmarks)
				</li>
				<li>
					Click <strong>Output Options</strong> to set where to save
				</li>
				<li>
					Click <strong>Split</strong> to create your separate PDF
					files
				</li>
			</ol>

			<div className='not-prose bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6'>
				<div className='flex items-start gap-3'>
					<AlertTriangle className='h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5' />
					<div>
						<strong className='text-amber-800 dark:text-amber-200'>
							Downside:
						</strong>
						<span className='text-amber-700 dark:text-amber-300 ml-1'>
							Adobe Acrobat Pro costs $14.99/month. If you only
							need to split a PDF occasionally, this is expensive
							overkill.
						</span>
					</div>
				</div>
			</div>

			<h3>Option 2: Microsoft Print to PDF (Free, Limited)</h3>

			<p>
				You can use Windows' built-in "Print to PDF" feature as a
				workaround:
			</p>

			<ol>
				<li>Open the PDF in any viewer (Edge, Chrome, Adobe Reader)</li>
				<li>
					Press <code>Ctrl + P</code> to open Print dialog
				</li>
				<li>
					Select <strong>Microsoft Print to PDF</strong> as your
					printer
				</li>
				<li>
					Under "Pages," enter the specific pages you want (e.g.,
					"1-5" or "3,7,12")
				</li>
				<li>
					Click <strong>Print</strong> and save the new PDF
				</li>
			</ol>

			<div className='not-prose bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6'>
				<div className='flex items-start gap-3'>
					<AlertTriangle className='h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5' />
					<div>
						<strong className='text-amber-800 dark:text-amber-200'>
							Downside:
						</strong>
						<span className='text-amber-700 dark:text-amber-300 ml-1'>
							This method only creates one output file at a time.
							If you need to extract multiple different page
							ranges, you'll have to repeat the process for each
							one. Tedious!
						</span>
					</div>
				</div>
			</div>

			<h3>Option 3: Free PDF Splitter Software</h3>

			<p>
				There are free programs like PDFsam Basic, PDF Split and Merge,
				or Icecream PDF Split & Merge. However:
			</p>

			<ul>
				<li>You need to download and install software</li>
				<li>Some "free" versions have watermarks or limitations</li>
				<li>
					May contain bundled adware — be careful what you install!
				</li>
				<li>Updates and compatibility issues over time</li>
			</ul>

			<h2 id='mac'>How to Split a PDF on Mac</h2>

			<p>
				Good news for Mac users: the built-in <strong>Preview</strong>{' '}
				app can split PDFs (sort of). Here's how:
			</p>

			<h3>Using Preview (Free, Built-in)</h3>

			<ol>
				<li>Open your PDF in Preview</li>
				<li>
					Go to <strong>View → Thumbnails</strong> to show the sidebar
				</li>
				<li>
					Select the pages you want to extract (hold Command to select
					multiple)
				</li>
				<li>
					Drag the selected thumbnails to your Desktop or a Finder
					window
				</li>
				<li>This creates a new PDF with just those pages</li>
			</ol>

			<div className='not-prose bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6'>
				<div className='flex items-start gap-3'>
					<AlertTriangle className='h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5' />
					<div>
						<strong className='text-amber-800 dark:text-amber-200'>
							Downsides:
						</strong>
						<ul className='text-amber-700 dark:text-amber-300 mt-1 space-y-1'>
							<li>
								• The drag-and-drop method can be finicky with
								large selections
							</li>
							<li>
								• No option to split into multiple files at once
							</li>
							<li>
								• Can accidentally modify the original file if
								you're not careful
							</li>
						</ul>
					</div>
				</div>
			</div>

			<h3>Alternative: Automator Workflow (Advanced)</h3>

			<p>
				For Mac power users, you can create an Automator workflow to
				split PDFs, but this requires technical knowledge and isn't
				worth the effort for most people.
			</p>

			<h2 id='linux'>How to Split a PDF on Linux</h2>

			<p>
				Linux users have several command-line options, but they require
				some technical comfort:
			</p>

			<h3>Using pdftk (PDF Toolkit)</h3>

			<pre>
				<code>
					{`# Install pdftk
sudo apt-get install pdftk

# Extract pages 1-5 from document.pdf
pdftk document.pdf cat 1-5 output pages_1-5.pdf

# Extract pages 10-20
pdftk document.pdf cat 10-20 output pages_10-20.pdf

# Extract specific pages (3, 7, and 12)
pdftk document.pdf cat 3 7 12 output selected_pages.pdf`}
				</code>
			</pre>

			<h3>Using qpdf</h3>

			<pre>
				<code>
					{`# Install qpdf
sudo apt-get install qpdf

# Extract pages 1-10
qpdf document.pdf --pages . 1-10 -- output.pdf`}
				</code>
			</pre>

			<h3>Using pdfseparate and pdfunite (Poppler)</h3>

			<pre>
				<code>
					{`# Install poppler-utils
sudo apt-get install poppler-utils

# Split into individual pages
pdfseparate document.pdf page_%d.pdf

# Combine specific pages back
pdfunite page_1.pdf page_2.pdf page_3.pdf combined.pdf`}
				</code>
			</pre>

			<div className='not-prose bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6'>
				<div className='flex items-start gap-3'>
					<AlertTriangle className='h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5' />
					<div>
						<strong className='text-amber-800 dark:text-amber-200'>
							Downside:
						</strong>
						<span className='text-amber-700 dark:text-amber-300 ml-1'>
							Command-line tools are powerful but have a steep
							learning curve. One typo can give you unexpected
							results. Not ideal for quick, occasional use.
						</span>
					</div>
				</div>
			</div>

			<h2 id='online'>Online PDF Splitters (And Why Privacy Matters)</h2>

			<p>
				There are dozens of online PDF splitters available. Just search
				"split PDF online" and you'll find options like Smallpdf,
				ILovePDF, PDF2Go, and many others.
			</p>

			<p>
				<strong>But here's the catch:</strong> Most of these services
				require you to <strong>upload your PDF to their servers</strong>
				.
			</p>

			<div className='not-prose bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-xl p-6 my-6'>
				<div className='flex items-start gap-4'>
					<div className='bg-red-500 rounded-full p-2 flex-shrink-0'>
						<Shield className='w-5 h-5 text-white' />
					</div>
					<div>
						<h3 className='text-lg font-bold text-red-800 dark:text-red-200 mb-2'>
							⚠️ Privacy Warning
						</h3>
						<p className='text-red-700 dark:text-red-300 mb-3'>
							When you upload a PDF to an online service, you're
							trusting them with your document. This could
							include:
						</p>
						<ul className='text-red-700 dark:text-red-300 space-y-1'>
							<li>• Confidential business documents</li>
							<li>• Financial statements or tax returns</li>
							<li>• Medical records</li>
							<li>• Legal contracts</li>
							<li>• Personal identification documents</li>
						</ul>
						<p className='text-red-700 dark:text-red-300 mt-3'>
							Even if the service claims to delete files
							"immediately," you have no way to verify this. Your
							data could be stored, analyzed, or even sold.
						</p>
					</div>
				</div>
			</div>

			<h3>The Solution: Client-Side Processing</h3>

			<p>
				The safest approach is to use tools that process your files{' '}
				<strong>entirely in your browser</strong>, without uploading
				them to any server. This is exactly how{' '}
				<Link
					href='/'
					className='text-blue-600 font-semibold hover:underline'>
					PDF Slicer
				</Link>{' '}
				works.
			</p>

			<div className='not-prose bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800 rounded-xl p-6 my-6'>
				<div className='flex items-start gap-4'>
					<div className='bg-green-500 rounded-full p-2 flex-shrink-0'>
						<CheckCircle2 className='w-5 h-5 text-white' />
					</div>
					<div>
						<h3 className='text-lg font-bold text-green-800 dark:text-green-200 mb-2'>
							How PDF Slicer Protects Your Privacy
						</h3>
						<ul className='text-green-700 dark:text-green-300 space-y-2'>
							<li className='flex items-start gap-2'>
								<CheckCircle2 className='h-5 w-5 flex-shrink-0 mt-0.5' />
								<span>
									<strong>
										100% browser-based processing
									</strong>{' '}
									— your files never leave your device
								</span>
							</li>
							<li className='flex items-start gap-2'>
								<CheckCircle2 className='h-5 w-5 flex-shrink-0 mt-0.5' />
								<span>
									<strong>No uploads to any server</strong> —
									we literally cannot access your documents
								</span>
							</li>
							<li className='flex items-start gap-2'>
								<CheckCircle2 className='h-5 w-5 flex-shrink-0 mt-0.5' />
								<span>
									<strong>Works offline</strong> — once
									loaded, you can disconnect from the internet
								</span>
							</li>
							<li className='flex items-start gap-2'>
								<CheckCircle2 className='h-5 w-5 flex-shrink-0 mt-0.5' />
								<span>
									<strong>Open, verifiable</strong> — you can
									check your browser's network tab to confirm
									no data is sent
								</span>
							</li>
						</ul>
					</div>
				</div>
			</div>

			<h2 id='comparison'>Method Comparison Table</h2>

			<p>Here's how all the methods stack up:</p>

			<div className='not-prose overflow-x-auto my-8'>
				<table className='min-w-full bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg'>
					<thead className='bg-gray-50 dark:bg-gray-700'>
						<tr>
							<th className='px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white'>
								Method
							</th>
							<th className='px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white'>
								<Clock className='h-4 w-4 inline mr-1' />
								Time
							</th>
							<th className='px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white'>
								Difficulty
							</th>
							<th className='px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white'>
								<Shield className='h-4 w-4 inline mr-1' />
								Privacy
							</th>
							<th className='px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white'>
								Cost
							</th>
						</tr>
					</thead>
					<tbody className='divide-y divide-gray-200 dark:divide-gray-700'>
						{methodComparison.map((row) => (
							<tr
								key={row.method}
								className={
									row.recommended
										? 'bg-green-50 dark:bg-green-900/20'
										: ''
								}>
								<td className='px-4 py-3 text-sm text-gray-900 dark:text-white font-medium'>
									{row.method}
									{row.recommended && (
										<span className='ml-2 px-2 py-0.5 bg-green-500 text-white text-xs rounded-full'>
											Recommended
										</span>
									)}
								</td>
								<td className='px-4 py-3 text-sm text-gray-600 dark:text-gray-300'>
									{row.time}
								</td>
								<td className='px-4 py-3 text-sm text-gray-600 dark:text-gray-300'>
									{row.difficulty}
								</td>
								<td className='px-4 py-3 text-sm text-gray-600 dark:text-gray-300'>
									{row.privacy}
								</td>
								<td className='px-4 py-3 text-sm text-gray-600 dark:text-gray-300'>
									{row.cost}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<h2 id='easiest'>The Easiest Way to Split a PDF</h2>

			<p>
				After reviewing all these methods, the clear winner for most
				people is using an online tool with{' '}
				<strong>client-side processing</strong>. You get the convenience
				of an online tool without sacrificing privacy.
			</p>

			<p>
				Here's how to split a PDF using{' '}
				<Link
					href='/'
					className='text-blue-600 font-semibold hover:underline'>
					PDF Slicer
				</Link>{' '}
				in about 30 seconds:
			</p>

			<div className='not-prose bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 my-8'>
				<h3 className='text-xl font-bold text-gray-900 dark:text-white mb-4'>
					⚡ Quick Steps
				</h3>
				<ol className='space-y-4'>
					<li className='flex items-start gap-3'>
						<span className='flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold'>
							1
						</span>
						<div>
							<strong className='text-gray-900 dark:text-white'>
								Go to PDF Slicer
							</strong>
							<p className='text-gray-600 dark:text-gray-300 text-sm'>
								Visit{' '}
								<Link
									href='/'
									className='text-blue-600 hover:underline'>
									docslicer.com
								</Link>{' '}
								in any modern browser
							</p>
						</div>
					</li>
					<li className='flex items-start gap-3'>
						<span className='flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold'>
							2
						</span>
						<div>
							<strong className='text-gray-900 dark:text-white'>
								Open Your PDF
							</strong>
							<p className='text-gray-600 dark:text-gray-300 text-sm'>
								Drag and drop your file, or click to browse.
								Your file stays on your computer — nothing is uploaded.
							</p>
						</div>
					</li>
					<li className='flex items-start gap-3'>
						<span className='flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold'>
							3
						</span>
						<div>
							<strong className='text-gray-900 dark:text-white'>
								Select Pages
							</strong>
							<p className='text-gray-600 dark:text-gray-300 text-sm'>
								Click thumbnails to select the pages you want,
								or enter page ranges manually.
							</p>
						</div>
					</li>
					<li className='flex items-start gap-3'>
						<span className='flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold'>
							4
						</span>
						<div>
							<strong className='text-gray-900 dark:text-white'>
								Download
							</strong>
							<p className='text-gray-600 dark:text-gray-300 text-sm'>
								Click "Slice" and download your new PDF. Done!
							</p>
						</div>
					</li>
				</ol>
			</div>

			<h2>Frequently Asked Questions</h2>

			<h3>Can I split a PDF for free?</h3>
			<p>
				Yes! PDF Slicer offers a free plan that lets you split up to 3
				PDFs per month. For unlimited use, premium is just $2/month.
			</p>

			<h3>Is it safe to use online PDF tools?</h3>
			<p>
				It depends on the tool. Most online PDF tools upload your files
				to their servers, which means your documents could potentially
				be stored or accessed. PDF Slicer is different — all processing
				happens in your browser, so your files never leave your device.
			</p>

			<h3>Can I split a password-protected PDF?</h3>
			<p>
				Most tools (including PDF Slicer) can work with
				password-protected PDFs if you know the password. You'll need to
				enter it when opening the file.
			</p>

			<h3>What's the maximum file size I can split?</h3>
			<p>
				PDF Slicer's free plan supports files up to 25MB. Premium users
				can process files up to 100MB.
			</p>

			<h3>Can I extract non-consecutive pages?</h3>
			<p>
				Yes! With PDF Slicer, you can select any combination of pages —
				they don't need to be consecutive. Select pages 1, 3, 7, and 15
				if you want.
			</p>

			<h2>Conclusion</h2>

			<p>
				Splitting a PDF doesn't have to be complicated. While there are
				many methods available — from command-line tools to expensive
				software — the simplest and safest option for most people is
				using a modern online tool with client-side processing.
			</p>

			<p>
				<Link
					href='/'
					className='text-blue-600 font-semibold hover:underline'>
					PDF Slicer
				</Link>{' '}
				combines the convenience of online tools with the privacy of
				local software. Your files never leave your device, there's
				nothing to install, and it works on any operating system with a
				web browser.
			</p>

			<p>
				<strong>Ready to try it?</strong> Visit{' '}
				<Link
					href='/'
					className='text-blue-600 font-semibold hover:underline'>
					docslicer.com
				</Link>{' '}
				and split your first PDF in less than a minute — for free.
			</p>
		</BlogLayout>
	);
}
