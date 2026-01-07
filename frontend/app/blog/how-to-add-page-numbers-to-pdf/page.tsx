import { Metadata } from 'next';
import Link from 'next/link';
import { BlogLayout, BlogPost } from '@/components/blog/BlogLayout';
import {
	Hash,
	CheckCircle2,
	Zap,
	Shield,
	AlertTriangle,
	Monitor,
	Apple,
	BookOpen,
	FileText,
	GraduationCap,
	Briefcase,
	Book,
	Settings,
} from 'lucide-react';

const postData: BlogPost = {
	slug: 'how-to-add-page-numbers-to-pdf',
	title: 'How to Add Page Numbers to a PDF (Custom Formatting Guide)',
	description:
		'Add professional page numbers to any PDF document. Customize position, format, font, and starting number. Perfect for academic papers, reports, and ebooks. Free and private.',
	date: '2026-01-06',
	readTime: '8 min read',
	category: 'Tutorials',
	author: 'PDF Wonder Kit Team',
	tags: [
		'add-page-numbers',
		'pdf-page-numbering',
		'number-pdf-pages',
		'pdf-pagination',
	],
	featured: true,
	toolSlug: 'page-numbers',
	ctaTitle: 'Ready to Add Page Numbers?',
	ctaDescription:
		'Add professional page numbers to your PDF in seconds. Customize position, format, font, and starting number. 100% private — your files never leave your device.',
};

