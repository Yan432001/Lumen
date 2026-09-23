import { defaultSpotlightSettings } from '../data/spotlightPresets.js';

const STORAGE_KEY = 'spotlight-settings';

export function loadSpotlightSettings() {
  if (typeof window === 'undefined') {
    return defaultSpotlightSettings;
  }

  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return defaultSpotlightSettings;
  }

  try {
    const parsed = JSON.parse(stored);
    // Merge with defaultSpotlightSettings to ensure all nested keys and canonical properties exist
    return {
      ...defaultSpotlightSettings,
      ...parsed,
      colorCycle: {
        ...defaultSpotlightSettings.colorCycle,
        ...(parsed.colorCycle || {})
      },
      glow: {
        ...defaultSpotlightSettings.glow,
        ...(parsed.glow || {})
      },
      animation: {
        ...defaultSpotlightSettings.animation,
        ...(parsed.animation || {})
      },
      follow: {
        ...defaultSpotlightSettings.follow,
        ...(parsed.follow || {})
      },
      trail: {
        ...defaultSpotlightSettings.trail,
        ...(parsed.trail || {})
      },
      clickEffect: {
        ...defaultSpotlightSettings.clickEffect,
        ...(parsed.clickEffect || {})
      },
      idle: {
        ...defaultSpotlightSettings.idle,
        ...(parsed.idle || {})
      },
      mobile: {
        ...defaultSpotlightSettings.mobile,
        ...(parsed.mobile || {})
      }
    };
  } catch (err) {
    console.error('Failed to parse spotlight settings from localStorage:', err);
    return defaultSpotlightSettings;
  }
}

export function saveSpotlightSettings(settings) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch (err) {
    console.error('Failed to save spotlight settings to localStorage:', err);
  }
}

export function resetSpotlightSettings() {
  if (typeof window === 'undefined') return defaultSpotlightSettings;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Failed to reset spotlight settings in localStorage:', err);
  }
  return defaultSpotlightSettings;
}
