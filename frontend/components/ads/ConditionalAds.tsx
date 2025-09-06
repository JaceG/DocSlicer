'use client';

import {
	HeaderAd,
	SidebarAd,
	FooterAd,
	BetweenContentAd,
} from './AdPlacements';

interface ConditionalAdsProps {
	userTier?: 'free' | 'pro' | 'business';
	placement: 'header' | 'sidebar' | 'footer' | 'between-content';
	showLabel?: boolean;
}

export function ConditionalAds({
	userTier = 'free',
	placement,
	showLabel = true,
}: ConditionalAdsProps) {
	// Only show ads to free users
	if (userTier !== 'free') return null;

	const AdComponent = () => {
		switch (placement) {
			case 'header':
				return <HeaderAd />;
			case 'sidebar':
				return <SidebarAd />;
			case 'footer':
				return <FooterAd />;
			case 'between-content':
				return <BetweenContentAd />;
			default:
				return null;
		}
	};

	return (
		<div className='ad-section'>
			{showLabel && placement !== 'between-content' && (
				<p className='text-xs text-gray-500 dark:text-gray-400 mb-2 text-center'>
					Advertisement - Upgrade to Pro to remove ads
				</p>
			)}
			<AdComponent />
		</div>
	);
}

// Hook for easy ad management
export function useAdVisibility(
	userTier: 'free' | 'pro' | 'business' = 'free'
) {
	return {
		shouldShowAds: userTier === 'free',
		userTier,
	};
}
