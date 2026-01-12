'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import {
	Pencil,
	Type,
	Upload,
	Download,
	Trash2,
	RotateCcw,
	Loader2,
	Check,
	Calendar,
	Move,
} from 'lucide-react';
import { UploadedFile, SignatureData, SignaturePlacement, SignSettings } from '@/types';
import { 
	createSignatureFromCanvas, 
	createSignatureFromText, 
	createSignatureFromImage,
	applySignature,
	SIGNATURE_FONTS,
	DATE_FORMATS,
} from '@/lib/pdf/sign';
import { cn } from '@/lib/utils/cn';
import { useSubscription } from '@/lib/subscription/hooks';
import { getRemainingSign, incrementSignUsage } from '@/lib/subscription/usage';
import { useRouter } from 'next/navigation';

interface SignManagerProps {
	file: UploadedFile;
	onReset: () => void;
}

type SignatureMode = 'draw' | 'type' | 'upload';

export function SignManager({ file, onReset }: SignManagerProps) {
	const [signatureMode, setSignatureMode] = useState<SignatureMode>('draw');
	const [signature, setSignature] = useState<SignatureData | null>(null);
	const [placements, setPlacements] = useState<SignaturePlacement[]>([]);
	const [addDate, setAddDate] = useState(true);
	const [dateFormat, setDateFormat] = useState('MM/DD/YYYY');
	const [datePosition, setDatePosition] = useState<'below' | 'right' | 'none'>('below');
	
	const [typedText, setTypedText] = useState('');
	const [selectedFont, setSelectedFont] = useState(SIGNATURE_FONTS[0].value);
	
	const [isProcessing, setIsProcessing] = useState(false);
	const [progress, setProgress] = useState(0);
	const [error, setError] = useState<string | null>(null);
	const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
	
	const [isDrawing, setIsDrawing] = useState(false);
	const [currentPreviewPage, setCurrentPreviewPage] = useState(1);
	const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
	const [tempDragPosition, setTempDragPosition] = useState<{ x: number; y: number } | null>(null);
	const [resizingIndex, setResizingIndex] = useState<number | null>(null);
	const [resizeCorner, setResizeCorner] = useState<'tl' | 'tr' | 'bl' | 'br' | null>(null);
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
	
	const { isPremium, limits } = useSubscription();
	const router = useRouter();
	
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const previewCanvasRef = useRef<HTMLCanvasElement>(null);
	const pdfLayerRef = useRef<ImageData | null>(null);
	const tempPlacementsRef = useRef<SignaturePlacement[]>([]);

	// Initialize canvas for drawing
	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		
		const ctx = canvas.getContext('2d');
		if (!ctx) return;
		
		ctx.fillStyle = 'white';
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.strokeStyle = '#000000';
		ctx.lineWidth = 2;
		ctx.lineCap = 'round';
		ctx.lineJoin = 'round';
	}, []);

	// Render PDF preview with signature placements
	useEffect(() => {
		if (!signature) return;

		const renderPreview = async () => {
			const canvas = previewCanvasRef.current;
			if (!canvas) return;

			try {
				// Dynamically import PDF.js
				const pdfjsLib = await import('pdfjs-dist');
				pdfjsLib.GlobalWorkerOptions.workerSrc = '/js/pdf.worker.min.mjs';

				// Load the PDF
				const arrayBuffer = await file.file.arrayBuffer();
				const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
				const pdfDocument = await loadingTask.promise;

				// Get the current preview page
				const page = await pdfDocument.getPage(currentPreviewPage);
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

				// Save the PDF layer (without signatures) for fast redrawing during drag/resize
				pdfLayerRef.current = ctx.getImageData(0, 0, canvas.width, canvas.height);

				// Draw signatures on top
				redrawSignatures();
			} catch (error) {
				console.error('Failed to render PDF preview:', error);
			}
		};

		renderPreview();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [file, signature, currentPreviewPage, placements]);

	const handleDrawStart = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
		setIsDrawing(true);
		const canvas = canvasRef.current;
		if (!canvas) return;
		
		const ctx = canvas.getContext('2d');
		if (!ctx) return;
		
		const rect = canvas.getBoundingClientRect();
		// Scale coordinates to match canvas internal dimensions
		const scaleX = canvas.width / rect.width;
		const scaleY = canvas.height / rect.height;
		const x = (e.clientX - rect.left) * scaleX;
		const y = (e.clientY - rect.top) * scaleY;
		
		ctx.beginPath();
		ctx.moveTo(x, y);
	}, []);

	const handleDrawMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
		if (!isDrawing) return;
		
		const canvas = canvasRef.current;
		if (!canvas) return;
		
		const ctx = canvas.getContext('2d');
		if (!ctx) return;
		
		const rect = canvas.getBoundingClientRect();
		// Scale coordinates to match canvas internal dimensions
		const scaleX = canvas.width / rect.width;
		const scaleY = canvas.height / rect.height;
		const x = (e.clientX - rect.left) * scaleX;
		const y = (e.clientY - rect.top) * scaleY;
		
		ctx.lineTo(x, y);
		ctx.stroke();
	}, [isDrawing]);

	const handleDrawEnd = useCallback(() => {
		setIsDrawing(false);
	}, []);

	const handleClearCanvas = useCallback(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		
		const ctx = canvas.getContext('2d');
		if (!ctx) return;
		
		ctx.fillStyle = 'white';
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		setSignature(null);
	}, []);

	const handleSaveDrawnSignature = useCallback(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		
		const sig = createSignatureFromCanvas(canvas);
		setSignature(sig);
	}, []);

	const handleCreateTypedSignature = useCallback(async () => {
		if (!typedText.trim()) return;
		
		try {
			const sig = await createSignatureFromText(typedText, selectedFont);
			setSignature(sig);
		} catch (err) {
			setError('Failed to create signature');
		}
	}, [typedText, selectedFont]);

	const handleUploadSignature = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
		const uploadedFile = e.target.files?.[0];
		if (!uploadedFile) return;
		
		try {
			const sig = await createSignatureFromImage(uploadedFile);
			setSignature(sig);
		} catch (err) {
			setError('Failed to load signature image');
		}
	}, []);

	// Get mouse coordinates scaled to canvas
	const getCanvasCoords = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
		const canvas = previewCanvasRef.current;
		if (!canvas) return null;
		
		const rect = canvas.getBoundingClientRect();
		const scaleX = canvas.width / rect.width;
		const scaleY = canvas.height / rect.height;
		return {
			x: (e.clientX - rect.left) * scaleX,
			y: (e.clientY - rect.top) * scaleY
		};
	}, []);

	// Check if clicking on a resize handle
	const getResizeHandle = useCallback((x: number, y: number, placement: SignaturePlacement) => {
		const handleSize = 12;
		const corners = [
			{ corner: 'tl' as const, cx: placement.x, cy: placement.y },
			{ corner: 'tr' as const, cx: placement.x + placement.width, cy: placement.y },
			{ corner: 'bl' as const, cx: placement.x, cy: placement.y + placement.height },
			{ corner: 'br' as const, cx: placement.x + placement.width, cy: placement.y + placement.height },
		];
		
		for (const { corner, cx, cy } of corners) {
			if (Math.abs(x - cx) <= handleSize && Math.abs(y - cy) <= handleSize) {
				return corner;
			}
		}
		return null;
	}, []);

	// Handle mouse down on preview
	const handlePreviewMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
		if (!signature) return;
		
		const coords = getCanvasCoords(e);
		if (!coords) return;
		
		// Check for resize handles first
		for (let i = placements.length - 1; i >= 0; i--) {
			const p = placements[i];
			if (p.pageNumber !== currentPreviewPage) continue;
			
			const handle = getResizeHandle(coords.x, coords.y, p);
			if (handle) {
				setResizingIndex(i);
				setResizeCorner(handle);
				return;
			}
		}
		
		// Check for dragging
		for (let i = placements.length - 1; i >= 0; i--) {
			const p = placements[i];
			if (p.pageNumber !== currentPreviewPage) continue;
			
			if (coords.x >= p.x && coords.x <= p.x + p.width &&
				coords.y >= p.y && coords.y <= p.y + p.height) {
				setDraggingIndex(i);
				setTempDragPosition({ x: coords.x - p.x, y: coords.y - p.y });
				return;
			}
		}
		
		// Add new placement
		const newPlacement: SignaturePlacement = {
			pageNumber: currentPreviewPage,
			x: coords.x - 75,
			y: coords.y - 25,
			width: 150,
			height: 50,
		};
		setPlacements(prev => [...prev, newPlacement]);
	}, [signature, currentPreviewPage, placements, getCanvasCoords, getResizeHandle]);
	
	const redrawSignatures = useCallback(() => {
		const canvas = previewCanvasRef.current;
		if (!canvas || !signature || !pdfLayerRef.current) return;
		
		const ctx = canvas.getContext('2d');
		if (!ctx) return;
		
		// Restore PDF layer
		ctx.putImageData(pdfLayerRef.current, 0, 0);
		
		// Draw signatures
		const currentPlacements = tempPlacementsRef.current.length > 0 ? tempPlacementsRef.current : placements;
		const pagePlacements = currentPlacements.filter(p => p.pageNumber === currentPreviewPage);
		
		if (signature.dataUrl && pagePlacements.length > 0) {
			const img = new Image();
			img.src = signature.dataUrl;
			
			pagePlacements.forEach((placement, idx) => {
				ctx.save();
				
				const globalIdx = placements.indexOf(placement) >= 0 ? placements.indexOf(placement) : 
								  tempPlacementsRef.current.indexOf(placement);
				const isActive = globalIdx === hoveredIndex || globalIdx === draggingIndex || globalIdx === resizingIndex;
				
				// Draw signature
				ctx.globalAlpha = 0.85;
				ctx.drawImage(img, placement.x, placement.y, placement.width, placement.height);
				
				// Draw border
				ctx.globalAlpha = 1;
				ctx.strokeStyle = isActive ? '#3B82F6' : '#94A3B8';
				ctx.lineWidth = isActive ? 2 : 1;
				ctx.setLineDash(isActive ? [5, 5] : []);
				ctx.strokeRect(placement.x, placement.y, placement.width, placement.height);
				
				// Draw corner handles
				if (isActive) {
					ctx.fillStyle = '#3B82F6';
					ctx.strokeStyle = '#FFFFFF';
					ctx.lineWidth = 2;
					ctx.setLineDash([]);
					const handleSize = 10;
					
					const corners = [
						[placement.x, placement.y],
						[placement.x + placement.width, placement.y],
						[placement.x, placement.y + placement.height],
						[placement.x + placement.width, placement.y + placement.height],
					];
					
					corners.forEach(([cx, cy]) => {
						ctx.fillRect(cx - handleSize/2, cy - handleSize/2, handleSize, handleSize);
						ctx.strokeRect(cx - handleSize/2, cy - handleSize/2, handleSize, handleSize);
					});
				}
				
				ctx.restore();
			});
		}
	}, [signature, placements, currentPreviewPage, hoveredIndex, draggingIndex, resizingIndex]);

	const handlePreviewMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
		const coords = getCanvasCoords(e);
		if (!coords) return;
		
		// Handle resizing
		if (resizingIndex !== null && resizeCorner) {
			const placement = placements[resizingIndex];
			let newPlacement = { ...placement };
			
			if (resizeCorner === 'br') {
				newPlacement.width = Math.max(50, coords.x - placement.x);
				newPlacement.height = Math.max(20, coords.y - placement.y);
			} else if (resizeCorner === 'tr') {
				newPlacement.width = Math.max(50, coords.x - placement.x);
				newPlacement.y = coords.y;
				newPlacement.height = Math.max(20, placement.y + placement.height - coords.y);
			} else if (resizeCorner === 'bl') {
				newPlacement.x = coords.x;
				newPlacement.width = Math.max(50, placement.x + placement.width - coords.x);
				newPlacement.height = Math.max(20, coords.y - placement.y);
			} else if (resizeCorner === 'tl') {
				newPlacement.x = coords.x;
				newPlacement.y = coords.y;
				newPlacement.width = Math.max(50, placement.x + placement.width - coords.x);
				newPlacement.height = Math.max(20, placement.y + placement.height - coords.y);
			}
			
			tempPlacementsRef.current = placements.map((p, i) => i === resizingIndex ? newPlacement : p);
			redrawSignatures();
			return;
		}
		
		// Handle dragging
		if (draggingIndex !== null && tempDragPosition) {
			const newX = coords.x - tempDragPosition.x;
			const newY = coords.y - tempDragPosition.y;
			
			tempPlacementsRef.current = placements.map((p, i) => 
				i === draggingIndex ? { ...p, x: newX, y: newY } : p
			);
			redrawSignatures();
			return;
		}
		
		// Update hover state for cursor
		let foundHover = false;
		for (let i = placements.length - 1; i >= 0; i--) {
			const p = placements[i];
			if (p.pageNumber !== currentPreviewPage) continue;
			
			if (getResizeHandle(coords.x, coords.y, p)) {
				setHoveredIndex(i);
				foundHover = true;
				break;
			} else if (coords.x >= p.x && coords.x <= p.x + p.width &&
					   coords.y >= p.y && coords.y <= p.y + p.height) {
				setHoveredIndex(i);
				foundHover = true;
				break;
			}
		}
		if (!foundHover) setHoveredIndex(null);
	}, [draggingIndex, tempDragPosition, resizingIndex, resizeCorner, placements, currentPreviewPage, getCanvasCoords, getResizeHandle, redrawSignatures]);
	
	const handlePreviewMouseUp = useCallback(() => {
		// Commit temporary changes to actual placements
		if (tempPlacementsRef.current.length > 0) {
			setPlacements(tempPlacementsRef.current);
			tempPlacementsRef.current = [];
		}
		
		setDraggingIndex(null);
		setTempDragPosition(null);
		setResizingIndex(null);
		setResizeCorner(null);
	}, []);

	const handleRemovePlacement = useCallback((index: number) => {
		setPlacements(prev => prev.filter((_, i) => i !== index));
	}, []);

	const handleApplySignature = useCallback(async () => {
		// Check usage limit for free users
		if (!isPremium) {
			const remaining = getRemainingSign(limits.maxSignPerMonth);
			if (remaining <= 0) {
				alert(
					`You've reached your monthly limit of ${limits.maxSignPerMonth} signature operations. Please upgrade to Premium for unlimited access.`
				);
				router.push('/pricing');
				return;
			}
		}

		if (!signature || placements.length === 0) {
			setError('Please create a signature and add at least one placement');
			return;
		}

		setIsProcessing(true);
		setProgress(0);
		setError(null);

		try {
			const settings: SignSettings = {
				signature,
				placements,
				addDate,
				dateFormat,
				datePosition,
			};
			
			const blob = await applySignature(file.file, settings, setProgress);
			// Increment usage counter on success
			if (!isPremium) {
				incrementSignUsage();
			}
			const url = URL.createObjectURL(blob);
			setDownloadUrl(url);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Failed to apply signature');
		} finally {
			setIsProcessing(false);
		}
	}, [file, signature, placements, addDate, dateFormat, datePosition]);

	const handleDownload = useCallback(() => {
		if (!downloadUrl) return;

		const link = document.createElement('a');
		link.href = downloadUrl;
		link.download = `${file.name.replace('.pdf', '')}_signed.pdf`;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}, [downloadUrl, file.name]);

	return (
		<div className="max-w-4xl mx-auto space-y-6">
			{/* Header */}
			<div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
				<div className="flex items-center justify-between mb-4">
					<div>
						<h2 className="text-xl font-semibold text-gray-900 dark:text-white">
							Sign PDF
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

			{/* Signature Creation */}
			<div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
				<h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
					Create Your Signature
				</h3>

				{/* Mode Tabs */}
				<div className="flex gap-2 mb-4">
					<button
						onClick={() => setSignatureMode('draw')}
						className={cn(
							'flex items-center gap-2 px-4 py-2 rounded-lg',
							signatureMode === 'draw'
								? 'bg-blue-500 text-white'
								: 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
						)}
					>
						<Pencil className="h-4 w-4" />
						Draw
					</button>
					<button
						onClick={() => setSignatureMode('type')}
						className={cn(
							'flex items-center gap-2 px-4 py-2 rounded-lg',
							signatureMode === 'type'
								? 'bg-blue-500 text-white'
								: 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
						)}
					>
						<Type className="h-4 w-4" />
						Type
					</button>
					<button
						onClick={() => setSignatureMode('upload')}
						className={cn(
							'flex items-center gap-2 px-4 py-2 rounded-lg',
							signatureMode === 'upload'
								? 'bg-blue-500 text-white'
								: 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
						)}
					>
						<Upload className="h-4 w-4" />
						Upload
					</button>
				</div>

				{/* Draw Mode */}
				{signatureMode === 'draw' && (
					<div className="space-y-4">
						<div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4">
							<canvas
								ref={canvasRef}
								width={400}
								height={150}
								className="w-full bg-white cursor-crosshair rounded"
								onMouseDown={handleDrawStart}
								onMouseMove={handleDrawMove}
								onMouseUp={handleDrawEnd}
								onMouseLeave={handleDrawEnd}
							/>
						</div>
						<div className="flex gap-2">
							<button
								onClick={handleClearCanvas}
								className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg"
							>
								<RotateCcw className="h-4 w-4" />
								Clear
							</button>
							<button
								onClick={handleSaveDrawnSignature}
								className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
							>
								<Check className="h-4 w-4" />
								Save Signature
							</button>
						</div>
					</div>
				)}

				{/* Type Mode */}
				{signatureMode === 'type' && (
					<div className="space-y-4">
						<input
							type="text"
							value={typedText}
							onChange={(e) => setTypedText(e.target.value)}
							placeholder="Type your signature"
							className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
							style={{ fontFamily: selectedFont, fontSize: '24px' }}
						/>
						<select
							value={selectedFont}
							onChange={(e) => setSelectedFont(e.target.value)}
							className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
						>
							{SIGNATURE_FONTS.map((font) => (
								<option key={font.value} value={font.value} style={{ fontFamily: font.value }}>
									{font.name}
								</option>
							))}
						</select>
						<button
							onClick={handleCreateTypedSignature}
							disabled={!typedText.trim()}
							className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
						>
							<Check className="h-4 w-4" />
							Create Signature
						</button>
					</div>
				)}

				{/* Upload Mode */}
				{signatureMode === 'upload' && (
					<div className="space-y-4">
						<div
							onClick={() => fileInputRef.current?.click()}
							className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
						>
							<Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
							<p className="text-gray-600 dark:text-gray-400">
								Click to upload signature image
							</p>
							<p className="text-sm text-gray-400 mt-1">
								PNG, JPG (transparent background recommended)
							</p>
						</div>
						<input
							ref={fileInputRef}
							type="file"
							accept="image/*"
							onChange={handleUploadSignature}
							className="hidden"
						/>
					</div>
				)}

				{/* Signature Preview */}
				{signature && (
					<div className="mt-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
						<p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Signature Preview:</p>
						<img
							src={signature.dataUrl}
							alt="Signature"
							className="max-h-24 border border-gray-200 dark:border-gray-700 rounded"
						/>
					</div>
				)}
			</div>

			{/* Placement Settings */}
			{signature && (
				<div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
					<div className="flex items-center justify-between mb-4">
						<h3 className="text-lg font-medium text-gray-900 dark:text-white">
							Signature Placement
						</h3>
						{placements.length > 0 && (
							<span className="text-sm text-gray-500 dark:text-gray-400">
								{placements.length} placement{placements.length !== 1 ? 's' : ''}
							</span>
						)}
					</div>

					<div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
						<p className="text-sm text-blue-800 dark:text-blue-200">
							<strong>How to place signatures:</strong>
						</p>
						<ul className="text-sm text-blue-700 dark:text-blue-300 mt-2 space-y-1">
							<li>• <strong>Click</strong> anywhere on the PDF to add a signature</li>
							<li>• <strong>Drag</strong> the center to move signatures</li>
							<li>• <strong>Drag corners</strong> to resize signatures</li>
							<li>• <strong>Trash icon</strong> to remove a signature</li>
						</ul>
					</div>

					{placements.length > 0 && (
						<div className="space-y-2">
							{placements.map((placement, index) => (
								<div
									key={index}
									className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-900 rounded-lg"
								>
									<span className="text-sm text-gray-600 dark:text-gray-300">
										Page {placement.pageNumber} • Signature #{index + 1}
									</span>
									<button
										onClick={() => handleRemovePlacement(index)}
										className="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
										title="Remove this placement"
									>
										<Trash2 className="h-4 w-4" />
									</button>
								</div>
							))}
						</div>
					)}

					{/* Date Options */}
					<div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
						<label className="flex items-center gap-3 mb-4">
							<input
								type="checkbox"
								checked={addDate}
								onChange={(e) => setAddDate(e.target.checked)}
								className="w-4 h-4 rounded"
							/>
							<span className="text-gray-700 dark:text-gray-300">Add date to signature</span>
						</label>

						{addDate && (
							<div className="grid grid-cols-2 gap-4">
								<div>
									<label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
										Date Format
									</label>
									<select
										value={dateFormat}
										onChange={(e) => setDateFormat(e.target.value)}
										className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
									>
										{DATE_FORMATS.map((format) => (
											<option key={format.value} value={format.value}>
												{format.label}
											</option>
										))}
									</select>
								</div>
								<div>
									<label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
										Position
									</label>
									<select
										value={datePosition}
										onChange={(e) => setDatePosition(e.target.value as any)}
										className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
									>
										<option value="below">Below Signature</option>
										<option value="right">Right of Signature</option>
										<option value="none">No Date</option>
									</select>
								</div>
							</div>
						)}
					</div>
				</div>
			)}

			{/* PDF Preview with Interactive Signature Placement */}
			{signature && (
				<div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
					<h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
						PDF Preview - Click to Place Signature
					</h3>
					<div className="relative bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden flex justify-center">
						<canvas
							ref={previewCanvasRef}
							className={cn(
								"max-w-full h-auto",
								hoveredIndex !== null ? "cursor-move" : "cursor-crosshair"
							)}
							onMouseDown={handlePreviewMouseDown}
							onMouseMove={handlePreviewMouseMove}
							onMouseUp={handlePreviewMouseUp}
							onMouseLeave={handlePreviewMouseUp}
						/>
					</div>
					<p className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center">
						{placements.length === 0 
							? 'Click anywhere on the PDF to place your signature'
							: `Page ${currentPreviewPage} • ${placements.filter(p => p.pageNumber === currentPreviewPage).length} signature(s) on this page`
						}
					</p>
				</div>
			)}

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
								Applying signature... {Math.round(progress)}%
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
							<span>Signature applied successfully!</span>
						</div>
						<button
							onClick={handleDownload}
							className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium"
						>
							<Download className="h-5 w-5" />
							Download Signed PDF
						</button>
					</div>
				) : (
					<button
						onClick={handleApplySignature}
						disabled={!signature || placements.length === 0}
						className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-medium"
					>
						<Pencil className="h-5 w-5" />
						Apply Signature
					</button>
				)}
			</div>
		</div>
	);
}
