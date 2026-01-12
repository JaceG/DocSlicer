'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import {
	Highlighter,
	Type,
	ArrowRight,
	Square,
	Circle,
	Pencil,
	Download,
	Trash2,
	Undo,
	RotateCcw,
	Loader2,
	ChevronLeft,
	ChevronRight,
	Plus,
} from 'lucide-react';
import { UploadedFile, Annotation, AnnotationType } from '@/types';
import { applyAnnotations, getPageDimensions } from '@/lib/pdf/annotate';
import { cn } from '@/lib/utils/cn';
import { useSubscription } from '@/lib/subscription/hooks';
import {
	getRemainingAnnotate,
	incrementAnnotateUsage,
} from '@/lib/subscription/usage';
import { useRouter } from 'next/navigation';

interface AnnotateManagerProps {
	file: UploadedFile;
	onReset: () => void;
}

const ANNOTATION_TOOLS: Array<{
	type: AnnotationType;
	icon: React.ElementType;
	label: string;
}> = [
	{ type: 'highlight', icon: Highlighter, label: 'Highlight' },
	{ type: 'textbox', icon: Type, label: 'Text Box' },
	{ type: 'arrow', icon: ArrowRight, label: 'Arrow' },
	{ type: 'rectangle', icon: Square, label: 'Rectangle' },
	{ type: 'circle', icon: Circle, label: 'Circle' },
	{ type: 'freehand', icon: Pencil, label: 'Freehand' },
];

const DEFAULT_COLORS = [
	'#FFFF00', // Yellow
	'#FF6B6B', // Red
	'#4ECDC4', // Teal
	'#45B7D1', // Blue
	'#96CEB4', // Green
	'#FFEAA7', // Light yellow
	'#DDA0DD', // Plum
	'#000000', // Black
];

