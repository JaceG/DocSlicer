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
	maxMergesPerMonth: number;
	maxConversionsPerMonth: number;
	hasZipDownload: boolean;
	hasNoAds: boolean;
	hasPriorityProcessing: boolean;
}

export const TIER_LIMITS: Record<SubscriptionTier, UsageLimits> = {
	free: {
		maxPdfsPerMonth: 3,
		maxFileSizeMB: 25,
		maxPageRanges: 3,
		maxMergesPerMonth: 3,
		maxConversionsPerMonth: 3,
		hasZipDownload: false,
		hasNoAds: false,
		hasPriorityProcessing: false,
	},
	premium: {
		maxPdfsPerMonth: -1, // unlimited
		maxFileSizeMB: 100,
		maxPageRanges: -1, // unlimited
		maxMergesPerMonth: -1, // unlimited
		maxConversionsPerMonth: -1, // unlimited
		hasZipDownload: true,
		hasNoAds: true,
		hasPriorityProcessing: true,
	},
};
