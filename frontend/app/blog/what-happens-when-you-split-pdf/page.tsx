import type { Metadata } from 'next';
import { BlogLayout } from '@/components/blog/BlogLayout';

export const metadata: Metadata = {
	title: 'What Happens When You Split a PDF? (Technical Breakdown) | DocSlicer',
	description:
		'Behind-the-scenes look at PDF splitting. Learn exactly what happens to your document when you extract pages, and why client-side processing protects your privacy.',
	keywords: [
		'how PDF splitting works',
		'PDF technical breakdown',
		'split PDF process',
		'PDF page extraction',
		'PDF structure',
		'client-side PDF processing',
		'PDF privacy',
		'PDF security',
		'PDF manipulation explained',
	],
	openGraph: {
		title: 'What Happens When You Split a PDF? (Technical Breakdown)',
		description:
			'Behind-the-scenes look at PDF splitting and exactly what happens to your document.',
		type: 'article',
		publishedTime: '2025-01-05T00:00:00Z',
		authors: ['DocSlicer Team'],
	},
	alternates: {
		canonical: 'https://docslicer.com/blog/what-happens-when-you-split-pdf',
	},
};

const postData = {
	title: 'What Happens When You Split a PDF? (Technical Breakdown)',
	description:
		'Behind-the-scenes look at PDF splitting. Learn exactly what happens to your document when you extract pages, and why client-side processing protects your privacy.',
	author: 'DocSlicer Team',
	date: 'January 5, 2025',
	readTime: '8 min read',
	category: 'Technical',
	tags: ['pdf splitting', 'technical', 'privacy', 'client-side'],
	slug: 'what-happens-when-you-split-pdf',
};

