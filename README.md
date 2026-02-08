# Pick & Print

A kid-friendly web app for browsing action figure and football card images, picking favorites, and generating printable pages. Deploys as a static site to GitHub Pages.

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:5173/Print/

## Demo Mode

Set `DEMO_MODE = true` in `src/config.js` to use placeholder images without API keys.

To use real Google image search, set your keys in `src/config.js`:

```js
export const GOOGLE_API_KEY = 'your_key_here';
export const GOOGLE_SEARCH_ENGINE_ID = 'your_cx_here';
export const DEMO_MODE = false;
```

## Deploy to GitHub Pages

Push to main and enable GitHub Pages (Settings > Pages > Source: GitHub Actions), or manually:

```bash
npm run build
```

Then deploy the `dist/` folder.

## How It Works

1. **Search** — Type what you're looking for (e.g. "Patrick Mahomes football card")
2. **Pick** — Click the green "Pick This!" button on images you like (4-8 per page)
3. **Print** — Hit "Make My Page!" to generate a print-ready layout, then print or save as PDF
