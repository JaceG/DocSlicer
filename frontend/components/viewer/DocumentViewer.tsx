'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import {
	ChevronLeft,
	ChevronRight,
	ZoomIn,
	ZoomOut,
	Maximize2,
	Grid3X3,
	Eye,
	Loader2,
	AlertTriangle,
	RefreshCw,
	MoreHorizontal,
} from 'lucide-react';
import { UploadedFile } from '@/types';
import { formatFileSize } from '@/lib/utils/file';
import { cn } from '@/lib/utils/cn';

// PDFViewer interface - matches the class in lib/pdf/viewer.ts
// Defined inline to avoid webpack processing pdfjs-dist at compile time
interface PDFViewerInterface {
	loadDocument(file: File): Promise<void>;
	getPageCount(): number;
	renderPage(pageNumber: number, scale: number): Promise<HTMLCanvasElement>;
	generateThumbnail(pageNumber: number, maxWidth: number): Promise<string>;
	destroy(): void;
}

interface DocumentViewerProps {
	file: UploadedFile;
	onPageCountLoaded?: (pageCount: number) => void;
}

type ViewMode = 'single' | 'thumbnails';

const THUMBNAILS_PER_PAGE = 20;
const MAX_SCALE = 3;
const MIN_SCALE = 0.5;
const SCALE_STEP = 0.25;

