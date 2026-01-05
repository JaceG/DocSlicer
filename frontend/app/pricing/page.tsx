'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';
import { CheckCircle, Sparkles } from 'lucide-react';

export default function PricingPage() {
	const { isSignedIn } = useUser();
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

	const handleSubscribe = async (priceId: string) => {
		if (!isSignedIn) {
			router.push('/sign-up');
			return;
		}

		setIsLoading(true);
		try {
			const response = await fetch('/api/create-checkout-session', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ priceId }),
			});

			const data = await response.json();

			if (data.url) {
				window.location.href = data.url;
			} else {
				throw new Error('No checkout URL returned');
			}
		} catch (error) {
			console.error('Error:', error);
			alert('Failed to start checkout. Please try again.');
			setIsLoading(false);
		}
	};

	const monthlyPrice = process.env.NEXT_PUBLIC_STRIPE_PRICE_MONTHLY!;
	const yearlyPrice = process.env.NEXT_PUBLIC_STRIPE_PRICE_YEARLY!;

	return (
		<div className='min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-indigo-50/30 dark:from-gray-900 dark:via-blue-950/20 dark:to-indigo-950/30'>
			<Header />

			<div className='container mx-auto px-4 py-16'>
				<div className='max-w-5xl mx-auto'>
					{/* Header */}
					<div className='text-center mb-12'>
						<h1 className='text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white'>
							Simple, Transparent Pricing
						</h1>
						<p className='text-xl text-gray-600 dark:text-gray-300'>
							Choose the plan that works for you
						</p>
					</div>

					{/* Billing Toggle */}
					<div className='flex justify-center mb-12'>
						<div className='bg-white dark:bg-gray-800 rounded-full p-1 shadow-lg'>
							<button
								onClick={() => setBillingCycle('monthly')}
								className={`px-6 py-2 rounded-full transition-all ${
									billingCycle === 'monthly'
										? 'bg-blue-600 text-white'
										: 'text-gray-600 dark:text-gray-300'
								}`}
							>
								Monthly
							</button>
							<button
								onClick={() => setBillingCycle('yearly')}
								className={`px-6 py-2 rounded-full transition-all ${
									billingCycle === 'yearly'
										? 'bg-blue-600 text-white'
										: 'text-gray-600 dark:text-gray-300'
								}`}
							>
								Yearly
							</button>
						</div>
					</div>

					{/* Pricing Cards */}
					<div className='grid md:grid-cols-2 gap-8 max-w-4xl mx-auto'>
						{/* Free Tier */}
						<div className='bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border-2 border-gray-200 dark:border-gray-700'>
							<div className='mb-6'>
								<h2 className='text-2xl font-bold mb-2 text-gray-900 dark:text-white'>
									Free
								</h2>
								<div className='flex items-baseline mb-4'>
									<span className='text-5xl font-bold text-gray-900 dark:text-white'>
										$0
									</span>
									<span className='ml-2 text-gray-600 dark:text-gray-400'>
										/month
									</span>
								</div>
								<p className='text-gray-600 dark:text-gray-400'>
									Perfect for occasional use
								</p>
							</div>

							<ul className='space-y-4 mb-8'>
								<Feature text='3 splits, merges & conversions/month' />
								<Feature text='25MB file size limit' />
								<Feature text='Up to 3 page ranges' />
								<Feature text='Split & Merge PDFs' />
								<Feature text='Convert EPUB, DOCX, images' />
								<Feature text='Individual file downloads' />
							</ul>

							<button
								onClick={() => router.push('/')}
								className='w-full py-3 px-6 rounded-lg font-semibold transition-all border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
							>
								Get Started
							</button>
						</div>

						{/* Premium Tier */}
						<div className='bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-2xl p-8 border-2 border-blue-500 relative'>
							{billingCycle === 'yearly' && (
								<div className='absolute -top-4 left-1/2 transform -translate-x-1/2'>
									<span className='bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-bold'>
										BEST VALUE
									</span>
								</div>
							)}

							<div className='mb-6'>
								<h2 className='text-2xl font-bold mb-2 text-white'>
									Premium
								</h2>
								<div className='flex items-baseline mb-4'>
									<span className='text-5xl font-bold text-white'>
										${billingCycle === 'monthly' ? '2' : '20'}
									</span>
									<span className='ml-2 text-blue-100'>
										/{billingCycle === 'monthly' ? 'month' : 'year'}
									</span>
								</div>
								<p className='text-blue-100'>
									Unlimited processing for power users
								</p>
							</div>

							<ul className='space-y-4 mb-8'>
								<Feature text='Unlimited PDFs' light />
								<Feature text='100MB file size limit' light />
								<Feature text='Unlimited page ranges' light />
								<Feature text='Split & Merge PDFs' light />
								<Feature text='Convert EPUB, DOCX, images & more' light highlight />
								<Feature text='ZIP downloads' light />
								<Feature text='No ads' light />
								<Feature text='Priority processing' light />
								<Feature text='100% browser-based privacy' light />
							</ul>

							<button
								onClick={() => handleSubscribe(billingCycle === 'monthly' ? monthlyPrice : yearlyPrice)}
								disabled={isLoading}
								className='w-full py-3 px-6 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed'
							>
								{isLoading ? 'Processing...' : 'Upgrade to Premium'}
							</button>
						</div>
					</div>

					{/* FAQ or Additional Info */}
					<div className='mt-16 text-center'>
						<p className='text-gray-600 dark:text-gray-400 mb-4'>
							💳 Secure payment powered by Stripe
						</p>
						<p className='text-gray-600 dark:text-gray-400'>
							Cancel anytime, no questions asked
						</p>
					</div>
				</div>
			</div>

			<Footer />
		</div>
	);
}

function Feature({ text, light = false, highlight = false }: { text: string; light?: boolean; highlight?: boolean }) {
	return (
		<li className='flex items-start'>
			{highlight ? (
				<Sparkles
					className={`w-5 h-5 ${
						light ? 'text-yellow-300' : 'text-purple-500'
					} mr-3 flex-shrink-0 mt-0.5`}
				/>
			) : (
				<CheckCircle
					className={`w-5 h-5 ${
						light ? 'text-white' : 'text-green-500'
					} mr-3 flex-shrink-0 mt-0.5`}
				/>
			)}
			<span className={`${light ? 'text-white' : 'text-gray-700 dark:text-gray-300'} ${highlight ? 'font-semibold' : ''}`}>
				{text}
			</span>
		</li>
	);
}
