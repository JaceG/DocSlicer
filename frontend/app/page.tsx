'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { FileUpload } from '@/components/upload/FileUpload';
import { DocumentViewer } from '@/components/viewer/DocumentViewer';
import { PageSelector } from '@/components/slicer/PageSelector';
import { SliceManager } from '@/components/slicer/SliceManager';
import { Header } from '@/components/ui/Header';
import { UploadedFile, PageRange, SliceTask } from '@/types';
import {
	processSliceTasks,
	cleanupBlobUrl,
	cleanupBlobStoreEntry,
	getBlobStoreSize,
} from '@/lib/pdf/slicer';
import {
	processEPUBSliceTasks,
	cleanupEPUBBlobStoreEntry,
	getEPUBBlobStoreSize,
} from '@/lib/epub/slicer';

export default function Home() {
	const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
	const [pageRanges, setPageRanges] = useState<PageRange[]>([]);
	const [sliceTasks, setSliceTasks] = useState<SliceTask[]>([]);
	const sliceTasksRef = useRef<SliceTask[]>([]);

	const handleFileUpload = useCallback((file: UploadedFile) => {
		setUploadedFile(file);
		setPageRanges([]);
		setSliceTasks([]);
		sliceTasksRef.current = []; // Reset ref
	}, []);

	const handlePageCountLoaded = useCallback((pageCount: number) => {
		setUploadedFile((current) => {
			if (current) {
				return {
					...current,
					pageCount: pageCount,
				};
			}
			return current;
		});
	}, []);

	const handleAddPageRange = useCallback((range: PageRange) => {
		setPageRanges((prev) => [...prev, range]);
	}, []);

	const handleRemovePageRange = useCallback((index: number) => {
		setPageRanges((prev) => prev.filter((_, i) => i !== index));
	}, []);

	const handleTaskUpdate = useCallback(
		(taskId: string, updates: Partial<SliceTask>) => {
			setSliceTasks((prev) => {
				const newTasks = prev.map((task) =>
					task.id === taskId ? { ...task, ...updates } : task
				);
				sliceTasksRef.current = newTasks; // Keep ref in sync
				return newTasks;
			});
		},
		[]
	);

	const handleStartSlicing = useCallback(async () => {
		if (!uploadedFile || !uploadedFile.file) return;

		// Find ranges that haven't been sliced yet
		const existingRanges = sliceTasks.map((task) => task.range);
		const newRanges = pageRanges.filter((range) => {
			return !existingRanges.some(
				(existing) =>
					existing.start === range.start && existing.end === range.end
			);
		});

		if (newRanges.length === 0) {
			// All ranges have already been sliced
			return;
		}

		// Create tasks only for new ranges
		const newTasks: SliceTask[] = newRanges.map((range, index) => ({
			id: `task-${Date.now()}-${index}`,
			fileId: uploadedFile.id,
			fileName: `${uploadedFile.name.replace(/\.[^/.]+$/, '')}_pages_${
				range.start
			}-${range.end}.pdf`,
			range,
			status: 'pending' as const,
		}));

		// Add new tasks to existing ones
		setSliceTasks((prev) => {
			const newTaskList = [...prev, ...newTasks];
			sliceTasksRef.current = newTaskList; // Keep ref in sync
			return newTaskList;
		});

		// Start processing only the new tasks
		if (uploadedFile.type === 'pdf') {
			await processSliceTasks(uploadedFile.file, newTasks, handleTaskUpdate);
		} else if (uploadedFile.type === 'epub') {
			await processEPUBSliceTasks(uploadedFile.file, newTasks, handleTaskUpdate);
		}
	}, [uploadedFile, pageRanges, sliceTasks, handleTaskUpdate]);

	const handleNewDocument = useCallback(() => {
		// Cleanup any existing blob URLs and blob store entries to prevent memory leaks
		sliceTasksRef.current.forEach((task) => {
			if (task.outputUrl) {
				cleanupBlobUrl(task.outputUrl);
			}
			if (task.blobKey) {
				if (uploadedFile?.type === 'pdf') {
					cleanupBlobStoreEntry(task.blobKey);
				} else if (uploadedFile?.type === 'epub') {
					cleanupEPUBBlobStoreEntry(task.blobKey);
				}
			}
		});

		setUploadedFile(null);
		setPageRanges([]);
		setSliceTasks([]);
		sliceTasksRef.current = []; // Reset ref
	}, [uploadedFile?.type]);

	// Cleanup blob URLs and blob store when component unmounts only
	useEffect(() => {
		return () => {
			sliceTasksRef.current.forEach((task) => {
				if (task.outputUrl) {
					cleanupBlobUrl(task.outputUrl);
				}
				if (task.blobKey) {
					// Try both cleanup functions since we don't know the file type at unmount
					cleanupBlobStoreEntry(task.blobKey);
					cleanupEPUBBlobStoreEntry(task.blobKey);
				}
			});
		};
	}, []); // Empty dependency array - only run on mount/unmount

	return (
		<div className='min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-indigo-50/30 dark:from-gray-900 dark:via-blue-950/20 dark:to-indigo-950/30'>
			<Header
				onNewDocument={uploadedFile ? handleNewDocument : undefined}
			/>

			<div className='container mx-auto px-4 py-8'>
				{!uploadedFile ? (
					<div className='max-w-4xl mx-auto'>
						<FileUpload onFileUpload={handleFileUpload} />
					</div>
				) : (
					<div className='space-y-8'>
						{/* Document Viewer */}
						<div className='w-full'>
							<DocumentViewer
								file={uploadedFile}
								onPageCountLoaded={handlePageCountLoaded}
							/>
						</div>

						{/* Tools Section */}
						<div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
							<div className='lg:col-span-2'>
								<PageSelector
									file={uploadedFile}
									pageRanges={pageRanges}
									onAddRange={handleAddPageRange}
									onRemoveRange={handleRemovePageRange}
								/>
							</div>

							<div className='lg:col-span-1'>
								<SliceManager
									pageRanges={pageRanges}
									sliceTasks={sliceTasks}
									onStartSlicing={handleStartSlicing}
									disabled={pageRanges.length === 0}
									fileName={uploadedFile.name}
									fileType={uploadedFile.type}
								/>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
