'use client';

import { useState, useCallback, useEffect, useRef, lazy, Suspense } from 'react';
import { FileUpload } from '@/components/upload/FileUpload';
// DocumentViewer is lazily imported because it uses pdfjs-dist which has ESM issues in dev mode
const DocumentViewer = lazy(() => import('@/components/viewer/DocumentViewer').then(mod => ({ default: mod.DocumentViewer })));
import { PageSelector } from '@/components/slicer/PageSelector';
import { SliceManager } from '@/components/slicer/SliceManager';
import { MergeManager } from '@/components/merger/MergeManager';
import { FileUploadMultiple } from '@/components/merger/FileUploadMultiple';
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';
import { SecurityStatus } from '@/components/ui/SecurityStatus';
import { UsageBanner } from '@/components/subscription/UsageBanner';
import { UpgradePrompt } from '@/components/subscription/UpgradePrompt';
import { UploadedFile, PageRange, SliceTask, MergeFile, AppMode, CompressFile } from '@/types';
import {
	processSliceTasks,
	cleanupBlobUrl,
	cleanupBlobStoreEntry,
	getBlobStoreSize,
} from '@/lib/pdf/slicer';
import { cleanupMergeBlobUrl, cleanupMergeBlobStoreEntry } from '@/lib/pdf/merger';
import { SecurityValidator, SECURITY_CONFIG } from '@/lib/security/config';
import { validateSliceRate } from '@/lib/utils/file';
import { useSubscription } from '@/lib/subscription/hooks';
import { getPdfsProcessedThisMonth, incrementPdfUsage, getRemainingPdfs } from '@/lib/subscription/usage';
import { useRouter } from 'next/navigation';
import { Scissors, Layers, FileDown } from 'lucide-react';
import { FileUploadCompress } from '@/components/compressor/FileUploadCompress';
import { CompressionManager } from '@/components/compressor/CompressionManager';
import { cleanupCompressBlobUrl, cleanupCompressBlobStoreEntry } from '@/lib/pdf/compressor';

