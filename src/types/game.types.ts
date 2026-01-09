/**
 * Game Types for Ralph Clicker
 */

/**
 * Represents the complete state of the game
 */
export interface GameState {
  /** Current gold balance */
  gold: number;
  /** Total gold earned across all time (before prestige resets) */
  totalGoldEarned: number;
  /** Maps upgrade id to its current level */
  upgrades: Record<string, number>;
  /** Current prestige points available */
  prestigePoints: number;
  /** Maps prestige upgrade id to whether it has been purchased */
  prestigeUpgrades: Record<string, boolean>;
  /** Timestamp of the last save */
  lastSaveTime: number;
}

/**
 * Represents an upgrade that can be purchased multiple times
 */
export interface Upgrade {
  /** Unique identifier for the upgrade */
  id: string;
  /** Display name of the upgrade */
  name: string;
  /** Description of what the upgrade does */
  description: string;
  /** Base cost of the first level */
  baseCost: number;
  /** Multiplier applied to cost for each level */
  costMultiplier: number;
  /** Current level of the upgrade (starts at 0) */
  level: number;
}

/**
 * Represents a prestige upgrade that can only be purchased once
 */
export interface PrestigeUpgrade {
  /** Unique identifier for the prestige upgrade */
  id: string;
  /** Display name of the prestige upgrade */
  name: string;
  /** Description of what the prestige upgrade does */
  description: string;
  /** Cost in prestige points */
  cost: number;
  /** Whether the upgrade has been purchased */
  purchased: boolean;
}

/**
 * Action for clicking to earn gold
 */
export interface ClickAction {
  type: 'CLICK';
  payload?: {
    isCritical?: boolean;
  };
}

/**
 * Action for purchasing an upgrade
 */
export interface BuyUpgradeAction {
  type: 'BUY_UPGRADE';
  payload: {
    upgradeId: string;
  };
}

/**
 * Action for game tick (passive income, etc.)
 */
export interface TickAction {
  type: 'TICK';
}

/**
 * Action for loading a saved game state
 */
export interface LoadSaveAction {
  type: 'LOAD_SAVE';
  payload: {
    state: GameState;
  };
}

/**
 * Action for resetting the game to initial state
 */
export interface ResetGameAction {
  type: 'RESET_GAME';
}

/**
 * Action for prestiging (resetting progress for prestige points)
 */
export interface PrestigeAction {
  type: 'PRESTIGE';
}

/**
 * Action for purchasing a prestige upgrade
 */
export interface BuyPrestigeUpgradeAction {
  type: 'BUY_PRESTIGE_UPGRADE';
  payload: {
    upgradeId: string;
  };
}

/**
 * Action for adding offline earnings
 */
export interface AddOfflineEarningsAction {
  type: 'ADD_OFFLINE_EARNINGS';
  payload: {
    amount: number;
  };
}

/**
 * Union type of all possible game actions for the reducer
 */
export type GameAction =
  | ClickAction
  | BuyUpgradeAction
  | TickAction
  | LoadSaveAction
  | ResetGameAction
  | PrestigeAction
  | BuyPrestigeUpgradeAction
  | AddOfflineEarningsAction;
