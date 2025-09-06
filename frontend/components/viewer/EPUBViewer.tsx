'use client';

import { useState, useEffect, useRef } from 'react';
import {
	Book,
	ChevronRight,
	FileText,
	Layers,
	Download,
	Package,
	Hash,
} from 'lucide-react';
import { UploadedFile } from '@/types';
import {
	EPUBViewer as EPUBViewerLib,
	EPUBChapterInfo,
} from '@/lib/epub/viewer';
import { cn } from '@/lib/utils/cn';

interface EPUBViewerProps {
	file: UploadedFile;
	onChapterCountLoaded?: (count: number) => void;
}

export function EPUBViewer({ file, onChapterCountLoaded }: EPUBViewerProps) {
	const [chapters, setChapters] = useState<EPUBChapterInfo[]>([]);
	const [selectedChapters, setSelectedChapters] = useState<Set<number>>(
		new Set()
	);
	const [currentChapter, setCurrentChapter] = useState<number>(0);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [chapterContent, setChapterContent] = useState<string>('');
	const [expandedChapter, setExpandedChapter] = useState<number | null>(null);

	const viewerRef = useRef<EPUBViewerLib | null>(null);
	const contentRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		loadEPUB();

		return () => {
			if (viewerRef.current) {
				viewerRef.current.destroy();
			}
		};
	}, [file.id]);

	const loadEPUB = async () => {
		if (!file.file) return;

		setIsLoading(true);
		setError(null);

		try {
			const viewer = new EPUBViewerLib();
			await viewer.loadDocument(file.file);
			viewerRef.current = viewer;

			const bookChapters = viewer.getChapters();
			setChapters(bookChapters);

			if (onChapterCountLoaded) {
				onChapterCountLoaded(bookChapters.length);
			}

			// Load first chapter content
			if (bookChapters.length > 0) {
				const content = await viewer.getChapterContent(0);
				setChapterContent(content);
			}

			setIsLoading(false);
		} catch (err) {
			console.error('EPUB loading error:', err);
			setError(
				err instanceof Error ? err.message : 'Failed to load EPUB'
			);
			setIsLoading(false);
		}
	};

	const loadChapterContent = async (index: number) => {
		if (!viewerRef.current) return;

		try {
			const content = await viewerRef.current.getChapterContent(index);
			setChapterContent(content);
			setCurrentChapter(index);
		} catch (err) {
			console.error('Failed to load chapter:', err);
		}
	};

	const toggleChapterSelection = (index: number) => {
		const newSelection = new Set(selectedChapters);
		if (newSelection.has(index)) {
			newSelection.delete(index);
			// If unselecting a range endpoint, clear everything in between
			const sorted = Array.from(newSelection).sort((a, b) => a - b);
			if (sorted.length > 0) {
				const min = sorted[0];
				const max = sorted[sorted.length - 1];
				newSelection.clear();
				for (let i = min; i <= max; i++) {
					if (i !== index) newSelection.add(i);
				}
			}
		} else {
			newSelection.add(index);
			// Auto-select range if clicking creates a gap
			const sorted = Array.from(newSelection).sort((a, b) => a - b);
			if (sorted.length > 1) {
				const min = sorted[0];
				const max = sorted[sorted.length - 1];
				for (let i = min; i <= max; i++) {
					newSelection.add(i);
				}
			}
		}
		setSelectedChapters(newSelection);
	};

	const selectRange = (start: number, end: number) => {
		const newSelection = new Set<number>();
		for (let i = start; i <= end; i++) {
			newSelection.add(i);
		}
		setSelectedChapters(newSelection);
	};

	const getSelectionRanges = (): string[] => {
		if (selectedChapters.size === 0) return [];

		const sorted = Array.from(selectedChapters).sort((a, b) => a - b);
		const ranges: string[] = [];
		let start = sorted[0];
		let end = sorted[0];

		for (let i = 1; i < sorted.length; i++) {
			if (sorted[i] === end + 1) {
				end = sorted[i];
			} else {
				ranges.push(
					start === end
						? `Chapter ${start + 1}`
						: `Chapters ${start + 1}-${end + 1}`
				);
				start = sorted[i];
				end = sorted[i];
			}
		}
		ranges.push(
			start === end
				? `Chapter ${start + 1}`
				: `Chapters ${start + 1}-${end + 1}`
		);

		return ranges;
	};

	if (isLoading) {
		return (
			<div className='flex items-center justify-center h-96'>
				<div className='text-center'>
					<Book className='h-12 w-12 text-gray-400 mx-auto mb-4 animate-pulse' />
					<p className='text-gray-600'>Loading EPUB...</p>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className='flex items-center justify-center h-96'>
				<div className='text-center text-red-600'>
					<FileText className='h-12 w-12 mx-auto mb-4' />
					<p>{error}</p>
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
							EPUB • {chapters.length} chapters •{' '}
							{selectedChapters.size} selected
						</p>
					</div>
					<div className='flex items-center space-x-2'>
						<Book className='h-5 w-5 text-gray-500' />
					</div>
				</div>
			</div>

			<div className='flex h-[600px]'>
				{/* Chapter Navigation Sidebar */}
				<div className='w-80 border-r border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 overflow-y-auto'>
					<div className='p-4 border-b border-gray-200 dark:border-gray-800'>
						<h4 className='font-medium text-gray-900 dark:text-gray-100 mb-2'>
							Table of Contents
						</h4>
						{selectedChapters.size > 0 && (
							<div className='text-xs text-gray-600 dark:text-gray-400 space-y-1'>
								<div className='font-medium'>
									Selected for extraction:
								</div>
								{getSelectionRanges().map((range, index) => (
									<div
										key={index}
										className='flex items-center space-x-1'>
										<Package className='h-3 w-3' />
										<span>{range}</span>
									</div>
								))}
							</div>
						)}
					</div>

					<div className='p-2'>
						{chapters.map((chapter, index) => (
							<div key={chapter.id} className='mb-1'>
								<div
									className={cn(
										'flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200',
										currentChapter === index
											? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
											: 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
									)}>
									<input
										type='checkbox'
										checked={selectedChapters.has(index)}
										onChange={() =>
											toggleChapterSelection(index)
										}
										onClick={(e) => e.stopPropagation()}
										className='mr-3 text-blue-600 rounded focus:ring-blue-500'
									/>
									<div
										className='flex-1 flex items-center'
										onClick={() =>
											loadChapterContent(index)
										}>
										<Hash className='h-4 w-4 mr-2 text-gray-400' />
										<div className='flex-1'>
											<div className='text-sm font-medium'>
												{chapter.label}
											</div>
											<div className='text-xs text-gray-500 dark:text-gray-500'>
												Chapter {index + 1}
											</div>
										</div>
										<ChevronRight
											className={cn(
												'h-4 w-4 transition-transform',
												currentChapter === index &&
													'text-blue-600'
											)}
										/>
									</div>
								</div>
							</div>
						))}
					</div>

					{/* Quick Selection Tools */}
					<div className='p-4 border-t border-gray-200 dark:border-gray-800'>
						<div className='space-y-2'>
							<button
								onClick={() =>
									selectRange(0, chapters.length - 1)
								}
								className='w-full text-xs py-2 px-3 rounded-md bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors'>
								Select All Chapters
							</button>
							<button
								onClick={() => setSelectedChapters(new Set())}
								className='w-full text-xs py-2 px-3 rounded-md bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors'>
								Clear Selection
							</button>
						</div>
					</div>
				</div>

				{/* Chapter Content Viewer */}
				<div className='flex-1 overflow-hidden flex flex-col'>
					<div className='border-b border-gray-200 dark:border-gray-800 px-6 py-3 bg-gray-50 dark:bg-gray-950'>
						<div className='flex items-center justify-between'>
							<h4 className='font-medium text-gray-900 dark:text-gray-100'>
								{chapters[currentChapter]?.label ||
									'Select a chapter'}
							</h4>
							<span className='text-sm text-gray-500'>
								Chapter {currentChapter + 1} of{' '}
								{chapters.length}
							</span>
						</div>
					</div>

					<div className='flex-1 overflow-auto p-6'>
						<div
							ref={contentRef}
							className='prose prose-gray dark:prose-invert max-w-none'
							dangerouslySetInnerHTML={{ __html: chapterContent }}
						/>
					</div>

					{/* Chapter Navigation */}
					<div className='border-t border-gray-200 dark:border-gray-800 px-6 py-3 flex items-center justify-between'>
						<button
							onClick={() =>
								currentChapter > 0 &&
								loadChapterContent(currentChapter - 1)
							}
							disabled={currentChapter === 0}
							className='px-4 py-2 text-sm rounded-lg bg-gray-100 dark:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors'>
							Previous Chapter
						</button>
						<div className='flex items-center space-x-4'>
							{(() => {
								const maxVisible = Math.min(5, chapters.length);
								const startIndex = Math.max(
									0,
									Math.min(
										currentChapter -
											Math.floor(maxVisible / 2),
										chapters.length - maxVisible
									)
								);

								return [...Array(maxVisible)].map((_, i) => {
									const chapterIndex = startIndex + i;
									return (
										<button
											key={chapterIndex}
											onClick={() =>
												loadChapterContent(chapterIndex)
											}
											className={cn(
												'w-8 h-8 rounded-full text-sm font-medium transition-colors',
												chapterIndex === currentChapter
													? 'bg-blue-600 text-white'
													: 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
											)}>
											{chapterIndex + 1}
										</button>
									);
								});
							})()}
						</div>
						<button
							onClick={() =>
								currentChapter < chapters.length - 1 &&
								loadChapterContent(currentChapter + 1)
							}
							disabled={currentChapter === chapters.length - 1}
							className='px-4 py-2 text-sm rounded-lg bg-gray-100 dark:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors'>
							Next Chapter
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
