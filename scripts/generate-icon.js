#!/usr/bin/env node

/**
 * Generate icon.svg with dynamic theme colors based on globals.css
 * This ensures the icon always uses the current theme colors
 */

import fs from 'fs';
import path from 'path';
import { formatHex, parse } from 'culori';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read globals.css to extract theme colors
const globalsPath = path.join(__dirname, '../src/app/globals.css');
const globalsContent = fs.readFileSync(globalsPath, 'utf8');

// Extract colors from CSS custom properties
const extractColor = (cssContent, property, theme = 'light') => {
  let regex;
  if (theme === 'dark') {
    regex = new RegExp(`\\.dark\\s*{[\\s\\S]*?--${property}:\\s*([^;]+);`);
  } else {
    regex = new RegExp(`:root\\s*{[\\s\\S]*?--${property}:\\s*([^;]+);`);
  }
  const match = cssContent.match(regex);
  return match ? match[1].trim() : null;
};

// Extract primary colors for both themes
const lightPrimary = extractColor(globalsContent, 'primary', 'light');
const darkPrimary = extractColor(globalsContent, 'primary', 'dark');

// Convert OKLCH to hex for SVG compatibility using culori
const oklchToHex = (oklch) => {
  try {
    // Parse the OKLCH color string
    const color = parse(oklch);
    if (color) {
      // Convert to hex format
      return formatHex(color);
    }
  } catch (error) {
    console.warn(`Failed to parse OKLCH color: ${oklch}`, error.message);
  }
  
  // Fallback to default shadcn primary color
  return '#0a0a0a';
};

const primaryColor = oklchToHex(lightPrimary || 'oklch(0.205 0 0)');

console.log(`📊 Extracted colors from globals.css:`);
console.log(`   Light Primary: ${lightPrimary} → ${primaryColor}`);
console.log(`   Dark Primary: ${darkPrimary} → ${oklchToHex(darkPrimary || 'oklch(0.922 0 0)')}`);

// Generate SVG icon
const svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" rx="20" fill="${primaryColor}"/>
  <rect x="20" y="20" width="60" height="60" rx="10" fill="white"/>
  <rect x="30" y="30" width="40" height="8" rx="4" fill="${primaryColor}"/>
  <rect x="30" y="45" width="30" height="6" rx="3" fill="${primaryColor}"/>
  <rect x="30" y="55" width="35" height="6" rx="3" fill="${primaryColor}"/>
  <rect x="30" y="65" width="25" height="6" rx="3" fill="${primaryColor}"/>
</svg>`;

// Write icon.svg
const iconPath = path.join(__dirname, '../public/icon.svg');
fs.writeFileSync(iconPath, svgIcon);

console.log(`✅ Generated icon.svg with primary color: ${primaryColor}`);
