import { Metadata } from 'next';
import Link from 'next/link';
import { BlogLayout, BlogPost } from '@/components/blog/BlogLayout';
import {
	Printer,
	CheckCircle2,
	AlertTriangle,
	FileText,
	Hash,
	Database,
	Minimize2,
	Palette,
	Ruler,
	ArrowRight,
	Zap,
	Eye,
	Download,
	BookOpen,
	Image as ImageIcon,
	Settings,
} from 'lucide-react';

export const metadata: Metadata = {
	title: 'How to Prepare PDFs for Professional Printing (Complete Checklist 2026) | PDF Wonder Kit',
	description:
		'Complete guide to preparing print-ready PDFs. Learn about bleed, color modes, resolution, page numbers, and professional formatting for flawless printing.',
	keywords: [
		'prepare PDF for printing',
		'print-ready PDF',
		'PDF printing guide',
		'commercial printing PDF',
		'PDF bleed settings',
		'CMYK PDF',
		'high resolution PDF',
		'printing checklist',
	],
	openGraph: {
		title: 'How to Prepare PDFs for Professional Printing (Complete Checklist)',
		description:
			'Ensure flawless printing with proper bleed, color modes, resolution, and formatting. Professional printing checklist included.',
		url: 'https://www.pdfwonderkit.com/blog/prepare-pdf-professional-printing',
	},
	alternates: {
		canonical:
			'https://www.pdfwonderkit.com/blog/prepare-pdf-professional-printing',
	},
};

const blogPost: BlogPost = {
	slug: 'prepare-pdf-professional-printing',
	title: 'How to Prepare PDFs for Professional Printing (Complete Checklist)',
	description:
		'Complete guide to preparing print-ready PDFs. Learn about bleed, color modes, resolution, page numbers, and professional formatting for flawless printing.',
	date: '2026-01-07',
	readTime: '10 min read',
	category: 'Tutorials',
};

const printTypes = [
	{
		title: 'Business Cards',
		icon: Palette,
		requirements: [
			'300 DPI minimum',
			'0.125" bleed',
			'CMYK colors',
			'Embedded fonts',
		],
		commonSizes: ['3.5" x 2"', '3.5" x 2.25" (with bleed)'],
	},
	{
		title: 'Brochures & Flyers',
		icon: FileText,
		requirements: ['300 DPI', '0.125" bleed', 'CMYK', 'Page order check'],
		commonSizes: ['8.5" x 11"', '11" x 17"', 'Tri-fold: 8.5" x 11"'],
	},
	{
		title: 'Books & Magazines',
		icon: BookOpen,
		requirements: [
			'300 DPI',
			'0.125" bleed',
			'Page numbers',
			'Proper margins',
		],
		commonSizes: ['5.5" x 8.5"', '6" x 9"', '8.5" x 11"'],
	},
	{
		title: 'Posters & Banners',
		icon: ImageIcon,
		requirements: [
			'150-300 DPI',
			'Large format bleed',
			'High-res images',
			'Vector graphics',
		],
		commonSizes: ['18" x 24"', '24" x 36"', 'Custom sizes'],
	},
];

const commonMistakes = [
	{
		mistake: 'RGB Instead of CMYK',
		problem: 'Colors look different when printed than on screen',
		solution:
			'Convert to CMYK before printing. RGB is for screens, CMYK for print.',
		severity: 'Critical',
	},
	{
		mistake: 'Low Resolution Images',
		problem: 'Pixelated, blurry prints that look unprofessional',
		solution: 'Use 300 DPI minimum for photos, 600+ DPI for line art',
		severity: 'Critical',
	},
	{
		mistake: 'No Bleed Added',
		problem: 'White borders appear, or important content gets cut off',
		solution: 'Add 0.125" bleed on all sides, keep content 0.25" from edge',
		severity: 'High',
	},
	{
		mistake: 'Text Too Close to Edge',
		problem: 'Text gets cut off during trimming',
		solution: 'Keep text at least 0.25" from trim line (safe zone)',
		severity: 'High',
	},
	{
		mistake: 'Fonts Not Embedded',
		problem: 'Text appears in wrong font or gets replaced',
		solution: 'Always embed or outline fonts in your PDF',
		severity: 'Medium',
	},
	{
		mistake: 'Wrong Page Size',
		problem: 'Document prints at wrong size or gets rejected',
		solution: 'Verify dimensions match printer specifications exactly',
		severity: 'Medium',
	},
];

