import React from 'react';
import { PictureOutlined, CameraOutlined, PlusOutlined } from '@ant-design/icons';
import { usePinterest } from '../context/PinterestContext.jsx';
import { PinCard } from '../components/PinCard.jsx';

export function ImagesPage({ onOpenCreatePin }) {
  const { pins, searchQuery } = usePinterest();

  // Filter only images
  const imagePins = pins
    .filter((p) => p.type === 'image')
    .filter((p) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q) ||
        p.tags?.some((t) => t.toLowerCase().includes(q))
      );
    });

  return (
    <div className="gallery-page">
      <header className="page-editorial-header">
        <div className="header-badge">
          <PictureOutlined />
          <span>VISUAL GALLERY & NOCTURNAL PHOTOGRAPHY</span>
        </div>
        <h1 className="page-title">Shadows, Light & Optics</h1>
        <p className="page-desc">
          Documentary street photography, deep-sky astrophotography, classical chiaroscuro oils, and
          cinematic anamorphic frames revealed under your mouse beam.
        </p>

        <div className="page-action-row">
          <span className="count-indicator">{imagePins.length} Visual Works</span>
          <button
            type="button"
            className="header-create-btn"
            onClick={onOpenCreatePin}
          >
            <PlusOutlined />
            <span>Upload Image Pin</span>
          </button>
        </div>
      </header>

      <div className="pinterest-waterfall-grid">
        {imagePins.map((pin) => (
          <div key={pin.id} className="waterfall-item">
            <PinCard pin={pin} />
          </div>
        ))}
      </div>
    </div>
  );
}
