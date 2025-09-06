import { FileText, Scissors, Plus } from 'lucide-react';

interface HeaderProps {
	onNewDocument?: () => void;
}

export function Header({ onNewDocument }: HeaderProps) {
	return (
		<header className='bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-sm border-b border-gray-200/50 dark:border-gray-800/50 sticky top-0 z-50'>
			<div className='container mx-auto px-4 py-4'>
				<div className='flex items-center justify-between'>
					<div className='flex items-center space-x-4'>
						<div className='relative'>
							<div className='w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg'>
								<FileText className='h-5 w-5 text-white' />
							</div>
							<div className='absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg'>
								<Scissors className='h-2.5 w-2.5 text-white' />
							</div>
						</div>
						<div>
							<h1 className='text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent'>
								PDF/EPUB Slicer
							</h1>
							<p className='text-sm text-gray-600 dark:text-gray-400'>
								Split documents into chapters with ease
							</p>
						</div>
					</div>

					<div className='flex items-center space-x-4'>
						{onNewDocument && (
							<button
								onClick={onNewDocument}
								className='flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-sm'>
								<Plus className='h-4 w-4' />
								<span className='hidden sm:inline'>
									New Document
								</span>
							</button>
						)}
					</div>
				</div>
			</div>
		</header>
	);
}
