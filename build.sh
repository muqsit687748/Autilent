#!/bin/bash
set -e

echo "Building Next.js app..."
npm run build

echo "Copying static assets..."
# Create static directory if it doesn't exist
mkdir -p .next/static

# Copy static assets with error handling
if [ -d "public/images" ]; then
    cp -r public/images .next/static/ || echo "Warning: Could not copy images"
fi

if [ -d "public/logos" ]; then
    cp -r public/logos .next/static/ || echo "Warning: Could not copy logos"
fi

if [ -d "public/icons" ]; then
    cp -r public/icons .next/static/ || echo "Warning: Could not copy icons"
fi

echo "Build completed successfully!"