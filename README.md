# PDF Wonder Kit - Complete PDF Toolkit

![License](https://img.shields.io/badge/License-MIT-blue.svg)
![Status](https://img.shields.io/badge/Status-Production%20Ready-green.svg)

A comprehensive **18-in-1 PDF toolkit** with everything you need to work with PDFs professionally. Split, merge, compress, protect, annotate, sign, and more—all with **100% client-side processing** for maximum privacy.

🔒 **Your files never leave your device** - Everything happens in your browser!

![PDF Wonder Kit Screenshot](assets/screentshot.png)

## 💰 Pricing

- **Free**: 3 PDFs/month, 25MB files, 3 page ranges
- **Premium**: $2/month or $20/year - Unlimited everything!

[View Pricing](https://www.pdfwonderkit.com/pricing)

## ✨ All 18 Tools Included

### 📄 Document Manipulation
1. **✂️ Split PDF** - Extract specific pages or split into multiple files
2. **📑 Merge PDF** - Combine multiple PDFs with drag-and-drop reordering
3. **🔄 Organize PDF** - Rotate, delete, and reorder pages with visual interface
4. **📖 Split by Bookmarks** - Auto-split chapters using PDF table of contents

### 🗜️ Compression & Optimization
5. **🗜️ Compress PDF** - Reduce file size with multiple quality levels (screen/ebook/print)
6. **🗑️ Remove Blank Pages** - Auto-detect and remove empty pages from scanned PDFs
7. **🔧 Repair PDF** - Fix corrupted or damaged PDF files

### 🔐 Security & Protection
8. **🔒 Password Protect** - AES-256 encryption with custom permissions
9. **🔓 Unlock PDF** - Remove passwords from PDFs you own
10. **💧 Watermark** - Add text or image watermarks with opacity control

### 📝 Editing & Annotation
11. **✏️ Annotate** - Highlights, text boxes, arrows, shapes, and freehand drawing
12. **✍️ Sign PDF** - Digital signatures (draw, type, or upload)
13. **📝 Fill Forms** - Complete interactive PDF forms online
14. **🔢 Page Numbers** - Add customizable numbering (1/i/A formats)
15. **ℹ️ Metadata Editor** - Edit title, author, keywords, and properties

### 🖼️ Conversion & OCR
16. **🖼️ Images to PDF** - Convert JPG/PNG/WebP to PDF with reordering
17. **📸 PDF to Images** - Export pages as high-quality JPG/PNG/WebP
18. **🔍 OCR** - Make scanned PDFs searchable (12+ languages, Tesseract.js)
19. **📊 Compare PDFs** - Visual diff and text comparison between documents

### Universal Features
- **Drag & Drop Upload**: Seamless file upload with visual feedback and validation
- **Page Thumbnails**: Infinite scroll grid view with optimized loading
- **Batch Processing**: Process multiple files simultaneously with progress tracking
- **Smart Downloads**: Individual PDF files or bulk ZIP archives (Premium)

### 🔒 Privacy & Security (Our #1 Feature!)
- **100% Client-Side Processing**: PDFs never uploaded - everything happens in YOUR browser
- **Zero Server Storage**: We literally cannot access your files - it's technically impossible
- **Rate Limiting**: Upload and slicing rate limits to prevent abuse
- **File Validation**: Size, type, and content security checks
- **Memory Management**: Browser memory monitoring and limits
- **Ohio Law Compliant**: ODPA, NIST framework, CPI protection

### 💳 Subscription & Authentication
- **User Accounts**: Secure authentication via Clerk
- **Free Tier**: 3 PDFs/month, 25MB files, 3 page ranges
- **Premium Tier**: Unlimited PDFs, 100MB files, unlimited ranges
- **Stripe Payments**: Secure checkout and billing management
- **Usage Tracking**: Real-time monthly usage display
- **Auto-Upgrades**: Seamless tier transitions

### User Experience
- **Responsive Design**: Modern UI that works on all devices
- **Progress Tracking**: Real-time slicing progress with detailed feedback
- **Infinite Scroll**: Smooth thumbnail loading without manual pagination
- **Dark Mode Ready**: Clean, professional interface
- **Accessibility**: Keyboard navigation and screen reader support
- **User Dashboard**: Track usage and manage subscription

## 🚀 Tech Stack

### Frontend
- **Next.js 14** (React 18 + TypeScript)
- **Tailwind CSS v4** for modern, responsive styling
- **PDF.js** for PDF rendering and thumbnail generation
- **pdf-lib** for PDF manipulation and slicing
- **JSZip** for ZIP archive creation

### Authentication & Payments
- **Clerk** for user authentication and management
- **Stripe** for subscription billing and payments
- **Webhooks** for real-time subscription updates

### Security & Performance
- **Client-side processing** (PDFs never leave your browser!)
- **Web Workers** for non-blocking PDF rendering
- **In-memory blob storage** for temporary file persistence
- **Rate limiting** and validation for security
- **Memory monitoring** to prevent browser crashes
- **NIST Framework** security standards (Ohio ODPA compliant)

## 📦 Quick Start

### For Users
Visit [www.pdfwonderkit.com](https://www.pdfwonderkit.com) and start working with your PDFs!

### For Developers

```bash
# Clone the repository
git clone https://github.com/JaceG/pdf-wonder-kit.git
cd pdf-epub-slicer

# Install dependencies
cd frontend
npm install

# Set up environment variables (see documentation)
cp .env.example .env
# Add your Clerk and Stripe keys

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

📚 **Full Setup Guide**: See `/markdown/QUICK_START.md` for complete setup instructions including Clerk and Stripe configuration.

## 🎯 Usage

### Simple 3-Step Process
1. **Choose Tool**: Select from 18+ PDF tools based on your needs
2. **Upload**: Drag & drop your PDF file(s) (Free: 25MB, Premium: 100MB)
3. **Process & Download**: Apply changes and download instantly

### Popular Workflows
- **Split Document**: Upload → Select pages → Split → Download
- **Merge Files**: Upload multiple → Reorder → Merge → Download
- **Compress PDF**: Upload → Choose quality → Compress → Download
- **Sign Document**: Upload → Draw/type signature → Place → Download
- **OCR Scan**: Upload scanned PDF → Select language → Process → Download searchable PDF

### Free vs Premium

| Feature | Free | Premium ($2/mo) |
|---------|------|-----------------|
| PDFs per month | 3 | Unlimited ♾️ |
| File size | 25MB | 100MB |
| Page ranges | 3 | Unlimited ♾️ |
| ZIP downloads | ❌ | ✅ |
| No ads | ❌ | ✅ |
| Priority processing | ❌ | ✅ |

### Privacy Guarantee
- 🔒 **Your PDFs NEVER leave your device**
- 🔒 **All processing happens in your browser**
- 🔒 **We cannot access, read, or store your documents**
- 🔒 **This is how our technology works - not just a policy!**

## 🔧 Configuration

### Security Limits (Built-in)
- **File Size**: 50MB maximum per PDF
- **Upload Rate**: 5 uploads per minute
- **Slice Rate**: 10 slicing operations per minute  
- **Memory Limit**: 500MB browser memory usage
- **Page Range**: Maximum 100 pages per slice

### Supported Formats
- **PDF**: Any standard PDF file (version 1.0-2.0)
- **File Types**: `.pdf` files only

## 🚀 Deployment

### Render.com (Recommended)
The app is optimized for Render deployment:

```bash
# Build command
npm run build

# Start command  
npm start
```

### Other Platforms
Works on any Node.js hosting platform:
- Vercel
- Netlify
- Heroku
- AWS
- Docker

## 🛠️ Development

### Project Structure
```
pdf-epub-slicer/
├── frontend/
│   ├── app/
│   │   ├── api/                 # API routes (Stripe, webhooks)
│   │   ├── dashboard/           # User dashboard
│   │   ├── pricing/             # Pricing page
│   │   ├── terms/               # Terms of Service
│   │   ├── privacy/             # Privacy Policy
│   │   ├── sign-in/             # Authentication pages
│   │   └── sign-up/
│   ├── components/
│   │   ├── subscription/        # Usage tracking, upgrade prompts
│   │   ├── upload/              # File upload & validation
│   │   ├── viewer/              # PDF viewer & thumbnails
│   │   ├── slicer/              # Page selection & slicing
│   │   └── ui/                  # Shared UI components
│   ├── lib/
│   │   ├── pdf/                 # PDF processing & rendering
│   │   ├── subscription/        # Subscription logic & hooks
│   │   ├── security/            # Security & rate limiting
│   │   └── utils/               # Utilities & validation
│   ├── middleware.ts            # Clerk auth middleware
│   └── scripts/                 # Stripe setup scripts
└── markdown/                     # Documentation
    ├── QUICK_START.md           # Setup guide
    ├── MONETIZATION.md          # Business strategy
    ├── OHIO_LEGAL_PROTECTIONS.md
    └── IMPLEMENTATION_SUMMARY.md
```

### Key Components
- `DocumentViewer`: PDF preview with infinite scroll thumbnails
- `FileUpload`: Drag & drop with security validation
- `PageSelector`: Visual page range selection interface
- `SliceManager`: Task management, progress tracking & downloads
- `UsageBanner`: Monthly usage warnings for free users
- `UpgradePrompt`: Contextual upgrade suggestions
- `Dashboard`: User account and subscription management

## 📚 Documentation

- **[QUICK_START.md](/markdown/QUICK_START.md)** - Get started in 5 minutes
- **[IMPLEMENTATION_SUMMARY.md](/markdown/IMPLEMENTATION_SUMMARY.md)** - Complete technical overview
- **[MONETIZATION.md](/markdown/MONETIZATION.md)** - Business model and growth strategy
- **[OHIO_LEGAL_PROTECTIONS.md](/markdown/OHIO_LEGAL_PROTECTIONS.md)** - Legal compliance details

## ⚖️ Legal

- **Terms of Service**: [/terms](https://www.pdfwonderkit.com/terms)
- **Privacy Policy**: [/privacy](https://www.pdfwonderkit.com/privacy)
- **Jurisdiction**: Columbus, Ohio, USA
- **Contact**: admin@pdfwonderkit.com

## 🔮 Roadmap

- [x] 18+ PDF tools implemented
- [x] OCR for scanned documents (12+ languages)
- [x] Merge, split, compress PDFs
- [x] Digital signatures and form filling
- [ ] API access for developers
- [ ] Desktop app (Electron)
- [ ] Advanced batch file processing
- [ ] Team workspaces & collaboration

## 📊 Stats

- **Revenue Model**: Freemium SaaS ($2/month)
- **Tech Stack**: Next.js + Clerk + Stripe
- **Privacy**: 100% client-side processing
- **Compliance**: Ohio ODPA, NIST framework
- **Deployment**: Render.com

## 📝 License

MIT License - see LICENSE file for details.

## 🤝 Contributing

Pull requests welcome! Please read the development guidelines in `/markdown/PROJECT_PROMPT.md`.

For bugs or feature requests, please open an issue on GitHub.

---

**Made with ❤️ in Columbus, Ohio**

[Visit PDF Wonder Kit](https://www.pdfwonderkit.com) | [Report Issue](https://github.com/JaceG/pdf-wonder-kit/issues) | [Contact Us](mailto:admin@pdfwonderkit.com)