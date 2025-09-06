import ePub from 'epubjs';

export interface EPUBChapterInfo {
	id: string;
	href: string;
	label: string;
	index: number;
}

export interface EPUBPageInfo {
	chapterIndex: number;
	pageIndex: number;
	totalPagesInChapter: number;
	chapterTitle: string;
	content?: string;
}

export class EPUBViewer {
	private book: any = null;
	private rendition: any = null;
	private chapters: EPUBChapterInfo[] = [];
	private currentLocation: any = null;

	async loadDocument(file: File): Promise<void> {
		try {
			const arrayBuffer = await file.arrayBuffer();
			this.book = ePub(arrayBuffer);

			// Load the book metadata and navigation
			await this.book.ready;

			// Extract chapter information
			this.chapters = await this.extractChapters();
		} catch (error) {
			console.error('Error loading EPUB:', error);
			throw new Error('Failed to load EPUB file');
		}
	}

	private async extractChapters(): Promise<EPUBChapterInfo[]> {
		if (!this.book || !this.book.navigation) {
			return [];
		}

		const chapters: EPUBChapterInfo[] = [];
		const toc = this.book.navigation.toc;

		toc.forEach((item: any, index: number) => {
			chapters.push({
				id: item.id || `chapter-${index}`,
				href: item.href,
				label: item.label || `Chapter ${index + 1}`,
				index: index,
			});
		});

		return chapters;
	}

	getChapterCount(): number {
		return this.chapters.length;
	}

	getChapters(): EPUBChapterInfo[] {
		return [...this.chapters];
	}

	async renderChapter(chapterIndex: number, container: HTMLElement): Promise<void> {
		if (!this.book || chapterIndex >= this.chapters.length) {
			throw new Error('Invalid chapter index or book not loaded');
		}

		// Clear previous rendition
		if (this.rendition) {
			this.rendition.destroy();
		}

		// Create new rendition
		this.rendition = this.book.renderTo(container, {
			width: '100%',
			height: '100%',
			spread: 'none',
		});

		const chapter = this.chapters[chapterIndex];
		await this.rendition.display(chapter.href);

		// Store current location
		this.currentLocation = this.rendition.currentLocation();
	}

	async getChapterContent(chapterIndex: number): Promise<string> {
		if (!this.book || chapterIndex >= this.chapters.length) {
			throw new Error('Invalid chapter index or book not loaded');
		}

		const chapter = this.chapters[chapterIndex];
		const section = this.book.spine.get(chapter.href);
		
		if (!section) {
			throw new Error('Chapter section not found');
		}

		const content = await section.load(this.book.load.bind(this.book));
		return content.outerHTML || content.innerHTML || '';
	}

	async generateChapterThumbnail(chapterIndex: number): Promise<string> {
		// For EPUB, we'll create a text-based thumbnail
		// This is a simplified approach - in a real implementation,
		// you might want to render the actual chapter content
		
		if (chapterIndex >= this.chapters.length) {
			throw new Error('Invalid chapter index');
		}

		const chapter = this.chapters[chapterIndex];
		
		// Create a simple text-based thumbnail
		const canvas = document.createElement('canvas');
		canvas.width = 150;
		canvas.height = 200;
		const ctx = canvas.getContext('2d');

		if (!ctx) {
			throw new Error('Could not get canvas context');
		}

		// Draw background
		ctx.fillStyle = '#ffffff';
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		// Draw border
		ctx.strokeStyle = '#e5e7eb';
		ctx.lineWidth = 2;
		ctx.strokeRect(1, 1, canvas.width - 2, canvas.height - 2);

		// Draw chapter title
		ctx.fillStyle = '#374151';
		ctx.font = '12px Arial';
		ctx.textAlign = 'center';
		
		// Wrap text
		const words = chapter.label.split(' ');
		const lines: string[] = [];
		let currentLine = '';
		
		words.forEach(word => {
			const testLine = currentLine + (currentLine ? ' ' : '') + word;
			const metrics = ctx.measureText(testLine);
			if (metrics.width > canvas.width - 20 && currentLine) {
				lines.push(currentLine);
				currentLine = word;
			} else {
				currentLine = testLine;
			}
		});
		if (currentLine) lines.push(currentLine);

		// Draw lines
		lines.slice(0, 8).forEach((line, index) => {
			ctx.fillText(line, canvas.width / 2, 30 + (index * 16));
		});

		// Draw chapter number
		ctx.font = 'bold 14px Arial';
		ctx.fillText(`${chapterIndex + 1}`, canvas.width / 2, canvas.height - 20);

		return canvas.toDataURL();
	}

	getCurrentLocation(): any {
		return this.currentLocation;
	}

	destroy(): void {
		if (this.rendition) {
			this.rendition.destroy();
			this.rendition = null;
		}
		if (this.book) {
			this.book.destroy();
			this.book = null;
		}
		this.chapters = [];
		this.currentLocation = null;
	}
}
