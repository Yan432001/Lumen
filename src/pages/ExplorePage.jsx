import React, { useState } from 'react';
import {
  CompassFilled,
  FireOutlined,
  ThunderboltFilled,
  UserAddOutlined,
  UserDeleteOutlined,
  CheckCircleFilled,
  SearchOutlined,
  CloseCircleFilled,
  PictureOutlined,
  FileTextOutlined,
  BookOutlined,
  AppstoreOutlined,
} from '@ant-design/icons';
import { App } from 'antd';
import { usePinterest } from '../context/PinterestContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { PinCard } from '../components/PinCard.jsx';

export function ExplorePage() {
  const { message } = App.useApp();
  const { pins } = usePinterest();
  const { users, currentUser, isFollowing, toggleFollow } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');
  const [selectedRealm, setSelectedRealm] = useState('all');
  const [selectedFormat, setSelectedFormat] = useState('all'); // 'all' | 'image' | 'story' | 'book' | 'ai'

  // Frontier Realms definitions
  const realms = [
    {
      id: 'astral',
      title: 'The Astral Void',
      badge: 'Cosmic Arcana',
      desc: 'Deep-sky nebulae, starlight cartography, and observatory archives.',
      icon: '🌌',
      accent: '#38bdf8',
      accentGlow: 'rgba(56, 189, 248, 0.18)',
      categoryKey: 'Cosmic Arcana',
    },
    {
      id: 'cyber',
      title: 'The Synthetic Sprawl',
      badge: 'Cyberpunk Noir',
      desc: 'Neon rain over high-density megacities and neural procedural synthetics.',
      icon: '⚡',
      accent: '#00f2fe',
      accentGlow: 'rgba(0, 242, 254, 0.18)',
      categoryKey: 'Cyberpunk',
    },
    {
      id: 'scriptorium',
      title: 'The Scriptorium',
      badge: 'Illuminated Folios',
      desc: 'Ancient grimoires, nocturnal treatises, and atmospheric dark prose.',
      icon: '📜',
      accent: '#f59e0b',
      accentGlow: 'rgba(245, 158, 11, 0.18)',
      categoryKey: 'Books',
    },
    {
      id: 'biome',
      title: 'The Nocturnal Biome',
      badge: 'Bioluminescence',
      desc: 'Fluorescent reefs, emerald glades, and organisms glowing in the dark.',
      icon: '🌿',
      accent: '#34d399',
      accentGlow: 'rgba(52, 211, 153, 0.18)',
      categoryKey: 'Bioluminescent',
    },
  ];

  const trendingTags = [
    'All',
    'Cyberpunk',
    'Kyoto',
    'Cosmos',
    'Folios',
    'Rain',
    'Bioluminescent',
    'Cathedral',
    'Architecture',
    'DeepSpace',
    'NightNoir',
  ];

  const formatFilters = [
    { id: 'all', label: 'All Artifacts', icon: <AppstoreOutlined /> },
    { id: 'image', label: 'Visual Art', icon: <PictureOutlined /> },
    { id: 'story', label: 'Stories & Lore', icon: <FileTextOutlined /> },
    { id: 'book', label: 'Books & Folios', icon: <BookOutlined /> },
    { id: 'ai', label: 'Neural AI', icon: <ThunderboltFilled /> },
  ];

  // Filter Pins based on search, realm, format, and trending tag
  const explorePins = pins.filter((pin) => {
    // Format filter
    if (selectedFormat === 'image' && pin.type !== 'image') return false;
    if (selectedFormat === 'story' && pin.type !== 'story') return false;
    if (selectedFormat === 'book' && pin.type !== 'book') return false;
    if (selectedFormat === 'ai' && !pin.isAI) return false;

    // Realm filter
    if (selectedRealm !== 'all') {
      const activeRealm = realms.find((r) => r.id === selectedRealm);
      if (activeRealm) {
        const matchesCategory = pin.category
          ?.toLowerCase()
          .includes(activeRealm.categoryKey.toLowerCase());
        const matchesTags = pin.tags?.some((t) =>
          t.toLowerCase().includes(activeRealm.categoryKey.toLowerCase())
        );
        const matchesType =
          activeRealm.id === 'scriptorium' && (pin.type === 'book' || pin.type === 'story');
        if (!matchesCategory && !matchesTags && !matchesType) return false;
      }
    }

    // Tag filter
    if (selectedTag !== 'All') {
      const t = selectedTag.toLowerCase();
      const matchTag = pin.tags?.some((tag) => tag.toLowerCase().includes(t));
      const matchCat = pin.category?.toLowerCase().includes(t);
      const matchTitle = pin.title.toLowerCase().includes(t);
      if (!matchTag && !matchCat && !matchTitle) return false;
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchTitle = pin.title.toLowerCase().includes(q);
      const matchDesc = pin.description?.toLowerCase().includes(q);
      const matchExcerpt = pin.excerpt?.toLowerCase().includes(q);
      const matchAuthor = pin.author?.name?.toLowerCase().includes(q);
      const matchTags = pin.tags?.some((t) => t.toLowerCase().includes(q));
      if (!matchTitle && !matchDesc && !matchExcerpt && !matchAuthor && !matchTags) {
        return false;
      }
    }

    return true;
  });

  const featuredCreators = users.filter((u) => u.id !== currentUser?.id);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedTag('All');
    setSelectedRealm('all');
    setSelectedFormat('all');
  };

  return (
    <div className="explore-page-container">
      {/* Editorial Hero Banner */}
      <section className="explore-hero-card">
        <div className="explore-hero-content">
          <div className="explore-tag-pill">
            <CompassFilled /> THE ILLUMINATED FRONTIER · DISCOVERY PORTAL
          </div>

          <h1 className="explore-hero-title font-cinzel">Explore the Illuminated Frontier</h1>

          <p className="explore-hero-desc">
            Venture into nocturnal discovery. Traversal across astronomical observation archives,
            synthetic cyberpunk rainscapes, classical illuminated treatises, and bioluminescent ecosystems
            illuminated by master curators.
          </p>

          {/* Interactive Search Field */}
          <div className="explore-search-input-wrap">
            <SearchOutlined className="explore-search-icon" />
            <input
              type="text"
              className="explore-search-input"
              placeholder="Search across astral nebulas, folios, neural cities, authors, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search query"
              >
                <CloseCircleFilled />
              </button>
            )}
          </div>

          {/* Platform Metrics Strip */}
          <div className="explore-stats-strip">
            <div className="explore-stat-item">
              <span className="stat-glyph">✦</span>
              <span>4 Frontier Realms</span>
            </div>
            <div className="explore-stat-item">
              <span className="stat-glyph">✦</span>
              <span>{pins.length} Curated Artifacts</span>
            </div>
            <div className="explore-stat-item">
              <span className="stat-glyph">✦</span>
              <span>Verified Nocturnal Curators</span>
            </div>
            <div className="explore-stat-item">
              <span className="stat-glyph">✦</span>
              <span>Real-Time Neural Synthetics</span>
            </div>
          </div>
        </div>
      </section>

      {/* Frontier Realms Cards */}
      <section className="frontier-realms-section">
        <div className="section-heading-row">
          <div>
            <h2 className="section-heading font-cinzel">Frontier Realms</h2>
            <span className="section-subheading">Choose an atmospheric domain to filter your discovery voyage</span>
          </div>
          {selectedRealm !== 'all' && (
            <button
              type="button"
              className="text-xs text-rose-400 hover:text-rose-300 font-semibold"
              onClick={() => setSelectedRealm('all')}
            >
              Reset Realm Filter
            </button>
          )}
        </div>

        <div className="frontier-realms-grid">
          {realms.map((realm) => {
            const isActive = selectedRealm === realm.id;
            return (
              <div
                key={realm.id}
                className={`realm-card ${isActive ? 'active' : ''}`}
                style={{
                  '--realm-accent': realm.accent,
                  '--realm-accent-glow': realm.accentGlow,
                }}
                onClick={() => setSelectedRealm(isActive ? 'all' : realm.id)}
                role="button"
                tabIndex={0}
              >
                <div>
                  <div className="realm-card-top">
                    <span className="realm-icon">{realm.icon}</span>
                    <span className="realm-badge" style={{ borderColor: `${realm.accent}40` }}>
                      {realm.badge}
                    </span>
                  </div>
                  <h3 className="realm-card-title">{realm.title}</h3>
                  <p className="realm-card-desc">{realm.desc}</p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
                  <span style={{ color: isActive ? realm.accent : undefined, fontWeight: isActive ? 700 : 500 }}>
                    {isActive ? '● Currently Exploring' : 'Explore Domain →'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Visionary Curators */}
      <section className="featured-creators-section">
        <div className="section-heading-row">
          <div>
            <h2 className="section-heading font-cinzel">Featured Curators & Cartographers</h2>
            <span className="section-subheading">Visionaries curating dark aesthetics and digital illumination</span>
          </div>
        </div>

        <div className="featured-creators-grid">
          {featuredCreators.map((creator) => {
            const followed = isFollowing(creator.id);
            return (
              <div key={creator.id} className="creator-card">
                <div className="creator-card-header">
                  <img
                    src={creator.avatar}
                    alt={creator.name}
                    className="creator-avatar"
                    referrerPolicy="no-referrer"
                  />
                  <div className="creator-info">
                    <div className="creator-name">
                      <span>{creator.name}</span>
                      {creator.isVerified && (
                        <CheckCircleFilled style={{ color: '#e11d48', fontSize: '13px' }} title="Verified Curator" />
                      )}
                    </div>
                    <div className="creator-handle">@{creator.username}</div>
                  </div>
                </div>

                <p className="creator-bio line-clamp-2">{creator.bio}</p>

                <div className="creator-footer">
                  <span className="creator-followers-count">
                    {creator.followersCount} followers
                  </span>
                  <button
                    type="button"
                    className={`btn-follow-sm ${followed ? 'following' : ''}`}
                    onClick={() => {
                      toggleFollow(creator.id);
                      if (!followed) {
                        message.success(`Following @${creator.username}!`);
                      }
                    }}
                  >
                    {followed ? (
                      <>
                        <UserDeleteOutlined /> Following
                      </>
                    ) : (
                      <>
                        <UserAddOutlined /> Follow
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Format Filter Tabs & Trending Tag Chips */}
      <section className="mb-6">
        {/* Format Filter Tabs */}
        <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1 scrollbar-none">
          {formatFilters.map((fmt) => (
            <button
              key={fmt.id}
              type="button"
              className={`filter-pill ${selectedFormat === fmt.id ? 'active' : ''}`}
              onClick={() => setSelectedFormat(fmt.id)}
            >
              {fmt.icon}
              <span>{fmt.label}</span>
            </button>
          ))}
        </div>

        {/* Trending Topic Chips */}
        <div className="trending-tags-bar">
          <div className="flex items-center justify-between gap-2 mb-2.5">
            <div className="flex items-center gap-2">
              <FireOutlined style={{ color: '#f43f5e' }} />
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Trending Nocturnal Topics
              </span>
            </div>
            <span className="text-xs text-slate-500 font-mono">
              Showing {explorePins.length} artifacts
            </span>
          </div>

          <div className="trending-tags-scroll">
            {trendingTags.map((tag) => (
              <button
                key={tag}
                type="button"
                className={`trending-tag-chip ${selectedTag === tag ? 'active' : ''}`}
                onClick={() => setSelectedTag(tag)}
              >
                {tag === 'All' ? '✦ All Topics' : `#${tag}`}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Pinterest Waterfall Masonry Feed */}
      {explorePins.length > 0 ? (
        <div className="pinterest-waterfall-grid">
          {explorePins.map((pin) => (
            <div key={pin.id} className="waterfall-item">
              <PinCard pin={pin} />
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state-card py-16">
          <CompassFilled style={{ fontSize: '46px', color: '#e11d48', marginBottom: '14px' }} />
          <h3 className="text-lg font-bold text-white">No artifacts found on this frontier</h3>
          <p className="text-xs text-slate-400 mt-2 max-w-sm mx-auto">
            No creations matched your active realm, search query &ldquo;{searchQuery}&rdquo;, or tag selection.
          </p>
          <button
            type="button"
            className="btn-primary mt-6"
            onClick={handleResetFilters}
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
}
