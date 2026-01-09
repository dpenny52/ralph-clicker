import type { Upgrade } from '../types/game.types';

// Omit runtime properties (level) from upgrade data definitions
type UpgradeData = Omit<Upgrade, 'level'>;

export const UPGRADES: UpgradeData[] = [
  {
    id: 'clickPower',
    name: 'Click Power',
    description: 'Increases gold per click by 1',
    baseCost: 10,
    costMultiplier: 1.5,
  },
  {
    id: 'autoClicker',
    name: 'Auto Clicker',
    description: 'Generates 0.1 gold per second',
    baseCost: 50,
    costMultiplier: 1.8,
  },
  {
    id: 'goldMultiplier',
    name: 'Gold Multiplier',
    description: 'Multiplies passive gold by 50%',
    baseCost: 100,
    costMultiplier: 2.0,
  },
  {
    id: 'criticalClick',
    name: 'Critical Click',
    description: '10% chance for 5x gold on click',
    baseCost: 500,
    costMultiplier: 2.5,
  },
  {
    id: 'offlineEarnings',
    name: 'Offline Earnings',
    description: 'Earn 10% of gold/sec while offline',
    baseCost: 1000,
    costMultiplier: 3.0,
  },
];
