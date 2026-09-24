import React, { useState } from 'react';
import {
  PushpinFilled,
  PictureOutlined,
  BookOutlined,
  FolderOutlined,
  HistoryOutlined,
  EditOutlined,
  ShareAltOutlined,
  EnvironmentOutlined,
  LinkOutlined,
  CalendarOutlined,
  CheckCircleFilled,
  UserAddOutlined,
  UserDeleteOutlined,
  MessageOutlined,
  ThunderboltFilled,
  PlusOutlined,
  EyeOutlined,
  ReadOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';
import { App } from 'antd';
import { useAuth } from '../context/AuthContext.jsx';
import { usePinterest } from '../context/PinterestContext.jsx';
import { PinCard } from '../components/PinCard.jsx';
import { PinArtwork } from '../components/PinArtwork.jsx';
import { EmptyCollectionState } from '../components/EmptyCollectionState.jsx';

export function ProfilePage({ profileUserId, onOpenEditSettings, onOpenCreatePin, onNavigate }) {
  const { message } = App.useApp();
  const { currentUser, users, followingIds, toggleFollow, isFollowing, activities } = useAuth();
  const { pins, pinnedPinIds, collections, stories, openStoryViewer, openPin } = usePinterest();

  const [activeTab, setActiveTab] = useState('posts'); // 'posts' | 'pinned' | 'stories' | 'library' | 'activity'
  const [activeCollectionId, setActiveCollectionId] = useState(null);

  // Resolve user: either viewing specific profile or currentUser
  const targetUser = profileUserId
    ? users.find((u) => u.id === profileUserId) || currentUser
    : currentUser;

  const isSelf = targetUser.id === currentUser?.id;
  const isTargetFollowed = isFollowing(targetUser.id);

  // User's own posts
  const userPosts = pins.filter(
    (p) =>
      p.author?.handle === `@${targetUser.username}` ||
      p.author?.name === targetUser.name ||
      p.author?.id === targetUser.id ||
      p.authorId === targetUser.id
  );

  // User's pinned posts
  const userPinnedPosts = pins.filter((p) => pinnedPinIds.includes(p.id));

  // User's active stories
  const userStories = stories.filter(
    (s) => s.authorId === targetUser.id || s.authorUsername === targetUser.username
  );

  const handleShareProfile = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      message.success(`Profile link copied for @${targetUser.username}!`);
    } else {
      message.info(`Profile URL: @${targetUser.username}`);
    }
  };

  return (
    <div className="profile-page-container">
      {/* Cover Banner */}
      <div className="profile-cover-banner">
        <img
          src={targetUser.coverUrl}
          alt="Cover"
          className="profile-cover-image"
          referrerPolicy="no-referrer"
        />
        <div className="profile-cover-overlay" />
      </div>

      {/* Profile Header Card */}
      <div className="profile-header-card">
        <div className="profile-header-main">
          {/* Avatar & Online Badge */}
          <div className="profile-avatar-wrapper">
            <img
              src={targetUser.avatar}
              alt={targetUser.name}
              className="profile-avatar"
              referrerPolicy="no-referrer"
            />
            <div className="profile-online-badge" title="Active creator" />
          </div>

          {/* User Information */}
          <div className="profile-info-block">
            <div className="profile-name-row">
              <h1 className="profile-display-name font-cinzel">{targetUser.name}</h1>
              {targetUser.isVerified && (
                <CheckCircleFilled style={{ color: '#e11d48', fontSize: '18px' }} title="Verified Creator" />
              )}
            </div>
            <div className="profile-username">@{targetUser.username}</div>

            <p className="profile-bio-text">{targetUser.bio}</p>

            {/* Meta badges: location, website, joined */}
            <div className="profile-meta-tags">
              {targetUser.location && (
                <span className="profile-meta-tag">
                  <EnvironmentOutlined /> {targetUser.location}
                </span>
              )}
              {targetUser.website && (
                <a
                  href={targetUser.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="profile-meta-tag link"
                >
                  <LinkOutlined /> {targetUser.website.replace(/^https?:\/\//, '')}
                </a>
              )}
              <span className="profile-meta-tag">
                <CalendarOutlined /> Joined {targetUser.createdAt || '2025'}
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="profile-actions-column">
            {isSelf ? (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="btn-primary"
                  onClick={onOpenEditSettings}
                >
                  <EditOutlined /> Edit Profile
                </button>
                <button
                  type="button"
                  className="btn-icon-secondary"
                  onClick={handleShareProfile}
                  title="Share profile"
                >
                  <ShareAltOutlined />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className={`btn-follow ${isTargetFollowed ? 'following' : ''}`}
                  onClick={() => toggleFollow(targetUser.id)}
                >
                  {isTargetFollowed ? (
                    <>
                      <UserDeleteOutlined /> Following
                    </>
                  ) : (
                    <>
                      <UserAddOutlined /> Follow
                    </>
                  )}
                </button>
                <button
                  type="button"
                  className="btn-icon-secondary"
                  onClick={() => message.info(`Opened message thread with ${targetUser.name}`)}
                  title="Message"
                >
                  <MessageOutlined />
                </button>
                <button
                  type="button"
                  className="btn-icon-secondary"
                  onClick={handleShareProfile}
                  title="Share profile"
                >
                  <ShareAltOutlined />
                </button>
              </div>
            )}

            {/* Social Stats Counters */}
            <div className="profile-stats-row">
              <div className="stat-pill">
                <span className="stat-number">{targetUser.followersCount || 0}</span>
                <span className="stat-label">Followers</span>
              </div>
              <div className="stat-pill">
                <span className="stat-number">{targetUser.followingCount || 0}</span>
                <span className="stat-label">Following</span>
              </div>
              <div className="stat-pill">
                <span className="stat-number">{userPosts.length}</span>
                <span className="stat-label">Posts</span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Tabs Navigation */}
        <div className="profile-tabs-bar">
          <button
            type="button"
            className={`profile-tab ${activeTab === 'posts' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('posts');
              setActiveCollectionId(null);
            }}
          >
            <PictureOutlined /> Posts ({userPosts.length})
          </button>
          <button
            type="button"
            className={`profile-tab ${activeTab === 'pinned' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('pinned');
              setActiveCollectionId(null);
            }}
          >
            <PushpinFilled /> Pinned ({userPinnedPosts.length})
          </button>
          <button
            type="button"
            className={`profile-tab ${activeTab === 'stories' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('stories');
              setActiveCollectionId(null);
            }}
          >
            <ThunderboltFilled /> Stories ({userStories.length})
          </button>
          <button
            type="button"
            className={`profile-tab ${activeTab === 'library' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('library');
              setActiveCollectionId(null);
            }}
          >
            <FolderOutlined /> Collections ({collections.length})
          </button>
          {isSelf && (
            <button
              type="button"
              className={`profile-tab ${activeTab === 'activity' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('activity');
                setActiveCollectionId(null);
              }}
            >
              <HistoryOutlined /> Activity ({activities.length})
            </button>
          )}
        </div>
      </div>

      {/* Tab Contents - All rendered in responsive Pinterest Waterfall Grid like the Home Page */}
      <div className="profile-tab-content">
        {/* TAB 1: POSTS */}
        {activeTab === 'posts' && (
          <div>
            {userPosts.length > 0 ? (
              <div className="pinterest-waterfall-grid">
                {userPosts.map((pin) => (
                  <div key={pin.id} className="waterfall-item">
                    <PinCard pin={pin} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state-card">
                <PictureOutlined style={{ fontSize: '40px', color: '#64748b', marginBottom: '12px' }} />
                <h3 className="font-bold text-base">No posts published yet</h3>
                <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                  Share your artwork, atmospheric stories, or generate neural illustrations to illuminate your profile.
                </p>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: PINNED */}
        {activeTab === 'pinned' && (
          <div>
            <div className="mb-4 text-xs text-slate-400 flex items-center justify-between">
              <span>📌 Pinned highlights chosen by the creator. You can pin or unpin any post anytime from its menu.</span>
              <span className="text-slate-500 font-mono text-[11px]">{userPinnedPosts.length} pinned pins</span>
            </div>
            {userPinnedPosts.length > 0 ? (
              <div className="pinterest-waterfall-grid">
                {userPinnedPosts.map((pin) => (
                  <div key={pin.id} className="waterfall-item">
                    <PinCard pin={pin} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state-card">
                <PushpinFilled style={{ fontSize: '40px', color: '#64748b', marginBottom: '12px' }} />
                <h3 className="font-bold text-base">No pinned posts</h3>
                <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                  Pin your favorite creations to showcase them prominently at the top of your public profile.
                </p>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: STORIES */}
        {activeTab === 'stories' && (
          <div>
            <div className="mb-4 text-xs text-slate-400 flex items-center justify-between">
              <span>⚡ Active 24-hour stories published by {targetUser.name}. Click any card to launch the fullscreen story viewer.</span>
              <span className="text-slate-500 font-mono text-[11px]">{userStories.length} active stories</span>
            </div>
            {userStories.length > 0 ? (
              <div className="pinterest-waterfall-grid">
                {userStories.map((s, idx) => (
                  <div key={s.id} className="waterfall-item">
                    <div
                      className="pin-card pin-card-story cursor-pointer group"
                      onClick={() => openStoryViewer(userStories, idx)}
                      role="article"
                      aria-label={`Story: ${s.caption}`}
                    >
                      <div className="pin-visual-wrapper relative overflow-hidden">
                        <img
                          src={s.mediaUrl}
                          alt={s.caption || 'Story'}
                          className="pin-image w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          style={{ maxHeight: '380px', minHeight: '260px' }}
                          referrerPolicy="no-referrer"
                        />

                        <div
                          className="pin-pinned-badge"
                          style={{ background: '#e11d48', color: '#fff' }}
                          title="Active 24h Story"
                        >
                          <ThunderboltFilled /> 24h Story
                        </div>

                        {s.isAI && (
                          <div className="pin-ai-indicator" title="AI Synthetic Visual">
                            <ThunderboltFilled /> AI
                          </div>
                        )}

                        {/* Hover Overlay */}
                        <div className="pin-hover-overlay">
                          <div className="pin-top-controls">
                            <span className="pin-type-pill">
                              <ThunderboltFilled />
                              <span>Story</span>
                            </span>
                            <button
                              type="button"
                              className="pin-save-btn is-saved"
                              onClick={(e) => {
                                e.stopPropagation();
                                openStoryViewer(userStories, idx);
                              }}
                            >
                              <EyeOutlined />
                              <span>Watch</span>
                            </button>
                          </div>

                          <div className="pin-bottom-controls">
                            <button
                              type="button"
                              className="pin-read-cta-btn"
                              onClick={(e) => {
                                e.stopPropagation();
                                openStoryViewer(userStories, idx);
                              }}
                            >
                              <ReadOutlined />
                              <span>Watch Story</span>
                            </button>
                            <div className="pin-quick-actions">
                              <span className="text-[11px] font-semibold text-white/90 bg-black/50 px-2.5 py-1 rounded-full backdrop-blur-sm">
                                👁️ {s.viewsCount || 0}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Story Card Footer */}
                      <div className="pin-info-footer">
                        <h3 className="pin-title line-clamp-2" title={s.caption}>
                          {s.caption || 'Untitled Story'}
                        </h3>
                        <div className="pin-author-row mt-2">
                          <div className="author-id-cluster">
                            <img
                              src={s.authorAvatar || targetUser.avatar}
                              alt={s.authorName}
                              className="author-avatar-img"
                              referrerPolicy="no-referrer"
                            />
                            <div className="author-text-meta">
                              <span className="author-name-text">{s.authorName}</span>
                              <span className="author-handle-text">@{s.authorUsername}</span>
                            </div>
                          </div>
                          <div className="pin-metrics-group ml-auto">
                            <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-800/40">
                              Active Now
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state-card">
                <ThunderboltFilled style={{ fontSize: '40px', color: '#64748b', marginBottom: '12px' }} />
                <h3 className="font-bold text-base">No active 24-hour stories</h3>
                <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                  Stories expire after 24 hours. Tap &ldquo;Add Story&rdquo; in the story ring to post behind-the-scenes glimpses or AI moments.
                </p>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: COLLECTIONS */}
        {activeTab === 'library' && (
          <div>
            {activeCollectionId ? (
              // When a collection is selected, render its items in waterfall grid with back button
              <div>
                {(() => {
                  const activeCol = collections.find((c) => c.id === activeCollectionId);
                  const colPins = activeCol
                    ? pins.filter((p) => activeCol.pinIds?.includes(p.id))
                    : [];
                  return (
                    <div>
                      <div className="mb-4 flex items-center justify-between pb-3 border-b border-slate-800">
                        <button
                          type="button"
                          className="btn-icon-secondary flex items-center gap-2 text-xs px-3 py-1.5"
                          onClick={() => setActiveCollectionId(null)}
                        >
                          <ArrowLeftOutlined /> Back to Collections
                        </button>
                        <div className="flex items-center gap-2">
                          <span className="text-base">{activeCol?.icon}</span>
                          <span className="text-sm font-bold text-white">{activeCol?.name}</span>
                          <span className="text-xs text-slate-400 font-mono">({colPins.length} pins)</span>
                        </div>
                      </div>

                      {colPins.length > 0 ? (
                        <div className="pinterest-waterfall-grid">
                          {colPins.map((pin) => (
                            <div key={pin.id} className="waterfall-item">
                              <PinCard pin={pin} />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <EmptyCollectionState
                          collection={activeCol}
                          onAddFirstPost={(initialData) => {
                            if (onOpenCreatePin) {
                              onOpenCreatePin({ collectionId: activeCol.id, ...initialData });
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
                  );
                })()}
              </div>
            ) : (
              <div>
                <div className="mb-4 text-xs text-slate-400 flex items-center justify-between">
                  <span>📁 Curated Library Vaults. Click any collection card to inspect its artifacts.</span>
                  <span className="text-slate-500 font-mono text-[11px]">{collections.length} collections</span>
                </div>
                <div className="pinterest-waterfall-grid">
                  {collections.map((col) => {
                    const samplePins = pins.filter((p) => col.pinIds?.includes(p.id));
                    return (
                      <div key={col.id} className="waterfall-item">
                        <div
                          className="pin-card pin-card-collection cursor-pointer group"
                          onClick={() => setActiveCollectionId(col.id)}
                          role="article"
                          aria-label={`Collection: ${col.name}`}
                        >
                          <div className="pin-visual-wrapper relative overflow-hidden">
                            {col.coverImage ? (
                              <div className="relative w-full h-[180px] overflow-hidden">
                                <img
                                  src={col.coverImage}
                                  alt={col.name}
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                  referrerPolicy="no-referrer"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f18] via-transparent to-transparent opacity-80 pointer-events-none" />
                              </div>
                            ) : (
                              <div className="board-cover-mosaic">
                                {samplePins.length > 0 ? (
                                  samplePins.slice(0, 3).map((p, i) => (
                                    <div key={p.id || i} className="mosaic-thumb">
                                      <PinArtwork pin={p} height="100%" />
                                    </div>
                                  ))
                                ) : (
                                  <div className="mosaic-empty">
                                    <span>{col.icon || '📁'} Empty vault</span>
                                  </div>
                                )}
                              </div>
                            )}

                            <div
                              className="pin-pinned-badge"
                              style={{
                                background: col.color || '#3b82f6',
                                color: '#ffffff',
                              }}
                              title={`Collection: ${col.name}`}
                            >
                              <FolderOutlined /> {col.pinIds?.length || 0}
                            </div>

                            <div className="pin-hover-overlay">
                              <div className="pin-top-controls">
                                <span className="pin-type-pill">
                                  <FolderOutlined />
                                  <span>Collection</span>
                                </span>
                                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-900/80 text-slate-200 border border-slate-700">
                                  {col.pinIds?.length || 0} Pins
                                </span>
                              </div>

                              <div className="pin-bottom-controls">
                                <button
                                  type="button"
                                  className="pin-read-cta-btn"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveCollectionId(col.id);
                                  }}
                                >
                                  <ReadOutlined />
                                  <span>Explore Vault</span>
                                </button>
                              </div>
                            </div>
                          </div>

                          <div className="pin-info-footer">
                            <div className="flex items-center gap-2 mb-1">
                              <span
                                className="w-6 h-6 rounded-md flex items-center justify-center text-xs"
                                style={{
                                  backgroundColor: `${col.color || '#3b82f6'}26`,
                                  border: `1px solid ${col.color || '#3b82f6'}40`,
                                }}
                              >
                                {col.icon || '📁'}
                              </span>
                              <h3 className="pin-title mb-0 line-clamp-1" title={col.name}>
                                {col.name}
                              </h3>
                            </div>
                            <p className="text-xs text-slate-400 line-clamp-2 mt-1 mb-2">
                              {col.description || 'Curated personal library collection.'}
                            </p>

                            <div className="pin-author-row mt-2 pt-2 border-t border-slate-800/60">
                              <div className="author-id-cluster">
                                <img
                                  src={targetUser.avatar}
                                  alt={targetUser.name}
                                  className="author-avatar-img"
                                  referrerPolicy="no-referrer"
                                />
                                <div className="author-text-meta">
                                  <span className="author-name-text">{targetUser.name}</span>
                                  <span className="author-handle-text">@{targetUser.username}</span>
                                </div>
                              </div>
                              <div className="pin-metrics-group ml-auto">
                                <span className="text-[11px] font-semibold text-slate-400 font-mono">
                                  {col.pinIds?.length || 0} items
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 5: ACTIVITY */}
        {activeTab === 'activity' && (
          <div>
            <div className="mb-4 text-xs text-slate-400 flex items-center justify-between">
              <span>📜 Timeline of creative actions, saves, pins, and AI generations. Click any card to inspect the artifact.</span>
              <span className="text-slate-500 font-mono text-[11px]">{activities.length} events</span>
            </div>
            {activities.length > 0 ? (
              <div className="pinterest-waterfall-grid">
                {activities.map((act) => {
                  const relatedPin =
                    pins.find(
                      (p) =>
                        act.title.toLowerCase().includes(p.title.toLowerCase().slice(0, 12)) ||
                        (act.type === 'post_created' && p.id === 'pin-img-5') ||
                        (act.type === 'ai_generated' && p.isAI)
                    ) || pins[0];

                  const activityConfig = {
                    post_created: {
                      icon: '🎨',
                      label: 'Post Created',
                      gradient: 'linear-gradient(135deg, #4c0519 0%, #1e1b4b 100%)',
                    },
                    ai_generated: {
                      icon: '⚡',
                      label: 'AI Generated',
                      gradient: 'linear-gradient(135deg, #064e3b 0%, #0f172a 100%)',
                    },
                    collection_added: {
                      icon: '📁',
                      label: 'Added to Vault',
                      gradient: 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)',
                    },
                    collection_created: {
                      icon: '✨',
                      label: 'Vault Created',
                      gradient: 'linear-gradient(135deg, #3b0764 0%, #020617 100%)',
                    },
                    story_published: {
                      icon: '📖',
                      label: 'Story Published',
                      gradient: 'linear-gradient(135deg, #1c1917 0%, #451a03 100%)',
                    },
                    save: {
                      icon: '🔖',
                      label: 'Saved Artifact',
                      gradient: 'linear-gradient(135deg, #090d16 0%, #1e1b4b 100%)',
                    },
                    pin: {
                      icon: '📌',
                      label: 'Pinned to Profile',
                      gradient: 'linear-gradient(135deg, #4c0519 0%, #020617 100%)',
                    },
                    like: {
                      icon: '💖',
                      label: 'Liked Creation',
                      gradient: 'linear-gradient(135deg, #4c0519 0%, #3b0764 100%)',
                    },
                  };

                  const config = activityConfig[act.type] || {
                    icon: '✦',
                    label: 'Event Logged',
                    gradient: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                  };

                  return (
                    <div key={act.id} className="waterfall-item">
                      <div
                        className="pin-card pin-card-activity group cursor-pointer"
                        onClick={() => {
                          if (relatedPin) openPin(relatedPin);
                        }}
                        role="article"
                        aria-label={`Activity: ${act.title}`}
                      >
                        <div className="pin-visual-wrapper relative overflow-hidden">
                          <div
                            className="pin-activity-banner"
                            style={{ background: config.gradient }}
                          >
                            <span className="pin-activity-icon">{config.icon}</span>
                          </div>

                          <div className="pin-pinned-badge" title={config.label}>
                            <span>{config.icon}</span> {config.label}
                          </div>

                          {/* Hover Overlay */}
                          <div className="pin-hover-overlay">
                            <div className="pin-top-controls">
                              <span className="pin-type-pill">
                                <span>{config.icon}</span>
                                <span>{config.label}</span>
                              </span>
                              <span className="text-[11px] text-slate-300 font-mono">
                                {act.timestamp}
                              </span>
                            </div>

                            <div className="pin-bottom-controls">
                              <button
                                type="button"
                                className="pin-read-cta-btn"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (relatedPin) openPin(relatedPin);
                                }}
                              >
                                <EyeOutlined />
                                <span>View Artifact</span>
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Details Footer */}
                        <div className="pin-info-footer">
                          <h3 className="pin-title line-clamp-2" title={act.title}>
                            {act.title}
                          </h3>
                          <div className="pin-author-row mt-2 pt-2 border-t border-slate-800/60">
                            <div className="author-id-cluster">
                              <img
                                src={targetUser.avatar}
                                alt={targetUser.name}
                                className="author-avatar-img"
                                referrerPolicy="no-referrer"
                              />
                              <div className="author-text-meta">
                                <span className="author-name-text">{targetUser.name}</span>
                                <span className="author-handle-text">{act.timestamp}</span>
                              </div>
                            </div>
                            <div className="pin-metrics-group ml-auto">
                              <span className="text-[10px] text-slate-400 bg-slate-800/60 px-2 py-0.5 rounded-full">
                                {config.label}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="empty-state-card">
                <HistoryOutlined style={{ fontSize: '40px', color: '#64748b', marginBottom: '12px' }} />
                <h3 className="font-bold text-base">No activity logged</h3>
                <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                  Interactions, uploads, bookmarks, and generative creations will be recorded here.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
