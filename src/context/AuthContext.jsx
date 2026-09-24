import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const AUTH_STORAGE_KEY = 'lumen_auth_state_v1';
const USERS_STORAGE_KEY = 'lumen_users_directory_v1';

const INITIAL_USERS = [
  {
    id: 'user-julian',
    name: 'Julian Vance',
    username: 'julian_nocturne',
    email: 'julian.vance@lumen.studio',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&auto=format&fit=crop&q=80',
    bio: 'Archivist of nocturnal artifacts, cosmic cartography, and bioluminescent code. Exploring the intersection of shadow and luminous intelligence.',
    location: 'Prague & Cyberspace',
    website: 'https://lumen.studio/julian',
    followersCount: 1420,
    followingCount: 384,
    isVerified: true,
    isPrivateEmail: true,
    themePreference: 'dark',
    createdAt: '2025-08-14',
  },
  {
    id: 'user-elena',
    name: 'Elena Rostova',
    username: 'elena_starfall',
    email: 'elena.rostova@astral.net',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&auto=format&fit=crop&q=80',
    bio: 'Astrophotographer & computational storyteller. Illuminating deep sky nebulae and twilight architecture.',
    location: 'Geneva, Switzerland',
    website: 'https://astral.net/elena',
    followersCount: 2890,
    followingCount: 412,
    isVerified: true,
    isPrivateEmail: true,
    themePreference: 'dark',
    createdAt: '2025-06-20',
  },
  {
    id: 'user-kaelen',
    name: 'Kaelen Voss',
    username: 'kaelen_cyber',
    email: 'kaelen@synapse.io',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1200&auto=format&fit=crop&q=80',
    bio: 'Cyber-architect crafting speculative cities and procedural sci-fi folios. Night owl.',
    location: 'Neo-Tokyo Sector 4',
    website: 'https://kaelen.design',
    followersCount: 1950,
    followingCount: 290,
    isVerified: true,
    isPrivateEmail: true,
    themePreference: 'dark',
    createdAt: '2025-09-02',
  },
];

const INITIAL_ACTIVITIES = [
  {
    id: 'act-1',
    type: 'post_created',
    title: 'Created new Pin: "Cyberpunk Rain in Neo-Kyoto"',
    timestamp: '2 hours ago',
    icon: 'pushpin',
  },
  {
    id: 'act-2',
    type: 'ai_generated',
    title: 'Generated AI Artwork: "Bioluminescent Glasshouse"',
    timestamp: '4 hours ago',
    icon: 'bulb',
  },
  {
    id: 'act-3',
    type: 'collection_added',
    title: 'Added 3 pins to Library collection "Favorite Images"',
    timestamp: 'Yesterday',
    icon: 'folder',
  },
  {
    id: 'act-4',
    type: 'story_published',
    title: 'Published story "Starlight Cartography"',
    timestamp: '1 day ago',
    icon: 'file-text',
  },
];

