import { NextRequest, NextResponse } from 'next/server';
import ePub from 'epubjs';
import JSZip from 'jszip';

export async function POST(request: NextRequest) {
	try {
		const formData = await request.formData();
		const file = formData.get('file') as File;
		const startChapter = parseInt(formData.get('startChapter') as string);
		const endChapter = parseInt(formData.get('endChapter') as string);
		const fileName = (formData.get('fileName') as string) || 'sliced.epub';

		if (!file) {
			return NextResponse.json(
				{ error: 'No file provided' },
				{ status: 400 }
			);
		}

		if (isNaN(startChapter) || isNaN(endChapter)) {
			return NextResponse.json(
				{ error: 'Invalid chapter range' },
				{ status: 400 }
			);
		}

		// Load the EPUB
		const arrayBuffer = await file.arrayBuffer();
		const book = ePub(arrayBuffer);
		await book.ready;

		// Create a new EPUB structure
		const zip = new JSZip();
		
		// Copy mimetype
		zip.file('mimetype', 'application/epub+zip');

		// Create META-INF directory
		const metaInf = zip.folder('META-INF');
		if (metaInf) {
			metaInf.file('container.xml', `<?xml version="1.0"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
  <rootfiles>
    <rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/>
  </rootfiles>
</container>`);
		}

		// Create OEBPS directory
		const oebps = zip.folder('OEBPS');
		if (!oebps) {
			throw new Error('Failed to create OEBPS folder');
		}

		// Get chapters from the navigation
		const chapters = book.navigation.toc;
		const selectedChapters = chapters.slice(startChapter, endChapter + 1);

		// Extract and add selected chapters
		const manifestItems: string[] = [];
		const spineItems: string[] = [];

		for (let i = 0; i < selectedChapters.length; i++) {
			const chapter = selectedChapters[i];
			const chapterIndex = startChapter + i;
			
			try {
				// Get the section from the book
				const section = book.spine.get(chapter.href);
				if (section) {
					const content = await section.load(book.load.bind(book));
					const chapterFileName = `chapter_${chapterIndex + 1}.xhtml`;
					
					// Create XHTML content
					const xhtmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>${chapter.label}</title>
</head>
<body>
${content.innerHTML || content.outerHTML || content}
</body>
</html>`;

					oebps.file(chapterFileName, xhtmlContent);
					
					manifestItems.push(`<item id="chapter${chapterIndex + 1}" href="${chapterFileName}" media-type="application/xhtml+xml"/>`);
					spineItems.push(`<itemref idref="chapter${chapterIndex + 1}"/>`);
				}
			} catch (error) {
				console.warn(`Failed to extract chapter ${chapterIndex}:`, error);
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
    ${selectedChapters.map((chapter, index) => `
    <navPoint id="navpoint-${index + 1}" playOrder="${index + 1}">
      <navLabel>
        <text>${chapter.label}</text>
      </navLabel>
      <content src="chapter_${startChapter + index + 1}.xhtml"/>
    </navPoint>`).join('')}
  </navMap>
</ncx>`;

		oebps.file('toc.ncx', tocNcx);

		// Generate the EPUB file
		const epubBytes = await zip.generateAsync({ type: 'uint8array' });

		// Return the EPUB as a downloadable response
		return new NextResponse(Buffer.from(epubBytes), {
			status: 200,
			headers: {
				'Content-Type': 'application/epub+zip',
				'Content-Disposition': `attachment; filename="${fileName}"`,
				'Content-Length': epubBytes.length.toString(),
			},
		});
	} catch (error) {
		console.error('EPUB slicing error:', error);
		return NextResponse.json(
			{ error: 'Failed to slice EPUB' },
			{ status: 500 }
		);
	}
}
