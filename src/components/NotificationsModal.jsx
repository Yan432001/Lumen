import React, { useState } from 'react';
import {
  CloseOutlined,
  HeartFilled,
  FolderFilled,
  UserAddOutlined,
  ThunderboltFilled,
  CheckOutlined,
} from '@ant-design/icons';
import { App } from 'antd';

export function NotificationsModal({ onClose }) {
  const { message } = App.useApp();

  const [notifications, setNotifications] = useState([
    {
      id: 'n1',
      type: 'like',
      title: 'Elena Rostova liked your pin',
      subtitle: '"Rainlit Cobalt Alley in Old Kyoto"',
      time: '12m ago',
      unread: true,
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
    },
    {
      id: 'n2',
      type: 'library',
      title: 'Kaelen Voss saved your pin to Library',
      subtitle: 'Added to collection "Cyberpunk Inspirations"',
      time: '1h ago',
      unread: true,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    },
    {
      id: 'n3',
      type: 'ai',
      title: 'Neural Image Synthesis Finished',
      subtitle: 'Your prompt "Futuristic city with neon lights" is ready',
      time: '3h ago',
      unread: true,
      avatar: '',
    },
    {
      id: 'n4',
      type: 'follow',
      title: 'Aria Sterling started following you',
      subtitle: 'Nocturnal digital artist and calligrapher',
      time: 'Yesterday',
      unread: false,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    },
  ]);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
    message.success('All notifications marked as read');
  };

  const getIcon = (type) => {
    switch (type) {
      case 'like':
        return <HeartFilled style={{ color: '#f43f5e' }} />;
      case 'library':
        return <FolderFilled style={{ color: '#38bdf8' }} />;
      case 'ai':
        return <ThunderboltFilled style={{ color: '#00f2fe' }} />;
      case 'follow':
      default:
        return <UserAddOutlined style={{ color: '#10b981' }} />;
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card notifications-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-header-title">
            <span>Notifications</span>
            {notifications.some((n) => n.unread) && (
              <span className="unread-counter-pill">
                {notifications.filter((n) => n.unread).length} new
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button type="button" className="btn-text-action text-xs" onClick={markAllRead}>
              <CheckOutlined /> Mark all read
            </button>
            <button className="modal-close-btn" onClick={onClose}>
              <CloseOutlined />
            </button>
          </div>
        </div>

        <div className="notifications-list">
          {notifications.map((n) => (
            <div key={n.id} className={`notification-item ${n.unread ? 'unread' : ''}`}>
              <div className="notification-avatar-container">
                {n.avatar ? (
                  <img src={n.avatar} alt="User" className="notification-avatar" referrerPolicy="no-referrer" />
                ) : (
                  <div className="notification-system-icon">{getIcon(n.type)}</div>
                )}
                <div className="notification-badge-icon">{getIcon(n.type)}</div>
              </div>

              <div className="notification-content">
                <div className="notification-title">{n.title}</div>
                <div className="notification-subtitle">{n.subtitle}</div>
                <div className="notification-time">{n.time}</div>
              </div>

              {n.unread && <div className="notification-unread-dot" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