export default function BlogPost() {
	return (
		<BlogLayout post={postData}>
			<section className='mb-12'>
				<h2>Introduction: The Magic Behind PDF Splitting</h2>
				<p className='text-lg'>
					You upload a PDF, select pages, click "split," and seconds later you
					have separate files. It seems simple, but what's actually happening
					behind the scenes? This guide reveals the technical process and
					explains why understanding it matters for your privacy and security.
				</p>

				<div className='bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 my-6'>
					<p className='text-sm font-semibold mb-2'>💡 Quick Answer</p>
					<p className='text-sm mb-0'>
						Splitting a PDF creates entirely new files by copying specific page
						objects and rebuilding the PDF structure. It's not just "cutting" —
						it's reconstruction.
					</p>
				</div>
			</section>

			<section className='mb-12'>
				<h2>Step 1: Reading and Parsing the PDF</h2>

				<h3>The PDF File Structure</h3>
				<p>A PDF isn't a single blob of data — it's a structured document:</p>

				<div className='bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4 font-mono text-sm'>
					<pre className='whitespace-pre-wrap mb-0'>{`%PDF-1.7        ← Header (version)
...
1 0 obj         ← Object 1 (catalog)
  << /Type /Catalog
     /Pages 2 0 R >>
endobj

2 0 obj         ← Object 2 (page tree)
  << /Type /Pages
     /Kids [3 0 R 4 0 R 5 0 R]
     /Count 3 >>
endobj

3 0 obj         ← Object 3 (page 1)
  << /Type /Page
     /Parent 2 0 R
     /Contents 6 0 R
     /Resources ... >>
endobj
...
xref            ← Cross-reference table
trailer         ← File trailer
%%EOF           ← End of file`}</pre>
				</div>

				<h3>What Gets Parsed</h3>
				<div className='grid md:grid-cols-2 gap-4 my-6'>
					<div className='border-l-4 border-blue-500 pl-4'>
						<h4 className='font-semibold mb-2'>Document Catalog</h4>
						<ul className='text-sm space-y-1'>
							<li>Root of the PDF structure</li>
							<li>Points to page tree</li>
							<li>Contains document-level metadata</li>
						</ul>
					</div>

					<div className='border-l-4 border-purple-500 pl-4'>
						<h4 className='font-semibold mb-2'>Page Tree</h4>
						<ul className='text-sm space-y-1'>
							<li>Hierarchical organization of pages</li>
							<li>References to individual page objects</li>
							<li>Shared resources (fonts, images)</li>
						</ul>
					</div>

					<div className='border-l-4 border-green-500 pl-4'>
						<h4 className='font-semibold mb-2'>Page Objects</h4>
						<ul className='text-sm space-y-1'>
							<li>Individual page definitions</li>
							<li>Content streams (text, graphics)</li>
							<li>Page-specific resources</li>
						</ul>
					</div>

					<div className='border-l-4 border-orange-500 pl-4'>
						<h4 className='font-semibold mb-2'>Resources</h4>
						<ul className='text-sm space-y-1'>
							<li>Embedded fonts</li>
							<li>Images and graphics</li>
							<li>Color spaces and patterns</li>
						</ul>
					</div>
				</div>

				<div className='bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 my-4'>
					<p className='font-semibold mb-2'>⚠️ Why This Matters</p>
					<p className='text-sm mb-0'>
						Understanding the structure reveals why some PDF tools can read your
						document without splitting it. DocSlicer processes everything locally
						in your browser — the file never touches our servers.
					</p>
				</div>
			</section>

			<section className='mb-12'>
				<h2>Step 2: Identifying Pages and Dependencies</h2>

				<h3>Page Identification</h3>
				<p>
					The splitting tool needs to identify which pages you want to extract:
				</p>

				<ol>
					<li>
						<strong>Read the page tree:</strong> Traverse the hierarchical
						structure
					</li>
					<li>
						<strong>Map page numbers:</strong> Pages 1-100 → Object references
					</li>
					<li>
						<strong>Validate selection:</strong> Ensure requested pages exist
					</li>
				</ol>

				<h3>Dependency Analysis</h3>
				<p>Each page might depend on resources used by other pages:</p>

				<div className='bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4'>
					<p className='font-semibold mb-2'>Example Scenario:</p>
					<ul className='text-sm space-y-2 mb-0'>
						<li>
							<strong>Pages 1-50:</strong> Use Arial font (Object 100)
						</li>
						<li>
							<strong>Page 25:</strong> Contains Company Logo image (Object 200)
						</li>
						<li>
							<strong>Pages 30-100:</strong> Use Times New Roman (Object 101)
						</li>
					</ul>
					<p className='text-sm mt-3 mb-0'>
						<strong>When splitting pages 20-30:</strong> The new PDF must
						include Objects 100 (Arial), 101 (Times), and 200 (logo).
					</p>
				</div>

				<h3>Resource Detection</h3>
				<p>The tool analyzes what needs to be copied:</p>
				<ul>
					<li>
						<strong>Fonts:</strong> Which font objects are referenced?
					</li>
					<li>
						<strong>Images:</strong> Which images appear on selected pages?
					</li>
					<li>
						<strong>Color profiles:</strong> Which color spaces are used?
					</li>
					<li>
						<strong>Form fields:</strong> Any interactive elements?
					</li>
					<li>
						<strong>Annotations:</strong> Comments, highlights, etc.?
					</li>
				</ul>
			</section>

			<section className='mb-12'>
				<h2>Step 3: Creating the New PDF Structure</h2>

				<h3>Building from Scratch</h3>
				<p>
					The new PDF isn't a "copy-paste" — it's a complete reconstruction:
				</p>

				<div className='space-y-4 my-6'>
					<div className='border rounded-lg p-4'>
						<h4 className='font-semibold mb-2'>1. Create New Catalog</h4>
						<p className='text-sm mb-2'>
							The root object that defines the new document:
						</p>
						<div className='bg-gray-100 dark:bg-gray-800 p-3 rounded font-mono text-xs'>
							<pre className='mb-0'>{`<< /Type /Catalog
   /Pages <new page tree>
   /Version /1.7 >>`}</pre>
						</div>
					</div>

					<div className='border rounded-lg p-4'>
						<h4 className='font-semibold mb-2'>2. Build New Page Tree</h4>
						<p className='text-sm mb-2'>
							References only the selected pages:
						</p>
						<div className='bg-gray-100 dark:bg-gray-800 p-3 rounded font-mono text-xs'>
							<pre className='mb-0'>{`<< /Type /Pages
   /Kids [<page 1> <page 2> ... <page N>]
   /Count N >>`}</pre>
						</div>
					</div>

					<div className='border rounded-lg p-4'>
						<h4 className='font-semibold mb-2'>3. Copy Page Objects</h4>
						<p className='text-sm mb-2'>
							Each page definition with all its properties:
						</p>
						<ul className='text-sm space-y-1 mb-0'>
							<li>Page dimensions (MediaBox, CropBox)</li>
							<li>Rotation angle</li>
							<li>Content streams</li>
							<li>Resource dictionary</li>
						</ul>
					</div>

					<div className='border rounded-lg p-4'>
						<h4 className='font-semibold mb-2'>4. Copy Required Resources</h4>
						<p className='text-sm mb-2'>Only what's needed:</p>
						<ul className='text-sm space-y-1 mb-0'>
							<li>Fonts used on selected pages</li>
							<li>Images that appear on selected pages</li>
							<li>Graphics state objects</li>
							<li>Color profiles</li>
						</ul>
					</div>
				</div>

				<h3>Object Renumbering</h3>
				<p>
					PDF objects have unique IDs. When creating a new file, IDs must be
					renumbered:
				</p>

				<div className='overflow-x-auto'>
					<table className='w-full border text-sm'>
						<thead>
							<tr className='bg-gray-100 dark:bg-gray-800'>
								<th className='border px-3 py-2 text-left'>Original PDF</th>
								<th className='border px-3 py-2 text-left'>New PDF</th>
								<th className='border px-3 py-2 text-left'>Why?</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td className='border px-3 py-2'>Page 25 = Object 50</td>
								<td className='border px-3 py-2'>Page 1 = Object 3</td>
								<td className='border px-3 py-2'>
									Sequential numbering from start
								</td>
							</tr>
							<tr>
								<td className='border px-3 py-2'>Arial Font = Object 100</td>
								<td className='border px-3 py-2'>Arial Font = Object 5</td>
								<td className='border px-3 py-2'>
									Avoid gaps in numbering
								</td>
							</tr>
							<tr>
								<td className='border px-3 py-2'>Image = Object 200</td>
								<td className='border px-3 py-2'>Image = Object 6</td>
								<td className='border px-3 py-2'>Compact file structure</td>
							</tr>
						</tbody>
					</table>
				</div>
			</section>

			<section className='mb-12'>
				<h2>Step 4: Handling Special Content</h2>

				<h3>Interactive Elements</h3>
				<p>Form fields and annotations require special handling:</p>

				<div className='grid md:grid-cols-2 gap-4 my-6'>
					<div className='border-l-4 border-blue-500 pl-4'>
						<h4 className='font-semibold mb-2'>Form Fields</h4>
						<ul className='text-sm space-y-1'>
							<li>Copy field definitions</li>
							<li>Update parent-child relationships</li>
							<li>Preserve field values if filled</li>
							<li>Maintain JavaScript actions</li>
						</ul>
					</div>

					<div className='border-l-4 border-purple-500 pl-4'>
						<h4 className='font-semibold mb-2'>Annotations</h4>
						<ul className='text-sm space-y-1'>
							<li>Comments and highlights</li>
							<li>Links (internal and external)</li>
							<li>Sticky notes</li>
							<li>Stamps and signatures</li>
						</ul>
					</div>
				</div>

				<h3>Bookmarks & Table of Contents</h3>
				<p>Bookmarks pointing to extracted pages must be updated:</p>

				<div className='bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4'>
					<p className='font-semibold mb-2'>Example:</p>
					<ul className='text-sm space-y-2 mb-0'>
						<li>
							<strong>Original PDF:</strong> Bookmark "Chapter 3" → Page 25
						</li>
						<li>
							<strong>Extract pages 20-30:</strong> "Chapter 3" → Page 6 (in new
							PDF)
						</li>
						<li>
							<strong>Bookmarks outside range:</strong> Removed or marked as
							broken
						</li>
					</ul>
				</div>

				<h3>Hyperlinks</h3>
				<p>Links between pages need adjusting:</p>
				<ul>
					<li>
						<strong>Internal links:</strong> Update page references
					</li>
					<li>
						<strong>External links:</strong> Preserved as-is
					</li>
					<li>
						<strong>Broken links:</strong> Links to non-extracted pages
					</li>
				</ul>
			</section>

			<section className='mb-12'>
				<h2>Step 5: Optimization and Compression</h2>

				<h3>What Gets Optimized</h3>

				<div className='space-y-4 my-6'>
					<div className='border-l-4 border-green-500 pl-4'>
						<h4 className='font-semibold mb-2'>Unused Resources Removed</h4>
						<p className='text-sm mb-2'>
							If the original PDF had 10 fonts but extracted pages only use 3:
						</p>
						<ul className='text-sm space-y-1 mb-0'>
							<li>Original: 10 fonts × 500 KB = 5 MB font data</li>
							<li>New PDF: 3 fonts × 500 KB = 1.5 MB font data</li>
							<li>
								<strong className='text-green-600'>Savings: 3.5 MB</strong>
							</li>
						</ul>
					</div>

					<div className='border-l-4 border-blue-500 pl-4'>
						<h4 className='font-semibold mb-2'>Image Deduplication</h4>
						<p className='text-sm mb-2'>
							If the same company logo appears on 10 pages:
						</p>
						<ul className='text-sm space-y-1 mb-0'>
							<li>Bad approach: Copy image 10 times</li>
							<li>Good approach: 1 image object, referenced 10 times</li>
							<li>Savings: Significant for repeated content</li>
						</ul>
					</div>

					<div className='border-l-4 border-orange-500 pl-4'>
						<h4 className='font-semibold mb-2'>Compression</h4>
						<p className='text-sm mb-0'>
							Content streams are compressed using Flate (ZIP) algorithm,
							typically achieving 50-70% size reduction for text-heavy content.
						</p>
					</div>
				</div>

				<h3>Size Comparison Example</h3>
				<div className='overflow-x-auto'>
					<table className='w-full border text-sm'>
						<thead>
							<tr className='bg-gray-100 dark:bg-gray-800'>
								<th className='border px-3 py-2 text-left'>Scenario</th>
								<th className='border px-3 py-2 text-left'>Original</th>
								<th className='border px-3 py-2 text-left'>After Split</th>
								<th className='border px-3 py-2 text-left'>Why?</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td className='border px-3 py-2'>
									Extract 10 pages from 100-page PDF
								</td>
								<td className='border px-3 py-2'>10 MB</td>
								<td className='border px-3 py-2'>1-2 MB</td>
								<td className='border px-3 py-2'>
									Proportional + removed unused resources
								</td>
							</tr>
							<tr>
								<td className='border px-3 py-2'>
									Pages with many shared resources
								</td>
								<td className='border px-3 py-2'>10 MB</td>
								<td className='border px-3 py-2'>2-3 MB</td>
								<td className='border px-3 py-2'>
									Must include all shared fonts/images
								</td>
							</tr>
							<tr>
								<td className='border px-3 py-2'>
									Pages with unique high-res images
								</td>
								<td className='border px-3 py-2'>10 MB</td>
								<td className='border px-3 py-2'>0.8-1 MB</td>
								<td className='border px-3 py-2'>
									Truly proportional split
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</section>

			<section className='mb-12'>
				<h2>Step 6: Writing the New PDF File</h2>

				<h3>The PDF Assembly Process</h3>
				<ol>
					<li>
						<strong>Write header:</strong> <code>%PDF-1.7</code>
					</li>
					<li>
						<strong>Write objects sequentially:</strong> Catalog, pages,
						resources, content
					</li>
					<li>
						<strong>Build cross-reference table:</strong> Maps object IDs to
						byte positions
					</li>
					<li>
						<strong>Write trailer:</strong> Points to catalog and xref table
					</li>
					<li>
						<strong>Add EOF marker:</strong> <code>%%EOF</code>
					</li>
				</ol>

				<div className='bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4 font-mono text-xs'>
					<pre className='whitespace-pre-wrap mb-0'>{`%PDF-1.7
%âãÏÓ
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R
   /MediaBox [0 0 612 792]
   /Contents 4 0 R
   /Resources << /Font << /F1 5 0 R >> >> >>
endobj
4 0 obj
<< /Length 44 >>
stream
BT /F1 12 Tf 50 700 Td (Hello World) Tj ET
endstream
endobj
5 0 obj
<< /Type /Font /Subtype /Type1
   /BaseFont /Helvetica >>
endobj
xref
0 6
0000000000 65535 f
0000000015 00000 n
0000000068 00000 n
0000000125 00000 n
0000000265 00000 n
0000000356 00000 n
trailer
<< /Size 6 /Root 1 0 R >>
startxref
441
%%EOF`}</pre>
				</div>
			</section>

			<section className='mb-12'>
				<h2>Client-Side vs Server-Side Processing</h2>

				<h3>The Privacy Difference</h3>

				<div className='grid md:grid-cols-2 gap-4 my-6'>
					<div className='bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4'>
						<h4 className='font-semibold mb-3 text-red-800 dark:text-red-200'>
							🚨 Server-Side Processing
						</h4>
						<ul className='text-sm space-y-2 mb-0'>
							<li>
								<strong>Step 1:</strong> Upload entire PDF to server
							</li>
							<li>
								<strong>Step 2:</strong> Server reads and processes file
							</li>
							<li>
								<strong>Step 3:</strong> Server creates new PDF
							</li>
							<li>
								<strong>Step 4:</strong> Download result
							</li>
							<li className='text-red-600 font-semibold'>
								⚠️ Your file passes through their servers
							</li>
						</ul>
					</div>

					<div className='bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4'>
						<h4 className='font-semibold mb-3 text-green-800 dark:text-green-200'>
							✅ Client-Side Processing (DocSlicer)
						</h4>
						<ul className='text-sm space-y-2 mb-0'>
							<li>
								<strong>Step 1:</strong> Select file in browser
							</li>
							<li>
								<strong>Step 2:</strong> JavaScript reads file locally
							</li>
							<li>
								<strong>Step 3:</strong> Browser creates new PDF
							</li>
							<li>
								<strong>Step 4:</strong> Download from browser memory
							</li>
							<li className='text-green-600 font-semibold'>
								✓ File never leaves your device
							</li>
						</ul>
					</div>
				</div>

				<h3>Technical Implementation</h3>
				<p>DocSlicer uses modern browser APIs:</p>
				<ul>
					<li>
						<strong>File API:</strong> Read PDF without uploading
					</li>
					<li>
						<strong>Web Workers:</strong> Process PDFs without freezing UI
					</li>
					<li>
						<strong>ArrayBuffer:</strong> Efficient binary data handling
					</li>
					<li>
						<strong>Blob URLs:</strong> Create downloadable files in-memory
					</li>
				</ul>
			</section>

			<section className='mb-12'>
				<h2>Performance: How Fast Should It Be?</h2>

				<div className='overflow-x-auto'>
					<table className='w-full border text-sm'>
						<thead>
							<tr className='bg-gray-100 dark:bg-gray-800'>
								<th className='border px-3 py-2 text-left'>File Size</th>
								<th className='border px-3 py-2 text-left'>Pages</th>
								<th className='border px-3 py-2 text-left'>Expected Time</th>
								<th className='border px-3 py-2 text-left'>Bottleneck</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td className='border px-3 py-2'>&lt;1 MB</td>
								<td className='border px-3 py-2'>1-10</td>
								<td className='border px-3 py-2'>
									<strong>&lt;1 second</strong>
								</td>
								<td className='border px-3 py-2'>None</td>
							</tr>
							<tr>
								<td className='border px-3 py-2'>1-10 MB</td>
								<td className='border px-3 py-2'>10-100</td>
								<td className='border px-3 py-2'>
									<strong>1-3 seconds</strong>
								</td>
								<td className='border px-3 py-2'>Parsing</td>
							</tr>
							<tr>
								<td className='border px-3 py-2'>10-50 MB</td>
								<td className='border px-3 py-2'>100-500</td>
								<td className='border px-3 py-2'>
									<strong>3-10 seconds</strong>
								</td>
								<td className='border px-3 py-2'>Memory allocation</td>
							</tr>
							<tr>
								<td className='border px-3 py-2'>&gt;50 MB</td>
								<td className='border px-3 py-2'>500+</td>
								<td className='border px-3 py-2'>
									<strong>10-30 seconds</strong>
								</td>
								<td className='border px-3 py-2'>CPU processing</td>
							</tr>
						</tbody>
					</table>
				</div>

				<div className='bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 my-4'>
					<p className='font-semibold mb-2'>⚡ Performance Tip</p>
					<p className='text-sm mb-0'>
						Splitting becomes slower with: many pages, high-res images, embedded
						fonts, and complex graphics. Text-only PDFs split almost instantly.
					</p>
				</div>
			</section>

			<section className='mb-12'>
				<h2>What Can Go Wrong?</h2>

				<h3>Common Issues</h3>

				<div className='space-y-4'>
					<div className='border-l-4 border-red-500 pl-4'>
						<h4 className='font-semibold mb-2'>Corrupted PDFs</h4>
						<ul className='text-sm space-y-1'>
							<li>
								<strong>Symptom:</strong> Splitting fails or produces corrupted
								output
							</li>
							<li>
								<strong>Cause:</strong> Malformed PDF structure
							</li>
							<li>
								<strong>Fix:</strong> Repair PDF with Adobe Acrobat or similar
								tool
							</li>
						</ul>
					</div>

					<div className='border-l-4 border-orange-500 pl-4'>
						<h4 className='font-semibold mb-2'>Encrypted PDFs</h4>
						<ul className='text-sm space-y-1'>
							<li>
								<strong>Symptom:</strong> "Password required" or "Encrypted"
								error
							</li>
							<li>
								<strong>Cause:</strong> PDF has security restrictions
							</li>
							<li>
								<strong>Fix:</strong> Unlock PDF first, then split
							</li>
						</ul>
					</div>

					<div className='border-l-4 border-yellow-500 pl-4'>
						<h4 className='font-semibold mb-2'>Missing Fonts</h4>
						<ul className='text-sm space-y-1'>
							<li>
								<strong>Symptom:</strong> Text appears garbled or as boxes
							</li>
							<li>
								<strong>Cause:</strong> Fonts not properly embedded
							</li>
							<li>
								<strong>Fix:</strong> Re-create PDF with embedded fonts
							</li>
						</ul>
					</div>

					<div className='border-l-4 border-purple-500 pl-4'>
						<h4 className='font-semibold mb-2'>Browser Memory Limits</h4>
						<ul className='text-sm space-y-1'>
							<li>
								<strong>Symptom:</strong> "Out of memory" or browser crash
							</li>
							<li>
								<strong>Cause:</strong> Very large PDFs (&gt;100 MB)
							</li>
							<li>
								<strong>Fix:</strong> Use desktop software for huge files
							</li>
						</ul>
					</div>
				</div>
			</section>

			<section className='mb-12'>
				<h2>Conclusion: The Engineering Behind Simplicity</h2>
				<p>
					What seems like a simple "split" operation is actually a sophisticated
					process of parsing, analyzing, copying, rebuilding, and optimizing PDF
					structures. Understanding this process helps you:
				</p>

				<ul>
					<li>Appreciate why client-side processing is more private</li>
					<li>Understand why some PDFs take longer to split</li>
					<li>Know what to expect in terms of file sizes</li>
					<li>Troubleshoot issues when they occur</li>
				</ul>

				<div className='bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-4 my-6'>
					<p className='font-semibold mb-2'>Key Takeaways:</p>
					<ul className='text-sm space-y-1 mb-0'>
						<li>
							<strong>Not just copying:</strong> Complete PDF reconstruction
						</li>
						<li>
							<strong>Resource management:</strong> Only copies what's needed
						</li>
						<li>
							<strong>Privacy:</strong> Client-side = file never uploaded
						</li>
						<li>
							<strong>Speed:</strong> Depends on size and complexity
						</li>
						<li>
							<strong>Safety:</strong> Output is a valid, standard PDF
						</li>
					</ul>
				</div>

				<div className='bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg'>
					<h3 className='text-xl font-bold mb-3'>
						Experience True Client-Side Processing
					</h3>
					<p className='mb-4'>
						DocSlicer processes your PDFs entirely in your browser. No uploads,
						no servers, no privacy concerns. Just fast, secure PDF splitting.
					</p>
					<a
						href='/'
						className='inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors'
					>
						Try DocSlicer Free →
					</a>
				</div>
			</section>
		</BlogLayout>
	);
}
