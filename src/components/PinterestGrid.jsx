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
      {/* Category Header or Search / Filter Bar */}
      <div className="grid-controls-container">
        {/* Search Bar - Pinterest Style */}
        <div className="pinterest-search-bar">
          <SearchOutlined className="search-icon" />
          <input
            type="text"
            className="pinterest-search-input"
            placeholder="Search images, dark fiction stories, grimoires, authors, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
            >
              <CloseCircleFilled />
            </button>
          )}
        </div>

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