export const metadata: Metadata = {
	title: postData.title,
	description: postData.description,
	keywords: [
		'add page numbers to PDF',
		'PDF page numbering',
		'number PDF pages',
		'insert page numbers PDF',
		'PDF pagination',
		'add page numbers free',
		'how to number PDF pages',
		'page numbering tool',
		'custom page numbers PDF',
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

const commonUseCases = [
	{
		title: 'Academic Papers & Theses',
		icon: GraduationCap,
		description:
			'Universities and journals require page numbers on all submissions. Essential for citations and references.',
		examples: [
			'Research papers',
			'Dissertations',
			'Thesis documents',
			'Academic journals',
		],
	},
	{
		title: 'Business Reports & Proposals',
		icon: Briefcase,
		description:
			'Professional documents need page numbers for navigation and references during meetings and presentations.',
		examples: [
			'Quarterly reports',
			'Business proposals',
			'White papers',
			'Financial statements',
		],
	},
	{
		title: 'Books & Ebooks',
		icon: Book,
		description:
			'Authors and publishers need consistent page numbering for professional-looking books and manuscripts.',
		examples: [
			'Self-published books',
			'Manuscripts',
			'Technical manuals',
			'Course materials',
		],
	},
	{
		title: 'Legal Documents',
		icon: FileText,
		description:
			'Contracts and legal filings require page numbers for clear reference and official documentation.',
		examples: [
			'Contracts',
			'Court filings',
			'Legal briefs',
			'Affidavits',
		],
	},
];

const numberingFormats = [
	{
		format: 'Arabic (1, 2, 3...)',
		description: 'Standard numeric format',
		bestFor: 'Most documents, main content',
		example: '1, 2, 3, 4, 5...',
	},
	{
		format: 'Roman Lowercase (i, ii, iii...)',
		description: 'Traditional academic format',
		bestFor: 'Preface, introduction, front matter',
		example: 'i, ii, iii, iv, v...',
	},
	{
		format: 'Roman Uppercase (I, II, III...)',
		description: 'Formal chapter divisions',
		bestFor: 'Chapter numbers, major sections',
		example: 'I, II, III, IV, V...',
	},
	{
		format: 'With Prefix (Page 1, P-1)',
		description: 'Descriptive page labels',
		bestFor: 'Professional reports, presentations',
		example: 'Page 1, P-1, Pg 1',
	},
];

const positionOptions = [
	{ position: 'Bottom Center', pros: ['Most common', 'Easy to find'], cons: ['Can interfere with footers'] },
	{ position: 'Bottom Right', pros: ['Professional look', 'Out of the way'], cons: ['Less visible'] },
	{ position: 'Top Right', pros: ['Header area', 'Clear visibility'], cons: ['Can conflict with titles'] },
	{ position: 'Top Center', pros: ['Academic style', 'Prominent'], cons: ['Uses header space'] },
];

export default function AddPageNumbersToPDFPost() {
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
							Adding page numbers to a PDF takes seconds with the right tool.
							Upload your PDF, choose position and format (1, 2, 3... or i, ii,
							iii...), customize font and size, and download. Works in any
							browser with complete privacy.
						</p>
						<Link
							href='/page-numbers'
							className='inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors'>
							Add Page Numbers Free →
						</Link>
					</div>
				</div>
			</div>

			<p className='text-xl text-gray-700 dark:text-gray-300 leading-relaxed'>
				Page numbers are essential for professional documents, academic papers,
				and books. They help readers navigate, allow proper citations, and give
				your document a polished appearance. But many PDFs don't have page
				numbers, or they start at the wrong number.
			</p>

			<p>
				This guide shows you exactly how to add page numbers to any PDF,
				customize their appearance and position, and handle special cases like
				starting at a specific number or using Roman numerals for front matter.
			</p>

			<h2>Why Add Page Numbers to PDFs?</h2>

			<p>
				Page numbers aren't just decorative — they serve important practical
				purposes:
			</p>

			<div className='not-prose space-y-4 my-8'>
				<div className='flex items-start gap-3 bg-green-50 dark:bg-green-900/20 p-4 rounded-lg'>
					<CheckCircle2 className='h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5' />
					<div>
						<h3 className='font-semibold text-gray-900 dark:text-white mb-1'>
							Professional Appearance
						</h3>
						<p className='text-sm text-gray-600 dark:text-gray-400 mb-0'>
							Numbered pages signal a well-organized, professional document.
							Academic institutions, publishers, and businesses expect page
							numbers on formal documents.
						</p>
					</div>
				</div>

				<div className='flex items-start gap-3 bg-green-50 dark:bg-green-900/20 p-4 rounded-lg'>
					<CheckCircle2 className='h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5' />
					<div>
						<h3 className='font-semibold text-gray-900 dark:text-white mb-1'>
							Easy Navigation
						</h3>
						<p className='text-sm text-gray-600 dark:text-gray-400 mb-0'>
							Readers can quickly jump to specific pages. "Turn to page 42" is
							much easier than "scroll about 40% through." Essential for
							references and table of contents.
						</p>
					</div>
				</div>

				<div className='flex items-start gap-3 bg-green-50 dark:bg-green-900/20 p-4 rounded-lg'>
					<CheckCircle2 className='h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5' />
					<div>
						<h3 className='font-semibold text-gray-900 dark:text-white mb-1'>
							Academic Requirements
						</h3>
						<p className='text-sm text-gray-600 dark:text-gray-400 mb-0'>
							Universities require page numbers on all thesis and dissertation
							submissions. Many journals won't accept papers without proper
							pagination.
						</p>
					</div>
				</div>

				<div className='flex items-start gap-3 bg-green-50 dark:bg-green-900/20 p-4 rounded-lg'>
					<CheckCircle2 className='h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5' />
					<div>
						<h3 className='font-semibold text-gray-900 dark:text-white mb-1'>
							Printing Organization
						</h3>
						<p className='text-sm text-gray-600 dark:text-gray-400 mb-0'>
							If pages get shuffled after printing, page numbers let you
							reassemble them correctly. Critical for legal documents and
							contracts.
						</p>
					</div>
				</div>

				<div className='flex items-start gap-3 bg-green-50 dark:bg-green-900/20 p-4 rounded-lg'>
					<CheckCircle2 className='h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5' />
					<div>
						<h3 className='font-semibold text-gray-900 dark:text-white mb-1'>
							Citation & Referencing
						</h3>
						<p className='text-sm text-gray-600 dark:text-gray-400 mb-0'>
							Academic citations need page numbers (e.g., "Smith, 2024, p. 15").
							Readers can verify quotes and find referenced material quickly.
						</p>
					</div>
				</div>
			</div>

			<h2>How to Add Page Numbers to PDF (Step by Step)</h2>

			<p>
				The easiest method is using a browser-based tool that processes your
				file locally. Here's the complete process:
			</p>

			<div className='not-prose bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-8 rounded-2xl border-2 border-blue-200 dark:border-blue-800 mb-8'>
				<h3 className='text-xl font-bold text-gray-900 dark:text-white mb-6'>
					Using PDF Wonder Kit's Free Page Number Tool
				</h3>

				<div className='space-y-4'>
					<div className='flex items-start gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg'>
						<div className='flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-bold flex-shrink-0'>
							1
						</div>
						<div>
							<p className='font-semibold text-gray-900 dark:text-white mb-1'>
								Open the Page Number Tool
							</p>
							<p className='text-gray-700 dark:text-gray-300 text-sm'>
								Visit{' '}
								<Link
									href='/page-numbers'
									className='text-blue-600 hover:underline'>
									pdfwonderkit.com/page-numbers
								</Link>{' '}
								in any modern browser. Works on Windows, Mac, Linux, and tablets.
							</p>
						</div>
					</div>

					<div className='flex items-start gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg'>
						<div className='flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-bold flex-shrink-0'>
							2
						</div>
						<div>
							<p className='font-semibold text-gray-900 dark:text-white mb-1'>
								Upload Your PDF
							</p>
							<p className='text-gray-700 dark:text-gray-300 text-sm'>
								Drag and drop your PDF file, or click to browse.{' '}
								<strong className='text-blue-600'>
									Your file stays on your device
								</strong>{' '}
								— all processing happens in your browser, nothing is uploaded.
							</p>
						</div>
					</div>

					<div className='flex items-start gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg'>
						<div className='flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-bold flex-shrink-0'>
							3
						</div>
						<div>
							<p className='font-semibold text-gray-900 dark:text-white mb-1'>
								Choose Number Format
							</p>
							<p className='text-gray-700 dark:text-gray-300 text-sm'>
								Select your preferred format: Arabic (1, 2, 3...), Roman
								lowercase (i, ii, iii...), Roman uppercase (I, II, III...), or
								custom with prefix (Page 1, P-1).
							</p>
						</div>
					</div>

					<div className='flex items-start gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg'>
						<div className='flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-bold flex-shrink-0'>
							4
						</div>
						<div>
							<p className='font-semibold text-gray-900 dark:text-white mb-1'>
								Select Position
							</p>
							<p className='text-gray-700 dark:text-gray-300 text-sm'>
								Choose where to place page numbers: bottom center, bottom right,
								top right, or top center. Preview shows exactly how it will look.
							</p>
						</div>
					</div>

					<div className='flex items-start gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg'>
						<div className='flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-bold flex-shrink-0'>
							5
						</div>
						<div>
							<p className='font-semibold text-gray-900 dark:text-white mb-1'>
								Customize Appearance
							</p>
							<p className='text-gray-700 dark:text-gray-300 text-sm'>
								Adjust font family, size, and color. Set starting page number
								(useful if this is chapter 2, starting at page 25). Choose which
								pages to number (all, odd, or even only).
							</p>
						</div>
					</div>

					<div className='flex items-start gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg'>
						<div className='flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-bold flex-shrink-0'>
							6
						</div>
						<div>
							<p className='font-semibold text-gray-900 dark:text-white mb-1'>
								Preview and Download
							</p>
							<p className='text-gray-700 dark:text-gray-300 text-sm'>
								Preview a sample page to confirm it looks right. Click "Add Page
								Numbers" and download your newly numbered PDF.
							</p>
						</div>
					</div>
				</div>

				<div className='mt-6 p-4 bg-green-100 dark:bg-green-900/30 rounded-lg'>
					<p className='text-sm text-green-800 dark:text-green-300 flex items-center gap-2 mb-0'>
						<Shield className='h-4 w-4' />
						<strong>Total time: 30-60 seconds.</strong> No software to install,
						no account needed.
					</p>
				</div>
			</div>

			<h2>Page Number Formats Explained</h2>

			<p>
				Different documents use different numbering styles. Here's when to use
				each:
			</p>

			<div className='not-prose space-y-6 my-8'>
				{numberingFormats.map((format, idx) => (
					<div
						key={idx}
						className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6'>
						<div className='flex items-start gap-4'>
							<div className='p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex-shrink-0'>
								<Hash className='h-6 w-6 text-white' />
							</div>
							<div className='flex-1'>
								<h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>
									{format.format}
								</h3>
								<p className='text-sm text-gray-600 dark:text-gray-400 mb-3'>
									{format.description}
								</p>
								<div className='grid md:grid-cols-2 gap-3'>
									<div className='bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg'>
										<p className='text-xs font-semibold text-blue-900 dark:text-blue-200 mb-1'>
											Best For:
										</p>
										<p className='text-sm text-blue-800 dark:text-blue-300 mb-0'>
											{format.bestFor}
										</p>
									</div>
									<div className='bg-gray-50 dark:bg-gray-700 p-3 rounded-lg'>
										<p className='text-xs font-semibold text-gray-900 dark:text-gray-200 mb-1'>
											Example:
										</p>
										<p className='text-sm text-gray-800 dark:text-gray-300 mb-0 font-mono'>
											{format.example}
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>

			<div className='not-prose bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 my-8'>
				<h4 className='font-semibold text-blue-900 dark:text-blue-100 mb-2 flex items-center gap-2'>
					<BookOpen className='h-5 w-5' />
					Academic Convention: Front Matter vs. Main Content
				</h4>
				<p className='text-sm text-blue-800 dark:text-blue-200 mb-3'>
					Traditional academic formatting uses different numbering for different
					sections:
				</p>
				<ul className='text-sm text-blue-800 dark:text-blue-200 space-y-1 mb-0'>
					<li>
						• <strong>Front matter</strong> (abstract, acknowledgments,
						table of contents): Roman numerals (i, ii, iii...)
					</li>
					<li>
						• <strong>Main content</strong> (chapters, body): Arabic numerals
						starting at 1 (1, 2, 3...)
					</li>
					<li>
						• <strong>Appendices</strong>: Continue Arabic or use letters
						(A-1, B-1...)
					</li>
				</ul>
			</div>

			<h2>Position Options</h2>

			<p>
				Where you place page numbers affects both readability and document
				aesthetics:
			</p>

			<div className='not-prose grid md:grid-cols-2 gap-6 my-8'>
				{positionOptions.map((option, idx) => (
					<div
						key={idx}
						className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6'>
						<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
							{option.position}
						</h3>
						<div className='space-y-3'>
							<div className='bg-green-50 dark:bg-green-900/20 p-3 rounded-lg'>
								<h4 className='text-xs font-semibold text-green-900 dark:text-green-200 mb-2'>
									✓ Pros
								</h4>
								<ul className='text-sm text-green-800 dark:text-green-300 space-y-1'>
									{option.pros.map((pro, i) => (
										<li key={i}>• {pro}</li>
									))}
								</ul>
							</div>
							<div className='bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg'>
								<h4 className='text-xs font-semibold text-amber-900 dark:text-amber-200 mb-2'>
									⚠ Cons
								</h4>
								<ul className='text-sm text-amber-800 dark:text-amber-300 space-y-1'>
									{option.cons.map((con, i) => (
										<li key={i}>• {con}</li>
									))}
								</ul>
							</div>
						</div>
					</div>
				))}
			</div>

			<h2>Common Use Cases</h2>

			<p>
				Page numbers are essential across many document types and industries:
			</p>

			<div className='not-prose grid md:grid-cols-2 gap-6 my-8'>
				{commonUseCases.map((useCase, idx) => {
					const IconComponent = useCase.icon;
					return (
						<div
							key={idx}
							className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6'>
							<div className='flex items-start gap-4 mb-4'>
								<div className='p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex-shrink-0'>
									<IconComponent className='h-6 w-6 text-white' />
								</div>
								<div>
									<h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>
										{useCase.title}
									</h3>
									<p className='text-gray-600 dark:text-gray-400 mb-4 text-sm'>
										{useCase.description}
									</p>
									<div className='flex flex-wrap gap-2'>
										{useCase.examples.map((example, i) => (
											<span
												key={i}
												className='px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full'>
												{example}
											</span>
										))}
									</div>
								</div>
							</div>
						</div>
					);
				})}
			</div>

			<h2>Advanced Page Numbering Scenarios</h2>

			<div className='not-prose space-y-6 my-8'>
				<div className='bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-xl border border-purple-200 dark:border-purple-800'>
					<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2'>
						<Settings className='h-5 w-5 text-purple-600 dark:text-purple-400' />
						Starting at a Specific Number
					</h3>
					<p className='text-sm text-gray-600 dark:text-gray-400 mb-3'>
						<strong>Scenario:</strong> You're creating Chapter 2 which should
						start at page 25 (after 24 pages of Chapter 1).
					</p>
					<p className='text-sm text-gray-600 dark:text-gray-400 mb-0'>
						<strong>Solution:</strong> Set "Starting page number" to 25 when
						adding page numbers. The first page will show "25", second page "26",
						etc.
					</p>
				</div>

				<div className='bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800'>
					<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2'>
						<Settings className='h-5 w-5 text-blue-600 dark:text-blue-400' />
						Skip First Page (Title Page)
					</h3>
					<p className='text-sm text-gray-600 dark:text-gray-400 mb-3'>
						<strong>Scenario:</strong> Your document has a title page that
						shouldn't have a page number, but page 2 should show "1".
					</p>
					<p className='text-sm text-gray-600 dark:text-gray-400 mb-0'>
						<strong>Solution:</strong> Select "Start numbering from page 2" or
						use the "Skip pages" option to exclude page 1 from numbering.
					</p>
				</div>

				<div className='bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl border border-green-200 dark:border-green-800'>
					<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2'>
						<Settings className='h-5 w-5 text-green-600 dark:text-green-400' />
						Odd Pages Only (For Printing)
					</h3>
					<p className='text-sm text-gray-600 dark:text-gray-400 mb-3'>
						<strong>Scenario:</strong> You're printing double-sided and want page
						numbers only on right-hand pages.
					</p>
					<p className='text-sm text-gray-600 dark:text-gray-400 mb-0'>
						<strong>Solution:</strong> Select "Odd pages only" in the page
						numbering options. Pages 1, 3, 5, 7... will have numbers; even pages
						will not.
					</p>
				</div>

				<div className='bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-6 rounded-xl border border-amber-200 dark:border-amber-800'>
					<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2'>
						<Settings className='h-5 w-5 text-amber-600 dark:text-amber-400' />
						Different Formats for Different Sections
					</h3>
					<p className='text-sm text-gray-600 dark:text-gray-400 mb-3'>
						<strong>Scenario:</strong> You want Roman numerals (i, ii, iii...) for
						front matter, then restart with Arabic (1, 2, 3...) for main content.
					</p>
					<p className='text-sm text-gray-600 dark:text-gray-400 mb-0'>
						<strong>Solution:</strong> Split your PDF into two files (front matter
						and main content), add appropriate numbers to each, then merge them
						back together.
					</p>
				</div>
			</div>

			<h2>Platform-Specific Methods</h2>

			<p>
				Each operating system has built-in or free tools for adding page numbers:
			</p>

			<div className='not-prose space-y-6 my-8'>
				<div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6'>
					<div className='flex items-center gap-3 mb-4'>
						<Monitor className='h-6 w-6 text-blue-600 dark:text-blue-400' />
						<h3 className='text-xl font-semibold text-gray-900 dark:text-white m-0'>
							Windows
						</h3>
					</div>
					<div className='space-y-3'>
						<div>
							<h4 className='font-semibold text-gray-900 dark:text-white mb-2'>
								Adobe Acrobat Pro (Paid)
							</h4>
							<ol className='text-sm text-gray-600 dark:text-gray-400 list-decimal list-inside space-y-1 ml-2'>
								<li>Open PDF in Adobe Acrobat Pro</li>
								<li>Go to Tools → Edit PDF → Header & Footer → Add</li>
								<li>
									Choose "Page Number" from Insert options
								</li>
								<li>Customize position, font, and format</li>
								<li>Click OK to apply</li>
							</ol>
							<p className='text-sm text-gray-500 dark:text-gray-400 mt-2 italic'>
								Cost: $14.99/month
							</p>
						</div>

						<div>
							<h4 className='font-semibold text-gray-900 dark:text-white mb-2'>
								Free Alternative: PDF Wonder Kit
							</h4>
							<p className='text-sm text-gray-600 dark:text-gray-400'>
								Use the browser-based tool at pdfwonderkit.com/page-numbers for
								free, no subscription needed. All processing happens locally.
							</p>
						</div>
					</div>
				</div>

				<div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6'>
					<div className='flex items-center gap-3 mb-4'>
						<Apple className='h-6 w-6 text-gray-600 dark:text-gray-400' />
						<h3 className='text-xl font-semibold text-gray-900 dark:text-white m-0'>
							Mac
						</h3>
					</div>
					<div>
						<h4 className='font-semibold text-gray-900 dark:text-white mb-2'>
							Preview (Built-in) - Limited
						</h4>
						<p className='text-sm text-gray-600 dark:text-gray-400 mb-3'>
							Mac Preview can add text annotations, but doesn't have automatic
							page numbering. You'd need to manually add text boxes with numbers
							on each page — tedious for multi-page documents.
						</p>

						<h4 className='font-semibold text-gray-900 dark:text-white mb-2'>
							Better Option: PDF Wonder Kit
						</h4>
						<p className='text-sm text-gray-600 dark:text-gray-400'>
							Use the browser-based tool for automatic, professional page
							numbering with full customization options.
						</p>
					</div>
				</div>
			</div>

			<h2>Tips for Professional Page Numbering</h2>

			<div className='not-prose grid md:grid-cols-2 gap-6 my-8'>
				<div className='bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800'>
					<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-3'>
						Match Your Document Style
					</h3>
					<p className='text-sm text-gray-600 dark:text-gray-400'>
						Use fonts and sizes that complement your document. For formal papers,
						use Times New Roman or Arial 10-12pt. For modern documents, try
						Helvetica or Calibri.
					</p>
				</div>

				<div className='bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl border border-green-200 dark:border-green-800'>
					<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-3'>
						Maintain Consistency
					</h3>
					<p className='text-sm text-gray-600 dark:text-gray-400'>
						Use the same position and format throughout your document. Don't
						switch from bottom center to top right midway through — it looks
						unprofessional.
					</p>
				</div>

				<div className='bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-xl border border-purple-200 dark:border-purple-800'>
					<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-3'>
						Check for Overlap
					</h3>
					<p className='text-sm text-gray-600 dark:text-gray-400'>
						Preview your numbered PDF to ensure page numbers don't overlap with
						existing content, footers, or page borders. Adjust position if needed.
					</p>
				</div>

				<div className='bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-6 rounded-xl border border-amber-200 dark:border-amber-800'>
					<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-3'>
						Consider Your Table of Contents
					</h3>
					<p className='text-sm text-gray-600 dark:text-gray-400'>
						If you have a TOC, make sure the page numbers you add match the page
						numbers listed in the TOC. Update the TOC if necessary.
					</p>
				</div>
			</div>

			<h2>Troubleshooting Common Issues</h2>

			<div className='not-prose space-y-4 my-8'>
				<div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6'>
					<div className='flex items-start gap-3'>
						<AlertTriangle className='h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-1' />
						<div>
							<h3 className='font-semibold text-gray-900 dark:text-white mb-2'>
								Problem: Page numbers overlap with existing footer
							</h3>
							<p className='text-sm text-gray-600 dark:text-gray-400 mb-2'>
								<strong>Solution:</strong> Move page numbers to a different
								position (top right or top center instead of bottom). Or adjust
								vertical margin to shift numbers up or down slightly.
							</p>
						</div>
					</div>
				</div>

				<div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6'>
					<div className='flex items-start gap-3'>
						<AlertTriangle className='h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-1' />
						<div>
							<h3 className='font-semibold text-gray-900 dark:text-white mb-2'>
								Problem: Numbers start at wrong page
							</h3>
							<p className='text-sm text-gray-600 dark:text-gray-400 mb-2'>
								<strong>Solution:</strong> Check the "Start numbering from page"
								option. If you want to skip the title page, set this to page 2. Or
								use the custom starting number feature.
							</p>
						</div>
					</div>
				</div>

				<div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6'>
					<div className='flex items-start gap-3'>
						<AlertTriangle className='h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-1' />
						<div>
							<h3 className='font-semibold text-gray-900 dark:text-white mb-2'>
								Problem: Page numbers are too small/large
							</h3>
							<p className='text-sm text-gray-600 dark:text-gray-400 mb-2'>
								<strong>Solution:</strong> Adjust font size. Standard is 10-12pt.
								For large presentation slides, use 14-16pt. For books with small
								text, 8-10pt works.
							</p>
						</div>
					</div>
				</div>

				<div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6'>
					<div className='flex items-start gap-3'>
						<AlertTriangle className='h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-1' />
						<div>
							<h3 className='font-semibold text-gray-900 dark:text-white mb-2'>
								Problem: Need different numbering for different sections
							</h3>
							<p className='text-sm text-gray-600 dark:text-gray-400 mb-2'>
								<strong>Solution:</strong> Split your PDF into sections, add
								appropriate numbering to each section separately (Roman for front
								matter, Arabic for main content), then merge the sections back
								together.
							</p>
						</div>
					</div>
				</div>
			</div>

			<h2>Frequently Asked Questions</h2>

			<div className='not-prose space-y-4 my-8'>
				<div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6'>
					<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
						Can I add page numbers to a scanned PDF?
					</h3>
					<p className='text-gray-600 dark:text-gray-400 text-sm mb-0'>
						Yes! Page numbering tools work on any PDF, including scanned
						documents. The numbers are added as a new layer on top of the pages.
					</p>
				</div>

				<div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6'>
					<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
						Will page numbers be visible when I print the PDF?
					</h3>
					<p className='text-gray-600 dark:text-gray-400 text-sm mb-0'>
						Yes, page numbers become part of the PDF content and will print
						normally. They're embedded permanently in the document.
					</p>
				</div>

				<div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6'>
					<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
						Can I remove page numbers later if needed?
					</h3>
					<p className='text-gray-600 dark:text-gray-400 text-sm mb-0'>
						Yes, but it's easier to edit the original PDF before numbering. Keep
						a backup of your unnumbered PDF. Some PDF editors can remove headers/
						footers, which would remove the page numbers.
					</p>
				</div>

				<div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6'>
					<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
						How do I number only specific pages?
					</h3>
					<p className='text-gray-600 dark:text-gray-400 text-sm mb-0'>
						Most tools let you specify a page range (e.g., "pages 5-50") or skip
						certain pages. You can also split the PDF, number the parts you want,
						and merge them back.
					</p>
				</div>

				<div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6'>
					<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
						What if my PDF already has page numbers?
					</h3>
					<p className='text-gray-600 dark:text-gray-400 text-sm mb-0'>
						You can add new page numbers, but they'll appear alongside the
						existing ones. It's better to remove or cover the old numbers first,
						or position the new numbers differently so they don't overlap.
					</p>
				</div>

				<div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6'>
					<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
						Do I need Adobe Acrobat to add page numbers?
					</h3>
					<p className='text-gray-600 dark:text-gray-400 text-sm mb-0'>
						No! Free browser-based tools like PDF Wonder Kit work perfectly.
						Adobe Acrobat Pro ($14.99/month) is only needed if you're doing
						professional publishing with very specific requirements.
					</p>
				</div>
			</div>

			<h2>Conclusion</h2>

			<p>
				Adding page numbers transforms a casual document into a professional,
				navigable resource. Whether you're submitting an academic paper,
				publishing a book, or preparing a business report, proper page numbering
				is essential.
			</p>

			<p className='text-lg font-semibold'>
				<strong>Quick Summary:</strong>
			</p>

			<ul>
				<li>
					✓ <strong>Easy to add</strong> — takes less than a minute with the
					right tool
				</li>
				<li>
					✓ <strong>Multiple formats</strong> — Arabic, Roman, custom prefixes
				</li>
				<li>
					✓ <strong>Fully customizable</strong> — position, font, size, starting
					number
				</li>
				<li>
					✓ <strong>Free tools available</strong> — no need for expensive
					software
				</li>
				<li>
					✓ <strong>Privacy-focused</strong> — process files locally in your
					browser
				</li>
				<li>
					✓ <strong>Professional results</strong> — perfect for any document type
				</li>
			</ul>

			<p>
				The key is choosing a tool that gives you control over appearance while
				keeping your documents private. Browser-based tools that process locally
				offer the perfect balance of convenience and security.
			</p>

			<div className='not-prose bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-8 my-8 text-center'>
				<h3 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
					Add Page Numbers to Your PDF
				</h3>
				<p className='text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto'>
					Try PDF Wonder Kit's free page number tool — upload your PDF, customize
					position and format, and download in seconds. No signup required,
					completely private.
				</p>
				<Link
					href='/page-numbers'
					className='inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-lg'>
					Add Page Numbers Free →
				</Link>
			</div>
		</BlogLayout>
	);
}
