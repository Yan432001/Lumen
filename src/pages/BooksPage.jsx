import React from 'react';
import { BookOutlined, PlusOutlined, ReadOutlined } from '@ant-design/icons';
import { usePinterest } from '../context/PinterestContext.jsx';
import { PinCard } from '../components/PinCard.jsx';

export function BooksPage({ onOpenCreatePin }) {
  const { pins, searchQuery, openPin } = usePinterest();

  const bookPins = pins
    .filter((p) => p.type === 'book')
    .filter((p) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q) ||
        p.tags?.some((t) => t.toLowerCase().includes(q)) ||
        p.summary?.toLowerCase().includes(q)
      );
    });

  const featuredBook = bookPins[0];

  return (
    <div className="books-sanctuary-page">
      <header className="page-editorial-header">
        <div className="header-badge">
          <BookOutlined />
          <span>ILLUMINATED CODICES & ARCHIVES</span>
        </div>
        <h1 className="page-title">The Nocturnal Library</h1>
        <p className="page-desc">
          Step into our vault of antique folios, occult botanical grimoires, 19th-century optical
          treatises, and nocturnal verse. Each book features a full multi-chapter reader with
          bookmarks.
        </p>

        <div className="page-action-row">
          <span className="count-indicator">{bookPins.length} Bound Manuscripts</span>
          <button
            type="button"
            className="header-create-btn"
            onClick={onOpenCreatePin}
          >
            <PlusOutlined />
            <span>Bind New Book</span>
          </button>
        </div>
      </header>

      {/* Featured Rare Grimoire Banner */}
      {featuredBook && (
        <section className="featured-book-banner" onClick={() => openPin(featuredBook)}>
          <div className="book-banner-badge">RARE MANUSCRIPT · {featuredBook.year}</div>
          <div className="book-banner-content">
            <div className="book-banner-meta">
              <span className="banner-kicker">{featuredBook.category}</span>
              <h2 className="banner-title">{featuredBook.title}</h2>
              <p className="banner-summary">{featuredBook.summary}</p>
              <span className="banner-author">By {featuredBook.author?.name} · {featuredBook.pagesCount}</span>
            </div>

            <button
              type="button"
              className="banner-read-cta"
              onClick={(e) => {
                e.stopPropagation();
                openPin(featuredBook);
              }}
            >
              <ReadOutlined />
              <span>Open Grimoire & Read</span>
            </button>
          </div>
        </section>
      )}

      {/* Books Masonry Grid */}
      <div className="pinterest-waterfall-grid">
        {bookPins.map((pin) => (
          <div key={pin.id} className="waterfall-item">
            <PinCard pin={pin} />
          </div>
        ))}
      </div>
    </div>
  );
}
