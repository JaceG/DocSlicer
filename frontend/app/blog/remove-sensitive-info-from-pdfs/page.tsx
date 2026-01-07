import { Metadata } from 'next';
import Link from 'next/link';
import { BlogLayout, BlogPost } from '@/components/blog/BlogLayout';
import {
	ShieldAlert,
	Eye,
	EyeOff,
	Database,
	MapPin,
	User,
	Calendar,
	FileText,
	AlertTriangle,
	CheckCircle2,
	Sparkles,
	Lock,
} from 'lucide-react';

export const metadata: Metadata = {
	title: 'How to Remove Sensitive Information from PDFs Before Sharing | PDF Wonder Kit',
	description:
		'Protect your privacy by removing hidden metadata, author info, timestamps, and tracked changes from PDFs before sharing. GDPR compliance guide included.',
	keywords: [
		'remove PDF metadata',
		'clean PDF',
		'sanitize PDF',
		'PDF privacy',
		'remove author from PDF',
		'delete PDF metadata',
		'GDPR PDF compliance',
	],
	openGraph: {
		title: 'How to Remove Sensitive Information from PDFs Before Sharing',
		description:
			'Complete guide to removing hidden metadata and sensitive information from PDFs for privacy and GDPR compliance.',
		url: 'https://www.pdfwonderkit.com/blog/remove-sensitive-info-from-pdfs',
	},
	alternates: {
		canonical:
			'https://www.pdfwonderkit.com/blog/remove-sensitive-info-from-pdfs',
	},
};

const blogPost: BlogPost = {
	slug: 'remove-sensitive-info-from-pdfs',
	title: 'How to Remove Sensitive Information from PDFs Before Sharing',
	description:
		'Protect your privacy by removing hidden metadata, author info, timestamps, and tracked changes from PDFs before sharing. GDPR compliance guide included.',
	date: '2026-01-07',
	readTime: '11 min read',
	category: 'Privacy',
};

const hiddenData = [
	{
		type: 'Author Name',
		description: 'Your name or company name from document creator',
		risk: 'Reveals identity, company affiliation',
		common: 'Very Common',
		example: 'John Smith, Acme Corp Legal Department',
		icon: User,
	},
	{
		type: 'File Path',
		description: 'Full computer file path where document was created',
		risk: 'Reveals username, company structure, folder organization',
		common: 'Common',
		example: 'C:\\Users\\jsmith\\Documents\\Confidential\\Q4_Strategy.docx',
		icon: MapPin,
	},
	{
		type: 'Creation & Modification Dates',
		description: 'Exact timestamps of when document was created/edited',
		risk: 'Reveals work patterns, can contradict stated timelines',
		common: 'Very Common',
		example: 'Created: 2:47 AM (reveals late-night work)',
		icon: Calendar,
	},
	{
		type: 'Software Details',
		description: 'Application name and version used to create PDF',
		risk: 'Reveals outdated software, security vulnerabilities',
		common: 'Very Common',
		example: 'Microsoft Word 2016 (unpatched security flaws)',
		icon: FileText,
	},
	{
		type: 'Tracked Changes & Comments',
		description: 'Hidden revision history, deleted text, editor comments',
		risk: 'Reveals confidential edits, internal discussions',
		common: 'Common',
		example: 'Deleted: "We can go as low as $45K" in contract',
		icon: Eye,
	},
	{
		type: 'GPS Coordinates',
		description: 'Location data from photos embedded in PDF',
		risk: 'Reveals home/office address',
		common: 'Rare',
		example: 'Photo taken at 42.3601° N, 71.0589° W (home address)',
		icon: MapPin,
	},
];

