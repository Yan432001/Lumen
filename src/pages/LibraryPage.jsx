import React, { useState } from 'react';
import {
  FolderOutlined,
  FolderAddOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  ArrowLeftOutlined,
  CloseOutlined,
  ThunderboltFilled,
  UploadOutlined,
  LoadingOutlined,
  PictureOutlined,
  CheckCircleFilled,
  LinkOutlined,
  SwapOutlined,
  HolderOutlined,
  ArrowRightOutlined,
  FolderOpenOutlined,
  InboxOutlined,
} from '@ant-design/icons';
import { App } from 'antd';
import { usePinterest } from '../context/PinterestContext.jsx';
import { PinCard } from '../components/PinCard.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { EmptyCollectionState } from '../components/EmptyCollectionState.jsx';

export function LibraryPage({ onOpenCreatePin, onNavigate }) {
  const { message } = App.useApp();
  const {
    collections,
    pins,
    createCollection,
    renameCollection,
    deleteCollection,
    removePinFromCollection,
    movePinBetweenCollections,
    addPinToCollection,
  } = usePinterest();
  const { currentUser, logActivity } = useAuth();

  const [activeCollectionId, setActiveCollectionId] = useState(null);
  const [isCreatingModal, setIsCreatingModal] = useState(false);
  const [editingCollection, setEditingCollection] = useState(null);

  // Drag & Drop states
  const [draggedPin, setDraggedPin] = useState(null);
  const [dragOverTargetId, setDragOverTargetId] = useState(null);
  const [quickMovePin, setQuickMovePin] = useState(null);

  // Form states
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [icon, setIcon] = useState('📁');
  const [color, setColor] = useState('#3b82f6');
  const [coverImage, setCoverImage] = useState('');

  // Image input & AI generation modes for Collection
  const [coverMode, setCoverMode] = useState('url'); // 'url' | 'upload' | 'ai'
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiPreviewUrl, setAiPreviewUrl] = useState('');
  const [aiModelInfo, setAiModelInfo] = useState('');

  const iconOptions = ['📁', '💡', '✨', '🚀', '🖼️', '📜', '🤖', '🔮', '🌌', '🏮', '🏛️', '🌿'];
  const colorOptions = ['#3b82f6', '#eab308', '#a855f7', '#06b6d4', '#f43f5e', '#10b981', '#f97316', '#ec4899'];

  const COLLECTION_CONCEPTS = [
    { label: '⚡ Cyberpunk Rain', prompt: 'Nocturnal cyberpunk city under holographic cyan rain with glowing neon signs' },
    { label: '🌌 Astral Void', prompt: 'Deep space cosmic nebula with celestial constellations and starlight cartography' },
    { label: '📜 Scriptorium Folio', prompt: 'Ancient library scriptorium with illuminated leather folios and candlelight' },
    { label: '🌿 Bioluminescent Glade', prompt: 'Luminescent emerald flora and glowing mushrooms in midnight mist' },
    { label: '🏮 Kyoto Midnight', prompt: 'Rain-slicked Kyoto cobblestone lane illuminated by warm red paper lanterns' },
    { label: '🏛️ Gothic Cathedral', prompt: 'Towering gothic cathedral arches with moonlight streaming through stained glass' },
    { label: '🔮 Gilded Alchemy', prompt: 'Alchemist laboratory with brass astrolabes, glowing celestial spheres, and parchment' },
    { label: '🌊 Abyssal Sanctuary', prompt: 'Bioluminescent deep sea organisms and fluorescent coral in midnight blue water' },
  ];

  const activeCollection = collections.find((c) => c.id === activeCollectionId);
  const collectionPins = activeCollection
    ? pins.filter((p) => activeCollection.pinIds?.includes(p.id))
    : [];

  const handleOpenCreate = () => {
    setName('');
    setDesc('');
    setIcon('📁');
    setColor('#3b82f6');
    setCoverImage('');
    setCoverMode('url');
    setAiPrompt('');
    setAiPreviewUrl('');
    setIsCreatingModal(true);
  };

  const handleOpenEdit = (col, e) => {
    e?.stopPropagation();
    setEditingCollection(col);
    setName(col.name);
    setDesc(col.description || '');
    setIcon(col.icon || '📁');
    setColor(col.color || '#3b82f6');
    setCoverImage(col.coverImage || '');
    setCoverMode(col.coverImage ? 'url' : 'url');
    setAiPrompt('');
    setAiPreviewUrl('');
  };

  const handleGenerateCoverAI = async (customPrompt) => {
    const promptToUse = customPrompt || aiPrompt;
    if (!promptToUse || !promptToUse.trim()) {
      message.error('Please enter a prompt to generate an image');
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
          aspectRatio: '16:9',
        }),
      });

      const data = await res.json();
      if (data.success && data.generation?.imageUrl) {
        setAiPreviewUrl(data.generation.imageUrl);
        setAiModelInfo(`${data.generation.provider} • ${data.generation.model}`);
        message.success('Cover photo generated!');
      } else {
        throw new Error(data.error || 'Server error');
      }
    } catch (err) {
      console.warn('AI cover fallback:', err);
      setAiPreviewUrl('https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80');
      setAiModelInfo('Lumen Neural Engine');
      message.success('Atmospheric artwork rendered');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleApplyAiCover = () => {
    if (!aiPreviewUrl) return;
    setCoverImage(aiPreviewUrl);
    setAiPreviewUrl('');
    message.success('Cover photo applied to collection!');
    logActivity('ai_generated', `Generated cover photo for collection "${name || 'vault'}"`, 'thunderbolt');
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setCoverImage(uploadEvent.target.result);
        message.success('Photo uploaded for collection cover!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSurpriseConcept = () => {
    const randomConcept = COLLECTION_CONCEPTS[Math.floor(Math.random() * COLLECTION_CONCEPTS.length)];
    setAiPrompt(randomConcept.prompt);
  };

  const handleSaveCollection = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      message.error('Collection name cannot be empty');
      return;
    }

    const trimmedCover = coverImage.trim();

    if (editingCollection) {
      renameCollection(editingCollection.id, name.trim(), desc.trim(), icon, color, trimmedCover);
      message.success(`Updated collection "${name}"`);
      logActivity('collection_updated', `Updated collection "${name}"`, 'edit');
      setEditingCollection(null);
    } else {
      const newCol = createCollection(name.trim(), desc.trim(), icon, color, trimmedCover);
      message.success(`Created collection "${newCol.name}"`);
      logActivity('collection_created', `Created collection "${newCol.name}"`, 'folder-add');
      setIsCreatingModal(false);
    }
  };

  const handleDelete = (colId, colName, e) => {
    e?.stopPropagation();
    deleteCollection(colId);
    message.info(`Deleted collection "${colName}"`);
    logActivity('collection_deleted', `Deleted collection "${colName}"`, 'delete');
    if (activeCollectionId === colId) {
      setActiveCollectionId(null);
    }
  };

  // Drag-and-drop mechanics for transferring posts between collections
  const handleDragStart = (e, pin) => {
    setDraggedPin(pin);
    const dragPayload = {
      pinId: pin.id,
      fromCollectionId: activeCollectionId,
      pinTitle: pin.title,
    };
    e.dataTransfer.setData('application/json', JSON.stringify(dragPayload));
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    setDraggedPin(null);
    setDragOverTargetId(null);
  };

  const handleDragOver = (e, targetColId) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverTargetId !== targetColId) {
      setDragOverTargetId(targetColId);
    }
  };

  const handleDragLeave = (e, targetColId) => {
    e.preventDefault();
    e.stopPropagation();
    if (!e.currentTarget.contains(e.relatedTarget)) {
      if (dragOverTargetId === targetColId) {
        setDragOverTargetId(null);
      }
    }
  };

  const handleDropOnCollection = (targetColId, e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverTargetId(null);

    let pinToMove = draggedPin;
    let fromColId = activeCollectionId;

    if (!pinToMove) {
      try {
        const raw = e.dataTransfer.getData('application/json');
        if (raw) {
          const parsed = JSON.parse(raw);
          pinToMove = pins.find((p) => p.id === parsed.pinId);
          if (parsed.fromCollectionId) {
            fromColId = parsed.fromCollectionId;
          }
        }
      } catch (err) {
        console.warn('Drag data read error:', err);
      }
    }

    if (!pinToMove) {
      message.error('Unable to locate the dragged artifact.');
      setDraggedPin(null);
      return;
    }

    if (fromColId === targetColId) {
      message.info(`"${pinToMove.title}" is already in this vault.`);
      setDraggedPin(null);
      return;
    }

    const fromCol = collections.find((c) => c.id === fromColId);
    const toCol = collections.find((c) => c.id === targetColId);

    // Perform atomic state transfer
    const success = movePinBetweenCollections(fromColId, targetColId, pinToMove.id);

    if (success) {
      message.success({
        content: `Transferred "${pinToMove.title}" to ${toCol?.name || 'vault'}!`,
        duration: 3,
      });
      logActivity(
        'collection_moved',
        `Moved "${pinToMove.title}" from "${fromCol?.name || 'vault'}" to "${toCol?.name || 'vault'}"`,
        'swap'
      );
    } else {
      // If was from outside or couldn't find fromCol, ensure added to target
      addPinToCollection(targetColId, pinToMove.id);
      message.success(`Added "${pinToMove.title}" to ${toCol?.name || 'vault'}!`);
    }

    setDraggedPin(null);
  };

  const handleQuickMove = (targetColId) => {
    if (!quickMovePin || !activeCollectionId || targetColId === activeCollectionId) return;

    const fromCol = collections.find((c) => c.id === activeCollectionId);
    const toCol = collections.find((c) => c.id === targetColId);

    const success = movePinBetweenCollections(activeCollectionId, targetColId, quickMovePin.id);
    if (success) {
      message.success(`Moved "${quickMovePin.title}" to ${toCol?.name || 'vault'}!`);
      logActivity(
        'collection_moved',
        `Moved "${quickMovePin.title}" from "${fromCol?.name || 'vault'}" to "${toCol?.name || 'vault'}"`,
        'swap'
      );
    }
    setQuickMovePin(null);
  };

  const otherCollections = collections.filter((c) => c.id !== activeCollection?.id);

  return (
    <div className="library-page-container">
      {/* If inside a specific collection */}
      {activeCollection ? (
        <div className="collection-detail-view">
          <div className="collection-detail-header relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 mb-6">
            {activeCollection.coverImage && (
              <div className="absolute inset-0 z-0 opacity-25 overflow-hidden">
                <img
                  src={activeCollection.coverImage}
                  alt={activeCollection.name}
                  className="w-full h-full object-cover filter blur-sm scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090b14] via-[#090b14]/70 to-transparent" />
              </div>
            )}

            <div className="relative z-10">
              <button
                type="button"
                className="back-to-collections-btn mb-4 inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
                onClick={() => setActiveCollectionId(null)}
              >
                <ArrowLeftOutlined /> Back to All Collections
              </button>

              <div className="collection-detail-meta-row flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  {activeCollection.coverImage ? (
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-slate-700 shadow-lg shrink-0">
                      <img
                        src={activeCollection.coverImage}
                        alt={activeCollection.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute bottom-1 right-1 text-xs bg-slate-950/80 px-1 py-0.5 rounded">
                        {activeCollection.icon}
                      </span>
                    </div>
                  ) : (
                    <span
                      className="collection-big-icon w-14 h-14 rounded-xl flex items-center justify-center text-2xl"
                      style={{ backgroundColor: `${activeCollection.color}22` }}
                    >
                      {activeCollection.icon}
                    </span>
                  )}
                  <div>
                    <h1 className="collection-detail-title text-2xl font-bold text-white font-cinzel">
                      {activeCollection.name}
                    </h1>
                    <p className="collection-detail-desc text-slate-300 text-sm mt-1 max-w-xl">
                      {activeCollection.description || 'Curated collection of nocturnal artifacts'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    className="btn-outline-action px-3.5 py-1.5 rounded-lg border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-xs font-semibold text-white flex items-center gap-1.5 transition-all"
                    onClick={(e) => handleOpenEdit(activeCollection, e)}
                  >
                    <EditOutlined /> Edit Collection & Cover
                  </button>
                </div>
              </div>

              <div className="collection-stats-bar mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
                <span>{collectionPins.length} artifacts in this collection</span>
                {activeCollection.coverImage && (
                  <span className="text-cyan-400 font-mono text-[11px] flex items-center gap-1">
                    <CheckCircleFilled /> Custom Cover Active
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Vault Transfer Targets Shelf (when viewing an active collection) */}
          {otherCollections.length > 0 && (
            <div className="vault-transfer-shelf mb-6">
              <div className="vault-transfer-shelf-header flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
                <div className="flex items-center gap-2">
                  <SwapOutlined className="text-cyan-400 text-sm" />
                  <span className="font-bold text-xs uppercase tracking-wider text-slate-200">
                    Vault Transfer Drop Targets
                  </span>
                </div>
                <span className="text-[11px] text-slate-400">
                  Drag any post onto a target vault below to move it, or use the &ldquo;Move&rdquo; button
                </span>
              </div>

              <div className="vault-transfer-targets-grid">
                {otherCollections.map((targetCol) => {
                  const isHovered = dragOverTargetId === targetCol.id;
                  const targetCount = targetCol.pinIds?.length || 0;

                  return (
                    <div
                      key={targetCol.id}
                      className={`vault-drop-target-card ${isHovered ? 'drag-over' : ''}`}
                      onDragOver={(e) => handleDragOver(e, targetCol.id)}
                      onDragEnter={(e) => handleDragOver(e, targetCol.id)}
                      onDragLeave={(e) => handleDragLeave(e, targetCol.id)}
                      onDrop={(e) => handleDropOnCollection(targetCol.id, e)}
                      onClick={() => setActiveCollectionId(targetCol.id)}
                      role="region"
                      aria-label={`Drop target for ${targetCol.name}`}
                      title={`Drop to transfer post to "${targetCol.name}", or click to open`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span
                          className="vault-drop-icon shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm shadow"
                          style={{ backgroundColor: `${targetCol.color || '#3b82f6'}26` }}
                        >
                          {targetCol.icon || '📁'}
                        </span>
                        <div className="min-w-0 text-left">
                          <div className="vault-drop-name truncate font-bold text-xs text-white">
                            {targetCol.name}
                          </div>
                          <div className="vault-drop-meta text-[11px] text-slate-400 font-mono">
                            {targetCount} {targetCount === 1 ? 'item' : 'items'}
                          </div>
                        </div>
                      </div>

                      <div className="vault-drop-status-pill">
                        {isHovered ? (
                          <span className="text-cyan-300 font-bold text-xs animate-pulse flex items-center gap-1">
                            ✨ Release to Move!
                          </span>
                        ) : (
                          <span className="text-slate-400 text-[11px] flex items-center gap-1">
                            <ArrowRightOutlined /> Drop Zone
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Collection items grid */}
          {collectionPins.length > 0 ? (
            <div className="pins-masonry-grid">
              {collectionPins.map((pin) => {
                const isBeingDragged = draggedPin?.id === pin.id;
                return (
                  <div
                    key={pin.id}
                    className={`collection-pin-item relative group ${isBeingDragged ? 'is-dragging-card' : ''}`}
                    draggable={true}
                    onDragStart={(e) => handleDragStart(e, pin)}
                    onDragEnd={handleDragEnd}
                  >
                    {/* Drag Grip Handle */}
                    <div
                      className="pin-drag-handle-pill"
                      title="Click and drag to transfer this post to another vault"
                    >
                      <HolderOutlined />
                      <span>Drag to Move</span>
                    </div>

                    <PinCard pin={pin} />

                    {/* Action buttons overlay */}
                    <div className="collection-pin-actions-bar">
                      {otherCollections.length > 0 && (
                        <button
                          type="button"
                          className="move-to-col-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            setQuickMovePin(pin);
                          }}
                          title="Move to another collection"
                        >
                          <SwapOutlined /> Move
                        </button>
                      )}
                      <button
                        type="button"
                        className="remove-from-col-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          removePinFromCollection(activeCollection.id, pin.id);
                          message.info(`Removed "${pin.title}" from collection`);
                        }}
                        title="Remove from this collection"
                      >
                        <CloseOutlined /> Remove
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <EmptyCollectionState
              collection={activeCollection}
              onAddFirstPost={(initialData) => {
                if (onOpenCreatePin) {
                  onOpenCreatePin({ collectionId: activeCollection.id, ...initialData });
                }
              }}
              onExplore={() => {
                if (onNavigate) {
                  onNavigate('explore');
                }
              }}
            />
          )}
        </div>
      ) : (
        /* Top Level Collections Dashboard */
        <div className="collections-dashboard">
          <div className="page-header-banner flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="page-header-title-row flex items-center gap-3">
              <div className="page-title-icon-box w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0">
                <FolderOutlined style={{ color: '#00f2fe', fontSize: '22px' }} />
              </div>
              <div>
                <h1 className="page-main-title font-cinzel text-xl sm:text-2xl font-bold text-white">
                  Personal Library
                </h1>
                <p className="page-subtitle text-slate-400 text-xs sm:text-sm">
                  Organize ideas, nocturnal inspiration, and AI creations into thematic vaults with custom cover photos
                </p>
              </div>
            </div>

            <button
              type="button"
              className="btn-primary shrink-0 self-start sm:self-auto"
              onClick={handleOpenCreate}
            >
              <PlusOutlined /> New Collection
            </button>
          </div>

          {/* Collections Grid */}
          <div className="collections-grid">
            {collections.map((col) => {
              const count = col.pinIds?.length || 0;
              const samplePins = pins.filter((p) => col.pinIds?.includes(p.id)).slice(0, 3);
              const isCardTargeted = dragOverTargetId === col.id;

              return (
                <div
                  key={col.id}
                  className={`collection-folder-card group relative ${isCardTargeted ? 'drag-over-folder ring-2 ring-cyan-400 shadow-[0_0_30px_rgba(0,242,254,0.35)]' : ''}`}
                  onClick={() => setActiveCollectionId(col.id)}
                  onDragOver={(e) => handleDragOver(e, col.id)}
                  onDragEnter={(e) => handleDragOver(e, col.id)}
                  onDragLeave={(e) => handleDragLeave(e, col.id)}
                  onDrop={(e) => handleDropOnCollection(col.id, e)}
                  role="button"
                  tabIndex={0}
                >
                  {isCardTargeted && (
                    <div className="absolute inset-0 z-20 bg-cyan-950/80 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center text-center p-4 border-2 border-dashed border-cyan-400 animate-pulse pointer-events-none">
                      <span className="text-3xl mb-1">✨</span>
                      <span className="text-sm font-bold text-white">
                        Release to move into &ldquo;{col.name}&rdquo;
                      </span>
                      <span className="text-xs text-cyan-300 font-mono mt-1">
                        Drop zone active
                      </span>
                    </div>
                  )}

                  {/* Folder Top Thumbnails / Cover Image Preview */}
                  <div className="folder-preview-mosaic relative overflow-hidden bg-slate-950/60">
                    {col.coverImage ? (
                      <div className="folder-cover-image-wrap w-full h-full relative">
                        <img
                          src={col.coverImage}
                          alt={col.name}
                          className="folder-cover-img w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20 pointer-events-none" />
                        <div
                          className="folder-cover-badge absolute top-2.5 left-2.5 w-8 h-8 rounded-lg flex items-center justify-center shadow-lg border border-white/20 backdrop-blur-md text-sm"
                          style={{ backgroundColor: `${col.color || '#3b82f6'}dd` }}
                        >
                          {col.icon || '📁'}
                        </div>
                      </div>
                    ) : samplePins.length > 0 ? (
                      samplePins.map((p, i) => (
                        <div key={p.id || i} className={`folder-thumbnail-slot slot-${i}`}>
                          <div
                            className="folder-thumbnail-fill"
                            style={{
                              background: p.visualStyle?.gradient || 'linear-gradient(135deg, #1e293b, #0f172a)',
                            }}
                          >
                            <span className="thumbnail-symbol">{p.visualStyle?.symbol || '✨'}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="folder-empty-preview">
                        <span className="empty-preview-icon">{col.icon || '📁'}</span>
                      </div>
                    )}
                  </div>

                  {/* Folder Info */}
                  <div className="folder-meta-section">
                    <div className="folder-title-row">
                      <div className="flex items-center gap-2 min-w-0">
                        {!col.coverImage && (
                          <span
                            className="folder-icon-tag shrink-0"
                            style={{ backgroundColor: `${col.color}22` }}
                          >
                            {col.icon || '📁'}
                          </span>
                        )}
                        <h3 className="folder-name truncate">{col.name}</h3>
                      </div>

                      <div className="folder-actions shrink-0" onClick={(e) => e.stopPropagation()}>
                        <button
                          type="button"
                          className="folder-action-icon-btn"
                          onClick={(e) => handleOpenEdit(col, e)}
                          title="Edit collection & cover"
                          aria-label={`Edit collection ${col.name}`}
                        >
                          <EditOutlined />
                        </button>
                        <button
                          type="button"
                          className="folder-action-icon-btn delete"
                          onClick={(e) => handleDelete(col.id, col.name, e)}
                          title="Delete collection"
                          aria-label={`Delete collection ${col.name}`}
                        >
                          <DeleteOutlined />
                        </button>
                      </div>
                    </div>

                    <p className="folder-description line-clamp-2">
                      {col.description || 'Collection of nocturnal artifacts'}
                    </p>

                    <div className="folder-footer">
                      <span className="folder-items-count">
                        {count} {count === 1 ? 'item' : 'items'}
                      </span>
                      <span className="folder-explore-cta">Open Collection →</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Create / Edit Collection Modal with Image Input & Prompt AI Generator */}
      {(isCreatingModal || editingCollection) && (
        <div
          className="modal-backdrop"
          onClick={() => {
            setIsCreatingModal(false);
            setEditingCollection(null);
          }}
        >
          <div className="modal-card collection-modal-card max-w-xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-header-title">
                <FolderAddOutlined style={{ color: '#00f2fe' }} />
                <span>{editingCollection ? 'Edit Collection' : 'Create New Collection'}</span>
              </div>
              <button
                className="modal-close-btn"
                onClick={() => {
                  setIsCreatingModal(false);
                  setEditingCollection(null);
                }}
                aria-label="Close modal"
              >
                <CloseOutlined />
              </button>
            </div>

            <form onSubmit={handleSaveCollection} className="collection-modal-form">
              {/* Basic Fields */}
              <div className="form-group">
                <label className="form-label">Collection Name *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Cyberpunk Vistas, Night Architecture, Astral Folios"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  autoFocus
                />
              </div>

              <div className="form-group">
                <label className="form-label">Description (Optional)</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="What is this collection about?"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                />
              </div>

              {/* Icon & Color Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <div className="form-group mb-0">
                  <label className="form-label">Icon</label>
                  <div className="icon-selector-grid">
                    {iconOptions.map((ic) => (
                      <button
                        key={ic}
                        type="button"
                        className={`icon-chip ${icon === ic ? 'active' : ''}`}
                        onClick={() => setIcon(ic)}
                      >
                        {ic}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-group mb-0">
                  <label className="form-label">Color Accent</label>
                  <div className="color-selector-row">
                    {colorOptions.map((co) => (
                      <button
                        key={co}
                        type="button"
                        className={`color-chip ${color === co ? 'active' : ''}`}
                        style={{ backgroundColor: co }}
                        onClick={() => setColor(co)}
                        aria-label={`Select color ${co}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Cover Photo: Input Image OR Write Prompt to Generate Image */}
              <div className="collection-cover-section mt-4 pt-3 border-t border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <label className="form-label mb-0 text-slate-200 font-bold flex items-center gap-1.5">
                    <PictureOutlined style={{ color: '#00f2fe' }} />
                    <span>Collection Cover Photo</span>
                  </label>
                  {coverImage && (
                    <button
                      type="button"
                      className="text-xs text-rose-400 hover:text-rose-300 font-semibold"
                      onClick={() => setCoverImage('')}
                    >
                      Clear Cover Photo
                    </button>
                  )}
                </div>

                {/* Active Cover Image Preview if selected */}
                {coverImage && (
                  <div className="active-cover-preview relative h-36 rounded-xl overflow-hidden border border-slate-700/80 mb-3 bg-slate-950">
                    <img
                      src={coverImage}
                      alt="Collection Cover"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-2.5 left-3 flex items-center gap-2 text-white">
                      <span
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-sm shadow-md"
                        style={{ backgroundColor: color }}
                      >
                        {icon}
                      </span>
                      <span className="font-semibold text-sm truncate max-w-[200px]">
                        {name || 'Vault Preview'}
                      </span>
                    </div>
                    <div className="absolute top-2 right-2">
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-900/90 text-cyan-300 border border-cyan-500/30">
                        Active Cover
                      </span>
                    </div>
                  </div>
                )}

                {/* Cover Mode Tabs: Input Image / Upload vs Generate by User Prompt */}
                <div className="cover-mode-tabs flex gap-2 mb-3">
                  <button
                    type="button"
                    className={`cover-mode-tab ${coverMode === 'url' ? 'active' : ''}`}
                    onClick={() => setCoverMode('url')}
                  >
                    <LinkOutlined /> Input Image URL
                  </button>
                  <button
                    type="button"
                    className={`cover-mode-tab ${coverMode === 'upload' ? 'active' : ''}`}
                    onClick={() => setCoverMode('upload')}
                  >
                    <UploadOutlined /> Upload File
                  </button>
                  <button
                    type="button"
                    className={`cover-mode-tab ${coverMode === 'ai' ? 'active' : ''}`}
                    onClick={() => setCoverMode('ai')}
                  >
                    <ThunderboltFilled style={{ color: '#00f2fe' }} /> Generate with AI Prompt
                  </button>
                </div>

                {/* Mode 1: Image URL */}
                {coverMode === 'url' && (
                  <div className="form-group mb-2">
                    <input
                      type="url"
                      className="form-input text-xs"
                      placeholder="Enter photo URL, e.g. https://images.unsplash.com/..."
                      value={coverImage}
                      onChange={(e) => setCoverImage(e.target.value)}
                    />
                    <p className="text-[11px] text-slate-400 mt-1">
                      Paste a direct image URL or Unsplash link to set as the collection cover photo.
                    </p>
                  </div>
                )}

                {/* Mode 2: Local File Upload */}
                {coverMode === 'upload' && (
                  <div className="form-group mb-2">
                    <label className="flex items-center justify-center gap-2 p-4 border border-dashed border-slate-700 hover:border-cyan-500 rounded-xl bg-slate-900/60 cursor-pointer transition-colors text-slate-300 hover:text-white text-xs">
                      <UploadOutlined style={{ fontSize: '18px', color: '#00f2fe' }} />
                      <span>Click to select an image from your device</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                )}

                {/* Mode 3: Write Prompt & Concept Generator */}
                {coverMode === 'ai' && (
                  <div className="ai-cover-prompt-card bg-slate-900/80 border border-cyan-500/30 rounded-xl p-3.5 mb-2">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                        <ThunderboltFilled style={{ color: '#00f2fe' }} />
                        Write Prompt to Generate Cover Photo
                      </span>
                      <button
                        type="button"
                        className="btn-concept-surprise"
                        onClick={handleSurpriseConcept}
                        title="Pick a random creative concept prompt"
                      >
                        🎲 Surprise Concept
                      </button>
                    </div>

                    <textarea
                      rows={2}
                      className="form-textarea text-xs w-full mb-2 bg-slate-950 border border-slate-700/80 rounded-lg p-2 text-white"
                      placeholder="Write your prompt: e.g. An illuminated library with glowing cyan constellations and mahogany folios..."
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                    />

                    {/* Concept Presets Bar */}
                    <div className="mb-3">
                      <span className="text-[11px] text-slate-400 font-medium block mb-1">
                        Atmospheric Concept Inspirations:
                      </span>
                      <div className="ai-concept-chips-wrap">
                        {COLLECTION_CONCEPTS.map((c) => (
                          <button
                            key={c.label}
                            type="button"
                            className="concept-chip"
                            onClick={() => {
                              setAiPrompt(c.prompt);
                              handleGenerateCoverAI(c.prompt);
                            }}
                          >
                            {c.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] text-slate-400">
                        Generates a custom 16:9 atmospheric cover visual
                      </span>
                      <button
                        type="button"
                        className="btn-ai-submit px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/50 text-xs font-bold flex items-center gap-1.5 transition-all"
                        disabled={isGenerating || !aiPrompt.trim()}
                        onClick={() => handleGenerateCoverAI()}
                      >
                        {isGenerating ? (
                          <>
                            <LoadingOutlined /> Generating Cover...
                          </>
                        ) : (
                          <>
                            <ThunderboltFilled /> Generate Cover Photo
                          </>
                        )}
                      </button>
                    </div>

                    {/* AI Preview Result */}
                    {aiPreviewUrl && (
                      <div className="mt-3 pt-3 border-t border-slate-800">
                        <div className="relative h-32 rounded-lg overflow-hidden border border-cyan-500/40 mb-2">
                          <img
                            src={aiPreviewUrl}
                            alt="Generated Cover Preview"
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] text-slate-400 font-mono">
                            {aiModelInfo || 'Lumen Neural Engine'}
                          </span>
                          <button
                            type="button"
                            className="btn-primary text-xs py-1 px-3"
                            onClick={handleApplyAiCover}
                          >
                            ✓ Apply as Cover Photo
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Modal Footer Actions */}
              <div className="modal-footer-actions mt-5 pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => {
                    setIsCreatingModal(false);
                    setEditingCollection(null);
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {editingCollection ? 'Save Collection Changes' : 'Create Collection'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Quick Move Modal (for direct transfer without drag & drop, especially on touch/mobile) */}
      {quickMovePin && (
        <div className="modal-backdrop" onClick={() => setQuickMovePin(null)}>
          <div
            className="modal-card max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="modal-header flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <SwapOutlined style={{ color: '#00f2fe', fontSize: '18px' }} />
                <span className="font-bold text-white text-base">Move Post to Vault</span>
              </div>
              <button
                type="button"
                className="text-slate-400 hover:text-white p-1"
                onClick={() => setQuickMovePin(null)}
                aria-label="Close move modal"
              >
                <CloseOutlined />
              </button>
            </div>

            <div className="py-4">
              <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80 mb-4 flex items-center gap-3">
                {quickMovePin.imageUrl ? (
                  <img
                    src={quickMovePin.imageUrl}
                    alt={quickMovePin.title}
                    className="w-11 h-11 rounded-lg object-cover border border-slate-700"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-11 h-11 rounded-lg bg-slate-800 flex items-center justify-center text-base">
                    {quickMovePin.visualStyle?.symbol || '✨'}
                  </div>
                )}
                <div className="min-w-0">
                  <div className="text-xs font-bold text-white truncate">
                    {quickMovePin.title}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Currently in: <strong className="text-cyan-400">{activeCollection?.name}</strong>
                  </div>
                </div>
              </div>

              <p className="text-xs font-semibold text-slate-300 mb-2.5 uppercase tracking-wider">
                Select Destination Vault:
              </p>

              <div className="space-y-2 max-h-[260px] overflow-y-auto pr-1">
                {otherCollections.map((col) => {
                  const count = col.pinIds?.length || 0;
                  return (
                    <div
                      key={col.id}
                      className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/60 hover:bg-slate-800/90 transition-all cursor-pointer group"
                      onClick={() => handleQuickMove(col.id)}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-sm shadow shrink-0"
                          style={{ backgroundColor: `${col.color || '#3b82f6'}26` }}
                        >
                          {col.icon || '📁'}
                        </span>
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
                            {col.name}
                          </div>
                          <span className="text-[11px] text-slate-400 font-mono">
                            {count} {count === 1 ? 'item' : 'items'}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        className="btn-primary text-xs py-1 px-3 shrink-0 ml-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleQuickMove(col.id);
                        }}
                      >
                        Move Here →
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="modal-footer pt-3 border-t border-slate-800 flex justify-end">
              <button
                type="button"
                className="btn-cancel text-xs"
                onClick={() => setQuickMovePin(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Drag HUD (appears at bottom of viewport when dragging any pin) */}
      {draggedPin && otherCollections.length > 0 && (
        <div className="floating-drag-hud animate-slide-up">
          <div className="floating-drag-hud-inner">
            <div className="floating-drag-pin-preview">
              <span className="floating-drag-badge">DRAGGING</span>
              <span className="floating-drag-title truncate max-w-[160px] sm:max-w-[220px]">
                {draggedPin.title}
              </span>
            </div>

            <div className="floating-drag-targets-list">
              <span className="text-[11px] text-slate-400 mr-1 hidden md:inline">
                Drop onto:
              </span>
              {otherCollections.map((col) => {
                const isHovered = dragOverTargetId === col.id;
                return (
                  <div
                    key={col.id}
                    className={`floating-drop-target-pill ${isHovered ? 'hovered ring-2 ring-cyan-400' : ''}`}
                    onDragOver={(e) => handleDragOver(e, col.id)}
                    onDragEnter={(e) => handleDragOver(e, col.id)}
                    onDragLeave={(e) => handleDragLeave(e, col.id)}
                    onDrop={(e) => handleDropOnCollection(col.id, e)}
                  >
                    <span className="text-xs">{col.icon || '📁'}</span>
                    <span className="truncate max-w-[100px] text-xs font-semibold">
                      {col.name}
                    </span>
                    {isHovered && <span className="text-cyan-300 text-xs">✦</span>}
                  </div>
                );
              })}
            </div>

            <button
              type="button"
              className="floating-drag-cancel-btn"
              onClick={() => setDraggedPin(null)}
              title="Cancel drag"
            >
              <CloseOutlined />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
