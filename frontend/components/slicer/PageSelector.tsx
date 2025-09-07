'use client';

import { useState } from 'react';
import { Plus, Trash2, FileText, AlertTriangle } from 'lucide-react';
import { UploadedFile, PageRange } from '@/types';
import { cn } from '@/lib/utils/cn';

interface PageSelectorProps {
	file: UploadedFile;
	pageRanges: PageRange[];
	onAddRange: (range: PageRange) => void;
	onRemoveRange: (index: number) => void;
}

export function PageSelector({
	file,
	pageRanges,
	onAddRange,
	onRemoveRange,
}: PageSelectorProps) {
	const [startPage, setStartPage] = useState<string>('');
	const [endPage, setEndPage] = useState<string>('');
	const [rangeName, setRangeName] = useState<string>('');
	const [error, setError] = useState<string>('');

	const totalPages = file.pageCount || 0;

	const validateRange = (): boolean => {
		const start = parseInt(startPage);
		const end = parseInt(endPage);

		if (!startPage || !endPage) {
			setError('Please enter both start and end pages');
			return false;
		}

		if (isNaN(start) || isNaN(end)) {
			setError('Page numbers must be valid numbers');
			return false;
		}

		if (start < 1 || end > totalPages) {
			setError(`Page numbers must be between 1 and ${totalPages}`);
			return false;
		}

		if (start > end) {
			setError('Start page must be less than or equal to end page');
			return false;
		}

		// Check for overlapping ranges
		const overlapping = pageRanges.some(
			(range) =>
				(start >= range.start && start <= range.end) ||
				(end >= range.start && end <= range.end) ||
				(start <= range.start && end >= range.end)
		);

		if (overlapping) {
			setError('Page range overlaps with existing selections');
			return false;
		}

		return true;
	};

	const handleAddRange = () => {
		setError('');

		if (!validateRange()) return;

		const range: PageRange = {
			start: parseInt(startPage),
			end: parseInt(endPage),
			name: rangeName.trim() || undefined,
		};

		onAddRange(range);

		// Reset form
		setStartPage('');
		setEndPage('');
		setRangeName('');
	};

	const getTotalSelectedPages = () => {
		return pageRanges.reduce(
			(total, range) => total + (range.end - range.start + 1),
			0
		);
	};

	if (totalPages === 0) {
		return (
			<div className='bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 p-8'>
				<div className='text-center'>
					<AlertTriangle className='h-12 w-12 text-amber-500 mx-auto mb-4' />
					<h3 className='text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2'>
						Document Loading
					</h3>
					<p className='text-gray-600 dark:text-gray-400'>
						Please wait while we analyze your document to enable
						page selection.
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className='bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden'>
			<div className='border-b border-gray-200 dark:border-gray-800 px-6 py-4'>
				<div className='flex items-center justify-between'>
					<h3 className='text-lg font-semibold text-gray-900 dark:text-gray-100'>
						Select Page Ranges
					</h3>
					<div className='text-sm text-gray-600 dark:text-gray-400'>
						{getTotalSelectedPages()} of {totalPages} pages selected
					</div>
				</div>
			</div>

			<div className='p-6'>
				{/* Add Range Form */}
				<div className='space-y-6 mb-8'>
					<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
								Start Page
							</label>
							<input
								type='number'
								value={startPage}
								onChange={(e) => setStartPage(e.target.value)}
								placeholder='1'
								min={1}
								max={totalPages}
								className='w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors'
							/>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
								End Page
							</label>
							<input
								type='number'
								value={endPage}
								onChange={(e) => setEndPage(e.target.value)}
								placeholder={totalPages.toString()}
								min={1}
								max={totalPages}
								className='w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors'
							/>
						</div>
					</div>

					<div>
						<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
							Section Name (optional)
						</label>
						<input
							type='text'
							value={rangeName}
							onChange={(e) => setRangeName(e.target.value)}
							placeholder='e.g., Chapter 1, Introduction, Appendix'
							className='w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors'
						/>
					</div>

					{error && (
						<div className='p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start space-x-3'>
							<AlertTriangle className='h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5' />
							<p className='text-sm text-red-700 dark:text-red-300'>
								{error}
							</p>
						</div>
					)}

					<button
						onClick={handleAddRange}
						className='w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'>
						<Plus className='h-5 w-5' />
						<span>Add Page Range</span>
					</button>
				</div>

				{/* Selected Ranges */}
				<div>
					<h4 className='text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center space-x-2'>
						<span>Selected Ranges</span>
						<span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200'>
							{pageRanges.length}
						</span>
					</h4>

					{pageRanges.length === 0 ? (
						<div className='text-center py-8'>
							<FileText className='h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-4' />
							<p className='text-gray-500 dark:text-gray-400'>
								No page ranges selected yet
							</p>
							<p className='text-sm text-gray-400 dark:text-gray-500 mt-1'>
								Add a range above to get started
							</p>
						</div>
					) : (
						<div className='space-y-3'>
							{pageRanges.map((range, index) => (
								<div
									key={index}
									className='group flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 hover:shadow-md transition-all duration-200'>
									<div className='flex items-center space-x-4'>
										<div className='w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center'>
											<FileText className='h-5 w-5 text-blue-600 dark:text-blue-400' />
										</div>
										<div>
											<p className='text-sm font-semibold text-gray-900 dark:text-gray-100'>
												{range.name ||
													`Pages ${range.start}-${range.end}`}
											</p>
											<div className='flex items-center space-x-4 text-xs text-gray-600 dark:text-gray-400'>
												<span>
													{range.end -
														range.start +
														1}{' '}
													pages
												</span>
												<span>•</span>
												<span>
													Pages {range.start} to{' '}
													{range.end}
												</span>
											</div>
										</div>
									</div>
									<button
										onClick={() => onRemoveRange(index)}
										className='opacity-0 group-hover:opacity-100 p-2 text-gray-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200'
										title='Remove range'>
										<Trash2 className='h-4 w-4' />
									</button>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
