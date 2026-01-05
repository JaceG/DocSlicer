import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';

export async function POST(request: NextRequest) {
	try {
		const formData = await request.formData();
		const fileCount = parseInt(formData.get('fileCount') as string);
		const outputFileName = formData.get('outputFileName') as string;

		if (!fileCount || fileCount < 2) {
			return NextResponse.json(
				{ error: 'At least 2 files are required for merging' },
				{ status: 400 }
			);
		}

		// Collect files with their order
		const filesWithOrder: { file: File; order: number }[] = [];
		
		for (let i = 0; i < fileCount; i++) {
			const file = formData.get(`file_${i}`) as File;
			const order = parseInt(formData.get(`order_${i}`) as string);
			
			if (!file) {
				return NextResponse.json(
					{ error: `Missing file at index ${i}` },
					{ status: 400 }
				);
			}
			
			filesWithOrder.push({ file, order });
		}

		// Sort files by their order
		filesWithOrder.sort((a, b) => a.order - b.order);

		// Create a new PDF document for the merged result
		const mergedPdf = await PDFDocument.create();
		let totalPages = 0;

		// Process each file in order
		for (const { file } of filesWithOrder) {
			try {
				const arrayBuffer = await file.arrayBuffer();
				const sourcePdf = await PDFDocument.load(arrayBuffer, {
					ignoreEncryption: true,
				});

				// Get all page indices
				const pageCount = sourcePdf.getPageCount();
				const pageIndices = Array.from({ length: pageCount }, (_, i) => i);

				// Copy all pages from the source PDF
				const copiedPages = await mergedPdf.copyPages(sourcePdf, pageIndices);
				copiedPages.forEach((page) => mergedPdf.addPage(page));
				
				totalPages += pageCount;
			} catch (error) {
				console.error(`Error processing file ${file.name}:`, error);
				return NextResponse.json(
					{ error: `Failed to process file: ${file.name}` },
					{ status: 400 }
				);
			}
		}

		// Save the merged PDF
		const pdfBytes = await mergedPdf.save();

		// Return the PDF as a downloadable response
		return new NextResponse(Buffer.from(pdfBytes), {
			status: 200,
			headers: {
				'Content-Type': 'application/pdf',
				'Content-Disposition': `attachment; filename="${outputFileName}"`,
				'Content-Length': pdfBytes.length.toString(),
				'X-Page-Count': totalPages.toString(),
			},
		});
	} catch (error) {
		console.error('PDF merge error:', error);
		return NextResponse.json(
			{ error: 'Failed to merge PDFs' },
			{ status: 500 }
		);
	}
}
