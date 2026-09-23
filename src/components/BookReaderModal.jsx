import React, { useState } from 'react';
import {
  CloseOutlined,
  HeartOutlined,
  HeartFilled,
  PushpinOutlined,
  PushpinFilled,
  LeftOutlined,
  RightOutlined,
  UnorderedListOutlined,
  BookOutlined,
  ShareAltOutlined,
  CheckOutlined,
} from '@ant-design/icons';
import { App } from 'antd';
import { usePinterest } from '../context/PinterestContext.jsx';

export function BookReaderModal({ pin, onClose }) {
  const { message } = App.useApp();
  const { isSaved, isLiked, toggleLike, toggleSave } = usePinterest();
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [showToc, setShowToc] = useState(false);
  const [fontSize, setFontSize] = useState('medium'); // 'small' | 'medium' | 'large'
  const [bookmarkedPage, setBookmarkedPage] = useState(null);
  const [copied, setCopied] = useState(false);

  if (!pin) return null;

  const chapters = pin.chapters && pin.chapters.length > 0 ? pin.chapters : [
    {
      id: 'default-ch',
      number: 'I',
      title: pin.title,
      pageNumber: 1,
      content: pin.summary || pin.description || 'This rare manuscript is currently undergoing illumination.',
    }
  ];

  const currentChapter = chapters[currentChapterIndex] || chapters[0];
  const totalChapters = chapters.length;

  const saved = isSaved(pin.id);
  const liked = isLiked(pin.id);

  const handleNext = () => {
    if (currentChapterIndex < totalChapters - 1) {
      setCurrentChapterIndex(currentChapterIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentChapterIndex > 0) {
      setCurrentChapterIndex(currentChapterIndex - 1);
    }
  };

  const handleToggleBookmark = () => {
    if (bookmarkedPage === currentChapterIndex) {
      setBookmarkedPage(null);
      message.info('Bookmark removed');
    } else {
      setBookmarkedPage(currentChapterIndex);
      message.success(`Bookmarked Chapter ${currentChapter.number}: ${currentChapter.title}`);
    }
  };

  const handleShare = () => {
    try {
      navigator.clipboard.writeText(`${window.location.origin}/#book-${pin.id}`);
      setCopied(true);
      message.success('Book link copied!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      message.info('Book link ready');
    }
  };

  const progressPercent = Math.round(((currentChapterIndex + 1) / totalChapters) * 100);

  return (
    <div className="pin-modal-backdrop" onClick={onClose}>
      <div
        className="pin-modal-container book-reader-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Book Header Bar */}
        <header className="book-reader-header">
          <div className="book-header-left">
            <button
              type="button"
              className={`toc-toggle-btn ${showToc ? 'active' : ''}`}
              onClick={() => setShowToc(!showToc)}
              title="Table of Contents"
            >
              <UnorderedListOutlined />
              <span>Contents</span>
            </button>

            <span className="book-nav-divider">|</span>
            <span className="book-shelf-category">{pin.category}</span>
          </div>

          <div className="book-header-title-box">
            <h2 className="book-reader-main-title">{pin.title}</h2>
            <span className="book-reader-author">by {pin.author?.name} · {pin.year}</span>
          </div>

          <div className="book-header-actions">
            {/* Font Size */}
            <div className="book-font-adjuster">
              <button
                type="button"
                className={`font-btn ${fontSize === 'small' ? 'active' : ''}`}
                onClick={() => setFontSize('small')}
              >
                A-
              </button>
              <button
                type="button"
                className={`font-btn ${fontSize === 'medium' ? 'active' : ''}`}
                onClick={() => setFontSize('medium')}
              >
                A
              </button>
              <button
                type="button"
                className={`font-btn ${fontSize === 'large' ? 'active' : ''}`}
                onClick={() => setFontSize('large')}
              >
                A+
              </button>
            </div>

            {/* Bookmark */}
            <button
              type="button"
              className={`book-header-btn ${bookmarkedPage === currentChapterIndex ? 'active' : ''}`}
              onClick={handleToggleBookmark}
              title={bookmarkedPage === currentChapterIndex ? 'Remove bookmark' : 'Bookmark this chapter'}
            >
              <PushpinFilled style={{ color: bookmarkedPage === currentChapterIndex ? '#f59e0b' : 'inherit' }} />
            </button>

            {/* Like */}
            <button
              type="button"
              className={`book-header-btn ${liked ? 'active' : ''}`}
              onClick={() => toggleLike(pin.id)}
            >
              {liked ? <HeartFilled style={{ color: '#ef4444' }} /> : <HeartOutlined />}
              <span>{pin.likes}</span>
            </button>

            {/* Save */}
            <button
              type="button"
              className={`book-header-save-btn ${saved ? 'is-saved' : ''}`}
              onClick={() => toggleSave(pin.id)}
            >
              {saved ? 'Saved' : 'Save Book'}
            </button>

            {/* Share */}
            <button
              type="button"
              className="book-header-btn"
              onClick={handleShare}
            >
              {copied ? <CheckOutlined style={{ color: '#10b981' }} /> : <ShareAltOutlined />}
            </button>

            <button
              type="button"
              className="modal-close-btn"
              onClick={onClose}
              aria-label="Close book reader"
            >
              <CloseOutlined />
            </button>
          </div>
        </header>

        {/* Reading Progress Indicator */}
        <div className="book-progress-bar-wrap">
          <div className="book-progress-fill" style={{ width: `${progressPercent}%` }} />
        </div>

        {/* Main Book Area: Sidebar TOC + Illuminated Page */}
        <div className="book-reader-body">
          {/* Table of Contents Drawer */}
          {showToc && (
            <aside className="book-toc-sidebar">
              <div className="toc-header">
                <h3>Table of Contents</h3>
                <span className="toc-count">{totalChapters} Chapters</span>
              </div>
              <ul className="toc-list">
                {chapters.map((ch, idx) => (
                  <li key={ch.id || idx}>
                    <button
                      type="button"
                      className={`toc-chapter-item ${currentChapterIndex === idx ? 'current' : ''}`}
                      onClick={() => {
                        setCurrentChapterIndex(idx);
                        setShowToc(false);
                      }}
                    >
                      <span className="toc-roman">{ch.number}.</span>
                      <span className="toc-title">{ch.title}</span>
                      {bookmarkedPage === idx && <PushpinFilled className="toc-bookmark-dot" />}
                    </button>
                  </li>
                ))}
              </ul>
            </aside>
          )}

          {/* Illuminated Folio Page */}
          <div className="book-folio-page-container">
            <div className={`book-folio-page text-${fontSize}`}>
              {/* Ornate Page Filigree Border */}
              <div className="folio-frame">
                <div className="folio-corner tl">✦</div>
                <div className="folio-corner tr">✦</div>
                <div className="folio-corner bl">✦</div>
                <div className="folio-corner br">✦</div>

                <div className="folio-chapter-indicator">
                  <span>CHAPTER {currentChapter.number}</span>
                  <span className="folio-divider">·</span>
                  <span>PAGE {currentChapter.pageNumber || currentChapterIndex + 1}</span>
                </div>

                <h3 className="folio-chapter-title">{currentChapter.title}</h3>

                <div className="folio-manuscript-text">
                  {currentChapter.content.split('\n\n').map((para, i) => (
                    <p key={i} className={i === 0 ? 'illuminated-first-p' : ''}>
                      {para}
                    </p>
                  ))}
                </div>

                <div className="folio-footer-ornament">
                  <span>— ❖ —</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Book Footer Pagination Bar */}
        <footer className="book-pagination-footer">
          <button
            type="button"
            className="page-nav-btn prev"
            onClick={handlePrev}
            disabled={currentChapterIndex === 0}
          >
            <LeftOutlined />
            <span>Previous Chapter</span>
          </button>

          <div className="page-status-pill">
            <span>Chapter {currentChapterIndex + 1} of {totalChapters}</span>
            <span className="page-pct">({progressPercent}%)</span>
          </div>

          <button
            type="button"
            className="page-nav-btn next"
            onClick={handleNext}
            disabled={currentChapterIndex === totalChapters - 1}
          >
            <span>Next Chapter</span>
            <RightOutlined />
          </button>
        </footer>
      </div>
    </div>
  );
}
