import type { Metadata } from 'next';
import { BlogLayout } from '@/components/blog/BlogLayout';

export const metadata: Metadata = {
	title: 'PDF Metadata: What Hidden Information Are You Sharing? | PDF Wonder Kit',
	description:
		'Discover what hidden data lurks in PDF metadata. Learn what information PDFs reveal about you, how to view it, and how to remove sensitive metadata before sharing.',
	keywords: [
		'PDF metadata',
		'PDF hidden information',
		'PDF privacy',
		'remove PDF metadata',
		'PDF security',
		'EXIF data PDF',
		'PDF author information',
		'clean PDF metadata',
		'PDF document properties',
		'PDF data privacy',
	],
	openGraph: {
		title: 'PDF Metadata: What Hidden Information Are You Sharing?',
		description:
			'Discover what hidden data lurks in PDF metadata and how to protect your privacy.',
		type: 'article',
		publishedTime: '2025-01-05T00:00:00Z',
		authors: ['PDF Wonder Kit Team'],
	},
	alternates: {
		canonical: 'https://pdfwonderkit.com/blog/pdf-metadata-hidden-information',
	},
};

const postData = {
	title: 'PDF Metadata: What Hidden Information Are You Sharing?',
	description:
		'Discover what hidden data lurks in PDF metadata. Learn what information PDFs reveal about you, how to view it, and how to remove sensitive metadata before sharing.',
	author: 'PDF Wonder Kit Team',
	date: 'January 5, 2025',
	readTime: '9 min read',
	category: 'Privacy & Security',
	tags: ['metadata', 'privacy', 'security', 'hidden data'],
	slug: 'pdf-metadata-hidden-information',
};

