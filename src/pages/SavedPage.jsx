import React, { useState } from 'react';
import {
  PictureOutlined,
  BookOutlined,
  ReadOutlined,
  ThunderboltFilled,
  DeleteOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import { BookmarkFilled } from '../components/BookmarkIcons.jsx';
import { App } from 'antd';
import { usePinterest } from '../context/PinterestContext.jsx';
import { PinCard } from '../components/PinCard.jsx';

export function SavedPage() {
  const { message } = App.useApp();
  const { pins, savedPinIds, toggleSave } = usePinterest();
  const [filterType, setFilterType] = useState('all');

  const savedPins = pins.filter((p) => savedPinIds.includes(p.id));

  const filteredSavedPins = savedPins.filter((pin) => {
    if (filterType === 'image') return pin.type === 'image';
    if (filterType === 'story') return pin.type === 'story';
    if (filterType === 'book') return pin.type === 'book';
    if (filterType === 'ai') return pin.isAI || pin.tags?.some((t) => t.toLowerCase().includes('ai'));
    return true;
  });

  return (
    <div className="saved-page-container">
      {/* Page Header */}
      <div className="page-header-banner">
        <div className="page-header-title-row">
          <div className="page-title-icon-box">
            <BookmarkFilled style={{ color: '#e11d48', fontSize: '24px' }} />
          </div>
          <div>
            <h1 className="page-main-title font-cinzel">Saved Artifacts</h1>
            <p className="page-subtitle text-slate-400">
              Your private sanctuary of bookmarked images, stories, folios, and AI visions ({savedPins.length} items)
            </p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="saved-filter-pills">
          <button
            type="button"
            className={`filter-pill ${filterType === 'all' ? 'active' : ''}`}
            onClick={() => setFilterType('all')}
          >
            All Saved ({savedPins.length})
          </button>
          <button
            type="button"
            className={`filter-pill ${filterType === 'image' ? 'active' : ''}`}
            onClick={() => setFilterType('image')}
          >
            <PictureOutlined /> Images
          </button>
          <button
            type="button"
            className={`filter-pill ${filterType === 'story' ? 'active' : ''}`}
            onClick={() => setFilterType('story')}
          >
            <BookOutlined /> Stories
          </button>
          <button
            type="button"
            className={`filter-pill ${filterType === 'book' ? 'active' : ''}`}
            onClick={() => setFilterType('book')}
          >
            <ReadOutlined /> Books
          </button>
          <button
            type="button"
            className={`filter-pill ${filterType === 'ai' ? 'active' : ''}`}
            onClick={() => setFilterType('ai')}
          >
            <ThunderboltFilled /> AI Creations
          </button>
        </div>
      </div>

      {/* Grid or Empty State */}
      {filteredSavedPins.length > 0 ? (
        <div className="pins-masonry-grid">
          {filteredSavedPins.map((pin) => (
            <PinCard key={pin.id} pin={pin} />
          ))}
        </div>
      ) : (
        <div className="empty-state-card">
          <BookmarkFilled style={{ fontSize: '48px', color: '#475569', marginBottom: '16px' }} />
          <h3 className="text-lg font-bold text-slate-200">No saved items found</h3>
          <p className="text-sm text-slate-400 max-w-sm mx-auto mt-2">
            Browse Home or Explore, and tap the Save button on any post to keep it safe in your personal vault.
          </p>
        </div>
      )}
    </div>
  );
}
