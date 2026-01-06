export type SubscriptionTier = 'free' | 'premium';

export interface SubscriptionStatus {
	tier: SubscriptionTier;
	stripeCustomerId?: string;
	stripeSubscriptionId?: string;
	currentPeriodEnd?: number; // Unix timestamp
	cancelAtPeriodEnd?: boolean;
}

export interface UsageLimits {
	// Core features
	maxPdfsPerMonth: number; // Split
	maxFileSizeMB: number;
	maxPageRanges: number;
	maxMergesPerMonth: number;
	maxConversionsPerMonth: number; // Shared: IMG→PDF, PDF→IMG
	maxCompressionsPerMonth: number;
	
	// Page operations (Organize: rotate, delete, reorder)
	maxOrganizePerMonth: number;
	
	// Page enhancement
	maxPageNumbersPerMonth: number;
	
	// Security features
	maxProtectPerMonth: number;
	maxUnlockPerMonth: number;
	
	// Content features
	maxWatermarkPerMonth: number;
	
	// Smart operations
	maxBookmarkSplitPerMonth: number;
	maxBlankRemovalPerMonth: number;
	maxRepairPerMonth: number;
	
	// Advanced features
	maxAnnotatePerMonth: number;
	maxSignPerMonth: number;
	maxFormsPerMonth: number;
	maxOcrPerMonth: number;
	maxComparePerMonth: number;
	maxMetadataPerMonth: number;
	
	// Premium perks
	hasZipDownload: boolean;
	hasNoAds: boolean;
	hasPriorityProcessing: boolean;
}

export const TIER_LIMITS: Record<SubscriptionTier, UsageLimits> = {
	free: {
		// Core features
		maxPdfsPerMonth: 3,
		maxFileSizeMB: 25,
		maxPageRanges: 3,
		maxMergesPerMonth: 3,
		maxConversionsPerMonth: 3,
		maxCompressionsPerMonth: 3,
		
		// Page operations
		maxOrganizePerMonth: 3,
		
		// Page enhancement
		maxPageNumbersPerMonth: 3,
		
		// Security features
		maxProtectPerMonth: 3,
		maxUnlockPerMonth: 3,
		
		// Content features
		maxWatermarkPerMonth: 3,
		
		// Smart operations
		maxBookmarkSplitPerMonth: 2,
		maxBlankRemovalPerMonth: 3,
		maxRepairPerMonth: 2,
		
		// Advanced features (more limited for free users)
		maxAnnotatePerMonth: 2,
		maxSignPerMonth: 2,
		maxFormsPerMonth: 2,
		maxOcrPerMonth: 1, // OCR is resource-intensive
		maxComparePerMonth: 2,
		maxMetadataPerMonth: 3,
		
		// Premium perks
		hasZipDownload: false,
		hasNoAds: false,
		hasPriorityProcessing: false,
	},
	premium: {
		// Core features
		maxPdfsPerMonth: -1,
		maxFileSizeMB: 100,
		maxPageRanges: -1,
		maxMergesPerMonth: -1,
		maxConversionsPerMonth: -1,
		maxCompressionsPerMonth: -1,
		
		// Page operations
		maxOrganizePerMonth: -1,
		
		// Page enhancement
		maxPageNumbersPerMonth: -1,
		
		// Security features
		maxProtectPerMonth: -1,
		maxUnlockPerMonth: -1,
		
		// Content features
		maxWatermarkPerMonth: -1,
		
		// Smart operations
		maxBookmarkSplitPerMonth: -1,
		maxBlankRemovalPerMonth: -1,
		maxRepairPerMonth: -1,
		
		// Advanced features
		maxAnnotatePerMonth: -1,
		maxSignPerMonth: -1,
		maxFormsPerMonth: -1,
		maxOcrPerMonth: -1,
		maxComparePerMonth: -1,
		maxMetadataPerMonth: -1,
		
		// Premium perks
		hasZipDownload: true,
		hasNoAds: true,
		hasPriorityProcessing: true,
	},
};
