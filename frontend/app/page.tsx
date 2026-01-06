'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { FileUpload } from '@/components/upload/FileUpload';
import { DocumentViewer } from '@/components/viewer/DocumentViewer';
import { PageSelector } from '@/components/slicer/PageSelector';
import { SliceManager } from '@/components/slicer/SliceManager';
import { MergeManager } from '@/components/merger/MergeManager';
import { FileUploadMultiple } from '@/components/merger/FileUploadMultiple';
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';
import { SecurityStatus } from '@/components/ui/SecurityStatus';
import { UsageBanner } from '@/components/subscription/UsageBanner';
import { UpgradePrompt } from '@/components/subscription/UpgradePrompt';
import { FileUploadOrganize } from '@/components/organizer/FileUploadOrganize';
import { PageOrganizer } from '@/components/organizer/PageOrganizer';
import { ImageUpload } from '@/components/imagesToPdf/ImageUpload';
import { ImagesToPdfManager } from '@/components/imagesToPdf/ImagesToPdfManager';
import { PdfToImagesManager } from '@/components/pdfToImages/PdfToImagesManager';
import { PageNumbersManager } from '@/components/pageNumbers/PageNumbersManager';
import { ProtectManager } from '@/components/protect/ProtectManager';
import { UnlockManager } from '@/components/unlock/UnlockManager';
import { WatermarkManager } from '@/components/watermark/WatermarkManager';
import { BookmarkSplitManager } from '@/components/bookmarkSplit/BookmarkSplitManager';
import { BlankPagesManager } from '@/components/blankPages/BlankPagesManager';
import { RepairManager } from '@/components/repair/RepairManager';
import { 
	UploadedFile, 
	PageRange, 
	SliceTask, 
	MergeFile, 
	AppMode, 
	CompressFile,
	OrganizeFile,
	ImageFile,
} from '@/types';
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
import { 
	Scissors, 
	Layers, 
	FileDown, 
	RotateCw, 
	Image as ImageIcon, 
	FileImage, 
	Hash,
	Lock,
	Unlock,
	Droplet,
	BookOpen,
	FileX,
	Wrench,
} from 'lucide-react';
import { FileUploadCompress } from '@/components/compressor/FileUploadCompress';
import { CompressionManager } from '@/components/compressor/CompressionManager';
import { cleanupCompressBlobUrl, cleanupCompressBlobStoreEntry } from '@/lib/pdf/compressor';
import { cn } from '@/lib/utils/cn';

