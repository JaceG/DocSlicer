import { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';
import { Shield, Heart, Scale, Building2, AlertTriangle, CheckCircle2, Lock, XCircle, FileText, Users } from 'lucide-react';

export const metadata: Metadata = {
	title: 'Compliance & Industry Information | PDF Wonder Kit',
	description:
		'Understand how PDF Wonder Kit\'s client-side processing works for HIPAA-friendly healthcare use, attorney-client privilege protection, and your compliance responsibilities.',
	keywords: [
		'HIPAA compliance',
		'attorney client privilege',
		'legal compliance',
		'healthcare PDF tools',
		'client-side processing',
		'data privacy',
	],
	openGraph: {
		title: 'Compliance & Industry Information | PDF Wonder Kit',
		description:
			'Learn about PDF Wonder Kit\'s HIPAA-friendly architecture and your compliance responsibilities.',
		url: 'https://www.pdfwonderkit.com/compliance',
	},
	alternates: {
		canonical: 'https://www.pdfwonderkit.com/compliance',
	},
};

export default function CompliancePage() {
	return (
		<div className='min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-indigo-50/30 dark:from-gray-900 dark:via-blue-950/20 dark:to-indigo-950/30'>
			<Header />

			<div className='container mx-auto px-4 py-16 max-w-5xl'>
				<div className='text-center mb-12'>
					<h1 className='text-4xl font-bold text-gray-900 dark:text-white mb-4'>
						Compliance & Industry Information
					</h1>
					<p className='text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto'>
						Understanding what PDF Wonder Kit is, what it isn't, and your responsibilities for staying compliant in regulated industries
					</p>
				</div>

				<div className='space-y-8'>
					{/* Critical Understanding */}
					<div className='bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-blue-300 dark:border-blue-800 rounded-xl p-8'>
						<div className='flex items-start gap-4'>
							<div className='bg-blue-500 rounded-full p-3 flex-shrink-0'>
								<Lock className='h-7 w-7 text-white' />
							</div>
							<div>
								<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-3'>
									How Our Technology Protects Your Privacy
								</h2>
								<p className='text-gray-700 dark:text-gray-300 mb-3 text-lg'>
									<strong>All PDF processing happens entirely in your web browser.</strong> When you upload a file to PDF Wonder Kit:
								</p>
								<ul className='space-y-2 text-gray-700 dark:text-gray-300'>
									<li className='flex items-start gap-2'>
										<CheckCircle2 className='h-5 w-5 text-green-600 flex-shrink-0 mt-0.5' />
										<span>Your file is processed by JavaScript running locally on your device</span>
									</li>
									<li className='flex items-start gap-2'>
										<CheckCircle2 className='h-5 w-5 text-green-600 flex-shrink-0 mt-0.5' />
										<span>No data is uploaded to our servers or any third-party servers</span>
									</li>
									<li className='flex items-start gap-2'>
										<CheckCircle2 className='h-5 w-5 text-green-600 flex-shrink-0 mt-0.5' />
										<span>Your documents never leave your device - ever</span>
									</li>
									<li className='flex items-start gap-2'>
										<CheckCircle2 className='h-5 w-5 text-green-600 flex-shrink-0 mt-0.5' />
										<span>We cannot access, view, store, or transmit your files</span>
									</li>
									<li className='flex items-start gap-2'>
										<CheckCircle2 className='h-5 w-5 text-green-600 flex-shrink-0 mt-0.5' />
										<span>Files are automatically cleared from your browser memory when you close the tab</span>
									</li>
								</ul>
								<div className='mt-4 p-4 bg-blue-100 dark:bg-blue-900/30 rounded-lg'>
									<p className='text-sm text-blue-900 dark:text-blue-200 mb-0'>
										<strong>Think of it like Microsoft Word or Adobe Acrobat:</strong> PDF Wonder Kit is a tool that runs on <em>your</em> computer. Just as Microsoft doesn't see your Word documents, we don't see your PDFs. The difference is we run in your browser instead of as installed software.
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* Healthcare / HIPAA */}
					<div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden'>
						<div className='bg-gradient-to-r from-pink-500 to-red-500 p-6'>
							<div className='flex items-center gap-3'>
								<Heart className='h-8 w-8 text-white' />
								<h2 className='text-2xl font-bold text-white'>
									Healthcare Professionals & HIPAA
								</h2>
							</div>
						</div>
						<div className='p-8 space-y-6'>
							<div>
								<h3 className='text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2'>
									<CheckCircle2 className='h-6 w-6 text-green-600' />
									What PDF Wonder Kit IS
								</h3>
								<ul className='space-y-2 text-gray-700 dark:text-gray-300 ml-8'>
									<li>✅ <strong>HIPAA-Friendly:</strong> Our client-side architecture means we're suitable for processing Protected Health Information (PHI)</li>
									<li>✅ <strong>No Business Associate Agreement (BAA) Required:</strong> Since we never handle PHI as a third party, no BAA is needed</li>
									<li>✅ <strong>Privacy by Design:</strong> The technology literally cannot access your patient data</li>
									<li>✅ <strong>More Secure Than Server-Based Tools:</strong> Unlike tools that upload files to servers, your PHI stays on your device</li>
								</ul>
							</div>

							<div>
								<h3 className='text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2'>
									<XCircle className='h-6 w-6 text-red-600' />
									What PDF Wonder Kit IS NOT
								</h3>
								<ul className='space-y-2 text-gray-700 dark:text-gray-300 ml-8'>
									<li>❌ <strong>Not "HIPAA Certified":</strong> HIPAA certification doesn't exist as a formal designation</li>
									<li>❌ <strong>Not a Covered Entity or Business Associate:</strong> We don't handle PHI, so HIPAA doesn't classify us as either</li>
									<li>❌ <strong>Not a Replacement for Your Organization's Policies:</strong> You still must follow your healthcare organization's data handling procedures</li>
									<li>❌ <strong>Not Legal Advice:</strong> This information is educational, not a legal opinion</li>
								</ul>
							</div>

							<div className='bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-6 rounded-r-lg'>
								<h4 className='font-bold text-yellow-900 dark:text-yellow-100 mb-2 flex items-center gap-2'>
									<AlertTriangle className='h-5 w-5' />
									Your Responsibilities as a Healthcare Provider
								</h4>
								<ul className='text-sm text-yellow-800 dark:text-yellow-200 space-y-2 ml-6'>
									<li><strong>Get Approval:</strong> Check with your organization's HIPAA compliance officer before using any new tool with PHI</li>
									<li><strong>Document Usage:</strong> Add approved tools to your organization's compliance documentation</li>
									<li><strong>Follow Minimum Necessary:</strong> Only process/extract the minimum PHI needed for the specific purpose</li>
									<li><strong>Secure Your Device:</strong> Use the tool only on authorized, secure workstations - never public computers</li>
									<li><strong>Secure Transmission:</strong> When sharing processed files, use encrypted email or secure patient portals</li>
									<li><strong>Log Disclosures:</strong> Document when PHI is extracted and shared externally</li>
									<li><strong>Complete HIPAA Training:</strong> Ensure you're trained on your organization's specific HIPAA policies</li>
								</ul>
							</div>

							<div className='bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6'>
								<h4 className='font-bold text-green-900 dark:text-green-100 mb-3'>
									✅ Recommended Healthcare Workflow
								</h4>
								<ol className='text-sm text-green-800 dark:text-green-200 space-y-2'>
									<li><strong>1.</strong> Obtain approval from your HIPAA compliance officer to use PDF Wonder Kit</li>
									<li><strong>2.</strong> Use only on authorized, secure workstations</li>
									<li><strong>3.</strong> Process PDFs containing PHI using PDF Wonder Kit (all processing stays on your device)</li>
									<li><strong>4.</strong> Download processed files to secure storage (EHR system, encrypted drives)</li>
									<li><strong>5.</strong> Transmit files only via secure, approved methods (encrypted email, patient portal)</li>
									<li><strong>6.</strong> Document any external disclosures in patient records</li>
								</ol>
							</div>

							<div>
								<p className='text-sm text-gray-600 dark:text-gray-400 italic'>
									<strong>Learn More:</strong> Read our detailed guide on{' '}
									<Link href='/blog/hipaa-compliant-pdf-management-healthcare' className='text-blue-600 dark:text-blue-400 hover:underline'>
										HIPAA-Compliant PDF Management for Healthcare Professionals
									</Link>
								</p>
							</div>
						</div>
					</div>

					{/* Legal Professionals */}
					<div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden'>
						<div className='bg-gradient-to-r from-blue-600 to-indigo-600 p-6'>
							<div className='flex items-center gap-3'>
								<Scale className='h-8 w-8 text-white' />
								<h2 className='text-2xl font-bold text-white'>
									Legal Professionals & Attorney-Client Privilege
								</h2>
							</div>
						</div>
						<div className='p-8 space-y-6'>
							<div>
								<h3 className='text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2'>
									<CheckCircle2 className='h-6 w-6 text-green-600' />
									What PDF Wonder Kit IS
								</h3>
								<ul className='space-y-2 text-gray-700 dark:text-gray-300 ml-8'>
									<li>✅ <strong>Privilege-Safe:</strong> Client-side processing means no third-party access to privileged communications</li>
									<li>✅ <strong>Reasonable Security Measures:</strong> Meets typical state bar requirements for technology security</li>
									<li>✅ <strong>No Third-Party Disclosure:</strong> Documents are never transmitted to us or any server</li>
									<li>✅ <strong>Chain of Custody Protection:</strong> Files remain under your control at all times</li>
								</ul>
							</div>

							<div>
								<h3 className='text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2'>
									<XCircle className='h-6 w-6 text-red-600' />
									What PDF Wonder Kit IS NOT
								</h3>
								<ul className='space-y-2 text-gray-700 dark:text-gray-300 ml-8'>
									<li>❌ <strong>Not a Legal Opinion:</strong> We're not providing legal advice about your specific situation</li>
									<li>❌ <strong>Not a Substitute for Bar Ethics Rules:</strong> You must follow your jurisdiction's specific ethics requirements</li>
									<li>❌ <strong>Not Guaranteed to Meet All Jurisdictions:</strong> State bar rules vary - check your state's requirements</li>
									<li>❌ <strong>Not a Certified E-Discovery Tool:</strong> For litigation, consult with e-discovery specialists</li>
								</ul>
							</div>

							<div className='bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-6 rounded-r-lg'>
								<h4 className='font-bold text-blue-900 dark:text-blue-100 mb-2 flex items-center gap-2'>
									<Shield className='h-5 w-5' />
									Your Responsibilities as a Legal Professional
								</h4>
								<ul className='text-sm text-blue-800 dark:text-blue-200 space-y-2 ml-6'>
									<li><strong>Know Your Ethics Rules:</strong> Review your state bar's rules on technology competence (typically Rule 1.1 and Comment 8)</li>
									<li><strong>Reasonable Security:</strong> Use secure devices, networks, and transmission methods</li>
									<li><strong>Client Consent:</strong> Obtain informed consent for technology use when required by your jurisdiction</li>
									<li><strong>Metadata Review:</strong> Check for metadata in processed documents before disclosure</li>
									<li><strong>Backup Practices:</strong> Maintain proper backups of client documents</li>
									<li><strong>Conflict Checks:</strong> Ensure document processing doesn't create inadvertent conflicts</li>
									<li><strong>Billing Ethics:</strong> Follow billing ethics when using tools for client work</li>
								</ul>
							</div>

							<div className='bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6'>
								<h4 className='font-bold text-green-900 dark:text-green-100 mb-3'>
									✅ Recommended Legal Workflow
								</h4>
								<ol className='text-sm text-green-800 dark:text-green-200 space-y-2'>
									<li><strong>1.</strong> Review your state bar's technology competence requirements</li>
									<li><strong>2.</strong> Use PDF Wonder Kit only on secure, password-protected devices</li>
									<li><strong>3.</strong> Process privileged documents knowing they stay on your device</li>
									<li><strong>4.</strong> Review metadata before sharing processed documents</li>
									<li><strong>5.</strong> Use secure transmission methods (encrypted email, secure client portals)</li>
									<li><strong>6.</strong> Maintain proper file retention and backup practices</li>
									<li><strong>7.</strong> Document technology usage in client files when appropriate</li>
								</ol>
							</div>

							<div className='bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg p-6'>
								<h4 className='font-semibold text-gray-900 dark:text-gray-100 mb-3'>
									📋 Model Rules of Professional Conduct Reference
								</h4>
								<div className='text-sm text-gray-700 dark:text-gray-300 space-y-2'>
									<p>
										<strong>Rule 1.1 (Competence) - Comment 8:</strong> Requires lawyers to stay abreast of changes in technology and understand the benefits and risks of technology relevant to their practice.
									</p>
									<p>
										<strong>Rule 1.6 (Confidentiality):</strong> Requires reasonable efforts to prevent inadvertent disclosure of confidential client information.
									</p>
									<p className='italic text-xs mt-3'>
										Note: These are ABA Model Rules. Your state may have variations. Always consult your state bar's specific rules.
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* Financial Services */}
					<div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden'>
						<div className='bg-gradient-to-r from-green-600 to-emerald-600 p-6'>
							<div className='flex items-center gap-3'>
								<Building2 className='h-8 w-8 text-white' />
								<h2 className='text-2xl font-bold text-white'>
									Financial Services & Data Privacy
								</h2>
							</div>
						</div>
						<div className='p-8 space-y-6'>
							<div>
								<h3 className='text-xl font-bold text-gray-900 dark:text-white mb-3'>
									Compliance for Financial Institutions
								</h3>
								<p className='text-gray-700 dark:text-gray-300 mb-4'>
									Financial institutions handling sensitive customer data (covered by regulations like GLBA, SOX, PCI DSS) can benefit from PDF Wonder Kit's client-side processing:
								</p>
								<ul className='space-y-2 text-gray-700 dark:text-gray-300 ml-4'>
									<li>✅ <strong>GLBA Safeguards:</strong> No transmission of customer financial information to third parties</li>
									<li>✅ <strong>PCI DSS:</strong> Credit card data never leaves your secure environment</li>
									<li>✅ <strong>SOX Compliance:</strong> Document processing happens on controlled systems</li>
									<li>✅ <strong>Data Residency:</strong> Data stays in your jurisdiction/device</li>
								</ul>
							</div>

							<div className='bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-6 rounded-r-lg'>
								<h4 className='font-bold text-yellow-900 dark:text-yellow-100 mb-2'>
									Your Responsibilities
								</h4>
								<ul className='text-sm text-yellow-800 dark:text-yellow-200 space-y-2 ml-6'>
									<li>• Obtain IT department approval before use</li>
									<li>• Use only on approved, encrypted workstations</li>
									<li>• Follow your organization's data handling policies</li>
									<li>• Ensure processed documents are stored in approved systems</li>
									<li>• Maintain audit trails for document processing</li>
									<li>• Use secure transmission methods for sharing</li>
								</ul>
							</div>
						</div>
					</div>

					{/* General Business */}
					<div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden'>
						<div className='bg-gradient-to-r from-purple-600 to-pink-600 p-6'>
							<div className='flex items-center gap-3'>
								<Users className='h-8 w-8 text-white' />
								<h2 className='text-2xl font-bold text-white'>
									General Business & GDPR/CCPA
								</h2>
							</div>
						</div>
						<div className='p-8 space-y-6'>
							<div>
								<h3 className='text-xl font-bold text-gray-900 dark:text-white mb-3'>
									Data Privacy Regulations
								</h3>
								<p className='text-gray-700 dark:text-gray-300 mb-4'>
									For businesses subject to GDPR (Europe), CCPA (California), or similar data privacy laws:
								</p>
								<ul className='space-y-2 text-gray-700 dark:text-gray-300 ml-4'>
									<li>✅ <strong>Data Minimization:</strong> We collect zero personal data from your documents</li>
									<li>✅ <strong>Purpose Limitation:</strong> Your documents are only used for the processing you initiate</li>
									<li>✅ <strong>Storage Limitation:</strong> Documents are automatically cleared from browser memory</li>
									<li>✅ <strong>No Cross-Border Transfers:</strong> Data never leaves your device or country</li>
									<li>✅ <strong>No Third-Party Processors:</strong> No data processing agreements needed</li>
								</ul>
							</div>

							<div className='bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6'>
								<h4 className='font-semibold text-blue-900 dark:text-blue-100 mb-3'>
									Best Practices for All Industries
								</h4>
								<ul className='text-sm text-blue-800 dark:text-blue-200 space-y-2'>
									<li><CheckCircle2 className='inline h-4 w-4 mr-2' />Use secure, password-protected devices</li>
									<li><CheckCircle2 className='inline h-4 w-4 mr-2' />Avoid using on public computers or networks</li>
									<li><CheckCircle2 className='inline h-4 w-4 mr-2' />Close your browser tab when finished to clear memory</li>
									<li><CheckCircle2 className='inline h-4 w-4 mr-2' />Store processed documents in approved, secure locations</li>
									<li><CheckCircle2 className='inline h-4 w-4 mr-2' />Use encryption when transmitting sensitive documents</li>
									<li><CheckCircle2 className='inline h-4 w-4 mr-2' />Follow your organization's data handling policies</li>
									<li><CheckCircle2 className='inline h-4 w-4 mr-2' />Document your processes for audit purposes</li>
								</ul>
							</div>
						</div>
					</div>

					{/* Technical Details */}
					<div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden'>
						<div className='bg-gradient-to-r from-gray-700 to-gray-900 p-6'>
							<div className='flex items-center gap-3'>
								<FileText className='h-8 w-8 text-white' />
								<h2 className='text-2xl font-bold text-white'>
									Technical Details: How It Works
								</h2>
							</div>
						</div>
						<div className='p-8 space-y-6'>
							<div>
								<h3 className='text-xl font-bold text-gray-900 dark:text-white mb-3'>
									Client-Side Processing Explained
								</h3>
								<p className='text-gray-700 dark:text-gray-300 mb-4'>
									When you use PDF Wonder Kit, here's exactly what happens technically:
								</p>
								
								<div className='space-y-4'>
									<div className='bg-gray-50 dark:bg-gray-900 rounded-lg p-5 border border-gray-200 dark:border-gray-700'>
										<h4 className='font-semibold text-gray-900 dark:text-gray-100 mb-2'>1. File Selection</h4>
										<p className='text-sm text-gray-700 dark:text-gray-300'>
											When you select a file, your browser reads it using the File API. The file data stays in your browser's memory - it's never transmitted over the network.
										</p>
									</div>

									<div className='bg-gray-50 dark:bg-gray-900 rounded-lg p-5 border border-gray-200 dark:border-gray-700'>
										<h4 className='font-semibold text-gray-900 dark:text-gray-100 mb-2'>2. PDF Processing</h4>
										<p className='text-sm text-gray-700 dark:text-gray-300'>
											We use PDF.js (Mozilla's open-source PDF library) running entirely in JavaScript on your device. All operations (splitting, merging, compression, etc.) happen locally.
										</p>
									</div>

									<div className='bg-gray-50 dark:bg-gray-900 rounded-lg p-5 border border-gray-200 dark:border-gray-700'>
										<h4 className='font-semibold text-gray-900 dark:text-gray-100 mb-2'>3. Download</h4>
										<p className='text-sm text-gray-700 dark:text-gray-300'>
											The processed file is created in your browser's memory and offered as a download. The file goes directly from browser memory to your device's storage - no network transmission.
										</p>
									</div>

									<div className='bg-gray-50 dark:bg-gray-900 rounded-lg p-5 border border-gray-200 dark:border-gray-700'>
										<h4 className='font-semibold text-gray-900 dark:text-gray-100 mb-2'>4. Cleanup</h4>
										<p className='text-sm text-gray-700 dark:text-gray-300'>
											When you close the tab or navigate away, your browser automatically clears the file data from memory. Nothing persists.
										</p>
									</div>
								</div>
							</div>

							<div className='bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-6 rounded-r-lg'>
								<h4 className='font-bold text-blue-900 dark:text-blue-100 mb-2'>
									🔍 Verify It Yourself
								</h4>
								<p className='text-sm text-blue-800 dark:text-blue-200 mb-3'>
									You can verify that no data is transmitted by:
								</p>
								<ul className='text-sm text-blue-800 dark:text-blue-200 space-y-1 ml-6'>
									<li>• Opening your browser's Developer Tools (Network tab)</li>
									<li>• Processing a PDF</li>
									<li>• Observing that no files are uploaded to any server</li>
									<li>• The only network requests are for loading the webpage itself</li>
								</ul>
							</div>

							<div>
								<h3 className='text-xl font-bold text-gray-900 dark:text-white mb-3'>
									What Data We Do Collect
								</h3>
								<p className='text-gray-700 dark:text-gray-300 mb-3'>
									For transparency, here's what we <strong>do</strong> collect (none of it is document content):
								</p>
								<ul className='text-sm text-gray-700 dark:text-gray-300 space-y-2 ml-4'>
									<li>• <strong>Account information:</strong> Email, name (via Clerk authentication) - only if you create an account</li>
									<li>• <strong>Usage statistics:</strong> Number of PDFs processed per month (for subscription enforcement) - no file content or names</li>
									<li>• <strong>Payment information:</strong> Processed by Stripe, we don't store credit card data</li>
									<li>• <strong>Basic analytics:</strong> Page views, browser type (standard website analytics)</li>
								</ul>
								<p className='text-sm text-gray-600 dark:text-gray-400 mt-3 italic'>
									See our full <Link href='/privacy' className='text-blue-600 dark:text-blue-400 hover:underline'>Privacy Policy</Link> for complete details.
								</p>
							</div>
						</div>
					</div>

					{/* Important Disclaimers */}
					<div className='bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border-2 border-red-300 dark:border-red-800 rounded-xl p-8'>
						<h2 className='text-2xl font-bold text-red-900 dark:text-red-100 mb-4 flex items-center gap-2'>
							<AlertTriangle className='h-7 w-7' />
							Important Legal Disclaimers
						</h2>
						<div className='space-y-4 text-red-800 dark:text-red-200'>
							<p>
								<strong>Not Legal Advice:</strong> This page provides general information about our technology and common compliance considerations. It is NOT legal advice. Consult with qualified legal counsel about your specific situation and compliance obligations.
							</p>
							<p>
								<strong>Your Responsibility:</strong> You are solely responsible for ensuring your use of PDF Wonder Kit complies with applicable laws, regulations, and your organization's policies. We provide a tool - you determine how to use it compliantly.
							</p>
							<p>
								<strong>No Warranties:</strong> While we've designed PDF Wonder Kit with privacy and security in mind, we make no warranties about its suitability for any particular regulated use. See our <Link href='/terms' className='underline hover:text-red-900 dark:hover:text-red-100'>Terms of Service</Link> for complete warranty disclaimers.
							</p>
							<p>
								<strong>Consult Your Compliance Officer:</strong> Before using PDF Wonder Kit with sensitive data, obtain approval from your organization's compliance officer, IT security team, or legal department.
							</p>
							<p>
								<strong>Evolving Regulations:</strong> Data privacy and security regulations change frequently. This information is current as of {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}, but you should stay informed about changes to regulations affecting your industry.
							</p>
						</div>
					</div>

					{/* Questions */}
					<div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8'>
						<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-6'>
							Still Have Questions?
						</h2>
						<div className='space-y-4'>
							<p className='text-gray-700 dark:text-gray-300'>
								We understand that compliance is critical for your organization. If you have specific questions about how PDF Wonder Kit works or need additional documentation for your compliance review:
							</p>
							<div className='grid md:grid-cols-2 gap-4'>
								<div className='bg-gray-50 dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-700'>
									<h3 className='font-semibold text-gray-900 dark:text-gray-100 mb-2'>
										📧 Email Us
									</h3>
									<p className='text-sm text-gray-700 dark:text-gray-300 mb-3'>
										For technical questions about our architecture or specific compliance documentation:
									</p>
									<a 
										href='mailto:admin@pdfwonderkit.com'
										className='text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium'
									>
										admin@pdfwonderkit.com
									</a>
								</div>
								<div className='bg-gray-50 dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-700'>
									<h3 className='font-semibold text-gray-900 dark:text-gray-100 mb-2'>
										📖 Additional Resources
									</h3>
									<ul className='text-sm text-gray-700 dark:text-gray-300 space-y-2'>
										<li>
											<Link href='/privacy' className='text-blue-600 dark:text-blue-400 hover:underline'>
												Privacy Policy
											</Link>
										</li>
										<li>
											<Link href='/terms' className='text-blue-600 dark:text-blue-400 hover:underline'>
												Terms of Service
											</Link>
										</li>
										<li>
											<Link href='/blog/hipaa-compliant-pdf-management-healthcare' className='text-blue-600 dark:text-blue-400 hover:underline'>
												HIPAA Compliance Guide
											</Link>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>

					{/* CTA */}
					<div className='bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-center'>
						<h2 className='text-3xl font-bold text-white mb-4'>
							Ready to Process Your Documents Securely?
						</h2>
						<p className='text-xl text-blue-100 mb-6 max-w-2xl mx-auto'>
							All the power you need, with the privacy and security your sensitive documents deserve.
						</p>
						<Link 
							href='/'
							className='inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors shadow-lg'
						>
							Start Processing PDFs
							<span>→</span>
						</Link>
					</div>
				</div>
			</div>

			<Footer />
		</div>
	);
}
