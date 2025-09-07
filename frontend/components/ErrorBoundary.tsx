'use client';

import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorBoundaryState {
	hasError: boolean;
	error?: Error;
}

interface ErrorBoundaryProps {
	children: React.ReactNode;
	fallback?: React.ComponentType<{ error?: Error; resetError: () => void }>;
}

class ErrorBoundary extends React.Component<
	ErrorBoundaryProps,
	ErrorBoundaryState
> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error: Error): ErrorBoundaryState {
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		console.error('Error caught by boundary:', error, errorInfo);

		// Handle chunk loading errors specifically
		if (
			error.message.includes('ChunkLoadError') ||
			error.message.includes('Loading chunk')
		) {
			// Attempt to reload the page after a short delay
			setTimeout(() => {
				window.location.reload();
			}, 1000);
		}
	}

	resetError = () => {
		this.setState({ hasError: false, error: undefined });
	};

	render() {
		if (this.state.hasError) {
			if (this.props.fallback) {
				const FallbackComponent = this.props.fallback;
				return (
					<FallbackComponent
						error={this.state.error}
						resetError={this.resetError}
					/>
				);
			}

			return (
				<DefaultErrorFallback
					error={this.state.error}
					resetError={this.resetError}
				/>
			);
		}

		return this.props.children;
	}
}

function DefaultErrorFallback({
	error,
	resetError,
}: {
	error?: Error;
	resetError: () => void;
}) {
	const isChunkError =
		error?.message.includes('ChunkLoadError') ||
		error?.message.includes('Loading chunk');

	return (
		<div className='min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4'>
			<div className='max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center'>
				<div className='flex justify-center mb-4'>
					<div className='w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center'>
						<AlertTriangle className='w-8 h-8 text-red-600 dark:text-red-400' />
					</div>
				</div>

				<h1 className='text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2'>
					{isChunkError ? 'Loading Error' : 'Something went wrong'}
				</h1>

				<p className='text-gray-600 dark:text-gray-400 mb-6'>
					{isChunkError
						? 'The page is being updated. Please wait while we refresh...'
						: 'An unexpected error occurred. Please try refreshing the page.'}
				</p>

				{isChunkError ? (
					<div className='flex items-center justify-center space-x-2 text-blue-600 dark:text-blue-400'>
						<RefreshCw className='w-4 h-4 animate-spin' />
						<span className='text-sm'>
							Refreshing automatically...
						</span>
					</div>
				) : (
					<div className='space-y-3'>
						<button
							onClick={() => window.location.reload()}
							className='w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors'>
							Refresh Page
						</button>

						<button
							onClick={resetError}
							className='w-full px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 font-medium rounded-lg transition-colors'>
							Try Again
						</button>
					</div>
				)}

				{process.env.NODE_ENV === 'development' && error && (
					<details className='mt-4 text-left'>
						<summary className='text-sm text-gray-500 cursor-pointer'>
							Error Details
						</summary>
						<pre className='mt-2 text-xs text-red-600 dark:text-red-400 bg-gray-100 dark:bg-gray-900 p-2 rounded overflow-auto'>
							{error.message}
						</pre>
					</details>
				)}
			</div>
		</div>
	);
}

export default ErrorBoundary;
