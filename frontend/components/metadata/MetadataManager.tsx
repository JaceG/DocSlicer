'use client';

import { useState, useCallback, useEffect } from 'react';
import {
	FileText,
	Download,
	Loader2,
	User,
	Tag,
	Calendar,
	Settings,
	Trash2,
	Plus,
	Save,
} from 'lucide-react';
import { UploadedFile, PdfMetadata } from '@/types';
import { readMetadata, writeMetadata, removeMetadata, validateMetadata } from '@/lib/pdf/metadata';
import { cn } from '@/lib/utils/cn';
import { useSubscription } from '@/lib/subscription/hooks';
import { getRemainingMetadata, incrementMetadataUsage } from '@/lib/subscription/usage';
import { useRouter } from 'next/navigation';

interface MetadataManagerProps {
	file: UploadedFile;
	onReset: () => void;
}

export function MetadataManager({ file, onReset }: MetadataManagerProps) {
	const [isLoading, setIsLoading] = useState(true);
	const [originalMetadata, setOriginalMetadata] = useState<PdfMetadata | null>(null);
	const [metadata, setMetadata] = useState<PdfMetadata>({
		title: '',
		author: '',
		subject: '',
		keywords: [],
		creator: '',
		producer: '',
		customFields: [],
	});
	const [newKeyword, setNewKeyword] = useState('');
	const [newCustomKey, setNewCustomKey] = useState('');
	const [newCustomValue, setNewCustomValue] = useState('');
	
	const [isProcessing, setIsProcessing] = useState(false);
	const [progress, setProgress] = useState(0);
	const [error, setError] = useState<string | null>(null);
	const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
	
	const { isPremium, limits } = useSubscription();
	const router = useRouter();

	// Load metadata on mount
	useEffect(() => {
		async function loadMetadata() {
			setIsLoading(true);
			try {
				const meta = await readMetadata(file.file);
				setOriginalMetadata(meta);
				setMetadata(meta);
			} catch (err) {
				setError('Failed to read metadata');
			} finally {
				setIsLoading(false);
			}
		}
		loadMetadata();
	}, [file]);

	const handleAddKeyword = useCallback(() => {
		if (newKeyword.trim() && !metadata.keywords.includes(newKeyword.trim())) {
			setMetadata(prev => ({
				...prev,
				keywords: [...prev.keywords, newKeyword.trim()],
			}));
			setNewKeyword('');
		}
	}, [newKeyword, metadata.keywords]);

	const handleRemoveKeyword = useCallback((keyword: string) => {
		setMetadata(prev => ({
			...prev,
			keywords: prev.keywords.filter(k => k !== keyword),
		}));
	}, []);

	const handleAddCustomField = useCallback(() => {
		if (newCustomKey.trim()) {
			setMetadata(prev => ({
				...prev,
				customFields: [...prev.customFields, { key: newCustomKey.trim(), value: newCustomValue }],
			}));
			setNewCustomKey('');
			setNewCustomValue('');
		}
	}, [newCustomKey, newCustomValue]);

	const handleRemoveCustomField = useCallback((index: number) => {
		setMetadata(prev => ({
			...prev,
			customFields: prev.customFields.filter((_, i) => i !== index),
		}));
	}, []);

	const handleSaveMetadata = useCallback(async () => {
		// Check usage limit for free users
		if (!isPremium) {
			const remaining = getRemainingMetadata(limits.maxMetadataPerMonth);
			if (remaining <= 0) {
				alert(
					`You've reached your monthly limit of ${limits.maxMetadataPerMonth} metadata editing operations. Please upgrade to Premium for unlimited access.`
				);
				router.push('/pricing');
				return;
			}
		}

		const validation = validateMetadata(metadata);
		if (!validation.valid) {
			setError(validation.errors.join(', '));
			return;
		}

		setIsProcessing(true);
		setProgress(0);
		setError(null);

		try {
			const blob = await writeMetadata(file.file, metadata, setProgress);
			// Increment usage counter on success
			if (!isPremium) {
				incrementMetadataUsage();
			}
			const url = URL.createObjectURL(blob);
			setDownloadUrl(url);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Failed to save metadata');
		} finally {
			setIsProcessing(false);
		}
	}, [file, metadata, isPremium, limits, router]);

	const handleClearMetadata = useCallback(async () => {
		// Check usage limit for free users
		if (!isPremium) {
			const remaining = getRemainingMetadata(limits.maxMetadataPerMonth);
			if (remaining <= 0) {
				alert(
					`You've reached your monthly limit of ${limits.maxMetadataPerMonth} metadata editing operations. Please upgrade to Premium for unlimited access.`
				);
				router.push('/pricing');
				return;
			}
		}

		setIsProcessing(true);
		setProgress(0);
		setError(null);

		try {
			const blob = await removeMetadata(file.file, setProgress);
			// Increment usage counter on success
			if (!isPremium) {
				incrementMetadataUsage();
			}
			const url = URL.createObjectURL(blob);
			setDownloadUrl(url);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Failed to clear metadata');
		} finally {
			setIsProcessing(false);
		}
	}, [file, isPremium, limits, router]);

	const handleDownload = useCallback(() => {
		if (!downloadUrl) return;

		const link = document.createElement('a');
		link.href = downloadUrl;
		link.download = `${file.name.replace('.pdf', '')}_metadata_updated.pdf`;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}, [downloadUrl, file.name]);

	const hasChanges = JSON.stringify(metadata) !== JSON.stringify(originalMetadata);

	if (isLoading) {
		return (
			<div className="max-w-4xl mx-auto">
				<div className="bg-white dark:bg-gray-800 rounded-xl p-12 shadow-lg text-center">
					<Loader2 className="h-12 w-12 mx-auto mb-4 animate-spin text-blue-500" />
					<p className="text-gray-600 dark:text-gray-400">Reading metadata...</p>
				</div>
			</div>
		);
	}

	return (
		<div className="max-w-4xl mx-auto space-y-6">
			{/* Header */}
			<div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
				<div className="flex items-center justify-between mb-4">
					<div>
						<h2 className="text-xl font-semibold text-gray-900 dark:text-white">
							Edit PDF Metadata
						</h2>
						<p className="text-sm text-gray-500 dark:text-gray-400">
							{file.name}
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

			{/* Basic Metadata */}
			<div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
				<h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center gap-2">
					<FileText className="h-5 w-5" />
					Document Information
				</h3>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
							Title
						</label>
						<input
							type="text"
							value={metadata.title}
							onChange={(e) => setMetadata(prev => ({ ...prev, title: e.target.value }))}
							className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
							placeholder="Document title"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
							<User className="h-4 w-4 inline mr-1" />
							Author
						</label>
						<input
							type="text"
							value={metadata.author}
							onChange={(e) => setMetadata(prev => ({ ...prev, author: e.target.value }))}
							className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
							placeholder="Author name"
						/>
					</div>

					<div className="md:col-span-2">
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
							Subject
						</label>
						<textarea
							value={metadata.subject}
							onChange={(e) => setMetadata(prev => ({ ...prev, subject: e.target.value }))}
							className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
							placeholder="Document subject or description"
							rows={2}
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
							<Settings className="h-4 w-4 inline mr-1" />
							Creator Application
						</label>
						<input
							type="text"
							value={metadata.creator}
							onChange={(e) => setMetadata(prev => ({ ...prev, creator: e.target.value }))}
							className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
							placeholder="e.g., Microsoft Word"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
							Producer
						</label>
						<input
							type="text"
							value={metadata.producer}
							onChange={(e) => setMetadata(prev => ({ ...prev, producer: e.target.value }))}
							className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
							placeholder="PDF producer"
						/>
					</div>
				</div>

				{/* Dates (read-only info) */}
				{(metadata.creationDate || metadata.modificationDate) && (
					<div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
						<div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
							<Calendar className="h-4 w-4" />
							{metadata.creationDate && (
								<span>Created: {metadata.creationDate.toLocaleString()}</span>
							)}
							{metadata.modificationDate && (
								<span className="ml-4">Modified: {metadata.modificationDate.toLocaleString()}</span>
							)}
						</div>
					</div>
				)}
			</div>

			{/* Keywords */}
			<div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
				<h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center gap-2">
					<Tag className="h-5 w-5" />
					Keywords
				</h3>

				{/* Keyword Tags */}
				<div className="flex flex-wrap gap-2 mb-4">
					{metadata.keywords.map((keyword) => (
						<span
							key={keyword}
							className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm"
						>
							{keyword}
							<button
								onClick={() => handleRemoveKeyword(keyword)}
								className="hover:text-red-500 ml-1"
							>
								×
							</button>
						</span>
					))}
					{metadata.keywords.length === 0 && (
						<span className="text-gray-400 text-sm">No keywords</span>
					)}
				</div>

				{/* Add Keyword */}
				<div className="flex gap-2">
					<input
						type="text"
						value={newKeyword}
						onChange={(e) => setNewKeyword(e.target.value)}
						onKeyDown={(e) => e.key === 'Enter' && handleAddKeyword()}
						className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
						placeholder="Add keyword..."
					/>
					<button
						onClick={handleAddKeyword}
						disabled={!newKeyword.trim()}
						className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
					>
						<Plus className="h-5 w-5" />
					</button>
				</div>
			</div>

			{/* Custom Fields */}
			<div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
				<h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
					Custom Fields
				</h3>

				{/* Custom Fields List */}
				<div className="space-y-2 mb-4">
					{metadata.customFields.map((field, index) => (
						<div
							key={index}
							className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg"
						>
							<span className="font-medium text-gray-700 dark:text-gray-300 min-w-[100px]">
								{field.key}:
							</span>
							<span className="flex-1 text-gray-600 dark:text-gray-400">
								{field.value}
							</span>
							<button
								onClick={() => handleRemoveCustomField(index)}
								className="text-gray-400 hover:text-red-500"
							>
								<Trash2 className="h-4 w-4" />
							</button>
						</div>
					))}
					{metadata.customFields.length === 0 && (
						<p className="text-gray-400 text-sm">No custom fields</p>
					)}
				</div>

				{/* Add Custom Field */}
				<div className="flex gap-2">
					<input
						type="text"
						value={newCustomKey}
						onChange={(e) => setNewCustomKey(e.target.value)}
						className="w-32 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
						placeholder="Key"
					/>
					<input
						type="text"
						value={newCustomValue}
						onChange={(e) => setNewCustomValue(e.target.value)}
						className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
						placeholder="Value"
					/>
					<button
						onClick={handleAddCustomField}
						disabled={!newCustomKey.trim()}
						className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
					>
						<Plus className="h-5 w-5" />
					</button>
				</div>
			</div>

			{/* Actions */}
			<div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
				{error && (
					<div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg">
						{error}
					</div>
				)}

				{isProcessing ? (
					<div className="space-y-4">
						<div className="flex items-center gap-3">
							<Loader2 className="h-5 w-5 animate-spin text-blue-500" />
							<span className="text-gray-600 dark:text-gray-400">
								Updating metadata... {Math.round(progress)}%
							</span>
						</div>
						<div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
							<div
								className="bg-blue-500 h-2 rounded-full transition-all"
								style={{ width: `${progress}%` }}
							/>
						</div>
					</div>
				) : downloadUrl ? (
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3 text-green-600 dark:text-green-400">
							<div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
								✓
							</div>
							<span>Metadata updated!</span>
						</div>
						<button
							onClick={handleDownload}
							className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium"
						>
							<Download className="h-5 w-5" />
							Download PDF
						</button>
					</div>
				) : (
					<div className="flex gap-3">
						<button
							onClick={handleSaveMetadata}
							disabled={!hasChanges}
							className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-medium"
						>
							<Save className="h-5 w-5" />
							Save Changes
						</button>
						<button
							onClick={handleClearMetadata}
							className="flex items-center justify-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium"
						>
							<Trash2 className="h-5 w-5" />
							Clear All
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
