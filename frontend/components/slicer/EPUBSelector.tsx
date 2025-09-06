'use client';

import { useState, useEffect } from 'react';
import {
	Book,
	Package,
	AlertCircle,
	ChevronDown,
	ChevronUp,
} from 'lucide-react';
import { UploadedFile, PageRange } from '@/types';
import { cn } from '@/lib/utils/cn';
import { EPUBViewer, EPUBChapterInfo } from '@/lib/epub/viewer';

interface EPUBSelectorProps {
	file: UploadedFile;
	chapterRanges: PageRange[];
	onAddRange: (range: PageRange) => void;
	onRemoveRange: (index: number) => void;
}

export function EPUBSelector({
	file,
	chapterRanges,
	onAddRange,
	onRemoveRange,
}: EPUBSelectorProps) {
	const [chapters, setChapters] = useState<EPUBChapterInfo[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [expandedRanges, setExpandedRanges] = useState<Set<number>>(
		new Set()
	);

	useEffect(() => {
		loadChapters();
	}, [file.id]);

	const loadChapters = async () => {
		if (!file.file) return;

		setIsLoading(true);
		try {
			const viewer = new EPUBViewer();
			await viewer.loadDocument(file.file);
			const bookChapters = viewer.getChapters();
			setChapters(bookChapters);
			viewer.destroy();
		} catch (err) {
			console.error('Failed to load chapters:', err);
		} finally {
			setIsLoading(false);
		}
	};

	const handleQuickAdd = (startIndex: number, endIndex: number) => {
		// Check for overlaps
		const hasOverlap = chapterRanges.some((range) => {
			const rangeStart = range.start - 1;
			const rangeEnd = range.end - 1;
			return !(endIndex < rangeStart || startIndex > rangeEnd);
		});

		if (hasOverlap) {
			return; // Silently ignore overlapping ranges
		}

		const startChapter = chapters[startIndex];
		const endChapter = chapters[endIndex];
		const chapterCount = endIndex - startIndex + 1;

		onAddRange({
			id: `range-${Date.now()}`,
			start: startIndex + 1,
			end: endIndex + 1,
			name:
				chapterCount === 1
					? startChapter.label
					: `${startChapter.label} - ${endChapter.label}`,
		});
	};

	const toggleExpanded = (index: number) => {
		const newExpanded = new Set(expandedRanges);
		if (newExpanded.has(index)) {
			newExpanded.delete(index);
		} else {
			newExpanded.add(index);
		}
		setExpandedRanges(newExpanded);
	};

	const getChapterCountForRange = (range: PageRange): number => {
		return range.end - range.start + 1;
	};

	const isChapterInRange = (chapterIndex: number): boolean => {
		return chapterRanges.some(
			(range) =>
				chapterIndex >= range.start - 1 && chapterIndex <= range.end - 1
		);
	};

	if (isLoading) {
		return (
			<div className='bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 p-8'>
				<div className='text-center'>
					<Book className='h-12 w-12 text-gray-400 mx-auto mb-4 animate-pulse' />
					<p className='text-gray-600'>Loading chapters...</p>
				</div>
			</div>
		);
	}

	return (
		<div className='bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden'>
			<div className='border-b border-gray-200 dark:border-gray-800 px-6 py-4'>
				<div className='flex items-center justify-between'>
					<h3 className='text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center'>
						<Book className='h-5 w-5 mr-2' />
						Chapter Selection
					</h3>
					<div className='text-sm text-gray-600 dark:text-gray-400'>
						{chapterRanges.reduce(
							(acc, range) =>
								acc + getChapterCountForRange(range),
							0
						)}{' '}
						of {chapters.length} chapters selected
					</div>
				</div>
			</div>

			<div className='p-6'>
				{/* Quick Actions */}
				<div className='mb-6'>
					<h4 className='text-sm font-medium text-gray-700 dark:text-gray-300 mb-3'>
						Quick Select
					</h4>
					<div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
						<button
							onClick={() =>
								handleQuickAdd(0, chapters.length - 1)
							}
							className='px-4 py-2 text-sm rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors'>
							All Chapters
						</button>
						<button
							onClick={() =>
								handleQuickAdd(
									0,
									Math.floor(chapters.length / 2) - 1
								)
							}
							className='px-4 py-2 text-sm rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors'>
							First Half
						</button>
						<button
							onClick={() =>
								handleQuickAdd(
									Math.floor(chapters.length / 2),
									chapters.length - 1
								)
							}
							className='px-4 py-2 text-sm rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors'>
							Second Half
						</button>
						<button
							onClick={() => {
								// Add individual chapters
								chapters.forEach((_, index) => {
									if (!isChapterInRange(index)) {
										handleQuickAdd(index, index);
									}
								});
							}}
							className='px-4 py-2 text-sm rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors'>
							Individual Chapters
						</button>
					</div>
				</div>

				{/* Chapter List for Manual Selection */}
				<div className='mb-6'>
					<h4 className='text-sm font-medium text-gray-700 dark:text-gray-300 mb-3'>
						Available Chapters
					</h4>
					<div className='max-h-64 overflow-y-auto border border-gray-200 dark:border-gray-700 rounded-lg'>
						{chapters.map((chapter, index) => {
							const isSelected = isChapterInRange(index);
							return (
								<div
									key={chapter.id}
									className={cn(
										'px-4 py-3 border-b border-gray-100 dark:border-gray-800 last:border-b-0',
										isSelected &&
											'bg-blue-50 dark:bg-blue-900/20'
									)}>
									<div className='flex items-center justify-between'>
										<div className='flex-1'>
											<div className='text-sm font-medium text-gray-900 dark:text-gray-100'>
												{chapter.label}
											</div>
											<div className='text-xs text-gray-500'>
												Chapter {index + 1}
											</div>
										</div>
										{!isSelected && (
											<button
												onClick={() =>
													handleQuickAdd(index, index)
												}
												className='px-3 py-1 text-xs rounded-md bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors'>
												Add
											</button>
										)}
										{isSelected && (
											<span className='text-xs text-blue-600 dark:text-blue-400'>
												Selected
											</span>
										)}
									</div>
								</div>
							);
						})}
					</div>
				</div>

				{/* Selected Ranges */}
				{chapterRanges.length > 0 && (
					<div>
						<h4 className='text-sm font-medium text-gray-700 dark:text-gray-300 mb-3'>
							Selected Ranges ({chapterRanges.length})
						</h4>
						<div className='space-y-3'>
							{chapterRanges.map((range, index) => {
								const isExpanded = expandedRanges.has(index);
								const startChapter = chapters[range.start - 1];
								const endChapter = chapters[range.end - 1];
								const chapterCount =
									getChapterCountForRange(range);

								return (
									<div
										key={range.id}
										className='border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden'>
										<div className='px-4 py-3 bg-gray-50 dark:bg-gray-800/50'>
											<div className='flex items-center justify-between'>
												<div className='flex-1'>
													<div className='font-medium text-gray-900 dark:text-gray-100'>
														{range.name}
													</div>
													<div className='text-sm text-gray-600 dark:text-gray-400 mt-1'>
														<span className='inline-flex items-center'>
															<Package className='h-3 w-3 mr-1' />
															{chapterCount}{' '}
															{chapterCount === 1
																? 'chapter'
																: 'chapters'}
														</span>
														<span className='mx-2'>
															•
														</span>
														<span>
															Chapters{' '}
															{range.start}-
															{range.end}
														</span>
													</div>
												</div>
												<div className='flex items-center space-x-2'>
													<button
														onClick={() =>
															toggleExpanded(
																index
															)
														}
														className='p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors'>
														{isExpanded ? (
															<ChevronUp className='h-4 w-4' />
														) : (
															<ChevronDown className='h-4 w-4' />
														)}
													</button>
													<button
														onClick={() =>
															onRemoveRange(index)
														}
														className='px-3 py-1 text-xs rounded-md bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors'>
														Remove
													</button>
												</div>
											</div>
										</div>

										{isExpanded && (
											<div className='px-4 py-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700'>
												<div className='text-sm text-gray-600 dark:text-gray-400'>
													<div className='font-medium mb-2'>
														Included chapters:
													</div>
													<div className='space-y-1'>
														{Array.from(
															{
																length:
																	range.end -
																	range.start +
																	1,
															},
															(_, i) =>
																range.start -
																1 +
																i
														).map(
															(chapterIndex) => (
																<div
																	key={
																		chapterIndex
																	}
																	className='pl-4'>
																	•{' '}
																	{
																		chapters[
																			chapterIndex
																		]?.label
																	}
																</div>
															)
														)}
													</div>
												</div>
											</div>
										)}
									</div>
								);
							})}
						</div>
					</div>
				)}

				{chapterRanges.length === 0 && (
					<div className='text-center py-8 text-gray-500 dark:text-gray-400'>
						<AlertCircle className='h-8 w-8 mx-auto mb-2' />
						<p>No chapters selected yet</p>
						<p className='text-sm mt-1'>
							Use the quick select buttons or add chapters
							individually
						</p>
					</div>
				)}
			</div>
		</div>
	);
}
