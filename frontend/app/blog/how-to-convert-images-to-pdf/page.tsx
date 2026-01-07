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
	Camera,
	FolderOpen,
	FileText,
	Download,
	ArrowRight,
	Receipt,
	BookOpen,
	Briefcase,
	Archive,
} from 'lucide-react';

const postData: BlogPost = {
	slug: 'how-to-convert-images-to-pdf',
	title: 'How to Convert JPG/PNG Images to PDF (Batch Conversion Guide)',
	description:
		'Convert photos and images to PDF in seconds. Create photo albums, digitize receipts, or merge scanned documents. Works with JPG, PNG, GIF, and WebP. Free and private.',
	date: '2026-01-06',
	readTime: '10 min read',
	category: 'Tutorials',
	author: 'PDF Wonder Kit Team',
	tags: [
		'jpg-to-pdf',
		'png-to-pdf',
		'convert-images-to-pdf',
		'photo-to-pdf',
		'image-converter',
	],
	featured: true,
	toolSlug: 'images-to-pdf',
	ctaTitle: 'Ready to Convert Your Images?',
	ctaDescription:
		'Turn any images into a PDF in seconds. Drag and drop JPG, PNG, GIF, or WebP files. Reorder pages, adjust size, download. 100% private — your files never leave your device.',
};

export const metadata: Metadata = {
	title: postData.title,
	description: postData.description,
	keywords: [
		'JPG to PDF',
		'PNG to PDF',
		'convert images to PDF',
		'photo to PDF',
		'picture to PDF',
		'image to PDF converter',
		'convert multiple images to PDF',
		'batch image to PDF',
		'combine images into PDF',
		'merge photos into PDF',
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
		title: 'Digital Photo Albums',
		icon: Camera,
		description:
			'Create shareable photo albums from vacation pictures, family events, or special occasions.',
		examples: [
			'Wedding photo book',
			'Vacation memories',
			'Baby photo album',
			'Portfolio presentation',
		],
	},
	{
		title: 'Receipt & Document Scanning',
		icon: Receipt,
		description:
			'Digitize paper receipts, business cards, or handwritten notes into organized PDF files.',
		examples: [
			'Expense receipts',
			'Business cards',
			'Handwritten notes',
			'Meeting whiteboards',
		],
	},
	{
		title: 'Professional Documents',
		icon: Briefcase,
		description:
			'Combine scanned pages into professional documents for work or business.',
		examples: [
			'Scanned contracts',
			'Invoice collections',
			'Product catalogs',
			'Presentation handouts',
		],
	},
	{
		title: 'Archiving & Storage',
		icon: Archive,
		description:
			'Convert old photos, documents, or artwork to PDF for long-term digital storage.',
		examples: [
			'Family photo archives',
			'Historical documents',
			'Artwork scans',
			'Magazine clippings',
		],
	},
];

const imageFormats = [
	{
		format: 'JPG/JPEG',
		description: 'Most common photo format from cameras and phones',
		pros: ['Small file size', 'Universal support', 'Good for photos'],
		cons: ['Lossy compression', 'No transparency'],
		bestFor: 'Photographs, camera images',
	},
	{
		format: 'PNG',
		description: 'High-quality format with transparency support',
		pros: [
			'Lossless compression',
			'Supports transparency',
			'Great quality',
		],
		cons: ['Larger file size', 'Slower loading'],
		bestFor: 'Screenshots, graphics, logos',
	},
	{
		format: 'GIF',
		description: 'Simple format supporting animation',
		pros: ['Small size', 'Supports animation', 'Good browser support'],
		cons: ['Limited colors (256)', 'Low quality'],
		bestFor: 'Simple graphics, animations',
	},
	{
		format: 'WebP',
		description: 'Modern web format with excellent compression',
		pros: ['Smaller than JPG', 'Better quality', 'Supports transparency'],
		cons: ['Limited older software support'],
		bestFor: 'Web images, modern photos',
	},
];

