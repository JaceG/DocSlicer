import { Metadata } from 'next';
import Link from 'next/link';
import { BlogLayout, BlogPost } from '@/components/blog/BlogLayout';
import {
	Code,
	CheckCircle2,
	Zap,
	Shield,
	AlertTriangle,
	Monitor,
	Globe,
	FileText,
	Image as ImageIcon,
	Download,
	ArrowRight,
	Palette,
	FileCode,
	Share2,
	Search,
	Smartphone,
	Database,
} from 'lucide-react';

const postData: BlogPost = {
	slug: 'how-to-convert-pdf-to-html',
	title: 'How to Convert PDF to HTML (Complete Guide 2026)',
	description:
		'Convert PDF documents to clean, responsive HTML with extracted text and images. Learn the best methods, tools, and tips for creating web-ready content from PDFs.',
	date: '2026-01-08',
	readTime: '11 min read',
	category: 'Tutorials',
	author: 'PDF Wonder Kit Team',
	tags: [
		'pdf-to-html',
		'convert-pdf',
		'html-conversion',
		'web-content',
		'extract-text',
	],
	featured: true,
	toolSlug: 'pdf-to-html',
	ctaTitle: 'Ready to Convert Your PDF to HTML?',
	ctaDescription:
		'Transform any PDF into clean, responsive HTML with text and images. Choose from 4 beautiful themes. 100% private — your files never leave your device.',
};

