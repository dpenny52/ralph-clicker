# Ralph Clicker - Process Tasks

A browser-based clicker game built with React + TypeScript + Vite featuring gold earning, upgrades, prestige system, and localStorage persistence.

---

## Task 1: Project Setup ✅

**Description:** Initialize the Vite project with React + TypeScript and create the folder structure.

**Accept Conditions:**
- [x] `package.json` exists with `react`, `react-dom`, `typescript`, and `vite` dependencies
- [x] `tsconfig.json` exists with strict TypeScript configuration
- [x] `vite.config.ts` exists with React plugin configured
- [x] Folders exist: `src/components/`, `src/context/`, `src/hooks/`, `src/types/`, `src/utils/`, `src/data/`
- [x] `npm run dev` starts the development server without errors

---

## Task 2: TypeScript Types ✅

**Description:** Define all game-related TypeScript interfaces and types.

**Accept Conditions:**
- [x] `src/types/game.types.ts` exists
- [x] `GameState` interface defined with properties: `gold`, `totalGoldEarned`, `upgrades`, `prestigePoints`, `prestigeUpgrades`, `lastSaveTime`
- [x] `Upgrade` interface defined with properties: `id`, `name`, `description`, `baseCost`, `costMultiplier`, `level`
- [x] `PrestigeUpgrade` interface defined with properties: `id`, `name`, `description`, `cost`, `purchased`
- [x] `GameAction` union type defined for all reducer actions
- [x] File compiles without TypeScript errors

---

## Task 3: Utility Functions ✅

**Description:** Implement number formatting and game calculation utilities.

**Accept Conditions:**
- [x] `src/utils/formatNumber.ts` exists and exports `formatNumber` function
- [x] `formatNumber(1000)` returns `"1K"`
- [x] `formatNumber(1500000)` returns `"1.5M"`
- [x] `src/utils/gameCalculations.ts` exists
- [x] `calculateUpgradeCost(baseCost, multiplier, level)` function exported and returns correct scaling cost
- [x] `calculateGoldPerClick(state)` function exported
- [x] `calculateGoldPerSecond(state)` function exported
- [x] `calculatePrestigePoints(totalGold)` function exported

---

## Task 4: Game Data Definitions ✅

**Description:** Define upgrade and prestige upgrade configurations.

**Accept Conditions:**
- [x] `src/data/upgrades.ts` exists and exports `UPGRADES` array
- [x] 5 upgrades defined: Click Power, Auto Clicker, Gold Multiplier, Critical Click, Offline Earnings
- [x] Each upgrade has `id`, `name`, `description`, `baseCost`, `costMultiplier` properties
- [x] `src/data/prestigeUpgrades.ts` exists and exports `PRESTIGE_UPGRADES` array
- [x] 4 prestige upgrades defined: Starting Gold, Click Bonus, Auto Bonus, Prestige Multiplier
- [x] Each prestige upgrade has `id`, `name`, `description`, `cost` properties

---

## Task 5: Game State Context ✅

**Description:** Create React Context with useReducer for game state management.

**Accept Conditions:**
- [x] `src/context/GameContext.tsx` exists
- [x] `GameContext` and `GameProvider` exported
- [x] `useGame` hook exported for consuming context
- [x] Reducer handles `CLICK` action: increases gold based on click power
- [x] Reducer handles `BUY_UPGRADE` action: deducts cost and increments upgrade level
- [x] Reducer handles `TICK` action: adds passive gold based on gold/sec
- [x] Reducer handles `LOAD_SAVE` action: restores state from saved data
- [x] Reducer handles `RESET_GAME` action: resets to initial state
- [x] Reducer handles `PRESTIGE` action: resets gold/upgrades, adds prestige points
- [x] Reducer handles `BUY_PRESTIGE_UPGRADE` action: deducts prestige points, marks upgrade purchased

---

## Task 6: Gold Display Component ✅

**Description:** Build component showing current gold and gold per second.

