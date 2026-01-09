import { useGame } from '../context/useGame';
import { formatNumber } from '../utils/formatNumber';

export function GoldDisplay() {
  const { state, goldPerSecond } = useGame();

  return (
    <div className="gold-display">
      <div className="gold-amount">
        <span className="gold-value">{formatNumber(Math.floor(state.gold))}</span>
        <span className="gold-label">Gold</span>
      </div>
      <div className="gold-per-second">
        {formatNumber(goldPerSecond)}/sec
      </div>
    </div>
  );
}
