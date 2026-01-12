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
		// Red if any hard limits are hit
		if (stats.fileCount >= SECURITY_CONFIG.MAX_FILES_PER_SESSION)
			return 'red';
		if (stats.uploadsRemaining === 0 || stats.slicesRemaining === 0)
			return 'red';

		// Amber if approaching limits
		if (stats.fileCount > SECURITY_CONFIG.MAX_FILES_PER_SESSION * 0.8)
			return 'amber';
		if (stats.uploadsRemaining <= 1 || stats.slicesRemaining <= 2)
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
						{/* Client-Side Processing Info */}
						<div className='bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3'>
							<div className='flex items-start space-x-2'>
								<Info className='h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0' />
								<div className='text-blue-800 dark:text-blue-200'>
									<p className='font-medium mb-1'>
										100% Private
									</p>
									<p className='text-xs text-blue-700 dark:text-blue-300'>
										All PDF processing happens in your
										browser. No files are uploaded to
										servers.
									</p>
								</div>
							</div>
						</div>

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
							<p className='text-[10px] text-gray-500 dark:text-gray-500 mt-1'>
								Maximum files you can work with at once
							</p>
						</div>

						{/* Rate Limits */}
						<div className='pt-2 border-t border-gray-200 dark:border-gray-700'>
							<p className='text-gray-600 dark:text-gray-400 mb-2 font-medium'>
								Rate Limits (per minute)
							</p>
							<div className='space-y-2'>
								<div className='flex justify-between items-center'>
									<span className='text-gray-600 dark:text-gray-400'>
										Upload requests:
									</span>
									<span
										className={`font-medium ${
											stats.uploadsRemaining === 0
												? 'text-red-600 dark:text-red-400'
												: 'text-gray-900 dark:text-gray-100'
										}`}>
										{stats.uploadsRemaining} left
									</span>
								</div>
								<div className='flex justify-between items-center'>
									<span className='text-gray-600 dark:text-gray-400'>
										Processing operations:
									</span>
									<span
										className={`font-medium ${
											stats.slicesRemaining === 0
												? 'text-red-600 dark:text-red-400'
												: 'text-gray-900 dark:text-gray-100'
										}`}>
										{stats.slicesRemaining} left
									</span>
								</div>
							</div>
							<p className='text-[10px] text-gray-500 dark:text-gray-500 mt-2'>
								Limits reset every 60 seconds
							</p>
						</div>

						{/* Warnings */}
						{(stats.fileCount >= stats.maxFiles ||
							stats.uploadsRemaining === 0 ||
							stats.slicesRemaining === 0) && (
							<div className='pt-2 border-t border-gray-200 dark:border-gray-700'>
								<div className='flex items-start space-x-2'>
									<AlertTriangle className='h-3 w-3 text-amber-500 mt-0.5 flex-shrink-0' />
									<span className='text-amber-600 dark:text-amber-400'>
										{stats.fileCount >= stats.maxFiles
											? 'Maximum file limit reached. Refresh to start over.'
											: 'Rate limit reached. Please wait a moment.'}
									</span>
								</div>
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
}
