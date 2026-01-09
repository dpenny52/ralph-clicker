import {
  createContext,
  useReducer,
  type ReactNode,
  type Dispatch,
} from 'react';
import type { GameState, GameAction } from '../types/game.types';
import { PRESTIGE_UPGRADES } from '../data/prestigeUpgrades';
import {
  calculateGoldPerClick,
  calculateGoldPerSecond,
  calculatePrestigePoints,
  calculateUpgradeCost,
  getUpgradeById,
  checkCriticalHit,
} from '../utils/gameCalculations';

function createInitialState(): GameState {
  return {
    gold: 0,
    totalGoldEarned: 0,
    upgrades: {},
    prestigePoints: 0,
    prestigeUpgrades: {},
    lastSaveTime: Date.now(),
  };
}

const initialState = createInitialState();

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'CLICK': {
      let goldEarned = calculateGoldPerClick(state);

      // Check for critical hit
      const critLevel = state.upgrades['criticalClick'] ?? 0;
      if (checkCriticalHit(critLevel)) {
        goldEarned *= 5;
      }

      return {
        ...state,
        gold: state.gold + goldEarned,
        totalGoldEarned: state.totalGoldEarned + goldEarned,
      };
    }

    case 'BUY_UPGRADE': {
      const { upgradeId } = action.payload;
      const upgrade = getUpgradeById(upgradeId);
      if (!upgrade) return state;

      const currentLevel = state.upgrades[upgradeId] ?? 0;
      const cost = calculateUpgradeCost(
        upgrade.baseCost,
        upgrade.costMultiplier,
        currentLevel
      );

      if (state.gold < cost) return state;

      return {
        ...state,
        gold: state.gold - cost,
        upgrades: {
          ...state.upgrades,
          [upgradeId]: currentLevel + 1,
        },
      };
    }

    case 'TICK': {
      const goldPerSecond = calculateGoldPerSecond(state);
      // Tick is called 10 times per second, so add 1/10th of gold per second
      const goldEarned = goldPerSecond / 10;

      if (goldEarned === 0) return state;

      return {
        ...state,
        gold: state.gold + goldEarned,
        totalGoldEarned: state.totalGoldEarned + goldEarned,
      };
    }

    case 'LOAD_SAVE': {
      return {
        ...action.payload.state,
        lastSaveTime: Date.now(),
      };
    }

    case 'RESET_GAME': {
      return createInitialState();
    }

    case 'PRESTIGE': {
      // Can only prestige with at least 1 million total gold
      if (state.totalGoldEarned < 1_000_000) return state;

      let prestigePointsEarned = calculatePrestigePoints(state.totalGoldEarned);

      // Apply prestige multiplier bonus (+10%)
      if (state.prestigeUpgrades['prestigeMultiplier']) {
        prestigePointsEarned = Math.floor(prestigePointsEarned * 1.1);
      }

      // Calculate starting gold based on prestige upgrades
      let startingGold = 0;
      if (state.prestigeUpgrades['startingGold']) {
        startingGold = 100;
      }

      return {
        gold: startingGold,
        totalGoldEarned: 0,
        upgrades: {},
        prestigePoints: state.prestigePoints + prestigePointsEarned,
        prestigeUpgrades: state.prestigeUpgrades, // Keep prestige upgrades
        lastSaveTime: Date.now(),
      };
    }

    case 'BUY_PRESTIGE_UPGRADE': {
      const { upgradeId } = action.payload;
      const upgrade = PRESTIGE_UPGRADES.find((u) => u.id === upgradeId);
      if (!upgrade) return state;

      // Already purchased
      if (state.prestigeUpgrades[upgradeId]) return state;

      // Not enough prestige points
      if (state.prestigePoints < upgrade.cost) return state;

      return {
        ...state,
        prestigePoints: state.prestigePoints - upgrade.cost,
        prestigeUpgrades: {
          ...state.prestigeUpgrades,
          [upgradeId]: true,
        },
      };
    }

    case 'ADD_OFFLINE_EARNINGS': {
      const { amount } = action.payload;
      if (amount <= 0) return state;

      return {
        ...state,
        gold: state.gold + amount,
        totalGoldEarned: state.totalGoldEarned + amount,
      };
    }

    default:
      return state;
  }
}

interface GameContextValue {
  state: GameState;
  dispatch: Dispatch<GameAction>;
  goldPerClick: number;
  goldPerSecond: number;
  potentialPrestigePoints: number;
  getUpgradeCost: (upgradeId: string) => number;
}

const GameContext = createContext<GameContextValue | null>(null);

interface GameProviderProps {
  children: ReactNode;
}

export function GameProvider({ children }: GameProviderProps) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const goldPerClick = calculateGoldPerClick(state);
  const goldPerSecond = calculateGoldPerSecond(state);
  const potentialPrestigePoints = calculatePrestigePoints(state.totalGoldEarned);

  const getUpgradeCost = (upgradeId: string): number => {
    const upgrade = getUpgradeById(upgradeId);
    if (!upgrade) return 0;
    const currentLevel = state.upgrades[upgradeId] ?? 0;
    return calculateUpgradeCost(upgrade.baseCost, upgrade.costMultiplier, currentLevel);
  };

  const value: GameContextValue = {
    state,
    dispatch,
    goldPerClick,
    goldPerSecond,
    potentialPrestigePoints,
    getUpgradeCost,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export { GameContext, type GameContextValue };
