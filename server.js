import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Demo mode image sets — curated placeholder images for offline/keyless use
const DEMO_IMAGES = {
  football: [
    { title: 'Patrick Mahomes Rookie Card', url: 'https://picsum.photos/seed/mahomes1/400/560' },
    { title: 'Mahomes MVP Card', url: 'https://picsum.photos/seed/mahomes2/400/560' },
    { title: 'Mahomes Prizm Card', url: 'https://picsum.photos/seed/mahomes3/400/560' },
    { title: 'Mahomes Mosaic Card', url: 'https://picsum.photos/seed/mahomes4/400/560' },
    { title: 'Mahomes Select Card', url: 'https://picsum.photos/seed/mahomes5/400/560' },
    { title: 'Josh Allen Card', url: 'https://picsum.photos/seed/allen1/400/560' },
    { title: 'Josh Allen Prizm', url: 'https://picsum.photos/seed/allen2/400/560' },
    { title: 'Lamar Jackson Card', url: 'https://picsum.photos/seed/lamar1/400/560' },
    { title: 'Lamar Jackson MVP', url: 'https://picsum.photos/seed/lamar2/400/560' },
    { title: 'Travis Kelce Card', url: 'https://picsum.photos/seed/kelce1/400/560' },
    { title: 'Tyreek Hill Card', url: 'https://picsum.photos/seed/hill1/400/560' },
    { title: 'Jalen Hurts Card', url: 'https://picsum.photos/seed/hurts1/400/560' },
    { title: 'CeeDee Lamb Card', url: 'https://picsum.photos/seed/lamb1/400/560' },
    { title: 'Justin Jefferson Card', url: 'https://picsum.photos/seed/jefferson1/400/560' },
    { title: 'Joe Burrow Card', url: 'https://picsum.photos/seed/burrow1/400/560' },
    { title: 'Brock Purdy Card', url: 'https://picsum.photos/seed/purdy1/400/560' },
  ],
  spiderman: [
    { title: 'Spider-Man Action Figure', url: 'https://picsum.photos/seed/spidey1/400/400' },
    { title: 'Spider-Man Legends', url: 'https://picsum.photos/seed/spidey2/400/400' },
    { title: 'Miles Morales Figure', url: 'https://picsum.photos/seed/miles1/400/400' },
    { title: 'Spider-Man Titan Hero', url: 'https://picsum.photos/seed/spidey3/400/400' },
    { title: 'Spider-Man 2099', url: 'https://picsum.photos/seed/spidey4/400/400' },
    { title: 'Spider-Gwen Figure', url: 'https://picsum.photos/seed/gwen1/400/400' },
    { title: 'Venom Action Figure', url: 'https://picsum.photos/seed/venom1/400/400' },
    { title: 'Spider-Man Noir', url: 'https://picsum.photos/seed/noir1/400/400' },
    { title: 'Iron Spider Figure', url: 'https://picsum.photos/seed/ironspider1/400/400' },
    { title: 'Spider-Man Classic', url: 'https://picsum.photos/seed/spidey5/400/400' },
    { title: 'Spider-Man Stealth Suit', url: 'https://picsum.photos/seed/stealth1/400/400' },
    { title: 'Carnage Figure', url: 'https://picsum.photos/seed/carnage1/400/400' },
    { title: 'Spider-Man Homecoming', url: 'https://picsum.photos/seed/homec1/400/400' },
    { title: 'Spider-Man No Way Home', url: 'https://picsum.photos/seed/nwh1/400/400' },
    { title: 'Green Goblin Figure', url: 'https://picsum.photos/seed/goblin1/400/400' },
    { title: 'Doc Ock Figure', url: 'https://picsum.photos/seed/dock1/400/400' },
  ],
  batman: [
    { title: 'Batman Action Figure', url: 'https://picsum.photos/seed/batman1/400/400' },
    { title: 'Batman Armored', url: 'https://picsum.photos/seed/batman2/400/400' },
    { title: 'Batman Beyond', url: 'https://picsum.photos/seed/batman3/400/400' },
    { title: 'Robin Figure', url: 'https://picsum.photos/seed/robin1/400/400' },
    { title: 'Joker Figure', url: 'https://picsum.photos/seed/joker1/400/400' },
    { title: 'Batmobile Toy', url: 'https://picsum.photos/seed/batmobile1/400/400' },
    { title: 'Batman Legends', url: 'https://picsum.photos/seed/batman4/400/400' },
    { title: 'Catwoman Figure', url: 'https://picsum.photos/seed/catwoman1/400/400' },
    { title: 'Nightwing Figure', url: 'https://picsum.photos/seed/nightwing1/400/400' },
    { title: 'Batman Dark Knight', url: 'https://picsum.photos/seed/dk1/400/400' },
    { title: 'Mr. Freeze Figure', url: 'https://picsum.photos/seed/freeze1/400/400' },
    { title: 'Bane Figure', url: 'https://picsum.photos/seed/bane1/400/400' },
    { title: 'Harley Quinn Figure', url: 'https://picsum.photos/seed/harley1/400/400' },
    { title: 'Batman Classic', url: 'https://picsum.photos/seed/batman5/400/400' },
    { title: 'Penguin Figure', url: 'https://picsum.photos/seed/penguin1/400/400' },
    { title: 'Riddler Figure', url: 'https://picsum.photos/seed/riddler1/400/400' },
  ],
  default: [
    { title: 'Action Hero 1', url: 'https://picsum.photos/seed/hero1/400/400' },
    { title: 'Action Hero 2', url: 'https://picsum.photos/seed/hero2/400/400' },
    { title: 'Action Hero 3', url: 'https://picsum.photos/seed/hero3/400/400' },
    { title: 'Trading Card 1', url: 'https://picsum.photos/seed/card1/400/560' },
    { title: 'Trading Card 2', url: 'https://picsum.photos/seed/card2/400/560' },
    { title: 'Trading Card 3', url: 'https://picsum.photos/seed/card3/400/560' },
    { title: 'Cool Toy 1', url: 'https://picsum.photos/seed/toy1/400/400' },
    { title: 'Cool Toy 2', url: 'https://picsum.photos/seed/toy2/400/400' },
    { title: 'Cool Toy 3', url: 'https://picsum.photos/seed/toy3/400/400' },
    { title: 'Super Figure 1', url: 'https://picsum.photos/seed/fig1/400/400' },
    { title: 'Super Figure 2', url: 'https://picsum.photos/seed/fig2/400/400' },
    { title: 'Super Figure 3', url: 'https://picsum.photos/seed/fig3/400/400' },
    { title: 'Collector Item 1', url: 'https://picsum.photos/seed/col1/400/400' },
    { title: 'Collector Item 2', url: 'https://picsum.photos/seed/col2/400/400' },
    { title: 'Collector Item 3', url: 'https://picsum.photos/seed/col3/400/400' },
    { title: 'Collector Item 4', url: 'https://picsum.photos/seed/col4/400/400' },
  ],
};

