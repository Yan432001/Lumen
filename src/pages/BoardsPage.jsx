import React, { useState } from 'react';
import {
  FolderOutlined,
  FolderAddOutlined,
  PlusOutlined,
  HeartFilled,
  AppstoreOutlined,
  PushpinFilled,
} from '@ant-design/icons';
import { Modal, Input, App } from 'antd';
import { usePinterest } from '../context/PinterestContext.jsx';
import { PinCard } from '../components/PinCard.jsx';
import { PinArtwork } from '../components/PinArtwork.jsx';

export function BoardsPage({ onOpenCreatePin }) {
  const { message } = App.useApp();
  const {
    boards,
    pins,
    savedPinIds,
    likedPinIds,
    createBoard,
  } = usePinterest();

  const [selectedBoardId, setSelectedBoardId] = useState('all-saved');
  const [isNewBoardModalOpen, setIsNewBoardModalOpen] = useState(false);
  const [newBoardName, setNewBoardName] = useState('');
  const [newBoardDesc, setNewBoardDesc] = useState('');

  // Handle board creation
  const handleCreateBoard = () => {
    if (!newBoardName.trim()) {
      message.error('Please provide a board name');
      return;
    }
    const created = createBoard(newBoardName, newBoardDesc);
    message.success(`Board "${created.name}" created!`);
    setNewBoardName('');
    setNewBoardDesc('');
    setIsNewBoardModalOpen(false);
    setSelectedBoardId(created.id);
  };

  // Pins to display
  let displayedPins = [];
  let currentBoardTitle = 'All Saved Pins';
  let currentBoardDesc = 'Every image, story, and illuminated book you have pinned';

  if (selectedBoardId === 'all-saved') {
    displayedPins = pins.filter((p) => savedPinIds.includes(p.id));
    currentBoardTitle = 'All Saved Pins';
  } else if (selectedBoardId === 'all-liked') {
    displayedPins = pins.filter((p) => likedPinIds.includes(p.id));
    currentBoardTitle = 'Liked Collections';
    currentBoardDesc = 'Pins and stories you have appreciated';
  } else {
    const board = boards.find((b) => b.id === selectedBoardId);
    if (board) {
      displayedPins = pins.filter((p) => board.pinIds.includes(p.id));
      currentBoardTitle = board.name;
      currentBoardDesc = board.description || '';
    }
  }

  return (
    <div className="boards-profile-page">
      {/* User Profile / Boards Header */}
      <header className="boards-hero-profile">
        <div className="profile-avatar-circle">
          <span>NL</span>
        </div>

        <div className="profile-text-cluster">
          <h1 className="profile-name">Nocturnal Luminary</h1>
          <p className="profile-handle">@luminary_curator · Collector of Night & Literature</p>

          <div className="profile-stats-bar">
            <div className="stat-unit">
              <span className="stat-num">{savedPinIds.length}</span>
              <span className="stat-label">Saved Pins</span>
            </div>
            <span className="stat-dot">·</span>
            <div className="stat-unit">
              <span className="stat-num">{boards.length}</span>
              <span className="stat-label">Boards</span>
            </div>
            <span className="stat-dot">·</span>
            <div className="stat-unit">
              <span className="stat-num">{likedPinIds.length}</span>
              <span className="stat-label">Liked</span>
            </div>
          </div>
        </div>

        <div className="profile-header-actions">
          <button
            type="button"
            className="new-board-btn"
            onClick={() => setIsNewBoardModalOpen(true)}
          >
            <FolderAddOutlined />
            <span>New Board</span>
          </button>

          <button
            type="button"
            className="create-pin-board-btn"
            onClick={onOpenCreatePin}
          >
            <PlusOutlined />
            <span>Create Pin</span>
          </button>
        </div>
      </header>

      {/* Boards Carousel / Grid */}
      <section className="boards-shelf-section">
        <div className="section-shelf-header">
          <h3 className="shelf-title">Your Boards</h3>
          <span className="shelf-subtitle">Organized by themes, fiction genres and folios</span>
        </div>

        <div className="boards-cards-row">
          {/* Default "All Saved" pseudo-board */}
          <div
            className={`board-preview-card ${selectedBoardId === 'all-saved' ? 'active' : ''}`}
            onClick={() => setSelectedBoardId('all-saved')}
          >
            <div className="board-cover-mosaic">
              {pins
                .filter((p) => savedPinIds.includes(p.id))
                .slice(0, 3)
                .map((pin, i) => (
                  <div key={pin.id || i} className="mosaic-thumb">
                    <PinArtwork pin={pin} height="70px" />
                  </div>
                ))}
              {savedPinIds.length === 0 && (
                <div className="mosaic-empty">No pins yet</div>
              )}
            </div>
            <div className="board-card-info">
              <h4 className="board-title">All Saved</h4>
              <span className="board-pin-count">{savedPinIds.length} Pins</span>
            </div>
          </div>

          {/* User & Default Boards */}
          {boards.map((b) => {
            const boardPins = pins.filter((p) => b.pinIds.includes(p.id));
            return (
              <div
                key={b.id}
                className={`board-preview-card ${selectedBoardId === b.id ? 'active' : ''}`}
                onClick={() => setSelectedBoardId(b.id)}
              >
                <div className="board-cover-mosaic">
                  {boardPins.slice(0, 3).map((pin, i) => (
                    <div key={pin.id || i} className="mosaic-thumb">
                      <PinArtwork pin={pin} height="70px" />
                    </div>
                  ))}
                  {boardPins.length === 0 && (
                    <div className="mosaic-empty">Empty board</div>
                  )}
                </div>
                <div className="board-card-info">
                  <h4 className="board-title">{b.name}</h4>
                  <span className="board-pin-count">{b.pinIds.length} Pins</span>
                </div>
              </div>
            );
          })}

          {/* Liked Pins Board */}
          <div
            className={`board-preview-card ${selectedBoardId === 'all-liked' ? 'active' : ''}`}
            onClick={() => setSelectedBoardId('all-liked')}
          >
            <div className="board-cover-mosaic">
              {pins
                .filter((p) => likedPinIds.includes(p.id))
                .slice(0, 3)
                .map((pin, i) => (
                  <div key={pin.id || i} className="mosaic-thumb">
                    <PinArtwork pin={pin} height="70px" />
                  </div>
                ))}
            </div>
            <div className="board-card-info">
              <h4 className="board-title">Liked Pins</h4>
              <span className="board-pin-count">{likedPinIds.length} Pins</span>
            </div>
          </div>
        </div>
      </section>

      {/* Selected Board Detail / Pin Grid */}
      <section className="selected-board-content">
        <div className="board-content-header">
          <div>
            <h2 className="selected-board-title">{currentBoardTitle}</h2>
            {currentBoardDesc && <p className="selected-board-desc">{currentBoardDesc}</p>}
          </div>
          <span className="board-items-counter">{displayedPins.length} Pins</span>
        </div>

        {displayedPins.length > 0 ? (
          <div className="pinterest-waterfall-grid">
            {displayedPins.map((pin) => (
              <div key={pin.id} className="waterfall-item">
                <PinCard pin={pin} />
              </div>
            ))}
          </div>
        ) : (
          <div className="pinterest-empty-state">
            <div className="empty-symbol">📂</div>
            <h3 className="empty-title">This board is currently empty</h3>
            <p className="empty-sub">
              Browse the visual feed, stories, or books and click &ldquo;Save&rdquo; to add items here.
            </p>
          </div>
        )}
      </section>

      {/* Create Board Modal */}
      <Modal
        title="Create New Pinterest Board"
        open={isNewBoardModalOpen}
        onOk={handleCreateBoard}
        onCancel={() => setIsNewBoardModalOpen(false)}
        okText="Create Board"
        cancelText="Cancel"
      >
        <div className="new-board-form-inner" style={{ paddingTop: 12 }}>
          <label className="form-label" style={{ display: 'block', marginBottom: 6 }}>
            Board Name *
          </label>
          <Input
            placeholder="e.g. Victorian Horror, Architecture, Night Sky"
            value={newBoardName}
            onChange={(e) => setNewBoardName(e.target.value)}
            style={{ marginBottom: 14 }}
          />

          <label className="form-label" style={{ display: 'block', marginBottom: 6 }}>
            Description (optional)
          </label>
          <Input.TextArea
            rows={3}
            placeholder="What will you collect on this board?"
            value={newBoardDesc}
            onChange={(e) => setNewBoardDesc(e.target.value)}
          />
        </div>
      </Modal>
    </div>
  );
}
