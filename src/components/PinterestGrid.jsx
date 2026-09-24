import React from 'react';
import {
  SearchOutlined,
  CloseCircleFilled,
  PictureOutlined,
  FileTextOutlined,
  BookOutlined,
  FireOutlined,
  CompassOutlined,
  PushpinOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { usePinterest } from '../context/PinterestContext.jsx';
import { PinCard } from './PinCard.jsx';

export function PinterestGrid({ onOpenCreatePin, customCategoryTitle = null }) {
  const {
    getFilteredPins,
    searchQuery,
    setSearchQuery,
    activeFilter,
    setActiveFilter,
    sortBy,
    setSortBy,
    savedPinIds,
  } = usePinterest();

  const filteredPins = getFilteredPins();

  const filterTabs = [
    { key: 'all', label: 'All Discover', icon: <CompassOutlined /> },
    { key: 'image', label: 'Images & Art', icon: <PictureOutlined /> },
    { key: 'story', label: 'Read Stories', icon: <FileTextOutlined /> },
    { key: 'book', label: 'Read Books', icon: <BookOutlined /> },
    { key: 'saved', label: `Saved (${savedPinIds.length})`, icon: <PushpinOutlined /> },
  ];

  return (
    <section className="pinterest-grid-section">
      {/* Active Search Banner (driven exclusively from Header Search) */}
      {searchQuery && (
        <div className="header-search-active-banner">
          <div className="search-banner-left">
            <SearchOutlined className="search-banner-icon" />
            <span className="search-banner-text">
              Showing search results for <strong className="search-query-highlight">&ldquo;{searchQuery}&rdquo;</strong>
            </span>
            <span className="search-banner-count">
              {filteredPins.length} {filteredPins.length === 1 ? 'match' : 'matches'} across {activeFilter === 'all' ? 'entire site' : activeFilter}
            </span>
          </div>
          <button
            type="button"
            className="search-banner-clear-btn"
            onClick={() => setSearchQuery('')}
          >
            <CloseCircleFilled />
            <span>Clear Search</span>
          </button>
        </div>
      )}

      {/* Category Header & Filter Row */}
      <div className="grid-controls-container">
        {/* Filter Navigation & Actions Row */}
        <div className="grid-filter-row">
          <div className="filter-tabs-group" role="tablist">
            {filterTabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                role="tab"
                aria-selected={activeFilter === tab.key}
                className={`filter-tab-btn ${activeFilter === tab.key ? 'active' : ''}`}
                onClick={() => setActiveFilter(tab.key)}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Right Action Controls: Sort & Create Pin */}
          <div className="grid-meta-actions">
            <div className="sort-selector-wrapper">
              <span className="sort-label">Sort:</span>
              <select
                className="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="trending">Trending Now</option>
                <option value="likes">Most Liked</option>
                <option value="newest">Latest Uploads</option>
              </select>
            </div>

            <button
              type="button"
              className="create-pin-trigger-btn"
              onClick={onOpenCreatePin}
              title="Create your own Pin"
            >
              <PlusOutlined />
              <span>Create Pin</span>
            </button>
          </div>
        </div>

        {/* Query Feedback / Tag Strip */}
        {searchQuery && (
          <div className="search-feedback-strip">
            <span>Showing results for &ldquo;{searchQuery}&rdquo;</span>
            <span className="result-count">({filteredPins.length} pins found)</span>
            <button
              type="button"
              className="reset-search-link"
              onClick={() => setSearchQuery('')}
            >
              Reset Search
            </button>
          </div>
        )}
      </div>

      {/* Responsive Pinterest Masonry Waterfall */}
      {filteredPins.length > 0 ? (
        <div className="pinterest-waterfall-grid">
          {filteredPins.map((pin) => (
            <div key={pin.id} className="waterfall-item">
              <PinCard pin={pin} />
            </div>
          ))}
        </div>
      ) : (
        <div className="pinterest-empty-state">
          <div className="empty-symbol">✦</div>
          <h3 className="empty-title">No pins found in the dark</h3>
          <p className="empty-sub">
            No items matched your search &ldquo;{searchQuery}&rdquo; in this category.
          </p>
          <button
            type="button"
            className="empty-reset-btn"
            onClick={() => {
              setSearchQuery('');
              setActiveFilter('all');
            }}
          >
            Clear Filters & View All Pins
          </button>
        </div>
      )}
    </section>
  );
}
