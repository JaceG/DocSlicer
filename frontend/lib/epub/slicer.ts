import ePub from 'epubjs';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { zip as fflateZip } from 'fflate';
import { SliceTask } from '@/types';

export interface SliceResult {
	success: boolean;
	outputUrl?: string;
	error?: string;
	blobKey?: string;
}

// In-memory blob storage for EPUB files
const epubBlobStore = new Map<string, Blob>();

export interface EPUBSliceOptions {
	startChapter: number;
	endChapter: number;
	fileName: string;
}

export async function sliceEPUB(
	file: File,
	options: EPUBSliceOptions
): Promise<SliceResult> {
	try {
		const { startChapter, endChapter, fileName } = options;

		// Load the EPUB
		const arrayBuffer = await file.arrayBuffer();
		const book = ePub(arrayBuffer);
		await book.ready;

		// Create a new EPUB structure
		const zip = new JSZip();

		// Copy mimetype (must be uncompressed and first file)
		zip.file('mimetype', 'application/epub+zip', { compression: 'STORE' });

		// Create META-INF directory
		const metaInf = zip.folder('META-INF');
		if (metaInf) {
			metaInf.file(
				'container.xml',
				`<?xml version="1.0"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
  <rootfiles>
    <rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/>
  </rootfiles>
</container>`
			);
		}

		// Create OEBPS directory
		const oebps = zip.folder('OEBPS');
		if (!oebps) {
			throw new Error('Failed to create OEBPS folder');
		}

		// Get chapters from the navigation TOC (same as UI) for proper alignment
		const spineItems: string[] = [];
		const manifestItems: string[] = [];

		// Use navigation TOC chapters (same as UI) instead of spine items
		const tocChapters = book.navigation.toc;
		const selectedChapters = tocChapters.slice(
			startChapter,
			endChapter + 1
		);

		console.log(
			`Extracting ${selectedChapters.length} chapters from TOC:`,
			selectedChapters.map((item) => `${item.label} (${item.href})`)
		);

		// Load the original ZIP to access all resources
		const originalZip = new JSZip();
		await originalZip.loadAsync(file);

		// Copy CSS files and other resources
		const resourceFiles = new Set<string>();

		// Find and copy CSS files
		originalZip.forEach((relativePath, zipEntry) => {
			if (
				relativePath.endsWith('.css') ||
				relativePath.endsWith('.png') ||
				relativePath.endsWith('.jpg') ||
				relativePath.endsWith('.jpeg') ||
				relativePath.endsWith('.gif') ||
				relativePath.endsWith('.svg')
			) {
				resourceFiles.add(relativePath);
				console.log(`Found resource: ${relativePath}`);
			}
		});

		console.log(`Total resources found: ${resourceFiles.size}`);

		for (let i = 0; i < selectedChapters.length; i++) {
			const tocChapter = selectedChapters[i];
			const chapterIndex = startChapter + i;

			try {
				const chapterFileName = `chapter_${chapterIndex + 1}.xhtml`;

				// Try different methods to get the content
				let content = '';

				// Method 1: Try to get the raw HTML content from the TOC chapter
				try {
					const section = book.spine.get(tocChapter.href);
					if (section) {
						const sectionContent = await section.load(
							book.load.bind(book)
						);
						if (sectionContent) {
							// Try to extract content from different possible structures
							if (typeof sectionContent === 'string') {
								content = sectionContent;
							} else if (sectionContent.documentElement) {
								content =
									sectionContent.documentElement.innerHTML;
							} else if (sectionContent.body) {
								content = sectionContent.body.innerHTML;
							} else if (sectionContent.innerHTML) {
								content = sectionContent.innerHTML;
							} else if (sectionContent.outerHTML) {
								content = sectionContent.outerHTML;
							}
						}
					}
				} catch (loadError) {
					console.warn(
						`Method 1 failed for chapter ${chapterIndex} (${tocChapter.label}):`,
						loadError
					);
				}

				// Method 2: If Method 1 failed, try to get content directly from the archive
				if (!content) {
					try {
						// Find the content file in the original EPUB
						const contentPath = tocChapter.href.startsWith('OEBPS/')
							? tocChapter.href
							: `OEBPS/${tocChapter.href}`;
						const contentFile =
							originalZip.file(contentPath) ||
							originalZip.file(tocChapter.href);

						if (contentFile) {
							content = await contentFile.async('string');
							// If it's a full HTML document, extract just the body content
							const bodyMatch = content.match(
								/<body[^>]*>([\s\S]*?)<\/body>/i
							);
							if (bodyMatch) {
								content = bodyMatch[1];
							}
						}
					} catch (zipError) {
						console.warn(
							`Method 2 failed for chapter ${chapterIndex} (${tocChapter.label}):`,
							zipError
						);
					}
				}

				// If we still don't have content, create a meaningful fallback
				if (!content || content.trim() === '') {
					console.warn(
						`No content extracted for chapter ${
							chapterIndex + 1
						} (${tocChapter.label}), using fallback`
					);
					content = `<h1>${tocChapter.label}</h1><p>This chapter could not be extracted from the original EPUB file.</p>`;
				} else {
					console.log(
						`Successfully extracted ${
							content.length
						} characters for chapter ${chapterIndex + 1} (${
							tocChapter.label
						})`
					);
				}

				// Clean and create proper XHTML
				const xhtmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>Chapter ${chapterIndex + 1}</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
</head>
<body>
${content}
</body>
</html>`;

				oebps.file(chapterFileName, xhtmlContent);

				manifestItems.push(
					`<item id="chapter${
						chapterIndex + 1
					}" href="${chapterFileName}" media-type="application/xhtml+xml"/>`
				);
				spineItems.push(
					`<itemref idref="chapter${chapterIndex + 1}"/>`
				);
			} catch (error) {
				console.warn(
					`Failed to extract chapter ${chapterIndex}:`,
					error
				);

				// Create a fallback chapter if extraction fails
				const fallbackContent = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>Chapter ${chapterIndex + 1}</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
</head>
<body>
<h1>Chapter ${chapterIndex + 1}</h1>
<p>Content could not be extracted.</p>
</body>
</html>`;

				const chapterFileName = `chapter_${chapterIndex + 1}.xhtml`;
				oebps.file(chapterFileName, fallbackContent);

				manifestItems.push(
					`<item id="chapter${
						chapterIndex + 1
					}" href="${chapterFileName}" media-type="application/xhtml+xml"/>`
				);
				spineItems.push(
					`<itemref idref="chapter${chapterIndex + 1}"/>`
				);
			}
		}

		// Copy resource files (CSS, images, etc.)
		console.log(`Copying ${resourceFiles.size} resource files...`);
		for (const resourcePath of resourceFiles) {
			try {
				const resourceFile = originalZip.file(resourcePath);
				if (resourceFile) {
					const resourceContent = await resourceFile.async(
						'uint8array'
					);

					// Determine the correct path in our new EPUB structure
					let targetPath = resourcePath;
					if (!targetPath.startsWith('OEBPS/')) {
						targetPath = `OEBPS/${targetPath}`;
					}

					// Add to our ZIP
					zip.file(targetPath, resourceContent);
					console.log(
						`Copied resource: ${resourcePath} -> ${targetPath}`
					);

					// Add to manifest if it's not already there
					const fileName =
						resourcePath.split('/').pop() || resourcePath;
					const extension = fileName.split('.').pop()?.toLowerCase();
					let mediaType = 'application/octet-stream';

					switch (extension) {
						case 'css':
							mediaType = 'text/css';
							break;
						case 'png':
							mediaType = 'image/png';
							break;
						case 'jpg':
						case 'jpeg':
							mediaType = 'image/jpeg';
							break;
						case 'gif':
							mediaType = 'image/gif';
							break;
						case 'svg':
							mediaType = 'image/svg+xml';
							break;
					}

					const resourceId = fileName.replace(/[^a-zA-Z0-9]/g, '_');
					const relativePath = targetPath.replace('OEBPS/', '');
					manifestItems.push(
						`<item id="${resourceId}" href="${relativePath}" media-type="${mediaType}"/>`
					);
					console.log(
						`Added to manifest: ${resourceId} -> ${relativePath} (${mediaType})`
					);
				} else {
					console.warn(
						`Resource file not found in ZIP: ${resourcePath}`
					);
				}
			} catch (error) {
				console.warn(`Failed to copy resource ${resourcePath}:`, error);
			}
		}

		// Create content.opf
		const contentOpf = `<?xml version="1.0" encoding="UTF-8"?>
<package xmlns="http://www.idpf.org/2007/opf" unique-identifier="BookId" version="2.0">
  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:opf="http://www.idpf.org/2007/opf">
    <dc:identifier id="BookId">sliced-epub-${Date.now()}</dc:identifier>
    <dc:title>${fileName.replace('.epub', '')}</dc:title>
    <dc:language>en</dc:language>
    <dc:creator>PDF/EPUB Slicer</dc:creator>
    <dc:date>${new Date().toISOString().split('T')[0]}</dc:date>
  </metadata>
  <manifest>
    ${manifestItems.join('\n    ')}
    <item id="ncx" href="toc.ncx" media-type="application/x-dtbncx+xml"/>
  </manifest>
  <spine toc="ncx">
    ${spineItems.join('\n    ')}
  </spine>
</package>`;

		oebps.file('content.opf', contentOpf);

		// Create toc.ncx
		const tocNcx = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE ncx PUBLIC "-//NISO//DTD ncx 2005-1//EN" "http://www.daisy.org/z3986/2005/ncx-2005-1.dtd">
