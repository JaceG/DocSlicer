import { Metadata } from 'next';
import Link from 'next/link';
import { BlogLayout, BlogPost } from '@/components/blog/BlogLayout';
import { Mail, FileText, Scissors, Zap, CheckCircle2, AlertCircle } from 'lucide-react';

export const metadata: Metadata = {
	title: 'How to Split Large PDFs for Email (Gmail & Outlook Limits)',
	description:
		'Learn how to split PDFs that are too large for email. Complete guide to Gmail and Outlook attachment limits, plus strategies to send large files via email.',
	keywords: [
		'pdf too large for email',
		'split pdf for gmail',
		'split pdf for outlook',
		'gmail attachment size limit',
		'outlook attachment limit',
		'reduce pdf size for email',
		'send large pdf email',
	],
	openGraph: {
		title: 'How to Split Large PDFs for Email (Gmail & Outlook Limits)',
		description:
			'Complete guide to splitting PDFs that exceed email attachment limits. Works with Gmail, Outlook, and all email providers.',
		url: 'https://www.docslicer.com/blog/split-large-pdfs-for-email',
	},
	alternates: {
		canonical: 'https://www.docslicer.com/blog/split-large-pdfs-for-email',
	},
};

const postData: BlogPost = {
	slug: 'split-large-pdfs-for-email',
	title: 'How to Split Large PDFs for Email (Gmail & Outlook Limits)',
	description:
		'Learn how to split PDFs that are too large for email. Complete guide to Gmail and Outlook attachment limits, plus strategies to send large files via email.',
	date: '2026-01-05',
	readTime: '6 min read',
	category: 'Tutorials',
	author: 'DocSlicer Team',
	tags: [
		'email',
		'gmail',
		'outlook',
		'split pdf',
		'file size',
		'compression',
	],
	featured: false,
};

