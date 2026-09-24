import React from 'react';
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
  const { savedPinIds, collections } = usePinterest();
  const { themeMode, toggleTheme, isDark, enableMouseSpotlight } = useTheme();
  const { currentUser, openAuthModal } = useAuth();

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
        <nav className="site-nav hidden md:flex">
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
