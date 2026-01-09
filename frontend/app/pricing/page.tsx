'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';
import { TOOLS_COUNT } from '@/lib/tools/config';
import {
	CheckCircle,
	Sparkles,
	Scissors,
	Layers,
	FileDown,
	RotateCw,
	Image as ImageIcon,
	FileImage,
	Hash,
	Lock,
	Unlock,
	Droplet,
	BookOpen,
	FileX,
	Wrench,
	Highlighter,
	PenTool,
	FileText,
	Scan,
	GitCompare,
	Info,
	Shield,
	Zap,
	X,
} from 'lucide-react';

const TOOL_CATEGORIES = [
	{
		name: 'Core Tools',
		description: 'Essential PDF operations',
		tools: [
			{
				name: 'Split PDF',
				icon: Scissors,
				freeLimit: '3/month',
				premium: 'Unlimited',
			},
			{
				name: 'Merge PDF',
				icon: Layers,
				freeLimit: '3/month',
				premium: 'Unlimited',
			},
			{
				name: 'Compress PDF',
				icon: FileDown,
				freeLimit: '3/month',
				premium: 'Unlimited',
			},
			{
				name: 'Organize Pages',
				icon: RotateCw,
				freeLimit: '3/month',
				premium: 'Unlimited',
			},
		],
	},
	{
		name: 'Conversion Tools',
		description: 'Convert between formats',
		tools: [
			{
				name: 'Images to PDF',
				icon: ImageIcon,
				freeLimit: '3/month',
				premium: 'Unlimited',
			},
			{
				name: 'PDF to Images',
				icon: FileImage,
				freeLimit: '3/month',
				premium: 'Unlimited',
			},
			{
				name: 'PDF to HTML',
				icon: FileText,
				freeLimit: '3/month',
				premium: 'Unlimited',
			},
		],
	},
	{
		name: 'Enhancement Tools',
		description: 'Add and modify content',
		tools: [
			{
				name: 'Add Page Numbers',
				icon: Hash,
				freeLimit: '3/month',
				premium: 'Unlimited',
			},
			{
				name: 'Add Watermark',
				icon: Droplet,
				freeLimit: '3/month',
				premium: 'Unlimited',
			},
			{
				name: 'Annotate PDF',
				icon: Highlighter,
				freeLimit: '3/month',
				premium: 'Unlimited',
			},
			{
				name: 'Sign PDF',
				icon: PenTool,
				freeLimit: '3/month',
				premium: 'Unlimited',
			},
			{
				name: 'Fill Forms',
				icon: FileText,
				freeLimit: '3/month',
				premium: 'Unlimited',
			},
		],
	},
	{
		name: 'Security Tools',
		description: 'Protect your documents',
		tools: [
			{
				name: 'Password Protect',
				icon: Lock,
				freeLimit: '3/month',
				premium: 'Unlimited',
			},
			{
				name: 'Remove Password',
				icon: Unlock,
				freeLimit: '3/month',
				premium: 'Unlimited',
			},
		],
	},
	{
		name: 'Advanced Tools',
		description: 'Power user features',
		tools: [
			{
				name: 'Split by Bookmarks',
				icon: BookOpen,
				freeLimit: '3/month',
				premium: 'Unlimited',
			},
			{
				name: 'Remove Blank Pages',
				icon: FileX,
				freeLimit: '3/month',
				premium: 'Unlimited',
			},
			{
				name: 'Repair PDF',
				icon: Wrench,
				freeLimit: '3/month',
				premium: 'Unlimited',
			},
			{
				name: 'OCR (Text Recognition)',
				icon: Scan,
				freeLimit: '3/month',
				premium: 'Unlimited',
			},
			{
				name: 'Compare PDFs',
				icon: GitCompare,
				freeLimit: '3/month',
				premium: 'Unlimited',
			},
			{
				name: 'Edit Metadata',
				icon: Info,
				freeLimit: '3/month',
				premium: 'Unlimited',
			},
		],
	},
];

// Use centralized TOOLS_COUNT from config for consistency
// TOOL_CATEGORIES is kept for displaying tools by category on this page

