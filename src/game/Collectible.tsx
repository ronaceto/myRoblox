import { useRef } from 'react';
import { Mesh } from 'three';
import { useFrame } from '@react-three/fiber';

interface CollectibleProps {
  position: [number, number, number];
}

export default function Collectible({ position }: CollectibleProps) {
  const ref = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.y = t * 1.8;
    ref.current.position.y = position[1] + Math.sin(t * 3) * 0.18;
  });

  return (
    <mesh ref={ref} position={position} castShadow>
      <boxGeometry args={[0.75, 0.75, 0.75]} />
      <meshStandardMaterial color="#fff275" emissive="#f8ff6f" emissiveIntensity={1.2} />
    </mesh>
  );
}
