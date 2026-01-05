'use client';

import { useState, useCallback } from 'react';
import {
	Download,
	FileDown,
	CheckCircle,
	AlertCircle,
	Loader2,
	FileText,
	Trash2,
	Settings,
	Sparkles,
	Lock,
	TrendingDown,
	Monitor,
	BookOpen,
	Printer,
	Star,
} from 'lucide-react';
import { CompressFile, CompressTask, CompressionSettings, CompressionLevel } from '@/types';
import { cn } from '@/lib/utils/cn';
import {
	compressPDF,
	downloadFile,
	formatFileSize,
	getCompressionLevelInfo,
	COMPRESSION_PRESETS,
} from '@/lib/pdf/compressor';
import { useSubscription } from '@/lib/subscription/hooks';
import { getRemainingCompressions, incrementCompressionUsage } from '@/lib/subscription/usage';
import Link from 'next/link';

interface CompressionManagerProps {
	file: CompressFile;
	onReset: () => void;
}

export function CompressionManager({ file, onReset }: CompressionManagerProps) {
	const [compressionLevel, setCompressionLevel] = useState<CompressionLevel>('ebook');
	const [removeMetadata, setRemoveMetadata] = useState(true);
	const [compressTask, setCompressTask] = useState<CompressTask | null>(null);
	const { isPremium, limits, isLoaded } = useSubscription();

	const compressionsRemaining = isLoaded
		? getRemainingCompressions(limits.maxCompressionsPerMonth)
		: 0;
	const hasCompressAccess = isPremium || compressionsRemaining > 0;

	const isProcessing = compressTask?.status === 'processing';
	const isCompleted = compressTask?.status === 'completed';
	const hasError = compressTask?.status === 'error';

	const handleStartCompression = async () => {
		if (!hasCompressAccess) return;

		// Increment usage for free users
		if (!isPremium) {
			incrementCompressionUsage();
		}

		const settings: CompressionSettings = {
			level: compressionLevel,
			imageQuality: COMPRESSION_PRESETS[compressionLevel].imageQuality,
			removeMetadata,
			grayscale: false,
		};

		const outputFileName = file.name.replace('.pdf', '_compressed.pdf');

		const task: CompressTask = {
			id: `compress-${Date.now()}`,
			file,
			settings,
			outputFileName,
			status: 'processing',
			originalSize: file.size,
		};

		setCompressTask(task);

		try {
			const result = await compressPDF(file, settings, (progress) => {
				setCompressTask((prev) =>
					prev ? { ...prev, progress } : null
				);
			});

			if (result.success && result.downloadUrl) {
				setCompressTask({
					...task,
					status: 'completed',
					outputUrl: result.downloadUrl,
					blobKey: result.blobKey,
					compressedSize: result.compressedSize,
					compressionRatio: result.compressionRatio,
					progress: 100,
				});
			} else {
				setCompressTask({
					...task,
					status: 'error',
					error: result.error || 'Unknown error occurred',
				});
			}
		} catch (error) {
			setCompressTask({
				...task,
				status: 'error',
				error: (error as Error).message || 'Failed to compress PDF',
			});
		}
	};

	const handleDownload = () => {
		if (compressTask?.outputUrl && compressTask.outputFileName) {
			downloadFile(compressTask.outputUrl, compressTask.outputFileName);
		}
	};

	const handleReset = () => {
		setCompressTask(null);
		onReset();
	};

	const levelInfo = getCompressionLevelInfo(compressionLevel);

	const compressionLevels: { level: CompressionLevel; icon: typeof Monitor }[] = [
		{ level: 'screen', icon: Monitor },
		{ level: 'ebook', icon: BookOpen },
		{ level: 'printer', icon: Printer },
		{ level: 'prepress', icon: Star },
	];

	return (
		<div className='w-full max-w-4xl mx-auto space-y-8'>
			{/* File Info Card */}
			<div className='bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden'>
				<div className='border-b border-gray-200 dark:border-gray-800 px-6 py-4'>
					<h3 className='text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2'>
						<FileDown className='h-5 w-5 text-green-600' />
						Compress PDF
					</h3>
				</div>

				<div className='p-6 space-y-6'>
					{/* Selected File */}
					<div className='bg-gray-50 dark:bg-gray-800 rounded-lg p-4 flex items-center justify-between'>
						<div className='flex items-center gap-3'>
							<div className='bg-red-100 dark:bg-red-900/30 rounded-lg p-2'>
								<FileText className='h-5 w-5 text-red-600 dark:text-red-400' />
							</div>
							<div>
								<p className='font-medium text-gray-900 dark:text-gray-100 truncate max-w-xs'>
									{file.name}
								</p>
								<p className='text-sm text-gray-600 dark:text-gray-400'>
									{formatFileSize(file.size)} • {file.pageCount} pages
								</p>
							</div>
						</div>
						{!isProcessing && !isCompleted && (
							<button
								onClick={handleReset}
								className='p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors'
							>
								<Trash2 className='h-5 w-5' />
							</button>
						)}
					</div>

					{/* Compression Level Reached Warning */}
					{!isPremium && isLoaded && compressionsRemaining <= 0 && (
						<div className='p-4 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 border-2 border-orange-200 dark:border-orange-800 rounded-xl'>
							<div className='flex items-start gap-3'>
								<div className='bg-orange-500 rounded-full p-2 flex-shrink-0'>
									<Lock className='h-4 w-4 text-white' />
								</div>
								<div>
									<h3 className='font-bold text-orange-900 dark:text-orange-100 mb-1'>
										Compression Limit Reached
									</h3>
									<p className='text-sm text-orange-700 dark:text-orange-300 mb-3'>
										Upgrade to Premium for unlimited compressions!
									</p>
									<Link
										href='/pricing'
										className='inline-flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium rounded-lg transition-colors'
									>
										<Sparkles className='h-4 w-4' />
										Upgrade — $2/month
									</Link>
								</div>
							</div>
						</div>
					)}

					{/* Compression Settings */}
					{!isCompleted && (
						<>
							<div>
								<label className='block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3'>
									<Settings className='h-4 w-4 inline mr-2' />
									Compression Level
								</label>
								<div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
									{compressionLevels.map(({ level, icon: Icon }) => {
										const info = getCompressionLevelInfo(level);
										return (
											<button
												key={level}
												onClick={() => setCompressionLevel(level)}
												disabled={isProcessing}
												className={cn(
													'p-4 rounded-xl border-2 transition-all text-left',
													compressionLevel === level
														? 'border-green-500 bg-green-50 dark:bg-green-900/20'
														: 'border-gray-200 dark:border-gray-700 hover:border-green-300'
												)}
											>
												<Icon
													className={cn(
														'h-5 w-5 mb-2',
														compressionLevel === level
															? 'text-green-600'
															: 'text-gray-500'
													)}
												/>
												<p className='font-medium text-sm text-gray-900 dark:text-gray-100'>
													{info.name.split(' ')[0]}
												</p>
												<p className='text-xs text-gray-500 dark:text-gray-400'>
													~{info.expectedReduction} smaller
												</p>
											</button>
										);
									})}
								</div>
								<p className='mt-3 text-sm text-gray-600 dark:text-gray-400'>
									{levelInfo.description}
								</p>
							</div>

							{/* Options */}
							<div className='flex items-center gap-3'>
								<label className='flex items-center gap-2 cursor-pointer'>
									<input
										type='checkbox'
										checked={removeMetadata}
										onChange={(e) => setRemoveMetadata(e.target.checked)}
										disabled={isProcessing}
										className='w-4 h-4 text-green-600 rounded border-gray-300 focus:ring-green-500'
									/>
									<span className='text-sm text-gray-700 dark:text-gray-300'>
										Remove metadata (author, dates, etc.)
									</span>
								</label>
							</div>

							{/* Compress Button */}
							<button
								onClick={handleStartCompression}
								disabled={isProcessing || !hasCompressAccess}
								className={cn(
									'w-full flex items-center justify-center gap-3 px-6 py-4 font-semibold rounded-xl transition-all duration-200 shadow-lg',
									isProcessing || !hasCompressAccess
										? 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
										: 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white hover:shadow-xl transform hover:-translate-y-0.5'
								)}
							>
								{isProcessing ? (
									<>
										<Loader2 className='h-5 w-5 animate-spin' />
										Compressing... {compressTask?.progress || 0}%
									</>
								) : (
									<>
										<FileDown className='h-5 w-5' />
										Compress PDF
									</>
								)}
							</button>
						</>
					)}

					{/* Progress Bar */}
					{isProcessing && compressTask && (
						<div className='w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden'>
							<div
								className='bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-300'
								style={{ width: `${compressTask.progress || 0}%` }}
							/>
						</div>
					)}

					{/* Result */}
					{isCompleted && compressTask && (
						<div className='space-y-4'>
							{/* Success Card */}
							<div className='bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800 rounded-xl p-6'>
								<div className='flex items-start gap-4'>
									<div className='bg-green-500 rounded-full p-3'>
										<CheckCircle className='h-6 w-6 text-white' />
									</div>
									<div className='flex-1'>
										<h4 className='text-lg font-bold text-green-900 dark:text-green-100 mb-2'>
											Compression Complete!
										</h4>
										<div className='grid grid-cols-3 gap-4 mb-4'>
											<div>
												<p className='text-xs text-green-700 dark:text-green-300 uppercase tracking-wide'>
													Original
												</p>
												<p className='text-lg font-semibold text-green-900 dark:text-green-100'>
													{formatFileSize(compressTask.originalSize)}
												</p>
											</div>
											<div>
												<p className='text-xs text-green-700 dark:text-green-300 uppercase tracking-wide'>
													Compressed
												</p>
												<p className='text-lg font-semibold text-green-900 dark:text-green-100'>
													{formatFileSize(compressTask.compressedSize || 0)}
												</p>
											</div>
											<div>
												<p className='text-xs text-green-700 dark:text-green-300 uppercase tracking-wide'>
													Saved
												</p>
												<p className='text-lg font-semibold text-green-900 dark:text-green-100 flex items-center gap-1'>
													<TrendingDown className='h-4 w-4' />
													{compressTask.compressionRatio}%
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>

							{/* Action Buttons */}
							<div className='flex flex-col sm:flex-row gap-3'>
								<button
									onClick={handleDownload}
									className='flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition-colors shadow-lg hover:shadow-xl'
								>
									<Download className='h-5 w-5' />
									Download Compressed PDF
								</button>
								<button
									onClick={handleReset}
									className='flex-1 flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800'
								>
									<FileDown className='h-5 w-5' />
									Compress Another PDF
								</button>
							</div>
						</div>
					)}

					{/* Error State */}
					{hasError && compressTask && (
						<div className='bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-xl p-6'>
							<div className='flex items-start gap-4'>
								<AlertCircle className='h-6 w-6 text-red-600 dark:text-red-400 flex-shrink-0' />
								<div>
									<h4 className='font-bold text-red-900 dark:text-red-100 mb-1'>
										Compression Failed
									</h4>
									<p className='text-sm text-red-700 dark:text-red-300 mb-3'>
										{compressTask.error}
									</p>
									<button
										onClick={handleReset}
										className='text-sm text-red-600 hover:text-red-700 dark:text-red-400 font-medium'
									>
										Try again →
									</button>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
