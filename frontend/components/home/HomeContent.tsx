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
import { AnnotateManager } from '@/components/annotate/AnnotateManager';
import { SignManager } from '@/components/sign/SignManager';
import { FormsManager } from '@/components/forms/FormsManager';
import { OcrManager } from '@/components/ocr/OcrManager';
import { CompareManager } from '@/components/compare/CompareManager';
import { MetadataManager } from '@/components/metadata/MetadataManager';
import { PdfToHtmlManager } from '@/components/pdfToHtml/PdfToHtmlManager';
import { useDynamicFavicon } from '@/hooks/useDynamicFavicon';
import { ALL_TOOLS, getToolById } from '@/lib/tools/config';
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
import {
	cleanupMergeBlobUrl,
	cleanupMergeBlobStoreEntry,
} from '@/lib/pdf/merger';
import { SecurityValidator, SECURITY_CONFIG } from '@/lib/security/config';
import { validateSliceRate } from '@/lib/utils/file';
import { useSubscription } from '@/lib/subscription/hooks';
import {
	getPdfsProcessedThisMonth,
	incrementPdfUsage,
	getRemainingPdfs,
} from '@/lib/subscription/usage';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
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
	Highlighter,
	PenTool,
	FileText,
	Scan,
	GitCompare,
	Info,
	Code,
	Upload,
	ChevronDown,
} from 'lucide-react';
import { FileUploadCompress } from '@/components/compressor/FileUploadCompress';
import { CompressionManager } from '@/components/compressor/CompressionManager';
import {
	cleanupCompressBlobUrl,
	cleanupCompressBlobStoreEntry,
} from '@/lib/pdf/compressor';
import { cn } from '@/lib/utils/cn';

interface HomeContentProps {
	initialTool?: AppMode;
}

