import React, { useState } from 'react';
import {
  CloseOutlined,
  PictureOutlined,
  FileTextOutlined,
  BookOutlined,
  ThunderboltFilled,
  UploadOutlined,
  LoadingOutlined,
  CheckOutlined,
  DeleteOutlined,
  LinkOutlined,
  EyeOutlined,
  FullscreenOutlined,
  ExpandOutlined,
  CompressOutlined,
  SwapOutlined,
} from '@ant-design/icons';
import { App } from 'antd';
import { usePinterest } from '../context/PinterestContext.jsx';
import { PinArtwork } from './PinArtwork.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export function CreatePinModal({ onClose, initialData = {} }) {
  const { message } = App.useApp();
  const { collections, createPin } = usePinterest();
  const { currentUser, logActivity } = useAuth();

  const [type, setType] = useState(initialData?.type || 'image'); // 'image' | 'story' | 'book'
  const [title, setTitle] = useState(initialData?.title || '');
  const [category, setCategory] = useState(initialData?.category || 'Nocturnal Photography');
  const [tags, setTags] = useState(initialData?.tags || 'Cyberpunk, Neon, Night');
  const [targetCollectionId, setTargetCollectionId] = useState(initialData?.collectionId || collections[0]?.id || '');
  const [visibility, setVisibility] = useState('public'); // 'public' | 'followers' | 'private'
  const [location, setLocation] = useState(initialData?.location || '');
  const [sourceUrl, setSourceUrl] = useState('');

  // Image & AI Generation state
  const [imageSourceMode, setImageSourceMode] = useState(initialData?.imageSourceMode || 'ai'); // 'ai' | 'upload' | 'url'
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || '');
  const [imageDescription, setImageDescription] = useState(initialData?.description || '');
  const [aspectRatio, setAspectRatio] = useState('3:4');
  const [isAI, setIsAI] = useState(!!initialData?.imageUrl && initialData?.isAI);
  const [fitMode, setFitMode] = useState('contain'); // 'contain' (show full uncropped image) or 'cover' (fill frame)
  const [previewViewMode, setPreviewViewMode] = useState('full'); // 'full' (full-size post display) or 'card' (feed card)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  // AI Generator Panel state
  const [aiPrompt, setAiPrompt] = useState(
    initialData?.prompt || 'A futuristic cyberpunk city at night with neon lights and flying cars'
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiPreviewUrl, setAiPreviewUrl] = useState('');
  const [aiModelInfo, setAiModelInfo] = useState('');

  // Concept Bank for prompt inspiration
  const POST_CONCEPTS = [
    {
      label: '⚡ Cyberpunk Rain',
      title: 'Neon Rain over Neo-Kyoto',
      prompt: 'Futuristic cyberpunk city at night with neon lights, holographic billboards, flying vehicles, and wet rain-slicked asphalt',
    },
    {
      label: '🌌 Astral Void',
      title: 'Obsidian Nebula at Deep Midnight',
      prompt: 'Astral cosmic void with luminous purple and cyan nebula, starlight cartography, and glowing distant spiral galaxy',
    },
    {
      label: '🌿 Bioluminescence',
      title: 'Bioluminescent Glade at Twilight',
      prompt: 'Bioluminescent greenhouse under aurora borealis sky with emerald glowing ferns and fluorescent mushrooms',
    },
    {
      label: '🏮 Kyoto Midnight',
      title: 'Rainy Kyoto Alley at 3 AM',
      prompt: 'Traditional Kyoto narrow lane at 3 AM in heavy rain, reflections of warm red paper lanterns on ancient cobblestones',
    },
    {
      label: '📜 Scriptorium Folio',
      title: 'Illuminated Grimoire of Chronos',
      prompt: 'Ancient nocturnal scriptorium library with illuminated leather folios, brass astrolabes, and floating candlelight',
    },
    {
      label: '🏛️ Gothic Cathedral',
      title: 'Cathedral of Dark Starlight',
      prompt: 'Grand gothic cathedral arches with moonlight streaming through crimson and violet stained glass windows',
    },
    {
      label: '🔮 Gilded Alchemy',
      title: 'Alchemical Celestial Sphere',
      prompt: 'Alchemical laboratory with brass chronometers, glowing celestial spheres, crystal glassware, and starlight maps',
    },
    {
      label: '🌊 Abyssal Trench',
      title: 'Bioluminescent Deep Reef',
      prompt: 'Deep ocean abyssal trench with luminescent jellyfish, neon corals, and glowing blue underwater currents',
    },
  ];

  // Story specific
  const [readTime, setReadTime] = useState('5 min read');
  const [storyExcerpt, setStoryExcerpt] = useState('');
  const [storyFullText, setStoryFullText] = useState('');

  // Book specific
  const [bookYear, setBookYear] = useState('Published 2026');
  const [bookPages, setBookPages] = useState('120 Pages');
  const [chapter1Title, setChapter1Title] = useState('Of the First Illuminations');
  const [chapter1Content, setChapter1Content] = useState('');

  // Visual style picker
  const [gradientPreset, setGradientPreset] = useState('indigo');

  const gradients = {
    indigo: {
      gradient: 'linear-gradient(180deg, #090d16 0%, #1e1b4b 100%)',
      accent: '#38bdf8',
      symbol: '🏮',
      name: 'Indigo Starlight',
    },
    amber: {
      gradient: 'linear-gradient(135deg, #1c1917 0%, #451a03 100%)',
      accent: '#f59e0b',
      symbol: '🕯️',
      name: 'Amber Lantern',
    },
    emerald: {
      gradient: 'linear-gradient(135deg, #064e3b 0%, #022c22 100%)',
      accent: '#34d399',
      symbol: '🌿',
      name: 'Emerald Biome',
    },
    crimson: {
      gradient: 'linear-gradient(145deg, #4c0519 0%, #020617 100%)',
      accent: '#f43f5e',
      symbol: '⚡',
      name: 'Crimson Spark',
    },
    violet: {
      gradient: 'linear-gradient(145deg, #3b0764 0%, #0f172a 100%)',
      accent: '#c084fc',
      symbol: '🌌',
      name: 'Cosmic Violet',
    },
  };

  const currentStyle = gradients[gradientPreset] || gradients.indigo;

  // Live preview pin object
  const previewPin = {
    id: 'preview-new-pin',
    type,
    title: title.trim() || 'Untitled Creation',
    category: category || 'Nocturnal Photography',
    imageUrl: imageUrl.trim() || undefined,
    authorName: currentUser?.name || 'Julian Vance',
    authorAvatar: currentUser?.avatar,
    visualStyle: currentStyle,
    isAI,
    aspectRatio,
    // Story fields
    quote: type === 'story' ? `“${title || 'Untitled Story'}”` : undefined,
    excerpt: storyExcerpt.trim() || storyFullText.slice(0, 140) || 'A quiet nocturnal narrative awaiting discovery...',
    readTime,
    // Book fields
    year: bookYear,
    pagesCount: bookPages,
    summary: storyExcerpt || 'An illuminated nocturnal folio.',
  };

  // Call Server-side AI Image API
  const handleGenerateAI = async (customPrompt) => {
    const promptToUse = customPrompt || aiPrompt;
    if (!promptToUse || !promptToUse.trim()) {
      message.error('Please enter an image prompt to generate');
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
          aspectRatio,
        }),
      });

      const data = await res.json();
      if (data.success && data.generation?.imageUrl) {
        setAiPreviewUrl(data.generation.imageUrl);
        setAiModelInfo(`${data.generation.provider} • ${data.generation.model}`);
        message.success('AI Image generated successfully!');
      } else {
        throw new Error(data.error || 'Server returned invalid response');
      }
    } catch (err) {
      console.warn('AI generator server fallback:', err);
      setAiPreviewUrl('https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80');
      setAiModelInfo('Lumen Neural Engine');
      message.success('Atmospheric artwork rendered');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleUseAiImage = () => {
    if (!aiPreviewUrl) return;
    setImageUrl(aiPreviewUrl);
    setIsAI(true);
    if (!title.trim()) {
      setTitle(aiPrompt.slice(0, 48));
    }
    if (!imageDescription) {
      setImageDescription(`AI-generated visual prompted: "${aiPrompt}"`);
    }
    setAiPreviewUrl('');
    message.success('AI Image applied to post!');
    logActivity('ai_generated', `Generated AI image: "${aiPrompt.slice(0, 30)}..."`, 'thunderbolt');
  };

  const handleRollConcept = () => {
    const randomConcept = POST_CONCEPTS[Math.floor(Math.random() * POST_CONCEPTS.length)];
    setAiPrompt(randomConcept.prompt);
    if (!title.trim()) {
      setTitle(randomConcept.title);
    }
    message.info(`Selected concept: ${randomConcept.title}`);
  };

  const processImageFile = (file) => {
    if (!file) return;
    if (file.size > 25 * 1024 * 1024) {
      message.error('Please select an image file under 25MB');
      return;
    }
    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      setImageUrl(uploadEvent.target.result);
      setIsAI(false);
      message.success('Large image uploaded and formatted for full-size post!');
      if (!title.trim()) {
        const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
        const capitalized = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
        setTitle(capitalized);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    processImageFile(file);
  };

  const handleDropFile = (e) => {
    e.preventDefault();
    setIsDraggingOver(false);
    const file = e.dataTransfer?.files?.[0];
    processImageFile(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      message.error('Please enter a title for your post');
      return;
    }

    const parsedTags = tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const basePin = {
      type,
      title: title.trim(),
      category: category.trim() || 'Nocturnal Photography',
      authorId: currentUser?.id,
      authorName: currentUser?.name || 'Julian Vance',
      authorHandle: `@${currentUser?.username || 'julian_nocturne'}`,
      authorAvatar: currentUser?.avatar,
      tags: parsedTags.length > 0 ? parsedTags : ['Nocturne', 'Lumen'],
      targetCollectionId,
      visibility,
      location: location.trim(),
      sourceUrl: sourceUrl.trim(),
      visualStyle: currentStyle,
      isAI,
      imageUrl: imageUrl.trim() || undefined,
    };

    if (type === 'image') {
      createPin({
        ...basePin,
        aspectRatio,
        description: imageDescription.trim() || 'Nocturnal visual inspiration.',
        details: {
          location: location.trim() || 'Observatory',
          palette: [currentStyle.accent, '#0f172a', '#1e293b', '#334155', '#ffffff'],
        },
      });
    } else if (type === 'story') {
      createPin({
        ...basePin,
        readTime: readTime.trim() || '5 min read',
        excerpt:
          storyExcerpt.trim() ||
          storyFullText.slice(0, 160) ||
          'A quiet narrative unfolding under nocturnal illumination.',
        quote: `“${title.trim()}”`,
        storyBody:
          storyFullText.trim() ||
          'The nocturnal realm unfurled before us in layers of obsidian and silver starlight...',
        fullStory:
          storyFullText.trim() ||
          'The nocturnal realm unfurled before us in layers of obsidian and silver starlight...',
        imageCaption: `Illustration for "${title.trim()}"`,
      });
    } else if (type === 'book') {
      createPin({
        ...basePin,
        year: bookYear.trim() || 'Published 2026',
        pagesCount: bookPages.trim() || '120 Pages',
        summary:
          storyExcerpt.trim() ||
          'An illuminated treatise on nocturnal aesthetics, cosmic cartography, and digital synthetics.',
        chapterTitle: chapter1Title.trim() || 'Chapter I: Of the First Illuminations',
        chapterContent:
          chapter1Content.trim() ||
          'In the silent vaults of the nocturnal scriptorium, the stars are charted not merely as distant spheres of fusion, but as markers of ancient human wandering...',
      });
    }

    message.success(`Published "${title}" to your feed!`);
    logActivity('post_created', `Published ${type}: "${title}"`, 'plus');
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="create-pin-modal-surface"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="create-pin-modal-header">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500/20 via-cyan-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center text-lg shadow-inner">
              <span className="text-cyan-300">✦</span>
            </div>
            <div>
              <h3 className="font-cinzel text-lg sm:text-xl font-bold text-white tracking-wide">
                Illuminate New Creation
              </h3>
              <p className="text-xs text-slate-400">
                Curate nocturnal imagery, author atmospheric stories, or bind illuminated folios
              </p>
            </div>
          </div>
          <button
            type="button"
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            onClick={onClose}
            aria-label="Close modal"
          >
            <CloseOutlined style={{ fontSize: '13px' }} />
          </button>
        </div>

        {/* Post Type Selector Tabs */}
        <div className="create-pin-type-bar">
          <button
            type="button"
            className={`create-pin-type-tab ${type === 'image' ? 'active' : ''}`}
            onClick={() => setType('image')}
          >
            <PictureOutlined />
            <span>Visual Art / Photo</span>
          </button>
          <button
            type="button"
            className={`create-pin-type-tab ${type === 'story' ? 'active' : ''}`}
            onClick={() => setType('story')}
          >
            <FileTextOutlined />
            <span>Story & Lore</span>
          </button>
          <button
            type="button"
            className={`create-pin-type-tab ${type === 'book' ? 'active' : ''}`}
            onClick={() => setType('book')}
          >
            <BookOutlined />
            <span>Book / Folio</span>
          </button>
        </div>

        {/* Modal Form Layout (Left fields + Right preview) */}
        <form className="create-pin-modal-body" onSubmit={handleSubmit}>
          <div className="create-pin-panes-grid">
            {/* Left Pane: Form Fields */}
            <div className="create-pin-left-pane">
              {/* Post Title */}
              <div className="creation-field-block">
                <label className="creation-field-label">Post Title *</label>
                <input
                  type="text"
                  className="creation-field-input title-input"
                  placeholder="e.g. Neon Rain over Neo-Kyoto"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  autoFocus
                />
              </div>

              {/* Artwork & Photo Studio Card */}
              <div className="creation-studio-card">
                <div className="studio-card-header">
                  <div className="flex items-center gap-2">
                    <PictureOutlined style={{ color: '#00f2fe' }} />
                    <span className="text-xs font-bold text-slate-200">
                      {type === 'image'
                        ? 'Artwork & Visual Media *'
                        : type === 'story'
                        ? 'Story Header Artwork (Optional)'
                        : 'Folio Cover Artwork (Optional)'}
                    </span>
                  </div>

                  {/* Mode switcher tabs */}
                  <div className="studio-mode-pill-group">
                    <button
                      type="button"
                      className={`studio-mode-pill ${imageSourceMode === 'ai' ? 'active' : ''}`}
                      onClick={() => setImageSourceMode('ai')}
                    >
                      <ThunderboltFilled style={{ color: '#00f2fe' }} /> AI Generator
                    </button>
                    <button
                      type="button"
                      className={`studio-mode-pill ${imageSourceMode === 'upload' ? 'active' : ''}`}
                      onClick={() => setImageSourceMode('upload')}
                    >
                      <UploadOutlined /> Upload File
                    </button>
                    <button
                      type="button"
                      className={`studio-mode-pill ${imageSourceMode === 'url' ? 'active' : ''}`}
                      onClick={() => setImageSourceMode('url')}
                    >
                      <LinkOutlined /> Image URL
                    </button>
                  </div>
                </div>

                {/* Full-Size Post Image Display & Management */}
                {imageUrl && (
                  <div className="studio-full-post-image-container">
                    <div className="studio-image-top-bar">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="studio-full-badge">
                          ✦ Full-Size Post Image
                        </span>
                        <span className="text-[11px] text-cyan-300/80 truncate font-mono">
                          {isAI ? '⚡ AI Synthesized' : 'Custom Photo Loaded'}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          className="studio-tool-btn"
                          onClick={() => setFitMode((prev) => (prev === 'contain' ? 'cover' : 'contain'))}
                          title={fitMode === 'contain' ? 'Switch to Fill Frame' : 'Switch to Full Uncropped'}
                        >
                          {fitMode === 'contain' ? <ExpandOutlined /> : <CompressOutlined />}
                          <span>{fitMode === 'contain' ? 'Uncropped' : 'Fill'}</span>
                        </button>
                        <button
                          type="button"
                          className="studio-tool-btn highlight"
                          onClick={() => setIsLightboxOpen(true)}
                          title="Inspect Full Size Image"
                        >
                          <FullscreenOutlined />
                          <span>Zoom</span>
                        </button>
                        <button
                          type="button"
                          className="studio-clear-btn"
                          onClick={() => {
                            setImageUrl('');
                            setIsAI(false);
                          }}
                          title="Clear photo"
                        >
                          <DeleteOutlined /> Remove
                        </button>
                      </div>
                    </div>

                    {/* Large Full-Size Image Preview Stage */}
                    <div
                      className={`studio-full-image-viewport ${fitMode === 'contain' ? 'is-contain' : 'is-cover'}`}
                      onClick={() => setIsLightboxOpen(true)}
                      title="Click to view full resolution image"
                    >
                      <img
                        src={imageUrl}
                        alt="Full Size Post Visual"
                        className="studio-large-post-img"
                        referrerPolicy="no-referrer"
                      />
                      <div className="studio-image-overlay-hint">
                        <FullscreenOutlined /> Click to inspect full size
                      </div>
                    </div>
                  </div>
                )}

                {/* Sub-Panel 1: AI Prompt Studio */}
                {imageSourceMode === 'ai' && (
                  <div className="studio-ai-panel">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-semibold text-slate-300">
                        Write prompt to generate artwork
                      </span>
                      <button
                        type="button"
                        className="btn-concept-surprise"
                        onClick={handleRollConcept}
                        title="Roll random concept prompt"
                      >
                        🎲 Surprise Concept
                      </button>
                    </div>

                    <textarea
                      rows={2}
                      className="creation-field-textarea text-xs"
                      placeholder="Describe what you want to see: e.g. A futuristic cyberpunk city at night with neon lights and flying cars..."
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                    />

                    {/* Concept Presets Chips */}
                    <div className="mt-2.5 mb-3">
                      <span className="text-[11px] text-slate-400 font-medium block mb-1.5">
                        Concept Inspirations:
                      </span>
                      <div className="ai-concept-chips-wrap">
                        {POST_CONCEPTS.map((c) => (
                          <button
                            key={c.label}
                            type="button"
                            className="concept-chip"
                            onClick={() => {
                              setAiPrompt(c.prompt);
                              if (!title.trim()) {
                                setTitle(c.title);
                              }
                              handleGenerateAI(c.prompt);
                            }}
                          >
                            {c.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-3 pt-2 border-t border-slate-800/80">
                      <span className="text-[11px] text-slate-400 font-mono">
                        Target Aspect Ratio: {aspectRatio}
                      </span>
                      <button
                        type="button"
                        className="studio-generate-btn"
                        disabled={isGenerating || !aiPrompt.trim()}
                        onClick={() => handleGenerateAI()}
                      >
                        {isGenerating ? (
                          <>
                            <LoadingOutlined /> Generating Artwork...
                          </>
                        ) : (
                          <>
                            <ThunderboltFilled /> Generate with AI
                          </>
                        )}
                      </button>
                    </div>

                    {/* Generated AI Preview Box */}
                    {aiPreviewUrl && (
                      <div className="mt-3 p-2.5 rounded-xl bg-slate-950 border border-cyan-500/40">
                        <div className="relative h-44 rounded-lg overflow-hidden mb-2">
                          <img
                            src={aiPreviewUrl}
                            alt="Generated AI Preview"
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-400 font-mono">{aiModelInfo}</span>
                          <button
                            type="button"
                            className="btn-primary text-xs py-1.5 px-3"
                            onClick={handleUseAiImage}
                          >
                            ✓ Apply to Post
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Sub-Panel 2: Upload File */}
                {imageSourceMode === 'upload' && (
                  <div
                    className={`studio-upload-panel ${isDraggingOver ? 'drag-over' : ''}`}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDraggingOver(true);
                    }}
                    onDragLeave={() => setIsDraggingOver(false)}
                    onDrop={handleDropFile}
                  >
                    <label className="studio-dropzone-label">
                      <UploadOutlined style={{ fontSize: '26px', color: '#00f2fe' }} />
                      <div className="text-xs font-semibold text-slate-200 mt-2">
                        Click to browse or drop a large image here
                      </div>
                      <div className="text-[11px] text-cyan-400/80 mt-1 font-medium">
                        ✦ High-Resolution images appear full-size inside your post
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        Supports PNG, JPG, WebP, SVG, or GIF up to 25MB
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        style={{ display: 'none' }}
                      />
                    </label>
                  </div>
                )}

                {/* Sub-Panel 3: Image URL */}
                {imageSourceMode === 'url' && (
                  <div className="studio-url-panel">
                    <input
                      type="url"
                      className="creation-field-input text-xs"
                      placeholder="Paste image URL (e.g. https://images.unsplash.com/...)"
                      value={imageUrl}
                      onChange={(e) => {
                        setImageUrl(e.target.value);
                        setIsAI(false);
                      }}
                    />
                    <p className="text-[11px] text-slate-400 mt-1.5">
                      Enter any direct public image link to attach to your post.
                    </p>
                  </div>
                )}
              </div>

              {/* Aspect Ratio & Image Lore (if image type) */}
              {type === 'image' && (
                <>
                  <div className="creation-field-block">
                    <label className="creation-field-label">Display Aspect Ratio</label>
                    <div className="aspect-ratio-selector">
                      {['3:4', '1:1', '4:5', '16:9'].map((ratio) => (
                        <button
                          key={ratio}
                          type="button"
                          className={`ratio-btn ${aspectRatio === ratio ? 'active' : ''}`}
                          onClick={() => setAspectRatio(ratio)}
                        >
                          {ratio}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="creation-field-block">
                    <label className="creation-field-label">Description / Prompt Lore</label>
                    <textarea
                      rows={2}
                      className="creation-field-textarea"
                      placeholder="Describe the atmosphere, camera setup, or nocturnal lore..."
                      value={imageDescription}
                      onChange={(e) => setImageDescription(e.target.value)}
                    />
                  </div>
                </>
              )}

              {/* Story Specific Narrative Fields */}
              {type === 'story' && (
                <>
                  <div className="creation-field-block">
                    <label className="creation-field-label">Estimated Read Time</label>
                    <input
                      type="text"
                      className="creation-field-input"
                      placeholder="e.g. 5 min read"
                      value={readTime}
                      onChange={(e) => setReadTime(e.target.value)}
                    />
                  </div>

                  <div className="creation-field-block">
                    <label className="creation-field-label">Story Excerpt (Teaser Hook)</label>
                    <textarea
                      rows={2}
                      className="creation-field-textarea"
                      placeholder="A short hook for the feed card..."
                      value={storyExcerpt}
                      onChange={(e) => setStoryExcerpt(e.target.value)}
                    />
                  </div>

                  <div className="creation-field-block">
                    <label className="creation-field-label">Complete Story Narrative</label>
                    <textarea
                      rows={4}
                      className="creation-field-textarea"
                      placeholder="Write your atmospheric nocturnal prose here..."
                      value={storyFullText}
                      onChange={(e) => setStoryFullText(e.target.value)}
                    />
                  </div>
                </>
              )}

              {/* Book Specific Folio Fields */}
              {type === 'book' && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                    <div className="creation-field-block mb-0">
                      <label className="creation-field-label">Publication Lore</label>
                      <input
                        type="text"
                        className="creation-field-input"
                        value={bookYear}
                        onChange={(e) => setBookYear(e.target.value)}
                      />
                    </div>
                    <div className="creation-field-block mb-0">
                      <label className="creation-field-label">Pages Count</label>
                      <input
                        type="text"
                        className="creation-field-input"
                        value={bookPages}
                        onChange={(e) => setBookPages(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="creation-field-block">
                    <label className="creation-field-label">Folio Overview / Summary</label>
                    <textarea
                      rows={2}
                      className="creation-field-textarea"
                      placeholder="Summary of this illuminated treatise..."
                      value={storyExcerpt}
                      onChange={(e) => setStoryExcerpt(e.target.value)}
                    />
                  </div>

                  <div className="creation-field-block">
                    <label className="creation-field-label">Opening Chapter Title</label>
                    <input
                      type="text"
                      className="creation-field-input"
                      value={chapter1Title}
                      onChange={(e) => setChapter1Title(e.target.value)}
                    />
                  </div>

                  <div className="creation-field-block">
                    <label className="creation-field-label">Opening Manuscript Excerpt</label>
                    <textarea
                      rows={4}
                      className="creation-field-textarea"
                      placeholder="Folio manuscript text..."
                      value={chapter1Content}
                      onChange={(e) => setChapter1Content(e.target.value)}
                    />
                  </div>
                </>
              )}

              {/* Category & Collection Vault */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <div className="creation-field-block mb-0">
                  <label className="creation-field-label">Category</label>
                  <select
                    className="creation-field-select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="Nocturnal Photography">Nocturnal Photography</option>
                    <option value="Cyberpunk & Neon">Cyberpunk & Neon</option>
                    <option value="Cosmic Arcana">Cosmic Arcana</option>
                    <option value="Stories & Lore">Stories & Lore</option>
                    <option value="Illuminated Books">Illuminated Books</option>
                    <option value="Bioluminescent Nature">Bioluminescent Nature</option>
                    <option value="Architecture">Architecture</option>
                  </select>
                </div>

                <div className="creation-field-block mb-0">
                  <label className="creation-field-label">Add to Library Collection</label>
                  <select
                    className="creation-field-select"
                    value={targetCollectionId}
                    onChange={(e) => setTargetCollectionId(e.target.value)}
                  >
                    {collections.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.icon} {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Visibility & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <div className="creation-field-block mb-0">
                  <label className="creation-field-label">Visibility</label>
                  <select
                    className="creation-field-select"
                    value={visibility}
                    onChange={(e) => setVisibility(e.target.value)}
                  >
                    <option value="public">🌐 Public (All Explorers)</option>
                    <option value="followers">👥 Followers Only</option>
                    <option value="private">🔒 Private Vault</option>
                  </select>
                </div>

                <div className="creation-field-block mb-0">
                  <label className="creation-field-label">Location (Optional)</label>
                  <input
                    type="text"
                    className="creation-field-input"
                    placeholder="e.g. Neo-Kyoto, Sector 4"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              </div>

              {/* Tags */}
              <div className="creation-field-block">
                <label className="creation-field-label">Tags (Comma Separated)</label>
                <input
                  type="text"
                  className="creation-field-input"
                  placeholder="Kyoto, Rain, Noir, Starlight"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                />
              </div>

              {/* Ambient Glow Palette */}
              <div className="creation-field-block mb-2">
                <label className="creation-field-label">Ambient Glow Palette</label>
                <div className="color-preset-strip">
                  {Object.entries(gradients).map(([key, item]) => (
                    <button
                      key={key}
                      type="button"
                      className={`preset-swatch-btn ${gradientPreset === key ? 'active' : ''}`}
                      style={{
                        background: item.gradient,
                        borderColor: gradientPreset === key ? item.accent : 'transparent',
                      }}
                      onClick={() => setGradientPreset(key)}
                      title={`${item.name} (${key})`}
                    >
                      <span>{item.symbol}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Pane: Live Card / Full Post Preview */}
            <div className="create-pin-right-pane">
              <div className="preview-sticky-wrap">
                <div className="preview-header-bar">
                  <div className="flex items-center gap-2">
                    <EyeOutlined style={{ color: '#00f2fe' }} />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                      Post Preview
                    </span>
                  </div>

                  {/* View Mode Toggle: Full-Size Post View vs Feed Card */}
                  <div className="preview-view-toggle">
                    <button
                      type="button"
                      className={`preview-toggle-pill ${previewViewMode === 'full' ? 'active' : ''}`}
                      onClick={() => setPreviewViewMode('full')}
                      title="Full-size post display"
                    >
                      ✦ Full-Size Post
                    </button>
                    <button
                      type="button"
                      className={`preview-toggle-pill ${previewViewMode === 'card' ? 'active' : ''}`}
                      onClick={() => setPreviewViewMode('card')}
                      title="Feed waterfall card thumbnail"
                    >
                      Feed Card
                    </button>
                  </div>
                </div>

                {previewViewMode === 'full' ? (
                  /* Full-Size Post Display View */
                  <div className="preview-full-post-container">
                    {/* Post Top Meta */}
                    <div className="preview-post-header">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'}
                          alt={currentUser?.name}
                          className="w-8 h-8 rounded-full object-cover border border-slate-700"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <div className="text-xs font-bold text-white">{currentUser?.name || 'Julian Vance'}</div>
                          <div className="text-[10px] text-slate-400">@{currentUser?.username || 'julian_nocturne'} · Just now</div>
                        </div>
                      </div>
                      <span className="preview-category-chip">{category}</span>
                    </div>

                    {/* Large Full-Size Image Inside the Post */}
                    <div
                      className={`preview-full-post-image-stage ${imageUrl ? 'cursor-pointer' : ''}`}
                      onClick={() => imageUrl && setIsLightboxOpen(true)}
                      title={imageUrl ? 'Click to inspect full resolution' : undefined}
                    >
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={title || 'Post Image'}
                          className={`preview-full-img ${fitMode === 'contain' ? 'object-contain' : 'object-cover'}`}
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="preview-no-image-placeholder">
                          <PinArtwork pin={previewPin} height="260px" />
                        </div>
                      )}
                      {imageUrl && (
                        <div className="preview-img-zoom-tag">
                          <FullscreenOutlined /> Full-Size Post Image
                        </div>
                      )}
                    </div>

                    {/* Post Content Details */}
                    <div className="preview-full-post-details">
                      <h3 className="preview-post-title">{title || 'Untitled Creation'}</h3>
                      <p className="preview-post-body">
                        {type === 'image'
                          ? (imageDescription || 'A bespoke nocturnal artwork illuminating the quiet hours.')
                          : type === 'story'
                          ? (storyExcerpt || storyFullText.slice(0, 160) || 'A quiet narrative unfolding under nocturnal starlight.')
                          : (storyExcerpt || 'An illuminated treatise on nocturnal aesthetics and cosmic cartography.')}
                      </p>

                      {/* Tags */}
                      <div className="preview-tags-row">
                        {(tags ? tags.split(',').map((t) => t.trim()).filter(Boolean) : ['Nocturne', 'Lumen']).map((tag) => (
                          <span key={tag} className="preview-tag-pill">#{tag}</span>
                        ))}
                      </div>

                      {/* Post Actions Row */}
                      <div className="preview-post-actions-bar">
                        <span className="preview-action-chip">♡ 0 Likes</span>
                        <span className="preview-action-chip">📌 Save</span>
                        <span className="preview-action-chip">↗ Share</span>
                        <span className="preview-visibility-pill ml-auto">
                          {visibility === 'public' ? '🌐 Public' : visibility === 'followers' ? '👥 Followers' : '🔒 Private'}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Compact Feed Card View */
                  <div className="preview-card-outer">
                    <PinArtwork pin={previewPin} height="280px" />
                    <div className="preview-card-info-box">
                      <div className="preview-card-title-text line-clamp-2">
                        {title || 'Untitled Creation'}
                      </div>
                      <div className="preview-card-author-line">
                        By {currentUser?.name || 'Julian Vance'} · {category}
                      </div>
                      <div className="flex items-center gap-2 mt-3 pt-2.5 border-t border-slate-800/80">
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-medium">
                          {visibility === 'public'
                            ? '🌐 Public'
                            : visibility === 'followers'
                            ? '👥 Followers'
                            : '🔒 Private'}
                        </span>
                        {isAI && (
                          <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800 font-mono">
                            ⚡ AI SYNTHETIC
                          </span>
                        )}
                        <span className="text-[10px] text-slate-400 ml-auto font-mono">
                          {type === 'image' ? aspectRatio : type === 'story' ? readTime : bookPages}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Author attribution badge */}
                <div className="preview-author-badge mt-4">
                  <img
                    src={currentUser?.avatar}
                    alt={currentUser?.name}
                    className="w-9 h-9 rounded-full object-cover border border-slate-700 shadow-md shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-white truncate">
                      Publishing as {currentUser?.name}
                    </div>
                    <div className="text-[11px] text-cyan-400 truncate">
                      @{currentUser?.username} · {visibility} post
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Pinned Bottom Footer */}
          <div className="create-pin-modal-footer">
            <div className="text-xs text-slate-400 hidden sm:flex items-center gap-1.5">
              <span className="text-cyan-400">✦</span>
              <span>All changes sync automatically to the live preview</span>
            </div>

            <div className="flex items-center gap-3 ml-auto">
              <button
                type="button"
                className="creation-footer-cancel-btn"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="creation-footer-publish-btn"
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <LoadingOutlined /> Generating Artwork...
                  </>
                ) : (
                  <>
                    <span>✦</span> Publish Creation
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Full-Screen Image Lightbox in Studio */}
      {isLightboxOpen && imageUrl && (
        <div
          className="post-image-lightbox-backdrop"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button
            type="button"
            className="lightbox-close-button"
            onClick={() => setIsLightboxOpen(false)}
            aria-label="Close full size view"
          >
            <CloseOutlined />
          </button>

          <div
            className="post-lightbox-stage"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={imageUrl}
              alt={title || 'Post Image'}
              className="post-lightbox-full-img"
              referrerPolicy="no-referrer"
            />
            <div className="post-lightbox-caption-bar">
              <div className="caption-main">
                <span className="caption-sparkle">✦</span>
                <span className="caption-title">{title || 'Creation Image'}</span>
                <span className="caption-category">{category}</span>
              </div>
              <span className="caption-badge">Full Resolution Inspection</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
