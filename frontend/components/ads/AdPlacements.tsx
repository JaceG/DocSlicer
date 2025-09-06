import { AdBanner } from './AdBanner';

export function HeaderAd() {
	return (
		<div className='w-full max-w-4xl mx-auto py-4'>
			<AdBanner
				adSlot='1234567890' // Replace with your actual ad slot from AdSense
				adFormat='horizontal'
				className='text-center'
			/>
		</div>
	);
}

export function SidebarAd() {
	return (
		<div className='w-full max-w-xs'>
			<AdBanner
				adSlot='0987654321' // Replace with your actual ad slot from AdSense
				adFormat='vertical'
				className='sticky top-4'
			/>
		</div>
	);
}

export function FooterAd() {
	return (
		<div className='w-full max-w-6xl mx-auto py-6'>
			<AdBanner
				adSlot='1122334455' // Replace with your actual ad slot from AdSense
				adFormat='horizontal'
			/>
		</div>
	);
}

export function BetweenContentAd() {
	return (
		<div className='w-full max-w-2xl mx-auto py-4'>
			<div className='bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700'>
				<p className='text-xs text-gray-500 dark:text-gray-400 mb-2 text-center'>
					Advertisement
				</p>
				<AdBanner
					adSlot='5566778899' // Replace with your actual ad slot from AdSense
					adFormat='rectangle'
					className='text-center'
				/>
			</div>
		</div>
	);
}
