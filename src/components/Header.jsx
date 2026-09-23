import React from 'react';
import {
  SettingOutlined,
  PlusOutlined,
  CompassOutlined,
  PictureOutlined,
  FileTextOutlined,
  BookOutlined,
  FolderOutlined,
} from '@ant-design/icons';
import { useSpotlight } from '../spotlight/useSpotlight.js';
import { usePinterest } from '../context/PinterestContext.jsx';

export function Header({ currentTab, onTabChange, onOpenCreatePin }) {
  const { settings, applyPreset, setIsSettingsOpen } = useSpotlight();
  const { savedPinIds } = usePinterest();

  const navLinks = [
    { id: 'home', label: 'Explore' },
    { id: 'images', label: 'Visual Art' },
    { id: 'stories', label: 'Stories' },
    { id: 'books', label: 'Books' },
    { id: 'boards', label: `My Boards (${savedPinIds.length})` },
  ];

  const quickPresets = ['flashlight', 'candle', 'lamp', 'moonlight', 'neon', 'fire', 'horror'];

  return (
    <header className="site-header">
      <div className="header-inner">
        {/* Zone 1: Brand Title (Single text element wordmark with glowing orb) */}
        <div className="brand" onClick={() => onTabChange('home')} role="button" tabIndex={0}>
          <div className="brand-orb" style={{ boxShadow: `0 0 16px ${settings.color || '#fff'}` }}>
            <span className="brand-dot" style={{ backgroundColor: settings.color || '#fff' }} />
          </div>
          <span className="brand-name">Lumen</span>
        </div>

        {/* Zone 2: 4–6 clean single-line nav links */}
        <nav className="site-nav">
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

        {/* Zone 3: 1–2 Primary Actions */}
        <div className="header-actions-cluster">
          {/* Quick Presets Micro Strip */}
          <div className="header-presets-strip hidden lg:flex">
            {quickPresets.map((p) => (
              <button
                key={p}
                type="button"
                className={`preset-micro-dot ${settings.preset === p ? 'active' : ''}`}
                onClick={() => applyPreset(p)}
                title={`Light Preset: ${p}`}
              >
                {p === 'flashlight' && '🔦'}
                {p === 'candle' && '🕯️'}
                {p === 'lamp' && '🏮'}
                {p === 'moonlight' && '🌕'}
                {p === 'neon' && '⚡'}
                {p === 'fire' && '🔥'}
                {p === 'horror' && '🩸'}
              </button>
            ))}
          </div>

          <button
            type="button"
            className="create-pin-nav-btn"
            onClick={onOpenCreatePin}
            title="Create a new Pin"
          >
            <PlusOutlined />
            <span>Create</span>
          </button>

          <button
            type="button"
            className="header-settings-btn"
            onClick={() => setIsSettingsOpen(true)}
            title="Open Spotlight Optics Settings"
          >
            <SettingOutlined />
            <span>Optics</span>
          </button>
        </div>
      </div>
    </header>
  );
}
