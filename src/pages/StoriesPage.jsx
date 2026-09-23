import React from 'react';
import { FileTextOutlined, PlusOutlined, ReadOutlined } from '@ant-design/icons';
import { usePinterest } from '../context/PinterestContext.jsx';
import { PinCard } from '../components/PinCard.jsx';

export function StoriesPage({ onOpenCreatePin }) {
  const { pins, searchQuery, openPin } = usePinterest();

  const storyPins = pins
    .filter((p) => p.type === 'story')
    .filter((p) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q) ||
        p.tags?.some((t) => t.toLowerCase().includes(q)) ||
        p.excerpt?.toLowerCase().includes(q)
      );
    });

  const featuredStory = storyPins[0];

  return (
    <div className="stories-feed-page">
      <header className="page-editorial-header">
        <div className="header-badge">
          <FileTextOutlined />
          <span>NOCTURNAL FICTION & FOLKLORE</span>
        </div>
        <h1 className="page-title">Stories Read by Candlelight</h1>
        <p className="page-desc">
          Immerse yourself in Victorian gaslamp mysteries, cosmic whispers from event horizons,
          Baltic fairy fables, and quiet urban twilight microfiction.
        </p>

        <div className="page-action-row">
          <span className="count-indicator">{storyPins.length} Stories Available</span>
          <button
            type="button"
            className="header-create-btn"
            onClick={onOpenCreatePin}
          >
            <PlusOutlined />
            <span>Write New Story</span>
          </button>
        </div>
      </header>

      {/* Featured Highlighted Story Hero Box */}
      {featuredStory && (
        <section className="featured-story-hero" onClick={() => openPin(featuredStory)}>
          <div className="featured-story-inner">
            <div className="featured-kicker">FEATURED TALE · {featuredStory.readTime}</div>
            <h2 className="featured-title">{featuredStory.title}</h2>
            <p className="featured-quote">{featuredStory.quote || featuredStory.excerpt}</p>
            <div className="featured-byline">
              <span>Written by {featuredStory.author?.name}</span>
              <span>·</span>
              <span>{featuredStory.category}</span>
            </div>
            <button
              type="button"
              className="featured-read-btn"
              onClick={(e) => {
                e.stopPropagation();
                openPin(featuredStory);
              }}
            >
              <ReadOutlined />
              <span>Read Full Story Now</span>
            </button>
          </div>
        </section>
      )}

      {/* Stories Masonry Grid */}
      <div className="pinterest-waterfall-grid">
        {storyPins.map((pin) => (
          <div key={pin.id} className="waterfall-item">
            <PinCard pin={pin} />
          </div>
        ))}
      </div>
    </div>
  );
}
