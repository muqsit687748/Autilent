#!/bin/bash
# Build the Next.js app
npm run build

# Copy static assets to the build output
cp -r public/* .next/static/