export default function BlogPost() {
	return (
		<BlogLayout post={postData}>
			<section className='mb-12'>
				<h2>Introduction: The Hidden Data in Every PDF</h2>
				<p className='text-lg'>
					You carefully review your PDF before sharing it, ensuring the visible
					content is perfect. But what about the invisible data embedded in the
					file? PDF metadata can reveal far more than you realize — from your
					name and location to your editing history and software versions.
				</p>

				<div className='bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 my-6'>
					<p className='text-sm font-semibold mb-2'>⚠️ Real-World Impact</p>
					<p className='text-sm mb-0'>
						In 2013, reporters used PDF metadata to reveal that a supposedly
						independent report was actually authored by a company with a vested
						interest. The "Author" field gave it away.
					</p>
				</div>
			</section>

			<section className='mb-12'>
				<h2>What is PDF Metadata?</h2>
				<p>
					Metadata is "data about data" — information describing the PDF file
					itself rather than its visible content. Think of it as the file's DNA:
					invisible to casual viewers but containing a wealth of information.
				</p>

				<h3>Types of PDF Metadata</h3>

				<div className='grid md:grid-cols-2 gap-4 my-6'>
					<div className='border-l-4 border-blue-500 pl-4'>
						<h4 className='font-semibold mb-2'>📋 Document Information</h4>
						<ul className='text-sm space-y-1'>
							<li>Title</li>
							<li>Author</li>
							<li>Subject</li>
							<li>Keywords</li>
							<li>Creator application</li>
							<li>Producer (PDF converter)</li>
						</ul>
					</div>

					<div className='border-l-4 border-purple-500 pl-4'>
						<h4 className='font-semibold mb-2'>⏰ Timestamps</h4>
						<ul className='text-sm space-y-1'>
							<li>Creation date & time</li>
							<li>Modification date & time</li>
							<li>Last printed date</li>
							<li>Timezone information</li>
						</ul>
					</div>

					<div className='border-l-4 border-green-500 pl-4'>
						<h4 className='font-semibold mb-2'>💻 Technical Details</h4>
						<ul className='text-sm space-y-1'>
							<li>PDF version</li>
							<li>Page count</li>
							<li>File size</li>
							<li>Encryption settings</li>
							<li>Embedded fonts list</li>
							<li>Color profile</li>
						</ul>
					</div>

					<div className='border-l-4 border-orange-500 pl-4'>
						<h4 className='font-semibold mb-2'>🔍 Extended Metadata (XMP)</h4>
						<ul className='text-sm space-y-1'>
							<li>GPS coordinates (from photos)</li>
							<li>Camera model (from scans)</li>
							<li>Document history</li>
							<li>Custom properties</li>
							<li>Copyright information</li>
							<li>License details</li>
						</ul>
					</div>
				</div>
			</section>

			<section className='mb-12'>
				<h2>What Can Metadata Reveal About You?</h2>

				<h3>1. Personal Identity</h3>
				<div className='bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 my-4'>
					<p className='font-semibold mb-2'>Example Metadata:</p>
					<div className='bg-white dark:bg-gray-800 p-3 rounded font-mono text-xs space-y-1'>
						<p className='mb-0'>Author: John Smith</p>
						<p className='mb-0'>Company: Acme Corporation</p>
						<p className='mb-0'>
							Creator: Microsoft Word 2023 (Licensed to john.smith@acme.com)
						</p>
					</div>
					<p className='text-sm mt-3 mb-0'>
						<strong>What it reveals:</strong> Your full name, employer, email
						address, and the fact you have a licensed copy of Word.
					</p>
				</div>

				<h3>2. Location Data</h3>
				<p>PDFs created from photos or scanned documents can contain GPS data:</p>
				<div className='bg-gray-100 dark:bg-gray-800 p-3 rounded font-mono text-xs my-4'>
					<p className='mb-0'>GPS Latitude: 37.7749° N</p>
					<p className='mb-0'>GPS Longitude: 122.4194° W</p>
					<p className='mb-0'>(San Francisco, CA — precise to ~10 meters)</p>
				</div>

				<h3>3. Editing History</h3>
				<p>
					Some PDF creators embed a complete revision history, revealing deleted
					content:
				</p>
				<ul>
					<li>Previous versions of text</li>
					<li>Deleted paragraphs</li>
					<li>Original prices (before discount)</li>
					<li>Redacted information (if improperly done)</li>
				</ul>

				<div className='bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 my-4'>
					<p className='font-semibold mb-2'>🚨 Real Example:</p>
					<p className='text-sm mb-0'>
						In 2008, a government PDF accidentally revealed classified
						information that had been "deleted" but was still present in the
						document's metadata and revision history.
					</p>
				</div>

				<h3>4. Software & System Information</h3>
				<div className='bg-gray-100 dark:bg-gray-800 p-3 rounded my-4'>
					<p className='font-semibold mb-2'>Typical Software Fingerprint:</p>
					<ul className='text-sm space-y-1 mb-0'>
						<li>Creator: Adobe InDesign 2024 (19.4)</li>
						<li>Producer: Adobe PDF Library 17.0</li>
						<li>Operating System: Mac OS X 10.15.7</li>
						<li>Printer: Canon imageCLASS MF743Cdw</li>
					</ul>
					<p className='text-sm mt-3 mb-0'>
						<strong>What attackers learn:</strong> Software versions for
						targeted exploits, hardware for phishing, OS for social engineering.
					</p>
				</div>

				<h3>5. Work Patterns & Timestamps</h3>
				<div className='overflow-x-auto'>
					<table className='w-full border text-sm my-4'>
						<thead>
							<tr className='bg-gray-100 dark:bg-gray-800'>
								<th className='border px-3 py-2 text-left'>Timestamp</th>
								<th className='border px-3 py-2 text-left'>What It Reveals</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td className='border px-3 py-2'>
									Created: 2025-01-05 23:47:12 PST
								</td>
								<td className='border px-3 py-2'>
									You work late (or are in a different timezone)
								</td>
							</tr>
							<tr>
								<td className='border px-3 py-2'>
									Modified: 2025-01-06 02:15:33 PST
								</td>
								<td className='border px-3 py-2'>
									You revised at 2 AM (tight deadline?)
								</td>
							</tr>
							<tr>
								<td className='border px-3 py-2'>
									50+ modification timestamps
								</td>
								<td className='border px-3 py-2'>
									Document went through many revisions
								</td>
							</tr>
							<tr>
								<td className='border px-3 py-2'>Timezone: UTC+8</td>
								<td className='border px-3 py-2'>
									Your approximate location (Asia-Pacific)
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</section>

			<section className='mb-12'>
				<h2>How to View PDF Metadata</h2>

				<h3>Method 1: Adobe Acrobat Reader (Free)</h3>
				<ol>
					<li>Open the PDF in Adobe Acrobat Reader</li>
					<li>
						Click <strong>File → Properties</strong> (or press Ctrl+D / Cmd+D)
					</li>
					<li>
						Review tabs:
						<ul className='mt-2'>
							<li>
								<strong>Description:</strong> Author, title, subject, keywords
							</li>
							<li>
								<strong>Security:</strong> Encryption and permissions
							</li>
							<li>
								<strong>Fonts:</strong> Embedded font information
							</li>
							<li>
								<strong>Initial View:</strong> Default display settings
							</li>
							<li>
								<strong>Custom:</strong> User-defined metadata fields
							</li>
						</ul>
					</li>
				</ol>

				<h3>Method 2: Preview (Mac)</h3>
				<ol>
					<li>Open PDF in Preview</li>
					<li>
						Click <strong>Tools → Show Inspector</strong> (or press Cmd+I)
					</li>
					<li>
						Click the <strong>(i)</strong> tab for document info
					</li>
					<li>Look for "More Info" dropdown for extended metadata</li>
				</ol>

				<h3>Method 3: File Properties (Windows)</h3>
				<ol>
					<li>Right-click the PDF file</li>
					<li>
						Select <strong>Properties</strong>
					</li>
					<li>
						Click the <strong>Details</strong> tab
					</li>
					<li>Scroll through metadata fields</li>
				</ol>

				<h3>Method 4: Command Line (Advanced)</h3>
				<div className='bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4'>
					<p className='font-semibold mb-2'>Using exiftool (cross-platform):</p>
					<div className='font-mono text-sm space-y-2'>
						<p className='mb-0'>
							# Install exiftool
							<br />
							<span className='text-gray-600 dark:text-gray-400'>
								# Mac: brew install exiftool
							</span>
							<br />
							<span className='text-gray-600 dark:text-gray-400'>
								# Linux: sudo apt install libimage-exiftool-perl
							</span>
						</p>
						<p className='mb-0'>
							# View all metadata
							<br />
							exiftool document.pdf
						</p>
						<p className='mb-0'>
							# View specific field
							<br />
							exiftool -Author -Creator document.pdf
						</p>
					</div>
				</div>

				<h3>Method 5: Online Metadata Viewers</h3>
				<div className='bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 my-4'>
					<p className='font-semibold mb-2'>⚠️ Security Warning</p>
					<p className='text-sm mb-0'>
						Avoid uploading sensitive PDFs to online metadata viewers. If you
						must use one, test with a non-confidential file first. Remember:
						once uploaded, you've shared that metadata with the service.
					</p>
				</div>
			</section>

			<section className='mb-12'>
				<h2>How to Remove or Sanitize PDF Metadata</h2>

				<h3>Adobe Acrobat Pro (Commercial)</h3>
				<ol>
					<li>
						Open PDF in Adobe Acrobat Pro
						<ul className='mt-2'>
							<li>
								Go to <strong>File → Properties</strong>
							</li>
							<li>Edit or clear fields individually, OR</li>
						</ul>
					</li>
					<li>
						Use the "Sanitize Document" tool:
						<ul className='mt-2'>
							<li>
								Go to <strong>Tools → Redact</strong>
							</li>
							<li>
								Click <strong>Remove Hidden Information</strong>
							</li>
							<li>Check what to remove</li>
							<li>
								Click <strong>Remove</strong>
							</li>
						</ul>
					</li>
				</ol>

				<h3>exiftool (Free, Command-line)</h3>
				<div className='bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4'>
					<div className='font-mono text-sm space-y-2'>
						<p className='mb-0'>
							# Remove ALL metadata
							<br />
							exiftool -all:all= document.pdf
						</p>
						<p className='mb-0'>
							# Remove specific fields
							<br />
							exiftool -Author= -Creator= -Producer= document.pdf
						</p>
						<p className='mb-0'>
							# Clean and save as new file
							<br />
							exiftool -all:all= -o clean.pdf document.pdf
						</p>
					</div>
				</div>

				<h3>PDF-XChange Editor (Free Version Available)</h3>
				<ol>
					<li>
						Open PDF in PDF-XChange Editor
						<ul className='mt-2'>
							<li>
								Go to <strong>File → Document Properties</strong>
							</li>
							<li>Clear individual fields</li>
							<li>Click OK and save</li>
						</ul>
					</li>
				</ol>

				<h3>QPDF (Free, Command-line)</h3>
				<div className='bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4'>
					<div className='font-mono text-sm'>
						<p className='mb-0'>
							# Linearize and strip metadata
							<br />
							qpdf --linearize --object-streams=generate \
							<br />
							&nbsp;&nbsp;--stream-data=compress \
							<br />
							&nbsp;&nbsp;input.pdf output.pdf
						</p>
					</div>
				</div>

				<h3>Print to PDF (Quick & Dirty Method)</h3>
				<div className='bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 my-4'>
					<p className='font-semibold mb-2'>Quick Fix (with caveats):</p>
					<ol className='text-sm space-y-1 mb-0'>
						<li>Open PDF in any viewer</li>
						<li>
							Print to PDF (File → Print → Save as PDF / Microsoft Print to PDF)
						</li>
						<li>
							The new PDF will have minimal metadata (creation date, producer)
						</li>
					</ol>
					<p className='text-sm mt-3 mb-0'>
						<strong>⚠️ Drawback:</strong> May reduce quality, lose bookmarks,
						and remove form fields.
					</p>
				</div>
			</section>

			<section className='mb-12'>
				<h2>What Metadata Should You Keep?</h2>

				<div className='overflow-x-auto'>
					<table className='w-full border text-sm'>
						<thead>
							<tr className='bg-gray-100 dark:bg-gray-800'>
								<th className='border px-3 py-2 text-left'>Field</th>
								<th className='border px-3 py-2 text-left'>Keep?</th>
								<th className='border px-3 py-2 text-left'>Reasoning</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td className='border px-3 py-2'>Title</td>
								<td className='border px-3 py-2 text-green-600'>
									<strong>Yes</strong>
								</td>
								<td className='border px-3 py-2'>
									Helpful for identification
								</td>
							</tr>
							<tr>
								<td className='border px-3 py-2'>Author</td>
								<td className='border px-3 py-2 text-orange-600'>
									<strong>Maybe</strong>
								</td>
								<td className='border px-3 py-2'>
									Use generic (e.g., "HR Department") instead of personal name
								</td>
							</tr>
							<tr>
								<td className='border px-3 py-2'>Subject</td>
								<td className='border px-3 py-2 text-green-600'>
									<strong>Yes</strong>
								</td>
								<td className='border px-3 py-2'>Useful for searches</td>
							</tr>
							<tr>
								<td className='border px-3 py-2'>Keywords</td>
								<td className='border px-3 py-2 text-green-600'>
									<strong>Yes</strong>
								</td>
								<td className='border px-3 py-2'>Improves searchability</td>
							</tr>
							<tr>
								<td className='border px-3 py-2'>Creation Date</td>
								<td className='border px-3 py-2 text-orange-600'>
									<strong>Maybe</strong>
								</td>
								<td className='border px-3 py-2'>
									Keep for archival, remove for anonymity
								</td>
							</tr>
							<tr>
								<td className='border px-3 py-2'>Modification Date</td>
								<td className='border px-3 py-2 text-red-600'>
									<strong>No</strong>
								</td>
								<td className='border px-3 py-2'>
									Reveals work patterns and editing frequency
								</td>
							</tr>
							<tr>
								<td className='border px-3 py-2'>Creator (Software)</td>
								<td className='border px-3 py-2 text-red-600'>
									<strong>No</strong>
								</td>
								<td className='border px-3 py-2'>
									Reveals software versions, potential security risks
								</td>
							</tr>
							<tr>
								<td className='border px-3 py-2'>Producer</td>
								<td className='border px-3 py-2 text-red-600'>
									<strong>No</strong>
								</td>
								<td className='border px-3 py-2'>Technical detail, not needed</td>
							</tr>
							<tr>
								<td className='border px-3 py-2'>GPS Coordinates</td>
								<td className='border px-3 py-2 text-red-600'>
									<strong>Never</strong>
								</td>
								<td className='border px-3 py-2'>
									<strong>Major privacy risk</strong>
								</td>
							</tr>
							<tr>
								<td className='border px-3 py-2'>Company Name</td>
								<td className='border px-3 py-2 text-orange-600'>
									<strong>Maybe</strong>
								</td>
								<td className='border px-3 py-2'>
									Keep for official docs, remove for confidential sharing
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</section>

			<section className='mb-12'>
				<h2>Industry-Specific Metadata Concerns</h2>

				<h3>Legal & Compliance</h3>
				<ul>
					<li>
						<strong>Risk:</strong> Attorney names, firm information, document
						versions revealing strategy changes
					</li>
					<li>
						<strong>Best practice:</strong> Strip all metadata before sharing
						with opposing counsel or filing with courts
					</li>
				</ul>

				<h3>Healthcare (HIPAA)</h3>
				<ul>
					<li>
						<strong>Risk:</strong> Patient data in metadata, GPS from medical
						imaging scans
					</li>
					<li>
						<strong>Best practice:</strong> Use HIPAA-compliant PDF tools that
						auto-sanitize metadata
					</li>
				</ul>

				<h3>Finance</h3>
				<ul>
					<li>
						<strong>Risk:</strong> Analyst names, internal system names, editing
						history of financial models
					</li>
					<li>
						<strong>Best practice:</strong> Remove all technical metadata, keep
						only title and creation date
					</li>
				</ul>

				<h3>Government & Defense</h3>
				<ul>
					<li>
						<strong>Risk:</strong> Classification markings, author clearances,
						originating systems
					</li>
					<li>
						<strong>Best practice:</strong> Use certified sanitization tools that
						meet government standards
					</li>
				</ul>

				<h3>Journalism & Activism</h3>
				<ul>
					<li>
						<strong>Risk:</strong> Source identity, location data, document
						provenance
					</li>
					<li>
						<strong>Best practice:</strong> Complete metadata removal, use tools
						like MAT2 or Dangerzone
					</li>
				</ul>
			</section>

			<section className='mb-12'>
				<h2>Advanced: Hidden Data Beyond Metadata</h2>

				<h3>1. Deleted or "Invisible" Content</h3>
				<p>
					Sometimes content is "hidden" by covering it with white rectangles
					rather than truly deleting it:
				</p>
				<ul>
					<li>Select All (Ctrl+A) can reveal hidden text</li>
					<li>OCR tools can detect text under white boxes</li>
					<li>
						Proper redaction requires using dedicated redaction tools, not just
						black rectangles
					</li>
				</ul>

				<h3>2. Embedded Files</h3>
				<p>PDFs can contain hidden attachments:</p>
				<ul>
					<li>Source Word/Excel documents</li>
					<li>Audio or video files</li>
					<li>Other PDFs</li>
					<li>Executable files (malware risk!)</li>
				</ul>

				<div className='bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 my-4'>
					<p className='font-semibold mb-2'>How to Check:</p>
					<p className='text-sm mb-0'>
						Adobe Acrobat: <strong>View → Show/Hide → Navigation Panes → Attachments</strong>
					</p>
				</div>

				<h3>3. JavaScript & Actions</h3>
				<p>PDFs can contain JavaScript that runs when opened:</p>
				<ul>
					<li>Tracking codes that "phone home"</li>
					<li>Forms that submit data</li>
					<li>Automatic printing or email actions</li>
				</ul>

				<h3>4. Layers & Optional Content</h3>
				<p>Design PDFs may have hidden layers:</p>
				<ul>
					<li>Draft text below final version</li>
					<li>Comments and annotations</li>
					<li>Alternative images or graphics</li>
				</ul>
			</section>

			<section className='mb-12'>
				<h2>Best Practices for Metadata Privacy</h2>

				<div className='space-y-4'>
					<div className='bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-4'>
						<h4 className='font-semibold mb-2'>
							✅ Before Sharing Any PDF Externally
						</h4>
						<ol className='text-sm space-y-1 mb-0'>
							<li>Review metadata using methods above</li>
							<li>Remove or sanitize sensitive fields</li>
							<li>Check for hidden content</li>
							<li>Use "Print to PDF" for maximum sanitization (if acceptable)</li>
							<li>Test the cleaned file before sending</li>
						</ol>
					</div>

					<div className='bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4'>
						<h4 className='font-semibold mb-2'>
							💡 Configure PDF Creation Defaults
						</h4>
						<p className='text-sm mb-2'>Set your software to minimize metadata:</p>
						<ul className='text-sm space-y-1 mb-0'>
							<li>Microsoft Word: File → Options → Trust Center → Privacy Options</li>
							<li>Adobe Products: Preferences → Documents → Remove hidden information</li>
							<li>macOS: System Preferences → Security & Privacy → Analytics → Disable</li>
						</ul>
					</div>

					<div className='bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-500 p-4'>
						<h4 className='font-semibold mb-2'>
							🔐 For Maximum Privacy
						</h4>
						<ul className='text-sm space-y-1 mb-0'>
							<li>
								Use PDF tools that process files locally (like PDF Wonder Kit) rather
								than uploading to servers
							</li>
							<li>Strip all metadata before sharing</li>
							<li>Flatten all layers and transparency</li>
							<li>Remove embedded files and attachments</li>
							<li>Disable JavaScript if not needed</li>
						</ul>
					</div>
				</div>
			</section>

			<section className='mb-12'>
				<h2>Conclusion: Metadata Matters</h2>
				<p>
					PDF metadata is like a digital fingerprint — it can reveal far more
					than you intend. Before sharing any PDF, especially sensitive
					documents, take a moment to review and clean its metadata.
				</p>

				<div className='bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-4 my-6'>
					<p className='font-semibold mb-2'>Remember:</p>
					<ul className='text-sm space-y-1 mb-0'>
						<li>
							<strong>Visible content ≠ All content:</strong> Metadata is
							hidden but readable
						</li>
						<li>
							<strong>Prevention is easier than cleanup:</strong> Configure
							software defaults
						</li>
						<li>
							<strong>Different risks for different industries:</strong> Assess
							your specific needs
						</li>
						<li>
							<strong>Tools exist to help:</strong> Use metadata viewers and
							sanitizers
						</li>
						<li>
							<strong>Client-side processing is safer:</strong> Don't upload
							sensitive files to clean them
						</li>
					</ul>
				</div>

				<div className='bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg'>
					<h3 className='text-xl font-bold mb-3'>
						Process PDFs Without Uploading
					</h3>
					<p className='mb-4'>
						PDF Wonder Kit processes all PDFs directly in your browser. No uploads
						means no metadata ever leaves your device — true privacy by design.
					</p>
					<a
						href='/'
						className='inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors'
					>
						Try PDF Wonder Kit Free →
					</a>
				</div>
			</section>
		</BlogLayout>
	);
}
