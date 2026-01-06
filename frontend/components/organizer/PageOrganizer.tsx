'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import {
	RotateCw,
	RotateCcw,
	Trash2,
	Download,
	Loader2,
	CheckCircle,
	AlertCircle,
	GripVertical,
	Undo2,
	Eye,
	EyeOff,
} from 'lucide-react';
import { OrganizeFile, PageInfo, RotationDegrees } from '@/types';
import { cn } from '@/lib/utils/cn';
import {
	applyOrganizeOperations,
	rotatePageInfo,
	togglePageDeletion,
	reorderPages,
	downloadFile,
	cleanupOrganizeBlobUrl,
} from '@/lib/pdf/organizer';

interface PageOrganizerProps {
	file: OrganizeFile;
	onReset: () => void;
}

export function PageOrganizer({ file, onReset }: PageOrganizerProps) {
	const [pages, setPages] = useState<PageInfo[]>(file.pages);
	const [selectedPages, setSelectedPages] = useState<Set<number>>(new Set());
	const [isProcessing, setIsProcessing] = useState(false);
	const [progress, setProgress] = useState(0);
	const [result, setResult] = useState<{ success: boolean; url?: string; error?: string } | null>(null);
	const [outputFileName, setOutputFileName] = useState(
		file.name.replace(/\.pdf$/i, '_organized.pdf')
	);
	const [draggedPage, setDraggedPage] = useState<number | null>(null);
	const [thumbnails, setThumbnails] = useState<Map<number, string>>(new Map());
	const [loadingThumbnails, setLoadingThumbnails] = useState(true);

	// Load thumbnails
	useEffect(() => {
		const loadThumbnails = async () => {
			setLoadingThumbnails(true);
			try {
				const { PDFViewer } = await import('@/lib/pdf/viewer');
				const pdfViewer = new PDFViewer();
				await pdfViewer.loadDocument(file.file);

				const newThumbnails = new Map<number, string>();
				for (let i = 1; i <= file.pageCount; i++) {
					try {
						const thumbnail = await pdfViewer.generateThumbnail(i, 120);
						newThumbnails.set(i, thumbnail);
					} catch (e) {
						console.warn(`Failed to load thumbnail for page ${i}`);
					}
				}
				setThumbnails(newThumbnails);
				pdfViewer.destroy();
			} catch (error) {
				console.error('Failed to load thumbnails:', error);
			}
			setLoadingThumbnails(false);
		};

		loadThumbnails();
	}, [file]);

	const handleRotate = useCallback((pageNumber: number, direction: 'cw' | 'ccw') => {
		setPages(prev => prev.map(page => 
			page.pageNumber === pageNumber ? rotatePageInfo(page, direction) : page
		));
	}, []);

	const handleToggleDelete = useCallback((pageNumber: number) => {
		setPages(prev => prev.map(page =>
			page.pageNumber === pageNumber ? togglePageDeletion(page) : page
		));
	}, []);

	const handleRotateSelected = useCallback((direction: 'cw' | 'ccw') => {
		if (selectedPages.size === 0) return;
		setPages(prev => prev.map(page =>
			selectedPages.has(page.pageNumber) ? rotatePageInfo(page, direction) : page
		));
	}, [selectedPages]);

	const handleDeleteSelected = useCallback(() => {
		if (selectedPages.size === 0) return;
		setPages(prev => prev.map(page =>
			selectedPages.has(page.pageNumber) ? { ...page, deleted: true } : page
		));
		setSelectedPages(new Set());
	}, [selectedPages]);

	const handleRestoreAll = useCallback(() => {
		setPages(prev => prev.map(page => ({ ...page, deleted: false, rotation: 0 })));
	}, []);

	const handleSelectPage = useCallback((pageNumber: number, event: React.MouseEvent) => {
		if (event.ctrlKey || event.metaKey) {
			setSelectedPages(prev => {
				const newSet = new Set(prev);
				if (newSet.has(pageNumber)) {
					newSet.delete(pageNumber);
				} else {
					newSet.add(pageNumber);
				}
				return newSet;
			});
		} else if (event.shiftKey && selectedPages.size > 0) {
			const allPageNumbers = pages.map(p => p.pageNumber);
			const lastSelected = Math.max(...Array.from(selectedPages));
			const start = Math.min(lastSelected, pageNumber);
			const end = Math.max(lastSelected, pageNumber);
			const newSelection = new Set<number>();
			for (let i = start; i <= end; i++) {
				if (allPageNumbers.includes(i)) {
					newSelection.add(i);
				}
			}
			setSelectedPages(newSelection);
		} else {
			setSelectedPages(new Set([pageNumber]));
		}
	}, [pages, selectedPages]);

	const handleDragStart = useCallback((pageNumber: number) => {
		setDraggedPage(pageNumber);
	}, []);

	const handleDragOver = useCallback((e: React.DragEvent, pageNumber: number) => {
		e.preventDefault();
		if (draggedPage !== null && draggedPage !== pageNumber) {
			const fromIndex = pages.findIndex(p => p.pageNumber === draggedPage);
			const toIndex = pages.findIndex(p => p.pageNumber === pageNumber);
			if (fromIndex !== -1 && toIndex !== -1) {
				setPages(reorderPages(pages, fromIndex, toIndex));
			}
		}
	}, [draggedPage, pages]);

	const handleDragEnd = useCallback(() => {
		setDraggedPage(null);
	}, []);

	const handleApplyChanges = async () => {
		setIsProcessing(true);
		setProgress(0);
		setResult(null);

		try {
			const organizeResult = await applyOrganizeOperations(
				file.file,
				pages,
				outputFileName,
				(p) => setProgress(p)
			);

			if (organizeResult.success && organizeResult.downloadUrl) {
				setResult({
					success: true,
					url: organizeResult.downloadUrl,
				});
			} else {
				setResult({
					success: false,
					error: organizeResult.error || 'Failed to process PDF',
				});
			}
		} catch (error) {
			setResult({
				success: false,
				error: 'An unexpected error occurred',
			});
		} finally {
			setIsProcessing(false);
		}
	};

	const handleDownload = () => {
		if (result?.url) {
			downloadFile(result.url, outputFileName);
		}
	};

	const hasChanges = pages.some(p => p.rotation !== 0 || p.deleted) ||
		pages.some((p, i) => p.pageNumber !== file.pages[i]?.pageNumber);

	const activePages = pages.filter(p => !p.deleted);
	const deletedCount = pages.filter(p => p.deleted).length;
	const rotatedCount = pages.filter(p => p.rotation !== 0).length;

	return (
		<div className="space-y-6">
			{/* Stats Bar */}
			<div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 p-4">
				<div className="flex flex-wrap items-center justify-between gap-4">
					<div className="flex items-center gap-6">
						<div className="text-sm">
							<span className="text-gray-500 dark:text-gray-400">Total:</span>{' '}
							<span className="font-semibold text-gray-900 dark:text-gray-100">{file.pageCount} pages</span>
						</div>
						<div className="text-sm">
							<span className="text-gray-500 dark:text-gray-400">Active:</span>{' '}
							<span className="font-semibold text-green-600 dark:text-green-400">{activePages.length} pages</span>
						</div>
						{deletedCount > 0 && (
							<div className="text-sm">
								<span className="text-gray-500 dark:text-gray-400">Deleted:</span>{' '}
								<span className="font-semibold text-red-600 dark:text-red-400">{deletedCount} pages</span>
							</div>
						)}
						{rotatedCount > 0 && (
							<div className="text-sm">
								<span className="text-gray-500 dark:text-gray-400">Rotated:</span>{' '}
								<span className="font-semibold text-blue-600 dark:text-blue-400">{rotatedCount} pages</span>
							</div>
						)}
					</div>

					{/* Bulk Actions */}
					<div className="flex items-center gap-2">
						{selectedPages.size > 0 && (
							<>
								<span className="text-sm text-gray-500 dark:text-gray-400 mr-2">
									{selectedPages.size} selected
								</span>
								<button
									onClick={() => handleRotateSelected('ccw')}
									className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
									title="Rotate selected counter-clockwise"
								>
									<RotateCcw className="h-4 w-4" />
								</button>
								<button
									onClick={() => handleRotateSelected('cw')}
									className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
									title="Rotate selected clockwise"
								>
									<RotateCw className="h-4 w-4" />
								</button>
								<button
									onClick={handleDeleteSelected}
									className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
									title="Delete selected"
								>
									<Trash2 className="h-4 w-4" />
								</button>
							</>
						)}
						{hasChanges && (
							<button
								onClick={handleRestoreAll}
								className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
							>
								<Undo2 className="h-4 w-4" />
								<span>Reset All</span>
							</button>
						)}
					</div>
				</div>
			</div>

			{/* Page Grid */}
			<div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 p-6">
				<h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
					Drag to reorder • Click to select • Use buttons to rotate or delete
				</h3>

				{loadingThumbnails ? (
					<div className="flex items-center justify-center py-12">
						<Loader2 className="h-8 w-8 animate-spin text-blue-600" />
						<span className="ml-3 text-gray-600 dark:text-gray-400">Loading page previews...</span>
					</div>
				) : (
					<div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4">
						{pages.map((page, index) => (
							<div
								key={page.pageNumber}
								draggable
								onDragStart={() => handleDragStart(page.pageNumber)}
								onDragOver={(e) => handleDragOver(e, page.pageNumber)}
								onDragEnd={handleDragEnd}
								onClick={(e) => handleSelectPage(page.pageNumber, e)}
								className={cn(
									'relative group cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-200',
									page.deleted
										? 'opacity-40 border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20'
										: selectedPages.has(page.pageNumber)
										? 'border-blue-500 ring-2 ring-blue-200 dark:ring-blue-800 shadow-lg'
										: 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600',
									draggedPage === page.pageNumber && 'scale-105 shadow-xl z-10'
								)}
							>
								{/* Drag Handle */}
								<div className="absolute top-1 left-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
									<GripVertical className="h-4 w-4 text-gray-400" />
								</div>

								{/* Thumbnail */}
								<div
									className="w-full aspect-[3/4] bg-gray-100 dark:bg-gray-800 flex items-center justify-center"
									style={{ transform: `rotate(${page.rotation}deg)` }}
								>
									{thumbnails.has(page.pageNumber) ? (
										<img
											src={thumbnails.get(page.pageNumber)}
											alt={`Page ${page.pageNumber}`}
											className="w-full h-full object-contain"
											draggable={false}
										/>
									) : (
										<span className="text-xs text-gray-400">{page.pageNumber}</span>
									)}
								</div>

								{/* Page Number */}
								<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/75 to-transparent text-white text-xs text-center py-1.5">
									{index + 1} <span className="opacity-60">(pg {page.pageNumber})</span>
								</div>

								{/* Rotation Badge */}
								{page.rotation !== 0 && (
									<div className="absolute top-1 right-1 bg-blue-500 text-white text-[10px] px-1.5 py-0.5 rounded">
										{page.rotation}°
									</div>
								)}

								{/* Deleted Overlay */}
								{page.deleted && (
									<div className="absolute inset-0 flex items-center justify-center bg-red-500/20">
										<EyeOff className="h-6 w-6 text-red-600 dark:text-red-400" />
									</div>
								)}

								{/* Action Buttons */}
								<div className="absolute bottom-7 left-0 right-0 flex justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
									<button
										onClick={(e) => { e.stopPropagation(); handleRotate(page.pageNumber, 'ccw'); }}
										className="p-1 bg-white dark:bg-gray-800 rounded shadow hover:bg-blue-50 dark:hover:bg-blue-900/30"
										title="Rotate left"
									>
										<RotateCcw className="h-3 w-3 text-gray-600 dark:text-gray-300" />
									</button>
									<button
										onClick={(e) => { e.stopPropagation(); handleRotate(page.pageNumber, 'cw'); }}
										className="p-1 bg-white dark:bg-gray-800 rounded shadow hover:bg-blue-50 dark:hover:bg-blue-900/30"
										title="Rotate right"
									>
										<RotateCw className="h-3 w-3 text-gray-600 dark:text-gray-300" />
									</button>
									<button
										onClick={(e) => { e.stopPropagation(); handleToggleDelete(page.pageNumber); }}
										className={cn(
											'p-1 rounded shadow',
											page.deleted
												? 'bg-green-500 hover:bg-green-600'
												: 'bg-white dark:bg-gray-800 hover:bg-red-50 dark:hover:bg-red-900/30'
										)}
										title={page.deleted ? 'Restore' : 'Delete'}
									>
										{page.deleted ? (
											<Eye className="h-3 w-3 text-white" />
										) : (
											<Trash2 className="h-3 w-3 text-gray-600 dark:text-gray-300" />
										)}
									</button>
								</div>
							</div>
						))}
					</div>
				)}
			</div>

			{/* Output & Actions */}
			<div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 p-6">
				{!result ? (
					<>
						<div className="mb-4">
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Output Filename
							</label>
							<input
								type="text"
								value={outputFileName}
								onChange={(e) => setOutputFileName(e.target.value)}
								disabled={isProcessing}
								className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
							/>
						</div>

						{isProcessing && (
							<div className="mb-4">
								<div className="flex items-center justify-between mb-2">
									<span className="text-sm text-gray-600 dark:text-gray-400">Processing...</span>
									<span className="text-sm font-medium text-gray-900 dark:text-gray-100">{progress}%</span>
								</div>
								<div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
									<div
										className="bg-blue-600 h-2 rounded-full transition-all duration-300"
										style={{ width: `${progress}%` }}
									/>
								</div>
							</div>
						)}

						<button
							onClick={handleApplyChanges}
							disabled={!hasChanges || isProcessing || activePages.length === 0}
							className={cn(
								'w-full flex items-center justify-center gap-3 px-6 py-4 font-semibold rounded-xl transition-all duration-200 shadow-lg',
								!hasChanges || isProcessing || activePages.length === 0
									? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed shadow-none'
									: 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white hover:shadow-xl transform hover:-translate-y-0.5'
							)}
						>
							{isProcessing ? (
								<Loader2 className="h-5 w-5 animate-spin" />
							) : (
								<CheckCircle className="h-5 w-5" />
							)}
							<span>
								{isProcessing ? 'Processing...' : `Apply Changes (${activePages.length} pages)`}
							</span>
						</button>
					</>
				) : result.success ? (
					<div className="space-y-4">
						<div className="flex items-center gap-3 text-green-600 dark:text-green-400">
							<CheckCircle className="h-6 w-6" />
							<span className="font-semibold">PDF organized successfully!</span>
						</div>
						<div className="flex gap-3">
							<button
								onClick={handleDownload}
								className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-colors"
							>
								<Download className="h-5 w-5" />
								<span>Download</span>
							</button>
							<button
								onClick={onReset}
								className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
							>
								Start Over
							</button>
						</div>
					</div>
				) : (
					<div className="space-y-4">
						<div className="flex items-center gap-3 text-red-600 dark:text-red-400">
							<AlertCircle className="h-6 w-6" />
							<span className="font-semibold">{result.error}</span>
						</div>
						<button
							onClick={() => setResult(null)}
							className="w-full px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
						>
							Try Again
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
