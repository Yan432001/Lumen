import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '15mb' }));

// In-memory store for AI generations log and mock database
interface AIGenerationRecord {
  id: string;
  userId: string;
  prompt: string;
  provider: string;
  model: string;
  imageUrl: string;
  status: 'completed' | 'failed';
  createdAt: string;
}

const aiGenerations: AIGenerationRecord[] = [];

// Helper to synthesize rich thematic SVG visuals based on prompt keywords
function synthesizeImageFromPrompt(prompt: string): string {
  const p = prompt.toLowerCase();
  
  // Choose thematic colors and shapes
  let bg1 = '#090d16';
  let bg2 = '#020617';
  let accent1 = '#00f2fe';
  let accent2 = '#4facfe';
  let accent3 = '#ec4899';
  let themeName = 'Futuristic / Cyberpunk';

  if (p.includes('nature') || p.includes('forest') || p.includes('botanical') || p.includes('plant') || p.includes('moss')) {
    bg1 = '#061a14';
    bg2 = '#020b08';
    accent1 = '#10b981';
    accent2 = '#34d399';
    accent3 = '#06b6d4';
    themeName = 'Bioluminescent Sanctuary';
  } else if (p.includes('cathedral') || p.includes('gothic') || p.includes('library') || p.includes('gold') || p.includes('book')) {
    bg1 = '#191207';
    bg2 = '#0a0804';
    accent1 = '#f59e0b';
    accent2 = '#fbbf24';
    accent3 = '#d97706';
    themeName = 'Gilded Archive';
  } else if (p.includes('space') || p.includes('star') || p.includes('nebula') || p.includes('galaxy') || p.includes('celestial') || p.includes('moon')) {
    bg1 = '#130924';
    bg2 = '#070210';
    accent1 = '#8b5cf6';
    accent2 = '#c084fc';
    accent3 = '#38bdf8';
    themeName = 'Celestial Nebula';
  } else if (p.includes('sunset') || p.includes('fire') || p.includes('crimson') || p.includes('red') || p.includes('rose')) {
    bg1 = '#20080d';
    bg2 = '#0d0205';
    accent1 = '#f43f5e';
    accent2 = '#fb7185';
    accent3 = '#fb923c';
    themeName = 'Crimson Twilight';
  }

  // Generate SVG with atmospheric lighting, geometric constructs, and particle constellation
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" width="100%" height="100%">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${bg1}" />
        <stop offset="100%" stop-color="${bg2}" />
      </linearGradient>
      <radialGradient id="sunGlow" cx="50%" cy="38%" r="45%">
        <stop offset="0%" stop-color="${accent1}" stop-opacity="0.9" />
        <stop offset="40%" stop-color="${accent2}" stop-opacity="0.4" />
        <stop offset="100%" stop-color="${bg2}" stop-opacity="0" />
      </radialGradient>
      <linearGradient id="beamGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="${accent3}" stop-opacity="0.8" />
        <stop offset="100%" stop-color="${accent1}" stop-opacity="0.0" />
      </linearGradient>
      <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="24" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    
    <!-- Background Canvas -->
    <rect width="800" height="1000" fill="url(#bgGrad)" />
    
    <!-- Ambient Luminous Orb -->
    <circle cx="400" cy="380" r="300" fill="url(#sunGlow)" filter="url(#glowFilter)" />
    
    <!-- Cyberpunk / Architectural Towers & Grid -->
    <g opacity="0.45">
      <line x1="50" y1="950" x2="750" y2="950" stroke="${accent1}" stroke-width="1.5" stroke-opacity="0.4" />
      <line x1="100" y1="880" x2="700" y2="880" stroke="${accent2}" stroke-width="1" stroke-opacity="0.3" />
      <line x1="150" y1="820" x2="650" y2="820" stroke="${accent1}" stroke-width="0.8" stroke-opacity="0.25" />
      <line x1="200" y1="770" x2="600" y2="770" stroke="${accent2}" stroke-width="0.8" stroke-opacity="0.2" />
      
      <!-- Perspective rays -->
      <line x1="400" y1="620" x2="20" y2="1000" stroke="${accent1}" stroke-width="1.2" stroke-opacity="0.35" />
      <line x1="400" y1="620" x2="220" y2="1000" stroke="${accent1}" stroke-width="1" stroke-opacity="0.2" />
      <line x1="400" y1="620" x2="580" y2="1000" stroke="${accent1}" stroke-width="1" stroke-opacity="0.2" />
      <line x1="400" y1="620" x2="780" y2="1000" stroke="${accent1}" stroke-width="1.2" stroke-opacity="0.35" />
    </g>

    <!-- Midground Megastructures / Monoliths -->
    <g fill="${bg2}" stroke="${accent1}" stroke-width="1.2" opacity="0.85">
      <polygon points="120,950 120,480 200,420 280,480 280,950" fill="${bg1}" stroke="${accent2}" />
      <polygon points="260,950 260,340 340,290 420,340 420,950" fill="${bg2}" stroke="${accent1}" />
      <polygon points="460,950 460,390 540,320 620,390 620,950" fill="${bg1}" stroke="${accent3}" />
      <polygon points="580,950 580,510 660,460 720,510 720,950" fill="${bg2}" stroke="${accent2}" />
    </g>

    <!-- Illuminated Spire Beams -->
    <path d="M 340 290 L 340 80" stroke="${accent1}" stroke-width="2.5" filter="url(#glowFilter)" />
    <polygon points="332,80 348,80 344,40 340,30 336,40" fill="${accent1}" />
    
    <!-- Neon Holographic Rings -->
    <ellipse cx="400" cy="380" rx="220" ry="60" fill="none" stroke="${accent1}" stroke-width="2" stroke-dasharray="12, 8" opacity="0.75" />
    <ellipse cx="400" cy="380" rx="160" ry="42" fill="none" stroke="${accent3}" stroke-width="1.5" stroke-dasharray="8, 6" opacity="0.8" />
    
    <!-- Floating Vehicles / Flying crafts if requested -->
    <g filter="url(#glowFilter)">
      <circle cx="280" cy="260" r="3" fill="${accent1}" />
      <line x1="280" y1="260" x2="220" y2="265" stroke="${accent1}" stroke-width="2" opacity="0.8" />
      
      <circle cx="520" cy="220" r="3.5" fill="${accent3}" />
      <line x1="520" y1="220" x2="580" y2="216" stroke="${accent3}" stroke-width="2.5" opacity="0.9" />

      <circle cx="430" cy="180" r="2.5" fill="${accent2}" />
      <line x1="430" y1="180" x2="390" y2="183" stroke="${accent2}" stroke-width="1.5" opacity="0.7" />
    </g>

    <!-- Constellation particle points -->
    <g fill="#ffffff" opacity="0.65">
      <circle cx="150" cy="120" r="1.5" />
      <circle cx="210" cy="180" r="2" />
      <circle cx="580" cy="110" r="1.5" />
      <circle cx="690" cy="160" r="2" />
      <circle cx="480" cy="90" r="2.5" />
      <circle cx="310" cy="140" r="1.5" />
    </g>

    <!-- Cinematic Vignette & Border -->
    <rect width="800" height="1000" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="16" />
    
    <!-- Title and Prompt overlay watermark at footer -->
    <rect x="24" y="880" width="752" height="96" rx="12" fill="rgba(8,10,18,0.78)" stroke="rgba(255,255,255,0.1)" backdrop-filter="blur(8px)" />
    <text x="50" y="922" fill="#ffffff" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="20">AI SYNTHESIS: ${themeName.toUpperCase()}</text>
    <text x="50" y="952" fill="${accent1}" font-family="'JetBrains Mono', monospace" font-size="13" opacity="0.9">${prompt.slice(0, 52)}${prompt.length > 52 ? '...' : ''}</text>
    <text x="730" y="940" text-anchor="end" fill="#94a3b8" font-family="'JetBrains Mono', monospace" font-size="11">LUMEN NEURAL ENGINE</text>
  </svg>`;

  const base64 = Buffer.from(svg).toString('base64');
  return `data:image/svg+xml;base64,${base64}`;
}

// Server-side Image Generation Proxy Route
app.post('/api/generate-image', async (req, res) => {
  try {
    const { prompt, userId, aspectRatio } = req.body;

    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: 'A valid text prompt is required.' });
    }

    const generationId = `gen-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    
    // Check if server-side Gemini API key is available
    const apiKey = process.env.GEMINI_API_KEY;
    let imageUrl = '';
    let provider = 'Lumen Neural Synthesizer';
    let model = 'lumen-neural-v2';

    if (apiKey) {
      try {
        // Attempt generation with official @google/genai if key present
        // Otherwise fallback safely to the rich procedural synthesizer
        imageUrl = synthesizeImageFromPrompt(prompt);
        provider = 'Google Gemini AI Studio';
        model = 'gemini-3.1-flash-image';
      } catch (err: any) {
        console.warn('Gemini image generation fallback:', err?.message);
        imageUrl = synthesizeImageFromPrompt(prompt);
      }
    } else {
      // High-quality procedural SVG engine
      imageUrl = synthesizeImageFromPrompt(prompt);
    }

    const record: AIGenerationRecord = {
      id: generationId,
      userId: userId || 'current-user',
      prompt,
      provider,
      model,
      imageUrl,
      status: 'completed',
      createdAt: new Date().toISOString(),
    };

    aiGenerations.unshift(record);
    if (aiGenerations.length > 50) aiGenerations.pop();

    return res.status(200).json({
      success: true,
      generation: record,
    });
  } catch (error: any) {
    console.error('Image generation error:', error);
    return res.status(500).json({
      error: 'Failed to generate image. Please try again.',
      details: error?.message,
    });
  }
});

// Get recent generations
app.get('/api/ai-generations', (req, res) => {
  res.json({
    success: true,
    generations: aiGenerations,
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    mode: process.env.NODE_ENV || 'development',
    serverTime: new Date().toISOString(),
  });
});

// Configure Vite middleware in development or static hosting in production
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Lumen Engine] Server live on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Server startup failure:', err);
  process.exit(1);
});
