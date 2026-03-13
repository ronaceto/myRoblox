import { Canvas } from '@react-three/fiber';
import { Sky } from '@react-three/drei';
import { useEffect, useMemo, useState } from 'react';
import Level from './Level';
import Player from './Player';
import { COLLECTIBLES, PORTAL, REQUIRED_COLLECTIBLES, START_POSITION } from './constants';
import { distanceSq } from './utils';
import { Vec3 } from './types';

interface GameProps {
  onCollectCountChange: (count: number) => void;
  onWin: () => void;
  gameActive: boolean;
  resetSignal: number;
}

export default function Game({ onCollectCountChange, onWin, gameActive, resetSignal }: GameProps) {
  const [collectedIds, setCollectedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    setCollectedIds(new Set());
    onCollectCountChange(0);
  }, [resetSignal, onCollectCountChange]);

  const portalActive = collectedIds.size >= REQUIRED_COLLECTIBLES;
  const collectibleMap = useMemo(() => COLLECTIBLES, []);

  const handlePositionChange = (position: Vec3) => {
    if (!gameActive) return;

    setCollectedIds((prev) => {
      let changed = false;
      const next = new Set(prev);

      for (const collectible of collectibleMap) {
        if (next.has(collectible.id)) continue;
        const hit = distanceSq(position, {
          x: collectible.position[0],
          y: collectible.position[1],
          z: collectible.position[2],
        }) < 2.2;

        if (hit) {
          next.add(collectible.id);
          changed = true;
        }
      }

      if (changed) {
        onCollectCountChange(next.size);
      }

      return changed ? next : prev;
    });

    if (portalActive) {
      const portalHit =
        Math.abs(position.x - PORTAL.position[0]) < PORTAL.size[0] / 1.7 &&
        Math.abs(position.y - PORTAL.position[1]) < PORTAL.size[1] / 2 &&
        Math.abs(position.z - PORTAL.position[2]) < PORTAL.size[2] + 1;

      if (portalHit) {
        onWin();
      }
    }
  };

  return (
    <Canvas shadows camera={{ position: [0, 6, 10], fov: 55 }}>
      <color attach="background" args={['#9fe8ff']} />
      <ambientLight intensity={0.8} />
      <directionalLight
        castShadow
        intensity={1.2}
        position={[12, 20, 10]}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <Sky distance={450000} sunPosition={[1, 1, 0.5]} inclination={0.5} azimuth={0.25} />

      <Level collectedIds={collectedIds} portalActive={portalActive} />
      <Player startPosition={START_POSITION} onPositionChange={handlePositionChange} respawnSignal={resetSignal} />
    </Canvas>
  );
}
