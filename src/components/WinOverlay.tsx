interface WinOverlayProps {
  collected: number;
  total: number;
  onRestart: () => void;
}

export default function WinOverlay({ collected, total, onRestart }: WinOverlayProps) {
  return (
    <div className="overlay center">
      <div className="panel">
        <h2>You Win! 🎉</h2>
        <p>
          You collected <strong>{collected}</strong> / <strong>{total}</strong> cubes and reached the portal.
        </p>
        <button onClick={onRestart}>Play Again</button>
      </div>
    </div>
  );
}
