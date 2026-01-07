import { Header } from '@/components/ui/Header';

export default function TermsPage() {
	return (
		<div className='min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-indigo-50/30 dark:from-gray-900 dark:via-blue-950/20 dark:to-indigo-950/30'>
			<Header />

			<div className='container mx-auto px-4 py-16 max-w-4xl'>
				<h1 className='text-4xl font-bold text-gray-900 dark:text-white mb-8'>
					Terms of Service
				</h1>

				<div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 space-y-6 text-gray-700 dark:text-gray-300'>
					<p className='text-sm text-gray-500 dark:text-gray-400'>
						Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
					</p>

					<section>
						<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
							1. Acceptance of Terms
						</h2>
						<p>
							By accessing and using PDF Wonder Kit ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these Terms of Service, please do not use the Service.
						</p>
					</section>

					<section>
						<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
							2. Description of Service
						</h2>
						<p>
							PDF Wonder Kit provides a comprehensive web-based PDF toolkit with 18+ tools including split, merge, compress, protect, sign, annotate, OCR, and more. The service operates entirely in your browser for security and privacy.
						</p>
					</section>

					<section>
						<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
							3. User Accounts and Subscription
						</h2>
						<p className='mb-3'>
							<strong>3.1 Account Creation:</strong> You must create an account to access certain features. You are responsible for maintaining the confidentiality of your account credentials.
						</p>
						<p className='mb-3'>
							<strong>3.2 Age Requirement:</strong> In compliance with Ohio's Social Media Parental Notification Act, users under 16 years of age must have verifiable parental consent to create an account. By creating an account, you represent that you are either 16 years or older, or have obtained parental consent.
						</p>
						<p className='mb-3'>
							<strong>3.3 Subscription Plans:</strong> We offer both free and premium subscription tiers. Premium subscriptions are billed monthly or annually as selected during checkout.
						</p>
						<p className='mb-3'>
							<strong>3.4 Payment and Sales Tax:</strong> Premium subscriptions are processed through Stripe. By subscribing, you authorize us to charge your payment method for the applicable fees. Ohio residents will be charged applicable state and local sales tax (currently 5.75% state rate plus applicable local taxes) as required by Ohio law for Software as a Service.
						</p>
						<p>
							<strong>3.5 Cancellation:</strong> You may cancel your subscription at any time through your account dashboard or by contacting admin@pdfwonderkit.com. Cancellation will take effect at the end of your current billing period. No refunds will be provided for partial billing periods.
						</p>
					</section>

					<section>
						<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
							4. Usage Limits and Restrictions
						</h2>
						<p className='mb-3'>
							<strong>4.1 Free Tier:</strong> Free accounts are limited to 3 PDFs per month, 25MB file size, and 3 page ranges per document.
						</p>
						<p className='mb-3'>
							<strong>4.2 Premium Tier:</strong> Premium accounts have unlimited PDFs, 100MB file size limit, and unlimited page ranges.
						</p>
						<p className='mb-3'>
							<strong>4.3 Prohibited Use:</strong> You agree not to:
						</p>
						<ul className='list-disc ml-6 space-y-2'>
							<li>Upload malicious files or content that violates laws</li>
							<li>Attempt to circumvent usage limits or security measures</li>
							<li>Use the service to process copyrighted materials without authorization</li>
							<li>Reverse engineer, decompile, or disassemble the service</li>
							<li>Use automated tools to access the service excessively</li>
						</ul>
					</section>

					<section>
						<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
							5. Privacy and Data Processing
						</h2>
						<p className='mb-3'>
							<strong>5.1 Client-Side Processing:</strong> Your PDF files are processed entirely in your browser. We do not upload, store, or have access to your document content.
						</p>
						<p className='mb-3'>
							<strong>5.2 Account Data:</strong> We collect and store your account information (email, name) and usage statistics as described in our Privacy Policy.
						</p>
						<p>
							<strong>5.3 Cookies:</strong> We use cookies and similar technologies for authentication and analytics.
						</p>
					</section>

					<section>
						<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
							6. Intellectual Property
						</h2>
						<p className='mb-3'>
							<strong>6.1 Our Rights:</strong> The Service, including its design, code, and content, is owned by us and protected by copyright and other intellectual property laws.
						</p>
						<p>
							<strong>6.2 Your Content:</strong> You retain all rights to the documents you upload. We claim no ownership over your content.
						</p>
					</section>

					<section>
						<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
							7. Disclaimer of Warranties
						</h2>
						<p>
							THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND. WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
						</p>
					</section>

					<section>
						<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
							8. Limitation of Liability
						</h2>
						<p>
							TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.
						</p>
					</section>

					<section>
						<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
							9. Refund Policy
						</h2>
						<p>
							All subscriptions are non-refundable. You may cancel your subscription at any time, and you will continue to have access until the end of your billing period.
						</p>
					</section>

					<section>
						<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
							10. Modifications to Service and Terms
						</h2>
						<p>
							We reserve the right to modify or discontinue the Service at any time. We may also update these Terms of Service. Continued use of the Service after changes constitutes acceptance of the modified terms.
						</p>
					</section>

					<section>
						<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
							11. Termination
						</h2>
						<p>
							We may terminate or suspend your account and access to the Service immediately, without prior notice, for any reason, including breach of these Terms.
						</p>
					</section>

					<section>
						<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
							12. Governing Law and Dispute Resolution
						</h2>
						<p className='mb-3'>
							<strong>12.1 Governing Law:</strong> These Terms shall be governed by and construed in accordance with the laws of the State of Ohio, United States, without regard to its conflict of law provisions.
						</p>
						<p className='mb-3'>
							<strong>12.2 Jurisdiction and Venue:</strong> Any legal action or proceeding arising out of or relating to these Terms or the Service shall be brought exclusively in the state or federal courts located in Franklin County, Columbus, Ohio. You consent to the personal jurisdiction of such courts and waive any objection to venue in such courts.
						</p>
						<p className='mb-3'>
							<strong>12.3 Arbitration Option:</strong> We may, at our sole discretion, require that disputes be resolved through binding arbitration in Columbus, Ohio, under the rules of the American Arbitration Association. The arbitrator's decision shall be final and binding.
						</p>
						<p>
							<strong>12.4 Class Action Waiver:</strong> To the maximum extent permitted by Ohio law, you agree to resolve any disputes with us on an individual basis and waive any right to participate in class action lawsuits or class-wide arbitration.
						</p>
					</section>

					<section>
						<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
							13. Contact Information
						</h2>
						<p>
							For questions about these Terms, please contact us at: admin@pdfwonderkit.com
						</p>
					</section>
				</div>
			</div>
		</div>
	);
}
