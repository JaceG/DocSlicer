import { Metadata } from 'next';
import Link from 'next/link';
import { BlogLayout, BlogPost } from '@/components/blog/BlogLayout';
import {
	Briefcase,
	FileImage,
	FilePlus2,
	Hash,
	Droplets,
	CheckCircle2,
	ArrowRight,
	Palette,
	Star,
	Eye,
	Download,
	Zap,
	AlertTriangle,
	GraduationCap,
	Code,
	Camera,
} from 'lucide-react';

export const metadata: Metadata = {
	title:
		'How to Create a Professional PDF Portfolio from Scratch (2026) | PDF Wonder Kit',
	description:
		"Build an impressive PDF portfolio for job applications, freelance pitches, or client presentations. Step-by-step guide to combining work samples with professional formatting.",
	keywords: [
		'PDF portfolio',
		'combine PDFs',
		'professional portfolio',
		'create portfolio PDF',
		'portfolio design',
		'job application portfolio',
		'freelance portfolio',
		'design portfolio PDF',
	],
	openGraph: {
		title: 'How to Create a Professional PDF Portfolio from Scratch',
		description:
			'Build an impressive PDF portfolio with work samples, professional page numbers, and branded watermarks.',
		url: 'https://www.pdfwonderkit.com/blog/create-professional-pdf-portfolio',
	},
	alternates: {
		canonical:
			'https://www.pdfwonderkit.com/blog/create-professional-pdf-portfolio',
	},
};

const blogPost: BlogPost = {
	slug: 'create-professional-pdf-portfolio',
	title: 'How to Create a Professional PDF Portfolio from Scratch',
	description:
		"Build an impressive PDF portfolio for job applications, freelance pitches, or client presentations. Step-by-step guide to combining work samples with professional formatting.",
	date: '2026-01-07',
	readTime: '11 min read',
	category: 'Tutorials',
	author: 'PDF WonderKit Team',
	tags: ['Portfolio', 'Career', 'Professional', 'Job Search'],
};