const realWorldIncidents = [
	{
		incident: 'Legal Case Strategy Leak',
		what: 'Law firm shared PDF with tracked changes showing settlement strategy',
		data: 'Opposing counsel recovered deleted text: "Willing to settle for 50%"',
		impact: 'Client lost negotiating position, case settled for less',
		lesson: 'Always clean metadata from legal documents',
	},
	{
		incident: 'Whistleblower Identity Exposed',
		what: 'Anonymous tip sent as PDF contained author metadata',
		data: 'PDF showed: Author = Jane Doe, Company = TechCorp',
		impact: 'Whistleblower identified and terminated',
		lesson: 'Anonymity requires metadata removal',
	},
	{
		incident: 'Government Document Leak',
		what: 'Redacted PDF improperly sanitized, classified info recoverable',
		data: "Black boxes covered text but didn't remove underlying data",
		impact: 'Classified information exposed to public',
		lesson: 'Visual redaction ≠ data removal',
	},
];

const gdprConsiderations = [
	{
		requirement: 'Data Minimization',
		description: "Only share data that's strictly necessary",
		pdfImplication:
			'Remove author names, timestamps, file paths if not needed',
		violation: 'Including unnecessary personal data in metadata',
	},
	{
		requirement: 'Right to Be Forgotten',
		description: 'Individuals can request data deletion',
		pdfImplication:
			'Must be able to remove all traces of person from documents',
		violation: "Metadata references that can't be removed",
	},
	{
		requirement: 'Data Protection by Design',
		description: 'Privacy should be default, not opt-in',
		pdfImplication: 'Strip metadata by default before external sharing',
		violation: 'Sharing PDFs with full metadata as standard practice',
	},
	{
		requirement: 'Transparent Processing',
		description: 'People must know what data you collect',
		pdfImplication: 'Inform recipients if PDFs contain tracking/metadata',
		violation: 'Hidden metadata collected without disclosure',
	},
];

const cleaningSteps = [
	{
		step: 'View Current Metadata',
		description: 'Check what information your PDF currently contains',
		howTo: [
			'Open PDF in viewer',
			'File → Properties (or Ctrl+D / Cmd+D)',
			'Review all tabs: Description, Security, Fonts, etc.',
			'Look for Author, Subject, Keywords, Creation Date',
		],
		tools: 'Any PDF viewer',
	},
	{
		step: 'Remove Document Properties',
		description: 'Clear author name, title, subject, keywords fields',
		howTo: [
			'Use metadata editor tool',
			'Delete content from Author field',
			'Remove Subject, Keywords, Comments',
			'Clear custom properties',
		],
		tools: 'PDF Wonder Kit Metadata tool',
	},
	{
		step: 'Strip Hidden Data',
		description: 'Remove creation dates, software info, file paths',
		howTo: [
			'Use "Sanitize Document" or similar feature',
			'Check "Remove all metadata" option',
			'Save as new file',
			'Verify metadata removed',
		],
		tools: 'Advanced PDF tools',
	},
	{
		step: 'Check for Comments/Markups',
		description: 'Find and remove all annotations, comments, highlights',
		howTo: [
			'Open comment panel',
			'Delete all visible comments',
			'Check for hidden annotations',
			'Flatten all markup (make permanent)',
		],
		tools: 'PDF annotator',
	},
	{
		step: 'Verify Clean Document',
		description: 'Confirm all sensitive data removed',
		howTo: [
			'View properties again',
			'Check all metadata fields are empty/generic',
			'Open in different viewer to confirm',
			'Use metadata analysis tool',
		],
		tools: 'PDF viewer + verification',
	},
];

