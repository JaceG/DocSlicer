import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';

export async function POST(request: NextRequest) {
	try {
		const formData = await request.formData();
		const file = formData.get('file') as File;
		const startPage = parseInt(formData.get('startPage') as string);
		const endPage = parseInt(formData.get('endPage') as string);
		const fileName = formData.get('fileName') as string;

		if (!file) {
			return NextResponse.json(
				{ error: 'No file provided' },
				{ status: 400 }
			);
		}

		if (!startPage || !endPage || startPage > endPage) {
			return NextResponse.json(
				{ error: 'Invalid page range' },
				{ status: 400 }
			);
		}

		// Read the uploaded PDF file
		const arrayBuffer = await file.arrayBuffer();
		const sourcePdf = await PDFDocument.load(arrayBuffer);

		// Create a new PDF document
		const newPdf = await PDFDocument.create();

		// Copy the specified pages
		const pageIndices = [];
		for (let i = startPage - 1; i < endPage; i++) {
			pageIndices.push(i);
		}

		const copiedPages = await newPdf.copyPages(sourcePdf, pageIndices);
		copiedPages.forEach((page) => newPdf.addPage(page));

		// Save the new PDF
		const pdfBytes = await newPdf.save();

		// Return the PDF as a downloadable response
		return new NextResponse(Buffer.from(pdfBytes), {
			status: 200,
			headers: {
				'Content-Type': 'application/pdf',
				'Content-Disposition': `attachment; filename="${fileName}"`,
				'Content-Length': pdfBytes.length.toString(),
			},
		});
	} catch (error) {
		console.error('PDF slicing error:', error);
		return NextResponse.json(
			{ error: 'Failed to slice PDF' },
			{ status: 500 }
		);
	}
}
