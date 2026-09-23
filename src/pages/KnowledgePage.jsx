import React, { useState } from 'react';
import { contentData } from '../data/content.js';

export function KnowledgePage() {
  const { knowledge } = contentData;
  const [selectedArticle, setSelectedArticle] = useState(knowledge.articles[0]);

  return (
    <div className="page-wrapper knowledge-page">
      <section className="hero-section">
        <div className="hero-badge">{knowledge.hero.badge}</div>
        <h1 className="hero-title">{knowledge.hero.title}</h1>
        <p className="hero-subtitle">{knowledge.hero.subtitle}</p>
      </section>

      {/* Interactive Research Dossier */}
      <section className="knowledge-section">
        <div className="knowledge-layout">
          {/* Article Navigation Sidebar */}
          <div className="articles-sidebar">
            <h3 className="sidebar-heading">Compendium Entries</h3>
            <div className="articles-list">
              {knowledge.articles.map((art) => {
                const isSelected = selectedArticle.id === art.id;
                return (
                  <button
                    key={art.id}
                    type="button"
                    className={`article-nav-item ${isSelected ? 'active' : ''}`}
                    onClick={() => setSelectedArticle(art)}
                  >
                    <span className="art-cat">{art.category}</span>
                    <h4 className="art-title">{art.title}</h4>
                    <p className="art-summary-snippet">{art.summary}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Article Reading Panel */}
          <div className="article-reader-panel">
            <div className="reader-badge">{selectedArticle.category}</div>
            <h2 className="reader-title">{selectedArticle.title}</h2>
            <div className="reader-divider" />

            <div className="reader-summary-callout">
              <span className="callout-icon">💡</span>
              <p>{selectedArticle.summary}</p>
            </div>

            <div className="reader-body">
              <p>{selectedArticle.body}</p>
            </div>

            <div className="key-fact-box">
              <span className="fact-title">✦ Fundamental Constant / Empirical Finding:</span>
              <p className="fact-text">{selectedArticle.keyFact}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
