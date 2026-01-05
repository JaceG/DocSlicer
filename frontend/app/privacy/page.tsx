import { Header } from '@/components/ui/Header';

export default function PrivacyPage() {
	return (
		<div className='min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-indigo-50/30 dark:from-gray-900 dark:via-blue-950/20 dark:to-indigo-950/30'>
			<Header />

			<div className='container mx-auto px-4 py-16 max-w-4xl'>
				<h1 className='text-4xl font-bold text-gray-900 dark:text-white mb-8'>
					Privacy Policy
				</h1>

				<div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 space-y-6 text-gray-700 dark:text-gray-300'>
					<p className='text-sm text-gray-500 dark:text-gray-400'>
						Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
					</p>

					<section>
						<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
							1. Introduction
						</h2>
						<p>
							DocSlicer ("we," "our," or "us") respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you use our PDF slicing service.
						</p>
					</section>

					<section>
						<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
							2. Information We Collect
						</h2>
						
						<h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-4'>
							2.1 Confidential Personal Information (CPI) - Ohio Standards
						</h3>
						<p className='mb-3'>
							In compliance with Ohio Revised Code §1347.15, we protect Confidential Personal Information (CPI), which includes:
						</p>
						<ul className='list-disc ml-6 space-y-2 mb-4'>
							<li>Social Security numbers (not collected)</li>
							<li>Driver's license numbers (not collected)</li>
							<li>Financial account information (processed securely through Stripe, not stored by us)</li>
							<li>Personal information that could lead to identity theft</li>
						</ul>

						<h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-4'>
							2.2 Account Information
						</h3>
						<p className='mb-3'>When you create an account, we collect:</p>
						<ul className='list-disc ml-6 space-y-2 mb-4'>
							<li>Email address</li>
							<li>Name</li>
							<li>Password (encrypted using industry-standard protocols)</li>
							<li>Account creation date</li>
							<li>Age verification status (for users under 16, parental consent record)</li>
						</ul>

						<h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-4'>
							2.3 Payment Information
						</h3>
						<p className='mb-3'>
							Payment processing is handled by Stripe, a PCI DSS Level 1 certified service provider. We do not store, access, or retain your credit card information. Stripe collects and processes payment data according to their privacy policy. Ohio residents will be charged applicable state and local sales tax as required by Ohio law.
						</p>

						<h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-4'>
							2.4 Usage Data
						</h3>
						<p className='mb-3'>We collect:</p>
						<ul className='list-disc ml-6 space-y-2'>
							<li>Number of PDFs processed per month</li>
							<li>File sizes (not file content)</li>
							<li>Feature usage statistics</li>
							<li>Browser type and version</li>
							<li>Device information</li>
							<li>IP address</li>
						</ul>
					</section>

					<section>
						<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
							3. Your PDF Documents - Our Most Important Commitment
						</h2>
						<p className='mb-3 font-semibold text-green-600 dark:text-green-400'>
							🔒 WE DO NOT UPLOAD, STORE, OR ACCESS YOUR PDF FILES.
						</p>
						<p className='mb-3'>
							All PDF processing happens entirely in your web browser using JavaScript. Your documents never leave your device. We have no technical capability to access, read, or store your document content.
						</p>
						<p>
							This is not just a policy—it's how our technology works. Your files are processed client-side for maximum privacy and security.
						</p>
					</section>

					<section>
						<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
							4. How We Use Your Information
						</h2>
						<p className='mb-3'>We use collected information to:</p>
						<ul className='list-disc ml-6 space-y-2'>
							<li>Provide and maintain the Service</li>
							<li>Process your subscription payments</li>
							<li>Enforce usage limits based on your subscription tier</li>
							<li>Send important service updates and notifications</li>
							<li>Improve and optimize the Service</li>
							<li>Detect and prevent abuse or fraudulent activity</li>
							<li>Comply with legal obligations</li>
						</ul>
					</section>

					<section>
						<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
							5. Third-Party Services
						</h2>
						
						<h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-4'>
							5.1 Clerk (Authentication)
						</h3>
						<p className='mb-3'>
							We use Clerk for user authentication. Clerk collects and processes your email, name, and authentication data according to their privacy policy.
						</p>

						<h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-4'>
							5.2 Stripe (Payments)
						</h3>
						<p className='mb-3'>
							Payment processing is handled by Stripe. Your payment information is transmitted directly to Stripe and is not stored on our servers.
						</p>

						<h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-4'>
							5.3 Hosting Provider
						</h3>
						<p>
							Our service is hosted on Render. Server logs may include IP addresses and request metadata.
						</p>
					</section>

					<section>
						<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
							6. Cookies and Tracking
						</h2>
						<p className='mb-3'>We use cookies for:</p>
						<ul className='list-disc ml-6 space-y-2'>
							<li>Authentication (keeping you logged in)</li>
							<li>Usage tracking (counting PDFs processed monthly)</li>
							<li>Preference storage (theme, language)</li>
						</ul>
					</section>

					<section>
						<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
							7. Data Retention and Deletion
						</h2>
						<p className='mb-3'>
							<strong>Account Data:</strong> Retained as long as your account is active. Upon account deletion, all personal information will be permanently deleted within 30 days, except as required by law or legitimate business purposes (e.g., tax records).
						</p>
						<p className='mb-3'>
							<strong>Usage Statistics:</strong> Retained for up to 12 months for analytics and service improvement purposes, then automatically deleted.
						</p>
						<p className='mb-3'>
							<strong>PDF Files:</strong> Never uploaded to or stored on our servers. All processing occurs in your browser and files are deleted from browser memory when you close the tab or navigate away.
						</p>
						<p>
							<strong>Backup Data:</strong> Data in backups will be deleted according to our backup retention schedule (maximum 90 days).
						</p>
					</section>

					<section>
						<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
							8. Your Rights (GDPR & CCPA)
						</h2>
						<p className='mb-3'>You have the right to:</p>
						<ul className='list-disc ml-6 space-y-2'>
							<li><strong>Access:</strong> Request a copy of your personal data</li>
							<li><strong>Correction:</strong> Update inaccurate personal data</li>
							<li><strong>Deletion:</strong> Request deletion of your account and data</li>
							<li><strong>Portability:</strong> Request your data in a portable format</li>
							<li><strong>Objection:</strong> Object to certain data processing</li>
							<li><strong>Withdraw Consent:</strong> Withdraw consent for data processing</li>
						</ul>
						<p className='mt-3'>
							To exercise these rights, contact us at admin@docslicer.com.
						</p>
					</section>

					<section>
						<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
							9. Security Measures
						</h2>
						<p className='mb-3'>
							In accordance with Ohio's Data Protection Act and recommended NIST cybersecurity frameworks, we implement comprehensive security measures:
						</p>
						<ul className='list-disc ml-6 space-y-2 mb-4'>
							<li><strong>Encryption:</strong> HTTPS/TLS encryption for all data transmission</li>
							<li><strong>Password Security:</strong> Bcrypt hashing for password storage</li>
							<li><strong>Access Controls:</strong> Role-based access controls limiting data access to authorized personnel only</li>
							<li><strong>Authentication:</strong> Multi-factor authentication available for enhanced security</li>
							<li><strong>Monitoring:</strong> 24/7 system monitoring and intrusion detection</li>
							<li><strong>Rate Limiting:</strong> Protection against brute force attacks and abuse</li>
							<li><strong>Client-Side Processing:</strong> PDFs processed entirely in your browser - never uploaded to our servers</li>
							<li><strong>Regular Audits:</strong> Periodic security assessments and vulnerability testing</li>
						</ul>

						<h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-4'>
							9.1 Data Breach Notification (Ohio Law Compliance)
						</h3>
						<p className='mb-3'>
							In the unlikely event of a data breach involving your personal information, we will:
						</p>
						<ul className='list-disc ml-6 space-y-2'>
							<li>Notify affected individuals within the timeframe required by Ohio law</li>
							<li>Provide details about the nature of the breach and data affected</li>
							<li>Explain steps we've taken to address the breach</li>
							<li>Offer guidance on protective measures you can take</li>
							<li>Notify appropriate authorities as required by law</li>
						</ul>
					</section>

					<section>
						<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
							10. Children's Privacy
						</h2>
						<p>
							Our Service is not intended for users under 13 years of age. We do not knowingly collect personal information from children under 13.
						</p>
					</section>

					<section>
						<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
							11. International Data Transfers
						</h2>
						<p>
							Your data may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place for international transfers.
						</p>
					</section>

					<section>
						<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
							12. Changes to This Privacy Policy
						</h2>
						<p>
							We may update this Privacy Policy from time to time. We will notify you of significant changes via email or a notice on our website.
						</p>
					</section>

					<section>
						<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
							13. Contact Us
						</h2>
						<p className='mb-3'>
							If you have questions about this Privacy Policy or our privacy practices, please contact us:
						</p>
						<ul className='space-y-2'>
							<li><strong>Email:</strong> admin@docslicer.com</li>
							<li><strong>Website:</strong> www.docslicer.com</li>
						</ul>
					</section>
				</div>
			</div>
		</div>
	);
}
