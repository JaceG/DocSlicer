import { Metadata } from 'next';
import Link from 'next/link';
import { BlogLayout, BlogPost } from '@/components/blog/BlogLayout';
import {
	Search,
	FileText,
	Camera,
	Zap,
	DollarSign,
	AlertCircle,
	CheckCircle2,
	XCircle,
	Sparkles,
	Clock,
} from 'lucide-react';

export const metadata: Metadata = {
	title: 'When to Use OCR vs. Native PDF Text (Complete Guide) | PDF Wonder Kit',
	description:
		'Understand the difference between OCR and native PDF text. Learn when optical character recognition is necessary, accuracy expectations, and cost-benefit analysis.',
	keywords: [
		'PDF OCR guide',
		'searchable PDF',
		'when to use OCR',
		'native PDF text',
		'OCR vs selectable text',
		'optical character recognition',
		'scanned PDF searchable',
	],
	openGraph: {
		title: 'When to Use OCR vs. Native PDF Text (Complete Guide)',
		description:
			'Complete technical guide to OCR vs native PDF text. Make informed decisions about document processing.',
		url: 'https://www.pdfwonderkit.com/blog/when-to-use-ocr-vs-native-pdf',
	},
	alternates: {
		canonical:
			'https://www.pdfwonderkit.com/blog/when-to-use-ocr-vs-native-pdf',
	},
};

const blogPost: BlogPost = {
	slug: 'when-to-use-ocr-vs-native-pdf',
	title: 'When to Use OCR vs. Native PDF Text (Complete Guide)',
	description:
		'Understand the difference between OCR and native PDF text. Learn when optical character recognition is necessary, accuracy expectations, and cost-benefit analysis.',
	date: '2026-01-07',
	readTime: '13 min read',
	category: 'Guides',
};

const comparison = [
	{
		aspect: 'What It Is',
		native:
			'Text embedded in PDF during creation (Word, InDesign, web browser)',
		ocr: 'Text extracted from images using computer vision (scanning photos)',
		icon: FileText,
	},
	{
		aspect: 'Searchability',
		native: '100% searchable by default',
		ocr: 'Searchable after OCR processing',
		icon: Search,
	},
	{
		aspect: 'Accuracy',
		native: 'Perfect—exact text from original',
		ocr: '95-99% with good scans, 85-95% with poor quality',
		icon: CheckCircle2,
	},
	{
		aspect: 'Processing Time',
		native: 'Instant—no processing needed',
		ocr: '1-10 seconds per page depending on quality',
		icon: Clock,
	},
	{
		aspect: 'File Size',
		native: 'Smaller—just text data',
		ocr: 'Larger—stores image + text layer',
		icon: Zap,
	},
	{
		aspect: 'Cost',
		native: 'Free—already searchable',
		ocr: 'Free to $$ depending on volume and tool',
		icon: DollarSign,
	},
];

const needsOCR = [
	{
		scenario: 'Scanned Paper Documents',
		description:
			'Physical documents scanned with a scanner produce image-only PDFs',
		needsOCR: true,
		reason: 'Scanner creates pictures of text, not actual text',
		example: 'Medical records, contracts, receipts from scanner',
	},
	{
		scenario: 'Photos of Documents',
		description: 'Pictures taken with phone camera or digital camera',
		needsOCR: true,
		reason: 'Camera captures visual image, not machine-readable text',
		example: 'Whiteboard notes, business cards, book pages',
	},
	{
		scenario: 'Faxes (Legacy)',
		description: 'Documents received via fax machine',
		needsOCR: true,
		reason: 'Fax technology transmits images, not text data',
		example: 'Legal documents, medical forms, business faxes',
	},
	{
		scenario: 'PDFs from Word/Google Docs',
		description: 'Documents exported or printed to PDF from software',
		needsOCR: false,
		reason: 'Software embeds actual text in PDF',
		example: 'Reports, presentations, invoices from accounting software',
	},
	{
		scenario: 'Web Pages Saved as PDF',
		description: 'Print-to-PDF from web browser',
		needsOCR: false,
		reason: 'Browser preserves text layer when creating PDF',
		example: 'Online articles, web forms, booking confirmations',
	},
	{
		scenario: 'Digital Books (Ebooks)',
		description: 'PDFs created by publishers for distribution',
		needsOCR: false,
		reason: 'Professional PDFs include searchable text',
		example: 'Technical manuals, academic textbooks, novels',
	},
];

