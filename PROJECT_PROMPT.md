# PDF/EPUB Slicer App - Development Prompt

## Project Overview
This is a browser-based application for slicing PDF and EPUB files by page ranges, designed to be portable to desktop apps later (Mac, PC, Linux) using Electron.

## Core Features Needed
1. **File Upload**: Allow users to upload PDF or EPUB files from their computer
2. **File Viewer**: Display the uploaded file with page thumbnails/preview
3. **Page Selection**: Interface to select start page and end page for slicing
4. **File Slicing**: Extract selected page ranges into new files
5. **Download**: Allow users to download the newly created sliced files
6. **Chapter Management**: Organize and manage multiple sliced sections

## Technical Stack
- **Frontend**: Next.js (React) with TypeScript
- **Backend**: Node.js API routes (Next.js API)
- **PDF Processing**: pdf-lib for manipulation, PDF.js for viewing
- **EPUB Processing**: epub.js for viewing, node-epub for manipulation
- **UI Framework**: Tailwind CSS for modern, responsive design
- **File Handling**: Native browser File API + Node.js fs for processing
- **Future Desktop**: Electron wrapper (not needed initially)

## Key Requirements
- Modern, intuitive UI with drag-and-drop file upload
- Real-time preview of selected page ranges
- Support for both PDF and EPUB formats
- Efficient handling of large files
- Clean, maintainable code structure
- Responsive design that works on desktop and tablet

## Project Structure
```
pdf-epub-slicer/
├── frontend/          # Next.js React app
├── backend/           # Node.js processing utilities
├── shared/            # Common types and utilities
└── PROJECT_PROMPT.md  # This file
```

## Development Tasks
1. Set up Next.js project with TypeScript and Tailwind CSS
2. Create file upload component with drag-and-drop
3. Implement PDF viewer using PDF.js
4. Implement EPUB viewer using epub.js
5. Build page selection interface
6. Create backend API for file processing
7. Implement PDF slicing using pdf-lib
8. Implement EPUB slicing logic
9. Add download functionality
10. Polish UI/UX and add error handling

## Getting Started Instructions
Please help me build this application step by step. Start by:
1. Setting up the Next.js project in the frontend folder
2. Installing necessary dependencies for PDF/EPUB handling
3. Creating the basic project structure and initial components
4. Building the file upload and viewer functionality first

Focus on creating a clean, modern interface that's easy to use and handles errors gracefully. The app should feel professional and intuitive for users who want to slice documents into chapters or sections.