export function AnnotateManager({ file, onReset }: AnnotateManagerProps) {
	const [currentPage, setCurrentPage] = useState(1);
	const [selectedTool, setSelectedTool] =
		useState<AnnotationType>('highlight');
	const [color, setColor] = useState('#FFFF00');
	const [annotations, setAnnotations] = useState<Annotation[]>([]);
	const [isProcessing, setIsProcessing] = useState(false);
	const [progress, setProgress] = useState(0);
	const [error, setError] = useState<string | null>(null);
	const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
	const [pageDimensions, setPageDimensions] = useState<
		Array<{ width: number; height: number }>
	>([]);
	const [isDrawing, setIsDrawing] = useState(false);
	const [drawStart, setDrawStart] = useState<{ x: number; y: number } | null>(
		null
	);
	const [freehandPoints, setFreehandPoints] = useState<
		Array<{ x: number; y: number }>
	>([]);

	const { isPremium, limits } = useSubscription();
	const router = useRouter();

	const canvasRef = useRef<HTMLCanvasElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		// Load page dimensions
		getPageDimensions(file.file).then(setPageDimensions);
	}, [file]);

	// Render PDF page to canvas with annotations
	useEffect(() => {
		const renderPage = async () => {
			const canvas = canvasRef.current;
			if (!canvas || pageDimensions.length === 0) return;

			try {
				// Dynamically import PDF.js
				const pdfjsLib = await import('pdfjs-dist');
				pdfjsLib.GlobalWorkerOptions.workerSrc =
					'/js/pdf.worker.min.mjs';

				// Load the PDF
				const arrayBuffer = await file.file.arrayBuffer();
				const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
				const pdfDocument = await loadingTask.promise;

				// Get the current page
				const page = await pdfDocument.getPage(currentPage);
				const viewport = page.getViewport({ scale: 1 });

				// Set canvas dimensions
				canvas.width = viewport.width;
				canvas.height = viewport.height;

				// Render the page
				const ctx = canvas.getContext('2d');
				if (!ctx) return;

				await page.render({
					canvasContext: ctx,
					viewport: viewport,
				}).promise;

				// Draw existing annotations for this page
				const pageAnnotationsForCurrentPage = annotations.filter(
					(a) => a.pageNumber === currentPage
				);
				pageAnnotationsForCurrentPage.forEach((annotation) => {
					ctx.save();
					ctx.globalAlpha = (annotation.opacity || 50) / 100;
					ctx.strokeStyle = annotation.color;
					ctx.fillStyle = annotation.color;

					if (annotation.type === 'highlight') {
						ctx.fillRect(
							annotation.x,
							annotation.y,
							annotation.width,
							annotation.height
						);
					} else if (annotation.type === 'rectangle') {
						ctx.lineWidth = annotation.strokeWidth || 2;
						if ((annotation as any).filled) {
							ctx.fillRect(
								annotation.x,
								annotation.y,
								annotation.width,
								annotation.height
							);
						} else {
							ctx.strokeRect(
								annotation.x,
								annotation.y,
								annotation.width,
								annotation.height
							);
						}
					} else if (annotation.type === 'circle') {
						const centerX = annotation.x + annotation.width / 2;
						const centerY = annotation.y + annotation.height / 2;
						const radiusX = annotation.width / 2;
						const radiusY = annotation.height / 2;
						ctx.beginPath();
						ctx.ellipse(
							centerX,
							centerY,
							radiusX,
							radiusY,
							0,
							0,
							2 * Math.PI
						);
						if ((annotation as any).filled) {
							ctx.fill();
						} else {
							ctx.lineWidth = annotation.strokeWidth || 2;
							ctx.stroke();
						}
					} else if (
						annotation.type === 'arrow' &&
						'startX' in annotation
					) {
						const arrow = annotation as any;
						ctx.lineWidth = arrow.strokeWidth || 2;
						ctx.beginPath();
						ctx.moveTo(arrow.startX, arrow.startY);
						ctx.lineTo(arrow.endX, arrow.endY);
						ctx.stroke();
					} else if (
						annotation.type === 'freehand' &&
						'points' in annotation
					) {
						const freehand = annotation as any;
						if (freehand.points && freehand.points.length > 1) {
							ctx.lineWidth = freehand.strokeWidth || 2;
							ctx.beginPath();
							ctx.moveTo(
								freehand.points[0].x,
								freehand.points[0].y
							);
							for (let i = 1; i < freehand.points.length; i++) {
								ctx.lineTo(
									freehand.points[i].x,
									freehand.points[i].y
								);
							}
							ctx.stroke();
						}
					}

					ctx.restore();
				});
			} catch (error) {
				console.error('Failed to render PDF page:', error);
				setError('Failed to load PDF page');
			}
		};

		renderPage();
	}, [file, currentPage, pageDimensions, annotations]);

	const handleMouseDown = useCallback(
		(e: React.MouseEvent<HTMLCanvasElement>) => {
			const canvas = canvasRef.current;
			if (!canvas) return;

			const rect = canvas.getBoundingClientRect();
			// Scale coordinates to match canvas internal dimensions
			const scaleX = canvas.width / rect.width;
			const scaleY = canvas.height / rect.height;
			const x = (e.clientX - rect.left) * scaleX;
			const y = (e.clientY - rect.top) * scaleY;

			setIsDrawing(true);
			setDrawStart({ x, y });

			if (selectedTool === 'freehand') {
				setFreehandPoints([{ x, y }]);
			}
		},
		[selectedTool]
	);

	const handleMouseMove = useCallback(
		(e: React.MouseEvent<HTMLCanvasElement>) => {
			if (!isDrawing) return;

			const canvas = canvasRef.current;
			if (!canvas) return;

			const rect = canvas.getBoundingClientRect();
			// Scale coordinates to match canvas internal dimensions
			const scaleX = canvas.width / rect.width;
			const scaleY = canvas.height / rect.height;
			const x = (e.clientX - rect.left) * scaleX;
			const y = (e.clientY - rect.top) * scaleY;

			if (selectedTool === 'freehand') {
				setFreehandPoints((prev) => [...prev, { x, y }]);
			}
		},
		[isDrawing, selectedTool]
	);

	const handleMouseUp = useCallback(
		(e: React.MouseEvent<HTMLCanvasElement>) => {
			if (!isDrawing || !drawStart) return;

			const canvas = canvasRef.current;
			if (!canvas) return;

			const rect = canvas.getBoundingClientRect();
			// Scale coordinates to match canvas internal dimensions
			const scaleX = canvas.width / rect.width;
			const scaleY = canvas.height / rect.height;
			const endX = (e.clientX - rect.left) * scaleX;
			const endY = (e.clientY - rect.top) * scaleY;

			const newAnnotation: Annotation = createAnnotation(
				selectedTool,
				currentPage,
				drawStart,
				{ x: endX, y: endY },
				color,
				freehandPoints
			);

			setAnnotations((prev) => [...prev, newAnnotation]);
			setIsDrawing(false);
			setDrawStart(null);
			setFreehandPoints([]);
		},
		[isDrawing, drawStart, selectedTool, currentPage, color, freehandPoints]
	);

	function createAnnotation(
		type: AnnotationType,
		pageNumber: number,
		start: { x: number; y: number },
		end: { x: number; y: number },
		annotationColor: string,
		points: Array<{ x: number; y: number }>
	): Annotation {
		const baseAnnotation = {
			id: `annotation-${Date.now()}`,
			pageNumber,
			color: annotationColor,
			opacity: 50,
		};

		switch (type) {
			case 'highlight':
			case 'underline':
			case 'strikethrough':
				return {
					...baseAnnotation,
					type,
					x: Math.min(start.x, end.x),
					y: Math.min(start.y, end.y),
					width: Math.abs(end.x - start.x),
					height: Math.abs(end.y - start.y),
				};
			case 'textbox':
				return {
					...baseAnnotation,
					type: 'textbox',
					x: Math.min(start.x, end.x),
					y: Math.min(start.y, end.y),
					width: Math.max(100, Math.abs(end.x - start.x)),
					height: Math.max(30, Math.abs(end.y - start.y)),
					text: 'Text',
					fontSize: 14,
					fontColor: '#000000',
				};
			case 'arrow':
				return {
					...baseAnnotation,
					type: 'arrow',
					startX: start.x,
					startY: start.y,
					endX: end.x,
					endY: end.y,
					strokeWidth: 2,
				};
			case 'rectangle':
			case 'circle':
				return {
					...baseAnnotation,
					type,
					x: Math.min(start.x, end.x),
					y: Math.min(start.y, end.y),
					width: Math.abs(end.x - start.x),
					height: Math.abs(end.y - start.y),
					strokeWidth: 2,
					filled: false,
				};
			case 'freehand':
				return {
					...baseAnnotation,
					type: 'freehand',
					points: points.length > 0 ? points : [start, end],
					strokeWidth: 2,
				};
			default:
				return {
					...baseAnnotation,
					type: 'highlight',
					x: start.x,
					y: start.y,
					width: 100,
					height: 20,
				};
		}
	}

	const handleUndo = useCallback(() => {
		setAnnotations((prev) => prev.slice(0, -1));
	}, []);

	const handleClearPage = useCallback(() => {
		setAnnotations((prev) =>
			prev.filter((a) => a.pageNumber !== currentPage)
		);
	}, [currentPage]);

	const handleClearAll = useCallback(() => {
		setAnnotations([]);
	}, []);

	const handleApplyAnnotations = useCallback(async () => {
		// Check usage limit for free users
		if (!isPremium) {
			const remaining = getRemainingAnnotate(limits.maxAnnotatePerMonth);
			if (remaining <= 0) {
				alert(
					`You've reached your monthly limit of ${limits.maxAnnotatePerMonth} annotation operations. Please upgrade to Premium for unlimited access.`
				);
				router.push('/pricing');
				return;
			}
		}

		if (annotations.length === 0) {
			setError('No annotations to apply');
			return;
		}

		setIsProcessing(true);
		setProgress(0);
		setError(null);

		try {
			const blob = await applyAnnotations(
				file.file,
				annotations,
				setProgress
			);
			// Increment usage counter on success
			if (!isPremium) {
				incrementAnnotateUsage();
			}
			const url = URL.createObjectURL(blob);
			setDownloadUrl(url);
		} catch (err) {
			setError(
				err instanceof Error
					? err.message
					: 'Failed to apply annotations'
			);
		} finally {
			setIsProcessing(false);
		}
	}, [file, annotations, isPremium, limits, router]);

	const handleDownload = useCallback(() => {
		if (!downloadUrl) return;

		const link = document.createElement('a');
		link.href = downloadUrl;
		link.download = `${file.name.replace('.pdf', '')}_annotated.pdf`;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}, [downloadUrl, file.name]);

	const pageAnnotations = annotations.filter(
		(a) => a.pageNumber === currentPage
	);

	return (
		<div className='max-w-6xl mx-auto space-y-6'>
			{/* Header */}
			<div className='bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg'>
				<div className='flex items-center justify-between mb-4'>
					<div>
						<h2 className='text-xl font-semibold text-gray-900 dark:text-white'>
							Annotate PDF
						</h2>
						<p className='text-sm text-gray-500 dark:text-gray-400'>
							{file.name} • {annotations.length} annotation(s)
						</p>
					</div>
					<button
						onClick={onReset}
						className='px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'>
						← Back
					</button>
				</div>

				{/* Toolbar */}
				<div className='flex flex-wrap items-center gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg'>
					{/* Tool Selection */}
					<div className='flex items-center gap-1'>
						{ANNOTATION_TOOLS.map((tool) => (
							<button
								key={tool.type}
								onClick={() => setSelectedTool(tool.type)}
								className={cn(
									'p-2 rounded-lg transition-colors',
									selectedTool === tool.type
										? 'bg-blue-500 text-white'
										: 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
								)}
								title={tool.label}>
								<tool.icon className='h-5 w-5' />
							</button>
						))}
					</div>

					{/* Divider */}
					<div className='w-px h-8 bg-gray-300 dark:bg-gray-600' />

					{/* Color Selection */}
					<div className='flex items-center gap-1'>
						{DEFAULT_COLORS.map((c) => (
							<button
								key={c}
								onClick={() => setColor(c)}
								className={cn(
									'w-6 h-6 rounded-full border-2 transition-transform',
									color === c
										? 'border-blue-500 scale-110'
										: 'border-gray-300 dark:border-gray-600'
								)}
								style={{ backgroundColor: c }}
							/>
						))}
					</div>

					{/* Divider */}
					<div className='w-px h-8 bg-gray-300 dark:bg-gray-600' />

					{/* Actions */}
					<div className='flex items-center gap-2'>
						<button
							onClick={handleUndo}
							disabled={annotations.length === 0}
							className='p-2 rounded-lg bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 disabled:opacity-50'
							title='Undo'>
							<Undo className='h-5 w-5' />
						</button>
						<button
							onClick={handleClearPage}
							disabled={pageAnnotations.length === 0}
							className='p-2 rounded-lg bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 disabled:opacity-50'
							title='Clear Page'>
							<Trash2 className='h-5 w-5' />
						</button>
						<button
							onClick={handleClearAll}
							disabled={annotations.length === 0}
							className='p-2 rounded-lg bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 disabled:opacity-50'
							title='Clear All'>
							<RotateCcw className='h-5 w-5' />
						</button>
					</div>
				</div>
			</div>

			{/* Canvas Area */}
			<div className='bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg'>
				<div className='flex items-center justify-between mb-4'>
					<div className='flex items-center gap-2'>
						<button
							onClick={() =>
								setCurrentPage((p) => Math.max(1, p - 1))
							}
							disabled={currentPage === 1}
							className='p-2 rounded-lg bg-gray-100 dark:bg-gray-700 disabled:opacity-50'>
							<ChevronLeft className='h-5 w-5' />
						</button>
						<span className='text-sm text-gray-600 dark:text-gray-400'>
							Page {currentPage} of {file.pageCount || 1}
						</span>
						<button
							onClick={() =>
								setCurrentPage((p) =>
									Math.min(file.pageCount || 1, p + 1)
								)
							}
							disabled={currentPage === (file.pageCount || 1)}
							className='p-2 rounded-lg bg-gray-100 dark:bg-gray-700 disabled:opacity-50'>
							<ChevronRight className='h-5 w-5' />
						</button>
					</div>
					<span className='text-sm text-gray-500'>
						{pageAnnotations.length} annotation(s) on this page
					</span>
				</div>

				<div
					ref={containerRef}
					className='relative bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden'
					style={{ minHeight: '500px' }}>
					<canvas
						ref={canvasRef}
						width={pageDimensions[currentPage - 1]?.width || 612}
						height={pageDimensions[currentPage - 1]?.height || 792}
						className='max-w-full mx-auto cursor-crosshair'
						onMouseDown={handleMouseDown}
						onMouseMove={handleMouseMove}
						onMouseUp={handleMouseUp}
						onMouseLeave={handleMouseUp}
					/>

					{/* Instruction overlay - only show when no annotations */}
					{annotations.length === 0 && (
						<div className='absolute inset-0 flex items-center justify-center pointer-events-none bg-black/5'>
							<div className='text-center text-gray-600 dark:text-gray-300 bg-white/90 dark:bg-gray-800/90 p-4 rounded-lg'>
								<p className='text-lg font-medium'>
									Click and drag to add annotations
								</p>
								<p className='text-sm mt-2'>
									Select a tool and color from the toolbar
									above
								</p>
							</div>
						</div>
					)}
				</div>
			</div>

			{/* Apply & Download */}
			<div className='bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg'>
				{error && (
					<div className='mb-4 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg'>
						{error}
					</div>
				)}

				{isProcessing ? (
					<div className='space-y-4'>
						<div className='flex items-center gap-3'>
							<Loader2 className='h-5 w-5 animate-spin text-blue-500' />
							<span className='text-gray-600 dark:text-gray-400'>
								Applying annotations... {Math.round(progress)}%
							</span>
						</div>
						<div className='w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2'>
							<div
								className='bg-blue-500 h-2 rounded-full transition-all'
								style={{ width: `${progress}%` }}
							/>
						</div>
					</div>
				) : downloadUrl ? (
					<div className='flex items-center justify-between'>
						<div className='flex items-center gap-3 text-green-600 dark:text-green-400'>
							<div className='w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center'>
								✓
							</div>
							<span>Annotations applied successfully!</span>
						</div>
						<button
							onClick={handleDownload}
							className='flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium'>
							<Download className='h-5 w-5' />
							Download PDF
						</button>
					</div>
				) : (
					<button
						onClick={handleApplyAnnotations}
						disabled={annotations.length === 0}
						className='w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-medium'>
						<Plus className='h-5 w-5' />
						Apply {annotations.length} Annotation(s)
					</button>
				)}
			</div>
		</div>
	);
}
