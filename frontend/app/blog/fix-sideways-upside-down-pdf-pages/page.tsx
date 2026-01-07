import { Metadata } from 'next';
import Link from 'next/link';
import { BlogLayout, BlogPost } from '@/components/blog/BlogLayout';
import {
	RotateCw,
	Camera,
	ScanLine,
	CheckCircle2,
	AlertCircle,
	Zap,
	Download,
	Sparkles,
	RefreshCw,
} from 'lucide-react';

export const metadata: Metadata = {
	title: 'How to Fix Sideways or Upside-Down PDF Pages | PDF Wonder Kit',
	description:
		'Fix rotated PDF pages from scans, phone photos, or errors. Learn to rotate pages permanently, batch rotate multiple pages, and prevent rotation issues.',
	keywords: [
		'rotate PDF',
		'fix sideways PDF',
		'flip PDF pages',
		'upside down PDF',
		'rotate PDF pages',
		'fix scanned PDF orientation',
		'PDF page rotation',
	],
	openGraph: {
		title: 'How to Fix Sideways or Upside-Down PDF Pages',
		description:
			'Complete guide to fixing PDF page orientation. Rotate single pages or entire documents in seconds.',
		url: 'https://www.pdfwonderkit.com/blog/fix-sideways-upside-down-pdf-pages',
	},
	alternates: {
		canonical:
			'https://www.pdfwonderkit.com/blog/fix-sideways-upside-down-pdf-pages',
	},
};

const blogPost: BlogPost = {
	slug: 'fix-sideways-upside-down-pdf-pages',
	title: 'How to Fix Sideways or Upside-Down PDF Pages',
	description:
		'Fix rotated PDF pages from scans, phone photos, or errors. Learn to rotate pages permanently, batch rotate multiple pages, and prevent rotation issues.',
	date: '2026-01-07',
	readTime: '9 min read',
	category: 'Troubleshooting',
};

const commonCauses = [
	{
		cause: 'Scanner Feeder Orientation',
		description: 'Document loaded upside-down in automatic document feeder',
		frequency: 'Very Common',
		solution: 'Rotate 180° after scanning',
		prevention: 'Check feeder tray orientation arrows',
		icon: ScanLine,
		color: 'blue',
	},
	{
		cause: 'Phone Camera Photos',
		description: 'Phone held sideways when photographing document',
		frequency: 'Very Common',
		solution: 'Rotate 90° or 270° depending on which side is down',
		prevention: 'Hold phone vertically for portrait documents',
		icon: Camera,
		color: 'purple',
	},
	{
		cause: 'Mixed Document Stack',
		description: 'Pages face different directions in original stack',
		frequency: 'Common',
		solution: 'Rotate individual pages as needed',
		prevention: 'Orient all pages same direction before scanning',
		icon: RefreshCw,
		color: 'orange',
	},
	{
		cause: 'PDF Merge Error',
		description: 'Combining PDFs with different orientations',
		frequency: 'Common',
		solution: 'Rotate pages in merged document',
		prevention: 'Check orientation before merging',
		icon: CheckCircle2,
		color: 'green',
	},
];

const rotationTypes = [
	{
		type: 'Rotate Single Page',
		when: 'One or few pages wrong orientation',
		howTo: [
			'Open PDF in organize/rotate tool',
			'Select specific page(s) to rotate',
			'Click rotate button (90° clockwise)',
			'Repeat until correct orientation',
			'Save rotated PDF',
		],
		timeSaved: '10 seconds per page',
		difficulty: 'Easy',
	},
	{
		type: 'Rotate All Pages',
		when: 'Entire document is sideways or upside-down',
		howTo: [
			'Open PDF in rotate tool',
			'Select all pages (or use "rotate all" option)',
			'Choose rotation angle (90°, 180°, 270°)',
			'Apply rotation',
			'Download corrected PDF',
		],
		timeSaved: '5 seconds total',
		difficulty: 'Very Easy',
	},
	{
		type: 'Batch Rotate Multiple PDFs',
		when: 'Many scanned files all need rotation',
		howTo: [
			'Use batch processing tool',
			'Upload all PDFs',
			'Set rotation angle for each/all',
			'Process entire batch',
			'Download corrected files',
		],
		timeSaved: '30+ minutes for 50 files',
		difficulty: 'Easy',
	},
	{
		type: 'Auto-Detect and Rotate',
		when: 'Mixed orientations in one document',
		howTo: [
			'Use OCR tool with auto-rotate',
			'AI detects text orientation',
			'Automatically rotates each page correctly',
			'Review and adjust if needed',
			'Save final document',
		],
		timeSaved: 'Variable, faster for large documents',
		difficulty: 'Easy',
	},
];

