'use client';

import { useState, useCallback, useEffect } from 'react';
import { FileX, Download, CheckCircle, AlertCircle, Trash2, Eye, RefreshCw } from 'lucide-react';
import { UploadedFile, BlankPageSettings, BlankPageInfo } from '@/types';
import { 
	detectBlankPages, 
	removePages, 
	getDefaultBlankPageSettings,
	downloadFile, 
	cleanupBlankRemovalBlobStoreEntry 
} from '@/lib/pdf/blankPages';
import { cn } from '@/lib/utils/cn';

interface BlankPagesManagerProps {
	file: UploadedFile;
	onComplete?: () => void;
}

export function BlankPagesManager({ file, onComplete }: BlankPagesManagerProps) {
	const [settings, setSettings] = useState<BlankPageSettings>(getDefaultBlankPageSettings());
	const [isAnalyzing, setIsAnalyzing] = useState(false);
	const [analysisProgress, setAnalysisProgress] = useState(0);
	const [pageInfos, setPageInfos] = useState<BlankPageInfo[]>([]);
	const [selectedForRemoval, setSelectedForRemoval] = useState<Set<number>>(new Set());
	const [isProcessing, setIsProcessing] = useState(false);
	const [progress, setProgress] = useState(0);
	const [result, setResult] = useState<{ url: string; blobKey: string; removedCount: number } | null>(null);
	const [error, setError] = useState<string | null>(null);

	const handleAnalyze = useCallback(async () => {
		setIsAnalyzing(true);
		setError(null);
		setAnalysisProgress(0);
		setPageInfos([]);
		setSelectedForRemoval(new Set());

		try {
			const infos = await detectBlankPages(file.file, settings, setAnalysisProgress);
			setPageInfos(infos);

			// Auto-select blank pages
			const blanks = new Set(infos.filter(p => p.isBlank).map(p => p.pageNumber));
			setSelectedForRemoval(blanks);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Failed to analyze PDF');
		} finally {
			setIsAnalyzing(false);
		}
	}, [file, settings]);

	const togglePageSelection = useCallback((pageNumber: number) => {
		setSelectedForRemoval(prev => {
			const next = new Set(prev);
			if (next.has(pageNumber)) {
				next.delete(pageNumber);
			} else {
				next.add(pageNumber);
			}
			return next;
		});
	}, []);

	const handleRemovePages = useCallback(async () => {
		if (selectedForRemoval.size === 0) {
			setError('No pages selected for removal');
			return;
		}

		if (selectedForRemoval.size >= pageInfos.length) {
			setError('Cannot remove all pages from PDF');
			return;
		}

		setIsProcessing(true);
		setError(null);
		setProgress(0);

		try {
			const removeResult = await removePages(file.file, selectedForRemoval, setProgress);
			setResult(removeResult);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Failed to remove pages');
		} finally {
			setIsProcessing(false);
		}
	}, [file, selectedForRemoval, pageInfos.length]);

	const handleDownload = useCallback(() => {
		if (result) {
			const fileName = file.name.replace('.pdf', '_cleaned.pdf');
			downloadFile(result.url, fileName);
		}
	}, [result, file.name]);

	const handleReset = useCallback(() => {
		if (result) {
			cleanupBlankRemovalBlobStoreEntry(result.blobKey);
		}
		setResult(null);
		setPageInfos([]);
		setSelectedForRemoval(new Set());
		setProgress(0);
		setError(null);
	}, [result]);

	const blankCount = pageInfos.filter(p => p.isBlank).length;

	if (result) {
		return (
			<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
				<div className="text-center">
					<div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
						<CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
					</div>
					<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
						Pages Removed Successfully!
					</h3>
					<p className="text-gray-600 dark:text-gray-400 mb-6">
						Removed {result.removedCount} blank page{result.removedCount !== 1 ? 's' : ''} from your PDF.
					</p>

					<div className="flex justify-center gap-3">
						<button
							onClick={handleDownload}
							className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
						>
							<Download className="w-5 h-5" />
							Download Cleaned PDF
						</button>
						<button
							onClick={handleReset}
							className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
						>
							Process Another
						</button>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
			<div className="flex items-center gap-3 mb-6">
				<div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
					<FileX className="w-5 h-5 text-red-600 dark:text-red-400" />
				</div>
				<div>
					<h2 className="text-lg font-semibold text-gray-900 dark:text-white">
						Remove Blank Pages
					</h2>
					<p className="text-sm text-gray-500 dark:text-gray-400">
						{file.name}
					</p>
				</div>
			</div>

			<div className="space-y-6">
				{/* Settings */}
				{pageInfos.length === 0 && !isAnalyzing && (
					<>
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Blank Detection Threshold: {settings.threshold}%
							</label>
							<input
								type="range"
								min="90"
								max="100"
								value={settings.threshold}
								onChange={(e) => setSettings({ ...settings, threshold: parseInt(e.target.value) })}
								className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
							/>
							<p className="mt-1 text-xs text-gray-500">
								Higher = stricter (only nearly empty pages)
							</p>
						</div>

						<button
							onClick={handleAnalyze}
							disabled={isAnalyzing}
							className="w-full flex items-center justify-center gap-2 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
						>
							<Eye className="w-5 h-5" />
							Analyze PDF for Blank Pages
						</button>
					</>
				)}

				{/* Analysis Progress */}
				{isAnalyzing && (
					<div className="space-y-2">
						<div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
							<span>Analyzing pages...</span>
							<span>{analysisProgress}%</span>
						</div>
						<div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
							<div
								className="h-full bg-red-500 transition-all duration-300"
								style={{ width: `${analysisProgress}%` }}
							/>
						</div>
					</div>
				)}

				{/* Results */}
				{pageInfos.length > 0 && !isAnalyzing && (
					<>
						{/* Summary */}
						<div className={cn(
							'p-4 rounded-lg',
							blankCount > 0 
								? 'bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800'
								: 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
						)}>
							<p className={cn(
								'font-medium',
								blankCount > 0 ? 'text-yellow-800 dark:text-yellow-300' : 'text-green-800 dark:text-green-300'
							)}>
								{blankCount > 0 
									? `Found ${blankCount} blank page${blankCount !== 1 ? 's' : ''} out of ${pageInfos.length} total pages`
									: 'No blank pages detected!'
								}
							</p>
						</div>

						{/* Page Grid */}
						{blankCount > 0 && (
							<>
								<div className="flex items-center justify-between">
									<label className="text-sm font-medium text-gray-700 dark:text-gray-300">
										Select pages to remove ({selectedForRemoval.size} selected)
									</label>
									<button
										onClick={handleAnalyze}
										className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1"
									>
										<RefreshCw className="w-4 h-4" />
										Re-analyze
									</button>
								</div>

								<div className="grid grid-cols-4 sm:grid-cols-6 gap-2 max-h-64 overflow-y-auto p-2 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
									{pageInfos.map((info) => (
										<button
											key={info.pageNumber}
											onClick={() => togglePageSelection(info.pageNumber)}
											className={cn(
												'relative aspect-[3/4] rounded-lg border-2 overflow-hidden transition-all',
												selectedForRemoval.has(info.pageNumber)
													? 'border-red-500 ring-2 ring-red-300'
													: info.isBlank
														? 'border-yellow-400'
														: 'border-gray-200 dark:border-gray-700',
												'hover:border-red-400'
											)}
										>
											{info.thumbnail && (
												<img
													src={info.thumbnail}
													alt={`Page ${info.pageNumber}`}
													className={cn(
														'w-full h-full object-cover',
														selectedForRemoval.has(info.pageNumber) && 'opacity-50'
													)}
												/>
											)}
											<div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs py-0.5 text-center">
												{info.pageNumber}
											</div>
											{selectedForRemoval.has(info.pageNumber) && (
												<div className="absolute inset-0 flex items-center justify-center bg-red-500/30">
													<Trash2 className="w-6 h-6 text-red-600" />
												</div>
											)}
											{info.isBlank && !selectedForRemoval.has(info.pageNumber) && (
												<div className="absolute top-1 right-1 w-2 h-2 bg-yellow-400 rounded-full" />
											)}
										</button>
									))}
								</div>
							</>
						)}
					</>
				)}

				{/* Error Message */}
				{error && (
					<div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg">
						<AlertCircle className="w-5 h-5 flex-shrink-0" />
						<span className="text-sm">{error}</span>
					</div>
				)}

				{/* Processing Progress */}
				{isProcessing && (
					<div className="space-y-2">
						<div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
							<span>Removing pages...</span>
							<span>{progress}%</span>
						</div>
						<div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
							<div
								className="h-full bg-red-500 transition-all duration-300"
								style={{ width: `${progress}%` }}
							/>
						</div>
					</div>
				)}

				{/* Remove Button */}
				{pageInfos.length > 0 && selectedForRemoval.size > 0 && !isProcessing && (
					<button
						onClick={handleRemovePages}
						disabled={isProcessing}
						className="w-full flex items-center justify-center gap-2 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
					>
						<Trash2 className="w-5 h-5" />
						Remove {selectedForRemoval.size} Page{selectedForRemoval.size !== 1 ? 's' : ''}
					</button>
				)}
			</div>
		</div>
	);
}
