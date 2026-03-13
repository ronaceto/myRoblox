interface HUDProps {
  collected: number;
  total: number;
  portalActive: boolean;
  onRestart: () => void;
}

export default function HUD({ collected, total, portalActive, onRestart }: HUDProps) {
  return (
    <div className="overlay hud">
      <div>
        <h1>BlockWorld Sprint</h1>
        <p className="subtitle">Collect cubes, unlock the portal, and finish the course.</p>
      </div>
      <div className="hud-row">
        <span>
          Cubes: <strong>{collected}</strong>/{total}
        </span>
        <span className={portalActive ? 'active' : 'locked'}>
          {portalActive ? 'Portal Active — Reach the finish!' : 'Collect all cubes to unlock the portal'}
        </span>
        <span>WASD / Arrows + Space</span>
        <button onClick={onRestart}>Restart</button>
      </div>
    </div>
  );
}
