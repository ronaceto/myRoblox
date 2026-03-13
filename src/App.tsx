import { useMemo, useState } from 'react';
import HUD from './components/HUD';
import StartScreen from './components/StartScreen';
import WinOverlay from './components/WinOverlay';
import Game from './game/Game';
import { REQUIRED_COLLECTIBLES } from './game/constants';
import { GamePhase } from './game/types';

export default function App() {
  const [phase, setPhase] = useState<GamePhase>('start');
  const [collected, setCollected] = useState(0);
  const [resetSignal, setResetSignal] = useState(0);

  const portalActive = collected >= REQUIRED_COLLECTIBLES;

  const handleStart = () => {
    setPhase('playing');
    setCollected(0);
    setResetSignal((s) => s + 1);
  };

  const handleRestart = () => {
    setCollected(0);
    setPhase('playing');
    setResetSignal((s) => s + 1);
  };

  const hud = useMemo(() => {
    if (phase !== 'playing') return null;
    return (
      <HUD
        collected={collected}
        total={REQUIRED_COLLECTIBLES}
        portalActive={portalActive}
        onRestart={handleRestart}
      />
    );
  }, [collected, phase, portalActive]);

  return (
    <div className="app">
      <Game
        onCollectCountChange={setCollected}
        onWin={() => setPhase('won')}
        gameActive={phase === 'playing'}
        resetSignal={resetSignal}
      />
      {phase === 'start' && <StartScreen onStart={handleStart} />}
      {hud}
      {phase === 'won' && (
        <WinOverlay collected={collected} total={REQUIRED_COLLECTIBLES} onRestart={handleRestart} />
      )}
    </div>
  );
}
