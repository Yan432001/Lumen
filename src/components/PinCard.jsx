import React, { useState } from 'react';
import {
  HeartOutlined,
  HeartFilled,
  PushpinOutlined,
  PushpinFilled,
  BookOutlined,
  FileTextOutlined,
  PictureOutlined,
  ShareAltOutlined,
  EyeOutlined,
  ReadOutlined,
  CheckOutlined,
} from '@ant-design/icons';
import { Tooltip, Dropdown, App } from 'antd';
import { usePinterest } from '../context/PinterestContext.jsx';
import { PinArtwork } from './PinArtwork.jsx';

export function PinCard({ pin }) {
  const { message } = App.useApp();
  const { isSaved, isLiked, toggleLike, toggleSave, openPin, boards } = usePinterest();
  const [copied, setCopied] = useState(false);

  const saved = isSaved(pin.id);
  const liked = isLiked(pin.id);

  const handleShare = (e) => {
    e.stopPropagation();
    try {
      navigator.clipboard.writeText(`${window.location.origin}/#pin-${pin.id}`);
      setCopied(true);
      message.success('Pin link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      message.info(`Shared pin: "${pin.title}"`);
    }
  };

  const handleSaveClick = (e) => {
    e.stopPropagation();
    toggleSave(pin.id);
    if (!saved) {
      message.success(`Saved "${pin.title}" to Quick Saves!`);
    } else {
      message.info(`Removed "${pin.title}" from saved pins`);
    }
  };

  const boardMenuItems = boards.map((b) => ({
    key: b.id,
    label: (
      <div
        className="board-menu-item"
        onClick={(e) => {
          e.stopPropagation();
          toggleSave(pin.id, b.id);
          message.success(`Saved to board: ${b.name}`);
        }}
      >
        <span className="board-color-dot" style={{ backgroundColor: b.coverColor }} />
        <span className="board-name">{b.name}</span>
        {b.pinIds.includes(pin.id) && <CheckOutlined className="board-check" />}
      </div>
    ),
  }));

  const typeConfig = {
    image: { icon: <PictureOutlined />, label: 'Image', actionLabel: 'View' },
    story: { icon: <FileTextOutlined />, label: 'Story', actionLabel: 'Read Story' },
    book: { icon: <BookOutlined />, label: 'Book', actionLabel: 'Read Book' },
  };

  const currentType = typeConfig[pin.type] || typeConfig.image;

  return (
    <div
      className={`pin-card pin-card-${pin.type}`}
      onClick={() => openPin(pin)}
      role="article"
      aria-label={`${pin.type}: ${pin.title}`}
    >
      {/* Visual Canvas Container */}
      <div className="pin-visual-wrapper">
        <PinArtwork pin={pin} />

        {/* Hover Overlay with Pinterest Controls */}
        <div className="pin-hover-overlay">
          {/* Top Bar on Hover */}
          <div className="pin-top-controls">
            <span className="pin-type-pill">
              {currentType.icon}
              <span>{currentType.label}</span>
            </span>

            <div className="pin-save-group" onClick={(e) => e.stopPropagation()}>
              <Dropdown menu={{ items: boardMenuItems }} placement="bottomRight" trigger={['hover']}>
                <button
                  type="button"
                  className={`pin-save-btn ${saved ? 'is-saved' : ''}`}
                  onClick={handleSaveClick}
                  title={saved ? 'Remove from saved' : 'Save pin'}
                >
                  {saved ? <PushpinFilled /> : <PushpinOutlined />}
                  <span>{saved ? 'Saved' : 'Save'}</span>
                </button>
              </Dropdown>
            </div>
          </div>

          {/* Bottom Bar on Hover */}
          <div className="pin-bottom-controls">
            <button
              type="button"
              className="pin-read-cta-btn"
              onClick={(e) => {
                e.stopPropagation();
                openPin(pin);
              }}
            >
              {pin.type === 'book' || pin.type === 'story' ? <ReadOutlined /> : <EyeOutlined />}
              <span>{currentType.actionLabel}</span>
            </button>

            <div className="pin-quick-actions" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                className={`pin-icon-btn ${liked ? 'is-liked' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLike(pin.id);
                }}
                title={liked ? 'Unlike' : 'Like'}
                aria-label="Like pin"
              >
                {liked ? <HeartFilled style={{ color: '#ef4444' }} /> : <HeartOutlined />}
              </button>

              <button
                type="button"
                className="pin-icon-btn"
                onClick={handleShare}
                title="Share pin"
                aria-label="Share pin"
              >
                {copied ? <CheckOutlined style={{ color: '#10b981' }} /> : <ShareAltOutlined />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Pin Card Details Footer */}
      <div className="pin-info-footer">
        <h3 className="pin-title" title={pin.title}>
          {pin.title}
        </h3>

        {pin.type === 'story' && pin.excerpt && (
          <p className="pin-excerpt-line">{pin.excerpt}</p>
        )}

        {pin.type === 'book' && pin.summary && (
          <p className="pin-excerpt-line">{pin.summary}</p>
        )}

        {/* Clean unboxed metadata with subtle dot separators */}
        <div className="pin-author-row">
          <div className="author-id-cluster">
            {pin.author?.avatar ? (
              <img
                src={pin.author.avatar}
                alt={pin.author.name}
                referrerPolicy="no-referrer"
                className="author-avatar-img"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling.style.display = 'flex';
                }}
              />
            ) : null}
            <div
              className="author-avatar-initials"
              style={{ display: pin.author?.avatar ? 'none' : 'flex' }}
            >
              {pin.author?.initials || 'AR'}
            </div>
            <span className="author-name-text">{pin.author?.name}</span>
          </div>

          <div className="pin-metrics-group">
            <span className="metric-item">
              <HeartFilled className="metric-icon heart-metric" />
              <span>{pin.likes}</span>
            </span>
            <span className="metric-separator">·</span>
            <span className="metric-item">
              <span>{pin.savedCount} saves</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
