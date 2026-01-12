'use client';

import { useUser } from '@clerk/nextjs';
import { useRouter, useSearchParams } from 'next/navigation';
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';
import { useSubscription } from '@/lib/subscription/hooks';
import {
	getPdfsProcessedThisMonth,
	getMergesProcessedThisMonth,
	getCompressionsProcessedThisMonth,
	getConversionsProcessedThisMonth,
	getOrganizeProcessedThisMonth,
	getPageNumbersProcessedThisMonth,
	getProtectProcessedThisMonth,
	getUnlockProcessedThisMonth,
	getWatermarkProcessedThisMonth,
	getBookmarkSplitProcessedThisMonth,
	getBlankRemovalProcessedThisMonth,
	getRepairProcessedThisMonth,
	getAnnotateProcessedThisMonth,
	getSignProcessedThisMonth,
	getFormsProcessedThisMonth,
	getOcrProcessedThisMonth,
	getCompareProcessedThisMonth,
	getMetadataProcessedThisMonth,
} from '@/lib/subscription/usage';
import { ALL_TOOLS, TOOLS_COUNT } from '@/lib/tools/config';
import {
	CheckCircle,
	Crown,
	Sparkles,
	TrendingUp,
	Shield,
	Zap,
	ArrowRight,
	ChevronRight,
} from 'lucide-react';
import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';

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
				<p className='mt-4 text-gray-600 dark:text-gray-400'>
					Loading...
				</p>
			</div>
		</div>
	);
}

interface ToolUsage {
	id: string;
	used: number;
	limit: number;
}

