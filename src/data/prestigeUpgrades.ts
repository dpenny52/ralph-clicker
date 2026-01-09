import type { PrestigeUpgrade } from '../types/game.types';

// Omit runtime properties (purchased) from prestige upgrade data definitions
type PrestigeUpgradeData = Omit<PrestigeUpgrade, 'purchased'>;

export const PRESTIGE_UPGRADES: PrestigeUpgradeData[] = [
  {
    id: 'startingGold',
    name: 'Starting Gold',
    description: 'Start with 100 gold after prestige',
    cost: 1,
  },
  {
    id: 'clickBonus',
    name: 'Click Bonus',
    description: '+50% gold per click',
    cost: 2,
  },
  {
    id: 'autoBonus',
    name: 'Auto Bonus',
    description: '+25% passive gold generation',
    cost: 3,
  },
  {
    id: 'prestigeMultiplier',
    name: 'Prestige Multiplier',
    description: '+10% prestige points earned',
    cost: 5,
  },
];
