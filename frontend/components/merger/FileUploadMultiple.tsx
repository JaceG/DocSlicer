'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, AlertCircle, CheckCircle2, Layers } from 'lucide-react';
import { MergeFile } from '@/types';
import { useSubscription } from '@/lib/subscription/hooks';
import { PDFDocument } from 'pdf-lib';

interface FileUploadMultipleProps {
	onFilesUpload: (files: MergeFile[]) => void;
	existingFiles: MergeFile[];
}

export function FileUploadMultiple({
	onFilesUpload,
	existingFiles,
}: FileUploadMultipleProps) {
	const [isProcessing, setIsProcessing] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const { isPremium, limits } = useSubscription();

	const processFiles = async (acceptedFiles: File[]): Promise<MergeFile[]> => {
		const mergeFiles: MergeFile[] = [];
		const startOrder = existingFiles.length;

		for (let i = 0; i < acceptedFiles.length; i++) {
			const file = acceptedFiles[i];

			// Check file size
			const fileSizeMB = file.size / (1024 * 1024);
			if (fileSizeMB > (limits?.maxFileSizeMB || 25)) {
				throw new Error(
					`File "${file.name}" exceeds the ${limits?.maxFileSizeMB || 25}MB limit`
				);
			}

			// Get page count
			let pageCount: number | undefined;
			try {
				const arrayBuffer = await file.arrayBuffer();
				const pdf = await PDFDocument.load(arrayBuffer);
				pageCount = pdf.getPageCount();
			} catch (err) {
				console.warn(`Could not get page count for ${file.name}:`, err);
			}

			mergeFiles.push({
				id: `merge-file-${Date.now()}-${i}`,
				name: file.name,
				file,
				size: file.size,
				pageCount,
				order: startOrder + i,
			});
		}

		return mergeFiles;
	};

	const onDrop = useCallback(
		async (acceptedFiles: File[]) => {
			if (acceptedFiles.length === 0) return;

			setIsProcessing(true);
			setError(null);

			try {
				// Filter for PDF files only
				const pdfFiles = acceptedFiles.filter(
					(file) =>
						file.type === 'application/pdf' ||
						file.name.toLowerCase().endsWith('.pdf')
				);

				if (pdfFiles.length === 0) {
					setError('Please upload PDF files only for merging');
					return;
				}

				if (pdfFiles.length !== acceptedFiles.length) {
					setError(
						`${acceptedFiles.length - pdfFiles.length} non-PDF files were skipped`
					);
				}

				const newFiles = await processFiles(pdfFiles);
				onFilesUpload([...existingFiles, ...newFiles]);
			} catch (err) {
				setError(err instanceof Error ? err.message : 'Failed to process files');
			} finally {
				setIsProcessing(false);
			}
		},
		[existingFiles, onFilesUpload, limits]
	);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: {
			'application/pdf': ['.pdf'],
		},
		multiple: true,
		disabled: isProcessing,
	});

	return (
		<div className='w-full max-w-4xl mx-auto'>
			<div
				{...getRootProps()}
				className={`
					relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer
					transition-all duration-300 hover:border-blue-400 hover:bg-blue-50/50
					dark:hover:bg-blue-950/20 hover:shadow-lg
					${isDragActive ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30 shadow-xl scale-[1.02]' : 'border-gray-300 dark:border-gray-700'}
					${isProcessing ? 'opacity-50 cursor-wait' : ''}
				`}>
				<input {...getInputProps()} />

				<div className='flex flex-col items-center justify-center space-y-6'>
					{/* Upload Icon */}
					<div
						className={`
						w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-300
						${isDragActive ? 'bg-blue-500 scale-110' : 'bg-gradient-to-br from-blue-500 to-indigo-600'}
					`}>
						<Layers className='h-10 w-10 text-white' />
					</div>

					{/* Main Text */}
					<div>
						<h3 className='text-xl font-bold text-gray-900 dark:text-gray-100'>
							{isDragActive
								? 'Drop your PDFs here'
								: existingFiles.length > 0
								? 'Add more PDFs to merge'
								: 'Select PDFs to Merge'}
						</h3>
						<p className='text-gray-600 dark:text-gray-400 mt-2'>
							{existingFiles.length > 0 ? (
								<>
									{existingFiles.length} file
									{existingFiles.length !== 1 ? 's' : ''} selected
									{' • '}
									<span className='text-blue-600 dark:text-blue-400 font-medium underline'>
										add more
									</span>
								</>
							) : (
								<>
									or{' '}
									<span className='text-blue-600 dark:text-blue-400 font-medium underline'>
										browse files
									</span>{' '}
									to upload
								</>
							)}
						</p>
						<p className='text-sm text-gray-500 dark:text-gray-500 mt-1'>
							Select multiple PDF files to combine
						</p>
					</div>

					{/* Features Grid */}
					<div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 w-full max-w-2xl'>
						<div className='flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl'>
							<CheckCircle2 className='h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0' />
							<div className='text-left'>
								<p className='text-sm font-medium text-gray-900 dark:text-gray-100'>
									Multiple PDFs
								</p>
								<p className='text-xs text-gray-600 dark:text-gray-400'>
									Select many at once
								</p>
							</div>
						</div>

						<div className='flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl'>
							<CheckCircle2 className='h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0' />
							<div className='text-left'>
								<p className='text-sm font-medium text-gray-900 dark:text-gray-100'>
									Custom Order
								</p>
								<p className='text-xs text-gray-600 dark:text-gray-400'>
									Drag to reorder
								</p>
							</div>
						</div>

						<div className='flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl'>
							<CheckCircle2 className='h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0' />
							<div className='text-left'>
								<p className='text-sm font-medium text-gray-900 dark:text-gray-100'>
									Up to {limits?.maxFileSizeMB || 25}MB
								</p>
								<p className='text-xs text-gray-600 dark:text-gray-400'>
									{isPremium ? 'Per file' : '100MB with Premium'}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Error State */}
			{error && (
				<div className='mt-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4'>
					<div className='flex items-start space-x-3'>
						<AlertCircle className='h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5' />
						<div>
							<p className='text-sm font-medium text-red-800 dark:text-red-200'>
								{error}
							</p>
							<p className='text-xs text-red-600 dark:text-red-400 mt-1'>
								Please check your files and try again.
							</p>
						</div>
					</div>
				</div>
			)}

			{/* Processing State */}
			{isProcessing && (
				<div className='mt-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4'>
					<div className='flex items-center space-x-3'>
						<div className='animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600'></div>
						<p className='text-sm font-medium text-blue-800 dark:text-blue-200'>
							Processing files...
						</p>
					</div>
				</div>
			)}
		</div>
	);
}
