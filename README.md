# PDF/EPUB Slicer

A modern, browser-based application for extracting chapters and page ranges from PDF and EPUB documents. Split your files into smaller, manageable pieces with an intuitive drag-and-drop interface.

## ✨ Features

### PDF Support
- **Drag & Drop Upload**: Seamless file upload with visual feedback
- **Page Thumbnails**: Infinite scroll grid view of all pages
- **Visual Page Selection**: Click pages to set start/end ranges
- **Range Management**: Add multiple page ranges with preview
- **Batch Processing**: Slice multiple ranges simultaneously
- **ZIP Downloads**: Download individual files or bulk ZIP archives

### EPUB Support
- **Chapter Navigation**: Split-view interface with chapter list and reader
- **Smart Chapter Detection**: Uses table of contents for accurate extraction
- **Range Selection**: Quick select options (All, First Half, Second Half)
- **Chapter Preview**: Read chapter content before slicing
- **Metadata Preservation**: Maintains chapter titles and structure

### Universal Features
- **In-Memory Processing**: No server storage - everything happens in your browser
- **Progress Tracking**: Real-time slicing progress indicators
- **Multiple Downloads**: Individual chapter/page downloads or bulk ZIP
- **Dark Mode Support**: Responsive design with modern UI
- **Error Handling**: Graceful fallbacks and user-friendly error messages

## 🚀 Tech Stack

### Frontend
- **Next.js 14** (React 18 + TypeScript)
- **Tailwind CSS v4** for modern styling
- **PDF.js** for PDF rendering and thumbnails
- **epub.js** for EPUB parsing and display
- **pdf-lib** for PDF manipulation
- **JSZip & fflate** for archive creation

### Processing
- **Client-side processing** (no server required)
- **Web Workers** for PDF rendering
- **In-memory blob storage** for file persistence
- **Incremental slicing** (only processes new ranges)

## 📦 Installation

```bash
# Clone the repository
git clone <repository-url>
cd pdf-epub-slicer

# Install dependencies
cd frontend
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎯 Usage

### PDF Workflow
1. **Upload**: Drag & drop a PDF file
2. **Preview**: Browse page thumbnails in grid view
3. **Select**: Click start page, then end page to create ranges
4. **Slice**: Process selected ranges into separate PDF files
5. **Download**: Get individual files or a ZIP archive

### EPUB Workflow
1. **Upload**: Drag & drop an EPUB file
2. **Navigate**: Browse chapters in the split-view interface
3. **Select**: Choose chapter ranges using quick select or manual range
4. **Slice**: Extract chapters into separate EPUB files
5. **Download**: Get individual chapters or bulk download

## 🔧 Configuration

### Environment Variables
```bash
# Optional: Customize build settings
NEXT_PUBLIC_MAX_FILE_SIZE=50000000  # 50MB default
```

### Supported Formats
- **PDF**: Any standard PDF file
- **EPUB**: EPUB 2.0 and 3.0 formats

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
├── frontend/                 # Next.js application
│   ├── app/                 # App router pages
│   ├── components/          # React components
│   │   ├── upload/         # File upload components
│   │   ├── viewer/         # Document viewers
│   │   ├── slicer/         # Slicing interface
│   │   └── ui/             # Shared UI components
│   ├── lib/                # Core libraries
│   │   ├── pdf/            # PDF processing
│   │   ├── epub/           # EPUB processing
│   │   └── utils/          # Utilities
│   └── types/              # TypeScript definitions
├── backend/                 # Future API routes
└── shared/                 # Shared utilities
```

### Key Components
- `DocumentViewer`: PDF/EPUB preview interface
- `FileUpload`: Drag & drop file handling  
- `PageSelector`: Range selection for PDFs
- `EPUBSelector`: Chapter selection for EPUBs
- `SliceManager`: Task management and downloads

## 🔮 Future Plans
- **Desktop App**: Electron version for offline use
- **Advanced Features**: Password-protected PDFs, OCR text extraction
- **Cloud Storage**: Integration with Google Drive, Dropbox
- **Batch Processing**: Multiple file uploads
- **Custom Styling**: User themes and preferences

## 📝 License
MIT License - see LICENSE file for details.

## 🤝 Contributing
Pull requests welcome! Please read the development guidelines in `PROJECT_PROMPT.md`.