'use client';

import { useRouter } from 'next/navigation';
import { Sparkles, X } from 'lucide-react';
import { useState } from 'react';

interface UpgradePromptProps {
	message: string;
	compact?: boolean;
}

export function UpgradePrompt({ message, compact = false }: UpgradePromptProps) {
	const router = useRouter();
	const [dismissed, setDismissed] = useState(false);

	if (dismissed) return null;

	if (compact) {
		return (
			<div className='bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center justify-between'>
				<div className='flex items-center gap-2'>
					<Sparkles className='w-4 h-4' />
					<span className='text-sm font-medium'>{message}</span>
				</div>
				<button
					onClick={() => router.push('/pricing')}
					className='ml-4 bg-white text-blue-600 px-3 py-1 rounded text-sm font-semibold hover:bg-blue-50 transition-all'
				>
					Upgrade
				</button>
			</div>
		);
	}

	return (
		<div className='bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-xl p-6 shadow-lg relative'>
			<button
				onClick={() => setDismissed(true)}
				className='absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
			>
				<X className='w-5 h-5' />
			</button>

			<div className='flex items-start gap-4'>
				<div className='bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full p-3'>
					<Sparkles className='w-6 h-6 text-white' />
				</div>

				<div className='flex-1'>
					<h3 className='text-lg font-bold text-gray-900 dark:text-white mb-2'>
						Upgrade to Premium
					</h3>
					<p className='text-gray-700 dark:text-gray-300 mb-4'>{message}</p>

					<div className='flex flex-wrap gap-3'>
						<button
							onClick={() => router.push('/pricing')}
							className='bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md'
						>
							View Plans - Just $2/month
						</button>
						<button
							onClick={() => setDismissed(true)}
							className='px-6 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all'
						>
							Maybe Later
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
