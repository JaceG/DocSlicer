'use client';

import { useState, useEffect } from 'react';
import { Shield, AlertTriangle, Info, Activity } from 'lucide-react';
import { SecurityValidator, SECURITY_CONFIG } from '@/lib/security/config';
import { getBlobStoreSize } from '@/lib/pdf/slicer';

interface SecurityStatusProps {
	show?: boolean;
	className?: string;
}

export function SecurityStatus({
	show = false,
	className = '',
}: SecurityStatusProps) {
	const [stats, setStats] = useState<any>(null);
	const [isExpanded, setIsExpanded] = useState(false);

	useEffect(() => {
		if (!show) return;

		const updateStats = () => {
			const sessionStats = SecurityValidator.getSessionStats();
			const pdfBlobSize = getBlobStoreSize();
			const totalBlobSizeMB = pdfBlobSize / (1024 * 1024);

			setStats({
				...sessionStats,
				totalBlobSizeMB: totalBlobSizeMB.toFixed(2),
				maxBlobSizeMB: SECURITY_CONFIG.MAX_BLOB_STORE_SIZE_MB,
				maxFiles: SECURITY_CONFIG.MAX_FILES_PER_SESSION,
				maxRanges: SECURITY_CONFIG.MAX_PAGE_RANGES,
				uploadsRemaining: Math.max(
					0,
					SECURITY_CONFIG.MAX_UPLOADS_PER_MINUTE -
						sessionStats.recentUploads
				),
				slicesRemaining: Math.max(
					0,
					SECURITY_CONFIG.MAX_SLICES_PER_MINUTE -
						sessionStats.recentSlices
				),
			});
		};

		updateStats();
		const interval = setInterval(updateStats, 2000); // Update every 2 seconds

		return () => clearInterval(interval);
	}, [show]);

	if (!show || !stats) return null;

	const getStatusColor = () => {
		if (stats.memoryUsage > SECURITY_CONFIG.MAX_MEMORY_USAGE_MB * 0.8)
			return 'red';
		if (
			stats.totalBlobSizeMB >
			SECURITY_CONFIG.MAX_BLOB_STORE_SIZE_MB * 0.8
		)
			return 'amber';
		if (stats.fileCount > SECURITY_CONFIG.MAX_FILES_PER_SESSION * 0.8)
			return 'amber';
		return 'green';
	};

	const statusColor = getStatusColor();

	return (
		<div className={`fixed bottom-4 right-4 z-50 ${className}`}>
			{/* Toggle Button */}
			<button
				onClick={() => setIsExpanded(!isExpanded)}
				className={`
          flex items-center space-x-2 px-3 py-2 rounded-lg shadow-lg backdrop-blur-sm transition-all duration-200
          ${
				statusColor === 'green'
					? 'bg-green-100/90 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800'
					: statusColor === 'amber'
					? 'bg-amber-100/90 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
					: 'bg-red-100/90 dark:bg-red-900/30 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800'
			}
          hover:scale-105 active:scale-95
        `}>
				<Shield className='h-4 w-4' />
				<span className='text-sm font-medium'>Security</span>
				{statusColor !== 'green' && (
					<AlertTriangle className='h-3 w-3' />
				)}
			</button>

			{/* Expanded Panel */}
			{isExpanded && (
				<div className='absolute bottom-12 right-0 w-80 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-4 backdrop-blur-sm'>
					<div className='flex items-center justify-between mb-3'>
						<h3 className='text-sm font-semibold text-gray-900 dark:text-gray-100 flex items-center space-x-2'>
							<Activity className='h-4 w-4' />
							<span>Security Status</span>
						</h3>
						<button
							onClick={() => setIsExpanded(false)}
							className='text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'>
							×
						</button>
					</div>

					<div className='space-y-3 text-xs'>
						{/* File Limits */}
						<div className='space-y-1'>
							<div className='flex justify-between'>
								<span className='text-gray-600 dark:text-gray-400'>
									Files in session:
								</span>
								<span
									className={`font-medium ${
										stats.fileCount >= stats.maxFiles
											? 'text-red-600 dark:text-red-400'
											: 'text-gray-900 dark:text-gray-100'
									}`}>
									{stats.fileCount}/{stats.maxFiles}
								</span>
							</div>
							<div className='w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5'>
								<div
									className={`h-1.5 rounded-full transition-all duration-300 ${
										stats.fileCount >= stats.maxFiles
											? 'bg-red-500'
											: stats.fileCount >=
											  stats.maxFiles * 0.8
											? 'bg-amber-500'
											: 'bg-green-500'
									}`}
									style={{
										width: `${Math.min(
											100,
											(stats.fileCount / stats.maxFiles) *
												100
										)}%`,
									}}
								/>
							</div>
						</div>

						{/* Memory Usage */}
						<div className='space-y-1'>
							<div className='flex justify-between'>
								<span className='text-gray-600 dark:text-gray-400'>
									Memory usage:
								</span>
								<span
									className={`font-medium ${
										stats.memoryUsage >=
										SECURITY_CONFIG.MAX_MEMORY_USAGE_MB
											? 'text-red-600 dark:text-red-400'
											: 'text-gray-900 dark:text-gray-100'
									}`}>
									{stats.memoryUsage}MB/
									{SECURITY_CONFIG.MAX_MEMORY_USAGE_MB}MB
								</span>
							</div>
							<div className='w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5'>
								<div
									className={`h-1.5 rounded-full transition-all duration-300 ${
										stats.memoryUsage >=
										SECURITY_CONFIG.MAX_MEMORY_USAGE_MB
											? 'bg-red-500'
											: stats.memoryUsage >=
											  SECURITY_CONFIG.MAX_MEMORY_USAGE_MB *
													0.8
											? 'bg-amber-500'
											: 'bg-green-500'
									}`}
									style={{
										width: `${Math.min(
											100,
											(stats.memoryUsage /
												SECURITY_CONFIG.MAX_MEMORY_USAGE_MB) *
												100
										)}%`,
									}}
								/>
							</div>
						</div>

						{/* Blob Storage */}
						<div className='space-y-1'>
							<div className='flex justify-between'>
								<span className='text-gray-600 dark:text-gray-400'>
									Storage used:
								</span>
								<span
									className={`font-medium ${
										stats.totalBlobSizeMB >=
										stats.maxBlobSizeMB
											? 'text-red-600 dark:text-red-400'
											: 'text-gray-900 dark:text-gray-100'
									}`}>
									{stats.totalBlobSizeMB}MB/
									{stats.maxBlobSizeMB}MB
								</span>
							</div>
							<div className='w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5'>
								<div
									className={`h-1.5 rounded-full transition-all duration-300 ${
										stats.totalBlobSizeMB >=
										stats.maxBlobSizeMB
											? 'bg-red-500'
											: stats.totalBlobSizeMB >=
											  stats.maxBlobSizeMB * 0.8
											? 'bg-amber-500'
											: 'bg-green-500'
									}`}
									style={{
										width: `${Math.min(
											100,
											(stats.totalBlobSizeMB /
												stats.maxBlobSizeMB) *
												100
										)}%`,
									}}
								/>
							</div>
						</div>

						{/* Rate Limits */}
						<div className='grid grid-cols-2 gap-2 pt-2 border-t border-gray-200 dark:border-gray-700'>
							<div className='text-center p-2 bg-gray-50 dark:bg-gray-800 rounded'>
								<div className='text-gray-600 dark:text-gray-400'>
									Uploads Left
								</div>
								<div
									className={`font-bold ${
										stats.uploadsRemaining === 0
											? 'text-red-600 dark:text-red-400'
											: 'text-gray-900 dark:text-gray-100'
									}`}>
									{stats.uploadsRemaining}
								</div>
							</div>
							<div className='text-center p-2 bg-gray-50 dark:bg-gray-800 rounded'>
								<div className='text-gray-600 dark:text-gray-400'>
									Slices Left
								</div>
								<div
									className={`font-bold ${
										stats.slicesRemaining === 0
											? 'text-red-600 dark:text-red-400'
											: 'text-gray-900 dark:text-gray-100'
									}`}>
									{stats.slicesRemaining}
								</div>
							</div>
						</div>

						{/* Active Operations */}
						<div className='pt-2 border-t border-gray-200 dark:border-gray-700'>
							<div className='flex justify-between'>
								<span className='text-gray-600 dark:text-gray-400'>
									Active operations:
								</span>
								<span className='font-medium text-gray-900 dark:text-gray-100'>
									{stats.activeSources}
								</span>
							</div>
						</div>

						{/* Security Tips */}
						<div className='pt-2 border-t border-gray-200 dark:border-gray-700 space-y-1'>
							<div className='flex items-start space-x-2'>
								<Info className='h-3 w-3 text-blue-500 mt-0.5 flex-shrink-0' />
								<span className='text-gray-600 dark:text-gray-400'>
									All processing happens in your browser - no
									data is sent to servers
								</span>
							</div>
							{stats.totalBlobSizeMB >
								stats.maxBlobSizeMB * 0.7 && (
								<div className='flex items-start space-x-2'>
									<AlertTriangle className='h-3 w-3 text-amber-500 mt-0.5 flex-shrink-0' />
									<span className='text-amber-600 dark:text-amber-400'>
										Consider downloading and clearing
										completed slices to free memory
									</span>
								</div>
							)}
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
