import { useState } from 'react';
import { useGame } from '../context/useGame';
import { formatNumber } from '../utils/formatNumber';
import { checkCriticalHit } from '../utils/gameCalculations';

export function ClickButton() {
  const { dispatch, goldPerClick, state } = useGame();
  const [isClicking, setIsClicking] = useState(false);
  const [isCritical, setIsCritical] = useState(false);

  const handleClick = () => {
    const critLevel = state.upgrades['criticalClick'] ?? 0;
    const criticalHit = checkCriticalHit(critLevel);

    dispatch({ type: 'CLICK', payload: { isCritical: criticalHit } });
    setIsClicking(true);
    setTimeout(() => setIsClicking(false), 100);

    if (criticalHit) {
      setIsCritical(true);
      setTimeout(() => setIsCritical(false), 300);
    }
  };

  const buttonClasses = [
    'click-button',
    isClicking ? 'clicking' : '',
    isCritical ? 'critical' : '',
  ].filter(Boolean).join(' ');

  return (
    <button className={buttonClasses} onClick={handleClick}>
      <span className="click-label">{isCritical ? 'CRIT!' : 'Click!'}</span>
      <span className="click-value">+{formatNumber(goldPerClick)} gold</span>
    </button>
  );
}