const accuracyFactors = [
	{
		factor: 'Scan Quality',
		impact: 'Critical',
		good: '300+ DPI, high contrast, clean image',
		bad: 'Low resolution, blurry, dark/faded text',
		improvement: '+15% accuracy',
	},
	{
		factor: 'Font Type',
		impact: 'High',
		good: 'Standard fonts (Arial, Times, Helvetica)',
		bad: 'Handwriting, decorative fonts, cursive',
		improvement: '+10% accuracy',
	},
	{
		factor: 'Document Condition',
		impact: 'High',
		good: 'Clean, straight, no wrinkles or marks',
		bad: 'Stained, crumpled, torn, faded',
		improvement: '+12% accuracy',
	},
	{
		factor: 'Language',
		impact: 'Medium',
		good: 'English, common Latin-script languages',
		bad: 'Handwritten, mixed languages, special characters',
		improvement: '+5% accuracy',
	},
	{
		factor: 'Layout',
		impact: 'Medium',
		good: 'Single column, clear structure',
		bad: 'Multi-column, tables, complex formatting',
		improvement: '+8% accuracy',
	},
];

const costBenefit = [
	{
		useCase: 'Student Textbooks',
		volume: '5-10 textbooks/semester',
		benefit: 'Search for concepts during open-book exams',
		ocrCost: '$0 (free tools)',
		timeSaved: '10 hours/semester in manual searching',
		verdict: 'Absolutely worth it',
		color: 'green',
	},
	{
		useCase: 'Legal Discovery',
		volume: '1,000-10,000 pages',
		benefit: 'Search for evidence keywords, case references',
		ocrCost: '$50-500 depending on tool',
		timeSaved: '100+ hours of manual review',
		verdict: 'Critical necessity',
		color: 'green',
	},
	{
		useCase: 'Personal Receipts',
		volume: '10-20 receipts/month',
		benefit: 'Search for expenses during tax time',
		ocrCost: '$0 (free tools)',
		timeSaved: '2-3 hours at tax time',
		verdict: 'Worth it',
		color: 'green',
	},
	{
		useCase: 'Already-Digital Documents',
		volume: 'Any',
		benefit: 'None—already searchable',
		ocrCost: 'Wasted processing time',
		timeSaved: '$0',
		verdict: 'Skip OCR',
		color: 'red',
	},
	{
		useCase: 'Low-Quality Scans',
		volume: 'Varies',
		benefit: '85% accuracy might not justify effort',
		ocrCost: '$0-$$ + frustration',
		timeSaved: 'Questionable',
		verdict: 'Re-scan at higher quality first',
		color: 'yellow',
	},
];