const preventionTips = [
	{
		scenario: 'Scanning Documents',
		tips: [
			'Check feeder tray orientation markings',
			'Do test scan of single page first',
			'Use flatbed scanner for important documents',
			'Enable auto-rotation in scanner software if available',
			'Keep all pages facing same direction in stack',
		],
		icon: ScanLine,
	},
	{
		scenario: 'Phone Document Photos',
		tips: [
			'Use document scanning app (not regular camera)',
			'Hold phone vertically for portrait docs',
			'Hold phone horizontally for landscape docs',
			'Apps like Adobe Scan auto-detect orientation',
			'Review orientation before saving as PDF',
		],
		icon: Camera,
	},
	{
		scenario: 'Merging PDFs',
		tips: [
			'Preview each PDF orientation before merging',
			'Rotate source PDFs first, then merge',
			'Use merge tool with rotation preview',
			'Check first and last page after merging',
			'Keep original files as backup',
		],
		icon: RefreshCw,
	},
];

const troubleshootingIssues = [
	{
		issue: "Rotation Doesn't Save",
		symptoms: [
			'Page appears rotated in tool',
			'Downloaded PDF still sideways',
			'Rotation reverts when reopened',
		],
		cause: 'Viewer rotation vs. permanent rotation',
		solution:
			'Use "Save" or "Download" after rotating. Some viewers only rotate view temporarily without saving changes.',
	},
	{
		issue: 'Every Other Page Needs Rotation',
		symptoms: [
			'Page 1 correct, page 2 upside-down, page 3 correct, etc.',
			'Alternating orientation pattern',
		],
		cause: 'Duplex scanning with pages loaded incorrectly',
		solution:
			'Rotate all even pages 180°. This happens when document back sides are upside-down.',
	},
	{
		issue: "Text Rotates But Images Don't",
		symptoms: [
			'Text appears upright',
			'Photos/graphics still sideways',
			'Inconsistent orientation on same page',
		],
		cause: 'Complex PDF with mixed element orientations',
		solution:
			'Use full page rotation, not text-only rotation. May need to flatten PDF first.',
	},
	{
		issue: 'Mobile Device Shows Wrong Orientation',
		symptoms: [
			'Correct on computer, wrong on phone',
			'Correct in some apps, wrong in others',
		],
		cause: 'Viewer auto-rotation conflicting with PDF orientation',
		solution:
			'Lock device rotation when viewing. Or save with absolute orientation.',
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
							<RotateCw className='w-6 h-6 text-white' />
						</div>
					</div>
					<div>
						<h3 className='font-bold text-lg mb-2 text-gray-900 dark:text-white'>
							Quick Fix: Rotated PDF Pages
						</h3>
						<p className='text-gray-700 dark:text-gray-300 mb-3'>
							Use PDF organize/rotate tool: (1) Upload PDF, (2)
							Select pages to rotate, (3) Click rotate clockwise
							(90°) until correct, (4) Download fixed PDF. For
							whole document sideways: select all pages, rotate
							once. Upside-down: rotate twice (180°). Common
							cause: scanner feeder loaded backward or phone held
							sideways. Fix takes 30 seconds. Make sure to
							save/download—some viewers only rotate view
							temporarily.
						</p>
						<div className='flex flex-wrap gap-2'>
							<span className='inline-flex items-center gap-1 px-3 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium'>
								<Zap className='w-4 h-4' />
								30 second fix
							</span>
							<span className='inline-flex items-center gap-1 px-3 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium'>
								<CheckCircle2 className='w-4 h-4' />
								Permanent solution
							</span>
						</div>
					</div>
				</div>
			</div>

			{/* Introduction */}
			<div className='prose prose-lg dark:prose-invert max-w-none mb-12'>
				<p className='text-xl text-gray-700 dark:text-gray-300 leading-relaxed'>
					You scan a 50-page contract. Open the PDF. Every single page
					is <strong>sideways</strong>. Now you&apos;re tilting your
					head for 20 minutes, getting a neck ache, and wondering if
					there&apos;s a better way.
				</p>
				<p className='text-gray-600 dark:text-gray-400'>
					Rotated PDF pages are one of the most common—and most
					annoying—PDF issues. But they&apos;re also one of the
					easiest to fix. This guide shows you how to rotate pages
					permanently, prevent orientation issues, and troubleshoot
					when rotation won&apos;t save.
				</p>
			</div>

			{/* Common Causes */}
			<div className='mb-12'>
				<h2 className='text-3xl font-bold mb-6 text-gray-900 dark:text-white'>
					Why PDFs Have Sideways Pages (And How to Prevent It)
				</h2>
				<div className='space-y-6'>
					{commonCauses.map((item, index) => (
						<div
							key={index}
							className='bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700'>
							<div className='flex items-start gap-4'>
								<div
									className={`w-12 h-12 bg-${item.color}-100 dark:bg-${item.color}-900/30 rounded-lg flex items-center justify-center flex-shrink-0`}>
									<item.icon
										className={`w-6 h-6 text-${item.color}-600 dark:text-${item.color}-400`}
									/>
								</div>
								<div className='flex-1'>
									<div className='flex items-center gap-3 mb-2'>
										<h3 className='text-lg font-bold text-gray-900 dark:text-white'>
											{item.cause}
										</h3>
										<span className='px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded text-xs font-semibold'>
											{item.frequency}
										</span>
									</div>
									<p className='text-sm text-gray-600 dark:text-gray-400 mb-4'>
										{item.description}
									</p>
									<div className='grid md:grid-cols-2 gap-4'>
										<div className='bg-green-50 dark:bg-green-950/30 rounded-lg p-3'>
											<p className='text-sm'>
												<strong className='text-green-700 dark:text-green-300'>
													Solution:
												</strong>
												<span className='text-gray-600 dark:text-gray-400 ml-2'>
													{item.solution}
												</span>
											</p>
										</div>
										<div className='bg-blue-50 dark:bg-blue-950/30 rounded-lg p-3'>
											<p className='text-sm'>
												<strong className='text-blue-700 dark:text-blue-300'>
													Prevention:
												</strong>
												<span className='text-gray-600 dark:text-gray-400 ml-2'>
													{item.prevention}
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

			{/* Rotation Types */}
			<div className='mb-12'>
				<h2 className='text-3xl font-bold mb-6 text-gray-900 dark:text-white'>
					4 Ways to Rotate PDF Pages
				</h2>
				<div className='grid md:grid-cols-2 gap-6'>
					{rotationTypes.map((type, index) => (
						<div
							key={index}
							className='bg-white dark:bg-gray-800 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-700 hover:border-indigo-400 dark:hover:border-indigo-600 transition-colors'>
							<div className='flex items-center justify-between mb-4'>
								<h3 className='text-lg font-bold text-gray-900 dark:text-white'>
									{type.type}
								</h3>
								<span className='px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded text-xs font-bold'>
									{type.difficulty}
								</span>
							</div>
							<p className='text-sm text-gray-600 dark:text-gray-400 mb-4'>
								<strong className='text-gray-900 dark:text-white'>
									When to use:
								</strong>{' '}
								{type.when}
							</p>
							<div className='bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 mb-4'>
								<h4 className='text-sm font-semibold text-gray-900 dark:text-white mb-2'>
									How To:
								</h4>
								<ol className='space-y-2'>
									{type.howTo.map((step, stepIndex) => (
										<li
											key={stepIndex}
											className='flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400'>
											<span className='flex-shrink-0 w-5 h-5 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-bold'>
												{stepIndex + 1}
											</span>
											{step}
										</li>
									))}
								</ol>
							</div>
							<p className='text-sm font-semibold text-green-700 dark:text-green-300'>
								⚡ Time saved: {type.timeSaved}
							</p>
						</div>
					))}
				</div>
			</div>

			{/* Quick Reference Guide */}
			<div className='mb-12'>
				<h2 className='text-3xl font-bold mb-6 text-gray-900 dark:text-white'>
					Quick Reference: Rotation Angles
				</h2>
				<div className='bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-xl p-8 border border-blue-200 dark:border-blue-800'>
					<div className='grid md:grid-cols-4 gap-6'>
						<div className='bg-white dark:bg-gray-900/50 rounded-lg p-6 text-center'>
							<div className='w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-3'>
								<span className='text-2xl font-bold text-green-700 dark:text-green-300'>
									0°
								</span>
							</div>
							<h3 className='font-bold text-gray-900 dark:text-white mb-2'>
								Correct
							</h3>
							<p className='text-sm text-gray-600 dark:text-gray-400'>
								No rotation needed
							</p>
						</div>

						<div className='bg-white dark:bg-gray-900/50 rounded-lg p-6 text-center'>
							<div className='w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-3'>
								<span className='text-2xl font-bold text-blue-700 dark:text-blue-300'>
									90°
								</span>
							</div>
							<h3 className='font-bold text-gray-900 dark:text-white mb-2'>
								Sideways Right
							</h3>
							<p className='text-sm text-gray-600 dark:text-gray-400'>
								Rotate 270° (or -90°) to fix
							</p>
						</div>

						<div className='bg-white dark:bg-gray-900/50 rounded-lg p-6 text-center'>
							<div className='w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-3'>
								<span className='text-2xl font-bold text-orange-700 dark:text-orange-300'>
									180°
								</span>
							</div>
							<h3 className='font-bold text-gray-900 dark:text-white mb-2'>
								Upside-Down
							</h3>
							<p className='text-sm text-gray-600 dark:text-gray-400'>
								Rotate 180° to flip
							</p>
						</div>

						<div className='bg-white dark:bg-gray-900/50 rounded-lg p-6 text-center'>
							<div className='w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-3'>
								<span className='text-2xl font-bold text-purple-700 dark:text-purple-300'>
									270°
								</span>
							</div>
							<h3 className='font-bold text-gray-900 dark:text-white mb-2'>
								Sideways Left
							</h3>
							<p className='text-sm text-gray-600 dark:text-gray-400'>
								Rotate 90° clockwise to fix
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* Prevention Tips */}
			<div className='mb-12'>
				<h2 className='text-3xl font-bold mb-6 text-gray-900 dark:text-white'>
					Prevention Tips by Scenario
				</h2>
				<div className='space-y-6'>
					{preventionTips.map((section, index) => (
						<div
							key={index}
							className='bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700'>
							<div className='flex items-start gap-4'>
								<div className='w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center flex-shrink-0'>
									<section.icon className='w-5 h-5 text-indigo-600 dark:text-indigo-400' />
								</div>
								<div className='flex-1'>
									<h3 className='text-lg font-bold text-gray-900 dark:text-white mb-3'>
										{section.scenario}
									</h3>
									<ul className='space-y-2'>
										{section.tips.map((tip, tipIndex) => (
											<li
												key={tipIndex}
												className='flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400'>
												<CheckCircle2 className='w-4 h-4 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5' />
												{tip}
											</li>
										))}
									</ul>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Troubleshooting */}
			<div className='mb-12'>
				<h2 className='text-3xl font-bold mb-6 text-gray-900 dark:text-white'>
					Troubleshooting Rotation Issues
				</h2>
				<div className='space-y-6'>
					{troubleshootingIssues.map((item, index) => (
						<div
							key={index}
							className='bg-red-50 dark:bg-red-950/20 rounded-xl p-6 border border-red-200 dark:border-red-800'>
							<div className='flex items-start gap-4'>
								<AlertCircle className='w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-1' />
								<div className='flex-1'>
									<h3 className='text-lg font-bold text-gray-900 dark:text-white mb-3'>
										{item.issue}
									</h3>
									<div className='grid md:grid-cols-2 gap-4 mb-4'>
										<div>
											<p className='text-sm font-semibold text-gray-900 dark:text-white mb-2'>
												Symptoms:
											</p>
											<ul className='space-y-1'>
												{item.symptoms.map(
													(symptom, sIndex) => (
														<li
															key={sIndex}
															className='text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2'>
															<span className='text-red-600 dark:text-red-400'>
																•
															</span>
															{symptom}
														</li>
													)
												)}
											</ul>
										</div>
										<div>
											<p className='text-sm font-semibold text-gray-900 dark:text-white mb-2'>
												Likely Cause:
											</p>
											<p className='text-sm text-gray-600 dark:text-gray-400 mb-3'>
												{item.cause}
											</p>
										</div>
									</div>
									<div className='bg-green-50 dark:bg-green-950/30 rounded-lg p-4'>
										<p className='text-sm'>
											<strong className='text-green-700 dark:text-green-300'>
												Solution:
											</strong>
											<span className='text-gray-600 dark:text-gray-400 ml-2'>
												{item.solution}
											</span>
										</p>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* CTA Section */}
			<div className='bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 md:p-12 text-center text-white mb-12'>
				<h2 className='text-3xl md:text-4xl font-bold mb-4'>
					Fix Your Rotated PDF Now
				</h2>
				<p className='text-xl mb-8 text-indigo-100'>
					Rotate pages in 30 seconds—free and permanent
				</p>
				<Link
					href='/organize'
					className='inline-flex items-center gap-2 bg-white text-indigo-600 hover:bg-indigo-50 px-8 py-4 rounded-xl font-bold transition-colors shadow-lg text-lg'>
					<RotateCw className='w-6 h-6' />
					Rotate Pages Free
				</Link>
				<p className='mt-6 text-sm text-indigo-200'>
					✓ Single or batch rotation • ✓ Saves permanently • ✓ No
					signup
				</p>
			</div>

			{/* Conclusion */}
			<div className='prose prose-lg dark:prose-invert max-w-none'>
				<h2>Stop Tilting Your Head</h2>
				<p>
					Life&apos;s too short to read sideways PDFs. Whether
					it&apos;s one page or a hundred, rotation takes seconds with
					the right tool. The key is making sure your rotation
					actually saves—don&apos;t just view it rotated, download the
					corrected version.
				</p>
				<p>
					For prevention, take 5 seconds to check your scanner
					orientation before scanning 50 pages. Use document scanning
					apps on your phone instead of the regular camera—they
					auto-detect orientation and save you the headache.
				</p>
				<p>
					And if you&apos;re scanning double-sided documents, pay
					extra attention to how you load the second side. Most
					&quot;every other page is upside-down&quot; problems come
					from duplex scanning with inconsistent loading.
				</p>
			</div>
		</BlogLayout>
	);
}
