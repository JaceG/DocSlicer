import { Metadata } from 'next';
import Link from 'next/link';
import { BlogLayout, BlogPost } from '@/components/blog/BlogLayout';
import {
	FileText,
	FolderOpen,
	CheckCircle2,
	Monitor,
	Apple,
	Terminal,
	Globe,
	Zap,
	Shield,
	Clock,
	AlertTriangle,
	Layers,
	ArrowDownUp,
} from 'lucide-react';

const postData: BlogPost = {
	slug: 'how-to-merge-multiple-pdfs',
	title: 'How to Merge Multiple PDFs into One (Complete Guide 2026)',
	description:
		'Combine several PDF documents into a single file on Windows, Mac, or Linux. Learn the best methods, tools, and tips for merging PDFs quickly and securely.',
	date: '2026-01-05',
	readTime: '7 min read',
	category: 'Tutorials',
	author: 'PDF Wonder Kit Team',
	tags: ['merge-pdf', 'combine-pdf', 'join-pdf', 'tutorial'],
	featured: true,
	toolSlug: 'merge',
	ctaTitle: 'Ready to Merge Your PDFs?',
	ctaDescription: 'Combine multiple PDF files into one document in seconds. Drag-and-drop reordering, 100% browser-based processing. Your files never leave your device.',
};

