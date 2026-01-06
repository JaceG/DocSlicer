'use client';

import { useState, useCallback, useEffect } from 'react';
import { Wrench, Download, CheckCircle, AlertCircle, AlertTriangle, XCircle, FileCheck } from 'lucide-react';
import { UploadedFile, RepairSettings, RepairDiagnostic } from '@/types';
import { 
	diagnosePdf, 
	repairPdf, 
	getDefaultRepairSettings,
	downloadRepairedPdf, 
	cleanupRepairedBlobStoreEntry 
} from '@/lib/pdf/repair';
import { cn } from '@/lib/utils/cn';
import { formatFileSize } from '@/lib/utils/file';
import { useSubscription } from '@/lib/subscription/hooks';
import { getRemainingRepair, incrementRepairUsage } from '@/lib/subscription/usage';
import { useRouter } from 'next/navigation';

interface RepairManagerProps {
	file: UploadedFile;
	onComplete?: () => void;
}

export function RepairManager({ file, onComplete }: RepairManagerProps) {
	const [settings, setSettings] = useState<RepairSettings>(getDefaultRepairSettings());
	const [isDiagnosing, setIsDiagnosing] = useState(false);
	const [diagnostics, setDiagnostics] = useState<RepairDiagnostic[]>([]);
	const [isRepairing, setIsRepairing] = useState(false);
	const [progress, setProgress] = useState(0);
	const [result, setResult] = useState<{ url: string; blobKey: string; diagnostics: RepairDiagnostic[] } | null>(null);
	const [error, setError] = useState<string | null>(null);
	
	const { isPremium, limits } = useSubscription();
	const router = useRouter();

	// Auto-diagnose on mount
	useEffect(() => {
		handleDiagnose();
	}, []);

	const handleDiagnose = useCallback(async () => {
		setIsDiagnosing(true);
		setError(null);
		setDiagnostics([]);

		try {
			const diags = await diagnosePdf(file.file, setProgress);
			setDiagnostics(diags);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Failed to diagnose PDF');
		} finally {
			setIsDiagnosing(false);
		}
	}, [file]);

	const handleRepair = useCallback(async () => {
		// Check usage limit for free users
		if (!isPremium) {
			const remaining = getRemainingRepair(limits.maxRepairPerMonth);
			if (remaining <= 0) {
				alert(
					`You've reached your monthly limit of ${limits.maxRepairPerMonth} PDF repair operations. Please upgrade to Premium for unlimited access.`
				);
				router.push('/pricing');
				return;
			}
		}

		setIsRepairing(true);
		setError(null);
		setProgress(0);

		try {
			const repairResult = await repairPdf(file.file, settings, setProgress);
			// Increment usage counter on success
			if (!isPremium) {
				incrementRepairUsage();
			}
			setResult(repairResult);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Failed to repair PDF');
		} finally {
			setIsRepairing(false);
		}
	}, [file, settings, isPremium, limits, router]);

	const handleDownload = useCallback(() => {
		if (result) {
			const fileName = file.name.replace('.pdf', '_repaired.pdf');
			downloadRepairedPdf(result.url, fileName);
		}
	}, [result, file.name]);

	const handleReset = useCallback(() => {
		if (result) {
			cleanupRepairedBlobStoreEntry(result.blobKey);
		}
		setResult(null);
		setDiagnostics([]);
		setProgress(0);
		setError(null);
	}, [result]);

	const getSeverityIcon = (severity: RepairDiagnostic['severity']) => {
		switch (severity) {
			case 'warning':
				return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
			case 'error':
				return <AlertCircle className="w-4 h-4 text-orange-500" />;
			case 'critical':
				return <XCircle className="w-4 h-4 text-red-500" />;
		}
	};

	const hasIssues = diagnostics.some(d => d.severity !== 'warning' || !d.fixed);

	if (result) {
		return (
			<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
				<div className="text-center mb-6">
					<div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
						<CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
					</div>
					<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
						PDF Repaired Successfully!
					</h3>
					<p className="text-gray-600 dark:text-gray-400">
						Your PDF has been rebuilt and optimized.
					</p>
				</div>

				{/* Repair Summary */}
				<div className="mb-6 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
					<h4 className="font-medium text-gray-900 dark:text-white mb-2">Repair Summary</h4>
					<div className="space-y-1">
						{result.diagnostics.map((diag, index) => (
							<div key={index} className="flex items-center gap-2 text-sm">
								{diag.fixed ? (
									<CheckCircle className="w-4 h-4 text-green-500" />
								) : (
									getSeverityIcon(diag.severity)
								)}
								<span className={diag.fixed ? 'text-green-700 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'}>
									{diag.issue}
								</span>
							</div>
						))}
					</div>
				</div>

				<div className="flex justify-center gap-3">
					<button
						onClick={handleDownload}
						className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
					>
						<Download className="w-5 h-5" />
						Download Repaired PDF
					</button>
					<button
						onClick={handleReset}
						className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
					>
						Repair Another
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
			<div className="flex items-center gap-3 mb-6">
				<div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
					<Wrench className="w-5 h-5 text-orange-600 dark:text-orange-400" />
				</div>
				<div>
					<h2 className="text-lg font-semibold text-gray-900 dark:text-white">
						PDF Repair Tool
					</h2>
					<p className="text-sm text-gray-500 dark:text-gray-400">
						{file.name} • {formatFileSize(file.size)}
					</p>
				</div>
			</div>

			<div className="space-y-6">
				{/* Diagnosing */}
				{isDiagnosing && (
					<div className="text-center py-8">
						<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mx-auto mb-4"></div>
						<p className="text-gray-600 dark:text-gray-400">Diagnosing PDF...</p>
					</div>
				)}

				{/* Diagnostics Results */}
				{diagnostics.length > 0 && !isDiagnosing && (
					<div>
						<h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
							Diagnostic Results
						</h3>
						<div className="space-y-2 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
							{diagnostics.map((diag, index) => (
								<div
									key={index}
									className={cn(
										'flex items-start gap-3 p-3 rounded-lg',
										diag.severity === 'critical' && 'bg-red-50 dark:bg-red-900/20',
										diag.severity === 'error' && 'bg-orange-50 dark:bg-orange-900/20',
										diag.severity === 'warning' && diag.fixed && 'bg-green-50 dark:bg-green-900/20',
										diag.severity === 'warning' && !diag.fixed && 'bg-yellow-50 dark:bg-yellow-900/20'
									)}
								>
									{diag.fixed ? (
										<CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
									) : (
										getSeverityIcon(diag.severity)
									)}
									<div>
										<p className="font-medium text-gray-900 dark:text-white">
											{diag.issue}
										</p>
										{diag.details && (
											<p className="text-sm text-gray-600 dark:text-gray-400">
												{diag.details}
											</p>
										)}
									</div>
								</div>
							))}
						</div>
					</div>
				)}

				{/* No Issues */}
				{diagnostics.length > 0 && !hasIssues && !isDiagnosing && (
					<div className="text-center py-4">
						<FileCheck className="w-12 h-12 text-green-500 mx-auto mb-2" />
						<p className="text-green-700 dark:text-green-400 font-medium">
							PDF appears to be healthy!
						</p>
						<p className="text-sm text-gray-500 mt-1">
							You can still run a repair to optimize the file structure.
						</p>
					</div>
				)}

				{/* Repair Level */}
				{diagnostics.length > 0 && !isDiagnosing && (
					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
							Repair Level
						</label>
						<div className="grid grid-cols-3 gap-2">
							{[
								{ value: 'light', label: 'Light', desc: 'Quick fix' },
								{ value: 'moderate', label: 'Moderate', desc: 'Recommended' },
								{ value: 'aggressive', label: 'Aggressive', desc: 'Deep repair' },
							].map(({ value, label, desc }) => (
								<button
									key={value}
									onClick={() => setSettings({ ...settings, level: value as RepairSettings['level'] })}
									className={cn(
										'py-3 px-3 rounded-lg border text-center transition-colors',
										settings.level === value
											? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
											: 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
									)}
								>
									<div className={cn(
										'font-medium',
										settings.level === value ? 'text-orange-700 dark:text-orange-400' : 'text-gray-700 dark:text-gray-300'
									)}>
										{label}
									</div>
									<div className="text-xs text-gray-500">{desc}</div>
								</button>
							))}
						</div>
					</div>
				)}

				{/* Error Message */}
				{error && (
					<div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg">
						<AlertCircle className="w-5 h-5 flex-shrink-0" />
						<span className="text-sm">{error}</span>
					</div>
				)}

				{/* Repair Progress */}
				{isRepairing && (
					<div className="space-y-2">
						<div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
							<span>Repairing PDF...</span>
							<span>{progress}%</span>
						</div>
						<div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
							<div
								className="h-full bg-orange-500 transition-all duration-300"
								style={{ width: `${progress}%` }}
							/>
						</div>
					</div>
				)}

				{/* Repair Button */}
				{diagnostics.length > 0 && !isDiagnosing && !isRepairing && (
					<button
						onClick={handleRepair}
						className="w-full flex items-center justify-center gap-2 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors"
					>
						<Wrench className="w-5 h-5" />
						Repair PDF
					</button>
				)}
			</div>
		</div>
	);
}
