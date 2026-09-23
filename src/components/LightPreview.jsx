import React from 'react';
import { useSpotlight } from '../spotlight/useSpotlight.js';

export function LightPreview() {
  const { settings } = useSpotlight();

  const getShapeStyle = () => {
    switch (settings.shape) {
      case 'ellipse':
        return { borderRadius: '50%', transform: 'scale(1.3, 0.8)' };
      case 'square':
        return { borderRadius: '2px' };
      case 'rounded-square':
        return { borderRadius: '16px' };
      case 'star':
        return {
          clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
          borderRadius: '0px'
        };
      case 'hexagon':
        return {
          clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
          borderRadius: '0px'
        };
      case 'circle':
      default:
        return { borderRadius: '50%' };
    }
  };

  const previewColor = settings.color || '#FFFFFF';

  return (
    <div className="light-preview-card">
      <div className="preview-viewport">
        {/* Glow halo */}
        {settings.glow.enabled && (
          <div
            className="preview-glow"
            style={{
              background: `radial-gradient(circle, ${previewColor} 0%, transparent 70%)`,
              opacity: (settings.glow.intensity / 100) * 0.5,
              ...getShapeStyle()
            }}
          />
        )}

        {/* Central light source */}
        <div
          className={`preview-beam ${settings.animation.type !== 'none' ? `anim-${settings.animation.type}` : ''}`}
          style={{
            background: `radial-gradient(circle, ${previewColor} 0%, rgba(255,255,255,0.2) 60%, transparent 100%)`,
            opacity: settings.opacity / 100,
            boxShadow: `0 0 25px ${previewColor}44`,
            ...getShapeStyle()
          }}
        />

        <div className="preview-grid-texture" />
      </div>

      <div className="preview-meta">
        <div className="preview-stat">
          <span className="stat-label">Radius</span>
          <span className="stat-value">{settings.radius}px</span>
        </div>
        <div className="preview-stat">
          <span className="stat-label">Shape</span>
          <span className="stat-value capitalize">{settings.shape}</span>
        </div>
        <div className="preview-stat">
          <span className="stat-label">Mode</span>
          <span className="stat-value capitalize">{settings.colorMode}</span>
        </div>
        <div className="preview-stat">
          <span className="stat-label">Preset</span>
          <span className="stat-value highlight capitalize">{settings.preset}</span>
        </div>
      </div>
    </div>
  );
}