const portfolioTypes = [
	{
		title: 'Design Portfolio',
		icon: Palette,
		description:
			'Graphic designers, UX/UI designers, illustrators showcasing visual work',
		includes: [
			'Project thumbnails',
			'Case studies',
			'Before/after comparisons',
			'Client testimonials',
		],
		size: '15-30 pages',
	},
	{
		title: 'Developer Portfolio',
		icon: Code,
		description: 'Software engineers, web developers showing projects and code',
		includes: [
			'Project screenshots',
			'Technical stack',
			'Code samples',
			'GitHub links',
		],
		size: '10-20 pages',
	},
	{
		title: 'Photography Portfolio',
		icon: Camera,
		description: 'Photographers presenting their best shots in various categories',
		includes: [
			'High-res images',
			'Project descriptions',
			'Client work',
			'Personal projects',
		],
		size: '20-40 pages',
	},
	{
		title: 'Academic Portfolio',
		icon: GraduationCap,
		description:
			'Students, researchers, educators demonstrating academic achievements',
		includes: [
			'Research papers',
			'Certifications',
			'Project reports',
			'Publications',
		],
		size: '10-25 pages',
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
							<Briefcase className='w-6 h-6 text-white' />
						</div>
					</div>
					<div>
						<h3 className='font-bold text-lg mb-2 text-gray-900 dark:text-white'>
							Quick Answer: Creating a Professional PDF Portfolio
						</h3>
						<p className='text-gray-700 dark:text-gray-300 mb-3'>
							Create a professional PDF portfolio in 5 steps: (1) Convert work
							samples to PDF/images, (2) Create a cover page and table of
							contents, (3) Merge all pages using Merge PDF, (4) Add page
							numbers for easy navigation, (5) Apply your personal branding
							watermark. Total time: 30-45 minutes.
						</p>
						<div className='flex flex-wrap gap-2'>
							<span className='inline-flex items-center gap-1 px-3 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium'>
								<Zap className='w-4 h-4' />
								30-45 min to create
							</span>
							<span className='inline-flex items-center gap-1 px-3 py-1 bg-pink-100 dark:bg-pink-900/50 text-pink-700 dark:text-pink-300 rounded-full text-sm font-medium'>
								<Briefcase className='w-4 h-4' />
								All industries
							</span>
						</div>
					</div>
				</div>
			</div>

			{/* Introduction */}
			<div className='prose prose-lg dark:prose-invert max-w-none mb-12'>
				<p className='text-xl text-gray-700 dark:text-gray-300 leading-relaxed'>
					A well-crafted PDF portfolio can be the difference between landing
					your dream job and getting overlooked. In 2026&apos;s competitive job
					market, recruiters spend an average of just <strong>30 seconds</strong>{' '}
					reviewing each portfolio—so presentation matters.
				</p>
				<p className='text-gray-600 dark:text-gray-400'>
					Whether you&apos;re a designer showcasing visual work, a developer
					presenting projects, or a consultant building credibility, this
					guide will walk you through creating a professional PDF portfolio that
					stands out. No expensive software required—just your work samples and
					free online tools.
				</p>
			</div>

			{/* Why PDF Portfolio */}
			<div className='mb-12'>
				<h2 className='text-3xl font-bold mb-6 text-gray-900 dark:text-white'>
					Why a PDF Portfolio Beats Online-Only Portfolios
				</h2>
				<div className='grid md:grid-cols-2 gap-6'>
					<div className='bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700'>
						<div className='flex items-center gap-3 mb-4'>
							<div className='w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center'>
								<Download className='w-5 h-5 text-green-600 dark:text-green-400' />
							</div>
							<h3 className='font-semibold text-gray-900 dark:text-white'>
								Works Offline
							</h3>
						</div>
						<p className='text-gray-600 dark:text-gray-400 text-sm'>
							Recruiters can view your portfolio on airplanes, in meetings, or
							anywhere without internet. Your website might be down—your PDF
							never is.
						</p>
					</div>

					<div className='bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700'>
						<div className='flex items-center gap-3 mb-4'>
							<div className='w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center'>
								<Eye className='w-5 h-5 text-blue-600 dark:text-blue-400' />
							</div>
							<h3 className='font-semibold text-gray-900 dark:text-white'>
								Consistent Formatting
							</h3>
						</div>
						<p className='text-gray-600 dark:text-gray-400 text-sm'>
							PDFs look identical on every device. No broken layouts, missing
							images, or browser compatibility issues—it always looks exactly as
							you designed it.
						</p>
					</div>

					<div className='bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700'>
						<div className='flex items-center gap-3 mb-4'>
							<div className='w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center'>
								<CheckCircle2 className='w-5 h-5 text-purple-600 dark:text-purple-400' />
							</div>
							<h3 className='font-semibold text-gray-900 dark:text-white'>
								Easy to Share
							</h3>
						</div>
						<p className='text-gray-600 dark:text-gray-400 text-sm'>
							Email it, attach it to applications, upload to LinkedIn, or print
							it for in-person interviews. One file works everywhere.
						</p>
					</div>

					<div className='bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700'>
						<div className='flex items-center gap-3 mb-4'>
							<div className='w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center'>
								<Star className='w-5 h-5 text-orange-600 dark:text-orange-400' />
							</div>
							<h3 className='font-semibold text-gray-900 dark:text-white'>
								Professional Impression
							</h3>
						</div>
						<p className='text-gray-600 dark:text-gray-400 text-sm'>
							A polished PDF shows attention to detail and professionalism.
							It&apos;s the digital equivalent of a printed book—permanent and
							intentional.
						</p>
					</div>
				</div>
			</div>

			{/* Portfolio Types */}
			<div className='mb-12'>
				<h2 className='text-3xl font-bold mb-6 text-gray-900 dark:text-white'>
					Types of PDF Portfolios (Choose Your Style)
				</h2>
				<div className='grid md:grid-cols-2 gap-6'>
					{portfolioTypes.map((type, index) => (
						<div
							key={index}
							className='bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700'>
							<div className='flex items-center gap-3 mb-4'>
								<div className='w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center'>
									<type.icon className='w-6 h-6 text-white' />
								</div>
								<div>
									<h3 className='text-xl font-bold text-gray-900 dark:text-white'>
										{type.title}
									</h3>
									<span className='text-sm text-purple-600 dark:text-purple-400'>
										{type.size}
									</span>
								</div>
							</div>
							<p className='text-gray-600 dark:text-gray-400 mb-4'>
								{type.description}
							</p>
							<div className='space-y-2'>
								<p className='text-sm font-semibold text-gray-700 dark:text-gray-300'>
									What to Include:
								</p>
								{type.includes.map((item, i) => (
									<div key={i} className='flex items-center gap-2 text-sm'>
										<CheckCircle2 className='w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0' />
										<span className='text-gray-600 dark:text-gray-400'>
											{item}
										</span>
									</div>
								))}
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Step-by-Step Guide */}
			<div className='mb-12'>
				<h2 className='text-3xl font-bold mb-6 text-gray-900 dark:text-white'>
					Step-by-Step: Build Your Professional Portfolio
				</h2>

				{/* Step 1 */}
				<div className='bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-xl p-8 mb-8 border border-blue-200 dark:border-blue-800'>
					<div className='flex items-start gap-4 mb-6'>
						<div className='w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0'>
							<span className='text-2xl font-bold text-white'>1</span>
						</div>
						<div className='flex-1'>
							<h3 className='text-2xl font-bold text-gray-900 dark:text-white mb-2'>
								Prepare Your Work Samples
							</h3>
							<p className='text-gray-600 dark:text-gray-400'>
								Gather your best work and convert everything to PDF or image
								format.
							</p>
						</div>
					</div>

					<div className='bg-white dark:bg-gray-900/50 rounded-lg p-6 mb-6'>
						<h4 className='font-semibold text-gray-900 dark:text-white mb-4'>
							What to Include:
						</h4>
						<ul className='space-y-3'>
							<li className='flex items-start gap-3'>
								<CheckCircle2 className='w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5' />
								<div>
									<strong className='text-gray-900 dark:text-white'>
										Cover page:
									</strong>
									<span className='text-gray-600 dark:text-gray-400'>
										{' '}
										Your name, title, contact info, and professional headshot
										(optional)
									</span>
								</div>
							</li>
							<li className='flex items-start gap-3'>
								<CheckCircle2 className='w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5' />
								<div>
									<strong className='text-gray-900 dark:text-white'>
										Table of contents:
									</strong>
									<span className='text-gray-600 dark:text-gray-400'>
										{' '}
										Project names with page numbers (add later)
									</span>
								</div>
							</li>
							<li className='flex items-start gap-3'>
								<CheckCircle2 className='w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5' />
								<div>
									<strong className='text-gray-900 dark:text-white'>
										About page:
									</strong>
									<span className='text-gray-600 dark:text-gray-400'>
										{' '}
										Brief bio, skills, experience summary
									</span>
								</div>
							</li>
							<li className='flex items-start gap-3'>
								<CheckCircle2 className='w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5' />
								<div>
									<strong className='text-gray-900 dark:text-white'>
										3-6 best projects:
									</strong>
									<span className='text-gray-600 dark:text-gray-400'>
										{' '}
										Each with context, your role, and results
									</span>
								</div>
							</li>
							<li className='flex items-start gap-3'>
								<CheckCircle2 className='w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5' />
								<div>
									<strong className='text-gray-900 dark:text-white'>
										Contact page:
									</strong>
									<span className='text-gray-600 dark:text-gray-400'>
										{' '}
										Email, phone, LinkedIn, portfolio website
									</span>
								</div>
							</li>
						</ul>
					</div>

					<div className='bg-blue-100 dark:bg-blue-900/30 rounded-lg p-4'>
						<p className='text-sm text-blue-900 dark:text-blue-200'>
							<strong>💡 Pro Tip:</strong> Design your cover and about pages in
							Canva, PowerPoint, or Figma. Export as PDF or high-resolution
							images (PNG/JPG at 300 DPI).
						</p>
					</div>
				</div>

				{/* Step 2 */}
				<div className='bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-xl p-8 mb-8 border border-purple-200 dark:border-purple-800'>
					<div className='flex items-start gap-4 mb-6'>
						<div className='w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center flex-shrink-0'>
							<span className='text-2xl font-bold text-white'>2</span>
						</div>
						<div className='flex-1'>
							<h3 className='text-2xl font-bold text-gray-900 dark:text-white mb-2'>
								Convert Images to PDF (If Needed)
							</h3>
							<p className='text-gray-600 dark:text-gray-400'>
								If your work samples are JPGs, PNGs, or other image formats,
								convert them to PDF first.
							</p>
						</div>
					</div>

					<div className='bg-white dark:bg-gray-900/50 rounded-lg p-6 mb-6'>
						<h4 className='font-semibold text-gray-900 dark:text-white mb-4'>
							How to Convert:
						</h4>
						<ol className='space-y-3'>
							<li className='flex items-start gap-3'>
								<span className='flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold'>
									1
								</span>
								<div>
									<span className='text-gray-600 dark:text-gray-400'>
										Go to{' '}
										<Link
											href='/images-to-pdf'
											className='text-purple-600 dark:text-purple-400 hover:underline font-medium'>
											Images to PDF tool
										</Link>
									</span>
								</div>
							</li>
							<li className='flex items-start gap-3'>
								<span className='flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold'>
									2
								</span>
								<div>
									<span className='text-gray-600 dark:text-gray-400'>
										Upload all images for one project
									</span>
								</div>
							</li>
							<li className='flex items-start gap-3'>
								<span className='flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold'>
									3
								</span>
								<div>
									<span className='text-gray-600 dark:text-gray-400'>
										Arrange in the order you want them to appear
									</span>
								</div>
							</li>
							<li className='flex items-start gap-3'>
								<span className='flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold'>
									4
								</span>
								<div>
									<span className='text-gray-600 dark:text-gray-400'>
										Convert to PDF and download
									</span>
								</div>
							</li>
							<li className='flex items-start gap-3'>
								<span className='flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold'>
									5
								</span>
								<div>
									<span className='text-gray-600 dark:text-gray-400'>
										Repeat for each project/section
									</span>
								</div>
							</li>
						</ol>
					</div>

					<div className='bg-purple-100 dark:bg-purple-900/30 rounded-lg p-4'>
						<p className='text-sm text-purple-900 dark:text-purple-200'>
							<strong>📸 Image Quality Tip:</strong> Use high-resolution images
							(at least 1920x1080 for full-page images). This ensures your work
							looks crisp, even when printed.
						</p>
					</div>
				</div>

				{/* Step 3 */}
				<div className='bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-xl p-8 mb-8 border border-green-200 dark:border-green-800'>
					<div className='flex items-start gap-4 mb-6'>
						<div className='w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center flex-shrink-0'>
							<span className='text-2xl font-bold text-white'>3</span>
						</div>
						<div className='flex-1'>
							<h3 className='text-2xl font-bold text-gray-900 dark:text-white mb-2'>
								Merge All PDFs Into One Portfolio
							</h3>
							<p className='text-gray-600 dark:text-gray-400'>
								Combine your cover page, about page, projects, and contact page
								into a single professional PDF.
							</p>
						</div>
					</div>

					<div className='bg-white dark:bg-gray-900/50 rounded-lg p-6 mb-6'>
						<h4 className='font-semibold text-gray-900 dark:text-white mb-4'>
							How to Merge:
						</h4>
						<ol className='space-y-3'>
							<li className='flex items-start gap-3'>
								<span className='flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold'>
									1
								</span>
								<div>
									<span className='text-gray-600 dark:text-gray-400'>
										Go to{' '}
										<Link
											href='/merge'
											className='text-green-600 dark:text-green-400 hover:underline font-medium'>
											Merge PDF tool
										</Link>
									</span>
								</div>
							</li>
							<li className='flex items-start gap-3'>
								<span className='flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold'>
									2
								</span>
								<div>
									<span className='text-gray-600 dark:text-gray-400'>
										Upload all your PDFs in this order:
									</span>
									<ul className='mt-2 ml-4 space-y-1 text-sm text-gray-500 dark:text-gray-400'>
										<li>• Cover page</li>
										<li>• Table of contents</li>
										<li>• About page</li>
										<li>• Project 1</li>
										<li>• Project 2...</li>
										<li>• Contact page</li>
									</ul>
								</div>
							</li>
							<li className='flex items-start gap-3'>
								<span className='flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold'>
									3
								</span>
								<div>
									<span className='text-gray-600 dark:text-gray-400'>
										Drag to reorder if needed
									</span>
								</div>
							</li>
							<li className='flex items-start gap-3'>
								<span className='flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold'>
									4
								</span>
								<div>
									<span className='text-gray-600 dark:text-gray-400'>
										Merge into one PDF and download
									</span>
								</div>
							</li>
						</ol>
					</div>

					<div className='bg-green-100 dark:bg-green-900/30 rounded-lg p-4'>
						<p className='text-sm text-green-900 dark:text-green-200'>
							<strong>🎯 Organization Tip:</strong> Name your merged file
							descriptively: &quot;YourName_Portfolio_2026.pdf&quot; so it&apos;s easy for
							recruiters to find and identify.
						</p>
					</div>
				</div>

				{/* Step 4 */}
				<div className='bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20 rounded-xl p-8 mb-8 border border-orange-200 dark:border-orange-800'>
					<div className='flex items-start gap-4 mb-6'>
						<div className='w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center flex-shrink-0'>
							<span className='text-2xl font-bold text-white'>4</span>
						</div>
						<div className='flex-1'>
							<h3 className='text-2xl font-bold text-gray-900 dark:text-white mb-2'>
								Add Professional Page Numbers
							</h3>
							<p className='text-gray-600 dark:text-gray-400'>
								Page numbers make your portfolio easy to navigate and reference
								during interviews.
							</p>
						</div>
					</div>

					<div className='bg-white dark:bg-gray-900/50 rounded-lg p-6 mb-6'>
						<h4 className='font-semibold text-gray-900 dark:text-white mb-4'>
							How to Add Page Numbers:
						</h4>
						<ol className='space-y-3'>
							<li className='flex items-start gap-3'>
								<span className='flex-shrink-0 w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold'>
									1
								</span>
								<div>
									<span className='text-gray-600 dark:text-gray-400'>
										Go to{' '}
										<Link
											href='/page-numbers'
											className='text-orange-600 dark:text-orange-400 hover:underline font-medium'>
											Add Page Numbers tool
										</Link>
									</span>
								</div>
							</li>
							<li className='flex items-start gap-3'>
								<span className='flex-shrink-0 w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold'>
									2
								</span>
								<div>
									<span className='text-gray-600 dark:text-gray-400'>
										Upload your merged portfolio PDF
									</span>
								</div>
							</li>
							<li className='flex items-start gap-3'>
								<span className='flex-shrink-0 w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold'>
									3
								</span>
								<div>
									<span className='text-gray-600 dark:text-gray-400'>
										Choose position (bottom center is most common)
									</span>
								</div>
							</li>
							<li className='flex items-start gap-3'>
								<span className='flex-shrink-0 w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold'>
									4
								</span>
								<div>
									<span className='text-gray-600 dark:text-gray-400'>
										Select format (&quot;1&quot; or &quot;Page 1 of 20&quot;)
									</span>
								</div>
							</li>
							<li className='flex items-start gap-3'>
								<span className='flex-shrink-0 w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold'>
									5
								</span>
								<div>
									<span className='text-gray-600 dark:text-gray-400'>
										Skip the cover page (start numbering from page 2)
									</span>
								</div>
							</li>
						</ol>
					</div>

					<div className='bg-orange-100 dark:bg-orange-900/30 rounded-lg p-4'>
						<p className='text-sm text-orange-900 dark:text-orange-200'>
							<strong>💡 Design Tip:</strong> Use a font and color that matches
							your portfolio&apos;s design. Gray text (60% opacity) is subtle and
							professional.
						</p>
					</div>
				</div>

				{/* Step 5 */}
				<div className='bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950/20 dark:to-rose-950/20 rounded-xl p-8 mb-8 border border-pink-200 dark:border-pink-800'>
					<div className='flex items-start gap-4 mb-6'>
						<div className='w-12 h-12 bg-pink-600 rounded-xl flex items-center justify-center flex-shrink-0'>
							<span className='text-2xl font-bold text-white'>5</span>
						</div>
						<div className='flex-1'>
							<h3 className='text-2xl font-bold text-gray-900 dark:text-white mb-2'>
								Add Your Personal Branding (Optional)
							</h3>
							<p className='text-gray-600 dark:text-gray-400'>
								Watermark your portfolio with your name or logo to prevent work
								theft and reinforce your brand.
							</p>
						</div>
					</div>

					<div className='bg-white dark:bg-gray-900/50 rounded-lg p-6 mb-6'>
						<h4 className='font-semibold text-gray-900 dark:text-white mb-4'>
							How to Add Watermark:
						</h4>
						<ol className='space-y-3'>
							<li className='flex items-start gap-3'>
								<span className='flex-shrink-0 w-6 h-6 bg-pink-600 text-white rounded-full flex items-center justify-center text-sm font-bold'>
									1
								</span>
								<div>
									<span className='text-gray-600 dark:text-gray-400'>
										Go to{' '}
										<Link
											href='/watermark'
											className='text-pink-600 dark:text-pink-400 hover:underline font-medium'>
											Add Watermark tool
										</Link>
									</span>
								</div>
							</li>
							<li className='flex items-start gap-3'>
								<span className='flex-shrink-0 w-6 h-6 bg-pink-600 text-white rounded-full flex items-center justify-center text-sm font-bold'>
									2
								</span>
								<div>
									<span className='text-gray-600 dark:text-gray-400'>
										Upload your portfolio
									</span>
								</div>
							</li>
							<li className='flex items-start gap-3'>
								<span className='flex-shrink-0 w-6 h-6 bg-pink-600 text-white rounded-full flex items-center justify-center text-sm font-bold'>
									3
								</span>
								<div>
									<span className='text-gray-600 dark:text-gray-400'>
										Add text (your name) or upload your logo
									</span>
								</div>
							</li>
							<li className='flex items-start gap-3'>
								<span className='flex-shrink-0 w-6 h-6 bg-pink-600 text-white rounded-full flex items-center justify-center text-sm font-bold'>
									4
								</span>
								<div>
									<span className='text-gray-600 dark:text-gray-400'>
										Position in corner (bottom right is common)
									</span>
								</div>
							</li>
							<li className='flex items-start gap-3'>
								<span className='flex-shrink-0 w-6 h-6 bg-pink-600 text-white rounded-full flex items-center justify-center text-sm font-bold'>
									5
								</span>
								<div>
									<span className='text-gray-600 dark:text-gray-400'>
										Adjust opacity to 20-30% so it&apos;s subtle
									</span>
								</div>
							</li>
						</ol>
					</div>

					<div className='bg-pink-100 dark:bg-pink-900/30 rounded-lg p-4'>
						<p className='text-sm text-pink-900 dark:text-pink-200'>
							<strong>⚠️ Important:</strong> Keep watermarks subtle! They should
							protect your work without distracting from it. Avoid covering key
							visual elements.
						</p>
					</div>
				</div>
			</div>

			{/* Best Practices */}
			<div className='mb-12'>
				<h2 className='text-3xl font-bold mb-6 text-gray-900 dark:text-white'>
					Portfolio Design Best Practices
				</h2>
				<div className='grid md:grid-cols-2 gap-6'>
					<div className='bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700'>
						<div className='flex items-center gap-3 mb-4'>
							<CheckCircle2 className='w-6 h-6 text-green-600 dark:text-green-400' />
							<h3 className='font-semibold text-gray-900 dark:text-white'>
								Keep It Concise
							</h3>
						</div>
						<p className='text-gray-600 dark:text-gray-400 text-sm'>
							15-30 pages maximum. Show only your absolute best work. Quality
							over quantity—every page should impress.
						</p>
					</div>

					<div className='bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700'>
						<div className='flex items-center gap-3 mb-4'>
							<CheckCircle2 className='w-6 h-6 text-green-600 dark:text-green-400' />
							<h3 className='font-semibold text-gray-900 dark:text-white'>
								Tell a Story
							</h3>
						</div>
						<p className='text-gray-600 dark:text-gray-400 text-sm'>
							For each project, explain the challenge, your approach, and the
							results. Context makes your work meaningful.
						</p>
					</div>

					<div className='bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700'>
						<div className='flex items-center gap-3 mb-4'>
							<CheckCircle2 className='w-6 h-6 text-green-600 dark:text-green-400' />
							<h3 className='font-semibold text-gray-900 dark:text-white'>
								Optimize File Size
							</h3>
						</div>
						<p className='text-gray-600 dark:text-gray-400 text-sm'>
							Keep your portfolio under 10MB for easy emailing. Use{' '}
							<Link
								href='/compress'
								className='text-blue-600 dark:text-blue-400 hover:underline'>
								Compress PDF
							</Link>{' '}
							if needed.
						</p>
					</div>

					<div className='bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700'>
						<div className='flex items-center gap-3 mb-4'>
							<CheckCircle2 className='w-6 h-6 text-green-600 dark:text-green-400' />
							<h3 className='font-semibold text-gray-900 dark:text-white'>
								Update Regularly
							</h3>
						</div>
						<p className='text-gray-600 dark:text-gray-400 text-sm'>
							Refresh your portfolio every 3-6 months. Replace weaker projects
							with newer, stronger work as you grow.
						</p>
					</div>
				</div>
			</div>

			{/* Common Mistakes */}
			<div className='mb-12'>
				<h2 className='text-3xl font-bold mb-6 text-gray-900 dark:text-white'>
					Common Portfolio Mistakes to Avoid
				</h2>
				<div className='space-y-4'>
					<div className='bg-red-50 dark:bg-red-950/20 rounded-xl p-6 border border-red-200 dark:border-red-800'>
						<div className='flex items-start gap-3'>
							<AlertTriangle className='w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-1' />
							<div>
								<h4 className='font-bold text-gray-900 dark:text-white mb-2'>
									Including Too Much Work
								</h4>
								<p className='text-sm text-gray-600 dark:text-gray-400'>
									50-page portfolios overwhelm recruiters. Curate ruthlessly—only
									include work you&apos;d be proud to recreate today.
								</p>
							</div>
						</div>
					</div>

					<div className='bg-red-50 dark:bg-red-950/20 rounded-xl p-6 border border-red-200 dark:border-red-800'>
						<div className='flex items-start gap-3'>
							<AlertTriangle className='w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-1' />
							<div>
								<h4 className='font-bold text-gray-900 dark:text-white mb-2'>
									No Context or Explanations
								</h4>
								<p className='text-sm text-gray-600 dark:text-gray-400'>
									Don&apos;t just show images. Explain your role, the problem you
									solved, tools used, and the outcome. Storytelling matters.
								</p>
							</div>
						</div>
					</div>

					<div className='bg-red-50 dark:bg-red-950/20 rounded-xl p-6 border border-red-200 dark:border-red-800'>
						<div className='flex items-start gap-3'>
							<AlertTriangle className='w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-1' />
							<div>
								<h4 className='font-bold text-gray-900 dark:text-white mb-2'>
									Poor Image Quality
								</h4>
								<p className='text-sm text-gray-600 dark:text-gray-400'>
									Blurry screenshots or low-resolution images look unprofessional.
									Always use high-quality images (minimum 1920x1080).
								</p>
							</div>
						</div>
					</div>

					<div className='bg-red-50 dark:bg-red-950/20 rounded-xl p-6 border border-red-200 dark:border-red-800'>
						<div className='flex items-start gap-3'>
							<AlertTriangle className='w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-1' />
							<div>
								<h4 className='font-bold text-gray-900 dark:text-white mb-2'>
									Forgetting Contact Information
								</h4>
								<p className='text-sm text-gray-600 dark:text-gray-400'>
									Include your email, phone, LinkedIn, and website on both the
									cover and final pages. Make it easy for recruiters to reach you.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* CTA Section */}
			<div className='bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 md:p-12 text-center text-white mb-12'>
				<h2 className='text-3xl md:text-4xl font-bold mb-4'>
					Build Your Professional Portfolio Now
				</h2>
				<p className='text-xl mb-8 text-purple-100'>
					All tools are free and work right in your browser—no downloads
					required
				</p>
				<div className='grid md:grid-cols-4 gap-4 max-w-5xl mx-auto'>
					<Link
						href='/images-to-pdf'
						className='bg-white text-purple-600 hover:bg-purple-50 px-6 py-4 rounded-xl font-bold transition-colors shadow-lg flex items-center justify-center gap-2'>
						<FileImage className='w-5 h-5' />
						Images to PDF
					</Link>
					<Link
						href='/merge'
						className='bg-white text-purple-600 hover:bg-purple-50 px-6 py-4 rounded-xl font-bold transition-colors shadow-lg flex items-center justify-center gap-2'>
						<FilePlus2 className='w-5 h-5' />
						Merge PDFs
					</Link>
					<Link
						href='/page-numbers'
						className='bg-white text-purple-600 hover:bg-purple-50 px-6 py-4 rounded-xl font-bold transition-colors shadow-lg flex items-center justify-center gap-2'>
						<Hash className='w-5 h-5' />
						Page Numbers
					</Link>
					<Link
						href='/watermark'
						className='bg-white text-purple-600 hover:bg-purple-50 px-6 py-4 rounded-xl font-bold transition-colors shadow-lg flex items-center justify-center gap-2'>
						<Droplets className='w-5 h-5' />
						Watermark
					</Link>
				</div>
				<p className='mt-6 text-sm text-purple-200'>
					✓ 100% free • ✓ No registration • ✓ Secure client-side processing
				</p>
			</div>

			{/* Conclusion */}
			<div className='prose prose-lg dark:prose-invert max-w-none'>
				<h2>Start Building Your Portfolio Today</h2>
				<p>
					A professional PDF portfolio is your ticket to standing out in a
					competitive job market. With these free tools and best practices,
					you can create a stunning portfolio in under an hour.
				</p>
				<p>
					Remember: quality over quantity. Showcase your absolute best work,
					tell compelling stories about each project, and make it easy for
					recruiters to see why they should hire you. Your portfolio is often
					the first impression you make—make it count.
				</p>
			</div>
		</BlogLayout>
	);
}