export default function BlogPostPage() {
	return (
		<BlogLayout post={blogPost}>
			{/* Quick Answer Box */}
			<div className='bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-xl p-6 mb-8 border border-indigo-200 dark:border-indigo-800'>
				<div className='flex items-start gap-4'>
					<div className='flex-shrink-0'>
						<div className='w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center'>
							<Printer className='w-6 h-6 text-white' />
						</div>
					</div>
					<div>
						<h3 className='font-bold text-lg mb-2 text-gray-900 dark:text-white'>
							Quick Answer: Print-Ready PDF Checklist
						</h3>
						<p className='text-gray-700 dark:text-gray-300 mb-3'>
							To prepare a PDF for professional printing: (1) Use
							300 DPI minimum resolution, (2) Convert colors to
							CMYK, (3) Add 0.125&quot; bleed on all sides, (4)
							Keep text/important content 0.25&quot; from edges
							(safe zone), (5) Embed all fonts, (6) Use proper
							page size, (7) Add page numbers if needed, (8)
							Compress to under 50MB. Verify with printer&apos;s
							specifications before submitting.
						</p>
						<div className='flex flex-wrap gap-2'>
							<span className='inline-flex items-center gap-1 px-3 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium'>
								<Printer className='w-4 h-4' />
								300 DPI required
							</span>
							<span className='inline-flex items-center gap-1 px-3 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium'>
								<Palette className='w-4 h-4' />
								CMYK colors
							</span>
						</div>
					</div>
				</div>
			</div>

			{/* Introduction */}
			<div className='prose prose-lg dark:prose-invert max-w-none mb-12'>
				<p className='text-xl text-gray-700 dark:text-gray-300 leading-relaxed'>
					Sending a PDF to a professional printer without proper
					preparation is expensive. One mistake—wrong color mode, low
					resolution, or missing bleed—can result in{' '}
					<strong>hundreds of wasted prints</strong> and rush fees to
					fix it.
				</p>
				<p className='text-gray-600 dark:text-gray-400'>
					This comprehensive guide covers everything you need to know
					to prepare print-ready PDFs that produce flawless results.
					Whether you&apos;re printing business cards, brochures,
					books, or banners, you&apos;ll learn the exact
					specifications and workflows professionals use.
				</p>
			</div>

			{/* Print vs Screen */}
			<div className='mb-12'>
				<h2 className='text-3xl font-bold mb-6 text-gray-900 dark:text-white'>
					Why Screen PDFs ≠ Print PDFs
				</h2>
				<div className='grid md:grid-cols-2 gap-6'>
					<div className='bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800'>
						<div className='flex items-center gap-3 mb-4'>
							<div className='w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center'>
								<Eye className='w-5 h-5 text-white' />
							</div>
							<h3 className='font-bold text-gray-900 dark:text-white'>
								Screen PDFs (RGB)
							</h3>
						</div>
						<ul className='space-y-2 text-sm'>
							<li className='flex items-start gap-2'>
								<CheckCircle2 className='w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5' />
								<span className='text-gray-600 dark:text-gray-400'>
									RGB color mode (16.7 million colors)
								</span>
							</li>
							<li className='flex items-start gap-2'>
								<CheckCircle2 className='w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5' />
								<span className='text-gray-600 dark:text-gray-400'>
									72-150 DPI resolution is fine
								</span>
							</li>
							<li className='flex items-start gap-2'>
								<CheckCircle2 className='w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5' />
								<span className='text-gray-600 dark:text-gray-400'>
									Exact page size, no bleed needed
								</span>
							</li>
							<li className='flex items-start gap-2'>
								<CheckCircle2 className='w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5' />
								<span className='text-gray-600 dark:text-gray-400'>
									Small file size preferred
								</span>
							</li>
						</ul>
					</div>

					<div className='bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800'>
						<div className='flex items-center gap-3 mb-4'>
							<div className='w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center'>
								<Printer className='w-5 h-5 text-white' />
							</div>
							<h3 className='font-bold text-gray-900 dark:text-white'>
								Print PDFs (CMYK)
							</h3>
						</div>
						<ul className='space-y-2 text-sm'>
							<li className='flex items-start gap-2'>
								<CheckCircle2 className='w-4 h-4 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5' />
								<span className='text-gray-600 dark:text-gray-400'>
									CMYK color mode (ink-based printing)
								</span>
							</li>
							<li className='flex items-start gap-2'>
								<CheckCircle2 className='w-4 h-4 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5' />
								<span className='text-gray-600 dark:text-gray-400'>
									300+ DPI resolution required
								</span>
							</li>
							<li className='flex items-start gap-2'>
								<CheckCircle2 className='w-4 h-4 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5' />
								<span className='text-gray-600 dark:text-gray-400'>
									Bleed area (0.125&quot; extra on all sides)
								</span>
							</li>
							<li className='flex items-start gap-2'>
								<CheckCircle2 className='w-4 h-4 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5' />
								<span className='text-gray-600 dark:text-gray-400'>
									Larger file size for quality
								</span>
							</li>
						</ul>
					</div>
				</div>
			</div>

			{/* Print Types */}
			<div className='mb-12'>
				<h2 className='text-3xl font-bold mb-6 text-gray-900 dark:text-white'>
					Requirements by Print Type
				</h2>
				<div className='grid md:grid-cols-2 gap-6'>
					{printTypes.map((type, index) => (
						<div
							key={index}
							className='bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700'>
							<div className='flex items-center gap-3 mb-4'>
								<div className='w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center'>
									<type.icon className='w-6 h-6 text-white' />
								</div>
								<h3 className='text-xl font-bold text-gray-900 dark:text-white'>
									{type.title}
								</h3>
							</div>
							<div className='mb-4'>
								<h4 className='text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2'>
									Requirements:
								</h4>
								<div className='space-y-2'>
									{type.requirements.map((req, reqIndex) => (
										<div
											key={reqIndex}
											className='flex items-center gap-2'>
											<CheckCircle2 className='w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0' />
											<span className='text-sm text-gray-600 dark:text-gray-400'>
												{req}
											</span>
										</div>
									))}
								</div>
							</div>
							<div>
								<h4 className='text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2'>
									Common Sizes:
								</h4>
								<div className='flex flex-wrap gap-2'>
									{type.commonSizes.map((size, sizeIndex) => (
										<span
											key={sizeIndex}
											className='px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded text-xs'>
											{size}
										</span>
									))}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Step-by-Step Guide */}
			<div className='mb-12'>
				<h2 className='text-3xl font-bold mb-6 text-gray-900 dark:text-white'>
					8-Step Print Preparation Checklist
				</h2>

				{/* Step 1: Organize Pages */}
				<div className='bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-xl p-8 mb-6 border border-blue-200 dark:border-blue-800'>
					<div className='flex items-start gap-4 mb-4'>
						<div className='w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0'>
							<span className='text-lg font-bold text-white'>
								1
							</span>
						</div>
						<div>
							<h3 className='text-xl font-bold text-gray-900 dark:text-white mb-2'>
								Organize Page Order & Orientation
							</h3>
							<p className='text-gray-600 dark:text-gray-400 text-sm'>
								Ensure all pages are in correct order and
								properly oriented. Remove any blank pages unless
								intentional.
							</p>
						</div>
					</div>
					<div className='bg-white dark:bg-gray-900/50 rounded-lg p-4'>
						<p className='text-sm text-gray-600 dark:text-gray-400 mb-2'>
							<strong>Use:</strong>{' '}
							<Link
								href='/organize'
								className='text-blue-600 dark:text-blue-400 hover:underline'>
								Organize PDF
							</Link>{' '}
							to rotate pages, reorder, and delete unwanted pages
						</p>
					</div>
				</div>

				{/* Step 2: Add Page Numbers */}
				<div className='bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-xl p-8 mb-6 border border-purple-200 dark:border-purple-800'>
					<div className='flex items-start gap-4 mb-4'>
						<div className='w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0'>
							<span className='text-lg font-bold text-white'>
								2
							</span>
						</div>
						<div>
							<h3 className='text-xl font-bold text-gray-900 dark:text-white mb-2'>
								Add Page Numbers (If Needed)
							</h3>
							<p className='text-gray-600 dark:text-gray-400 text-sm'>
								For multi-page documents like books or manuals,
								add page numbers for easy navigation and
								assembly verification.
							</p>
						</div>
					</div>
					<div className='bg-white dark:bg-gray-900/50 rounded-lg p-4'>
						<p className='text-sm text-gray-600 dark:text-gray-400 mb-2'>
							<strong>Use:</strong>{' '}
							<Link
								href='/page-numbers'
								className='text-purple-600 dark:text-purple-400 hover:underline'>
								Add Page Numbers
							</Link>{' '}
							- Position in safe zone (0.25&quot; from edge)
						</p>
						<p className='text-xs text-gray-500 dark:text-gray-500 mt-2'>
							💡 Tip: Skip page numbers on covers and use centered
							bottom position for body pages
						</p>
					</div>
				</div>

				{/* Step 3: Verify Metadata */}
				<div className='bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-xl p-8 mb-6 border border-green-200 dark:border-green-800'>
					<div className='flex items-start gap-4 mb-4'>
						<div className='w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0'>
							<span className='text-lg font-bold text-white'>
								3
							</span>
						</div>
						<div>
							<h3 className='text-xl font-bold text-gray-900 dark:text-white mb-2'>
								Set Proper Metadata
							</h3>
							<p className='text-gray-600 dark:text-gray-400 text-sm'>
								Add document title, creator info, and production
								notes to help the print shop identify your job.
							</p>
						</div>
					</div>
					<div className='bg-white dark:bg-gray-900/50 rounded-lg p-4'>
						<p className='text-sm text-gray-600 dark:text-gray-400 mb-2'>
							<strong>Use:</strong>{' '}
							<Link
								href='/metadata'
								className='text-green-600 dark:text-green-400 hover:underline'>
								Edit Metadata
							</Link>{' '}
							to add title, author, keywords, and subject
						</p>
						<p className='text-xs text-gray-500 dark:text-gray-500 mt-2'>
							Example: Title: &quot;BusinessCards_Final_v3&quot; •
							Subject: &quot;300 DPI, CMYK, with bleed&quot;
						</p>
					</div>
				</div>

				{/* Step 4: Check Resolution */}
				<div className='bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20 rounded-xl p-8 mb-6 border border-orange-200 dark:border-orange-800'>
					<div className='flex items-start gap-4 mb-4'>
						<div className='w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center flex-shrink-0'>
							<span className='text-lg font-bold text-white'>
								4
							</span>
						</div>
						<div>
							<h3 className='text-xl font-bold text-gray-900 dark:text-white mb-2'>
								Verify Image Resolution
							</h3>
							<p className='text-gray-600 dark:text-gray-400 text-sm'>
								All images must be at least 300 DPI at the final
								print size. Low-res images will look pixelated.
							</p>
						</div>
					</div>
					<div className='bg-white dark:bg-gray-900/50 rounded-lg p-4 space-y-3'>
						<div>
							<p className='text-sm font-semibold text-gray-900 dark:text-white mb-1'>
								Resolution Requirements:
							</p>
							<ul className='text-sm text-gray-600 dark:text-gray-400 space-y-1'>
								<li>
									• Photos & images:{' '}
									<strong>300 DPI minimum</strong>
								</li>
								<li>
									• Line art & graphics:{' '}
									<strong>600 DPI</strong>
								</li>
								<li>
									• Large format posters:{' '}
									<strong>150-200 DPI acceptable</strong>
								</li>
							</ul>
						</div>
						<div className='bg-orange-100 dark:bg-orange-900/30 rounded p-3'>
							<p className='text-xs text-orange-900 dark:text-orange-200'>
								<strong>⚠️ Warning:</strong> You cannot increase
								resolution of a low-res image. Always start with
								high-quality source files.
							</p>
						</div>
					</div>
				</div>

				{/* Step 5: Color Mode */}
				<div className='bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20 rounded-xl p-8 mb-6 border border-red-200 dark:border-red-800'>
					<div className='flex items-start gap-4 mb-4'>
						<div className='w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0'>
							<span className='text-lg font-bold text-white'>
								5
							</span>
						</div>
						<div>
							<h3 className='text-xl font-bold text-gray-900 dark:text-white mb-2'>
								Convert to CMYK Color Mode
							</h3>
							<p className='text-gray-600 dark:text-gray-400 text-sm'>
								This is critical! RGB colors (screen) look
								different than CMYK colors (print). Always
								convert before printing.
							</p>
						</div>
					</div>
					<div className='bg-white dark:bg-gray-900/50 rounded-lg p-4 space-y-3'>
						<div>
							<p className='text-sm font-semibold text-gray-900 dark:text-white mb-2'>
								Color Mode Guide:
							</p>
							<div className='space-y-2'>
								<div className='flex items-start gap-2'>
									<div className='w-16 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-xs font-medium text-center'>
										RGB
									</div>
									<p className='text-sm text-gray-600 dark:text-gray-400 flex-1'>
										Screens, websites, social media - 16.7
										million colors
									</p>
								</div>
								<div className='flex items-start gap-2'>
									<div className='w-16 px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded text-xs font-medium text-center'>
										CMYK
									</div>
									<p className='text-sm text-gray-600 dark:text-gray-400 flex-1'>
										Professional printing - Cyan, Magenta,
										Yellow, Key (black)
									</p>
								</div>
							</div>
						</div>
						<div className='bg-red-100 dark:bg-red-900/30 rounded p-3'>
							<p className='text-xs text-red-900 dark:text-red-200'>
								<strong>Common Issue:</strong> Bright blues and
								greens often look duller in CMYK. Preview in
								CMYK mode before printing to avoid surprises.
							</p>
						</div>
					</div>
				</div>

				{/* Step 6: Bleed & Safe Zone */}
				<div className='bg-gradient-to-br from-cyan-50 to-teal-50 dark:from-cyan-950/20 dark:to-teal-950/20 rounded-xl p-8 mb-6 border border-cyan-200 dark:border-cyan-800'>
					<div className='flex items-start gap-4 mb-4'>
						<div className='w-10 h-10 bg-cyan-600 rounded-lg flex items-center justify-center flex-shrink-0'>
							<span className='text-lg font-bold text-white'>
								6
							</span>
						</div>
						<div>
							<h3 className='text-xl font-bold text-gray-900 dark:text-white mb-2'>
								Add Bleed & Check Safe Zone
							</h3>
							<p className='text-gray-600 dark:text-gray-400 text-sm'>
								Bleed prevents white borders. Safe zone prevents
								text from being cut off during trimming.
							</p>
						</div>
					</div>
					<div className='bg-white dark:bg-gray-900/50 rounded-lg p-4 space-y-4'>
						<div>
							<p className='text-sm font-semibold text-gray-900 dark:text-white mb-2'>
								Understanding Bleed:
							</p>
							<ul className='text-sm text-gray-600 dark:text-gray-400 space-y-2'>
								<li className='flex items-start gap-2'>
									<Ruler className='w-4 h-4 text-cyan-600 dark:text-cyan-400 flex-shrink-0 mt-0.5' />
									<span>
										<strong>Bleed area:</strong> Extend
										background/images 0.125&quot; beyond
										trim line
									</span>
								</li>
								<li className='flex items-start gap-2'>
									<Ruler className='w-4 h-4 text-cyan-600 dark:text-cyan-400 flex-shrink-0 mt-0.5' />
									<span>
										<strong>Trim line:</strong> Where paper
										will be cut
									</span>
								</li>
								<li className='flex items-start gap-2'>
									<Ruler className='w-4 h-4 text-cyan-600 dark:text-cyan-400 flex-shrink-0 mt-0.5' />
									<span>
										<strong>Safe zone:</strong> Keep
										text/logos 0.25&quot; inside trim line
									</span>
								</li>
							</ul>
						</div>
						<div className='bg-cyan-100 dark:bg-cyan-900/30 rounded p-3'>
							<p className='text-xs text-cyan-900 dark:text-cyan-200'>
								<strong>Example:</strong> For a 3.5&quot; x
								2&quot; business card, your PDF should be
								3.75&quot; x 2.25&quot; (adding 0.125&quot;
								bleed on all sides)
							</p>
						</div>
					</div>
				</div>

				{/* Step 7: Compress */}
				<div className='bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20 rounded-xl p-8 mb-6 border border-yellow-200 dark:border-yellow-800'>
					<div className='flex items-start gap-4 mb-4'>
						<div className='w-10 h-10 bg-yellow-600 rounded-lg flex items-center justify-center flex-shrink-0'>
							<span className='text-lg font-bold text-white'>
								7
							</span>
						</div>
						<div>
							<h3 className='text-xl font-bold text-gray-900 dark:text-white mb-2'>
								Optimize File Size
							</h3>
							<p className='text-gray-600 dark:text-gray-400 text-sm'>
								Reduce file size for easier upload while
								maintaining print quality. Keep under 50MB if
								possible.
							</p>
						</div>
					</div>
					<div className='bg-white dark:bg-gray-900/50 rounded-lg p-4'>
						<p className='text-sm text-gray-600 dark:text-gray-400 mb-2'>
							<strong>Use:</strong>{' '}
							<Link
								href='/compress'
								className='text-yellow-700 dark:text-yellow-400 hover:underline'>
								Compress PDF
							</Link>{' '}
							- Choose &quot;High Quality&quot; preset to maintain
							300 DPI
						</p>
						<p className='text-xs text-gray-500 dark:text-gray-500 mt-2'>
							✓ Removes duplicate data • ✓ Optimizes images • ✓
							Keeps quality
						</p>
					</div>
				</div>

				{/* Step 8: Final Verification */}
				<div className='bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 rounded-xl p-8 border border-indigo-200 dark:border-indigo-800'>
					<div className='flex items-start gap-4 mb-4'>
						<div className='w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0'>
							<span className='text-lg font-bold text-white'>
								8
							</span>
						</div>
						<div>
							<h3 className='text-xl font-bold text-gray-900 dark:text-white mb-2'>
								Final Pre-Print Verification
							</h3>
							<p className='text-gray-600 dark:text-gray-400 text-sm'>
								Do a final check before sending to printer.
								Catch mistakes now, not after printing 500
								copies.
							</p>
						</div>
					</div>
					<div className='bg-white dark:bg-gray-900/50 rounded-lg p-4'>
						<div className='space-y-2'>
							{[
								'Open PDF and check every page',
								'Verify colors look correct',
								'Check page order and orientation',
								'Confirm page numbers are correct',
								'Review file name is descriptive',
								'Test print one copy if possible',
								'Get printer approval before full run',
							].map((item, index) => (
								<div
									key={index}
									className='flex items-center gap-2'>
									<CheckCircle2 className='w-4 h-4 text-indigo-600 dark:text-indigo-400 flex-shrink-0' />
									<span className='text-sm text-gray-600 dark:text-gray-400'>
										{item}
									</span>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>

			{/* Common Mistakes */}
			<div className='mb-12'>
				<h2 className='text-3xl font-bold mb-6 text-gray-900 dark:text-white'>
					6 Most Expensive Printing Mistakes
				</h2>
				<div className='space-y-4'>
					{commonMistakes.map((item, index) => (
						<div
							key={index}
							className='bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700'>
							<div className='flex items-start gap-4'>
								<div className='flex-shrink-0'>
									<div
										className={`w-12 h-12 rounded-lg flex items-center justify-center ${
											item.severity === 'Critical'
												? 'bg-red-100 dark:bg-red-900/30'
												: item.severity === 'High'
												? 'bg-orange-100 dark:bg-orange-900/30'
												: 'bg-yellow-100 dark:bg-yellow-900/30'
										}`}>
										<AlertTriangle
											className={`w-6 h-6 ${
												item.severity === 'Critical'
													? 'text-red-600 dark:text-red-400'
													: item.severity === 'High'
													? 'text-orange-600 dark:text-orange-400'
													: 'text-yellow-600 dark:text-yellow-400'
											}`}
										/>
									</div>
								</div>
								<div className='flex-1'>
									<div className='flex items-center gap-3 mb-2'>
										<h3 className='font-bold text-gray-900 dark:text-white'>
											{item.mistake}
										</h3>
										<span
											className={`px-2 py-1 rounded text-xs font-medium ${
												item.severity === 'Critical'
													? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
													: item.severity === 'High'
													? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300'
													: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
											}`}>
											{item.severity}
										</span>
									</div>
									<p className='text-sm text-gray-600 dark:text-gray-400 mb-2'>
										<strong>Problem:</strong> {item.problem}
									</p>
									<p className='text-sm text-gray-700 dark:text-gray-300'>
										<strong>Solution:</strong>{' '}
										{item.solution}
									</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Print Shop Checklist */}
			<div className='mb-12'>
				<h2 className='text-3xl font-bold mb-6 text-gray-900 dark:text-white'>
					Questions to Ask Your Print Shop
				</h2>
				<div className='bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-xl p-8 border border-blue-200 dark:border-blue-800'>
					<p className='text-gray-600 dark:text-gray-400 mb-6'>
						Before preparing your PDF, always confirm these
						specifications with your printer:
					</p>
					<div className='grid md:grid-cols-2 gap-4'>
						{[
							'What are the exact dimensions with bleed?',
							'Do you prefer CMYK or can you convert RGB?',
							'What resolution do you require? (DPI)',
							'Should fonts be embedded or outlined?',
							'What file format? (PDF/X-1a, PDF/X-4, etc.)',
							'Maximum file size for upload?',
							'Do you provide a proof before printing?',
							'What is your turnaround time?',
						].map((question, index) => (
							<div
								key={index}
								className='bg-white dark:bg-gray-900/50 rounded-lg p-4'>
								<div className='flex items-start gap-3'>
									<Settings className='w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5' />
									<span className='text-sm text-gray-700 dark:text-gray-300'>
										{question}
									</span>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* CTA Section */}
			<div className='bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 md:p-12 text-center text-white mb-12'>
				<h2 className='text-3xl md:text-4xl font-bold mb-4'>
					Prepare Your Print-Ready PDF Now
				</h2>
				<p className='text-xl mb-8 text-indigo-100'>
					All tools are free and work right in your browser
				</p>
				<div className='grid md:grid-cols-4 gap-4 max-w-5xl mx-auto'>
					<Link
						href='/organize'
						className='bg-white text-indigo-600 hover:bg-indigo-50 px-6 py-4 rounded-xl font-bold transition-colors shadow-lg flex items-center justify-center gap-2'>
						<FileText className='w-5 h-5' />
						Organize Pages
					</Link>
					<Link
						href='/page-numbers'
						className='bg-white text-indigo-600 hover:bg-indigo-50 px-6 py-4 rounded-xl font-bold transition-colors shadow-lg flex items-center justify-center gap-2'>
						<Hash className='w-5 h-5' />
						Page Numbers
					</Link>
					<Link
						href='/metadata'
						className='bg-white text-indigo-600 hover:bg-indigo-50 px-6 py-4 rounded-xl font-bold transition-colors shadow-lg flex items-center justify-center gap-2'>
						<Database className='w-5 h-5' />
						Edit Metadata
					</Link>
					<Link
						href='/compress'
						className='bg-white text-indigo-600 hover:bg-indigo-50 px-6 py-4 rounded-xl font-bold transition-colors shadow-lg flex items-center justify-center gap-2'>
						<Minimize2 className='w-5 h-5' />
						Compress PDF
					</Link>
				</div>
				<p className='mt-6 text-sm text-indigo-200'>
					✓ Free forever • ✓ No registration • ✓ Files stay on your
					device
				</p>
			</div>

			{/* Conclusion */}
			<div className='prose prose-lg dark:prose-invert max-w-none'>
				<h2>Don&apos;t Let Print Mistakes Cost You Money</h2>
				<p>
					Professional printing requires attention to detail that
					screen PDFs don&apos;t need. But with this 8-step checklist,
					you&apos;ll avoid the costly mistakes that waste time and
					money.
				</p>
				<p>
					Remember: communicate with your print shop before you start.
					Every printer has slightly different preferences and
					capabilities. Getting their specifications upfront will save
					you from having to redo work later.
				</p>
				<p>
					And always, always request a proof before the full print
					run. One test print can catch issues that cost hundreds or
					thousands to fix after printing 500 copies.
				</p>
			</div>
		</BlogLayout>
	);
}
