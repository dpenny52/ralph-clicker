import { useState } from 'react';
import { useGame } from '../context/useGame';
import { formatNumber } from '../utils/formatNumber';

export function ClickButton() {
  const { dispatch, goldPerClick } = useGame();
  const [isClicking, setIsClicking] = useState(false);

  const handleClick = () => {
    dispatch({ type: 'CLICK' });
    setIsClicking(true);
    setTimeout(() => setIsClicking(false), 100);
  };

  return (
    <button
      className={`click-button ${isClicking ? 'clicking' : ''}`}
      onClick={handleClick}
    >
      <span className="click-label">Click!</span>
      <span className="click-value">+{formatNumber(goldPerClick)} gold</span>
    </button>
  );
}
