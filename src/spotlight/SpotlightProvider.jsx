import React, { createContext, useState, useEffect, useCallback } from 'react';
import { defaultSpotlightSettings, spotlightPresets } from '../data/spotlightPresets.js';
import { loadSpotlightSettings, saveSpotlightSettings, resetSpotlightSettings as clearStorage } from '../utils/spotlightStorage.js';

export const SpotlightContext = createContext(null);

export function SpotlightProvider({ children }) {
  const [settings, setSettings] = useState(() => loadSpotlightSettings());
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Sync to localStorage whenever settings change
  useEffect(() => {
    saveSpotlightSettings(settings);
  }, [settings]);

  // Check system prefers-reduced-motion
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = (e) => {
      if (e.matches) {
        setSettings((prev) => ({
          ...prev,
          reducedMotion: true
        }));
      }
    };

    if (mediaQuery.matches && !settings.reducedMotion) {
      setSettings((prev) => ({
        ...prev,
        reducedMotion: true
      }));
    }

    mediaQuery.addEventListener?.('change', handleMotionChange);
    return () => mediaQuery.removeEventListener?.('change', handleMotionChange);
  }, []);

  const updateSettings = useCallback((updates) => {
    setSettings((prev) => {
      const nextValues = typeof updates === 'function' ? updates(prev) : updates;
      // If the update does not explicitly define a new preset, mark it as custom
      const newPreset = nextValues.preset !== undefined ? nextValues.preset : 'custom';

      const merged = {
        ...prev,
        ...nextValues,
        preset: newPreset,
        colorCycle: {
          ...prev.colorCycle,
          ...(nextValues.colorCycle || {})
        },
        glow: {
          ...prev.glow,
          ...(nextValues.glow || {})
        },
        animation: {
          ...prev.animation,
          ...(nextValues.animation || {})
        },
        follow: {
          ...prev.follow,
          ...(nextValues.follow || {})
        },
        trail: {
          ...prev.trail,
          ...(nextValues.trail || {})
        },
        clickEffect: {
          ...prev.clickEffect,
          ...(nextValues.clickEffect || {})
        },
        idle: {
          ...prev.idle,
          ...(nextValues.idle || {})
        },
        mobile: {
          ...prev.mobile,
          ...(nextValues.mobile || {})
        }
      };

      return merged;
    });
  }, []);

  const applyPreset = useCallback((presetName) => {
    const preset = spotlightPresets[presetName];
    if (preset) {
      const newSettings = { ...preset, preset: presetName };
      setSettings(newSettings);
      saveSpotlightSettings(newSettings);
    }
  }, []);

  const resetSettings = useCallback(() => {
    const defaults = clearStorage();
    setSettings(defaults);
  }, []);

  return (
    <SpotlightContext.Provider
      value={{
        settings,
        updateSettings,
        applyPreset,
        resetSettings,
        isSettingsOpen,
        setIsSettingsOpen
      }}
    >
      {children}
    </SpotlightContext.Provider>
  );
}
