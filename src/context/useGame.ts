import { useContext } from 'react';
import { GameContext } from './GameContext';
import type { GameContextValue } from './GameContext';

export function useGame(): GameContextValue {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
