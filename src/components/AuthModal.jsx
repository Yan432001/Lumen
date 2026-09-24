import React, { useState } from 'react';
import {
  CloseOutlined,
  GoogleOutlined,
  GithubOutlined,
  MailOutlined,
  LockOutlined,
  UserOutlined,
  SwapOutlined,
  CheckCircleFilled,
} from '@ant-design/icons';
import { App } from 'antd';
import { useAuth } from '../context/AuthContext.jsx';

export function AuthModal({ onClose }) {
  const { message } = App.useApp();
  const {
    currentUser,
    users,
    login,
    loginWithSocial,
    switchUser,
    authModalMode,
  } = useAuth();

  const [tab, setTab] = useState(authModalMode || 'login'); // 'login' | 'register' | 'switch'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      message.error('Please fill in your email and password');
      return;
    }
    const res = login(email.trim(), password);
    if (res.success) {
      message.success(`Welcome back, ${res.user.name}!`);
      onClose();
    }
  };

  const handleSocial = (provider) => {
    const res = loginWithSocial(provider);
    if (res.success) {
      message.success(`Connected via ${provider}! Welcome, ${res.user.name}.`);
      onClose();
    }
  };

  const handleSwitch = (userId) => {
    const switched = switchUser(userId);
    if (switched) {
      message.success('Switched profile successfully');
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card auth-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-header-title">
            <span className="font-cinzel text-lg gradient-text">Lumen Account</span>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <CloseOutlined />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="auth-tab-row">
          <button
            type="button"
            className={`auth-tab-btn ${tab === 'login' ? 'active' : ''}`}
            onClick={() => setTab('login')}
          >
            Sign In
          </button>
          <button
            type="button"
            className={`auth-tab-btn ${tab === 'register' ? 'active' : ''}`}
            onClick={() => setTab('register')}
          >
            Create Account
          </button>
          <button
            type="button"
            className={`auth-tab-btn ${tab === 'switch' ? 'active' : ''}`}
            onClick={() => setTab('switch')}
          >
            <SwapOutlined /> Switch Profile
          </button>
        </div>

        <div className="auth-modal-body">
          {tab === 'switch' ? (
            /* Switch Between Known Demo Profiles */
            <div className="auth-switch-profiles-section">
              <p className="text-xs text-slate-400 mb-3">
                Select a creator persona to explore the app from their vantage point:
              </p>
              <div className="auth-profiles-list">
                {users.map((u) => {
                  const isActive = currentUser?.id === u.id;
                  return (
                    <div
                      key={u.id}
                      className={`auth-profile-card ${isActive ? 'active' : ''}`}
                      onClick={() => handleSwitch(u.id)}
                    >
                      <img src={u.avatar} alt={u.name} className="auth-profile-avatar" referrerPolicy="no-referrer" />
                      <div className="auth-profile-info">
                        <div className="auth-profile-name">
                          <span>{u.name}</span>
                          {isActive && <CheckCircleFilled style={{ color: '#e11d48', fontSize: '13px' }} />}
                        </div>
                        <div className="auth-profile-handle">@{u.username}</div>
                        <div className="auth-profile-bio line-clamp-1">{u.bio}</div>
                      </div>
                      <button
                        type="button"
                        className={`auth-switch-cta-btn ${isActive ? 'current' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSwitch(u.id);
                        }}
                      >
                        {isActive ? 'Active' : 'Switch'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Email & Social Login/Register Form */
            <div className="auth-form-container">
              {/* One-Click Social Logins */}
              <div className="social-auth-buttons">
                <button
                  type="button"
                  className="social-btn google-btn"
                  onClick={() => handleSocial('Google')}
                >
                  <GoogleOutlined style={{ fontSize: '16px', color: '#ea4335' }} />
                  <span>Continue with Google</span>
                </button>
                <div className="social-secondary-row">
                  <button
                    type="button"
                    className="social-btn secondary-social-btn"
                    onClick={() => handleSocial('GitHub')}
                  >
                    <GithubOutlined /> GitHub
                  </button>
                  <button
                    type="button"
                    className="social-btn secondary-social-btn"
                    onClick={() => handleSocial('Discord')}
                  >
                    👾 Discord
                  </button>
                </div>
              </div>

              <div className="auth-divider">
                <span>OR WITH EMAIL</span>
              </div>

              <form onSubmit={handleEmailSubmit} className="auth-email-form">
                {tab === 'register' && (
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <div className="input-with-icon">
                      <UserOutlined className="input-icon" />
                      <input
                        type="text"
                        className="form-input with-icon"
                        placeholder="e.g. Julian Vance"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <div className="input-with-icon">
                    <MailOutlined className="input-icon" />
                    <input
                      type="email"
                      className="form-input with-icon"
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Password</label>
                  <div className="input-with-icon">
                    <LockOutlined className="input-icon" />
                    <input
                      type="password"
                      className="form-input with-icon"
                      placeholder="••••••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="btn-primary w-full mt-2">
                  {tab === 'login' ? 'Sign In' : 'Create Lumen Account'}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
