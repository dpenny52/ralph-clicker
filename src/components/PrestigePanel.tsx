import { useGame } from '../context/useGame';
import { PRESTIGE_UPGRADES } from '../data/prestigeUpgrades';

export function PrestigePanel() {
  const { state, dispatch, potentialPrestigePoints } = useGame();

  const canPrestige = state.totalGoldEarned >= 1_000_000;

  const handlePrestige = () => {
    dispatch({ type: 'PRESTIGE' });
  };

  const handleBuyPrestigeUpgrade = (upgradeId: string) => {
    dispatch({ type: 'BUY_PRESTIGE_UPGRADE', payload: { upgradeId } });
  };

  return (
    <div className="prestige-panel">
      <h2 className="prestige-panel-title">Prestige</h2>

      <div className="prestige-info">
        <div className="prestige-points">
          <span className="prestige-points-value">{state.prestigePoints}</span>
          <span className="prestige-points-label">Prestige Points</span>
        </div>

        <div className="prestige-action">
          <p className="prestige-potential">
            Prestige for: <strong>{potentialPrestigePoints}</strong> points
          </p>
          <button
            className="prestige-button"
            onClick={handlePrestige}
            disabled={!canPrestige}
          >
            {canPrestige ? 'Prestige Now' : 'Need 1M Total Gold'}
          </button>
        </div>
      </div>

      <div className="prestige-upgrades">
        <h3>Prestige Upgrades</h3>
        <div className="prestige-upgrade-list">
          {PRESTIGE_UPGRADES.map((upgrade) => {
            const purchased = state.prestigeUpgrades[upgrade.id] ?? false;
            const canAfford = state.prestigePoints >= upgrade.cost;

            return (
              <div
                key={upgrade.id}
                className={`prestige-upgrade-card ${purchased ? 'purchased' : ''}`}
              >
                <div className="prestige-upgrade-info">
                  <h4 className="prestige-upgrade-name">{upgrade.name}</h4>
                  <p className="prestige-upgrade-description">{upgrade.description}</p>
                </div>
                <button
                  className="prestige-upgrade-buy-button"
                  onClick={() => handleBuyPrestigeUpgrade(upgrade.id)}
                  disabled={purchased || !canAfford}
                >
                  {purchased ? 'Owned' : `${upgrade.cost} PP`}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
