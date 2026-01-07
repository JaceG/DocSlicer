#!/bin/bash
# Fix Next.js build issues by cleaning cache and rebuilding

echo "🧹 Cleaning Next.js cache..."
rm -rf .next
rm -rf node_modules/.cache
npm cache clean --force

echo "📦 Installing dependencies..."
npm install

echo "🔨 Building application..."
npm run build

echo "✅ Done! You can now run 'npm run dev'"
