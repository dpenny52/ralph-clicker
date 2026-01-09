import { UPGRADES } from '../data/upgrades';
import { UpgradeCard } from './UpgradeCard';

export function UpgradePanel() {
  return (
    <div className="upgrade-panel">
      <h2 className="upgrade-panel-title">Upgrades</h2>
      <div className="upgrade-list">
        {UPGRADES.map((upgrade) => (
          <UpgradeCard
            key={upgrade.id}
            id={upgrade.id}
            name={upgrade.name}
            description={upgrade.description}
          />
        ))}
      </div>
    </div>
  );
}
