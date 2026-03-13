import { useEffect, useState } from 'react';

interface ControlsState {
  forward: boolean;
  back: boolean;
  left: boolean;
  right: boolean;
  jump: boolean;
}

const defaultState: ControlsState = {
  forward: false,
  back: false,
  left: false,
  right: false,
  jump: false,
};

const keyMap: Record<string, keyof ControlsState> = {
  w: 'forward',
  arrowup: 'forward',
  s: 'back',
  arrowdown: 'back',
  a: 'left',
  arrowleft: 'left',
  d: 'right',
  arrowright: 'right',
  ' ': 'jump',
};

export function useKeyboardControls() {
  const [controls, setControls] = useState<ControlsState>(defaultState);

  useEffect(() => {
    const onKey = (pressed: boolean) => (event: KeyboardEvent) => {
      const action = keyMap[event.key.toLowerCase()];
      if (!action) return;
      if (action === 'jump') {
        event.preventDefault();
      }
      setControls((prev) => ({ ...prev, [action]: pressed }));
    };

    const handleKeyDown = onKey(true);
    const handleKeyUp = onKey(false);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return controls;
}
