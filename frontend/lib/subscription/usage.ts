/**
 * Usage tracking for PDF processing
 * Uses localStorage to track monthly usage
 */

const USAGE_KEY = 'pdf_slicer_usage';

interface UsageData {
	month: string; // Format: YYYY-MM
	pdfsProcessed: number;
	mergesProcessed: number;
	conversionsProcessed: number;
	compressionsProcessed: number;
}

function getCurrentMonth(): string {
	const now = new Date();
	return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
}

function getDefaultUsageData(): UsageData {
	return {
		month: getCurrentMonth(),
		pdfsProcessed: 0,
		mergesProcessed: 0,
		conversionsProcessed: 0,
		compressionsProcessed: 0,
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
			pdfsProcessed: data.pdfsProcessed || 0,
			mergesProcessed: data.mergesProcessed || 0,
			conversionsProcessed: data.conversionsProcessed || 0,
			compressionsProcessed: data.compressionsProcessed || 0,
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

export function resetUsage(): void {
	if (typeof window === 'undefined') return;
	localStorage.removeItem(USAGE_KEY);
}
