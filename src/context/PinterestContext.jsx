import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PINS, INITIAL_BOARDS } from '../data/pinterestPins.js';

const PinterestContext = createContext(null);

const STORAGE_KEYS = {
  PINS: 'lumen_pinterest_pins_v3',
  BOARDS: 'lumen_pinterest_boards_v3',
  SAVED: 'lumen_pinterest_saved_v3',
  LIKED: 'lumen_pinterest_liked_v3',
  PINNED: 'lumen_pinterest_pinned_v3',
  COLLECTIONS: 'lumen_library_collections_v3',
  STORIES: 'lumen_stories_v3',
};

const DEFAULT_COLLECTIONS = [
  {
    id: 'col-ideas',
    name: 'Ideas',
    description: 'Rough concepts, creative notes, and nascent sparks',
    icon: '💡',
    color: '#eab308',
    coverImage: 'https://images.unsplash.com/photo-1507499739999-097706ad8914?w=800&auto=format&fit=crop&q=80',
    pinIds: ['pin-img-1', 'pin-story-1'],
    createdAt: '2026-01-10',
  },
  {
    id: 'col-inspiration',
    name: 'Inspiration',
    description: 'Atmospheric nocturnes, moody palettes, and aesthetics',
    icon: '✨',
    color: '#a855f7',
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
    pinIds: ['pin-img-2', 'pin-img-4'],
    createdAt: '2026-01-15',
  },
  {
    id: 'col-projects',
    name: 'Projects',
    description: 'Active design explorations, architectures, and prototypes',
    icon: '🚀',
    color: '#06b6d4',
    coverImage: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&auto=format&fit=crop&q=80',
    pinIds: ['pin-img-5', 'pin-story-3'],
    createdAt: '2026-02-01',
  },
  {
    id: 'col-fav-images',
    name: 'Favorite Images',
    description: 'Masterwork photography and celestial cartography',
    icon: '🖼️',
    color: '#f43f5e',
    coverImage: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80',
    pinIds: ['pin-img-1', 'pin-img-3', 'pin-img-6'],
    createdAt: '2026-02-12',
  },
  {
    id: 'col-articles',
    name: 'Articles & Lore',
    description: 'Curated stories, deep essays, and illuminated book folios',
    icon: '📜',
    color: '#3b82f6',
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&auto=format&fit=crop&q=80',
    pinIds: ['pin-story-2', 'pin-book-1'],
    createdAt: '2026-02-20',
  },
  {
    id: 'col-ai-creations',
    name: 'AI Creations',
    description: 'Synthesized neural prompts, cyberpunk vistas, and visions',
    icon: '🤖',
    color: '#10b981',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    pinIds: ['pin-img-4'],
    createdAt: '2026-03-01',
  },
];

const DEFAULT_STORIES = [
  {
    id: 'story-1',
    authorId: 'user-elena',
    authorName: 'Elena Rostova',
    authorUsername: 'elena_starfall',
    authorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
    mediaUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
    caption: 'Midnight alpine ridge observatory. Star trails spinning across the void.',
    linkUrl: 'https://astral.net/elena',
    createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
    expiresAt: new Date(Date.now() + 3600000 * 21).toISOString(),
    viewsCount: 342,
    isAI: false,
  },
  {
    id: 'story-2',
    authorId: 'user-kaelen',
    authorName: 'Kaelen Voss',
    authorUsername: 'kaelen_cyber',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    mediaUrl: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&auto=format&fit=crop&q=80',
    caption: 'Neon rain over Sector 4. Synthetic render generated with neural models.',
    linkUrl: '',
    createdAt: new Date(Date.now() - 3600000 * 6).toISOString(),
    expiresAt: new Date(Date.now() + 3600000 * 18).toISOString(),
    viewsCount: 512,
    isAI: true,
  },
  {
    id: 'story-3',
    authorId: 'user-julian',
    authorName: 'Julian Vance',
    authorUsername: 'julian_nocturne',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    mediaUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80',
    caption: 'Testing the new mouse-light optics engine in Dark and Light mode.',
    linkUrl: '',
    createdAt: new Date(Date.now() - 3600000 * 1).toISOString(),
    expiresAt: new Date(Date.now() + 3600000 * 23).toISOString(),
    viewsCount: 128,
    isAI: false,
  },
  {
    id: 'story-4',
    authorId: 'user-julian',
    authorName: 'Julian Vance',
    authorUsername: 'julian_nocturne',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    mediaUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
    caption: 'Midnight sanctuary illuminated by violet starfire and aurora arches.',
    linkUrl: '',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    expiresAt: new Date(Date.now() + 3600000 * 20).toISOString(),
    viewsCount: 284,
    isAI: true,
  },
];

