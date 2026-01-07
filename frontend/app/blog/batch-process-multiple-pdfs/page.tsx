import { Metadata } from 'next';
import Link from 'next/link';
import { BlogLayout, type BlogPost } from '@/components/blog/BlogLayout';
import {
	Zap,
	Layers,
	Clock,
	TrendingUp,
	CheckCircle2,
	Settings,
	FileText,
	Workflow,
	Terminal,
	Lightbulb,
	Target,
	AlertCircle,
	Download,
	FolderOpen,
} from 'lucide-react';

const postData: BlogPost = {
	slug: 'batch-process-multiple-pdfs',
	title: 'How to Batch Process Multiple PDFs at Once',
	description:
		'Master batch PDF processing to handle dozens of files simultaneously. Learn power user techniques, automation strategies, and tools to save hours of repetitive work.',
	date: '2026-01-05',
	readTime: '11 min read',
	category: 'Advanced',
	author: 'PDF Wonder Kit Team',
	tags: [
		'merge-pdf',
		'split-pdf',
		'productivity',
		'batch-processing',
	],
	featured: false,
	toolSlug: 'merge',
	ctaTitle: 'Start Batch Processing Today',
	ctaDescription: 'PDF Wonder Kit supports batch operations for splitting and merging PDFs. Upload multiple files at once and process them all with a single click.',
};