export function DocumentViewer({
	file,
	onPageCountLoaded,
}: DocumentViewerProps) {
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [scale, setScale] = useState(1);
	const [viewMode, setViewMode] = useState<ViewMode>('single');
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [loadingProgress, setLoadingProgress] = useState('');

	// Thumbnail management
	const [thumbnails, setThumbnails] = useState<Map<number, string>>(
		new Map()
	);
	const [loadedThumbnails, setLoadedThumbnails] = useState<Set<number>>(
		new Set()
	);
	const [visibleThumbnailCount, setVisibleThumbnailCount] =
		useState(THUMBNAILS_PER_PAGE);
	const [loadingThumbnails, setLoadingThumbnails] = useState<Set<number>>(
		new Set()
	);
	const [isLoadingMore, setIsLoadingMore] = useState(false);

	const canvasRef = useRef<HTMLCanvasElement>(null);
	const pdfViewerRef = useRef<PDFViewerInterface | null>(null);
	const thumbnailRefs = useRef<Map<number, HTMLDivElement>>(new Map());

	useEffect(() => {
		// Reset state when file changes
		setThumbnails(new Map());
		setLoadedThumbnails(new Set());
		setVisibleThumbnailCount(THUMBNAILS_PER_PAGE);
		setLoadingThumbnails(new Set());
		setIsLoadingMore(false);

		loadPDF();

		return () => {
			if (pdfViewerRef.current) {
				pdfViewerRef.current.destroy();
			}
		};
	}, [file.id]);

	const loadPDF = useCallback(async () => {
		try {
			setIsLoading(true);
			setError(null);
			setLoadingProgress('Initializing PDF viewer...');

			// Dynamically import PDFViewer to avoid webpack ESM issues
			const { PDFViewer } = await import('@/lib/pdf/viewer');
			const pdfViewer = new PDFViewer();
			setLoadingProgress('Loading document...');

			await pdfViewer.loadDocument(file.file);

			const pageCount = pdfViewer.getPageCount();
			setTotalPages(pageCount);
			if (onPageCountLoaded) onPageCountLoaded(pageCount);

			pdfViewerRef.current = pdfViewer;

			setIsLoading(false);
			setLoadingProgress('');
		} catch (err) {
			console.error('Failed to load PDF:', err);
			setError(err instanceof Error ? err.message : 'Failed to load PDF');
			setIsLoading(false);
		}
	}, [file.file, onPageCountLoaded]);

	const loadNextBatch = useCallback(async () => {
		if (!pdfViewerRef.current || isLoadingMore) return;

		const startPage = loadedThumbnails.size + 1;
		const endPage = Math.min(
			startPage + THUMBNAILS_PER_PAGE - 1,
			totalPages
		);

		if (startPage > totalPages) return;

		setIsLoadingMore(true);

		// Set loading state for this batch
		const loadingSet = new Set<number>();
		for (let i = startPage; i <= endPage; i++) {
			if (!loadedThumbnails.has(i)) {
				loadingSet.add(i);
			}
		}
		setLoadingThumbnails((prev) => new Set([...prev, ...loadingSet]));

		try {
			const thumbnailPromises = [];
			for (let i = startPage; i <= endPage; i++) {
				if (!loadedThumbnails.has(i)) {
					thumbnailPromises.push(
						pdfViewerRef.current
							.generateThumbnail(i, 150)
							.then((thumbnail: string) => ({
								pageNumber: i,
								thumbnail,
							}))
							.catch((error: Error) => {
								console.warn(
									`Failed to generate thumbnail for page ${i}:`,
									error
								);
								return null;
							})
					);
				}
			}

			const results = await Promise.all(thumbnailPromises);

			setThumbnails((prev) => {
				const newThumbnails = new Map(prev);
				results.forEach((result) => {
					if (result) {
						newThumbnails.set(result.pageNumber, result.thumbnail);
					}
				});
				return newThumbnails;
			});

			setLoadedThumbnails((prev) => {
				const newLoaded = new Set(prev);
				results.forEach((result) => {
					if (result) {
						newLoaded.add(result.pageNumber);
					}
				});
				return newLoaded;
			});

			setVisibleThumbnailCount(endPage);
		} catch (err) {
			console.error('Failed to load thumbnail batch:', err);
		} finally {
			setIsLoadingMore(false);
			setLoadingThumbnails(new Set());
		}
	}, [pdfViewerRef, isLoadingMore, totalPages, loadedThumbnails]);

	const renderCurrentPage = useCallback(async () => {
		if (
			!pdfViewerRef.current ||
			!canvasRef.current ||
			totalPages === 0 ||
			viewMode !== 'single'
		)
			return;

		try {
			const canvas = await pdfViewerRef.current.renderPage(
				currentPage,
				scale
			);
			const context = canvasRef.current.getContext('2d');
			if (context && canvas) {
				canvasRef.current.width = canvas.width;
				canvasRef.current.height = canvas.height;
				context.clearRect(0, 0, canvas.width, canvas.height);
				context.drawImage(canvas, 0, 0);
			}
		} catch (err) {
			console.error(`Failed to render page ${currentPage}:`, err);
		}
	}, [currentPage, scale, totalPages, viewMode]);

	// Render current page when dependencies change
	useEffect(() => {
		renderCurrentPage();
	}, [renderCurrentPage]);

	// Load initial thumbnails when switching to thumbnail view
	useEffect(() => {
		if (
			viewMode === 'thumbnails' &&
			pdfViewerRef.current &&
			totalPages > 0
		) {
			loadNextBatch();
		}
	}, [viewMode, totalPages, loadNextBatch]);

	// Infinite scroll handler for thumbnail view
	const handleScroll = useCallback(
		(e: React.UIEvent<HTMLDivElement>) => {
			const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
			const scrolledToBottom =
				scrollHeight - scrollTop <= clientHeight + 100; // 100px threshold

			if (
				scrolledToBottom &&
				!isLoadingMore &&
				visibleThumbnailCount < totalPages
			) {
				loadNextBatch();
			}
		},
		[isLoadingMore, visibleThumbnailCount, totalPages, loadNextBatch]
	);

	const handlePrevPage = () => {
		setCurrentPage((prev) => Math.max(1, prev - 1));
	};

	const handleNextPage = () => {
		setCurrentPage((prev) => Math.min(totalPages, prev + 1));
	};

	const handleZoomIn = () => {
		setScale((prev) => Math.min(MAX_SCALE, prev + SCALE_STEP));
	};

	const handleZoomOut = () => {
		setScale((prev) => Math.max(MIN_SCALE, prev - SCALE_STEP));
	};

	const handlePageClick = (pageNumber: number) => {
		setCurrentPage(pageNumber);
		setViewMode('single');
	};

	const handleRetry = () => {
		setError(null);
		loadPDF();
	};

	if (isLoading) {
		return (
			<div className='flex flex-col items-center justify-center min-h-[400px] bg-gray-50 dark:bg-gray-800/50 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600'>
				<Loader2 className='h-8 w-8 animate-spin text-blue-600 dark:text-blue-400 mb-4' />
				<p className='text-sm text-gray-600 dark:text-gray-400 mb-2'>
					{loadingProgress || 'Loading document...'}
				</p>
				<div className='w-64 bg-gray-200 dark:bg-gray-700 rounded-full h-2'>
					<div className='bg-blue-600 dark:bg-blue-400 h-2 rounded-full transition-all duration-300 animate-pulse w-1/3'></div>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className='flex flex-col items-center justify-center min-h-[400px] bg-red-50 dark:bg-red-900/20 rounded-lg border-2 border-dashed border-red-300 dark:border-red-600'>
				<AlertTriangle className='h-8 w-8 text-red-600 dark:text-red-400 mb-4' />
				<p className='text-sm text-red-600 dark:text-red-400 mb-4 text-center max-w-md'>
					{error}
				</p>
				<button
					onClick={handleRetry}
					className='flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors'>
					<RefreshCw className='h-4 w-4' />
					<span>Try Again</span>
				</button>
			</div>
		);
	}

	return (
		<div className='bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700'>
			{/* Header */}
			<div className='flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700'>
				<div className='flex items-center space-x-4'>
					<div className='w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center'>
						<Eye className='h-5 w-5 text-white' />
					</div>
					<div>
						<h2 className='text-lg font-semibold text-gray-900 dark:text-gray-100'>
							{file.name}
						</h2>
						<p className='text-sm text-gray-600 dark:text-gray-400'>
							{formatFileSize(file.size)} • PDF • {totalPages}{' '}
							pages
						</p>
					</div>
				</div>

				{/* View Mode Toggle */}
				<div className='flex items-center space-x-2'>
					<div className='flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1'>
						<button
							onClick={() => setViewMode('single')}
							className={cn(
								'p-2 rounded-md transition-colors',
								viewMode === 'single'
									? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
									: 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
							)}>
							<Eye className='h-4 w-4' />
						</button>
						<button
							onClick={() => setViewMode('thumbnails')}
							className={cn(
								'p-2 rounded-md transition-colors',
								viewMode === 'thumbnails'
									? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
									: 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
							)}>
							<Grid3X3 className='h-4 w-4' />
						</button>
					</div>
				</div>
			</div>

			{/* Content */}
			<div className='p-6'>
				{viewMode === 'single' ? (
					/* Single Page View */
					<div className='space-y-4'>
						{/* Controls */}
						<div className='flex items-center justify-between'>
							<div className='flex items-center space-x-2'>
								<button
									onClick={handlePrevPage}
									disabled={currentPage <= 1}
									className='p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors'>
									<ChevronLeft className='h-4 w-4' />
								</button>
								<span className='text-sm font-medium text-gray-900 dark:text-gray-100 min-w-[100px] text-center'>
									{currentPage} of {totalPages}
								</span>
								<button
									onClick={handleNextPage}
									disabled={currentPage >= totalPages}
									className='p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors'>
									<ChevronRight className='h-4 w-4' />
								</button>
							</div>

							<div className='flex items-center space-x-2'>
								<button
									onClick={handleZoomOut}
									disabled={scale <= MIN_SCALE}
									className='p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors'>
									<ZoomOut className='h-4 w-4' />
								</button>
								<span className='text-sm font-medium text-gray-900 dark:text-gray-100 min-w-[60px] text-center'>
									{Math.round(scale * 100)}%
								</span>
								<button
									onClick={handleZoomIn}
									disabled={scale >= MAX_SCALE}
									className='p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors'>
									<ZoomIn className='h-4 w-4' />
								</button>
							</div>
						</div>

						{/* Page Canvas */}
						<div className='flex justify-center bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4'>
							<div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-full max-h-full overflow-auto'>
								<canvas
									ref={canvasRef}
									className='max-w-full h-auto'
								/>
							</div>
						</div>
					</div>
				) : (
					/* Thumbnail Grid View */
					<div className='space-y-4'>
						<div className='flex items-center justify-between px-6 py-3 border-b border-gray-200 dark:border-gray-700'>
							<div className='text-sm text-gray-600 dark:text-gray-400'>
								Showing {visibleThumbnailCount} of {totalPages}{' '}
								pages
							</div>
						</div>

						{/* Content area */}
						<div
							className='flex-1 overflow-auto p-6 max-h-[600px]'
							onScroll={handleScroll}>
							{/* Thumbnail grid for PDF */}
							<div className='grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4'>
								{Array.from(
									{ length: visibleThumbnailCount },
									(_, i) => i + 1
								).map((pageNum) => (
									<div
										key={pageNum}
										ref={(el) => {
											if (el) {
												thumbnailRefs.current.set(
													pageNum,
													el
												);
											}
										}}
										onClick={() => handlePageClick(pageNum)}
										className={cn(
											'relative group cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-200 hover:shadow-lg',
											currentPage === pageNum
												? 'border-blue-500 ring-2 ring-blue-200 dark:ring-blue-800 shadow-lg'
												: 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
										)}>
										{thumbnails.has(pageNum) ? (
											<img
												src={thumbnails.get(pageNum)}
												alt={`Page ${pageNum}`}
												className='w-full h-auto'
											/>
										) : (
											<div className='w-full aspect-[3/4] bg-gray-100 dark:bg-gray-800 flex items-center justify-center'>
												{loadingThumbnails.has(
													pageNum
												) ? (
													<Loader2 className='h-4 w-4 animate-spin text-gray-400' />
												) : (
													<MoreHorizontal className='h-4 w-4 text-gray-400' />
												)}
											</div>
										)}
										<div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/75 to-transparent text-white text-xs text-center py-2'>
											{pageNum}
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

// Default export for dynamic import compatibility
export default DocumentViewer;
