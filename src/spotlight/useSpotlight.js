import { useContext } from 'react';
import { SpotlightContext } from './SpotlightProvider.jsx';

export function useSpotlight() {
  const context = useContext(SpotlightContext);
  if (!context) {
    throw new Error('useSpotlight must be used within a SpotlightProvider');
  }
  return context;
}
