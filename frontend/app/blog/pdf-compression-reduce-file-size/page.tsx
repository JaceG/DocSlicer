import { Metadata } from 'next';
import Link from 'next/link';
import { BlogLayout, BlogPost } from '@/components/blog/BlogLayout';
import {
	AlertTriangle,
	CheckCircle2,
	FileDown,
	Zap,
	Shield,
	Image,
	FileText,
	Settings,
	TrendingDown,
	Monitor,
	Apple,
	Terminal,
} from 'lucide-react';

const postData: BlogPost = {
	slug: 'pdf-compression-reduce-file-size',
	title: 'PDF Compression: Reduce File Size Without Quality Loss (2026 Guide)',
	description:
		'Make your PDFs smaller while keeping them crisp. Learn the best compression methods, understand quality vs. size trade-offs, and discover tools that work.',
	date: '2026-01-05',
	readTime: '9 min read',
	category: 'Tutorials',
	author: 'PDF Wonder Kit Team',
	tags: [
		'compress-pdf',
		'reduce-file-size',
		'optimization',
	],
	featured: true,
	toolSlug: 'compress',
	ctaTitle: 'Ready to Compress Your PDFs?',
	ctaDescription: 'Reduce PDF file sizes by up to 90% while maintaining quality. Choose your compression level and download instantly. 100% private — your files never leave your device.',
};

