import { Metadata } from 'next';
import Link from 'next/link';
import { BlogLayout, BlogPost } from '@/components/blog/BlogLayout';
import {
	BookOpen,
	FileText,
	Hash,
	Search,
	Database,
	CheckCircle2,
	ArrowRight,
	Zap,
	Eye,
	Download,
	Settings,
	AlertTriangle,
	Sparkles,
	Globe,
} from 'lucide-react';

export const metadata: Metadata = {
	title: 'How Publishers Handle Book PDFs (From Manuscript to Print) | PDF Wonder Kit',
	description:
		'Professional book publishing workflow using PDFs. Learn manuscript assembly, page numbering, OCR for ebooks, metadata for distribution, and print preparation.',
	keywords: [
		'publish PDF book',
		'ebook creation',
		'PDF publishing',
		'self-publishing PDF',
		'book formatting',
		'manuscript to PDF',
		'ebook publishing workflow',
		'print-ready book PDF',
	],
	openGraph: {
		title: 'How Publishers Handle Book PDFs (From Manuscript to Print)',
		description:
			'Professional workflows for book publishing: manuscript assembly, formatting, distribution, and print preparation.',
		url: 'https://www.pdfwonderkit.com/blog/publishers-handle-book-pdfs',
	},
	alternates: {
		canonical:
			'https://www.pdfwonderkit.com/blog/publishers-handle-book-pdfs',
	},
};

const blogPost: BlogPost = {
	slug: 'publishers-handle-book-pdfs',
	title: 'How Publishers Handle Book PDFs (From Manuscript to Print)',
	description:
		'Professional book publishing workflow using PDFs. Learn manuscript assembly, page numbering, OCR for ebooks, metadata for distribution, and print preparation.',
	date: '2026-01-07',
	readTime: '12 min read',
	category: 'Industry',
	author: 'PDF WonderKit Team',
	tags: ['Publishing', 'Self-Publishing', 'Book Production', 'Industry'],
};

const publishingPhases = [
	{
		phase: 'Manuscript Assembly',
		icon: FileText,
		tasks: [
			'Combine chapters from multiple authors',
			'Add front matter (title, copyright, TOC)',
			'Include back matter (index, about author)',
		],
		tools: ['Merge PDF', 'Organize PDF'],
	},
	{
		phase: 'Formatting & Layout',
		icon: Settings,
		tasks: [
			'Professional page numbering',
			'Header/footer with book title',
			'Proper margins for printing',
		],
		tools: ['Page Numbers', 'Metadata'],
	},
	{
		phase: 'Digital Distribution',
		icon: Globe,
		tasks: [
			'OCR for searchable ebook',
			'Optimize file size',
			'Embed proper metadata',
		],
		tools: ['OCR', 'Compress', 'Metadata'],
	},
	{
		phase: 'Print Preparation',
		icon: Eye,
		tasks: [
			'High-resolution export',
			'Bleed and trim marks',
			'CMYK color conversion',
		],
		tools: ['Organize', 'Compress'],
	},
];

const distributionFormats = [
	{
		format: 'Print-on-Demand (Amazon KDP)',
		requirements: [
			'PDF/X-1a:2001 format',
			'300 DPI minimum',
			'Bleed: 0.125" all sides',
			'Trim size varies (common: 6" x 9")',
		],
		fileSize: 'Under 650MB',
	},
	{
		format: 'Digital Ebook (Kindle)',
		requirements: [
			'Searchable text (OCR)',
			'Optimized images',
			'Embedded fonts',
			'Metadata: title, author, ISBN',
		],
		fileSize: 'Under 50MB preferred',
	},
	{
		format: 'Professional Printing',
		requirements: [
			'CMYK color mode',
			'300-600 DPI',
			'Page count divisible by 4',
			'Printer-specific specs',
		],
		fileSize: 'Varies by printer',
	},
	{
		format: 'Digital Review Copy',
		requirements: [
			'Watermarked (review copy)',
			'Password protected',
			'Compressed for email',
			'Page numbers for feedback',
		],
		fileSize: 'Under 10MB',
	},
];

