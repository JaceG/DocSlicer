import Link from 'next/link';

export function Footer() {
	return (
		<footer className='bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-t border-gray-200/50 dark:border-gray-800/50 mt-16'>
			<div className='container mx-auto px-4 py-8'>
				<div className='flex flex-col md:flex-row justify-between items-center gap-4'>
					{/* Copyright */}
					<div className='text-sm text-gray-600 dark:text-gray-400'>
						© {new Date().getFullYear()} PDF Wonder Kit. All rights reserved.
					</div>

					{/* Links */}
					<div className='flex flex-wrap items-center justify-center gap-x-6 gap-y-2'>
						<Link
							href='/blog'
							className='text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors'
						>
							Guides
						</Link>
						<Link
							href='/pricing'
							className='text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors'
						>
							Pricing
						</Link>
						<Link
							href='/terms'
							className='text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors'
						>
							Terms
						</Link>
						<Link
							href='/privacy'
							className='text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors'
						>
							Privacy
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}
