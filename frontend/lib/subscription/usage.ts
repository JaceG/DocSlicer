/**
 * Usage tracking for PDF processing
 * Uses localStorage to track monthly usage
 */

const USAGE_KEY = 'pdf_slicer_usage';

interface UsageData {
	month: string; // Format: YYYY-MM
	pdfsProcessed: number;
}

function getCurrentMonth(): string {
	const now = new Date();
	return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
}

function getUsageData(): UsageData {
	if (typeof window === 'undefined') {
		return { month: getCurrentMonth(), pdfsProcessed: 0 };
	}

	const stored = localStorage.getItem(USAGE_KEY);
	if (!stored) {
		return { month: getCurrentMonth(), pdfsProcessed: 0 };
	}

	try {
		const data: UsageData = JSON.parse(stored);
		
		// Reset if it's a new month
		if (data.month !== getCurrentMonth()) {
			return { month: getCurrentMonth(), pdfsProcessed: 0 };
		}
		
		return data;
	} catch {
		return { month: getCurrentMonth(), pdfsProcessed: 0 };
	}
}

function saveUsageData(data: UsageData): void {
	if (typeof window === 'undefined') return;
	localStorage.setItem(USAGE_KEY, JSON.stringify(data));
}

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

export function resetUsage(): void {
	if (typeof window === 'undefined') return;
	localStorage.removeItem(USAGE_KEY);
}
