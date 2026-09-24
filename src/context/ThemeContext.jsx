import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext.jsx';

/**
 * Centralized Theme Context
 * Manages the 'dark' vs 'light' state across the application.
 * In 'dark' mode: The interactive mouse spotlight component is mounted and illuminated.
 * In 'light' mode: The spotlight component is completely unmounted (0 overhead, no event listeners, no RAF loop).
 */
const ThemeContext = createContext(null);

const THEME_STORAGE_KEY = 'lumen_theme_preference_v1';

export function ThemeProvider({ children }) {
  const { currentUser, updateUserThemePreference } = useAuth() || {};

  // Theme state: 'dark' (default) vs 'light'
  const [theme, setThemeState] = useState(() => {
    try {
      // 1. Check authenticated user account preference
      const savedAuth = localStorage.getItem('lumen_auth_state_v1');
      if (savedAuth) {
        const parsed = JSON.parse(savedAuth);
        if (parsed?.themePreference === 'light' || parsed?.themePreference === 'dark') {
          return parsed.themePreference;
        }
      }
      // 2. Check stored local storage for guests
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      return saved === 'light' ? 'light' : 'dark';
    } catch {
      return 'dark';
    }
  });

  // Synchronize state if user profile changes
  useEffect(() => {
    if (currentUser?.themePreference) {
      if (currentUser.themePreference !== theme) {
        setThemeState(currentUser.themePreference);
      }
    }
  }, [currentUser?.id, currentUser?.themePreference]);

  // Synchronize DOM attributes and purge spotlight CSS variables when in 'light' mode
  useEffect(() => {
    const root = document.documentElement;

    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch (e) {
      console.warn('Failed to save theme preference', e);
    }

    root.setAttribute('data-theme', theme);

    if (theme === 'light') {
      root.classList.add('light-mode');
      root.classList.remove('dark-mode');
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');

      // Purge spotlight CSS variables so NO cursor effects, shadows or darkness overlays exist
      root.style.removeProperty('--spotlight-x');
      root.style.removeProperty('--spotlight-y');
      root.style.removeProperty('--spotlight-radius');
      root.style.removeProperty('--spotlight-color');
      root.style.removeProperty('--spotlight-opacity');
      root.style.removeProperty('--spotlight-darkness');
      root.style.removeProperty('--spotlight-softness');
      root.style.setProperty('--spotlight-darkness', '0%');
      root.style.setProperty('--spotlight-opacity', '0%');
    } else {
      root.classList.add('dark-mode');
      root.classList.remove('light-mode');
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
      root.style.removeProperty('--spotlight-darkness');
      root.style.removeProperty('--spotlight-opacity');
    }
  }, [theme]);

  // Set theme explicitly ('dark' | 'light')
  const setTheme = useCallback(
    (newTheme) => {
      if (newTheme === 'dark' || newTheme === 'light') {
        setThemeState(newTheme);
        try {
          localStorage.setItem(THEME_STORAGE_KEY, newTheme);
        } catch {}
        if (updateUserThemePreference) {
          updateUserThemePreference(newTheme);
        }
      }
    },
    [updateUserThemePreference]
  );

  // Toggle theme between 'dark' and 'light'
  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setTheme]);

  // Explicit helper actions
  const enableMouseSpotlight = useCallback(() => {
    setTheme('dark');
  }, [setTheme]);

  const disableMouseSpotlight = useCallback(() => {
    setTheme('light');
  }, [setTheme]);

  const isDark = theme === 'dark';
  const isLight = theme === 'light';

  return (
    <ThemeContext.Provider
      value={{
        theme,
        themeMode: theme, // Alias for backward compatibility
        setTheme,
        setExplicitTheme: setTheme, // Alias for backward compatibility
        isDark,
        isLight,
        toggleTheme,
        enableMouseSpotlight,
        disableMouseSpotlight,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Hook to access centralized theme state and actions
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
