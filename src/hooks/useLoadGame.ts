import { useEffect, useState } from 'react';
import { useGame } from '../context/useGame';
import { loadGame } from '../utils/storage';
import { calculateOfflineEarnings } from '../utils/gameCalculations';
import { formatNumber } from '../utils/formatNumber';

export function useLoadGame() {
  const { dispatch } = useGame();
  const [offlineEarnings, setOfflineEarnings] = useState<number | null>(null);

  useEffect(() => {
    const savedState = loadGame();
    if (savedState) {
      // Calculate offline earnings before loading state
      const earnings = calculateOfflineEarnings(savedState);

      // Load the saved state
      dispatch({ type: 'LOAD_SAVE', payload: { state: savedState } });

      // If there are offline earnings, add them and show notification
      if (earnings > 0) {
        dispatch({ type: 'ADD_OFFLINE_EARNINGS', payload: { amount: earnings } });
        // Use queueMicrotask to defer state update and avoid cascading renders
        queueMicrotask(() => {
          setOfflineEarnings(earnings);
        });
      }
    }
  }, [dispatch]);

  const dismissOfflineEarnings = () => {
    setOfflineEarnings(null);
  };

  return {
    offlineEarnings,
    offlineEarningsFormatted: offlineEarnings ? formatNumber(Math.floor(offlineEarnings)) : null,
    dismissOfflineEarnings,
  };
}