export const metadata: Metadata = {
	title: postData.title,
	description: postData.description,
	keywords: [
		'how to merge pdf',
		'combine pdf files',
		'merge pdf online',
		'join pdf documents',
		'merge pdf windows',
		'merge pdf mac',
		'combine pdf free',
		'pdf merger',
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

// Comparison data
const methodComparison = [
	{
		method: 'Online PDF Merger (Browser-based)',
		time: '30-60 seconds',
		difficulty: 'Very Easy',
		privacy: 'Files stay in browser',
		cost: 'Free',
		recommended: true,
	},
	{
		method: 'Adobe Acrobat Pro',
		time: '1-2 minutes',
		difficulty: 'Easy',
		privacy: 'Local processing',
		cost: '$14.99/month',
		recommended: false,
	},
	{
		method: 'Preview (Mac)',
		time: '2-3 minutes',
		difficulty: 'Medium',
		privacy: 'Local processing',
		cost: 'Free (Mac only)',
		recommended: false,
	},
	{
		method: 'PDFtk (Command Line)',
		time: '1 minute',
		difficulty: 'Hard',
		privacy: 'Local processing',
		cost: 'Free',
		recommended: false,
	},
	{
		method: 'Traditional Online Tools',
		time: '1-3 minutes',
		difficulty: 'Easy',
		privacy: '⚠️ Files uploaded to servers',
		cost: 'Free/Paid',
		recommended: false,
	},
];

export default function HowToMergePDFsPost() {
	return (
		<BlogLayout post={postData}>
			{/* Introduction */}
			<section className='mb-12'>
				<p className='text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6'>
					Need to combine multiple PDF files into one document? Whether you're
					compiling reports, merging scanned documents, or organizing research
					papers, merging PDFs is a common task. In this comprehensive guide,
					we'll show you every method to merge PDFs on any platform — from
					quick online tools to desktop applications.
				</p>

				<div className='bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800'>
					<div className='flex items-start gap-4'>
						<Zap className='w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1' />
						<div>
							<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
								Quick Answer
							</h3>
							<p className='text-gray-700 dark:text-gray-300'>
								The fastest way to merge PDFs is using a browser-based tool
								that processes files locally without uploading. You can combine
								multiple PDFs in under a minute with complete privacy. Scroll
								down for platform-specific methods.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Method Comparison */}
			<section className='mb-12'>
				<h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-6'>
					Comparison: Best Ways to Merge PDFs
				</h2>

				<div className='overflow-x-auto'>
					<table className='w-full border-collapse bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg'>
						<thead>
							<tr className='bg-gradient-to-r from-blue-500 to-indigo-600'>
								<th className='px-6 py-4 text-left text-white font-semibold'>
									Method
								</th>
								<th className='px-6 py-4 text-left text-white font-semibold'>
									Time
								</th>
								<th className='px-6 py-4 text-left text-white font-semibold'>
									Difficulty
								</th>
								<th className='px-6 py-4 text-left text-white font-semibold'>
									Privacy
								</th>
								<th className='px-6 py-4 text-left text-white font-semibold'>
									Cost
								</th>
							</tr>
						</thead>
						<tbody>
							{methodComparison.map((method, index) => (
								<tr
									key={index}
									className={`border-b border-gray-200 dark:border-gray-700 ${
										method.recommended
											? 'bg-green-50 dark:bg-green-900/10'
											: ''
									}`}>
									<td className='px-6 py-4 font-medium text-gray-900 dark:text-white'>
										{method.method}
										{method.recommended && (
											<span className='ml-2 text-xs bg-green-600 text-white px-2 py-1 rounded-full'>
												Recommended
											</span>
										)}
									</td>
									<td className='px-6 py-4 text-gray-700 dark:text-gray-300'>
										<div className='flex items-center gap-2'>
											<Clock className='w-4 h-4' />
											{method.time}
										</div>
									</td>
									<td className='px-6 py-4 text-gray-700 dark:text-gray-300'>
										{method.difficulty}
									</td>
									<td className='px-6 py-4 text-gray-700 dark:text-gray-300'>
										<div className='flex items-center gap-2'>
											<Shield className='w-4 h-4' />
											{method.privacy}
										</div>
									</td>
									<td className='px-6 py-4 text-gray-700 dark:text-gray-300'>
										{method.cost}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</section>

			{/* Method 1: Online PDF Merger */}
			<section className='mb-12'>
				<h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3'>
					<span className='flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full text-lg font-bold'>
						1
					</span>
					Best Method: Browser-Based PDF Merger (Recommended)
				</h2>

				<div className='bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-8 rounded-2xl border-2 border-blue-200 dark:border-blue-800 mb-6'>
					<div className='flex items-start gap-4 mb-6'>
						<div className='p-3 bg-blue-600 rounded-xl'>
							<Zap className='w-8 h-8 text-white' />
						</div>
						<div>
							<h3 className='text-xl font-bold text-gray-900 dark:text-white mb-2'>
								Why This Method is Best
							</h3>
							<ul className='space-y-2 text-gray-700 dark:text-gray-300'>
								<li className='flex items-start gap-2'>
									<CheckCircle2 className='w-5 h-5 text-green-600 flex-shrink-0 mt-0.5' />
									<span>
										<strong>Completely private:</strong> Files never leave your
										device
									</span>
								</li>
								<li className='flex items-start gap-2'>
									<CheckCircle2 className='w-5 h-5 text-green-600 flex-shrink-0 mt-0.5' />
									<span>
										<strong>Lightning fast:</strong> Merge multiple PDFs in
										under a minute
									</span>
								</li>
								<li className='flex items-start gap-2'>
									<CheckCircle2 className='w-5 h-5 text-green-600 flex-shrink-0 mt-0.5' />
									<span>
										<strong>No installation:</strong> Works in any modern
										browser
									</span>
								</li>
								<li className='flex items-start gap-2'>
									<CheckCircle2 className='w-5 h-5 text-green-600 flex-shrink-0 mt-0.5' />
									<span>
										<strong>Cross-platform:</strong> Windows, Mac, Linux, even
										mobile
									</span>
								</li>
							</ul>
						</div>
					</div>

					<div className='space-y-4'>
						<h4 className='text-lg font-semibold text-gray-900 dark:text-white'>
							Step-by-Step Instructions:
						</h4>

						<div className='space-y-3'>
							<div className='flex items-start gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg'>
								<div className='flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-bold flex-shrink-0'>
									1
								</div>
								<div>
									<p className='font-semibold text-gray-900 dark:text-white mb-1'>
										Open a browser-based PDF merger tool
									</p>
									<p className='text-gray-700 dark:text-gray-300 text-sm'>
										Use a tool that processes files locally in your browser for
										maximum privacy and speed.
									</p>
								</div>
							</div>

							<div className='flex items-start gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg'>
								<div className='flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-bold flex-shrink-0'>
									2
								</div>
								<div>
									<p className='font-semibold text-gray-900 dark:text-white mb-1'>
										Upload your PDF files
									</p>
									<p className='text-gray-700 dark:text-gray-300 text-sm'>
										Drag and drop all the PDFs you want to merge, or click to
										browse and select multiple files at once.
									</p>
								</div>
							</div>

							<div className='flex items-start gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg'>
								<div className='flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-bold flex-shrink-0'>
									3
								</div>
								<div>
									<p className='font-semibold text-gray-900 dark:text-white mb-1'>
										Arrange the files in order
									</p>
									<p className='text-gray-700 dark:text-gray-300 text-sm'>
										Drag to reorder the PDFs. They'll be merged in the order
										you arrange them.
									</p>
								</div>
							</div>

							<div className='flex items-start gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg'>
								<div className='flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-bold flex-shrink-0'>
									4
								</div>
								<div>
									<p className='font-semibold text-gray-900 dark:text-white mb-1'>
										Click "Merge PDFs"
									</p>
									<p className='text-gray-700 dark:text-gray-300 text-sm'>
										The tool will combine all your files instantly in your
										browser.
									</p>
								</div>
							</div>

							<div className='flex items-start gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg'>
								<div className='flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-bold flex-shrink-0'>
									5
								</div>
								<div>
									<p className='font-semibold text-gray-900 dark:text-white mb-1'>
										Download your merged PDF
									</p>
									<p className='text-gray-700 dark:text-gray-300 text-sm'>
										Save the combined file to your computer. Done in seconds!
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className='bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 p-6 rounded-r-xl'>
					<div className='flex items-start gap-3'>
						<Shield className='w-6 h-6 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-1' />
						<div>
							<h4 className='font-semibold text-amber-900 dark:text-amber-200 mb-2'>
								Privacy Tip
							</h4>
							<p className='text-amber-800 dark:text-amber-300 text-sm'>
								Browser-based tools that process files locally are the safest
								option. Your files never get uploaded to a server, so your
								sensitive documents stay completely private.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Method 2: Windows */}
			<section className='mb-12'>
				<h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3'>
					<span className='flex items-center justify-center w-10 h-10 bg-gray-600 text-white rounded-full text-lg font-bold'>
						2
					</span>
					<Monitor className='w-8 h-8' />
					How to Merge PDFs on Windows
				</h2>

				<div className='space-y-6'>
					<div className='bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700'>
						<h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-4'>
							Option 1: Using Adobe Acrobat (Paid)
						</h3>
						<ol className='list-decimal list-inside space-y-3 text-gray-700 dark:text-gray-300 ml-2'>
							<li>Open Adobe Acrobat Pro</li>
							<li>
								Click <strong>Tools</strong> → <strong>Combine Files</strong>
							</li>
							<li>
								Click <strong>Add Files</strong> and select all PDFs you want
								to merge
							</li>
							<li>Arrange files in the desired order by dragging them</li>
							<li>
								Click <strong>Combine</strong>
							</li>
							<li>
								Save your merged PDF using <strong>File</strong> →{' '}
								<strong>Save As</strong>
							</li>
						</ol>
						<div className='mt-4 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400'>
							<AlertTriangle className='w-4 h-4' />
							<span>Requires Adobe Acrobat Pro subscription ($14.99/month)</span>
						</div>
					</div>

					<div className='bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700'>
						<h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-4'>
							Option 2: Using Free PDF Software
						</h3>
						<p className='text-gray-700 dark:text-gray-300 mb-4'>
							Several free Windows applications can merge PDFs:
						</p>
						<ul className='list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-2'>
							<li>
								<strong>PDFtk Free:</strong> Powerful free tool with GUI
							</li>
							<li>
								<strong>PDF24 Creator:</strong> Easy to use, open source
							</li>
							<li>
								<strong>ILovePDF Desktop:</strong> Free with some limitations
							</li>
						</ul>
					</div>

					<div className='bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700'>
						<h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2'>
							<Terminal className='w-5 h-5' />
							Option 3: Command Line (Advanced)
						</h3>
						<p className='text-gray-700 dark:text-gray-300 mb-4'>
							If you're comfortable with command line, install PDFtk and use:
						</p>
						<div className='bg-gray-900 p-4 rounded-lg overflow-x-auto'>
							<code className='text-green-400 text-sm'>
								pdftk file1.pdf file2.pdf file3.pdf cat output merged.pdf
							</code>
						</div>
					</div>
				</div>
			</section>

			{/* Method 3: Mac */}
			<section className='mb-12'>
				<h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3'>
					<span className='flex items-center justify-center w-10 h-10 bg-gray-600 text-white rounded-full text-lg font-bold'>
						3
					</span>
					<Apple className='w-8 h-8' />
					How to Merge PDFs on Mac
				</h2>

				<div className='space-y-6'>
					<div className='bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700'>
						<h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-4'>
							Using Preview (Built-in, Free)
						</h3>
						<ol className='list-decimal list-inside space-y-3 text-gray-700 dark:text-gray-300 ml-2'>
							<li>Open the first PDF in Preview</li>
							<li>
								Click <strong>View</strong> → <strong>Thumbnails</strong> to
								show the sidebar
							</li>
							<li>
								Open Finder and locate the other PDFs you want to merge
							</li>
							<li>
								Drag and drop the PDFs from Finder into the Preview thumbnail
								sidebar
							</li>
							<li>Arrange thumbnails in the order you want</li>
							<li>
								Save the file with <strong>File</strong> → <strong>Save</strong>
							</li>
						</ol>
						<div className='mt-4 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg'>
							<p className='text-sm text-blue-800 dark:text-blue-200 flex items-start gap-2'>
								<CheckCircle2 className='w-4 h-4 flex-shrink-0 mt-0.5' />
								<span>
									<strong>Pro tip:</strong> Hold Command while dragging to
									precisely position pages between existing pages.
								</span>
							</p>
						</div>
					</div>

					<div className='bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700'>
						<h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2'>
							<Terminal className='w-5 h-5' />
							Using Terminal (Advanced)
						</h3>
						<p className='text-gray-700 dark:text-gray-300 mb-4'>
							Mac includes a built-in command for merging PDFs:
						</p>
						<div className='bg-gray-900 p-4 rounded-lg overflow-x-auto'>
							<code className='text-green-400 text-sm block mb-2'>
								cd /path/to/your/pdfs
							</code>
							<code className='text-green-400 text-sm'>
								"/System/Library/Automator/Combine PDF Pages.action/Contents/MacOS/join" -o merged.pdf file1.pdf file2.pdf file3.pdf
							</code>
						</div>
					</div>
				</div>
			</section>

			{/* Method 4: Linux */}
			<section className='mb-12'>
				<h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3'>
					<span className='flex items-center justify-center w-10 h-10 bg-gray-600 text-white rounded-full text-lg font-bold'>
						4
					</span>
					<Terminal className='w-8 h-8' />
					How to Merge PDFs on Linux
				</h2>

				<div className='space-y-6'>
					<div className='bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700'>
						<h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-4'>
							Using PDFtk (Most Popular)
						</h3>
						<p className='text-gray-700 dark:text-gray-300 mb-4'>
							Install PDFtk and use it from the command line:
						</p>
						<div className='space-y-3'>
							<div>
								<p className='text-sm text-gray-600 dark:text-gray-400 mb-2'>
									Install on Ubuntu/Debian:
								</p>
								<div className='bg-gray-900 p-4 rounded-lg overflow-x-auto'>
									<code className='text-green-400 text-sm'>
										sudo apt-get install pdftk
									</code>
								</div>
							</div>
							<div>
								<p className='text-sm text-gray-600 dark:text-gray-400 mb-2'>
									Merge PDFs:
								</p>
								<div className='bg-gray-900 p-4 rounded-lg overflow-x-auto'>
									<code className='text-green-400 text-sm'>
										pdftk file1.pdf file2.pdf file3.pdf cat output merged.pdf
									</code>
								</div>
							</div>
						</div>
					</div>

					<div className='bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700'>
						<h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-4'>
							Using Ghostscript
						</h3>
						<p className='text-gray-700 dark:text-gray-300 mb-4'>
							Ghostscript is pre-installed on most Linux distributions:
						</p>
						<div className='bg-gray-900 p-4 rounded-lg overflow-x-auto'>
							<code className='text-green-400 text-sm'>
								gs -dBATCH -dNOPAUSE -q -sDEVICE=pdfwrite -sOutputFile=merged.pdf file1.pdf file2.pdf file3.pdf
							</code>
						</div>
					</div>

					<div className='bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700'>
						<h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-4'>
							GUI Options for Linux
						</h3>
						<ul className='list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-2'>
							<li>
								<strong>PDF Mod:</strong> Simple GTK-based PDF editor
							</li>
							<li>
								<strong>PDFsam:</strong> Cross-platform, feature-rich
							</li>
							<li>
								<strong>Master PDF Editor:</strong> Professional features (paid)
							</li>
						</ul>
					</div>
				</div>
			</section>

			{/* Common Issues */}
			<section className='mb-12'>
				<h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-6'>
					Common Issues When Merging PDFs
				</h2>

				<div className='space-y-4'>
					<div className='bg-white dark:bg-gray-800 p-6 rounded-xl border-l-4 border-amber-500'>
						<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2'>
							<AlertTriangle className='w-5 h-5 text-amber-500' />
							File Size Too Large
						</h3>
						<p className='text-gray-700 dark:text-gray-300 mb-2'>
							<strong>Problem:</strong> Merged PDF is too large to email or share.
						</p>
						<p className='text-gray-700 dark:text-gray-300'>
							<strong>Solution:</strong> Compress the merged PDF using PDF compression
							tools, or merge fewer files at a time.
						</p>
					</div>

					<div className='bg-white dark:bg-gray-800 p-6 rounded-xl border-l-4 border-amber-500'>
						<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2'>
							<AlertTriangle className='w-5 h-5 text-amber-500' />
							Password-Protected PDFs
						</h3>
						<p className='text-gray-700 dark:text-gray-300 mb-2'>
							<strong>Problem:</strong> Can't merge PDFs that require a password.
						</p>
						<p className='text-gray-700 dark:text-gray-300'>
							<strong>Solution:</strong> Remove password protection first (if you have
							permission), then merge the files.
						</p>
					</div>

					<div className='bg-white dark:bg-gray-800 p-6 rounded-xl border-l-4 border-amber-500'>
						<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2'>
							<AlertTriangle className='w-5 h-5 text-amber-500' />
							Pages in Wrong Order
						</h3>
						<p className='text-gray-700 dark:text-gray-300 mb-2'>
							<strong>Problem:</strong> Merged PDF has pages in the wrong sequence.
						</p>
						<p className='text-gray-700 dark:text-gray-300'>
							<strong>Solution:</strong> Use a tool with drag-and-drop reordering, or
							number your files (01-file.pdf, 02-file.pdf) before merging.
						</p>
					</div>

					<div className='bg-white dark:bg-gray-800 p-6 rounded-xl border-l-4 border-amber-500'>
						<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2'>
							<AlertTriangle className='w-5 h-5 text-amber-500' />
							Lost Formatting or Bookmarks
						</h3>
						<p className='text-gray-700 dark:text-gray-300 mb-2'>
							<strong>Problem:</strong> Original PDF features are lost after merging.
						</p>
						<p className='text-gray-700 dark:text-gray-300'>
							<strong>Solution:</strong> Use professional tools like Adobe Acrobat Pro
							that preserve metadata, bookmarks, and interactive elements.
						</p>
					</div>
				</div>
			</section>

			{/* Tips & Best Practices */}
			<section className='mb-12'>
				<h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-6'>
					Tips for Merging PDFs Effectively
				</h2>

				<div className='grid md:grid-cols-2 gap-6'>
					<div className='bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl border border-green-200 dark:border-green-800'>
						<div className='flex items-start gap-3 mb-3'>
							<CheckCircle2 className='w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0' />
							<h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
								Name Files Logically
							</h3>
						</div>
						<p className='text-gray-700 dark:text-gray-300 text-sm'>
							Use numbered prefixes (01-intro.pdf, 02-chapter1.pdf) to ensure
							files merge in the correct order automatically.
						</p>
					</div>

					<div className='bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl border border-green-200 dark:border-green-800'>
						<div className='flex items-start gap-3 mb-3'>
							<CheckCircle2 className='w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0' />
							<h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
								Check File Sizes
							</h3>
						</div>
						<p className='text-gray-700 dark:text-gray-300 text-sm'>
							Large PDFs can be slow to merge. Compress individual files before
							merging if needed, or merge in smaller batches.
						</p>
					</div>

					<div className='bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl border border-green-200 dark:border-green-800'>
						<div className='flex items-start gap-3 mb-3'>
							<CheckCircle2 className='w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0' />
							<h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
								Preview Before Finalizing
							</h3>
						</div>
						<p className='text-gray-700 dark:text-gray-300 text-sm'>
							Always preview your merged PDF to confirm pages are in the right
							order and nothing was lost during merging.
						</p>
					</div>

					<div className='bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl border border-green-200 dark:border-green-800'>
						<div className='flex items-start gap-3 mb-3'>
							<CheckCircle2 className='w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0' />
							<h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
								Keep Original Files
							</h3>
						</div>
						<p className='text-gray-700 dark:text-gray-300 text-sm'>
							Always save the merged PDF with a new name so you don't lose the
							original separate files in case you need them later.
						</p>
					</div>
				</div>
			</section>

			{/* FAQ */}
			<section className='mb-12'>
				<h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-6'>
					Frequently Asked Questions
				</h2>

				<div className='space-y-4'>
					<div className='bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700'>
						<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
							Is it safe to merge PDFs online?
						</h3>
						<p className='text-gray-700 dark:text-gray-300'>
							It depends on the tool. Browser-based tools that process files
							locally (without uploading) are completely safe. Avoid tools that
							require uploading your files to their servers, especially for
							sensitive documents.
						</p>
					</div>

					<div className='bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700'>
						<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
							Can I merge different types of documents into one PDF?
						</h3>
						<p className='text-gray-700 dark:text-gray-300'>
							Most tools require all files to already be in PDF format. If you
							have Word docs, images, or other file types, you'll need to
							convert them to PDF first, then merge.
						</p>
					</div>

					<div className='bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700'>
						<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
							How many PDFs can I merge at once?
						</h3>
						<p className='text-gray-700 dark:text-gray-300'>
							This depends on the tool and your computer's memory. Most tools
							can handle 10-50 files easily. For hundreds of files, use
							command-line tools or merge in batches.
						</p>
					</div>

					<div className='bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700'>
						<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
							Will merging PDFs reduce quality?
						</h3>
						<p className='text-gray-700 dark:text-gray-300'>
							No, merging PDFs is a lossless process. The quality of your
							documents remains exactly the same as the originals. However, the
							file size will increase.
						</p>
					</div>

					<div className='bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700'>
						<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
							Can I merge password-protected PDFs?
						</h3>
						<p className='text-gray-700 dark:text-gray-300'>
							Most tools cannot merge password-protected PDFs directly. You'll
							need to remove the password first using the password, then merge
							the files. You can add password protection back to the merged file
							afterward.
						</p>
					</div>

					<div className='bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700'>
						<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
							Does Windows have a built-in PDF merger?
						</h3>
						<p className='text-gray-700 dark:text-gray-300'>
							Windows 10 and 11 don't include a built-in PDF merger in the same
							way Mac has Preview. You'll need to use either third-party
							software or a browser-based tool.
						</p>
					</div>
				</div>
			</section>

			{/* Conclusion */}
			<section className='mb-12'>
				<h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-6'>
					Conclusion
				</h2>

				<p className='text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6'>
					Merging PDFs doesn't have to be complicated. For most users, a
					browser-based tool offers the perfect combination of speed, privacy,
					and ease of use. You can combine multiple PDFs in under a minute
					without installing software or uploading files to any server.
				</p>

				<p className='text-lg text-gray-700 dark:text-gray-300 leading-relaxed'>
					For platform-specific needs, Mac users have the excellent built-in
					Preview app, while Windows and Linux users can choose from many free
					tools or command-line utilities. No matter which method you choose,
					you now have everything you need to merge PDFs like a pro.
				</p>
			</section>

			{/* Related Articles */}
			<section>
				<h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-6'>
					Related Articles
				</h2>

				<div className='grid md:grid-cols-2 gap-6'>
					<Link
						href='/blog/how-to-split-pdf-on-computer'
						className='group bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all hover:shadow-lg'>
						<h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors'>
							How to Split a PDF on Your Computer
						</h3>
						<p className='text-gray-600 dark:text-gray-400 text-sm'>
							Learn every method to split PDFs on Windows, Mac, and Linux.
						</p>
					</Link>

					<Link
						href='/blog/why-convert-to-pdf-before-splitting'
						className='group bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all hover:shadow-lg'>
						<h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors'>
							Why You Can't Split EPUBs Like PDFs
						</h3>
						<p className='text-gray-600 dark:text-gray-400 text-sm'>
							Understand why EPUB and other formats need conversion first.
						</p>
					</Link>
				</div>
			</section>
		</BlogLayout>
	);
}
