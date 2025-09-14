#!/usr/bin/env node

/**
 * Generate manifest.json with dynamic theme colors based on globals.css
 * This ensures the manifest always uses the current theme colors
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
const lightBackground = extractColor(globalsContent, 'background', 'light');
const darkPrimary = extractColor(globalsContent, 'primary', 'dark');
const darkBackground = extractColor(globalsContent, 'background', 'dark');

// Convert OKLCH to hex for manifest compatibility using culori
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

const lightThemeColor = oklchToHex(lightPrimary || 'oklch(0.205 0 0)');
const lightBackgroundColor = oklchToHex(lightBackground || 'oklch(1 0 0)');
const darkThemeColor = oklchToHex(darkPrimary || 'oklch(0.922 0 0)');
const darkBackgroundColor = oklchToHex(darkBackground || 'oklch(0.0 0 0)');

console.log(`📊 Extracted colors from globals.css:`);
console.log(`   Light Primary: ${lightPrimary} → ${lightThemeColor}`);
console.log(`   Light Background: ${lightBackground} → ${lightBackgroundColor}`);
console.log(`   Dark Primary: ${darkPrimary} → ${darkThemeColor}`);
console.log(`   Dark Background: ${darkBackground} → ${darkBackgroundColor}`);

// Generate manifest.json with theme support
const manifest = {
  name: "shadcn/ui App",
  short_name: "shadcn App",
  description: "A modern React application with beautiful UI components",
  start_url: "/",
  display: "standalone",
  background_color: lightBackgroundColor, // Default to light theme
  theme_color: lightThemeColor, // Default to light theme
  // Theme colors for different color schemes (experimental support)
  theme_colors: [
    {
      color: lightThemeColor,
      media: "(prefers-color-scheme: light)"
    },
    {
      color: darkThemeColor,
      media: "(prefers-color-scheme: dark)"
    }
  ],
  orientation: "portrait-primary",
  scope: "/",
  lang: "en",
  categories: ["productivity", "utilities"],
  icons: [
    {
      src: "/icon.svg",
      sizes: "any",
      type: "image/svg+xml",
      purpose: "maskable any"
    },
    {
      src: "/icon.svg",
      sizes: "192x192",
      type: "image/svg+xml",
      purpose: "maskable any"
    },
    {
      src: "/icon.svg",
      sizes: "512x512",
      type: "image/svg+xml",
      purpose: "maskable any"
    }
  ],
  shortcuts: [
    {
      name: "Components",
      short_name: "Components",
      description: "View all available components",
      url: "/components",
      icons: [
        {
          src: "/icon.svg",
          sizes: "192x192"
        }
      ]
    },
    {
      name: "Fullscreen Demo",
      short_name: "Fullscreen",
      description: "Test fullscreen viewport functionality",
      url: "/components/fullscreen-viewport",
      icons: [
        {
          src: "/icon.svg",
          sizes: "192x192"
        }
      ]
    }
  ]
};

// Write manifest.json
const manifestPath = path.join(__dirname, '../public/manifest.json');
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

console.log(`✅ Generated manifest.json with light theme_color: ${lightThemeColor}`);
console.log(`✅ Generated manifest.json with dark theme_color: ${darkThemeColor}`);
console.log(`✅ Generated manifest.json with background_color: ${lightBackgroundColor}`);
