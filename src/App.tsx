import './App.css';
import { GameProvider } from './context/GameContext';
import { GoldDisplay } from './components/GoldDisplay';
import { ClickButton } from './components/ClickButton';
import { UpgradePanel } from './components/UpgradePanel';
import { PrestigePanel } from './components/PrestigePanel';
import { OfflineEarningsNotification } from './components/OfflineEarningsNotification';
import { useGameLoop } from './hooks/useGameLoop';
import { useAutoSave } from './hooks/useAutoSave';
import { useLoadGame } from './hooks/useLoadGame';

function GameContent() {
  useGameLoop();
  useAutoSave();
  const { offlineEarningsFormatted, dismissOfflineEarnings } = useLoadGame();

  return (
    <div className="game-container">
      {offlineEarningsFormatted && (
        <OfflineEarningsNotification
          earnings={offlineEarningsFormatted}
          onDismiss={dismissOfflineEarnings}
        />
      )}

      <header className="game-header">
        <h1>Ralph Clicker</h1>
      </header>

      <main className="game-main">
        <section className="game-section game-section-center">
          <GoldDisplay />
          <ClickButton />
        </section>

        <section className="game-section game-section-upgrades">
          <UpgradePanel />
        </section>

        <section className="game-section game-section-prestige">
          <PrestigePanel />
        </section>
      </main>
    </div>
  );
}

function App() {
  return (
    <GameProvider>
      <GameContent />
    </GameProvider>
  );
}

export default App;
