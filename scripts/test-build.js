#!/usr/bin/env node

/**
 * Test build script to verify the application builds correctly
 * This mimics the GitHub Actions build process locally
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🚀 Starting build test...\n');

try {
  // Step 1: Install dependencies
  console.log('📦 Installing dependencies...');
  execSync('npm ci --legacy-peer-deps', { stdio: 'inherit' });
  console.log('✅ Dependencies installed\n');

  // Step 2: Run linter
  console.log('🔍 Running linter...');
  execSync('npm run lint', { stdio: 'inherit' });
  console.log('✅ Linting passed\n');

  // Step 3: Build application
  console.log('🏗️  Building application...');
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build completed\n');

  // Step 4: Check build output
  const nextDir = path.join(process.cwd(), '.next');
  if (fs.existsSync(nextDir)) {
    console.log('📁 Build output verified');
    console.log('✅ Build test completed successfully!');
  } else {
    throw new Error('Build output directory not found');
  }

} catch (error) {
  console.error('❌ Build test failed:', error.message);
  process.exit(1);
}