export default function HomeContent({
	initialTool = 'split',
}: HomeContentProps) {
	const router = useRouter();
	const pathname = usePathname();

	// App mode state - initialized from prop
	const [appMode, setAppMode] = useState<AppMode>(initialTool);

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

	// Sticky upload button state
	const [showStickyUpload, setShowStickyUpload] = useState(false);
	const uploadSectionRef = useRef<HTMLDivElement>(null);

	// Dynamic favicon based on selected tool
	const currentToolForFavicon = ALL_TOOLS.find((t) => t.id === appMode);
	useDynamicFavicon(appMode, currentToolForFavicon?.colorClass || '');

	const handleFileUpload = useCallback(
		(file: UploadedFile) => {
			// Check if user has reached their monthly limit
			if (!isPremium) {
				const remaining = getRemainingPdfs(limits.maxPdfsPerMonth);
				if (remaining <= 0) {
					alert(
						`You've reached your monthly limit of ${limits.maxPdfsPerMonth} PDFs. Please upgrade to Premium for unlimited access.`
					);
					router.push('/pricing');
					return;
				}
				// Increment usage counter
				incrementPdfUsage();
			}

			// Check file size limit
			const fileSizeMB = file.size / (1024 * 1024);
			if (fileSizeMB > limits.maxFileSizeMB) {
				alert(
					`File size exceeds ${limits.maxFileSizeMB}MB limit. ${
						isPremium
							? 'Please upload a smaller file.'
							: 'Upgrade to Premium for 100MB limit.'
					}`
				);
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
		},
		[isPremium, limits, router]
	);

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
				alert(
					`You've reached the maximum of ${maxRanges} page ranges. ${
						isPremium
							? ''
							: 'Upgrade to Premium for unlimited ranges!'
					}`
				);
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

	// Mode switch handler - now also updates URL
	const handleModeSwitch = useCallback(
		(mode: AppMode) => {
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

			// Update URL to the new tool's slug
			const tool = ALL_TOOLS.find((t) => t.id === mode);
			if (tool) {
				router.push(`/${tool.slug}`, { scroll: false });
			}
		},
		[appMode, router]
	);

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

	// Intersection Observer to show/hide sticky upload button
	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				// Show button when upload section is NOT visible
				setShowStickyUpload(!entry.isIntersecting);
			},
			{
				threshold: 0.1,
				rootMargin: '-100px 0px 0px 0px', // Account for header
			}
		);

		if (uploadSectionRef.current) {
			observer.observe(uploadSectionRef.current);
		}

		return () => {
			if (uploadSectionRef.current) {
				observer.unobserve(uploadSectionRef.current);
			}
		};
	}, [appMode]); // Re-run when app mode changes

	// Function to scroll to upload section
	const scrollToUpload = useCallback(() => {
		uploadSectionRef.current?.scrollIntoView({
			behavior: 'smooth',
			block: 'start',
		});
	}, []);

	// Get current tool info
	const getCurrentToolInfo = () => {
		return ALL_TOOLS.find((t) => t.id === appMode);
	};

	const currentTool = getCurrentToolInfo();

	return (
		<div className='min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-indigo-50/30 dark:from-gray-900 dark:via-blue-950/20 dark:to-indigo-950/30'>
			<Header
				onNewDocument={
					uploadedFile ||
					mergeFiles.length > 0 ||
					compressFile ||
					organizeFile ||
					imagesToPdfFiles.length > 0
						? handleNewDocument
						: undefined
				}
				currentTool={ALL_TOOLS.find((t) => t.id === appMode)}
			/>

			<div className='container mx-auto px-4 py-8'>
				{/* Global Privacy Banner */}
				<div className='max-w-4xl mx-auto mb-6'>
					<div className='bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-2 border-green-200 dark:border-green-800 rounded-xl p-6 shadow-lg'>
						<div className='flex items-start gap-4'>
							<div className='bg-green-500 rounded-full p-3 flex-shrink-0'>
								<Lock className='w-6 h-6 text-white' />
							</div>
							<div className='flex-1'>
								<h3 className='text-lg font-bold text-gray-900 dark:text-white mb-2'>
									🔒 Your Files Never Leave Your Device
								</h3>
								<p className='text-gray-700 dark:text-gray-300 mb-2'>
									Everything happens in your browser. We never
									upload, store, or access your PDFs. This isn't just a promise—it's how our
									technology works.
								</p>
								<p className='text-sm text-gray-600 dark:text-gray-400 mb-3'>
									<strong>HIPAA-Friendly for Healthcare</strong> • <strong>Attorney-Client Privilege Safe</strong> • <strong>Complete Privacy Guaranteed</strong>
								</p>
								<Link 
									href='/compliance'
									className='inline-flex items-center gap-1 text-sm font-medium text-green-700 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 underline underline-offset-2 transition-colors'
								>
									Learn what this means for your industry and compliance responsibilities
									<span className='text-xs'>→</span>
								</Link>
							</div>
						</div>
					</div>
				</div>

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
								)}>
								<tool.icon className='h-5 w-5 sm:h-6 sm:w-6 mb-1.5 transition-transform group-hover:scale-110' />
								<span className='text-xs sm:text-sm font-medium text-center leading-tight whitespace-nowrap'>
									{tool.shortLabel}
								</span>
							</button>
						))}
					</div>

					{/* Current tool description */}
					<div className='mt-4 text-center'>
						<p className='text-sm text-gray-600 dark:text-gray-400'>
							{currentTool?.description}
						</p>
					</div>
				</div>

				{/* Split Mode */}
				{appMode === 'split' && !uploadedFile && (
					<div className='max-w-4xl mx-auto space-y-8'>
						{/* Usage Banner for Free Users */}
						{isLoaded && !isPremium && <UsageBanner />}

						{/* Tool Description */}
						<div className='bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-xl p-6'>
							<div className='flex items-start gap-4'>
								<div className='bg-blue-500 rounded-full p-3 flex-shrink-0'>
									<Scissors className='w-6 h-6 text-white' />
								</div>
								<div>
									<h3 className='text-lg font-bold text-gray-900 dark:text-white mb-2'>
										✂️ Split PDF
									</h3>
									<p className='text-gray-700 dark:text-gray-300 mb-2'>
										Extract specific pages or split your PDF
										into multiple files. Perfect for
										extracting chapters, sections, or
										specific pages.
									</p>
									<ul className='text-sm text-gray-600 dark:text-gray-400 space-y-1'>
										<li>
											• <strong>Custom ranges</strong> –
											Extract pages 1-5, 10-15, or any
											combination
										</li>
										<li>
											• <strong>Visual preview</strong> –
											See pages before splitting
										</li>
										<li>
											• <strong>100% private</strong> –
											Processing happens locally in your
											browser
										</li>
									</ul>
								</div>
							</div>
						</div>

						<div ref={uploadSectionRef}>
							<FileUpload
								onFileUpload={handleFileUpload}
								minimal
								accentColor='blue'
								dropzoneTitle='Drop your PDF to split'
								dropzoneSubtitle='Extract specific pages or split into multiple files'
								features={[
									{
										icon: 'file',
										title: 'Custom Ranges',
										subtitle: 'Pages 1-5, 10-15, etc.',
									},
									{
										icon: 'image',
										title: 'Visual Preview',
										subtitle: 'See pages first',
									},
									{
										icon: 'lock',
										title: '100% Private',
										subtitle: 'Never leaves device',
									},
								]}
							/>
						</div>

						{/* Upgrade Prompt */}
						{showUpgradePrompt && (
							<UpgradePrompt message='Get unlimited PDFs, larger file sizes, and more with Premium for just $2/month!' />
						)}
					</div>
				)}

				{/* Merge Mode */}
				{appMode === 'merge' && (
					<div className='max-w-4xl mx-auto space-y-8'>
						{isLoaded && !isPremium && <UsageBanner />}

						{/* Tool Description */}
						<div className='bg-gradient-to-r from-indigo-50 to-violet-50 dark:from-indigo-900/20 dark:to-violet-900/20 border-2 border-indigo-200 dark:border-indigo-800 rounded-xl p-6'>
							<div className='flex items-start gap-4'>
								<div className='bg-indigo-500 rounded-full p-3 flex-shrink-0'>
									<Layers className='w-6 h-6 text-white' />
								</div>
								<div>
									<h3 className='text-lg font-bold text-gray-900 dark:text-white mb-2'>
										📑 Merge PDFs
									</h3>
									<p className='text-gray-700 dark:text-gray-300 mb-2'>
										Combine multiple PDF files into a single
										document. Perfect for organizing
										reports, portfolios, or combining
										related documents.
									</p>
									<ul className='text-sm text-gray-600 dark:text-gray-400 space-y-1'>
										<li>
											• <strong>Multiple files</strong> –
											Merge as many PDFs as you need
										</li>
										<li>
											• <strong>Custom order</strong> –
											Drag and drop to reorder before
											merging
										</li>
										<li>
											• <strong>100% private</strong> –
											Processing happens locally in your
											browser
										</li>
									</ul>
								</div>
							</div>
						</div>

						{showMergeUpload && (
							<div ref={uploadSectionRef}>
								<FileUploadMultiple
									onFilesUpload={handleMergeFilesUpload}
									existingFiles={mergeFiles}
								/>
							</div>
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
							<UpgradePrompt message='Get unlimited PDFs, larger file sizes, and more with Premium for just $2/month!' />
						)}
					</div>
				)}

				{/* Compress Mode */}
				{appMode === 'compress' && (
					<div className='max-w-4xl mx-auto space-y-8'>
						{isLoaded && !isPremium && <UsageBanner />}

						{!compressFile ? (
							<div ref={uploadSectionRef}>
								<FileUploadCompress
									onFileUpload={handleCompressFileUpload}
								/>
							</div>
						) : (
							<CompressionManager
								file={compressFile}
								onReset={handleCompressReset}
							/>
						)}

						{showUpgradePrompt && (
							<UpgradePrompt message='Get unlimited compressions and larger files with Premium for just $2/month!' />
						)}
					</div>
				)}

				{/* Organize Mode (Rotate, Delete, Reorder) */}
				{appMode === 'organize' && (
					<div className='max-w-4xl mx-auto space-y-8'>
						{isLoaded && !isPremium && <UsageBanner />}

						{!organizeFile ? (
							<div ref={uploadSectionRef}>
								<FileUploadOrganize
									onFileUpload={handleOrganizeFileUpload}
								/>
							</div>
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
							<div ref={uploadSectionRef}>
								<ImageUpload
									onImagesUpload={handleImagesToPdfUpload}
									existingImages={imagesToPdfFiles}
								/>
							</div>
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
												Convert each page of your PDF
												into high-quality JPG, PNG, or
												WebP images.
											</p>
											<ul className='text-sm text-gray-600 dark:text-gray-400 space-y-1'>
												<li>
													• Export all pages or select
													specific ones
												</li>
												<li>
													• Choose resolution and
													image quality
												</li>
												<li>
													• Download as individual
													files or ZIP
												</li>
											</ul>
										</div>
									</div>
								</div>
								<div ref={uploadSectionRef}>
									<FileUpload
										onFileUpload={handleFileUpload}
										minimal
										accentColor='cyan'
										dropzoneTitle='Drop your PDF to convert to images'
										dropzoneSubtitle='Export each page as JPG, PNG, or WebP'
										features={[
											{
												icon: 'image',
												title: 'JPG, PNG, WebP',
												subtitle: 'Multiple formats',
											},
											{
												icon: 'zap',
												title: 'High Quality',
												subtitle: 'Up to 300 DPI',
											},
											{
												icon: 'check',
												title: 'Batch Export',
												subtitle: 'All pages at once',
											},
										]}
									/>
								</div>
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
												Add professional page numbering
												to your PDF documents.
											</p>
											<ul className='text-sm text-gray-600 dark:text-gray-400 space-y-1'>
												<li>
													• Multiple formats: 1, 2, 3
													or i, ii, iii or A, B, C
												</li>
												<li>
													• Customize position, size,
													and color
												</li>
												<li>
													• Add prefix/suffix like
													"Page 1 of 10"
												</li>
											</ul>
										</div>
									</div>
								</div>
								<div ref={uploadSectionRef}>
									<FileUpload
										onFileUpload={handleFileUpload}
										minimal
										accentColor='rose'
										dropzoneTitle='Drop your PDF to add page numbers'
										dropzoneSubtitle='Customize position, style, and format'
										features={[
											{
												icon: 'check',
												title: 'Multiple Styles',
												subtitle: '1, i, A formats',
											},
											{
												icon: 'zap',
												title: 'Custom Position',
												subtitle: 'Header or footer',
											},
											{
												icon: 'check',
												title: 'Prefix/Suffix',
												subtitle: '"Page X of Y"',
											},
										]}
									/>
								</div>
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
												Add encryption and password
												protection to your PDF.
											</p>
											<ul className='text-sm text-gray-600 dark:text-gray-400 space-y-1'>
												<li>
													• Set password to open the
													document
												</li>
												<li>
													• Control printing, copying,
													and editing permissions
												</li>
												<li>
													• AES-256 encryption for
													maximum security
												</li>
											</ul>
										</div>
									</div>
								</div>
								<div ref={uploadSectionRef}>
									<FileUpload
										onFileUpload={handleFileUpload}
										minimal
										accentColor='amber'
										dropzoneTitle='Drop your PDF to add password protection'
										dropzoneSubtitle='Secure your document with AES-256 encryption'
										features={[
											{
												icon: 'lock',
												title: 'AES-256',
												subtitle: 'Military-grade',
											},
											{
												icon: 'shield',
												title: 'Permissions',
												subtitle: 'Control access',
											},
											{
												icon: 'check',
												title: 'Privacy',
												subtitle: '100% local',
											},
										]}
									/>
								</div>
							</>
						) : (
							<ProtectManager
								file={uploadedFile}
								onComplete={handlePdfToolReset}
							/>
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
												Unlock password-protected PDFs
												you own.
											</p>
											<ul className='text-sm text-gray-600 dark:text-gray-400 space-y-1'>
												<li>
													• Enter the current password
													to unlock
												</li>
												<li>
													• Create an unprotected copy
												</li>
												<li>
													• Only for PDFs you have
													permission to unlock
												</li>
											</ul>
										</div>
									</div>
								</div>
								<div ref={uploadSectionRef}>
									<FileUpload
										onFileUpload={handleFileUpload}
										minimal
										accentColor='sky'
										dropzoneTitle='Drop your password-protected PDF'
										dropzoneSubtitle='Remove password from PDFs you own'
										features={[
											{
												icon: 'lock',
												title: 'Password Entry',
												subtitle: 'Enter to unlock',
											},
											{
												icon: 'check',
												title: 'Clean Copy',
												subtitle: 'No restrictions',
											},
											{
												icon: 'shield',
												title: 'Your Files',
												subtitle: 'Authorized use only',
											},
										]}
									/>
								</div>
							</>
						) : (
							<UnlockManager
								file={uploadedFile}
								onComplete={handlePdfToolReset}
							/>
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
												Add text or image watermarks to
												all pages.
											</p>
											<ul className='text-sm text-gray-600 dark:text-gray-400 space-y-1'>
												<li>
													• Text watermarks with
													custom font and color
												</li>
												<li>
													• Image watermarks (logo,
													stamp)
												</li>
												<li>
													• Adjust position, rotation,
													and opacity
												</li>
											</ul>
										</div>
									</div>
								</div>
								<div ref={uploadSectionRef}>
									<FileUpload
										onFileUpload={handleFileUpload}
										minimal
										accentColor='violet'
										dropzoneTitle='Drop your PDF to add watermark'
										dropzoneSubtitle='Add text or image watermarks to your document'
										features={[
											{
												icon: 'file',
												title: 'Text & Image',
												subtitle: 'Both supported',
											},
											{
												icon: 'check',
												title: 'Custom Style',
												subtitle: 'Font, color, size',
											},
											{
												icon: 'zap',
												title: 'All Pages',
												subtitle: 'Applied instantly',
											},
										]}
									/>
								</div>
							</>
						) : (
							<WatermarkManager
								file={uploadedFile}
								onComplete={handlePdfToolReset}
							/>
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
												Automatically split PDF by
												bookmarks or table of contents.
											</p>
											<ul className='text-sm text-gray-600 dark:text-gray-400 space-y-1'>
												<li>
													• Auto-detect PDF
													bookmarks/TOC
												</li>
												<li>
													• Split at each chapter
													automatically
												</li>
												<li>
													• Download as individual
													files or ZIP
												</li>
											</ul>
										</div>
									</div>
								</div>
								<div ref={uploadSectionRef}>
									<FileUpload
										onFileUpload={handleFileUpload}
										minimal
										accentColor='teal'
										dropzoneTitle='Drop your PDF to split by chapters'
										dropzoneSubtitle='Automatically detect and split at bookmarks'
										features={[
											{
												icon: 'file',
												title: 'Auto-Detect',
												subtitle: 'Reads TOC/bookmarks',
											},
											{
												icon: 'zap',
												title: 'Smart Split',
												subtitle: 'By chapter',
											},
											{
												icon: 'check',
												title: 'ZIP Download',
												subtitle: 'All files at once',
											},
										]}
									/>
								</div>
							</>
						) : (
							<BookmarkSplitManager
								file={uploadedFile}
								onComplete={handlePdfToolReset}
							/>
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
												Detect and remove blank or
												near-empty pages from your PDF.
											</p>
											<ul className='text-sm text-gray-600 dark:text-gray-400 space-y-1'>
												<li>
													• Automatic blank page
													detection
												</li>
												<li>
													• Preview before removing
												</li>
												<li>
													• Common fix for scanned
													documents
												</li>
											</ul>
										</div>
									</div>
								</div>
								<div ref={uploadSectionRef}>
									<FileUpload
										onFileUpload={handleFileUpload}
										minimal
										accentColor='red'
										dropzoneTitle='Drop your PDF to detect blank pages'
										dropzoneSubtitle='Find and remove empty pages automatically'
										features={[
											{
												icon: 'zap',
												title: 'Auto-Detect',
												subtitle: 'Smart scanning',
											},
											{
												icon: 'check',
												title: 'Preview First',
												subtitle: 'Review before delete',
											},
											{
												icon: 'file',
												title: 'Scan Cleanup',
												subtitle: 'For scanned docs',
											},
										]}
									/>
								</div>
							</>
						) : (
							<BlankPagesManager
								file={uploadedFile}
								onComplete={handlePdfToolReset}
							/>
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
												Fix corrupted or damaged PDF
												files.
											</p>
											<ul className='text-sm text-gray-600 dark:text-gray-400 space-y-1'>
												<li>
													• Diagnose PDF issues
													automatically
												</li>
												<li>
													• Rebuild damaged file
													structure
												</li>
												<li>
													• Multiple repair levels
													available
												</li>
											</ul>
										</div>
									</div>
								</div>
								<div ref={uploadSectionRef}>
									<FileUpload
										onFileUpload={handleFileUpload}
										minimal
										accentColor='stone'
										dropzoneTitle='Drop your corrupted PDF to repair'
										dropzoneSubtitle='Attempt to fix damaged or broken PDF files'
										features={[
											{
												icon: 'zap',
												title: 'Auto-Diagnose',
												subtitle: 'Find issues',
											},
											{
												icon: 'check',
												title: 'Rebuild',
												subtitle: 'Fix structure',
											},
											{
												icon: 'shield',
												title: 'Multiple Levels',
												subtitle: 'Light to deep',
											},
										]}
									/>
								</div>
							</>
						) : (
							<RepairManager
								file={uploadedFile}
								onComplete={handlePdfToolReset}
							/>
						)}
					</div>
				)}

				{/* Annotate Mode */}
				{appMode === 'annotate' && (
					<div className='max-w-4xl mx-auto space-y-8'>
						{isLoaded && !isPremium && <UsageBanner />}

						{!uploadedFile ? (
							<>
								<div className='bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 border-2 border-pink-200 dark:border-pink-800 rounded-xl p-6'>
									<div className='flex items-start gap-4'>
										<div className='bg-pink-500 rounded-full p-3 flex-shrink-0'>
											<Highlighter className='w-6 h-6 text-white' />
										</div>
										<div>
											<h3 className='text-lg font-bold text-gray-900 dark:text-white mb-2'>
												✏️ Annotate PDF
											</h3>
											<p className='text-gray-700 dark:text-gray-300 mb-2'>
												Add annotations, highlights, and
												shapes to your PDF.
											</p>
											<ul className='text-sm text-gray-600 dark:text-gray-400 space-y-1'>
												<li>
													• Highlight, underline, and
													strikethrough text
												</li>
												<li>
													• Add text boxes and
													comments
												</li>
												<li>
													• Draw arrows, rectangles,
													and circles
												</li>
												<li>• Freehand drawing tool</li>
											</ul>
										</div>
									</div>
								</div>
								<div ref={uploadSectionRef}>
									<FileUpload
										onFileUpload={handleFileUpload}
										minimal
										accentColor='pink'
										dropzoneTitle='Drop your PDF to annotate'
										dropzoneSubtitle='Add highlights, comments, and shapes'
										features={[
											{
												icon: 'sparkle',
												title: 'Highlights',
												subtitle: 'Mark important text',
												highlight: true,
											},
											{
												icon: 'file',
												title: 'Comments',
												subtitle: 'Add notes anywhere',
											},
											{
												icon: 'check',
												title: 'Shapes',
												subtitle: 'Arrows, boxes, circles',
											},
										]}
									/>
								</div>
							</>
						) : (
							<AnnotateManager
								file={uploadedFile}
								onReset={handlePdfToolReset}
							/>
						)}
					</div>
				)}

				{/* Sign Mode */}
				{appMode === 'sign' && (
					<div className='max-w-4xl mx-auto space-y-8'>
						{isLoaded && !isPremium && <UsageBanner />}

						{!uploadedFile ? (
							<>
								<div className='bg-gradient-to-r from-lime-50 to-green-50 dark:from-lime-900/20 dark:to-green-900/20 border-2 border-lime-200 dark:border-lime-800 rounded-xl p-6'>
									<div className='flex items-start gap-4'>
										<div className='bg-lime-500 rounded-full p-3 flex-shrink-0'>
											<PenTool className='w-6 h-6 text-white' />
										</div>
										<div>
											<h3 className='text-lg font-bold text-gray-900 dark:text-white mb-2'>
												✍️ Sign PDF
											</h3>
											<p className='text-gray-700 dark:text-gray-300 mb-2'>
												Add your digital signature to
												PDF documents.
											</p>
											<ul className='text-sm text-gray-600 dark:text-gray-400 space-y-1'>
												<li>
													• Draw your signature with
													mouse or touch
												</li>
												<li>
													• Type your name in
													signature fonts
												</li>
												<li>
													• Upload an image of your
													signature
												</li>
												<li>
													• Add date automatically
												</li>
											</ul>
										</div>
									</div>
								</div>
								<div ref={uploadSectionRef}>
									<FileUpload
										onFileUpload={handleFileUpload}
										minimal
										accentColor='lime'
										dropzoneTitle='Drop your PDF to add signature'
										dropzoneSubtitle='Draw, type, or upload your signature'
										features={[
											{
												icon: 'check',
												title: 'Draw',
												subtitle: 'Mouse or touch',
											},
											{
												icon: 'file',
												title: 'Type',
												subtitle: 'Signature fonts',
											},
											{
												icon: 'image',
												title: 'Upload',
												subtitle: 'Existing signature',
											},
										]}
									/>
								</div>
							</>
						) : (
							<SignManager
								file={uploadedFile}
								onReset={handlePdfToolReset}
							/>
						)}
					</div>
				)}

				{/* Forms Mode */}
				{appMode === 'forms' && (
					<div className='max-w-4xl mx-auto space-y-8'>
						{isLoaded && !isPremium && <UsageBanner />}

						{!uploadedFile ? (
							<>
								<div className='bg-gradient-to-r from-fuchsia-50 to-purple-50 dark:from-fuchsia-900/20 dark:to-purple-900/20 border-2 border-fuchsia-200 dark:border-fuchsia-800 rounded-xl p-6'>
									<div className='flex items-start gap-4'>
										<div className='bg-fuchsia-500 rounded-full p-3 flex-shrink-0'>
											<FileText className='w-6 h-6 text-white' />
										</div>
										<div>
											<h3 className='text-lg font-bold text-gray-900 dark:text-white mb-2'>
												📝 Fill PDF Forms
											</h3>
											<p className='text-gray-700 dark:text-gray-300 mb-2'>
												Fill out interactive PDF forms
												online.
											</p>
											<ul className='text-sm text-gray-600 dark:text-gray-400 space-y-1'>
												<li>
													• Auto-detect form fields
												</li>
												<li>
													• Fill text fields and
													checkboxes
												</li>
												<li>
													• Select from dropdowns and
													radio buttons
												</li>
												<li>• Download filled form</li>
											</ul>
										</div>
									</div>
								</div>
								<div ref={uploadSectionRef}>
									<FileUpload
										onFileUpload={handleFileUpload}
										minimal
										accentColor='fuchsia'
										dropzoneTitle='Drop your PDF form to fill'
										dropzoneSubtitle='Complete interactive PDF forms easily'
										features={[
											{
												icon: 'zap',
												title: 'Auto-Detect',
												subtitle: 'Finds form fields',
											},
											{
												icon: 'check',
												title: 'All Field Types',
												subtitle: 'Text, checkbox, etc',
											},
											{
												icon: 'file',
												title: 'Download',
												subtitle: 'Filled & flattened',
											},
										]}
									/>
								</div>
							</>
						) : (
							<FormsManager
								file={uploadedFile}
								onReset={handlePdfToolReset}
							/>
						)}
					</div>
				)}

				{/* OCR Mode */}
				{appMode === 'ocr' && (
					<div className='max-w-4xl mx-auto space-y-8'>
						{isLoaded && !isPremium && <UsageBanner />}

						{!uploadedFile ? (
							<>
								<div className='bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 border-2 border-yellow-200 dark:border-yellow-800 rounded-xl p-6'>
									<div className='flex items-start gap-4'>
										<div className='bg-yellow-500 rounded-full p-3 flex-shrink-0'>
											<Scan className='w-6 h-6 text-white' />
										</div>
										<div>
											<h3 className='text-lg font-bold text-gray-900 dark:text-white mb-2'>
												🔍 OCR - Make PDF Searchable
											</h3>
											<p className='text-gray-700 dark:text-gray-300 mb-2'>
												Extract text from scanned PDFs
												using OCR technology.
											</p>
											<ul className='text-sm text-gray-600 dark:text-gray-400 space-y-1'>
												<li>
													• Support for 12+ languages
												</li>
												<li>
													• Make scanned documents
													searchable
												</li>
												<li>
													• Copy text from image-based
													PDFs
												</li>
												<li>
													• Automatic image
													enhancement
												</li>
											</ul>
										</div>
									</div>
								</div>
								<div ref={uploadSectionRef}>
									<FileUpload
										onFileUpload={handleFileUpload}
										minimal
										accentColor='yellow'
										dropzoneTitle='Drop your scanned PDF for OCR'
										dropzoneSubtitle='Make text searchable and selectable'
										features={[
											{
												icon: 'zap',
												title: '12+ Languages',
												subtitle: 'Multi-language OCR',
											},
											{
												icon: 'sparkle',
												title: 'Searchable',
												subtitle: 'Find text easily',
												highlight: true,
											},
											{
												icon: 'check',
												title: 'Copy Text',
												subtitle: 'From any scan',
											},
										]}
									/>
								</div>
							</>
						) : (
							<OcrManager
								file={uploadedFile}
								onReset={handlePdfToolReset}
							/>
						)}
					</div>
				)}

				{/* Compare Mode */}
				{appMode === 'compare' && (
					<div className='max-w-4xl mx-auto space-y-8'>
						{isLoaded && !isPremium && <UsageBanner />}

						{!uploadedFile ? (
							<>
								<div className='bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-900/20 dark:to-gray-900/20 border-2 border-slate-200 dark:border-slate-800 rounded-xl p-6'>
									<div className='flex items-start gap-4'>
										<div className='bg-slate-500 rounded-full p-3 flex-shrink-0'>
											<GitCompare className='w-6 h-6 text-white' />
										</div>
										<div>
											<h3 className='text-lg font-bold text-gray-900 dark:text-white mb-2'>
												📊 Compare PDFs
											</h3>
											<p className='text-gray-700 dark:text-gray-300 mb-2'>
												Find differences between two PDF
												documents.
											</p>
											<ul className='text-sm text-gray-600 dark:text-gray-400 space-y-1'>
												<li>
													• Visual comparison with
													highlighted differences
												</li>
												<li>
													• Text comparison for
													content changes
												</li>
												<li>• Page-by-page analysis</li>
												<li>
													• Generate comparison report
												</li>
											</ul>
										</div>
									</div>
								</div>
								<div ref={uploadSectionRef}>
									<FileUpload
										onFileUpload={handleFileUpload}
										minimal
										accentColor='slate'
										dropzoneTitle='Drop the first PDF to compare'
										dropzoneSubtitle='Find differences between two PDF documents'
										features={[
											{
												icon: 'zap',
												title: 'Visual Diff',
												subtitle: 'Highlight changes',
											},
											{
												icon: 'file',
												title: 'Text Compare',
												subtitle: 'Content analysis',
											},
											{
												icon: 'check',
												title: 'Report',
												subtitle: 'Export differences',
											},
										]}
									/>
								</div>
							</>
						) : (
							<CompareManager
								file={uploadedFile}
								onReset={handlePdfToolReset}
							/>
						)}
					</div>
				)}

				{/* Metadata Mode */}
				{appMode === 'metadata' && (
					<div className='max-w-4xl mx-auto space-y-8'>
						{isLoaded && !isPremium && <UsageBanner />}

						{!uploadedFile ? (
							<>
								<div className='bg-gradient-to-r from-zinc-50 to-gray-50 dark:from-zinc-900/20 dark:to-gray-900/20 border-2 border-zinc-200 dark:border-zinc-800 rounded-xl p-6'>
									<div className='flex items-start gap-4'>
										<div className='bg-zinc-500 rounded-full p-3 flex-shrink-0'>
											<Info className='w-6 h-6 text-white' />
										</div>
										<div>
											<h3 className='text-lg font-bold text-gray-900 dark:text-white mb-2'>
												ℹ️ Edit Metadata
											</h3>
											<p className='text-gray-700 dark:text-gray-300 mb-2'>
												View and edit PDF document
												properties.
											</p>
											<ul className='text-sm text-gray-600 dark:text-gray-400 space-y-1'>
												<li>
													• Edit title, author, and
													subject
												</li>
												<li>
													• Add keywords for search
												</li>
												<li>
													• View creation and
													modification dates
												</li>
												<li>
													• Clear all metadata for
													privacy
												</li>
											</ul>
										</div>
									</div>
								</div>
								<div ref={uploadSectionRef}>
									<FileUpload
										onFileUpload={handleFileUpload}
										minimal
										accentColor='zinc'
										dropzoneTitle='Drop your PDF to edit metadata'
										dropzoneSubtitle='Change title, author, and document properties'
										features={[
											{
												icon: 'file',
												title: 'Edit Properties',
												subtitle: 'Title, author, etc',
											},
											{
												icon: 'check',
												title: 'Add Keywords',
												subtitle: 'For better search',
											},
											{
												icon: 'shield',
												title: 'Clear All',
												subtitle: 'Privacy mode',
											},
										]}
									/>
								</div>
							</>
						) : (
							<MetadataManager
								file={uploadedFile}
								onReset={handlePdfToolReset}
							/>
						)}
					</div>
				)}

				{/* PDF to HTML Mode */}
				{appMode === 'pdf-to-html' && (
					<div className='max-w-4xl mx-auto space-y-8'>
						{isLoaded && !isPremium && <UsageBanner />}

						{!uploadedFile ? (
							<>
								<div className='bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-2 border-orange-200 dark:border-orange-800 rounded-xl p-6'>
									<div className='flex items-start gap-4'>
										<div className='bg-gradient-to-br from-orange-500 to-red-500 rounded-full p-3 flex-shrink-0'>
											<Code className='w-6 h-6 text-white' />
										</div>
										<div>
											<h3 className='text-lg font-bold text-gray-900 dark:text-white mb-2'>
												🌐 PDF to HTML Converter
											</h3>
											<p className='text-gray-700 dark:text-gray-300 mb-2'>
												Convert your PDF to a beautiful, self-contained HTML document with text and images.
											</p>
											<ul className='text-sm text-gray-600 dark:text-gray-400 space-y-1'>
												<li>
													• <strong>Extract text</strong> – Searchable, copyable text content
												</li>
												<li>
													• <strong>Extract images</strong> – Embedded or as separate files
												</li>
												<li>
													• <strong>Choose themes</strong> – Modern, Classic, Minimal, or Dark
												</li>
												<li>
													• <strong>Single HTML or ZIP</strong> – With images folder
												</li>
											</ul>
										</div>
									</div>
								</div>
								<div ref={uploadSectionRef}>
									<FileUpload
										onFileUpload={handleFileUpload}
										minimal
										accentColor='amber'
										dropzoneTitle='Drop your PDF to convert to HTML'
										dropzoneSubtitle='Create web pages with text and images'
										features={[
											{
												icon: 'file',
												title: 'Text & Images',
												subtitle: 'Full extraction',
											},
											{
												icon: 'sparkle',
												title: '4 Themes',
												subtitle: 'Beautiful styles',
												highlight: true,
											},
											{
												icon: 'check',
												title: 'ZIP or HTML',
												subtitle: 'Your choice',
											},
										]}
									/>
								</div>
							</>
						) : (
							<PdfToHtmlManager
								file={uploadedFile}
								onReset={handlePdfToolReset}
							/>
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
										<UpgradePrompt message='Unlock unlimited page ranges and larger files with Premium!' />
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
			<SecurityStatus
				show={
					!!uploadedFile ||
					mergeFiles.length > 0 ||
					!!compressFile ||
					!!organizeFile ||
					imagesToPdfFiles.length > 0
				}
			/>

			{/* Sticky Open PDF Button */}
			{showStickyUpload &&
				!uploadedFile &&
				!compressFile &&
				!organizeFile &&
				mergeFiles.length === 0 &&
				imagesToPdfFiles.length === 0 && (
					<button
						onClick={scrollToUpload}
						className={cn(
							'fixed bottom-8 right-8 z-50',
							'flex items-center gap-3 px-6 py-4 rounded-full',
							'text-white font-semibold text-lg',
							'shadow-2xl hover:shadow-3xl',
							'transform transition-all duration-300 ease-out',
							'hover:scale-105 active:scale-95',
							'animate-bounce-slow',
							currentTool?.activeClasses ||
								'bg-blue-600 hover:bg-blue-700'
						)}
						style={{
							animation: 'bounce-gentle 2s ease-in-out infinite',
						}}>
						<Upload className='w-6 h-6' />
						<span className='hidden sm:inline'>
							Open PDF
						</span>
						<ChevronDown className='w-5 h-5 animate-pulse' />
					</button>
				)}

			<Footer />
		</div>
	);
}