export default function BlogPostPage() {
	return (
		<BlogLayout post={blogPost}>
			{/* Quick Answer Box */}
			<div className='bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30 rounded-xl p-6 mb-8 border border-orange-200 dark:border-orange-800'>
				<div className='flex items-start gap-4'>
					<div className='flex-shrink-0'>
						<div className='w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center'>
							<ShieldAlert className='w-6 h-6 text-white' />
						</div>
					</div>
					<div>
						<h3 className='font-bold text-lg mb-2 text-gray-900 dark:text-white'>
							Quick Answer: Clean PDF Metadata
						</h3>
						<p className='text-gray-700 dark:text-gray-300 mb-3'>
							PDFs contain hidden metadata: your name, file paths,
							creation dates, software used, sometimes even
							tracked changes. Before sharing externally, use
							metadata editor to remove: (1) Author name, (2)
							Creation/modification dates, (3) File path info, (4)
							Comments and tracked changes. For GDPR compliance
							and privacy, clean metadata should be standard
							practice—especially for legal, medical, or
							confidential documents.
						</p>
						<div className='flex flex-wrap gap-2'>
							<span className='inline-flex items-center gap-1 px-3 py-1 bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300 rounded-full text-sm font-medium'>
								<EyeOff className='w-4 h-4' />
								Privacy protection
							</span>
							<span className='inline-flex items-center gap-1 px-3 py-1 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 rounded-full text-sm font-medium'>
								<Lock className='w-4 h-4' />
								GDPR compliance
							</span>
						</div>
					</div>
				</div>
			</div>

			{/* Introduction */}
			<div className='prose prose-lg dark:prose-invert max-w-none mb-12'>
				<p className='text-xl text-gray-700 dark:text-gray-300 leading-relaxed'>
					You email a PDF proposal to a potential client. They open
					the file properties and see:{' '}
					<strong>
						&quot;Author: John Smith, Created: 2:47 AM, File Path:
						C:\\Users\\jsmith\\Documents\\Clients\\Competitor
						Analysis&quot;
					</strong>
					. Suddenly, they know you were working at 3 AM and have
					files about their competitor.
				</p>
				<p className='text-gray-600 dark:text-gray-400'>
					Every PDF carries invisible metadata that can expose your
					identity, work patterns, company structure, and sometimes
					confidential information. This guide shows you what&apos;s
					hidden in your PDFs, why it matters, and how to remove it
					before sharing.
				</p>
			</div>

			{/* Hidden Data Types */}
			<div className='mb-12'>
				<h2 className='text-3xl font-bold mb-6 text-gray-900 dark:text-white'>
					What Hidden Information Lives in Your PDFs?
				</h2>
				<div className='space-y-4'>
					{hiddenData.map((item, index) => (
						<div
							key={index}
							className='bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700'>
							<div className='flex items-start gap-4'>
								<div className='w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center flex-shrink-0'>
									<item.icon className='w-6 h-6 text-orange-600 dark:text-orange-400' />
								</div>
								<div className='flex-1'>
									<div className='flex items-center gap-3 mb-2'>
										<h3 className='text-lg font-bold text-gray-900 dark:text-white'>
											{item.type}
										</h3>
										<span
											className={`px-2 py-1 rounded text-xs font-semibold ${
												item.common === 'Very Common'
													? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
													: item.common === 'Common'
													? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300'
													: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
											}`}>
											{item.common}
										</span>
									</div>
									<p className='text-sm text-gray-600 dark:text-gray-400 mb-3'>
										{item.description}
									</p>
									<div className='grid md:grid-cols-2 gap-4'>
										<div className='bg-red-50 dark:bg-red-950/30 rounded-lg p-3'>
											<p className='text-sm'>
												<strong className='text-red-700 dark:text-red-300'>
													Privacy Risk:
												</strong>
												<span className='text-gray-600 dark:text-gray-400 ml-2'>
													{item.risk}
												</span>
											</p>
										</div>
										<div className='bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3'>
											<p className='text-sm'>
												<strong className='text-gray-900 dark:text-white'>
													Example:
												</strong>
												<span className='text-gray-600 dark:text-gray-400 ml-2'>
													{item.example}
												</span>
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Real Incidents */}
			<div className='mb-12'>
				<h2 className='text-3xl font-bold mb-6 text-gray-900 dark:text-white'>
					Real-World Consequences of PDF Metadata Leaks
				</h2>
				<div className='space-y-6'>
					{realWorldIncidents.map((item, index) => (
						<div
							key={index}
							className='bg-red-50 dark:bg-red-950/20 rounded-xl p-6 border-2 border-red-200 dark:border-red-800'>
							<div className='flex items-start gap-4'>
								<AlertTriangle className='w-8 h-8 text-red-600 dark:text-red-400 flex-shrink-0 mt-1' />
								<div className='flex-1'>
									<h3 className='text-xl font-bold text-gray-900 dark:text-white mb-3'>
										{item.incident}
									</h3>
									<div className='grid md:grid-cols-2 gap-4 mb-4'>
										<div>
											<p className='text-sm font-semibold text-gray-900 dark:text-white mb-1'>
												What Happened:
											</p>
											<p className='text-sm text-gray-600 dark:text-gray-400 mb-3'>
												{item.what}
											</p>
											<p className='text-sm font-semibold text-gray-900 dark:text-white mb-1'>
												Exposed Data:
											</p>
											<p className='text-sm text-red-700 dark:text-red-300 font-mono bg-red-100 dark:bg-red-900/30 p-2 rounded'>
												{item.data}
											</p>
										</div>
										<div>
											<p className='text-sm font-semibold text-gray-900 dark:text-white mb-1'>
												Impact:
											</p>
											<p className='text-sm text-gray-600 dark:text-gray-400 mb-3'>
												{item.impact}
											</p>
											<p className='text-sm font-semibold text-gray-900 dark:text-white mb-1'>
												Lesson Learned:
											</p>
											<p className='text-sm font-bold text-red-700 dark:text-red-300'>
												{item.lesson}
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Cleaning Process */}
			<div className='mb-12'>
				<h2 className='text-3xl font-bold mb-6 text-gray-900 dark:text-white'>
					How to Clean Metadata from PDFs (Step-by-Step)
				</h2>
				<div className='space-y-6'>
					{cleaningSteps.map((step, index) => (
						<div
							key={index}
							className='bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700'>
							<div className='flex items-start gap-4'>
								<span className='flex-shrink-0 w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-full flex items-center justify-center text-lg font-bold'>
									{index + 1}
								</span>
								<div className='flex-1'>
									<h3 className='text-xl font-bold text-gray-900 dark:text-white mb-2'>
										{step.step}
									</h3>
									<p className='text-gray-600 dark:text-gray-400 mb-4'>
										{step.description}
									</p>
									<div className='bg-blue-50 dark:bg-blue-950/30 rounded-lg p-4 mb-4'>
										<h4 className='text-sm font-semibold text-gray-900 dark:text-white mb-2'>
											How To Do It:
										</h4>
										<ol className='space-y-2'>
											{step.howTo.map(
												(instruction, iIndex) => (
													<li
														key={iIndex}
														className='flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400'>
														<span className='flex-shrink-0 w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs'>
															{iIndex + 1}
														</span>
														{instruction}
													</li>
												)
											)}
										</ol>
									</div>
									<p className='text-sm'>
										<strong className='text-gray-900 dark:text-white'>
											Tools:
										</strong>
										<span className='text-gray-600 dark:text-gray-400 ml-2'>
											{step.tools}
										</span>
									</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* GDPR Compliance */}
			<div className='mb-12'>
				<h2 className='text-3xl font-bold mb-6 text-gray-900 dark:text-white'>
					GDPR & PDF Metadata Compliance
				</h2>
				<p className='text-gray-600 dark:text-gray-400 mb-6'>
					If you operate in or serve customers in the EU, GDPR has
					specific implications for PDF metadata:
				</p>
				<div className='bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden'>
					<div className='overflow-x-auto'>
						<table className='w-full'>
							<thead className='bg-gray-50 dark:bg-gray-900/50'>
								<tr>
									<th className='px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white'>
										GDPR Requirement
									</th>
									<th className='px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white'>
										Description
									</th>
									<th className='px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white'>
										PDF Implication
									</th>
									<th className='px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white'>
										Potential Violation
									</th>
								</tr>
							</thead>
							<tbody className='divide-y divide-gray-200 dark:divide-gray-700'>
								{gdprConsiderations.map((item, index) => (
									<tr key={index}>
										<td className='px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white'>
											{item.requirement}
										</td>
										<td className='px-6 py-4 text-sm text-gray-600 dark:text-gray-400'>
											{item.description}
										</td>
										<td className='px-6 py-4 text-sm text-blue-700 dark:text-blue-300'>
											{item.pdfImplication}
										</td>
										<td className='px-6 py-4 text-sm text-red-700 dark:text-red-300'>
											{item.violation}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>

			{/* Best Practices */}
			<div className='mb-12'>
				<h2 className='text-3xl font-bold mb-6 text-gray-900 dark:text-white'>
					Best Practices for PDF Privacy
				</h2>
				<div className='grid md:grid-cols-2 gap-6'>
					<div className='bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-xl p-6 border border-green-200 dark:border-green-800'>
						<h3 className='text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2'>
							<CheckCircle2 className='w-6 h-6 text-green-600 dark:text-green-400' />
							Do This
						</h3>
						<ul className='space-y-3'>
							{[
								'Clean metadata before every external share',
								'Use "export as PDF" instead of "print to PDF" for cleaner files',
								'Create template with generic metadata for client documents',
								'Verify removal after cleaning (check properties)',
								'Save cleaned version as separate file',
								'Train team on metadata privacy',
							].map((item, index) => (
								<li
									key={index}
									className='flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400'>
									<Sparkles className='w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5' />
									{item}
								</li>
							))}
						</ul>
					</div>

					<div className='bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 rounded-xl p-6 border border-red-200 dark:border-red-800'>
						<h3 className='text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2'>
							<AlertTriangle className='w-6 h-6 text-red-600 dark:text-red-400' />
							Don&apos;t Do This
						</h3>
						<ul className='space-y-3'>
							{[
								'Don\'t assume PDFs are "anonymous" by default',
								"Don't use visual redaction (black boxes) without removing underlying text",
								"Don't share drafts with tracked changes visible",
								"Don't forget about custom metadata fields",
								"Don't rely on filenames for security",
								"Don't skip verification step",
							].map((item, index) => (
								<li
									key={index}
									className='flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400'>
									<AlertTriangle className='w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5' />
									{item}
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>

			{/* CTA Section */}
			<div className='bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-8 md:p-12 text-center text-white mb-12'>
				<h2 className='text-3xl md:text-4xl font-bold mb-4'>
					Clean Your PDF Metadata
				</h2>
				<p className='text-xl mb-8 text-orange-100'>
					Remove hidden information before sharing—protect your
					privacy
				</p>
				<Link
					href='/metadata'
					className='inline-flex items-center gap-2 bg-white text-orange-600 hover:bg-orange-50 px-8 py-4 rounded-xl font-bold transition-colors shadow-lg text-lg'>
					<Database className='w-6 h-6' />
					Edit Metadata Free
				</Link>
				<p className='mt-6 text-sm text-orange-200'>
					✓ Remove all hidden data • ✓ GDPR compliant • ✓ Files stay
					private
				</p>
			</div>

			{/* Conclusion */}
			<div className='prose prose-lg dark:prose-invert max-w-none'>
				<h2>Metadata Privacy Should Be Standard Practice</h2>
				<p>
					You wouldn&apos;t send a letter with your home address
					visible if you wanted to remain anonymous. Yet people
					routinely share PDFs with full metadata intact, not
					realizing they&apos;re broadcasting personal information.
				</p>
				<p>
					Make metadata cleaning a habit, especially for: legal
					documents, client proposals, medical records, whistleblower
					communications, job applications, and anything where privacy
					matters. It takes 30 seconds and could prevent serious
					privacy violations or security incidents.
				</p>
				<p>
					Remember: once you share a PDF with metadata, you can&apos;t
					take it back. That information is now in the
					recipient&apos;s hands forever. Clean first, share second.
				</p>
			</div>
		</BlogLayout>
	);
}
