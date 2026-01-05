'use client';

import { useUser } from '@clerk/nextjs';
import { SubscriptionStatus, SubscriptionTier, TIER_LIMITS, UsageLimits } from './types';

/**
 * Hook to get user's subscription status
 */
export function useSubscription() {
	const { user, isLoaded } = useUser();

	if (!isLoaded) {
		return {
			isLoaded: false,
			subscription: null,
			limits: TIER_LIMITS.free,
			isPremium: false,
		};
	}

	// If no user, return free tier
	if (!user) {
		return {
			isLoaded: true,
			subscription: { tier: 'free' as SubscriptionTier },
			limits: TIER_LIMITS.free,
			isPremium: false,
		};
	}

	// Get subscription data from Clerk public metadata
	const subscriptionData = user.publicMetadata.subscription as SubscriptionStatus | undefined;
	const subscription: SubscriptionStatus = subscriptionData || { tier: 'free' };
	const isPremium = subscription.tier === 'premium';
	const limits = TIER_LIMITS[subscription.tier];

	return {
		isLoaded: true,
		subscription,
		limits,
		isPremium,
		user,
	};
}

/**
 * Check if user can process another PDF based on their tier and usage
 */
export function useCanProcessPdf() {
	const { limits, isPremium } = useSubscription();

	// Premium users have unlimited
	if (isPremium) {
		return { canProcess: true, remaining: -1 };
	}

	// For free users, check usage in component (client-side only)
	return { canProcess: true, remaining: limits.maxPdfsPerMonth };
}
