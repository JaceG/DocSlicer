'use client';

import { useUser } from '@clerk/nextjs';
import { useRouter, useSearchParams } from 'next/navigation';
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';
import { useSubscription } from '@/lib/subscription/hooks';
import { getPdfsProcessedThisMonth, getRemainingPdfs } from '@/lib/subscription/usage';
import { CheckCircle, FileText, Zap, Calendar, Crown } from 'lucide-react';
import { useEffect, useState, Suspense } from 'react';

// Wrap in Suspense for Next.js 15 compatibility with useSearchParams
export default function DashboardPage() {
	return (
		<Suspense fallback={<DashboardLoading />}>
			<DashboardContent />
		</Suspense>
	);
}

function DashboardLoading() {
	return (
		<div className='min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-indigo-50/30 dark:from-gray-900 dark:via-blue-950/20 dark:to-indigo-950/30 flex items-center justify-center'>
			<div className='text-center'>
				<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto'></div>
				<p className='mt-4 text-gray-600 dark:text-gray-400'>Loading...</p>
			</div>
		</div>
	);
}

function DashboardContent() {
	const { user, isLoaded } = useUser();
	const { subscription, limits, isPremium } = useSubscription();
	const router = useRouter();
	const searchParams = useSearchParams();
	const [usage, setUsage] = useState(0);
	const [showSuccess, setShowSuccess] = useState(false);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			setUsage(getPdfsProcessedThisMonth());
		}

		// Check if coming from successful payment
		if (searchParams.get('success') === 'true') {
			setShowSuccess(true);
			setTimeout(() => setShowSuccess(false), 5000);
		}
	}, [searchParams]);

	if (!isLoaded) {
		return (
			<div className='min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-indigo-50/30 dark:from-gray-900 dark:via-blue-950/20 dark:to-indigo-950/30 flex items-center justify-center'>
				<div className='text-center'>
					<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto'></div>
					<p className='mt-4 text-gray-600 dark:text-gray-400'>Loading...</p>
				</div>
			</div>
		);
	}

	if (!user) {
		router.push('/sign-in');
		return null;
	}

	const remaining = getRemainingPdfs(limits.maxPdfsPerMonth);

	return (
		<div className='min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-indigo-50/30 dark:from-gray-900 dark:via-blue-950/20 dark:to-indigo-950/30'>
			<Header />

			<div className='container mx-auto px-4 py-8 max-w-6xl'>
				{/* Success Message */}
				{showSuccess && (
					<div className='mb-6 bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800 rounded-lg p-4 flex items-center gap-3'>
						<CheckCircle className='w-6 h-6 text-green-600 dark:text-green-400' />
						<div>
							<p className='font-semibold text-green-900 dark:text-green-100'>
								Welcome to Premium! 🎉
							</p>
							<p className='text-sm text-green-700 dark:text-green-300'>
								You now have unlimited access to all features.
							</p>
						</div>
					</div>
				)}

				{/* Page Header */}
				<div className='mb-8'>
					<h1 className='text-3xl font-bold text-gray-900 dark:text-white mb-2'>
						Dashboard
					</h1>
					<p className='text-gray-600 dark:text-gray-400'>
						Welcome back, {user.firstName || user.emailAddresses[0]?.emailAddress}
					</p>
				</div>

				<div className='grid lg:grid-cols-3 gap-6'>
					{/* Subscription Card */}
					<div className='lg:col-span-2'>
						<div className={`rounded-2xl shadow-xl p-6 ${
							isPremium
								? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white'
								: 'bg-white dark:bg-gray-800'
						}`}>
							<div className='flex items-start justify-between mb-6'>
								<div>
									<div className='flex items-center gap-2 mb-2'>
										{isPremium && <Crown className='w-6 h-6' />}
										<h2 className='text-2xl font-bold'>
											{isPremium ? 'Premium Plan' : 'Free Plan'}
										</h2>
									</div>
									<p className={isPremium ? 'text-blue-100' : 'text-gray-600 dark:text-gray-400'}>
										{isPremium
											? 'Unlimited access to all features'
											: 'Upgrade to unlock unlimited PDFs'}
									</p>
								</div>
								{!isPremium && (
									<button
										onClick={() => router.push('/pricing')}
										className='bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all'
									>
										Upgrade
									</button>
								)}
							</div>

							{/* Features Grid */}
							<div className='grid md:grid-cols-2 gap-4'>
								<FeatureItem
									icon={<FileText className='w-5 h-5' />}
									label='Monthly PDFs'
									value={
										isPremium
											? 'Unlimited'
											: `${usage} / ${limits.maxPdfsPerMonth} used`
									}
									light={isPremium}
								/>
								<FeatureItem
									icon={<Zap className='w-5 h-5' />}
									label='File Size Limit'
									value={`${limits.maxFileSizeMB}MB`}
									light={isPremium}
								/>
								<FeatureItem
									icon={<Calendar className='w-5 h-5' />}
									label='Page Ranges'
									value={limits.maxPageRanges === -1 ? 'Unlimited' : `Up to ${limits.maxPageRanges}`}
									light={isPremium}
								/>
								<FeatureItem
									icon={<CheckCircle className='w-5 h-5' />}
									label='ZIP Downloads'
									value={limits.hasZipDownload ? 'Enabled' : 'Not Available'}
									light={isPremium}
								/>
							</div>

							{!isPremium && remaining <= 1 && (
								<div className='mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800'>
									<p className='text-sm text-yellow-900 dark:text-yellow-100'>
										⚠️ You have {remaining} PDF{remaining !== 1 ? 's' : ''} remaining this month.
										Upgrade to Premium for unlimited access!
									</p>
								</div>
							)}
						</div>
					</div>

					{/* Quick Stats */}
					<div className='space-y-6'>
						<div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6'>
							<h3 className='text-lg font-bold text-gray-900 dark:text-white mb-4'>
								This Month
							</h3>
							<div className='space-y-4'>
								<div>
									<p className='text-sm text-gray-600 dark:text-gray-400 mb-1'>
										PDFs Processed
									</p>
									<p className='text-3xl font-bold text-gray-900 dark:text-white'>
										{usage}
									</p>
								</div>
								{!isPremium && (
									<div>
										<p className='text-sm text-gray-600 dark:text-gray-400 mb-1'>
											Remaining
										</p>
										<p className='text-3xl font-bold text-blue-600'>
											{remaining}
										</p>
									</div>
								)}
							</div>
						</div>

						{isPremium && (
							<div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6'>
								<h3 className='text-lg font-bold text-gray-900 dark:text-white mb-4'>
									Manage Subscription
								</h3>
								<button
									onClick={async () => {
										try {
											const response = await fetch('/api/create-portal-session', {
												method: 'POST',
											});
											const data = await response.json();
											if (data.url) {
												window.location.href = data.url;
											}
										} catch (error) {
											console.error('Error:', error);
											alert('Failed to open billing portal');
										}
									}}
									className='w-full py-2 px-4 border-2 border-gray-300 dark:border-gray-600 rounded-lg font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all'
								>
									Manage Billing
								</button>
							</div>
						)}
					</div>
				</div>

				{/* Quick Actions */}
				<div className='mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6'>
					<h3 className='text-lg font-bold text-gray-900 dark:text-white mb-4'>
						Quick Actions
					</h3>
					<div className='flex flex-wrap gap-4'>
						<button
							onClick={() => router.push('/')}
							className='bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all'
						>
							Process New PDF
						</button>
						{!isPremium && (
							<button
								onClick={() => router.push('/pricing')}
								className='bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all'
							>
								View Premium Plans
							</button>
						)}
					</div>
				</div>
			</div>

			<Footer />
		</div>
	);
}

function FeatureItem({
	icon,
	label,
	value,
	light = false,
}: {
	icon: React.ReactNode;
	label: string;
	value: string;
	light?: boolean;
}) {
	return (
		<div className={`flex items-start gap-3 ${light ? '' : 'bg-gray-50 dark:bg-gray-700/50'} p-4 rounded-lg`}>
			<div className={light ? 'text-white' : 'text-blue-600 dark:text-blue-400'}>
				{icon}
			</div>
			<div>
				<p className={`text-sm ${light ? 'text-blue-100' : 'text-gray-600 dark:text-gray-400'}`}>
					{label}
				</p>
				<p className={`font-semibold ${light ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
					{value}
				</p>
			</div>
		</div>
	);
}
