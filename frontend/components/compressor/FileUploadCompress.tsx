'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import {
	FileDown,
	UploadCloud,
	XCircle,
	CheckCircle2,
	Zap,
	Shield,
	Lock,
	Sparkles,
	Loader2,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { CompressFile } from '@/types';
import { PDFDocument } from 'pdf-lib';
import { useSubscription } from '@/lib/subscription/hooks';
import { getRemainingCompressions } from '@/lib/subscription/usage';
import Link from 'next/link';

interface FileUploadCompressProps {
	onFileUpload: (file: CompressFile) => void;
}

export function FileUploadCompress({ onFileUpload }: FileUploadCompressProps) {
	const [isProcessing, setIsProcessing] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const { isPremium, limits, isLoaded } = useSubscription();

	const compressionsRemaining = isLoaded
		? getRemainingCompressions(limits.maxCompressionsPerMonth)
		: limits.maxCompressionsPerMonth; // Default to limit when not loaded
	const hasCompressAccess = !isLoaded || isPremium || compressionsRemaining > 0;

	const onDrop = useCallback(
		async (acceptedFiles: File[]) => {
			setError(null);
			setIsProcessing(true);

			const file = acceptedFiles[0];
			if (!file) {
				setIsProcessing(false);
				return;
			}

			// Check if it's a PDF
			if (file.type !== 'application/pdf') {
				setError('Only PDF files can be compressed.');
				setIsProcessing(false);
				return;
			}

			// Check file size
			if (file.size > limits.maxFileSizeMB * 1024 * 1024) {
				setError(
					`File exceeds ${limits.maxFileSizeMB}MB limit. ${
						isPremium ? '' : 'Upgrade to Premium for 100MB limit.'
					}`
				);
				setIsProcessing(false);
				return;
			}

			try {
				// Read and validate PDF
				const arrayBuffer = await file.arrayBuffer();
				const pdfDoc = await PDFDocument.load(arrayBuffer);
				const pageCount = pdfDoc.getPageCount();

				const compressFile: CompressFile = {
					id: `compress-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
					name: file.name,
					file,
					size: file.size,
					pageCount,
				};

				onFileUpload(compressFile);
			} catch (e) {
				console.error('Error processing PDF:', e);
				setError('Failed to read PDF. Is it a valid PDF file?');
			} finally {
				setIsProcessing(false);
			}
		},
		[onFileUpload, limits, isPremium]
	);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: {
			'application/pdf': ['.pdf'],
		},
		multiple: false,
		disabled: isProcessing || !hasCompressAccess,
	});

	return (
		<div className='w-full max-w-4xl mx-auto space-y-8'>
			{/* Tool Description */}
			<div className='bg-gradient-to-r from-lime-50 to-green-50 dark:from-lime-900/20 dark:to-green-900/20 border-2 border-lime-200 dark:border-lime-800 rounded-xl p-6'>
				<div className='flex items-start gap-4'>
					<div className='bg-lime-500 rounded-full p-3 flex-shrink-0'>
						<FileDown className='w-6 h-6 text-white' />
					</div>
					<div>
						<h3 className='text-lg font-bold text-gray-900 dark:text-white mb-2'>
							📦 Compress PDF
						</h3>
						<p className='text-gray-700 dark:text-gray-300 mb-2'>
							Reduce PDF file size while maintaining quality. Perfect for email attachments, web uploads, or saving storage space.
						</p>
						<ul className='text-sm text-gray-600 dark:text-gray-400 space-y-1'>
							<li>• <strong>Multiple levels</strong> – Screen, ebook, or print quality</li>
							<li>• <strong>100% private</strong> – Compression happens locally in your browser</li>
							<li>• <strong>Fast processing</strong> – Results in seconds, not minutes</li>
						</ul>
					</div>
				</div>
			</div>

			{/* Limit Reached Warning */}
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
								You've used your {limits.maxCompressionsPerMonth} free
								compressions this month. Upgrade for unlimited access!
							</p>
							<Link
								href='/pricing'
								className='inline-flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium rounded-lg transition-colors'
							>
								<Sparkles className='h-4 w-4' />
								Upgrade to Premium — $2/month
							</Link>
						</div>
					</div>
				</div>
			)}

			{/* Dropzone */}
			<div
				{...getRootProps()}
				className={cn(
					'relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 hover:border-green-400 hover:bg-green-50/50 dark:hover:bg-green-950/20 hover:shadow-lg',
					isDragActive
						? 'border-green-500 bg-green-50 dark:bg-green-950/20'
						: 'border-gray-300 dark:border-gray-700',
					isProcessing && 'cursor-not-allowed opacity-70',
					!hasCompressAccess && 'cursor-not-allowed opacity-70'
				)}
			>
				<input {...getInputProps()} />
				<div className='flex flex-col items-center justify-center space-y-6'>
					<div className='p-4 bg-green-100 dark:bg-green-900/30 rounded-full'>
						<FileDown className='h-10 w-10 text-green-600 dark:text-green-400' />
					</div>
					<div className='space-y-2'>
						<p className='text-2xl font-bold text-gray-900 dark:text-gray-100'>
							{isDragActive
								? 'Drop your PDF here...'
								: 'Drag & drop your PDF to compress'}
						</p>
						<p className='text-gray-600 dark:text-gray-400'>
							or{' '}
							<span className='text-blue-600 dark:text-blue-400 font-medium underline'>
								browse files
							</span>{' '}
							to upload
						</p>
						<p className='text-sm text-gray-500 dark:text-gray-500'>
							Reduce file size while maintaining quality
						</p>
					</div>

					{error && (
						<div className='flex items-center space-x-2 text-red-600 dark:text-red-400'>
							<XCircle className='h-5 w-5' />
							<p className='text-sm font-medium'>{error}</p>
						</div>
					)}

					{isProcessing && (
						<div className='flex items-center space-x-2 text-green-600 dark:text-green-400'>
							<Loader2 className='h-5 w-5 animate-spin' />
							<p className='text-sm font-medium'>Processing PDF...</p>
						</div>
					)}

					{/* Features Grid */}
					<div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 w-full max-w-2xl'>
						<div className='flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl'>
							<CheckCircle2 className='h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0' />
							<div className='text-left'>
								<p className='text-sm font-medium text-gray-900 dark:text-gray-100'>
									Multiple Levels
								</p>
								<p className='text-xs text-gray-600 dark:text-gray-400'>
									Screen, Ebook, Printer
								</p>
							</div>
						</div>
						<div className='flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl'>
							<Zap className='h-5 w-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0' />
							<div className='text-left'>
								<p className='text-sm font-medium text-gray-900 dark:text-gray-100'>
									Fast Processing
								</p>
								<p className='text-xs text-gray-600 dark:text-gray-400'>
									Seconds, not minutes
								</p>
							</div>
						</div>
						<div className='flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl'>
							<CheckCircle2 className='h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0' />
							<div className='text-left'>
								<p className='text-sm font-medium text-gray-900 dark:text-gray-100'>
									Up to {limits?.maxFileSizeMB || 25}MB
								</p>
								{!isPremium && (
									<p className='text-xs text-gray-600 dark:text-gray-400'>
										100MB with Premium
									</p>
								)}
								{isPremium && (
									<p className='text-xs text-gray-600 dark:text-gray-400'>
										Premium enabled
									</p>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
