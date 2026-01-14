import { SignUp } from '@clerk/nextjs';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Sign Up',
	description: 'Create a PDF Wonder Kit account to access premium PDF tools and track your usage.',
	alternates: {
		canonical: 'https://www.pdfwonderkit.com/sign-up',
	},
	robots: {
		index: false, // Don't index sign-up pages to avoid duplicate content with query params
		follow: true,
	},
};

export default function SignUpPage() {
	return (
		<div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50/20 to-indigo-50/30 dark:from-gray-900 dark:via-blue-950/20 dark:to-indigo-950/30'>
			<div className='w-full max-w-md'>
				<SignUp
					appearance={{
						elements: {
							rootBox: 'mx-auto',
							card: 'shadow-xl',
						},
					}}
				/>
			</div>
		</div>
	);
}
