import { useEffect, useRef } from 'react';
import { useGame } from '../context/useGame';
import { saveGame } from '../utils/storage';

export function useAutoSave() {
  const { state } = useGame();
  const stateRef = useRef(state);

  // Keep ref updated with latest state
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  useEffect(() => {
    // Auto-save every 30 seconds
    const intervalId = setInterval(() => {
      saveGame(stateRef.current);
    }, 30000);

    // Save on beforeunload (page close/refresh)
    const handleBeforeUnload = () => {
      saveGame(stateRef.current);
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup
    return () => {
      clearInterval(intervalId);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
}