// All tools - displayed prominently with explicit Tailwind classes
const ALL_TOOLS = [
	{ id: 'split' as AppMode, label: 'Split', icon: Scissors, activeClasses: 'bg-blue-500 hover:bg-blue-600 ring-blue-400' },
	{ id: 'merge' as AppMode, label: 'Merge', icon: Layers, activeClasses: 'bg-indigo-500 hover:bg-indigo-600 ring-indigo-400' },
	{ id: 'compress' as AppMode, label: 'Compress', icon: FileDown, activeClasses: 'bg-emerald-500 hover:bg-emerald-600 ring-emerald-400' },
	{ id: 'organize' as AppMode, label: 'Organize', icon: RotateCw, activeClasses: 'bg-purple-500 hover:bg-purple-600 ring-purple-400' },
	{ id: 'images-to-pdf' as AppMode, label: 'IMG→PDF', icon: ImageIcon, activeClasses: 'bg-orange-500 hover:bg-orange-600 ring-orange-400' },
	{ id: 'pdf-to-images' as AppMode, label: 'PDF→IMG', icon: FileImage, activeClasses: 'bg-cyan-500 hover:bg-cyan-600 ring-cyan-400' },
	{ id: 'page-numbers' as AppMode, label: 'Numbers', icon: Hash, activeClasses: 'bg-rose-500 hover:bg-rose-600 ring-rose-400' },
	{ id: 'protect' as AppMode, label: 'Protect', icon: Lock, activeClasses: 'bg-amber-500 hover:bg-amber-600 ring-amber-400' },
	{ id: 'unlock' as AppMode, label: 'Unlock', icon: Unlock, activeClasses: 'bg-sky-500 hover:bg-sky-600 ring-sky-400' },
	{ id: 'watermark' as AppMode, label: 'Watermark', icon: Droplet, activeClasses: 'bg-violet-500 hover:bg-violet-600 ring-violet-400' },
	{ id: 'split-bookmarks' as AppMode, label: 'Chapters', icon: BookOpen, activeClasses: 'bg-teal-500 hover:bg-teal-600 ring-teal-400' },
	{ id: 'remove-blanks' as AppMode, label: 'Blanks', icon: FileX, activeClasses: 'bg-red-500 hover:bg-red-600 ring-red-400' },
	{ id: 'repair' as AppMode, label: 'Repair', icon: Wrench, activeClasses: 'bg-stone-500 hover:bg-stone-600 ring-stone-400' },
];

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
	
	// Organize mode state
	const [organizeFile, setOrganizeFile] = useState<OrganizeFile | null>(null);
	
	// Images to PDF mode state
	const [imagesToPdfFiles, setImagesToPdfFiles] = useState<ImageFile[]>([]);
	const [showImageUpload, setShowImageUpload] = useState(true);
	
	// PDF to Images / Page Numbers mode state (uses uploadedFile)
	
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

		// Reset all states
		setUploadedFile(null);
		setPageRanges([]);
		setSliceTasks([]);
		sliceTasksRef.current = [];
		setMergeFiles([]);
		setShowMergeUpload(true);
		setCompressFile(null);
		setOrganizeFile(null);
		setImagesToPdfFiles([]);
		setShowImageUpload(true);
	}, []);

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

	// Organize mode handlers
	const handleOrganizeFileUpload = useCallback((file: OrganizeFile) => {
		setOrganizeFile(file);
	}, []);

	const handleOrganizeReset = useCallback(() => {
		setOrganizeFile(null);
	}, []);

	// Images to PDF handlers
	const handleImagesToPdfUpload = useCallback((files: ImageFile[]) => {
		setImagesToPdfFiles(files);
		if (files.length > 0) {
			setShowImageUpload(false);
		}
	}, []);

	const handleAddMoreImages = useCallback(() => {
		setShowImageUpload(true);
	}, []);

	const handleImagesToPdfReset = useCallback(() => {
		setImagesToPdfFiles([]);
		setShowImageUpload(true);
	}, []);

	// PDF to Images / Page Numbers handlers (reuse uploadedFile)
	const handlePdfToolReset = useCallback(() => {
		setUploadedFile(null);
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
		setOrganizeFile(null);
		setImagesToPdfFiles([]);
		setShowImageUpload(true);
		
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

	// Get current tool info
	const getCurrentToolInfo = () => {
		return ALL_TOOLS.find(t => t.id === appMode);
	};

	const currentTool = getCurrentToolInfo();

	return (
		<div className='min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-indigo-50/30 dark:from-gray-900 dark:via-blue-950/20 dark:to-indigo-950/30'>
			<Header
				onNewDocument={uploadedFile || mergeFiles.length > 0 || compressFile || organizeFile || imagesToPdfFiles.length > 0 ? handleNewDocument : undefined}
			/>

			<div className='container mx-auto px-4 py-8'>
				{/* Tool Selection Grid - All tools visible */}
				<div className='max-w-4xl mx-auto mb-8'>
					<div className='flex flex-wrap justify-center gap-2 sm:gap-3'>
						{ALL_TOOLS.map((tool) => (
							<button
								key={tool.id}
								onClick={() => handleModeSwitch(tool.id)}
								className={cn(
									'group flex flex-col items-center justify-center px-4 py-3 sm:px-5 sm:py-4 rounded-xl transition-all duration-200 min-w-[80px] sm:min-w-[90px]',
									appMode === tool.id
										? `${tool.activeClasses} text-white shadow-lg scale-105 ring-2 ring-offset-2`
										: 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-md hover:shadow-lg hover:scale-105 border border-gray-200 dark:border-gray-700'
								)}
							>
								<tool.icon className='h-5 w-5 sm:h-6 sm:w-6 mb-1.5 transition-transform group-hover:scale-110' />
								<span className='text-xs sm:text-sm font-medium text-center leading-tight whitespace-nowrap'>
									{tool.label}
								</span>
							</button>
						))}
					</div>
					
					{/* Current tool description */}
					<div className='mt-4 text-center'>
						<p className='text-sm text-gray-600 dark:text-gray-400'>
							{appMode === 'split' && 'Extract specific pages from your PDF'}
							{appMode === 'merge' && 'Combine multiple PDFs into one document'}
							{appMode === 'compress' && 'Reduce PDF file size while maintaining quality'}
							{appMode === 'organize' && 'Rotate, delete, and reorder pages'}
							{appMode === 'images-to-pdf' && 'Convert JPG, PNG images to PDF'}
							{appMode === 'pdf-to-images' && 'Export PDF pages as images'}
							{appMode === 'page-numbers' && 'Add page numbers to your PDF'}
							{appMode === 'protect' && 'Add password protection to your PDF'}
							{appMode === 'unlock' && 'Remove password from protected PDF'}
							{appMode === 'watermark' && 'Add text or image watermark to PDF'}
							{appMode === 'split-bookmarks' && 'Split PDF by chapters/bookmarks'}
							{appMode === 'remove-blanks' && 'Detect and remove blank pages'}
							{appMode === 'repair' && 'Fix corrupted or damaged PDFs'}
						</p>
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
						{isLoaded && !isPremium && <UsageBanner />}

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
								</div>
							</div>
						</div>

						{showMergeUpload && (
							<FileUploadMultiple
								onFilesUpload={handleMergeFilesUpload}
								existingFiles={mergeFiles}
							/>
						)}

						{mergeFiles.length > 0 && (
							<MergeManager
								files={mergeFiles}
								onUpdateFiles={setMergeFiles}
								onAddMoreFiles={handleAddMoreMergeFiles}
								onReset={handleMergeReset}
							/>
						)}

						{showUpgradePrompt && (
							<UpgradePrompt message="Get unlimited PDFs, larger file sizes, and more with Premium for just $2/month!" />
						)}
					</div>
				)}

				{/* Compress Mode */}
				{appMode === 'compress' && (
					<div className='max-w-4xl mx-auto space-y-8'>
						{isLoaded && !isPremium && <UsageBanner />}

						{!compressFile ? (
							<FileUploadCompress onFileUpload={handleCompressFileUpload} />
						) : (
							<CompressionManager
								file={compressFile}
								onReset={handleCompressReset}
							/>
						)}

						{showUpgradePrompt && (
							<UpgradePrompt message="Get unlimited compressions and larger files with Premium for just $2/month!" />
						)}
					</div>
				)}

				{/* Organize Mode (Rotate, Delete, Reorder) */}
				{appMode === 'organize' && (
					<div className='max-w-6xl mx-auto space-y-8'>
						{isLoaded && !isPremium && <UsageBanner />}

						{!organizeFile ? (
							<FileUploadOrganize onFileUpload={handleOrganizeFileUpload} />
						) : (
							<PageOrganizer
								file={organizeFile}
								onReset={handleOrganizeReset}
							/>
						)}
					</div>
				)}

				{/* Images to PDF Mode */}
				{appMode === 'images-to-pdf' && (
					<div className='max-w-4xl mx-auto space-y-8'>
						{isLoaded && !isPremium && <UsageBanner />}

						{showImageUpload && (
							<ImageUpload
								onImagesUpload={handleImagesToPdfUpload}
								existingImages={imagesToPdfFiles}
							/>
						)}

						{imagesToPdfFiles.length > 0 && (
							<ImagesToPdfManager
								images={imagesToPdfFiles}
								onUpdateImages={setImagesToPdfFiles}
								onAddMoreImages={handleAddMoreImages}
								onReset={handleImagesToPdfReset}
							/>
						)}
					</div>
				)}

				{/* PDF to Images Mode */}
				{appMode === 'pdf-to-images' && (
					<div className='max-w-4xl mx-auto space-y-8'>
						{isLoaded && !isPremium && <UsageBanner />}

						{!uploadedFile ? (
							<>
								<div className='bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 border-2 border-cyan-200 dark:border-cyan-800 rounded-xl p-6'>
									<div className='flex items-start gap-4'>
										<div className='bg-cyan-500 rounded-full p-3 flex-shrink-0'>
											<FileImage className='w-6 h-6 text-white' />
										</div>
										<div>
											<h3 className='text-lg font-bold text-gray-900 dark:text-white mb-2'>
												📸 PDF to Images
											</h3>
											<p className='text-gray-700 dark:text-gray-300 mb-2'>
												Convert each page of your PDF into high-quality JPG, PNG, or WebP images.
											</p>
											<ul className='text-sm text-gray-600 dark:text-gray-400 space-y-1'>
												<li>• Export all pages or select specific ones</li>
												<li>• Choose resolution and image quality</li>
												<li>• Download as individual files or ZIP</li>
											</ul>
										</div>
									</div>
								</div>
								<FileUpload onFileUpload={handleFileUpload} />
							</>
						) : (
							<PdfToImagesManager
								file={uploadedFile}
								onReset={handlePdfToolReset}
							/>
						)}
					</div>
				)}

				{/* Page Numbers Mode */}
				{appMode === 'page-numbers' && (
					<div className='max-w-4xl mx-auto space-y-8'>
						{isLoaded && !isPremium && <UsageBanner />}

						{!uploadedFile ? (
							<>
								<div className='bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 border-2 border-rose-200 dark:border-rose-800 rounded-xl p-6'>
									<div className='flex items-start gap-4'>
										<div className='bg-rose-500 rounded-full p-3 flex-shrink-0'>
											<Hash className='w-6 h-6 text-white' />
										</div>
										<div>
											<h3 className='text-lg font-bold text-gray-900 dark:text-white mb-2'>
												🔢 Add Page Numbers
											</h3>
											<p className='text-gray-700 dark:text-gray-300 mb-2'>
												Add professional page numbering to your PDF documents.
											</p>
											<ul className='text-sm text-gray-600 dark:text-gray-400 space-y-1'>
												<li>• Multiple formats: 1, 2, 3 or i, ii, iii or A, B, C</li>
												<li>• Customize position, size, and color</li>
												<li>• Add prefix/suffix like "Page 1 of 10"</li>
											</ul>
										</div>
									</div>
								</div>
								<FileUpload onFileUpload={handleFileUpload} />
							</>
						) : (
							<PageNumbersManager
								file={uploadedFile}
								onReset={handlePdfToolReset}
							/>
						)}
					</div>
				)}

				{/* Protect Mode */}
				{appMode === 'protect' && (
					<div className='max-w-4xl mx-auto space-y-8'>
						{isLoaded && !isPremium && <UsageBanner />}

						{!uploadedFile ? (
							<>
								<div className='bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 border-2 border-amber-200 dark:border-amber-800 rounded-xl p-6'>
									<div className='flex items-start gap-4'>
										<div className='bg-amber-500 rounded-full p-3 flex-shrink-0'>
											<Lock className='w-6 h-6 text-white' />
										</div>
										<div>
											<h3 className='text-lg font-bold text-gray-900 dark:text-white mb-2'>
												🔒 Password Protect PDF
											</h3>
											<p className='text-gray-700 dark:text-gray-300 mb-2'>
												Add encryption and password protection to your PDF.
											</p>
											<ul className='text-sm text-gray-600 dark:text-gray-400 space-y-1'>
												<li>• Set password to open the document</li>
												<li>• Control printing, copying, and editing permissions</li>
												<li>• AES-256 encryption for maximum security</li>
											</ul>
										</div>
									</div>
								</div>
								<FileUpload onFileUpload={handleFileUpload} />
							</>
						) : (
							<ProtectManager file={uploadedFile} onComplete={handlePdfToolReset} />
						)}
					</div>
				)}

				{/* Unlock Mode */}
				{appMode === 'unlock' && (
					<div className='max-w-4xl mx-auto space-y-8'>
						{isLoaded && !isPremium && <UsageBanner />}

						{!uploadedFile ? (
							<>
								<div className='bg-gradient-to-r from-sky-50 to-blue-50 dark:from-sky-900/20 dark:to-blue-900/20 border-2 border-sky-200 dark:border-sky-800 rounded-xl p-6'>
									<div className='flex items-start gap-4'>
										<div className='bg-sky-500 rounded-full p-3 flex-shrink-0'>
											<Unlock className='w-6 h-6 text-white' />
										</div>
										<div>
											<h3 className='text-lg font-bold text-gray-900 dark:text-white mb-2'>
												🔓 Remove PDF Password
											</h3>
											<p className='text-gray-700 dark:text-gray-300 mb-2'>
												Unlock password-protected PDFs you own.
											</p>
											<ul className='text-sm text-gray-600 dark:text-gray-400 space-y-1'>
												<li>• Enter the current password to unlock</li>
												<li>• Create an unprotected copy</li>
												<li>• Only for PDFs you have permission to unlock</li>
											</ul>
										</div>
									</div>
								</div>
								<FileUpload onFileUpload={handleFileUpload} />
							</>
						) : (
							<UnlockManager file={uploadedFile} onComplete={handlePdfToolReset} />
						)}
					</div>
				)}

				{/* Watermark Mode */}
				{appMode === 'watermark' && (
					<div className='max-w-4xl mx-auto space-y-8'>
						{isLoaded && !isPremium && <UsageBanner />}

						{!uploadedFile ? (
							<>
								<div className='bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 border-2 border-violet-200 dark:border-violet-800 rounded-xl p-6'>
									<div className='flex items-start gap-4'>
										<div className='bg-violet-500 rounded-full p-3 flex-shrink-0'>
											<Droplet className='w-6 h-6 text-white' />
										</div>
										<div>
											<h3 className='text-lg font-bold text-gray-900 dark:text-white mb-2'>
												💧 Add Watermark
											</h3>
											<p className='text-gray-700 dark:text-gray-300 mb-2'>
												Add text or image watermarks to all pages.
											</p>
											<ul className='text-sm text-gray-600 dark:text-gray-400 space-y-1'>
												<li>• Text watermarks with custom font and color</li>
												<li>• Image watermarks (logo, stamp)</li>
												<li>• Adjust position, rotation, and opacity</li>
											</ul>
										</div>
									</div>
								</div>
								<FileUpload onFileUpload={handleFileUpload} />
							</>
						) : (
							<WatermarkManager file={uploadedFile} onComplete={handlePdfToolReset} />
						)}
					</div>
				)}

				{/* Split by Bookmarks Mode */}
				{appMode === 'split-bookmarks' && (
					<div className='max-w-4xl mx-auto space-y-8'>
						{isLoaded && !isPremium && <UsageBanner />}

						{!uploadedFile ? (
							<>
								<div className='bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-900/20 dark:to-emerald-900/20 border-2 border-teal-200 dark:border-teal-800 rounded-xl p-6'>
									<div className='flex items-start gap-4'>
										<div className='bg-teal-500 rounded-full p-3 flex-shrink-0'>
											<BookOpen className='w-6 h-6 text-white' />
										</div>
										<div>
											<h3 className='text-lg font-bold text-gray-900 dark:text-white mb-2'>
												📖 Split by Chapters
											</h3>
											<p className='text-gray-700 dark:text-gray-300 mb-2'>
												Automatically split PDF by bookmarks or table of contents.
											</p>
											<ul className='text-sm text-gray-600 dark:text-gray-400 space-y-1'>
												<li>• Auto-detect PDF bookmarks/TOC</li>
												<li>• Split at each chapter automatically</li>
												<li>• Download as individual files or ZIP</li>
											</ul>
										</div>
									</div>
								</div>
								<FileUpload onFileUpload={handleFileUpload} />
							</>
						) : (
							<BookmarkSplitManager file={uploadedFile} onComplete={handlePdfToolReset} />
						)}
					</div>
				)}

				{/* Remove Blanks Mode */}
				{appMode === 'remove-blanks' && (
					<div className='max-w-4xl mx-auto space-y-8'>
						{isLoaded && !isPremium && <UsageBanner />}

						{!uploadedFile ? (
							<>
								<div className='bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border-2 border-red-200 dark:border-red-800 rounded-xl p-6'>
									<div className='flex items-start gap-4'>
										<div className='bg-red-500 rounded-full p-3 flex-shrink-0'>
											<FileX className='w-6 h-6 text-white' />
										</div>
										<div>
											<h3 className='text-lg font-bold text-gray-900 dark:text-white mb-2'>
												🗑️ Remove Blank Pages
											</h3>
											<p className='text-gray-700 dark:text-gray-300 mb-2'>
												Detect and remove blank or near-empty pages from your PDF.
											</p>
											<ul className='text-sm text-gray-600 dark:text-gray-400 space-y-1'>
												<li>• Automatic blank page detection</li>
												<li>• Preview before removing</li>
												<li>• Common fix for scanned documents</li>
											</ul>
										</div>
									</div>
								</div>
								<FileUpload onFileUpload={handleFileUpload} />
							</>
						) : (
							<BlankPagesManager file={uploadedFile} onComplete={handlePdfToolReset} />
						)}
					</div>
				)}

				{/* Repair Mode */}
				{appMode === 'repair' && (
					<div className='max-w-4xl mx-auto space-y-8'>
						{isLoaded && !isPremium && <UsageBanner />}

						{!uploadedFile ? (
							<>
								<div className='bg-gradient-to-r from-stone-50 to-gray-50 dark:from-stone-900/20 dark:to-gray-900/20 border-2 border-stone-200 dark:border-stone-800 rounded-xl p-6'>
									<div className='flex items-start gap-4'>
										<div className='bg-stone-500 rounded-full p-3 flex-shrink-0'>
											<Wrench className='w-6 h-6 text-white' />
										</div>
										<div>
											<h3 className='text-lg font-bold text-gray-900 dark:text-white mb-2'>
												🔧 Repair PDF
											</h3>
											<p className='text-gray-700 dark:text-gray-300 mb-2'>
												Fix corrupted or damaged PDF files.
											</p>
											<ul className='text-sm text-gray-600 dark:text-gray-400 space-y-1'>
												<li>• Diagnose PDF issues automatically</li>
												<li>• Rebuild damaged file structure</li>
												<li>• Multiple repair levels available</li>
											</ul>
										</div>
									</div>
								</div>
								<FileUpload onFileUpload={handleFileUpload} />
							</>
						) : (
							<RepairManager file={uploadedFile} onComplete={handlePdfToolReset} />
						)}
					</div>
				)}

				{/* Split Mode - PDF Interface */}
				{appMode === 'split' && uploadedFile && (
					<div className='space-y-8'>
						{isLoaded && !isPremium && <UsageBanner />}

					<div className='w-full'>
						<DocumentViewer
							file={uploadedFile}
							onPageCountLoaded={handlePageCountLoaded}
						/>
					</div>

						<div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
							<div className='lg:col-span-2'>
								<PageSelector
									file={uploadedFile}
									pageRanges={pageRanges}
									onAddRange={handleAddPageRange}
									onRemoveRange={handleRemovePageRange}
								/>

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

			{/* Security Status Monitor */}
			<SecurityStatus show={!!uploadedFile || mergeFiles.length > 0 || !!compressFile || !!organizeFile || imagesToPdfFiles.length > 0} />

			<Footer />
		</div>
	);
}