<ncx xmlns="http://www.daisy.org/z3986/2005/ncx/" version="2005-1">
  <head>
    <meta name="dtb:uid" content="sliced-epub-${Date.now()}"/>
    <meta name="dtb:depth" content="1"/>
    <meta name="dtb:totalPageCount" content="0"/>
    <meta name="dtb:maxPageNumber" content="0"/>
  </head>
  <docTitle>
    <text>${fileName.replace('.epub', '')}</text>
  </docTitle>
  <navMap>
    ${selectedChapters
		.map(
			(chapter, index) => `
    <navPoint id="navpoint-${index + 1}" playOrder="${index + 1}">
      <navLabel>
        <text>${chapter.label}</text>
      </navLabel>
      <content src="chapter_${startChapter + index + 1}.xhtml"/>
    </navPoint>`
		)
		.join('')}
  </navMap>
</ncx>`;

		oebps.file('toc.ncx', tocNcx);

		// Generate the EPUB file with proper compression
		const epubBlob = await zip.generateAsync({
			type: 'blob',
			mimeType: 'application/epub+zip',
			compression: 'DEFLATE',
			compressionOptions: {
				level: 9,
			},
		});

		// Store in blob store
		const blobKey = `epub-${Date.now()}-${Math.random()
			.toString(36)
			.substr(2, 9)}`;
		epubBlobStore.set(blobKey, epubBlob);

		// Create object URL
		const outputUrl = URL.createObjectURL(epubBlob);

		return {
			success: true,
			outputUrl,
			fileName,
			blobKey,
		};
	} catch (error) {
		console.error('EPUB slicing error:', error);
		return {
			success: false,
			error:
				error instanceof Error ? error.message : 'Failed to slice EPUB',
		};
	}
}

export async function downloadEPUB(task: SliceTask): Promise<void> {
	try {
		let blob: Blob;

		if (task.blobKey && epubBlobStore.has(task.blobKey)) {
			// Get from blob store
			blob = epubBlobStore.get(task.blobKey)!;
		} else if (task.outputUrl) {
			// Fallback to fetch from URL
			const response = await fetch(task.outputUrl);
			if (!response.ok) {
				throw new Error('Failed to fetch EPUB file');
			}
			blob = await response.blob();
		} else {
			throw new Error('No EPUB data available');
		}

		saveAs(blob, task.fileName);
	} catch (error) {
		console.error('EPUB download error:', error);
		throw error;
	}
}

export function cleanupEPUBBlobStoreEntry(blobKey: string): void {
	epubBlobStore.delete(blobKey);
}

export function getEPUBBlobStoreSize(): number {
	return epubBlobStore.size;
}

export function clearEPUBBlobStore(): void {
	epubBlobStore.clear();
}

// Process multiple EPUB slice tasks
export async function processEPUBSliceTasks(
	file: File,
	tasks: SliceTask[],
	onTaskUpdate: (taskId: string, updates: Partial<SliceTask>) => void
): Promise<void> {
	for (const task of tasks) {
		if (task.status !== 'pending') continue;

		try {
			onTaskUpdate(task.id, { status: 'processing', progress: 0 });

			const result = await sliceEPUB(file, {
				startChapter: task.range.start - 1, // Convert to 0-based index
				endChapter: task.range.end - 1,
				fileName: task.fileName,
			});

			if (result.success) {
				onTaskUpdate(task.id, {
					status: 'completed',
					progress: 100,
					outputUrl: result.outputUrl,
					blobKey: result.blobKey,
				});
			} else {
				onTaskUpdate(task.id, {
					status: 'error',
					progress: 0,
					error: result.error,
				});
			}
		} catch (error) {
			onTaskUpdate(task.id, {
				status: 'error',
				progress: 0,
				error: error instanceof Error ? error.message : 'Unknown error',
			});
		}
	}
}

// Create a ZIP file from multiple EPUB blobs
export async function createZipFromEPUBTasks(
	tasks: SliceTask[],
	zipFileName: string
): Promise<string> {
	console.log(
		`Creating EPUB ZIP for ${tasks.length} tasks:`,
		tasks.map((t) => t.fileName)
	);
	const zip = new JSZip();

	for (const task of tasks) {
		if (task.blobKey && epubBlobStore.has(task.blobKey)) {
			try {
				// Get the blob from our persistent store
				const blob = epubBlobStore.get(task.blobKey)!;
				console.log(
					`EPUB blob - size: ${blob.size} bytes, type: ${blob.type}`
				);

				// Add the blob to the ZIP with the task's filename
				zip.file(task.fileName, blob);
				console.log(
					`Added ${task.fileName} to EPUB ZIP from blob store`
				);
			} catch (error) {
				console.warn(
					`Failed to add ${task.fileName} to EPUB ZIP from blob store:`,
					error
				);
			}
		} else if (task.outputUrl) {
			try {
				// Fallback: Fetch the blob data from the URL
				const response = await fetch(task.outputUrl);
				const blob = await response.blob();

				// Add the blob to the ZIP with the task's filename
				zip.file(task.fileName, blob);
				console.log(
					`Added ${task.fileName} to EPUB ZIP from URL fallback`
				);
			} catch (error) {
				console.warn(
					`Failed to add ${task.fileName} to EPUB ZIP from URL:`,
					error
				);
			}
		} else {
			console.warn(`No blob or URL available for EPUB ${task.fileName}`);
		}
	}

	console.log(
		`Generating ZIP with ${
			zip.files ? Object.keys(zip.files).length : 0
		} files`
	);

	// Generate the ZIP file (use same settings as PDF ZIP)
	const zipBlob = await zip.generateAsync({ type: 'blob' });

	console.log(
		`Generated ZIP blob: ${zipBlob.size} bytes, type: ${zipBlob.type}`
	);

	// Create a download URL for the ZIP
	return URL.createObjectURL(zipBlob);
}

// Download multiple EPUB tasks as a ZIP file using fflate (better handling of nested archives)
export async function downloadEPUBTasksAsZip(
	tasks: SliceTask[],
	baseFileName: string
): Promise<void> {
	try {
		console.log(`Creating EPUB ZIP using fflate for ${tasks.length} files`);

		const timestamp = new Date()
			.toISOString()
			.slice(0, 19)
			.replace(/[-:]/g, '');
		const zipFileName = `${baseFileName}_sliced_${timestamp}.zip`;

		// Prepare files for fflate
		const files: { [key: string]: Uint8Array } = {};

		for (const task of tasks) {
			if (task.blobKey && epubBlobStore.has(task.blobKey)) {
				try {
					const blob = epubBlobStore.get(task.blobKey)!;
					console.log(
						`Adding ${task.fileName} to ZIP (${blob.size} bytes)`
					);

					// Convert blob to Uint8Array for fflate
					const arrayBuffer = await blob.arrayBuffer();
					files[task.fileName] = new Uint8Array(arrayBuffer);
				} catch (error) {
					console.warn(
						`Failed to add ${task.fileName} to ZIP:`,
						error
					);
				}
			} else if (task.outputUrl) {
				try {
					const response = await fetch(task.outputUrl);
					const arrayBuffer = await response.arrayBuffer();
					files[task.fileName] = new Uint8Array(arrayBuffer);
					console.log(`Added ${task.fileName} from URL to ZIP`);
				} catch (error) {
					console.warn(
						`Failed to fetch ${task.fileName} from URL:`,
						error
					);
				}
			}
		}

		console.log(`Creating ZIP with ${Object.keys(files).length} files`);

		// Create ZIP using fflate (better for nested archives)
		fflateZip(files, { level: 6 }, (err, data) => {
			if (err) {
				console.error('Failed to create ZIP:', err);
				// Fallback to individual downloads
				console.log('Falling back to individual downloads');
				tasks.forEach((task, index) => {
					setTimeout(() => {
						if (task.blobKey && epubBlobStore.has(task.blobKey)) {
							const blob = epubBlobStore.get(task.blobKey)!;
							const url = URL.createObjectURL(blob);
							const link = document.createElement('a');
							link.href = url;
							link.download = task.fileName;
							document.body.appendChild(link);
							link.click();
							document.body.removeChild(link);
							setTimeout(() => URL.revokeObjectURL(url), 1000);
						}
					}, index * 300);
				});
				return;
			}

			// Create blob and download
			const zipBlob = new Blob([data], { type: 'application/zip' });
			console.log(`Generated ZIP: ${zipBlob.size} bytes`);

			const url = URL.createObjectURL(zipBlob);
			const link = document.createElement('a');
			link.href = url;
			link.download = zipFileName;
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);

			// Clean up
			setTimeout(() => URL.revokeObjectURL(url), 1000);
			console.log(`EPUB ZIP download initiated: ${zipFileName}`);
		});
	} catch (error) {
		console.error('Failed to create EPUB ZIP:', error);
		throw error;
	}
}
