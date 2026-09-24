import React, { useState } from 'react';
import {
  CloseOutlined,
  HeartOutlined,
  HeartFilled,
  PushpinOutlined,
  PushpinFilled,
  ShareAltOutlined,
  SendOutlined,
  CameraOutlined,
  CheckOutlined,
} from '@ant-design/icons';
import { App } from 'antd';
import { usePinterest } from '../context/PinterestContext.jsx';
import { useTheme } from '../context/ThemeContext.jsx';
import { PinArtwork } from './PinArtwork.jsx';

export function ImageDetailModal({ pin, onClose }) {
  const { message } = App.useApp();
  const { isSaved, isLiked, toggleLike, toggleSave, addComment } = usePinterest();
  const { isDark } = useTheme();
  const [commentText, setCommentText] = useState('');
  const [copied, setCopied] = useState(false);

  if (!pin) return null;

  const saved = isSaved(pin.id);
  const liked = isLiked(pin.id);

  const handleSendComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addComment(pin.id, commentText);
    setCommentText('');
    message.success('Comment posted to pin!');
  };

  const handleShare = () => {
    try {
      navigator.clipboard.writeText(`${window.location.origin}/#pin-${pin.id}`);
      setCopied(true);
      message.success('Pin link copied!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      message.info('Pin link ready to share');
    }
  };

  return (
    <div className={`pin-modal-backdrop ${isDark ? 'dark-mode' : 'light-mode'}`} onClick={onClose}>
      <div
        className={`pin-modal-container image-modal ${isDark ? 'modal-theme-dark' : 'modal-theme-light'}`}
        data-theme={isDark ? 'dark' : 'light'}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close modal"
        >
          <CloseOutlined />
        </button>

        {/* 2-Column Split: Visual Showcase (Left) + Details & Discussion (Right) */}
        <div className="image-modal-grid">
          {/* Left Column: Expanded Visual Canvas */}
          <div className="image-modal-visual-col">
            <div className="visual-display-frame">
              <PinArtwork pin={pin} className="modal-art-large" />
            </div>
            {pin.details?.palette && (
              <div className="image-palette-strip">
                <span className="palette-label">Palette:</span>
                <div className="palette-swatches">
                  {pin.details.palette.map((hex, i) => (
                    <button
                      key={i}
                      type="button"
                      className="swatch-btn"
                      style={{ backgroundColor: hex }}
                      title={`Click to copy: ${hex}`}
                      onClick={() => {
                        navigator.clipboard.writeText(hex);
                        message.success(`Copied ${hex}`);
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Information, EXIF Data & Social Discussion */}
          <div className="image-modal-info-col">
            {/* Top Bar with Save & Like */}
            <div className="modal-top-actions">
              <div className="modal-category-chip">{pin.category}</div>

              <div className="modal-action-buttons">
                <button
                  type="button"
                  className={`modal-btn-icon ${liked ? 'is-liked' : ''}`}
                  onClick={() => toggleLike(pin.id)}
                  title={liked ? 'Unlike' : 'Like'}
                >
                  {liked ? <HeartFilled style={{ color: '#ef4444' }} /> : <HeartOutlined />}
                  <span>{pin.likes}</span>
                </button>

                <button
                  type="button"
                  className="modal-btn-icon"
                  onClick={handleShare}
                  title="Share"
                >
                  {copied ? <CheckOutlined style={{ color: '#10b981' }} /> : <ShareAltOutlined />}
                </button>

                <button
                  type="button"
                  className={`modal-save-primary-btn ${saved ? 'is-saved' : ''}`}
                  onClick={() => toggleSave(pin.id)}
                >
                  {saved ? <PushpinFilled /> : <PushpinOutlined />}
                  <span>{saved ? 'Saved' : 'Save'}</span>
                </button>
              </div>
            </div>

            {/* Title & Description */}
            <h2 className="modal-pin-title">{pin.title}</h2>
            {pin.description && <p className="modal-pin-desc">{pin.description}</p>}

            {/* Author Credit Box */}
            <div className="modal-author-card">
              <div className="author-avatar-large">
                {pin.author?.avatar ? (
                  <img
                    src={pin.author.avatar}
                    alt={pin.author.name}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div
                  className="author-initials-large"
                  style={{ display: pin.author?.avatar ? 'none' : 'flex' }}
                >
                  {pin.author?.initials || 'AR'}
                </div>
              </div>

              <div className="author-meta-text">
                <span className="author-fullname">{pin.author?.name}</span>
                <span className="author-handle">{pin.author?.handle}</span>
                {pin.author?.bio && <p className="author-bio-line">{pin.author.bio}</p>}
              </div>
            </div>

            {/* Technical Camera / Art Specifications */}
            {pin.details && (
              <div className="modal-tech-specs">
                <div className="specs-header">
                  <CameraOutlined />
                  <span>Optics & Exhibition Details</span>
                </div>
                <div className="specs-grid">
                  {pin.details.camera && (
                    <div className="spec-item">
                      <span className="spec-key">Camera / Medium</span>
                      <span className="spec-val">{pin.details.camera}</span>
                    </div>
                  )}
                  {pin.details.shutter && (
                    <div className="spec-item">
                      <span className="spec-key">Exposure</span>
                      <span className="spec-val">{pin.details.shutter}</span>
                    </div>
                  )}
                  {pin.details.iso && (
                    <div className="spec-item">
                      <span className="spec-key">ISO / Process</span>
                      <span className="spec-val">{pin.details.iso}</span>
                    </div>
                  )}
                  {pin.details.location && (
                    <div className="spec-item">
                      <span className="spec-key">Location</span>
                      <span className="spec-val">{pin.details.location}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Tags Strip */}
            {pin.tags && (
              <div className="modal-tags-list">
                {pin.tags.map((tag) => (
                  <span key={tag} className="tag-item">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Comments / Discussion Section */}
            <div className="modal-discussion-box">
              <h4 className="discussion-heading">Discussion ({pin.comments?.length || 0})</h4>

              <div className="comments-stream">
                {pin.comments && pin.comments.length > 0 ? (
                  pin.comments.map((c) => (
                    <div key={c.id} className="comment-bubble">
                      <div className="comment-header-row">
                        <span className="comment-user">{c.user}</span>
                        <span className="comment-time">{c.time}</span>
                      </div>
                      <p className="comment-text">{c.text}</p>
                    </div>
                  ))
                ) : (
                  <p className="no-comments-hint">No comments yet. Leave the first impression.</p>
                )}
              </div>

              {/* Add Comment Input */}
              <form onSubmit={handleSendComment} className="comment-form">
                <input
                  type="text"
                  className="comment-input"
                  placeholder="Add a nocturnal thought..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <button
                  type="submit"
                  className="comment-send-btn"
                  disabled={!commentText.trim()}
                  aria-label="Send comment"
                >
                  <SendOutlined />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
