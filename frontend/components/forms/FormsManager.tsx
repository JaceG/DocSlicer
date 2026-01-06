'use client';

import { useState, useCallback, useEffect } from 'react';
import {
	FileText,
	Download,
	Loader2,
	CheckSquare,
	Type,
	List,
	RefreshCw,
	AlertCircle,
} from 'lucide-react';
import { UploadedFile, FormField } from '@/types';
import { detectFormFields, fillFormFields, getFormStats, hasFormFields } from '@/lib/pdf/forms';
import { cn } from '@/lib/utils/cn';
import { useSubscription } from '@/lib/subscription/hooks';
import { getRemainingForms, incrementFormsUsage } from '@/lib/subscription/usage';
import { useRouter } from 'next/navigation';

interface FormsManagerProps {
	file: UploadedFile;
	onReset: () => void;
}

export function FormsManager({ file, onReset }: FormsManagerProps) {
	const [isLoading, setIsLoading] = useState(true);
	const [hasFields, setHasFields] = useState(false);
	const [fields, setFields] = useState<FormField[]>([]);
	const [fieldValues, setFieldValues] = useState<Map<string, string | boolean>>(new Map());
	const [isProcessing, setIsProcessing] = useState(false);
	const [progress, setProgress] = useState(0);
	const [error, setError] = useState<string | null>(null);
	const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
	const [stats, setStats] = useState<{
		totalFields: number;
		textFields: number;
		checkboxes: number;
		dropdowns: number;
		radioGroups: number;
		filledFields: number;
	} | null>(null);
	
	const { isPremium, limits } = useSubscription();
	const router = useRouter();

	// Detect form fields on mount
	useEffect(() => {
		async function loadFields() {
			setIsLoading(true);
			try {
				const hasFieldsResult = await hasFormFields(file.file);
				setHasFields(hasFieldsResult);
				
				if (hasFieldsResult) {
					const detectedFields = await detectFormFields(file.file);
					setFields(detectedFields);
					
					// Initialize values from existing field values
					const initialValues = new Map<string, string | boolean>();
					detectedFields.forEach(field => {
						if (field.value !== undefined && field.value !== '') {
							initialValues.set(field.name, field.value);
						}
					});
					setFieldValues(initialValues);
					
					const fieldStats = await getFormStats(file.file);
					setStats(fieldStats);
				}
			} catch (err) {
				setError('Failed to load form fields');
			} finally {
				setIsLoading(false);
			}
		}
		
		loadFields();
	}, [file]);

	const handleFieldChange = useCallback((fieldName: string, value: string | boolean) => {
		setFieldValues(prev => {
			const newValues = new Map(prev);
			newValues.set(fieldName, value);
			return newValues;
		});
	}, []);

	const handleFillForm = useCallback(async () => {
		// Check usage limit for free users
		if (!isPremium) {
			const remaining = getRemainingForms(limits.maxFormsPerMonth);
			if (remaining <= 0) {
				alert(
					`You've reached your monthly limit of ${limits.maxFormsPerMonth} form filling operations. Please upgrade to Premium for unlimited access.`
				);
				router.push('/pricing');
				return;
			}
		}

		if (fieldValues.size === 0) {
			setError('No fields to fill');
			return;
		}

		setIsProcessing(true);
		setProgress(0);
		setError(null);

		try {
			const blob = await fillFormFields(file.file, fieldValues, setProgress);
			// Increment usage counter on success
			if (!isPremium) {
				incrementFormsUsage();
			}
			const url = URL.createObjectURL(blob);
			setDownloadUrl(url);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Failed to fill form');
		} finally {
			setIsProcessing(false);
		}
	}, [file, fieldValues, isPremium, limits, router]);

	const handleDownload = useCallback(() => {
		if (!downloadUrl) return;

		const link = document.createElement('a');
		link.href = downloadUrl;
		link.download = `${file.name.replace('.pdf', '')}_filled.pdf`;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}, [downloadUrl, file.name]);

	const handleClearAll = useCallback(() => {
		setFieldValues(new Map());
	}, []);

	const getFieldIcon = (type: string) => {
		switch (type) {
			case 'checkbox':
				return CheckSquare;
			case 'dropdown':
			case 'radio':
				return List;
			default:
				return Type;
		}
	};

	if (isLoading) {
		return (
			<div className="max-w-4xl mx-auto">
				<div className="bg-white dark:bg-gray-800 rounded-xl p-12 shadow-lg text-center">
					<Loader2 className="h-12 w-12 mx-auto mb-4 animate-spin text-blue-500" />
					<p className="text-gray-600 dark:text-gray-400">Detecting form fields...</p>
				</div>
			</div>
		);
	}

	if (!hasFields) {
		return (
			<div className="max-w-4xl mx-auto">
				<div className="bg-white dark:bg-gray-800 rounded-xl p-12 shadow-lg text-center">
					<AlertCircle className="h-12 w-12 mx-auto mb-4 text-amber-500" />
					<h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
						No Fillable Forms Found
					</h2>
					<p className="text-gray-600 dark:text-gray-400 mb-6">
						This PDF doesn&apos;t contain any interactive form fields.
					</p>
					<button
						onClick={onReset}
						className="px-6 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
					>
						Try Another PDF
					</button>
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
							Fill PDF Form
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

				{/* Stats */}
				{stats && (
					<div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
						<div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 text-center">
							<div className="text-2xl font-bold text-blue-500">{stats.totalFields}</div>
							<div className="text-xs text-gray-500">Total Fields</div>
						</div>
						<div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 text-center">
							<div className="text-2xl font-bold text-gray-700 dark:text-gray-300">{stats.textFields}</div>
							<div className="text-xs text-gray-500">Text Fields</div>
						</div>
						<div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 text-center">
							<div className="text-2xl font-bold text-gray-700 dark:text-gray-300">{stats.checkboxes}</div>
							<div className="text-xs text-gray-500">Checkboxes</div>
						</div>
						<div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 text-center">
							<div className="text-2xl font-bold text-gray-700 dark:text-gray-300">{stats.dropdowns}</div>
							<div className="text-xs text-gray-500">Dropdowns</div>
						</div>
						<div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 text-center">
							<div className="text-2xl font-bold text-green-500">{fieldValues.size}</div>
							<div className="text-xs text-gray-500">Filled</div>
						</div>
					</div>
				)}
			</div>

			{/* Form Fields */}
			<div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
				<div className="flex items-center justify-between mb-4">
					<h3 className="text-lg font-medium text-gray-900 dark:text-white">
						Form Fields
					</h3>
					<button
						onClick={handleClearAll}
						className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
					>
						<RefreshCw className="h-4 w-4" />
						Clear All
					</button>
				</div>

				<div className="space-y-4">
					{fields.map((field) => {
						const Icon = getFieldIcon(field.type);
						const currentValue = fieldValues.get(field.name) ?? field.value;
						
						return (
							<div
								key={field.id}
								className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg"
							>
								<div className="flex items-center gap-3 mb-2">
									<Icon className="h-5 w-5 text-gray-400" />
									<label className="font-medium text-gray-700 dark:text-gray-300">
										{field.name}
										{field.required && <span className="text-red-500 ml-1">*</span>}
									</label>
									<span className="text-xs text-gray-400 ml-auto">
										Page {field.pageNumber}
									</span>
								</div>

								{field.type === 'text' && (
									<input
										type="text"
										value={currentValue as string || ''}
										onChange={(e) => handleFieldChange(field.name, e.target.value)}
										disabled={field.readonly}
										className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:opacity-50"
										placeholder="Enter value..."
									/>
								)}

								{field.type === 'checkbox' && (
									<label className="flex items-center gap-2 cursor-pointer">
										<input
											type="checkbox"
											checked={currentValue as boolean || false}
											onChange={(e) => handleFieldChange(field.name, e.target.checked)}
											disabled={field.readonly}
											className="w-5 h-5 rounded"
										/>
										<span className="text-gray-600 dark:text-gray-400">Check this box</span>
									</label>
								)}

								{field.type === 'dropdown' && field.options && (
									<select
										value={currentValue as string || ''}
										onChange={(e) => handleFieldChange(field.name, e.target.value)}
										disabled={field.readonly}
										className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
									>
										<option value="">Select an option...</option>
										{field.options.map((opt) => (
											<option key={opt} value={opt}>{opt}</option>
										))}
									</select>
								)}

								{field.type === 'radio' && field.options && (
									<div className="flex flex-wrap gap-4">
										{field.options.map((opt) => (
											<label key={opt} className="flex items-center gap-2 cursor-pointer">
												<input
													type="radio"
													name={field.name}
													value={opt}
													checked={currentValue === opt}
													onChange={(e) => handleFieldChange(field.name, e.target.value)}
													disabled={field.readonly}
													className="w-4 h-4"
												/>
												<span className="text-gray-600 dark:text-gray-400">{opt}</span>
											</label>
										))}
									</div>
								)}
							</div>
						);
					})}
				</div>
			</div>

			{/* Apply & Download */}
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
								Filling form... {Math.round(progress)}%
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
							<span>Form filled successfully!</span>
						</div>
						<button
							onClick={handleDownload}
							className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium"
						>
							<Download className="h-5 w-5" />
							Download Filled PDF
						</button>
					</div>
				) : (
					<button
						onClick={handleFillForm}
						disabled={fieldValues.size === 0}
						className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-medium"
					>
						<FileText className="h-5 w-5" />
						Fill Form ({fieldValues.size} field{fieldValues.size !== 1 ? 's' : ''})
					</button>
				)}
			</div>
		</div>
	);
}
