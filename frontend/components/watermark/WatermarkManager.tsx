'use client';

import { useState, useCallback, useRef } from 'react';
import { Droplet, Download, Type, Image as ImageIcon, CheckCircle, AlertCircle, Upload } from 'lucide-react';
import { UploadedFile, WatermarkSettings, WatermarkPosition } from '@/types';
import { addWatermark, downloadWatermarkedPdf, cleanupWatermarkedBlobStoreEntry } from '@/lib/pdf/watermark';
import { cn } from '@/lib/utils/cn';
import { useSubscription } from '@/lib/subscription/hooks';
import { getRemainingWatermark, incrementWatermarkUsage } from '@/lib/subscription/usage';
import { useRouter } from 'next/navigation';

interface WatermarkManagerProps {
	file: UploadedFile;
	onComplete?: () => void;
}

const POSITIONS: { value: WatermarkPosition; label: string }[] = [
	{ value: 'center', label: 'Center' },
	{ value: 'diagonal', label: 'Diagonal' },
	{ value: 'top-left', label: 'Top Left' },
	{ value: 'top-right', label: 'Top Right' },
	{ value: 'bottom-left', label: 'Bottom Left' },
	{ value: 'bottom-right', label: 'Bottom Right' },
];

export function WatermarkManager({ file, onComplete }: WatermarkManagerProps) {
	const [watermarkType, setWatermarkType] = useState<'text' | 'image'>('text');
	const [textSettings, setTextSettings] = useState({
		text: 'CONFIDENTIAL',
		fontSize: 48,
		fontColor: '#ff0000',
		opacity: 30,
		rotation: 0,
		position: 'diagonal' as WatermarkPosition,
	});
	const [imageSettings, setImageSettings] = useState({
		imageFile: null as File | null,
		imagePreview: '',
		width: 30,
		opacity: 30,
		position: 'center' as WatermarkPosition,
	});

	const [isProcessing, setIsProcessing] = useState(false);
	const [progress, setProgress] = useState(0);
	const [result, setResult] = useState<{ url: string; blobKey: string } | null>(null);
	const [error, setError] = useState<string | null>(null);
	
	const { isPremium, limits } = useSubscription();
	const router = useRouter();

	const imageInputRef = useRef<HTMLInputElement>(null);

	const handleImageSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = e.target.files?.[0];
		if (selectedFile) {
			if (!['image/png', 'image/jpeg', 'image/jpg'].includes(selectedFile.type)) {
				setError('Please select a PNG or JPG image');
				return;
			}
			setImageSettings({
				...imageSettings,
				imageFile: selectedFile,
				imagePreview: URL.createObjectURL(selectedFile),
			});
			setError(null);
		}
	}, [imageSettings]);

	const handleAddWatermark = useCallback(async () => {
		// Check usage limit for free users
		if (!isPremium) {
			const remaining = getRemainingWatermark(limits.maxWatermarkPerMonth);
			if (remaining <= 0) {
				alert(
					`You've reached your monthly limit of ${limits.maxWatermarkPerMonth} watermark operations. Please upgrade to Premium for unlimited access.`
				);
				router.push('/pricing');
				return;
			}
		}

		setIsProcessing(true);
		setError(null);
		setProgress(0);

		try {
			let settings: WatermarkSettings;

			if (watermarkType === 'text') {
				if (!textSettings.text.trim()) {
					throw new Error('Please enter watermark text');
				}
				settings = {
					type: 'text',
					...textSettings,
				};
			} else {
				if (!imageSettings.imageFile) {
					throw new Error('Please select a watermark image');
				}
				settings = {
					type: 'image',
					imageFile: imageSettings.imageFile,
					width: imageSettings.width,
					opacity: imageSettings.opacity,
					position: imageSettings.position,
				};
			}

			const watermarkedResult = await addWatermark(file.file, settings, setProgress);
			// Increment usage counter on success
			if (!isPremium) {
				incrementWatermarkUsage();
			}
			setResult(watermarkedResult);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Failed to add watermark');
		} finally {
			setIsProcessing(false);
		}
	}, [file, watermarkType, textSettings, imageSettings, isPremium, limits, router]);

	const handleDownload = useCallback(() => {
		if (result) {
			const fileName = file.name.replace('.pdf', '_watermarked.pdf');
			downloadWatermarkedPdf(result.url, fileName);
		}
	}, [result, file.name]);

	const handleReset = useCallback(() => {
		if (result) {
			cleanupWatermarkedBlobStoreEntry(result.blobKey);
		}
		setResult(null);
		setProgress(0);
		setError(null);
	}, [result]);

	if (result) {
		return (
			<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
				<div className="text-center">
					<div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
						<CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
					</div>
					<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
						Watermark Added Successfully!
					</h3>
					<p className="text-gray-600 dark:text-gray-400 mb-6">
						Your PDF now has a watermark on all pages.
					</p>

					<div className="flex justify-center gap-3">
						<button
							onClick={handleDownload}
							className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
						>
							<Download className="w-5 h-5" />
							Download Watermarked PDF
						</button>
						<button
							onClick={handleReset}
							className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
						>
							Add Another
						</button>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
			<div className="flex items-center gap-3 mb-6">
				<div className="w-10 h-10 bg-violet-100 dark:bg-violet-900/30 rounded-lg flex items-center justify-center">
					<Droplet className="w-5 h-5 text-violet-600 dark:text-violet-400" />
				</div>
				<div>
					<h2 className="text-lg font-semibold text-gray-900 dark:text-white">
						Add Watermark
					</h2>
					<p className="text-sm text-gray-500 dark:text-gray-400">
						{file.name}
					</p>
				</div>
			</div>

			<div className="space-y-6">
				{/* Watermark Type Toggle */}
				<div className="flex gap-2">
					<button
						onClick={() => setWatermarkType('text')}
						className={cn(
							'flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-colors',
							watermarkType === 'text'
								? 'bg-violet-600 text-white'
								: 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
						)}
					>
						<Type className="w-5 h-5" />
						Text Watermark
					</button>
					<button
						onClick={() => setWatermarkType('image')}
						className={cn(
							'flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-colors',
							watermarkType === 'image'
								? 'bg-violet-600 text-white'
								: 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
						)}
					>
						<ImageIcon className="w-5 h-5" />
						Image Watermark
					</button>
				</div>

				{watermarkType === 'text' ? (
					<>
						{/* Text Input */}
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Watermark Text
							</label>
							<input
								type="text"
								value={textSettings.text}
								onChange={(e) => setTextSettings({ ...textSettings, text: e.target.value })}
								placeholder="Enter watermark text"
								className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-violet-500 focus:border-transparent"
							/>
						</div>

						{/* Font Size & Color */}
						<div className="grid grid-cols-2 gap-4">
							<div>
								<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
									Font Size: {textSettings.fontSize}px
								</label>
								<input
									type="range"
									min="12"
									max="120"
									value={textSettings.fontSize}
									onChange={(e) => setTextSettings({ ...textSettings, fontSize: parseInt(e.target.value) })}
									className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
									Color
								</label>
								<input
									type="color"
									value={textSettings.fontColor}
									onChange={(e) => setTextSettings({ ...textSettings, fontColor: e.target.value })}
									className="w-full h-10 rounded-lg cursor-pointer"
								/>
							</div>
						</div>

						{/* Opacity */}
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Opacity: {textSettings.opacity}%
							</label>
							<input
								type="range"
								min="5"
								max="100"
								value={textSettings.opacity}
								onChange={(e) => setTextSettings({ ...textSettings, opacity: parseInt(e.target.value) })}
								className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
							/>
						</div>

						{/* Position */}
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Position
							</label>
							<div className="grid grid-cols-3 gap-2">
								{POSITIONS.map(({ value, label }) => (
									<button
										key={value}
										onClick={() => setTextSettings({ ...textSettings, position: value })}
										className={cn(
											'py-2 px-3 rounded-lg border text-sm font-medium transition-colors',
											textSettings.position === value
												? 'border-violet-500 bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-400'
												: 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300'
										)}
									>
										{label}
									</button>
								))}
							</div>
						</div>
					</>
				) : (
					<>
						{/* Image Upload */}
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Watermark Image
							</label>
							<input
								ref={imageInputRef}
								type="file"
								accept="image/png,image/jpeg,image/jpg"
								onChange={handleImageSelect}
								className="hidden"
							/>
							{imageSettings.imagePreview ? (
								<div className="relative p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
									<img
										src={imageSettings.imagePreview}
										alt="Watermark preview"
										className="max-h-32 mx-auto"
									/>
									<button
										onClick={() => imageInputRef.current?.click()}
										className="mt-2 text-sm text-violet-600 hover:text-violet-700 w-full text-center"
									>
										Change Image
									</button>
								</div>
							) : (
								<button
									onClick={() => imageInputRef.current?.click()}
									className="w-full py-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-violet-500 transition-colors"
								>
									<Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
									<span className="text-sm text-gray-500">Click to upload PNG or JPG</span>
								</button>
							)}
						</div>

						{/* Width */}
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Size: {imageSettings.width}% of page width
							</label>
							<input
								type="range"
								min="5"
								max="80"
								value={imageSettings.width}
								onChange={(e) => setImageSettings({ ...imageSettings, width: parseInt(e.target.value) })}
								className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
							/>
						</div>

						{/* Opacity */}
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Opacity: {imageSettings.opacity}%
							</label>
							<input
								type="range"
								min="5"
								max="100"
								value={imageSettings.opacity}
								onChange={(e) => setImageSettings({ ...imageSettings, opacity: parseInt(e.target.value) })}
								className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
							/>
						</div>

						{/* Position */}
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Position
							</label>
							<div className="grid grid-cols-3 gap-2">
								{POSITIONS.map(({ value, label }) => (
									<button
										key={value}
										onClick={() => setImageSettings({ ...imageSettings, position: value })}
										className={cn(
											'py-2 px-3 rounded-lg border text-sm font-medium transition-colors',
											imageSettings.position === value
												? 'border-violet-500 bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-400'
												: 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300'
										)}
									>
										{label}
									</button>
								))}
							</div>
						</div>
					</>
				)}

				{/* Error Message */}
				{error && (
					<div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg">
						<AlertCircle className="w-5 h-5 flex-shrink-0" />
						<span className="text-sm">{error}</span>
					</div>
				)}

				{/* Progress */}
				{isProcessing && (
					<div className="space-y-2">
						<div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
							<span>Adding watermark...</span>
							<span>{progress}%</span>
						</div>
						<div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
							<div
								className="h-full bg-violet-500 transition-all duration-300"
								style={{ width: `${progress}%` }}
							/>
						</div>
					</div>
				)}

				{/* Action Button */}
				<button
					onClick={handleAddWatermark}
					disabled={isProcessing || (watermarkType === 'text' && !textSettings.text) || (watermarkType === 'image' && !imageSettings.imageFile)}
					className={cn(
						'w-full flex items-center justify-center gap-2 py-3 rounded-lg font-semibold transition-colors',
						isProcessing
							? 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
							: 'bg-violet-600 text-white hover:bg-violet-700'
					)}
				>
					<Droplet className="w-5 h-5" />
					{isProcessing ? 'Adding Watermark...' : 'Add Watermark'}
				</button>
			</div>
		</div>
	);
}
