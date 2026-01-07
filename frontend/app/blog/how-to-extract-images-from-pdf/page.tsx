import { Metadata } from 'next';
import Link from 'next/link';
import { BlogLayout, BlogPost } from '@/components/blog/BlogLayout';
import {
	Image as ImageIcon,
	CheckCircle2,
	Zap,
	Shield,
	AlertTriangle,
	Monitor,
	Apple,
	Smartphone,
	Download,
	ArrowRight,
	Share2,
	Edit,
	Presentation,
	FileText,
	Globe,
	Smartphone as Phone,
} from 'lucide-react';

const postData: BlogPost = {
	slug: 'how-to-extract-images-from-pdf',
	title: 'How to Extract Images from PDF Documents (Convert PDF to JPG/PNG)',
	description:
		'Extract high-quality images from any PDF document. Save PDF pages as JPG or PNG for social media, presentations, or editing. Free and completely private.',
	date: '2026-01-06',
	readTime: '9 min read',
	category: 'Tutorials',
	author: 'PDF Wonder Kit Team',
	tags: [
		'pdf-to-jpg',
		'pdf-to-png',
		'extract-images',
		'pdf-to-image',
		'convert-pdf',
	],
	featured: true,
	toolSlug: 'pdf-to-images',
	ctaTitle: 'Ready to Extract Your Images?',
	ctaDescription:
		'Convert PDF pages to high-quality JPG or PNG images in seconds. Extract all pages or just the ones you need. 100% private — your files never leave your device.',
};

