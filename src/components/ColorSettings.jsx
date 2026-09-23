import React from 'react';
import { ColorPicker, Radio, Switch, Slider, Button } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { useSpotlight } from '../spotlight/useSpotlight.js';
import { normalizeColor } from '../utils/normalizeColor.js';

export function ColorSettings() {
  const { settings, updateSettings } = useSpotlight();

  const handleColorChange = (_, hex) => {
    try {
      const normalized = normalizeColor(hex);
      updateSettings({ color: normalized });
    } catch {
      // Ignore intermediate typing errors
    }
  };

  const handleModeChange = (e) => {
    const mode = e.target.value;
    if (mode === 'fixed') {
      updateSettings({
        colorMode: 'fixed',
        colorCycle: { ...settings.colorCycle, enabled: false },
      });
    } else if (mode === 'cycle') {
      updateSettings({
        colorMode: 'cycle',
        colorCycle: {
          ...settings.colorCycle,
          enabled: true,
        },
        colors: settings.colors && settings.colors.length >= 2
          ? settings.colors
          : ['#00FFFF', '#FF00FF', '#00FF66'],
      });
    } else if (mode === 'rainbow') {
      updateSettings({
        colorMode: 'rainbow',
        colorCycle: {
          ...settings.colorCycle,
          enabled: true,
        },
        colors: ['#FF0000', '#FF7700', '#FFFF00', '#00FF66', '#00FFFF', '#0066FF', '#9900FF'],
      });
    } else if (mode === 'aurora') {
      updateSettings({
        colorMode: 'aurora',
        colorCycle: {
          ...settings.colorCycle,
          enabled: true,
        },
        colors: ['#00FFA3', '#00E1FF', '#7B2CBF', '#FF007F'],
      });
    } else if (mode === 'gradient') {
      updateSettings({
        colorMode: 'gradient',
        colorCycle: {
          ...settings.colorCycle,
          enabled: true,
        },
        colors: ['#FF4500', '#FFD700'],
      });
    }
  };

  const addPaletteColor = () => {
    if (settings.colors && settings.colors.length >= 8) return;
    const defaultAdd = '#FFFFFF';
    const current = settings.colors || [];
    updateSettings({
      colors: [...current, defaultAdd],
    });
  };

  const updatePaletteColor = (index, hex) => {
    try {
      const normalized = normalizeColor(hex);
      const nextColors = [...(settings.colors || [])];
      nextColors[index] = normalized;
      updateSettings({ colors: nextColors });
    } catch {
      // Ignore
    }
  };

  const removePaletteColor = (index) => {
    const nextColors = (settings.colors || []).filter((_, i) => i !== index);
    updateSettings({ colors: nextColors });
  };

  return (
    <div className="settings-section">
      <div className="setting-row">
        <label className="setting-label">Color Mode</label>
        <Radio.Group
          value={settings.colorMode}
          onChange={handleModeChange}
          buttonStyle="solid"
          size="small"
        >
          <Radio.Button value="fixed">Fixed</Radio.Button>
          <Radio.Button value="cycle">Cycle</Radio.Button>
          <Radio.Button value="rainbow">Rainbow</Radio.Button>
          <Radio.Button value="aurora">Aurora</Radio.Button>
          <Radio.Button value="gradient">Gradient</Radio.Button>
        </Radio.Group>
      </div>

      {settings.colorMode === 'fixed' && (
        <div className="setting-row">
          <label className="setting-label">Beam Tint Color</label>
          <div className="color-picker-wrap">
            <ColorPicker
              value={settings.color || '#FFFFFF'}
              onChange={handleColorChange}
              showText
              format="hex"
            />
            <span className="mono-code">{settings.color}</span>
          </div>
        </div>
      )}

      {settings.colorMode !== 'fixed' && (
        <div className="nested-settings-card">
          <div className="setting-row">
            <label className="setting-label">Cycle Speed</label>
            <div className="slider-with-val">
              <Slider
                min={1}
                max={100}
                value={settings.colorCycle.speed}
                onChange={(val) =>
                  updateSettings({
                    colorCycle: { ...settings.colorCycle, speed: val },
                  })
                }
              />
              <span className="slider-val">{settings.colorCycle.speed}</span>
            </div>
          </div>

          <div className="setting-row">
            <label className="setting-label">Cycle Direction</label>
            <Radio.Group
              value={settings.colorCycle.direction}
              onChange={(e) =>
                updateSettings({
                  colorCycle: { ...settings.colorCycle, direction: e.target.value },
                })
              }
              size="small"
            >
              <Radio.Button value="forward">Forward</Radio.Button>
              <Radio.Button value="reverse">Reverse</Radio.Button>
            </Radio.Group>
          </div>

          <div className="palette-manager">
            <div className="palette-header">
              <span>Color Sequence ({settings.colors?.length || 0}/8)</span>
              {(!settings.colors || settings.colors.length < 8) && (
                <Button
                  size="small"
                  type="dashed"
                  icon={<PlusOutlined />}
                  onClick={addPaletteColor}
                >
                  Add Color
                </Button>
              )}
            </div>

            <div className="palette-chips">
              {(settings.colors || []).map((col, idx) => (
                <div key={idx} className="palette-chip-item">
                  <ColorPicker
                    value={col}
                    onChange={(_, hex) => updatePaletteColor(idx, hex)}
                    size="small"
                    format="hex"
                  />
                  <span className="mono-tiny">{col}</span>
                  {settings.colors.length > 2 && (
                    <Button
                      type="text"
                      danger
                      size="small"
                      icon={<DeleteOutlined />}
                      onClick={() => removePaletteColor(idx)}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