export default function BlogPostPage() {
	return (
		<BlogLayout post={blogPost}>
			{/* Quick Answer Box */}
			<div className='bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-xl p-6 mb-8 border border-purple-200 dark:border-purple-800'>
				<div className='flex items-start gap-4'>
					<div className='flex-shrink-0'>
						<div className='w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center'>
							<Search className='w-6 h-6 text-white' />
						</div>
					</div>
					<div>
						<h3 className='font-bold text-lg mb-2 text-gray-900 dark:text-white'>
							Quick Answer: OCR vs Native Text
						</h3>
						<p className='text-gray-700 dark:text-gray-300 mb-3'>
							Native PDF text (from Word, browsers, software) is already
							searchable—no OCR needed. Use OCR only for scanned documents,
							photos, or faxes where text is trapped in images. Test: Try
							Ctrl+F in your PDF. If you can search, skip OCR. If you
							can&apos;t, run OCR. Good scans achieve 95-99% accuracy; poor
							scans drop to 85%. For critical documents, 300+ DPI scans are
							essential.
						</p>
						<div className='flex flex-wrap gap-2'>
							<span className='inline-flex items-center gap-1 px-3 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium'>
								<Zap className='w-4 h-4' />
								1-10 sec/page
							</span>
							<span className='inline-flex items-center gap-1 px-3 py-1 bg-pink-100 dark:bg-pink-900/50 text-pink-700 dark:text-pink-300 rounded-full text-sm font-medium'>
								<CheckCircle2 className='w-4 h-4' />
								95-99% accuracy
							</span>
						</div>
					</div>
				</div>
			</div>

			{/* Introduction */}
			<div className='prose prose-lg dark:prose-invert max-w-none mb-12'>
				<p className='text-xl text-gray-700 dark:text-gray-300 leading-relaxed'>
					You&apos;ve got a 300-page PDF. Should you run OCR on it? The answer
					depends on <strong>how it was created</strong>—and running OCR when
					you don&apos;t need it wastes time and money.
				</p>
				<p className='text-gray-600 dark:text-gray-400'>
					This guide explains the fundamental difference between native PDF text
					and OCR, when you actually need optical character recognition, what
					accuracy to expect, and how to make cost-benefit decisions for your
					documents.
				</p>
			</div>

			{/* The Simple Test */}
			<div className='mb-12'>
				<h2 className='text-3xl font-bold mb-6 text-gray-900 dark:text-white'>
					The 5-Second Test: Do You Need OCR?
				</h2>
				<div className='bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-xl p-8 border border-blue-200 dark:border-blue-800'>
					<div className='space-y-6'>
						<div className='bg-white dark:bg-gray-900/50 rounded-lg p-6'>
							<h3 className='text-lg font-bold text-gray-900 dark:text-white mb-4'>
								Step 1: Open Your PDF
							</h3>
							<p className='text-gray-600 dark:text-gray-400 mb-4'>
								Open the PDF in any viewer (browser, Adobe, Preview, etc.)
							</p>
						</div>

						<div className='bg-white dark:bg-gray-900/50 rounded-lg p-6'>
							<h3 className='text-lg font-bold text-gray-900 dark:text-white mb-4'>
								Step 2: Try to Select Text
							</h3>
							<p className='text-gray-600 dark:text-gray-400 mb-4'>
								Click and drag to highlight a word or sentence. Can you select
								it?
							</p>
							<div className='grid md:grid-cols-2 gap-4 mt-4'>
								<div className='bg-green-50 dark:bg-green-950/30 rounded-lg p-4 border-2 border-green-500'>
									<p className='font-bold text-green-700 dark:text-green-300 mb-2 flex items-center gap-2'>
										<CheckCircle2 className='w-5 h-5' />
										Text Selects: SKIP OCR
									</p>
									<p className='text-sm text-gray-600 dark:text-gray-400'>
										Your PDF already has searchable text. No OCR needed!
									</p>
								</div>
								<div className='bg-red-50 dark:bg-red-950/30 rounded-lg p-4 border-2 border-red-500'>
									<p className='font-bold text-red-700 dark:text-red-300 mb-2 flex items-center gap-2'>
										<XCircle className='w-5 h-5' />
										Nothing Selects: RUN OCR
									</p>
									<p className='text-sm text-gray-600 dark:text-gray-400'>
										Text is trapped in image. OCR will make it searchable.
									</p>
								</div>
							</div>
						</div>

						<div className='bg-white dark:bg-gray-900/50 rounded-lg p-6'>
							<h3 className='text-lg font-bold text-gray-900 dark:text-white mb-4'>
								Step 3: Confirm with Search
							</h3>
							<p className='text-gray-600 dark:text-gray-400'>
								Press <kbd className='px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-sm font-mono'>Ctrl+F</kbd> (Windows) or{' '}
								<kbd className='px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-sm font-mono'>Cmd+F</kbd> (Mac) and search for a word you see on the page.
								If it finds it, you&apos;re good. If not, you need OCR.
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* Comparison Table */}
			<div className='mb-12'>
				<h2 className='text-3xl font-bold mb-6 text-gray-900 dark:text-white'>
					Native PDF Text vs OCR: Complete Comparison
				</h2>
				<div className='space-y-4'>
					{comparison.map((item, index) => (
						<div
							key={index}
							className='bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700'>
							<div className='flex items-start gap-4'>
								<div className='w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0'>
									<item.icon className='w-5 h-5 text-white' />
								</div>
								<div className='flex-1'>
									<h3 className='text-lg font-bold text-gray-900 dark:text-white mb-3'>
										{item.aspect}
									</h3>
									<div className='grid md:grid-cols-2 gap-4'>
										<div className='bg-green-50 dark:bg-green-950/20 rounded-lg p-4'>
											<h4 className='text-sm font-semibold text-green-700 dark:text-green-300 mb-1'>
												Native PDF Text:
											</h4>
											<p className='text-sm text-gray-600 dark:text-gray-400'>
												{item.native}
											</p>
										</div>
										<div className='bg-blue-50 dark:bg-blue-950/20 rounded-lg p-4'>
											<h4 className='text-sm font-semibold text-blue-700 dark:text-blue-300 mb-1'>
												OCR Text:
											</h4>
											<p className='text-sm text-gray-600 dark:text-gray-400'>
												{item.ocr}
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* When You Need OCR */}
			<div className='mb-12'>
				<h2 className='text-3xl font-bold mb-6 text-gray-900 dark:text-white'>
					Document Types: OCR Needed or Not?
				</h2>
				<div className='space-y-4'>
					{needsOCR.map((item, index) => (
						<div
							key={index}
							className={`rounded-xl p-6 border-2 ${
								item.needsOCR
									? 'bg-blue-50 dark:bg-blue-950/20 border-blue-300 dark:border-blue-700'
									: 'bg-green-50 dark:bg-green-950/20 border-green-300 dark:border-green-700'
							}`}>
							<div className='flex items-start gap-4'>
								{item.needsOCR ? (
									<Camera className='w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1' />
								) : (
									<FileText className='w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-1' />
								)}
								<div className='flex-1'>
									<div className='flex items-center gap-3 mb-2'>
										<h3 className='text-lg font-bold text-gray-900 dark:text-white'>
											{item.scenario}
										</h3>
										<span
											className={`px-3 py-1 rounded-full text-xs font-bold ${
												item.needsOCR
													? 'bg-blue-600 text-white'
													: 'bg-green-600 text-white'
											}`}>
											{item.needsOCR ? 'OCR NEEDED' : 'NO OCR NEEDED'}
										</span>
									</div>
									<p className='text-sm text-gray-600 dark:text-gray-400 mb-3'>
										{item.description}
									</p>
									<div className='grid md:grid-cols-2 gap-4'>
										<div>
											<p className='text-sm'>
												<strong className='text-gray-900 dark:text-white'>
													Why:
												</strong>
												<span className='text-gray-600 dark:text-gray-400 ml-2'>
													{item.reason}
												</span>
											</p>
										</div>
										<div>
											<p className='text-sm'>
												<strong className='text-gray-900 dark:text-white'>
													Examples:
												</strong>
												<span className='text-gray-600 dark:text-gray-400 ml-2'>
													{item.example}
												</span>
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Accuracy Factors */}
			<div className='mb-12'>
				<h2 className='text-3xl font-bold mb-6 text-gray-900 dark:text-white'>
					What Affects OCR Accuracy?
				</h2>
				<div className='bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden'>
					<div className='overflow-x-auto'>
						<table className='w-full'>
							<thead className='bg-gray-50 dark:bg-gray-900/50'>
								<tr>
									<th className='px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white'>
										Factor
									</th>
									<th className='px-6 py-4 text-center text-sm font-semibold text-gray-900 dark:text-white'>
										Impact
									</th>
									<th className='px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white'>
										Good Conditions
									</th>
									<th className='px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white'>
										Bad Conditions
									</th>
									<th className='px-6 py-4 text-center text-sm font-semibold text-gray-900 dark:text-white'>
										Improvement
									</th>
								</tr>
							</thead>
							<tbody className='divide-y divide-gray-200 dark:divide-gray-700'>
								{accuracyFactors.map((item, index) => (
									<tr key={index}>
										<td className='px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white'>
											{item.factor}
										</td>
										<td className='px-6 py-4 text-center'>
											<span
												className={`px-2 py-1 rounded text-xs font-bold ${
													item.impact === 'Critical'
														? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
														: item.impact === 'High'
														? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300'
														: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
												}`}>
												{item.impact}
											</span>
										</td>
										<td className='px-6 py-4 text-sm text-green-700 dark:text-green-300'>
											{item.good}
										</td>
										<td className='px-6 py-4 text-sm text-red-700 dark:text-red-300'>
											{item.bad}
										</td>
										<td className='px-6 py-4 text-center text-sm font-bold text-gray-900 dark:text-white'>
											{item.improvement}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>

			{/* Cost-Benefit Analysis */}
			<div className='mb-12'>
				<h2 className='text-3xl font-bold mb-6 text-gray-900 dark:text-white'>
					Cost-Benefit Analysis: When OCR Is Worth It
				</h2>
				<div className='space-y-6'>
					{costBenefit.map((item, index) => (
						<div
							key={index}
							className='bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700'>
							<div className='flex items-start gap-4 mb-4'>
								<h3 className='text-lg font-bold text-gray-900 dark:text-white flex-1'>
									{item.useCase}
								</h3>
								<span
									className={`px-3 py-1 rounded-full text-sm font-bold ${
										item.color === 'green'
											? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
											: item.color === 'yellow'
											? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
											: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
									}`}>
									{item.verdict}
								</span>
							</div>
							<div className='grid md:grid-cols-4 gap-4 text-sm'>
								<div>
									<p className='text-gray-500 dark:text-gray-400 mb-1'>
										Volume:
									</p>
									<p className='font-semibold text-gray-900 dark:text-white'>
										{item.volume}
									</p>
								</div>
								<div>
									<p className='text-gray-500 dark:text-gray-400 mb-1'>
										Benefit:
									</p>
									<p className='font-semibold text-gray-900 dark:text-white'>
										{item.benefit}
									</p>
								</div>
								<div>
									<p className='text-gray-500 dark:text-gray-400 mb-1'>
										OCR Cost:
									</p>
									<p className='font-semibold text-gray-900 dark:text-white'>
										{item.ocrCost}
									</p>
								</div>
								<div>
									<p className='text-gray-500 dark:text-gray-400 mb-1'>
										Time Saved:
									</p>
									<p className='font-semibold text-gray-900 dark:text-white'>
										{item.timeSaved}
									</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Best Practices */}
			<div className='mb-12'>
				<h2 className='text-3xl font-bold mb-6 text-gray-900 dark:text-white'>
					Best Practices for Maximum OCR Accuracy
				</h2>
				<div className='grid md:grid-cols-2 gap-6'>
					<div className='bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-xl p-6 border border-green-200 dark:border-green-800'>
						<h3 className='text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2'>
							<CheckCircle2 className='w-6 h-6 text-green-600 dark:text-green-400' />
							Before OCR: Optimize Your Scan
						</h3>
						<ul className='space-y-3'>
							{[
								'Scan at 300 DPI minimum (600 for small text)',
								'Use high contrast settings',
								'Ensure document is straight and flat',
								'Remove staples and smooth wrinkles',
								'Use color for color documents, B&W for text',
								'Clean scanner glass for crisp images',
							].map((item, index) => (
								<li
									key={index}
									className='flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400'>
									<Sparkles className='w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5' />
									{item}
								</li>
							))}
						</ul>
					</div>

					<div className='bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800'>
						<h3 className='text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2'>
							<AlertCircle className='w-6 h-6 text-blue-600 dark:text-blue-400' />
							After OCR: Verify Quality
						</h3>
						<ul className='space-y-3'>
							{[
								'Spot-check random pages with Ctrl+F',
								'Search for important terms (names, dates)',
								'Check tables and complex layouts carefully',
								'Re-OCR pages with low confidence scores',
								'Save original image PDF as backup',
								'Test searchability before archiving',
							].map((item, index) => (
								<li
									key={index}
									className='flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400'>
									<AlertCircle className='w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5' />
									{item}
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>

			{/* CTA Section */}
			<div className='bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 md:p-12 text-center text-white mb-12'>
				<h2 className='text-3xl md:text-4xl font-bold mb-4'>
					Make Your Scans Searchable
				</h2>
				<p className='text-xl mb-8 text-purple-100'>
					Free OCR for scanned documents—no limits, no signup
				</p>
				<Link
					href='/ocr'
					className='inline-flex items-center gap-2 bg-white text-purple-600 hover:bg-purple-50 px-8 py-4 rounded-xl font-bold transition-colors shadow-lg text-lg'>
					<Search className='w-6 h-6' />
					Run OCR Free
				</Link>
				<p className='mt-6 text-sm text-purple-200'>
					✓ 95-99% accuracy • ✓ 1-10 sec/page • ✓ Files stay private
				</p>
			</div>

			{/* Conclusion */}
			<div className='prose prose-lg dark:prose-invert max-w-none'>
				<h2>The Smart Approach to OCR</h2>
				<p>
					Don&apos;t OCR everything blindly. Test your PDFs first—if text is
					already selectable, you&apos;re wasting time and computing resources
					running unnecessary OCR.
				</p>
				<p>
					When you do need OCR (scanned documents, photos, faxes), optimize your
					source quality first. A 300 DPI clean scan will give you 98% accuracy.
					A 150 DPI blurry photo might give you 85%—and that missing 13% could
					be the critical keyword you need to find.
				</p>
				<p>
					For high-stakes documents (legal, medical, financial), always
					spot-check OCR results. The technology is excellent but not perfect.
					Five minutes of verification can save you hours of missing important
					information.
				</p>
			</div>
		</BlogLayout>
	);
}
