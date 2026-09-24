import React from 'react';
import { PlusOutlined, ThunderboltFilled } from '@ant-design/icons';
import { usePinterest } from '../context/PinterestContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export function StoryRingBar({ onOpenCreateStory }) {
  const { stories, openStoryViewer } = usePinterest();
  const { currentUser } = useAuth();

  // Find user's own stories
  const userStories = stories.filter((s) => s.authorId === currentUser?.id);
  const otherStories = stories.filter((s) => s.authorId !== currentUser?.id);

  return (
    <div className="story-ring-bar-container">
      <div className="story-ring-bar">
        {/* User's Add Story Card */}
        <div className="story-ring-item create-story-trigger" onClick={onOpenCreateStory}>
          <div className="story-avatar-wrapper add-story-wrapper">
            <img
              src={currentUser?.avatar}
              alt={currentUser?.name}
              className="story-avatar"
              referrerPolicy="no-referrer"
            />
            <div className="add-story-plus">
              <PlusOutlined style={{ fontSize: '12px' }} />
            </div>
          </div>
          <span className="story-author-label">
            {userStories.length > 0 ? 'Your Story' : 'Add Story'}
          </span>
        </div>

        {/* Stories List */}
        {stories.map((story, index) => {
          const isOwn = story.authorId === currentUser?.id;
          return (
            <div
              key={story.id}
              className={`story-ring-item ${isOwn ? 'is-own-story' : ''}`}
              onClick={() => openStoryViewer(stories, index)}
              title={`${story.authorName}'s story`}
            >
              <div className="story-avatar-wrapper ring-gradient">
                <img
                  src={story.authorAvatar}
                  alt={story.authorName}
                  className="story-avatar"
                  referrerPolicy="no-referrer"
                />
                {story.isAI && (
                  <div className="story-ai-badge" title="AI Generated Story">
                    <ThunderboltFilled style={{ fontSize: '10px' }} />
                  </div>
                )}
              </div>
              <span className="story-author-label">
                {isOwn ? 'You' : story.authorName.split(' ')[0]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
