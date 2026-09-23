import React from 'react';

/**
 * Resilient, zero-broken-image artwork renderer for Pinterest pins.
 * Renders exquisite procedural vector graphics, glowing gradients,
 * and illuminated motifs that react to the mouse spotlight.
 */
export function PinArtwork({ pin, className = '', height = 'auto' }) {
  const { type, visualStyle, title, category, id } = pin;
  const accent = visualStyle?.accent || '#38bdf8';
  const gradient = visualStyle?.gradient || 'linear-gradient(180deg, #090d16 0%, #1e293b 100%)';

  // Specific bespoke vector graphics based on pin theme
  const renderBespokeArt = () => {
    switch (id) {
      case 'pin-img-1': // Kyoto Rainlit Alley
        return (
          <svg viewBox="0 0 300 400" className="pin-vector-art" aria-hidden="true">
            <defs>
              <linearGradient id="rainSky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#050811" />
                <stop offset="60%" stopColor="#0f172a" />
                <stop offset="100%" stopColor="#1e1b4b" />
              </linearGradient>
              <radialGradient id="lanternGlow1" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.9" />
                <stop offset="40%" stopColor="#d97706" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#d97706" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="lanternGlow2" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.85" />
                <stop offset="50%" stopColor="#b91c1c" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#b91c1c" stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect width="300" height="400" fill="url(#rainSky)" />
            {/* Kyoto Wooden Machiya Rooflines */}
            <path d="M0,180 L70,160 L140,195 L0,220 Z" fill="#090a10" opacity="0.95" />
            <path d="M300,150 L210,130 L160,175 L300,200 Z" fill="#07080d" opacity="0.95" />
            <path d="M120,130 L180,120 L190,145 L115,150 Z" fill="#0b0d14" />
            {/* Hanging Lanterns */}
            <circle cx="95" cy="185" r="45" fill="url(#lanternGlow1)" />
            <rect x="87" y="172" width="16" height="26" rx="4" fill="#fbbf24" stroke="#78350f" strokeWidth="1.5" />
            <line x1="95" y1="160" x2="95" y2="172" stroke="#451a03" strokeWidth="1.5" />

            <circle cx="215" cy="170" r="38" fill="url(#lanternGlow2)" />
            <rect x="208" y="158" width="14" height="24" rx="4" fill="#f87171" stroke="#7f1d1d" strokeWidth="1.5" />
            <line x1="215" y1="148" x2="215" y2="158" stroke="#450a0a" strokeWidth="1.5" />

            {/* Wet Cobblestones with Street Reflections */}
            <polygon points="60,400 240,400 180,240 120,240" fill="#070a12" />
            <ellipse cx="145" cy="340" rx="45" ry="12" fill="#f59e0b" opacity="0.35" />
            <ellipse cx="165" cy="360" rx="35" ry="8" fill="#38bdf8" opacity="0.25" />
            <ellipse cx="130" cy="300" rx="20" ry="5" fill="#f59e0b" opacity="0.2" />

            {/* Diagonal Rain Streaks */}
            <g stroke="#38bdf8" strokeWidth="0.8" opacity="0.4" strokeDasharray="10,25">
              <line x1="30" y1="0" x2="0" y2="180" />
              <line x1="90" y1="0" x2="60" y2="280" />
              <line x1="160" y1="0" x2="130" y2="380" />
              <line x1="220" y1="0" x2="190" y2="350" />
              <line x1="280" y1="0" x2="250" y2="260" />
            </g>
          </svg>
        );

      case 'pin-img-2': // Obsidian Nebula
        return (
          <svg viewBox="0 0 300 300" className="pin-vector-art" aria-hidden="true">
            <defs>
              <radialGradient id="nebulaCore" cx="45%" cy="45%" r="60%">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
                <stop offset="25%" stopColor="#b45309" stopOpacity="0.6" />
                <stop offset="55%" stopColor="#4c1d95" stopOpacity="0.4" />
                <stop offset="85%" stopColor="#1e1b4b" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#030712" stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect width="300" height="300" fill="#030712" />
            <circle cx="140" cy="140" r="130" fill="url(#nebulaCore)" />
            {/* Dark dust pillars */}
            <path d="M120,300 Q140,200 130,140 Q120,100 145,80 Q160,110 150,160 Q170,220 180,300 Z" fill="#08070d" opacity="0.9" />
            <path d="M180,300 Q195,230 190,170 Q205,190 210,300 Z" fill="#0b0a12" opacity="0.85" />
            {/* Luminous stars */}
            <circle cx="145" cy="80" r="3" fill="#ffffff" />
            <circle cx="145" cy="80" r="8" fill="#fef08a" opacity="0.4" />
            <circle cx="80" cy="110" r="1.5" fill="#ffffff" />
            <circle cx="220" cy="90" r="2" fill="#bae6fd" />
            <circle cx="95" cy="220" r="1" fill="#fde68a" />
            <circle cx="240" cy="230" r="1.8" fill="#ffffff" />
            <circle cx="160" cy="40" r="1.2" fill="#ffffff" />
          </svg>
        );

      case 'pin-img-3': // Gothic Cloister
        return (
          <svg viewBox="0 0 300 225" className="pin-vector-art" aria-hidden="true">
            <rect width="300" height="225" fill="#09090b" />
            {/* Vaulted arches */}
            <g stroke="#3f3f46" strokeWidth="1.5" fill="none">
              <path d="M40,225 C40,110 110,60 150,40 C190,60 260,110 260,225" />
              <path d="M70,225 C70,130 120,85 150,70 C180,85 230,130 230,225" />
              <path d="M100,225 C100,150 130,110 150,95 C170,110 200,150 200,225" />
              {/* Rib lines */}
              <line x1="150" y1="40" x2="150" y2="95" stroke="#71717a" strokeWidth="2" />
              <line x1="40" y1="225" x2="150" y2="40" stroke="#27272a" strokeWidth="1" />
              <line x1="260" y1="225" x2="150" y2="40" stroke="#27272a" strokeWidth="1" />
            </g>
            {/* Soft moonlit archway glow */}
            <ellipse cx="150" cy="150" rx="35" ry="60" fill="#a1a1aa" opacity="0.1" />
          </svg>
        );

      case 'pin-img-4': // Cyberpunk Neo-Noir
        return (
          <svg viewBox="0 0 300 533" className="pin-vector-art" aria-hidden="true">
            <defs>
              <linearGradient id="cyberSky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#020617" />
                <stop offset="40%" stopColor="#0f172a" />
                <stop offset="70%" stopColor="#4c0519" />
                <stop offset="100%" stopColor="#020617" />
              </linearGradient>
            </defs>
            <rect width="300" height="533" fill="url(#cyberSky)" />
            {/* Monolith Skyscrapers */}
            <rect x="15" y="120" width="70" height="413" fill="#090d16" />
            <rect x="95" y="60" width="80" height="473" fill="#060910" />
            <rect x="185" y="150" width="100" height="383" fill="#0a0e1a" />
            {/* Neon Skybridge */}
            <rect x="0" y="240" width="300" height="16" fill="#0f172a" />
            <line x1="0" y1="242" x2="300" y2="242" stroke="#06b6d4" strokeWidth="2" opacity="0.8" />
            <line x1="0" y1="254" x2="300" y2="254" stroke="#f43f5e" strokeWidth="2" opacity="0.8" />
            {/* Glowing Neon Sign Kanji */}
            <text x="135" y="160" fill="#f43f5e" fontSize="24" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle" opacity="0.9">
              電脳
            </text>
            <text x="135" y="195" fill="#06b6d4" fontSize="18" fontFamily="sans-serif" textAnchor="middle" opacity="0.85">
              光陰
            </text>
            {/* Holographic grid scan lines */}
            <g stroke="#38bdf8" strokeWidth="0.5" opacity="0.2">
              <line x1="0" y1="360" x2="300" y2="360" />
              <line x1="0" y1="380" x2="300" y2="380" />
              <line x1="0" y1="400" x2="300" y2="400" />
              <line x1="0" y1="420" x2="300" y2="420" />
            </g>
          </svg>
        );

      case 'pin-img-5': // Alchemist Chiaroscuro
        return (
          <svg viewBox="0 0 300 400" className="pin-vector-art" aria-hidden="true">
            <defs>
              <radialGradient id="candleGlow" cx="45%" cy="50%" r="55%">
                <stop offset="0%" stopColor="#fef08a" stopOpacity="0.95" />
                <stop offset="20%" stopColor="#f59e0b" stopOpacity="0.7" />
                <stop offset="50%" stopColor="#78350f" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#080402" stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect width="300" height="400" fill="#080402" />
            <circle cx="135" cy="200" r="110" fill="url(#candleGlow)" />
            {/* Candle and holder */}
            <rect x="130" y="210" width="10" height="45" rx="2" fill="#fef3c7" />
            <path d="M135,195 Q140,205 135,210 Q130,205 135,195 Z" fill="#f59e0b" />
            <circle cx="135" cy="202" r="2.5" fill="#ffffff" />
            {/* Astrolabe silhouette */}
            <circle cx="190" cy="240" r="30" fill="none" stroke="#d97706" strokeWidth="2" opacity="0.6" />
            <circle cx="190" cy="240" r="22" fill="none" stroke="#b45309" strokeWidth="1.5" opacity="0.5" />
            {/* Parchment scroll */}
            <path d="M70,250 Q120,240 180,255 L170,275 Q110,260 60,270 Z" fill="#78350f" opacity="0.6" />
          </svg>
        );

      case 'pin-img-6': // Lighthouse Cape Disappointment
        return (
          <svg viewBox="0 0 300 225" className="pin-vector-art" aria-hidden="true">
            <rect width="300" height="225" fill="#020617" />
            {/* Basalt Cliff */}
            <path d="M0,225 L120,130 L170,160 L190,225 Z" fill="#090d16" />
            {/* Lighthouse Tower */}
            <polygon points="105,130 115,130 112,80 108,80" fill="#f8fafc" />
            <rect x="106" y="75" width="8" height="6" fill="#1e293b" />
            {/* Rotating Beam */}
            <polygon points="110,77 300,10 300,110" fill="#38bdf8" opacity="0.4" />
            <polygon points="110,77 300,30 300,70" fill="#e0f2fe" opacity="0.6" />
            {/* Crashing Wave Foam */}
            <path d="M0,205 Q50,195 100,210 T200,200 T300,215 L300,225 L0,225 Z" fill="#0ea5e9" opacity="0.25" />
            <path d="M0,215 Q70,210 140,220 T300,218 L300,225 L0,225 Z" fill="#e0f2fe" opacity="0.3" />
          </svg>
        );

      case 'pin-img-7': // Owl in Moonlight
        return (
          <svg viewBox="0 0 300 400" className="pin-vector-art" aria-hidden="true">
            <rect width="300" height="400" fill="#050811" />
            {/* Full Moon */}
            <circle cx="210" cy="120" r="65" fill="#f8fafc" opacity="0.85" />
            <circle cx="210" cy="120" r="85" fill="#94a3b8" opacity="0.15" />
            {/* Silhouetted Owl in Flight */}
            <path d="M150,140 Q100,110 50,135 Q90,160 130,160 Q150,175 160,195 Q170,175 190,160 Q230,160 270,135 Q220,110 170,140 Z" fill="#0f172a" stroke="#cbd5e1" strokeWidth="1" />
            {/* Reeds at bottom */}
            <g stroke="#1e293b" strokeWidth="2">
              <line x1="40" y1="400" x2="50" y2="300" />
              <line x1="60" y1="400" x2="65" y2="280" />
              <line x1="90" y1="400" x2="80" y2="320" />
              <line x1="220" y1="400" x2="230" y2="310" />
              <line x1="260" y1="400" x2="250" y2="290" />
            </g>
          </svg>
        );

      case 'pin-img-8': // 3:10 Tram
        return (
          <svg viewBox="0 0 300 169" className="pin-vector-art" aria-hidden="true">
            <rect width="300" height="169" fill="#050810" />
            {/* City Bridge Silhouette */}
            <line x1="0" y1="120" x2="300" y2="120" stroke="#1e293b" strokeWidth="4" />
            {/* Tram Body */}
            <rect x="80" y="80" width="140" height="40" rx="3" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
            {/* Glowing Tram Windows */}
            <rect x="95" y="88" width="22" height="18" rx="2" fill="#f59e0b" opacity="0.9" />
            <rect x="125" y="88" width="22" height="18" rx="2" fill="#fbbf24" opacity="0.9" />
            <rect x="155" y="88" width="22" height="18" rx="2" fill="#f59e0b" opacity="0.9" />
            <rect x="185" y="88" width="22" height="18" rx="2" fill="#d97706" opacity="0.85" />
            {/* Tram Headlight */}
            <circle cx="83" cy="105" r="4" fill="#fef08a" />
            <polygon points="83,105 0,70 0,140" fill="#fef08a" opacity="0.25" />
          </svg>
        );

      default:
        // Default generic artwork for user-created pins or stories/books
        return null;
    }
  };

  // Dedicated Book Cover representation
  if (type === 'book') {
    return (
      <div
        className={`pin-book-cover-container ${className}`}
        style={{ background: gradient, minHeight: height === 'auto' ? '260px' : height }}
      >
        <div className="book-binding-spine" />
        <div className="book-front-cover">
          <div className="book-filigree-border">
            <div className="book-corner-ornament top-left">✦</div>
            <div className="book-corner-ornament top-right">✦</div>
            <div className="book-corner-ornament bottom-left">✦</div>
            <div className="book-corner-ornament bottom-right">✦</div>

            <div className="book-center-emblem" style={{ borderColor: accent }}>
              <span className="book-emblem-glyph" style={{ color: accent }}>
                {visualStyle?.symbol || '📖'}
              </span>
            </div>

            <div className="book-cover-title-area">
              <span className="book-cover-kicker">{category}</span>
              <h4 className="book-cover-title">{title}</h4>
              <span className="book-cover-author">{pin.author?.name}</span>
            </div>

            <div className="book-cover-meta">
              <span>{pin.pagesCount || 'Antique Folio'}</span>
              <span>·</span>
              <span>{pin.year || 'Sanctuary Edition'}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Dedicated Story Card representation
  if (type === 'story') {
    return (
      <div
        className={`pin-story-cover-container ${className}`}
        style={{ background: gradient, minHeight: height === 'auto' ? '240px' : height }}
      >
        <div className="story-ambient-glow" style={{ background: `radial-gradient(circle at 70% 30%, ${accent}25, transparent 65%)` }} />
        <div className="story-cover-inner">
          <div className="story-header-row">
            <span className="story-category-tag" style={{ color: accent }}>
              {category}
            </span>
            <span className="story-readtime-badge">{pin.readTime}</span>
          </div>

          <div className="story-lead-area">
            <div className="story-symbol" style={{ color: accent }}>
              {visualStyle?.symbol || '🖋️'}
            </div>
            <h4 className="story-title-display">{title}</h4>
          </div>

          {pin.quote ? (
            <p className="story-quote-preview">{pin.quote}</p>
          ) : (
            <p className="story-excerpt-preview">{pin.excerpt}</p>
          )}

          <div className="story-action-hint">
            <span className="hint-text">Click to read story</span>
            <span className="hint-arrow">→</span>
          </div>
        </div>
      </div>
    );
  }

  // Image Pin rendering: bespoke vector art with fallback
  const bespoke = renderBespokeArt();
  if (bespoke) {
    return <div className={`pin-artwork-wrapper ${className}`}>{bespoke}</div>;
  }

  // Fallback for custom user pins with image URLs or gradients
  if (pin.imageUrl) {
    return (
      <div className={`pin-artwork-wrapper ${className}`}>
        <img
          src={pin.imageUrl}
          alt={title}
          referrerPolicy="no-referrer"
          className="pin-artwork-img"
          onError={(e) => {
            // Fallback gracefully on broken images
            e.currentTarget.style.display = 'none';
            e.currentTarget.nextElementSibling.style.display = 'flex';
          }}
        />
        <div className="pin-artwork-fallback" style={{ display: 'none', background: gradient }}>
          <span className="fallback-symbol">{visualStyle?.symbol || '🌌'}</span>
          <span className="fallback-title">{title}</span>
        </div>
      </div>
    );
  }

  // Generic graphic fallback container
  return (
    <div
      className={`pin-artwork-fallback ${className}`}
      style={{
        background: gradient,
        minHeight: height === 'auto' ? '220px' : height,
      }}
    >
      <div className="fallback-ambient" style={{ background: `radial-gradient(circle at 50% 50%, ${accent}30, transparent 70%)` }} />
      <span className="fallback-symbol">{visualStyle?.symbol || '✦'}</span>
      <span className="fallback-category">{category}</span>
      <span className="fallback-title">{title}</span>
    </div>
  );
}
