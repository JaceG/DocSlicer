import { Metadata } from 'next';
import Link from 'next/link';
import { BlogLayout, BlogPost } from '@/components/blog/BlogLayout';
import {
	GraduationCap,
	MessageSquare,
	BookOpen,
	Search,
	FileText,
	CheckCircle2,
	ArrowRight,
	Zap,
	Highlighter,
	Scissors,
	FolderSync,
	Clock,
	AlertTriangle,
	Sparkles,
} from 'lucide-react';

export const metadata: Metadata = {
	title:
		"Student's Guide to PDF Management (Notes, Textbooks, Assignments) | PDF Wonder Kit",
	description:
		'Master digital studying with essential PDF skills. Learn to annotate textbooks, organize notes, merge assignments, and use OCR for searchable study materials.',
	keywords: [
		'student PDF tools',
		'annotate textbook',
		'study notes',
		'digital studying',
		'PDF for students',
		'organize class notes',
		'academic workflows',
		'textbook PDF management',
	],
	openGraph: {
		title:
			"Student's Guide to PDF Management (Notes, Textbooks, Assignments)",
		description:
			'Essential PDF workflows for students: annotate textbooks, organize notes, and streamline assignments.',
		url: 'https://www.pdfwonderkit.com/blog/students-guide-pdf-management',
	},
	alternates: {
		canonical:
			'https://www.pdfwonderkit.com/blog/students-guide-pdf-management',
	},
};

const blogPost: BlogPost = {
	slug: 'students-guide-pdf-management',
	title:
		"Student's Guide to PDF Management (Notes, Textbooks, Assignments)",
	description:
		'Master digital studying with essential PDF skills. Learn to annotate textbooks, organize notes, merge assignments, and use OCR for searchable study materials.',
	date: '2026-01-07',
	readTime: '10 min read',
	category: 'Industry',
};

const studentWorkflows = [
	{
		title: 'Textbook Annotation',
		icon: Highlighter,
		description: 'Highlight, comment, and take notes directly on digital textbooks',
		tools: ['Annotate'],
		benefit: 'Save $300+ on physical textbooks, search your notes instantly',
	},
	{
		title: 'Lecture Note Compilation',
		icon: FolderSync,
		description: 'Combine slides, handouts, and your notes into study guides',
		tools: ['Merge', 'Organize'],
		benefit: 'All study materials in one place, organized by exam',
	},
	{
		title: 'Assignment Assembly',
		icon: Scissors,
		description: 'Extract relevant pages, combine sections, add citations',
		tools: ['Split', 'Merge', 'Page Numbers'],
		benefit: 'Professional submissions, easier to reference sources',
	},
	{
		title: 'Searchable Study Materials',
		icon: Search,
		description: 'Convert scanned notes and photos to searchable text',
		tools: ['OCR', 'Images to PDF'],
		benefit: 'Find any topic instantly when studying for exams',
	},
];

