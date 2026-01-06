'use client';

import { useState } from 'react';
import {
	Download,
	Loader2,
	CheckCircle,
	AlertCircle,
	Hash,
	Eye,
} from 'lucide-react';
import { UploadedFile, PageNumberSettings, PageNumberPosition, PageNumberFormat } from '@/types';
import { cn } from '@/lib/utils/cn';
import {
	addPageNumbers,
	downloadFile,
	DEFAULT_PAGE_NUMBER_SETTINGS,
} from '@/lib/pdf/pageNumbers';

interface PageNumbersManagerProps {
	file: UploadedFile;
	onReset: () => void;
}

const POSITION_OPTIONS: { value: PageNumberPosition; label: string }[] = [
	{ value: 'bottom-center', label: 'Bottom Center' },
	{ value: 'bottom-left', label: 'Bottom Left' },
	{ value: 'bottom-right', label: 'Bottom Right' },
	{ value: 'top-center', label: 'Top Center' },
	{ value: 'top-left', label: 'Top Left' },
	{ value: 'top-right', label: 'Top Right' },
];

const FORMAT_OPTIONS: { value: PageNumberFormat; label: string; example: string }[] = [
	{ value: 'numeric', label: 'Numbers', example: '1, 2, 3' },
	{ value: 'roman', label: 'Roman (lowercase)', example: 'i, ii, iii' },
	{ value: 'roman-upper', label: 'Roman (uppercase)', example: 'I, II, III' },
	{ value: 'alpha', label: 'Letters (lowercase)', example: 'a, b, c' },
	{ value: 'alpha-upper', label: 'Letters (uppercase)', example: 'A, B, C' },
];

