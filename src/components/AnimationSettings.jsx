import React from 'react';
import { Select, Slider, Switch } from 'antd';
import { useSpotlight } from '../spotlight/useSpotlight.js';

const ANIMATION_OPTIONS = [
  { value: 'none', label: 'None (Steady Beam)' },
  { value: 'candle', label: 'Candle (Organic Warm Flicker)' },
  { value: 'pulse', label: 'Pulse (Periodic Radius Wave)' },
  { value: 'breathing', label: 'Breathing (Deep Calming Expansion)' },
  { value: 'flicker', label: 'Flicker (Intermittent Dark Spikes)' },
  { value: 'neon', label: 'Neon (Subtle 60Hz Electric Jitter)' },
];

const CLICK_OPTIONS = [
  { value: 'none', label: 'None' },
  { value: 'ripple', label: 'Ripple Wave' },
  { value: 'flash', label: 'Luminous Flash' },
  { value: 'burst', label: 'Spark Burst' },
  { value: 'glow-ring', label: 'Glow Halo Ring' },
  { value: 'star-burst', label: 'Stellar Ray Burst' },
];

const IDLE_OPTIONS = [
  { value: 'keep', label: 'Keep (Maintain Position)' },
  { value: 'wander', label: 'Wander (Gentle Organic Drifting)' },
  { value: 'fade', label: 'Fade (Gradually Vanish)' },
  { value: 'dim', label: 'Dim (Reduce Beam Radius & Power)' },
];

export function AnimationSettings() {
  const { settings, updateSettings } = useSpotlight();

  return (
    <div className="settings-section">
      <div className="setting-block">
        <label className="setting-label">Light Animation Type</label>
        <Select
          value={settings.animation.type}
          onChange={(type) =>
            updateSettings({
              animation: { ...settings.animation, type },
            })
          }
          options={ANIMATION_OPTIONS}
          style={{ width: '100%' }}
        />
      </div>

      {settings.animation.type !== 'none' && (
        <div className="nested-settings-card">
          <div className="setting-row">
            <label className="setting-label">Animation Speed</label>
            <div className="slider-with-val">
              <Slider
                min={0}
                max={100}
                value={settings.animation.speed}
                onChange={(val) =>
                  updateSettings({
                    animation: { ...settings.animation, speed: val },
                  })
                }
              />
              <span className="slider-val">{settings.animation.speed}</span>
            </div>
          </div>

          <div className="setting-row">
            <label className="setting-label">Animation Intensity</label>
            <div className="slider-with-val">
              <Slider
                min={0}
                max={100}
                value={settings.animation.intensity}
                onChange={(val) =>
                  updateSettings({
                    animation: { ...settings.animation, intensity: val },
                  })
                }
              />
              <span className="slider-val">{settings.animation.intensity}</span>
            </div>
          </div>
        </div>
      )}

      <div className="setting-divider" />

      {/* Click Effect */}
      <div className="setting-block">
        <label className="setting-label">Click / Tap Effect</label>
        <Select
          value={settings.clickEffect.type}
          onChange={(type) =>
            updateSettings({
              clickEffect: { ...settings.clickEffect, type },
            })
          }
          options={CLICK_OPTIONS}
          style={{ width: '100%' }}
        />
      </div>

      {settings.clickEffect.type !== 'none' && (
        <div className="nested-settings-card">
          <div className="setting-row">
            <label className="setting-label">Duration ({settings.clickEffect.duration}ms)</label>
            <div className="slider-with-val">
              <Slider
                min={100}
                max={2000}
                step={50}
                value={settings.clickEffect.duration}
                onChange={(val) =>
                  updateSettings({
                    clickEffect: { ...settings.clickEffect, duration: val },
                  })
                }
              />
              <span className="slider-val">{settings.clickEffect.duration}ms</span>
            </div>
          </div>

          <div className="setting-row">
            <label className="setting-label">Effect Intensity</label>
            <div className="slider-with-val">
              <Slider
                min={0}
                max={100}
                value={settings.clickEffect.intensity}
                onChange={(val) =>
                  updateSettings({
                    clickEffect: { ...settings.clickEffect, intensity: val },
                  })
                }
              />
              <span className="slider-val">{settings.clickEffect.intensity}</span>
            </div>
          </div>
        </div>
      )}

      <div className="setting-divider" />

      {/* Idle Behavior */}
      <div className="setting-block">
        <label className="setting-label">Inactivity Idle Behavior</label>
        <Select
          value={settings.idle.behavior}
          onChange={(behavior) =>
            updateSettings({
              idle: { ...settings.idle, behavior },
            })
          }
          options={IDLE_OPTIONS}
          style={{ width: '100%' }}
        />
      </div>

      <div className="nested-settings-card">
        <div className="setting-row">
          <label className="setting-label">Idle Timeout ({Math.round(settings.idle.timeout / 1000)}s)</label>
          <div className="slider-with-val">
            <Slider
              min={500}
              max={30000}
              step={500}
              value={settings.idle.timeout}
              onChange={(val) =>
                updateSettings({
                  idle: { ...settings.idle, timeout: val },
                })
              }
            />
            <span className="slider-val">{Math.round(settings.idle.timeout / 1000)}s</span>
          </div>
        </div>

        {settings.idle.behavior === 'wander' && (
          <>
            <div className="setting-row">
              <label className="setting-label">Wander Speed</label>
              <div className="slider-with-val">
                <Slider
                  min={0}
                  max={100}
                  value={settings.idle.wanderSpeed}
                  onChange={(val) =>
                    updateSettings({
                      idle: { ...settings.idle, wanderSpeed: val },
                    })
                  }
                />
                <span className="slider-val">{settings.idle.wanderSpeed}</span>
              </div>
            </div>

            <div className="setting-row">
              <label className="setting-label">Wander Radius</label>
              <div className="slider-with-val">
                <Slider
                  min={30}
                  max={300}
                  value={settings.idle.wanderRadius}
                  onChange={(val) =>
                    updateSettings({
                      idle: { ...settings.idle, wanderRadius: val },
                    })
                  }
                />
                <span className="slider-val">{settings.idle.wanderRadius}px</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
