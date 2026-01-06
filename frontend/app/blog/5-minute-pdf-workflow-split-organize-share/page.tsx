import { Metadata } from 'next';
import Link from 'next/link';
import { BlogLayout, type BlogPost } from '@/components/blog/BlogLayout';
import {
	Clock,
	Scissors,
	FolderOpen,
	Share2,
	CheckCircle2,
	Zap,
	FileText,
	Download,
	Upload,
	ArrowRight,
	Target,
	Lightbulb,
	TrendingUp,
} from 'lucide-react';

const postData: BlogPost = {
	slug: '5-minute-pdf-workflow-split-organize-share',
	title: '5-Minute PDF Workflow: Split, Organize, and Share',
	description:
		'Master the essential PDF workflow in just 5 minutes. Learn how to quickly split PDFs, organize documents efficiently, and share files professionally with our step-by-step tutorial.',
	date: '2026-01-05',
	readTime: '6 min read',
	category: 'Tutorials',
	author: 'DocSlicer Team',
	tags: [
		'pdf workflow',
		'productivity',
		'tutorial',
		'document management',
		'quick guide',
	],
	featured: false,
};

export const metadata: Metadata = {
	title: postData.title,
	description: postData.description,
	keywords: [
		'pdf workflow',
		'quick pdf tutorial',
		'split pdf fast',
		'organize pdfs',
		'share pdf files',
		'pdf productivity',
		'efficient pdf management',
		'pdf organization tips',
		'document workflow',
		'pdf best practices',
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

const workflowSteps = [
	{
		step: 1,
		title: 'Split Your PDF',
		time: '1 minute',
		icon: Scissors,
		description: 'Extract the pages you need from large documents',
		actions: [
			'Open your PDF in DocSlicer',
			'Select the specific pages or ranges you need',
			'Click "Split" to create separate documents',
			'Download your extracted pages',
		],
		tips: [
			'Use page ranges (e.g., 1-5, 10-15) for quick selection',
			'Preview pages before splitting to ensure accuracy',
		],
	},
	{
		step: 2,
		title: 'Organize Your Files',
		time: '2 minutes',
		icon: FolderOpen,
		description: 'Create a logical folder structure for easy retrieval',
		actions: [
			'Create a main "Documents" folder if you don\'t have one',
			'Set up category folders (Clients, Projects, Personal, etc.)',
			'Use descriptive filenames: "ClientName_Contract_2026-01-05.pdf"',
			'Move split PDFs into appropriate folders',
		],
		tips: [
			'Include dates in filename format: YYYY-MM-DD for easy sorting',
			'Keep folder depth shallow (max 3-4 levels)',
		],
	},
	{
		step: 3,
		title: 'Share Efficiently',
		time: '2 minutes',
		icon: Share2,
		description: 'Get your documents to the right people quickly',
		actions: [
			'Choose the right sharing method for your needs',
			'Compress large files if needed (use DocSlicer)',
			'Send via email, cloud storage, or secure file transfer',
			'Confirm recipient received and can open the file',
		],
		tips: [
			'Email limits: Most services cap at 25MB',
			'Use cloud links for files over 10MB',
			'Always test important files before sharing',
		],
	},
];

const namingConventions = [
	{
		type: 'Business Documents',
		format: 'ClientName_DocumentType_Date.pdf',
		example: 'AcmeCorp_Invoice_2026-01-05.pdf',
	},
	{
		type: 'Personal Records',
		format: 'Category_Description_Date.pdf',
		example: 'Medical_LabResults_2026-01-05.pdf',
	},
	{
		type: 'Projects',
		format: 'ProjectName_DocumentType_Version.pdf',
		example: 'Website_Proposal_v2.pdf',
	},
	{
		type: 'Receipts',
		format: 'Date_Vendor_Amount.pdf',
		example: '2026-01-05_AmazonOrder_149.99.pdf',
	},
];

const timeComparison = [
	{
		task: 'Find a specific contract',
		disorganized: '10-15 minutes searching',
		organized: '30 seconds',
		timeSaved: '90%',
	},
	{
		task: 'Extract pages from multiple PDFs',
		disorganized: '5 minutes per file',
		organized: '1 minute per file',
		timeSaved: '80%',
	},
	{
		task: 'Share documents with team',
		disorganized: '3-5 minutes per person',
		organized: '1 minute (batch share)',
		timeSaved: '70%',
	},
	{
		task: 'Prepare documents for meeting',
		disorganized: '20 minutes scrambling',
		organized: '5 minutes ready',
		timeSaved: '75%',
	},
];

export default function BlogPostPage() {
	return (
		<BlogLayout post={postData}>
			{/* Introduction */}
			<div className='prose-lg'>
				<p className='text-xl text-gray-700 dark:text-gray-300 leading-relaxed'>
					You're drowning in PDFs. Client contracts, invoices,
					reports, receipts—they're everywhere and nowhere at the
					same time. When you need that one document,{' '}
					<strong>you waste 15 minutes searching.</strong>
				</p>

				<p>
					What if you could split, organize, and share any PDF in
					under 5 minutes? Not only is it possible, but once you have
					this workflow down, you'll wonder how you ever worked
					without it.
				</p>

				<p>
					This tutorial will walk you through the exact process
					thousands of professionals use daily to stay organized and
					productive. Let's get started.
				</p>
			</div>

			{/* The Problem */}
			<section className='my-12'>
				<div className='bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-6 rounded-r-lg'>
					<h2 className='text-2xl font-bold text-red-900 dark:text-red-100 mb-4'>
						The Cost of Disorganization
					</h2>
					<p className='text-red-800 dark:text-red-200 mb-4'>
						A disorganized PDF workflow costs you:
					</p>
					<ul className='space-y-2'>
						<li className='flex items-start gap-2 text-red-800 dark:text-red-200'>
							<Clock className='h-5 w-5 mt-1 flex-shrink-0' />
							<span>
								<strong>2-3 hours per week</strong> searching
								for files
							</span>
						</li>
						<li className='flex items-start gap-2 text-red-800 dark:text-red-200'>
							<Clock className='h-5 w-5 mt-1 flex-shrink-0' />
							<span>
								<strong>Professional credibility</strong> when
								you can't find documents in meetings
							</span>
						</li>
						<li className='flex items-start gap-2 text-red-800 dark:text-red-200'>
							<Clock className='h-5 w-5 mt-1 flex-shrink-0' />
							<span>
								<strong>Missed opportunities</strong> from slow
								response times
							</span>
						</li>
					</ul>
				</div>
			</section>

			{/* The 5-Minute Workflow */}
			<section className='my-12'>
				<h2 className='text-3xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-3'>
					<Zap className='h-8 w-8 text-yellow-600' />
					The 5-Minute Workflow
				</h2>

				<div className='space-y-8'>
					{workflowSteps.map((step, index) => (
						<div
							key={index}
							className='border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800'>
							{/* Step Header */}
							<div className='bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white'>
								<div className='flex items-center justify-between mb-2'>
									<div className='flex items-center gap-4'>
										<div className='flex items-center justify-center w-12 h-12 bg-white text-blue-600 rounded-full text-xl font-bold'>
											{step.step}
										</div>
										<div>
											<h3 className='text-2xl font-bold'>
												{step.title}
											</h3>
											<p className='text-blue-100'>
												{step.description}
											</p>
										</div>
									</div>
									<div className='flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg'>
										<Clock className='h-5 w-5' />
										<span className='font-bold'>
											{step.time}
										</span>
									</div>
								</div>
							</div>

							{/* Step Content */}
							<div className='p-6'>
								<div className='mb-6'>
									<h4 className='font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2'>
										<CheckCircle2 className='h-5 w-5 text-green-600' />
										Action Steps:
									</h4>
									<ol className='space-y-2'>
										{step.actions.map((action, i) => (
											<li
												key={i}
												className='flex items-start gap-3'>
												<span className='flex items-center justify-center w-6 h-6 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-full text-sm font-bold flex-shrink-0'>
													{i + 1}
												</span>
												<span className='text-gray-700 dark:text-gray-300 pt-0.5'>
													{action}
												</span>
											</li>
										))}
									</ol>
								</div>

								<div className='bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4'>
									<h4 className='font-bold text-yellow-900 dark:text-yellow-100 mb-2 flex items-center gap-2'>
										<Lightbulb className='h-5 w-5' />
										Pro Tips:
									</h4>
									<ul className='space-y-1'>
										{step.tips.map((tip, i) => (
											<li
												key={i}
												className='text-sm text-yellow-800 dark:text-yellow-200 flex items-start gap-2'>
												<ArrowRight className='h-4 w-4 mt-0.5 flex-shrink-0' />
												{tip}
											</li>
										))}
									</ul>
								</div>
							</div>
						</div>
					))}
				</div>
			</section>

			{/* Naming Conventions */}
			<section className='my-12'>
				<h2 className='text-3xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-3'>
					<FileText className='h-8 w-8 text-green-600' />
					Smart File Naming Conventions
				</h2>

				<p className='text-gray-700 dark:text-gray-300 mb-6'>
					Good filenames make or break your organization system. Here
					are proven naming conventions for different document types:
				</p>

				<div className='grid md:grid-cols-2 gap-4'>
					{namingConventions.map((convention, index) => (
						<div
							key={index}
							className='border border-gray-200 dark:border-gray-700 rounded-lg p-5 bg-white dark:bg-gray-800'>
							<h3 className='font-bold text-gray-900 dark:text-white mb-3'>
								{convention.type}
							</h3>
							<div className='bg-gray-50 dark:bg-gray-900/50 rounded p-3 mb-2'>
								<p className='text-sm text-gray-600 dark:text-gray-400 mb-1'>
									Format:
								</p>
								<code className='text-sm font-mono text-blue-600 dark:text-blue-400'>
									{convention.format}
								</code>
							</div>
							<div className='bg-green-50 dark:bg-green-900/20 rounded p-3'>
								<p className='text-sm text-gray-600 dark:text-gray-400 mb-1'>
									Example:
								</p>
								<code className='text-sm font-mono text-green-600 dark:text-green-400'>
									{convention.example}
								</code>
							</div>
						</div>
					))}
				</div>

				<div className='mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-5'>
					<h4 className='font-bold text-blue-900 dark:text-blue-100 mb-3'>
						Universal Naming Rules:
					</h4>
					<ul className='space-y-2'>
						<li className='flex items-start gap-2 text-blue-800 dark:text-blue-200'>
							<CheckCircle2 className='h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0' />
							<span>
								<strong>Use dates:</strong> Format as YYYY-MM-DD
								for automatic sorting
							</span>
						</li>
						<li className='flex items-start gap-2 text-blue-800 dark:text-blue-200'>
							<CheckCircle2 className='h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0' />
							<span>
								<strong>No spaces:</strong> Use underscores (_)
								or hyphens (-) instead
							</span>
						</li>
						<li className='flex items-start gap-2 text-blue-800 dark:text-blue-200'>
							<CheckCircle2 className='h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0' />
							<span>
								<strong>Be consistent:</strong> Pick a format
								and stick with it
							</span>
						</li>
						<li className='flex items-start gap-2 text-blue-800 dark:text-blue-200'>
							<CheckCircle2 className='h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0' />
							<span>
								<strong>Keep it short:</strong> Under 50
								characters when possible
							</span>
						</li>
					</ul>
				</div>
			</section>

			{/* Time Saved Comparison */}
			<section className='my-12'>
				<h2 className='text-3xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-3'>
					<TrendingUp className='h-8 w-8 text-purple-600' />
					Time Saved: Before vs After
				</h2>

				<p className='text-gray-700 dark:text-gray-300 mb-6'>
					Here's what you'll save with this organized workflow:
				</p>

				<div className='overflow-x-auto'>
					<table className='min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg'>
						<thead className='bg-gray-50 dark:bg-gray-900'>
							<tr>
								<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider'>
									Task
								</th>
								<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider'>
									Disorganized
								</th>
								<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider'>
									With This Workflow
								</th>
								<th className='px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider'>
									Time Saved
								</th>
							</tr>
						</thead>
						<tbody className='divide-y divide-gray-200 dark:divide-gray-700'>
							{timeComparison.map((item, index) => (
								<tr key={index}>
									<td className='px-6 py-4 font-medium text-gray-900 dark:text-white'>
										{item.task}
									</td>
									<td className='px-6 py-4 text-red-600 dark:text-red-400'>
										{item.disorganized}
									</td>
									<td className='px-6 py-4 text-green-600 dark:text-green-400 font-medium'>
										{item.organized}
									</td>
									<td className='px-6 py-4 text-center'>
										<span className='px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 rounded-full text-sm font-bold'>
											{item.timeSaved}
										</span>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				<div className='mt-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 text-center'>
					<p className='text-2xl font-bold text-gray-900 dark:text-white mb-2'>
						Total Time Saved: 2-3 Hours Per Week
					</p>
					<p className='text-gray-700 dark:text-gray-300'>
						That's <strong>100-150 hours per year</strong> you can
						spend on actual work instead of searching for files.
					</p>
				</div>
			</section>

			{/* Quick Reference Guide */}
			<section className='my-12'>
				<h2 className='text-3xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-3'>
					<Target className='h-8 w-8 text-red-600' />
					Quick Reference Checklist
				</h2>

				<div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6'>
					<p className='text-gray-700 dark:text-gray-300 mb-6'>
						Bookmark this page and refer to this checklist until the
						workflow becomes second nature:
					</p>

					<div className='grid md:grid-cols-2 gap-6'>
						<div>
							<h3 className='font-bold text-gray-900 dark:text-white mb-4'>
								Daily Tasks:
							</h3>
							<ul className='space-y-2'>
								<li className='flex items-start gap-2'>
									<CheckCircle2 className='h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0' />
									<span className='text-gray-700 dark:text-gray-300'>
										Split new PDFs as soon as you receive
										them
									</span>
								</li>
								<li className='flex items-start gap-2'>
									<CheckCircle2 className='h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0' />
									<span className='text-gray-700 dark:text-gray-300'>
										Rename files immediately using your
										convention
									</span>
								</li>
								<li className='flex items-start gap-2'>
									<CheckCircle2 className='h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0' />
									<span className='text-gray-700 dark:text-gray-300'>
										File documents in correct folders right
										away
									</span>
								</li>
								<li className='flex items-start gap-2'>
									<CheckCircle2 className='h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0' />
									<span className='text-gray-700 dark:text-gray-300'>
										Delete or archive documents you no
										longer need
									</span>
								</li>
							</ul>
						</div>

						<div>
							<h3 className='font-bold text-gray-900 dark:text-white mb-4'>
								Weekly Maintenance:
							</h3>
							<ul className='space-y-2'>
								<li className='flex items-start gap-2'>
									<CheckCircle2 className='h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0' />
									<span className='text-gray-700 dark:text-gray-300'>
										Review Downloads folder and organize
										stragglers
									</span>
								</li>
								<li className='flex items-start gap-2'>
									<CheckCircle2 className='h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0' />
									<span className='text-gray-700 dark:text-gray-300'>
										Archive completed projects to separate
										folder
									</span>
								</li>
								<li className='flex items-start gap-2'>
									<CheckCircle2 className='h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0' />
									<span className='text-gray-700 dark:text-gray-300'>
										Backup important documents to cloud or
										external drive
									</span>
								</li>
								<li className='flex items-start gap-2'>
									<CheckCircle2 className='h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0' />
									<span className='text-gray-700 dark:text-gray-300'>
										Clean up duplicate files
									</span>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</section>

			{/* Conclusion */}
			<section className='my-12'>
				<h2 className='text-3xl font-bold mb-6 text-gray-900 dark:text-white'>
					Start Your 5-Minute Workflow Today
				</h2>

				<div className='bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6'>
					<p className='text-lg text-gray-800 dark:text-gray-200 mb-4'>
						This workflow takes 5 minutes to execute and about a
						week to become automatic. Once it's a habit,{' '}
						<strong>
							you'll never waste time searching for documents
							again.
						</strong>
					</p>

					<p className='text-lg text-gray-800 dark:text-gray-200'>
						The key is consistency. Do it right every time, even
						when you're busy. Your future self will thank you when
						you find that critical document in 30 seconds instead of
						30 minutes.
					</p>
				</div>
			</section>

			{/* CTA */}
			<section className='my-12'>
				<div className='bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-center text-white'>
					<Zap className='h-12 w-12 mx-auto mb-4' />
					<h2 className='text-2xl font-bold mb-4'>
						Ready to Try This Workflow?
					</h2>
					<p className='text-blue-100 mb-6 max-w-2xl mx-auto'>
						Start with DocSlicer—the fast, free PDF splitter that
						makes Step 1 take just 1 minute. No installation, no
						uploads, no hassle.
					</p>
					<Link
						href='/'
						className='inline-block px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-colors shadow-lg'>
						Split Your First PDF Now →
					</Link>
					<p className='text-blue-100 text-sm mt-4'>
						Free forever • Works in your browser • Start organizing
						in 60 seconds
					</p>
				</div>
			</section>
		</BlogLayout>
	);
}
