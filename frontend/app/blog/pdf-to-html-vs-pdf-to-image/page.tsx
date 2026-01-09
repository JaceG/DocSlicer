import { Metadata } from 'next';
import Link from 'next/link';
import { BlogLayout, BlogPost } from '@/components/blog/BlogLayout';
import {
	Code,
	Image as ImageIcon,
	CheckCircle2,
	XCircle,
	ArrowRight,
	Search,
	Smartphone,
	Share2,
	Globe,
	FileText,
	Palette,
	Zap,
} from 'lucide-react';

const postData: BlogPost = {
	slug: 'pdf-to-html-vs-pdf-to-image',
	title: 'PDF to HTML vs PDF to Image: Which Should You Choose?',
	description:
		'Comparing PDF conversion options: when to convert to HTML for text and SEO, and when images are better. Make the right choice for your use case.',
	date: '2026-01-08',
	readTime: '8 min read',
	category: 'Guides',
	author: 'PDF Wonder Kit Team',
	tags: [
		'pdf-to-html',
		'pdf-to-image',
		'conversion-comparison',
		'pdf-export',
	],
	featured: false,
	toolSlug: 'pdf-to-html',
	ctaTitle: 'Ready to Convert Your PDF?',
	ctaDescription:
		'Whether you need HTML or images, PDF Wonder Kit has you covered. Convert with confidence — your files stay private.',
};

