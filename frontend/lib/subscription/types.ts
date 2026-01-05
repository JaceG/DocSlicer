export type SubscriptionTier = 'free' | 'premium';

export interface SubscriptionStatus {
	tier: SubscriptionTier;
	stripeCustomerId?: string;
	stripeSubscriptionId?: string;
	currentPeriodEnd?: number; // Unix timestamp
	cancelAtPeriodEnd?: boolean;
}

export interface UsageLimits {
	maxPdfsPerMonth: number;
	maxFileSizeMB: number;
	maxPageRanges: number;
	hasZipDownload: boolean;
	hasNoAds: boolean;
	hasPriorityProcessing: boolean;
	hasFileConversion: boolean; // Convert EPUB, DOCX, etc. to PDF
	maxConversionsPerMonth: number;
}

export const TIER_LIMITS: Record<SubscriptionTier, UsageLimits> = {
	free: {
		maxPdfsPerMonth: 3,
		maxFileSizeMB: 25,
		maxPageRanges: 3,
		hasZipDownload: false,
		hasNoAds: false,
		hasPriorityProcessing: false,
		hasFileConversion: false, // Free users cannot convert files
		maxConversionsPerMonth: 0,
	},
	premium: {
		maxPdfsPerMonth: -1, // unlimited
		maxFileSizeMB: 100,
		maxPageRanges: -1, // unlimited
		hasZipDownload: true,
		hasNoAds: true,
		hasPriorityProcessing: true,
		hasFileConversion: true, // Premium users can convert files
		maxConversionsPerMonth: -1, // unlimited
	},
};
