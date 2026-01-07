import { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';
import {
	Calendar,
	Clock,
	ArrowRight,
	BookOpen,
	FileText,
	Shield,
	Zap,
} from 'lucide-react';

export const metadata: Metadata = {
	title: 'PDF Guides & Tutorials',
	description:
		'Learn how to split, merge, and manage PDF documents. Free guides and tutorials for handling PDFs on any device.',
	keywords: [
		'PDF guide',
		'split PDF tutorial',
		'how to split PDF',
		'PDF tips',
		'PDF help',
		'document management',
	],
	openGraph: {
		title: 'PDF Guides & Tutorials | PDF Wonder Kit',
		description:
			'Learn how to split, merge, and manage PDF documents. Free guides and tutorials.',
		url: 'https://www.pdfwonderkit.com/blog',
	},
	alternates: {
		canonical: 'https://www.pdfwonderkit.com/blog',
	},
};

// Blog posts data - easily extensible for future posts
const blogPosts = [
	{
		slug: 'pdf-workflows-remote-teams',
		title: '10 Essential PDF Workflows for Remote Teams (2026)',
		description:
			'Streamline remote work with these 10 proven PDF workflows. Learn document collaboration, e-signatures, secure sharing, and async review processes for distributed teams.',
		date: '2026-01-07',
		readTime: '12 min read',
		category: 'Productivity',
		icon: FileText,
		featured: true,
		tags: [
			'PDF workflow',
			'remote work PDFs',
			'document collaboration',
			'remote team workflow',
		],
	},
	{
		slug: 'create-professional-pdf-portfolio',
		title: 'How to Create a Professional PDF Portfolio from Scratch',
		description:
			'Build an impressive PDF portfolio for job applications, freelance pitches, or client presentations. Step-by-step guide to combining work samples with professional formatting.',
		date: '2026-01-07',
		readTime: '11 min read',
		category: 'Tutorials',
		icon: FileText,
		featured: false,
		tags: [
			'PDF portfolio',
			'combine PDFs',
			'professional portfolio',
			'create portfolio PDF',
		],
	},
	{
		slug: 'pdf-automation-small-business',
		title: 'PDF Automation for Small Businesses: Save 10 Hours Per Week',
		description:
			'Automate invoice processing, contract management, and receipt organization to save 10+ hours weekly. Proven PDF workflows for small business efficiency.',
		date: '2026-01-07',
		readTime: '13 min read',
		category: 'Business',
		icon: FileText,
		featured: false,
		tags: [
			'PDF automation',
			'business workflow',
			'document management',
			'automate invoices',
		],
	},
	{
		slug: 'prepare-pdf-professional-printing',
		title: 'How to Prepare PDFs for Professional Printing (Complete Checklist)',
		description:
			'Complete guide to preparing print-ready PDFs. Learn about bleed, color modes, resolution, page numbers, and professional formatting for flawless printing.',
		date: '2026-01-07',
		readTime: '10 min read',
		category: 'Tutorials',
		icon: FileText,
		featured: false,
		tags: [
			'prepare PDF for printing',
			'print-ready PDF',
			'PDF printing guide',
			'commercial printing PDF',
		],
	},
	{
		slug: 'architects-pdf-management-cad-blueprints',
		title: "Architect's Guide to PDF Management (CAD, Blueprints, Annotations)",
		description:
			'Master PDF workflows for architectural practice. Learn drawing markup, revision tracking, client presentations, and secure blueprint management.',
		date: '2026-01-07',
		readTime: '11 min read',
		category: 'Industry',
		icon: FileText,
		featured: false,
		tags: [
			'architect PDF',
			'blueprint PDF',
			'CAD to PDF',
			'architectural drawings',
		],
	},
	{
		slug: 'accountants-organize-tax-documents',
		title: 'How Accountants Can Organize Tax Document PDFs Efficiently',
		description:
			'Master tax season with efficient PDF organization. Learn client file systems, audit preparation, and secure document management for accounting practices.',
		date: '2026-01-07',
		readTime: '12 min read',
		category: 'Industry',
		icon: FileText,
		featured: false,
		tags: [
			'organize tax documents',
			'accounting PDFs',
			'financial document management',
			'tax season organization',
		],
	},
	{
		slug: 'students-guide-pdf-management',
		title: "Student's Guide to PDF Management (Notes, Textbooks, Assignments)",
		description:
			'Master digital studying with essential PDF skills. Learn to annotate textbooks, organize notes, merge assignments, and use OCR for searchable study materials.',
		date: '2026-01-07',
		readTime: '10 min read',
		category: 'Industry',
		icon: FileText,
		featured: false,
		tags: [
			'student PDF tools',
			'annotate textbook',
			'study notes',
			'digital studying',
		],
	},
	{
		slug: 'publishers-handle-book-pdfs',
		title: 'How Publishers Handle Book PDFs (From Manuscript to Print)',
		description:
			'Professional book publishing workflow using PDFs. Learn manuscript assembly, page numbering, OCR for ebooks, metadata for distribution, and print preparation.',
		date: '2026-01-07',
		readTime: '12 min read',
		category: 'Industry',
		icon: FileText,
		featured: false,
		tags: [
			'publish PDF book',
			'ebook creation',
			'PDF publishing',
			'self-publishing PDF',
		],
	},
	{
		slug: 'pdf-annotation-tools-compared-2026',
		title: 'PDF Annotation Tools Compared: Free vs. Paid (2026)',
		description:
			'Compare free and paid PDF annotation tools. Learn which features matter, cost-benefit analysis, and when free tools like PDF Wonder Kit are better than Adobe.',
		date: '2026-01-07',
		readTime: '14 min read',
		category: 'Guides',
		icon: FileText,
		featured: false,
		tags: [
			'PDF annotation comparison',
			'best PDF annotator',
			'markup tools',
			'free PDF annotation',
		],
	},
	{
		slug: 'esignature-legally-binding-guide',
		title: 'E-Signature Tools: Which One is Actually Legally Binding?',
		description:
			'Understand e-signature laws (ESIGN Act, eIDAS). Learn which digital signatures are legally binding, when they hold up in court, and compliance requirements.',
		date: '2026-01-07',
		readTime: '15 min read',
		category: 'Guides',
		icon: FileText,
		featured: false,
		tags: [
			'legally binding e-signature',
			'digital signature laws',
			'PDF signature legal',
			'ESIGN Act',
		],
	},
	{
		slug: 'when-to-use-ocr-vs-native-pdf',
		title: 'When to Use OCR vs. Native PDF Text (Complete Guide)',
		description:
			'Understand the difference between OCR and native PDF text. Learn when optical character recognition is necessary, accuracy expectations, and cost-benefit analysis.',
		date: '2026-01-07',
		readTime: '13 min read',
		category: 'Guides',
		icon: FileText,
		featured: false,
		tags: [
			'PDF OCR guide',
			'searchable PDF',
			'when to use OCR',
			'native PDF text',
		],
	},
	{
		slug: 'why-pdf-wont-open-how-to-fix',
		title: "Why Your PDF Won't Open (And How to Fix It)",
		description:
			'Troubleshoot PDF opening errors. Learn common causes (corruption, browser issues, version compatibility), quick fixes, and when to use PDF repair tools.',
		date: '2026-01-07',
		readTime: '12 min read',
		category: 'Troubleshooting',
		icon: FileText,
		featured: false,
		tags: [
			"PDF won't open",
			'fix PDF error',
			'PDF not opening',
			'corrupted PDF',
		],
	},
	{
		slug: 'remove-sensitive-info-from-pdfs',
		title: 'How to Remove Sensitive Information from PDFs Before Sharing',
		description:
			'Protect your privacy by removing hidden metadata, author info, timestamps, and tracked changes from PDFs before sharing. GDPR compliance guide included.',
		date: '2026-01-07',
		readTime: '11 min read',
		category: 'Privacy',
		icon: FileText,
		featured: false,
		tags: [
			'remove PDF metadata',
			'clean PDF',
			'sanitize PDF',
			'PDF privacy',
		],
	},
	{
		slug: 'fix-sideways-upside-down-pdf-pages',
		title: 'How to Fix Sideways or Upside-Down PDF Pages',
		description:
			'Fix rotated PDF pages from scans, phone photos, or errors. Learn to rotate pages permanently, batch rotate multiple pages, and prevent rotation issues.',
		date: '2026-01-07',
		readTime: '9 min read',
		category: 'Troubleshooting',
		icon: FileText,
		featured: false,
		tags: [
			'rotate PDF',
			'fix sideways PDF',
			'flip PDF pages',
			'upside down PDF',
		],
	},
	{
		slug: 'split-pdf-by-bookmarks-chapters',
		title: 'How to Split PDFs by Chapters Using Bookmarks (Auto-Split Guide)',
		description:
			'Automatically split large PDFs into chapters using bookmarks. Perfect for ebooks, textbooks, course materials, and long reports.',
		date: '2026-01-06',
		readTime: '9 min read',
		category: 'Tutorials',
		icon: FileText,
		featured: false,
		tags: [
			'split pdf by bookmarks',
			'pdf chapter splitter',
			'split by toc',
			'auto split pdf',
		],
	},
	{
		slug: 'remove-blank-pages-scanned-pdf',
		title: 'How to Remove Blank Pages from Scanned PDFs Automatically',
		description:
			'Automatically detect and delete blank pages from scanned documents. Fix duplex scanning issues, clean up PDFs, and reduce file size.',
		date: '2026-01-06',
		readTime: '8 min read',
		category: 'Tutorials',
		icon: FileText,
		featured: false,
		tags: [
			'remove blank pages pdf',
			'delete empty pages',
			'clean up scanned pdf',
			'duplex scanning',
		],
	},
	{
		slug: 'rotate-reorder-pdf-pages',
		title: 'How to Rotate and Reorder PDF Pages (Complete Organization Guide)',
		description:
			'Fix scanned documents by rotating and rearranging PDF pages. Perfect for correcting orientation, organizing presentations, and cleaning up document structure.',
		date: '2026-01-06',
		readTime: '9 min read',
		category: 'Tutorials',
		icon: FileText,
		featured: false,
		tags: [
			'rotate pdf pages',
			'reorder pdf',
			'rearrange pdf',
			'delete pdf pages',
		],
	},
	{
		slug: 'fix-corrupted-pdf-repair',
		title: 'How to Fix a Corrupted PDF File (PDF Repair Guide 2026)',
		description:
			"Recover damaged PDFs that won't open. Fix corruption from incomplete downloads, storage errors, and crashes. Free PDF repair tool for data recovery.",
		date: '2026-01-06',
		readTime: '8 min read',
		category: 'Technical',
		icon: FileText,
		featured: false,
		tags: [
			'fix corrupted pdf',
			'repair pdf',
			'recover damaged pdf',
			'pdf wont open',
		],
	},
	{
		slug: 'edit-pdf-metadata',
		title: 'How to Edit PDF Metadata (Title, Author, Keywords)',
		description:
			'Change PDF properties like title, author, subject, and keywords. Essential for SEO, organization, and professional presentation.',
		date: '2026-01-06',
		readTime: '7 min read',
		category: 'Technical',
		icon: FileText,
		featured: false,
		tags: [
			'edit pdf metadata',
			'change pdf properties',
			'pdf info',
			'pdf title',
		],
	},
	{
		slug: 'ocr-make-pdf-searchable',
		title: 'How to Make Scanned PDFs Searchable with OCR',
		description:
			'Convert scanned documents into searchable text with OCR. Extract text, enable search, and improve accessibility.',
		date: '2026-01-06',
		readTime: '9 min read',
		category: 'Tutorials',
		icon: FileText,
		featured: false,
		tags: [
			'ocr pdf',
			'make pdf searchable',
			'extract text from scan',
			'pdf ocr online',
		],
	},
	{
		slug: 'compare-two-pdf-documents',
		title: 'How to Compare Two PDF Documents (Find Differences)',
		description:
			'Compare PDFs to find text changes, additions, and deletions. Essential for contract review, version control, and legal document analysis.',
		date: '2026-01-06',
		readTime: '8 min read',
		category: 'Technical',
		icon: FileText,
		featured: false,
		tags: [
			'compare pdf',
			'pdf comparison',
			'find pdf differences',
			'pdf diff',
		],
	},
	{
		slug: 'how-to-add-page-numbers-to-pdf',
		title: 'How to Add Page Numbers to a PDF (Custom Formatting Guide)',
		description:
			'Add professional page numbers to any PDF document. Customize position, format, font, and starting number. Perfect for academic papers, reports, and ebooks.',
		date: '2026-01-06',
		readTime: '8 min read',
		category: 'Tutorials',
		icon: FileText,
		featured: false,
		tags: [
			'add page numbers',
			'pdf page numbering',
			'number pdf pages',
			'pdf pagination',
		],
	},
	{
		slug: 'how-to-add-watermark-to-pdf',
		title: 'How to Add a Watermark to PDF (Protect Your Documents)',
		description:
			'Protect your PDFs with custom watermarks. Add text or image watermarks for copyright protection, draft versions, or confidential documents.',
		date: '2026-01-06',
		readTime: '9 min read',
		category: 'Security',
		icon: Shield,
		featured: false,
		tags: [
			'watermark pdf',
			'add watermark',
			'pdf watermark tool',
			'protect pdf',
		],
	},
	{
		slug: 'how-to-password-protect-pdf',
		title: 'How to Password Protect a PDF (256-bit Encryption Guide)',
		description:
			'Secure your PDFs with strong password protection and 256-bit AES encryption. Essential for GDPR compliance, sensitive documents, and client confidentiality.',
		date: '2026-01-06',
		readTime: '10 min read',
		category: 'Security',
		icon: Shield,
		featured: false,
		tags: ['password protect pdf', 'encrypt pdf', 'secure pdf', 'lock pdf'],
	},
	{
		slug: 'how-to-unlock-pdf-password',
		title: 'How to Unlock a Password-Protected PDF (You Own)',
		description:
			'Remove password protection from PDFs you have permission to unlock. Essential for forgotten passwords, legacy documents, and workflow automation.',
		date: '2026-01-06',
		readTime: '8 min read',
		category: 'Tutorials',
		icon: FileText,
		featured: false,
		tags: [
			'unlock pdf',
			'remove pdf password',
			'unlock protected pdf',
			'decrypt pdf',
		],
	},
	{
		slug: 'how-to-convert-images-to-pdf',
		title: 'How to Convert JPG/PNG Images to PDF (Batch Conversion Guide)',
		description:
			'Convert photos and images to PDF in seconds. Create photo albums, digitize receipts, or merge scanned documents. Works with JPG, PNG, GIF, and WebP.',
		date: '2026-01-06',
		readTime: '10 min read',
		category: 'Tutorials',
		icon: FileText,
		featured: false,
		tags: [
			'jpg to pdf',
			'png to pdf',
			'convert images to pdf',
			'photo to pdf',
		],
	},
	{
		slug: 'how-to-extract-images-from-pdf',
		title: 'How to Extract Images from PDF Documents (Convert PDF to JPG/PNG)',
		description:
			'Extract high-quality images from any PDF document. Save PDF pages as JPG or PNG for social media, presentations, or editing. Free and private.',
		date: '2026-01-06',
		readTime: '9 min read',
		category: 'Tutorials',
		icon: FileText,
		featured: false,
		tags: ['pdf to jpg', 'pdf to png', 'extract images', 'pdf to image'],
	},
	{
		slug: 'how-to-annotate-pdfs-free',
		title: 'How to Annotate PDFs for Free (Highlight, Comment, Draw) - 2026 Guide',
		description:
			'Learn how to highlight, comment, and markup PDF documents for free. Complete guide comparing free annotation tools to expensive alternatives like Adobe Acrobat.',
		date: '2026-01-06',
		readTime: '11 min read',
		category: 'Tutorials',
		icon: FileText,
		featured: false,
		tags: ['annotate pdf', 'highlight pdf', 'pdf markup', 'pdf comments'],
	},
	{
		slug: 'how-to-sign-pdf-electronically',
		title: 'How to Sign a PDF Document Electronically (Legally Binding)',
		description:
			'Stop printing and scanning — sign contracts, forms, and agreements digitally in seconds. Learn how electronic signatures are legally valid and save time.',
		date: '2026-01-06',
		readTime: '10 min read',
		category: 'Business',
		icon: FileText,
		featured: false,
		tags: [
			'e-sign pdf',
			'digital signature',
			'electronic signature',
			'sign pdf',
		],
	},
	{
		slug: 'how-to-fill-pdf-forms',
		title: 'How to Fill Out PDF Forms Without Printing (Complete Guide)',
		description:
			'Stop printing and scanning forms. Learn how to fill out PDF forms digitally on any device, save time, and submit applications instantly.',
		date: '2026-01-06',
		readTime: '9 min read',
		category: 'Tutorials',
		icon: FileText,
		featured: false,
		tags: [
			'fill pdf form',
			'fillable pdf',
			'pdf form filler',
			'complete pdf form',
		],
	},
	{
		slug: 'best-pdf-tools-privacy-security',
		title: 'Best PDF Tools for Privacy & Security (2026)',
		description:
			'Protect your sensitive documents with secure PDF tools. Learn which tools keep your files private and which ones expose your data to third parties.',
		date: '2026-01-05',
		readTime: '10 min read',
		category: 'Security',
		icon: Shield,
		featured: false,
		tags: [
			'pdf security',
			'privacy',
			'document security',
			'data protection',
		],
	},
	{
		slug: 'pdf-compression-reduce-file-size',
		title: 'PDF Compression: Reduce File Size Without Quality Loss',
		description:
			'Make your PDFs smaller while keeping them crisp. Learn the best compression methods, understand quality vs. size trade-offs, and discover tools that work.',
		date: '2026-01-05',
		readTime: '9 min read',
		category: 'Tutorials',
		icon: Zap,
		featured: false,
		tags: [
			'pdf compression',
			'reduce pdf size',
			'compress pdf',
			'optimize pdf',
		],
	},
	{
		slug: 'why-convert-to-pdf-before-splitting',
		title: "Why You Can't Split EPUBs Like PDFs (And What to Do Instead)",
		description:
			"EPUBs and other document formats can't be split like PDFs due to their fundamentally different structure. Learn why conversion to PDF is necessary and how to do it properly.",
		date: '2026-01-05',
		readTime: '7 min read',
		category: 'Tutorials',
		icon: FileText,
		featured: false,
		tags: ['epub', 'convert to pdf', 'file formats'],
	},
	{
		slug: 'how-to-merge-multiple-pdfs',
		title: 'How to Merge Multiple PDFs into One (Complete Guide 2026)',
		description:
			'Combine several PDF documents into a single file on Windows, Mac, or Linux. Learn the best methods, tools, and tips for merging PDFs quickly and securely.',
		date: '2026-01-05',
		readTime: '7 min read',
		category: 'Tutorials',
		icon: FileText,
		featured: false,
		tags: ['merge pdf', 'combine pdf', 'join pdf', 'tutorial'],
	},
	{
		slug: 'how-to-split-pdf-on-computer',
		title: 'How to Split a PDF on Your Computer (Complete Guide 2026)',
		description:
			'Learn every method to split PDFs on Windows, Mac, and Linux — from built-in tools to online options. Plus, discover the easiest way to do it in seconds.',
		date: '2026-01-05',
		readTime: '8 min read',
		category: 'Tutorials',
		icon: FileText,
		featured: false,
		tags: ['split pdf', 'windows', 'mac', 'tutorial'],
	},
	{
		slug: 'split-large-pdfs-for-email',
		title: 'How to Split Large PDFs for Email (Gmail & Outlook Limits)',
		description:
			'Learn how to split PDFs that are too large for email. Complete guide to Gmail and Outlook attachment limits, plus strategies to send large files via email.',
		date: '2026-01-05',
		readTime: '6 min read',
		category: 'Tutorials',
		icon: FileText,
		featured: false,
		tags: ['email', 'gmail', 'outlook', 'split pdf', 'file size'],
	},
	{
		slug: 'extract-pages-from-pdf-contract',
		title: 'How to Extract Specific Pages from a PDF Contract',
		description:
			'Learn how to extract specific pages from PDF contracts, legal documents, and business files. Secure, fast methods for lawyers, paralegals, and business professionals.',
		date: '2026-01-05',
		readTime: '7 min read',
		category: 'Business',
		icon: FileText,
		featured: false,
		tags: ['contracts', 'legal', 'business', 'extract pages'],
	},
	{
		slug: 'merge-scanned-documents-into-pdf',
		title: 'How to Merge Scanned Documents into One Searchable PDF',
		description:
			'Learn how to combine multiple scanned documents into a single PDF file. Perfect for digitizing paperwork, organizing receipts, and creating searchable document archives.',
		date: '2026-01-05',
		readTime: '8 min read',
		category: 'Productivity',
		icon: FileText,
		featured: false,
		tags: ['scanning', 'merge pdf', 'digitization', 'paperless'],
	},
	{
		slug: 'compress-pdfs-for-web-loading',
		title: 'How to Compress PDFs for Faster Website Loading',
		description:
			'Learn how to optimize PDFs for web performance. Reduce file sizes for faster page load times, better SEO, and improved user experience.',
		date: '2026-01-05',
		readTime: '9 min read',
		category: 'Web Development',
		icon: Zap,
		featured: false,
		tags: ['web optimization', 'performance', 'seo', 'compression'],
	},
	{
		slug: 'split-pdfs-for-printing',
		title: 'How to Split PDFs for Printing on Home Printers',
		description:
			'Learn how to split large PDFs into printable sections for home and office printers. Save on ink, avoid paper jams, and organize printed documents efficiently.',
		date: '2026-01-05',
		readTime: '8 min read',
		category: 'Productivity',
		icon: FileText,
		featured: false,
		tags: ['printing', 'home office', 'productivity', 'pdf splitting'],
	},
	{
		slug: 'hipaa-compliant-pdf-management-healthcare',
		title: 'HIPAA-Compliant PDF Management: Secure Tools for Healthcare',
		description:
			'Learn how to handle patient PDFs securely and maintain HIPAA compliance. Essential guide for healthcare professionals, medical offices, and hospitals on secure PDF management.',
		date: '2026-01-05',
		readTime: '11 min read',
		category: 'Healthcare',
		icon: Shield,
		featured: false,
		tags: ['healthcare', 'HIPAA', 'medical documents', 'patient privacy'],
	},
	{
		slug: 'teachers-split-merge-pdfs-student-assignments',
		title: 'How Teachers Can Split and Merge PDFs for Student Assignments',
		description:
			'Save hours on grading and assignment prep. Learn how teachers can use PDF tools to efficiently manage student work, create custom packets, and organize classroom documents.',
		date: '2026-01-05',
		readTime: '10 min read',
		category: 'Education',
		icon: FileText,
		featured: false,
		tags: ['teachers', 'education', 'grading', 'classroom management'],
	},
	{
		slug: 'legal-document-management-split-organize-case-files',
		title: 'Legal Document Management: Splitting and Organizing Case Files',
		description:
			'Essential guide for law firms and paralegals on managing PDF case files. Learn to split exhibits, organize discovery, and maintain attorney-client privilege securely.',
		date: '2026-01-05',
		readTime: '12 min read',
		category: 'Legal',
		icon: Shield,
		featured: false,
		tags: ['legal', 'law firms', 'paralegals', 'case management'],
	},
	{
		slug: 'real-estate-organize-property-pdfs-efficiently',
		title: 'Real Estate: How to Organize Property PDFs Efficiently',
		description:
			'Essential guide for realtors and real estate agents on managing listing documents, contracts, disclosures, and inspection reports. Streamline your property files and close deals faster.',
		date: '2026-01-05',
		readTime: '10 min read',
		category: 'Real Estate',
		icon: FileText,
		featured: false,
		tags: ['real estate', 'realtors', 'property management', 'listings'],
	},
	{
		slug: 'understanding-pdf-file-structure',
		title: 'Understanding PDF File Structure: Why Are Some PDFs So Large?',
		description:
			'Deep dive into PDF file structure and discover why some PDFs are massive while others are tiny. Learn what makes PDFs large and how to optimize them.',
		date: '2026-01-05',
		readTime: '10 min read',
		category: 'Technical',
		icon: FileText,
		featured: false,
		tags: ['pdf structure', 'file size', 'technical', 'optimization'],
	},
	{
		slug: 'what-happens-when-you-split-pdf',
		title: 'What Happens When You Split a PDF? (Technical Breakdown)',
		description:
			'Behind-the-scenes look at PDF splitting. Learn exactly what happens to your document when you extract pages, and why client-side processing protects your privacy.',
		date: '2026-01-05',
		readTime: '8 min read',
		category: 'Technical',
		icon: FileText,
		featured: false,
		tags: ['pdf splitting', 'technical', 'privacy', 'client-side'],
	},
	{
		slug: 'pdf-metadata-hidden-information',
		title: 'PDF Metadata: What Hidden Information Are You Sharing?',
		description:
			'Discover what hidden data lurks in PDF metadata. Learn what information PDFs reveal about you, how to view it, and how to remove sensitive metadata before sharing.',
		date: '2026-01-05',
		readTime: '9 min read',
		category: 'Privacy & Security',
		icon: Shield,
		featured: false,
		tags: ['metadata', 'privacy', 'security', 'hidden data'],
	},
	{
		slug: 'lossless-vs-lossy-pdf-compression',
		title: 'Lossless vs Lossy PDF Compression Explained',
		description:
			'Understand the difference between lossless and lossy PDF compression. Learn when to use each method, quality trade-offs, and how to choose the right compression for your needs.',
		date: '2026-01-05',
		readTime: '11 min read',
		category: 'Technical',
		icon: Zap,
		featured: false,
		tags: ['compression', 'lossless', 'lossy', 'technical', 'quality'],
	},
	{
		slug: 'online-vs-desktop-pdf-tools-security',
		title: 'Online PDF Tools vs Desktop Software: Which is More Secure?',
		description:
			'Compare the security of online PDF tools versus desktop software. Learn which option keeps your documents safer and when to use each type for maximum data protection.',
		date: '2026-01-05',
		readTime: '8 min read',
		category: 'Security',
		icon: Shield,
		featured: false,
		tags: [
			'pdf security',
			'online tools',
			'desktop software',
			'privacy comparison',
		],
	},
	{
		slug: 'free-vs-paid-pdf-tools',
		title: 'Free vs Paid PDF Tools: What You Actually Need',
		description:
			'Should you pay for PDF software or use free tools? Compare features, limitations, and value to find the right PDF solution for your needs without overspending.',
		date: '2026-01-05',
		readTime: '9 min read',
		category: 'Guides',
		icon: FileText,
		featured: false,
		tags: [
			'pdf tools comparison',
			'free pdf software',
			'paid pdf tools',
			'value comparison',
		],
	},
	{
		slug: 'browser-based-vs-installed-pdf-software',
		title: 'Browser-Based vs Installed PDF Software: Pros and Cons',
		description:
			'Compare browser-based PDF tools to installed desktop software. Discover the advantages and disadvantages of each approach to find the best solution for your workflow.',
		date: '2026-01-05',
		readTime: '8 min read',
		category: 'Guides',
		icon: FileText,
		featured: false,
		tags: [
			'browser pdf tools',
			'desktop pdf software',
			'pdf comparison',
			'web apps',
		],
	},
	{
		slug: '5-minute-pdf-workflow-split-organize-share',
		title: '5-Minute PDF Workflow: Split, Organize, and Share',
		description:
			'Master the essential PDF workflow in just 5 minutes. Learn how to quickly split PDFs, organize documents efficiently, and share files professionally with our step-by-step tutorial.',
		date: '2026-01-05',
		readTime: '6 min read',
		category: 'Tutorials',
		icon: Zap,
		featured: false,
		tags: ['pdf workflow', 'productivity', 'tutorial', 'quick guide'],
	},
	{
		slug: 'pdf-organization-remote-workers',
		title: 'PDF Organization Best Practices for Remote Workers',
		description:
			'Master PDF organization for remote work. Learn proven strategies for managing documents across devices, collaborating with teams, and staying productive from anywhere.',
		date: '2026-01-05',
		readTime: '10 min read',
		category: 'Productivity',
		icon: FileText,
		featured: false,
		tags: [
			'remote work',
			'pdf organization',
			'work from home',
			'document management',
		],
	},
	{
		slug: 'batch-process-multiple-pdfs',
		title: 'How to Batch Process Multiple PDFs at Once',
		description:
			'Master batch PDF processing to handle dozens of files simultaneously. Learn power user techniques, automation strategies, and tools to save hours of repetitive work.',
		date: '2026-01-05',
		readTime: '11 min read',
		category: 'Advanced',
		icon: Zap,
		featured: false,
		tags: [
			'batch processing',
			'pdf automation',
			'power user',
			'productivity',
		],
	},
];

export default function BlogIndex() {
	return (
		<div className='min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-indigo-50/30 dark:from-gray-900 dark:via-blue-950/20 dark:to-indigo-950/30'>
			<Header />

			<main className='container mx-auto px-4 py-12'>
				{/* Hero Section */}
				<div className='text-center mb-16'>
					<div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-sm font-medium mb-6'>
						<BookOpen className='h-4 w-4' />
						Free PDF Guides & Tutorials
					</div>
					<h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6'>
						Master Your{' '}
						<span className='bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>
							PDF Documents
						</span>
					</h1>
					<p className='text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto'>
						Step-by-step guides to help you split, merge, compress,
						and manage PDFs like a pro. No technical skills
						required.
					</p>
				</div>

				{/* Featured Post */}
				{blogPosts.filter((p) => p.featured).length > 0 && (
					<section className='mb-16'>
						<h2 className='text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide mb-6'>
							Featured Guide
						</h2>
						{blogPosts
							.filter((p) => p.featured)
							.map((post) => {
								const IconComponent = post.icon;
								return (
									<Link
										key={post.slug}
										href={`/blog/${post.slug}`}
										className='group block'>
										<article className='relative p-8 md:p-12 bg-gradient-to-br from-white to-blue-50/50 dark:from-gray-800 dark:to-blue-900/20 rounded-3xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all hover:shadow-2xl overflow-hidden'>
											{/* Background decoration */}
											<div className='absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2' />

											<div className='relative'>
												<div className='flex items-center gap-3 mb-4'>
													<div className='p-2.5 bg-blue-100 dark:bg-blue-900/50 rounded-xl'>
														<IconComponent className='h-6 w-6 text-blue-600 dark:text-blue-400' />
													</div>
													<span className='text-sm font-medium text-blue-600 dark:text-blue-400'>
														{post.category}
													</span>
												</div>

												<h3 className='text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors'>
													{post.title}
												</h3>

												<p className='text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-3xl'>
													{post.description}
												</p>

												<div className='flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400'>
													<div className='flex items-center gap-1.5'>
														<Calendar className='h-4 w-4' />
														<time
															dateTime={
																post.date
															}>
															{new Date(
																post.date
															).toLocaleDateString(
																'en-US',
																{
																	year: 'numeric',
																	month: 'long',
																	day: 'numeric',
																}
															)}
														</time>
													</div>
													<div className='flex items-center gap-1.5'>
														<Clock className='h-4 w-4' />
														<span>
															{post.readTime}
														</span>
													</div>
													<span className='ml-auto text-blue-600 dark:text-blue-400 font-medium flex items-center gap-1 group-hover:gap-2 transition-all'>
														Read guide{' '}
														<ArrowRight className='h-4 w-4' />
													</span>
												</div>
											</div>
										</article>
									</Link>
								);
							})}
					</section>
				)}

				{/* All Posts */}
				<section className='mb-16'>
					<h2 className='text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-6'>
						All Guides
					</h2>
					<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
						{blogPosts.map((post) => {
							const IconComponent = post.icon;
							return (
								<Link
									key={post.slug}
									href={`/blog/${post.slug}`}
									className='group'>
									<article className='h-full p-6 bg-white dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all hover:shadow-xl'>
										<div className='flex items-center gap-3 mb-4'>
											<div className='p-2 bg-gray-100 dark:bg-gray-700 rounded-lg group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-colors'>
												<IconComponent className='h-5 w-5 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors' />
											</div>
											<span className='text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide'>
												{post.category}
											</span>
										</div>

										<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2'>
											{post.title}
										</h3>

										<p className='text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2'>
											{post.description}
										</p>

										<div className='flex items-center gap-3 text-xs text-gray-500 dark:text-gray-500'>
											<span>{post.readTime}</span>
											<span>•</span>
											<time dateTime={post.date}>
												{new Date(
													post.date
												).toLocaleDateString('en-US', {
													month: 'short',
													day: 'numeric',
												})}
											</time>
										</div>
									</article>
								</Link>
							);
						})}
					</div>
				</section>

				{/* CTA */}
				<section className='text-center p-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl shadow-xl'>
					<h2 className='text-3xl font-bold text-white mb-4'>
						Ready to Edit Your PDF?
					</h2>
					<p className='text-blue-100 mb-8 text-lg max-w-xl mx-auto'>
						Skip the complicated tutorials. Just open your file,
						select pages, and download. It takes less than 30
						seconds.
					</p>
					<Link
						href='/'
						className='inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-colors shadow-lg'>
						Try PDF Wonder Kit Free →
					</Link>
				</section>
			</main>

			<Footer />
		</div>
	);
}
