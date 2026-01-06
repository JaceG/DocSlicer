'use client';

import { useState, useCallback } from 'react';
import {
	Download,
	Loader2,
	CheckCircle,
	AlertCircle,
	Image as ImageIcon,
	Settings2,
	Archive,
} from 'lucide-react';
import { UploadedFile, PdfToImagesSettings, ImageFormat, ImageScale, ExportedImage } from '@/types';
import { cn } from '@/lib/utils/cn';
import {
	exportPdfToImages,
	downloadImage,
	downloadFile,
	DEFAULT_PDF_TO_IMAGES_SETTINGS,
} from '@/lib/pdf/pdfToImages';
import { useSubscription } from '@/lib/subscription/hooks';
import {
	getRemainingConversions,
	incrementConversionUsage,
} from '@/lib/subscription/usage';
import { useRouter } from 'next/navigation';

interface PdfToImagesManagerProps {
	file: UploadedFile;
	onReset: () => void;
}

export function PdfToImagesManager({ file, onReset }: PdfToImagesManagerProps) {
	const [settings, setSettings] = useState<PdfToImagesSettings>(DEFAULT_PDF_TO_IMAGES_SETTINGS);
	const [isProcessing, setIsProcessing] = useState(false);
	const [progress, setProgress] = useState(0);
	const [result, setResult] = useState<{
		success: boolean;
		images: ExportedImage[];
		zipUrl?: string;
		error?: string;
	} | null>(null);
	const [showSettings, setShowSettings] = useState(true);
	const [pageRangeStart, setPageRangeStart] = useState('1');
	const [pageRangeEnd, setPageRangeEnd] = useState(file.pageCount?.toString() || '1');
	const [specificPages, setSpecificPages] = useState('');
	
	const { isPremium, limits } = useSubscription();
	const router = useRouter();

	const handleExport = async () => {
		// Check usage limit for free users
		if (!isPremium) {
			const remaining = getRemainingConversions(limits.maxConversionsPerMonth);
			if (remaining <= 0) {
				alert(
					`You've reached your monthly limit of ${limits.maxConversionsPerMonth} conversions. Please upgrade to Premium for unlimited access.`
				);
				router.push('/pricing');
				return;
			}
		}

		setIsProcessing(true);
		setProgress(0);
		setResult(null);

		// Build settings with page selection
		const exportSettings: PdfToImagesSettings = {
			...settings,
		};

		if (settings.pageSelection === 'range') {
			exportSettings.pageRange = {
				start: parseInt(pageRangeStart) || 1,
				end: parseInt(pageRangeEnd) || file.pageCount || 1,
			};
		} else if (settings.pageSelection === 'specific') {
			exportSettings.specificPages = specificPages
				.split(',')
				.map(s => parseInt(s.trim()))
				.filter(n => !isNaN(n) && n > 0);
		}

		try {
			const exportResult = await exportPdfToImages(
				file,
				exportSettings,
				(p) => setProgress(p)
			);

			if (exportResult.success) {
				// Increment usage counter on success
				if (!isPremium) {
					incrementConversionUsage();
				}
			}

			setResult({
				success: exportResult.success,
				images: exportResult.images,
				zipUrl: exportResult.zipUrl,
				error: exportResult.error,
			});
		} catch (error) {
			setResult({
				success: false,
				images: [],
				error: 'An unexpected error occurred',
			});
		} finally {
			setIsProcessing(false);
		}
	};

	const handleDownloadSingle = (image: ExportedImage) => {
		downloadImage(image.dataUrl, image.fileName);
	};

	const handleDownloadAll = () => {
		if (result?.zipUrl) {
			const baseName = file.name.replace(/\.pdf$/i, '');
			downloadFile(result.zipUrl, `${baseName}_images.zip`);
		} else if (result?.images.length === 1) {
			handleDownloadSingle(result.images[0]);
		}
	};

	const getPageCount = () => {
		if (settings.pageSelection === 'all') {
			return file.pageCount || 0;
		} else if (settings.pageSelection === 'range') {
			const start = parseInt(pageRangeStart) || 1;
			const end = parseInt(pageRangeEnd) || file.pageCount || 1;
			return Math.max(0, end - start + 1);
		} else if (settings.pageSelection === 'specific') {
			return specificPages.split(',').filter(s => s.trim()).length;
		}
		return 0;
	};

	return (
		<div className="space-y-6">
			{/* File Info */}
			<div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 p-6">
				<div className="flex items-center gap-4">
					<div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
						<ImageIcon className="h-6 w-6 text-white" />
					</div>
					<div className="flex-1">
						<h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{file.name}</h3>
						<p className="text-sm text-gray-600 dark:text-gray-400">
							{file.pageCount} pages • {((file.size / 1024 / 1024).toFixed(2))} MB
						</p>
					</div>
					<button
						onClick={() => setShowSettings(!showSettings)}
						className={cn(
							'flex items-center gap-2 px-3 py-2 rounded-lg transition-colors',
							showSettings
								? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
								: 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400'
						)}
					>
						<Settings2 className="h-4 w-4" />
						<span className="text-sm">Settings</span>
					</button>
				</div>
			</div>

			{/* Settings */}
			{showSettings && !result && (
				<div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 p-6">
					<h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Export Settings</h4>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{/* Format */}
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Image Format
							</label>
							<div className="flex gap-2">
								{(['png', 'jpg', 'webp'] as ImageFormat[]).map((fmt) => (
									<button
										key={fmt}
										onClick={() => setSettings({ ...settings, format: fmt })}
										className={cn(
											'flex-1 px-4 py-2 rounded-lg font-medium transition-colors',
											settings.format === fmt
												? 'bg-cyan-500 text-white'
												: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
										)}
									>
										{fmt.toUpperCase()}
									</button>
								))}
							</div>
						</div>

						{/* Scale */}
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Resolution Scale
							</label>
							<div className="flex gap-2">
								{([1, 1.5, 2, 3] as ImageScale[]).map((sc) => (
									<button
										key={sc}
										onClick={() => setSettings({ ...settings, scale: sc })}
										className={cn(
											'flex-1 px-4 py-2 rounded-lg font-medium transition-colors',
											settings.scale === sc
												? 'bg-cyan-500 text-white'
												: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
										)}
									>
										{sc}x
									</button>
								))}
							</div>
						</div>

						{/* Quality (for JPG) */}
						{settings.format === 'jpg' && (
							<div>
								<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
									Quality ({settings.quality}%)
								</label>
								<input
									type="range"
									min="10"
									max="100"
									value={settings.quality}
									onChange={(e) => setSettings({ ...settings, quality: parseInt(e.target.value) })}
									className="w-full"
								/>
							</div>
						)}

						{/* Page Selection */}
						<div className="md:col-span-2">
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Pages to Export
							</label>
							<div className="flex gap-2 mb-3">
								{(['all', 'range', 'specific'] as const).map((sel) => (
									<button
										key={sel}
										onClick={() => setSettings({ ...settings, pageSelection: sel })}
										className={cn(
											'px-4 py-2 rounded-lg font-medium transition-colors capitalize',
											settings.pageSelection === sel
												? 'bg-cyan-500 text-white'
												: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
										)}
									>
										{sel === 'all' ? 'All Pages' : sel === 'range' ? 'Page Range' : 'Specific Pages'}
									</button>
								))}
							</div>

							{settings.pageSelection === 'range' && (
								<div className="flex items-center gap-3">
									<input
										type="number"
										min="1"
										max={file.pageCount || 1}
										value={pageRangeStart}
										onChange={(e) => setPageRangeStart(e.target.value)}
										className="w-24 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
										placeholder="Start"
									/>
									<span className="text-gray-500">to</span>
									<input
										type="number"
										min="1"
										max={file.pageCount || 1}
										value={pageRangeEnd}
										onChange={(e) => setPageRangeEnd(e.target.value)}
										className="w-24 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
										placeholder="End"
									/>
								</div>
							)}

							{settings.pageSelection === 'specific' && (
								<input
									type="text"
									value={specificPages}
									onChange={(e) => setSpecificPages(e.target.value)}
									className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
									placeholder="Enter page numbers separated by commas (e.g., 1, 3, 5, 7)"
								/>
							)}
						</div>
					</div>
				</div>
			)}

			{/* Export Button or Results */}
			<div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 p-6">
				{!result ? (
					<>
						{isProcessing && (
							<div className="mb-4">
								<div className="flex items-center justify-between mb-2">
									<span className="text-sm text-gray-600 dark:text-gray-400">Exporting pages...</span>
									<span className="text-sm font-medium text-gray-900 dark:text-gray-100">{progress}%</span>
								</div>
								<div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
									<div
										className="bg-cyan-500 h-2 rounded-full transition-all duration-300"
										style={{ width: `${progress}%` }}
									/>
								</div>
							</div>
						)}

						<button
							onClick={handleExport}
							disabled={isProcessing || getPageCount() === 0}
							className={cn(
								'w-full flex items-center justify-center gap-3 px-6 py-4 font-semibold rounded-xl transition-all duration-200 shadow-lg',
								isProcessing || getPageCount() === 0
									? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed shadow-none'
									: 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white hover:shadow-xl transform hover:-translate-y-0.5'
							)}
						>
							{isProcessing ? (
								<Loader2 className="h-5 w-5 animate-spin" />
							) : (
								<ImageIcon className="h-5 w-5" />
							)}
							<span>
								{isProcessing
									? 'Exporting...'
									: `Export ${getPageCount()} ${getPageCount() === 1 ? 'Page' : 'Pages'} as ${settings.format.toUpperCase()}`}
							</span>
						</button>
					</>
				) : result.success ? (
					<div className="space-y-4">
						<div className="flex items-center gap-3 text-green-600 dark:text-green-400">
							<CheckCircle className="h-6 w-6" />
							<span className="font-semibold">
								Exported {result.images.length} {result.images.length === 1 ? 'image' : 'images'} successfully!
							</span>
						</div>

						{/* Image Grid Preview */}
						{result.images.length > 0 && (
							<div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3 max-h-80 overflow-y-auto p-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
								{result.images.map((img) => (
									<div
										key={img.pageNumber}
										className="relative group rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700"
									>
										<img
											src={img.dataUrl}
											alt={`Page ${img.pageNumber}`}
											className="w-full aspect-[3/4] object-cover"
										/>
										<div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
											<button
												onClick={() => handleDownloadSingle(img)}
												className="p-2 bg-white rounded-full hover:bg-gray-100"
											>
												<Download className="h-4 w-4 text-gray-700" />
											</button>
										</div>
										<div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs text-center py-0.5">
											{img.pageNumber}
										</div>
									</div>
								))}
							</div>
						)}

						{/* Download Buttons */}
						<div className="flex gap-3">
							<button
								onClick={handleDownloadAll}
								className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-colors"
							>
								{result.images.length > 1 ? (
									<Archive className="h-5 w-5" />
								) : (
									<Download className="h-5 w-5" />
								)}
								<span>
									{result.images.length > 1 ? 'Download All as ZIP' : 'Download Image'}
								</span>
							</button>
							<button
								onClick={onReset}
								className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
							>
								Start Over
							</button>
						</div>
					</div>
				) : (
					<div className="space-y-4">
						<div className="flex items-center gap-3 text-red-600 dark:text-red-400">
							<AlertCircle className="h-6 w-6" />
							<span className="font-semibold">{result.error}</span>
						</div>
						<button
							onClick={() => setResult(null)}
							className="w-full px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
						>
							Try Again
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
