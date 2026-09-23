import React, { useState } from 'react';
import { Drawer, Tabs, Slider, Switch, Radio, Select, Button, Tooltip, Popconfirm } from 'antd';
import {
  SettingOutlined,
  ReloadOutlined,
  CloseOutlined,
  BulbOutlined,
  BgColorsOutlined,
  ThunderboltOutlined,
  SlidersOutlined,
  MobileOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import { useSpotlight } from '../spotlight/useSpotlight.js';
import { PresetSelector } from './PresetSelector.jsx';
import { ColorSettings } from './ColorSettings.jsx';
import { AnimationSettings } from './AnimationSettings.jsx';
import { LightPreview } from './LightPreview.jsx';

const SHAPE_OPTIONS = [
  { value: 'circle', label: 'Circle' },
  { value: 'ellipse', label: 'Ellipse' },
  { value: 'square', label: 'Square' },
  { value: 'rounded-square', label: 'Rounded Square' },
  { value: 'star', label: 'Star' },
  { value: 'hexagon', label: 'Hexagon' },
];

export function SpotlightSettings() {
  const { settings, updateSettings, resetSettings, isSettingsOpen, setIsSettingsOpen } = useSpotlight();
  const [activeTab, setActiveTab] = useState('presets');

  const tabItems = [
    {
      key: 'presets',
      label: (
        <span>
          <BulbOutlined /> Presets
        </span>
      ),
      children: (
        <div className="tab-pane-content">
          <PresetSelector />
        </div>
      ),
    },
    {
      key: 'beam',
      label: (
        <span>
          <SlidersOutlined /> Beam & Optics
        </span>
      ),
      children: (
        <div className="tab-pane-content">
          {/* Shape selection */}
          <div className="setting-block">
            <label className="setting-label">Spotlight Aperture Shape</label>
            <Radio.Group
              value={settings.shape}
              onChange={(e) => updateSettings({ shape: e.target.value })}
              className="shape-radio-group"
              size="small"
            >
              {SHAPE_OPTIONS.map((s) => (
                <Radio.Button key={s.value} value={s.value}>
                  {s.label}
                </Radio.Button>
              ))}
            </Radio.Group>
          </div>

          <div className="setting-divider" />

          {/* Radius */}
          <div className="setting-row">
            <label className="setting-label">
              Radius (50–800px)
              <span className="setting-hint">Diameter of the revealed cone</span>
            </label>
            <div className="slider-with-val">
              <Slider
                min={50}
                max={800}
                step={5}
                value={settings.radius}
                onChange={(val) => updateSettings({ radius: val })}
              />
              <span className="slider-val">{settings.radius}px</span>
            </div>
          </div>

          {/* Softness */}
          <div className="setting-row">
            <label className="setting-label">
              Edge Softness (0–100)
              <span className="setting-hint">0 = Razor penumbra, 100 = Feathery transition</span>
            </label>
            <div className="slider-with-val">
              <Slider
                min={0}
                max={100}
                value={settings.softness}
                onChange={(val) => updateSettings({ softness: val })}
              />
              <span className="slider-val">{settings.softness}%</span>
            </div>
          </div>

          {/* Darkness */}
          <div className="setting-row">
            <label className="setting-label">
              Background Darkness (0–100)
              <span className="setting-hint">Depth of shadow outside the beam</span>
            </label>
            <div className="slider-with-val">
              <Slider
                min={0}
                max={100}
                value={settings.darkness}
                onChange={(val) => updateSettings({ darkness: val })}
              />
              <span className="slider-val">{settings.darkness}%</span>
            </div>
          </div>

          {/* Intensity */}
          <div className="setting-row">
            <label className="setting-label">
              Luminous Intensity (0–100)
              <span className="setting-hint">Photometric strength of revealed colors</span>
            </label>
            <div className="slider-with-val">
              <Slider
                min={0}
                max={100}
                value={settings.intensity}
                onChange={(val) => updateSettings({ intensity: val })}
              />
              <span className="slider-val">{settings.intensity}%</span>
            </div>
          </div>

          {/* Opacity */}
          <div className="setting-row">
            <label className="setting-label">
              Spotlight Opacity (0–100)
              <span className="setting-hint">Clearing density of the spotlight aperture</span>
            </label>
            <div className="slider-with-val">
              <Slider
                min={0}
                max={100}
                value={settings.opacity}
                onChange={(val) => updateSettings({ opacity: val })}
              />
              <span className="slider-val">{settings.opacity}%</span>
            </div>
          </div>

          {/* Ambient Light */}
          <div className="setting-row">
            <label className="setting-label">
              Ambient Light (0–20)
              <span className="setting-hint">Faint ambient visibility without leaving dark mode</span>
            </label>
            <div className="slider-with-val">
              <Slider
                min={0}
                max={20}
                value={settings.ambientLight}
                onChange={(val) => updateSettings({ ambientLight: val })}
              />
              <span className="slider-val">{settings.ambientLight}</span>
            </div>
          </div>

          <div className="setting-divider" />

          {/* Glow Halo */}
          <div className="setting-toggle-header">
            <div>
              <span className="toggle-title">Aura & Outer Glow</span>
              <span className="setting-hint">Diffused chromatic halo surrounding the light source</span>
            </div>
            <Switch
              checked={settings.glow.enabled}
              onChange={(checked) =>
                updateSettings({
                  glow: { ...settings.glow, enabled: checked },
                })
              }
            />
          </div>

          {settings.glow.enabled && (
            <div className="nested-settings-card">
              <div className="setting-row">
                <label className="setting-label">Glow Intensity</label>
                <div className="slider-with-val">
                  <Slider
                    min={0}
                    max={100}
                    value={settings.glow.intensity}
                    onChange={(val) =>
                      updateSettings({
                        glow: { ...settings.glow, intensity: val },
                      })
                    }
                  />
                  <span className="slider-val">{settings.glow.intensity}</span>
                </div>
              </div>

              <div className="setting-row">
                <label className="setting-label">Glow Radius ({settings.glow.radius}px)</label>
                <div className="slider-with-val">
                  <Slider
                    min={0}
                    max={200}
                    value={settings.glow.radius}
                    onChange={(val) =>
                      updateSettings({
                        glow: { ...settings.glow, radius: val },
                      })
                    }
                  />
                  <span className="slider-val">{settings.glow.radius}px</span>
                </div>
              </div>
            </div>
          )}
        </div>
      ),
    },
    {
      key: 'color',
      label: (
        <span>
          <BgColorsOutlined /> Color
        </span>
      ),
      children: (
        <div className="tab-pane-content">
          <ColorSettings />
        </div>
      ),
    },
    {
      key: 'motion',
      label: (
        <span>
          <ThunderboltOutlined /> Motion & Trail
        </span>
      ),
      children: (
        <div className="tab-pane-content">
          {/* Follow speed */}
          <div className="setting-row">
            <label className="setting-label">
              Mouse Follow Speed (0–100)
              <span className="setting-hint">Responsiveness of beam following cursor</span>
            </label>
            <div className="slider-with-val">
              <Slider
                min={0}
                max={100}
                value={settings.follow.speed}
                onChange={(val) =>
                  updateSettings({
                    follow: { ...settings.follow, speed: val },
                  })
                }
              />
              <span className="slider-val">{settings.follow.speed}</span>
            </div>
          </div>

          <div className="setting-toggle-header">
            <div>
              <span className="toggle-title">Inertial Smoothing</span>
              <span className="setting-hint">Organic deceleration when mouse halts</span>
            </div>
            <Switch
              checked={settings.follow.smoothing}
              onChange={(checked) =>
                updateSettings({
                  follow: { ...settings.follow, smoothing: checked },
                })
              }
            />
          </div>

          <div className="setting-divider" />

          {/* Trail */}
          <div className="setting-toggle-header">
            <div>
              <span className="toggle-title">Light Trail Afterglow</span>
              <span className="setting-hint">Ghost apertures lingering along motion vectors</span>
            </div>
            <Switch
              checked={settings.trail.enabled}
              onChange={(checked) =>
                updateSettings({
                  trail: { ...settings.trail, enabled: checked },
                })
              }
            />
          </div>

          {settings.trail.enabled && (
            <div className="nested-settings-card">
              <div className="setting-row">
                <label className="setting-label">Trail Length ({settings.trail.length} steps)</label>
                <div className="slider-with-val">
                  <Slider
                    min={1}
                    max={20}
                    value={settings.trail.length}
                    onChange={(val) =>
                      updateSettings({
                        trail: { ...settings.trail, length: val },
                      })
                    }
                  />
                  <span className="slider-val">{settings.trail.length}</span>
                </div>
              </div>

              <div className="setting-row">
                <label className="setting-label">Trail Opacity</label>
                <div className="slider-with-val">
                  <Slider
                    min={0}
                    max={100}
                    value={settings.trail.opacity}
                    onChange={(val) =>
                      updateSettings({
                        trail: { ...settings.trail, opacity: val },
                      })
                    }
                  />
                  <span className="slider-val">{settings.trail.opacity}%</span>
                </div>
              </div>

              <div className="setting-row">
                <label className="setting-label">Trail Blur ({settings.trail.blur}px)</label>
                <div className="slider-with-val">
                  <Slider
                    min={0}
                    max={50}
                    value={settings.trail.blur}
                    onChange={(val) =>
                      updateSettings({
                        trail: { ...settings.trail, blur: val },
                      })
                    }
                  />
                  <span className="slider-val">{settings.trail.blur}px</span>
                </div>
              </div>
            </div>
          )}

          <div className="setting-divider" />

          {/* Animation & Click & Idle */}
          <AnimationSettings />
        </div>
      ),
    },
    {
      key: 'device',
      label: (
        <span>
          <MobileOutlined /> Mobile & Access
        </span>
      ),
      children: (
        <div className="tab-pane-content">
          <div className="setting-block">
            <label className="setting-label">Mobile Touch Mode</label>
            <Radio.Group
              value={settings.mobile.behavior}
              onChange={(e) =>
                updateSettings({
                  mobile: { ...settings.mobile, behavior: e.target.value },
                })
              }
              size="small"
            >
              <Radio.Button value="touch">Touch Following</Radio.Button>
              <Radio.Button value="fixed">Fixed Screen Center</Radio.Button>
              <Radio.Button value="disabled">Disabled on Mobile</Radio.Button>
            </Radio.Group>
          </div>

          <div className="setting-row" style={{ marginTop: 14 }}>
            <label className="setting-label">Mobile Radius ({settings.mobile.radius}px)</label>
            <div className="slider-with-val">
              <Slider
                min={50}
                max={500}
                value={settings.mobile.radius}
                onChange={(val) =>
                  updateSettings({
                    mobile: { ...settings.mobile, radius: val },
                  })
                }
              />
              <span className="slider-val">{settings.mobile.radius}px</span>
            </div>
          </div>

          <div className="setting-divider" />

          <div className="setting-toggle-header">
            <div>
              <span className="toggle-title">Reduced Motion Mode</span>
              <span className="setting-hint">Suppress rapid flickers, trails, and continuous smoothing</span>
            </div>
            <Switch
              checked={settings.reducedMotion}
              onChange={(checked) => updateSettings({ reducedMotion: checked })}
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      {/* Floating Settings Launcher Button */}
      <button
        type="button"
        className="settings-trigger-btn"
        onClick={() => setIsSettingsOpen(true)}
        aria-label="Open Spotlight Settings"
      >
        <span className="trigger-pulse" />
        <SettingOutlined className="trigger-icon" />
        <span className="trigger-text">Light Controls</span>
      </button>

      {/* Settings Drawer */}
      <Drawer
        title={
          <div className="drawer-header-custom">
            <div className="header-title-box">
              <BulbOutlined className="header-icon" />
              <div>
                <h3 className="header-title">Spotlight Optics Studio</h3>
                <p className="header-sub">Live mouse-light customization • Zero database required</p>
              </div>
            </div>

            <div className="header-actions">
              <Popconfirm
                title="Reset to Default?"
                description="Restore canonical flashlight configuration and clear browser storage?"
                onConfirm={resetSettings}
                okText="Reset"
                cancelText="Cancel"
                placement="bottomRight"
              >
                <Button size="small" icon={<ReloadOutlined />} danger>
                  Reset Defaults
                </Button>
              </Popconfirm>
            </div>
          </div>
        }
        placement="right"
        size={480}
        onClose={() => setIsSettingsOpen(false)}
        open={isSettingsOpen}
        className="spotlight-settings-drawer"
        styles={{
          body: { padding: '12px 18px', backgroundColor: '#0d0d12', color: '#e2e8f0' },
          header: { backgroundColor: '#09090d', borderBottom: '1px solid #1e2029', padding: '16px 20px' },
        }}
      >
        {/* Live Mini Preview Banner */}
        <LightPreview />

        {/* Tabbed Configuration */}
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={tabItems}
          className="dark-tabs"
        />
      </Drawer>
    </>
  );
}