export function PinterestProvider({ children }) {
  // Load pins
  const [pins, setPins] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PINS);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Filter out any deprecated 4K Wallpaper pin
        const filtered = parsed.filter(
          (p) => p.id !== 'pin-img-wallpaper' && !p.tags?.includes('4K Wallpaper')
        );
        // Ensure initial story pins have their corresponding images if missing
        return filtered.map((p) => {
          const init = INITIAL_PINS.find((ip) => ip.id === p.id);
          if (init && init.type === 'story' && !p.imageUrl && init.imageUrl) {
            return { ...p, imageUrl: init.imageUrl };
          }
          return p;
        });
      }
      return INITIAL_PINS;
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

  // Saved pins
  const [savedPinIds, setSavedPinIds] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SAVED);
      return saved ? JSON.parse(saved) : ['pin-img-1', 'pin-story-1', 'pin-book-1'];
    } catch {
      return ['pin-img-1', 'pin-story-1', 'pin-book-1'];
    }
  });

  // Liked pins
  const [likedPinIds, setLikedPinIds] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LIKED);
      return saved ? JSON.parse(saved) : ['pin-img-1', 'pin-story-2'];
    } catch {
      return ['pin-img-1', 'pin-story-2'];
    }
  });

  // Pinned to profile posts
  const [pinnedPinIds, setPinnedPinIds] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PINNED);
      return saved ? JSON.parse(saved) : ['pin-img-1', 'pin-story-1'];
    } catch {
      return ['pin-img-1', 'pin-story-1'];
    }
  });

  // Library Collections
  const [collections, setCollections] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COLLECTIONS);
      return saved ? JSON.parse(saved) : DEFAULT_COLLECTIONS;
    } catch {
      return DEFAULT_COLLECTIONS;
    }
  });

  // Stories
  const [stories, setStories] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.STORIES);
      return saved ? JSON.parse(saved) : DEFAULT_STORIES;
    } catch {
      return DEFAULT_STORIES;
    }
  });

  // Active Modals state
  const [activeModal, setActiveModal] = useState(null); // { type: 'image'|'story'|'book', pin }
  const [storyViewerState, setStoryViewerState] = useState(null); // { stories, initialIndex }
  const [createPinModalState, setCreatePinModalState] = useState(null); // { isOpen: boolean, initialData?: object }
  const [addToLibraryTargetPin, setAddToLibraryTargetPin] = useState(null);
  const [reportTargetPin, setReportTargetPin] = useState(null);
  const [editTargetPin, setEditTargetPin] = useState(null);

  // Search & Navigation Filters
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

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PINNED, JSON.stringify(pinnedPinIds));
    } catch (e) {
      console.warn('Failed to persist pinned pins', e);
    }
  }, [pinnedPinIds]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.COLLECTIONS, JSON.stringify(collections));
    } catch (e) {
      console.warn('Failed to persist collections', e);
    }
  }, [collections]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.STORIES, JSON.stringify(stories));
    } catch (e) {
      console.warn('Failed to persist stories', e);
    }
  }, [stories]);

  // Helpers
  const isSaved = (pinId) => savedPinIds.includes(pinId);
  const isLiked = (pinId) => likedPinIds.includes(pinId);
  const isPinned = (pinId) => pinnedPinIds.includes(pinId);

  // Toggle Like
  const toggleLike = (pinId) => {
    setLikedPinIds((prev) => {
      const currentlyLiked = prev.includes(pinId);
      const next = currentlyLiked ? prev.filter((id) => id !== pinId) : [...prev, pinId];
      setPins((prevPins) =>
        prevPins.map((p) =>
          p.id === pinId ? { ...p, likes: p.likes + (currentlyLiked ? -1 : 1) } : p
        )
      );
      return next;
    });
  };

  // Toggle Save
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

  // Toggle Pin to Profile
  const togglePinToProfile = (pinId) => {
    setPinnedPinIds((prev) => {
      if (prev.includes(pinId)) {
        return prev.filter((id) => id !== pinId);
      } else {
        return [pinId, ...prev];
      }
    });
  };

  // Comments
  const addComment = (pinId, commentText, authorName = 'Julian Vance') => {
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

  // Create Pin
  const createPin = (newPinData) => {
    const id = `pin-${Date.now()}`;
    const formattedPin = {
      ...newPinData,
      id,
      likes: 1,
      savedCount: 1,
      comments: [],
      createdAt: new Date().toISOString(),
      author: {
        id: newPinData.authorId || 'user-julian',
        name: newPinData.authorName || 'Julian Vance',
        handle: newPinData.authorHandle || '@julian_nocturne',
        avatar: newPinData.authorAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
        initials: 'JV',
        bio: 'Nocturnal explorer, archivist, and creative coder.',
      },
    };

    setPins((prev) => [formattedPin, ...prev]);
    setSavedPinIds((prev) => [...prev, id]);

    // If added to board
    if (newPinData.targetBoardId) {
      setBoards((prev) =>
        prev.map((b) =>
          b.id === newPinData.targetBoardId ? { ...b, pinIds: [id, ...b.pinIds] } : b
        )
      );
    }

    // If added to library collection
    if (newPinData.targetCollectionId) {
      addPinToCollection(newPinData.targetCollectionId, id);
    }

    return formattedPin;
  };

  // Edit Pin
  const editPin = (pinId, updates) => {
    setPins((prev) =>
      prev.map((p) => (p.id === pinId ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p))
    );
  };

  // Delete Pin
  const deletePin = (pinId) => {
    setPins((prev) => prev.filter((p) => p.id !== pinId));
    setSavedPinIds((prev) => prev.filter((id) => id !== pinId));
    setPinnedPinIds((prev) => prev.filter((id) => id !== pinId));
    setLikedPinIds((prev) => prev.filter((id) => id !== pinId));
    // Remove from collections
    setCollections((prev) =>
      prev.map((col) => ({ ...col, pinIds: col.pinIds.filter((id) => id !== pinId) }))
    );
    // Remove from boards
    setBoards((prev) =>
      prev.map((b) => ({ ...b, pinIds: b.pinIds.filter((id) => id !== pinId) }))
    );
    if (activeModal && activeModal.pin?.id === pinId) {
      setActiveModal(null);
    }
  };

  // Collections Management
  const createCollection = (nameOrObj, description = '', icon = '📁', color = '#3b82f6', coverImage = '') => {
    let nameVal = '';
    let descVal = '';
    let iconVal = '📁';
    let colorVal = '#3b82f6';
    let coverVal = '';

    if (typeof nameOrObj === 'object' && nameOrObj !== null) {
      nameVal = nameOrObj.name || 'New Collection';
      descVal = nameOrObj.description || '';
      iconVal = nameOrObj.icon || '📁';
      colorVal = nameOrObj.color || '#3b82f6';
      coverVal = nameOrObj.coverImage || '';
    } else {
      nameVal = nameOrObj || 'New Collection';
      descVal = description;
      iconVal = icon;
      colorVal = color;
      coverVal = coverImage;
    }

    const newCol = {
      id: `col-${Date.now()}`,
      name: nameVal.trim() || 'New Collection',
      description: descVal.trim() || 'Personal collection of pins',
      icon: iconVal,
      color: colorVal,
      coverImage: coverVal || '',
      pinIds: [],
      createdAt: new Date().toISOString().split('T')[0],
    };
    setCollections((prev) => [newCol, ...prev]);
    return newCol;
  };

  const renameCollection = (id, nameOrObj, description, icon, color, coverImage) => {
    let updates = {};
    if (typeof nameOrObj === 'object' && nameOrObj !== null) {
      updates = nameOrObj;
    } else {
      if (nameOrObj !== undefined) updates.name = nameOrObj;
      if (description !== undefined) updates.description = description;
      if (icon !== undefined) updates.icon = icon;
      if (color !== undefined) updates.color = color;
      if (coverImage !== undefined) updates.coverImage = coverImage;
    }

    setCollections((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              ...updates,
            }
          : c
      )
    );
  };

  const deleteCollection = (id) => {
    setCollections((prev) => prev.filter((c) => c.id !== id));
  };

  const addPinToCollection = (collectionId, pinId) => {
    setCollections((prev) =>
      prev.map((c) => {
        if (c.id === collectionId && !c.pinIds.includes(pinId)) {
          return { ...c, pinIds: [pinId, ...c.pinIds] };
        }
        return c;
      })
    );
  };

  const removePinFromCollection = (collectionId, pinId) => {
    setCollections((prev) =>
      prev.map((c) => {
        if (c.id === collectionId) {
          return { ...c, pinIds: c.pinIds.filter((id) => id !== pinId) };
        }
        return c;
      })
    );
  };

  const movePinBetweenCollections = (fromId, toId, pinId) => {
    if (!fromId || !toId || fromId === toId || !pinId) return false;
    setCollections((prev) =>
      prev.map((c) => {
        if (c.id === fromId) {
          return {
            ...c,
            pinIds: (c.pinIds || []).filter((id) => id !== pinId),
          };
        }
        if (c.id === toId) {
          const currentIds = c.pinIds || [];
          if (!currentIds.includes(pinId)) {
            return {
              ...c,
              pinIds: [pinId, ...currentIds],
            };
          }
        }
        return c;
      })
    );
    return true;
  };

  // Stories Management
  const createBoard = (name, description = '') => {
    const newBoard = {
      id: `board-${Date.now()}`,
      name: name.trim() || 'New Board',
      description: description.trim() || '',
      cover: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
      pinIds: [],
    };
    setBoards((prev) => [newBoard, ...prev]);
    return newBoard;
  };

  const createStory = (storyData) => {
    const newStory = {
      id: `story-${Date.now()}`,
      authorId: storyData.authorId || 'user-julian',
      authorName: storyData.authorName || 'Julian Vance',
      authorUsername: storyData.authorUsername || 'julian_nocturne',
      authorAvatar: storyData.authorAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      mediaUrl: storyData.mediaUrl,
      caption: storyData.caption || '',
      linkUrl: storyData.linkUrl || '',
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      viewsCount: 0,
      isAI: storyData.isAI || false,
    };
    setStories((prev) => [newStory, ...prev]);
    return newStory;
  };

  const deleteStory = (storyId) => {
    setStories((prev) => prev.filter((s) => s.id !== storyId));
  };

  const recordStoryView = (storyId) => {
    setStories((prev) =>
      prev.map((s) => (s.id === storyId ? { ...s, viewsCount: s.viewsCount + 1 } : s))
    );
  };

  // Open & Close Modals
  const openPin = (pin, preferredType) => {
    const modalType = preferredType || pin.type || 'image';
    setActiveModal({ type: modalType, pin });
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const openStoryViewer = (storyList = stories, initialIndex = 0) => {
    setStoryViewerState({ isOpen: true, stories: storyList, initialIndex });
  };

  const closeStoryViewer = () => {
    setStoryViewerState(null);
  };

  const openCreatePin = (initialData = null) => {
    setCreatePinModalState({ isOpen: true, initialData });
  };

  const closeCreatePin = () => {
    setCreatePinModalState(null);
  };

  // Filtered pins
  const getFilteredPins = () => {
    return pins
      .filter((pin) => {
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = pin.title?.toLowerCase().includes(q);
          const matchAuthor = pin.author?.name?.toLowerCase().includes(q) || pin.author?.handle?.toLowerCase().includes(q);
          const matchCategory = pin.category?.toLowerCase().includes(q);
          const matchTags = pin.tags?.some((t) => t.toLowerCase().includes(q));
          const matchDesc = (pin.description || pin.summary || pin.excerpt || '')
            .toLowerCase()
            .includes(q);
          if (!matchTitle && !matchAuthor && !matchCategory && !matchTags && !matchDesc) {
            return false;
          }
        }

        if (activeFilter === 'image') return pin.type === 'image';
        if (activeFilter === 'story') return pin.type === 'story';
        if (activeFilter === 'book') return pin.type === 'book';
        if (activeFilter === 'saved') return savedPinIds.includes(pin.id);
        if (activeFilter === 'ai') return pin.isAI || pin.tags?.some((t) => t.toLowerCase().includes('ai') || t.toLowerCase().includes('cyber'));

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'trending') return (b.likes + b.savedCount * 2) - (a.likes + a.savedCount * 2);
        if (sortBy === 'appreciated') return b.likes - a.likes;
        if (sortBy === 'newest') return (b.id || '').localeCompare(a.id || '');
        return 0;
      });
  };

  return (
    <PinterestContext.Provider
      value={{
        pins,
        boards,
        savedPinIds,
        likedPinIds,
        pinnedPinIds,
        collections,
        stories,
        activeModal,
        storyViewerState,
        addToLibraryTargetPin,
        reportTargetPin,
        editTargetPin,
        searchQuery,
        activeFilter,
        sortBy,
        setSearchQuery,
        setActiveFilter,
        setSortBy,
        isSaved,
        isLiked,
        isPinned,
        toggleLike,
        toggleSave,
        togglePinToProfile,
        addComment,
        createPin,
        editPin,
        deletePin,
        createBoard,
        createCollection,
        renameCollection,
        deleteCollection,
        addPinToCollection,
        removePinFromCollection,
        movePinBetweenCollections,
        createStory,
        deleteStory,
        recordStoryView,
        openPin,
        closeModal,
        openStoryViewer,
        closeStoryViewer,
        createPinModalState,
        openCreatePin,
        closeCreatePin,
        setAddToLibraryTargetPin,
        setReportTargetPin,
        setEditTargetPin,
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
    throw new Error('usePinterest must be used within a PinterestProvider');
  }
  return context;
}
