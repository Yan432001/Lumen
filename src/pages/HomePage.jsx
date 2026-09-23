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

export function HomePage({ onNavigate, onOpenCreatePin }) {
  const { setActiveFilter, setSearchQuery } = usePinterest();

  const trendingTopics = [
    { label: 'Rainy Street Noir', filter: 'photography', query: 'Kyoto' },
    { label: 'Victorian Clocks', filter: 'story', query: 'Watchmaker' },
    { label: 'Antique Grimoires', filter: 'book', query: 'Grimoire' },
    { label: 'Deep Space Nebula', filter: 'image', query: 'Nebula' },
    { label: 'Nocturnal Folklore', filter: 'story', query: 'Folklore' },
    { label: 'Gothic Vaults', filter: 'image', query: 'Gothic' },
  ];

  const handleTopicClick = (topic) => {
    setActiveFilter(topic.filter);
    setSearchQuery(topic.query);
  };

  return (
    <div className="home-pinterest-page">
      {/* Editorial Hero Banner */}
      <section className="pinterest-hero-banner">
        <div className="hero-atmosphere-glow" />

        <div className="hero-content-cluster">
          <div className="hero-kicker-strip">
            <span className="kicker-glyph">✦</span>
            <span className="kicker-text">NOCTURNAL VISUAL FEED & LITERARY SANCTUARY</span>
          </div>

          <h1 className="hero-title-main">
            Where Light Uncovers Art, Stories & Books
          </h1>

          <p className="hero-subtitle">
            A Pinterest-style nocturnal haven. Glide your spotlight across curated photography,
            read immersive midnight fiction, and open rare illuminated manuscripts in the dark.
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
