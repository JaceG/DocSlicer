'use client';

import { useState, useEffect, useRef } from 'react';
import {
	FileText,
	Plus,
	Sparkles,
	LayoutDashboard,
	Menu,
	X,
} from 'lucide-react';
import { UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { ToolConfig, TOOLS_COUNT } from '@/lib/tools/config';

interface HeaderProps {
	onNewDocument?: () => void;
	currentTool?: ToolConfig;
}

export function Header({ onNewDocument, currentTool }: HeaderProps) {
	const ToolIcon = currentTool?.icon || FileText;
	const { isSignedIn, isLoaded } = useUser();
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);

	// Debug: Log Clerk state
	useEffect(() => {
		console.log('Clerk Auth State:', { isLoaded, isSignedIn });
	}, [isLoaded, isSignedIn]);

	// Close menu when clicking outside
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				menuRef.current &&
				!menuRef.current.contains(event.target as Node)
			) {
				setMobileMenuOpen(false);
			}
		}
		if (mobileMenuOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		}
		return () =>
			document.removeEventListener('mousedown', handleClickOutside);
	}, [mobileMenuOpen]);

	// Close menu on route change / escape key
	useEffect(() => {
		function handleEscape(e: KeyboardEvent) {
			if (e.key === 'Escape') setMobileMenuOpen(false);
		}
		document.addEventListener('keydown', handleEscape);
		return () => document.removeEventListener('keydown', handleEscape);
	}, []);

	// Prevent body scroll when menu is open
	useEffect(() => {
		if (mobileMenuOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
		return () => {
			document.body.style.overflow = '';
		};
	}, [mobileMenuOpen]);

	return (
		<header className='bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-sm border-b border-gray-200/50 dark:border-gray-800/50 sticky top-0 z-50'>
			<div className='container mx-auto px-4 py-3 md:py-4'>
				<div className='flex items-center justify-between'>
					{/* Logo */}
					<Link
						href='/'
						className='flex items-center space-x-2 sm:space-x-4 hover:opacity-80 transition-opacity'
						onClick={() => setMobileMenuOpen(false)}>
						<div className='shrink-0'>
							<div
								className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shadow-lg transition-colors ${
									currentTool?.colorClass ||
									'bg-gradient-to-br from-blue-500 to-blue-600'
								}`}>
								<ToolIcon className='h-4 w-4 sm:h-5 sm:w-5 text-white' />
							</div>
						</div>
						<div className='min-w-0'>
							<h1 className='text-lg sm:text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent truncate'>
								{currentTool
									? currentTool.label
									: 'PDF Wonder Kit'}
							</h1>
							<p className='hidden md:block text-sm text-gray-600 dark:text-gray-400'>
								{currentTool
									? currentTool.description
									: `Complete PDF toolkit with ${TOOLS_COUNT} tools`}
							</p>
						</div>
					</Link>

					{/* Desktop Navigation */}
					<div className='hidden md:flex items-center space-x-3'>
						{/* TEMP DEBUG */}
						<div className='px-3 py-1 bg-yellow-200 text-black text-xs rounded'>
							isLoaded: {String(isLoaded)} | isSignedIn: {String(isSignedIn)}
						</div>
						{isLoaded && (
							<>
								{isSignedIn ? (
									<>
										<Link
											href='/dashboard'
											className='flex items-center space-x-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors'>
											<LayoutDashboard className='h-4 w-4' />
											<span>Dashboard</span>
										</Link>
										{onNewDocument && (
											<button
												onClick={onNewDocument}
												className='flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-sm'>
												<Plus className='h-4 w-4' />
												<span>New Document</span>
											</button>
										)}
										<UserButton
											appearance={{
												elements: {
													avatarBox: 'w-10 h-10',
												},
											}}
										/>
									</>
								) : (
									<>
										<Link
											href='/pricing'
											className='flex items-center space-x-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors'>
											<Sparkles className='h-4 w-4' />
											<span>Pricing</span>
										</Link>
										<Link
											href='/sign-in'
											className='px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors font-medium'>
											Sign In
										</Link>
										<Link
											href='/sign-up'
											className='px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-sm'>
											Sign Up
										</Link>
									</>
								)}
							</>
						)}
					</div>

					{/* Mobile: User button (when signed in) + Hamburger */}
					<div className='flex md:hidden items-center space-x-2'>
						{/* TEMP DEBUG - Mobile */}
						<div className='px-2 py-1 bg-yellow-200 text-black text-xs rounded'>
							{String(isLoaded)}/{String(isSignedIn)}
						</div>
						{isLoaded && isSignedIn && (
							<UserButton
								appearance={{
									elements: {
										avatarBox: 'w-8 h-8',
									},
								}}
							/>
						)}
						<button
							onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
							className='p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors'
							aria-label={
								mobileMenuOpen ? 'Close menu' : 'Open menu'
							}
							aria-expanded={mobileMenuOpen}>
							{mobileMenuOpen ? (
								<X className='h-6 w-6' />
							) : (
								<Menu className='h-6 w-6' />
							)}
						</button>
					</div>
				</div>

				{/* Mobile Menu */}
				{mobileMenuOpen && (
					<>
						{/* Backdrop */}
						<div
							className='fixed inset-0 top-[57px] bg-black/20 dark:bg-black/40 backdrop-blur-sm md:hidden z-40'
							onClick={() => setMobileMenuOpen(false)}
						/>
						{/* Menu Panel */}
						<div
							ref={menuRef}
							className='absolute left-0 right-0 top-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-lg md:hidden z-50 animate-in slide-in-from-top-2 duration-200'>
							<nav className='container mx-auto px-4 py-4 space-y-2'>
								{isLoaded && (
									<>
										{isSignedIn ? (
											<>
												<Link
													href='/dashboard'
													onClick={() =>
														setMobileMenuOpen(false)
													}
													className='flex items-center space-x-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors'>
													<LayoutDashboard className='h-5 w-5' />
													<span className='font-medium'>
														Dashboard
													</span>
												</Link>
												{onNewDocument && (
													<button
														onClick={() => {
															onNewDocument();
															setMobileMenuOpen(
																false
															);
														}}
														className='flex items-center space-x-3 w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors shadow-sm'>
														<Plus className='h-5 w-5' />
														<span>
															New Document
														</span>
													</button>
												)}
												<Link
													href='/pricing'
													onClick={() =>
														setMobileMenuOpen(false)
													}
													className='flex items-center space-x-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors'>
													<Sparkles className='h-5 w-5' />
													<span className='font-medium'>
														Pricing
													</span>
												</Link>
											</>
										) : (
											<>
												<Link
													href='/pricing'
													onClick={() =>
														setMobileMenuOpen(false)
													}
													className='flex items-center space-x-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors'>
													<Sparkles className='h-5 w-5' />
													<span className='font-medium'>
														Pricing
													</span>
												</Link>
												<div className='pt-2 border-t border-gray-200 dark:border-gray-800 mt-2 space-y-2'>
													<Link
														href='/sign-in'
														onClick={() =>
															setMobileMenuOpen(
																false
															)
														}
														className='block w-full px-4 py-3 text-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors font-medium'>
														Sign In
													</Link>
													<Link
														href='/sign-up'
														onClick={() =>
															setMobileMenuOpen(
																false
															)
														}
														className='block w-full px-4 py-3 text-center bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors shadow-sm'>
														Sign Up
													</Link>
												</div>
											</>
										)}
									</>
								)}
							</nav>
						</div>
					</>
				)}
			</div>
		</header>
	);
}