const studyScenarios = [
	{
		scenario: 'Exam Prep Week',
		challenges: [
			'Notes scattered across multiple sources',
			'Need to review specific topics quickly',
			'Creating study guides takes hours',
		],
		solution:
			'Merge all lecture PDFs, annotate key concepts, use OCR to search for specific topics across all materials',
		timeSaved: '5-7 hours per exam',
	},
	{
		scenario: 'Group Project',
		challenges: [
			'Team members submit different file formats',
			'Need consistent page numbers',
			'Citations must be properly formatted',
		],
		solution:
			'Convert all files to PDF, merge sections, add page numbers, organize references',
		timeSaved: '2-3 hours per project',
	},
	{
		scenario: 'Research Paper',
		challenges: [
			'Dozens of journal articles to review',
			'Need to highlight relevant sections',
			'Creating bibliography from multiple sources',
		],
		solution:
			'Annotate PDFs with different colors per theme, extract cited pages, organize by topic',
		timeSaved: '4-6 hours per paper',
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
							<GraduationCap className='w-6 h-6 text-white' />
						</div>
					</div>
					<div>
						<h3 className='font-bold text-lg mb-2 text-gray-900 dark:text-white'>
							Quick Answer: Essential PDF Skills for Students
						</h3>
						<p className='text-gray-700 dark:text-gray-300 mb-3'>
							Students need 4 core PDF workflows: (1) Annotate textbooks with
							highlights and comments for active reading, (2) Merge lecture
							slides and notes into comprehensive study guides, (3) Split/merge
							assignment sections for clean submissions, (4) Use OCR to make
							scanned notes searchable. These skills save 10-15 hours per month
							and improve study efficiency.
						</p>
						<div className='flex flex-wrap gap-2'>
							<span className='inline-flex items-center gap-1 px-3 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium'>
								<Clock className='w-4 h-4' />
								10-15 hrs/month saved
							</span>
							<span className='inline-flex items-center gap-1 px-3 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium'>
								<BookOpen className='w-4 h-4' />
								Better grades
							</span>
						</div>
					</div>
				</div>
			</div>

			{/* Introduction */}
			<div className='prose prose-lg dark:prose-invert max-w-none mb-12'>
				<p className='text-xl text-gray-700 dark:text-gray-300 leading-relaxed'>
					College is expensive enough without spending <strong>$800-1,200 per
					year</strong> on textbooks. Digital PDFs are cheaper (or free), more
					portable, and infinitely more powerful—if you know how to use them
					properly.
				</p>
				<p className='text-gray-600 dark:text-gray-400'>
					This guide teaches you the essential PDF skills that top students use
					to study smarter, not harder. You&apos;ll learn how to annotate
					textbooks like a pro, organize scattered notes into coherent study
					guides, and leverage search to find any topic instantly during
					exam prep.
				</p>
			</div>

			{/* Why Digital Matters */}
			<div className='mb-12'>
				<h2 className='text-3xl font-bold mb-6 text-gray-900 dark:text-white'>
					Why Digital PDF Studying Beats Paper
				</h2>
				<div className='grid md:grid-cols-2 gap-6'>
					<div className='bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700'>
						<div className='flex items-center gap-3 mb-4'>
							<div className='w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center'>
								<Search className='w-5 h-5 text-indigo-600 dark:text-indigo-400' />
							</div>
							<h3 className='font-semibold text-gray-900 dark:text-white'>
								Instant Search
							</h3>
						</div>
						<p className='text-gray-600 dark:text-gray-400 text-sm'>
							Ctrl+F to find any concept, definition, or formula across all your
							materials in seconds. No more flipping through hundreds of pages.
						</p>
					</div>

					<div className='bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700'>
						<div className='flex items-center gap-3 mb-4'>
							<div className='w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center'>
								<Highlighter className='w-5 h-5 text-purple-600 dark:text-purple-400' />
							</div>
							<h3 className='font-semibold text-gray-900 dark:text-white'>
								Color-Coded Notes
							</h3>
						</div>
						<p className='text-gray-600 dark:text-gray-400 text-sm'>
							Use different colored highlights for different concepts. Yellow
							for definitions, pink for exam topics, green for examples—visual
							organization that sticks.
						</p>
					</div>

					<div className='bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700'>
						<div className='flex items-center gap-3 mb-4'>
							<div className='w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center'>
								<Zap className='w-5 h-5 text-green-600 dark:text-green-400' />
							</div>
							<h3 className='font-semibold text-gray-900 dark:text-white'>
								Always Accessible
							</h3>
						</div>
						<p className='text-gray-600 dark:text-gray-400 text-sm'>
							Entire semester worth of textbooks on your laptop, tablet, or
							phone. Study anywhere—coffee shop, library, bus. No 30-pound
							backpack required.
						</p>
					</div>

					<div className='bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700'>
						<div className='flex items-center gap-3 mb-4'>
							<div className='w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center'>
								<FolderSync className='w-5 h-5 text-blue-600 dark:text-blue-400' />
							</div>
							<h3 className='font-semibold text-gray-900 dark:text-white'>
								Easy Organization
							</h3>
						</div>
						<p className='text-gray-600 dark:text-gray-400 text-sm'>
							Create custom study guides by merging relevant sections from
							multiple sources. Textbook chapter + lecture slides + your notes =
							one comprehensive PDF.
						</p>
					</div>
				</div>
			</div>

			{/* Essential Workflows */}
			<div className='mb-12'>
				<h2 className='text-3xl font-bold mb-6 text-gray-900 dark:text-white'>
					4 Essential PDF Workflows Every Student Needs
				</h2>
				<div className='space-y-6'>
					{studentWorkflows.map((workflow, index) => (
						<div
							key={index}
							className='bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700'>
							<div className='flex items-start gap-4 mb-4'>
								<div className='w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0'>
									<workflow.icon className='w-6 h-6 text-white' />
								</div>
								<div className='flex-1'>
									<h3 className='text-xl font-bold text-gray-900 dark:text-white mb-2'>
										{workflow.title}
									</h3>
									<p className='text-gray-600 dark:text-gray-400 mb-3'>
										{workflow.description}
									</p>
									<div className='flex flex-wrap gap-2 mb-3'>
										{workflow.tools.map((tool, toolIndex) => (
											<span
												key={toolIndex}
												className='px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium'>
												{tool}
											</span>
										))}
									</div>
									<p className='text-sm text-green-700 dark:text-green-300 font-medium'>
										✓ {workflow.benefit}
									</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Workflow 1: Textbook Annotation */}
			<div className='mb-12'>
				<h2 className='text-3xl font-bold mb-6 text-gray-900 dark:text-white'>
					Workflow #1: Active Reading with Annotations
				</h2>
				<div className='bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20 rounded-xl p-8 border border-yellow-200 dark:border-yellow-800'>
					<div className='mb-6'>
						<h3 className='text-xl font-bold text-gray-900 dark:text-white mb-3'>
							Reading Without Annotating Is Like Listening Without Notes:
						</h3>
						<p className='text-gray-600 dark:text-gray-400'>
							Research shows students retain 60% more information when actively
							engaging with text through highlights and comments versus passive
							reading.
						</p>
					</div>

					<div className='bg-white dark:bg-gray-900/50 rounded-lg p-6 mb-6'>
						<h4 className='font-semibold text-gray-900 dark:text-white mb-4'>
							Color-Coding System for Maximum Retention:
						</h4>
						<div className='space-y-3'>
							<div className='flex items-start gap-3 p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg'>
								<div className='w-4 h-4 bg-yellow-400 rounded mt-1'></div>
								<div className='flex-1'>
									<strong className='text-gray-900 dark:text-white'>
										Yellow:
									</strong>
									<span className='text-gray-600 dark:text-gray-400 text-sm ml-2'>
										Key definitions and concepts
									</span>
								</div>
							</div>
							<div className='flex items-start gap-3 p-3 bg-pink-100 dark:bg-pink-900/20 rounded-lg'>
								<div className='w-4 h-4 bg-pink-400 rounded mt-1'></div>
								<div className='flex-1'>
									<strong className='text-gray-900 dark:text-white'>
										Pink:
									</strong>
									<span className='text-gray-600 dark:text-gray-400 text-sm ml-2'>
										Professor mentioned in lecture (exam material!)
									</span>
								</div>
							</div>
							<div className='flex items-start gap-3 p-3 bg-green-100 dark:bg-green-900/20 rounded-lg'>
								<div className='w-4 h-4 bg-green-400 rounded mt-1'></div>
								<div className='flex-1'>
									<strong className='text-gray-900 dark:text-white'>
										Green:
									</strong>
									<span className='text-gray-600 dark:text-gray-400 text-sm ml-2'>
										Examples and case studies for essays
									</span>
								</div>
							</div>
							<div className='flex items-start gap-3 p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg'>
								<div className='w-4 h-4 bg-blue-400 rounded mt-1'></div>
								<div className='flex-1'>
									<strong className='text-gray-900 dark:text-white'>
										Blue:
									</strong>
									<span className='text-gray-600 dark:text-gray-400 text-sm ml-2'>
										Confusing sections—ask professor or study group
									</span>
								</div>
							</div>
						</div>
					</div>

					<div className='bg-white dark:bg-gray-900/50 rounded-lg p-6 mb-6'>
						<h4 className='font-semibold text-gray-900 dark:text-white mb-4'>
							How to Annotate:
						</h4>
						<ol className='space-y-3'>
							<li className='flex items-start gap-3'>
								<span className='flex-shrink-0 w-6 h-6 bg-yellow-600 text-white rounded-full flex items-center justify-center text-sm font-bold'>
									1
								</span>
								<div className='text-sm text-gray-600 dark:text-gray-400'>
									<strong className='text-gray-900 dark:text-white'>
										Open textbook PDF:
									</strong>{' '}
									Use{' '}
									<Link
										href='/annotate'
										className='text-yellow-700 dark:text-yellow-400 hover:underline'>
										Annotate PDF
									</Link>{' '}
									tool (works on phone, tablet, or laptop)
								</div>
							</li>
							<li className='flex items-start gap-3'>
								<span className='flex-shrink-0 w-6 h-6 bg-yellow-600 text-white rounded-full flex items-center justify-center text-sm font-bold'>
									2
								</span>
								<div className='text-sm text-gray-600 dark:text-gray-400'>
									<strong className='text-gray-900 dark:text-white'>
										Highlight key passages:
									</strong>{' '}
									Select text and choose color based on your system
								</div>
							</li>
							<li className='flex items-start gap-3'>
								<span className='flex-shrink-0 w-6 h-6 bg-yellow-600 text-white rounded-full flex items-center justify-center text-sm font-bold'>
									3
								</span>
								<div className='text-sm text-gray-600 dark:text-gray-400'>
									<strong className='text-gray-900 dark:text-white'>
										Add sticky notes:
									</strong>{' '}
									Write summaries in your own words for better retention
								</div>
							</li>
							<li className='flex items-start gap-3'>
								<span className='flex-shrink-0 w-6 h-6 bg-yellow-600 text-white rounded-full flex items-center justify-center text-sm font-bold'>
									4
								</span>
								<div className='text-sm text-gray-600 dark:text-gray-400'>
									<strong className='text-gray-900 dark:text-white'>
										Save annotated version:
									</strong>{' '}
									Keep separate from original for easy re-reading
								</div>
							</li>
						</ol>
					</div>

					<div className='bg-yellow-100 dark:bg-yellow-900/30 rounded-lg p-4'>
						<p className='text-sm text-yellow-900 dark:text-yellow-200'>
							<strong>📚 Study Tip:</strong> Review your highlighted sections
							before class. You&apos;ll understand lectures better and ask
							smarter questions.
						</p>
					</div>
				</div>
			</div>

			{/* Workflow 2: Study Guide Creation */}
			<div className='mb-12'>
				<h2 className='text-3xl font-bold mb-6 text-gray-900 dark:text-white'>
					Workflow #2: Creating Comprehensive Study Guides
				</h2>
				<div className='bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-xl p-8 border border-blue-200 dark:border-blue-800'>
					<div className='mb-6'>
						<h3 className='text-xl font-bold text-gray-900 dark:text-white mb-3'>
							Stop Scrambling the Night Before:
						</h3>
						<p className='text-gray-600 dark:text-gray-400'>
							Build study guides throughout the semester. When exam week arrives,
							you have everything organized and ready to review.
						</p>
					</div>

					<div className='bg-white dark:bg-gray-900/50 rounded-lg p-6'>
						<h4 className='font-semibold text-gray-900 dark:text-white mb-4'>
							Assembly Process:
						</h4>
						<ol className='space-y-3'>
							<li className='flex items-start gap-3'>
								<span className='flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold'>
									1
								</span>
								<div className='text-sm text-gray-600 dark:text-gray-400'>
									<strong className='text-gray-900 dark:text-white'>
										Gather materials:
									</strong>{' '}
									Lecture slides, textbook chapters, your class notes, practice
									problems
								</div>
							</li>
							<li className='flex items-start gap-3'>
								<span className='flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold'>
									2
								</span>
								<div className='text-sm text-gray-600 dark:text-gray-400'>
									<strong className='text-gray-900 dark:text-white'>
										Extract relevant pages:
									</strong>{' '}
									Use{' '}
									<Link
										href='/split'
										className='text-blue-600 dark:text-blue-400 hover:underline'>
										Split PDF
									</Link>{' '}
									to pull specific chapters or sections
								</div>
							</li>
							<li className='flex items-start gap-3'>
								<span className='flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold'>
									3
								</span>
								<div className='text-sm text-gray-600 dark:text-gray-400'>
									<strong className='text-gray-900 dark:text-white'>
										Merge in order:
									</strong>{' '}
									Use{' '}
									<Link
										href='/merge'
										className='text-blue-600 dark:text-blue-400 hover:underline'>
										Merge PDF
									</Link>{' '}
									to combine: Topic 1 materials, Topic 2 materials, etc.
								</div>
							</li>
							<li className='flex items-start gap-3'>
								<span className='flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold'>
									4
								</span>
								<div className='text-sm text-gray-600 dark:text-gray-400'>
									<strong className='text-gray-900 dark:text-white'>
										Add page numbers:
									</strong>{' '}
									Makes it easy to reference sections when studying with friends
								</div>
							</li>
						</ol>
					</div>
				</div>
			</div>

			{/* Real Student Scenarios */}
			<div className='mb-12'>
				<h2 className='text-3xl font-bold mb-6 text-gray-900 dark:text-white'>
					How Students Actually Use These Workflows
				</h2>
				<div className='space-y-6'>
					{studyScenarios.map((item, index) => (
						<div
							key={index}
							className='bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700'>
							<div className='flex items-center gap-3 mb-4'>
								<div className='w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center'>
									<CheckCircle2 className='w-5 h-5 text-white' />
								</div>
								<h3 className='text-xl font-bold text-gray-900 dark:text-white'>
									{item.scenario}
								</h3>
							</div>
							<div className='grid md:grid-cols-2 gap-6 mb-4'>
								<div>
									<h4 className='text-sm font-semibold text-red-700 dark:text-red-400 mb-2'>
										Common Challenges:
									</h4>
									<ul className='space-y-1'>
										{item.challenges.map((challenge, cIndex) => (
											<li
												key={cIndex}
												className='text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2'>
												<AlertTriangle className='w-4 h-4 text-red-500 flex-shrink-0 mt-0.5' />
												{challenge}
											</li>
										))}
									</ul>
								</div>
								<div>
									<h4 className='text-sm font-semibold text-green-700 dark:text-green-400 mb-2'>
										PDF Workflow Solution:
									</h4>
									<p className='text-sm text-gray-600 dark:text-gray-400'>
										{item.solution}
									</p>
								</div>
							</div>
							<div className='bg-green-50 dark:bg-green-950/20 rounded-lg p-3'>
								<p className='text-sm font-semibold text-green-700 dark:text-green-300'>
									⏱️ Time Saved: {item.timeSaved}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Pro Tips */}
			<div className='mb-12'>
				<h2 className='text-3xl font-bold mb-6 text-gray-900 dark:text-white'>
					Pro Tips from Top Students
				</h2>
				<div className='grid md:grid-cols-2 gap-6'>
					<div className='bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800'>
						<div className='flex items-center gap-3 mb-4'>
							<Sparkles className='w-6 h-6 text-purple-600 dark:text-purple-400' />
							<h3 className='font-bold text-gray-900 dark:text-white'>
								Convert Photos to Searchable PDFs
							</h3>
						</div>
						<p className='text-sm text-gray-600 dark:text-gray-400 mb-3'>
							Take photos of whiteboard notes after class. Convert to PDF with{' '}
							<Link
								href='/images-to-pdf'
								className='text-purple-600 dark:text-purple-400 hover:underline'>
								Images to PDF
							</Link>
							, then use{' '}
							<Link
								href='/ocr'
								className='text-purple-600 dark:text-purple-400 hover:underline'>
								OCR
							</Link>{' '}
							to make them searchable.
						</p>
						<p className='text-xs font-semibold text-purple-700 dark:text-purple-300'>
							No more illegible handwriting!
						</p>
					</div>

					<div className='bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800'>
						<div className='flex items-center gap-3 mb-4'>
							<Clock className='w-6 h-6 text-blue-600 dark:text-blue-400' />
							<h3 className='font-bold text-gray-900 dark:text-white'>
								Build Study Guides Weekly
							</h3>
						</div>
						<p className='text-sm text-gray-600 dark:text-gray-400 mb-3'>
							Don&apos;t wait until exam week. Every Friday, spend 15 minutes
							merging that week&apos;s materials into your study guide. By exam
							time, it&apos;s done.
						</p>
						<p className='text-xs font-semibold text-blue-700 dark:text-blue-300'>
							15 min/week vs. 8 hrs the night before
						</p>
					</div>

					<div className='bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-xl p-6 border border-green-200 dark:border-green-800'>
						<div className='flex items-center gap-3 mb-4'>
							<FolderSync className='w-6 h-6 text-green-600 dark:text-green-400' />
							<h3 className='font-bold text-gray-900 dark:text-white'>
								One Folder Per Class
							</h3>
						</div>
						<p className='text-sm text-gray-600 dark:text-gray-400 mb-3'>
							Create folders like &quot;CHEM-101-Spring2026&quot; with
							subfolders: Textbook, Lectures, Assignments, Exams. Everything in
							one place, easy to find.
						</p>
						<p className='text-xs font-semibold text-green-700 dark:text-green-300'>
							Never lose a file again
						</p>
					</div>

					<div className='bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20 rounded-xl p-6 border border-orange-200 dark:border-orange-800'>
						<div className='flex items-center gap-3 mb-4'>
							<Search className='w-6 h-6 text-orange-600 dark:text-orange-400' />
							<h3 className='font-bold text-gray-900 dark:text-white'>
								Use OCR on Everything
							</h3>
						</div>
						<p className='text-sm text-gray-600 dark:text-gray-400 mb-3'>
							Make every PDF searchable immediately. During exam prep, search for
							any term across all your materials in seconds instead of manually
							flipping through pages.
						</p>
						<p className='text-xs font-semibold text-orange-700 dark:text-orange-300'>
							Game-changer for open-book exams
						</p>
					</div>
				</div>
			</div>

			{/* CTA Section */}
			<div className='bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 md:p-12 text-center text-white mb-12'>
				<h2 className='text-3xl md:text-4xl font-bold mb-4'>
					Study Smarter This Semester
				</h2>
				<p className='text-xl mb-8 text-indigo-100'>
					Free tools that work on any device—start today
				</p>
				<div className='grid md:grid-cols-4 gap-4 max-w-5xl mx-auto'>
					<Link
						href='/annotate'
						className='bg-white text-indigo-600 hover:bg-indigo-50 px-6 py-4 rounded-xl font-bold transition-colors shadow-lg flex items-center justify-center gap-2'>
						<Highlighter className='w-5 h-5' />
						Annotate
					</Link>
					<Link
						href='/merge'
						className='bg-white text-indigo-600 hover:bg-indigo-50 px-6 py-4 rounded-xl font-bold transition-colors shadow-lg flex items-center justify-center gap-2'>
						<FolderSync className='w-5 h-5' />
						Merge PDFs
					</Link>
					<Link
						href='/split'
						className='bg-white text-indigo-600 hover:bg-indigo-50 px-6 py-4 rounded-xl font-bold transition-colors shadow-lg flex items-center justify-center gap-2'>
						<Scissors className='w-5 h-5' />
						Split PDFs
					</Link>
					<Link
						href='/ocr'
						className='bg-white text-indigo-600 hover:bg-indigo-50 px-6 py-4 rounded-xl font-bold transition-colors shadow-lg flex items-center justify-center gap-2'>
						<Search className='w-5 h-5' />
						OCR
					</Link>
				</div>
				<p className='mt-6 text-sm text-indigo-200'>
					✓ Free forever • ✓ Works on phone/tablet/laptop • ✓ No signup
					required
				</p>
			</div>

			{/* Conclusion */}
			<div className='prose prose-lg dark:prose-invert max-w-none'>
				<h2>The Difference Between Good and Great Students</h2>
				<p>
					Great students don&apos;t work harder—they work smarter. They use
					tools that amplify their efforts: annotating for active learning,
					organizing for easy review, and leveraging search to find information
					instantly.
				</p>
				<p>
					Start with one textbook. Annotate this week&apos;s chapter with the
					color-coding system. You&apos;ll immediately notice better retention
					and engagement. Then add the other workflows as needed throughout the
					semester.
				</p>
				<p>
					The best part? These skills transfer to every class, every semester,
					and even your future career. Learning effective PDF management now
					pays dividends for years to come.
				</p>
			</div>
		</BlogLayout>
	);
}
