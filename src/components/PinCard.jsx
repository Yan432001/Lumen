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
  FolderAddOutlined,
  WarningOutlined,
  EllipsisOutlined,
  DeleteOutlined,
  ThunderboltFilled,
} from '@ant-design/icons';
import { BookmarkOutlined, BookmarkFilled } from './BookmarkIcons.jsx';
import { Dropdown, App } from 'antd';
import { usePinterest } from '../context/PinterestContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { PinArtwork } from './PinArtwork.jsx';

export function PinCard({ pin }) {
  const { message } = App.useApp();
  const {
    isSaved,
    isLiked,
    isPinned,
    toggleLike,
    toggleSave,
    togglePinToProfile,
    openPin,
    setAddToLibraryTargetPin,
    setReportTargetPin,
    deletePin,
  } = usePinterest();
  const { currentUser, logActivity } = useAuth();
  const [copied, setCopied] = useState(false);

  // Dynamic aspect ratio calculation based on pin metadata or natural image dimensions
  // Stories use fixed consistent sizing matching "The Weaver in the Black Alder Wood"
  const isStory = pin.type === 'story';

  const initialRatio = React.useMemo(() => {
    if (isStory) return null;
    if (pin.aspectRatio) {
      return pin.aspectRatio.includes(':')
        ? pin.aspectRatio.replace(':', ' / ')
        : pin.aspectRatio;
    }
    return null;
  }, [pin.aspectRatio, isStory]);

  const [cardAspectRatio, setCardAspectRatio] = useState(initialRatio);

  React.useEffect(() => {
    if (isStory) {
      setCardAspectRatio(null);
    } else if (initialRatio) {
      setCardAspectRatio(initialRatio);
    }
  }, [initialRatio, isStory]);

  const saved = isSaved(pin.id);
  const liked = isLiked(pin.id);
  const pinned = isPinned(pin.id);
  const isAuthor = pin.author?.id === currentUser?.id || pin.author?.handle === `@${currentUser?.username}`;

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
      message.success(`Saved "${pin.title}"!`);
      logActivity('save', `Saved "${pin.title}"`, 'bookmark');
    } else {
      message.info(`Removed "${pin.title}" from saved`);
    }
  };

  const handlePinToProfile = (e) => {
    e.stopPropagation();
    togglePinToProfile(pin.id);
    if (!pinned) {
      message.success(`Pinned "${pin.title}" to your Profile!`);
      logActivity('pin', `Pinned "${pin.title}" to profile`, 'pushpin');
    } else {
      message.info(`Unpinned "${pin.title}" from profile`);
    }
  };

  const handleAddToLibrary = (e) => {
    e.stopPropagation();
    setAddToLibraryTargetPin(pin);
  };

  const handleReport = (e) => {
    e.stopPropagation();
    setReportTargetPin(pin);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    deletePin(pin.id);
    message.info(`Deleted post "${pin.title}"`);
  };

  // Actions Dropdown menu
  const menuItems = [
    {
      key: 'save',
      label: (
        <div className="flex items-center gap-2 py-1" onClick={handleSaveClick}>
          {saved ? <BookmarkFilled style={{ color: '#e11d48' }} /> : <BookmarkOutlined />}
          <span>{saved ? 'Remove from Saved' : 'Save to Vault'}</span>
        </div>
      ),
    },
    {
      key: 'pin-profile',
      label: (
        <div className="flex items-center gap-2 py-1" onClick={handlePinToProfile}>
          {pinned ? <PushpinFilled style={{ color: '#00f2fe' }} /> : <PushpinOutlined />}
          <span>{pinned ? 'Unpin from Profile' : 'Pin to Profile'}</span>
        </div>
      ),
    },
    {
      key: 'library',
      label: (
        <div className="flex items-center gap-2 py-1" onClick={handleAddToLibrary}>
          <FolderAddOutlined style={{ color: '#38bdf8' }} />
          <span>Add to Library Collection...</span>
        </div>
      ),
    },
    {
      key: 'share',
      label: (
        <div className="flex items-center gap-2 py-1" onClick={handleShare}>
          <ShareAltOutlined />
          <span>Share Link</span>
        </div>
      ),
    },
    {
      type: 'divider',
    },
    ...(isAuthor
      ? [
          {
            key: 'delete',
            danger: true,
            label: (
              <div className="flex items-center gap-2 py-1 text-rose-500" onClick={handleDelete}>
                <DeleteOutlined />
                <span>Delete Own Post</span>
              </div>
            ),
          },
        ]
      : [
          {
            key: 'report',
            label: (
              <div className="flex items-center gap-2 py-1 text-slate-400" onClick={handleReport}>
                <WarningOutlined />
                <span>Report Content</span>
              </div>
            ),
          },
        ]),
  ];

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
      {/* Flexible Visual Container with aspect-ratio based dynamic height (fixed for stories) */}
      <div
        className="pin-visual-wrapper"
        style={!isStory && cardAspectRatio ? { aspectRatio: cardAspectRatio } : undefined}
      >
        <PinArtwork
          pin={pin}
          onAspectRatioCalculated={!isStory ? (calcRatio) => setCardAspectRatio(calcRatio) : undefined}
        />

        {/* Pinned Ribbon if active */}
        {pinned && (
          <div className="pin-pinned-badge" title="Pinned to Profile">
            <PushpinFilled />
          </div>
        )}

        {/* AI Synthetic Badge if generated */}
        {pin.isAI && (
          <div className="pin-ai-indicator" title="AI Generated Visual">
            <ThunderboltFilled /> AI
          </div>
        )}

        {/* Hover Overlay with Controls */}
        <div className="pin-hover-overlay">
          {/* Top Bar on Hover */}
          <div className="pin-top-controls">
            <span className="pin-type-pill">
              {currentType.icon}
              <span>{currentType.label}</span>
            </span>

            <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                className={`pin-save-btn ${saved ? 'is-saved' : ''}`}
                onClick={handleSaveClick}
                title={saved ? 'Remove from saved' : 'Save post'}
              >
                {saved ? <BookmarkFilled /> : <BookmarkOutlined />}
                <span>{saved ? 'Saved' : 'Save'}</span>
              </button>

              <Dropdown menu={{ items: menuItems }} placement="bottomRight" trigger={['click']}>
                <button
                  type="button"
                  className="pin-more-options-btn"
                  title="More actions"
                >
                  <EllipsisOutlined />
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
                  if (!liked) {
                    logActivity('like', `Liked "${pin.title}"`, 'heart');
                  }
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
