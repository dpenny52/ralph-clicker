import type { GameState } from '../types/game.types';

const STORAGE_KEY = 'ralph-clicker-save';

export function saveGame(state: GameState): void {
  try {
    const saveData = {
      ...state,
      lastSaveTime: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saveData));
  } catch (error) {
    console.error('Failed to save game:', error);
  }
}

export function loadGame(): GameState | null {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (!savedData) return null;
    return JSON.parse(savedData) as GameState;
  } catch (error) {
    console.error('Failed to load game:', error);
    return null;
  }
}

export function clearSave(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear save:', error);
  }
}