export const metadata: Metadata = {
	title: postData.title,
	description: postData.description,
	keywords: [
		'PDF to JPG',
		'PDF to PNG',
		'extract images from PDF',
		'save PDF as image',
		'convert PDF to image',
		'PDF to image converter',
		'export PDF pages',
		'PDF page to image',
		'extract pictures from PDF',
		'PDF to photo',
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

const commonUseCases = [
	{
		title: 'Social Media Sharing',
		icon: Share2,
		description:
			"Share PDF pages on Instagram, Facebook, Twitter, or LinkedIn where PDFs aren't directly supported.",
		examples: [
			'Infographic posts',
			'Quote graphics',
			'Announcement flyers',
			'Event posters',
		],
	},
	{
		title: 'Presentation Slides',
		icon: Presentation,
		description:
			'Extract slides from PDF presentations to use in PowerPoint, Keynote, or Google Slides.',
		examples: [
			'Conference slides',
			'Training materials',
			'Pitch decks',
			'Educational content',
		],
	},
	{
		title: 'Image Editing',
		icon: Edit,
		description:
			'Extract images to edit in Photoshop, Illustrator, or other graphics software.',
		examples: [
			'Design modifications',
			'Color corrections',
			'Background removal',
			'Watermark addition',
		],
	},
	{
		title: 'Web Publishing',
		icon: Globe,
		description:
			'Convert PDF pages to images for use on websites, blogs, or online documentation.',
		examples: [
			'Tutorial screenshots',
			'Product catalog images',
			'Documentation pages',
			'Blog post graphics',
		],
	},
];

const formatComparison = [
	{
		format: 'JPG',
		quality: 'Good',
		fileSize: 'Small',
		transparency: 'No',
		bestFor: 'Photos, general use',
		color: 'blue',
	},
	{
		format: 'PNG',
		quality: 'Excellent',
		fileSize: 'Large',
		transparency: 'Yes',
		bestFor: 'Graphics, logos, text',
		color: 'green',
	},
];

export default function ExtractImagesFromPDFPost() {
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
							Extracting images from PDFs is simple: upload your PDF to a
							converter tool, choose JPG or PNG format, select which pages you
							want, and download the images. Takes about 30 seconds and works in
							any browser with complete privacy.
						</p>
						<Link
							href='/pdf-to-images'
							className='inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors'>
							Convert PDF to Images Free →
						</Link>
					</div>
				</div>
			</div>

			<p className='text-xl text-gray-700 dark:text-gray-300 leading-relaxed'>
				Need to share a PDF page on social media, extract a slide for a
				presentation, or edit an image from a document? PDFs are great for
				documents, but sometimes you need those pages as regular image files
				(JPG or PNG) that work everywhere.
			</p>

			<p>
				This guide shows you exactly how to extract images from PDF documents on
				any device, explains when to use JPG vs PNG, and covers every scenario
				from single-page extraction to bulk conversions.
			</p>

			<h2>Why Extract Images from PDFs?</h2>

			<p>
				Converting PDF pages to images opens up many possibilities that PDFs
				don't support:
			</p>

			<div className='not-prose space-y-4 my-8'>
				<div className='flex items-start gap-3 bg-green-50 dark:bg-green-900/20 p-4 rounded-lg'>
					<CheckCircle2 className='h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5' />
					<div>
						<h3 className='font-semibold text-gray-900 dark:text-white mb-1'>
							Social Media Compatible
						</h3>
						<p className='text-sm text-gray-600 dark:text-gray-400 mb-0'>
							Instagram, Facebook, Twitter, and Pinterest don't accept PDF
							uploads. Convert pages to JPG/PNG to share infographics, quotes,
							or announcements on social platforms.
						</p>
					</div>
				</div>

				<div className='flex items-start gap-3 bg-green-50 dark:bg-green-900/20 p-4 rounded-lg'>
					<CheckCircle2 className='h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5' />
					<div>
						<h3 className='font-semibold text-gray-900 dark:text-white mb-1'>
							Easy Image Editing
						</h3>
						<p className='text-sm text-gray-600 dark:text-gray-400 mb-0'>
							Edit in Photoshop, GIMP, Canva, or any image editor. PDFs are
							hard to edit directly; images give you full editing control.
						</p>
					</div>
				</div>

				<div className='flex items-start gap-3 bg-green-50 dark:bg-green-900/20 p-4 rounded-lg'>
					<CheckCircle2 className='h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5' />
					<div>
						<h3 className='font-semibold text-gray-900 dark:text-white mb-1'>
							Website & Blog Use
						</h3>
						<p className='text-sm text-gray-600 dark:text-gray-400 mb-0'>
							Websites load images faster than embedded PDFs. Convert PDF pages
							to JPG for blog posts, tutorials, or product pages.
						</p>
					</div>
				</div>

				<div className='flex items-start gap-3 bg-green-50 dark:bg-green-900/20 p-4 rounded-lg'>
					<CheckCircle2 className='h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5' />
					<div>
						<h3 className='font-semibold text-gray-900 dark:text-white mb-1'>
							Presentation Integration
						</h3>
						<p className='text-sm text-gray-600 dark:text-gray-400 mb-0'>
							Insert PDF pages into PowerPoint, Keynote, or Google Slides as
							images. Much easier than trying to embed PDFs directly.
						</p>
					</div>
				</div>

				<div className='flex items-start gap-3 bg-green-50 dark:bg-green-900/20 p-4 rounded-lg'>
					<CheckCircle2 className='h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5' />
					<div>
						<h3 className='font-semibold text-gray-900 dark:text-white mb-1'>
							Mobile Device Wallpapers
						</h3>
						<p className='text-sm text-gray-600 dark:text-gray-400 mb-0'>
							Convert PDF pages with quotes, art, or photos to set as phone or
							tablet wallpapers. Most devices don't support PDF wallpapers.
						</p>
					</div>
				</div>

				<div className='flex items-start gap-3 bg-green-50 dark:bg-green-900/20 p-4 rounded-lg'>
					<CheckCircle2 className='h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5' />
					<div>
						<h3 className='font-semibold text-gray-900 dark:text-white mb-1'>
							Print Individual Pages
						</h3>
						<p className='text-sm text-gray-600 dark:text-gray-400 mb-0'>
							Extract specific pages as images to print at photo labs or
							services that don't accept PDFs well.
						</p>
					</div>
				</div>
			</div>

			<h2>How to Extract Images from PDF (Step by Step)</h2>

			<p>
				The fastest method is using a browser-based converter. Here's the
				complete process:
			</p>

			<div className='not-prose bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-8 rounded-2xl border-2 border-blue-200 dark:border-blue-800 mb-8'>
				<h3 className='text-xl font-bold text-gray-900 dark:text-white mb-6'>
					Using PDF Wonder Kit's Free PDF to Image Converter
				</h3>

				<div className='space-y-4'>
					<div className='flex items-start gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg'>
						<div className='flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-bold flex-shrink-0'>
							1
						</div>
						<div>
							<p className='font-semibold text-gray-900 dark:text-white mb-1'>
								Open the PDF to Image Converter
							</p>
							<p className='text-gray-700 dark:text-gray-300 text-sm'>
								Visit{' '}
								<Link
									href='/pdf-to-images'
									className='text-blue-600 hover:underline'>
									pdfwonderkit.com/pdf-to-images
								</Link>{' '}
								in any modern browser. Works on desktop, tablet, and mobile.
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
								Drag and drop your PDF file, or click to browse.{' '}
								<strong className='text-blue-600'>
									Your file stays on your device
								</strong>{' '}
								— all processing happens in your browser, nothing is uploaded to
								any server.
							</p>
						</div>
					</div>

					<div className='flex items-start gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg'>
						<div className='flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-bold flex-shrink-0'>
							3
						</div>
						<div>
							<p className='font-semibold text-gray-900 dark:text-white mb-1'>
								Choose Image Format
							</p>
							<p className='text-gray-700 dark:text-gray-300 text-sm'>
								Select <strong>JPG</strong> (smaller files, good for photos) or{' '}
								<strong>PNG</strong> (larger files, better for text/graphics
								with transparency). See format comparison below.
							</p>
						</div>
					</div>

					<div className='flex items-start gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg'>
						<div className='flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-bold flex-shrink-0'>
							4
						</div>
						<div>
							<p className='font-semibold text-gray-900 dark:text-white mb-1'>
								Select Pages to Extract
							</p>
							<p className='text-gray-700 dark:text-gray-300 text-sm'>
								Choose "All pages" to convert the entire PDF, or select specific
								pages. You'll see thumbnails of each page to help you choose.
							</p>
						</div>
					</div>

					<div className='flex items-start gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg'>
						<div className='flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-bold flex-shrink-0'>
							5
						</div>
						<div>
							<p className='font-semibold text-gray-900 dark:text-white mb-1'>
								Set Quality (Optional)
							</p>
							<p className='text-gray-700 dark:text-gray-300 text-sm'>
								For JPG, choose quality level (100% for maximum quality, 80% for
								good balance of size and quality). PNG quality is always
								lossless.
							</p>
						</div>
					</div>

					<div className='flex items-start gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg'>
						<div className='flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-bold flex-shrink-0'>
							6
						</div>
						<div>
							<p className='font-semibold text-gray-900 dark:text-white mb-1'>
								Convert and Download
							</p>
							<p className='text-gray-700 dark:text-gray-300 text-sm'>
								Click "Convert to Images" and wait a few seconds. Download all
								images as a ZIP file, or download individual images one by one.
							</p>
						</div>
					</div>
				</div>

				<div className='mt-6 p-4 bg-green-100 dark:bg-green-900/30 rounded-lg'>
					<p className='text-sm text-green-800 dark:text-green-300 flex items-center gap-2 mb-0'>
						<Shield className='h-4 w-4' />
						<strong>Total time: 30 seconds to 2 minutes</strong> depending on
						PDF size. No account needed.
					</p>
				</div>
			</div>

			<h2>JPG vs PNG: Which Format Should You Choose?</h2>

			<p>
				The two most common image formats have different strengths. Here's how
				to choose:
			</p>

			<div className='not-prose overflow-x-auto my-8'>
				<table className='min-w-full bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg'>
					<thead className='bg-gray-50 dark:bg-gray-700'>
						<tr>
							<th className='px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white'>
								Format
							</th>
							<th className='px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white'>
								Quality
							</th>
							<th className='px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white'>
								File Size
							</th>
							<th className='px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white'>
								Transparency
							</th>
							<th className='px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white'>
								Best For
							</th>
						</tr>
					</thead>
					<tbody className='divide-y divide-gray-200 dark:divide-gray-700'>
						{formatComparison.map((format, idx) => (
							<tr
								key={idx}
								className={
									format.color === 'blue'
										? 'bg-blue-50 dark:bg-blue-900/10'
										: 'bg-green-50 dark:bg-green-900/10'
								}>
								<td className='px-6 py-4 text-sm font-bold text-gray-900 dark:text-white'>
									{format.format}
								</td>
								<td className='px-6 py-4 text-sm text-gray-600 dark:text-gray-300'>
									{format.quality}
								</td>
								<td className='px-6 py-4 text-sm text-gray-600 dark:text-gray-300'>
									{format.fileSize}
								</td>
								<td className='px-6 py-4 text-sm text-gray-600 dark:text-gray-300'>
									{format.transparency}
								</td>
								<td className='px-6 py-4 text-sm text-gray-600 dark:text-gray-300'>
									{format.bestFor}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<div className='not-prose grid md:grid-cols-2 gap-6 my-8'>
				<div className='bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6'>
					<h3 className='text-lg font-semibold text-blue-900 dark:text-blue-200 mb-3 flex items-center gap-2'>
						<ImageIcon className='h-5 w-5' />
						Choose JPG When:
					</h3>
					<ul className='text-sm text-blue-800 dark:text-blue-300 space-y-2'>
						<li className='flex items-start gap-2'>
							<CheckCircle2 className='h-4 w-4 flex-shrink-0 mt-0.5' />
							<span>
								PDF contains photos or complex graphics with many colors
							</span>
						</li>
						<li className='flex items-start gap-2'>
							<CheckCircle2 className='h-4 w-4 flex-shrink-0 mt-0.5' />
							<span>
								You need smaller file sizes for email or web use
							</span>
						</li>
						<li className='flex items-start gap-2'>
							<CheckCircle2 className='h-4 w-4 flex-shrink-0 mt-0.5' />
							<span>Sharing on social media (Instagram, Facebook, etc.)</span>
						</li>
						<li className='flex items-start gap-2'>
							<CheckCircle2 className='h-4 w-4 flex-shrink-0 mt-0.5' />
							<span>You don't need transparency (transparent backgrounds)</span>
						</li>
					</ul>
				</div>

				<div className='bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6'>
					<h3 className='text-lg font-semibold text-green-900 dark:text-green-200 mb-3 flex items-center gap-2'>
						<ImageIcon className='h-5 w-5' />
						Choose PNG When:
					</h3>
					<ul className='text-sm text-green-800 dark:text-green-300 space-y-2'>
						<li className='flex items-start gap-2'>
							<CheckCircle2 className='h-4 w-4 flex-shrink-0 mt-0.5' />
							<span>PDF contains text, diagrams, or line art</span>
						</li>
						<li className='flex items-start gap-2'>
							<CheckCircle2 className='h-4 w-4 flex-shrink-0 mt-0.5' />
							<span>You need maximum quality with no compression artifacts</span>
						</li>
						<li className='flex items-start gap-2'>
							<CheckCircle2 className='h-4 w-4 flex-shrink-0 mt-0.5' />
							<span>You need transparency support</span>
						</li>
						<li className='flex items-start gap-2'>
							<CheckCircle2 className='h-4 w-4 flex-shrink-0 mt-0.5' />
							<span>File size isn't a concern</span>
						</li>
					</ul>
				</div>
			</div>

			<h2>Common Use Cases</h2>

			<p>People extract images from PDFs for many different purposes:</p>

			<div className='not-prose grid md:grid-cols-2 gap-6 my-8'>
				{commonUseCases.map((useCase, idx) => {
					const IconComponent = useCase.icon;
					return (
						<div
							key={idx}
							className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6'>
							<div className='flex items-start gap-4 mb-4'>
								<div className='p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex-shrink-0'>
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

			<h2>Platform-Specific Methods</h2>

			<p>
				Each operating system has built-in tools for extracting images from
				PDFs:
			</p>

			<div className='not-prose space-y-6 my-8'>
				<div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6'>
					<div className='flex items-center gap-3 mb-4'>
						<Monitor className='h-6 w-6 text-blue-600 dark:text-blue-400' />
						<h3 className='text-xl font-semibold text-gray-900 dark:text-white m-0'>
							Windows
						</h3>
					</div>
					<div className='space-y-3'>
						<div>
							<h4 className='font-semibold text-gray-900 dark:text-white mb-2'>
								Method 1: Screenshot Tool (Quick & Simple)
							</h4>
							<ol className='text-sm text-gray-600 dark:text-gray-400 list-decimal list-inside space-y-1 ml-2'>
								<li>Open the PDF in Edge, Chrome, or Adobe Reader</li>
								<li>
									Zoom to fit the page on screen (Ctrl+0 or 100% zoom)
								</li>
								<li>
									Press <strong>Windows + Shift + S</strong> for Snipping Tool
								</li>
								<li>Select the PDF page area to capture</li>
								<li>
									Click the notification, then save as JPG or PNG
								</li>
							</ol>
							<p className='text-sm text-gray-500 dark:text-gray-400 mt-2 italic'>
								Good for: Single pages, quick extractions
							</p>
						</div>

						<div>
							<h4 className='font-semibold text-gray-900 dark:text-white mb-2'>
								Method 2: Adobe Acrobat (Batch Export)
							</h4>
							<ol className='text-sm text-gray-600 dark:text-gray-400 list-decimal list-inside space-y-1 ml-2'>
								<li>Open PDF in Adobe Acrobat Pro</li>
								<li>
									Go to File → Export To → Image → JPG or PNG
								</li>
								<li>Choose quality settings</li>
								<li>Select folder and click Save</li>
							</ol>
							<p className='text-sm text-gray-500 dark:text-gray-400 mt-2 italic'>
								Good for: Professional work, batch processing
							</p>
						</div>
					</div>
				</div>

				<div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6'>
					<div className='flex items-center gap-3 mb-4'>
						<Apple className='h-6 w-6 text-gray-600 dark:text-gray-400' />
						<h3 className='text-xl font-semibold text-gray-900 dark:text-white m-0'>
							Mac
						</h3>
					</div>
					<div>
						<h4 className='font-semibold text-gray-900 dark:text-white mb-2'>
							Using Preview (Built-in)
						</h4>
						<ol className='text-sm text-gray-600 dark:text-gray-400 list-decimal list-inside space-y-1 ml-2'>
							<li>Open the PDF in Preview</li>
							<li>Go to File → Export</li>
							<li>
								Choose <strong>Format:</strong> JPG or PNG
							</li>
							<li>
								For multiple pages: Enable "Export All Images" checkbox
							</li>
							<li>Set quality/resolution if desired</li>
							<li>Click Save</li>
						</ol>
						<div className='mt-4 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg'>
							<p className='text-sm text-blue-800 dark:text-blue-200 mb-0 flex items-start gap-2'>
								<Zap className='h-4 w-4 flex-shrink-0 mt-0.5' />
								<span>
									<strong>Pro tip:</strong> To extract just specific pages,
									delete unwanted pages from the thumbnail sidebar before
									exporting.
								</span>
							</p>
						</div>
					</div>
				</div>

				<div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6'>
					<div className='flex items-center gap-3 mb-4'>
						<Smartphone className='h-6 w-6 text-green-600 dark:text-green-400' />
						<h3 className='text-xl font-semibold text-gray-900 dark:text-white m-0'>
							Mobile (iOS & Android)
						</h3>
					</div>
					<div className='space-y-3'>
						<div>
							<h4 className='font-semibold text-gray-900 dark:text-white mb-2'>
								iPhone & iPad
							</h4>
							<ul className='text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-2'>
								<li>
									• <strong>Screenshot:</strong> Open PDF, take screenshot
									(Side + Volume buttons), crop if needed
								</li>
								<li>
									• <strong>Safari:</strong> Use PDF Wonder Kit in mobile
									browser for batch conversion
								</li>
								<li>
									• <strong>Files app:</strong> Some PDF viewers allow "Export
									as Image"
								</li>
							</ul>
						</div>
						<div>
							<h4 className='font-semibold text-gray-900 dark:text-white mb-2'>
								Android
							</h4>
							<ul className='text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-2'>
								<li>
									• <strong>Screenshot:</strong> Power + Volume Down, then crop
								</li>
								<li>
									• <strong>Chrome browser:</strong> Use PDF Wonder Kit for
									batch conversion
								</li>
								<li>
									• <strong>PDF converter apps:</strong> Many free options on
									Play Store
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>

			<h2>Tips for Best Quality</h2>

			<div className='not-prose grid md:grid-cols-2 gap-6 my-8'>
				<div className='bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800'>
					<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-3'>
						Use High DPI Settings
					</h3>
					<p className='text-sm text-gray-600 dark:text-gray-400'>
						For professional use or printing, export at 300 DPI or higher. For
						web/screen use, 150 DPI is sufficient and creates smaller files.
					</p>
				</div>

				<div className='bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl border border-green-200 dark:border-green-800'>
					<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-3'>
						Choose the Right Format
					</h3>
					<p className='text-sm text-gray-600 dark:text-gray-400'>
						PNG for text/graphics/logos (crisp edges). JPG for photos and
						complex images (smaller files). Don't use JPG for text-heavy pages —
						it will look blurry.
					</p>
				</div>

				<div className='bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-xl border border-purple-200 dark:border-purple-800'>
					<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-3'>
						Batch Process for Efficiency
					</h3>
					<p className='text-sm text-gray-600 dark:text-gray-400'>
						If extracting many pages, use a tool that converts all pages at
						once. Don't screenshot 50 pages individually — use batch conversion
						to save time.
					</p>
				</div>

				<div className='bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-6 rounded-xl border border-amber-200 dark:border-amber-800'>
					<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-3'>
						Organize Output Files
					</h3>
					<p className='text-sm text-gray-600 dark:text-gray-400'>
						Name extracted images clearly (page_01.jpg, page_02.jpg) so you know
						what they are later. Many tools automatically number pages for you.
					</p>
				</div>
			</div>

			<h2>Troubleshooting Common Issues</h2>

			<div className='not-prose space-y-4 my-8'>
				<div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6'>
					<div className='flex items-start gap-3'>
						<AlertTriangle className='h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-1' />
						<div>
							<h3 className='font-semibold text-gray-900 dark:text-white mb-2'>
								Problem: Extracted images are blurry
							</h3>
							<p className='text-sm text-gray-600 dark:text-gray-400 mb-2'>
								<strong>Solution:</strong> Increase the DPI/resolution setting.
								Try 300 DPI instead of 72 DPI. Also, use PNG for text-heavy
								pages — JPG compression makes text fuzzy.
							</p>
						</div>
					</div>
				</div>

				<div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6'>
					<div className='flex items-start gap-3'>
						<AlertTriangle className='h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-1' />
						<div>
							<h3 className='font-semibold text-gray-900 dark:text-white mb-2'>
								Problem: File sizes are huge
							</h3>
							<p className='text-sm text-gray-600 dark:text-gray-400 mb-2'>
								<strong>Solution:</strong> You're probably using PNG at very
								high resolution. Switch to JPG for photos, or reduce the DPI
								from 300 to 150. For web use, 150 DPI JPG is perfect.
							</p>
						</div>
					</div>
				</div>

				<div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6'>
					<div className='flex items-start gap-3'>
						<AlertTriangle className='h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-1' />
						<div>
							<h3 className='font-semibold text-gray-900 dark:text-white mb-2'>
								Problem: PDF is password-protected
							</h3>
							<p className='text-sm text-gray-600 dark:text-gray-400 mb-2'>
								<strong>Solution:</strong> You'll need the password to extract
								images. Unlock the PDF first (if you have permission), then
								extract images from the unlocked copy.
							</p>
						</div>
					</div>
				</div>

				<div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6'>
					<div className='flex items-start gap-3'>
						<AlertTriangle className='h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-1' />
						<div>
							<h3 className='font-semibold text-gray-900 dark:text-white mb-2'>
								Problem: Colors look different in extracted images
							</h3>
							<p className='text-sm text-gray-600 dark:text-gray-400 mb-2'>
								<strong>Solution:</strong> This is usually a color profile
								issue. The PDF may use CMYK color (for printing) while your
								images are RGB (for screens). Convert to RGB after extraction
								using an image editor if needed.
							</p>
						</div>
					</div>
				</div>

				<div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6'>
					<div className='flex items-start gap-3'>
						<AlertTriangle className='h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-1' />
						<div>
							<h3 className='font-semibold text-gray-900 dark:text-white mb-2'>
								Problem: Can't extract certain embedded images
							</h3>
							<p className='text-sm text-gray-600 dark:text-gray-400 mb-2'>
								<strong>Solution:</strong> Some PDFs have images that are
								flattened or rasterized into the page. In this case, you're
								converting the entire page (including the image) rather than
								extracting the original image file. The result should still be
								fine.
							</p>
						</div>
					</div>
				</div>
			</div>

			<h2>Privacy & Security</h2>

			<p>
				When extracting images from sensitive PDFs, privacy matters:
			</p>

			<div className='not-prose grid md:grid-cols-2 gap-6 my-8'>
				<div className='bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6'>
					<div className='flex items-center gap-3 mb-4'>
						<Shield className='h-6 w-6 text-green-600 dark:text-green-400' />
						<h3 className='text-lg font-semibold text-gray-900 dark:text-white m-0'>
							✓ Safe Methods
						</h3>
					</div>
					<ul className='text-sm text-gray-600 dark:text-gray-400 space-y-2 mb-0'>
						<li className='flex items-start gap-2'>
							<CheckCircle2 className='h-4 w-4 text-green-600 mt-0.5 flex-shrink-0' />
							<span>
								Browser-based tools that process files locally (like PDF Wonder
								Kit)
							</span>
						</li>
						<li className='flex items-start gap-2'>
							<CheckCircle2 className='h-4 w-4 text-green-600 mt-0.5 flex-shrink-0' />
							<span>Desktop software (Adobe, Mac Preview, screenshot tools)</span>
						</li>
						<li className='flex items-start gap-2'>
							<CheckCircle2 className='h-4 w-4 text-green-600 mt-0.5 flex-shrink-0' />
							<span>Your PDF never leaves your device</span>
						</li>
					</ul>
				</div>

				<div className='bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6'>
					<div className='flex items-center gap-3 mb-4'>
						<AlertTriangle className='h-6 w-6 text-red-600 dark:text-red-400' />
						<h3 className='text-lg font-semibold text-gray-900 dark:text-white m-0'>
							⚠️ Privacy Risks
						</h3>
					</div>
					<ul className='text-sm text-gray-600 dark:text-gray-400 space-y-2 mb-0'>
						<li className='flex items-start gap-2'>
							<span className='text-red-500 flex-shrink-0 mt-0.5'>✗</span>
							<span>
								Uploading confidential PDFs to unknown online converters
							</span>
						</li>
						<li className='flex items-start gap-2'>
							<span className='text-red-500 flex-shrink-0 mt-0.5'>✗</span>
							<span>
								Tools that don't clearly state they process locally
							</span>
						</li>
						<li className='flex items-start gap-2'>
							<span className='text-red-500 flex-shrink-0 mt-0.5'>✗</span>
							<span>
								Using public computers for sensitive document extraction
							</span>
						</li>
					</ul>
				</div>
			</div>

			<h2>Frequently Asked Questions</h2>

			<div className='not-prose space-y-4 my-8'>
				<div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6'>
					<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
						Can I extract images at original quality?
					</h3>
					<p className='text-gray-600 dark:text-gray-400 text-sm mb-0'>
						Yes, but only if you extract at high DPI (300+) and use PNG format.
						However, the original image quality depends on how the PDF was
						created. If low-quality images were embedded, you can't improve
						them.
					</p>
				</div>

				<div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6'>
					<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
						What's the difference between extracting images and converting pages?
					</h3>
					<p className='text-gray-600 dark:text-gray-400 text-sm mb-0'>
						Converting pages turns the entire page (text, images, layout) into
						one image. Extracting images pulls out individual image files
						embedded in the PDF. Most "PDF to image" tools actually convert
						entire pages, which is what most people want.
					</p>
				</div>

				<div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6'>
					<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
						Can I do this on my phone?
					</h3>
					<p className='text-gray-600 dark:text-gray-400 text-sm mb-0'>
						Yes! Use PDF Wonder Kit in your mobile browser for batch conversion,
						or take screenshots for individual pages. iOS and Android both have
						built-in screenshot tools that work well for quick extractions.
					</p>
				</div>

				<div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6'>
					<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
						Will extracted images have the same dimensions as the PDF page?
					</h3>
					<p className='text-gray-600 dark:text-gray-400 text-sm mb-0'>
						Usually yes, but it depends on the DPI setting. Higher DPI creates
						larger pixel dimensions. For example, an 8.5"x11" page at 300 DPI
						becomes 2550x3300 pixels, while the same page at 150 DPI is
						1275x1650 pixels.
					</p>
				</div>

				<div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6'>
					<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
						Do I need special software to extract images?
					</h3>
					<p className='text-gray-600 dark:text-gray-400 text-sm mb-0'>
						No! Browser-based tools work great and require no installation. Mac
						Preview and Windows screenshot tools are also free and built-in.
						Adobe Acrobat Pro is only needed for advanced batch processing or
						professional work.
					</p>
				</div>

				<div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6'>
					<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
						Can I extract images from scanned PDFs?
					</h3>
					<p className='text-gray-600 dark:text-gray-400 text-sm mb-0'>
						Yes! Scanned PDFs are essentially image files in a PDF container, so
						they extract perfectly. The quality will match the original scan
						resolution.
					</p>
				</div>
			</div>

			<h2>Conclusion</h2>

			<p>
				Extracting images from PDFs is essential for social media sharing,
				presentations, web publishing, and image editing. With the right tools,
				it takes just seconds and produces high-quality results.
			</p>

			<p className='text-lg font-semibold'>
				<strong>Quick Summary:</strong>
			</p>

			<ul>
				<li>
					✓ <strong>Easy extraction</strong> — no technical skills needed
				</li>
				<li>
					✓ <strong>Two formats:</strong> JPG for photos, PNG for text/graphics
				</li>
				<li>
					✓ <strong>Free tools</strong> — browser-based or built-in system tools
				</li>
				<li>
					✓ <strong>Any device</strong> — works on desktop, tablet, and mobile
				</li>
				<li>
					✓ <strong>Privacy-focused</strong> — use local processing tools
				</li>
				<li>
					✓ <strong>High quality</strong> — set DPI appropriately for your use
					case
				</li>
			</ul>

			<p>
				For personal or sensitive documents, always use tools that process
				locally in your browser or desktop software. This ensures your PDFs
				never get uploaded to unknown servers.
			</p>

			<div className='not-prose bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-8 my-8 text-center'>
				<h3 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
					Extract Your First Images from PDF
				</h3>
				<p className='text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto'>
					Try PDF Wonder Kit's free PDF to image converter — upload your PDF,
					choose JPG or PNG, and download high-quality images. No signup
					required, completely private.
				</p>
				<Link
					href='/pdf-to-images'
					className='inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-lg'>
					Convert PDF to Images Free <ArrowRight className='w-5 h-5' />
				</Link>
			</div>
		</BlogLayout>
	);
}
