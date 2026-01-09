'use client';

import { useState, useCallback } from 'react';
import {
	Code,
	Download,
	FileArchive,
	FileText,
	Image as ImageIcon,
	Loader2,
	RefreshCw,
	Settings,
	Eye,
	CheckCircle2,
	AlertCircle,
	Palette,
	FileCode,
	Layers,
} from 'lucide-react';
import {
	UploadedFile,
	PdfToHtmlSettings,
	HtmlOutputMode,
	HtmlTheme,
	ImageExtractionMode,
} from '@/types';
import {
	convertPdfToHtml,
	downloadHtmlFile,
	cleanupPdfToHtmlBlobUrl,
	DEFAULT_PDF_TO_HTML_SETTINGS,
} from '@/lib/pdf/pdfToHtml';
import { cn } from '@/lib/utils/cn';

interface PdfToHtmlManagerProps {
	file: UploadedFile;
	onReset: () => void;
}

export function PdfToHtmlManager({ file, onReset }: PdfToHtmlManagerProps) {
	const [settings, setSettings] = useState<PdfToHtmlSettings>(DEFAULT_PDF_TO_HTML_SETTINGS);
	const [isProcessing, setIsProcessing] = useState(false);
	const [progress, setProgress] = useState(0);
	const [statusText, setStatusText] = useState('');
	const [currentPage, setCurrentPage] = useState<number | undefined>();
	const [result, setResult] = useState<{
		success: boolean;
		outputUrl?: string;
		zipUrl?: string;
		htmlContent?: string;
		error?: string;
		stats?: {
			totalPages: number;
			totalImages: number;
			totalCharacters: number;
		};
	} | null>(null);
	const [showPreview, setShowPreview] = useState(false);

	const handleConvert = useCallback(async () => {
		setIsProcessing(true);
		setProgress(0);
		setStatusText('Starting conversion...');
		setResult(null);

		try {
			const conversionResult = await convertPdfToHtml(
				file,
				settings,
				(prog, status, page) => {
					setProgress(prog);
					setStatusText(status);
					setCurrentPage(page);
				}
			);

			setResult(conversionResult);
		} catch (error) {
			setResult({
				success: false,
				error: error instanceof Error ? error.message : 'Conversion failed',
			});
		} finally {
			setIsProcessing(false);
		}
	}, [file, settings]);

	const handleDownload = useCallback(() => {
		if (result?.outputUrl) {
			const baseName = file.name.replace(/\.pdf$/i, '');
			downloadHtmlFile(result.outputUrl, `${baseName}.html`);
		} else if (result?.zipUrl) {
			const baseName = file.name.replace(/\.pdf$/i, '');
			downloadHtmlFile(result.zipUrl, `${baseName}_html.zip`);
		}
	}, [result, file.name]);

	const handleReset = useCallback(() => {
		if (result?.outputUrl) {
			cleanupPdfToHtmlBlobUrl(result.outputUrl);
		}
		if (result?.zipUrl) {
			cleanupPdfToHtmlBlobUrl(result.zipUrl);
		}
		onReset();
	}, [result, onReset]);

	const updateSettings = <K extends keyof PdfToHtmlSettings>(
		key: K,
		value: PdfToHtmlSettings[K]
	) => {
		setSettings((prev) => ({ ...prev, [key]: value }));
	};

	const outputModes: { value: HtmlOutputMode; label: string; icon: typeof FileCode; description: string }[] = [
		{
			value: 'single-file',
			label: 'Single HTML File',
			icon: FileCode,
			description: 'One HTML file with embedded base64 images',
		},
		{
			value: 'zip-package',
			label: 'ZIP Package',
			icon: FileArchive,
			description: 'HTML file + images folder in a ZIP',
		},
	];

	const themes: { value: HtmlTheme; label: string; preview: string }[] = [
		{ value: 'modern', label: 'Modern', preview: 'bg-gradient-to-r from-blue-500 to-purple-500' },
		{ value: 'classic', label: 'Classic', preview: 'bg-gradient-to-r from-amber-600 to-amber-800' },
		{ value: 'minimal', label: 'Minimal', preview: 'bg-white border-2 border-gray-200' },
		{ value: 'dark', label: 'Dark', preview: 'bg-gradient-to-r from-slate-800 to-slate-900' },
	];

	const imageExtractionModes: { value: ImageExtractionMode; label: string; description: string }[] = [
		{
			value: 'render-pages',
			label: 'Render Full Pages',
			description: 'Each page as a complete image (recommended)',
		},
		{
			value: 'embedded',
			label: 'Extract Embedded',
			description: 'Extract only images embedded in the PDF',
		},
		{
			value: 'both',
			label: 'Both Methods',
			description: 'Full page renders + embedded images',
		},
	];

	return (
		<div className="space-y-6">
			{/* File Info Card */}
			<div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-4">
						<div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
							<Code className="w-6 h-6 text-white" />
						</div>
						<div>
							<h3 className="font-semibold text-gray-900 dark:text-white">
								{file.name}
							</h3>
							<p className="text-sm text-gray-500 dark:text-gray-400">
								{file.pageCount ? `${file.pageCount} pages` : 'Loading...'} •{' '}
								{(file.size / (1024 * 1024)).toFixed(2)} MB
							</p>
						</div>
					</div>
					<button
						onClick={handleReset}
						className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
					>
						<RefreshCw className="w-4 h-4" />
						<span>New File</span>
					</button>
				</div>
			</div>

			{/* Settings Panel */}
			{!result?.success && (
				<div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 space-y-6">
					<div className="flex items-center gap-3">
						<Settings className="w-5 h-5 text-orange-500" />
						<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
							Conversion Settings
						</h3>
					</div>

					{/* Output Mode */}
					<div className="space-y-3">
						<label className="text-sm font-medium text-gray-700 dark:text-gray-300">
							Output Format
						</label>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
							{outputModes.map((mode) => (
								<button
									key={mode.value}
									onClick={() => updateSettings('outputMode', mode.value)}
									className={cn(
										'flex items-start gap-3 p-4 rounded-lg border-2 transition-all text-left',
										settings.outputMode === mode.value
											? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
											: 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
									)}
								>
									<mode.icon
										className={cn(
											'w-5 h-5 mt-0.5',
											settings.outputMode === mode.value
												? 'text-orange-500'
												: 'text-gray-400'
										)}
									/>
									<div>
										<div className="font-medium text-gray-900 dark:text-white">
											{mode.label}
										</div>
										<div className="text-xs text-gray-500 dark:text-gray-400">
											{mode.description}
										</div>
									</div>
								</button>
							))}
						</div>
					</div>

					{/* Theme Selection */}
					<div className="space-y-3">
						<label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
							<Palette className="w-4 h-4" />
							HTML Theme
						</label>
						<div className="grid grid-cols-2 md:grid-cols-4 gap-3">
							{themes.map((theme) => (
								<button
									key={theme.value}
									onClick={() => updateSettings('theme', theme.value)}
									className={cn(
										'p-3 rounded-lg border-2 transition-all',
										settings.theme === theme.value
											? 'border-orange-500 ring-2 ring-orange-200 dark:ring-orange-800'
											: 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
									)}
								>
									<div
										className={cn(
											'h-8 rounded mb-2',
											theme.preview
										)}
									/>
									<div className="text-sm font-medium text-gray-900 dark:text-white">
										{theme.label}
									</div>
								</button>
							))}
						</div>
					</div>

					{/* Content Extraction Options */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{/* Text Extraction */}
						<div className="space-y-3">
							<label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
								<FileText className="w-4 h-4" />
								Text Extraction
							</label>
							<label className="flex items-center gap-3 cursor-pointer">
								<input
									type="checkbox"
									checked={settings.extractText}
									onChange={(e) =>
										updateSettings('extractText', e.target.checked)
									}
									className="w-5 h-5 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
								/>
								<span className="text-gray-700 dark:text-gray-300">
									Extract text content from PDF
								</span>
							</label>
						</div>

						{/* Page Numbers */}
						<div className="space-y-3">
							<label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
								<Layers className="w-4 h-4" />
								Page Numbers
							</label>
							<label className="flex items-center gap-3 cursor-pointer">
								<input
									type="checkbox"
									checked={settings.includePageNumbers}
									onChange={(e) =>
										updateSettings('includePageNumbers', e.target.checked)
									}
									className="w-5 h-5 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
								/>
								<span className="text-gray-700 dark:text-gray-300">
									Show page numbers in output
								</span>
							</label>
						</div>
					</div>

					{/* Image Extraction Mode */}
					<div className="space-y-3">
						<label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
							<ImageIcon className="w-4 h-4" />
							Image Extraction Mode
						</label>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-3">
							{imageExtractionModes.map((mode) => (
								<button
									key={mode.value}
									onClick={() => updateSettings('extractImages', mode.value)}
									className={cn(
										'p-4 rounded-lg border-2 transition-all text-left',
										settings.extractImages === mode.value
											? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
											: 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
									)}
								>
									<div className="font-medium text-gray-900 dark:text-white text-sm">
										{mode.label}
									</div>
									<div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
										{mode.description}
									</div>
								</button>
							))}
						</div>
					</div>

					{/* Image Settings */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						{/* Image Format */}
						<div className="space-y-2">
							<label className="text-sm font-medium text-gray-700 dark:text-gray-300">
								Image Format
							</label>
							<select
								value={settings.imageFormat}
								onChange={(e) =>
									updateSettings(
										'imageFormat',
										e.target.value as 'png' | 'jpg' | 'webp'
									)
								}
								className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
							>
								<option value="png">PNG (Best Quality)</option>
								<option value="jpg">JPG (Smaller Size)</option>
								<option value="webp">WebP (Modern)</option>
							</select>
						</div>

						{/* Image Scale */}
						<div className="space-y-2">
							<label className="text-sm font-medium text-gray-700 dark:text-gray-300">
								Image Scale: {settings.imageScale}x
							</label>
							<input
								type="range"
								min="1"
								max="3"
								step="0.5"
								value={settings.imageScale}
								onChange={(e) =>
									updateSettings('imageScale', parseFloat(e.target.value))
								}
								className="w-full accent-orange-500"
							/>
							<div className="flex justify-between text-xs text-gray-500">
								<span>1x (Fast)</span>
								<span>3x (HD)</span>
							</div>
						</div>

						{/* Image Quality */}
						{settings.imageFormat !== 'png' && (
							<div className="space-y-2">
								<label className="text-sm font-medium text-gray-700 dark:text-gray-300">
									Image Quality: {settings.imageQuality}%
								</label>
								<input
									type="range"
									min="10"
									max="100"
									step="5"
									value={settings.imageQuality}
									onChange={(e) =>
										updateSettings('imageQuality', parseInt(e.target.value))
									}
									className="w-full accent-orange-500"
								/>
								<div className="flex justify-between text-xs text-gray-500">
									<span>Small</span>
									<span>Best</span>
								</div>
							</div>
						)}
					</div>

					{/* Convert Button */}
					<button
						onClick={handleConvert}
						disabled={isProcessing}
						className={cn(
							'w-full flex items-center justify-center gap-3 py-4 px-6 rounded-xl font-semibold text-lg transition-all',
							isProcessing
								? 'bg-gray-400 cursor-not-allowed'
								: 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl'
						)}
					>
						{isProcessing ? (
							<>
								<Loader2 className="w-5 h-5 animate-spin" />
								<span>Converting... {Math.round(progress)}%</span>
							</>
						) : (
							<>
								<Code className="w-5 h-5" />
								<span>Convert to HTML</span>
							</>
						)}
					</button>

					{/* Progress Bar */}
					{isProcessing && (
						<div className="space-y-2">
							<div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
								<div
									className="h-full bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-300"
									style={{ width: `${progress}%` }}
								/>
							</div>
							<p className="text-sm text-gray-600 dark:text-gray-400 text-center">
								{statusText}
								{currentPage !== undefined && ` (Page ${currentPage})`}
							</p>
						</div>
					)}
				</div>
			)}

			{/* Results Panel */}
			{result && (
				<div
					className={cn(
						'rounded-xl p-6 shadow-lg border',
						result.success
							? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
							: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
					)}
				>
					{result.success ? (
						<div className="space-y-4">
							<div className="flex items-center gap-3">
								<CheckCircle2 className="w-6 h-6 text-green-500" />
								<h3 className="text-lg font-semibold text-green-800 dark:text-green-200">
									Conversion Complete!
								</h3>
							</div>

							{/* Stats */}
							{result.stats && (
								<div className="grid grid-cols-3 gap-4">
									<div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
										<div className="text-2xl font-bold text-gray-900 dark:text-white">
											{result.stats.totalPages}
										</div>
										<div className="text-sm text-gray-500 dark:text-gray-400">
											Pages
										</div>
									</div>
									<div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
										<div className="text-2xl font-bold text-gray-900 dark:text-white">
											{result.stats.totalImages}
										</div>
										<div className="text-sm text-gray-500 dark:text-gray-400">
											Images
										</div>
									</div>
									<div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
										<div className="text-2xl font-bold text-gray-900 dark:text-white">
											{result.stats.totalCharacters.toLocaleString()}
										</div>
										<div className="text-sm text-gray-500 dark:text-gray-400">
											Characters
										</div>
									</div>
								</div>
							)}

							{/* Action Buttons */}
							<div className="flex flex-wrap gap-3">
								<button
									onClick={handleDownload}
									className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
								>
									<Download className="w-5 h-5" />
									<span>
										Download{' '}
										{settings.outputMode === 'zip-package' ? 'ZIP' : 'HTML'}
									</span>
								</button>

								{result.htmlContent && (
									<button
										onClick={() => setShowPreview(!showPreview)}
										className="flex items-center justify-center gap-2 py-3 px-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
									>
										<Eye className="w-5 h-5" />
										<span>{showPreview ? 'Hide' : 'Show'} Preview</span>
									</button>
								)}

								<button
									onClick={() => {
										setResult(null);
									}}
									className="flex items-center justify-center gap-2 py-3 px-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
								>
									<RefreshCw className="w-5 h-5" />
									<span>Convert Again</span>
								</button>
							</div>

							{/* Preview */}
							{showPreview && result.htmlContent && (
								<div className="mt-4">
									<div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
										<div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 border-b border-gray-200 dark:border-gray-700 flex items-center gap-2">
											<div className="flex gap-1.5">
												<div className="w-3 h-3 rounded-full bg-red-400" />
												<div className="w-3 h-3 rounded-full bg-yellow-400" />
												<div className="w-3 h-3 rounded-full bg-green-400" />
											</div>
											<span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
												Preview
											</span>
										</div>
										<iframe
											srcDoc={result.htmlContent}
											className="w-full h-[500px] bg-white"
											sandbox="allow-same-origin"
											title="HTML Preview"
										/>
									</div>
								</div>
							)}
						</div>
					) : (
						<div className="flex items-center gap-3">
							<AlertCircle className="w-6 h-6 text-red-500" />
							<div>
								<h3 className="font-semibold text-red-800 dark:text-red-200">
									Conversion Failed
								</h3>
								<p className="text-red-600 dark:text-red-300">
									{result.error}
								</p>
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	);
}
