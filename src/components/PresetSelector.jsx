import React from 'react';
import { useSpotlight } from '../spotlight/useSpotlight.js';

const PRESET_METADATA = [
  { id: 'candle', name: 'Candle', icon: '🕯️', desc: 'Warm amber glow with organic micro-flickering' },
  { id: 'lamp', name: 'Lamp', icon: '🏮', desc: 'Comforting warm white with gentle wide edges' },
  { id: 'circle', name: 'Circle', icon: '⭕', desc: 'Geometric circular focus with crisp aperture falloff' },
  { id: 'softglow', name: 'Soft Glow', icon: '🌟', desc: 'Expansive diffused ambient radiance with soft edge' },
  { id: 'flashlight', name: 'Flashlight', icon: '🔦', desc: 'Crisp, pure white beam with sharp clarity' },
  { id: 'moonlight', name: 'Moonlight', icon: '🌕', desc: 'Ethereal pale cyan-blue celestial radiance' },
  { id: 'neon', name: 'Neon', icon: '⚡', desc: 'Vibrant cyberpunk cyan & magenta with energy trail' },
  { id: 'fire', name: 'Fire', icon: '🔥', desc: 'Blazing scarlet & gold embers with heat flicker' },
  { id: 'aurora', name: 'Aurora', icon: '✨', desc: 'Mystical undulating northern lights ribbon' },
  { id: 'rainbow', name: 'Rainbow', icon: '🌈', desc: 'Continuous chromatic spectral illumination' },
  { id: 'horror', name: 'Horror', icon: '🩸', desc: 'Deep sinister crimson beam in intense void' },
];

export function PresetSelector() {
  const { settings, applyPreset } = useSpotlight();

  return (
    <div className="preset-selector-wrapper">
      <div className="preset-grid">
        {PRESET_METADATA.map((p) => {
          const isActive = settings.preset === p.id;
          return (
            <button
              key={p.id}
              type="button"
              className={`preset-card ${isActive ? 'active' : ''}`}
              onClick={() => applyPreset(p.id)}
            >
              <div className="preset-card-top">
                <span className="preset-icon">{p.icon}</span>
                <span className="preset-name">{p.name}</span>
                {isActive && <span className="preset-active-dot" />}
              </div>
              <p className="preset-desc">{p.desc}</p>
            </button>
          );
        })}
      </div>

      {settings.preset === 'custom' && (
        <div className="custom-preset-badge">
          <span className="badge-dot" />
          <span>Currently in <strong>Custom Light</strong> mode (modified parameters)</span>
        </div>
      )}
    </div>
  );
}