export default function SplitPDFForEmailPage() {
	return (
		<BlogLayout post={postData}>
			<div className='prose prose-lg max-w-none'>
				{/* Problem Statement */}
				<div className='bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-6 rounded-r-lg mb-8'>
					<div className='flex items-start gap-3'>
						<AlertCircle className='h-6 w-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-1' />
						<div>
							<h3 className='text-red-900 dark:text-red-100 mt-0 mb-2'>
								"Your attachment is too large to send"
							</h3>
							<p className='text-red-800 dark:text-red-200 mb-0'>
								We've all seen this error. You're trying to email an
								important PDF—a report, contract, or
								presentation—and your email provider won't let you
								send it. Frustrating, right?
							</p>
						</div>
					</div>
				</div>

				<p className='text-xl text-gray-700 dark:text-gray-300 leading-relaxed'>
					Email providers like Gmail and Outlook have strict file size
					limits. The good news? You have multiple strategies to get
					around this limitation. Let's break down exactly what those
					limits are and how to split or compress your PDF to send it
					successfully.
				</p>

				{/* Email Size Limits */}
				<h2 className='flex items-center gap-2'>
					<Mail className='h-6 w-6 text-blue-600' />
					Email Attachment Size Limits (2026)
				</h2>

				<div className='overflow-x-auto'>
					<table className='min-w-full border-collapse'>
						<thead>
							<tr className='bg-gray-100 dark:bg-gray-800'>
								<th className='border border-gray-300 dark:border-gray-700 px-4 py-2 text-left'>
									Email Provider
								</th>
								<th className='border border-gray-300 dark:border-gray-700 px-4 py-2 text-left'>
									Attachment Limit
								</th>
								<th className='border border-gray-300 dark:border-gray-700 px-4 py-2 text-left'>
									Notes
								</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td className='border border-gray-300 dark:border-gray-700 px-4 py-2'>
									<strong>Gmail</strong>
								</td>
								<td className='border border-gray-300 dark:border-gray-700 px-4 py-2'>
									25 MB
								</td>
								<td className='border border-gray-300 dark:border-gray-700 px-4 py-2'>
									Auto-uploads to Google Drive if larger
								</td>
							</tr>
							<tr>
								<td className='border border-gray-300 dark:border-gray-700 px-4 py-2'>
									<strong>Outlook / Office 365</strong>
								</td>
								<td className='border border-gray-300 dark:border-gray-700 px-4 py-2'>
									20-34 MB
								</td>
								<td className='border border-gray-300 dark:border-gray-700 px-4 py-2'>
									Varies by configuration
								</td>
							</tr>
							<tr>
								<td className='border border-gray-300 dark:border-gray-700 px-4 py-2'>
									<strong>Yahoo Mail</strong>
								</td>
								<td className='border border-gray-300 dark:border-gray-700 px-4 py-2'>
									25 MB
								</td>
								<td className='border border-gray-300 dark:border-gray-700 px-4 py-2'>
									Similar to Gmail
								</td>
							</tr>
							<tr>
								<td className='border border-gray-300 dark:border-gray-700 px-4 py-2'>
									<strong>Apple Mail (iCloud)</strong>
								</td>
								<td className='border border-gray-300 dark:border-gray-700 px-4 py-2'>
									20 MB
								</td>
								<td className='border border-gray-300 dark:border-gray-700 px-4 py-2'>
									Uses Mail Drop for larger files
								</td>
							</tr>
							<tr>
								<td className='border border-gray-300 dark:border-gray-700 px-4 py-2'>
									<strong>ProtonMail</strong>
								</td>
								<td className='border border-gray-300 dark:border-gray-700 px-4 py-2'>
									25 MB
								</td>
								<td className='border border-gray-300 dark:border-gray-700 px-4 py-2'>
									Security-focused provider
								</td>
							</tr>
						</tbody>
					</table>
				</div>

				<div className='bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-6 rounded-r-lg'>
					<p className='text-blue-900 dark:text-blue-100 mb-0'>
						<strong>Key Takeaway:</strong> Most email providers limit
						attachments to 20-25 MB. If your PDF is larger, you'll
						need to split it, compress it, or use an alternative
						delivery method.
					</p>
				</div>

				{/* Strategy Overview */}
				<h2>Three Strategies to Send Large PDFs</h2>

				<div className='grid md:grid-cols-3 gap-4'>
					<div className='bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg p-6 border border-green-200 dark:border-green-800'>
						<div className='flex items-center gap-2 mb-3'>
							<Scissors className='h-5 w-5 text-green-600' />
							<h3 className='text-base font-bold text-gray-900 dark:text-white mt-0 mb-0'>
								Strategy 1: Split
							</h3>
						</div>
						<p className='text-sm text-gray-700 dark:text-gray-300 mb-0'>
							Divide your PDF into multiple smaller files, each
							under the size limit
						</p>
					</div>

					<div className='bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-6 border border-purple-200 dark:border-purple-800'>
						<div className='flex items-center gap-2 mb-3'>
							<Zap className='h-5 w-5 text-purple-600' />
							<h3 className='text-base font-bold text-gray-900 dark:text-white mt-0 mb-0'>
								Strategy 2: Compress
							</h3>
						</div>
						<p className='text-sm text-gray-700 dark:text-gray-300 mb-0'>
							Reduce the file size by compressing images and
							removing unnecessary data
						</p>
					</div>

					<div className='bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 rounded-lg p-6 border border-orange-200 dark:border-orange-800'>
						<div className='flex items-center gap-2 mb-3'>
							<Mail className='h-5 w-5 text-orange-600' />
							<h3 className='text-base font-bold text-gray-900 dark:text-white mt-0 mb-0'>
								Strategy 3: Cloud Link
							</h3>
						</div>
						<p className='text-sm text-gray-700 dark:text-gray-300 mb-0'>
							Upload to cloud storage and email a download link
							instead
						</p>
					</div>
				</div>

				{/* Strategy 1: Splitting */}
				<h2 className='flex items-center gap-2'>
					<Scissors className='h-6 w-6 text-green-600' />
					Strategy 1: Split Your PDF Into Multiple Parts
				</h2>

				<p>
					<strong>Best for:</strong> PDFs that are 50-100 MB and need to
					be broken into 2-4 smaller files.
				</p>

				<h3>When to Split Instead of Compress:</h3>

				<ul>
					<li>
						Your PDF contains high-quality images or graphics that
						you don't want to degrade
					</li>
					<li>
						The recipient needs specific sections (e.g., "Pages 1-20"
						and "Pages 21-40")
					</li>
					<li>You want to preserve perfect quality</li>
					<li>
						The PDF is primarily text and already well-optimized
					</li>
				</ul>

				<h3>How to Split a PDF for Email:</h3>

				<div className='bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 border border-gray-200 dark:border-gray-700'>
					<h4 className='mt-0'>Using DocSlicer (Recommended):</h4>
					<ol className='space-y-3'>
						<li>
							<strong>Calculate your split points:</strong>
							<br />
							Example: 60 MB PDF for Gmail (25 MB limit) = split
							into 3 parts of 20 pages each
						</li>
						<li>
							<strong>Go to{' '}
								<Link
									href='/'
									className='text-blue-600 hover:underline'>
									DocSlicer.com
								</Link>
							</strong>
						</li>
						<li>
							<strong>Upload your PDF</strong>
						</li>
						<li>
							<strong>Select page ranges:</strong>
							<ul className='mt-2'>
								<li>Part 1: Pages 1-20</li>
								<li>Part 2: Pages 21-40</li>
								<li>Part 3: Pages 41-60</li>
							</ul>
						</li>
						<li>
							<strong>Download all parts</strong> (ZIP download
							available for Premium users)
						</li>
						<li>
							<strong>Attach each part</strong> to separate emails
							or all in one email if they fit
						</li>
					</ol>
				</div>

				<div className='bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-6 rounded-r-lg'>
					<h4 className='text-green-900 dark:text-green-100 mt-0'>
						Pro Tip: Name Your Files Clearly
					</h4>
					<p className='text-green-800 dark:text-green-200 mb-0'>
						Use descriptive names like:
						<br />
						<code className='text-sm'>
							Annual_Report_2025_Part1of3.pdf
						</code>
						<br />
						<code className='text-sm'>
							Annual_Report_2025_Part2of3.pdf
						</code>
						<br />
						<code className='text-sm'>
							Annual_Report_2025_Part3of3.pdf
						</code>
						<br />
						This makes it crystal clear for recipients how to
						reassemble the document.
					</p>
				</div>

				{/* Strategy 2: Compression */}
				<h2 className='flex items-center gap-2'>
					<Zap className='h-6 w-6 text-purple-600' />
					Strategy 2: Compress Your PDF
				</h2>

				<p>
					<strong>Best for:</strong> PDFs with large images,
					screenshots, or scanned pages where slight quality reduction
					is acceptable.
				</p>

				<h3>Compression Techniques:</h3>

				<div className='space-y-4'>
					<div className='bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700'>
						<h4 className='text-base font-semibold mt-0 mb-2'>
							1. Online PDF Compressors
						</h4>
						<p className='text-sm mb-2'>
							Use DocSlicer's compression tool to reduce file size
							by 40-70% while maintaining readability.
						</p>
						<ul className='text-sm mb-0 space-y-1'>
							<li>
								<CheckCircle2 className='inline h-4 w-4 text-green-600 mr-1' />
								Choose compression level (low/medium/high)
							</li>
							<li>
								<CheckCircle2 className='inline h-4 w-4 text-green-600 mr-1' />
								Browser-based processing (secure)
							</li>
							<li>
								<CheckCircle2 className='inline h-4 w-4 text-green-600 mr-1' />
								3 free compressions per month
							</li>
						</ul>
					</div>

					<div className='bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700'>
						<h4 className='text-base font-semibold mt-0 mb-2'>
							2. Combine Compression + Splitting
						</h4>
						<p className='text-sm mb-0'>
							For very large files (100+ MB), first compress to
							reduce size by 50%, then split if still too large.
							This gives you the best of both worlds.
						</p>
					</div>
				</div>

				<h3>Compression Quality Guidelines:</h3>

				<div className='overflow-x-auto'>
					<table className='min-w-full border-collapse'>
						<thead>
							<tr className='bg-gray-100 dark:bg-gray-800'>
								<th className='border px-4 py-2 text-left'>
									Compression Level
								</th>
								<th className='border px-4 py-2 text-left'>
									Size Reduction
								</th>
								<th className='border px-4 py-2 text-left'>
									Best For
								</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td className='border px-4 py-2'>
									<strong>Low</strong>
								</td>
								<td className='border px-4 py-2'>20-30%</td>
								<td className='border px-4 py-2'>
									High-quality images, presentations
								</td>
							</tr>
							<tr>
								<td className='border px-4 py-2'>
									<strong>Medium</strong>
								</td>
								<td className='border px-4 py-2'>40-60%</td>
								<td className='border px-4 py-2'>
									General documents, reports
								</td>
							</tr>
							<tr>
								<td className='border px-4 py-2'>
									<strong>High</strong>
								</td>
								<td className='border px-4 py-2'>60-80%</td>
								<td className='border px-4 py-2'>
									Text-heavy, internal documents
								</td>
							</tr>
						</tbody>
					</table>
				</div>

				{/* Strategy 3: Cloud Links */}
				<h2 className='flex items-center gap-2'>
					<Mail className='h-6 w-6 text-orange-600' />
					Strategy 3: Use Cloud Storage Links
				</h2>

				<p>
					<strong>Best for:</strong> Very large files (100+ MB) or when
					sending to multiple recipients.
				</p>

				<h3>Cloud Storage Options:</h3>

				<div className='grid md:grid-cols-2 gap-4'>
					<div className='bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700'>
						<h4 className='text-base font-semibold mt-0'>
							Google Drive (Gmail)
						</h4>
						<ul className='text-sm mb-0'>
							<li>15 GB free storage</li>
							<li>Gmail auto-suggests this for large files</li>
							<li>Recipients can view in browser</li>
						</ul>
					</div>

					<div className='bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700'>
						<h4 className='text-base font-semibold mt-0'>
							OneDrive (Outlook)
						</h4>
						<ul className='text-sm mb-0'>
							<li>5 GB free storage</li>
							<li>Integrated with Microsoft 365</li>
							<li>Set expiration dates on links</li>
						</ul>
					</div>

					<div className='bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700'>
						<h4 className='text-base font-semibold mt-0'>Dropbox</h4>
						<ul className='text-sm mb-0'>
							<li>2 GB free storage</li>
							<li>Simple sharing interface</li>
							<li>Track who downloads files</li>
						</ul>
					</div>

					<div className='bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700'>
						<h4 className='text-base font-semibold mt-0'>
							WeTransfer
						</h4>
						<ul className='text-sm mb-0'>
							<li>2 GB file transfers (free)</li>
							<li>No account required</li>
							<li>Files expire after 7 days</li>
						</ul>
					</div>
				</div>

				<div className='bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-6 rounded-r-lg'>
					<h4 className='text-yellow-900 dark:text-yellow-100 mt-0'>
						⚠️ Security Consideration
					</h4>
					<p className='text-yellow-800 dark:text-yellow-200 mb-0'>
						When sending confidential documents via cloud links,
						always:
						<br />
						• Set an expiration date
						<br />
						• Require password protection if available
						<br />• Consider who has access to the link (anyone with
						link vs. specific people)
					</p>
				</div>

				{/* Decision Flowchart */}
				<h2>Which Strategy Should You Use?</h2>

				<div className='bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border-2 border-blue-200 dark:border-blue-800'>
					<h3 className='mt-0 text-center'>Decision Tree:</h3>
					<div className='space-y-4 text-center'>
						<div className='p-4 bg-white dark:bg-gray-800 rounded-lg border border-blue-300'>
							<p className='font-bold mb-2'>
								Is your PDF 26-50 MB?
							</p>
							<p className='text-sm mb-0'>
								→ <strong>Try compression first</strong> (may get
								it under 25 MB)
							</p>
						</div>

						<div className='p-4 bg-white dark:bg-gray-800 rounded-lg border border-blue-300'>
							<p className='font-bold mb-2'>
								Is your PDF 50-100 MB?
							</p>
							<p className='text-sm mb-0'>
								→ <strong>Compress, then split</strong> into 2-3
								parts
							</p>
						</div>

						<div className='p-4 bg-white dark:bg-gray-800 rounded-lg border border-blue-300'>
							<p className='font-bold mb-2'>
								Is your PDF 100+ MB?
							</p>
							<p className='text-sm mb-0'>
								→ <strong>Use cloud storage link</strong> (too
								many parts otherwise)
							</p>
						</div>

						<div className='p-4 bg-white dark:bg-gray-800 rounded-lg border border-blue-300'>
							<p className='font-bold mb-2'>
								Need to preserve perfect quality?
							</p>
							<p className='text-sm mb-0'>
								→ <strong>Split without compression</strong>
							</p>
						</div>
					</div>
				</div>

				{/* Common Mistakes */}
				<h2>Common Mistakes to Avoid</h2>

				<div className='space-y-3'>
					<div className='flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800'>
						<AlertCircle className='h-5 w-5 text-red-600 flex-shrink-0 mt-0.5' />
						<div>
							<p className='font-semibold text-red-900 dark:text-red-100 mb-1'>
								Sending Parts in Separate Emails Without Context
							</p>
							<p className='text-sm text-red-800 dark:text-red-200 mb-0'>
								Always explain in the email: "This document is
								split into 3 parts due to size. Please download
								all before opening."
							</p>
						</div>
					</div>

					<div className='flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800'>
						<AlertCircle className='h-5 w-5 text-red-600 flex-shrink-0 mt-0.5' />
						<div>
							<p className='font-semibold text-red-900 dark:text-red-100 mb-1'>
								Over-Compressing Important Documents
							</p>
							<p className='text-sm text-red-800 dark:text-red-200 mb-0'>
								Legal documents, contracts, and official forms
								should preserve original quality. Split instead.
							</p>
						</div>
					</div>

					<div className='flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800'>
						<AlertCircle className='h-5 w-5 text-red-600 flex-shrink-0 mt-0.5' />
						<div>
							<p className='font-semibold text-red-900 dark:text-red-100 mb-1'>
								Not Testing Before Sending to Clients
							</p>
							<p className='text-sm text-red-800 dark:text-red-200 mb-0'>
								Send a test email to yourself first to ensure all
								parts are readable and properly named.
							</p>
						</div>
					</div>
				</div>

				{/* FAQ */}
				<h2>Frequently Asked Questions</h2>

				<div className='space-y-6'>
					<div className='bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 border border-gray-200 dark:border-gray-700'>
						<h3 className='text-lg font-semibold mt-0'>
							Can I send a 30 MB PDF via Gmail?
						</h3>
						<p className='mb-0'>
							No, Gmail's limit is 25 MB. However, Gmail will
							automatically prompt you to upload it to Google Drive
							and send a link instead. Alternatively, compress it
							below 25 MB or split it into two parts.
						</p>
					</div>

					<div className='bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 border border-gray-200 dark:border-gray-700'>
						<h3 className='text-lg font-semibold mt-0'>
							Will splitting a PDF lose any data?
						</h3>
						<p className='mb-0'>
							No. Splitting is lossless—you're simply creating
							smaller PDFs from specific page ranges. No quality is
							lost, and all formatting, links, and metadata are
							preserved in each part.
						</p>
					</div>

					<div className='bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 border border-gray-200 dark:border-gray-700'>
						<h3 className='text-lg font-semibold mt-0'>
							How do I reassemble a split PDF?
						</h3>
						<p className='mb-0'>
							You don't need to! Recipients can simply open each
							part separately. If you do need one combined file,
							use a PDF merger tool (DocSlicer offers this) to
							merge all parts back together.
						</p>
					</div>

					<div className='bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 border border-gray-200 dark:border-gray-700'>
						<h3 className='text-lg font-semibold mt-0'>
							Is it better to compress or split?
						</h3>
						<p className='mb-0'>
							It depends on your priorities:
							<br />
							<strong>Compress</strong> if you want a single file
							and quality loss is acceptable
							<br />
							<strong>Split</strong> if you need perfect quality
							and don't mind multiple files
							<br />
							<strong>Both</strong> if you have a very large file
							(compress first, then split)
						</p>
					</div>
				</div>

				{/* Quick Reference */}
				<h2>Quick Reference Chart</h2>

				<div className='overflow-x-auto'>
					<table className='min-w-full border-collapse text-sm'>
						<thead>
							<tr className='bg-gray-100 dark:bg-gray-800'>
								<th className='border px-3 py-2 text-left'>
									File Size
								</th>
								<th className='border px-3 py-2 text-left'>
									Recommended Action
								</th>
								<th className='border px-3 py-2 text-left'>
									Time Required
								</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td className='border px-3 py-2'>Under 25 MB</td>
								<td className='border px-3 py-2'>
									✅ Send directly
								</td>
								<td className='border px-3 py-2'>Instant</td>
							</tr>
							<tr>
								<td className='border px-3 py-2'>26-40 MB</td>
								<td className='border px-3 py-2'>
									Compress to under 25 MB
								</td>
								<td className='border px-3 py-2'>30 seconds</td>
							</tr>
							<tr>
								<td className='border px-3 py-2'>41-60 MB</td>
								<td className='border px-3 py-2'>
									Split into 2-3 parts
								</td>
								<td className='border px-3 py-2'>1 minute</td>
							</tr>
							<tr>
								<td className='border px-3 py-2'>61-100 MB</td>
								<td className='border px-3 py-2'>
									Compress, then split
								</td>
								<td className='border px-3 py-2'>2 minutes</td>
							</tr>
							<tr>
								<td className='border px-3 py-2'>100+ MB</td>
								<td className='border px-3 py-2'>
									Use cloud storage link
								</td>
								<td className='border px-3 py-2'>3-5 minutes</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</BlogLayout>
	);
}