function DashboardContent() {
	const { user, isLoaded } = useUser();
	const { limits, isPremium } = useSubscription();
	const router = useRouter();
	const searchParams = useSearchParams();
	const [showSuccess, setShowSuccess] = useState(false);
	const [usageData, setUsageData] = useState<ToolUsage[]>([]);
	const [totalOperations, setTotalOperations] = useState(0);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			// Gather usage for all tools
			const usage: ToolUsage[] = [
				{
					id: 'split',
					used: getPdfsProcessedThisMonth(),
					limit: limits.maxPdfsPerMonth,
				},
				{
					id: 'merge',
					used: getMergesProcessedThisMonth(),
					limit: limits.maxMergesPerMonth,
				},
				{
					id: 'compress',
					used: getCompressionsProcessedThisMonth(),
					limit: limits.maxCompressionsPerMonth,
				},
				{
					id: 'organize',
					used: getOrganizeProcessedThisMonth(),
					limit: limits.maxOrganizePerMonth,
				},
				{
					id: 'images-to-pdf',
					used: getConversionsProcessedThisMonth(),
					limit: limits.maxConversionsPerMonth,
				},
				{
					id: 'pdf-to-images',
					used: getConversionsProcessedThisMonth(),
					limit: limits.maxConversionsPerMonth,
				},
				{
					id: 'page-numbers',
					used: getPageNumbersProcessedThisMonth(),
					limit: limits.maxPageNumbersPerMonth,
				},
				{
					id: 'protect',
					used: getProtectProcessedThisMonth(),
					limit: limits.maxProtectPerMonth,
				},
				{
					id: 'unlock',
					used: getUnlockProcessedThisMonth(),
					limit: limits.maxUnlockPerMonth,
				},
				{
					id: 'watermark',
					used: getWatermarkProcessedThisMonth(),
					limit: limits.maxWatermarkPerMonth,
				},
				{
					id: 'split-bookmarks',
					used: getBookmarkSplitProcessedThisMonth(),
					limit: limits.maxBookmarkSplitPerMonth,
				},
				{
					id: 'remove-blanks',
					used: getBlankRemovalProcessedThisMonth(),
					limit: limits.maxBlankRemovalPerMonth,
				},
				{
					id: 'repair',
					used: getRepairProcessedThisMonth(),
					limit: limits.maxRepairPerMonth,
				},
				{
					id: 'annotate',
					used: getAnnotateProcessedThisMonth(),
					limit: limits.maxAnnotatePerMonth,
				},
				{
					id: 'sign',
					used: getSignProcessedThisMonth(),
					limit: limits.maxSignPerMonth,
				},
				{
					id: 'forms',
					used: getFormsProcessedThisMonth(),
					limit: limits.maxFormsPerMonth,
				},
				{
					id: 'ocr',
					used: getOcrProcessedThisMonth(),
					limit: limits.maxOcrPerMonth,
				},
				{
					id: 'compare',
					used: getCompareProcessedThisMonth(),
					limit: limits.maxComparePerMonth,
				},
				{
					id: 'metadata',
					used: getMetadataProcessedThisMonth(),
					limit: limits.maxMetadataPerMonth,
				},
			];
			setUsageData(usage);
			setTotalOperations(usage.reduce((sum, u) => sum + u.used, 0));
		}

		// Check if coming from successful payment
		if (searchParams.get('success') === 'true') {
			setShowSuccess(true);
			setTimeout(() => setShowSuccess(false), 5000);
		}
	}, [searchParams, limits]);

	if (!isLoaded) {
		return <DashboardLoading />;
	}

	if (!user) {
		router.push('/sign-in');
		return null;
	}

	// Group tools by category
	const toolCategories = [
		{
			name: 'Core Tools',
			description: 'Essential PDF operations',
			tools: ['split', 'merge', 'compress', 'organize'],
		},
		{
			name: 'Conversion',
			description: 'Format transformations',
			tools: ['images-to-pdf', 'pdf-to-images'],
		},
		{
			name: 'Page Enhancement',
			description: 'Add elements to your PDFs',
			tools: ['page-numbers', 'watermark', 'annotate'],
		},
		{
			name: 'Security',
			description: 'Protect and unlock documents',
			tools: ['protect', 'unlock', 'sign'],
		},
		{
			name: 'Smart Operations',
			description: 'AI-powered features',
			tools: ['split-bookmarks', 'remove-blanks', 'repair', 'ocr'],
		},
		{
			name: 'Advanced',
			description: 'Professional tools',
			tools: ['forms', 'compare', 'metadata'],
		},
	];

	const getToolConfig = (id: string) => ALL_TOOLS.find((t) => t.id === id);
	const getToolUsage = (id: string) => usageData.find((u) => u.id === id);

	return (
		<main className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800'>
			<div className='min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-indigo-50/30 dark:from-gray-900 dark:via-blue-950/20 dark:to-indigo-950/30'>
				<Header />

				<div className='container mx-auto px-4 py-8 max-w-7xl'>
					{/* Success Message */}
					{showSuccess && (
						<div className='mb-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 border-2 border-green-300 dark:border-green-700 rounded-xl p-5 flex items-center gap-4 shadow-lg'>
							<div className='w-12 h-12 bg-green-500 rounded-full flex items-center justify-center'>
								<Sparkles className='w-6 h-6 text-white' />
							</div>
							<div>
								<p className='font-bold text-lg text-green-900 dark:text-green-100'>
									Welcome to Premium! 🎉
								</p>
								<p className='text-green-700 dark:text-green-300'>
									You now have unlimited access to all{' '}
									{TOOLS_COUNT} PDF tools.
								</p>
							</div>
						</div>
					)}

					{/* Page Header */}
					<div className='mb-8'>
						<h1 className='text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2'>
							Dashboard
						</h1>
						<p className='text-lg text-gray-600 dark:text-gray-400'>
							Welcome back,{' '}
							{user.firstName ||
								user.emailAddresses[0]?.emailAddress?.split(
									'@'
								)[0]}
						</p>
					</div>

					{/* Top Row - Subscription + Stats */}
					<div className='grid lg:grid-cols-3 gap-6 mb-8'>
						{/* Subscription Card */}
						<div className='lg:col-span-2'>
							<div
								className={`rounded-2xl shadow-xl p-6 md:p-8 ${
									isPremium
										? 'bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white'
										: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
								}`}>
								<div className='flex items-start justify-between mb-6'>
									<div>
										<div className='flex items-center gap-3 mb-2'>
											{isPremium ? (
												<div className='w-10 h-10 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center'>
													<Crown className='w-6 h-6 text-yellow-300' />
												</div>
											) : (
												<div className='w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center'>
													<Shield className='w-6 h-6 text-gray-600 dark:text-gray-400' />
												</div>
											)}
											<h2 className='text-2xl md:text-3xl font-bold'>
												{isPremium
													? 'Premium Plan'
													: 'Free Plan'}
											</h2>
										</div>
										<p
											className={`text-lg ${
												isPremium
													? 'text-blue-100'
													: 'text-gray-600 dark:text-gray-400'
											}`}>
											{isPremium
												? `Unlimited access to all ${TOOLS_COUNT} PDF tools`
												: 'Upgrade to unlock unlimited operations'}
										</p>
									</div>
									{!isPremium && (
										<button
											onClick={() =>
												router.push('/pricing')
											}
											className='bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-2'>
											<Sparkles className='w-5 h-5' />
											Upgrade
										</button>
									)}
								</div>

								{/* Benefits Grid */}
								<div className='grid sm:grid-cols-2 md:grid-cols-4 gap-4'>
									<BenefitItem
										icon={<Zap className='w-5 h-5' />}
										label='File Size'
										value={`${limits.maxFileSizeMB}MB max`}
										light={isPremium}
									/>
									<BenefitItem
										icon={
											<TrendingUp className='w-5 h-5' />
										}
										label='Monthly Ops'
										value={
											isPremium ? 'Unlimited' : 'Limited'
										}
										light={isPremium}
									/>
									<BenefitItem
										icon={
											<CheckCircle className='w-5 h-5' />
										}
										label='ZIP Downloads'
										value={
											limits.hasZipDownload
												? 'Enabled'
												: 'Not Available'
										}
										light={isPremium}
									/>
									<BenefitItem
										icon={<Shield className='w-5 h-5' />}
										label='Ad-Free'
										value={limits.hasNoAds ? 'Yes' : 'No'}
										light={isPremium}
									/>
								</div>

								{isPremium && (
									<div className='mt-6 pt-6 border-t border-white/20'>
										<button
											onClick={async () => {
												try {
													const response =
														await fetch(
															'/api/create-portal-session',
															{
																method: 'POST',
															}
														);
													const data =
														await response.json();
													if (data.url) {
														window.location.href =
															data.url;
													}
												} catch (error) {
													console.error(
														'Error:',
														error
													);
													alert(
														'Failed to open billing portal'
													);
												}
											}}
											className='text-white/90 hover:text-white font-medium flex items-center gap-2 transition-colors'>
											Manage Billing{' '}
											<ChevronRight className='w-4 h-4' />
										</button>
									</div>
								)}
							</div>
						</div>

						{/* Quick Stats */}
						<div className='bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700'>
							<h3 className='text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2'>
								<TrendingUp className='w-5 h-5 text-blue-600' />
								This Month
							</h3>
							<div className='space-y-6'>
								<div className='text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl'>
									<p className='text-sm text-gray-600 dark:text-gray-400 mb-1'>
										Total Operations
									</p>
									<p className='text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>
										{totalOperations}
									</p>
								</div>
								<div className='grid grid-cols-2 gap-3'>
									<div className='text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg'>
										<p className='text-2xl font-bold text-gray-900 dark:text-white'>
											{TOOLS_COUNT}
										</p>
										<p className='text-xs text-gray-600 dark:text-gray-400'>
											Tools Available
										</p>
									</div>
									<div className='text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg'>
										<p className='text-2xl font-bold text-gray-900 dark:text-white'>
											{isPremium
												? '∞'
												: usageData.filter(
														(u) => u.used > 0
												  ).length}
										</p>
										<p className='text-xs text-gray-600 dark:text-gray-400'>
											{isPremium
												? 'Unlimited'
												: 'Tools Used'}
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Quick Access Tools Grid */}
					<div className='bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8 border border-gray-200 dark:border-gray-700 mb-8'>
						<div className='flex items-center justify-between mb-6'>
							<h3 className='text-xl font-bold text-gray-900 dark:text-white'>
								Quick Access
							</h3>
							<Link
								href='/'
								className='text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 text-sm'>
								View All Tools{' '}
								<ArrowRight className='w-4 h-4' />
							</Link>
						</div>
						<div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-3'>
							{ALL_TOOLS.slice(0, 18).map((tool) => {
								const Icon = tool.icon;
								const usage = getToolUsage(tool.id);
								const isAtLimit =
									!isPremium &&
									usage &&
									usage.limit > 0 &&
									usage.used >= usage.limit;

								return (
									<Link
										key={tool.id}
										href={`/${tool.slug}`}
										className={`group flex flex-col items-center p-3 rounded-xl transition-all duration-200 ${
											isAtLimit
												? 'bg-red-50 dark:bg-red-900/20 opacity-60'
												: 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
										}`}>
										<div
											className={`w-10 h-10 ${tool.colorClass} rounded-xl flex items-center justify-center mb-2 shadow-lg group-hover:scale-110 transition-transform`}>
											<Icon className='w-5 h-5 text-white' />
										</div>
										<span className='text-xs font-medium text-gray-700 dark:text-gray-300 text-center leading-tight'>
											{tool.shortLabel}
										</span>
										{!isPremium && usage && (
											<span
												className={`text-[10px] mt-1 ${
													isAtLimit
														? 'text-red-500'
														: 'text-gray-400'
												}`}>
												{usage.used}/
												{usage.limit === -1
													? '∞'
													: usage.limit}
											</span>
										)}
									</Link>
								);
							})}
						</div>
					</div>

					{/* Usage by Category */}
					<div className='space-y-6'>
						<h3 className='text-xl font-bold text-gray-900 dark:text-white'>
							Usage by Category
						</h3>
						<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
							{toolCategories.map((category) => (
								<div
									key={category.name}
									className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700'>
									<div className='mb-4'>
										<h4 className='font-bold text-gray-900 dark:text-white'>
											{category.name}
										</h4>
										<p className='text-sm text-gray-500 dark:text-gray-400'>
											{category.description}
										</p>
									</div>
									<div className='space-y-3'>
										{category.tools.map((toolId) => {
											const tool = getToolConfig(toolId);
											const usage = getToolUsage(toolId);
											if (!tool || !usage) return null;

											const Icon = tool.icon;
											const percentage =
												usage.limit === -1
													? 0
													: Math.min(
															100,
															(usage.used /
																usage.limit) *
																100
													  );
											const isAtLimit =
												usage.limit > 0 &&
												usage.used >= usage.limit;

											return (
												<div
													key={toolId}
													className='group'>
													<div className='flex items-center gap-3 mb-1.5'>
														<div
															className={`w-8 h-8 ${tool.colorClass} rounded-lg flex items-center justify-center shadow`}>
															<Icon className='w-4 h-4 text-white' />
														</div>
														<div className='flex-1 min-w-0'>
															<div className='flex items-center justify-between'>
																<span className='text-sm font-medium text-gray-700 dark:text-gray-300 truncate'>
																	{
																		tool.shortLabel
																	}
																</span>
																<span
																	className={`text-xs font-medium ${
																		isAtLimit &&
																		!isPremium
																			? 'text-red-500'
																			: 'text-gray-500 dark:text-gray-400'
																	}`}>
																	{isPremium
																		? `${usage.used} used`
																		: usage.limit ===
																		  -1
																		? `${usage.used}`
																		: `${usage.used}/${usage.limit}`}
																</span>
															</div>
															{!isPremium &&
																usage.limit >
																	0 && (
																	<div className='h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden mt-1'>
																		<div
																			className={`h-full rounded-full transition-all ${
																				isAtLimit
																					? 'bg-red-500'
																					: percentage >
																					  66
																					? 'bg-yellow-500'
																					: 'bg-green-500'
																			}`}
																			style={{
																				width: `${percentage}%`,
																			}}
																		/>
																	</div>
																)}
														</div>
													</div>
												</div>
											);
										})}
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Upgrade CTA for Free Users */}
					{!isPremium && (
						<div className='mt-8 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl shadow-xl p-8 text-white'>
							<div className='flex flex-col md:flex-row items-center justify-between gap-6'>
								<div>
									<h3 className='text-2xl font-bold mb-2'>
										Unlock Unlimited PDF Operations
									</h3>
									<p className='text-blue-100 max-w-xl'>
										Upgrade to Premium for unlimited access
										to all {TOOLS_COUNT} tools, larger file sizes, ZIP
										downloads, and an ad-free experience.
									</p>
								</div>
								<button
									onClick={() => router.push('/pricing')}
									className='bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl flex items-center gap-2 whitespace-nowrap'>
									<Crown className='w-5 h-5' />
									View Premium Plans
								</button>
							</div>
						</div>
					)}
				</div>

				<Footer />
			</div>
		</main>
	);
}

function BenefitItem({
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
		<div
			className={`flex items-center gap-3 p-3 rounded-xl ${
				light
					? 'bg-white/10 backdrop-blur'
					: 'bg-gray-50 dark:bg-gray-700/50'
			}`}>
			<div
				className={
					light ? 'text-white' : 'text-blue-600 dark:text-blue-400'
				}>
				{icon}
			</div>
			<div>
				<p
					className={`text-xs ${
						light
							? 'text-white/70'
							: 'text-gray-500 dark:text-gray-400'
					}`}>
					{label}
				</p>
				<p
					className={`text-sm font-semibold ${
						light ? 'text-white' : 'text-gray-900 dark:text-white'
					}`}>
					{value}
				</p>
			</div>
		</div>
	);
}