function getDemoResults(query) {
  const q = query.toLowerCase();
  if (q.includes('football') || q.includes('mahomes') || q.includes('card') || q.includes('nfl') || q.includes('allen') || q.includes('hurts') || q.includes('kelce')) {
    return DEMO_IMAGES.football;
  }
  if (q.includes('spider') || q.includes('spidey') || q.includes('venom') || q.includes('miles morales')) {
    return DEMO_IMAGES.spiderman;
  }
  if (q.includes('batman') || q.includes('joker') || q.includes('gotham') || q.includes('dark knight') || q.includes('robin')) {
    return DEMO_IMAGES.batman;
  }
  // Mix results for generic searches
  const mixed = [];
  const sets = Object.values(DEMO_IMAGES);
  for (let i = 0; i < 16; i++) {
    const set = sets[i % sets.length];
    // Use query as part of seed to get different images per search
    mixed.push({
      title: `${query} - Result ${i + 1}`,
      url: `https://picsum.photos/seed/${encodeURIComponent(query)}${i}/400/400`,
    });
  }
  return mixed;
}

// Determine if we're in demo mode
function isDemoMode() {
  if (process.env.DEMO_MODE === 'true') return true;
  if (!process.env.GOOGLE_API_KEY || !process.env.GOOGLE_SEARCH_ENGINE_ID) return true;
  return false;
}

// API endpoint: search images
app.get('/api/search', async (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.status(400).json({ error: 'Missing search query' });
  }

  // Prepend safety terms to bias toward product/official images
  const safeQuery = `official product photo ${query}`;

  if (isDemoMode()) {
    // Demo mode — return placeholder images
    const results = getDemoResults(query);
    return res.json({
      demo: true,
      items: results.map((img, i) => ({
        id: `demo-${Date.now()}-${i}`,
        title: img.title,
        thumbnail: img.url,
        fullImage: img.url,
      })),
    });
  }

  // Real Google Custom Search API call
  try {
    const apiKey = process.env.GOOGLE_API_KEY;
    const cx = process.env.GOOGLE_SEARCH_ENGINE_ID;
    const url = `https://www.googleapis.com/customsearch/v1?key=${encodeURIComponent(apiKey)}&cx=${encodeURIComponent(cx)}&q=${encodeURIComponent(safeQuery)}&searchType=image&safe=strict&num=16&imgType=photo`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      console.error('Google API error:', data.error);
      return res.status(500).json({ error: 'Search API error', details: data.error.message });
    }

    const items = (data.items || []).map((item, i) => ({
      id: `gcs-${Date.now()}-${i}`,
      title: item.title || '',
      thumbnail: item.image?.thumbnailLink || item.link,
      fullImage: item.link,
    }));

    return res.json({ demo: false, items });
  } catch (err) {
    console.error('Search error:', err);
    return res.status(500).json({ error: 'Failed to search images' });
  }
});

// Status endpoint
app.get('/api/status', (req, res) => {
  res.json({
    demo: isDemoMode(),
    message: isDemoMode()
      ? 'Running in demo mode. Add GOOGLE_API_KEY and GOOGLE_SEARCH_ENGINE_ID to .env and set DEMO_MODE=false for real search.'
      : 'Connected to Google Custom Search API.',
  });
});

// In production, serve the built frontend
app.use(express.static(join(__dirname, 'dist')));
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Pick & Print server running on http://localhost:${PORT}`);
  if (isDemoMode()) {
    console.log('📋 DEMO MODE — using placeholder images. Set API keys in .env for real search.');
  } else {
    console.log('🔍 Using Google Custom Search API');
  }
});
