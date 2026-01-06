'use client';

import { useState, useCallback } from 'react';
import { Lock, Download, Eye, EyeOff, Shield, CheckCircle, AlertCircle } from 'lucide-react';
import { UploadedFile, ProtectionSettings } from '@/types';
import { protectPdf, downloadProtectedPdf, cleanupProtectedBlobStoreEntry } from '@/lib/pdf/protect';
import { cn } from '@/lib/utils/cn';

interface ProtectManagerProps {
	file: UploadedFile;
	onComplete?: () => void;
}

export function ProtectManager({ file, onComplete }: ProtectManagerProps) {
	const [settings, setSettings] = useState<ProtectionSettings>({
		userPassword: '',
		ownerPassword: '',
		encryptionLevel: 'aes-256',
		permissions: {
			printing: true,
			copying: false,
			modifying: false,
			annotating: true,
		},
	});

	const [showPassword, setShowPassword] = useState(false);
	const [showOwnerPassword, setShowOwnerPassword] = useState(false);
	const [isProcessing, setIsProcessing] = useState(false);
	const [progress, setProgress] = useState(0);
	const [result, setResult] = useState<{ url: string; blobKey: string } | null>(null);
	const [error, setError] = useState<string | null>(null);

	const handleProtect = useCallback(async () => {
		if (!settings.userPassword) {
			setError('Please enter a password');
			return;
		}

		if (settings.userPassword.length < 4) {
			setError('Password must be at least 4 characters');
			return;
		}

		setIsProcessing(true);
		setError(null);
		setProgress(0);

		try {
			const protectedResult = await protectPdf(file.file, settings, setProgress);
			setResult(protectedResult);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Failed to protect PDF');
		} finally {
			setIsProcessing(false);
		}
	}, [file, settings]);

	const handleDownload = useCallback(() => {
		if (result) {
			const fileName = file.name.replace('.pdf', '_protected.pdf');
			downloadProtectedPdf(result.url, fileName);
		}
	}, [result, file.name]);

	const handleReset = useCallback(() => {
		if (result) {
			cleanupProtectedBlobStoreEntry(result.blobKey);
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
						PDF Protected Successfully!
					</h3>
					<p className="text-gray-600 dark:text-gray-400 mb-6">
						Your PDF is now password protected and ready to download.
					</p>

					<div className="flex justify-center gap-3">
						<button
							onClick={handleDownload}
							className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
						>
							<Download className="w-5 h-5" />
							Download Protected PDF
						</button>
						<button
							onClick={handleReset}
							className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
						>
							Protect Another
						</button>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
			<div className="flex items-center gap-3 mb-6">
				<div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center">
					<Lock className="w-5 h-5 text-amber-600 dark:text-amber-400" />
				</div>
				<div>
					<h2 className="text-lg font-semibold text-gray-900 dark:text-white">
						Password Protect PDF
					</h2>
					<p className="text-sm text-gray-500 dark:text-gray-400">
						{file.name}
					</p>
				</div>
			</div>

			<div className="space-y-6">
				{/* User Password */}
				<div>
					<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
						Password to Open PDF *
					</label>
					<div className="relative">
						<input
							type={showPassword ? 'text' : 'password'}
							value={settings.userPassword}
							onChange={(e) => setSettings({ ...settings, userPassword: e.target.value })}
							placeholder="Enter password"
							className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
						/>
						<button
							type="button"
							onClick={() => setShowPassword(!showPassword)}
							className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
						>
							{showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
						</button>
					</div>
					<p className="mt-1 text-xs text-gray-500">
						Users will need this password to open the PDF
					</p>
				</div>

				{/* Owner Password (Optional) */}
				<div>
					<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
						Owner Password (Optional)
					</label>
					<div className="relative">
						<input
							type={showOwnerPassword ? 'text' : 'password'}
							value={settings.ownerPassword || ''}
							onChange={(e) => setSettings({ ...settings, ownerPassword: e.target.value })}
							placeholder="Enter owner password"
							className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
						/>
						<button
							type="button"
							onClick={() => setShowOwnerPassword(!showOwnerPassword)}
							className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
						>
							{showOwnerPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
						</button>
					</div>
					<p className="mt-1 text-xs text-gray-500">
						For full access to modify permissions
					</p>
				</div>

				{/* Permissions */}
				<div>
					<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
						Permissions
					</label>
					<div className="grid grid-cols-2 gap-3">
						{[
							{ key: 'printing', label: 'Allow Printing' },
							{ key: 'copying', label: 'Allow Copying' },
							{ key: 'modifying', label: 'Allow Modifying' },
							{ key: 'annotating', label: 'Allow Annotating' },
						].map(({ key, label }) => (
							<label
								key={key}
								className={cn(
									'flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors',
									settings.permissions[key as keyof typeof settings.permissions]
										? 'border-amber-500 bg-amber-50 dark:bg-amber-900/20'
										: 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
								)}
							>
								<input
									type="checkbox"
									checked={settings.permissions[key as keyof typeof settings.permissions]}
									onChange={(e) =>
										setSettings({
											...settings,
											permissions: {
												...settings.permissions,
												[key]: e.target.checked,
											},
										})
									}
									className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500"
								/>
								<span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>
							</label>
						))}
					</div>
				</div>

				{/* Encryption Level */}
				<div>
					<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
						Encryption Level
					</label>
					<div className="flex gap-3">
						{[
							{ value: 'aes-128', label: 'AES-128' },
							{ value: 'aes-256', label: 'AES-256 (Recommended)' },
						].map(({ value, label }) => (
							<button
								key={value}
								onClick={() => setSettings({ ...settings, encryptionLevel: value as 'aes-128' | 'aes-256' })}
								className={cn(
									'flex-1 py-2 px-4 rounded-lg border font-medium transition-colors',
									settings.encryptionLevel === value
										? 'border-amber-500 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400'
										: 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300'
								)}
							>
								{label}
							</button>
						))}
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
							<span>Protecting PDF...</span>
							<span>{progress}%</span>
						</div>
						<div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
							<div
								className="h-full bg-amber-500 transition-all duration-300"
								style={{ width: `${progress}%` }}
							/>
						</div>
					</div>
				)}

				{/* Action Button */}
				<button
					onClick={handleProtect}
					disabled={isProcessing || !settings.userPassword}
					className={cn(
						'w-full flex items-center justify-center gap-2 py-3 rounded-lg font-semibold transition-colors',
						isProcessing || !settings.userPassword
							? 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
							: 'bg-amber-600 text-white hover:bg-amber-700'
					)}
				>
					<Shield className="w-5 h-5" />
					{isProcessing ? 'Protecting...' : 'Protect PDF'}
				</button>
			</div>
		</div>
	);
}
