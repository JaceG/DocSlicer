'use client';

import { useState, useCallback } from 'react';
import { Unlock, Download, Eye, EyeOff, CheckCircle, AlertCircle, KeyRound } from 'lucide-react';
import { UploadedFile } from '@/types';
import { unlockPdf, downloadUnlockedPdf, cleanupUnlockedBlobStoreEntry, isPdfPasswordProtected } from '@/lib/pdf/unlock';
import { cn } from '@/lib/utils/cn';

interface UnlockManagerProps {
	file: UploadedFile;
	onComplete?: () => void;
}

export function UnlockManager({ file, onComplete }: UnlockManagerProps) {
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [isProcessing, setIsProcessing] = useState(false);
	const [isChecking, setIsChecking] = useState(false);
	const [isProtected, setIsProtected] = useState<boolean | null>(null);
	const [progress, setProgress] = useState(0);
	const [result, setResult] = useState<{ url: string; blobKey: string } | null>(null);
	const [error, setError] = useState<string | null>(null);

	// Check if PDF is protected on mount
	const checkProtection = useCallback(async () => {
		setIsChecking(true);
		try {
			const protected_ = await isPdfPasswordProtected(file.file);
			setIsProtected(protected_);
			if (!protected_) {
				setError('This PDF is not password protected. No unlocking needed.');
			}
		} catch {
			setIsProtected(null);
		} finally {
			setIsChecking(false);
		}
	}, [file]);

	// Check on component mount
	useState(() => {
		checkProtection();
	});

	const handleUnlock = useCallback(async () => {
		if (!password) {
			setError('Please enter the password');
			return;
		}

		setIsProcessing(true);
		setError(null);
		setProgress(0);

		try {
			const unlockedResult = await unlockPdf(file.file, password, setProgress);
			setResult(unlockedResult);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Failed to unlock PDF');
		} finally {
			setIsProcessing(false);
		}
	}, [file, password]);

	const handleDownload = useCallback(() => {
		if (result) {
			const fileName = file.name.replace('.pdf', '_unlocked.pdf');
			downloadUnlockedPdf(result.url, fileName);
		}
	}, [result, file.name]);

	const handleReset = useCallback(() => {
		if (result) {
			cleanupUnlockedBlobStoreEntry(result.blobKey);
		}
		setResult(null);
		setProgress(0);
		setError(null);
		setPassword('');
	}, [result]);

	if (result) {
		return (
			<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
				<div className="text-center">
					<div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
						<CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
					</div>
					<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
						PDF Unlocked Successfully!
					</h3>
					<p className="text-gray-600 dark:text-gray-400 mb-6">
						Password protection has been removed. Download your unlocked PDF.
					</p>

					<div className="flex justify-center gap-3">
						<button
							onClick={handleDownload}
							className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
						>
							<Download className="w-5 h-5" />
							Download Unlocked PDF
						</button>
						<button
							onClick={handleReset}
							className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
						>
							Unlock Another
						</button>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
			<div className="flex items-center gap-3 mb-6">
				<div className="w-10 h-10 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg flex items-center justify-center">
					<Unlock className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
				</div>
				<div>
					<h2 className="text-lg font-semibold text-gray-900 dark:text-white">
						Remove PDF Password
					</h2>
					<p className="text-sm text-gray-500 dark:text-gray-400">
						{file.name}
					</p>
				</div>
			</div>

			{isChecking ? (
				<div className="flex items-center justify-center py-8">
					<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-600"></div>
					<span className="ml-3 text-gray-600 dark:text-gray-400">Checking PDF protection...</span>
				</div>
			) : isProtected === false ? (
				<div className="text-center py-8">
					<div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
						<Unlock className="w-8 h-8 text-blue-600 dark:text-blue-400" />
					</div>
					<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
						PDF is Not Protected
					</h3>
					<p className="text-gray-600 dark:text-gray-400">
						This PDF doesn&apos;t have password protection. No unlocking needed.
					</p>
				</div>
			) : (
				<div className="space-y-6">
					{/* Info Box */}
					<div className="bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200 dark:border-cyan-800 rounded-lg p-4">
						<div className="flex items-start gap-3">
							<KeyRound className="w-5 h-5 text-cyan-600 dark:text-cyan-400 flex-shrink-0 mt-0.5" />
							<div>
								<h4 className="font-medium text-cyan-800 dark:text-cyan-300">
									Password Required
								</h4>
								<p className="text-sm text-cyan-700 dark:text-cyan-400 mt-1">
									Enter the password you use to open this PDF. We&apos;ll remove the protection
									and create an unlocked copy.
								</p>
							</div>
						</div>
					</div>

					{/* Password Input */}
					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
							PDF Password
						</label>
						<div className="relative">
							<input
								type={showPassword ? 'text' : 'password'}
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								onKeyDown={(e) => e.key === 'Enter' && handleUnlock()}
								placeholder="Enter the PDF password"
								className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
							/>
							<button
								type="button"
								onClick={() => setShowPassword(!showPassword)}
								className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
							>
								{showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
							</button>
						</div>
					</div>

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
								<span>Unlocking PDF...</span>
								<span>{progress}%</span>
							</div>
							<div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
								<div
									className="h-full bg-cyan-500 transition-all duration-300"
									style={{ width: `${progress}%` }}
								/>
							</div>
						</div>
					)}

					{/* Action Button */}
					<button
						onClick={handleUnlock}
						disabled={isProcessing || !password}
						className={cn(
							'w-full flex items-center justify-center gap-2 py-3 rounded-lg font-semibold transition-colors',
							isProcessing || !password
								? 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
								: 'bg-cyan-600 text-white hover:bg-cyan-700'
						)}
					>
						<Unlock className="w-5 h-5" />
						{isProcessing ? 'Unlocking...' : 'Unlock PDF'}
					</button>

					{/* Disclaimer */}
					<p className="text-xs text-gray-500 dark:text-gray-400 text-center">
						Only use this tool on PDFs you own or have permission to unlock.
					</p>
				</div>
			)}
		</div>
	);
}
