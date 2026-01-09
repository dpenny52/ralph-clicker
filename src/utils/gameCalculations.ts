import type { GameState } from '../types/game.types';
import { UPGRADES } from '../data/upgrades';

/**
 * Calculate the cost of an upgrade at a given level
 */
export function calculateUpgradeCost(
  baseCost: number,
  costMultiplier: number,
  level: number
): number {
  return Math.floor(baseCost * Math.pow(costMultiplier, level));
}

/**
 * Calculate the gold earned per click based on current game state
 */
export function calculateGoldPerClick(state: GameState): number {
  // Base gold per click is 1
  let goldPerClick = 1;

  // Add click power bonus (1 gold per level)
  const clickPowerLevel = state.upgrades['clickPower'] ?? 0;
  goldPerClick += clickPowerLevel;

  // Apply click bonus from prestige (50% per purchase)
  if (state.prestigeUpgrades['clickBonus']) {
    goldPerClick *= 1.5;
  }

  return goldPerClick;
}

/**
 * Calculate the gold earned per second from passive income
 */
export function calculateGoldPerSecond(state: GameState): number {
  // Auto clicker generates 0.1 gold per second per level
  const autoClickerLevel = state.upgrades['autoClicker'] ?? 0;
  let goldPerSecond = autoClickerLevel * 0.1;

  // Gold multiplier adds 50% per level to passive income
  const goldMultiplierLevel = state.upgrades['goldMultiplier'] ?? 0;
  goldPerSecond *= 1 + goldMultiplierLevel * 0.5;

  // Apply auto bonus from prestige (25% increase)
  if (state.prestigeUpgrades['autoBonus']) {
    goldPerSecond *= 1.25;
  }

  return goldPerSecond;
}

/**
 * Calculate the prestige points earned based on total gold
 * Formula: floor(sqrt(totalGold / 1,000,000))
 */
export function calculatePrestigePoints(totalGold: number): number {
  if (totalGold < 1_000_000) {
    return 0;
  }
  return Math.floor(Math.sqrt(totalGold / 1_000_000));
}

/**
 * Get the upgrade data by ID
 */
export function getUpgradeById(upgradeId: string) {
  return UPGRADES.find((u) => u.id === upgradeId);
}

/**
 * Check if a critical hit occurs based on critical click upgrade level
 * 10% chance per level
 */
export function checkCriticalHit(criticalClickLevel: number): boolean {
  if (criticalClickLevel <= 0) return false;
  const critChance = Math.min(criticalClickLevel * 0.1, 1); // Cap at 100%
  return Math.random() < critChance;
}

/**
 * Calculate offline earnings based on time elapsed and game state
 * Returns the gold earned while offline
 */
export function calculateOfflineEarnings(state: GameState): number {
  const now = Date.now();
  const lastSave = state.lastSaveTime;

  // Calculate elapsed time in seconds
  let elapsedSeconds = (now - lastSave) / 1000;

  // Cap at 24 hours (86400 seconds)
  const MAX_OFFLINE_SECONDS = 24 * 60 * 60;
  elapsedSeconds = Math.min(elapsedSeconds, MAX_OFFLINE_SECONDS);

  // Get offline earnings upgrade level (10% of gold/sec per level)
  const offlineLevel = state.upgrades['offlineEarnings'] ?? 0;
  if (offlineLevel <= 0) return 0;

  const goldPerSecond = calculateGoldPerSecond(state);
  const offlineRate = offlineLevel * 0.1; // 10% per level

  return goldPerSecond * offlineRate * elapsedSeconds;
}
