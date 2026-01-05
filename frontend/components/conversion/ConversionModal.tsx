'use client';

import { useState, useCallback } from 'react';
import {
	X,
	AlertTriangle,
	CheckCircle2,
	FileText,
	RefreshCw,
	ArrowRight,
	Lock,
	Sparkles,
} from 'lucide-react';
import { ConvertibleFileType, ConversionQuality } from '@/types';
import { CONVERSION_WARNINGS, getQualityColorClass, getQualityText } from '@/lib/conversion/types';
import { convertToPdf } from '@/lib/conversion/converter';
import { cn } from '@/lib/utils/cn';
import Link from 'next/link';

interface ConversionModalProps {
	isOpen: boolean;
	file: File;
	fileType: ConvertibleFileType;
	hasConversionAccess: boolean;
	onClose: () => void;
	onConversionComplete: (pdfFile: File) => void;
}

export function ConversionModal({
	isOpen,
	file,
	fileType,
	hasConversionAccess,
	onClose,
	onConversionComplete,
}: ConversionModalProps) {
	const [isConverting, setIsConverting] = useState(false);
	const [progress, setProgress] = useState(0);
	const [status, setStatus] = useState('');
	const [error, setError] = useState<string | null>(null);

	const warning = CONVERSION_WARNINGS[fileType];

	const handleConvert = useCallback(async () => {
		if (!hasConversionAccess) return;

		setIsConverting(true);
		setError(null);
		setProgress(0);

		try {
			const pdfFile = await convertToPdf(file, fileType, (prog, stat) => {
				setProgress(prog);
				setStatus(stat);
			});

			onConversionComplete(pdfFile);
		} catch (err) {
			setError(
				err instanceof Error ? err.message : 'Conversion failed. Please try again.'
			);
			setIsConverting(false);
		}
	}, [file, fileType, hasConversionAccess, onConversionComplete]);

	if (!isOpen) return null;

	const getQualityIcon = (quality: ConversionQuality) => {
		switch (quality) {
			case 'excellent':
				return <CheckCircle2 className='h-5 w-5 text-green-500' />;
			case 'good':
				return <CheckCircle2 className='h-5 w-5 text-blue-500' />;
			case 'fair':
				return <AlertTriangle className='h-5 w-5 text-amber-500' />;
			case 'poor':
				return <AlertTriangle className='h-5 w-5 text-red-500' />;
		}
	};

	const getFileTypeIcon = () => {
		const iconClass = 'h-12 w-12';
		
		if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'tiff'].includes(fileType)) {
			return (
				<div className='p-4 bg-purple-100 dark:bg-purple-900/30 rounded-2xl'>
					<svg className={cn(iconClass, 'text-purple-600 dark:text-purple-400')} viewBox='0 0 24 24' fill='none' stroke='currentColor'>
						<rect x='3' y='3' width='18' height='18' rx='2' strokeWidth='2' />
						<circle cx='8.5' cy='8.5' r='1.5' fill='currentColor' />
						<path d='M21 15l-5-5L5 21' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
					</svg>
				</div>
			);
		}

		if (['epub'].includes(fileType)) {
			return (
				<div className='p-4 bg-orange-100 dark:bg-orange-900/30 rounded-2xl'>
					<svg className={cn(iconClass, 'text-orange-600 dark:text-orange-400')} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
						<path d='M4 19.5A2.5 2.5 0 0 1 6.5 17H20' />
						<path d='M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z' />
					</svg>
				</div>
			);
		}

		if (['docx', 'doc', 'odt', 'rtf'].includes(fileType)) {
			return (
				<div className='p-4 bg-blue-100 dark:bg-blue-900/30 rounded-2xl'>
					<FileText className={cn(iconClass, 'text-blue-600 dark:text-blue-400')} />
				</div>
			);
		}

		if (['pptx', 'ppt', 'odp'].includes(fileType)) {
			return (
				<div className='p-4 bg-red-100 dark:bg-red-900/30 rounded-2xl'>
					<svg className={cn(iconClass, 'text-red-600 dark:text-red-400')} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
						<rect x='2' y='3' width='20' height='14' rx='2' />
						<path d='M8 21h8' />
						<path d='M12 17v4' />
					</svg>
				</div>
			);
		}

		return (
			<div className='p-4 bg-gray-100 dark:bg-gray-800 rounded-2xl'>
				<FileText className={cn(iconClass, 'text-gray-600 dark:text-gray-400')} />
			</div>
		);
	};

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm'>
			<div className='relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden'>
				{/* Header */}
				<div className='relative p-6 pb-4 border-b border-gray-200 dark:border-gray-700'>
					<button
						onClick={onClose}
						disabled={isConverting}
						className='absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-50'
					>
						<X className='h-5 w-5' />
					</button>

					<div className='flex items-center gap-4'>
						{getFileTypeIcon()}
						<div>
							<h2 className='text-xl font-bold text-gray-900 dark:text-white'>
								Convert to PDF
							</h2>
							<p className='text-sm text-gray-500 dark:text-gray-400'>
								{file.name}
							</p>
						</div>
					</div>
				</div>

				{/* Content */}
				<div className='p-6 space-y-6'>
					{/* No access message for non-registered users */}
					{!hasConversionAccess && (
						<div className='p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-2 border-purple-200 dark:border-purple-800 rounded-xl'>
							<div className='flex items-start gap-3'>
								<div className='bg-purple-500 rounded-full p-2 flex-shrink-0'>
									<Lock className='h-4 w-4 text-white' />
								</div>
								<div>
									<h3 className='font-bold text-purple-900 dark:text-purple-100 mb-1'>
										Premium Feature
									</h3>
									<p className='text-sm text-purple-700 dark:text-purple-300 mb-3'>
										File conversion is available to Premium subscribers. 
										Convert EPUBs, Word docs, images, and more to PDF instantly.
									</p>
									<Link
										href='/pricing'
										className='inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-colors'
									>
										<Sparkles className='h-4 w-4' />
										Upgrade to Premium — $2/month
									</Link>
								</div>
							</div>
						</div>
					)}

					{/* Quality Warning */}
					<div className={cn(
						'p-4 rounded-xl border-2',
						warning.quality === 'excellent' && 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
						warning.quality === 'good' && 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
						warning.quality === 'fair' && 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800',
						warning.quality === 'poor' && 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
					)}>
						<div className='flex items-start gap-3'>
							{getQualityIcon(warning.quality)}
							<div className='flex-1'>
								<div className='flex items-center gap-2 mb-1'>
									<h3 className='font-semibold text-gray-900 dark:text-white'>
										{warning.title}
									</h3>
									<span className={cn(
										'px-2 py-0.5 text-xs font-medium rounded-full',
										getQualityColorClass(warning.quality)
									)}>
										{getQualityText(warning.quality)}
									</span>
								</div>
								<p className='text-sm text-gray-600 dark:text-gray-300'>
									{warning.description}
								</p>
							</div>
						</div>
					</div>

					{/* Caveats List */}
					<div>
						<h4 className='text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2'>
							<AlertTriangle className='h-4 w-4 text-amber-500' />
							Things to Know Before Converting
						</h4>
						<ul className='space-y-2'>
							{warning.caveats.map((caveat, index) => (
								<li
									key={index}
									className='flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400'
								>
									<span className='text-gray-400 mt-1'>•</span>
									<span>{caveat}</span>
								</li>
							))}
						</ul>
					</div>

					{/* Error Message */}
					{error && (
						<div className='p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl'>
							<div className='flex items-start gap-3'>
								<AlertTriangle className='h-5 w-5 text-red-600 flex-shrink-0' />
								<div>
									<p className='text-sm font-medium text-red-800 dark:text-red-200'>
										Conversion Failed
									</p>
									<p className='text-sm text-red-700 dark:text-red-300 mt-1'>
										{error}
									</p>
								</div>
							</div>
						</div>
					)}

					{/* Progress Bar */}
					{isConverting && (
						<div className='space-y-2'>
							<div className='flex items-center justify-between text-sm'>
								<span className='text-gray-600 dark:text-gray-400 flex items-center gap-2'>
									<RefreshCw className='h-4 w-4 animate-spin' />
									{status}
								</span>
								<span className='font-medium text-gray-900 dark:text-white'>
									{Math.round(progress)}%
								</span>
							</div>
							<div className='h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden'>
								<div
									className='h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-300'
									style={{ width: `${progress}%` }}
								/>
							</div>
						</div>
					)}
				</div>

				{/* Footer */}
				<div className='p-6 pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-end gap-3'>
					<button
						onClick={onClose}
						disabled={isConverting}
						className='px-4 py-2 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-50'
					>
						Cancel
					</button>

					{hasConversionAccess ? (
						<button
							onClick={handleConvert}
							disabled={isConverting}
							className='flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg'
						>
							{isConverting ? (
								<>
									<RefreshCw className='h-4 w-4 animate-spin' />
									Converting...
								</>
							) : (
								<>
									Convert to PDF
									<ArrowRight className='h-4 w-4' />
								</>
							)}
						</button>
					) : (
						<Link
							href='/pricing'
							className='flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium rounded-lg transition-all shadow-lg'
						>
							<Sparkles className='h-4 w-4' />
							Upgrade to Convert
						</Link>
					)}
				</div>
			</div>
		</div>
	);
}
