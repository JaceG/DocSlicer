/**
 * Usage tracking for PDF processing
 * Uses localStorage to track monthly usage
 */

const USAGE_KEY = 'pdf_slicer_usage';

interface UsageData {
	month: string; // Format: YYYY-MM
	// Core features
	pdfsProcessed: number;
	mergesProcessed: number;
	conversionsProcessed: number;
	compressionsProcessed: number;
	// Page operations
	organizeProcessed: number;
	// Page enhancement
	pageNumbersProcessed: number;
	// Security features
	protectProcessed: number;
	unlockProcessed: number;
	// Content features
	watermarkProcessed: number;
	// Smart operations
	bookmarkSplitProcessed: number;
	blankRemovalProcessed: number;
	repairProcessed: number;
	// Advanced features
	annotateProcessed: number;
	signProcessed: number;
	formsProcessed: number;
	ocrProcessed: number;
	compareProcessed: number;
	metadataProcessed: number;
}

function getCurrentMonth(): string {
	const now = new Date();
	return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
}

function getDefaultUsageData(): UsageData {
	return {
		month: getCurrentMonth(),
		// Core features
		pdfsProcessed: 0,
		mergesProcessed: 0,
		conversionsProcessed: 0,
		compressionsProcessed: 0,
		// Page operations
		organizeProcessed: 0,
		// Page enhancement
		pageNumbersProcessed: 0,
		// Security features
		protectProcessed: 0,
		unlockProcessed: 0,
		// Content features
		watermarkProcessed: 0,
		// Smart operations
		bookmarkSplitProcessed: 0,
		blankRemovalProcessed: 0,
		repairProcessed: 0,
		// Advanced features
		annotateProcessed: 0,
		signProcessed: 0,
		formsProcessed: 0,
		ocrProcessed: 0,
		compareProcessed: 0,
		metadataProcessed: 0,
	};
}

function getUsageData(): UsageData {
	if (typeof window === 'undefined') {
		return getDefaultUsageData();
	}

	const stored = localStorage.getItem(USAGE_KEY);
	if (!stored) {
		return getDefaultUsageData();
	}

	try {
		const data: UsageData = JSON.parse(stored);
		
		// Reset if it's a new month
		if (data.month !== getCurrentMonth()) {
			return getDefaultUsageData();
		}
		
		// Ensure all fields exist (for backwards compatibility)
		return {
			month: data.month,
			// Core features
			pdfsProcessed: data.pdfsProcessed || 0,
			mergesProcessed: data.mergesProcessed || 0,
			conversionsProcessed: data.conversionsProcessed || 0,
			compressionsProcessed: data.compressionsProcessed || 0,
			// Page operations
			organizeProcessed: data.organizeProcessed || 0,
			// Page enhancement
			pageNumbersProcessed: data.pageNumbersProcessed || 0,
			// Security features
			protectProcessed: data.protectProcessed || 0,
			unlockProcessed: data.unlockProcessed || 0,
			// Content features
			watermarkProcessed: data.watermarkProcessed || 0,
			// Smart operations
			bookmarkSplitProcessed: data.bookmarkSplitProcessed || 0,
			blankRemovalProcessed: data.blankRemovalProcessed || 0,
			repairProcessed: data.repairProcessed || 0,
			// Advanced features
			annotateProcessed: data.annotateProcessed || 0,
			signProcessed: data.signProcessed || 0,
			formsProcessed: data.formsProcessed || 0,
			ocrProcessed: data.ocrProcessed || 0,
			compareProcessed: data.compareProcessed || 0,
			metadataProcessed: data.metadataProcessed || 0,
		};
	} catch {
		return getDefaultUsageData();
	}
}

function saveUsageData(data: UsageData): void {
	if (typeof window === 'undefined') return;
	localStorage.setItem(USAGE_KEY, JSON.stringify(data));
}

// PDF Slicing usage
export function getPdfsProcessedThisMonth(): number {
	return getUsageData().pdfsProcessed;
}

export function incrementPdfUsage(): number {
	const data = getUsageData();
	data.pdfsProcessed += 1;
	saveUsageData(data);
	return data.pdfsProcessed;
}

export function getRemainingPdfs(maxPdfs: number): number {
	if (maxPdfs === -1) return -1; // unlimited
	const used = getPdfsProcessedThisMonth();
	return Math.max(0, maxPdfs - used);
}

