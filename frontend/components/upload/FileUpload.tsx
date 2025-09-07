'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, AlertCircle, CheckCircle2 } from 'lucide-react';
import { UploadedFile } from '@/types';
import {
	getFileType,
	formatFileSize,
	validateFile,
	generateFileId,
	validateUploadRate,
} from '@/lib/utils/file';
import {
	SecurityValidator,
	SECURITY_CONFIG,
	checkBrowserSupport,
} from '@/lib/security/config';
import { cn } from '@/lib/utils/cn';
import { PDFViewer } from '@/lib/pdf/viewer';

interface FileUploadProps {
	onFileUpload: (file: UploadedFile) => void;
}

export function FileUpload({ onFileUpload }: FileUploadProps) {
	const [error, setError] = useState<string | null>(null);
	const [isProcessing, setIsProcessing] = useState(false);
	const [securityWarning, setSecurityWarning] = useState<string | null>(null);

	// Check browser support on component mount
	useState(() => {
		const browserCheck = checkBrowserSupport();
		if (!browserCheck.supported) {
			setSecurityWarning(
				`${
					SECURITY_CONFIG.ERRORS.BROWSER_NOT_SUPPORTED
				} Missing: ${browserCheck.missing?.join(', ')}`
			);
		}
	});

	const onDrop = useCallback(
		async (acceptedFiles: File[]) => {
			setError(null);
			setSecurityWarning(null);

			if (acceptedFiles.length === 0) return;

			// Check upload rate limiting first
			const rateCheck = validateUploadRate();
			if (!rateCheck.allowed) {
				setError(rateCheck.error || 'Rate limit exceeded');
				return;
			}

			const file = acceptedFiles[0];

			// Enhanced file validation with security checks
			const validation = validateFile(file);
			if (!validation.valid) {
				setError(validation.error || 'Invalid file');
				return;
			}

			// Record upload attempt for rate limiting
			SecurityValidator.recordUpload();

			setIsProcessing(true);

			try {
				const fileType = getFileType(file);
				if (!fileType) {
					throw new Error('Unable to determine file type');
				}

				const uploadedFile: UploadedFile = {
					id: generateFileId(),
					name: file.name,
					type: fileType,
					size: file.size,
					file: file,
					url: URL.createObjectURL(file),
				};

				// Extract page count based on file type with timeout protection
				const timeoutPromise = new Promise((_, reject) =>
					setTimeout(
						() => reject(new Error('Processing timeout')),
						SECURITY_CONFIG.UPLOAD_TIMEOUT_MS
					)
				);

				if (fileType === 'pdf') {
					try {
						const pdfViewer = new PDFViewer();
						await Promise.race([
							pdfViewer.loadDocument(file),
							timeoutPromise,
						]);
						uploadedFile.pageCount = pdfViewer.getPageCount();

						// Validate document limits
						const limitsCheck =
							SecurityValidator.validateDocumentLimits(
								uploadedFile.pageCount
							);
						if (!limitsCheck.valid) {
							pdfViewer.destroy();
							throw new Error(limitsCheck.error);
						}

						pdfViewer.destroy();
					} catch (err) {
						console.warn('Could not extract PDF page count:', err);
						if (
							err instanceof Error &&
							err.message.includes('timeout')
						) {
							throw new Error(
								SECURITY_CONFIG.ERRORS.PROCESSING_ERROR
							);
						}
						throw err;
					}
				} else {
					uploadedFile.pageCount = 0;
				}

				onFileUpload(uploadedFile);
			} catch (err) {
				setError(
					err instanceof Error
						? err.message
						: 'Failed to process file'
				);
			} finally {
				setIsProcessing(false);
			}
		},
		[onFileUpload]
	);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: {
			'application/pdf': ['.pdf'],
		},
		maxFiles: 1,
		multiple: false,
	});

	return (
		<div className='w-full max-w-4xl mx-auto'>
			{/* Hero Section */}
			<div className='text-center mb-8'>
				<div className='flex items-center justify-center mb-6'>
					<div className='relative'>
						<div className='w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg'>
							<FileText className='h-10 w-10 text-white' />
						</div>
						<div className='absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg'>
							<Upload className='h-4 w-4 text-white' />
						</div>
					</div>
				</div>
				<h1 className='text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4'>
					PDF Document Slicer
				</h1>
				<p className='text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto'>
					Upload your PDF document to split it into separate files by
					page ranges. Perfect for extracting chapters, sections, or
					specific pages.
				</p>
			</div>

			{/* Upload Area */}
			<div
				{...getRootProps()}
				className={cn(
					'relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300',
					'hover:border-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-950/20 hover:shadow-lg',
					isDragActive &&
						'border-blue-500 bg-blue-50/50 dark:bg-blue-950/20 shadow-lg transform scale-[1.02]',
					!isDragActive && 'border-gray-300 dark:border-gray-700',
					isProcessing && 'opacity-50 cursor-not-allowed'
				)}>
				<input {...getInputProps()} disabled={isProcessing} />

				<div className='flex flex-col items-center justify-center space-y-6'>
					<div className='relative'>
						<div className='w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 flex items-center justify-center'>
							<Upload className='h-12 w-12 text-blue-600 dark:text-blue-400' />
						</div>
					</div>

					<div className='space-y-3'>
						<p className='text-xl font-semibold text-gray-900 dark:text-gray-100'>
							{isDragActive
								? 'Drop your file here'
								: 'Drag & drop your PDF file'}
						</p>
						<p className='text-gray-600 dark:text-gray-400'>
							or{' '}
							<span className='text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300 transition-colors'>
								browse files
							</span>{' '}
							to upload
						</p>
					</div>

					{/* Features Grid */}
					<div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 w-full max-w-2xl'>
						<div className='flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl'>
							<CheckCircle2 className='h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0' />
							<div className='text-left'>
								<p className='text-sm font-medium text-gray-900 dark:text-gray-100'>
									PDF Support
								</p>
								<p className='text-xs text-gray-600 dark:text-gray-400'>
									All PDF versions supported
								</p>
							</div>
						</div>
						<div className='flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl'>
							<CheckCircle2 className='h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0' />
							<div className='text-left'>
								<p className='text-sm font-medium text-gray-900 dark:text-gray-100'>
									Page Previews
								</p>
								<p className='text-xs text-gray-600 dark:text-gray-400'>
									Visual page selection
								</p>
							</div>
						</div>
						<div className='flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl'>
							<CheckCircle2 className='h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0' />
							<div className='text-left'>
								<p className='text-sm font-medium text-gray-900 dark:text-gray-100'>
									Up to 50MB
								</p>
								<p className='text-xs text-gray-600 dark:text-gray-400'>
									Secure file processing
								</p>
							</div>
						</div>
					</div>
				</div>

				{isProcessing && (
					<div className='absolute inset-0 bg-white/90 dark:bg-gray-900/90 rounded-2xl flex items-center justify-center backdrop-blur-sm'>
						<div className='flex flex-col items-center space-y-4'>
							<div className='relative'>
								<div className='animate-spin rounded-full h-12 w-12 border-4 border-blue-200 dark:border-blue-800 border-t-blue-600 dark:border-t-blue-400'></div>
								<div className='absolute inset-0 flex items-center justify-center'>
									<FileText className='h-5 w-5 text-blue-600 dark:text-blue-400' />
								</div>
							</div>
							<div className='text-center'>
								<p className='text-lg font-semibold text-gray-900 dark:text-gray-100'>
									Processing file...
								</p>
								<p className='text-sm text-gray-600 dark:text-gray-400'>
									Analyzing document structure
								</p>
							</div>
						</div>
					</div>
				)}
			</div>

			{/* Security Warning */}
			{securityWarning && (
				<div className='mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl flex items-start space-x-3'>
					<AlertCircle className='h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5' />
					<div>
						<p className='text-sm font-semibold text-amber-800 dark:text-amber-200'>
							Browser Compatibility Warning
						</p>
						<p className='text-sm text-amber-700 dark:text-amber-300 mt-1'>
							{securityWarning}
						</p>
					</div>
				</div>
			)}

			{/* Error Display */}
			{error && (
				<div className='mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-start space-x-3'>
					<AlertCircle className='h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5' />
					<div>
						<p className='text-sm font-semibold text-red-800 dark:text-red-200'>
							Upload Error
						</p>
						<p className='text-sm text-red-700 dark:text-red-300 mt-1'>
							{error}
						</p>
						<p className='text-xs text-red-600 dark:text-red-400 mt-2'>
							Please try again or use a different file. Maximum
							file size is 50MB.
						</p>
					</div>
				</div>
			)}
		</div>
	);
}