export default function ConvertImagesToPDFPost() {
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
							Converting images to PDF is simple: upload your JPG, PNG, GIF, or
							WebP files to a converter tool, arrange them in order, and
							download as a single PDF. No software installation needed — works
							in any browser with complete privacy.
						</p>
						<Link
							href='/images-to-pdf'
							className='inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors'>
							Convert Images to PDF Free →
						</Link>
					</div>
				</div>
			</div>

			<p className='text-xl text-gray-700 dark:text-gray-300 leading-relaxed'>
				Have a collection of photos or scanned documents sitting as separate
				image files? Converting them to PDF makes them easier to share, print,
				and organize. A single PDF is simpler to email than 10 individual image
				attachments, and it preserves your page order perfectly.
			</p>

			<p>
				This guide shows you exactly how to convert images to PDF on any device,
				explains which tools work best, and covers every format from JPG to PNG
				to WebP. Whether you're creating a photo album, digitizing receipts, or
				compiling scanned documents, you'll learn the easiest way to do it.
			</p>

			<h2>Why Convert Images to PDF?</h2>

			<p>
				PDFs offer several advantages over keeping images as separate files:
			</p>

			<div className='not-prose space-y-4 my-8'>
				<div className='flex items-start gap-3 bg-green-50 dark:bg-green-900/20 p-4 rounded-lg'>
					<CheckCircle2 className='h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5' />
					<div>
						<h3 className='font-semibold text-gray-900 dark:text-white mb-1'>
							Easier to Share
						</h3>
						<p className='text-sm text-gray-600 dark:text-gray-400 mb-0'>
							Email one PDF file instead of 20 separate photos. Recipients get
							a single, organized document instead of a cluttered inbox.
						</p>
					</div>
				</div>

				<div className='flex items-start gap-3 bg-green-50 dark:bg-green-900/20 p-4 rounded-lg'>
					<CheckCircle2 className='h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5' />
					<div>
						<h3 className='font-semibold text-gray-900 dark:text-white mb-1'>
							Preserves Page Order
						</h3>
						<p className='text-sm text-gray-600 dark:text-gray-400 mb-0'>
							Images can get shuffled when transferring between devices. PDFs
							keep your pages in the exact order you want, guaranteed.
						</p>
					</div>
				</div>

				<div className='flex items-start gap-3 bg-green-50 dark:bg-green-900/20 p-4 rounded-lg'>
					<CheckCircle2 className='h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5' />
					<div>
						<h3 className='font-semibold text-gray-900 dark:text-white mb-1'>
							Universal Compatibility
						</h3>
						<p className='text-sm text-gray-600 dark:text-gray-400 mb-0'>
							Everyone can open a PDF — on phones, tablets, computers, or print
							shops. No compatibility issues with different image viewers.
						</p>
					</div>
				</div>

				<div className='flex items-start gap-3 bg-green-50 dark:bg-green-900/20 p-4 rounded-lg'>
					<CheckCircle2 className='h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5' />
					<div>
						<h3 className='font-semibold text-gray-900 dark:text-white mb-1'>
							Professional Appearance
						</h3>
						<p className='text-sm text-gray-600 dark:text-gray-400 mb-0'>
							A well-formatted PDF looks more professional than loose image
							files. Perfect for portfolios, presentations, or business
							documents.
						</p>
					</div>
				</div>

				<div className='flex items-start gap-3 bg-green-50 dark:bg-green-900/20 p-4 rounded-lg'>
					<CheckCircle2 className='h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5' />
					<div>
						<h3 className='font-semibold text-gray-900 dark:text-white mb-1'>
							Better for Printing
						</h3>
						<p className='text-sm text-gray-600 dark:text-gray-400 mb-0'>
							Print shops prefer PDFs. Your document prints consistently across
							any printer, unlike images which can have sizing issues.
						</p>
					</div>
				</div>

				<div className='flex items-start gap-3 bg-green-50 dark:bg-green-900/20 p-4 rounded-lg'>
					<CheckCircle2 className='h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5' />
					<div>
						<h3 className='font-semibold text-gray-900 dark:text-white mb-1'>
							Smaller File Size
						</h3>
						<p className='text-sm text-gray-600 dark:text-gray-400 mb-0'>
							A PDF with 50 photos is often smaller than 50 separate JPG files
							thanks to efficient compression and file structure.
						</p>
					</div>
				</div>
			</div>

			<h2>How to Convert Images to PDF (Step by Step)</h2>

			<p>
				The easiest method is using a browser-based converter that keeps your
				files private. Here's exactly how:
			</p>

			<div className='not-prose bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-8 rounded-2xl border-2 border-blue-200 dark:border-blue-800 mb-8'>
				<h3 className='text-xl font-bold text-gray-900 dark:text-white mb-6'>
					Using PDF Wonder Kit's Free Image to PDF Converter
				</h3>

				<div className='space-y-4'>
					<div className='flex items-start gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg'>
						<div className='flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-bold flex-shrink-0'>
							1
						</div>
						<div>
							<p className='font-semibold text-gray-900 dark:text-white mb-1'>
								Open the Image to PDF Converter
							</p>
							<p className='text-gray-700 dark:text-gray-300 text-sm'>
								Visit{' '}
								<Link
									href='/images-to-pdf'
									className='text-blue-600 hover:underline'>
									pdfwonderkit.com/images-to-pdf
								</Link>{' '}
								in any modern browser. Works on Windows, Mac, Linux, tablets,
								and phones.
							</p>
						</div>
					</div>

					<div className='flex items-start gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg'>
						<div className='flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-bold flex-shrink-0'>
							2
						</div>
						<div>
							<p className='font-semibold text-gray-900 dark:text-white mb-1'>
								Upload Your Images
							</p>
							<p className='text-gray-700 dark:text-gray-300 text-sm'>
								Drag and drop all your images at once, or click to browse.
								Supports JPG, PNG, GIF, WebP, and HEIC. Upload as many images
								as you need.{' '}
								<strong className='text-blue-600'>
									Your files stay on your device
								</strong>{' '}
								— nothing is uploaded to any server.
							</p>
						</div>
					</div>

					<div className='flex items-start gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg'>
						<div className='flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-bold flex-shrink-0'>
							3
						</div>
						<div>
							<p className='font-semibold text-gray-900 dark:text-white mb-1'>
								Arrange Your Images
							</p>
							<p className='text-gray-700 dark:text-gray-300 text-sm'>
								Drag images to reorder them. The order you arrange them is the
								order they'll appear in the PDF. You can also remove any images
								you don't want.
							</p>
						</div>
					</div>

					<div className='flex items-start gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg'>
						<div className='flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-bold flex-shrink-0'>
							4
						</div>
						<div>
							<p className='font-semibold text-gray-900 dark:text-white mb-1'>
								Choose Page Size (Optional)
							</p>
							<p className='text-gray-700 dark:text-gray-300 text-sm'>
								Select Letter, A4, or auto-fit. For photos, auto-fit usually
								works best. For scanned documents, choose the standard size for
								your region (Letter in US, A4 elsewhere).
							</p>
						</div>
					</div>

					<div className='flex items-start gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg'>
						<div className='flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-bold flex-shrink-0'>
							5
						</div>
						<div>
							<p className='font-semibold text-gray-900 dark:text-white mb-1'>
								Set Image Quality (Optional)
							</p>
							<p className='text-gray-700 dark:text-gray-300 text-sm'>
								Choose between high quality (larger file) or compressed (smaller
								file). For photos you want to print, use high quality. For email
								or web sharing, compressed is fine.
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
								Click "Create PDF" and wait a few seconds. Download your PDF
								when ready. The conversion happens instantly in your browser.
							</p>
						</div>
					</div>
				</div>

				<div className='mt-6 p-4 bg-green-100 dark:bg-green-900/30 rounded-lg'>
					<p className='text-sm text-green-800 dark:text-green-300 flex items-center gap-2 mb-0'>
						<Shield className='h-4 w-4' />
						<strong>Total time: 30-60 seconds.</strong> No software to
						install, no account needed.
					</p>
				</div>
			</div>

			<h2>Supported Image Formats</h2>

			<p>
				Different image formats work best for different purposes. Here's what
				you need to know:
			</p>

			<div className='not-prose space-y-6 my-8'>
				{imageFormats.map((format, idx) => (
					<div
						key={idx}
						className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6'>
						<div className='flex items-start gap-4 mb-4'>
							<div className='p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex-shrink-0'>
								<ImageIcon className='h-6 w-6 text-white' />
							</div>
							<div className='flex-1'>
								<h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-1'>
									{format.format}
								</h3>
								<p className='text-sm text-gray-600 dark:text-gray-400 mb-4'>
									{format.description}
								</p>

								<div className='grid md:grid-cols-2 gap-4 mb-4'>
									<div className='bg-green-50 dark:bg-green-900/20 p-4 rounded-lg'>
										<h4 className='font-semibold text-green-900 dark:text-green-200 mb-2 text-sm'>
											✓ Pros
										</h4>
										<ul className='text-sm text-green-800 dark:text-green-300 space-y-1'>
											{format.pros.map((pro, i) => (
												<li key={i}>• {pro}</li>
											))}
										</ul>
									</div>

									<div className='bg-red-50 dark:bg-red-900/20 p-4 rounded-lg'>
										<h4 className='font-semibold text-red-900 dark:text-red-200 mb-2 text-sm'>
											✗ Cons
										</h4>
										<ul className='text-sm text-red-800 dark:text-red-300 space-y-1'>
											{format.cons.map((con, i) => (
												<li key={i}>• {con}</li>
											))}
										</ul>
									</div>
								</div>

								<p className='text-sm text-gray-600 dark:text-gray-400'>
									<strong>Best for:</strong> {format.bestFor}
								</p>
							</div>
						</div>
					</div>
				))}
			</div>

			<h2>Common Use Cases</h2>

			<p>
				People convert images to PDF for countless reasons. Here are the most
				popular:
			</p>

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

			<h2>Platform-Specific Instructions</h2>

			<p>
				Each operating system has its own built-in tools for converting images.
				Here's how:
			</p>

			<div className='not-prose space-y-6 my-8'>
				<div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6'>
					<div className='flex items-center gap-3 mb-4'>
						<Monitor className='h-6 w-6 text-blue-600 dark:text-blue-400' />
						<h3 className='text-xl font-semibold text-gray-900 dark:text-white m-0'>
							Windows 10/11
						</h3>
					</div>
					<div className='space-y-3'>
						<div>
							<h4 className='font-semibold text-gray-900 dark:text-white mb-2'>
								Method 1: Microsoft Print to PDF
							</h4>
							<ol className='text-sm text-gray-600 dark:text-gray-400 list-decimal list-inside space-y-1 ml-2'>
								<li>Open your images in Windows Photos app</li>
								<li>
									Select all images you want (Ctrl+A or click multiple)
								</li>
								<li>
									Go to Print (Ctrl+P) or right-click → Print
								</li>
								<li>
									Select <strong>Microsoft Print to PDF</strong> as printer
								</li>
								<li>Click Print and choose save location</li>
							</ol>
							<p className='text-sm text-amber-700 dark:text-amber-300 mt-2 flex items-start gap-2'>
								<AlertTriangle className='h-4 w-4 flex-shrink-0 mt-0.5' />
								<span>
									Limitation: Can only process images that are open together. For
									large batches, use a dedicated tool.
								</span>
							</p>
						</div>

						<div>
							<h4 className='font-semibold text-gray-900 dark:text-white mb-2'>
								Method 2: Adobe Acrobat (Paid)
							</h4>
							<ol className='text-sm text-gray-600 dark:text-gray-400 list-decimal list-inside space-y-1 ml-2'>
								<li>Open Adobe Acrobat Pro</li>
								<li>
									Go to Tools → Create PDF → Multiple Files
								</li>
								<li>Add all your images</li>
								<li>Arrange order and click Create</li>
								<li>Save your PDF</li>
							</ol>
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
							Using Preview (Built-in, Free)
						</h4>
						<ol className='text-sm text-gray-600 dark:text-gray-400 list-decimal list-inside space-y-1 ml-2'>
							<li>Select all images in Finder</li>
							<li>Right-click → Open With → Preview</li>
							<li>
								In Preview, select all thumbnails in sidebar (Command+A)
							</li>
							<li>
								Go to File → Print Selected Images
							</li>
							<li>
								Click the PDF dropdown in print dialog → Save as PDF
							</li>
							<li>Choose save location and click Save</li>
						</ol>
						<div className='mt-4 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg'>
							<p className='text-sm text-blue-800 dark:text-blue-200 mb-0 flex items-start gap-2'>
								<Zap className='h-4 w-4 flex-shrink-0 mt-0.5' />
								<span>
									<strong>Pro tip:</strong> You can also drag images into an
									empty PDF in Preview, then save. This gives you more control
									over page order.
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
									• <strong>Photos app:</strong> Select images → Share → Print
									→ Pinch out on preview → Save to Files as PDF
								</li>
								<li>
									• <strong>Files app:</strong> Select images → More → Create
									PDF
								</li>
								<li>
									• <strong>Safari:</strong> Use PDF Wonder Kit in mobile
									browser
								</li>
							</ul>
						</div>
						<div>
							<h4 className='font-semibold text-gray-900 dark:text-white mb-2'>
								Android
							</h4>
							<ul className='text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-2'>
								<li>
									• <strong>Chrome browser:</strong> Use PDF Wonder Kit
								</li>
								<li>
									• <strong>Image to PDF Converter app:</strong> Free app on
									Play Store
								</li>
								<li>
									• <strong>Adobe Scan:</strong> Free, works great for
									documents
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>

			<h2>Batch Conversion: Converting Many Images at Once</h2>

			<p>
				Need to convert dozens or hundreds of images? Here's how to do it
				efficiently:
			</p>

			<div className='not-prose bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-8 rounded-2xl border-2 border-purple-200 dark:border-purple-800 my-8'>
				<h3 className='text-xl font-bold text-gray-900 dark:text-white mb-4'>
					Best Practices for Batch Conversion
				</h3>

				<div className='space-y-4'>
					<div className='flex items-start gap-3'>
						<CheckCircle2 className='h-5 w-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5' />
						<div>
							<h4 className='font-semibold text-gray-900 dark:text-white mb-1'>
								Name Files Sequentially
							</h4>
							<p className='text-sm text-gray-600 dark:text-gray-400 mb-0'>
								Rename your images with numbers (001.jpg, 002.jpg, etc.) before
								converting. This ensures they're in the correct order when
								uploaded.
							</p>
						</div>
					</div>

					<div className='flex items-start gap-3'>
						<CheckCircle2 className='h-5 w-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5' />
						<div>
							<h4 className='font-semibold text-gray-900 dark:text-white mb-1'>
								Use Consistent Resolution
							</h4>
							<p className='text-sm text-gray-600 dark:text-gray-400 mb-0'>
								If possible, ensure all images have the same resolution (300 DPI
								for print, 72-150 DPI for screen). This creates more consistent
								page sizes.
							</p>
						</div>
					</div>

					<div className='flex items-start gap-3'>
						<CheckCircle2 className='h-5 w-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5' />
						<div>
							<h4 className='font-semibold text-gray-900 dark:text-white mb-1'>
								Consider Compression
							</h4>
							<p className='text-sm text-gray-600 dark:text-gray-400 mb-0'>
								For large batches (50+ images), use compression to keep the
								final PDF size manageable. A 200-page photo book at high quality
								could be 500MB+.
							</p>
						</div>
					</div>

					<div className='flex items-start gap-3'>
						<CheckCircle2 className='h-5 w-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5' />
						<div>
							<h4 className='font-semibold text-gray-900 dark:text-white mb-1'>
								Split Into Multiple PDFs
							</h4>
							<p className='text-sm text-gray-600 dark:text-gray-400 mb-0'>
								Very large batches (100+ images) work better as multiple smaller
								PDFs. Create separate PDFs for chapters, sections, or date
								ranges.
							</p>
						</div>
					</div>
				</div>
			</div>

			<h2>Tips for Better Results</h2>

			<div className='not-prose grid md:grid-cols-2 gap-6 my-8'>
				<div className='bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800'>
					<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-3'>
						Crop Before Converting
					</h3>
					<p className='text-sm text-gray-600 dark:text-gray-400'>
						Remove unwanted edges, borders, or empty space from images before
						converting. This makes your PDF look cleaner and professional.
					</p>
				</div>

				<div className='bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl border border-green-200 dark:border-green-800'>
					<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-3'>
						Consistent Orientation
					</h3>
					<p className='text-sm text-gray-600 dark:text-gray-400'>
						Rotate images to the same orientation (all portrait or all
						landscape) before converting. Mixed orientations can look awkward in
						the final PDF.
					</p>
				</div>

				<div className='bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-xl border border-purple-200 dark:border-purple-800'>
					<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-3'>
						Optimize Image Size First
					</h3>
					<p className='text-sm text-gray-600 dark:text-gray-400'>
						If images are from a high-end camera (6000x4000 pixels), resize them
						to 1920x1280 for screen viewing or 3000x2000 for printing. This
						dramatically reduces PDF file size.
					</p>
				</div>

				<div className='bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-6 rounded-xl border border-amber-200 dark:border-amber-800'>
					<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-3'>
						Add Metadata
					</h3>
					<p className='text-sm text-gray-600 dark:text-gray-400'>
						After creating your PDF, add title, author, and keywords using a
						metadata editor. This helps with organization and searchability.
					</p>
				</div>

				<div className='bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 p-6 rounded-xl border border-red-200 dark:border-red-800'>
					<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-3'>
						Use Descriptive Filenames
					</h3>
					<p className='text-sm text-gray-600 dark:text-gray-400'>
						Name your PDF something meaningful like
						"Wedding_Photos_June2026.pdf" instead of "PDF_20260106.pdf". You'll
						thank yourself later when searching for files.
					</p>
				</div>

				<div className='bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 p-6 rounded-xl border border-teal-200 dark:border-teal-800'>
					<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-3'>
						Keep Original Images
					</h3>
					<p className='text-sm text-gray-600 dark:text-gray-400'>
						Don't delete your original images after converting. PDFs compress
						images, so you can't get the original full-resolution file back
						later.
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
								Problem: PDF file is huge (100MB+)
							</h3>
							<p className='text-sm text-gray-600 dark:text-gray-400 mb-2'>
								<strong>Solution:</strong> Your images are probably high
								resolution from a camera. Resize them to smaller dimensions
								before converting, or use the compression option in your
								converter tool. For screen viewing, 1920x1280 is plenty.
							</p>
						</div>
					</div>
				</div>

				<div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6'>
					<div className='flex items-start gap-3'>
						<AlertTriangle className='h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-1' />
						<div>
							<h3 className='font-semibold text-gray-900 dark:text-white mb-2'>
								Problem: Images are in wrong order
							</h3>
							<p className='text-sm text-gray-600 dark:text-gray-400 mb-2'>
								<strong>Solution:</strong> Rename your files with sequential
								numbers before uploading (001.jpg, 002.jpg, etc.). Or use a tool
								with drag-and-drop reordering like PDF Wonder Kit.
							</p>
						</div>
					</div>
				</div>

				<div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6'>
					<div className='flex items-start gap-3'>
						<AlertTriangle className='h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-1' />
						<div>
							<h3 className='font-semibold text-gray-900 dark:text-white mb-2'>
								Problem: Images look blurry in PDF
							</h3>
							<p className='text-sm text-gray-600 dark:text-gray-400 mb-2'>
								<strong>Solution:</strong> The tool probably compressed them too
								aggressively. Use the "high quality" setting, or try a different
								converter. For printing, you need at least 300 DPI images.
							</p>
						</div>
					</div>
				</div>

				<div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6'>
					<div className='flex items-start gap-3'>
						<AlertTriangle className='h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-1' />
						<div>
							<h3 className='font-semibold text-gray-900 dark:text-white mb-2'>
								Problem: Some image formats won't upload
							</h3>
							<p className='text-sm text-gray-600 dark:text-gray-400 mb-2'>
								<strong>Solution:</strong> Convert unsupported formats (TIFF,
								BMP, RAW) to JPG or PNG first using your system's image editor
								or an online converter. Most PDF converters only support common
								web formats.
							</p>
						</div>
					</div>
				</div>

				<div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6'>
					<div className='flex items-start gap-3'>
						<AlertTriangle className='h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-1' />
						<div>
							<h3 className='font-semibold text-gray-900 dark:text-white mb-2'>
								Problem: PDF pages are different sizes
							</h3>
							<p className='text-sm text-gray-600 dark:text-gray-400 mb-2'>
								<strong>Solution:</strong> This happens when your images have
								different aspect ratios. Either crop all images to the same
								dimensions first, or choose a page size option that fits
								everything to one standard size.
							</p>
						</div>
					</div>
				</div>
			</div>

			<h2>Security & Privacy</h2>

			<p>
				When converting personal photos or sensitive documents, choose tools
				that protect your privacy:
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
							<span>
								Desktop software (Adobe, Mac Preview, Windows Print to PDF)
							</span>
						</li>
						<li className='flex items-start gap-2'>
							<CheckCircle2 className='h-4 w-4 text-green-600 mt-0.5 flex-shrink-0' />
							<span>Mobile apps that process locally (Files app on iOS)</span>
						</li>
						<li className='flex items-start gap-2'>
							<CheckCircle2 className='h-4 w-4 text-green-600 mt-0.5 flex-shrink-0' />
							<span>Your images never leave your device</span>
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
								Uploading personal photos to unknown online converters
							</span>
						</li>
						<li className='flex items-start gap-2'>
							<span className='text-red-500 flex-shrink-0 mt-0.5'>✗</span>
							<span>
								Tools that require account creation just to convert images
							</span>
						</li>
						<li className='flex items-start gap-2'>
							<span className='text-red-500 flex-shrink-0 mt-0.5'>✗</span>
							<span>Services with vague "we may use your files" policies</span>
						</li>
						<li className='flex items-start gap-2'>
							<span className='text-red-500 flex-shrink-0 mt-0.5'>✗</span>
							<span>
								Converting sensitive documents (IDs, financial docs) on public
								computers
							</span>
						</li>
					</ul>
				</div>
			</div>

			<h2>Frequently Asked Questions</h2>

			<div className='not-prose space-y-4 my-8'>
				<div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6'>
					<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
						Can I convert HEIC images from iPhone to PDF?
					</h3>
					<p className='text-gray-600 dark:text-gray-400 text-sm mb-0'>
						Yes! Most modern PDF converters support HEIC (iPhone's default photo
						format). If not, you can convert HEIC to JPG first using free online
						converters or your Mac's Preview app.
					</p>
				</div>

				<div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6'>
					<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
						How many images can I convert to one PDF?
					</h3>
					<p className='text-gray-600 dark:text-gray-400 text-sm mb-0'>
						Technically unlimited, but practically it depends on file size. Most
						tools can handle 50-100 images easily. For larger batches, consider
						splitting into multiple PDFs or using compression to keep file size
						manageable (under 50MB for easy sharing).
					</p>
				</div>

				<div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6'>
					<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
						Will converting to PDF reduce image quality?
					</h3>
					<p className='text-gray-600 dark:text-gray-400 text-sm mb-0'>
						It depends on the compression settings. Using "high quality" mode
						preserves almost all detail. Using "compressed" mode reduces quality
						slightly but makes files much smaller. For printing, always use high
						quality. For web sharing, compressed is usually fine.
					</p>
				</div>

				<div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6'>
					<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
						Can I edit the PDF after converting images?
					</h3>
					<p className='text-gray-600 dark:text-gray-400 text-sm mb-0'>
						Yes! You can reorder pages, delete pages, add more images, rotate
						pages, or even add text annotations. Use a PDF editor or organizer
						tool after creation to make changes.
					</p>
				</div>

				<div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6'>
					<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
						What's the best format for scanned documents?
					</h3>
					<p className='text-gray-600 dark:text-gray-400 text-sm mb-0'>
						For scanned documents (receipts, forms, etc.), use JPG at 300 DPI
						and black & white if possible. This gives good text clarity while
						keeping file size small. PNG works too but creates larger files.
					</p>
				</div>

				<div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6'>
					<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
						Can I convert images to PDF on my phone?
					</h3>
					<p className='text-gray-600 dark:text-gray-400 text-sm mb-0'>
						Absolutely! iOS has built-in functionality in the Files and Photos
						apps. Android users can use PDF Wonder Kit in Chrome or download
						free converter apps from the Play Store. Works great on tablets too.
					</p>
				</div>
			</div>

			<h2>Conclusion</h2>

			<p>
				Converting images to PDF is one of the most useful file operations you
				can learn. Whether you're creating photo albums, digitizing receipts, or
				compiling scanned documents, the process takes just seconds with the
				right tools.
			</p>

			<p className='text-lg font-semibold'>
				<strong>Quick Summary:</strong>
			</p>

			<ul>
				<li>
					✓ <strong>Free tools available</strong> — no need to pay for software
				</li>
				<li>
					✓ <strong>Works with all formats</strong> — JPG, PNG, GIF, WebP, HEIC
				</li>
				<li>
					✓ <strong>Batch conversion</strong> — convert hundreds of images at
					once
				</li>
				<li>
					✓ <strong>Any device</strong> — works on computer, tablet, and phone
				</li>
				<li>
					✓ <strong>Privacy-focused</strong> — use tools that process locally
				</li>
				<li>
					✓ <strong>Professional results</strong> — perfect for printing or
					sharing
				</li>
			</ul>

			<p>
				The key is choosing a tool that respects your privacy. For personal
				photos and sensitive documents, always use browser-based converters that
				process files locally, or desktop software. Never upload private images
				to unknown online services.
			</p>

			<div className='not-prose bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-8 my-8 text-center'>
				<h3 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
					Convert Your First Images to PDF
				</h3>
				<p className='text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto'>
					Try PDF Wonder Kit's free image to PDF converter — upload any images,
					arrange them in order, and download as a single PDF. No signup
					required, completely private.
				</p>
				<Link
					href='/images-to-pdf'
					className='inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-lg'>
					Convert Images to PDF Free <ArrowRight className='w-5 h-5' />
				</Link>
			</div>
		</BlogLayout>
	);
}
