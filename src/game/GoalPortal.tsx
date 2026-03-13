import { useRef } from 'react';
import { Group, Mesh } from 'three';
import { useFrame } from '@react-three/fiber';

interface GoalPortalProps {
  position: [number, number, number];
  active: boolean;
}

export default function GoalPortal({ position, active }: GoalPortalProps) {
  const ringRef = useRef<Mesh>(null);
  const groupRef = useRef<Group>(null);

  useFrame(({ clock }) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = clock.getElapsedTime() * 0.8;
    }
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * 2) * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh>
        <boxGeometry args={[3.8, 4.8, 0.9]} />
        <meshStandardMaterial color="#7d6cff" transparent opacity={0.15} />
      </mesh>
      <mesh ref={ringRef}>
        <torusGeometry args={[1.6, 0.25, 16, 64]} />
        <meshStandardMaterial
          color={active ? '#79ffb0' : '#ff7aa8'}
          emissive={active ? '#79ffb0' : '#ff7aa8'}
          emissiveIntensity={active ? 0.8 : 0.4}
        />
      </mesh>
    </group>
  );
}
