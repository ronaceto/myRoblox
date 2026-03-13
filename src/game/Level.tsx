import Collectible from './Collectible';
import GoalPortal from './GoalPortal';
import { COLLECTIBLES, PLATFORMS, PORTAL } from './constants';

interface LevelProps {
  collectedIds: Set<string>;
  portalActive: boolean;
}

export default function Level({ collectedIds, portalActive }: LevelProps) {
  return (
    <group>
      {PLATFORMS.map((platform) => (
        <mesh key={platform.id} position={platform.position} receiveShadow castShadow>
          <boxGeometry args={platform.size} />
          <meshStandardMaterial color={platform.color} />
        </mesh>
      ))}

      {COLLECTIBLES.map((item) =>
        collectedIds.has(item.id) ? null : <Collectible key={item.id} position={item.position} />,
      )}

      <GoalPortal position={PORTAL.position} active={portalActive} />
    </group>
  );
}
