import React from 'react';
import {
  FireOutlined,
  CompassOutlined,
  PictureOutlined,
  FileTextOutlined,
  BookOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { usePinterest } from '../context/PinterestContext.jsx';
import { PinterestGrid } from '../components/PinterestGrid.jsx';
import { StoryRingBar } from '../components/StoryRingBar.jsx';

export function HomePage({ onNavigate, onOpenCreatePin, onOpenCreateStory }) {
  const { setActiveFilter, setSearchQuery } = usePinterest();

  const trendingTopics = [
    { label: 'Rainy Street Noir', filter: 'image', query: 'Kyoto' },
    { label: 'Victorian Clocks', filter: 'story', query: 'Watchmaker' },
    { label: 'Antique Grimoires', filter: 'book', query: 'Grimoire' },
    { label: 'Deep Space Nebula', filter: 'image', query: 'Nebula' },
    { label: 'AI Cyber Cities', filter: 'ai', query: 'Cyberpunk' },
    { label: 'Gothic Vaults', filter: 'image', query: 'Gothic' },
  ];

  const handleTopicClick = (topic) => {
    setActiveFilter(topic.filter);
    setSearchQuery(topic.query);
  };

  return (
    <div className="home-pinterest-page">
      {/* 24-Hour Stories Social Ring */}
      <StoryRingBar onOpenCreateStory={onOpenCreateStory} />

      {/* Editorial Hero Banner */}
      <section className="pinterest-hero-banner">
        <div className="hero-atmosphere-glow" />

        <div className="hero-content-cluster">
          <div className="hero-kicker-strip">
            <span className="kicker-glyph">✦</span>
            <span className="kicker-text">NOCTURNAL VISUAL FEED & SOCIAL CONTENT PLATFORM</span>
          </div>

          <h1 className="hero-title-main">
            Where Light Uncovers Art, Stories & AI Creations
          </h1>

          <p className="hero-subtitle">
            A dark-first discovery platform with selectable Light Mode. Glide your spotlight across curated photography,
            share 24-hour stories, synthesize neural imagery, and curate personal library collections.
          </p>

          {/* Trending Topic Quick Pills */}
          <div className="hero-trending-row">
            <span className="trending-label">Trending:</span>
            <div className="trending-chips-wrap">
              {trendingTopics.map((topic, i) => (
                <button
                  key={i}
                  type="button"
                  className="trending-chip-btn"
                  onClick={() => handleTopicClick(topic)}
                >
                  <span>{topic.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Pinterest Waterfall Masonry Feed */}
      <PinterestGrid onOpenCreatePin={onOpenCreatePin} />
    </div>
  );
}
