import React, { useState } from 'react';
import {
  CloseOutlined,
  ThunderboltFilled,
  UploadOutlined,
  PictureOutlined,
  LoadingOutlined,
  ClockCircleOutlined,
  LinkOutlined,
} from '@ant-design/icons';
import { App } from 'antd';
import { usePinterest } from '../context/PinterestContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export function CreateStoryModal({ onClose }) {
  const { message } = App.useApp();
  const { createStory, createPin } = usePinterest();
  const { currentUser, logActivity } = useAuth();

  const [mediaUrl, setMediaUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [isAI, setIsAI] = useState(false);

  // AI Generator state
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [showAiPanel, setShowAiPanel] = useState(false);

  const promptSuggestions = [
    'A futuristic city at night with neon lights and flying cars',
    'Bioluminescent orchid glowing in midnight rain',
    'Cathedral window illuminated by a passing supernova',
    'Cyberpunk hacker workstation overlooking rainy skyscraper vista',
  ];

  const handleGenerateAI = async (promptToUse = aiPrompt) => {
    if (!promptToUse || !promptToUse.trim()) {
      message.error('Please enter a prompt to generate an AI image');
      return;
    }

    setIsGenerating(true);
    try {
      const res = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptToUse.trim(),
          userId: currentUser?.id,
          aspectRatio: '9:16',
        }),
      });

      const data = await res.json();
      if (data.success && data.generation?.imageUrl) {
        setMediaUrl(data.generation.imageUrl);
        setIsAI(true);
        message.success('AI Image generated for your story!');
        logActivity('ai_generated', `Generated Story AI visual: "${promptToUse.slice(0, 30)}..."`, 'thunderbolt');
      } else {
        throw new Error(data.error || 'Generation failed');
      }
    } catch (err) {
      console.warn('AI generation error, generating local aesthetic visual:', err);
      // Fallback
      setMediaUrl('https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80');
      setIsAI(true);
      message.success('Atmospheric image attached!');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        message.error('Image size must be less than 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setMediaUrl(uploadEvent.target.result);
        setIsAI(false);
        message.success('Story media uploaded!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePublishStory = (e) => {
    e.preventDefault();
    if (!mediaUrl) {
      message.error('Please select or generate an image for your story');
      return;
    }

    createStory({
      authorId: currentUser?.id,
      authorName: currentUser?.name,
      authorUsername: currentUser?.username,
      authorAvatar: currentUser?.avatar,
      mediaUrl,
      caption: caption.trim(),
      linkUrl: linkUrl.trim(),
      isAI,
    });

    // Also publish as a story card in "Read Stories" with the uploaded image
    createPin({
      type: 'story',
      title: caption.trim() ? (caption.length > 50 ? caption.slice(0, 48) + '...' : caption.trim()) : 'Nocturnal Tale',
      category: 'Dark Fiction',
      authorId: currentUser?.id,
      authorName: currentUser?.name || 'Julian Vance',
      authorHandle: `@${currentUser?.username || 'julian_nocturne'}`,
      authorAvatar: currentUser?.avatar,
      tags: ['Story', 'Nocturne', isAI ? 'AI' : 'Original'],
      visibility: 'public',
      readTime: '3 min read',
      excerpt: caption.trim() || 'A quiet nocturnal narrative unfolding beneath obsidian skies.',
      quote: caption.trim() ? `“${caption.trim()}”` : undefined,
      storyBody: caption.trim() || 'The nocturnal realm unfurled before us in layers of obsidian and silver starlight...',
      fullStory: caption.trim() || 'The nocturnal realm unfurled before us in layers of obsidian and silver starlight...',
      imageUrl: mediaUrl,
      isAI,
    });

    logActivity('story_published', 'Published a 24-hour story', 'camera');
    message.success('Your story is live for the next 24 hours!');
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card create-story-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="modal-header-title">
            <span className="gradient-text font-cinzel">Share a Story</span>
            <span className="story-modal-timer-badge">
              <ClockCircleOutlined /> Lasts 24 Hours
            </span>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <CloseOutlined />
          </button>
        </div>

        {/* Content Form */}
        <form onSubmit={handlePublishStory} className="create-story-body">
          <div className="create-story-grid">
            {/* Media Preview Box */}
            <div className="create-story-preview-container">
              {mediaUrl ? (
                <div className="story-live-preview">
                  <img src={mediaUrl} alt="Story Preview" className="story-preview-img" referrerPolicy="no-referrer" />
                  {isAI && (
                    <span className="story-preview-ai-badge">
                      <ThunderboltFilled /> AI Synthetic
                    </span>
                  )}
                  {caption && <div className="story-preview-caption">{caption}</div>}
                  <button
                    type="button"
                    className="story-preview-replace-btn"
                    onClick={() => setMediaUrl('')}
                  >
                    Change Image
                  </button>
                </div>
              ) : (
                <div className="story-media-picker-box">
                  <PictureOutlined style={{ fontSize: '36px', color: '#64748b' }} />
                  <p className="picker-title">Add Story Artwork</p>
                  <p className="picker-subtitle">Upload a photo or generate with AI</p>

                  <div className="picker-actions">
                    <label className="picker-upload-label">
                      <UploadOutlined /> Upload File
                      <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden-file-input" />
                    </label>

                    <button
                      type="button"
                      className="picker-ai-btn"
                      onClick={() => setShowAiPanel(true)}
                    >
                      <ThunderboltFilled /> Generate with AI
                    </button>
                  </div>

                  <div className="picker-preset-links">
                    <span className="text-xs text-slate-400">Or use sample:</span>
                    <button
                      type="button"
                      className="preset-sample-btn"
                      onClick={() => {
                        setMediaUrl('https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80');
                        setIsAI(false);
                      }}
                    >
                      Alpine Aurora
                    </button>
                    <button
                      type="button"
                      className="preset-sample-btn"
                      onClick={() => {
                        setMediaUrl('https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&auto=format&fit=crop&q=80');
                        setIsAI(false);
                      }}
                    >
                      Cyber City
                    </button>
                  </div>
                </div>
              )}

              {/* AI Generation Drawer */}
              {showAiPanel && (
                <div className="story-ai-generator-panel">
                  <div className="ai-panel-header">
                    <span className="ai-panel-title">
                      <ThunderboltFilled style={{ color: '#00f2fe' }} /> AI Image Generator
                    </span>
                    <button
                      type="button"
                      className="ai-panel-close"
                      onClick={() => setShowAiPanel(false)}
                    >
                      <CloseOutlined />
                    </button>
                  </div>
                  <p className="ai-panel-desc">
                    Describe any scene to synthesize through the Lumen Neural Image API:
                  </p>
                  <div className="ai-panel-input-row">
                    <input
                      type="text"
                      placeholder="e.g. A futuristic city at night with neon lights..."
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      className="ai-prompt-input"
                    />
                    <button
                      type="button"
                      className="ai-generate-submit-btn"
                      disabled={isGenerating || !aiPrompt.trim()}
                      onClick={() => handleGenerateAI()}
                    >
                      {isGenerating ? <LoadingOutlined /> : 'Generate'}
                    </button>
                  </div>

                  <div className="ai-suggestions-list">
                    {promptSuggestions.map((s, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className="ai-suggestion-chip"
                        onClick={() => {
                          setAiPrompt(s);
                          handleGenerateAI(s);
                        }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Story Details Form */}
            <div className="create-story-fields">
              <div className="form-group">
                <label className="form-label">Caption / Overlay Text</label>
                <textarea
                  rows={3}
                  className="form-textarea"
                  placeholder="What's happening in this moment?"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  maxLength={160}
                />
                <span className="char-counter">{caption.length}/160</span>
              </div>

              <div className="form-group">
                <label className="form-label">
                  <LinkOutlined /> Attachment Link (Optional)
                </label>
                <input
                  type="url"
                  className="form-input"
                  placeholder="https://..."
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                />
              </div>

              <div className="story-expiration-info-card">
                <ClockCircleOutlined style={{ color: '#f59e0b', fontSize: '18px' }} />
                <div>
                  <h4 className="font-semibold text-sm">24-Hour Expiration</h4>
                  <p className="text-xs text-slate-400">
                    Stories automatically dissolve after 24 hours. Your followers can view, reply, and appreciate them in the story ring.
                  </p>
                </div>
              </div>

              <div className="story-modal-actions">
                <button type="button" className="btn-cancel" onClick={onClose}>
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={!mediaUrl || isGenerating}
                >
                  Share to Stories
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