export function AuthProvider({ children }) {
  // All known users
  const [users, setUsers] = useState(() => {
    try {
      const saved = localStorage.getItem(USERS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_USERS;
    } catch {
      return INITIAL_USERS;
    }
  });

  // Current logged in user (default to Julian)
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_USERS[0];
    } catch {
      return INITIAL_USERS[0];
    }
  });

  // Following user IDs
  const [followingIds, setFollowingIds] = useState(() => {
    try {
      const saved = localStorage.getItem(`lumen_following_${currentUser?.id}`);
      return saved ? JSON.parse(saved) : ['user-elena'];
    } catch {
      return ['user-elena'];
    }
  });

  // Activity log
  const [activities, setActivities] = useState(() => {
    try {
      const saved = localStorage.getItem(`lumen_activities_${currentUser?.id}`);
      return saved ? JSON.parse(saved) : INITIAL_ACTIVITIES;
    } catch {
      return INITIAL_ACTIVITIES;
    }
  });

  // Modal controls
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login'); // 'login' | 'register' | 'switch'

  // Persist current user
  useEffect(() => {
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(currentUser));
    } catch (e) {
      console.warn('Failed to save auth state', e);
    }
  }, [currentUser]);

  // Persist users directory
  useEffect(() => {
    try {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    } catch (e) {
      console.warn('Failed to save users directory', e);
    }
  }, [users]);

  // Persist activities
  useEffect(() => {
    if (currentUser?.id) {
      try {
        localStorage.setItem(`lumen_activities_${currentUser.id}`, JSON.stringify(activities));
      } catch (e) {
        console.warn('Failed to save activities', e);
      }
    }
  }, [activities, currentUser]);

  // Persist following
  useEffect(() => {
    if (currentUser?.id) {
      try {
        localStorage.setItem(`lumen_following_${currentUser.id}`, JSON.stringify(followingIds));
      } catch (e) {
        console.warn('Failed to save following list', e);
      }
    }
  }, [followingIds, currentUser]);

  // Record an activity event
  const logActivity = (type, title, icon = 'check-circle') => {
    const newAct = {
      id: `act-${Date.now()}`,
      type,
      title,
      timestamp: 'Just now',
      icon,
    };
    setActivities((prev) => [newAct, ...prev.slice(0, 19)]);
  };

  // Switch between demo users
  const switchUser = (userId) => {
    const found = users.find((u) => u.id === userId);
    if (found) {
      setCurrentUser(found);
      return true;
    }
    return false;
  };

  // Login with email or provider
  const login = (email, password) => {
    const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      setCurrentUser(existing);
      logActivity('login', `Logged in as @${existing.username}`, 'user');
      return { success: true, user: existing };
    }
    // Auto-create account if not found
    const username = email.split('@')[0].replace(/[^a-zA-Z0-9_]/g, '');
    const newUser = {
      id: `user-${Date.now()}`,
      name: username.charAt(0).toUpperCase() + username.slice(1),
      username,
      email,
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${username}`,
      coverUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&auto=format&fit=crop&q=80',
      bio: 'New explorer of nocturnal aesthetics and digital light.',
      location: 'Earth',
      website: '',
      followersCount: 0,
      followingCount: 1,
      isVerified: false,
      isPrivateEmail: true,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setUsers((prev) => [newUser, ...prev]);
    setCurrentUser(newUser);
    logActivity('register', `Created account @${newUser.username}`, 'user');
    return { success: true, user: newUser };
  };

  // Google / Social Login
  const loginWithSocial = (provider) => {
    const seed = provider.toLowerCase();
    const newUser = {
      id: `user-social-${Date.now()}`,
      name: `${provider} Traveler`,
      username: `${seed}_explorer`,
      email: `traveler@${seed}.auth`,
      avatar: provider === 'google' 
        ? 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80'
        : 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=200&auto=format&fit=crop&q=80',
      coverUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&auto=format&fit=crop&q=80',
      bio: `Authenticated via ${provider} secure OAuth. Exploring illuminated design.`,
      location: 'Global',
      website: '',
      followersCount: 12,
      followingCount: 3,
      isVerified: true,
      isPrivateEmail: true,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setUsers((prev) => [newUser, ...prev]);
    setCurrentUser(newUser);
    logActivity('login', `Signed in with ${provider}`, 'safety-certificate');
    return { success: true, user: newUser };
  };

  // Update profile
  const updateProfile = (updates) => {
    setCurrentUser((prev) => {
      const updated = { ...prev, ...updates };
      setUsers((prevUsers) => prevUsers.map((u) => (u.id === prev.id ? updated : u)));
      return updated;
    });
    logActivity('profile_update', 'Updated personal profile information', 'edit');
    return true;
  };

  // Update theme preference on current user account
  const updateUserThemePreference = (themeMode) => {
    if (currentUser?.id) {
      const updated = { ...currentUser, themePreference: themeMode };
      setCurrentUser(updated);
      setUsers((prevUsers) => prevUsers.map((u) => (u.id === currentUser.id ? updated : u)));
    }
  };

  // Toggle follow another user
  const toggleFollow = (targetUserId) => {
    if (targetUserId === currentUser.id) return;
    const isFollowing = followingIds.includes(targetUserId);
    if (isFollowing) {
      setFollowingIds((prev) => prev.filter((id) => id !== targetUserId));
      setUsers((prev) =>
        prev.map((u) => (u.id === targetUserId ? { ...u, followersCount: Math.max(0, u.followersCount - 1) } : u))
      );
      setCurrentUser((prev) => ({ ...prev, followingCount: Math.max(0, prev.followingCount - 1) }));
    } else {
      setFollowingIds((prev) => [...prev, targetUserId]);
      setUsers((prev) =>
        prev.map((u) => (u.id === targetUserId ? { ...u, followersCount: u.followersCount + 1 } : u))
      );
      setCurrentUser((prev) => ({ ...prev, followingCount: prev.followingCount + 1 }));
      const targetUser = users.find((u) => u.id === targetUserId);
      logActivity('follow', `Followed @${targetUser?.username || 'creator'}`, 'user-add');
    }
  };

  const isFollowing = (targetUserId) => followingIds.includes(targetUserId);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        users,
        activities,
        followingIds,
        isAuthModalOpen,
        authModalMode,
        openAuthModal: (mode = 'login') => {
          setAuthModalMode(mode);
          setIsAuthModalOpen(true);
        },
        closeAuthModal: () => setIsAuthModalOpen(false),
        login,
        loginWithSocial,
        switchUser,
        updateProfile,
        updateUserThemePreference,
        toggleFollow,
        isFollowing,
        logActivity,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
