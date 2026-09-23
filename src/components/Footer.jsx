import React from 'react';
import { siteData } from '../data/siteData.js';
import { useSpotlight } from '../spotlight/useSpotlight.js';

export function Footer() {
  const { settings, resetSettings, setIsSettingsOpen } = useSpotlight();

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-quote-box">
          <p className="footer-quote">"{siteData.footer.quote}"</p>
        </div>

        <div className="footer-bottom">
          <div className="footer-status">
            <span className="status-indicator-dot" style={{ backgroundColor: settings.color || '#fff' }} />
            <span>Active Beam: <strong className="capitalize">{settings.preset}</strong> ({settings.radius}px • {settings.shape})</span>
          </div>

          <div className="footer-links">
            <button type="button" className="footer-link-btn" onClick={() => setIsSettingsOpen(true)}>
              Optics Studio
            </button>
            <span className="footer-sep">•</span>
            <button type="button" className="footer-link-btn" onClick={resetSettings}>
              Reset to Flashlight
            </button>
          </div>

          <p className="footer-copy">{siteData.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
