import { Metadata } from 'next';
import Link from 'next/link';
import { BlogLayout, BlogPost } from '@/components/blog/BlogLayout';
import {
	BookOpen,
	CheckCircle2,
	Zap,
	Shield,
	AlertTriangle,
	GraduationCap,
	Book,
	FileText,
	Layers,
	Sparkles,
} from 'lucide-react';

const postData: BlogPost = {
	slug: 'split-pdf-by-bookmarks-chapters',
	title:
		'How to Split PDFs by Chapters Using Bookmarks (Auto-Split Guide)',
	description:
		'Automatically split large PDFs into chapters using bookmarks. Perfect for ebooks, textbooks, course materials, and long reports. Free and completely private.',
	date: '2026-01-06',
	readTime: '9 min read',
	category: 'Tutorials',
	author: 'PDF Wonder Kit Team',
	tags: [
		'split-pdf-by-bookmarks',
		'pdf-chapter-splitter',
		'split-by-toc',
		'auto-split-pdf',
	],
	featured: true,
	toolSlug: 'bookmark-split',
	ctaTitle: 'Ready to Split by Bookmarks?',
	ctaDescription:
		'Automatically split your PDF into chapters using bookmarks. Perfect for ebooks and textbooks. 100% private — your files never leave your device.',
};

