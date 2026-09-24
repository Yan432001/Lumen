import React from 'react';
import {
  HomeOutlined,
  CompassOutlined,
  PlusCircleFilled,
  FireOutlined,
  FolderOutlined,
  UserOutlined,
} from '@ant-design/icons';

export function MobileNavBar({ currentTab, onTabChange, onOpenCreateAction }) {
  return (
    <nav className="mobile-nav-bar" aria-label="Mobile Navigation">
      <button
        type="button"
        className={`mobile-nav-item ${currentTab === 'home' ? 'active' : ''}`}
        onClick={() => onTabChange('home')}
      >
        <HomeOutlined className="mobile-nav-icon" />
        <span className="mobile-nav-label">Home</span>
      </button>

      <button
        type="button"
        className={`mobile-nav-item ${currentTab === 'explore' ? 'active' : ''}`}
        onClick={() => onTabChange('explore')}
      >
        <CompassOutlined className="mobile-nav-icon" />
        <span className="mobile-nav-label">Explore</span>
      </button>

      {/* Floating Action Button for Create */}
      <button
        type="button"
        className="mobile-nav-create-btn"
        onClick={onOpenCreateAction}
        title="Create New Content"
      >
        <PlusCircleFilled />
      </button>

      <button
        type="button"
        className={`mobile-nav-item ${currentTab === 'stories' ? 'active' : ''}`}
        onClick={() => onTabChange('stories')}
      >
        <FireOutlined className="mobile-nav-icon" />
        <span className="mobile-nav-label">Stories</span>
      </button>

      <button
        type="button"
        className={`mobile-nav-item ${currentTab === 'library' ? 'active' : ''}`}
        onClick={() => onTabChange('library')}
      >
        <FolderOutlined className="mobile-nav-icon" />
        <span className="mobile-nav-label">Library</span>
      </button>

      <button
        type="button"
        className={`mobile-nav-item ${currentTab === 'profile' ? 'active' : ''}`}
        onClick={() => onTabChange('profile')}
      >
        <UserOutlined className="mobile-nav-icon" />
        <span className="mobile-nav-label">Profile</span>
      </button>
    </nav>
  );
}
