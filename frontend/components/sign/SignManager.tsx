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
	
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);

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

	const handleDrawStart = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
		setIsDrawing(true);
		const canvas = canvasRef.current;
		if (!canvas) return;
		
		const ctx = canvas.getContext('2d');
		if (!ctx) return;
		
		const rect = canvas.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		
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
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		
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

	const handleAddPlacement = useCallback(() => {
		if (!signature) return;
		
		const newPlacement: SignaturePlacement = {
			pageNumber: 1,
			x: 100,
			y: 600,
			width: 150,
			height: 50,
		};
		
		setPlacements(prev => [...prev, newPlacement]);
	}, [signature]);

	const handleRemovePlacement = useCallback((index: number) => {
		setPlacements(prev => prev.filter((_, i) => i !== index));
	}, []);

	const handleApplySignature = useCallback(async () => {
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
					<h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
						Signature Placement
					</h3>

					{/* Placements List */}
					<div className="space-y-3 mb-4">
						{placements.map((placement, index) => (
							<div
								key={index}
								className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg"
							>
								<div className="flex items-center gap-4">
									<Move className="h-5 w-5 text-gray-400" />
									<span className="text-sm text-gray-600 dark:text-gray-300">
										Page {placement.pageNumber} at ({Math.round(placement.x)}, {Math.round(placement.y)})
									</span>
								</div>
								<button
									onClick={() => handleRemovePlacement(index)}
									className="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
								>
									<Trash2 className="h-4 w-4" />
								</button>
							</div>
						))}
					</div>

					<button
						onClick={handleAddPlacement}
						className="w-full py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-colors"
					>
						+ Add Signature Placement
					</button>

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
