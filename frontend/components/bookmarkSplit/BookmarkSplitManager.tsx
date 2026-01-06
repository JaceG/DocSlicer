'use client';

import { useState, useCallback, useEffect } from 'react';
import { BookOpen, Download, FileText, CheckCircle, AlertCircle, ChevronRight, Archive } from 'lucide-react';
import { UploadedFile, PdfBookmark, BookmarkSplitSettings } from '@/types';
import { 
	extractBookmarks, 
	flattenBookmarks, 
	splitByBookmarks, 
	createZipFromBookmarkSplit,
	downloadFile, 
	cleanupAllBookmarkSplitBlobs 
} from '@/lib/pdf/bookmarkSplit';
import { cn } from '@/lib/utils/cn';

interface BookmarkSplitManagerProps {
	file: UploadedFile;
	onComplete?: () => void;
}

export function BookmarkSplitManager({ file, onComplete }: BookmarkSplitManagerProps) {
	const [bookmarks, setBookmarks] = useState<PdfBookmark[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [noBookmarks, setNoBookmarks] = useState(false);
	const [settings, setSettings] = useState<BookmarkSplitSettings>({
		splitLevel: 0,
		includeSubBookmarks: false,
		namingPattern: 'number-title',
		customPrefix: '',
	});

	const [isProcessing, setIsProcessing] = useState(false);
	const [progress, setProgress] = useState(0);
	const [result, setResult] = useState<Array<{ name: string; url: string; pageRange: { start: number; end: number } }> | null>(null);
	const [zipUrl, setZipUrl] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);

	// Extract bookmarks on mount
	useEffect(() => {
		const loadBookmarks = async () => {
			try {
				const extracted = await extractBookmarks(file.file);
				if (extracted.length === 0) {
					setNoBookmarks(true);
				} else {
					setBookmarks(extracted);
				}
			} catch (err) {
				setError('Failed to extract bookmarks from PDF');
			} finally {
				setIsLoading(false);
			}
		};

		loadBookmarks();
	}, [file]);

	// Get max bookmark level
	const getMaxLevel = useCallback((items: PdfBookmark[], currentMax = 0): number => {
		let max = currentMax;
		for (const item of items) {
			max = Math.max(max, item.level);
			if (item.children && item.children.length > 0) {
				max = getMaxLevel(item.children, max);
			}
		}
		return max;
	}, []);

	const maxLevel = getMaxLevel(bookmarks);

	const handleSplit = useCallback(async () => {
		setIsProcessing(true);
		setError(null);
		setProgress(0);

		try {
			const totalPages = file.pageCount || 1;
			const outputFiles = await splitByBookmarks(
				file.file,
				bookmarks,
				settings,
				totalPages,
				setProgress
			);
			setResult(outputFiles);

			// Create ZIP file
			const zip = await createZipFromBookmarkSplit(outputFiles);
			setZipUrl(zip);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Failed to split PDF');
		} finally {
			setIsProcessing(false);
		}
	}, [file, bookmarks, settings]);

	const handleDownloadAll = useCallback(() => {
		if (zipUrl) {
			const baseName = file.name.replace('.pdf', '');
			downloadFile(zipUrl, `${baseName}_split_by_chapters.zip`);
		}
	}, [zipUrl, file.name]);

	const handleDownloadSingle = useCallback((url: string, name: string) => {
		downloadFile(url, name);
	}, []);

	const handleReset = useCallback(() => {
		cleanupAllBookmarkSplitBlobs();
		if (zipUrl) {
			URL.revokeObjectURL(zipUrl);
		}
		setResult(null);
		setZipUrl(null);
		setProgress(0);
		setError(null);
	}, [zipUrl]);

	// Render bookmark tree
	const renderBookmarks = (items: PdfBookmark[], depth = 0) => {
		return items.map((item, index) => (
			<div key={`${depth}-${index}`} style={{ marginLeft: depth * 16 }}>
				<div className="flex items-center gap-2 py-1">
					{item.children && item.children.length > 0 && (
						<ChevronRight className="w-4 h-4 text-gray-400" />
					)}
					<FileText className="w-4 h-4 text-gray-400" />
					<span className="text-sm text-gray-700 dark:text-gray-300">
						{item.title}
					</span>
					<span className="text-xs text-gray-500">
						(Page {item.pageNumber})
					</span>
				</div>
				{item.children && renderBookmarks(item.children, depth + 1)}
			</div>
		));
	};

	if (isLoading) {
		return (
			<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
				<div className="flex items-center justify-center py-12">
					<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
					<span className="ml-3 text-gray-600 dark:text-gray-400">Extracting bookmarks...</span>
				</div>
			</div>
		);
	}

	if (noBookmarks) {
		return (
			<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
				<div className="text-center py-8">
					<div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
						<BookOpen className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
					</div>
					<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
						No Bookmarks Found
					</h3>
					<p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
						This PDF doesn&apos;t have a table of contents or bookmarks. 
						Try using the regular Split tool to extract specific page ranges.
					</p>
				</div>
			</div>
		);
	}

	if (result) {
		return (
			<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
				<div className="text-center mb-6">
					<div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
						<CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
					</div>
					<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
						Split Complete!
					</h3>
					<p className="text-gray-600 dark:text-gray-400">
						Created {result.length} PDF files from bookmarks
					</p>
				</div>

				{/* Download All Button */}
				<button
					onClick={handleDownloadAll}
					className="w-full flex items-center justify-center gap-2 py-3 mb-4 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-colors"
				>
					<Archive className="w-5 h-5" />
					Download All as ZIP
				</button>

				{/* Individual Files */}
				<div className="border border-gray-200 dark:border-gray-700 rounded-lg divide-y divide-gray-200 dark:divide-gray-700 max-h-64 overflow-y-auto">
					{result.map((file, index) => (
						<div
							key={index}
							className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50"
						>
							<div className="flex items-center gap-3 min-w-0">
								<FileText className="w-5 h-5 text-teal-600 flex-shrink-0" />
								<div className="min-w-0">
									<p className="text-sm font-medium text-gray-900 dark:text-white truncate">
										{file.name}
									</p>
									<p className="text-xs text-gray-500">
										Pages {file.pageRange.start}-{file.pageRange.end}
									</p>
								</div>
							</div>
							<button
								onClick={() => handleDownloadSingle(file.url, file.name)}
								className="flex-shrink-0 p-2 text-gray-500 hover:text-teal-600 transition-colors"
							>
								<Download className="w-5 h-5" />
							</button>
						</div>
					))}
				</div>

				<button
					onClick={handleReset}
					className="w-full mt-4 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
				>
					Split Another PDF
				</button>
			</div>
		);
	}

	return (
		<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
			<div className="flex items-center gap-3 mb-6">
				<div className="w-10 h-10 bg-teal-100 dark:bg-teal-900/30 rounded-lg flex items-center justify-center">
					<BookOpen className="w-5 h-5 text-teal-600 dark:text-teal-400" />
				</div>
				<div>
					<h2 className="text-lg font-semibold text-gray-900 dark:text-white">
						Split by Bookmarks
					</h2>
					<p className="text-sm text-gray-500 dark:text-gray-400">
						{file.name} • {bookmarks.length} top-level bookmarks
					</p>
				</div>
			</div>

			<div className="space-y-6">
				{/* Bookmark Preview */}
				<div>
					<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
						Table of Contents
					</label>
					<div className="max-h-48 overflow-y-auto p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-700">
						{renderBookmarks(bookmarks)}
					</div>
				</div>

				{/* Split Level */}
				{maxLevel > 0 && (
					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
							Split Level
						</label>
						<div className="flex gap-2">
							{Array.from({ length: maxLevel + 1 }, (_, i) => (
								<button
									key={i}
									onClick={() => setSettings({ ...settings, splitLevel: i })}
									className={cn(
										'flex-1 py-2 px-4 rounded-lg border font-medium transition-colors',
										settings.splitLevel === i
											? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-400'
											: 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300'
									)}
								>
									Level {i + 1}
								</button>
							))}
						</div>
						<p className="mt-1 text-xs text-gray-500">
							Level 1 = Main chapters, Level 2 = Sub-chapters, etc.
						</p>
					</div>
				)}

				{/* Naming Pattern */}
				<div>
					<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
						File Naming
					</label>
					<div className="grid grid-cols-3 gap-2">
						{[
							{ value: 'title', label: 'Title Only' },
							{ value: 'number-title', label: '01_Title' },
							{ value: 'custom', label: 'Custom' },
						].map(({ value, label }) => (
							<button
								key={value}
								onClick={() => setSettings({ ...settings, namingPattern: value as BookmarkSplitSettings['namingPattern'] })}
								className={cn(
									'py-2 px-3 rounded-lg border text-sm font-medium transition-colors',
									settings.namingPattern === value
										? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-400'
										: 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300'
								)}
							>
								{label}
							</button>
						))}
					</div>
					{settings.namingPattern === 'custom' && (
						<input
							type="text"
							value={settings.customPrefix}
							onChange={(e) => setSettings({ ...settings, customPrefix: e.target.value })}
							placeholder="Enter prefix (e.g., 'chapter')"
							className="mt-2 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
						/>
					)}
				</div>

				{/* Error Message */}
				{error && (
					<div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg">
						<AlertCircle className="w-5 h-5 flex-shrink-0" />
						<span className="text-sm">{error}</span>
					</div>
				)}

				{/* Progress */}
				{isProcessing && (
					<div className="space-y-2">
						<div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
							<span>Splitting PDF...</span>
							<span>{progress}%</span>
						</div>
						<div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
							<div
								className="h-full bg-teal-500 transition-all duration-300"
								style={{ width: `${progress}%` }}
							/>
						</div>
					</div>
				)}

				{/* Action Button */}
				<button
					onClick={handleSplit}
					disabled={isProcessing}
					className={cn(
						'w-full flex items-center justify-center gap-2 py-3 rounded-lg font-semibold transition-colors',
						isProcessing
							? 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
							: 'bg-teal-600 text-white hover:bg-teal-700'
					)}
				>
					<BookOpen className="w-5 h-5" />
					{isProcessing ? 'Splitting...' : `Split into ${flattenBookmarks(bookmarks, settings.splitLevel).length} Files`}
				</button>
			</div>
		</div>
	);
}
