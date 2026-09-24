import React, { useState } from 'react';
import { ConfigProvider, App as AntdApp, theme } from 'antd';
import { SpotlightProvider } from './spotlight/SpotlightProvider.jsx';
import { SpotlightRenderer } from './spotlight/SpotlightRenderer.jsx';
import { SpotlightSettings } from './components/SpotlightSettings.jsx';
import { PinterestProvider, usePinterest } from './context/PinterestContext.jsx';
import { ThemeProvider, useTheme } from './context/ThemeContext.jsx';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import { Header } from './components/Header.jsx';
import { Footer } from './components/Footer.jsx';
import { MobileNavBar } from './components/MobileNavBar.jsx';

// Pages
import { HomePage } from './pages/HomePage.jsx';
import { ExplorePage } from './pages/ExplorePage.jsx';
import { SavedPage } from './pages/SavedPage.jsx';
import { LibraryPage } from './pages/LibraryPage.jsx';
import { ProfilePage } from './pages/ProfilePage.jsx';
import { SettingsPage } from './pages/SettingsPage.jsx';
import { StoriesPage } from './pages/StoriesPage.jsx';
import { ImagesPage } from './pages/ImagesPage.jsx';
import { BooksPage } from './pages/BooksPage.jsx';
import { BoardsPage } from './pages/BoardsPage.jsx';

// Modals
import { ImageDetailModal } from './components/ImageDetailModal.jsx';
import { StoryReaderModal } from './components/StoryReaderModal.jsx';
import { BookReaderModal } from './components/BookReaderModal.jsx';
import { CreatePinModal } from './components/CreatePinModal.jsx';
import { CreateStoryModal } from './components/CreateStoryModal.jsx';
import { StoryViewerModal } from './components/StoryViewerModal.jsx';
import { AddToLibraryModal } from './components/AddToLibraryModal.jsx';
import { ReportPostModal } from './components/ReportPostModal.jsx';
import { AuthModal } from './components/AuthModal.jsx';
import { NotificationsModal } from './components/NotificationsModal.jsx';
import { MessagesModal } from './components/MessagesModal.jsx';

