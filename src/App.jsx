import React, { useState } from 'react';
import { ConfigProvider, App as AntdApp, theme } from 'antd';
import { SpotlightProvider } from './spotlight/SpotlightProvider.jsx';
import { SpotlightRenderer } from './spotlight/SpotlightRenderer.jsx';
import { SpotlightSettings } from './components/SpotlightSettings.jsx';
import { PinterestProvider, usePinterest } from './context/PinterestContext.jsx';
import { Header } from './components/Header.jsx';
import { Footer } from './components/Footer.jsx';
import { HomePage } from './pages/HomePage.jsx';
import { ImagesPage } from './pages/ImagesPage.jsx';
import { StoriesPage } from './pages/StoriesPage.jsx';
import { BooksPage } from './pages/BooksPage.jsx';
import { BoardsPage } from './pages/BoardsPage.jsx';
import { ImageDetailModal } from './components/ImageDetailModal.jsx';
import { StoryReaderModal } from './components/StoryReaderModal.jsx';
import { BookReaderModal } from './components/BookReaderModal.jsx';
import { CreatePinModal } from './components/CreatePinModal.jsx';

function PinterestAppContent() {
  const [currentTab, setCurrentTab] = useState('home');
  const [isCreatePinOpen, setIsCreatePinOpen] = useState(false);
  const { activeModal, closeModal } = usePinterest();

  return (
    <div className="app-container">
      {/* 60 FPS Mouse Spotlight Canvas Overlay */}
      <SpotlightRenderer />

      {/* Atmospheric Top Bar Navigation */}
      <Header
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        onOpenCreatePin={() => setIsCreatePinOpen(true)}
      />

      {/* Main Pinterest Pages */}
      <main className="main-content">
        {currentTab === 'home' && (
          <HomePage
            onNavigate={setCurrentTab}
            onOpenCreatePin={() => setIsCreatePinOpen(true)}
          />
        )}
        {currentTab === 'images' && (
          <ImagesPage onOpenCreatePin={() => setIsCreatePinOpen(true)} />
        )}
        {currentTab === 'stories' && (
          <StoriesPage onOpenCreatePin={() => setIsCreatePinOpen(true)} />
        )}
        {currentTab === 'books' && (
          <BooksPage onOpenCreatePin={() => setIsCreatePinOpen(true)} />
        )}
        {currentTab === 'boards' && (
          <BoardsPage onOpenCreatePin={() => setIsCreatePinOpen(true)} />
        )}
      </main>

      {/* Interactive Lightbox / Readers / Creator Modals */}
      {activeModal && activeModal.type === 'image' && (
        <ImageDetailModal pin={activeModal.pin} onClose={closeModal} />
      )}

      {activeModal && activeModal.type === 'story' && (
        <StoryReaderModal pin={activeModal.pin} onClose={closeModal} />
      )}

      {activeModal && activeModal.type === 'book' && (
        <BookReaderModal pin={activeModal.pin} onClose={closeModal} />
      )}

      {isCreatePinOpen && (
        <CreatePinModal onClose={() => setIsCreatePinOpen(false)} />
      )}

      {/* Atmospheric Footer */}
      <Footer />

      {/* Ant Design Optics Studio */}
      <SpotlightSettings />
    </div>
  );
}

export default function App() {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#e11d48',
          colorBgBase: '#07070a',
          colorBgContainer: '#0e0f17',
          colorBorder: '#1e202e',
          fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
          borderRadius: 12,
        },
      }}
    >
      <AntdApp className="w-full min-h-screen">
        <SpotlightProvider>
          <PinterestProvider>
            <PinterestAppContent />
          </PinterestProvider>
        </SpotlightProvider>
      </AntdApp>
    </ConfigProvider>
  );
}
