'use client';

import { useEffect, useState } from 'react';
import { useSubscription } from '@/lib/subscription/hooks';
import { getPdfsProcessedThisMonth } from '@/lib/subscription/usage';
import { AlertCircle, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function UsageBanner() {
	const { isPremium, limits, isLoaded } = useSubscription();
	const router = useRouter();
	const [usage, setUsage] = useState(0);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			setUsage(getPdfsProcessedThisMonth());
		}
	}, []);

	if (!isLoaded || isPremium) return null;

	const remaining = limits.maxPdfsPerMonth - usage;
	const percentUsed = (usage / limits.maxPdfsPerMonth) * 100;

	if (remaining <= 0) {
		return (
			<div className='bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-lg p-4 flex items-start gap-3'>
				<AlertCircle className='w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5' />
				<div className='flex-1'>
					<p className='text-sm font-medium text-red-900 dark:text-red-100'>
						You've reached your monthly limit of {limits.maxPdfsPerMonth} PDFs.
					</p>
					<button
						onClick={() => router.push('/pricing')}
						className='mt-2 text-sm text-red-700 dark:text-red-300 underline font-semibold hover:text-red-900 dark:hover:text-red-100'
					>
						Upgrade to Premium for unlimited access →
					</button>
				</div>
			</div>
		);
	}

	if (percentUsed >= 66) {
		return (
			<div className='bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3 flex items-center gap-3'>
				<Zap className='w-4 h-4 text-yellow-600 dark:text-yellow-400 flex-shrink-0' />
				<div className='flex-1 flex items-center justify-between'>
					<p className='text-sm text-yellow-900 dark:text-yellow-100'>
						{remaining} PDF{remaining !== 1 ? 's' : ''} remaining this month
					</p>
					<button
						onClick={() => router.push('/pricing')}
						className='text-sm text-yellow-700 dark:text-yellow-300 underline font-semibold hover:text-yellow-900 dark:hover:text-yellow-100'
					>
						Upgrade
					</button>
				</div>
			</div>
		);
	}

	return null;
}
