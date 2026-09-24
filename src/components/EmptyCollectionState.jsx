import React from 'react';
import {
  PlusOutlined,
  CompassOutlined,
  ThunderboltFilled,
  PictureOutlined,
  FileTextOutlined,
  BookOutlined,
  StarOutlined,
  SmileOutlined,
} from '@ant-design/icons';
import { usePinterest } from '../context/PinterestContext.jsx';

export function EmptyCollectionState({
  collection,
  onAddFirstPost,
  onExplore,
  className = '',
}) {
  const { openCreatePin } = usePinterest();

  const collectionName = collection?.name || 'Collection';
  const collectionIcon = collection?.icon || '📁';
  const collectionId = collection?.id;

  // Friendly creative quick-start ideas
  const PROMPT_SUGGESTIONS = [
    {
      icon: <PictureOutlined style={{ color: '#00f2fe' }} />,
      type: 'image',
      badge: 'Visual Art',
      label: 'Cyberpunk Rain',
      title: `${collectionName} - Neon Rain Concept`,
      prompt: 'Cyberpunk cityscape in gentle midnight rain with glowing neon signs, wet reflections, and flying crafts',
      category: 'Cyberpunk & Neon',
    },
    {
      icon: <PictureOutlined style={{ color: '#c084fc' }} />,
      type: 'image',
      badge: 'Cosmic Art',
      label: 'Obsidian Nebula',
      title: `${collectionName} - Astral Void`,
      prompt: 'Luminous deep space nebula with violet and cyan dust clouds and distant starlight cartography',
      category: 'Cosmic Arcana',
    },
    {
      icon: <FileTextOutlined style={{ color: '#f59e0b' }} />,
      type: 'story',
      badge: 'Story & Lore',
      label: 'Midnight Tale',
      title: `The First Chronicle of ${collectionName}`,
      prompt: 'Ancient nocturnal library with leather folios and floating candlelight',
      category: 'Stories & Lore',
    },
    {
      icon: <BookOutlined style={{ color: '#34d399' }} />,
      type: 'book',
      badge: 'Illuminated Book',
      label: 'Rare Folio',
      title: `Compendium of ${collectionName}`,
      prompt: 'Illuminated manuscript with gilded borders and celestial diagrams',
      category: 'Illuminated Books',
    },
  ];

  const handleLaunchPrompt = (suggestion) => {
    const initialData = {
      collectionId,
      type: suggestion.type,
      title: suggestion.title,
      prompt: suggestion.prompt,
      category: suggestion.category,
    };

    if (onAddFirstPost) {
      onAddFirstPost(initialData);
    } else if (openCreatePin) {
      openCreatePin(initialData);
    }
  };

  const handleDefaultAdd = () => {
    const initialData = {
      collectionId,
      title: `${collectionName} - First Creation`,
    };

    if (onAddFirstPost) {
      onAddFirstPost(initialData);
    } else if (openCreatePin) {
      openCreatePin(initialData);
    }
  };

  return (
    <div className={`empty-collection-state-card ${className}`}>
      {/* Ambient background glow */}
      <div className="empty-collection-ambient-glow" />

      {/* Center Illustrated Badge */}
      <div className="empty-collection-emblem-wrap">
        <div className="empty-collection-icon-halo">
          <span className="empty-collection-main-icon">{collectionIcon}</span>
        </div>
        <span className="empty-collection-sparkle-dot top-right">✦</span>
        <span className="empty-collection-sparkle-dot bottom-left">✦</span>
      </div>

      {/* Friendly Headline & Warm Encouragement */}
      <div className="empty-collection-text-area">
        <div className="empty-collection-badge">
          <span>✨ New Sanctuary Vault</span>
        </div>
        <h3 className="empty-collection-title font-cinzel">
          Your &ldquo;{collectionName}&rdquo; vault is ready for its first artifact!
        </h3>
        <p className="empty-collection-desc">
          Every aesthetic archive begins with a single spark of inspiration. Curate nocturnal
          photography, synthesize AI visuals, author atmospheric stories, or bind illuminated folios
          right here.
        </p>
      </div>

      {/* Direct Action Buttons */}
      <div className="empty-collection-actions-row">
        <button
          type="button"
          className="empty-collection-add-btn"
          onClick={handleDefaultAdd}
        >
          <PlusOutlined /> Add Your First Post
        </button>

        {onExplore && (
          <button
            type="button"
            className="empty-collection-explore-btn"
            onClick={onExplore}
          >
            <CompassOutlined /> Explore Inspirations
          </button>
        )}
      </div>

      {/* Quick-Start Concept Prompts Bar */}
      <div className="empty-collection-prompts-section">
        <div className="empty-collection-prompts-header">
          <span className="text-amber-400 text-xs">💡</span>
          <span className="empty-prompts-title">
            Need an idea to get started? Try one of these prompts:
          </span>
        </div>

        <div className="empty-collection-prompts-grid">
          {PROMPT_SUGGESTIONS.map((sug) => (
            <button
              key={sug.label}
              type="button"
              className="empty-prompt-card group"
              onClick={() => handleLaunchPrompt(sug)}
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="empty-prompt-type-tag">
                  {sug.icon}
                  <span>{sug.badge}</span>
                </span>
                <span className="empty-prompt-use-label group-hover:text-cyan-300">
                  Use Prompt →
                </span>
              </div>
              <div className="empty-prompt-label">{sug.label}</div>
              <div className="empty-prompt-snippet line-clamp-2">
                &ldquo;{sug.prompt}&rdquo;
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Helpful Pro-Tip Ribbon */}
      <div className="empty-collection-tip-footer">
        <span className="text-cyan-400 font-mono text-[11px]">✦ PRO-TIP:</span>
        <span className="text-slate-400 text-xs">
          You can also browse the Home or Explore feeds and click{' '}
          <strong className="text-slate-200">&ldquo;+ Add to Library&rdquo;</strong> on any pin to
          save it directly into this vault.
        </span>
      </div>
    </div>
  );
}