export const metadata: Metadata = {
	title: postData.title,
	description: postData.description,
	keywords: [
		'split PDF by bookmarks',
		'PDF chapter splitter',
		'split by TOC',
		'split by table of contents',
		'auto split PDF',
		'split ebook chapters',
		'bookmark PDF splitter',
		'split PDF by outline',
		'divide PDF chapters',
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

const useCases = [
	{
		title: 'Ebooks & Novels',
		icon: Book,
		description:
			'Split purchased ebooks into individual chapters for easier reading on mobile devices or sharing excerpts.',
		examples: ['Fiction', 'Non-fiction', 'Technical books', 'Reference guides'],
	},
	{
		title: 'Textbooks & Course Materials',
		icon: GraduationCap,
		description:
			'Teachers and students can extract specific chapters for assignments without sharing entire textbooks.',
		examples: ['Course readings', 'Study guides', 'Chapter assignments', 'Exam prep'],
	},
	{
		title: 'Business Reports',
		icon: FileText,
		description:
			'Large reports with multiple sections can be split for distribution to different departments.',
		examples: ['Annual reports', 'Market research', 'Financial statements', 'Proposals'],
	},
	{
		title: 'Technical Documentation',
		icon: Layers,
		description:
			'Product manuals and technical docs can be divided into separate sections for easier navigation.',
		examples: ['User manuals', 'API docs', 'Installation guides', 'Troubleshooting'],
	},
];

export default function SplitPDFByBookmarksPost() {
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
							Splitting PDFs by bookmarks automatically creates separate files for
							each chapter based on the table of contents. Upload your PDF, the
							tool detects bookmarks, and you get individual chapter files in
							seconds. Works perfectly for ebooks, textbooks, and long reports.
						</p>
						<Link
							href='/bookmark-split'
							className='inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors'>
							Split by Bookmarks Free →
						</Link>
					</div>
				</div>
			</div>

			<p className='text-xl text-gray-700 dark:text-gray-300 leading-relaxed'>
				Manually splitting a 500-page PDF into chapters is painful. You'd need to
				find page numbers, extract ranges one by one, and rename each file.
				Bookmark-based splitting automates the entire process — just upload and
				get separate chapter files instantly.
			</p>

			<p>
				This guide covers everything about splitting PDFs by bookmarks: what
				bookmarks are, which files work with this method, step-by-step
				instructions, and common use cases for students, teachers, and
				professionals.
			</p>

			<h2>What Are PDF Bookmarks?</h2>

			<div className='not-prose bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-xl p-6 my-8'>
				<h3 className='text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3'>
					PDF Bookmarks = Built-in Table of Contents
				</h3>
				<p className='text-sm text-blue-800 dark:text-blue-200 mb-3'>
					PDF bookmarks (also called "outlines") are the clickable navigation
					links in the sidebar of most PDF readers. They're like a table of
					contents built into the PDF itself.
				</p>
				<p className='text-sm text-blue-800 dark:text-blue-200 mb-3'>
					<strong>How to check if your PDF has bookmarks:</strong>
				</p>
				<ul className='text-sm text-blue-800 dark:text-blue-200 space-y-1'>
					<li>
						• <strong>Adobe Acrobat:</strong> Look for the "Bookmarks" panel on
						the left sidebar
					</li>
					<li>
						• <strong>Preview (Mac):</strong> Click the sidebar icon — bookmarks
						appear as a hierarchy
					</li>
					<li>
						• <strong>Chrome/Edge:</strong> No visible bookmarks panel, but they
						exist in the background
					</li>
					<li>
						• <strong>If you see nothing:</strong> Your PDF doesn't have
						bookmarks — you'll need manual page splitting instead
					</li>
				</ul>
			</div>

			<h2>Why Split by Bookmarks vs. Manual Pages?</h2>

			<div className='not-prose grid md:grid-cols-2 gap-6 my-8'>
				<div className='bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6'>
					<h3 className='text-lg font-semibold text-green-900 dark:text-green-100 mb-3 flex items-center gap-2'>
						<Sparkles className='h-5 w-5' />
						Bookmark Splitting (Automatic)
					</h3>
					<div className='space-y-3'>
						<div>
							<h4 className='text-xs font-semibold text-green-900 dark:text-green-200 mb-2'>
								✓ Advantages
							</h4>
							<ul className='text-sm text-green-800 dark:text-green-300 space-y-1'>
								<li>• Fully automatic — one click</li>
								<li>• Files named by chapter titles</li>
								<li>• Perfect accuracy</li>
								<li>• Handles hundreds of chapters</li>
								<li>• Takes seconds, not hours</li>
							</ul>
						</div>
						<div>
							<h4 className='text-xs font-semibold text-green-900 dark:text-green-200 mb-2'>
								✗ Limitations
							</h4>
							<ul className='text-sm text-green-800 dark:text-green-300 space-y-1'>
								<li>• PDF must have bookmarks</li>
								<li>• Can't split within chapters</li>
							</ul>
						</div>
					</div>
				</div>

				<div className='bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-6'>
					<h3 className='text-lg font-semibold text-amber-900 dark:text-amber-100 mb-3 flex items-center gap-2'>
						<FileText className='h-5 w-5' />
						Manual Page Splitting
					</h3>
					<div className='space-y-3'>
						<div>
							<h4 className='text-xs font-semibold text-amber-900 dark:text-amber-200 mb-2'>
								✓ Advantages
							</h4>
							<ul className='text-sm text-amber-800 dark:text-amber-300 space-y-1'>
								<li>• Works on any PDF</li>
								<li>• Full control over ranges</li>
								<li>• Can split anywhere</li>
							</ul>
						</div>
						<div>
							<h4 className='text-xs font-semibold text-amber-900 dark:text-amber-200 mb-2'>
								✗ Limitations
							</h4>
							<ul className='text-sm text-amber-800 dark:text-amber-300 space-y-1'>
								<li>• Manual work for each chapter</li>
								<li>• Must find page numbers yourself</li>
								<li>• Need to manually name files</li>
								<li>• Time-consuming for long PDFs</li>
							</ul>
						</div>
					</div>
				</div>
			</div>

			<h2>How to Split PDFs by Bookmarks (Step by Step)</h2>

			<div className='not-prose bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-8 rounded-2xl border-2 border-blue-200 dark:border-blue-800 mb-8'>
				<h3 className='text-xl font-bold text-gray-900 dark:text-white mb-6'>
					Using PDF Wonder Kit's Bookmark Splitter
				</h3>

				<div className='space-y-4'>
					<div className='flex items-start gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg'>
						<div className='flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-bold flex-shrink-0'>
							1
						</div>
						<div>
							<p className='font-semibold text-gray-900 dark:text-white mb-1'>
								Open the Bookmark Split Tool
							</p>
							<p className='text-gray-700 dark:text-gray-300 text-sm'>
								Visit{' '}
								<Link
									href='/bookmark-split'
									className='text-blue-600 hover:underline'>
									pdfwonderkit.com/bookmark-split
								</Link>{' '}
								in any browser.
							</p>
						</div>
					</div>

					<div className='flex items-start gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg'>
						<div className='flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-bold flex-shrink-0'>
							2
						</div>
						<div>
							<p className='font-semibold text-gray-900 dark:text-white mb-1'>
								Upload Your PDF
							</p>
							<p className='text-gray-700 dark:text-gray-300 text-sm'>
								Drag and drop your file.{' '}
								<strong className='text-blue-600'>
									Your file stays on your device
								</strong>{' '}
								— all processing is local.
							</p>
						</div>
					</div>

					<div className='flex items-start gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg'>
						<div className='flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-bold flex-shrink-0'>
							3
						</div>
						<div>
							<p className='font-semibold text-gray-900 dark:text-white mb-1'>
								Review Detected Bookmarks
							</p>
							<p className='text-gray-700 dark:text-gray-300 text-sm'>
								The tool automatically detects all bookmarks and shows you a
								preview. You'll see chapter names and page ranges.
							</p>
						</div>
					</div>

					<div className='flex items-start gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg'>
						<div className='flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-bold flex-shrink-0'>
							4
						</div>
						<div>
							<p className='font-semibold text-gray-900 dark:text-white mb-1'>
								Select Bookmarks (Optional)
							</p>
							<p className='text-gray-700 dark:text-gray-300 text-sm'>
								Want all chapters? Leave everything selected. Only need specific
								chapters? Uncheck the ones you don't want.
							</p>
						</div>
					</div>

					<div className='flex items-start gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg'>
						<div className='flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-bold flex-shrink-0'>
							5
						</div>
						<div>
							<p className='font-semibold text-gray-900 dark:text-white mb-1'>
								Split and Download
							</p>
							<p className='text-gray-700 dark:text-gray-300 text-sm'>
								Click "Split by Bookmarks." You'll get a ZIP file with all
								chapters as separate PDFs, named by their bookmark titles.
							</p>
						</div>
					</div>
				</div>

				<div className='mt-6 p-4 bg-green-100 dark:bg-green-900/30 rounded-lg'>
					<p className='text-sm text-green-800 dark:text-green-300 flex items-center gap-2 mb-0'>
						<Shield className='h-4 w-4' />
						<strong>Total time: 15-60 seconds</strong> depending on PDF size.
						300-page ebook? Done in 30 seconds.
					</p>
				</div>
			</div>

			<h2>Common Use Cases</h2>

			<div className='not-prose grid md:grid-cols-2 gap-6 my-8'>
				{useCases.map((useCase, idx) => {
					const IconComponent = useCase.icon;
					return (
						<div
							key={idx}
							className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6'>
							<div className='flex items-start gap-4 mb-4'>
								<div className='p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex-shrink-0'>
									<IconComponent className='h-6 w-6 text-white' />
								</div>
								<div>
									<h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>
										{useCase.title}
									</h3>
									<p className='text-gray-600 dark:text-gray-400 mb-4 text-sm'>
										{useCase.description}
									</p>
									<div className='flex flex-wrap gap-2'>
										{useCase.examples.map((example, i) => (
											<span
												key={i}
												className='px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full'>
												{example}
											</span>
										))}
									</div>
								</div>
							</div>
						</div>
					);
				})}
			</div>

			<h2>What If My PDF Has No Bookmarks?</h2>

			<div className='not-prose bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-500 rounded-xl p-6 my-8'>
				<h3 className='text-lg font-bold text-amber-900 dark:text-amber-100 mb-4 flex items-center gap-2'>
					<AlertTriangle className='h-5 w-5' />
					No Bookmarks? You Have Two Options
				</h3>
				<div className='space-y-4'>
					<div className='bg-white dark:bg-gray-800 p-4 rounded-lg'>
						<h4 className='font-semibold text-gray-900 dark:text-white mb-2'>
							Option 1: Use Manual Page Splitting
						</h4>
						<p className='text-sm text-gray-600 dark:text-gray-400 mb-2'>
							If you know the page numbers for each chapter, use the regular PDF
							split tool and enter page ranges manually (e.g., "1-25, 26-50,
							51-75").
						</p>
						<Link
							href='/split'
							className='inline-flex items-center gap-2 text-sm text-blue-600 hover:underline'>
							Try Manual Split Tool →
						</Link>
					</div>

					<div className='bg-white dark:bg-gray-800 p-4 rounded-lg'>
						<h4 className='font-semibold text-gray-900 dark:text-white mb-2'>
							Option 2: Add Bookmarks First
						</h4>
						<p className='text-sm text-gray-600 dark:text-gray-400'>
							If you have the table of contents page numbers, you can add
							bookmarks using Adobe Acrobat or free tools, then split by
							bookmarks. This is worth it for PDFs you'll split frequently.
						</p>
					</div>
				</div>
			</div>

			<h2>Tips for Better Results</h2>

			<div className='not-prose grid md:grid-cols-2 gap-6 my-8'>
				<div className='bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800'>
					<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-3'>
						Check Bookmark Hierarchy
					</h3>
					<p className='text-sm text-gray-600 dark:text-gray-400'>
						Some PDFs have nested bookmarks (chapters with subsections). You can
						choose to split by top-level bookmarks only (chapters) or include all
						levels (chapters + sections).
					</p>
				</div>

				<div className='bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl border border-green-200 dark:border-green-800'>
					<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-3'>
						Preview Before Splitting
					</h3>
					<p className='text-sm text-gray-600 dark:text-gray-400'>
						Review the detected bookmarks to ensure they match your expectations.
						Sometimes bookmarks include prefaces or appendices you might not want
						to split out.
					</p>
				</div>

				<div className='bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-xl border border-purple-200 dark:border-purple-800'>
					<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-3'>
						Organize Your Downloads
					</h3>
					<p className='text-sm text-gray-600 dark:text-gray-400'>
						The ZIP file will contain all chapters. Create a dedicated folder
						before extracting so you don't clutter your downloads folder with
						dozens of files.
					</p>
				</div>

				<div className='bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-6 rounded-xl border border-amber-200 dark:border-amber-800'>
					<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-3'>
						Rename If Needed
					</h3>
					<p className='text-sm text-gray-600 dark:text-gray-400'>
						Files are named after bookmark titles. If bookmarks have cryptic names
						(e.g., "Ch1"), you might want to rename them with descriptive titles
						for easier navigation.
					</p>
				</div>
			</div>

			<h2>Frequently Asked Questions</h2>

			<div className='not-prose space-y-4 my-8'>
				<div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6'>
					<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
						Can I split by bookmarks if I only want certain chapters?
					</h3>
					<p className='text-gray-600 dark:text-gray-400 text-sm mb-0'>
						Yes! After uploading, you'll see a list of all bookmarks. Uncheck the
						chapters you don't want, and the tool will only split the selected
						ones.
					</p>
				</div>

				<div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6'>
					<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
						What if bookmarks are wrong or missing chapters?
					</h3>
					<p className='text-gray-600 dark:text-gray-400 text-sm mb-0'>
						You're stuck with whatever bookmarks exist in the PDF. If they're
						incorrect, use manual page splitting instead, or fix the bookmarks
						first using Adobe Acrobat or a similar tool.
					</p>
				</div>

				<div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6'>
					<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
						Does this work on scanned PDFs?
					</h3>
					<p className='text-gray-600 dark:text-gray-400 text-sm mb-0'>
						Only if the scanned PDF has bookmarks added. Most scanned PDFs don't
						have bookmarks, so you'll need to use manual page splitting or add
						bookmarks first.
					</p>
				</div>

				<div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6'>
					<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
						Will the individual chapter PDFs be searchable?
					</h3>
					<p className='text-gray-600 dark:text-gray-400 text-sm mb-0'>
						Yes, if the original PDF was searchable. Splitting doesn't change the
						text layer — searchable PDFs stay searchable, scanned images stay as
						images.
					</p>
				</div>

				<div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6'>
					<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
						Can I split by nested bookmarks (subsections)?
					</h3>
					<p className='text-gray-600 dark:text-gray-400 text-sm mb-0'>
						Most tools split by top-level bookmarks (chapters). If you need to
						split by subsections, you'd need specialized software or manual page
						splitting for those specific ranges.
					</p>
				</div>
			</div>

			<h2>Conclusion</h2>

			<p>
				Splitting PDFs by bookmarks is the fastest way to extract chapters from
				large documents. If your PDF has bookmarks, it's literally
				one-click-and-done — no manual page counting, no file renaming, no
				hassle.
			</p>

			<p className='text-lg font-semibold'>
				<strong>Quick Summary:</strong>
			</p>

			<ul>
				<li>
					✓ <strong>Fully automatic</strong> — splits based on built-in table of
					contents
				</li>
				<li>
					✓ <strong>Named chapters</strong> — files use bookmark titles
				</li>
				<li>
					✓ <strong>Fast processing</strong> — 300 pages in 30 seconds
				</li>
				<li>
					✓ <strong>Perfect for ebooks</strong> — students, teachers,
					researchers
				</li>
				<li>
					✓ <strong>Free tools available</strong> — no expensive software needed
				</li>
				<li>
					✓ <strong>Privacy-focused</strong> — process files locally in browser
				</li>
			</ul>

			<p>
				The only requirement is that your PDF must have bookmarks. If it
				doesn't, use manual page splitting or add bookmarks first.
			</p>

			<div className='not-prose bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-8 my-8 text-center'>
				<h3 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
					Split Your PDF by Bookmarks
				</h3>
				<p className='text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto'>
					Try PDF Wonder Kit's free bookmark splitter — automatically extract
					chapters in seconds. No signup required, completely private.
				</p>
				<Link
					href='/bookmark-split'
					className='inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-lg'>
					Split by Bookmarks Free →
				</Link>
			</div>
		</BlogLayout>
	);
}
