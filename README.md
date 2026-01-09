# Ralph Clicker

An incremental clicker game built with React, TypeScript, and Vite. Click to earn gold, purchase upgrades, and prestige to earn permanent bonuses.

## Prerequisites

- Node.js (v18 or higher recommended)
- npm

## Installation

```bash
npm install
```

## Running the Game

Start the development server:

```bash
npm run dev
```

The game will be available at `http://localhost:5173` (or the next available port).

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory. Preview the production build with:

```bash
npm run preview
```

## Running Tests

```bash
npm test
```

## Code Quality

Run type checking and linting:

```bash
npm run check
```

Run linting only:

```bash
npm run lint
```

## How to Play

### Basic Gameplay

1. **Click the button** to earn gold
2. **Buy upgrades** to increase your gold production
3. **Prestige** when you've earned enough gold to gain permanent bonuses

### Upgrades

Purchase these upgrades to boost your gold income:

| Upgrade | Effect |
|---------|--------|
| Click Power | +1 gold per click |
| Auto Clicker | +0.1 gold per second (passive) |
| Gold Multiplier | +50% passive gold generation |
| Critical Click | 10% chance for 5x gold on click |
| Offline Earnings | Earn 10% of gold/sec while away |

Each upgrade can be purchased multiple times, with costs increasing each time.

### Prestige System

Once you've earned **1,000 total gold**, you can prestige:

- Prestiging resets your gold and regular upgrades
- You earn **Prestige Points** based on your total gold earned
- Prestige Points are used to buy permanent upgrades that persist across prestiges

### Prestige Upgrades

| Upgrade | Cost | Effect |
|---------|------|--------|
| Starting Gold | 1 PP | Start with 100 gold after prestige |
| Click Bonus | 2 PP | +50% gold per click |
| Auto Bonus | 3 PP | +25% passive gold generation |
| Prestige Multiplier | 5 PP | +10% prestige points earned |

### Tips

- Focus on Click Power early to get a solid foundation
- Auto Clickers provide passive income, letting you earn gold even when not clicking
- Save up for Critical Click to occasionally hit big payouts
- Prestige when progress slows down to earn Prestige Points for permanent bonuses
- The game saves automatically and tracks offline earnings

## Tech Stack

- React 19
- TypeScript
- Vite
- Vitest (testing)
