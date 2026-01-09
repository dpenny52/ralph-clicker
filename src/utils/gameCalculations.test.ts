import { describe, it, expect } from 'vitest';
import {
  calculateUpgradeCost,
  calculateGoldPerClick,
  calculateGoldPerSecond,
  calculatePrestigePoints,
} from './gameCalculations';
import type { GameState } from '../types/game.types';

const createGameState = (overrides: Partial<GameState> = {}): GameState => ({
  gold: 0,
  totalGoldEarned: 0,
  upgrades: {},
  prestigePoints: 0,
  prestigeUpgrades: {},
  lastSaveTime: Date.now(),
  ...overrides,
});

describe('calculateUpgradeCost', () => {
  it('returns base cost at level 0', () => {
    expect(calculateUpgradeCost(10, 1.5, 0)).toBe(10);
  });

  it('scales cost correctly with multiplier', () => {
    expect(calculateUpgradeCost(10, 1.5, 1)).toBe(15);
    expect(calculateUpgradeCost(10, 2, 3)).toBe(80);
  });
});

describe('calculateGoldPerClick', () => {
  it('returns 1 for base state', () => {
    const state = createGameState();
    expect(calculateGoldPerClick(state)).toBe(1);
  });

  it('adds 1 gold per click power level', () => {
    const state = createGameState({ upgrades: { clickPower: 5 } });
    expect(calculateGoldPerClick(state)).toBe(6);
  });

  it('applies click bonus prestige upgrade', () => {
    const state = createGameState({
      upgrades: { clickPower: 1 },
      prestigeUpgrades: { clickBonus: true },
    });
    expect(calculateGoldPerClick(state)).toBe(3); // (1 + 1) * 1.5
  });
});

describe('calculateGoldPerSecond', () => {
  it('returns 0 with no auto clicker', () => {
    const state = createGameState();
    expect(calculateGoldPerSecond(state)).toBe(0);
  });

  it('returns 0.1 per auto clicker level', () => {
    const state = createGameState({ upgrades: { autoClicker: 5 } });
    expect(calculateGoldPerSecond(state)).toBe(0.5);
  });

  it('applies gold multiplier upgrade', () => {
    const state = createGameState({
      upgrades: { autoClicker: 10, goldMultiplier: 2 },
    });
    expect(calculateGoldPerSecond(state)).toBe(2); // 1 * (1 + 2*0.5) = 2
  });

  it('applies auto bonus prestige upgrade', () => {
    const state = createGameState({
      upgrades: { autoClicker: 10 },
      prestigeUpgrades: { autoBonus: true },
    });
    expect(calculateGoldPerSecond(state)).toBe(1.25); // 1 * 1.25
  });
});

describe('calculatePrestigePoints', () => {
  it('returns 0 for less than 1000 gold', () => {
    expect(calculatePrestigePoints(0)).toBe(0);
    expect(calculatePrestigePoints(999)).toBe(0);
  });

  it('returns 1 for 1000 gold', () => {
    expect(calculatePrestigePoints(1000)).toBe(1);
  });

  it('returns correct points based on sqrt formula', () => {
    expect(calculatePrestigePoints(4000)).toBe(2);
    expect(calculatePrestigePoints(9000)).toBe(3);
    expect(calculatePrestigePoints(100000)).toBe(10);
  });
});
