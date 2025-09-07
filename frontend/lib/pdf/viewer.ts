// Import PDF.js using dynamic imports to avoid SSR issues
let pdfjsLib: any = null;

// Initialize PDF.js only on client side
const initPDFJS = async () => {
	if (typeof window === 'undefined') return null;

	if (!pdfjsLib) {
		try {
			pdfjsLib = await import('pdfjs-dist');

			// Configure PDF.js worker
			if (pdfjsLib.GlobalWorkerOptions) {
				// Use CDN worker matching the installed version
				pdfjsLib.GlobalWorkerOptions.workerSrc =
					'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.worker.min.js';
			}
		} catch (error) {
			console.error('Failed to load PDF.js:', error);
			throw new Error('PDF.js failed to load');
		}
	}

	return pdfjsLib;
};

export interface PDFPageInfo {
	pageNumber: number;
	width: number;
	height: number;
	canvas?: HTMLCanvasElement;
	thumbnail?: string;
}

export class PDFViewer {
	private pdfDocument: any = null;
	private pages: Map<number, PDFPageInfo> = new Map();

	async loadDocument(file: File): Promise<void> {
		const pdfjs = await initPDFJS();
		if (!pdfjs) {
			throw new Error('PDF.js not available');
		}

		try {
			const arrayBuffer = await file.arrayBuffer();
			const uint8Array = new Uint8Array(arrayBuffer);

			const loadingTask = pdfjs.getDocument({
				data: uint8Array,
				// Disable streaming for better compatibility
				disableStream: true,
				// Disable range requests for better compatibility
				disableRange: true,
			});

			this.pdfDocument = await loadingTask.promise;

			// Pre-load page info
			for (let i = 1; i <= this.pdfDocument.numPages; i++) {
				const page = await this.pdfDocument.getPage(i);
				const viewport = page.getViewport({ scale: 1 });

				this.pages.set(i, {
					pageNumber: i,
					width: viewport.width,
					height: viewport.height,
				});
			}
		} catch (error) {
			console.error('Failed to load PDF document:', error);
			throw new Error('Failed to load PDF document');
		}
	}

	getPageCount(): number {
		return this.pdfDocument?.numPages || 0;
	}

	async renderPage(
		pageNumber: number,
		scale: number = 1
	): Promise<HTMLCanvasElement> {
		if (!this.pdfDocument) {
			throw new Error('No PDF document loaded');
		}

		try {
			const page = await this.pdfDocument.getPage(pageNumber);
			const viewport = page.getViewport({ scale });

			const canvas = document.createElement('canvas');
			const context = canvas.getContext('2d');

			if (!context) {
				throw new Error('Could not get canvas context');
			}

			canvas.height = viewport.height;
			canvas.width = viewport.width;

			const renderContext = {
				canvasContext: context,
				viewport: viewport,
			};

			await page.render(renderContext).promise;

			// Update the page info with the rendered canvas
			const pageInfo = this.pages.get(pageNumber);
			if (pageInfo) {
				pageInfo.canvas = canvas;
				this.pages.set(pageNumber, pageInfo);
			}

			return canvas;
		} catch (error) {
			console.error(`Failed to render page ${pageNumber}:`, error);
			throw new Error(`Failed to render page ${pageNumber}`);
		}
	}

	async generateThumbnail(
		pageNumber: number,
		maxWidth: number = 150
	): Promise<string> {
		if (!this.pdfDocument) {
			throw new Error('No PDF document loaded');
		}

		const pageInfo = this.pages.get(pageNumber);
		if (!pageInfo) {
			throw new Error('Page not found');
		}

		try {
			// Calculate scale to fit within maxWidth
			const scale = maxWidth / pageInfo.width;
			const canvas = await this.renderPage(pageNumber, scale);

			// Convert to data URL for thumbnail with better compression
			const thumbnail = canvas.toDataURL('image/jpeg', 0.8);

			// Update page info with thumbnail
			pageInfo.thumbnail = thumbnail;
			this.pages.set(pageNumber, pageInfo);

			return thumbnail;
		} catch (error) {
			console.error(
				`Failed to generate thumbnail for page ${pageNumber}:`,
				error
			);
			// Return a placeholder or re-throw
			throw error;
		}
	}

	async generateThumbnailBatch(
		pageNumbers: number[],
		maxWidth: number = 150
	): Promise<Map<number, string>> {
		const thumbnails = new Map<number, string>();
		const batchSize = 5; // Process in smaller batches

		for (let i = 0; i < pageNumbers.length; i += batchSize) {
			const batch = pageNumbers.slice(i, i + batchSize);
			const promises = batch.map(async (pageNum) => {
				try {
					const thumbnail = await this.generateThumbnail(
						pageNum,
						maxWidth
					);
					return { pageNumber: pageNum, thumbnail };
				} catch (error) {
					console.warn(
						`Failed to generate thumbnail for page ${pageNum}:`,
						error
					);
					return null;
				}
			});

			const results = await Promise.all(promises);
			results.forEach((result) => {
				if (result) {
					thumbnails.set(result.pageNumber, result.thumbnail);
				}
			});

			// Small delay between batches to prevent overwhelming the browser
			if (i + batchSize < pageNumbers.length) {
				await new Promise((resolve) => setTimeout(resolve, 50));
			}
		}

		return thumbnails;
	}

	getPageInfo(pageNumber: number): PDFPageInfo | undefined {
		return this.pages.get(pageNumber);
	}

	getAllPages(): PDFPageInfo[] {
		return Array.from(this.pages.values());
	}

	destroy(): void {
		try {
			this.pdfDocument?.destroy();
		} catch (error) {
			console.warn('Error destroying PDF document:', error);
		}
		this.pdfDocument = null;
		this.pages.clear();
	}
}