// PDF Merging usage
export function getMergesProcessedThisMonth(): number {
	return getUsageData().mergesProcessed;
}

export function incrementMergeUsage(): number {
	const data = getUsageData();
	data.mergesProcessed += 1;
	saveUsageData(data);
	return data.mergesProcessed;
}

export function getRemainingMerges(maxMerges: number): number {
	if (maxMerges === -1) return -1; // unlimited
	const used = getMergesProcessedThisMonth();
	return Math.max(0, maxMerges - used);
}

// File Conversion usage
export function getConversionsProcessedThisMonth(): number {
	return getUsageData().conversionsProcessed;
}

export function incrementConversionUsage(): number {
	const data = getUsageData();
	data.conversionsProcessed += 1;
	saveUsageData(data);
	return data.conversionsProcessed;
}

export function getRemainingConversions(maxConversions: number): number {
	if (maxConversions === -1) return -1; // unlimited
	const used = getConversionsProcessedThisMonth();
	return Math.max(0, maxConversions - used);
}

// PDF Compression usage
export function getCompressionsProcessedThisMonth(): number {
	return getUsageData().compressionsProcessed;
}

export function incrementCompressionUsage(): number {
	const data = getUsageData();
	data.compressionsProcessed += 1;
	saveUsageData(data);
	return data.compressionsProcessed;
}

export function getRemainingCompressions(maxCompressions: number): number {
	if (maxCompressions === -1) return -1; // unlimited
	const used = getCompressionsProcessedThisMonth();
	return Math.max(0, maxCompressions - used);
}

// Organize (Rotate/Delete/Reorder) usage
export function getOrganizeProcessedThisMonth(): number {
	return getUsageData().organizeProcessed;
}

export function incrementOrganizeUsage(): number {
	const data = getUsageData();
	data.organizeProcessed += 1;
	saveUsageData(data);
	return data.organizeProcessed;
}

export function getRemainingOrganize(maxOrganize: number): number {
	if (maxOrganize === -1) return -1;
	const used = getOrganizeProcessedThisMonth();
	return Math.max(0, maxOrganize - used);
}

// Page Numbers usage
export function getPageNumbersProcessedThisMonth(): number {
	return getUsageData().pageNumbersProcessed;
}

export function incrementPageNumbersUsage(): number {
	const data = getUsageData();
	data.pageNumbersProcessed += 1;
	saveUsageData(data);
	return data.pageNumbersProcessed;
}

export function getRemainingPageNumbers(maxPageNumbers: number): number {
	if (maxPageNumbers === -1) return -1;
	const used = getPageNumbersProcessedThisMonth();
	return Math.max(0, maxPageNumbers - used);
}

// Protect usage
export function getProtectProcessedThisMonth(): number {
	return getUsageData().protectProcessed;
}

export function incrementProtectUsage(): number {
	const data = getUsageData();
	data.protectProcessed += 1;
	saveUsageData(data);
	return data.protectProcessed;
}

export function getRemainingProtect(maxProtect: number): number {
	if (maxProtect === -1) return -1;
	const used = getProtectProcessedThisMonth();
	return Math.max(0, maxProtect - used);
}

// Unlock usage
export function getUnlockProcessedThisMonth(): number {
	return getUsageData().unlockProcessed;
}

export function incrementUnlockUsage(): number {
	const data = getUsageData();
	data.unlockProcessed += 1;
	saveUsageData(data);
	return data.unlockProcessed;
}

export function getRemainingUnlock(maxUnlock: number): number {
	if (maxUnlock === -1) return -1;
	const used = getUnlockProcessedThisMonth();
	return Math.max(0, maxUnlock - used);
}

// Watermark usage
export function getWatermarkProcessedThisMonth(): number {
	return getUsageData().watermarkProcessed;
}

export function incrementWatermarkUsage(): number {
	const data = getUsageData();
	data.watermarkProcessed += 1;
	saveUsageData(data);
	return data.watermarkProcessed;
}

export function getRemainingWatermark(maxWatermark: number): number {
	if (maxWatermark === -1) return -1;
	const used = getWatermarkProcessedThisMonth();
	return Math.max(0, maxWatermark - used);
}

// Bookmark Split usage
export function getBookmarkSplitProcessedThisMonth(): number {
	return getUsageData().bookmarkSplitProcessed;
}

export function incrementBookmarkSplitUsage(): number {
	const data = getUsageData();
	data.bookmarkSplitProcessed += 1;
	saveUsageData(data);
	return data.bookmarkSplitProcessed;
}

