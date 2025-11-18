# Social Media Icons

This directory should contain PNG versions of the social media icons for email compatibility.

## Required Files

Place the following PNG files (24x24 pixels) in this directory:

- `facebook.png`
- `twitter.png`
- `instagram.png`
- `linkedin.png`
- `youtube.png`
- `tiktok.png`
- `discord.png`
- `github.png`

## Generating the Icons

### Option 1: Using the Script (Recommended)

1. Install sharp: `pnpm add -D sharp`
2. Run the script: `node scripts/generate-social-icons.js`

### Option 2: Manual Conversion

1. Copy the SVG code from `src/lib/social-icons.tsx`
2. Use an online converter
3. Convert each SVG to a 24x24 PNG
4. Save them in this directory with the names listed above

## Icon Specifications

- **Size**: 24x24 pixels
- **Format**: PNG
- **Color**: #8898aa (gray)
- **Background**: Transparent

