'use client';

import { useState, useCallback } from 'react';
import {
	GitCompare,
	Upload,
	Download,
	Loader2,
	FileText,
	AlertTriangle,
	CheckCircle,
	Eye,
	Type,
	Layers,
} from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { UploadedFile, ComparisonSettings, PageDifference, ComparisonMode } from '@/types';
import { comparePdfs, generateComparisonReport } from '@/lib/pdf/compare';
import { cn } from '@/lib/utils/cn';
import { useSubscription } from '@/lib/subscription/hooks';
import { getRemainingCompare, incrementCompareUsage } from '@/lib/subscription/usage';
import { useRouter } from 'next/navigation';

interface CompareManagerProps {
	file: UploadedFile;
	onReset: () => void;
}

export function CompareManager({ file, onReset }: CompareManagerProps) {
	const [secondFile, setSecondFile] = useState<File | null>(null);
	const [settings, setSettings] = useState<ComparisonSettings>({
		mode: 'visual',
		highlightAdditions: true,
		highlightDeletions: true,
		highlightModifications: true,
		colorAdditions: '#00FF00',
		colorDeletions: '#FF0000',
		colorModifications: '#FFFF00',
		sensitivity: 80,
	});
	
	const [isProcessing, setIsProcessing] = useState(false);
	const [progress, setProgress] = useState(0);
	const [differences, setDifferences] = useState<PageDifference[]>([]);
	const [summary, setSummary] = useState<{
		totalPages: number;
		pagesWithChanges: number;
		totalAdditions: number;
		totalDeletions: number;
	} | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
	
	const { isPremium, limits } = useSubscription();
	const router = useRouter();

	const onDrop = useCallback((acceptedFiles: File[]) => {
		const pdfFile = acceptedFiles.find(f => f.type === 'application/pdf');
		if (pdfFile) {
			setSecondFile(pdfFile);
		}
	}, []);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: { 'application/pdf': ['.pdf'] },
		maxFiles: 1,
	});

	const handleCompare = useCallback(async () => {
		// Check usage limit for free users
		if (!isPremium) {
			const remaining = getRemainingCompare(limits.maxComparePerMonth);
			if (remaining <= 0) {
				alert(
					`You've reached your monthly limit of ${limits.maxComparePerMonth} PDF comparison operations. Please upgrade to Premium for unlimited access.`
				);
				router.push('/pricing');
				return;
			}
		}

		if (!secondFile) {
			setError('Please upload a second PDF to compare');
			return;
		}

		setIsProcessing(true);
		setProgress(0);
		setError(null);
		setDifferences([]);

		try {
			const result = await comparePdfs(file.file, secondFile, settings, setProgress);
			// Increment usage counter on success
			if (!isPremium) {
				incrementCompareUsage();
			}
			setDifferences(result.differences);
			setSummary(result.summary);
			
			// Generate report
			const reportBlob = await generateComparisonReport(
				file.file,
				secondFile,
				result.differences,
				settings
			);
			const url = URL.createObjectURL(reportBlob);
			setDownloadUrl(url);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Comparison failed');
		} finally {
			setIsProcessing(false);
		}
	}, [file, secondFile, settings, isPremium, limits, router]);

	const handleDownload = useCallback(() => {
		if (!downloadUrl) return;

		const link = document.createElement('a');
		link.href = downloadUrl;
		link.download = `comparison_report.pdf`;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}, [downloadUrl]);

	const getModeIcon = (mode: ComparisonMode) => {
		switch (mode) {
			case 'visual':
				return Eye;
			case 'text':
				return Type;
			case 'overlay':
				return Layers;
		}
	};

	return (
		<div className="max-w-4xl mx-auto space-y-6">
			{/* Header */}
			<div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
				<div className="flex items-center justify-between mb-4">
					<div>
						<h2 className="text-xl font-semibold text-gray-900 dark:text-white">
							Compare PDFs
						</h2>
						<p className="text-sm text-gray-500 dark:text-gray-400">
							Compare two PDF documents to find differences
						</p>
					</div>
					<button
						onClick={onReset}
						className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
					>
						← Back
					</button>
				</div>
			</div>

			{/* File Selection */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{/* First File */}
				<div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
					<h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
						Document 1 (Original)
					</h3>
					<div className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
						<FileText className="h-8 w-8 text-blue-500" />
						<div className="flex-1 min-w-0">
							<p className="font-medium text-gray-900 dark:text-white truncate">
								{file.name}
							</p>
							<p className="text-sm text-gray-500">
								{file.pageCount || 0} pages
							</p>
						</div>
					</div>
				</div>

				{/* Second File */}
				<div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
					<h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
						Document 2 (Comparison)
					</h3>
					{secondFile ? (
						<div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
							<FileText className="h-8 w-8 text-green-500" />
							<div className="flex-1 min-w-0">
								<p className="font-medium text-gray-900 dark:text-white truncate">
									{secondFile.name}
								</p>
								<p className="text-sm text-gray-500">
									{(secondFile.size / 1024).toFixed(1)} KB
								</p>
							</div>
							<button
								onClick={() => setSecondFile(null)}
								className="text-gray-400 hover:text-red-500"
							>
								×
							</button>
						</div>
					) : (
						<div
							{...getRootProps()}
							className={cn(
								'p-6 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors',
								isDragActive
									? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
									: 'border-gray-300 dark:border-gray-600 hover:border-blue-400'
							)}
						>
							<input {...getInputProps()} />
							<Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
							<p className="text-sm text-gray-600 dark:text-gray-400">
								Drop PDF here or click to upload
							</p>
						</div>
					)}
				</div>
			</div>

			{/* Comparison Settings */}
			{secondFile && !isProcessing && differences.length === 0 && (
				<div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
					<h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
						Comparison Settings
					</h3>

					{/* Mode Selection */}
					<div className="mb-6">
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
							Comparison Mode
						</label>
						<div className="grid grid-cols-3 gap-2">
							{(['visual', 'text', 'overlay'] as ComparisonMode[]).map((mode) => {
								const Icon = getModeIcon(mode);
								return (
									<button
										key={mode}
										onClick={() => setSettings(prev => ({ ...prev, mode }))}
										className={cn(
											'flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-colors',
											settings.mode === mode
												? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
												: 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
										)}
									>
										<Icon className="h-6 w-6" />
										<span className="text-sm font-medium capitalize">{mode}</span>
									</button>
								);
							})}
						</div>
					</div>

					{/* Sensitivity Slider */}
					<div className="mb-6">
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
							Sensitivity: {settings.sensitivity}%
						</label>
						<input
							type="range"
							min={0}
							max={100}
							value={settings.sensitivity}
							onChange={(e) => setSettings(prev => ({ ...prev, sensitivity: parseInt(e.target.value) }))}
							className="w-full"
						/>
						<div className="flex justify-between text-xs text-gray-500">
							<span>Less Sensitive</span>
							<span>More Sensitive</span>
						</div>
					</div>

					{/* Highlight Options */}
					<div className="space-y-3">
						<label className="flex items-center gap-3 cursor-pointer">
							<input
								type="checkbox"
								checked={settings.highlightAdditions}
								onChange={(e) => setSettings(prev => ({ ...prev, highlightAdditions: e.target.checked }))}
								className="w-4 h-4 rounded"
							/>
							<span className="text-gray-700 dark:text-gray-300">Highlight additions</span>
							<div
								className="w-4 h-4 rounded"
								style={{ backgroundColor: settings.colorAdditions }}
							/>
						</label>
						<label className="flex items-center gap-3 cursor-pointer">
							<input
								type="checkbox"
								checked={settings.highlightDeletions}
								onChange={(e) => setSettings(prev => ({ ...prev, highlightDeletions: e.target.checked }))}
								className="w-4 h-4 rounded"
							/>
							<span className="text-gray-700 dark:text-gray-300">Highlight deletions</span>
							<div
								className="w-4 h-4 rounded"
								style={{ backgroundColor: settings.colorDeletions }}
							/>
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
							Comparing Documents...
						</h3>
						<div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-2">
							<div
								className="bg-blue-500 h-3 rounded-full transition-all"
								style={{ width: `${progress}%` }}
							/>
						</div>
						<p className="text-sm text-gray-500">{Math.round(progress)}% complete</p>
					</div>
				</div>
			)}

			{/* Results */}
			{differences.length > 0 && summary && (
				<div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
					<h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
						Comparison Results
					</h3>

					{/* Summary */}
					<div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
						<div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 text-center">
							<div className="text-2xl font-bold text-blue-500">{summary.totalPages}</div>
							<div className="text-xs text-gray-500">Total Pages</div>
						</div>
						<div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 text-center">
							<div className="text-2xl font-bold text-amber-500">{summary.pagesWithChanges}</div>
							<div className="text-xs text-gray-500">Pages Changed</div>
						</div>
						<div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 text-center">
							<div className="text-2xl font-bold text-green-500">{summary.totalAdditions}</div>
							<div className="text-xs text-gray-500">Additions</div>
						</div>
						<div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 text-center">
							<div className="text-2xl font-bold text-red-500">{summary.totalDeletions}</div>
							<div className="text-xs text-gray-500">Deletions</div>
						</div>
					</div>

					{/* Page List */}
					<div className="space-y-2 max-h-64 overflow-y-auto">
						{differences.map((diff) => (
							<div
								key={diff.pageNumber}
								className={cn(
									'flex items-center justify-between p-3 rounded-lg',
									diff.hasChanges
										? 'bg-amber-50 dark:bg-amber-900/20'
										: 'bg-green-50 dark:bg-green-900/20'
								)}
							>
								<div className="flex items-center gap-3">
									{diff.hasChanges ? (
										<AlertTriangle className="h-5 w-5 text-amber-500" />
									) : (
										<CheckCircle className="h-5 w-5 text-green-500" />
									)}
									<span className="font-medium">Page {diff.pageNumber}</span>
								</div>
								<span className="text-sm text-gray-500">
									{diff.hasChanges
										? `${diff.changePercentage.toFixed(1)}% different`
										: 'No changes'}
								</span>
							</div>
						))}
					</div>
				</div>
			)}

			{/* Actions */}
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
							<span>Comparison complete!</span>
						</div>
						<button
							onClick={handleDownload}
							className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium"
						>
							<Download className="h-5 w-5" />
							Download Report
						</button>
					</div>
				) : !isProcessing && (
					<button
						onClick={handleCompare}
						disabled={!secondFile}
						className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-medium"
					>
						<GitCompare className="h-5 w-5" />
						Compare Documents
					</button>
				)}
			</div>
		</div>
	);
}
