import { Metadata } from 'next';
import Link from 'next/link';
import { BlogLayout, BlogPost } from '@/components/blog/BlogLayout';
import {
	FileCode,
	CheckCircle2,
	Zap,
	Shield,
	Search,
	User,
	Calendar,
	Tag,
} from 'lucide-react';

const postData: BlogPost = {
	slug: 'edit-pdf-metadata',
	title: 'How to Edit PDF Metadata (Title, Author, Keywords)',
	description:
		'Change PDF properties like title, author, subject, and keywords. Essential for SEO, organization, and professional presentation. Free and completely private.',
	date: '2026-01-06',
	readTime: '7 min read',
	category: 'Technical',
	author: 'PDF Wonder Kit Team',
	tags: [
		'edit-pdf-metadata',
		'change-pdf-properties',
		'pdf-info',
		'pdf-title',
	],
	featured: true,
	toolSlug: 'metadata',
	ctaTitle: 'Ready to Edit PDF Metadata?',
	ctaDescription:
		'Update PDF properties and metadata in seconds. Change title, author, keywords, and more. 100% private — your files never leave your device.',
};

export const metadata: Metadata = {
	title: postData.title,
	description: postData.description,
	keywords: [
		'edit PDF metadata',
		'change PDF properties',
		'PDF info',
		'PDF title',
		'PDF author',
		'PDF keywords',
		'edit PDF tags',
		'PDF document properties',
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

export default function EditPDFMetadataPost() {
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
							PDF metadata is hidden information like title,
							author, subject, and keywords. Editing metadata
							improves SEO, organizes document libraries, and
							ensures professional presentation. Upload your PDF,
							update fields, and download with new metadata.
						</p>
						<Link
							href='/metadata'
							className='inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors'>
							Edit Metadata Free →
						</Link>
					</div>
				</div>
			</div>

			<p className='text-xl text-gray-700 dark:text-gray-300 leading-relaxed'>
				PDFs carry hidden metadata — title, author, creation date,
				keywords. This information appears in search results, file
				properties, and document management systems. Incorrect or
				missing metadata looks unprofessional and hurts discoverability.
			</p>

			<h2>What Is PDF Metadata?</h2>

			<div className='not-prose bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-xl p-6 my-8'>
				<h3 className='text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3'>
					Standard PDF Metadata Fields
				</h3>
				<div className='grid md:grid-cols-2 gap-4'>
					<div className='bg-white dark:bg-gray-800 p-4 rounded-lg'>
						<div className='flex items-center gap-2 mb-2'>
							<FileCode className='h-4 w-4 text-blue-600' />
							<strong className='text-gray-900 dark:text-white'>
								Title
							</strong>
						</div>
						<p className='text-sm text-gray-600 dark:text-gray-400'>
							Document title (appears in browser tabs, search
							results)
						</p>
					</div>
					<div className='bg-white dark:bg-gray-800 p-4 rounded-lg'>
						<div className='flex items-center gap-2 mb-2'>
							<User className='h-4 w-4 text-blue-600' />
							<strong className='text-gray-900 dark:text-white'>
								Author
							</strong>
						</div>
						<p className='text-sm text-gray-600 dark:text-gray-400'>
							Creator name or company name
						</p>
					</div>
					<div className='bg-white dark:bg-gray-800 p-4 rounded-lg'>
						<div className='flex items-center gap-2 mb-2'>
							<FileCode className='h-4 w-4 text-blue-600' />
							<strong className='text-gray-900 dark:text-white'>
								Subject
							</strong>
						</div>
						<p className='text-sm text-gray-600 dark:text-gray-400'>
							Brief description of document content
						</p>
					</div>
					<div className='bg-white dark:bg-gray-800 p-4 rounded-lg'>
						<div className='flex items-center gap-2 mb-2'>
							<Tag className='h-4 w-4 text-blue-600' />
							<strong className='text-gray-900 dark:text-white'>
								Keywords
							</strong>
						</div>
						<p className='text-sm text-gray-600 dark:text-gray-400'>
							Search terms for findability (SEO)
						</p>
					</div>
					<div className='bg-white dark:bg-gray-800 p-4 rounded-lg'>
						<div className='flex items-center gap-2 mb-2'>
							<Calendar className='h-4 w-4 text-blue-600' />
							<strong className='text-gray-900 dark:text-white'>
								Creation/Mod Date
							</strong>
						</div>
						<p className='text-sm text-gray-600 dark:text-gray-400'>
							When file was created/last modified
						</p>
					</div>
					<div className='bg-white dark:bg-gray-800 p-4 rounded-lg'>
						<div className='flex items-center gap-2 mb-2'>
							<FileCode className='h-4 w-4 text-blue-600' />
							<strong className='text-gray-900 dark:text-white'>
								Creator/Producer
							</strong>
						</div>
						<p className='text-sm text-gray-600 dark:text-gray-400'>
							Software used to create/convert PDF
						</p>
					</div>
				</div>
			</div>

			<h2>Why Edit PDF Metadata?</h2>

			<div className='not-prose space-y-4 my-8'>
				<div className='flex items-start gap-3 bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800'>
					<Search className='h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5' />
					<div>
						<h3 className='font-semibold text-gray-900 dark:text-white mb-1'>
							SEO Benefits
						</h3>
						<p className='text-sm text-gray-600 dark:text-gray-400 mb-0'>
							Search engines index PDF metadata. Good keywords and
							titles help your PDFs rank higher in Google search
							results for relevant queries.
						</p>
					</div>
				</div>

				<div className='flex items-start gap-3 bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800'>
					<CheckCircle2 className='h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5' />
					<div>
						<h3 className='font-semibold text-gray-900 dark:text-white mb-1'>
							Professional Appearance
						</h3>
						<p className='text-sm text-gray-600 dark:text-gray-400 mb-0'>
							Proper metadata shows attention to detail.
							"Untitled.pdf" created by "User" looks amateurish
							compared to well-labeled documents with company
							attribution.
						</p>
					</div>
				</div>

				<div className='flex items-start gap-3 bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800'>
					<FileCode className='h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5' />
					<div>
						<h3 className='font-semibold text-gray-900 dark:text-white mb-1'>
							Document Management
						</h3>
						<p className='text-sm text-gray-600 dark:text-gray-400 mb-0'>
							Companies with hundreds of PDFs use metadata for
							organization. Searchable fields, consistent author
							names, and keywords enable efficient document
							retrieval.
						</p>
					</div>
				</div>

				<div className='flex items-start gap-3 bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800'>
					<Shield className='h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5' />
					<div>
						<h3 className='font-semibold text-gray-900 dark:text-white mb-1'>
							Privacy Protection
						</h3>
						<p className='text-sm text-gray-600 dark:text-gray-400 mb-0'>
							Remove personal information before sharing. Metadata
							might contain your computer name, file paths, or
							editing history you don't want public.
						</p>
					</div>
				</div>
			</div>

			<h2>How to Edit PDF Metadata</h2>

			<div className='not-prose bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-8 rounded-2xl border-2 border-blue-200 dark:border-blue-800 mb-8'>
				<h3 className='text-xl font-bold text-gray-900 dark:text-white mb-6'>
					Using PDF Wonder Kit's Metadata Editor
				</h3>

				<div className='space-y-4'>
					<div className='flex items-start gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg'>
						<div className='flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-bold flex-shrink-0'>
							1
						</div>
						<div>
							<p className='font-semibold text-gray-900 dark:text-white mb-1'>
								Upload Your PDF
							</p>
							<p className='text-gray-700 dark:text-gray-300 text-sm'>
								Visit{' '}
								<Link
									href='/metadata'
									className='text-blue-600 hover:underline'>
									pdfwonderkit.com/metadata
								</Link>{' '}
								and upload. Current metadata displays
								automatically.
							</p>
						</div>
					</div>

					<div className='flex items-start gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg'>
						<div className='flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-bold flex-shrink-0'>
							2
						</div>
						<div>
							<p className='font-semibold text-gray-900 dark:text-white mb-1'>
								Edit Fields
							</p>
							<p className='text-gray-700 dark:text-gray-300 text-sm'>
								Update title, author, subject, keywords. Leave
								fields blank to remove values.
							</p>
						</div>
					</div>

					<div className='flex items-start gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg'>
						<div className='flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-bold flex-shrink-0'>
							3
						</div>
						<div>
							<p className='font-semibold text-gray-900 dark:text-white mb-1'>
								Apply and Download
							</p>
							<p className='text-gray-700 dark:text-gray-300 text-sm'>
								Save changes and download PDF with updated
								metadata. File content unchanged.
							</p>
						</div>
					</div>
				</div>
			</div>

			<h2>Best Practices for Metadata</h2>

			<div className='not-prose grid md:grid-cols-2 gap-6 my-8'>
				<div className='bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800'>
					<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-3'>
						Descriptive Titles
					</h3>
					<p className='text-sm text-gray-600 dark:text-gray-400 mb-3'>
						<strong>Bad:</strong> "Document1.pdf", "Untitled.pdf"
					</p>
					<p className='text-sm text-gray-600 dark:text-gray-400'>
						<strong>Good:</strong> "2026 Marketing Strategy Report",
						"Product User Manual v3.2"
					</p>
				</div>

				<div className='bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl border border-green-200 dark:border-green-800'>
					<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-3'>
						Consistent Author Names
					</h3>
					<p className='text-sm text-gray-600 dark:text-gray-400 mb-3'>
						Use same format across all documents: "Acme Corp" or
						"John Smith, Acme Corp"
					</p>
					<p className='text-sm text-gray-600 dark:text-gray-400'>
						Inconsistent author names make searching difficult.
					</p>
				</div>

				<div className='bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-xl border border-purple-200 dark:border-purple-800'>
					<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-3'>
						Strategic Keywords
					</h3>
					<p className='text-sm text-gray-600 dark:text-gray-400'>
						Include terms people search for. Example: "budget
						planning, financial forecast, quarterly projections,
						revenue analysis"
					</p>
				</div>

				<div className='bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-6 rounded-xl border border-amber-200 dark:border-amber-800'>
					<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-3'>
						Remove Sensitive Info
					</h3>
					<p className='text-sm text-gray-600 dark:text-gray-400'>
						Before sharing externally, check metadata for internal
						paths, usernames, or company-specific details you don't
						want public.
					</p>
				</div>
			</div>

			<h2>Common Use Cases</h2>

			<div className='not-prose space-y-4 my-8'>
				<div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6'>
					<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
						Website PDF SEO
					</h3>
					<p className='text-gray-600 dark:text-gray-400 text-sm mb-0'>
						You have whitepapers, ebooks, or guides on your website.
						Adding keywords and descriptive titles helps them rank
						in Google, driving organic traffic.
					</p>
				</div>

				<div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6'>
					<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
						Corporate Document Libraries
					</h3>
					<p className='text-gray-600 dark:text-gray-400 text-sm mb-0'>
						Large companies need consistent metadata for SharePoint
						or document management systems. Standardized fields
						enable powerful search and filtering.
					</p>
				</div>

				<div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6'>
					<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
						Academic Publishing
					</h3>
					<p className='text-gray-600 dark:text-gray-400 text-sm mb-0'>
						Research papers need proper author attribution,
						publication dates, and keywords for academic databases
						and citation tracking.
					</p>
				</div>
			</div>

			<h2>Frequently Asked Questions</h2>

			<div className='not-prose space-y-4 my-8'>
				<div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6'>
					<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
						Does editing metadata change the file content?
					</h3>
					<p className='text-gray-600 dark:text-gray-400 text-sm mb-0'>
						No! Metadata is separate from visible content. Changing
						title/author doesn't affect text, images, or layout.
						File size might increase slightly (a few KB).
					</p>
				</div>

				<div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6'>
					<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
						Can I completely remove all metadata?
					</h3>
					<p className='text-gray-600 dark:text-gray-400 text-sm mb-0'>
						Yes, leave all fields blank to strip metadata. Useful
						for privacy before sharing publicly. Note: creation date
						and PDF version info typically remain.
					</p>
				</div>

				<div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6'>
					<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
						How does PDF metadata affect SEO?
					</h3>
					<p className='text-gray-600 dark:text-gray-400 text-sm mb-0'>
						Google indexes PDF titles, subjects, and keywords.
						Well-optimized metadata helps PDFs rank for relevant
						searches, especially for technical docs, guides, and
						whitepapers.
					</p>
				</div>
			</div>

			<h2>Conclusion</h2>

			<p>
				PDF metadata is often overlooked but impacts discoverability,
				organization, and professionalism. Spending a few seconds to add
				proper titles, authors, and keywords makes documents easier to
				find and more credible.
			</p>

			<p className='text-lg font-semibold'>
				<strong>Quick Summary:</strong>
			</p>

			<ul>
				<li>
					✓ <strong>SEO benefits</strong> — better search rankings
				</li>
				<li>
					✓ <strong>Professional appearance</strong> — proper
					attribution
				</li>
				<li>
					✓ <strong>Easy organization</strong> — searchable fields
				</li>
				<li>
					✓ <strong>Privacy control</strong> — remove sensitive info
				</li>
				<li>
					✓ <strong>Free tools</strong> — no software needed
				</li>
			</ul>

			<div className='not-prose bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-8 my-8 text-center'>
				<h3 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
					Edit PDF Metadata Now
				</h3>
				<p className='text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto'>
					Update your PDF properties in seconds. Change title, author,
					keywords, and more. No signup required, completely private.
				</p>
				<Link
					href='/metadata'
					className='inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-lg'>
					Edit Metadata Free →
				</Link>
			</div>
		</BlogLayout>
	);
}
