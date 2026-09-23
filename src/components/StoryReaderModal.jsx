import React, { useState } from 'react';
import {
  CloseOutlined,
  HeartOutlined,
  HeartFilled,
  PushpinOutlined,
  PushpinFilled,
  ShareAltOutlined,
  FontSizeOutlined,
  BulbOutlined,
  SendOutlined,
  CheckOutlined,
} from '@ant-design/icons';
import { App } from 'antd';
import { usePinterest } from '../context/PinterestContext.jsx';

export function StoryReaderModal({ pin, onClose }) {
  const { message } = App.useApp();
  const { isSaved, isLiked, toggleLike, toggleSave, addComment } = usePinterest();
  const [fontSize, setFontSize] = useState('medium'); // 'small', 'medium', 'large'
  const [fontFamily, setFontFamily] = useState('serif'); // 'serif', 'sans'
  const [readingTheme, setReadingTheme] = useState('obsidian'); // 'obsidian', 'sepia', 'night'
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
    message.success('Comment posted to story!');
  };

  const handleShare = () => {
    try {
      navigator.clipboard.writeText(`${window.location.origin}/#story-${pin.id}`);
      setCopied(true);
      message.success('Story link copied!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      message.info('Story link ready to share');
    }
  };

  const fontSizeClass = {
    small: 'reader-text-sm',
    medium: 'reader-text-md',
    large: 'reader-text-lg',
  }[fontSize];

  const themeClass = {
    obsidian: 'reader-theme-obsidian',
    sepia: 'reader-theme-sepia',
    night: 'reader-theme-night',
  }[readingTheme];

  return (
    <div className="pin-modal-backdrop" onClick={onClose}>
      <div
        className={`pin-modal-container story-reader-modal ${themeClass}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Reader Toolbar */}
        <header className="story-reader-toolbar">
          <div className="toolbar-left">
            <span className="reader-kicker">STORY READER</span>
            <span className="reader-dot">·</span>
            <span className="reader-time">{pin.readTime}</span>
          </div>

          <div className="toolbar-center">
            {/* Font Family Switcher */}
            <div className="reader-tool-group">
              <button
                type="button"
                className={`reader-toggle-btn ${fontFamily === 'serif' ? 'active' : ''}`}
                onClick={() => setFontFamily('serif')}
                title="Serif Literary Font"
              >
                Serif
              </button>
              <button
                type="button"
                className={`reader-toggle-btn ${fontFamily === 'sans' ? 'active' : ''}`}
                onClick={() => setFontFamily('sans')}
                title="Sans Modern Font"
              >
                Sans
              </button>
            </div>

            {/* Font Size Adjuster */}
            <div className="reader-tool-group">
              <button
                type="button"
                className={`reader-toggle-btn ${fontSize === 'small' ? 'active' : ''}`}
                onClick={() => setFontSize('small')}
                title="Small Font"
              >
                A-
              </button>
              <button
                type="button"
                className={`reader-toggle-btn ${fontSize === 'medium' ? 'active' : ''}`}
                onClick={() => setFontSize('medium')}
                title="Medium Font"
              >
                A
              </button>
              <button
                type="button"
                className={`reader-toggle-btn ${fontSize === 'large' ? 'active' : ''}`}
                onClick={() => setFontSize('large')}
                title="Large Font"
              >
                A+
              </button>
            </div>

            {/* Background Theme Mode */}
            <div className="reader-tool-group theme-swatches">
              <button
                type="button"
                className={`theme-dot obsidian ${readingTheme === 'obsidian' ? 'active' : ''}`}
                onClick={() => setReadingTheme('obsidian')}
                title="Obsidian Dark"
              />
              <button
                type="button"
                className={`theme-dot sepia ${readingTheme === 'sepia' ? 'active' : ''}`}
                onClick={() => setReadingTheme('sepia')}
                title="Warm Candlelight"
              />
              <button
                type="button"
                className={`theme-dot night ${readingTheme === 'night' ? 'active' : ''}`}
                onClick={() => setReadingTheme('night')}
                title="Deep Midnight"
              />
            </div>
          </div>

          <div className="toolbar-right">
            <button
              type="button"
              className={`reader-action-btn ${liked ? 'is-liked' : ''}`}
              onClick={() => toggleLike(pin.id)}
              title={liked ? 'Unlike' : 'Like'}
            >
              {liked ? <HeartFilled style={{ color: '#ef4444' }} /> : <HeartOutlined />}
              <span>{pin.likes}</span>
            </button>

            <button
              type="button"
              className={`reader-action-btn ${saved ? 'is-saved' : ''}`}
              onClick={() => toggleSave(pin.id)}
              title={saved ? 'Remove from saved' : 'Save story'}
            >
              {saved ? <PushpinFilled /> : <PushpinOutlined />}
              <span>{saved ? 'Saved' : 'Save'}</span>
            </button>

            <button
              type="button"
              className="reader-action-btn"
              onClick={handleShare}
              title="Share"
            >
              {copied ? <CheckOutlined style={{ color: '#10b981' }} /> : <ShareAltOutlined />}
            </button>

            <button
              type="button"
              className="modal-close-btn"
              onClick={onClose}
              aria-label="Close story reader"
            >
              <CloseOutlined />
            </button>
          </div>
        </header>

        {/* Scrollable Story Manuscript Viewport */}
        <div className="story-scroll-pane">
          <article className={`story-prose-container ${fontSizeClass} font-${fontFamily}`}>
            {/* Story Header */}
            <div className="story-article-header">
              <div className="story-category-lead">{pin.category}</div>
              <h1 className="story-article-title">{pin.title}</h1>

              <div className="story-byline-cluster">
                <div className="byline-avatar">
                  {pin.author?.initials || 'AP'}
                </div>
                <div className="byline-text">
                  <span className="byline-author">{pin.author?.name}</span>
                  <span className="byline-meta">{pin.readTime} · Nocturnal Archive</span>
                </div>
              </div>

              {pin.quote && (
                <blockquote className="story-featured-quote">
                  {pin.quote}
                </blockquote>
              )}
            </div>

            {/* Story Manuscript Body */}
            <div className="story-manuscript-body">
              {pin.fullStory ? (
                pin.fullStory.split('\n\n').map((paragraph, idx) => {
                  if (paragraph.startsWith('Chapter') || paragraph.startsWith('Part')) {
                    return (
                      <h2 key={idx} className="story-chapter-subhead">
                        {paragraph}
                      </h2>
                    );
                  }
                  return (
                    <p key={idx} className={idx === 0 ? 'story-first-paragraph' : ''}>
                      {paragraph}
                    </p>
                  );
                })
              ) : (
                <p className="story-first-paragraph">{pin.excerpt}</p>
              )}
            </div>

            {/* Story End Vignette */}
            <div className="story-end-ornament">
              <span>✦ · ✦ · ✦</span>
            </div>

            {/* Author Profile Note */}
            <div className="story-author-note-box">
              <div className="author-note-avatar">
                {pin.author?.initials || 'AP'}
              </div>
              <div className="author-note-content">
                <span className="note-label">About the Author</span>
                <h4 className="note-name">{pin.author?.name} ({pin.author?.handle})</h4>
                <p className="note-bio">{pin.author?.bio}</p>
              </div>
            </div>

            {/* Comments Stream */}
            <section className="story-comments-section">
              <h3 className="section-title">Reader Comments ({pin.comments?.length || 0})</h3>

              <div className="story-comments-list">
                {pin.comments && pin.comments.length > 0 ? (
                  pin.comments.map((c) => (
                    <div key={c.id} className="reader-comment-card">
                      <div className="comment-meta">
                        <span className="commenter-name">{c.user}</span>
                        <span className="commenter-time">{c.time}</span>
                      </div>
                      <p className="comment-body">{c.text}</p>
                    </div>
                  ))
                ) : (
                  <p className="no-comments-prompt">Be the first to share your reflections on this tale.</p>
                )}
              </div>

              <form onSubmit={handleSendComment} className="reader-comment-form">
                <input
                  type="text"
                  className="reader-comment-input"
                  placeholder="Leave a comment on this story..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <button
                  type="submit"
                  className="reader-comment-submit"
                  disabled={!commentText.trim()}
                >
                  <SendOutlined /> Post
                </button>
              </form>
            </section>
          </article>
        </div>
      </div>
    </div>
  );
}