export default function BlogPostPage() {
	return (
		<BlogLayout post={blogPost}>
			{/* Quick Answer Box */}
			<div className='bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 rounded-xl p-6 mb-8 border border-amber-200 dark:border-amber-800'>
				<div className='flex items-start gap-4'>
					<div className='flex-shrink-0'>
						<div className='w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center'>
							<BookOpen className='w-6 h-6 text-white' />
						</div>
					</div>
					<div>
						<h3 className='font-bold text-lg mb-2 text-gray-900 dark:text-white'>
							Quick Answer: Publishing Workflow
						</h3>
						<p className='text-gray-700 dark:text-gray-300 mb-3'>
							Professional book publishing requires 4 PDF
							workflows: (1) Merge chapters and front/back matter
							into complete manuscript, (2) Add professional page
							numbers and format headers, (3) Run OCR to create
							searchable ebook version, (4) Edit metadata for
							ISBN, author, keywords. For print, export at 300 DPI
							with proper bleed. For digital, compress to under
							50MB while maintaining quality.
						</p>
						<div className='flex flex-wrap gap-2'>
							<span className='inline-flex items-center gap-1 px-3 py-1 bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 rounded-full text-sm font-medium'>
								<BookOpen className='w-4 h-4' />
								Print + Digital
							</span>
							<span className='inline-flex items-center gap-1 px-3 py-1 bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300 rounded-full text-sm font-medium'>
								<Zap className='w-4 h-4' />
								Self-publishing
							</span>
						</div>
					</div>
				</div>
			</div>

			{/* Introduction */}
			<div className='prose prose-lg dark:prose-invert max-w-none mb-12'>
				<p className='text-xl text-gray-700 dark:text-gray-300 leading-relaxed'>
					Publishing a book in 2026 means mastering PDF workflows.
					Whether you&apos;re a traditional publisher, self-publisher,
					or indie author, every book passes through{' '}
					<strong>multiple PDF formats</strong> from manuscript to
					final product—and each requires specific handling.
				</p>
				<p className='text-gray-600 dark:text-gray-400'>
					This comprehensive guide walks you through the professional
					PDF workflows publishers use to transform manuscripts into
					beautiful, distribution-ready books. You&apos;ll learn how
					to assemble chapters, add professional formatting, prepare
					for both print and digital distribution, and optimize for
					different platforms.
				</p>
			</div>

			{/* Publishing Phases */}
			<div className='mb-12'>
				<h2 className='text-3xl font-bold mb-6 text-gray-900 dark:text-white'>
					4 Phases of Book PDF Production
				</h2>
				<div className='space-y-6'>
					{publishingPhases.map((phase, index) => (
						<div
							key={index}
							className='bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700'>
							<div className='flex items-start gap-4 mb-4'>
								<div className='w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0'>
									<phase.icon className='w-6 h-6 text-white' />
								</div>
								<div className='flex-1'>
									<h3 className='text-xl font-bold text-gray-900 dark:text-white mb-2'>
										Phase {index + 1}: {phase.phase}
									</h3>
									<div className='grid md:grid-cols-2 gap-6'>
										<div>
											<h4 className='text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2'>
												Key Tasks:
											</h4>
											<ul className='space-y-1'>
												{phase.tasks.map(
													(task, taskIndex) => (
														<li
															key={taskIndex}
															className='text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2'>
															<CheckCircle2 className='w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5' />
															{task}
														</li>
													)
												)}
											</ul>
										</div>
										<div>
											<h4 className='text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2'>
												PDF Tools Used:
											</h4>
											<div className='flex flex-wrap gap-2'>
												{phase.tools.map(
													(tool, toolIndex) => (
														<span
															key={toolIndex}
															className='px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-full text-sm'>
															{tool}
														</span>
													)
												)}
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Manuscript Assembly Workflow */}
			<div className='mb-12'>
				<h2 className='text-3xl font-bold mb-6 text-gray-900 dark:text-white'>
					Complete Manuscript Assembly Workflow
				</h2>
				<div className='bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-xl p-8 border border-blue-200 dark:border-blue-800'>
					<div className='mb-6'>
						<h3 className='text-xl font-bold text-gray-900 dark:text-white mb-3'>
							From Word Documents to Complete Book:
						</h3>
						<p className='text-gray-600 dark:text-gray-400'>
							Most manuscripts arrive as separate Word documents
							(one per chapter). Your job is to transform these
							into a cohesive, professionally formatted book PDF.
						</p>
					</div>

					<div className='bg-white dark:bg-gray-900/50 rounded-lg p-6'>
						<h4 className='font-semibold text-gray-900 dark:text-white mb-4'>
							Step-by-Step Assembly:
						</h4>
						<ol className='space-y-4'>
							<li className='flex items-start gap-3'>
								<span className='flex-shrink-0 w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold'>
									1
								</span>
								<div>
									<strong className='text-gray-900 dark:text-white'>
										Convert chapters to PDF:
									</strong>
									<p className='text-sm text-gray-600 dark:text-gray-400 mt-1'>
										Export each chapter as PDF from
										Word/InDesign with consistent formatting
									</p>
								</div>
							</li>
							<li className='flex items-start gap-3'>
								<span className='flex-shrink-0 w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold'>
									2
								</span>
								<div>
									<strong className='text-gray-900 dark:text-white'>
										Organize in correct order:
									</strong>
									<p className='text-sm text-gray-600 dark:text-gray-400 mt-1'>
										Use{' '}
										<Link
											href='/organize'
											className='text-blue-600 dark:text-blue-400 hover:underline'>
											Organize PDF
										</Link>{' '}
										to reorder: Title page, copyright,
										dedication, TOC, chapters, index
									</p>
								</div>
							</li>
							<li className='flex items-start gap-3'>
								<span className='flex-shrink-0 w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold'>
									3
								</span>
								<div>
									<strong className='text-gray-900 dark:text-white'>
										Merge into single book:
									</strong>
									<p className='text-sm text-gray-600 dark:text-gray-400 mt-1'>
										Use{' '}
										<Link
											href='/merge'
											className='text-blue-600 dark:text-blue-400 hover:underline'>
											Merge PDF
										</Link>{' '}
										to combine all sections into complete
										manuscript
									</p>
								</div>
							</li>
							<li className='flex items-start gap-3'>
								<span className='flex-shrink-0 w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold'>
									4
								</span>
								<div>
									<strong className='text-gray-900 dark:text-white'>
										Add page numbers:
									</strong>
									<p className='text-sm text-gray-600 dark:text-gray-400 mt-1'>
										Use{' '}
										<Link
											href='/page-numbers'
											className='text-blue-600 dark:text-blue-400 hover:underline'>
											Add Page Numbers
										</Link>{' '}
										- Start numbering after front matter
										(usually Roman numerals for front,
										Arabic for body)
									</p>
								</div>
							</li>
							<li className='flex items-start gap-3'>
								<span className='flex-shrink-0 w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold'>
									5
								</span>
								<div>
									<strong className='text-gray-900 dark:text-white'>
										Run OCR:
									</strong>
									<p className='text-sm text-gray-600 dark:text-gray-400 mt-1'>
										Use{' '}
										<Link
											href='/ocr'
											className='text-blue-600 dark:text-blue-400 hover:underline'>
											OCR PDF
										</Link>{' '}
										to make text searchable for ebook
										readers
									</p>
								</div>
							</li>
						</ol>
					</div>
				</div>
			</div>

			{/* Metadata Workflow */}
			<div className='mb-12'>
				<h2 className='text-3xl font-bold mb-6 text-gray-900 dark:text-white'>
					Essential Metadata for Book Distribution
				</h2>
				<div className='bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-xl p-8 border border-purple-200 dark:border-purple-800'>
					<div className='mb-6'>
						<h3 className='text-xl font-bold text-gray-900 dark:text-white mb-3'>
							Why Metadata Matters:
						</h3>
						<p className='text-gray-600 dark:text-gray-400'>
							Proper PDF metadata helps readers discover your
							book, enables search engines to index it, and
							ensures ebook platforms display correct information.
							Missing or incorrect metadata can tank your
							book&apos;s discoverability.
						</p>
					</div>

					<div className='bg-white dark:bg-gray-900/50 rounded-lg p-6 mb-6'>
						<h4 className='font-semibold text-gray-900 dark:text-white mb-4'>
							Essential Metadata Fields:
						</h4>
						<div className='space-y-4'>
							<div className='border-l-4 border-purple-500 pl-4'>
								<strong className='text-gray-900 dark:text-white'>
									Title:
								</strong>
								<p className='text-sm text-gray-600 dark:text-gray-400 mt-1'>
									Exact book title including subtitle if
									applicable
									<br />
									Example: &quot;The Digital Publisher: A
									Complete Guide to Self-Publishing in
									2026&quot;
								</p>
							</div>
							<div className='border-l-4 border-purple-500 pl-4'>
								<strong className='text-gray-900 dark:text-white'>
									Author:
								</strong>
								<p className='text-sm text-gray-600 dark:text-gray-400 mt-1'>
									Author name as it should appear on covers
									and listings
								</p>
							</div>
							<div className='border-l-4 border-purple-500 pl-4'>
								<strong className='text-gray-900 dark:text-white'>
									Subject:
								</strong>
								<p className='text-sm text-gray-600 dark:text-gray-400 mt-1'>
									Primary category/genre - helps with search
									and recommendations
								</p>
							</div>
							<div className='border-l-4 border-purple-500 pl-4'>
								<strong className='text-gray-900 dark:text-white'>
									Keywords:
								</strong>
								<p className='text-sm text-gray-600 dark:text-gray-400 mt-1'>
									7-10 relevant keywords for SEO and
									discoverability
								</p>
							</div>
							<div className='border-l-4 border-purple-500 pl-4'>
								<strong className='text-gray-900 dark:text-white'>
									ISBN:
								</strong>
								<p className='text-sm text-gray-600 dark:text-gray-400 mt-1'>
									Include in metadata for professional
									distribution channels
								</p>
							</div>
						</div>
					</div>

					<div className='bg-white dark:bg-gray-900/50 rounded-lg p-6'>
						<p className='text-sm text-gray-600 dark:text-gray-400 mb-3'>
							<strong className='text-gray-900 dark:text-white'>
								How to add metadata:
							</strong>
						</p>
						<p className='text-sm text-gray-600 dark:text-gray-400'>
							Use{' '}
							<Link
								href='/metadata'
								className='text-purple-600 dark:text-purple-400 hover:underline'>
								Edit Metadata tool
							</Link>{' '}
							to add all these fields to your final PDF. Takes 2
							minutes, makes your book discoverable forever.
						</p>
					</div>
				</div>
			</div>

			{/* Distribution Format Guide */}
			<div className='mb-12'>
				<h2 className='text-3xl font-bold mb-6 text-gray-900 dark:text-white'>
					Preparing PDFs for Different Platforms
				</h2>
				<div className='grid md:grid-cols-2 gap-6'>
					{distributionFormats.map((item, index) => (
						<div
							key={index}
							className='bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700'>
							<h3 className='text-lg font-bold text-gray-900 dark:text-white mb-4'>
								{item.format}
							</h3>
							<div className='mb-4'>
								<h4 className='text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2'>
									Requirements:
								</h4>
								<ul className='space-y-2'>
									{item.requirements.map((req, reqIndex) => (
										<li
											key={reqIndex}
											className='text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2'>
											<CheckCircle2 className='w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5' />
											{req}
										</li>
									))}
								</ul>
							</div>
							<div className='bg-amber-50 dark:bg-amber-950/30 rounded-lg p-3'>
								<p className='text-sm'>
									<strong className='text-gray-900 dark:text-white'>
										File Size:
									</strong>
									<span className='text-gray-600 dark:text-gray-400 ml-2'>
										{item.fileSize}
									</span>
								</p>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Self-Publishing Checklist */}
			<div className='mb-12'>
				<h2 className='text-3xl font-bold mb-6 text-gray-900 dark:text-white'>
					Self-Publishing Checklist (Amazon KDP)
				</h2>
				<div className='bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-xl p-8 border border-green-200 dark:border-green-800'>
					<p className='text-gray-600 dark:text-gray-400 mb-6'>
						Follow this checklist to ensure your book meets Amazon
						KDP (and other POD platforms) requirements:
					</p>
					<div className='grid md:grid-cols-2 gap-4'>
						{[
							{
								task: 'Page count divisible by 4',
								why: 'Print sheets are 4 pages (2 front, 2 back)',
							},
							{
								task: 'Margins at least 0.5" inside, 0.375" outside',
								why: "Text won't get cut off in binding",
							},
							{
								task: 'Page numbers skip front matter',
								why: 'Professional book formatting standard',
							},
							{
								task: 'Bleed 0.125" on outside edges',
								why: 'Prevents white borders after trimming',
							},
							{
								task: 'All images 300 DPI minimum',
								why: 'Ensures crisp printing',
							},
							{
								task: 'Embed all fonts',
								why: 'Text appears correctly on all devices',
							},
							{
								task: 'OCR all text',
								why: 'Enables "Look Inside" feature and search',
							},
							{
								task: 'File size under 650MB',
								why: 'KDP upload limit',
							},
						].map((item, index) => (
							<div
								key={index}
								className='bg-white dark:bg-gray-900/50 rounded-lg p-4'>
								<div className='flex items-start gap-3'>
									<CheckCircle2 className='w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5' />
									<div>
										<p className='text-sm font-semibold text-gray-900 dark:text-white'>
											{item.task}
										</p>
										<p className='text-xs text-gray-600 dark:text-gray-400 mt-1'>
											{item.why}
										</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Common Publishing Mistakes */}
			<div className='mb-12'>
				<h2 className='text-3xl font-bold mb-6 text-gray-900 dark:text-white'>
					Common Publishing Mistakes That Cost Sales
				</h2>
				<div className='space-y-4'>
					<div className='bg-red-50 dark:bg-red-950/20 rounded-xl p-6 border border-red-200 dark:border-red-800'>
						<div className='flex items-start gap-3'>
							<AlertTriangle className='w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-1' />
							<div>
								<h4 className='font-bold text-gray-900 dark:text-white mb-2'>
									No OCR on Ebook Version
								</h4>
								<p className='text-sm text-gray-600 dark:text-gray-400'>
									Without OCR, readers can&apos;t search your
									book and Amazon&apos;s &quot;Look
									Inside&quot; feature doesn&apos;t work. Both
									dramatically reduce sales. Always run OCR on
									digital versions.
								</p>
							</div>
						</div>
					</div>

					<div className='bg-red-50 dark:bg-red-950/20 rounded-xl p-6 border border-red-200 dark:border-red-800'>
						<div className='flex items-start gap-3'>
							<AlertTriangle className='w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-1' />
							<div>
								<h4 className='font-bold text-gray-900 dark:text-white mb-2'>
									Missing or Incorrect Metadata
								</h4>
								<p className='text-sm text-gray-600 dark:text-gray-400'>
									Books with poor metadata don&apos;t appear
									in relevant searches. Add complete title,
									author, subject, and 7-10 keywords related
									to your book&apos;s content.
								</p>
							</div>
						</div>
					</div>

					<div className='bg-red-50 dark:bg-red-950/20 rounded-xl p-6 border border-red-200 dark:border-red-800'>
						<div className='flex items-start gap-3'>
							<AlertTriangle className='w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-1' />
							<div>
								<h4 className='font-bold text-gray-900 dark:text-white mb-2'>
									File Too Large for Distribution
								</h4>
								<p className='text-sm text-gray-600 dark:text-gray-400'>
									Huge PDFs (100MB+) fail to upload or
									download. Use{' '}
									<Link
										href='/compress'
										className='text-blue-600 dark:text-blue-400 hover:underline'>
										Compress PDF
									</Link>{' '}
									to reduce size while maintaining quality.
								</p>
							</div>
						</div>
					</div>

					<div className='bg-red-50 dark:bg-red-950/20 rounded-xl p-6 border border-red-200 dark:border-red-800'>
						<div className='flex items-start gap-3'>
							<AlertTriangle className='w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-1' />
							<div>
								<h4 className='font-bold text-gray-900 dark:text-white mb-2'>
									Different PDFs for Print vs Digital
								</h4>
								<p className='text-sm text-gray-600 dark:text-gray-400'>
									Print PDFs need bleed, CMYK, and high
									resolution. Ebook PDFs need small file size
									and searchable text. Create separate
									versions for each distribution channel.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Quality Control */}
			<div className='mb-12'>
				<h2 className='text-3xl font-bold mb-6 text-gray-900 dark:text-white'>
					Pre-Publication Quality Checklist
				</h2>
				<div className='bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700'>
					<p className='text-gray-600 dark:text-gray-400 mb-6'>
						Before publishing, verify every item on this checklist.
						One mistake can result in bad reviews and returns.
					</p>
					<div className='grid md:grid-cols-2 gap-6'>
						<div>
							<h4 className='font-semibold text-gray-900 dark:text-white mb-3'>
								Content Quality:
							</h4>
							<ul className='space-y-2'>
								{[
									'All chapters present and in correct order',
									'Page numbers sequential (no jumps or gaps)',
									'Table of contents matches actual page numbers',
									'Index entries link to correct pages',
									'All images load and display clearly',
								].map((item, index) => (
									<li
										key={index}
										className='flex items-start gap-2 text-sm'>
										<CheckCircle2 className='w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5' />
										<span className='text-gray-600 dark:text-gray-400'>
											{item}
										</span>
									</li>
								))}
							</ul>
						</div>
						<div>
							<h4 className='font-semibold text-gray-900 dark:text-white mb-3'>
								Technical Quality:
							</h4>
							<ul className='space-y-2'>
								{[
									'All text is searchable (OCR verified)',
									'Metadata complete and accurate',
									'File size within platform limits',
									'Fonts embedded properly',
									'Resolution 300+ DPI for print version',
								].map((item, index) => (
									<li
										key={index}
										className='flex items-start gap-2 text-sm'>
										<CheckCircle2 className='w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5' />
										<span className='text-gray-600 dark:text-gray-400'>
											{item}
										</span>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</div>

			{/* CTA Section */}
			<div className='bg-gradient-to-r from-amber-600 to-orange-600 rounded-2xl p-8 md:p-12 text-center text-white mb-12'>
				<h2 className='text-3xl md:text-4xl font-bold mb-4'>
					Ready to Publish Your Book?
				</h2>
				<p className='text-xl mb-8 text-amber-100'>
					Professional PDF tools for authors and publishers—completely
					free
				</p>
				<div className='grid md:grid-cols-4 gap-4 max-w-5xl mx-auto'>
					<Link
						href='/merge'
						className='bg-white text-amber-600 hover:bg-amber-50 px-6 py-4 rounded-xl font-bold transition-colors shadow-lg flex items-center justify-center gap-2'>
						<FileText className='w-5 h-5' />
						Merge Chapters
					</Link>
					<Link
						href='/page-numbers'
						className='bg-white text-amber-600 hover:bg-amber-50 px-6 py-4 rounded-xl font-bold transition-colors shadow-lg flex items-center justify-center gap-2'>
						<Hash className='w-5 h-5' />
						Page Numbers
					</Link>
					<Link
						href='/ocr'
						className='bg-white text-amber-600 hover:bg-amber-50 px-6 py-4 rounded-xl font-bold transition-colors shadow-lg flex items-center justify-center gap-2'>
						<Search className='w-5 h-5' />
						OCR
					</Link>
					<Link
						href='/metadata'
						className='bg-white text-amber-600 hover:bg-amber-50 px-6 py-4 rounded-xl font-bold transition-colors shadow-lg flex items-center justify-center gap-2'>
						<Database className='w-5 h-5' />
						Metadata
					</Link>
				</div>
				<p className='mt-6 text-sm text-amber-200'>
					✓ Professional results • ✓ No software to buy • ✓ Works in
					browser
				</p>
			</div>

			{/* Conclusion */}
			<div className='prose prose-lg dark:prose-invert max-w-none'>
				<h2>From Manuscript to Bestseller</h2>
				<p>
					Professional PDF management is what separates amateur
					self-published books from professionally published ones.
					Readers notice proper page numbering, searchable text, and
					complete metadata—even if they can&apos;t articulate why one
					book &quot;feels&quot; more professional than another.
				</p>
				<p>
					Whether you&apos;re publishing your first book or your
					fiftieth, these workflows ensure consistent quality. Follow
					the checklist, test on multiple devices, and always order a
					proof copy before launching to the public.
				</p>
				<p>
					Your manuscript deserves professional presentation. These
					free tools give you the same capabilities traditional
					publishers use—without the traditional publishing costs.
				</p>
			</div>
		</BlogLayout>
	);
}
