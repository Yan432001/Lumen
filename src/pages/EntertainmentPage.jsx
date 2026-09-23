import React, { useState } from 'react';
import { contentData } from '../data/content.js';
import { useSpotlight } from '../spotlight/useSpotlight.js';

export function EntertainmentPage() {
  const { entertainment } = contentData;
  const { settings, applyPreset } = useSpotlight();
  const [activeMood, setActiveMood] = useState('all');

  const moods = [
    { id: 'all', label: 'All Media', preset: 'flashlight' },
    { id: 'noir', label: 'Noir & Shadow', preset: 'lamp' },
    { id: 'cyberpunk', label: 'Neon Rain', preset: 'neon' },
    { id: 'cosmic', label: 'Cosmic Drift', preset: 'aurora' },
    { id: 'gothic', label: 'Gothic Horror', preset: 'horror' },
  ];

  const handleMoodSelect = (mood) => {
    setActiveMood(mood.id);
    if (mood.preset) {
      applyPreset(mood.preset);
    }
  };

  return (
    <div className="page-wrapper entertainment-page">
      {/* Header */}
      <section className="hero-section">
        <div className="hero-badge">{entertainment.hero.badge}</div>
        <h1 className="hero-title">{entertainment.hero.title}</h1>
        <p className="hero-subtitle">{entertainment.hero.subtitle}</p>

        {/* Mood filter with automatic preset resonance */}
        <div className="mood-bar">
          <span className="mood-hint">Harmonize Lighting:</span>
          <div className="mood-pills">
            {moods.map((m) => (
              <button
                key={m.id}
                type="button"
                className={`mood-pill ${activeMood === m.id ? 'active' : ''}`}
                onClick={() => handleMoodSelect(m)}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Cinema Noir Section */}
      <section className="entertainment-section">
        <div className="section-header">
          <span className="section-eyebrow">SCREEN ARCHIVES</span>
          <h2 className="section-title">Midnight Noir & Atmospheric Cinema</h2>
        </div>

        <div className="cinema-grid">
          {entertainment.sections[0].items.map((movie, idx) => (
            <div key={idx} className="cinema-card">
              <div className="cinema-card-header">
                <span className="cinema-year">{movie.year}</span>
                <span className="cinema-rating">★ {movie.rating}</span>
              </div>
              <h3 className="cinema-title">{movie.title}</h3>
              <div className="cinema-director">Directed by {movie.director}</div>
              <p className="cinema-mood">{movie.mood}</p>
              <div className="cinema-notes">
                <span className="notes-label">Cinematography Note:</span>
                <p>{movie.notes}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Soundscapes Section */}
      <section className="entertainment-section">
        <div className="section-header">
          <span className="section-eyebrow">AUDITORY DEPTHS</span>
          <h2 className="section-title">Nocturnal Soundscapes & Ambient Frequencies</h2>
        </div>

        <div className="audio-grid">
          {entertainment.sections[1].items.map((track, idx) => (
            <div key={idx} className="audio-card">
              <div className="audio-card-top">
                <div className="audio-disc-icon">
                  <span className="disc-needle" />
                </div>
                <div>
                  <h4 className="audio-title">{track.title}</h4>
                  <span className="audio-genre">{track.genre}</span>
                </div>
              </div>
              <p className="audio-desc">{track.desc}</p>
              <div className="audio-footer">
                <span className="audio-duration">⏱ {track.duration}</span>
                <span className="audio-tempo">Frequency: {track.tempo}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
