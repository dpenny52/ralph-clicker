import { useEffect } from 'react';
import { useGame } from '../context/useGame';

export function useGameLoop() {
  const { dispatch } = useGame();

  useEffect(() => {
    // Dispatch TICK action every 100ms (10 times per second)
    const intervalId = setInterval(() => {
      dispatch({ type: 'TICK' });
    }, 100);

    // Cleanup on unmount
    return () => {
      clearInterval(intervalId);
    };
  }, [dispatch]);
}
