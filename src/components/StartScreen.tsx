interface StartScreenProps {
  onStart: () => void;
}

export default function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="overlay center">
      <div className="panel">
        <h1>BlockWorld Sprint</h1>
        <p className="subtitle">A tiny 3D obstacle adventure — collect all glowing cubes, then sprint to the portal.</p>
        <p>Controls: WASD / Arrow Keys to move, Space to jump.</p>
        <button onClick={onStart}>Start Game</button>
      </div>
    </div>
  );
}
