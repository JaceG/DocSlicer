'use client';

import { useState, useCallback } from 'react';
import {
	Download,
	Layers,
	CheckCircle,
	AlertCircle,
	Loader2,
	FileText,
	GripVertical,
	Trash2,
	Plus,
	ArrowUp,
	ArrowDown,
} from 'lucide-react';
import { MergeFile, MergeTask } from '@/types';
import { cn } from '@/lib/utils/cn';
import { mergePDFs, downloadFile as downloadMergedFile } from '@/lib/pdf/merger';
import { useSubscription } from '@/lib/subscription/hooks';
import { getRemainingMerges, incrementMergeUsage } from '@/lib/subscription/usage';
import Link from 'next/link';

interface MergeManagerProps {
	files: MergeFile[];
	onUpdateFiles: (files: MergeFile[]) => void;
	onAddMoreFiles: () => void;
	onReset: () => void;
}

export function MergeManager({
	files,
	onUpdateFiles,
	onAddMoreFiles,
	onReset,
}: MergeManagerProps) {
	const [mergeTask, setMergeTask] = useState<MergeTask | null>(null);
	const [outputFileName, setOutputFileName] = useState('merged-document.pdf');
	const { isPremium, limits } = useSubscription();
	
	// Check remaining merges for free users
	const remainingMerges = getRemainingMerges(limits?.maxMergesPerMonth || 3);
	const hasRemainingMerges = isPremium || remainingMerges > 0;

	const isProcessing = mergeTask?.status === 'processing';
	const isCompleted = mergeTask?.status === 'completed';
	const hasError = mergeTask?.status === 'error';

	const getTotalPages = () => {
		return files.reduce((total, file) => total + (file.pageCount || 0), 0);
	};

	const getTotalSize = () => {
		const bytes = files.reduce((total, file) => total + file.size, 0);
		if (bytes < 1024 * 1024) {
			return `${(bytes / 1024).toFixed(1)} KB`;
		}
		return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
	};

	const moveFile = (fromIndex: number, direction: 'up' | 'down') => {
		const toIndex = direction === 'up' ? fromIndex - 1 : fromIndex + 1;
		if (toIndex < 0 || toIndex >= files.length) return;

		const newFiles = [...files];
		const [movedFile] = newFiles.splice(fromIndex, 1);
		newFiles.splice(toIndex, 0, movedFile);

		// Update order values
		const reorderedFiles = newFiles.map((file, index) => ({
			...file,
			order: index,
		}));

		onUpdateFiles(reorderedFiles);
	};

	const removeFile = (fileId: string) => {
		const newFiles = files
			.filter((f) => f.id !== fileId)
			.map((file, index) => ({
				...file,
				order: index,
			}));
		onUpdateFiles(newFiles);
	};

	const handleStartMerge = async () => {
		if (files.length < 2) return;

		// Check merge limits for free users
		if (!isPremium && remainingMerges <= 0) {
			alert(`You've reached your monthly limit of ${limits?.maxMergesPerMonth || 3} merges. Upgrade to Premium for unlimited merges!`);
			return;
		}

		// Increment usage for free users
		if (!isPremium) {
			incrementMergeUsage();
		}

		// Create merge task
		const task: MergeTask = {
			id: `merge-${Date.now()}`,
			files,
			outputFileName,
			status: 'processing',
		};

		setMergeTask(task);

		try {
			const result = await mergePDFs(files, outputFileName);

			if (result.success && result.downloadUrl) {
				setMergeTask({
					...task,
					status: 'completed',
					outputUrl: result.downloadUrl,
					blobKey: result.blobKey,
					totalPages: result.pageCount,
				});
			} else {
				setMergeTask({
					...task,
					status: 'error',
					error: result.error || 'Unknown error occurred',
				});
			}
		} catch (error) {
			setMergeTask({
				...task,
				status: 'error',
				error: 'Failed to merge PDFs',
			});
		}
	};

	const handleDownload = () => {
		if (mergeTask?.outputUrl) {
			downloadMergedFile(mergeTask.outputUrl, outputFileName);
		}
	};

	const handleReset = () => {
		setMergeTask(null);
		setOutputFileName('merged-document.pdf');
		onReset();
	};

	return (
		<div className='bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden'>
			{/* Header */}
			<div className='border-b border-gray-200 dark:border-gray-800 px-6 py-4'>
				<h3 className='text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center space-x-2'>
					<Layers className='h-5 w-5 text-blue-600' />
					<span>Merge PDFs</span>
				</h3>
				<p className='text-sm text-gray-600 dark:text-gray-400 mt-1'>
					Combine multiple PDFs into one document
				</p>
			</div>

			<div className='p-6 space-y-6'>
				{/* File List */}
				{files.length > 0 && (
					<div className='space-y-3'>
						<div className='flex items-center justify-between'>
							<h4 className='text-sm font-medium text-gray-700 dark:text-gray-300'>
								Files to Merge ({files.length})
							</h4>
							<span className='text-xs text-gray-500 dark:text-gray-400'>
								Drag to reorder
							</span>
						</div>

						<div className='space-y-2'>
							{files.map((file, index) => (
								<div
									key={file.id}
									className='flex items-center space-x-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 border border-gray-200 dark:border-gray-700'>
									{/* Drag Handle / Order */}
									<div className='flex items-center space-x-2'>
										<GripVertical className='h-4 w-4 text-gray-400 cursor-grab' />
										<span className='w-6 h-6 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-xs font-bold'>
											{index + 1}
										</span>
									</div>

									{/* File Info */}
									<div className='flex-1 min-w-0'>
										<p className='text-sm font-medium text-gray-900 dark:text-gray-100 truncate'>
											{file.name}
										</p>
										<p className='text-xs text-gray-500 dark:text-gray-400'>
											{file.pageCount
												? `${file.pageCount} pages`
												: 'Loading...'}
											{' • '}
											{(file.size / 1024).toFixed(0)} KB
										</p>
									</div>

									{/* Actions */}
									<div className='flex items-center space-x-1'>
										<button
											onClick={() => moveFile(index, 'up')}
											disabled={index === 0 || isProcessing}
											className='p-1.5 text-gray-400 hover:text-blue-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors'
											title='Move up'>
											<ArrowUp className='h-4 w-4' />
										</button>
										<button
											onClick={() => moveFile(index, 'down')}
											disabled={
												index === files.length - 1 || isProcessing
											}
											className='p-1.5 text-gray-400 hover:text-blue-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors'
											title='Move down'>
											<ArrowDown className='h-4 w-4' />
										</button>
										<button
											onClick={() => removeFile(file.id)}
											disabled={isProcessing}
											className='p-1.5 text-gray-400 hover:text-red-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors'
											title='Remove'>
											<Trash2 className='h-4 w-4' />
										</button>
									</div>
								</div>
							))}
						</div>

						{/* Add More Button */}
						<button
							onClick={onAddMoreFiles}
							disabled={isProcessing}
							className='w-full flex items-center justify-center space-x-2 px-4 py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'>
							<Plus className='h-4 w-4' />
							<span>Add More PDFs</span>
						</button>
					</div>
				)}

				{/* Summary */}
				{files.length >= 2 && (
					<div className='bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800'>
						<div className='flex items-center space-x-3'>
							<div className='w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center'>
								<Layers className='h-5 w-5 text-white' />
							</div>
							<div>
								<p className='font-semibold text-gray-900 dark:text-gray-100'>
									Ready to merge {files.length} PDFs
								</p>
								<p className='text-sm text-gray-600 dark:text-gray-400'>
									{getTotalPages()} total pages • {getTotalSize()}
								</p>
							</div>
						</div>
					</div>
				)}

				{/* Output Filename */}
				{files.length >= 2 && !isCompleted && (
					<div>
						<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
							Output Filename
						</label>
						<input
							type='text'
							value={outputFileName}
							onChange={(e) => setOutputFileName(e.target.value)}
							disabled={isProcessing}
							className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50'
							placeholder='merged-document.pdf'
						/>
					</div>
				)}

				{/* Status Messages */}
				{isProcessing && (
					<div className='flex items-center space-x-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4'>
						<Loader2 className='h-5 w-5 text-blue-600 dark:text-blue-400 animate-spin' />
						<div>
							<p className='font-medium text-blue-800 dark:text-blue-200'>
								Merging PDFs...
							</p>
							<p className='text-sm text-blue-600 dark:text-blue-400'>
								This may take a moment
							</p>
						</div>
					</div>
				)}

				{hasError && (
					<div className='flex items-center space-x-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4'>
						<AlertCircle className='h-5 w-5 text-red-600 dark:text-red-400' />
						<div>
							<p className='font-medium text-red-800 dark:text-red-200'>
								Merge Failed
							</p>
							<p className='text-sm text-red-600 dark:text-red-400'>
								{mergeTask?.error || 'An error occurred'}
							</p>
						</div>
					</div>
				)}

				{isCompleted && (
					<div className='bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4'>
						<div className='flex items-center space-x-3 mb-4'>
							<CheckCircle className='h-5 w-5 text-green-600 dark:text-green-400' />
							<div>
								<p className='font-medium text-green-800 dark:text-green-200'>
									Merge Complete!
								</p>
								<p className='text-sm text-green-600 dark:text-green-400'>
									{mergeTask?.totalPages || getTotalPages()} pages merged into one PDF
								</p>
							</div>
						</div>

						<div className='bg-white dark:bg-gray-800 border border-green-200 dark:border-green-700 rounded-lg p-3'>
							<div className='flex items-center justify-between'>
								<div className='flex items-center space-x-3'>
									<FileText className='h-5 w-5 text-green-600 dark:text-green-400' />
									<div>
										<p className='text-sm font-medium text-gray-900 dark:text-gray-100'>
											{outputFileName}
										</p>
										<p className='text-xs text-gray-500 dark:text-gray-400'>
											Ready for download
										</p>
									</div>
								</div>
								<button
									onClick={handleDownload}
									className='flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm hover:shadow-md'>
									<Download className='h-4 w-4' />
									<span>Download</span>
								</button>
							</div>
						</div>
					</div>
				)}

				{/* Action Buttons */}
				<div className='space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700'>
					{!isCompleted && (
						<button
							onClick={handleStartMerge}
							disabled={files.length < 2 || isProcessing}
							className={cn(
								'w-full flex items-center justify-center space-x-3 px-6 py-4 font-semibold rounded-xl transition-all duration-200 shadow-lg',
								files.length < 2 || isProcessing
									? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed shadow-none'
									: 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white hover:shadow-xl transform hover:-translate-y-0.5'
							)}>
							{isProcessing ? (
								<Loader2 className='h-5 w-5 animate-spin' />
							) : (
								<Layers className='h-5 w-5' />
							)}
							<span>
								{isProcessing
									? 'Merging...'
									: files.length < 2
									? 'Add at least 2 PDFs'
									: 'Merge PDFs'}
							</span>
						</button>
					)}

					{isCompleted && (
						<button
							onClick={handleReset}
							className='w-full flex items-center justify-center space-x-2 px-4 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors'>
							<Plus className='h-4 w-4' />
							<span>Start New Merge</span>
						</button>
					)}
				</div>
			</div>
		</div>
	);
}