export default function Home() {
	// App mode state
	const [appMode, setAppMode] = useState<AppMode>('split');
	
	// Split mode state
	const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
	const [pageRanges, setPageRanges] = useState<PageRange[]>([]);
	const [sliceTasks, setSliceTasks] = useState<SliceTask[]>([]);
	const sliceTasksRef = useRef<SliceTask[]>([]);
	
	// Merge mode state
	const [mergeFiles, setMergeFiles] = useState<MergeFile[]>([]);
	const [showMergeUpload, setShowMergeUpload] = useState(true);
	
	// Compress mode state
	const [compressFile, setCompressFile] = useState<CompressFile | null>(null);
	
	// Shared state
	const [showUpgradePrompt, setShowUpgradePrompt] = useState(false);
	const { isPremium, limits, isLoaded } = useSubscription();
	const router = useRouter();

	const handleFileUpload = useCallback((file: UploadedFile) => {
		// Check if user has reached their monthly limit
		if (!isPremium) {
			const remaining = getRemainingPdfs(limits.maxPdfsPerMonth);
			if (remaining <= 0) {
				alert(`You've reached your monthly limit of ${limits.maxPdfsPerMonth} PDFs. Please upgrade to Premium for unlimited access.`);
				router.push('/pricing');
				return;
			}
			// Increment usage counter
			incrementPdfUsage();
		}

		// Check file size limit
		const fileSizeMB = file.size / (1024 * 1024);
		if (fileSizeMB > limits.maxFileSizeMB) {
			alert(`File size exceeds ${limits.maxFileSizeMB}MB limit. ${isPremium ? 'Please upload a smaller file.' : 'Upgrade to Premium for 100MB limit.'}`);
			if (!isPremium) {
				setShowUpgradePrompt(true);
			}
			return;
		}

		setUploadedFile(file);
		setPageRanges([]);
		setSliceTasks([]);
		sliceTasksRef.current = []; // Reset ref
		setShowUpgradePrompt(false);
	}, [isPremium, limits, router]);

	const handlePageCountLoaded = useCallback((pageCount: number) => {
		setUploadedFile((current) => {
			if (current) {
				return {
					...current,
					pageCount: pageCount,
				};
			}
			return current;
		});
	}, []);

	const handleAddPageRange = useCallback(
		(range: PageRange) => {
			// Check subscription-based limits
			const maxRanges = limits.maxPageRanges;
			if (maxRanges !== -1 && pageRanges.length >= maxRanges) {
				alert(`You've reached the maximum of ${maxRanges} page ranges. ${isPremium ? '' : 'Upgrade to Premium for unlimited ranges!'}`);
				if (!isPremium) {
					setShowUpgradePrompt(true);
				}
				return;
			}

			// Validate range count limits (security check)
			const rangeCheck = SecurityValidator.validateRangeCount(
				pageRanges.length
			);
			if (!rangeCheck.valid) {
				alert(rangeCheck.error || 'Too many ranges');
				return;
			}

			setPageRanges((prev) => [...prev, range]);
		},
		[pageRanges.length, limits, isPremium]
	);

	const handleRemovePageRange = useCallback((index: number) => {
		setPageRanges((prev) => prev.filter((_, i) => i !== index));
	}, []);

	const handleTaskUpdate = useCallback(
		(taskId: string, updates: Partial<SliceTask>) => {
			setSliceTasks((prev) => {
				const newTasks = prev.map((task) =>
					task.id === taskId ? { ...task, ...updates } : task
				);
				sliceTasksRef.current = newTasks; // Keep ref in sync
				return newTasks;
			});
		},
		[]
	);

	const handleStartSlicing = useCallback(async () => {
		if (!uploadedFile || !uploadedFile.file) return;

		// Check slice rate limiting
		const rateCheck = validateSliceRate();
		if (!rateCheck.allowed) {
			alert(rateCheck.error || 'Rate limit exceeded');
			return;
		}

		// Find ranges that haven't been sliced yet
		const existingRanges = sliceTasks.map((task) => task.range);
		const newRanges = pageRanges.filter((range) => {
			return !existingRanges.some(
				(existing) =>
					existing.start === range.start && existing.end === range.end
			);
		});

		if (newRanges.length === 0) {
			// All ranges have already been sliced
			return;
		}

		// Check memory usage before processing
		const estimatedMemoryMB =
			(uploadedFile.size / (1024 * 1024)) * newRanges.length * 2; // Estimate 2x file size per range
		const memoryCheck =
			SecurityValidator.checkMemoryUsage(estimatedMemoryMB);
		if (!memoryCheck.safe) {
			alert(memoryCheck.error || 'Memory limit exceeded');
			return;
		}

		// Record slice attempt for rate limiting
		SecurityValidator.recordSlice();

		// Create tasks only for new ranges
		const newTasks: SliceTask[] = newRanges.map((range, index) => {
			const baseName = uploadedFile.name.replace(/\.[^/.]+$/, '');

			return {
				id: `task-${Date.now()}-${index}`,
				fileId: uploadedFile.id,
				fileName: `${baseName}_pages_${range.start}-${range.end}.pdf`,
				range,
				status: 'pending' as const,
			};
		});

		// Add new tasks to existing ones
		setSliceTasks((prev) => {
			const newTaskList = [...prev, ...newTasks];
			sliceTasksRef.current = newTaskList; // Keep ref in sync
			return newTaskList;
		});

		// Start processing only the new tasks
		try {
			await processSliceTasks(
				uploadedFile.file,
				newTasks,
				handleTaskUpdate
			);
		} finally {
			// Mark slice operation as complete for rate limiting
			SecurityValidator.completeSlice();
		}
	}, [uploadedFile, pageRanges, sliceTasks, handleTaskUpdate]);

	const handleNewDocument = useCallback(() => {
		// Cleanup any existing blob URLs and blob store entries to prevent memory leaks
		sliceTasksRef.current.forEach((task) => {
			if (task.outputUrl) {
				cleanupBlobUrl(task.outputUrl);
			}
			if (task.blobKey) {
				cleanupBlobStoreEntry(task.blobKey);
			}
		});

		// Reset security session tracking
		SecurityValidator.resetSession();

		setUploadedFile(null);
		setPageRanges([]);
		setSliceTasks([]);
		sliceTasksRef.current = []; // Reset ref
		
		// Reset merge state too
		setMergeFiles([]);
		setShowMergeUpload(true);
	}, [uploadedFile?.type]);

	// Merge mode handlers
	const handleMergeFilesUpload = useCallback((files: MergeFile[]) => {
		setMergeFiles(files);
		if (files.length >= 2) {
			setShowMergeUpload(false);
		}
	}, []);

	const handleAddMoreMergeFiles = useCallback(() => {
		setShowMergeUpload(true);
	}, []);

	const handleMergeReset = useCallback(() => {
		setMergeFiles([]);
		setShowMergeUpload(true);
	}, []);

	// Compress mode handlers
	const handleCompressFileUpload = useCallback((file: CompressFile) => {
		setCompressFile(file);
	}, []);

	const handleCompressReset = useCallback(() => {
		setCompressFile(null);
	}, []);

	// Mode switch handler
	const handleModeSwitch = useCallback((mode: AppMode) => {
		if (mode === appMode) return;
		
		// Reset all states when switching modes
		setUploadedFile(null);
		setPageRanges([]);
		setSliceTasks([]);
		sliceTasksRef.current = [];
		setMergeFiles([]);
		setShowMergeUpload(true);
		setCompressFile(null);
		
		setAppMode(mode);
		setShowUpgradePrompt(false);
	}, [appMode]);

	// Cleanup blob URLs and blob store when component unmounts only
	useEffect(() => {
		return () => {
			sliceTasksRef.current.forEach((task) => {
				if (task.outputUrl) {
					cleanupBlobUrl(task.outputUrl);
				}
				if (task.blobKey) {
					cleanupBlobStoreEntry(task.blobKey);
				}
			});
		};
	}, []); // Empty dependency array - only run on mount/unmount

	return (
		<div className='min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-indigo-50/30 dark:from-gray-900 dark:via-blue-950/20 dark:to-indigo-950/30'>
			<Header
				onNewDocument={uploadedFile ? handleNewDocument : undefined}
			/>

			<div className='container mx-auto px-4 py-8'>
				{/* Mode Toggle */}
				<div className='max-w-4xl mx-auto mb-8'>
					<div className='flex justify-center'>
						<div className='inline-flex bg-gray-100 dark:bg-gray-800 rounded-xl p-1.5 shadow-inner'>
							<button
								onClick={() => handleModeSwitch('split')}
								className={`
									flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200
									${appMode === 'split'
										? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-md'
										: 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
									}
								`}>
								<Scissors className='h-4 w-4' />
								<span>Split PDF</span>
							</button>
							<button
								onClick={() => handleModeSwitch('merge')}
								className={`
									flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200
									${appMode === 'merge'
										? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-md'
										: 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
									}
								`}>
								<Layers className='h-4 w-4' />
								<span>Merge PDFs</span>
							</button>
							<button
								onClick={() => handleModeSwitch('compress')}
								className={`
									flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200
									${appMode === 'compress'
										? 'bg-white dark:bg-gray-700 text-green-600 dark:text-green-400 shadow-md'
										: 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
									}
								`}>
								<FileDown className='h-4 w-4' />
								<span>Compress PDF</span>
							</button>
						</div>
					</div>
				</div>

				{/* Split Mode */}
				{appMode === 'split' && !uploadedFile && (
					<div className='max-w-4xl mx-auto space-y-8'>
						{/* Usage Banner for Free Users */}
						{isLoaded && !isPremium && <UsageBanner />}

						{/* Privacy Trust Badge */}
						<div className='bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-2 border-green-200 dark:border-green-800 rounded-xl p-6 shadow-lg'>
							<div className='flex items-start gap-4'>
								<div className='bg-green-500 rounded-full p-3 flex-shrink-0'>
									<svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
										<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' />
									</svg>
								</div>
								<div className='flex-1'>
									<h3 className='text-lg font-bold text-gray-900 dark:text-white mb-2'>
										🔒 Your Files Never Leave Your Device
									</h3>
									<p className='text-gray-700 dark:text-gray-300 mb-2'>
										Everything happens in your browser. We never upload, store, or access your PDFs.
									</p>
									<p className='text-sm text-gray-600 dark:text-gray-400 italic'>
										This isn't just a promise—it's how our technology works. Complete privacy guaranteed.
									</p>
								</div>
							</div>
						</div>

						<FileUpload onFileUpload={handleFileUpload} />

						{/* Upgrade Prompt */}
						{showUpgradePrompt && (
							<UpgradePrompt message="Get unlimited PDFs, larger file sizes, and more with Premium for just $2/month!" />
						)}
					</div>
				)}

				{/* Merge Mode */}
				{appMode === 'merge' && (
					<div className='max-w-4xl mx-auto space-y-8'>
						{/* Usage Banner for Free Users */}
						{isLoaded && !isPremium && <UsageBanner />}

						{/* Privacy Trust Badge */}
						<div className='bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-2 border-green-200 dark:border-green-800 rounded-xl p-6 shadow-lg'>
							<div className='flex items-start gap-4'>
								<div className='bg-green-500 rounded-full p-3 flex-shrink-0'>
									<svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
										<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' />
									</svg>
								</div>
								<div className='flex-1'>
									<h3 className='text-lg font-bold text-gray-900 dark:text-white mb-2'>
										🔒 Your Files Never Leave Your Device
									</h3>
									<p className='text-gray-700 dark:text-gray-300 mb-2'>
										Everything happens in your browser. We never upload, store, or access your PDFs.
									</p>
									<p className='text-sm text-gray-600 dark:text-gray-400 italic'>
										This isn't just a promise—it's how our technology works. Complete privacy guaranteed.
									</p>
								</div>
							</div>
						</div>

						{/* File Upload for Merge */}
						{showMergeUpload && (
							<FileUploadMultiple
								onFilesUpload={handleMergeFilesUpload}
								existingFiles={mergeFiles}
							/>
						)}

						{/* Merge Manager */}
						{mergeFiles.length > 0 && (
							<MergeManager
								files={mergeFiles}
								onUpdateFiles={setMergeFiles}
								onAddMoreFiles={handleAddMoreMergeFiles}
								onReset={handleMergeReset}
							/>
						)}

						{/* Upgrade Prompt */}
						{showUpgradePrompt && (
							<UpgradePrompt message="Get unlimited PDFs, larger file sizes, and more with Premium for just $2/month!" />
						)}
					</div>
				)}

				{/* Compress Mode */}
				{appMode === 'compress' && (
					<div className='max-w-4xl mx-auto space-y-8'>
						{/* Usage Banner for Free Users */}
						{isLoaded && !isPremium && <UsageBanner />}

						{/* File Upload or Compression Manager */}
						{!compressFile ? (
							<FileUploadCompress onFileUpload={handleCompressFileUpload} />
						) : (
							<CompressionManager
								file={compressFile}
								onReset={handleCompressReset}
							/>
						)}

						{/* Upgrade Prompt */}
						{showUpgradePrompt && (
							<UpgradePrompt message="Get unlimited compressions and larger files with Premium for just $2/month!" />
						)}
					</div>
				)}

				{/* Split Mode - PDF Interface */}
				{appMode === 'split' && uploadedFile && (
					<div className='space-y-8'>
						{/* Usage Banner for Free Users */}
						{isLoaded && !isPremium && <UsageBanner />}

					{/* Document Viewer */}
					<div className='w-full'>
						<Suspense fallback={
							<div className="flex items-center justify-center min-h-[400px] bg-gray-50 dark:bg-gray-800/50 rounded-lg">
								<div className="text-center">
									<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
									<p className="text-sm text-gray-600 dark:text-gray-400">Loading document viewer...</p>
								</div>
							</div>
						}>
							<DocumentViewer
								file={uploadedFile}
								onPageCountLoaded={handlePageCountLoaded}
							/>
						</Suspense>
					</div>

						{/* Tools Section */}
						<div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
							<div className='lg:col-span-2'>
								<PageSelector
									file={uploadedFile}
									pageRanges={pageRanges}
									onAddRange={handleAddPageRange}
									onRemoveRange={handleRemovePageRange}
								/>

								{/* Upgrade Prompt */}
								{showUpgradePrompt && !isPremium && (
									<div className='mt-6'>
										<UpgradePrompt message="Unlock unlimited page ranges and larger files with Premium!" />
									</div>
								)}
							</div>

							<div className='lg:col-span-1 space-y-6'>
								<SliceManager
									pageRanges={pageRanges}
									sliceTasks={sliceTasks}
									onStartSlicing={handleStartSlicing}
									disabled={pageRanges.length === 0}
									fileName={uploadedFile.name}
									fileType={uploadedFile.type}
								/>
							</div>
						</div>
					</div>
				)}
			</div>

			{/* Security Status Monitor (only show when file is uploaded) */}
			<SecurityStatus show={!!uploadedFile || mergeFiles.length > 0 || !!compressFile} />

			{/* Footer */}
			<Footer />
		</div>
	);
}