export const metadata: Metadata = {
	title: postData.title,
	description: postData.description,
	keywords: [
		'batch process pdfs',
		'bulk pdf processing',
		'process multiple pdfs',
		'pdf automation',
		'batch pdf splitting',
		'bulk pdf merging',
		'pdf power user',
		'automate pdf tasks',
		'batch pdf operations',
		'pdf productivity hacks',
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

const batchScenarios = [
	{
		scenario: 'Split 50 Client Reports',
		manual: '50 files × 2 minutes = 100 minutes',
		batch: 'One operation: 5-10 minutes',
		timeSaved: '90 minutes',
		icon: FileText,
	},
	{
		scenario: 'Merge 100 Invoices into Monthly Report',
		manual: '100 selections × 30 seconds = 50 minutes',
		batch: 'One merge operation: 2 minutes',
		timeSaved: '48 minutes',
		icon: Layers,
	},
	{
		scenario: 'Compress 200 Files for Email',
		manual: '200 files × 1 minute = 200 minutes',
		batch: 'Batch compress: 10-15 minutes',
		timeSaved: '3+ hours',
		icon: Download,
	},
	{
		scenario: 'Extract Page 1 from 30 Contracts',
		manual: '30 files × 2 minutes = 60 minutes',
		batch: 'Batch extract: 5 minutes',
		timeSaved: '55 minutes',
		icon: Target,
	},
];

const batchMethods = [
	{
		method: 'Browser-Based Batch Tools',
		difficulty: 'Beginner',
		speed: 'Fast',
		icon: Zap,
		description: 'Use web tools that support multiple file uploads',
		bestFor: 'Most users, quick tasks, no technical knowledge needed',
		tools: ['PDF Wonder Kit (for split/merge)', 'PDF24', 'Sejda'],
		pros: [
			'No installation required',
			'Works on any device',
			'Simple interface',
			'Good for 10-50 files',
		],
		cons: [
			'Upload time for large batches',
			'May have file count limits',
			'Internet required',
		],
		howTo: [
			'Open batch-capable tool in browser',
			'Select all files at once (use Ctrl+A or Cmd+A)',
			'Choose operation (split, merge, compress)',
			'Apply same settings to all files',
			'Download results (often as ZIP file)',
		],
	},
	{
		method: 'Desktop Software Batch Processing',
		difficulty: 'Intermediate',
		speed: 'Very Fast',
		icon: Settings,
		description: 'Use desktop PDF software with batch features',
		bestFor: 'Regular batch users, large file counts',
		tools: ['Adobe Acrobat Pro', 'PDFtk Pro', 'PDF-XChange Editor'],
		pros: [
			'Handle 100+ files easily',
			'No upload required',
			'Works offline',
			'More advanced features',
		],
		cons: [
			'Requires installation',
			'Usually costs money',
			'Learning curve',
		],
		howTo: [
			'Open desktop software',
			'Look for "Batch Processing" or "Action Wizard"',
			'Create action sequence (operations to apply)',
			'Select multiple input files',
			'Run batch process and specify output folder',
		],
	},
	{
		method: 'Command Line Automation',
		difficulty: 'Advanced',
		speed: 'Extremely Fast',
		icon: Terminal,
		description: 'Use command-line tools and scripts for maximum control',
		bestFor: 'Power users, developers, repeated tasks',
		tools: ['PDFtk', 'Ghostscript', 'PyPDF2 (Python)'],
		pros: [
			'Ultimate flexibility',
			'Can process thousands of files',
			'Create reusable scripts',
			'Integrate into workflows',
		],
		cons: [
			'Technical knowledge required',
			'Steep learning curve',
			'Command-line interface',
		],
		howTo: [
			'Install command-line tool (e.g., PDFtk)',
			'Learn basic syntax for your operation',
			'Write script to loop through files',
			'Test on small batch first',
			'Run on full batch, monitor progress',
		],
	},
];

const commonOperations = [
	{
		operation: 'Batch Split PDFs',
		description: 'Split multiple PDFs using same page ranges',
		example: 'Extract pages 1-3 from 50 different invoices',
		browserMethod: {
			tool: 'PDF Wonder Kit',
			steps: [
				'Upload all PDFs at once',
				'Set split ranges (e.g., pages 1-3)',
				'Apply to all files',
				'Download split results',
			],
		},
		desktopMethod: {
			tool: 'Adobe Acrobat Pro',
			steps: [
				'Tools → Organize Pages',
				'Add all files to batch',
				'Set split criteria',
				'Run batch process',
			],
		},
	},
	{
		operation: 'Batch Merge PDFs',
		description: 'Combine multiple PDFs into one or multiple outputs',
		example: 'Merge 30 monthly reports into quarterly summaries',
		browserMethod: {
			tool: 'PDF Wonder Kit',
			steps: [
				'Select all files to merge',
				'Arrange in correct order',
				'Choose merge all or merge by groups',
				'Download merged PDF(s)',
			],
		},
		desktopMethod: {
			tool: 'Adobe Acrobat Pro',
			steps: [
				'Tools → Combine Files',
				'Add all files',
				'Arrange order',
				'Combine and save',
			],
		},
	},
	{
		operation: 'Batch Compress',
		description: 'Reduce file size of multiple PDFs',
		example: 'Compress 100 PDFs for email distribution',
		browserMethod: {
			tool: 'PDF Wonder Kit or PDF24',
			steps: [
				'Upload all PDFs',
				'Select compression level',
				'Apply to all files',
				'Download compressed files',
			],
		},
		desktopMethod: {
			tool: 'Adobe Acrobat Pro',
			steps: [
				'Tools → Optimize PDF',
				'Create custom batch sequence',
				'Select compression settings',
				'Run on all files',
			],
		},
	},
];

const powerUserTips = [
	{
		tip: 'Use Consistent Naming',
		icon: FileText,
		description: 'Name files systematically before batch processing',
		details: 'Use format like "001_Filename.pdf", "002_Filename.pdf" so they sort correctly and process in order.',
	},
	{
		tip: 'Test on Small Batch First',
		icon: Target,
		description: 'Always test your batch process on 2-3 files before running on all',
		details: 'Mistakes in batch operations multiply. One wrong setting × 100 files = disaster.',
	},
	{
		tip: 'Keep Backups',
		icon: FolderOpen,
		description: 'Never batch process your only copy of files',
		details: 'Always work on copies or ensure originals are backed up elsewhere before batch operations.',
	},
	{
		tip: 'Organize Output Folders',
		icon: FolderOpen,
		description: 'Set up clear output folder structure before starting',
		details: 'Create "Processed", "Originals", and "Failed" folders. Batch operations can create hundreds of files.',
	},
	{
		tip: 'Monitor Progress',
		icon: TrendingUp,
		description: 'Watch batch operations, especially large ones',
		details: 'Don\'t start a 500-file batch and walk away. Errors early can be fixed; errors at end waste hours.',
	},
	{
		tip: 'Document Your Process',
		icon: Lightbulb,
		description: 'Write down or save your batch settings',
		details: 'If you\'ll do this again, document exact settings/commands. Future you will thank present you.',
	},
];

const commandLineExamples = [
	{
		task: 'Split All PDFs on Page 3',
		tool: 'PDFtk',
		command: 'for f in *.pdf; do pdftk "$f" cat 1-2 output "split_${f}" 3-end output "rest_${f}"; done',
		explanation: 'Loops through all PDFs, creates two files: pages 1-2 and pages 3-end',
	},
	{
		task: 'Merge All PDFs in Folder',
		tool: 'PDFtk',
		command: 'pdftk *.pdf cat output merged.pdf',
		explanation: 'Combines all PDF files in current folder into merged.pdf',
	},
	{
		task: 'Extract Page 1 from All PDFs',
		tool: 'PDFtk',
		command: 'for f in *.pdf; do pdftk "$f" cat 1 output "page1_${f}"; done',
		explanation: 'Creates new files with only first page from each PDF',
	},
	{
		task: 'Compress All PDFs',
		tool: 'Ghostscript',
		command: 'for f in *.pdf; do gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/ebook -dNOPAUSE -dQUIET -dBATCH -sOutputFile="compressed_${f}" "$f"; done',
		explanation: 'Compresses all PDFs using Ghostscript ebook quality settings',
	},
];

export default function BlogPostPage() {
	return (
		<BlogLayout post={postData}>
			{/* Introduction */}
			<div className='prose-lg'>
				<p className='text-xl text-gray-700 dark:text-gray-300 leading-relaxed'>
					Imagine having to split 50 PDFs, one at a time. Open file,
					select pages, save, close. Repeat. Repeat. Repeat.{' '}
					<strong>You'd spend 2 hours on a task that could take 5 minutes.</strong>
				</p>

				<p>
					Batch processing—handling multiple PDFs with a single
					operation—is the difference between beginner and power user.
					It's how professionals manage hundreds of documents
					efficiently while others struggle with dozens.
				</p>

				<p>
					This comprehensive guide covers everything from simple
					browser-based batch tools (perfect for most users) to
					advanced command-line automation (for power users handling
					thousands of files). Let's multiply your productivity.
				</p>
			</div>

			{/* Why Batch Processing Matters */}
			<section className='my-12'>
				<h2 className='text-3xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-3'>
					<Clock className='h-8 w-8 text-blue-600' />
					Why Batch Processing Matters
				</h2>

				<div className='bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-6 rounded-r-lg mb-6'>
					<p className='text-blue-900 dark:text-blue-100 text-lg'>
						<strong>The math is simple:</strong> Any task you do
						more than once should be batched. The time savings compound
						dramatically.
					</p>
				</div>

				<div className='space-y-4'>
					{batchScenarios.map((scenario, index) => (
						<div
							key={index}
							className='border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-white dark:bg-gray-800'>
							<div className='flex items-start gap-4'>
								<div className='bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg'>
									<scenario.icon className='h-6 w-6 text-blue-600' />
								</div>
								<div className='flex-1'>
									<h3 className='text-lg font-bold text-gray-900 dark:text-white mb-3'>
										{scenario.scenario}
									</h3>
									<div className='grid md:grid-cols-3 gap-4'>
										<div className='bg-red-50 dark:bg-red-900/20 rounded p-3'>
											<p className='text-xs text-red-600 dark:text-red-400 font-medium mb-1'>
												Manual Method:
											</p>
											<p className='text-sm text-gray-900 dark:text-white font-mono'>
												{scenario.manual}
											</p>
										</div>
										<div className='bg-green-50 dark:bg-green-900/20 rounded p-3'>
											<p className='text-xs text-green-600 dark:text-green-400 font-medium mb-1'>
												Batch Method:
											</p>
											<p className='text-sm text-gray-900 dark:text-white font-mono'>
												{scenario.batch}
											</p>
										</div>
										<div className='bg-purple-50 dark:bg-purple-900/20 rounded p-3'>
											<p className='text-xs text-purple-600 dark:text-purple-400 font-medium mb-1'>
												Time Saved:
											</p>
											<p className='text-sm text-gray-900 dark:text-white font-bold'>
												{scenario.timeSaved}
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</section>

			{/* Batch Processing Methods */}
			<section className='my-12'>
				<h2 className='text-3xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-3'>
					<Workflow className='h-8 w-8 text-purple-600' />
					3 Batch Processing Methods
				</h2>

				<p className='text-gray-700 dark:text-gray-300 mb-6'>
					Choose your approach based on technical comfort level and
					frequency of use:
				</p>

				<div className='space-y-8'>
					{batchMethods.map((method, index) => (
						<div
							key={index}
							className='border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800'>
							{/* Header */}
							<div className='bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-white'>
								<div className='flex items-center justify-between mb-2'>
									<div className='flex items-center gap-4'>
										<method.icon className='h-8 w-8' />
										<div>
											<h3 className='text-2xl font-bold'>
												{method.method}
											</h3>
											<p className='text-purple-100'>
												{method.description}
											</p>
										</div>
									</div>
									<div className='flex gap-2'>
										<span className='px-3 py-1 bg-white/20 rounded-lg text-sm font-medium'>
											{method.difficulty}
										</span>
										<span className='px-3 py-1 bg-white/20 rounded-lg text-sm font-medium'>
											{method.speed}
										</span>
									</div>
								</div>
							</div>

							{/* Content */}
							<div className='p-6'>
								<div className='grid md:grid-cols-2 gap-6 mb-6'>
									<div>
										<h4 className='font-bold text-gray-900 dark:text-white mb-3'>
											Best For:
										</h4>
										<p className='text-gray-700 dark:text-gray-300 mb-4'>
											{method.bestFor}
										</p>

										<h4 className='font-bold text-gray-900 dark:text-white mb-2'>
											Recommended Tools:
										</h4>
										<ul className='space-y-1'>
											{method.tools.map((tool, i) => (
												<li
													key={i}
													className='text-sm text-gray-700 dark:text-gray-300'>
													• {tool}
												</li>
											))}
										</ul>
									</div>

									<div>
										<div className='mb-4'>
											<h4 className='font-bold text-green-700 dark:text-green-400 mb-2'>
												Pros:
											</h4>
											<ul className='space-y-1'>
												{method.pros.map((pro, i) => (
													<li
														key={i}
														className='flex items-start gap-2 text-sm'>
														<CheckCircle2 className='h-4 w-4 text-green-600 mt-0.5 flex-shrink-0' />
														<span className='text-gray-700 dark:text-gray-300'>
															{pro}
														</span>
													</li>
												))}
											</ul>
										</div>

										<div>
											<h4 className='font-bold text-red-700 dark:text-red-400 mb-2'>
												Cons:
											</h4>
											<ul className='space-y-1'>
												{method.cons.map((con, i) => (
													<li
														key={i}
														className='text-sm text-gray-600 dark:text-gray-400'>
														• {con}
													</li>
												))}
											</ul>
										</div>
									</div>
								</div>

								<div className='bg-gray-50 dark:bg-gray-900/50 rounded-lg p-5'>
									<h4 className='font-bold text-gray-900 dark:text-white mb-3'>
										How To Use:
									</h4>
									<ol className='space-y-2'>
										{method.howTo.map((step, i) => (
											<li
												key={i}
												className='flex items-start gap-3'>
												<span className='flex items-center justify-center w-6 h-6 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-full text-sm font-bold flex-shrink-0'>
													{i + 1}
												</span>
												<span className='text-gray-700 dark:text-gray-300 pt-0.5'>
													{step}
												</span>
											</li>
										))}
									</ol>
								</div>
							</div>
						</div>
					))}
				</div>
			</section>

			{/* Common Batch Operations */}
			<section className='my-12'>
				<h2 className='text-3xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-3'>
					<Layers className='h-8 w-8 text-green-600' />
					Common Batch Operations
				</h2>

				<div className='space-y-6'>
					{commonOperations.map((op, index) => (
						<div
							key={index}
							className='border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-white dark:bg-gray-800'>
							<h3 className='text-xl font-bold text-gray-900 dark:text-white mb-2'>
								{op.operation}
							</h3>
							<p className='text-gray-700 dark:text-gray-300 mb-1'>
								{op.description}
							</p>
							<p className='text-sm text-gray-600 dark:text-gray-400 italic mb-4'>
								Example: {op.example}
							</p>

							<div className='grid md:grid-cols-2 gap-4'>
								<div className='bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4'>
									<h4 className='font-bold text-blue-900 dark:text-blue-100 mb-3'>
										Browser Method ({op.browserMethod.tool})
									</h4>
									<ol className='space-y-2'>
										{op.browserMethod.steps.map(
											(step, i) => (
												<li
													key={i}
													className='flex items-start gap-2 text-sm'>
													<span className='text-blue-600 font-bold'>
														{i + 1}.
													</span>
													<span className='text-gray-700 dark:text-gray-300'>
														{step}
													</span>
												</li>
											)
										)}
									</ol>
								</div>

								<div className='bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4'>
									<h4 className='font-bold text-purple-900 dark:text-purple-100 mb-3'>
										Desktop Method ({op.desktopMethod.tool})
									</h4>
									<ol className='space-y-2'>
										{op.desktopMethod.steps.map(
											(step, i) => (
												<li
													key={i}
													className='flex items-start gap-2 text-sm'>
													<span className='text-purple-600 font-bold'>
														{i + 1}.
													</span>
													<span className='text-gray-700 dark:text-gray-300'>
														{step}
													</span>
												</li>
											)
										)}
									</ol>
								</div>
							</div>
						</div>
					))}
				</div>
			</section>

			{/* Power User Tips */}
			<section className='my-12'>
				<h2 className='text-3xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-3'>
					<Lightbulb className='h-8 w-8 text-yellow-600' />
					Power User Tips
				</h2>

				<div className='grid md:grid-cols-2 gap-4'>
					{powerUserTips.map((tip, index) => (
						<div
							key={index}
							className='border border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-5'>
							<div className='flex items-start gap-3 mb-2'>
								<tip.icon className='h-5 w-5 text-yellow-600 flex-shrink-0 mt-1' />
								<div>
									<h3 className='font-bold text-gray-900 dark:text-white mb-1'>
										{tip.tip}
									</h3>
									<p className='text-sm text-gray-700 dark:text-gray-300 mb-2'>
										{tip.description}
									</p>
									<p className='text-sm text-yellow-800 dark:text-yellow-200 italic'>
										{tip.details}
									</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</section>

			{/* Command Line Examples */}
			<section className='my-12'>
				<h2 className='text-3xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-3'>
					<Terminal className='h-8 w-8 text-gray-600' />
					Advanced: Command-Line Examples
				</h2>

				<div className='bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-500 p-5 rounded-r-lg mb-6'>
					<div className='flex items-start gap-3'>
						<AlertCircle className='h-5 w-5 text-orange-600 flex-shrink-0 mt-1' />
						<div>
							<p className='text-orange-900 dark:text-orange-100 font-medium mb-2'>
								For Advanced Users Only
							</p>
							<p className='text-sm text-orange-800 dark:text-orange-200'>
								These examples require command-line knowledge and
								installed tools. Always test on copies first!
							</p>
						</div>
					</div>
				</div>

				<div className='space-y-6'>
					{commandLineExamples.map((example, index) => (
						<div
							key={index}
							className='border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800'>
							<div className='bg-gray-100 dark:bg-gray-900 px-6 py-3 border-b border-gray-200 dark:border-gray-700'>
								<h3 className='font-bold text-gray-900 dark:text-white'>
									{example.task}
								</h3>
								<p className='text-sm text-gray-600 dark:text-gray-400'>
									Using: {example.tool}
								</p>
							</div>
							<div className='p-6'>
								<div className='bg-gray-900 dark:bg-black rounded-lg p-4 mb-4 overflow-x-auto'>
									<code className='text-green-400 text-sm font-mono whitespace-pre'>
										{example.command}
									</code>
								</div>
								<p className='text-sm text-gray-700 dark:text-gray-300'>
									<strong>What it does:</strong>{' '}
									{example.explanation}
								</p>
							</div>
						</div>
					))}
				</div>

				<div className='mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-5'>
					<h4 className='font-bold text-blue-900 dark:text-blue-100 mb-2'>
						Learning Resources:
					</h4>
					<ul className='space-y-1 text-sm text-blue-800 dark:text-blue-200'>
						<li>
							• <strong>PDFtk:</strong> pdflabs.com/tools/pdftk-the-pdf-toolkit/
						</li>
						<li>
							• <strong>Ghostscript:</strong> ghostscript.com
						</li>
						<li>
							• <strong>PyPDF2 (Python):</strong> PyPI package for
							Python scripting
						</li>
					</ul>
				</div>
			</section>

			{/* Conclusion */}
			<section className='my-12'>
				<h2 className='text-3xl font-bold mb-6 text-gray-900 dark:text-white'>
					From Beginner to Power User
				</h2>

				<div className='bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-8'>
					<p className='text-lg text-gray-800 dark:text-gray-200 mb-4'>
						Batch processing is the #1 skill that separates casual
						PDF users from power users. Start simple with
						browser-based tools, then advance as your needs grow.
					</p>

					<div className='bg-white dark:bg-gray-800 rounded-lg p-6 mt-6'>
						<h3 className='font-bold text-gray-900 dark:text-white mb-4'>
							Your Learning Path:
						</h3>
						<ol className='space-y-3'>
							<li className='flex items-start gap-3'>
								<span className='flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-bold'>
									1
								</span>
								<div>
									<strong className='text-gray-900 dark:text-white'>
										Start with browser tools
									</strong>
									<p className='text-sm text-gray-600 dark:text-gray-400'>
										Master PDF Wonder Kit and similar tools for
										10-50 file batches
									</p>
								</div>
							</li>
							<li className='flex items-start gap-3'>
								<span className='flex items-center justify-center w-8 h-8 bg-purple-600 text-white rounded-full font-bold'>
									2
								</span>
								<div>
									<strong className='text-gray-900 dark:text-white'>
										Graduate to desktop software
									</strong>
									<p className='text-sm text-gray-600 dark:text-gray-400'>
										Invest in Adobe or similar if you batch
										regularly
									</p>
								</div>
							</li>
							<li className='flex items-start gap-3'>
								<span className='flex items-center justify-center w-8 h-8 bg-indigo-600 text-white rounded-full font-bold'>
									3
								</span>
								<div>
									<strong className='text-gray-900 dark:text-white'>
										Learn command-line automation
									</strong>
									<p className='text-sm text-gray-600 dark:text-gray-400'>
										For 100+ files or repeated tasks, scripting
										is unbeatable
									</p>
								</div>
							</li>
						</ol>
					</div>
				</div>
			</section>

		</BlogLayout>
	);
}
