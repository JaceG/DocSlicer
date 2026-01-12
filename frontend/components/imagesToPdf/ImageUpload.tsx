'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import {
	Upload,
	Image as ImageIcon,
	AlertTriangle,
	FileStack,
	GripVertical,
	Settings2,
	CheckCircle2,
} from 'lucide-react';
import { ImageFile } from '@/types';
import { cn } from '@/lib/utils/cn';
import { createImageThumbnail } from '@/lib/pdf/imagesToPdf';

interface ImageUploadProps {
	onImagesUpload: (images: ImageFile[]) => void;
	existingImages?: ImageFile[];
}

const ACCEPTED_TYPES = {
	'image/jpeg': ['.jpg', '.jpeg'],
	'image/png': ['.png'],
	'image/gif': ['.gif'],
	'image/webp': ['.webp'],
	'image/bmp': ['.bmp'],
};

export function ImageUpload({
	onImagesUpload,
	existingImages = [],
}: ImageUploadProps) {
	const [error, setError] = useState<string | null>(null);
	const [isProcessing, setIsProcessing] = useState(false);

	const onDrop = useCallback(
		async (acceptedFiles: File[]) => {
			if (acceptedFiles.length === 0) return;

			setIsProcessing(true);
			setError(null);

			try {
				const startOrder = existingImages.length;
				const newImages: ImageFile[] = [];

				for (let i = 0; i < acceptedFiles.length; i++) {
					const file = acceptedFiles[i];

					try {
						// Create thumbnail
						const thumbnail = await createImageThumbnail(file);

						// Get dimensions
						const dimensions = await new Promise<{
							width: number;
							height: number;
						}>((resolve) => {
							const img = new Image();
							img.onload = () =>
								resolve({
									width: img.width,
									height: img.height,
								});
							img.src = URL.createObjectURL(file);
						});

						newImages.push({
							id: `img-${Date.now()}-${i}`,
							name: file.name,
							file: file,
							size: file.size,
							width: dimensions.width,
							height: dimensions.height,
							order: startOrder + i,
							thumbnail,
							rotation: 0,
						});
					} catch (imgError) {
						console.warn(
							`Failed to process ${file.name}:`,
							imgError
						);
					}
				}

				if (newImages.length > 0) {
					onImagesUpload([...existingImages, ...newImages]);
				}
			} catch (err) {
				console.error('Failed to process images:', err);
				setError('Failed to process some images. Please try again.');
			} finally {
				setIsProcessing(false);
			}
		},
		[existingImages, onImagesUpload]
	);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: ACCEPTED_TYPES,
		disabled: isProcessing,
	});

	return (
		<div className='space-y-6'>
			{/* Feature Description */}
			<div className='bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 border-2 border-orange-200 dark:border-orange-800 rounded-xl p-6'>
				<div className='flex items-start gap-4'>
					<div className='bg-orange-500 rounded-full p-3 flex-shrink-0'>
						<ImageIcon className='w-6 h-6 text-white' />
					</div>
					<div>
						<h3 className='text-lg font-bold text-gray-900 dark:text-white mb-2'>
							🖼️ Images to PDF
						</h3>
						<p className='text-gray-700 dark:text-gray-300 mb-2'>
							Convert your images into a professional PDF
							document. Perfect for creating photo albums,
							presentations, or archiving scans.
						</p>
						<ul className='text-sm text-gray-600 dark:text-gray-400 space-y-1'>
							<li>• Supports JPG, PNG, GIF, WebP, and BMP</li>
							<li>• Drag to reorder images</li>
							<li>• Customize page size and orientation</li>
						</ul>
					</div>
				</div>
			</div>

			{/* Drop Zone */}
			<div
				{...getRootProps()}
				className={cn(
					'relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-200 cursor-pointer',
					isDragActive
						? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
						: 'border-gray-300 dark:border-gray-700 hover:border-orange-400 dark:hover:border-orange-600 hover:bg-gray-50 dark:hover:bg-gray-800/50',
					isProcessing && 'pointer-events-none opacity-60'
				)}>
				<input {...getInputProps()} />

				{isProcessing ? (
					<div className='flex flex-col items-center'>
						<div className='animate-pulse'>
							<ImageIcon className='h-12 w-12 text-orange-500 mb-4' />
						</div>
						<p className='text-lg font-medium text-gray-900 dark:text-gray-100'>
							Processing images...
						</p>
					</div>
				) : isDragActive ? (
					<div className='flex flex-col items-center'>
						<Upload className='h-12 w-12 text-orange-500 mb-4' />
						<p className='text-lg font-medium text-gray-900 dark:text-gray-100'>
							Drop your images here
						</p>
					</div>
				) : (
					<div className='flex flex-col items-center'>
						<div className='w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg'>
							<ImageIcon className='h-8 w-8 text-white' />
						</div>
						<p className='text-lg font-medium text-gray-900 dark:text-gray-100 mb-2'>
							{existingImages.length > 0
								? 'Drag & drop to add more images'
								: 'Drag & drop your images'}
						</p>
						<p className='text-gray-600 dark:text-gray-400 mb-1'>
							or{' '}
							<span className='text-blue-600 dark:text-blue-400 font-medium underline'>
								browse files
							</span>{' '}
							to upload
						</p>
						<p className='text-sm text-gray-500 dark:text-gray-500 mb-6'>
							JPG, PNG, GIF, WebP, BMP • Multiple files supported
						</p>

						{/* Features Grid */}
						<div className='grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-2xl'>
							<div className='flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl'>
								<FileStack className='h-5 w-5 text-orange-600 dark:text-orange-400 flex-shrink-0' />
								<div className='text-left'>
									<p className='text-sm font-medium text-gray-900 dark:text-gray-100'>
										Batch Upload
									</p>
									<p className='text-xs text-gray-600 dark:text-gray-400'>
										Multiple at once
									</p>
								</div>
							</div>
							<div className='flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl'>
								<GripVertical className='h-5 w-5 text-orange-600 dark:text-orange-400 flex-shrink-0' />
								<div className='text-left'>
									<p className='text-sm font-medium text-gray-900 dark:text-gray-100'>
										Reorder
									</p>
									<p className='text-xs text-gray-600 dark:text-gray-400'>
										Drag and drop
									</p>
								</div>
							</div>
							<div className='flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl'>
								<Settings2 className='h-5 w-5 text-orange-600 dark:text-orange-400 flex-shrink-0' />
								<div className='text-left'>
									<p className='text-sm font-medium text-gray-900 dark:text-gray-100'>
										Page Settings
									</p>
									<p className='text-xs text-gray-600 dark:text-gray-400'>
										Size & orientation
									</p>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>

			{/* Error Message */}
			{error && (
				<div className='flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg'>
					<AlertTriangle className='h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5' />
					<p className='text-sm text-red-700 dark:text-red-300'>
						{error}
					</p>
				</div>
			)}
		</div>
	);
}