export function PageNumbersManager({ file, onReset }: PageNumbersManagerProps) {
	const [settings, setSettings] = useState<PageNumberSettings>(DEFAULT_PAGE_NUMBER_SETTINGS);
	const [outputFileName, setOutputFileName] = useState(
		file.name.replace(/\.pdf$/i, '_numbered.pdf')
	);
	const [isProcessing, setIsProcessing] = useState(false);
	const [progress, setProgress] = useState(0);
	const [result, setResult] = useState<{ success: boolean; url?: string; error?: string } | null>(null);

	const handleApply = async () => {
		setIsProcessing(true);
		setProgress(0);
		setResult(null);

		try {
			const applyResult = await addPageNumbers(
				file,
				settings,
				outputFileName,
				(p) => setProgress(p)
			);

			if (applyResult.success && applyResult.downloadUrl) {
				setResult({
					success: true,
					url: applyResult.downloadUrl,
				});
			} else {
				setResult({
					success: false,
					error: applyResult.error || 'Failed to add page numbers',
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

	// Generate preview example
	const getPreviewExample = (pageNum: number) => {
		const formatNumber = (n: number): string => {
			switch (settings.format) {
				case 'roman':
					return toRoman(n, false);
				case 'roman-upper':
					return toRoman(n, true);
				case 'alpha':
					return toAlpha(n, false);
				case 'alpha-upper':
					return toAlpha(n, true);
				default:
					return n.toString();
			}
		};
		return `${settings.prefix}${formatNumber(pageNum)}${settings.suffix}`;
	};

	// Helper functions for preview
	function toRoman(num: number, uppercase: boolean): string {
		const romanNumerals: [number, string][] = [
			[1000, 'm'], [900, 'cm'], [500, 'd'], [400, 'cd'],
			[100, 'c'], [90, 'xc'], [50, 'l'], [40, 'xl'],
			[10, 'x'], [9, 'ix'], [5, 'v'], [4, 'iv'], [1, 'i']
		];
		let result = '';
		for (const [value, numeral] of romanNumerals) {
			while (num >= value) {
				result += numeral;
				num -= value;
			}
		}
		return uppercase ? result.toUpperCase() : result;
	}

	function toAlpha(num: number, uppercase: boolean): string {
		let result = '';
		while (num > 0) {
			num--;
			result = String.fromCharCode(97 + (num % 26)) + result;
			num = Math.floor(num / 26);
		}
		return uppercase ? result.toUpperCase() : result;
	}

	return (
		<div className="space-y-6">
			{/* File Info */}
			<div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 p-6">
				<div className="flex items-center gap-4">
					<div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-pink-600 rounded-xl flex items-center justify-center">
						<Hash className="h-6 w-6 text-white" />
					</div>
					<div className="flex-1">
						<h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{file.name}</h3>
						<p className="text-sm text-gray-600 dark:text-gray-400">
							{file.pageCount} pages • {((file.size / 1024 / 1024).toFixed(2))} MB
						</p>
					</div>
				</div>
			</div>

			{/* Settings */}
			{!result && (
				<div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 p-6">
					<h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-6">Page Number Settings</h4>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{/* Position */}
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Position
							</label>
							<select
								value={settings.position}
								onChange={(e) => setSettings({ ...settings, position: e.target.value as PageNumberPosition })}
								className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
							>
								{POSITION_OPTIONS.map((opt) => (
									<option key={opt.value} value={opt.value}>{opt.label}</option>
								))}
							</select>
						</div>

						{/* Format */}
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Format
							</label>
							<select
								value={settings.format}
								onChange={(e) => setSettings({ ...settings, format: e.target.value as PageNumberFormat })}
								className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
							>
								{FORMAT_OPTIONS.map((opt) => (
									<option key={opt.value} value={opt.value}>
										{opt.label} ({opt.example})
									</option>
								))}
							</select>
						</div>

						{/* Start Number */}
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Start Number
							</label>
							<input
								type="number"
								min="1"
								value={settings.startNumber}
								onChange={(e) => setSettings({ ...settings, startNumber: parseInt(e.target.value) || 1 })}
								className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
							/>
						</div>

						{/* Font Size */}
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Font Size ({settings.fontSize}pt)
							</label>
							<input
								type="range"
								min="8"
								max="24"
								value={settings.fontSize}
								onChange={(e) => setSettings({ ...settings, fontSize: parseInt(e.target.value) })}
								className="w-full"
							/>
						</div>

						{/* Prefix */}
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Prefix
							</label>
							<input
								type="text"
								value={settings.prefix}
								onChange={(e) => setSettings({ ...settings, prefix: e.target.value })}
								placeholder="e.g., Page "
								className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
							/>
						</div>

						{/* Suffix */}
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Suffix
							</label>
							<input
								type="text"
								value={settings.suffix}
								onChange={(e) => setSettings({ ...settings, suffix: e.target.value })}
								placeholder={`e.g., /${file.pageCount || '?'}`}
								className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
							/>
						</div>

						{/* Font Color */}
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Font Color
							</label>
							<div className="flex gap-2">
								<input
									type="color"
									value={settings.fontColor}
									onChange={(e) => setSettings({ ...settings, fontColor: e.target.value })}
									className="w-12 h-10 rounded border border-gray-300 dark:border-gray-600 cursor-pointer"
								/>
								<input
									type="text"
									value={settings.fontColor}
									onChange={(e) => setSettings({ ...settings, fontColor: e.target.value })}
									className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-mono text-sm"
								/>
							</div>
						</div>

						{/* Margin */}
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Margin from Edge ({settings.margin}mm)
							</label>
							<input
								type="range"
								min="5"
								max="50"
								value={settings.margin}
								onChange={(e) => setSettings({ ...settings, margin: parseInt(e.target.value) })}
								className="w-full"
							/>
						</div>

						{/* Skip First Page */}
						<div className="md:col-span-2">
							<label className="flex items-center gap-3 cursor-pointer">
								<input
									type="checkbox"
									checked={settings.skipFirstPage}
									onChange={(e) => setSettings({ ...settings, skipFirstPage: e.target.checked })}
									className="w-5 h-5 rounded border-gray-300 text-rose-500 focus:ring-rose-500"
								/>
								<span className="text-sm font-medium text-gray-700 dark:text-gray-300">
									Skip first page (title/cover page)
								</span>
							</label>
						</div>
					</div>

					{/* Preview */}
					<div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
						<div className="flex items-center gap-2 mb-3">
							<Eye className="h-4 w-4 text-gray-500" />
							<span className="text-sm font-medium text-gray-700 dark:text-gray-300">Preview</span>
						</div>
						<div className="flex gap-4 flex-wrap">
							{[1, 2, 3].map((n) => {
								const displayNum = settings.skipFirstPage ? n : n;
								const actualPageNum = settings.startNumber + (settings.skipFirstPage ? n - 1 : n - 1);
								return (
									<div
										key={n}
										className="w-20 h-28 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded shadow-sm relative"
									>
										<div
											className={cn(
												'absolute text-xs',
												settings.position.includes('top') ? 'top-1' : 'bottom-1',
												settings.position.includes('left') ? 'left-1' : 
												settings.position.includes('right') ? 'right-1' : 'left-1/2 -translate-x-1/2'
											)}
											style={{ 
												fontSize: `${Math.min(settings.fontSize * 0.6, 10)}px`,
												color: settings.fontColor 
											}}
										>
											{settings.skipFirstPage && n === 1 
												? <span className="text-gray-300 dark:text-gray-600">(skipped)</span>
												: getPreviewExample(actualPageNum)}
										</div>
										<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs text-gray-400">
											Page {n}
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			)}

			{/* Output & Apply */}
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
								className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 disabled:opacity-50"
							/>
						</div>

						{isProcessing && (
							<div className="mb-4">
								<div className="flex items-center justify-between mb-2">
									<span className="text-sm text-gray-600 dark:text-gray-400">Adding page numbers...</span>
									<span className="text-sm font-medium text-gray-900 dark:text-gray-100">{progress}%</span>
								</div>
								<div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
									<div
										className="bg-rose-500 h-2 rounded-full transition-all duration-300"
										style={{ width: `${progress}%` }}
									/>
								</div>
							</div>
						)}

						<button
							onClick={handleApply}
							disabled={isProcessing}
							className={cn(
								'w-full flex items-center justify-center gap-3 px-6 py-4 font-semibold rounded-xl transition-all duration-200 shadow-lg',
								isProcessing
									? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed shadow-none'
									: 'bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white hover:shadow-xl transform hover:-translate-y-0.5'
							)}
						>
							{isProcessing ? (
								<Loader2 className="h-5 w-5 animate-spin" />
							) : (
								<Hash className="h-5 w-5" />
							)}
							<span>
								{isProcessing ? 'Processing...' : 'Add Page Numbers'}
							</span>
						</button>
					</>
				) : result.success ? (
					<div className="space-y-4">
						<div className="flex items-center gap-3 text-green-600 dark:text-green-400">
							<CheckCircle className="h-6 w-6" />
							<span className="font-semibold">Page numbers added successfully!</span>
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
