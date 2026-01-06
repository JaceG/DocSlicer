'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, AlertTriangle, Loader2, RotateCw, Trash2, GripVertical, CheckCircle2 } from 'lucide-react';
import { OrganizeFile, PageInfo } from '@/types';
import { cn } from '@/lib/utils/cn';

interface FileUploadOrganizeProps {
	onFileUpload: (file: OrganizeFile) => void;
}

export function FileUploadOrganize({ onFileUpload }: FileUploadOrganizeProps) {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const processFile = async (file: File) => {
		setIsLoading(true);
		setError(null);

		try {
			// Dynamically import pdf-lib to get page count
			const { PDFDocument } = await import('pdf-lib');
			const arrayBuffer = await file.arrayBuffer();
			const pdfDoc = await PDFDocument.load(arrayBuffer, {
				ignoreEncryption: true,
			});

			const pageCount = pdfDoc.getPageCount();

			// Create page info array
			const pages: PageInfo[] = Array.from({ length: pageCount }, (_, i) => ({
				pageNumber: i + 1,
				rotation: 0,
				deleted: false,
			}));

			const organizeFile: OrganizeFile = {
				id: `organize-${Date.now()}`,
				name: file.name,
				file: file,
				size: file.size,
				pageCount,
				pages,
			};

			onFileUpload(organizeFile);
		} catch (err) {
			console.error('Failed to process PDF:', err);
			setError('Failed to load PDF. Please ensure the file is a valid PDF document.');
		} finally {
			setIsLoading(false);
		}
	};

	const onDrop = useCallback(async (acceptedFiles: File[]) => {
		if (acceptedFiles.length === 0) return;
		const file = acceptedFiles[0];
		
		if (file.type !== 'application/pdf') {
			setError('Please upload a PDF file');
			return;
		}

		await processFile(file);
	}, []);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: {
			'application/pdf': ['.pdf'],
		},
		maxFiles: 1,
		disabled: isLoading,
	});

	return (
		<div className="space-y-6">
			{/* Feature Description */}
			<div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border-2 border-purple-200 dark:border-purple-800 rounded-xl p-6">
				<div className="flex items-start gap-4">
					<div className="bg-purple-500 rounded-full p-3 flex-shrink-0">
						<FileText className="w-6 h-6 text-white" />
					</div>
					<div>
						<h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
							📄 Organize PDF Pages
						</h3>
						<p className="text-gray-700 dark:text-gray-300 mb-2">
							Rotate, delete, and reorder pages in your PDF. Perfect for fixing scanned documents or removing unwanted pages.
						</p>
						<ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
							<li>• <strong>Rotate</strong> – Fix sideways or upside-down pages</li>
							<li>• <strong>Delete</strong> – Remove unwanted pages</li>
							<li>• <strong>Reorder</strong> – Drag and drop to rearrange pages</li>
						</ul>
					</div>
				</div>
			</div>

			{/* Drop Zone */}
			<div
				{...getRootProps()}
				className={cn(
					'relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-200 cursor-pointer',
					isDragActive
						? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
						: 'border-gray-300 dark:border-gray-700 hover:border-purple-400 dark:hover:border-purple-600 hover:bg-gray-50 dark:hover:bg-gray-800/50',
					isLoading && 'pointer-events-none opacity-60'
				)}
			>
				<input {...getInputProps()} />

				{isLoading ? (
					<div className="flex flex-col items-center">
						<Loader2 className="h-12 w-12 text-purple-500 animate-spin mb-4" />
						<p className="text-lg font-medium text-gray-900 dark:text-gray-100">
							Loading PDF...
						</p>
						<p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
							Analyzing pages and generating previews
						</p>
					</div>
				) : isDragActive ? (
					<div className="flex flex-col items-center">
						<Upload className="h-12 w-12 text-purple-500 mb-4" />
						<p className="text-lg font-medium text-gray-900 dark:text-gray-100">
							Drop your PDF here
						</p>
					</div>
				) : (
					<div className="flex flex-col items-center">
						<div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
							<Upload className="h-8 w-8 text-white" />
						</div>
						<p className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
							Drop your PDF here or click to browse
						</p>
						<p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
							Supports PDF files up to 100MB
						</p>

						{/* Features Grid */}
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-2xl">
							<div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
								<RotateCw className="h-5 w-5 text-purple-600 dark:text-purple-400 flex-shrink-0" />
								<div className="text-left">
									<p className="text-sm font-medium text-gray-900 dark:text-gray-100">Rotate Pages</p>
									<p className="text-xs text-gray-600 dark:text-gray-400">90°, 180°, 270°</p>
								</div>
							</div>
							<div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
								<Trash2 className="h-5 w-5 text-purple-600 dark:text-purple-400 flex-shrink-0" />
								<div className="text-left">
									<p className="text-sm font-medium text-gray-900 dark:text-gray-100">Delete Pages</p>
									<p className="text-xs text-gray-600 dark:text-gray-400">Remove unwanted</p>
								</div>
							</div>
							<div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
								<GripVertical className="h-5 w-5 text-purple-600 dark:text-purple-400 flex-shrink-0" />
								<div className="text-left">
									<p className="text-sm font-medium text-gray-900 dark:text-gray-100">Reorder</p>
									<p className="text-xs text-gray-600 dark:text-gray-400">Drag and drop</p>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>

			{/* Error Message */}
			{error && (
				<div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
					<AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
					<p className="text-sm text-red-700 dark:text-red-300">{error}</p>
				</div>
			)}
		</div>
	);
}
