import React, { useState } from 'react';
import {
  BgColorsOutlined,
  UserOutlined,
  LockOutlined,
  CheckCircleFilled,
  BulbOutlined,
  SunOutlined,
  MoonOutlined,
  SlidersOutlined,
  CheckOutlined,
} from '@ant-design/icons';
import { App } from 'antd';
import { useTheme } from '../context/ThemeContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useSpotlight } from '../spotlight/useSpotlight.js';

const SPOTLIGHT_QUICK_STYLES = [
  { id: 'candle', name: 'Candle', icon: '🕯️', desc: 'Warm amber glow with organic micro-flickering' },
  { id: 'lamp', name: 'Lamp', icon: '🏮', desc: 'Comforting warm white with gentle wide edges' },
  { id: 'circle', name: 'Circle', icon: '⭕', desc: 'Geometric circular focus with crisp aperture falloff' },
  { id: 'softglow', name: 'Soft Glow', icon: '🌟', desc: 'Expansive diffused ambient radiance with soft edge' },
  { id: 'flashlight', name: 'Flashlight', icon: '🔦', desc: 'Crisp, pure white beam with sharp clarity' },
  { id: 'moonlight', name: 'Moonlight', icon: '🌕', desc: 'Ethereal pale cyan-blue celestial radiance' },
  { id: 'neon', name: 'Neon', icon: '⚡', desc: 'Vibrant cyberpunk cyan & magenta with energy trail' },
  { id: 'fire', name: 'Fire', icon: '🔥', desc: 'Blazing scarlet & gold embers with heat flicker' },
];