function PinterestAppContent() {
  const [currentTab, setCurrentTab] = useState('home');
  const [isCreatePinOpen, setIsCreatePinOpen] = useState(false);
  const [isCreateStoryOpen, setIsCreateStoryOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isMessagesOpen, setIsMessagesOpen] = useState(false);

  const { theme, isDark } = useTheme();
  const {
    activeModal,
    closeModal,
    storyViewerState,
    closeStoryViewer,
    createPinModalState,
    openCreatePin,
    closeCreatePin,
    addToLibraryTargetPin,
    setAddToLibraryTargetPin,
    reportTargetPin,
    setReportTargetPin,
  } = usePinterest();

  const isAnyCreatePinOpen = isCreatePinOpen || !!createPinModalState?.isOpen;
  const createPinInitialData = createPinModalState?.initialData || {};

  const handleCloseCreatePin = () => {
    setIsCreatePinOpen(false);
    closeCreatePin();
  };

  const handleTriggerCreatePin = (initialData = null) => {
    openCreatePin(initialData);
  };

  const { isAuthModalOpen, closeAuthModal } = useAuth();

  return (
    <div className="app-container">
      {/* Centralized Theme: Spotlight is conditionally rendered ONLY when theme is 'dark'. In 'light' mode it is never mounted, ensuring 0 overhead. */}
      {theme === 'dark' && <SpotlightRenderer />}

      {/* Atmospheric Top Bar Navigation */}
      <Header
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        onOpenCreatePin={() => handleTriggerCreatePin()}
        onOpenCreateStory={() => setIsCreateStoryOpen(true)}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenMessages={() => setIsMessagesOpen(true)}
      />

      {/* Main Pages */}
      <main className="main-content">
        {currentTab === 'home' && (
          <HomePage
            onNavigate={setCurrentTab}
            onOpenCreatePin={() => handleTriggerCreatePin()}
            onOpenCreateStory={() => setIsCreateStoryOpen(true)}
          />
        )}
        {currentTab === 'explore' && <ExplorePage />}
        {currentTab === 'saved' && <SavedPage />}
        {currentTab === 'library' && (
          <LibraryPage
            onNavigate={setCurrentTab}
            onOpenCreatePin={(initData) => handleTriggerCreatePin(initData)}
          />
        )}
        {currentTab === 'profile' && (
          <ProfilePage
            onOpenEditSettings={() => setCurrentTab('settings')}
            onNavigate={setCurrentTab}
            onOpenCreatePin={(initData) => handleTriggerCreatePin(initData)}
          />
        )}
        {currentTab === 'settings' && <SettingsPage />}
        {currentTab === 'stories' && (
          <StoriesPage onOpenCreatePin={() => setIsCreateStoryOpen(true)} />
        )}
        {currentTab === 'images' && (
          <ImagesPage onOpenCreatePin={() => handleTriggerCreatePin()} />
        )}
        {currentTab === 'books' && (
          <BooksPage onOpenCreatePin={() => handleTriggerCreatePin()} />
        )}
        {currentTab === 'boards' && (
          <BoardsPage onOpenCreatePin={() => handleTriggerCreatePin()} />
        )}
      </main>

      {/* Interactive Lightbox / Readers / Creator Modals */}
      {activeModal && activeModal.type === 'image' && (
        <ImageDetailModal
          pin={activeModal.pin}
          onClose={closeModal}
        />
      )}

      {activeModal && activeModal.type === 'story' && (
        <StoryReaderModal pin={activeModal.pin} onClose={closeModal} />
      )}

      {activeModal && activeModal.type === 'book' && (
        <BookReaderModal pin={activeModal.pin} onClose={closeModal} />
      )}

      {/* Create Post Modal */}
      {isAnyCreatePinOpen && (
        <CreatePinModal
          initialData={createPinInitialData}
          onClose={handleCloseCreatePin}
        />
      )}

      {/* Create Story Modal */}
      {isCreateStoryOpen && (
        <CreateStoryModal onClose={() => setIsCreateStoryOpen(false)} />
      )}

      {/* Story Fullscreen Viewer */}
      {storyViewerState && (
        <StoryViewerModal
          stories={storyViewerState.stories}
          initialIndex={storyViewerState.initialIndex || 0}
          onClose={closeStoryViewer}
        />
      )}

      {/* Add To Library Modal */}
      {addToLibraryTargetPin && (
        <AddToLibraryModal
          pin={addToLibraryTargetPin}
          onClose={() => setAddToLibraryTargetPin(null)}
        />
      )}

      {/* Report Post Modal */}
      {reportTargetPin && (
        <ReportPostModal
          pin={reportTargetPin}
          onClose={() => setReportTargetPin(null)}
        />
      )}

      {/* Auth / Profile Switch Modal */}
      {isAuthModalOpen && <AuthModal onClose={closeAuthModal} />}

      {/* Notifications Drawer */}
      {isNotificationsOpen && (
        <NotificationsModal onClose={() => setIsNotificationsOpen(false)} />
      )}

      {/* Direct Messages Drawer */}
      {isMessagesOpen && (
        <MessagesModal onClose={() => setIsMessagesOpen(false)} />
      )}

      {/* Atmospheric Footer */}
      <Footer />

      {/* Ant Design Optics Studio */}
      <SpotlightSettings />

      {/* Mobile Sticky Navigation Bar */}
      <MobileNavBar
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        onOpenCreateAction={() => setIsCreatePinOpen(true)}
      />
    </div>
  );
}

function AntdThemedApp() {
  const { isDark } = useTheme();

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: isDark
          ? {
              colorPrimary: '#e11d48',
              colorBgBase: '#07070a',
              colorBgContainer: '#0e0f17',
              colorBorder: '#1e202e',
              colorText: '#f8fafc',
              fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
              borderRadius: 12,
            }
          : {
              colorPrimary: '#e11d48',
              colorBgBase: '#ffffff',
              colorBgContainer: '#f8fafc',
              colorBorder: '#e2e8f0',
              colorText: '#0f172a',
              fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
              borderRadius: 12,
            },
      }}
    >
      <AntdApp className="w-full min-h-screen">
        <PinterestAppContent />
      </AntdApp>
    </ConfigProvider>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <SpotlightProvider>
          <PinterestProvider>
            <AntdThemedApp />
          </PinterestProvider>
        </SpotlightProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