export const metadata: Metadata = {
	title: postData.title,
	description: postData.description,
	keywords: [
		'PDF to HTML',
		'convert PDF to HTML',
		'PDF to web page',
		'extract text from PDF',
		'PDF HTML converter',
		'PDF to HTML online',
		'convert PDF to website',
		'PDF text extraction',
		'PDF to responsive HTML',
		'make PDF searchable online',
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
const methodComparison = [
	{
		method: 'PDF Wonder Kit',
		textExtraction: 'Excellent',
		imageHandling: 'Embedded or Separate',
		styling: '4 Themes',
		privacy: 'Files never uploaded',
		cost: 'Free',
		recommended: true,
	},
	{
		method: 'Adobe Acrobat Pro',
		textExtraction: 'Excellent',
		imageHandling: 'Embedded only',
		styling: 'Basic',
		privacy: 'Local processing',
		cost: '$22.99/month',
		recommended: false,
	},
	{
		method: 'Online converters',
		textExtraction: 'Good',
		imageHandling: 'Varies',
		styling: 'None',
		privacy: 'Files uploaded to servers',
		cost: 'Free with limits',
		recommended: false,
	},
	{
		method: 'Python/PyMuPDF',
		textExtraction: 'Excellent',
		imageHandling: 'Manual coding',
		styling: 'Custom',
		privacy: 'Local',
		cost: 'Free (technical)',
		recommended: false,
	},
];

export default function BlogPostPage() {
	return (
		<BlogLayout post={postData}>
			{/* Introduction */}
			<p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8">
				Need to convert a PDF document into a web page? Whether you're archiving documents, 
				making content searchable online, or repurposing PDF content for your website, 
				converting PDF to HTML is the solution. This guide shows you how to do it properly — 
				with text extraction, image preservation, and beautiful styling.
			</p>

			{/* Quick Summary Box */}
			<div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border border-orange-200 dark:border-orange-800 rounded-xl p-6 mb-8">
				<h3 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
					<Zap className="h-5 w-5 text-orange-500" />
					Quick Answer
				</h3>
				<p className="text-gray-700 dark:text-gray-300 mb-4">
					The fastest way to convert PDF to HTML: Use{' '}
					<Link href="/pdf-to-html" className="text-orange-600 dark:text-orange-400 font-medium hover:underline">
						PDF Wonder Kit's PDF to HTML Converter
					</Link>. 
					Upload your PDF, choose your settings (theme, image handling, text extraction), 
					and download a beautifully formatted HTML file — all processed locally in your browser.
				</p>
				<Link
					href="/pdf-to-html"
					className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-medium hover:from-orange-600 hover:to-red-600 transition-colors"
				>
					Convert PDF to HTML Now <ArrowRight className="h-4 w-4" />
				</Link>
			</div>

			{/* Why Convert Section */}
			<h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">
				Why Convert PDF to HTML?
			</h2>
			
			<p className="mb-6">
				PDFs are great for preserving document formatting, but they have limitations. 
				HTML offers advantages that PDFs simply can't match:
			</p>

			<div className="grid md:grid-cols-2 gap-4 mb-8">
				{[
					{
						icon: Search,
						title: 'SEO & Searchability',
						description: 'HTML content is indexed by search engines. Your PDF content becomes discoverable.',
					},
					{
						icon: Smartphone,
						title: 'Responsive Design',
						description: 'HTML adapts to any screen size. No more pinching and zooming on mobile.',
					},
					{
						icon: Globe,
						title: 'Web Integration',
						description: 'Embed directly in websites, blogs, or web apps without plugins or viewers.',
					},
					{
						icon: Database,
						title: 'Content Extraction',
						description: 'Extract text and images for reuse, archiving, or content management systems.',
					},
				].map((item, i) => (
					<div
						key={i}
						className="flex gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
					>
						<div className="flex-shrink-0">
							<item.icon className="h-6 w-6 text-orange-500" />
						</div>
						<div>
							<h4 className="font-semibold text-gray-900 dark:text-white">
								{item.title}
							</h4>
							<p className="text-sm text-gray-600 dark:text-gray-400">
								{item.description}
							</p>
						</div>
					</div>
				))}
			</div>

			{/* Step by Step Guide */}
			<h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">
				How to Convert PDF to HTML (Step-by-Step)
			</h2>

			<div className="space-y-6 mb-8">
				{[
					{
						step: 1,
						title: 'Upload Your PDF',
						description: 'Drag and drop your PDF file or click to browse. The file stays on your device — nothing is uploaded to any server.',
					},
					{
						step: 2,
						title: 'Choose Your Settings',
						description: 'Select output format (single HTML file or ZIP with images folder), theme (Modern, Classic, Minimal, or Dark), and image extraction options.',
					},
					{
						step: 3,
						title: 'Configure Image Handling',
						description: 'Choose to render full pages as images, extract embedded images only, or both. Adjust quality and format (PNG, JPG, WebP).',
					},
					{
						step: 4,
						title: 'Convert & Download',
						description: 'Click convert and watch the progress. Preview your HTML before downloading, then save as a single file or ZIP package.',
					},
				].map((item) => (
					<div
						key={item.step}
						className="flex gap-4 p-5 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm"
					>
						<div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-500 text-white flex items-center justify-center font-bold">
							{item.step}
						</div>
						<div>
							<h4 className="font-semibold text-gray-900 dark:text-white mb-1">
								{item.title}
							</h4>
							<p className="text-gray-600 dark:text-gray-400">
								{item.description}
							</p>
						</div>
					</div>
				))}
			</div>

			{/* Output Options */}
			<h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">
				Output Options Explained
			</h2>

			<div className="grid md:grid-cols-2 gap-6 mb-8">
				<div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
					<div className="flex items-center gap-3 mb-4">
						<div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
							<FileCode className="h-6 w-6 text-orange-600 dark:text-orange-400" />
						</div>
						<h3 className="text-lg font-bold text-gray-900 dark:text-white">
							Single HTML File
						</h3>
					</div>
					<p className="text-gray-600 dark:text-gray-400 mb-4">
						All images are embedded as base64 data URIs directly in the HTML. 
						One self-contained file that works anywhere.
					</p>
					<ul className="space-y-2">
						{['Easy to share and email', 'No external dependencies', 'Works offline', 'Larger file size'].map((item, i) => (
							<li key={i} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
								<CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
								{item}
							</li>
						))}
					</ul>
				</div>

				<div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
					<div className="flex items-center gap-3 mb-4">
						<div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
							<Download className="h-6 w-6 text-orange-600 dark:text-orange-400" />
						</div>
						<h3 className="text-lg font-bold text-gray-900 dark:text-white">
							ZIP Package
						</h3>
					</div>
					<p className="text-gray-600 dark:text-gray-400 mb-4">
						HTML file with a separate images folder. Better for websites 
						and when you need to edit images separately.
					</p>
					<ul className="space-y-2">
						{['Smaller HTML file', 'Edit images separately', 'Better for websites', 'Multiple files to manage'].map((item, i) => (
							<li key={i} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
								<CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
								{item}
							</li>
						))}
					</ul>
				</div>
			</div>

			{/* Theme Showcase */}
			<h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">
				4 Beautiful HTML Themes
			</h2>

			<p className="mb-6">
				Your converted HTML doesn't have to look plain. Choose from four professionally 
				designed themes to match your brand or use case:
			</p>

			<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
				{[
					{ name: 'Modern', preview: 'bg-gradient-to-r from-blue-500 to-purple-500', desc: 'Clean gradients, shadows, rounded corners' },
					{ name: 'Classic', preview: 'bg-gradient-to-r from-amber-600 to-amber-800', desc: 'Warm tones, serif fonts, elegant borders' },
					{ name: 'Minimal', preview: 'bg-white border-2 border-gray-300', desc: 'Simple, focused, distraction-free' },
					{ name: 'Dark', preview: 'bg-gradient-to-r from-slate-800 to-slate-900', desc: 'Easy on the eyes, modern dark mode' },
				].map((theme, i) => (
					<div key={i} className="text-center">
						<div className={`h-20 rounded-lg mb-2 ${theme.preview}`} />
						<h4 className="font-semibold text-gray-900 dark:text-white">{theme.name}</h4>
						<p className="text-xs text-gray-500 dark:text-gray-400">{theme.desc}</p>
					</div>
				))}
			</div>

			{/* Image Extraction Modes */}
			<h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">
				Image Extraction Modes
			</h2>

			<div className="space-y-4 mb-8">
				<div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
					<h4 className="font-semibold text-gray-900 dark:text-white mb-2">
						🖼️ Render Full Pages
					</h4>
					<p className="text-gray-600 dark:text-gray-400">
						Each PDF page is converted to a high-quality image. Best for PDFs with 
						complex layouts, diagrams, or when you need pixel-perfect reproduction.
					</p>
				</div>
				<div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
					<h4 className="font-semibold text-gray-900 dark:text-white mb-2">
						📷 Extract Embedded Images
					</h4>
					<p className="text-gray-600 dark:text-gray-400">
						Pulls out only the images embedded in the PDF (photos, logos, etc.). 
						Smaller output, but text remains as HTML text.
					</p>
				</div>
				<div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
					<h4 className="font-semibold text-gray-900 dark:text-white mb-2">
						🎯 Both Methods
					</h4>
					<p className="text-gray-600 dark:text-gray-400">
						Get the best of both worlds: full page renders for visual fidelity 
						plus individual extracted images for flexibility.
					</p>
				</div>
			</div>

			{/* Method Comparison */}
			<h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">
				PDF to HTML Tools Compared
			</h2>

			<div className="overflow-x-auto mb-8">
				<table className="w-full text-sm">
					<thead>
						<tr className="border-b border-gray-200 dark:border-gray-700">
							<th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
								Tool
							</th>
							<th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
								Text Quality
							</th>
							<th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
								Images
							</th>
							<th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
								Styling
							</th>
							<th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
								Privacy
							</th>
							<th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
								Cost
							</th>
						</tr>
					</thead>
					<tbody>
						{methodComparison.map((method, i) => (
							<tr
								key={i}
								className={`border-b border-gray-100 dark:border-gray-800 ${
									method.recommended
										? 'bg-green-50 dark:bg-green-900/10'
										: ''
								}`}
							>
								<td className="py-3 px-4">
									<div className="flex items-center gap-2">
										{method.method}
										{method.recommended && (
											<span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">
												Best
											</span>
										)}
									</div>
								</td>
								<td className="py-3 px-4 text-gray-600 dark:text-gray-400">
									{method.textExtraction}
								</td>
								<td className="py-3 px-4 text-gray-600 dark:text-gray-400">
									{method.imageHandling}
								</td>
								<td className="py-3 px-4 text-gray-600 dark:text-gray-400">
									{method.styling}
								</td>
								<td className="py-3 px-4 text-gray-600 dark:text-gray-400">
									{method.privacy}
								</td>
								<td className="py-3 px-4 text-gray-600 dark:text-gray-400">
									{method.cost}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* Use Cases */}
			<h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">
				Common Use Cases
			</h2>

			<div className="grid md:grid-cols-2 gap-4 mb-8">
				{[
					{
						title: 'Documentation Archives',
						description: 'Convert legacy PDF documentation to searchable, web-accessible HTML archives.',
					},
					{
						title: 'Content Repurposing',
						description: 'Turn PDF reports, whitepapers, or ebooks into blog posts or web articles.',
					},
					{
						title: 'Accessibility',
						description: 'Make PDF content accessible to screen readers and assistive technologies.',
					},
					{
						title: 'CMS Integration',
						description: 'Import PDF content into WordPress, Drupal, or other content management systems.',
					},
					{
						title: 'API Documentation',
						description: 'Convert PDF API docs to HTML for integration into developer portals.',
					},
					{
						title: 'Legal/Compliance',
						description: 'Create web versions of contracts and policies for easy reference.',
					},
				].map((item, i) => (
					<div key={i} className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
						<h4 className="font-semibold text-gray-900 dark:text-white mb-1">
							{item.title}
						</h4>
						<p className="text-sm text-gray-600 dark:text-gray-400">
							{item.description}
						</p>
					</div>
				))}
			</div>

			{/* Privacy Note */}
			<div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6 mb-8">
				<h3 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
					<Shield className="h-5 w-5 text-green-600" />
					Your Privacy is Protected
				</h3>
				<p className="text-gray-700 dark:text-gray-300">
					PDF Wonder Kit processes everything in your browser using JavaScript. 
					Your PDF files are <strong>never uploaded to any server</strong>. 
					The conversion happens entirely on your device, making it safe for 
					sensitive documents, confidential reports, and proprietary content.
				</p>
			</div>

			{/* Tips Section */}
			<h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">
				Pro Tips for Better Conversions
			</h2>

			<div className="space-y-4 mb-8">
				{[
					{
						tip: 'Use higher image scale (2x or 3x) for documents with small text or detailed diagrams.',
					},
					{
						tip: 'Choose PNG format for screenshots and diagrams, JPG for photographs.',
					},
					{
						tip: 'For web publishing, use the ZIP package option and optimize images separately.',
					},
					{
						tip: 'The Dark theme is perfect for technical documentation that developers will read.',
					},
					{
						tip: 'Enable page numbers to maintain document reference points in the HTML.',
					},
				].map((item, i) => (
					<div key={i} className="flex gap-3 items-start">
						<CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
						<p className="text-gray-600 dark:text-gray-400">{item.tip}</p>
					</div>
				))}
			</div>

			{/* FAQ Section */}
			<h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">
				Frequently Asked Questions
			</h2>

			<div className="space-y-4 mb-8">
				{[
					{
						q: 'Will the HTML look exactly like my PDF?',
						a: 'The "Render Full Pages" option creates pixel-perfect image reproductions. For text-based conversion, layouts may vary slightly but content is preserved.',
					},
					{
						q: 'Can I edit the HTML after conversion?',
						a: 'Yes! The generated HTML is clean, well-structured code. You can edit it in any text editor or web development tool.',
					},
					{
						q: 'What about scanned PDFs?',
						a: 'For scanned documents, use the "Render Full Pages" option. For text extraction from scans, use our OCR tool first, then convert to HTML.',
					},
					{
						q: 'How large can the output file be?',
						a: 'It depends on image quality and quantity. Single HTML files with base64 images can be large; the ZIP option keeps HTML smaller.',
					},
					{
						q: 'Can I convert password-protected PDFs?',
						a: 'You\'ll need to unlock the PDF first using our PDF Unlock tool, then convert to HTML.',
					},
				].map((item, i) => (
					<details key={i} className="group bg-gray-50 dark:bg-gray-800/50 rounded-lg">
						<summary className="flex items-center justify-between p-4 cursor-pointer font-medium text-gray-900 dark:text-white">
							{item.q}
							<ArrowRight className="h-4 w-4 transition-transform group-open:rotate-90" />
						</summary>
						<p className="px-4 pb-4 text-gray-600 dark:text-gray-400">
							{item.a}
						</p>
					</details>
				))}
			</div>

			{/* Conclusion */}
			<h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">
				Start Converting PDFs to HTML
			</h2>

			<p className="mb-6">
				Converting PDF to HTML opens up new possibilities for your content — 
				from SEO benefits to better accessibility to easier content management. 
				With PDF Wonder Kit, you get professional-quality conversions with 
				multiple themes and output options, all while keeping your files completely private.
			</p>

			<p className="mb-8">
				Ready to transform your PDF documents? Try our free PDF to HTML converter 
				and see the difference quality conversion makes.
			</p>
		</BlogLayout>
	);
}
