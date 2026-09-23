import React, { useState } from 'react';
import {
  CloseOutlined,
  PictureOutlined,
  FileTextOutlined,
  BookOutlined,
  PlusOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { App } from 'antd';
import { usePinterest } from '../context/PinterestContext.jsx';
import { PinArtwork } from './PinArtwork.jsx';

export function CreatePinModal({ onClose }) {
  const { message } = App.useApp();
  const { createPin, boards } = usePinterest();

  const [type, setType] = useState('image'); // 'image' | 'story' | 'book'
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Nocturnal Art');
  const [authorName, setAuthorName] = useState('');
  const [tags, setTags] = useState('Dark, Mystery, Night');
  const [targetBoardId, setTargetBoardId] = useState(boards[0]?.id || 'board-all');

  // Image specific
  const [imageUrl, setImageUrl] = useState('');
  const [imageDescription, setImageDescription] = useState('');
  const [aspectRatio, setAspectRatio] = useState('3:4');

  // Story specific
  const [readTime, setReadTime] = useState('5 min read');
  const [storyExcerpt, setStoryExcerpt] = useState('');
  const [storyFullText, setStoryFullText] = useState('');

  // Book specific
  const [bookYear, setBookYear] = useState('Published 2026');
  const [bookPages, setBookPages] = useState('96 Pages');
  const [chapter1Title, setChapter1Title] = useState('');
  const [chapter1Content, setChapter1Content] = useState('');

  // Visual style picker
  const [gradientPreset, setGradientPreset] = useState('indigo');

  const gradients = {
    indigo: {
      gradient: 'linear-gradient(180deg, #090d16 0%, #1e1b4b 100%)',
      accent: '#38bdf8',
      symbol: '🏮',
    },
    amber: {
      gradient: 'linear-gradient(135deg, #1c1917 0%, #451a03 100%)',
      accent: '#f59e0b',
      symbol: '🕯️',
    },
    emerald: {
      gradient: 'linear-gradient(135deg, #064e3b 0%, #022c22 100%)',
      accent: '#34d399',
      symbol: '🌿',
    },
    crimson: {
      gradient: 'linear-gradient(145deg, #4c0519 0%, #020617 100%)',
      accent: '#f43f5e',
      symbol: '⚡',
    },
    violet: {
      gradient: 'linear-gradient(145deg, #3b0764 0%, #0f172a 100%)',
      accent: '#c084fc',
      symbol: '🌌',
    },
  };

  const currentStyle = gradients[gradientPreset] || gradients.indigo;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      message.error('Please enter a title for your pin');
      return;
    }

    const parsedTags = tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const basePin = {
      type,
      title: title.trim(),
      category: category.trim() || 'General Nocturne',
      authorName: authorName.trim() || 'Anonymous Luminary',
      tags: parsedTags.length > 0 ? parsedTags : ['Nocturne', 'Lumen'],
      targetBoardId,
      visualStyle: currentStyle,
    };

    if (type === 'image') {
      createPin({
        ...basePin,
        aspectRatio,
        imageUrl: imageUrl.trim() || undefined,
        description: imageDescription.trim() || 'Nocturnal visual inspiration.',
        details: {
          palette: [currentStyle.accent, '#0f172a', '#1e293b', '#334155', '#ffffff'],
        },
      });
    } else if (type === 'story') {
      createPin({
        ...basePin,
        readTime: readTime.trim() || '5 min read',
        excerpt:
          storyExcerpt.trim() ||
          storyFullText.slice(0, 140) ||
          'A quiet nocturnal story waiting to be read...',
        fullStory: storyFullText.trim() || 'The midnight hours bring forth stories untold...',
        quote: `“${title.trim()}”`,
        themeColor: currentStyle.accent,
      });
    } else if (type === 'book') {
      createPin({
        ...basePin,
        year: bookYear.trim() || 'Published 2026',
        pagesCount: bookPages.trim() || '120 Pages',
        summary: storyExcerpt.trim() || 'A rare illuminated treatise on the quiet arts.',
        chapters: [
          {
            id: 'ch-1',
            number: 'I',
            title: chapter1Title.trim() || 'Of the First Illuminations',
            pageNumber: 1,
            content:
              chapter1Content.trim() ||
              'In the deep of the night, when the cities fall quiet and the stars alone keep vigil...',
          },
        ],
      });
    }

    message.success(`Pin "${title}" created and published!`);
    onClose();
  };

  return (
    <div className="pin-modal-backdrop" onClick={onClose}>
      <div
        className="pin-modal-container create-pin-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="create-pin-header">
          <div className="header-title-box">
            <PlusOutlined className="header-icon" />
            <div>
              <h3>Create a New Pin</h3>
              <p>Publish an image, write a story, or bind an illuminated book</p>
            </div>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close"
          >
            <CloseOutlined />
          </button>
        </header>

        {/* Pin Type Selector Tabs */}
        <div className="create-type-tabs">
          <button
            type="button"
            className={`type-tab-btn ${type === 'image' ? 'active' : ''}`}
            onClick={() => setType('image')}
          >
            <PictureOutlined />
            <span>Image / Artwork</span>
          </button>

          <button
            type="button"
            className={`type-tab-btn ${type === 'story' ? 'active' : ''}`}
            onClick={() => setType('story')}
          >
            <FileTextOutlined />
            <span>Write Story</span>
          </button>

          <button
            type="button"
            className={`type-tab-btn ${type === 'book' ? 'active' : ''}`}
            onClick={() => setType('book')}
          >
            <BookOutlined />
            <span>Bind Book</span>
          </button>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="create-pin-form">
          <div className="form-two-col">
            {/* Left Col: Common Metadata */}
            <div className="form-fields-col">
              <div className="form-group">
                <label className="form-label">Pin Title *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  placeholder={
                    type === 'image'
                      ? 'e.g., Midnight Fog over Venice'
                      : type === 'story'
                      ? 'e.g., The Watcher on the Headland'
                      : 'e.g., The Alchemy of Night'
                  }
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g., Gothic Mystery, Photography"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Author Name</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Your name or pseudonym"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">Tags (comma separated)</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Night, Fog, Story, Mystery"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Save to Board</label>
                  <select
                    className="form-select"
                    value={targetBoardId}
                    onChange={(e) => setTargetBoardId(e.target.value)}
                  >
                    {boards.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Visual Palette Selector */}
              <div className="form-group">
                <label className="form-label">Atmospheric Ambient Palette</label>
                <div className="color-preset-strip">
                  {Object.entries(gradients).map(([key, item]) => (
                    <button
                      key={key}
                      type="button"
                      className={`preset-swatch-btn ${gradientPreset === key ? 'active' : ''}`}
                      style={{ background: item.gradient, borderColor: item.accent }}
                      onClick={() => setGradientPreset(key)}
                      title={key}
                    >
                      <span>{item.symbol}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Specific Fields for Image */}
              {type === 'image' && (
                <>
                  <div className="form-group">
                    <label className="form-label">Image URL (Optional)</label>
                    <input
                      type="url"
                      className="form-input"
                      placeholder="https://... (or leave empty for procedural art)"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Description / Artwork Notes</label>
                    <textarea
                      rows={3}
                      className="form-textarea"
                      placeholder="Describe what inspired this shot or illustration..."
                      value={imageDescription}
                      onChange={(e) => setImageDescription(e.target.value)}
                    />
                  </div>
                </>
              )}

              {/* Specific Fields for Story */}
              {type === 'story' && (
                <>
                  <div className="form-row-2">
                    <div className="form-group">
                      <label className="form-label">Estimated Read Time</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="e.g. 5 min read"
                        value={readTime}
                        onChange={(e) => setReadTime(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Story Excerpt / Teaser</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Short preview hook displayed on the Pinterest pin card..."
                      value={storyExcerpt}
                      onChange={(e) => setStoryExcerpt(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Full Story Manuscript</label>
                    <textarea
                      rows={5}
                      className="form-textarea"
                      placeholder="Write your story chapters or prose here..."
                      value={storyFullText}
                      onChange={(e) => setStoryFullText(e.target.value)}
                    />
                  </div>
                </>
              )}

              {/* Specific Fields for Book */}
              {type === 'book' && (
                <>
                  <div className="form-row-2">
                    <div className="form-group">
                      <label className="form-label">Publication Year</label>
                      <input
                        type="text"
                        className="form-input"
                        value={bookYear}
                        onChange={(e) => setBookYear(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Pages / Length</label>
                      <input
                        type="text"
                        className="form-input"
                        value={bookPages}
                        onChange={(e) => setBookPages(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Chapter 1 Title</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. Of the Obsidian Gates"
                      value={chapter1Title}
                      onChange={(e) => setChapter1Title(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Chapter 1 Content</label>
                    <textarea
                      rows={5}
                      className="form-textarea"
                      placeholder="Enter the opening chapter text for this book..."
                      value={chapter1Content}
                      onChange={(e) => setChapter1Content(e.target.value)}
                    />
                  </div>
                </>
              )}
            </div>

            {/* Right Col: Live Pin Preview */}
            <div className="form-preview-col">
              <span className="preview-heading">Live Pin Preview</span>
              <div className="preview-card-frame">
                <PinArtwork
                  pin={{
                    type,
                    title: title || 'Your Pin Title Here',
                    category: category || 'Category',
                    visualStyle: currentStyle,
                    imageUrl,
                    author: { name: authorName || 'Your Name' },
                    readTime: readTime,
                    pagesCount: bookPages,
                    year: bookYear,
                    quote: title ? `“${title}”` : undefined,
                    excerpt: storyExcerpt || 'Preview text shown on the pin...',
                  }}
                  height="260px"
                />
                <div className="preview-card-info">
                  <h4 className="preview-card-title">{title || 'Untitled Pin'}</h4>
                  <span className="preview-card-author">{authorName || 'Your Name'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Submit Button */}
          <footer className="create-pin-footer">
            <button
              type="button"
              className="form-cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="form-submit-btn"
            >
              Publish to Pinterest Feed
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
}
