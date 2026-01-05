import { SignUp } from '@clerk/nextjs';

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