export const metadata: Metadata = {
	title: postData.title,
	description: postData.description,
	keywords: [
		'PDF to HTML vs image',
		'convert PDF comparison',
		'PDF to JPG or HTML',
		'best PDF conversion method',
		'PDF export options',
		'PDF to web page',
		'PDF to picture',
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

export default function BlogPostPage() {
	return (
		<BlogLayout post={postData}>
			{/* Introduction */}
			<p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8">
				You have a PDF and need to convert it — but should you export it as HTML or as images? 
				Both options have their place, and choosing wrong can mean extra work later. 
				This guide breaks down exactly when to use each format.
			</p>

			{/* Quick Decision Box */}
			<div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 mb-8">
				<h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
					<Zap className="h-5 w-5 text-blue-500" />
					Quick Decision Guide
				</h3>
				<div className="grid md:grid-cols-2 gap-4">
					<div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
						<h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
							<Code className="h-4 w-4 text-orange-500" />
							Choose HTML if you need:
						</h4>
						<ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
							<li>• Searchable, selectable text</li>
							<li>• SEO for search engines</li>
							<li>• Responsive/mobile-friendly content</li>
							<li>• Content editing or CMS import</li>
						</ul>
					</div>
					<div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
						<h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
							<ImageIcon className="h-4 w-4 text-cyan-500" />
							Choose Images if you need:
						</h4>
						<ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
							<li>• Exact visual reproduction</li>
							<li>• Social media sharing</li>
							<li>• Presentations or slideshows</li>
							<li>• Simple, single-file output</li>
						</ul>
					</div>
				</div>
			</div>

			{/* Comparison Table */}
			<h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">
				PDF to HTML vs PDF to Image: Full Comparison
			</h2>

			<div className="overflow-x-auto mb-8">
				<table className="w-full text-sm">
					<thead>
						<tr className="border-b-2 border-gray-200 dark:border-gray-700">
							<th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
								Feature
							</th>
							<th className="text-center py-3 px-4 font-semibold text-orange-600 dark:text-orange-400">
								PDF to HTML
							</th>
							<th className="text-center py-3 px-4 font-semibold text-cyan-600 dark:text-cyan-400">
								PDF to Image
							</th>
						</tr>
					</thead>
					<tbody>
						{[
							{ feature: 'Text is searchable', html: true, image: false },
							{ feature: 'Text is selectable/copyable', html: true, image: false },
							{ feature: 'SEO friendly', html: true, image: false },
							{ feature: 'Responsive on mobile', html: true, image: false },
							{ feature: 'Exact visual layout preserved', html: false, image: true },
							{ feature: 'Works in presentations', html: false, image: true },
							{ feature: 'Easy social media sharing', html: false, image: true },
							{ feature: 'Editable content', html: true, image: false },
							{ feature: 'Small file size', html: true, image: false },
							{ feature: 'Works with complex layouts', html: false, image: true },
							{ feature: 'Accessibility (screen readers)', html: true, image: false },
							{ feature: 'Offline viewing', html: true, image: true },
						].map((row, i) => (
							<tr key={i} className="border-b border-gray-100 dark:border-gray-800">
								<td className="py-3 px-4 text-gray-700 dark:text-gray-300">
									{row.feature}
								</td>
								<td className="py-3 px-4 text-center">
									{row.html ? (
										<CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" />
									) : (
										<XCircle className="h-5 w-5 text-gray-300 dark:text-gray-600 mx-auto" />
									)}
								</td>
								<td className="py-3 px-4 text-center">
									{row.image ? (
										<CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" />
									) : (
										<XCircle className="h-5 w-5 text-gray-300 dark:text-gray-600 mx-auto" />
									)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* When to Use HTML */}
			<h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">
				When PDF to HTML is the Right Choice
			</h2>

			<div className="space-y-4 mb-8">
				{[
					{
						icon: Search,
						title: 'Publishing content online',
						description: 'If you want Google to index your content, HTML is essential. Search engines can\'t read text inside images.',
					},
					{
						icon: Smartphone,
						title: 'Mobile-friendly documentation',
						description: 'HTML automatically reflows for different screen sizes. Images require zooming and scrolling.',
					},
					{
						icon: FileText,
						title: 'Content management systems',
						description: 'Importing into WordPress, Notion, or other CMS? HTML text can be directly pasted and edited.',
					},
					{
						icon: Globe,
						title: 'Accessibility requirements',
						description: 'Screen readers can parse HTML text. Images require alt text and are inherently less accessible.',
					},
				].map((item, i) => (
					<div key={i} className="flex gap-4 p-4 bg-orange-50 dark:bg-orange-900/10 rounded-lg border border-orange-100 dark:border-orange-900/30">
						<item.icon className="h-6 w-6 text-orange-500 flex-shrink-0" />
						<div>
							<h4 className="font-semibold text-gray-900 dark:text-white">{item.title}</h4>
							<p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
						</div>
					</div>
				))}
			</div>

			{/* When to Use Images */}
			<h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">
				When PDF to Image is the Right Choice
			</h2>

			<div className="space-y-4 mb-8">
				{[
					{
						icon: Palette,
						title: 'Visual-heavy documents',
						description: 'Brochures, infographics, and designed documents need pixel-perfect reproduction that only images provide.',
					},
					{
						icon: Share2,
						title: 'Social media sharing',
						description: 'Twitter, LinkedIn, and Instagram expect images. You can\'t share an HTML file directly.',
					},
					{
						icon: ImageIcon,
						title: 'Presentations',
						description: 'Adding a PDF page to PowerPoint or Keynote? Export as an image and insert directly.',
					},
					{
						icon: FileText,
						title: 'Complex layouts',
						description: 'PDFs with multiple columns, overlapping elements, or custom fonts convert more reliably to images.',
					},
				].map((item, i) => (
					<div key={i} className="flex gap-4 p-4 bg-cyan-50 dark:bg-cyan-900/10 rounded-lg border border-cyan-100 dark:border-cyan-900/30">
						<item.icon className="h-6 w-6 text-cyan-500 flex-shrink-0" />
						<div>
							<h4 className="font-semibold text-gray-900 dark:text-white">{item.title}</h4>
							<p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
						</div>
					</div>
				))}
			</div>

			{/* The Hybrid Approach */}
			<h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">
				The Best of Both Worlds: Hybrid Approach
			</h2>

			<p className="mb-6">
				Here's a secret: you don't have to choose. PDF Wonder Kit's{' '}
				<Link href="/pdf-to-html" className="text-orange-600 dark:text-orange-400 font-medium hover:underline">
					PDF to HTML converter
				</Link>{' '}
				lets you have both in one output:
			</p>

			<div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6 mb-8">
				<h3 className="font-bold text-gray-900 dark:text-white mb-4">
					🎯 Hybrid Mode Features
				</h3>
				<ul className="space-y-3">
					<li className="flex items-start gap-3">
						<CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
						<span className="text-gray-700 dark:text-gray-300">
							<strong>Extracted text</strong> — Searchable, copyable, SEO-friendly
						</span>
					</li>
					<li className="flex items-start gap-3">
						<CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
						<span className="text-gray-700 dark:text-gray-300">
							<strong>Full page renders</strong> — Pixel-perfect image of each page
						</span>
					</li>
					<li className="flex items-start gap-3">
						<CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
						<span className="text-gray-700 dark:text-gray-300">
							<strong>Embedded images</strong> — Extract photos and graphics separately
						</span>
					</li>
					<li className="flex items-start gap-3">
						<CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
						<span className="text-gray-700 dark:text-gray-300">
							<strong>Styled HTML</strong> — Professional themes, not plain text
						</span>
					</li>
				</ul>
			</div>

			{/* Real-World Examples */}
			<h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">
				Real-World Decision Examples
			</h2>

			<div className="space-y-4 mb-8">
				{[
					{
						scenario: 'I want to put my PDF whitepaper on my blog',
						answer: 'HTML',
						reason: 'You need SEO, searchability, and mobile responsiveness.',
					},
					{
						scenario: 'I need to share a page from a PDF on Twitter',
						answer: 'Image',
						reason: 'Social platforms display images natively.',
					},
					{
						scenario: 'I\'m archiving old company documents for a searchable database',
						answer: 'HTML',
						reason: 'Full-text search requires extractable text.',
					},
					{
						scenario: 'I want to include a PDF chart in my PowerPoint',
						answer: 'Image',
						reason: 'Presentations work best with image files.',
					},
					{
						scenario: 'I\'m migrating documentation to a new website',
						answer: 'HTML',
						reason: 'You can edit, update, and style HTML content.',
					},
					{
						scenario: 'I need to print a high-quality version of a PDF page',
						answer: 'Image',
						reason: 'Use high-resolution PNG for crisp prints.',
					},
				].map((example, i) => (
					<div key={i} className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
						<p className="font-medium text-gray-900 dark:text-white mb-2">
							"{example.scenario}"
						</p>
						<p className="text-sm">
							<span className={`inline-block px-2 py-0.5 rounded text-white font-medium mr-2 ${
								example.answer === 'HTML' 
									? 'bg-orange-500' 
									: 'bg-cyan-500'
							}`}>
								{example.answer}
							</span>
							<span className="text-gray-600 dark:text-gray-400">
								{example.reason}
							</span>
						</p>
					</div>
				))}
			</div>

			{/* Tools */}
			<h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">
				Convert Your PDF Now
			</h2>

			<p className="mb-6">
				PDF Wonder Kit offers both conversion options, completely free and private:
			</p>

			<div className="grid md:grid-cols-2 gap-4 mb-8">
				<Link 
					href="/pdf-to-html"
					className="group p-6 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl border border-orange-200 dark:border-orange-800 hover:border-orange-400 dark:hover:border-orange-600 transition-colors"
				>
					<div className="flex items-center gap-3 mb-3">
						<div className="p-2 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg">
							<Code className="h-5 w-5 text-white" />
						</div>
						<h3 className="font-bold text-gray-900 dark:text-white">
							PDF to HTML
						</h3>
					</div>
					<p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
						Extract text, preserve images, choose from 4 themes
					</p>
					<span className="inline-flex items-center gap-1 text-orange-600 dark:text-orange-400 font-medium text-sm group-hover:gap-2 transition-all">
						Convert to HTML <ArrowRight className="h-4 w-4" />
					</span>
				</Link>

				<Link 
					href="/pdf-to-images"
					className="group p-6 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-xl border border-cyan-200 dark:border-cyan-800 hover:border-cyan-400 dark:hover:border-cyan-600 transition-colors"
				>
					<div className="flex items-center gap-3 mb-3">
						<div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg">
							<ImageIcon className="h-5 w-5 text-white" />
						</div>
						<h3 className="font-bold text-gray-900 dark:text-white">
							PDF to Images
						</h3>
					</div>
					<p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
						Export pages as JPG, PNG, or WebP images
					</p>
					<span className="inline-flex items-center gap-1 text-cyan-600 dark:text-cyan-400 font-medium text-sm group-hover:gap-2 transition-all">
						Convert to Images <ArrowRight className="h-4 w-4" />
					</span>
				</Link>
			</div>

			{/* Conclusion */}
			<h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">
				The Bottom Line
			</h2>

			<p className="mb-6">
				<strong>Choose HTML</strong> when you need searchable, editable, SEO-friendly content.
				<strong> Choose images</strong> when visual fidelity and easy sharing matter most.
				And when in doubt, PDF Wonder Kit's hybrid HTML mode gives you both.
			</p>

			<p className="text-gray-600 dark:text-gray-400">
				Both tools process everything locally in your browser — your files never leave your device, 
				making them safe for sensitive documents.
			</p>
		</BlogLayout>
	);
}