export function getRemainingBookmarkSplit(maxBookmarkSplit: number): number {
	if (maxBookmarkSplit === -1) return -1;
	const used = getBookmarkSplitProcessedThisMonth();
	return Math.max(0, maxBookmarkSplit - used);
}

// Blank Removal usage
export function getBlankRemovalProcessedThisMonth(): number {
	return getUsageData().blankRemovalProcessed;
}

export function incrementBlankRemovalUsage(): number {
	const data = getUsageData();
	data.blankRemovalProcessed += 1;
	saveUsageData(data);
	return data.blankRemovalProcessed;
}

export function getRemainingBlankRemoval(maxBlankRemoval: number): number {
	if (maxBlankRemoval === -1) return -1;
	const used = getBlankRemovalProcessedThisMonth();
	return Math.max(0, maxBlankRemoval - used);
}

// Repair usage
export function getRepairProcessedThisMonth(): number {
	return getUsageData().repairProcessed;
}

export function incrementRepairUsage(): number {
	const data = getUsageData();
	data.repairProcessed += 1;
	saveUsageData(data);
	return data.repairProcessed;
}

export function getRemainingRepair(maxRepair: number): number {
	if (maxRepair === -1) return -1;
	const used = getRepairProcessedThisMonth();
	return Math.max(0, maxRepair - used);
}

// Annotate usage
export function getAnnotateProcessedThisMonth(): number {
	return getUsageData().annotateProcessed;
}

export function incrementAnnotateUsage(): number {
	const data = getUsageData();
	data.annotateProcessed += 1;
	saveUsageData(data);
	return data.annotateProcessed;
}

export function getRemainingAnnotate(maxAnnotate: number): number {
	if (maxAnnotate === -1) return -1;
	const used = getAnnotateProcessedThisMonth();
	return Math.max(0, maxAnnotate - used);
}

// Sign usage
export function getSignProcessedThisMonth(): number {
	return getUsageData().signProcessed;
}

export function incrementSignUsage(): number {
	const data = getUsageData();
	data.signProcessed += 1;
	saveUsageData(data);
	return data.signProcessed;
}

export function getRemainingSign(maxSign: number): number {
	if (maxSign === -1) return -1;
	const used = getSignProcessedThisMonth();
	return Math.max(0, maxSign - used);
}

// Forms usage
export function getFormsProcessedThisMonth(): number {
	return getUsageData().formsProcessed;
}

export function incrementFormsUsage(): number {
	const data = getUsageData();
	data.formsProcessed += 1;
	saveUsageData(data);
	return data.formsProcessed;
}

export function getRemainingForms(maxForms: number): number {
	if (maxForms === -1) return -1;
	const used = getFormsProcessedThisMonth();
	return Math.max(0, maxForms - used);
}

// OCR usage
export function getOcrProcessedThisMonth(): number {
	return getUsageData().ocrProcessed;
}

export function incrementOcrUsage(): number {
	const data = getUsageData();
	data.ocrProcessed += 1;
	saveUsageData(data);
	return data.ocrProcessed;
}

export function getRemainingOcr(maxOcr: number): number {
	if (maxOcr === -1) return -1;
	const used = getOcrProcessedThisMonth();
	return Math.max(0, maxOcr - used);
}

// Compare usage
export function getCompareProcessedThisMonth(): number {
	return getUsageData().compareProcessed;
}

export function incrementCompareUsage(): number {
	const data = getUsageData();
	data.compareProcessed += 1;
	saveUsageData(data);
	return data.compareProcessed;
}

export function getRemainingCompare(maxCompare: number): number {
	if (maxCompare === -1) return -1;
	const used = getCompareProcessedThisMonth();
	return Math.max(0, maxCompare - used);
}

// Metadata usage
export function getMetadataProcessedThisMonth(): number {
	return getUsageData().metadataProcessed;
}

export function incrementMetadataUsage(): number {
	const data = getUsageData();
	data.metadataProcessed += 1;
	saveUsageData(data);
	return data.metadataProcessed;
}

export function getRemainingMetadata(maxMetadata: number): number {
	if (maxMetadata === -1) return -1;
	const used = getMetadataProcessedThisMonth();
	return Math.max(0, maxMetadata - used);
}

export function resetUsage(): void {
	if (typeof window === 'undefined') return;
	localStorage.removeItem(USAGE_KEY);
}
