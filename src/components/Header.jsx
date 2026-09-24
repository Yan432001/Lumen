import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  SettingOutlined,
  PlusOutlined,
  SunOutlined,
  MoonOutlined,
  BellOutlined,
  MessageOutlined,
  CompassOutlined,
  HomeOutlined,
  FolderOutlined,
  FireOutlined,
  UserOutlined,
  SwapOutlined,
  ThunderboltFilled,
  DownOutlined,
  SearchOutlined,
  CloseCircleFilled,
  ArrowRightOutlined,
  BookOutlined,
  FileTextOutlined,
  PictureOutlined,
} from '@ant-design/icons';
import { BookmarkOutlined } from './BookmarkIcons.jsx';
import { Dropdown, App } from 'antd';
import { useSpotlight } from '../spotlight/useSpotlight.js';
import { usePinterest } from '../context/PinterestContext.jsx';
import { useTheme } from '../context/ThemeContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export function Header({
  currentTab,
  onTabChange,
  onOpenCreatePin,
  onOpenCreateStory,
  onOpenNotifications,
  onOpenMessages,
}) {
  const { message } = App.useApp();
  const { settings, setIsSettingsOpen } = useSpotlight();
  const {
    pins,
    searchQuery,
    setSearchQuery,
    setActiveFilter,
    openPin,
    savedPinIds,
    collections,
  } = usePinterest();
  const { themeMode, toggleTheme, isDark, enableMouseSpotlight } = useTheme();
  const { currentUser, users, openAuthModal } = useAuth();

  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchContainerRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleThemeToggle = () => {
    if (isDark) {
      toggleTheme();
      message.success('Light Mode: Mouse darkness deleted (dark background preserved)');
    } else {
      toggleTheme();
      message.success('Dark Mode: Mouse darkness & spotlight enabled');
    }
  };

  const handleOpticsClick = () => {
    if (isDark) {
      setIsSettingsOpen(true);
    } else {
      message.info({
        content: 'Mouse spotlight runs in Dark Mode. Switch to Dark Mode to enable mouse darkness and customize optics.',
        onClick: () => enableMouseSpotlight(),
      });
    }
  };

  const trimmedQuery = searchQuery.trim().toLowerCase();

  // Real-time matching across everything in the website: Images, Stories, Books, AI, Tags, Authors
  const matchingPins = useMemo(() => {
    if (!trimmedQuery) return [];
    return pins.filter((p) => {
      const matchTitle = p.title?.toLowerCase().includes(trimmedQuery);
      const matchAuthor = p.author?.name?.toLowerCase().includes(trimmedQuery) || p.author?.handle?.toLowerCase().includes(trimmedQuery);
      const matchCat = p.category?.toLowerCase().includes(trimmedQuery);
      const matchTag = p.tags?.some((t) => t.toLowerCase().includes(trimmedQuery));
      const matchDesc = (p.description || p.summary || p.excerpt || p.quote || p.storyBody || p.fullStory || '')
        .toLowerCase()
        .includes(trimmedQuery);
      return matchTitle || matchAuthor || matchCat || matchTag || matchDesc;
    });
  }, [pins, trimmedQuery]);

  // Matching Authors / Users
  const matchingUsers = useMemo(() => {
    if (!trimmedQuery) return [];
    return (users || []).filter((u) => {
      const nameMatch = u.name?.toLowerCase().includes(trimmedQuery);
      const usernameMatch = u.username?.toLowerCase().includes(trimmedQuery);
      const bioMatch = u.bio?.toLowerCase().includes(trimmedQuery);
      return nameMatch || usernameMatch || bioMatch;
    });
  }, [users, trimmedQuery]);

  // Execute global search
  const handleExecuteSearch = (queryText) => {
    const text = queryText !== undefined ? queryText : searchQuery;
    setSearchQuery(text);
    setActiveFilter('all');
    setIsSearchFocused(false);

    // If currently on a profile or settings or library, route to home feed to show search results
    if (currentTab !== 'home' && currentTab !== 'explore' && currentTab !== 'stories' && currentTab !== 'images' && currentTab !== 'books') {
      onTabChange('home');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleExecuteSearch();
    } else if (e.key === 'Escape') {
      setIsSearchFocused(false);
    }
  };

  const handleSelectPin = (pin) => {
    setIsSearchFocused(false);
    openPin(pin);
  };

  const handleSelectUser = (user) => {
    setSearchQuery(user.name);
    setIsSearchFocused(false);
    onTabChange('profile');
  };

  const popularTopics = [
    { label: 'Victorian Clocks', type: 'story', query: 'Watchmaker' },
    { label: 'Antique Grimoires', type: 'book', query: 'Grimoire' },
    { label: 'Rainy Kyoto Noir', type: 'image', query: 'Kyoto' },
    { label: 'Deep Space Nebula', type: 'image', query: 'Nebula' },
    { label: 'Cyberpunk Cities', type: 'ai', query: 'Cyberpunk' },
    { label: 'Dark Folklore', type: 'story', query: 'Dark Fiction' },
  ];

  const navLinks = [
    { id: 'home', label: 'Home', icon: <HomeOutlined /> },
    { id: 'explore', label: 'Explore', icon: <CompassOutlined /> },
    { id: 'stories', label: 'Stories', icon: <FireOutlined /> },
    { id: 'saved', label: `Saved (${savedPinIds.length})`, icon: <BookmarkOutlined /> },
    { id: 'library', label: 'Library', icon: <FolderOutlined /> },
  ];

  // Create Button Dropdown
  const createMenuItems = [
    {
      key: 'create-pin',
      label: (
        <div className="flex items-center gap-2 py-1" onClick={onOpenCreatePin}>
          <PlusOutlined style={{ color: '#00f2fe' }} />
          <div>
            <div className="font-semibold text-xs">Create Post / Pin</div>
            <div className="text-[11px] text-slate-400">Artwork, AI generation, or lore</div>
          </div>
        </div>
      ),
    },
    {
      key: 'create-story',
      label: (
        <div className="flex items-center gap-2 py-1" onClick={onOpenCreateStory}>
          <ThunderboltFilled style={{ color: '#f43f5e' }} />
          <div>
            <div className="font-semibold text-xs">Share a Story</div>
            <div className="text-[11px] text-slate-400">24-hour visual moment</div>
          </div>
        </div>
      ),
    },
  ];

  // User Profile Dropdown
  const userMenuItems = [
    {
      key: 'user-header',
      disabled: true,
      label: (
        <div className="py-1 px-1">
          <div className="font-bold text-slate-100 text-sm">{currentUser?.name}</div>
          <div className="text-xs text-slate-400">@{currentUser?.username}</div>
        </div>
      ),
    },
    { type: 'divider' },
    {
      key: 'profile',
      label: (
        <div className="flex items-center gap-2 py-1" onClick={() => onTabChange('profile')}>
          <UserOutlined />
          <span>My Profile</span>
        </div>
      ),
    },
    {
      key: 'library',
      label: (
        <div className="flex items-center gap-2 py-1" onClick={() => onTabChange('library')}>
          <FolderOutlined />
          <span>Personal Library ({collections.length})</span>
        </div>
      ),
    },
    {
      key: 'saved',
      label: (
        <div className="flex items-center gap-2 py-1" onClick={() => onTabChange('saved')}>
          <BookmarkOutlined />
          <span>Saved Vault ({savedPinIds.length})</span>
        </div>
      ),
    },
    {
      key: 'settings',
      label: (
        <div className="flex items-center gap-2 py-1" onClick={() => onTabChange('settings')}>
          <SettingOutlined />
          <span>Account Settings</span>
        </div>
      ),
    },
    { type: 'divider' },
    {
      key: 'switch-theme',
      label: (
        <div className="flex items-center justify-between py-1" onClick={toggleTheme}>
          <div className="flex items-center gap-2">
            {isDark ? <SunOutlined /> : <MoonOutlined />}
            <span>Theme Mode</span>
          </div>
          <span className="text-xs text-slate-400 capitalize">{themeMode}</span>
        </div>
      ),
    },
    {
      key: 'switch-user',
      label: (
        <div className="flex items-center gap-2 py-1" onClick={() => openAuthModal('switch')}>
          <SwapOutlined />
          <span>Switch Account / Sign In</span>
        </div>
      ),
    },
  ];

  return (
    <header className="site-header">
      <div className="header-inner">
        {/* Left: Brand Logo */}
        <div className="brand" onClick={() => onTabChange('home')} role="button" tabIndex={0}>
          <div className="brand-orb" style={{ boxShadow: `0 0 16px ${settings.color || '#fff'}` }}>
            <span className="brand-dot" style={{ backgroundColor: settings.color || '#fff' }} />
          </div>
          <span className="brand-name">Lumen</span>
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav className="site-nav hidden lg:flex">
          {navLinks.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`nav-link ${currentTab === item.id ? 'active' : ''}`}
              onClick={() => onTabChange(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Global Header Search Bar (Only search box in this website) */}
        <div className="header-search-wrapper" ref={searchContainerRef}>
          <div className={`header-search-bar ${isSearchFocused ? 'is-focused' : ''}`}>
            <SearchOutlined className="header-search-icon" />
            <input
              type="text"
              className="header-search-input"
              placeholder="Search all images, dark stories, books, authors, or tags..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchFocused(true);
              }}
              onFocus={() => setIsSearchFocused(true)}
              onKeyDown={handleKeyDown}
            />
            {searchQuery && (
              <button
                type="button"
                className="header-search-clear"
                onClick={() => {
                  setSearchQuery('');
                  handleExecuteSearch('');
                }}
                aria-label="Clear search"
              >
                <CloseCircleFilled />
              </button>
            )}
          </div>

          {/* Instant Live Search Results & Suggestions Dropdown */}
          {isSearchFocused && (
            <div className="header-search-dropdown">
              <div className="search-dropdown-scroll">
                {/* When user has typed query */}
                {trimmedQuery ? (
                  <>
                    {/* Matching Pins (Images, Stories, Books, AI) */}
                    {matchingPins.length > 0 ? (
                      <div className="search-results-section">
                        <div className="search-section-header">
                          <span>Artifacts ({matchingPins.length})</span>
                          <span className="text-[11px] text-slate-500 font-normal">Stories, Books & Visuals</span>
                        </div>
                        {matchingPins.slice(0, 5).map((pin) => (
                          <div
                            key={pin.id}
                            className="search-result-item"
                            onClick={() => handleSelectPin(pin)}
                          >
                            <div className="search-result-thumb">
                              {pin.image ? (
                                <img src={pin.image} alt={pin.title} referrerPolicy="no-referrer" />
                              ) : (
                                <div className="text-slate-400">
                                  {pin.type === 'story' ? <FileTextOutlined /> : <BookOutlined />}
                                </div>
                              )}
                            </div>
                            <div className="search-result-info">
                              <div className="search-result-title">{pin.title}</div>
                              <div className="search-result-meta">
                                <span className={`search-type-badge badge-${pin.type}`}>
                                  {pin.type}
                                </span>
                                <span>by {pin.author?.name || 'Unknown'}</span>
                                {pin.category && <span>· {pin.category}</span>}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="search-no-results py-4 px-3 text-center text-slate-400 text-xs">
                        No artifacts matching &ldquo;{searchQuery}&rdquo;
                      </div>
                    )}

                    {/* Matching Authors/Creators */}
                    {matchingUsers.length > 0 && (
                      <div className="search-results-section mt-2 pt-2 border-t border-[#1e2235]">
                        <div className="search-section-header">
                          <span>Creators & Authors ({matchingUsers.length})</span>
                        </div>
                        {matchingUsers.slice(0, 3).map((user) => (
                          <div
                            key={user.id}
                            className="search-result-item"
                            onClick={() => handleSelectUser(user)}
                          >
                            <img
                              src={user.avatar}
                              alt={user.name}
                              className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                            />
                            <div className="search-result-info">
                              <div className="search-result-title">{user.name}</div>
                              <div className="search-result-meta">@{user.username}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  /* When user clicked search box before typing - show Popular Topics */
                  <div className="search-suggestions-section">
                    <div className="search-section-header">
                      <span>Trending Topics & Nocturnal Lore</span>
                    </div>
                    <div className="flex flex-wrap gap-2 p-2">
                      {popularTopics.map((topic) => (
                        <button
                          key={topic.label}
                          type="button"
                          className="search-tag-chip"
                          onClick={() => handleExecuteSearch(topic.query)}
                        >
                          <span className="text-rose-400">#</span>
                          <span>{topic.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Dropdown Footer with Action */}
              <div className="search-dropdown-footer">
                <span>Press <strong>Enter</strong> to search entire website</span>
                <button
                  type="button"
                  className="view-all-results-btn"
                  onClick={() => handleExecuteSearch()}
                >
                  <span>Search All</span>
                  <ArrowRightOutlined />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right: Actions Cluster */}
        <div className="header-actions-cluster">
          {/* Theme Toggle Button (Dark Default vs Light Mode) */}
          <button
            type="button"
            className="theme-toggle-btn"
            onClick={handleThemeToggle}
            title={isDark ? 'Switch to Light Mode (Delete mouse darkness)' : 'Switch to Dark Mode (Enable mouse spotlight)'}
            aria-label="Toggle light and dark theme"
          >
            {isDark ? (
              <SunOutlined style={{ color: '#f59e0b', fontSize: '16px' }} />
            ) : (
              <MoonOutlined style={{ color: '#0284c7', fontSize: '16px' }} />
            )}
          </button>

          {/* Notifications Button */}
          <button
            type="button"
            className="header-icon-action-btn relative"
            onClick={onOpenNotifications}
            title="Notifications"
          >
            <BellOutlined style={{ fontSize: '16px' }} />
            <span className="header-badge-dot" />
          </button>

          {/* Messages Button */}
          <button
            type="button"
            className="header-icon-action-btn"
            onClick={onOpenMessages}
            title="Direct Messages"
          >
            <MessageOutlined style={{ fontSize: '16px' }} />
          </button>

          {/* Create Button with Dropdown */}
          <Dropdown menu={{ items: createMenuItems }} placement="bottomRight" trigger={['click']}>
            <button type="button" className="create-pin-nav-btn">
              <PlusOutlined />
              <span className="hidden sm:inline">Create</span>
              <DownOutlined style={{ fontSize: '10px', marginLeft: '2px' }} />
            </button>
          </Dropdown>

          {/* Spotlight Optics Control Panel */}
          <button
            type="button"
            className="header-settings-btn hidden xl:flex"
            onClick={handleOpticsClick}
            title={isDark ? 'Configure Mouse Spotlight Optics' : 'Spotlight is available in Dark Mode'}
          >
            <SettingOutlined />
            <span>Optics</span>
          </button>

          {/* User Profile Avatar Dropdown */}
          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" trigger={['click']}>
            <div className="header-user-avatar-trigger" role="button" tabIndex={0}>
              <img
                src={currentUser?.avatar}
                alt={currentUser?.name}
                className="header-user-avatar"
                referrerPolicy="no-referrer"
              />
            </div>
          </Dropdown>
        </div>
      </div>
    </header>
  );
}
