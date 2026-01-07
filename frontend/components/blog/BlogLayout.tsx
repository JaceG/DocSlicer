'use client';

import Link from 'next/link';
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';
import { Calendar, Clock, ArrowLeft, Share2, BookOpen } from 'lucide-react';

export interface BlogPost {
	slug: string;
	title: string;
	description: string;
	date: string;
	readTime: string;
	category: string;
	author: string;
	tags: string[];
	featured?: boolean;
	// Optional CTA customization
	toolSlug?: string; // e.g., 'split', 'merge', 'compress' - links to /[toolSlug]
	ctaTitle?: string;
	ctaDescription?: string;
}

interface BlogLayoutProps {
	children: React.ReactNode;
	post: BlogPost;
	hideCta?: boolean; // Hide the default CTA if the post has its own
}

export function BlogLayout({ children, post, hideCta = false }: BlogLayoutProps) {
	// Determine CTA link based on toolSlug or default to home
	const ctaLink = post.toolSlug ? `/${post.toolSlug}` : '/';
	const ctaTitle = post.ctaTitle || 'Ready to Get Started?';
	const ctaDescription = post.ctaDescription || 
		'No software to install. No complicated steps. Just open your file, select what you need, and download. 100% free and private — your files never leave your device.';
	const handleShare = async () => {
		if (navigator.share) {
			try {
				await navigator.share({
					title: post.title,
					text: post.description,
					url: window.location.href,
				});
			} catch (err) {
				// User cancelled or error
			}
		} else {
			// Fallback: copy to clipboard
			await navigator.clipboard.writeText(window.location.href);
			alert('Link copied to clipboard!');
		}
	};

	return (
		<div className='min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-indigo-50/30 dark:from-gray-900 dark:via-blue-950/20 dark:to-indigo-950/30'>
			<Header />

			<article className='container mx-auto px-4 py-8 max-w-4xl'>
				{/* Breadcrumb */}
				<nav className='mb-8'>
					<Link
						href='/blog'
						className='inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors group'
					>
						<ArrowLeft className='h-4 w-4 group-hover:-translate-x-1 transition-transform' />
						<span>Back to all guides</span>
					</Link>
				</nav>

				{/* Article Header */}
				<header className='mb-12'>
					{/* Category Badge */}
					<div className='mb-4'>
						<span className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'>
							<BookOpen className='h-3.5 w-3.5' />
							{post.category}
						</span>
					</div>

					{/* Title */}
					<h1 className='text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight'>
						{post.title}
					</h1>

					{/* Description */}
					<p className='text-xl text-gray-600 dark:text-gray-300 mb-6 leading-relaxed'>
						{post.description}
					</p>

					{/* Meta */}
					<div className='flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400'>
						<div className='flex items-center gap-1.5'>
							<Calendar className='h-4 w-4' />
							<time dateTime={post.date}>
								{new Date(post.date).toLocaleDateString('en-US', {
									year: 'numeric',
									month: 'long',
									day: 'numeric',
								})}
							</time>
						</div>
						<div className='flex items-center gap-1.5'>
							<Clock className='h-4 w-4' />
							<span>{post.readTime}</span>
						</div>
						<button
							onClick={handleShare}
							className='flex items-center gap-1.5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors ml-auto'
						>
							<Share2 className='h-4 w-4' />
							<span>Share</span>
						</button>
					</div>

					{/* Tags */}
					<div className='flex flex-wrap gap-2 mt-6'>
						{post.tags.map((tag) => (
							<span
								key={tag}
								className='px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300'
							>
								#{tag}
							</span>
						))}
					</div>
				</header>

				{/* Article Content */}
				<div className='prose prose-lg prose-gray dark:prose-invert max-w-none prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-pre:bg-gray-900 dark:prose-pre:bg-gray-950 prose-img:rounded-xl prose-img:shadow-lg [&_h2]:!text-3xl [&_h2]:!mt-12 [&_h2]:!mb-6 [&_h3]:!text-2xl [&_h3]:!mt-8 [&_h3]:!mb-4'>
					{children}
				</div>

				{/* CTA Section */}
				{!hideCta && (
					<div className='mt-16 p-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-xl'>
						<div className='text-center'>
							<h2 className='text-2xl md:text-3xl font-bold text-white mb-4'>
								{ctaTitle}
							</h2>
							<p className='text-blue-100 mb-6 text-lg max-w-2xl mx-auto'>
								{ctaDescription}
							</p>
							<div className='flex flex-col sm:flex-row gap-4 justify-center'>
								<Link
									href={ctaLink}
									className='inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-colors shadow-lg'
								>
									Try PDF Wonder Kit Free →
								</Link>
								<Link
									href='/pricing'
									className='inline-flex items-center justify-center px-8 py-4 bg-blue-500/30 text-white font-medium rounded-xl hover:bg-blue-500/40 transition-colors border border-white/20'
								>
									View Pricing
								</Link>
							</div>
						</div>
					</div>
				)}

				{/* Related Articles (placeholder for future) */}
				<div className='mt-16'>
					<h3 className='text-2xl font-bold text-gray-900 dark:text-white mb-6'>
						More Helpful Guides
					</h3>
					<div className='grid md:grid-cols-2 gap-6'>
						<Link
							href='/blog'
							className='group p-6 bg-white dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all hover:shadow-lg'
						>
							<span className='text-sm text-blue-600 dark:text-blue-400 font-medium'>
								Coming Soon
							</span>
							<h4 className='text-lg font-semibold text-gray-900 dark:text-white mt-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors'>
								How to Merge Multiple PDFs into One
							</h4>
							<p className='text-gray-600 dark:text-gray-400 mt-2 text-sm'>
								Combine several PDF files into a single document...
							</p>
						</Link>
						<Link
							href='/blog'
							className='group p-6 bg-white dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all hover:shadow-lg'
						>
							<span className='text-sm text-blue-600 dark:text-blue-400 font-medium'>
								Coming Soon
							</span>
							<h4 className='text-lg font-semibold text-gray-900 dark:text-white mt-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors'>
								Best PDF Tools for Privacy-Conscious Users
							</h4>
							<p className='text-gray-600 dark:text-gray-400 mt-2 text-sm'>
								Protect your sensitive documents with these secure options...
							</p>
						</Link>
					</div>
				</div>
			</article>

			<Footer />
		</div>
	);
}