export default function PricingPage() {
	const { isSignedIn } = useUser();
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>(
		'monthly'
	);

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
				<div className='max-w-6xl mx-auto'>
					{/* Header */}
					<div className='text-center mb-12'>
						<h1 className='text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white'>
							Simple, Transparent Pricing
						</h1>
						<p className='text-xl text-gray-600 dark:text-gray-300 mb-2'>
							Access all {TOOLS_COUNT} PDF tools with one simple
							plan
						</p>
						<div className='flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400'>
							<Shield className='w-4 h-4' />
							<span>
								100% browser-based • Your files never leave your
								device
							</span>
						</div>
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
								}`}>
								Monthly
							</button>
							<button
								onClick={() => setBillingCycle('yearly')}
								className={`px-6 py-2 rounded-full transition-all ${
									billingCycle === 'yearly'
										? 'bg-blue-600 text-white'
										: 'text-gray-600 dark:text-gray-300'
								}`}>
								Yearly
								<span className='ml-2 text-xs bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 px-2 py-0.5 rounded-full'>
									Save 17%
								</span>
							</button>
						</div>
					</div>

					{/* Pricing Cards */}
					<div className='grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16'>
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

							<ul className='space-y-3 mb-8'>
								<Feature
									text={`Access to all ${TOOLS_COUNT} PDF tools`}
								/>
								<Feature text='3 operations per tool per month' />
								<Feature text='25MB file size limit' />
								<Feature text='Up to 3 page ranges per split' />
								<Feature text='Individual file downloads' />
								<Feature text='100% browser-based privacy' />
								<FeatureDisabled text='ZIP downloads for multiple files' />
								<FeatureDisabled text='Extended file size (100MB)' />
								<FeatureDisabled text='Priority processing' />
							</ul>

							<button
								onClick={() => router.push('/')}
								className='w-full py-3 px-6 rounded-lg font-semibold transition-all border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700'>
								Get Started Free
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
								<div className='flex items-center gap-2 mb-2'>
									<h2 className='text-2xl font-bold text-white'>
										Premium
									</h2>
									<Zap className='w-5 h-5 text-yellow-300' />
								</div>
								<div className='flex items-baseline mb-4'>
									<span className='text-5xl font-bold text-white'>
										$
										{billingCycle === 'monthly'
											? '2'
											: '20'}
									</span>
									<span className='ml-2 text-blue-100'>
										/
										{billingCycle === 'monthly'
											? 'month'
											: 'year'}
									</span>
								</div>
								<p className='text-blue-100'>
									Unlimited power for professionals
								</p>
							</div>

							<ul className='space-y-3 mb-8'>
								<Feature
									text={`Unlimited access to all ${TOOLS_COUNT} tools`}
									light
								/>
								<Feature
									text='Unlimited operations'
									light
									highlight
								/>
								<Feature text='100MB file size limit' light />
								<Feature text='Unlimited page ranges' light />
								<Feature
									text='ZIP downloads for batch exports'
									light
								/>
								<Feature
									text='100% browser-based privacy'
									light
								/>
								<Feature text='Priority processing' light />
								<Feature
									text='Early access to new features'
									light
									highlight
								/>
								<Feature text='Email support' light />
							</ul>

							<button
								onClick={() =>
									handleSubscribe(
										billingCycle === 'monthly'
											? monthlyPrice
											: yearlyPrice
									)
								}
								disabled={isLoading}
								className='w-full py-3 px-6 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed'>
								{isLoading
									? 'Processing...'
									: 'Upgrade to Premium'}
							</button>
						</div>
					</div>

					{/* Tool Categories */}
					<div className='mb-16'>
						<h2 className='text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white'>
							All {TOOLS_COUNT} Tools Included
						</h2>
						<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
							{TOOL_CATEGORIES.map((category) => (
								<div
									key={category.name}
									className='bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700'>
									<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-1'>
										{category.name}
									</h3>
									<p className='text-sm text-gray-500 dark:text-gray-400 mb-4'>
										{category.description}
									</p>
									<ul className='space-y-2'>
										{category.tools.map((tool) => (
											<li
												key={tool.name}
												className='flex items-center gap-2'>
												<tool.icon className='w-4 h-4 text-blue-500' />
												<span className='text-gray-700 dark:text-gray-300 text-sm'>
													{tool.name}
												</span>
											</li>
										))}
									</ul>
								</div>
							))}
						</div>
					</div>

					{/* Comparison Table */}
					<div className='mb-16'>
						<h2 className='text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white'>
							Plan Comparison
						</h2>
						<div className='bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700'>
							<div className='overflow-x-auto'>
								<table className='w-full'>
									<thead>
										<tr className='bg-gray-50 dark:bg-gray-700/50'>
											<th className='text-left py-4 px-6 text-gray-900 dark:text-white font-semibold'>
												Feature
											</th>
											<th className='text-center py-4 px-6 text-gray-900 dark:text-white font-semibold'>
												Free
											</th>
											<th className='text-center py-4 px-6 text-blue-600 dark:text-blue-400 font-semibold'>
												Premium
											</th>
										</tr>
									</thead>
									<tbody className='divide-y divide-gray-200 dark:divide-gray-700'>
										<ComparisonRow
											feature='PDF Tools Access'
											free={`All ${TOOLS_COUNT} tools`}
											premium={`All ${TOOLS_COUNT} tools`}
										/>
										<ComparisonRow
											feature='Monthly Operations (per tool)'
											free='3'
											premium='Unlimited'
											premiumHighlight
										/>
										<ComparisonRow
											feature='Maximum File Size'
											free='25MB'
											premium='100MB'
											premiumHighlight
										/>
										<ComparisonRow
											feature='Page Ranges (Split)'
											free='Up to 3'
											premium='Unlimited'
											premiumHighlight
										/>
										<ComparisonRow
											feature='Browser-Based Privacy'
											free='✓'
											premium='✓'
										/>
										<ComparisonRow
											feature='Individual Downloads'
											free='✓'
											premium='✓'
										/>
										<ComparisonRow
											feature='ZIP Batch Downloads'
											free='✗'
											premium='✓'
											premiumHighlight
										/>
										<ComparisonRow
											feature='Priority Processing'
											free='✗'
											premium='✓'
											premiumHighlight
										/>
										<ComparisonRow
											feature='Email Support'
											free='✗'
											premium='✓'
											premiumHighlight
										/>
									</tbody>
								</table>
							</div>
						</div>
					</div>

					{/* FAQ Section */}
					<div className='mb-16'>
						<h2 className='text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white'>
							Frequently Asked Questions
						</h2>
						<div className='grid md:grid-cols-2 gap-6 max-w-4xl mx-auto'>
							<FAQItem
								question='Are my files secure?'
								answer='Absolutely! All PDF processing happens directly in your browser. Your files are never uploaded to any server, ensuring complete privacy and security.'
							/>
							<FAQItem
								question='Can I cancel anytime?'
								answer='Yes! You can cancel your Premium subscription at any time. Your access will continue until the end of your billing period.'
							/>
							<FAQItem
								question='What happens to my files after processing?'
								answer="Your files stay on your device the entire time. We don't store, access, or have any way to view your documents - ever."
							/>
							<FAQItem
								question='Do I need to create an account for Free tier?'
								answer='You can use the Free tier without an account, but creating one helps us track your usage limits and lets you upgrade to Premium when needed.'
							/>
							<FAQItem
								question='What payment methods do you accept?'
								answer='We accept all major credit cards, debit cards, and other payment methods supported by Stripe, including Apple Pay and Google Pay.'
							/>
							<FAQItem
								question='Is there a refund policy?'
								answer="If you're not satisfied with Premium, contact us within 7 days of your purchase for a full refund, no questions asked."
							/>
						</div>
					</div>

					{/* Footer CTA */}
					<div className='text-center'>
						<p className='text-gray-600 dark:text-gray-400 mb-4'>
							💳 Secure payment powered by Stripe
						</p>
						<p className='text-gray-500 dark:text-gray-500 text-sm'>
							Cancel anytime • No hidden fees • Instant access
						</p>
					</div>
				</div>
			</div>

			<Footer />
		</div>
	);
}

function Feature({
	text,
	light = false,
	highlight = false,
}: {
	text: string;
	light?: boolean;
	highlight?: boolean;
}) {
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
			<span
				className={`${
					light ? 'text-white' : 'text-gray-700 dark:text-gray-300'
				} ${highlight ? 'font-semibold' : ''}`}>
				{text}
			</span>
		</li>
	);
}

function FeatureDisabled({ text }: { text: string }) {
	return (
		<li className='flex items-start'>
			<X className='w-5 h-5 text-gray-400 mr-3 flex-shrink-0 mt-0.5' />
			<span className='text-gray-400'>{text}</span>
		</li>
	);
}

function ComparisonRow({
	feature,
	free,
	premium,
	premiumHighlight = false,
}: {
	feature: string;
	free: string;
	premium: string;
	premiumHighlight?: boolean;
}) {
	return (
		<tr>
			<td className='py-4 px-6 text-gray-700 dark:text-gray-300'>
				{feature}
			</td>
			<td className='py-4 px-6 text-center'>
				{free === '✓' ? (
					<CheckCircle className='w-5 h-5 text-green-500 mx-auto' />
				) : free === '✗' ? (
					<X className='w-5 h-5 text-gray-400 mx-auto' />
				) : (
					<span className='text-gray-600 dark:text-gray-400'>
						{free}
					</span>
				)}
			</td>
			<td className='py-4 px-6 text-center'>
				{premium === '✓' ? (
					<CheckCircle className='w-5 h-5 text-green-500 mx-auto' />
				) : premium === '✗' ? (
					<X className='w-5 h-5 text-gray-400 mx-auto' />
				) : (
					<span
						className={`${
							premiumHighlight
								? 'text-blue-600 dark:text-blue-400 font-semibold'
								: 'text-gray-600 dark:text-gray-400'
						}`}>
						{premium}
					</span>
				)}
			</td>
		</tr>
	);
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
	return (
		<div className='bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700'>
			<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
				{question}
			</h3>
			<p className='text-gray-600 dark:text-gray-400'>{answer}</p>
		</div>
	);
}
