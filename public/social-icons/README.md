# Social Media Icons

This directory contains PNG versions of the social media icons for email compatibility. These icons are used in the footer of club emails.

## Required Files

The following PNG files (20x20 pixels) should be available:

- `facebook.png`
- `twitter.png`
- `instagram.png`
- `linkedin.png`
- `youtube.png`
- `tiktok.png`
- `discord.png`
- `github.png`

## Generating the Icons

### Option 1: Upload to R2 (Recommended)

For production use, it's recommended to upload the icons to Cloudflare R2 for better email delivery reliability and CDN performance.

1. Ensure R2 environment variables are set in your `.env` file:
   - `R2_ACCOUNT_ID`
   - `R2_ACCESS_KEY_ID`
   - `R2_SECRET_ACCESS_KEY`
   - `R2_BUCKET_NAME`
   - `R2_PUBLIC_URL` (optional, for custom CDN URL)

2. Run the script with the `--r2` flag:
   ```bash
   node scripts/generate-social-icons.js --r2
   ```

   The script will:
   - Generate 20x20 PNG icons from SVGs
   - Upload them to R2 with the key `social-icons/{platform}.png`
   - Display the URLs for each uploaded icon

### Option 2: Save to Public Folder

For local development or Vercel deployment, you can save the icons to the `public/social-icons/` directory:

```bash
node scripts/generate-social-icons.js
```

The icons will be saved to `public/social-icons/` and served from your Next.js app.

### Option 3: Manual Conversion

If you prefer to convert manually:

1. Copy the SVG code from `src/lib/social-icons.tsx`
2. Use an online converter or image editor
3. Convert each SVG to a 20x20 PNG
4. Save them in this directory (or upload to R2) with the names listed above

## Icon Specifications

- **Size**: 20x20 pixels
- **Format**: PNG
- **Color**: #8898aa (gray)
- **Background**: Transparent

## Dependencies

The script uses the following dependencies (already installed as dev dependencies):
- `sharp` - For SVG to PNG conversion
- `dotenv` - For loading environment variables from `.env` file

No additional installation is required.

