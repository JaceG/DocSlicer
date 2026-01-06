'use client';

import { useState, useCallback } from 'react';
import {
	Download,
	Loader2,
	CheckCircle,
	AlertCircle,
	Trash2,
	Plus,
	GripVertical,
	RotateCw,
	FileText,
	Settings2,
} from 'lucide-react';
import { ImageFile, ImagesToPdfSettings, PageSize, PageOrientation, ImageFit } from '@/types';
import { cn } from '@/lib/utils/cn';
import {
	convertImagesToPdf,
	downloadFile,
	DEFAULT_IMAGES_TO_PDF_SETTINGS,
} from '@/lib/pdf/imagesToPdf';

interface ImagesToPdfManagerProps {
	images: ImageFile[];
	onUpdateImages: (images: ImageFile[]) => void;
	onAddMoreImages: () => void;
	onReset: () => void;
}

export function ImagesToPdfManager({
	images,
	onUpdateImages,
	onAddMoreImages,
	onReset,
}: ImagesToPdfManagerProps) {
	const [settings, setSettings] = useState<ImagesToPdfSettings>(DEFAULT_IMAGES_TO_PDF_SETTINGS);
	const [outputFileName, setOutputFileName] = useState('images-combined.pdf');
	const [isProcessing, setIsProcessing] = useState(false);
	const [progress, setProgress] = useState(0);
	const [result, setResult] = useState<{ success: boolean; url?: string; error?: string } | null>(null);
	const [showSettings, setShowSettings] = useState(false);
	const [draggedImage, setDraggedImage] = useState<string | null>(null);

	const handleRemoveImage = useCallback((imageId: string) => {
		const newImages = images
			.filter(img => img.id !== imageId)
			.map((img, index) => ({ ...img, order: index }));
		onUpdateImages(newImages);
	}, [images, onUpdateImages]);

	const handleRotateImage = useCallback((imageId: string) => {
		const newImages = images.map(img => {
			if (img.id === imageId) {
				const rotations = [0, 90, 180, 270] as const;
				const currentIndex = rotations.indexOf(img.rotation);
				const newRotation = rotations[(currentIndex + 1) % 4];
				return { ...img, rotation: newRotation };
			}
			return img;
		});
		onUpdateImages(newImages);
	}, [images, onUpdateImages]);

	const handleDragStart = useCallback((imageId: string) => {
		setDraggedImage(imageId);
	}, []);

	const handleDragOver = useCallback((e: React.DragEvent, imageId: string) => {
		e.preventDefault();
		if (draggedImage !== null && draggedImage !== imageId) {
			const fromIndex = images.findIndex(img => img.id === draggedImage);
			const toIndex = images.findIndex(img => img.id === imageId);
			if (fromIndex !== -1 && toIndex !== -1) {
				const newImages = [...images];
				const [removed] = newImages.splice(fromIndex, 1);
				newImages.splice(toIndex, 0, removed);
				const reordered = newImages.map((img, index) => ({ ...img, order: index }));
				onUpdateImages(reordered);
			}
		}
	}, [draggedImage, images, onUpdateImages]);

	const handleDragEnd = useCallback(() => {
		setDraggedImage(null);
	}, []);

	const handleConvert = async () => {
		if (images.length === 0) return;

		setIsProcessing(true);
		setProgress(0);
		setResult(null);

		try {
			const convertResult = await convertImagesToPdf(
				images.sort((a, b) => a.order - b.order),
				settings,
				outputFileName,
				(p) => setProgress(p)
			);

			if (convertResult.success && convertResult.downloadUrl) {
				setResult({
					success: true,
					url: convertResult.downloadUrl,
				});
			} else {
				setResult({
					success: false,
					error: convertResult.error || 'Failed to convert images',
				});
			}
		} catch (error) {
			setResult({
				success: false,
				error: 'An unexpected error occurred',
			});
		} finally {
			setIsProcessing(false);
		}
	};

	const handleDownload = () => {
		if (result?.url) {
			downloadFile(result.url, outputFileName);
		}
	};

	const formatFileSize = (bytes: number) => {
		if (bytes < 1024) return `${bytes} B`;
		if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
		return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
	};

	const totalSize = images.reduce((sum, img) => sum + img.size, 0);

	return (
		<div className="space-y-6">
			{/* Image List */}
			<div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
				<div className="border-b border-gray-200 dark:border-gray-800 px-6 py-4 flex items-center justify-between">
					<div>
						<h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
							Images ({images.length})
						</h3>
						<p className="text-sm text-gray-600 dark:text-gray-400">
							Drag to reorder • Total size: {formatFileSize(totalSize)}
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

				{/* Settings Panel */}
				{showSettings && (
					<div className="border-b border-gray-200 dark:border-gray-800 px-6 py-4 bg-gray-50 dark:bg-gray-800/50">
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
							<div>
								<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
									Page Size
								</label>
								<select
									value={settings.pageSize}
									onChange={(e) => setSettings({ ...settings, pageSize: e.target.value as PageSize })}
									className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
								>
									<option value="a4">A4</option>
									<option value="letter">Letter</option>
									<option value="legal">Legal</option>
									<option value="fit">Fit to Image</option>
								</select>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
									Orientation
								</label>
								<select
									value={settings.orientation}
									onChange={(e) => setSettings({ ...settings, orientation: e.target.value as PageOrientation })}
									className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
								>
									<option value="auto">Auto (match image)</option>
									<option value="portrait">Portrait</option>
									<option value="landscape">Landscape</option>
								</select>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
									Image Fit
								</label>
								<select
									value={settings.imageFit}
									onChange={(e) => setSettings({ ...settings, imageFit: e.target.value as ImageFit })}
									className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
								>
									<option value="contain">Fit (no cropping)</option>
									<option value="cover">Fill (may crop)</option>
									<option value="fill">Stretch to fill</option>
								</select>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
									Margin ({settings.margin}mm)
								</label>
								<input
									type="range"
									min="0"
									max="50"
									value={settings.margin}
									onChange={(e) => setSettings({ ...settings, margin: parseInt(e.target.value) })}
									className="w-full"
								/>
							</div>
						</div>
					</div>
				)}

				{/* Image Grid */}
				<div className="p-6">
					<div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
						{images.sort((a, b) => a.order - b.order).map((image) => (
							<div
								key={image.id}
								draggable
								onDragStart={() => handleDragStart(image.id)}
								onDragOver={(e) => handleDragOver(e, image.id)}
								onDragEnd={handleDragEnd}
								className={cn(
									'relative group rounded-lg overflow-hidden border-2 transition-all duration-200 cursor-grab active:cursor-grabbing',
									draggedImage === image.id
										? 'scale-105 shadow-xl z-10 border-orange-500'
										: 'border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-600'
								)}
							>
								{/* Drag Handle */}
								<div className="absolute top-1 left-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
									<GripVertical className="h-4 w-4 text-white drop-shadow-lg" />
								</div>

								{/* Thumbnail */}
								<div
									className="w-full aspect-square bg-gray-100 dark:bg-gray-800"
									style={{ transform: `rotate(${image.rotation}deg)` }}
								>
									{image.thumbnail ? (
										<img
											src={image.thumbnail}
											alt={image.name}
											className="w-full h-full object-cover"
											draggable={false}
										/>
									) : (
										<div className="w-full h-full flex items-center justify-center">
											<FileText className="h-8 w-8 text-gray-400" />
										</div>
									)}
								</div>

								{/* Order Badge */}
								<div className="absolute top-1 right-1 bg-black/60 text-white text-xs px-1.5 py-0.5 rounded">
									{image.order + 1}
								</div>

								{/* Rotation Badge */}
								{image.rotation !== 0 && (
									<div className="absolute bottom-8 right-1 bg-blue-500 text-white text-[10px] px-1 rounded">
										{image.rotation}°
									</div>
								)}

								{/* File Name */}
								<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/75 to-transparent text-white text-xs p-1.5 truncate">
									{image.name}
								</div>

								{/* Action Buttons */}
								<div className="absolute top-6 right-1 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
									<button
										onClick={() => handleRotateImage(image.id)}
										className="p-1 bg-white dark:bg-gray-800 rounded shadow hover:bg-blue-50 dark:hover:bg-blue-900/30"
										title="Rotate"
									>
										<RotateCw className="h-3 w-3 text-gray-600 dark:text-gray-300" />
									</button>
									<button
										onClick={() => handleRemoveImage(image.id)}
										className="p-1 bg-white dark:bg-gray-800 rounded shadow hover:bg-red-50 dark:hover:bg-red-900/30"
										title="Remove"
									>
										<Trash2 className="h-3 w-3 text-gray-600 dark:text-gray-300" />
									</button>
								</div>
							</div>
						))}

						{/* Add More Button */}
						<button
							onClick={onAddMoreImages}
							className="flex flex-col items-center justify-center aspect-square border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-orange-400 dark:hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/10 transition-colors"
						>
							<Plus className="h-6 w-6 text-gray-400 mb-1" />
							<span className="text-xs text-gray-500 dark:text-gray-400">Add More</span>
						</button>
					</div>
				</div>
			</div>

			{/* Output & Convert */}
			<div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 p-6">
				{!result ? (
					<>
						<div className="mb-4">
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Output Filename
							</label>
							<input
								type="text"
								value={outputFileName}
								onChange={(e) => setOutputFileName(e.target.value)}
								disabled={isProcessing}
								className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:opacity-50"
							/>
						</div>

						{isProcessing && (
							<div className="mb-4">
								<div className="flex items-center justify-between mb-2">
									<span className="text-sm text-gray-600 dark:text-gray-400">Converting...</span>
									<span className="text-sm font-medium text-gray-900 dark:text-gray-100">{progress}%</span>
								</div>
								<div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
									<div
										className="bg-orange-500 h-2 rounded-full transition-all duration-300"
										style={{ width: `${progress}%` }}
									/>
								</div>
							</div>
						)}

						<button
							onClick={handleConvert}
							disabled={images.length === 0 || isProcessing}
							className={cn(
								'w-full flex items-center justify-center gap-3 px-6 py-4 font-semibold rounded-xl transition-all duration-200 shadow-lg',
								images.length === 0 || isProcessing
									? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed shadow-none'
									: 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white hover:shadow-xl transform hover:-translate-y-0.5'
							)}
						>
							{isProcessing ? (
								<Loader2 className="h-5 w-5 animate-spin" />
							) : (
								<FileText className="h-5 w-5" />
							)}
							<span>
								{isProcessing ? 'Converting...' : `Create PDF (${images.length} images)`}
							</span>
						</button>
					</>
				) : result.success ? (
					<div className="space-y-4">
						<div className="flex items-center gap-3 text-green-600 dark:text-green-400">
							<CheckCircle className="h-6 w-6" />
							<span className="font-semibold">PDF created successfully!</span>
						</div>
						<div className="flex gap-3">
							<button
								onClick={handleDownload}
								className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-colors"
							>
								<Download className="h-5 w-5" />
								<span>Download PDF</span>
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
