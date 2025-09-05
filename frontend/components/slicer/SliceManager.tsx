'use client';

import {
	Download,
	Scissors,
	CheckCircle,
	AlertCircle,
	Loader2,
	FileText,
	Clock,
	Check,
} from 'lucide-react';
import { PageRange, SliceTask } from '@/types';
import { cn } from '@/lib/utils/cn';
import {
	downloadFile,
	downloadTasksAsZip,
	getBlobStoreSize,
} from '@/lib/pdf/slicer';
import { useState, useEffect } from 'react';

interface SliceManagerProps {
	pageRanges: PageRange[];
	sliceTasks: SliceTask[];
	onStartSlicing: () => void;
	disabled?: boolean;
	fileName?: string;
}

export function SliceManager({
	pageRanges,
	sliceTasks,
	onStartSlicing,
	disabled,
	fileName,
}: SliceManagerProps) {
	const [selectedTasks, setSelectedTasks] = useState<Set<string>>(new Set());
	const [isCreatingZip, setIsCreatingZip] = useState(false);

	const isProcessing = sliceTasks.some(
		(task) => task.status === 'processing'
	);
	const completedTasks = sliceTasks.filter(
		(task) => task.status === 'completed'
	);
	const hasCompleted = completedTasks.length > 0;
	const completedCount = completedTasks.length;

	// Auto-select all completed tasks by default
	useEffect(() => {
		const completedTaskIds = completedTasks.map((task) => task.id);
		setSelectedTasks(new Set(completedTaskIds));
	}, [completedTasks.length]);

	const getStatusIcon = (status: SliceTask['status']) => {
		switch (status) {
			case 'pending':
				return <Clock className='h-4 w-4 text-amber-500' />;
			case 'processing':
				return (
					<Loader2 className='h-4 w-4 text-blue-600 dark:text-blue-400 animate-spin' />
				);
			case 'completed':
				return (
					<CheckCircle className='h-4 w-4 text-green-600 dark:text-green-400' />
				);
			case 'error':
				return (
					<AlertCircle className='h-4 w-4 text-red-600 dark:text-red-400' />
				);
		}
	};

	const getStatusText = (status: SliceTask['status']) => {
		switch (status) {
			case 'pending':
				return 'Waiting...';
			case 'processing':
				return 'Processing...';
			case 'completed':
				return 'Ready';
			case 'error':
				return 'Failed';
		}
	};

	const getStatusColor = (status: SliceTask['status']) => {
		switch (status) {
			case 'pending':
				return 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800';
			case 'processing':
				return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
			case 'completed':
				return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
			case 'error':
				return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
		}
	};

	const handleDownload = (task: SliceTask) => {
		if (!task.outputUrl) {
			console.error(`No outputUrl for task ${task.fileName}`);
			return;
		}
		console.log(`Downloading individual file: ${task.fileName}`, {
			outputUrl: task.outputUrl,
			blobKey: task.blobKey,
			status: task.status,
		});
		downloadFile(task.outputUrl, task.fileName);
	};

	const handleDownloadAll = async () => {
		const tasksToDownload = completedTasks.filter(
			(task) => selectedTasks.has(task.id) && task.outputUrl
		);

		console.log('Starting download all process:', {
			totalCompleted: completedTasks.length,
			selectedCount: selectedTasks.size,
			tasksToDownload: tasksToDownload.length,
			tasks: tasksToDownload.map((t) => ({
				fileName: t.fileName,
				hasOutputUrl: !!t.outputUrl,
				hasBlobKey: !!t.blobKey,
				status: t.status,
			})),
		});

		if (tasksToDownload.length === 0) return;

		if (tasksToDownload.length === 1) {
			// Single file - download directly
			handleDownload(tasksToDownload[0]);
			return;
		}

		// Multiple files - create ZIP
		setIsCreatingZip(true);
		try {
			const baseFileName =
				fileName?.replace(/\.[^/.]+$/, '') || 'document';
			console.log('Creating ZIP with base filename:', baseFileName);
			await downloadTasksAsZip(tasksToDownload, baseFileName);
		} catch (error) {
			console.error('Failed to download ZIP:', error);
			// Fallback to individual downloads if ZIP fails
			console.log('Falling back to individual downloads');
			tasksToDownload.forEach((task, index) => {
				setTimeout(() => {
					handleDownload(task);
				}, index * 200);
			});
		} finally {
			setIsCreatingZip(false);
		}
	};

	const handleSelectAll = (checked: boolean) => {
		if (checked) {
			setSelectedTasks(new Set(completedTasks.map((task) => task.id)));
		} else {
			setSelectedTasks(new Set());
		}
	};

	const handleSelectTask = (taskId: string, checked: boolean) => {
		const newSelected = new Set(selectedTasks);
		if (checked) {
			newSelected.add(taskId);
		} else {
			newSelected.delete(taskId);
		}
		setSelectedTasks(newSelected);
	};

	const selectedCount = selectedTasks.size;
	const allSelected = completedCount > 0 && selectedCount === completedCount;

	// Calculate ranges that need slicing
	const existingRanges = sliceTasks.map((task) => task.range);
	const unslicedRanges = pageRanges.filter((range) => {
		return !existingRanges.some(
			(existing) =>
				existing.start === range.start && existing.end === range.end
		);
	});
	const hasUnslicedRanges = unslicedRanges.length > 0;

	const getTotalPages = () => {
		return pageRanges.reduce(
			(total, range) => total + (range.end - range.start + 1),
			0
		);
	};

	return (
		<div className='bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden h-fit sticky top-24'>
			<div className='border-b border-gray-200 dark:border-gray-800 px-6 py-4'>
				<h3 className='text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center space-x-2'>
					<Scissors className='h-5 w-5 text-blue-600' />
					<span>Slice Document</span>
				</h3>
			</div>

			<div className='p-6'>
				{/* Summary */}
				<div className='mb-6'>
					{pageRanges.length === 0 ? (
						<div className='text-center py-6'>
							<FileText className='h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-4' />
							<p className='text-gray-600 dark:text-gray-400 font-medium'>
								Select page ranges to begin slicing
							</p>
							<p className='text-sm text-gray-500 dark:text-gray-500 mt-1'>
								Add ranges from the left panel
							</p>
						</div>
					) : (
						<div className='bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800'>
							<div className='flex items-center space-x-3 mb-2'>
								<div className='w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center'>
									<FileText className='h-4 w-4 text-white' />
								</div>
								<div>
									<p className='font-semibold text-gray-900 dark:text-gray-100'>
										Ready to slice {pageRanges.length}{' '}
										{pageRanges.length === 1
											? 'section'
											: 'sections'}
									</p>
									<p className='text-sm text-gray-600 dark:text-gray-400'>
										Total: {getTotalPages()} pages across{' '}
										{pageRanges.length}{' '}
										{pageRanges.length === 1
											? 'file'
											: 'files'}
										{hasUnslicedRanges && (
											<span className='ml-2 text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 px-2 py-1 rounded-full'>
												{unslicedRanges.length} new
											</span>
										)}
									</p>
								</div>
							</div>
						</div>
					)}
				</div>

				{/* Start Button */}
				{sliceTasks.length === 0 && pageRanges.length > 0 && (
					<button
						onClick={onStartSlicing}
						disabled={disabled || isProcessing}
						className={cn(
							'w-full flex items-center justify-center space-x-3 px-6 py-4 font-semibold rounded-xl transition-all duration-200 shadow-lg',
							disabled || isProcessing
								? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed shadow-none'
								: 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white hover:shadow-xl transform hover:-translate-y-0.5'
						)}>
						<Scissors className='h-5 w-5' />
						<span>Start Slicing</span>
					</button>
				)}

				{/* Task List */}
				{sliceTasks.length > 0 && (
					<div className='space-y-4'>
						{/* Progress Summary */}
						{sliceTasks.length > 1 && (
							<div className='bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-4'>
								<div className='flex items-center justify-between mb-2'>
									<span className='text-sm font-medium text-gray-700 dark:text-gray-300'>
										Progress
									</span>
									<span className='text-sm text-gray-600 dark:text-gray-400'>
										{completedCount} of {sliceTasks.length}{' '}
										completed
									</span>
								</div>
								<div className='w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2'>
									<div
										className='bg-gradient-to-r from-blue-600 to-green-600 h-2 rounded-full transition-all duration-300'
										style={{
											width: `${
												(completedCount /
													sliceTasks.length) *
												100
											}%`,
										}}
									/>
								</div>
							</div>
						)}

						{/* Active/Processing Tasks */}
						{sliceTasks
							.filter((task) => task.status !== 'completed')
							.map((task) => (
								<div
									key={task.id}
									className={cn(
										'border rounded-xl p-4 transition-all duration-200',
										getStatusColor(task.status)
									)}>
									<div className='flex items-start justify-between'>
										<div className='flex-1'>
											<p className='text-sm font-semibold text-gray-900 dark:text-gray-100 truncate'>
												{task.fileName}
											</p>
											<p className='text-xs text-gray-600 dark:text-gray-400 mt-1'>
												Pages {task.range.start} -{' '}
												{task.range.end} (
												{task.range.end -
													task.range.start +
													1}{' '}
												pages)
											</p>
										</div>

										<div className='flex items-center space-x-2 ml-4'>
											{getStatusIcon(task.status)}
											<span className='text-xs font-medium text-gray-700 dark:text-gray-300'>
												{getStatusText(task.status)}
											</span>
										</div>
									</div>

									{task.status === 'processing' &&
										task.progress !== undefined && (
											<div className='mt-3'>
												<div className='w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2'>
													<div
														className='bg-blue-600 dark:bg-blue-400 h-2 rounded-full transition-all duration-300'
														style={{
															width: `${task.progress}%`,
														}}
													/>
												</div>
											</div>
										)}

									{task.status === 'error' && task.error && (
										<div className='mt-3 p-3 bg-red-100 dark:bg-red-900/30 rounded-lg'>
											<p className='text-xs text-red-700 dark:text-red-300'>
												{task.error}
											</p>
										</div>
									)}
								</div>
							))}

						{/* Downloads Section */}
						{hasCompleted && (
							<div className='bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4'>
								<div className='flex items-center justify-between mb-4'>
									<h3 className='text-sm font-semibold text-green-800 dark:text-green-200'>
										Ready for Download ({completedCount})
									</h3>
									{/* Debug info */}
									<div className='text-xs text-green-600 dark:text-green-400'>
										Blob Store: {getBlobStoreSize()} items
									</div>
									{completedCount > 1 && (
										<label className='flex items-center space-x-2 cursor-pointer'>
											<input
												type='checkbox'
												checked={allSelected}
												onChange={(e) =>
													handleSelectAll(
														e.target.checked
													)
												}
												className='h-4 w-4 text-green-600 rounded border-gray-300 focus:ring-green-500 focus:ring-2'
											/>
											<span className='text-xs text-green-700 dark:text-green-300'>
												Select All
											</span>
										</label>
									)}
								</div>

								<div className='space-y-3'>
									{completedTasks.map((task) => (
										<div
											key={task.id}
											className='bg-white dark:bg-gray-800 border border-green-200 dark:border-green-700 rounded-lg p-3'>
											<div className='flex items-center space-x-3'>
												{completedCount > 1 && (
													<input
														type='checkbox'
														checked={selectedTasks.has(
															task.id
														)}
														onChange={(e) =>
															handleSelectTask(
																task.id,
																e.target.checked
															)
														}
														className='h-4 w-4 text-green-600 rounded border-gray-300 focus:ring-green-500 focus:ring-2'
													/>
												)}

												<div className='flex-1 min-w-0'>
													<p className='text-sm font-medium text-gray-900 dark:text-gray-100 truncate'>
														{task.fileName}
													</p>
													<p className='text-xs text-gray-600 dark:text-gray-400'>
														Pages {task.range.start}
														-{task.range.end} (
														{task.range.end -
															task.range.start +
															1}{' '}
														pages)
														{/* Debug info */}
														<span className='ml-2 text-xs text-blue-600'>
															{task.blobKey
																? '✓ blob'
																: '✗ no blob'}
															{task.outputUrl
																? ' ✓ url'
																: ' ✗ no url'}
														</span>
													</p>
												</div>

												<button
													onClick={() =>
														handleDownload(task)
													}
													disabled={!task.outputUrl}
													className={cn(
														'flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm hover:shadow-md',
														task.outputUrl
															? 'bg-green-600 hover:bg-green-700 text-white'
															: 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
													)}>
													<Download className='h-4 w-4' />
													<span>Download</span>
												</button>
											</div>
										</div>
									))}
								</div>
							</div>
						)}

						{/* Action Buttons */}
						<div className='pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3'>
							{hasCompleted && selectedCount > 0 && (
								<button
									onClick={handleDownloadAll}
									disabled={
										selectedCount === 0 || isCreatingZip
									}
									className={cn(
										'w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-xl text-sm font-medium transition-colors',
										selectedCount > 0 && !isCreatingZip
											? 'bg-green-600 hover:bg-green-700 text-white'
											: 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
									)}>
									{isCreatingZip ? (
										<Loader2 className='h-4 w-4 animate-spin' />
									) : (
										<Download className='h-4 w-4' />
									)}
									<span>
										{isCreatingZip
											? 'Creating ZIP...'
											: selectedCount === 1
											? 'Download Selected'
											: `Download ${selectedCount} as ZIP`}
									</span>
								</button>
							)}

							{!isProcessing && hasUnslicedRanges && (
								<button
									onClick={onStartSlicing}
									className='w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition-colors shadow-sm hover:shadow-md'>
									<Scissors className='h-4 w-4' />
									<span>
										Slice {unslicedRanges.length} New
										Section
										{unslicedRanges.length === 1 ? '' : 's'}
									</span>
								</button>
							)}

							{!isProcessing &&
								!hasUnslicedRanges &&
								pageRanges.length > 0 && (
									<div className='w-full flex items-center justify-center space-x-2 px-4 py-3 bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 text-green-700 dark:text-green-300 rounded-xl text-sm font-medium'>
										<CheckCircle className='h-4 w-4' />
										<span>All Sections Sliced</span>
									</div>
								)}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