export const metadata: Metadata = {
	title: postData.title,
	description: postData.description,
	keywords: [
		'pdf compression',
		'reduce pdf file size',
		'compress pdf without losing quality',
		'make pdf smaller',
		'pdf optimizer',
		'compress pdf online free',
		'reduce pdf size',
		'pdf file too large',
		'shrink pdf',
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

// Comparison data
const compressionMethods = [
	{
		method: 'Adobe Acrobat Pro',
		compression: 'Excellent',
		quality: 'Excellent',
		speed: 'Fast',
		cost: '$14.99/month',
		privacy: 'Local processing',
		recommended: true,
	},
	{
		method: 'Mac Preview',
		compression: 'Good',
		quality: 'Good',
		speed: 'Fast',
		cost: 'Free (Mac only)',
		privacy: 'Local processing',
		recommended: true,
	},
	{
		method: 'Online Compressors',
		compression: 'Varies',
		quality: 'Varies',
		speed: 'Medium',
		cost: 'Free-$10/month',
		privacy: '⚠️ Files uploaded',
		recommended: false,
	},
	{
		method: 'Ghostscript (CLI)',
		compression: 'Excellent',
		quality: 'Customizable',
		speed: 'Fast',
		cost: 'Free',
		privacy: 'Local processing',
		recommended: true,
	},
];

const compressionTechniques = [
	{
		name: 'Image Compression',
		impact: 'High (60-80% reduction)',
		quality: 'Minimal loss if done right',
		bestFor: 'PDFs with photos/scans',
	},
	{
		name: 'Font Subsetting',
		impact: 'Medium (10-30% reduction)',
		quality: 'No visible loss',
		bestFor: 'Text-heavy documents',
	},
	{
		name: 'Remove Metadata',
		impact: 'Low (1-5% reduction)',
		quality: 'No loss',
		bestFor: 'All PDFs',
	},
	{
		name: 'Downsampling',
		impact: 'High (50-70% reduction)',
		quality: 'Moderate loss',
		bestFor: 'PDFs for screen viewing',
	},
];

export default function PDFCompressionBlog() {
	return (
		<BlogLayout post={postData}>
			{/* Introduction */}
			<div className='prose prose-lg dark:prose-invert max-w-none'>
				<p className='lead text-xl text-gray-700 dark:text-gray-300 font-medium'>
					PDF files can get surprisingly large—especially when they
					contain high-resolution images, embedded fonts, or scanned
					documents. A 50MB PDF won't fit in most email attachments,
					takes forever to download, and eats up storage space.
				</p>

				<p>
					The good news? You can often reduce PDF file size by 70-90%
					without noticeable quality loss. This guide shows you how to
					compress PDFs effectively, explains what's happening under
					the hood, and helps you choose the right tool for your
					needs.
				</p>

				<div className='bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-xl p-6 my-8'>
					<div className='flex items-start gap-4'>
						<div className='bg-blue-500 rounded-full p-3 flex-shrink-0'>
							<Zap className='h-6 w-6 text-white' />
						</div>
						<div>
							<h3 className='text-lg font-bold text-gray-900 dark:text-white mt-0 mb-2'>
								Quick Answer
							</h3>
							<p className='text-gray-700 dark:text-gray-300 mb-0'>
								The best way to compress a PDF depends on its
								content. For image-heavy PDFs, use Adobe Acrobat
								or Ghostscript to downsample images. For general
								compression on Mac, use Preview's "Reduce File
								Size" export option. Always keep a backup before
								compressing.
							</p>
						</div>
					</div>
				</div>

				<h2 className='text-3xl font-bold mt-12 mb-6'>
					Why PDFs Get So Large
				</h2>

				<p>
					Understanding what makes PDFs large helps you compress them
					more effectively. Here are the main culprits:
				</p>

				<div className='grid md:grid-cols-2 gap-6 my-8 not-prose'>
					<div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6'>
						<div className='flex items-center gap-3 mb-4'>
							<div className='bg-purple-100 dark:bg-purple-900/30 rounded-lg p-2'>
								<Image className='h-5 w-5 text-purple-600 dark:text-purple-400' />
							</div>
							<h3 className='text-lg font-semibold text-gray-900 dark:text-white m-0'>
								High-Resolution Images
							</h3>
						</div>
						<p className='text-sm text-gray-600 dark:text-gray-400 mb-0'>
							Photos at 300+ DPI, especially from cameras or
							scanners, can be several MB each. A 10-page scanned
							document easily reaches 50-100MB.
						</p>
					</div>

					<div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6'>
						<div className='flex items-center gap-3 mb-4'>
							<div className='bg-blue-100 dark:bg-blue-900/30 rounded-lg p-2'>
								<FileText className='h-5 w-5 text-blue-600 dark:text-blue-400' />
							</div>
							<h3 className='text-lg font-semibold text-gray-900 dark:text-white m-0'>
								Embedded Fonts
							</h3>
						</div>
						<p className='text-sm text-gray-600 dark:text-gray-400 mb-0'>
							PDFs embed entire font files to ensure consistent
							display. Using many fonts or full character sets
							(like Japanese) adds significant size.
						</p>
					</div>

					<div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6'>
						<div className='flex items-center gap-3 mb-4'>
							<div className='bg-green-100 dark:bg-green-900/30 rounded-lg p-2'>
								<Settings className='h-5 w-5 text-green-600 dark:text-green-400' />
							</div>
							<h3 className='text-lg font-semibold text-gray-900 dark:text-white m-0'>
								Uncompressed Content
							</h3>
						</div>
						<p className='text-sm text-gray-600 dark:text-gray-400 mb-0'>
							PDFs created by some software don't apply
							compression by default, leaving images and content
							streams unoptimized.
						</p>
					</div>

					<div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6'>
						<div className='flex items-center gap-3 mb-4'>
							<div className='bg-orange-100 dark:bg-orange-900/30 rounded-lg p-2'>
								<FileDown className='h-5 w-5 text-orange-600 dark:text-orange-400' />
							</div>
							<h3 className='text-lg font-semibold text-gray-900 dark:text-white m-0'>
								Metadata & Annotations
							</h3>
						</div>
						<p className='text-sm text-gray-600 dark:text-gray-400 mb-0'>
							Comments, revisions, and metadata (like edit
							history) accumulate over time, especially in
							collaborative documents.
						</p>
					</div>
				</div>

				<h2 className='text-3xl font-bold mt-12 mb-6'>
					Compression Techniques Explained
				</h2>

				<p>
					PDF compression isn't one-size-fits-all. Different
					techniques work better for different types of content.
					Here's what happens behind the scenes:
				</p>

				<div className='overflow-x-auto my-8'>
					<table className='min-w-full border-collapse border border-gray-300 dark:border-gray-700'>
						<thead>
							<tr className='bg-gray-50 dark:bg-gray-800'>
								<th className='border border-gray-300 dark:border-gray-700 px-4 py-3 text-left font-semibold'>
									Technique
								</th>
								<th className='border border-gray-300 dark:border-gray-700 px-4 py-3 text-left font-semibold'>
									Impact
								</th>
								<th className='border border-gray-300 dark:border-gray-700 px-4 py-3 text-left font-semibold'>
									Quality Loss
								</th>
								<th className='border border-gray-300 dark:border-gray-700 px-4 py-3 text-left font-semibold'>
									Best For
								</th>
							</tr>
						</thead>
						<tbody>
							{compressionTechniques.map((tech, idx) => (
								<tr
									key={idx}
									className='border-t border-gray-300 dark:border-gray-700'>
									<td className='border border-gray-300 dark:border-gray-700 px-4 py-3 font-medium'>
										{tech.name}
									</td>
									<td className='border border-gray-300 dark:border-gray-700 px-4 py-3'>
										{tech.impact}
									</td>
									<td className='border border-gray-300 dark:border-gray-700 px-4 py-3'>
										{tech.quality}
									</td>
									<td className='border border-gray-300 dark:border-gray-700 px-4 py-3'>
										{tech.bestFor}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				<h2 className='text-3xl font-bold mt-12 mb-6'>
					Best Tools for PDF Compression
				</h2>

				<p>Each tool has its strengths. Here's how they compare:</p>

				<div className='overflow-x-auto my-8'>
					<table className='min-w-full border-collapse border border-gray-300 dark:border-gray-700'>
						<thead>
							<tr className='bg-gray-50 dark:bg-gray-800'>
								<th className='border border-gray-300 dark:border-gray-700 px-4 py-3 text-left font-semibold'>
									Method
								</th>
								<th className='border border-gray-300 dark:border-gray-700 px-4 py-3 text-left font-semibold'>
									Compression
								</th>
								<th className='border border-gray-300 dark:border-gray-700 px-4 py-3 text-left font-semibold'>
									Quality
								</th>
								<th className='border border-gray-300 dark:border-gray-700 px-4 py-3 text-left font-semibold'>
									Speed
								</th>
								<th className='border border-gray-300 dark:border-gray-700 px-4 py-3 text-left font-semibold'>
									Cost
								</th>
								<th className='border border-gray-300 dark:border-gray-700 px-4 py-3 text-left font-semibold'>
									Privacy
								</th>
							</tr>
						</thead>
						<tbody>
							{compressionMethods.map((method, idx) => (
								<tr
									key={idx}
									className={`border-t border-gray-300 dark:border-gray-700 ${
										method.recommended
											? 'bg-green-50 dark:bg-green-900/10'
											: ''
									}`}>
									<td className='border border-gray-300 dark:border-gray-700 px-4 py-3 font-medium'>
										{method.method}
										{method.recommended && (
											<span className='ml-2 text-xs bg-green-600 text-white px-2 py-1 rounded-full'>
												Recommended
											</span>
										)}
									</td>
									<td className='border border-gray-300 dark:border-gray-700 px-4 py-3'>
										{method.compression}
									</td>
									<td className='border border-gray-300 dark:border-gray-700 px-4 py-3'>
										{method.quality}
									</td>
									<td className='border border-gray-300 dark:border-gray-700 px-4 py-3'>
										{method.speed}
									</td>
									<td className='border border-gray-300 dark:border-gray-700 px-4 py-3'>
										{method.cost}
									</td>
									<td className='border border-gray-300 dark:border-gray-700 px-4 py-3'>
										{method.privacy}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				<h2 className='text-3xl font-bold mt-12 mb-6'>
					Method 1: Adobe Acrobat Pro (Best Overall)
				</h2>

				<p>
					Adobe Acrobat Pro offers the most control and best
					quality-to-size ratio. It's the gold standard for
					professional PDF work.
				</p>

				<div className='bg-gray-50 dark:bg-gray-800 rounded-xl p-6 my-8'>
					<h3 className='text-xl font-semibold mb-4 flex items-center gap-2'>
						<Monitor className='h-5 w-5 text-blue-600 dark:text-blue-400' />
						Step-by-Step
					</h3>
					<ol className='space-y-3 mb-0'>
						<li>
							<strong>Open your PDF</strong> in Adobe Acrobat Pro
						</li>
						<li>
							<strong>
								Go to File → Save As Other → Reduced Size PDF
							</strong>
						</li>
						<li>
							<strong>Choose compatibility</strong>: Select
							"Retain existing" for best quality
						</li>
						<li>
							<strong>Click OK</strong> and save the compressed
							file
						</li>
					</ol>
				</div>

				<div className='bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 my-8'>
					<h4 className='font-semibold text-blue-900 dark:text-blue-100 mb-2 flex items-center gap-2'>
						<Zap className='h-5 w-5' />
						Pro Tip: Advanced Optimization
					</h4>
					<p className='text-sm text-blue-800 dark:text-blue-200 mb-2'>
						For maximum control, use{' '}
						<strong>File → Save As Other → Optimized PDF</strong>.
						This lets you:
					</p>
					<ul className='text-sm text-blue-800 dark:text-blue-200 space-y-1 mb-0'>
						<li>
							• Downsample images to specific DPI (150 DPI works
							great for screen viewing)
						</li>
						<li>
							• Choose JPEG compression quality for color images
						</li>
						<li>
							• Subset embedded fonts to only include used
							characters
						</li>
						<li>• Remove metadata, bookmarks, and annotations</li>
					</ul>
				</div>

				<h2 className='text-3xl font-bold mt-12 mb-6'>
					Method 2: Mac Preview (Free & Easy)
				</h2>

				<p>
					If you're on a Mac, Preview offers a quick and effective
					compression option built right into the OS.
				</p>

				<div className='bg-gray-50 dark:bg-gray-800 rounded-xl p-6 my-8'>
					<h3 className='text-xl font-semibold mb-4 flex items-center gap-2'>
						<Apple className='h-5 w-5 text-gray-600 dark:text-gray-400' />
						How to Compress in Preview
					</h3>
					<ol className='space-y-3 mb-0'>
						<li>
							<strong>Open the PDF</strong> in Preview
						</li>
						<li>
							<strong>Go to File → Export</strong>
						</li>
						<li>
							<strong>Click the "Quartz Filter" dropdown</strong>
						</li>
						<li>
							<strong>Select "Reduce File Size"</strong>
						</li>
						<li>
							<strong>Click Save</strong>
						</li>
					</ol>
				</div>

				<div className='bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 dark:border-yellow-600 p-6 my-8'>
					<div className='flex items-start gap-3'>
						<AlertTriangle className='h-5 w-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-1' />
						<div>
							<h4 className='font-semibold text-yellow-900 dark:text-yellow-100 mb-2'>
								Heads Up
							</h4>
							<p className='text-sm text-yellow-800 dark:text-yellow-200 mb-0'>
								Preview's compression is aggressive and can
								noticeably reduce image quality. Always save a
								copy before compressing, and check the result
								before deleting the original.
							</p>
						</div>
					</div>
				</div>

				<h2 className='text-3xl font-bold mt-12 mb-6'>
					Method 3: Ghostscript (Command Line Power)
				</h2>

				<p>
					For developers or those who need to batch-process PDFs,
					Ghostscript offers powerful, scriptable compression with
					full control over quality settings.
				</p>

				<div className='bg-gray-50 dark:bg-gray-800 rounded-xl p-6 my-8'>
					<h3 className='text-xl font-semibold mb-4 flex items-center gap-2'>
						<Terminal className='h-5 w-5 text-green-600 dark:text-green-400' />
						Installation
					</h3>
					<div className='space-y-4'>
						<div>
							<p className='text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2'>
								Mac (with Homebrew):
							</p>
							<pre className='bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto'>
								<code>brew install ghostscript</code>
							</pre>
						</div>
						<div>
							<p className='text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2'>
								Ubuntu/Debian:
							</p>
							<pre className='bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto'>
								<code>sudo apt install ghostscript</code>
							</pre>
						</div>
						<div>
							<p className='text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2'>
								Windows:
							</p>
							<pre className='bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-xs'>
								<code>
									Download from ghostscript.com and install
								</code>
							</pre>
						</div>
					</div>
				</div>

				<div className='bg-gray-50 dark:bg-gray-800 rounded-xl p-6 my-8'>
					<h3 className='text-xl font-semibold mb-4'>
						Compression Commands
					</h3>
					<div className='space-y-4'>
						<div>
							<p className='text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2'>
								Screen Quality (72 DPI - smallest file):
							</p>
							<pre className='bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-xs'>
								<code>{`gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 \\
-dPDFSETTINGS=/screen -dNOPAUSE -dQUIET \\
-dBATCH -sOutputFile=output.pdf input.pdf`}</code>
							</pre>
						</div>
						<div>
							<p className='text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2'>
								Ebook Quality (150 DPI - balanced):
							</p>
							<pre className='bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-xs'>
								<code>{`gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 \\
-dPDFSETTINGS=/ebook -dNOPAUSE -dQUIET \\
-dBATCH -sOutputFile=output.pdf input.pdf`}</code>
							</pre>
						</div>
						<div>
							<p className='text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2'>
								Printer Quality (300 DPI - high quality):
							</p>
							<pre className='bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-xs'>
								<code>{`gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 \\
-dPDFSETTINGS=/printer -dNOPAUSE -dQUIET \\
-dBATCH -sOutputFile=output.pdf input.pdf`}</code>
							</pre>
						</div>
					</div>
				</div>

				<h2 className='text-3xl font-bold mt-12 mb-6'>
					Quality vs. File Size: Finding the Sweet Spot
				</h2>

				<p>
					The right compression level depends on how you'll use the
					PDF. Here's a practical guide:
				</p>

				<div className='grid md:grid-cols-3 gap-6 my-8 not-prose'>
					<div className='bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6'>
						<div className='bg-green-500 rounded-full w-12 h-12 flex items-center justify-center mb-4'>
							<TrendingDown className='h-6 w-6 text-white' />
						</div>
						<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
							Email Attachments
						</h3>
						<p className='text-sm text-gray-600 dark:text-gray-400 mb-3'>
							<strong>Target:</strong> Under 5MB
						</p>
						<p className='text-sm text-gray-600 dark:text-gray-400'>
							Use aggressive compression (72-150 DPI). Quality
							loss is acceptable for quick review. Recipients can
							always request the high-res version.
						</p>
					</div>

					<div className='bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6'>
						<div className='bg-blue-500 rounded-full w-12 h-12 flex items-center justify-center mb-4'>
							<Monitor className='h-6 w-6 text-white' />
						</div>
						<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
							Web Publishing
						</h3>
						<p className='text-sm text-gray-600 dark:text-gray-400 mb-3'>
							<strong>Target:</strong> 1-3MB per page
						</p>
						<p className='text-sm text-gray-600 dark:text-gray-400'>
							Balance quality and download speed. 150 DPI works
							well. Optimize for screen viewing, not printing.
						</p>
					</div>

					<div className='bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-6'>
						<div className='bg-purple-500 rounded-full w-12 h-12 flex items-center justify-center mb-4'>
							<FileDown className='h-6 w-6 text-white' />
						</div>
						<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
							Archive/Print
						</h3>
						<p className='text-sm text-gray-600 dark:text-gray-400 mb-3'>
							<strong>Target:</strong> Minimal compression
						</p>
						<p className='text-sm text-gray-600 dark:text-gray-400'>
							Use 300 DPI or higher. Preserve all details. File
							size is secondary to quality for archival purposes.
						</p>
					</div>
				</div>

				<h2 className='text-3xl font-bold mt-12 mb-6'>
					Common Mistakes to Avoid
				</h2>

				<div className='space-y-4 my-8'>
					<div className='bg-red-50 dark:bg-red-900/20 border-l-4 border-red-400 dark:border-red-600 p-6'>
						<h3 className='text-lg font-semibold text-red-900 dark:text-red-100 mb-2 flex items-center gap-2'>
							<AlertTriangle className='h-5 w-5' />
							Compressing Already-Compressed PDFs
						</h3>
						<p className='text-sm text-red-800 dark:text-red-200 mb-0'>
							Running compression multiple times degrades quality
							without much size reduction. Compress once, from the
							highest quality source.
						</p>
					</div>

					<div className='bg-red-50 dark:bg-red-900/20 border-l-4 border-red-400 dark:border-red-600 p-6'>
						<h3 className='text-lg font-semibold text-red-900 dark:text-red-100 mb-2 flex items-center gap-2'>
							<AlertTriangle className='h-5 w-5' />
							Not Keeping Originals
						</h3>
						<p className='text-sm text-red-800 dark:text-red-200 mb-0'>
							Always work on a copy. Once you compress and save,
							you can't recover the lost quality. Keep your
							high-res originals safe.
						</p>
					</div>

					<div className='bg-red-50 dark:bg-red-900/20 border-l-4 border-red-400 dark:border-red-600 p-6'>
						<h3 className='text-lg font-semibold text-red-900 dark:text-red-100 mb-2 flex items-center gap-2'>
							<AlertTriangle className='h-5 w-5' />
							Using Untrusted Online Tools
						</h3>
						<p className='text-sm text-red-800 dark:text-red-200 mb-0'>
							Many "free" PDF compressors upload your files to
							their servers. This is a privacy and security risk,
							especially for sensitive documents. Use local tools
							when possible.
						</p>
					</div>

					<div className='bg-red-50 dark:bg-red-900/20 border-l-4 border-red-400 dark:border-red-600 p-6'>
						<h3 className='text-lg font-semibold text-red-900 dark:text-red-100 mb-2 flex items-center gap-2'>
							<AlertTriangle className='h-5 w-5' />
							Over-Optimizing Text Documents
						</h3>
						<p className='text-sm text-red-800 dark:text-red-200 mb-0'>
							Text-only PDFs are already small. Aggressive
							compression can make text blurry or hard to read
							without significant size savings.
						</p>
					</div>
				</div>

				<h2 className='text-3xl font-bold mt-12 mb-6'>
					Privacy & Security Considerations
				</h2>

				<p>
					When compressing PDFs, especially sensitive documents,
					privacy matters:
				</p>

				<div className='grid md:grid-cols-2 gap-6 my-8 not-prose'>
					<div className='bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6'>
						<div className='flex items-center gap-3 mb-4'>
							<Shield className='h-6 w-6 text-green-600 dark:text-green-400' />
							<h3 className='text-lg font-semibold text-gray-900 dark:text-white m-0'>
								✅ Safe Approaches
							</h3>
						</div>
						<ul className='text-sm text-gray-600 dark:text-gray-400 space-y-2 mb-0'>
							<li className='flex items-start gap-2'>
								<CheckCircle2 className='h-4 w-4 text-green-600 mt-0.5 flex-shrink-0' />
								<span>
									Desktop software (Adobe, Preview,
									Ghostscript)
								</span>
							</li>
							<li className='flex items-start gap-2'>
								<CheckCircle2 className='h-4 w-4 text-green-600 mt-0.5 flex-shrink-0' />
								<span>
									Browser-based tools that process locally (no
									upload)
								</span>
							</li>
							<li className='flex items-start gap-2'>
								<CheckCircle2 className='h-4 w-4 text-green-600 mt-0.5 flex-shrink-0' />
								<span>Command-line tools on your computer</span>
							</li>
							<li className='flex items-start gap-2'>
								<CheckCircle2 className='h-4 w-4 text-green-600 mt-0.5 flex-shrink-0' />
								<span>Self-hosted compression services</span>
							</li>
						</ul>
					</div>

					<div className='bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6'>
						<div className='flex items-center gap-3 mb-4'>
							<AlertTriangle className='h-6 w-6 text-red-600 dark:text-red-400' />
							<h3 className='text-lg font-semibold text-gray-900 dark:text-white m-0'>
								⚠️ Be Careful With
							</h3>
						</div>
						<ul className='text-sm text-gray-600 dark:text-gray-400 space-y-2 mb-0'>
							<li className='flex items-start gap-2'>
								<AlertTriangle className='h-4 w-4 text-red-600 mt-0.5 flex-shrink-0' />
								<span>
									Free online compressors (files leave your
									device)
								</span>
							</li>
							<li className='flex items-start gap-2'>
								<AlertTriangle className='h-4 w-4 text-red-600 mt-0.5 flex-shrink-0' />
								<span>
									Tools without clear privacy policies
								</span>
							</li>
							<li className='flex items-start gap-2'>
								<AlertTriangle className='h-4 w-4 text-red-600 mt-0.5 flex-shrink-0' />
								<span>
									Services that require email or account
									signup
								</span>
							</li>
							<li className='flex items-start gap-2'>
								<AlertTriangle className='h-4 w-4 text-red-600 mt-0.5 flex-shrink-0' />
								<span>
									Compression tools bundled with other
									software
								</span>
							</li>
						</ul>
					</div>
				</div>

				<h2 className='text-3xl font-bold mt-12 mb-6'>
					When NOT to Compress
				</h2>

				<p>
					Compression isn't always the answer. Here's when you should
					skip it:
				</p>

				<div className='space-y-4 my-8'>
					<div className='bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4'>
						<p className='text-sm text-gray-700 dark:text-gray-300 mb-0'>
							<strong>Legal documents:</strong> Courts and legal
							processes often require original, unmodified files.
							Compression can be seen as alteration.
						</p>
					</div>
					<div className='bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4'>
						<p className='text-sm text-gray-700 dark:text-gray-300 mb-0'>
							<strong>
								CAD drawings and technical diagrams:
							</strong>{' '}
							Line quality matters. Even slight compression
							artifacts can cause confusion.
						</p>
					</div>
					<div className='bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4'>
						<p className='text-sm text-gray-700 dark:text-gray-300 mb-0'>
							<strong>Print-ready files:</strong> If your PDF is
							going to a professional printer, they need the
							highest quality. Don't compress.
						</p>
					</div>
					<div className='bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4'>
						<p className='text-sm text-gray-700 dark:text-gray-300 mb-0'>
							<strong>Already optimized PDFs:</strong> If a PDF is
							already small for its content, further compression
							will only hurt quality.
						</p>
					</div>
				</div>

				<h2 className='text-3xl font-bold mt-12 mb-6'>
					Batch Processing: Compress Multiple PDFs
				</h2>

				<p>Need to compress many PDFs? Here's how to automate it:</p>

				<div className='bg-gray-50 dark:bg-gray-800 rounded-xl p-6 my-8'>
					<h3 className='text-xl font-semibold mb-4'>
						Bash Script for Ghostscript
					</h3>
					<p className='text-sm text-gray-600 dark:text-gray-400 mb-4'>
						Save this as{' '}
						<code className='text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded'>
							compress-pdfs.sh
						</code>{' '}
						and run it in a folder with PDFs:
					</p>
					<pre className='bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-xs'>
						<code>{`#!/bin/bash
# Compress all PDFs in current directory

for file in *.pdf; do
    echo "Compressing $file..."
    gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 \\
       -dPDFSETTINGS=/ebook -dNOPAUSE -dQUIET \\
       -dBATCH -sOutputFile="compressed_$file" "$file"
done

echo "Done! Compressed files have 'compressed_' prefix"`}</code>
					</pre>
				</div>

				<h2 className='text-3xl font-bold mt-12 mb-6'>
					Frequently Asked Questions
				</h2>

				<div className='space-y-6 my-8'>
					<div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6'>
						<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-3'>
							Q: Can I compress a PDF without losing quality?
						</h3>
						<p className='text-sm text-gray-600 dark:text-gray-400 mb-0'>
							<strong>A:</strong> Not entirely. Any compression
							involves some loss, but it's often imperceptible.
							For documents with high-resolution images, you can
							reduce size by 70-80% without noticeable quality
							loss if done correctly. Text-heavy PDFs have less
							room for compression without affecting readability.
						</p>
					</div>

					<div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6'>
						<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-3'>
							Q: Why is my PDF so large after scanning?
						</h3>
						<p className='text-sm text-gray-600 dark:text-gray-400 mb-0'>
							<strong>A:</strong> Scanners often save at very high
							resolution (300-600 DPI) without compression. A
							single scanned page can be 5-10MB. Use your
							scanner's "PDF" mode with compression enabled, or
							compress afterwards using the methods above.
						</p>
					</div>

					<div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6'>
						<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-3'>
							Q: Is it safe to use online PDF compressors?
						</h3>
						<p className='text-sm text-gray-600 dark:text-gray-400 mb-0'>
							<strong>A:</strong> It depends. Many upload your
							files to their servers, which is a privacy risk.
							Look for tools that explicitly process files locally
							in your browser. For sensitive documents, always use
							local software like Adobe Acrobat, Preview, or
							Ghostscript.
						</p>
					</div>

					<div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6'>
						<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-3'>
							Q: What's the best compression level for emailing?
						</h3>
						<p className='text-sm text-gray-600 dark:text-gray-400 mb-0'>
							<strong>A:</strong> Aim for under 5MB total. Use
							72-150 DPI image compression (Ghostscript's /screen
							or /ebook settings). Most email servers have a 25MB
							limit, but smaller files send faster and are more
							likely to be opened.
						</p>
					</div>

					<div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6'>
						<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-3'>
							Q: Can compression damage my PDF?
						</h3>
						<p className='text-sm text-gray-600 dark:text-gray-400 mb-0'>
							<strong>A:</strong> No, compression doesn't corrupt
							files. However, aggressive compression can make
							images blurry or text hard to read. Always save a
							backup before compressing, and check the result
							before deleting the original.
						</p>
					</div>
				</div>

				<h2 className='text-3xl font-bold mt-12 mb-6'>Conclusion</h2>

				<p>
					PDF compression is a balance between file size and quality.
					For most use cases, you can reduce size by 60-80% without
					noticeable quality loss using the right tools and settings.
				</p>

				<p>
					<strong>Quick recommendations:</strong>
				</p>

				<ul className='space-y-2'>
					<li>
						<strong>For casual use:</strong> Mac Preview's "Reduce
						File Size" is fast and easy
					</li>
					<li>
						<strong>For professional work:</strong> Adobe Acrobat
						Pro offers the best quality control
					</li>
					<li>
						<strong>For batch processing:</strong> Ghostscript
						provides scriptable, powerful compression
					</li>
					<li>
						<strong>For privacy:</strong> Always use local tools for
						sensitive documents
					</li>
				</ul>

				<p>
					Remember: compression is one-way. Always keep your original,
					high-quality PDFs as backups. You can always compress more,
					but you can never recover lost quality.
				</p>

			</div>
		</BlogLayout>
	);
}
