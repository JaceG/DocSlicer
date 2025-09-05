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
import { PDFViewer } from '@/lib/pdf/viewer';

interface DocumentViewerProps {
	file: UploadedFile;
	onPageCountLoaded?: (pageCount: number) => void;
}

const THUMBNAILS_PER_PAGE = 20;

export function DocumentViewer({
	file,
	onPageCountLoaded,
}: DocumentViewerProps) {
	const [currentPage, setCurrentPage] = useState(1);
	const [scale, setScale] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [isLoading, setIsLoading] = useState(true);
	const [loadingProgress, setLoadingProgress] = useState('');
	const [error, setError] = useState<string | null>(null);
	const [viewMode, setViewMode] = useState<'single' | 'thumbnails'>('single');
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
	const pdfViewerRef = useRef<PDFViewer | null>(null);
	const thumbnailRefs = useRef<Map<number, HTMLDivElement>>(new Map());

	useEffect(() => {
		// Reset thumbnail state when file changes
		setThumbnails(new Map());
		setLoadedThumbnails(new Set());
		setVisibleThumbnailCount(THUMBNAILS_PER_PAGE);
		setLoadingThumbnails(new Set());
		setIsLoadingMore(false);

		if (file.type === 'pdf') {
			loadPDF();
		} else {
			// For EPUB files, we'll implement this later
			setTotalPages(10); // Placeholder
			setIsLoading(false);
			if (onPageCountLoaded) onPageCountLoaded(10);
		}

		return () => {
			if (pdfViewerRef.current) {
				pdfViewerRef.current.destroy();
			}
		};
	}, [file.id]); // Only depend on file.id to prevent infinite loops

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
							.generateThumbnail(i, 120)
							.then((thumbnail) => ({
								pageNumber: i,
								thumbnail,
							}))
							.catch((error) => {
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
				const newSet = new Set(prev);
				for (let i = startPage; i <= endPage; i++) {
					newSet.add(i);
				}
				return newSet;
			});

			setVisibleThumbnailCount(endPage);
		} catch (error) {
			console.error('Failed to load thumbnails:', error);
		} finally {
			setLoadingThumbnails((prev) => {
				const newSet = new Set(prev);
				loadingSet.forEach((page) => newSet.delete(page));
				return newSet;
			});
			setIsLoadingMore(false);
		}
	}, [loadedThumbnails, totalPages, isLoadingMore]);

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

	// Render current page when page, scale, or view mode changes
	useEffect(() => {
		const render = async () => {
			if (
				pdfViewerRef.current &&
				canvasRef.current &&
				totalPages > 0 &&
				viewMode === 'single'
			) {
				try {
					const canvas = await pdfViewerRef.current.renderPage(
						currentPage,
						scale
					);
					const context = canvasRef.current.getContext('2d');

					if (context) {
						// Clear the canvas
						canvasRef.current.width = canvas.width;
						canvasRef.current.height = canvas.height;

						// Copy the rendered page to our canvas
						context.drawImage(canvas, 0, 0);
					}
				} catch (err) {
					console.error('Failed to render page:', err);
					setError(`Failed to render page ${currentPage}`);
				}
			}
		};
		render();
	}, [currentPage, scale, totalPages, viewMode]);

	const loadPDF = useCallback(async () => {
		try {
			setIsLoading(true);
			setError(null);
			setLoadingProgress('Initializing PDF viewer...');

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
			setError(
				err instanceof Error
					? err.message
					: 'Failed to load PDF document. Please ensure the file is a valid PDF.'
			);
			setIsLoading(false);
			setLoadingProgress('');
		}
	}, [file.file, onPageCountLoaded]);

	const handlePreviousPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	const handleNextPage = () => {
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1);
		}
	};

	const handleZoomIn = () => {
		setScale(Math.min(scale + 0.25, 3));
	};

	const handleZoomOut = () => {
		setScale(Math.max(scale - 0.25, 0.5));
	};

	const handleFitToPage = () => {
		setScale(1);
	};

	const handlePageClick = (pageNumber: number) => {
		setCurrentPage(pageNumber);
		setViewMode('single');
	};

	const handleRetry = () => {
		if (file.type === 'pdf') {
			loadPDF();
		}
	};

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

	if (isLoading) {
		return (
			<div className='bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800'>
				<div className='flex items-center justify-center h-96'>
					<div className='flex flex-col items-center space-y-4'>
						<div className='relative'>
							<Loader2 className='h-12 w-12 animate-spin text-blue-600' />
							<div className='absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gray-200 rounded-full overflow-hidden'>
								<div className='h-full bg-blue-600 animate-pulse'></div>
							</div>
						</div>
						<div className='text-center'>
							<p className='text-gray-900 dark:text-gray-100 font-semibold'>
								Loading document...
							</p>
							{loadingProgress && (
								<p className='text-sm text-gray-600 dark:text-gray-400 mt-1'>
									{loadingProgress}
								</p>
							)}
						</div>
					</div>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className='bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-red-200 dark:border-red-800'>
				<div className='flex items-center justify-center h-96 p-8'>
					<div className='text-center max-w-md'>
						<AlertTriangle className='h-16 w-16 text-red-500 mx-auto mb-4' />
						<h3 className='text-lg font-semibold text-red-600 dark:text-red-400 mb-2'>
							Error Loading Document
						</h3>
						<p className='text-sm text-gray-600 dark:text-gray-400 mb-6'>
							{error}
						</p>
						<button
							onClick={handleRetry}
							className='flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors mx-auto'>
							<RefreshCw className='h-4 w-4' />
							<span>Try Again</span>
						</button>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className='bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden'>
			{/* Header */}
			<div className='border-b border-gray-200 dark:border-gray-800 px-6 py-4'>
				<div className='flex items-center justify-between'>
					<div>
						<h3 className='text-lg font-semibold text-gray-900 dark:text-gray-100'>
							{file.name}
						</h3>
						<p className='text-sm text-gray-600 dark:text-gray-400'>
							{formatFileSize(file.size)} •{' '}
							{file.type.toUpperCase()} • {totalPages} pages
						</p>
					</div>

					{/* View Mode and Zoom Controls */}
					<div className='flex items-center space-x-4'>
						<div className='flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1'>
							<button
								onClick={() => setViewMode('single')}
								className={cn(
									'p-2 rounded-md transition-colors',
									viewMode === 'single'
										? 'bg-white dark:bg-gray-700 text-blue-600 shadow-sm'
										: 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
								)}
								title='Single page view'>
								<Eye className='h-4 w-4' />
							</button>
							<button
								onClick={() => setViewMode('thumbnails')}
								className={cn(
									'p-2 rounded-md transition-colors',
									viewMode === 'thumbnails'
										? 'bg-white dark:bg-gray-700 text-blue-600 shadow-sm'
										: 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
								)}
								title='Thumbnail grid view'>
								<Grid3X3 className='h-4 w-4' />
							</button>
						</div>

						{viewMode === 'single' && (
							<div className='flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1'>
								<button
									onClick={handleZoomOut}
									className='p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md transition-colors'
									title='Zoom out'>
									<ZoomOut className='h-4 w-4' />
								</button>
								<span className='text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[4rem] text-center px-2'>
									{Math.round(scale * 100)}%
								</span>
								<button
									onClick={handleZoomIn}
									className='p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md transition-colors'
									title='Zoom in'>
									<ZoomIn className='h-4 w-4' />
								</button>
								<button
									onClick={handleFitToPage}
									className='p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md transition-colors'
									title='Fit to page'>
									<Maximize2 className='h-4 w-4' />
								</button>
							</div>
						)}
					</div>
				</div>
			</div>

			{/* Viewer */}
			<div className='relative bg-gray-50 dark:bg-gray-950'>
				{viewMode === 'single' ? (
					<div className='h-[600px] overflow-auto flex items-center justify-center p-8'>
						{file.type === 'pdf' ? (
							<div className='bg-white rounded-lg shadow-lg max-w-full max-h-full'>
								<canvas
									ref={canvasRef}
									className='max-w-full max-h-full rounded-lg'
								/>
							</div>
						) : (
							<div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center'>
								<p className='text-gray-600 dark:text-gray-400'>
									EPUB preview will be displayed here
								</p>
								<p className='text-sm text-gray-500 dark:text-gray-500 mt-2'>
									Page {currentPage} of {totalPages}
								</p>
							</div>
						)}
					</div>
				) : (
					<div className='h-[600px] overflow-hidden flex flex-col'>
						{/* Thumbnail header */}
						<div className='flex items-center justify-between px-6 py-3 border-b border-gray-200 dark:border-gray-700'>
							<div className='text-sm text-gray-600 dark:text-gray-400'>
								Showing {visibleThumbnailCount} of {totalPages}{' '}
								pages
							</div>
							<div className='text-xs text-gray-500 dark:text-gray-500'>
								Scroll down to load more
							</div>
						</div>

						{/* Thumbnail grid with infinite scroll */}
						<div
							className='flex-1 overflow-auto p-6'
							onScroll={handleScroll}>
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

							{/* Loading indicator */}
							{isLoadingMore && (
								<div className='flex items-center justify-center py-8'>
									<div className='flex items-center space-x-3'>
										<Loader2 className='h-5 w-5 animate-spin text-blue-600' />
										<span className='text-sm text-gray-600 dark:text-gray-400'>
											Loading more pages...
										</span>
									</div>
								</div>
							)}

							{/* End indicator */}
							{!isLoadingMore &&
								visibleThumbnailCount >= totalPages && (
									<div className='flex items-center justify-center py-8'>
										<span className='text-sm text-gray-500 dark:text-gray-500'>
											All pages loaded
										</span>
									</div>
								)}
						</div>
					</div>
				)}
			</div>

			{/* Navigation */}
			{viewMode === 'single' && (
				<div className='border-t border-gray-200 dark:border-gray-800 px-6 py-4'>
					<div className='flex items-center justify-between'>
						<button
							onClick={handlePreviousPage}
							disabled={currentPage === 1}
							className={cn(
								'flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm transition-colors',
								currentPage === 1
									? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
									: 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
							)}>
							<ChevronLeft className='h-4 w-4' />
							<span>Previous</span>
						</button>

						<div className='flex items-center space-x-4'>
							<input
								type='number'
								value={currentPage}
								onChange={(e) => {
									const page = parseInt(e.target.value);
									if (page >= 1 && page <= totalPages) {
										setCurrentPage(page);
									}
								}}
								className='w-20 px-3 py-1.5 text-center text-sm border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500'
								min={1}
								max={totalPages}
							/>
							<span className='text-sm text-gray-600 dark:text-gray-400'>
								of {totalPages}
							</span>
						</div>

						<button
							onClick={handleNextPage}
							disabled={currentPage === totalPages}
							className={cn(
								'flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm transition-colors',
								currentPage === totalPages
									? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
									: 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
							)}>
							<span>Next</span>
							<ChevronRight className='h-4 w-4' />
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
