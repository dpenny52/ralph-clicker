import { useGame } from '../context/useGame';
import { formatNumber } from '../utils/formatNumber';

interface UpgradeCardProps {
  id: string;
  name: string;
  description: string;
}

export function UpgradeCard({ id, name, description }: UpgradeCardProps) {
  const { state, dispatch, getUpgradeCost } = useGame();

  const level = state.upgrades[id] ?? 0;
  const cost = getUpgradeCost(id);
  const canAfford = state.gold >= cost;

  const handleBuy = () => {
    dispatch({ type: 'BUY_UPGRADE', payload: { upgradeId: id } });
  };

  return (
    <div className="upgrade-card">
      <div className="upgrade-info">
        <h3 className="upgrade-name">{name}</h3>
        <p className="upgrade-description">{description}</p>
        <span className="upgrade-level">Level: {level}</span>
      </div>
      <button
        className="upgrade-buy-button"
        onClick={handleBuy}
        disabled={!canAfford}
      >
        Buy ({formatNumber(cost)})
      </button>
    </div>
  );
}
