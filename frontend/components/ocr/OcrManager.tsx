'use client';

import { useState, useCallback } from 'react';
import {
	Scan,
	Download,
	Loader2,
	Globe,
	FileText,
	Settings,
	Play,
	StopCircle,
	CheckCircle,
} from 'lucide-react';
import { UploadedFile, OcrSettings, OcrPageResult, OcrLanguage } from '@/types';
import { performOcr, createSearchablePdf, getOcrStats, cancelOcr, LANGUAGE_NAMES } from '@/lib/pdf/ocr';
import { cn } from '@/lib/utils/cn';
import { useSubscription } from '@/lib/subscription/hooks';
import { getRemainingOcr, incrementOcrUsage } from '@/lib/subscription/usage';
import { useRouter } from 'next/navigation';

interface OcrManagerProps {
	file: UploadedFile;
	onReset: () => void;
}

const AVAILABLE_LANGUAGES: OcrLanguage[] = [
	'eng', 'spa', 'fra', 'deu', 'ita', 'por', 'chi_sim', 'chi_tra', 'jpn', 'kor', 'ara', 'rus'
];

export function OcrManager({ file, onReset }: OcrManagerProps) {
	const [settings, setSettings] = useState<OcrSettings>({
		languages: ['eng'],
		pageSelection: 'all',
		preserveLayout: true,
		deskew: true,
		enhanceScans: true,
	});
	
	const [isProcessing, setIsProcessing] = useState(false);
	const [progress, setProgress] = useState(0);
	const [currentPage, setCurrentPage] = useState<number | undefined>();
	const [results, setResults] = useState<OcrPageResult[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
	const [showSettings, setShowSettings] = useState(true);
	
	const { isPremium, limits } = useSubscription();
	const router = useRouter();

	const handleLanguageToggle = useCallback((lang: OcrLanguage) => {
		setSettings(prev => ({
			...prev,
			languages: prev.languages.includes(lang)
				? prev.languages.filter(l => l !== lang)
				: [...prev.languages, lang],
		}));
	}, []);

	const handleStartOcr = useCallback(async () => {
		// Check usage limit for free users
		if (!isPremium) {
			const remaining = getRemainingOcr(limits.maxOcrPerMonth);
			if (remaining <= 0) {
				alert(
					`You've reached your monthly limit of ${limits.maxOcrPerMonth} OCR operations. Please upgrade to Premium for unlimited access.`
				);
				router.push('/pricing');
				return;
			}
		}

		if (settings.languages.length === 0) {
			setError('Please select at least one language');
			return;
		}

		setIsProcessing(true);
		setProgress(0);
		setError(null);
		setResults([]);
		setShowSettings(false);

		try {
			const ocrResults = await performOcr(
				file.file,
				settings,
				(prog, page) => {
					setProgress(prog);
					setCurrentPage(page);
				}
			);
			
			// Increment usage counter on success
			if (!isPremium) {
				incrementOcrUsage();
			}
			
			setResults(ocrResults);
			
			// Create searchable PDF
			const blob = await createSearchablePdf(file.file, ocrResults);
			const url = URL.createObjectURL(blob);
			setDownloadUrl(url);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'OCR failed');
		} finally {
			setIsProcessing(false);
			setCurrentPage(undefined);
		}
	}, [file, settings, isPremium, limits, router]);

	const handleCancel = useCallback(async () => {
		await cancelOcr();
		setIsProcessing(false);
	}, []);

	const handleDownload = useCallback(() => {
		if (!downloadUrl) return;

		const link = document.createElement('a');
		link.href = downloadUrl;
		link.download = `${file.name.replace('.pdf', '')}_searchable.pdf`;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}, [downloadUrl, file.name]);

	const stats = results.length > 0 ? getOcrStats(results) : null;

	return (
		<div className="max-w-4xl mx-auto space-y-6">
			{/* Header */}
			<div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
				<div className="flex items-center justify-between mb-4">
					<div>
						<h2 className="text-xl font-semibold text-gray-900 dark:text-white">
							OCR - Make PDF Searchable
						</h2>
						<p className="text-sm text-gray-500 dark:text-gray-400">
							{file.name} • {file.pageCount || 0} page(s)
						</p>
					</div>
					<button
						onClick={onReset}
						className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
					>
						← Back
					</button>
				</div>

				{/* Info Banner */}
				<div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
					<p className="text-sm text-blue-700 dark:text-blue-300">
						<strong>Note:</strong> OCR (Optical Character Recognition) extracts text from scanned 
						documents and images, making your PDF searchable and allowing you to copy text.
					</p>
				</div>
			</div>

			{/* Settings */}
			{showSettings && !isProcessing && !downloadUrl && (
				<div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
					<h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center gap-2">
						<Settings className="h-5 w-5" />
						OCR Settings
					</h3>

					{/* Language Selection */}
					<div className="mb-6">
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
							<Globe className="h-4 w-4 inline mr-2" />
							Document Language(s)
						</label>
						<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
							{AVAILABLE_LANGUAGES.map((lang) => (
								<button
									key={lang}
									onClick={() => handleLanguageToggle(lang)}
									className={cn(
										'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
										settings.languages.includes(lang)
											? 'bg-blue-500 text-white'
											: 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
									)}
								>
									{LANGUAGE_NAMES[lang]}
								</button>
							))}
						</div>
						<p className="mt-2 text-xs text-gray-500">
							Select all languages present in your document for best results
						</p>
					</div>

					{/* Page Selection */}
					<div className="mb-6">
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
							Pages to Process
						</label>
						<div className="flex gap-4">
							<label className="flex items-center gap-2 cursor-pointer">
								<input
									type="radio"
									checked={settings.pageSelection === 'all'}
									onChange={() => setSettings(prev => ({ ...prev, pageSelection: 'all' }))}
									className="w-4 h-4"
								/>
								<span className="text-gray-600 dark:text-gray-400">All Pages</span>
							</label>
							<label className="flex items-center gap-2 cursor-pointer">
								<input
									type="radio"
									checked={settings.pageSelection === 'range'}
									onChange={() => setSettings(prev => ({ ...prev, pageSelection: 'range' }))}
									className="w-4 h-4"
								/>
								<span className="text-gray-600 dark:text-gray-400">Page Range</span>
							</label>
						</div>

						{settings.pageSelection === 'range' && (
							<div className="mt-3 flex items-center gap-2">
								<input
									type="number"
									min={1}
									max={file.pageCount || 1}
									value={settings.pageRange?.start || 1}
									onChange={(e) => setSettings(prev => ({
										...prev,
										pageRange: { ...prev.pageRange, start: parseInt(e.target.value) || 1, end: prev.pageRange?.end || file.pageCount || 1 }
									}))}
									className="w-20 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
								/>
								<span className="text-gray-500">to</span>
								<input
									type="number"
									min={1}
									max={file.pageCount || 1}
									value={settings.pageRange?.end || file.pageCount || 1}
									onChange={(e) => setSettings(prev => ({
										...prev,
										pageRange: { ...prev.pageRange, start: prev.pageRange?.start || 1, end: parseInt(e.target.value) || file.pageCount || 1 }
									}))}
									className="w-20 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
								/>
							</div>
						)}
					</div>

					{/* Enhancement Options */}
					<div className="space-y-3">
						<label className="flex items-center gap-3 cursor-pointer">
							<input
								type="checkbox"
								checked={settings.enhanceScans}
								onChange={(e) => setSettings(prev => ({ ...prev, enhanceScans: e.target.checked }))}
								className="w-4 h-4 rounded"
							/>
							<span className="text-gray-700 dark:text-gray-300">Enhance scanned images</span>
						</label>
						<label className="flex items-center gap-3 cursor-pointer">
							<input
								type="checkbox"
								checked={settings.deskew}
								onChange={(e) => setSettings(prev => ({ ...prev, deskew: e.target.checked }))}
								className="w-4 h-4 rounded"
							/>
							<span className="text-gray-700 dark:text-gray-300">Auto-correct skewed pages</span>
						</label>
					</div>
				</div>
			)}

			{/* Processing */}
			{isProcessing && (
				<div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
					<div className="text-center">
						<Loader2 className="h-12 w-12 mx-auto mb-4 animate-spin text-blue-500" />
						<h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
							Processing OCR...
						</h3>
						<p className="text-gray-600 dark:text-gray-400 mb-4">
							{currentPage ? `Processing page ${currentPage}...` : 'Initializing OCR engine...'}
						</p>
						<div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-4">
							<div
								className="bg-blue-500 h-3 rounded-full transition-all"
								style={{ width: `${progress}%` }}
							/>
						</div>
						<p className="text-sm text-gray-500 mb-4">{Math.round(progress)}% complete</p>
						<button
							onClick={handleCancel}
							className="flex items-center gap-2 mx-auto px-4 py-2 text-red-500 hover:text-red-600"
						>
							<StopCircle className="h-4 w-4" />
							Cancel
						</button>
					</div>
				</div>
			)}

			{/* Results */}
			{results.length > 0 && stats && (
				<div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
					<h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center gap-2">
						<CheckCircle className="h-5 w-5 text-green-500" />
						OCR Complete
					</h3>

					{/* Stats Grid */}
					<div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
						<div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 text-center">
							<div className="text-2xl font-bold text-blue-500">{stats.totalPages}</div>
							<div className="text-xs text-gray-500">Pages Processed</div>
						</div>
						<div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 text-center">
							<div className="text-2xl font-bold text-gray-700 dark:text-gray-300">{stats.totalWords}</div>
							<div className="text-xs text-gray-500">Words Found</div>
						</div>
						<div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 text-center">
							<div className="text-2xl font-bold text-gray-700 dark:text-gray-300">{stats.totalCharacters.toLocaleString()}</div>
							<div className="text-xs text-gray-500">Characters</div>
						</div>
						<div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 text-center">
							<div className="text-2xl font-bold text-green-500">{Math.round(stats.averageConfidence)}%</div>
							<div className="text-xs text-gray-500">Confidence</div>
						</div>
					</div>

					{/* Sample Text */}
					{results[0]?.text && (
						<div className="mb-4">
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Sample extracted text (Page 1):
							</label>
							<div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg max-h-40 overflow-y-auto">
								<pre className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-wrap font-mono">
									{results[0].text.slice(0, 500)}
									{results[0].text.length > 500 && '...'}
								</pre>
							</div>
						</div>
					)}
				</div>
			)}

			{/* Download */}
			<div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
				{error && (
					<div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg">
						{error}
					</div>
				)}

				{downloadUrl ? (
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3 text-green-600 dark:text-green-400">
							<div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
								✓
							</div>
							<span>Searchable PDF created!</span>
						</div>
						<button
							onClick={handleDownload}
							className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium"
						>
							<Download className="h-5 w-5" />
							Download Searchable PDF
						</button>
					</div>
				) : !isProcessing && (
					<button
						onClick={handleStartOcr}
						disabled={settings.languages.length === 0}
						className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-medium"
					>
						<Play className="h-5 w-5" />
						Start OCR Processing
					</button>
				)}
			</div>
		</div>
	);
}