**Accept Conditions:**
- [x] `src/components/GoldDisplay.tsx` exists
- [x] Displays current gold amount using `formatNumber`
- [x] Displays gold per second rate
- [x] Updates reactively when game state changes
- [x] Component renders without errors

---

## Task 7: Click Button Component ✅

**Description:** Build the main click button for earning gold.

**Accept Conditions:**
- [x] `src/components/ClickButton.tsx` exists
- [x] Button dispatches `CLICK` action when clicked
- [x] Visual feedback on click (scale animation or similar)
- [x] Displays gold earned per click
- [x] Component renders without errors

---

## Task 8: Upgrade Components ✅

**Description:** Build upgrade card and panel components.

**Accept Conditions:**
- [x] `src/components/UpgradeCard.tsx` exists
- [x] Displays upgrade name, description, current level, and cost
- [x] Buy button dispatches `BUY_UPGRADE` action
- [x] Buy button disabled when insufficient gold
- [x] `src/components/UpgradePanel.tsx` exists
- [x] Renders all 5 upgrades using `UpgradeCard`
- [x] Components render without errors

---

## Task 9: Game Loop

**Description:** Implement passive gold generation game loop.

**Accept Conditions:**
- [ ] `src/hooks/useGameLoop.ts` exists
- [ ] Hook dispatches `TICK` action at 100ms intervals
- [ ] Tick adds fractional gold (goldPerSecond / 10)
- [ ] Loop starts on mount and cleans up on unmount
- [ ] Auto Clicker upgrade increases gold/sec when leveled

---

## Task 10: Save System

**Description:** Implement localStorage persistence with auto-save.

**Accept Conditions:**
- [ ] `src/utils/storage.ts` exists
- [ ] `saveGame(state)` function saves state to localStorage
- [ ] `loadGame()` function returns saved state or null
- [ ] `clearSave()` function removes saved state
- [ ] `src/hooks/useAutoSave.ts` exists
- [ ] Auto-saves every 30 seconds
- [ ] Saves on `beforeunload` event
- [ ] Game state persists after page refresh

---

## Task 11: Offline Earnings

**Description:** Calculate and award gold earned while away.

**Accept Conditions:**
- [ ] On load, calculates time elapsed since `lastSaveTime`
- [ ] Awards offline gold based on gold/sec and Offline Earnings upgrade level
- [ ] Maximum offline time capped at 24 hours
- [ ] Displays notification showing offline earnings on load

---

## Task 12: Prestige Panel Component

**Description:** Build prestige UI showing points and prestige upgrades.

**Accept Conditions:**
- [ ] `src/components/PrestigePanel.tsx` exists
- [ ] Displays current prestige points
- [ ] Shows prestige button with potential points to earn
- [ ] Prestige button disabled when under 1 million total gold
- [ ] Prestige button dispatches `PRESTIGE` action
- [ ] Displays prestige upgrades with buy buttons
- [ ] Purchased prestige upgrades visually marked as owned

---

## Task 13: App Assembly

**Description:** Assemble all components in App.tsx with styling.

**Accept Conditions:**
- [ ] `src/App.tsx` wraps app in `GameProvider`
- [ ] Layout includes: GoldDisplay, ClickButton, UpgradePanel, PrestigePanel
- [ ] `src/App.css` contains responsive styling
- [ ] Game loop hook is active
- [ ] Auto-save hook is active
- [ ] Application runs without console errors

---

## Task 14: End-to-End Verification

**Description:** Verify complete game functionality.

**Accept Conditions:**
- [ ] Clicking the button increases gold by the correct amount
- [ ] Buying upgrades deducts gold and applies effects
- [ ] Auto Clicker generates passive gold over time
- [ ] Critical Click randomly triggers 5x gold on clicks
- [ ] Game state persists after page refresh
- [ ] Offline earnings are awarded after being away
- [ ] Prestige resets gold and upgrades at 1M+ total gold
- [ ] Prestige points are calculated correctly
- [ ] Prestige upgrades provide permanent bonuses after reset
- [ ] `npm run build` completes without errors
