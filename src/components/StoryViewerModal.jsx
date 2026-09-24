import React, { useState, useEffect, useRef } from 'react';
import {
  CloseOutlined,
  HeartOutlined,
  HeartFilled,
  DeleteOutlined,
  EyeOutlined,
  ClockCircleOutlined,
  SendOutlined,
  ThunderboltFilled,
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons';
import { App } from 'antd';
import { usePinterest } from '../context/PinterestContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export function StoryViewerModal({ stories, initialIndex = 0, onClose }) {
  const { message } = App.useApp();
  const { deleteStory, recordStoryView } = usePinterest();
  const { currentUser } = useAuth();

  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [replyText, setReplyText] = useState('');

  const currentStory = stories[currentIndex];
  const timerRef = useRef(null);
  const startTimeRef = useRef(Date.now());
  const elapsedBeforePauseRef = useRef(0);
  const STORY_DURATION = 5000; // 5 seconds per story

  // Record view on story open or change
  useEffect(() => {
    if (currentStory) {
      recordStoryView(currentStory.id);
    }
  }, [currentIndex, currentStory?.id]);

  // Story progress timer
  useEffect(() => {
    if (!currentStory || isPaused) return;

    startTimeRef.current = Date.now() - elapsedBeforePauseRef.current;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const pct = Math.min(100, (elapsed / STORY_DURATION) * 100);
      setProgress(pct);

      if (elapsed >= STORY_DURATION) {
        clearInterval(interval);
        handleNext();
      }
    }, 40);

    return () => clearInterval(interval);
  }, [currentIndex, isPaused, currentStory]);

  const handleNext = () => {
    elapsedBeforePauseRef.current = 0;
    setProgress(0);
    if (currentIndex < stories.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    elapsedBeforePauseRef.current = 0;
    setProgress(0);
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handlePause = () => {
    setIsPaused(true);
    elapsedBeforePauseRef.current = Date.now() - startTimeRef.current;
  };

  const handleResume = () => {
    setIsPaused(false);
  };

  // Calculate remaining time before 24h expiration
  const getExpirationText = (expiresAt) => {
    if (!expiresAt) return 'Expires in 24 hours';
    const remainingMs = new Date(expiresAt).getTime() - Date.now();
    if (remainingMs <= 0) return 'Expired';
    const hours = Math.floor(remainingMs / (1000 * 60 * 60));
    const mins = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60));
    if (hours > 0) return `Expires in ${hours}h ${mins}m`;
    return `Expires in ${mins}m`;
  };

  const handleDelete = () => {
    deleteStory(currentStory.id);
    message.info('Story removed');
    if (stories.length <= 1) {
      onClose();
    } else {
      handleNext();
    }
  };

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    message.success(`Reply sent to ${currentStory.authorName}!`);
    setReplyText('');
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, stories.length]);

  if (!currentStory) return null;

  const isOwn = currentStory.authorId === currentUser?.id;

  return (
    <div className="story-viewer-backdrop" onClick={onClose}>
      <div
        className="story-viewer-card"
        onClick={(e) => e.stopPropagation()}
        onMouseDown={handlePause}
        onMouseUp={handleResume}
        onTouchStart={handlePause}
        onTouchEnd={handleResume}
      >
        {/* Story Progress Segments */}
        <div className="story-progress-bars">
          {stories.map((s, idx) => {
            let width = 0;
            if (idx < currentIndex) width = 100;
            else if (idx === currentIndex) width = progress;
            return (
              <div key={s.id} className="story-progress-track">
                <div className="story-progress-fill" style={{ width: `${width}%` }} />
              </div>
            );
          })}
        </div>

        {/* Story Header */}
        <div className="story-viewer-header">
          <div className="story-viewer-author">
            <img
              src={currentStory.authorAvatar}
              alt={currentStory.authorName}
              className="story-viewer-avatar"
              referrerPolicy="no-referrer"
            />
            <div className="story-viewer-meta">
              <div className="story-viewer-name">
                <span>{currentStory.authorName}</span>
                {currentStory.isAI && (
                  <span className="story-viewer-ai-tag">
                    <ThunderboltFilled /> AI
                  </span>
                )}
              </div>
              <div className="story-viewer-sub">
                <span>@{currentStory.authorUsername}</span>
                <span className="story-viewer-dot">•</span>
                <span className="story-viewer-expiry">
                  <ClockCircleOutlined /> {getExpirationText(currentStory.expiresAt)}
                </span>
              </div>
            </div>
          </div>

          <div className="story-viewer-actions">
            <span className="story-views-badge" title="Story views">
              <EyeOutlined /> {currentStory.viewsCount || 1}
            </span>
            {isOwn && (
              <button
                className="story-action-btn delete-btn"
                onClick={handleDelete}
                title="Delete your story"
              >
                <DeleteOutlined />
              </button>
            )}
            <button className="story-action-btn close-btn" onClick={onClose} title="Close">
              <CloseOutlined />
            </button>
          </div>
        </div>

        {/* Navigation Overlays */}
        <button
          className="story-nav-btn prev-btn"
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          disabled={currentIndex === 0}
        >
          <LeftOutlined />
        </button>
        <button
          className="story-nav-btn next-btn"
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
        >
          <RightOutlined />
        </button>

        {/* Main Story Image Media */}
        <div className="story-media-container">
          <img
            src={currentStory.mediaUrl}
            alt={currentStory.caption || 'Story'}
            className="story-media-image"
            referrerPolicy="no-referrer"
          />
          {/* Gradient Overlay for text readability */}
          <div className="story-bottom-gradient" />
        </div>

        {/* Story Caption & Link */}
        <div className="story-caption-overlay">
          {currentStory.caption && <p className="story-caption-text">{currentStory.caption}</p>}
          {currentStory.linkUrl && (
            <a
              href={currentStory.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="story-link-pill"
              onClick={(e) => e.stopPropagation()}
            >
              🔗 {currentStory.linkUrl.replace(/^https?:\/\//, '')}
            </a>
          )}
        </div>

        {/* Story Footer Input */}
        <div className="story-viewer-footer" onClick={(e) => e.stopPropagation()}>
          <form className="story-reply-form" onSubmit={handleSendReply}>
            <input
              type="text"
              placeholder={`Reply to ${currentStory.authorName.split(' ')[0]}...`}
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="story-reply-input"
            />
            <button type="submit" className="story-reply-send" disabled={!replyText.trim()}>
              <SendOutlined />
            </button>
          </form>
          <button
            type="button"
            className={`story-like-btn ${isLiked ? 'liked' : ''}`}
            onClick={() => setIsLiked(!isLiked)}
            title="Like this story"
          >
            {isLiked ? <HeartFilled style={{ color: '#f43f5e' }} /> : <HeartOutlined />}
          </button>
        </div>
      </div>
    </div>
  );
}
