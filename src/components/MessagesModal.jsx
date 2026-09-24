import React, { useState } from 'react';
import {
  CloseOutlined,
  SendOutlined,
  SearchOutlined,
  CheckOutlined,
} from '@ant-design/icons';
import { App } from 'antd';
import { useAuth } from '../context/AuthContext.jsx';

export function MessagesModal({ onClose }) {
  const { message } = App.useApp();
  const { currentUser } = useAuth();

  const [activeThreadId, setActiveThreadId] = useState('t1');
  const [replyText, setReplyText] = useState('');

  const [threads, setThreads] = useState([
    {
      id: 't1',
      participant: {
        name: 'Elena Rostova',
        username: 'elena_starfall',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
        status: 'Online',
      },
      lastMessage: 'The new story you posted has such vivid illumination!',
      time: '15m ago',
      messages: [
        { id: 'm1', sender: 'them', text: 'Hello Julian! Did you finish rendering the celestial folios?', time: '10:45 AM' },
        { id: 'm2', sender: 'me', text: 'Yes, just uploaded Chapter II of The Clockwork Alchemist.', time: '10:48 AM' },
        { id: 'm3', sender: 'them', text: 'The new story you posted has such vivid illumination!', time: '11:02 AM' },
      ],
    },
    {
      id: 't2',
      participant: {
        name: 'Kaelen Voss',
        username: 'kaelen_cyber',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
        status: 'Away',
      },
      lastMessage: 'Are you using the Neural Image API for the Sector 4 sketches?',
      time: '2h ago',
      messages: [
        { id: 'm20', sender: 'them', text: 'Hey Julian, love the cyberpunk palette preset you made.', time: '8:30 AM' },
        { id: 'm21', sender: 'them', text: 'Are you using the Neural Image API for the Sector 4 sketches?', time: '8:31 AM' },
      ],
    },
  ]);

  const activeThread = threads.find((t) => t.id === activeThreadId) || threads[0];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    const newMsg = {
      id: `m_${Date.now()}`,
      sender: 'me',
      text: replyText.trim(),
      time: 'Just now',
    };

    setThreads((prev) =>
      prev.map((t) =>
        t.id === activeThread.id
          ? {
              ...t,
              lastMessage: newMsg.text,
              time: 'Just now',
              messages: [...t.messages, newMsg],
            }
          : t
      )
    );

    message.success('Message sent');
    setReplyText('');
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card messages-modal" onClick={(e) => e.stopPropagation()}>
        {/* Left column: conversations list */}
        <div className="messages-sidebar">
          <div className="messages-sidebar-header">
            <h3 className="font-bold text-sm">Direct Messages</h3>
            <span className="text-xs text-slate-400">{threads.length} chats</span>
          </div>

          <div className="messages-threads-list">
            {threads.map((t) => {
              const isSelected = t.id === activeThread.id;
              return (
                <div
                  key={t.id}
                  className={`messages-thread-item ${isSelected ? 'active' : ''}`}
                  onClick={() => setActiveThreadId(t.id)}
                >
                  <div className="relative">
                    <img
                      src={t.participant.avatar}
                      alt={t.participant.name}
                      className="thread-avatar"
                      referrerPolicy="no-referrer"
                    />
                    <div className={`thread-status-dot ${t.participant.status === 'Online' ? 'online' : 'away'}`} />
                  </div>
                  <div className="thread-content">
                    <div className="thread-top-row">
                      <span className="thread-name">{t.participant.name}</span>
                      <span className="thread-time">{t.time}</span>
                    </div>
                    <div className="thread-snippet line-clamp-1">{t.lastMessage}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right column: conversation view */}
        <div className="messages-chat-pane">
          {/* Chat Header */}
          <div className="chat-pane-header">
            <div className="flex items-center gap-3">
              <img
                src={activeThread.participant.avatar}
                alt={activeThread.participant.name}
                className="chat-header-avatar"
                referrerPolicy="no-referrer"
              />
              <div>
                <div className="font-semibold text-sm">{activeThread.participant.name}</div>
                <div className="text-xs text-slate-400">@{activeThread.participant.username} • {activeThread.participant.status}</div>
              </div>
            </div>

            <button className="modal-close-btn" onClick={onClose}>
              <CloseOutlined />
            </button>
          </div>

          {/* Messages Feed */}
          <div className="chat-messages-container">
            {activeThread.messages.map((m) => {
              const isMe = m.sender === 'me';
              return (
                <div key={m.id} className={`chat-bubble-row ${isMe ? 'me' : 'them'}`}>
                  <div className={`chat-bubble ${isMe ? 'me' : 'them'}`}>
                    <p className="chat-bubble-text">{m.text}</p>
                    <span className="chat-bubble-time">{m.time}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Chat Input Bar */}
          <form onSubmit={handleSendMessage} className="chat-input-bar">
            <input
              type="text"
              placeholder={`Message ${activeThread.participant.name.split(' ')[0]}...`}
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="chat-text-input"
            />
            <button type="submit" className="chat-send-btn" disabled={!replyText.trim()}>
              <SendOutlined />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