export function SettingsPage() {
  const { message } = App.useApp();
  const { themeMode, setExplicitTheme, isDark, enableMouseSpotlight, disableMouseSpotlight } = useTheme();
  const { currentUser, updateProfile } = useAuth();
  const { settings, updateSettings, applyPreset, setIsSettingsOpen } = useSpotlight();

  const [activeSection, setActiveSection] = useState('theme'); // 'theme' | 'profile' | 'security'

  // Profile form state
  const [name, setName] = useState(currentUser?.name || '');
  const [username, setUsername] = useState(currentUser?.username || '');
  const [bio, setBio] = useState(currentUser?.bio || '');
  const [location, setLocation] = useState(currentUser?.location || '');
  const [website, setWebsite] = useState(currentUser?.website || '');
  const [avatar, setAvatar] = useState(currentUser?.avatar || '');
  const [coverUrl, setCoverUrl] = useState(currentUser?.coverUrl || '');
  const [isPrivateEmail, setIsPrivateEmail] = useState(currentUser?.isPrivateEmail ?? true);

  // Password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile({
      name: name.trim(),
      username: username.trim().toLowerCase(),
      bio: bio.trim(),
      location: location.trim(),
      website: website.trim(),
      avatar: avatar.trim() || currentUser?.avatar,
      coverUrl: coverUrl.trim() || currentUser?.coverUrl,
      isPrivateEmail,
    });
    message.success('Account profile updated successfully');
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (!newPassword || newPassword !== confirmPassword) {
      message.error('New passwords do not match');
      return;
    }
    message.success('Security credentials updated');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="settings-page-container">
      <div className="page-header-banner">
        <h1 className="page-main-title font-cinzel">Account & System Settings</h1>
        <p className="page-subtitle text-slate-400">
          Personalize your theme, profile details, and private preferences across Lumen
        </p>
      </div>

      <div className="settings-layout-grid">
        {/* Navigation Sidebar */}
        <div className="settings-nav-sidebar">
          <button
            type="button"
            className={`settings-nav-item ${activeSection === 'theme' ? 'active' : ''}`}
            onClick={() => setActiveSection('theme')}
          >
            <BgColorsOutlined /> Theme & Visual Optics
          </button>
          <button
            type="button"
            className={`settings-nav-item ${activeSection === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveSection('profile')}
          >
            <UserOutlined /> Public Profile
          </button>
          <button
            type="button"
            className={`settings-nav-item ${activeSection === 'security' ? 'active' : ''}`}
            onClick={() => setActiveSection('security')}
          >
            <LockOutlined /> Security & Privacy
          </button>
        </div>

        {/* Settings Body */}
        <div className="settings-content-card">
          {/* THEME SETTINGS */}
          {activeSection === 'theme' && (
            <div className="theme-settings-pane">
              <h2 className="settings-section-title">Theme System</h2>
              <p className="settings-section-desc">
                Choose how you want to experience the site. Dark Mode includes the signature mouse-controlled darkness & spotlight, while Light Mode removes all mouse darkness while keeping the sleek dark background.
              </p>

              <div className="theme-selection-cards-grid">
                {/* Dark Mode Card */}
                <div
                  className={`theme-mode-card ${isDark ? 'active' : ''}`}
                  onClick={() => {
                    enableMouseSpotlight();
                    message.success('Dark Mode activated — Mouse darkness & spotlight enabled');
                  }}
                >
                  <div className="theme-card-preview dark-preview">
                    <div className="preview-nav-bar" />
                    <div className="preview-spotlight-orb" />
                    <div className="preview-cards-mock">
                      <div className="mock-card mock-dark-1" />
                      <div className="mock-card mock-dark-2" />
                    </div>
                  </div>
                  <div className="theme-card-body">
                    <div className="theme-title-row">
                      <div className="flex items-center gap-2">
                        <MoonOutlined style={{ color: '#00f2fe' }} />
                        <span className="font-bold text-sm">Dark Mode (Default)</span>
                      </div>
                      {isDark && <CheckCircleFilled style={{ color: '#e11d48' }} />}
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      Deep midnight canvas with dynamic mouse-controlled lighting effect. Dark overlay with cursor beam that illuminates content as you hover.
                    </p>
                  </div>
                </div>

                {/* Light Mode Card */}
                <div
                  className={`theme-mode-card ${!isDark ? 'active' : ''}`}
                  onClick={() => {
                    disableMouseSpotlight();
                    message.success('Light Mode activated — Mouse darkness deleted (dark background preserved)');
                  }}
                >
                  <div className="theme-card-preview light-preview">
                    <div className="preview-nav-bar light" />
                    <div className="preview-cards-mock">
                      <div className="mock-card mock-light-1" />
                      <div className="mock-card mock-light-2" />
                    </div>
                  </div>
                  <div className="theme-card-body">
                    <div className="theme-title-row">
                      <div className="flex items-center gap-2">
                        <SunOutlined style={{ color: '#f59e0b' }} />
                        <span className="font-bold text-sm">Light Mode (No Mouse Darkness)</span>
                      </div>
                      {!isDark && <CheckCircleFilled style={{ color: '#e11d48' }} />}
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      Keeps the dark website background, but deletes all mouse darkness and spotlight hover effects. All content is completely visible all the time.
                    </p>
                  </div>
                </div>
              </div>

              {/* Conditional Controls based on Active Theme */}
              {isDark ? (
                <div className="mt-8 p-5 rounded-2xl border border-slate-800 bg-[#0d0e17]">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-base font-semibold text-white flex items-center gap-2">
                        <BulbOutlined style={{ color: '#00f2fe' }} /> Mouse-Light Styles (Dark Mode)
                      </h3>
                      <p className="text-xs text-slate-400">
                        Select an illumination style to light up the canvas as you move your mouse.
                      </p>
                    </div>
                    <button
                      type="button"
                      className="px-3 py-1.5 text-xs rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-all"
                      onClick={() => setIsSettingsOpen(true)}
                    >
                      <SlidersOutlined /> Full Optics Studio
                    </button>
                  </div>

                  {/* Quick Preset Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
                    {SPOTLIGHT_QUICK_STYLES.map((style) => {
                      const isSelected = settings.preset === style.id;
                      return (
                        <button
                          key={style.id}
                          type="button"
                          className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                            isSelected
                              ? 'border-rose-500 bg-rose-950/20 text-white shadow-sm'
                              : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 text-slate-300'
                          }`}
                          onClick={() => {
                            applyPreset(style.id);
                            message.success(`Selected "${style.name}" mouse-light style`);
                          }}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xl">{style.icon}</span>
                            {isSelected && <CheckOutlined className="text-rose-500 text-xs" />}
                          </div>
                          <div>
                            <div className="text-xs font-semibold">{style.name}</div>
                            <div className="text-[10px] text-slate-400 truncate mt-0.5">{style.desc}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Sliders for quick tweaks */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5 pt-4 border-t border-slate-800/80">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-300">Beam Radius</span>
                        <span className="text-slate-400">{settings.radius}px</span>
                      </div>
                      <input
                        type="range"
                        min="150"
                        max="650"
                        value={settings.radius}
                        onChange={(e) => updateSettings({ radius: Number(e.target.value) })}
                        className="w-full accent-rose-500 cursor-pointer"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-300">Darkness Mask</span>
                        <span className="text-slate-400">{settings.darkness}%</span>
                      </div>
                      <input
                        type="range"
                        min="60"
                        max="98"
                        value={settings.darkness}
                        onChange={(e) => updateSettings({ darkness: Number(e.target.value) })}
                        className="w-full accent-rose-500 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-8 p-5 rounded-2xl border border-emerald-500/30 bg-[#0c1318] text-emerald-200">
                  <div className="flex items-start gap-3">
                    <CheckCircleFilled className="text-emerald-400 text-lg mt-0.5" />
                    <div>
                      <h3 className="text-sm font-semibold text-emerald-100">Light Mode Active (Mouse Darkness Deleted)</h3>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        The website maintains its sleek dark background, while the mouse darkness overlay and spotlight effects are completely removed. All pins, cards, and text are 100% visible across the whole page with a standard mouse cursor.
                      </p>
                      <button
                        type="button"
                        className="mt-3 px-3 py-1.5 text-xs font-medium rounded-lg bg-rose-600 hover:bg-rose-500 text-white transition-all shadow-sm"
                        onClick={() => {
                          enableMouseSpotlight();
                          message.success('Dark Mode activated — Mouse darkness & spotlight enabled');
                        }}
                      >
                        Enable Mouse Darkness & Spotlight
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="theme-info-callout mt-6">
                <BulbOutlined style={{ color: '#00f2fe', fontSize: '20px' }} />
                <div>
                  <h4 className="font-semibold text-sm">Theme Preference Persistence</h4>
                  <p className="text-xs text-slate-400">
                    Your choice between Dark Mode (with mouse lighting) and Light Mode (dark background with mouse darkness deleted) is saved to your account settings and local storage.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* PROFILE SETTINGS */}
          {activeSection === 'profile' && (
            <form onSubmit={handleSaveProfile} className="profile-settings-form">
              <h2 className="settings-section-title">Edit Public Profile</h2>
              <p className="settings-section-desc">
                Manage your public persona, avatar, and background cover across the network.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="form-label">Display Name</label>
                  <input
                    type="text"
                    className="form-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Username</label>
                  <div className="input-with-prefix">
                    <span className="input-prefix">@</span>
                    <input
                      type="text"
                      className="form-input with-prefix"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Bio</label>
                <textarea
                  rows={3}
                  className="form-textarea"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  maxLength={240}
                />
                <span className="char-counter">{bio.length}/240</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="form-label">Location</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Prague, Earth"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Website / Portfolio</label>
                  <input
                    type="url"
                    className="form-input"
                    placeholder="https://..."
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="form-label">Avatar Image URL</label>
                  <input
                    type="url"
                    className="form-input"
                    value={avatar}
                    onChange={(e) => setAvatar(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Cover Banner URL</label>
                  <input
                    type="url"
                    className="form-input"
                    value={coverUrl}
                    onChange={(e) => setCoverUrl(e.target.value)}
                  />
                </div>
              </div>

              <div className="mt-4">
                <button type="submit" className="btn-primary">
                  <SaveOutlined /> Save Profile Details
                </button>
              </div>
            </form>
          )}

          {/* SECURITY & PRIVACY SETTINGS */}
          {activeSection === 'security' && (
            <div className="security-settings-pane">
              <h2 className="settings-section-title">Security & Account Privacy</h2>
              <p className="settings-section-desc">
                Safeguard your authentication credentials and determine your data visibility.
              </p>

              <div className="privacy-toggle-card mb-6">
                <div>
                  <h4 className="font-semibold text-sm">Hide Email from Public Profile</h4>
                  <p className="text-xs text-slate-400">
                    When enabled, other visitors cannot view your email address ({currentUser?.email}).
                  </p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={isPrivateEmail}
                    onChange={(e) => {
                      setIsPrivateEmail(e.target.checked);
                      updateProfile({ isPrivateEmail: e.target.checked });
                      message.success('Privacy preference updated');
                    }}
                  />
                  <span className="toggle-slider" />
                </label>
              </div>

              <form onSubmit={handleChangePassword} className="change-password-form">
                <h3 className="font-bold text-sm mb-3">Update Password</h3>
                <div className="form-group">
                  <label className="form-label">Current Password</label>
                  <input
                    type="password"
                    className="form-input"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="••••••••••••"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">New Password</label>
                    <input
                      type="password"
                      className="form-input"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••••••"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Confirm New Password</label>
                    <input
                      type="password"
                      className="form-input"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••••••"
                    />
                  </div>
                </div>

                <button type="submit" className="btn-primary mt-2">
                  <SafetyCertificateOutlined /> Update Password
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
