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

      {/* Full Screen Width Single Row Hero Strip */}
      <section className="hero-full-row-strip" aria-label="Editorial Platform Announcement">
        <div className="hero-row-inner">
          <div className="hero-row-badge">
            <span className="hero-row-glyph">✦</span>
            <span className="hero-row-kicker">NOCTURNAL VISUAL FEED &amp; SOCIAL CONTENT PLATFORM</span>
          </div>

          <div className="hero-row-divider" />

          <h1 className="hero-row-title">
            Where Light Uncovers Art, Stories &amp; AI Creations
          </h1>

          <div className="hero-row-divider" />

          <p className="hero-row-subtitle">
            A dark-first discovery platform with selectable Light Mode. Glide your spotlight across curated photography, share 24-hour stories, synthesize neural imagery, and curate personal library collections.
          </p>

          <div className="hero-row-trending">
            <span className="hero-trending-tag">Trending:</span>
            {trendingTopics.slice(0, 3).map((topic, i) => (
              <button
                key={i}
                type="button"
                className="trending-chip-mini"
                onClick={() => handleTopicClick(topic)}
              >
                {topic.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Pinterest Waterfall Masonry Feed */}
      <PinterestGrid onOpenCreatePin={onOpenCreatePin} />
    </div>
  );
}
