import { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';
import {
	Calendar,
	Clock,
	ArrowRight,
	BookOpen,
	FileText,
	Shield,
	Zap,
} from 'lucide-react';

export const metadata: Metadata = {
	title: 'PDF Guides & Tutorials',
	description:
		'Learn how to split, merge, and manage PDF documents. Free guides and tutorials for handling PDFs on any device.',
	keywords: [
		'PDF guide',
		'split PDF tutorial',
		'how to split PDF',
		'PDF tips',
		'PDF help',
		'document management',
	],
	openGraph: {
		title: 'PDF Guides & Tutorials | PDF Slicer',
		description:
			'Learn how to split, merge, and manage PDF documents. Free guides and tutorials.',
		url: 'https://www.docslicer.com/blog',
	},
	alternates: {
		canonical: 'https://www.docslicer.com/blog',
	},
};

// Blog posts data - easily extensible for future posts
const blogPosts = [
	{
		slug: 'best-pdf-tools-privacy-security',
		title: 'Best PDF Tools for Privacy & Security (2026)',
		description:
			'Protect your sensitive documents with secure PDF tools. Learn which tools keep your files private and which ones expose your data to third parties.',
		date: '2026-01-05',
		readTime: '10 min read',
		category: 'Security',
		icon: Shield,
		featured: true,
		tags: ['pdf security', 'privacy', 'document security', 'data protection'],
	},
	{
		slug: 'pdf-compression-reduce-file-size',
		title: 'PDF Compression: Reduce File Size Without Quality Loss',
		description:
			'Make your PDFs smaller while keeping them crisp. Learn the best compression methods, understand quality vs. size trade-offs, and discover tools that work.',
		date: '2026-01-05',
		readTime: '9 min read',
		category: 'Tutorials',
		icon: Zap,
		featured: false,
		tags: ['pdf compression', 'reduce pdf size', 'compress pdf', 'optimize pdf'],
	},
	{
		slug: 'why-convert-to-pdf-before-splitting',
		title: 'Why You Can\'t Split EPUBs Like PDFs (And What to Do Instead)',
		description:
			'EPUBs and other document formats can\'t be split like PDFs due to their fundamentally different structure. Learn why conversion to PDF is necessary and how to do it properly.',
		date: '2026-01-05',
		readTime: '7 min read',
		category: 'Tutorials',
		icon: FileText,
		featured: false,
		tags: ['epub', 'convert to pdf', 'file formats'],
	},
	{
		slug: 'how-to-merge-multiple-pdfs',
		title: 'How to Merge Multiple PDFs into One (Complete Guide 2026)',
		description:
			'Combine several PDF documents into a single file on Windows, Mac, or Linux. Learn the best methods, tools, and tips for merging PDFs quickly and securely.',
		date: '2026-01-05',
		readTime: '7 min read',
		category: 'Tutorials',
		icon: FileText,
		featured: false,
		tags: ['merge pdf', 'combine pdf', 'join pdf', 'tutorial'],
	},
	{
		slug: 'how-to-split-pdf-on-computer',
		title: 'How to Split a PDF on Your Computer (Complete Guide 2026)',
		description:
			'Learn every method to split PDFs on Windows, Mac, and Linux — from built-in tools to online options. Plus, discover the easiest way to do it in seconds.',
		date: '2026-01-05',
		readTime: '8 min read',
		category: 'Tutorials',
		icon: FileText,
		featured: false,
		tags: ['split pdf', 'windows', 'mac', 'tutorial'],
	},
];

// Upcoming topics for SEO and user engagement
const upcomingTopics = [
	{
		title: 'How to Extract Pages from a PDF',
		icon: FileText,
		description: 'Pull specific pages out of PDFs without splitting the whole file.',
	},
	{
		title: 'How to Convert PDFs to Other Formats',
		icon: FileText,
		description: 'Transform PDFs into Word, Excel, images, and more.',
	},
];

export default function BlogIndex() {
	return (
		<div className='min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-indigo-50/30 dark:from-gray-900 dark:via-blue-950/20 dark:to-indigo-950/30'>
			<Header />

			<main className='container mx-auto px-4 py-12'>
				{/* Hero Section */}
				<div className='text-center mb-16'>
					<div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-sm font-medium mb-6'>
						<BookOpen className='h-4 w-4' />
						Free PDF Guides & Tutorials
					</div>
					<h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6'>
						Master Your{' '}
						<span className='bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>
							PDF Documents
						</span>
					</h1>
					<p className='text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto'>
						Step-by-step guides to help you split, merge, compress,
						and manage PDFs like a pro. No technical skills
						required.
					</p>
				</div>

				{/* Featured Post */}
				{blogPosts.filter((p) => p.featured).length > 0 && (
					<section className='mb-16'>
						<h2 className='text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide mb-6'>
							Featured Guide
						</h2>
						{blogPosts
							.filter((p) => p.featured)
							.map((post) => {
								const IconComponent = post.icon;
								return (
									<Link
										key={post.slug}
										href={`/blog/${post.slug}`}
										className='group block'>
										<article className='relative p-8 md:p-12 bg-gradient-to-br from-white to-blue-50/50 dark:from-gray-800 dark:to-blue-900/20 rounded-3xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all hover:shadow-2xl overflow-hidden'>
											{/* Background decoration */}
											<div className='absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2' />

											<div className='relative'>
												<div className='flex items-center gap-3 mb-4'>
													<div className='p-2.5 bg-blue-100 dark:bg-blue-900/50 rounded-xl'>
														<IconComponent className='h-6 w-6 text-blue-600 dark:text-blue-400' />
													</div>
													<span className='text-sm font-medium text-blue-600 dark:text-blue-400'>
														{post.category}
													</span>
												</div>

												<h3 className='text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors'>
													{post.title}
												</h3>

												<p className='text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-3xl'>
													{post.description}
												</p>

												<div className='flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400'>
													<div className='flex items-center gap-1.5'>
														<Calendar className='h-4 w-4' />
														<time
															dateTime={
																post.date
															}>
															{new Date(
																post.date
															).toLocaleDateString(
																'en-US',
																{
																	year: 'numeric',
																	month: 'long',
																	day: 'numeric',
																}
															)}
														</time>
													</div>
													<div className='flex items-center gap-1.5'>
														<Clock className='h-4 w-4' />
														<span>
															{post.readTime}
														</span>
													</div>
													<span className='ml-auto text-blue-600 dark:text-blue-400 font-medium flex items-center gap-1 group-hover:gap-2 transition-all'>
														Read guide{' '}
														<ArrowRight className='h-4 w-4' />
													</span>
												</div>
											</div>
										</article>
									</Link>
								);
							})}
					</section>
				)}

				{/* All Posts */}
				<section className='mb-16'>
					<h2 className='text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-6'>
						All Guides
					</h2>
					<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
						{blogPosts.map((post) => {
							const IconComponent = post.icon;
							return (
								<Link
									key={post.slug}
									href={`/blog/${post.slug}`}
									className='group'>
									<article className='h-full p-6 bg-white dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all hover:shadow-xl'>
										<div className='flex items-center gap-3 mb-4'>
											<div className='p-2 bg-gray-100 dark:bg-gray-700 rounded-lg group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-colors'>
												<IconComponent className='h-5 w-5 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors' />
											</div>
											<span className='text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide'>
												{post.category}
											</span>
										</div>

										<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2'>
											{post.title}
										</h3>

										<p className='text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2'>
											{post.description}
										</p>

										<div className='flex items-center gap-3 text-xs text-gray-500 dark:text-gray-500'>
											<span>{post.readTime}</span>
											<span>•</span>
											<time dateTime={post.date}>
												{new Date(
													post.date
												).toLocaleDateString('en-US', {
													month: 'short',
													day: 'numeric',
												})}
											</time>
										</div>
									</article>
								</Link>
							);
						})}
					</div>
				</section>

				{/* Coming Soon Section */}
				<section className='mb-16'>
					<h2 className='text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-6'>
						Coming Soon
					</h2>
					<div className='grid md:grid-cols-3 gap-6'>
						{upcomingTopics.map((topic) => {
							const IconComponent = topic.icon;
							return (
								<div
									key={topic.title}
									className='p-6 bg-gray-50 dark:bg-gray-800/30 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700'>
									<div className='p-2 bg-gray-200 dark:bg-gray-700 rounded-lg w-fit mb-4'>
										<IconComponent className='h-5 w-5 text-gray-500 dark:text-gray-400' />
									</div>
									<h3 className='text-base font-semibold text-gray-700 dark:text-gray-300 mb-2'>
										{topic.title}
									</h3>
									<p className='text-sm text-gray-500 dark:text-gray-500'>
										{topic.description}
									</p>
								</div>
							);
						})}
					</div>
				</section>

				{/* CTA */}
				<section className='text-center p-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl shadow-xl'>
					<h2 className='text-3xl font-bold text-white mb-4'>
						Ready to Split Your PDF?
					</h2>
					<p className='text-blue-100 mb-8 text-lg max-w-xl mx-auto'>
						Skip the complicated tutorials. Just open your file, select
						pages, and download. It takes less than 30 seconds.
					</p>
					<Link
						href='/'
						className='inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-colors shadow-lg'>
						Try PDF Slicer Free →
					</Link>
				</section>
			</main>

			<Footer />
		</div>
	);
}
