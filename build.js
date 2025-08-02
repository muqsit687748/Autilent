const { execSync } = require('child_process');
const fs = require('fs-extra');
const path = require('path');

console.log('Building Next.js app...');
execSync('next build', { stdio: 'inherit' });

console.log('Copying static assets...');
const publicDir = path.join(__dirname, 'public');
const nextDir = path.join(__dirname, '.next');

// Copy public folder contents to .next/static
if (fs.existsSync(publicDir)) {
  fs.copySync(publicDir, path.join(nextDir, 'static'));
  console.log('Static assets copied successfully!');
} else {
  console.log('Public directory not found!');
}

console.log('Build completed successfully!');