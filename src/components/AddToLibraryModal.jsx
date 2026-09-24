import React, { useState } from 'react';
import {
  CloseOutlined,
  FolderAddOutlined,
  CheckOutlined,
  PlusOutlined,
  FolderOutlined,
  PictureOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { App } from 'antd';
import { usePinterest } from '../context/PinterestContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export function AddToLibraryModal({ pin, onClose }) {
  const { message } = App.useApp();
  const { collections, addPinToCollection, removePinFromCollection, createCollection } = usePinterest();
  const { logActivity } = useAuth();

  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [newColName, setNewColName] = useState('');
  const [newColDesc, setNewColDesc] = useState('');
  const [newColIcon, setNewColIcon] = useState('📁');
  const [newColColor, setNewColColor] = useState('#3b82f6');
  const [newColCover, setNewColCover] = useState(pin?.imageUrl || '');

  if (!pin) return null;

  const iconOptions = ['📁', '💡', '✨', '🚀', '🖼️', '📜', '🤖', '🔮', '🌌', '🏮', '🏛️', '🌿'];
  const colorOptions = ['#3b82f6', '#eab308', '#a855f7', '#06b6d4', '#f43f5e', '#10b981', '#f97316'];

  const handleToggleCollection = (col) => {
    const isInside = col.pinIds?.includes(pin.id);
    if (isInside) {
      removePinFromCollection(col.id, pin.id);
      message.info(`Removed from "${col.name}"`);
    } else {
      addPinToCollection(col.id, pin.id);
      message.success(`Added to Library: "${col.name}"`);
      logActivity('collection_added', `Added "${pin.title}" to collection ${col.name}`, 'folder');
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setNewColCover(uploadEvent.target.result);
        message.success('Cover photo loaded!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateAndAdd = (e) => {
    e.preventDefault();
    if (!newColName.trim()) {
      message.error('Please enter a collection name');
      return;
    }
    const created = createCollection(newColName, newColDesc, newColIcon, newColColor, newColCover);
    addPinToCollection(created.id, pin.id);
    message.success(`Created "${created.name}" with cover photo!`);
    logActivity('collection_created', `Created collection "${created.name}"`, 'folder-add');
    setIsCreatingNew(false);
    setNewColName('');
    setNewColDesc('');
    setNewColCover('');
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card add-to-library-modal max-w-md w-full" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-header-title">
            <FolderOutlined style={{ color: '#e11d48' }} />
            <span>Add to Personal Library</span>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <CloseOutlined />
          </button>
        </div>

        {/* Pin summary card */}
        <div className="add-library-pin-preview mb-4 flex items-center gap-3 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
          {pin.imageUrl ? (
            <img
              src={pin.imageUrl}
              alt={pin.title}
              className="w-12 h-12 rounded-lg object-cover border border-slate-700 shrink-0"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center text-lg shrink-0"
              style={{ background: pin.visualStyle?.gradient || '#1e293b' }}
            >
              {pin.visualStyle?.symbol || '✨'}
            </div>
          )}
          <div className="add-library-pin-info min-w-0 flex-1">
            <h4 className="font-semibold text-xs sm:text-sm line-clamp-1 text-white">{pin.title}</h4>
            <p className="text-[11px] text-slate-400">By {pin.author?.name || 'Creator'}</p>
          </div>
          <span className="add-library-pin-type-tag text-[10px] px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-mono shrink-0">
            {pin.type?.toUpperCase()}
          </span>
        </div>

        {/* Collections List */}
        {!isCreatingNew ? (
          <div className="library-collections-picker">
            <div className="picker-header-row flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Select Collections
              </span>
              <button
                type="button"
                className="btn-text-action text-xs text-rose-400 hover:text-rose-300 font-semibold flex items-center gap-1"
                onClick={() => {
                  setNewColCover(pin.imageUrl || '');
                  setIsCreatingNew(true);
                }}
              >
                <PlusOutlined /> New Collection
              </button>
            </div>

            <div className="collections-checkbox-list max-h-60 overflow-y-auto space-y-1.5 pr-1">
              {collections.map((col) => {
                const isSelected = col.pinIds?.includes(pin.id);
                return (
                  <div
                    key={col.id}
                    className={`collection-picker-item flex items-center justify-between p-2.5 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-rose-950/20 border-rose-500/40 text-white'
                        : 'bg-slate-900/50 border-slate-800/80 hover:bg-slate-800/60 text-slate-300'
                    }`}
                    onClick={() => handleToggleCollection(col)}
                  >
                    <div className="collection-picker-left flex items-center gap-2.5 min-w-0">
                      {col.coverImage ? (
                        <img
                          src={col.coverImage}
                          alt={col.name}
                          className="w-8 h-8 rounded-lg object-cover border border-slate-700 shrink-0"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <span
                          className="col-picker-icon w-8 h-8 rounded-lg flex items-center justify-center text-sm shrink-0"
                          style={{ backgroundColor: `${col.color}22` }}
                        >
                          {col.icon || '📁'}
                        </span>
                      )}
                      <div className="min-w-0">
                        <div className="col-picker-title font-semibold text-xs sm:text-sm truncate">
                          {col.name}
                        </div>
                        <div className="col-picker-meta text-[11px] text-slate-400">
                          {col.pinIds?.length || 0} items
                        </div>
                      </div>
                    </div>

                    <div
                      className={`col-picker-checkbox w-5 h-5 rounded flex items-center justify-center border transition-colors shrink-0 ${
                        isSelected
                          ? 'bg-rose-600 border-rose-600'
                          : 'border-slate-600 bg-slate-800'
                      }`}
                    >
                      {isSelected && <CheckOutlined style={{ fontSize: '11px', color: '#ffffff' }} />}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="modal-footer-actions mt-4 pt-3 border-t border-slate-800">
              <button type="button" className="btn-primary w-full" onClick={onClose}>
                Done
              </button>
            </div>
          </div>
        ) : (
          /* Create New Collection Form */
          <form onSubmit={handleCreateAndAdd} className="create-collection-form space-y-3">
            <div className="form-group mb-0">
              <label className="form-label">Collection Name *</label>
              <input
                type="text"
                className="form-input text-xs"
                placeholder="e.g. Neo-Tokyo Inspirations"
                value={newColName}
                onChange={(e) => setNewColName(e.target.value)}
                autoFocus
                required
              />
            </div>

            <div className="form-group mb-0">
              <label className="form-label">Description (Optional)</label>
              <input
                type="text"
                className="form-input text-xs"
                placeholder="What is this collection about?"
                value={newColDesc}
                onChange={(e) => setNewColDesc(e.target.value)}
              />
            </div>

            {/* Cover photo preview / input */}
            <div className="form-group mb-0">
              <div className="flex items-center justify-between mb-1">
                <label className="form-label mb-0 text-[11px]">Cover Photo</label>
                {newColCover && (
                  <button
                    type="button"
                    className="text-[11px] text-rose-400 hover:text-rose-300"
                    onClick={() => setNewColCover('')}
                  >
                    Clear Photo
                  </button>
                )}
              </div>
              <div className="flex gap-2">
                <input
                  type="url"
                  className="form-input text-xs"
                  placeholder="Cover photo URL (or click upload)"
                  value={newColCover}
                  onChange={(e) => setNewColCover(e.target.value)}
                />
                <label className="btn-upload-file shrink-0" title="Upload local photo">
                  <UploadOutlined />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="form-group mb-0">
                <label className="form-label">Icon</label>
                <div className="icon-selector-grid">
                  {iconOptions.slice(0, 8).map((ic) => (
                    <button
                      key={ic}
                      type="button"
                      className={`icon-chip ${newColIcon === ic ? 'active' : ''}`}
                      onClick={() => setNewColIcon(ic)}
                    >
                      {ic}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group mb-0">
                <label className="form-label">Accent</label>
                <div className="color-selector-row">
                  {colorOptions.map((co) => (
                    <button
                      key={co}
                      type="button"
                      className={`color-chip ${newColColor === co ? 'active' : ''}`}
                      style={{ backgroundColor: co }}
                      onClick={() => setNewColColor(co)}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="form-actions-row flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                type="button"
                className="btn-cancel text-xs"
                onClick={() => setIsCreatingNew(false)}
              >
                Back
              </button>
              <button type="submit" className="btn-primary text-xs">
                Create & Add Pin
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
