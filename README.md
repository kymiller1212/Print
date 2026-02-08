# Pick & Print

A kid-friendly web app for browsing action figure and football card images, picking favorites, and generating printable pages.

## Quick Start

```bash
npm install
npm run dev
```

This starts both the Vite dev server (port 5173) and the Express API server (port 3001). Open http://localhost:5173.

## Demo Mode

By default, the app runs in **demo mode** with placeholder images — no API keys needed. To use real Google image search:

1. Get a [Google Custom Search API key](https://developers.google.com/custom-search/v1/overview)
2. Create a [Programmable Search Engine](https://programmablesearchengine.google.com/) (enable "Search the entire web" and "Image search")
3. Copy `.env.example` to `.env` and fill in your keys:

```
GOOGLE_API_KEY=your_key_here
GOOGLE_SEARCH_ENGINE_ID=your_cx_here
DEMO_MODE=false
```

4. Restart the server

## Production Build

```bash
npm start
```

Builds the React frontend and serves everything from the Express server on port 3001.

## How It Works

1. **Search** — Type what you're looking for (e.g. "Patrick Mahomes football card")
2. **Pick** — Click the green "Pick This!" button on images you like (4-8 per page)
3. **Print** — Hit "Make My Page!" to generate a print-ready layout, then print or save as PDF
