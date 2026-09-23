import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PINS, INITIAL_BOARDS } from '../data/pinterestPins.js';

const PinterestContext = createContext(null);

const STORAGE_KEYS = {
  PINS: 'lumen_pinterest_pins_v2',
  BOARDS: 'lumen_pinterest_boards_v2',
  SAVED: 'lumen_pinterest_saved_v2',
  LIKED: 'lumen_pinterest_liked_v2',
};

export function PinterestProvider({ children }) {
  // Load pins from storage or default
  const [pins, setPins] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PINS);
      return saved ? JSON.parse(saved) : INITIAL_PINS;
    } catch {
      return INITIAL_PINS;
    }
  });

  // Load boards
  const [boards, setBoards] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BOARDS);
      return saved ? JSON.parse(saved) : INITIAL_BOARDS;
    } catch {
      return INITIAL_BOARDS;
    }
  });

  // Load saved pin IDs
  const [savedPinIds, setSavedPinIds] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SAVED);
      return saved ? JSON.parse(saved) : ['pin-img-1', 'pin-story-1', 'pin-book-1'];
    } catch {
      return ['pin-img-1', 'pin-story-1', 'pin-book-1'];
    }
  });

  // Load liked pin IDs
  const [likedPinIds, setLikedPinIds] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LIKED);
      return saved ? JSON.parse(saved) : ['pin-img-1', 'pin-story-2'];
    } catch {
      return ['pin-img-1', 'pin-story-2'];
    }
  });

  // Active view modal
  const [activeModal, setActiveModal] = useState(null); // { type: 'image'|'story'|'book'|'create_pin'|'share', pin: ... }
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('trending');

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PINS, JSON.stringify(pins));
    } catch (e) {
      console.warn('Failed to persist pins', e);
    }
  }, [pins]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.BOARDS, JSON.stringify(boards));
    } catch (e) {
      console.warn('Failed to persist boards', e);
    }
  }, [boards]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SAVED, JSON.stringify(savedPinIds));
    } catch (e) {
      console.warn('Failed to persist saved pins', e);
    }
  }, [savedPinIds]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.LIKED, JSON.stringify(likedPinIds));
    } catch (e) {
      console.warn('Failed to persist liked pins', e);
    }
  }, [likedPinIds]);

  // Helpers
  const isSaved = (pinId) => savedPinIds.includes(pinId);
  const isLiked = (pinId) => likedPinIds.includes(pinId);

  // Toggle Like
  const toggleLike = (pinId) => {
    setLikedPinIds((prev) => {
      const currentlyLiked = prev.includes(pinId);
      const next = currentlyLiked ? prev.filter((id) => id !== pinId) : [...prev, pinId];
      // Also adjust like count on pin
      setPins((prevPins) =>
        prevPins.map((p) =>
          p.id === pinId ? { ...p, likes: p.likes + (currentlyLiked ? -1 : 1) } : p
        )
      );
      return next;
    });
  };

  // Toggle Save to Board
  const toggleSave = (pinId, targetBoardId = 'board-all') => {
    setSavedPinIds((prev) => {
      const currentlySaved = prev.includes(pinId);
      const next = currentlySaved ? prev.filter((id) => id !== pinId) : [...prev, pinId];

      setPins((prevPins) =>
        prevPins.map((p) =>
          p.id === pinId ? { ...p, savedCount: p.savedCount + (currentlySaved ? -1 : 1) } : p
        )
      );

      // Also update target board pin list
      setBoards((prevBoards) =>
        prevBoards.map((b) => {
          if (b.id === targetBoardId) {
            const hasPin = b.pinIds.includes(pinId);
            return {
              ...b,
              pinIds: hasPin ? b.pinIds.filter((id) => id !== pinId) : [...b.pinIds, pinId],
            };
          }
          return b;
        })
      );

      return next;
    });
  };

  // Add Comment
  const addComment = (pinId, commentText, authorName = 'Nocturnal Wanderer') => {
    if (!commentText || !commentText.trim()) return;
    const newComment = {
      id: `c_${Date.now()}`,
      user: authorName,
      time: 'Just now',
      text: commentText.trim(),
    };

    setPins((prev) =>
      prev.map((p) => (p.id === pinId ? { ...p, comments: [newComment, ...(p.comments || [])] } : p))
    );

    // If active modal is open on this pin, update it too
    if (activeModal && activeModal.pin && activeModal.pin.id === pinId) {
      setActiveModal((prev) => ({
        ...prev,
        pin: {
          ...prev.pin,
          comments: [newComment, ...(prev.pin.comments || [])],
        },
      }));
    }
  };

  // Create new Pin
  const createPin = (newPinData) => {
    const id = `pin-${Date.now()}`;
    const formattedPin = {
      ...newPinData,
      id,
      likes: 1,
      savedCount: 1,
      comments: [],
      author: {
        name: newPinData.authorName || 'You (Creator)',
        handle: '@you',
        initials: 'YO',
        bio: 'Nocturnal explorer and storyteller.',
      },
    };

    setPins((prev) => [formattedPin, ...prev]);
    setSavedPinIds((prev) => [...prev, id]);

    // Add to board if selected
    if (newPinData.targetBoardId) {
      setBoards((prev) =>
        prev.map((b) =>
          b.id === newPinData.targetBoardId ? { ...b, pinIds: [id, ...b.pinIds] } : b
        )
      );
    }
    return formattedPin;
  };

  // Create new Board
  const createBoard = (name, description = '', coverColor = '#3b82f6') => {
    const newBoard = {
      id: `board-${Date.now()}`,
      name: name.trim() || 'Untitled Board',
      description: description.trim() || 'Collection of nocturnal pins',
      coverColor,
      pinIds: [],
    };
    setBoards((prev) => [...prev, newBoard]);
    return newBoard;
  };

  // Open Pin Modal
  const openPin = (pin, preferredType) => {
    const modalType = preferredType || pin.type || 'image';
    setActiveModal({ type: modalType, pin });
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  // Filtered pins
  const getFilteredPins = () => {
    return pins
      .filter((pin) => {
        // Query filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = pin.title.toLowerCase().includes(q);
          const matchAuthor = pin.author?.name.toLowerCase().includes(q);
          const matchCategory = pin.category?.toLowerCase().includes(q);
          const matchTags = pin.tags?.some((t) => t.toLowerCase().includes(q));
          const matchDesc = (pin.description || pin.summary || pin.excerpt || '')
            .toLowerCase()
            .includes(q);
          if (!matchTitle && !matchAuthor && !matchCategory && !matchTags && !matchDesc) {
            return false;
          }
        }

        // Category / Type filter
        if (activeFilter === 'all') return true;
        if (activeFilter === 'image') return pin.type === 'image';
        if (activeFilter === 'story') return pin.type === 'story';
        if (activeFilter === 'book') return pin.type === 'book';
        if (activeFilter === 'saved') return savedPinIds.includes(pin.id);
        if (activeFilter === 'photography')
          return pin.category?.toLowerCase().includes('photo') || pin.type === 'image';
        if (activeFilter === 'gothic')
          return (
            pin.category?.toLowerCase().includes('gothic') ||
            pin.tags?.some((t) => t.toLowerCase().includes('gothic'))
          );
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'likes') return b.likes - a.likes;
        if (sortBy === 'newest') return (b.id > a.id ? 1 : -1);
        // trending
        return b.likes + b.savedCount * 2 - (a.likes + a.savedCount * 2);
      });
  };

  return (
    <PinterestContext.Provider
      value={{
        pins,
        boards,
        savedPinIds,
        likedPinIds,
        activeModal,
        searchQuery,
        activeFilter,
        sortBy,
        setSearchQuery,
        setActiveFilter,
        setSortBy,
        setActiveModal,
        openPin,
        closeModal,
        isSaved,
        isLiked,
        toggleLike,
        toggleSave,
        addComment,
        createPin,
        createBoard,
        getFilteredPins,
      }}
    >
      {children}
    </PinterestContext.Provider>
  );
}

export function usePinterest() {
  const context = useContext(PinterestContext);
  if (!context) {
    throw new Error('usePinterest must be used within PinterestProvider');
  }
  return context;
}
