import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Group, Vector3 } from 'three';
import { FALL_RESPAWN_Y, GRAVITY, JUMP_VELOCITY, PLAYER_SIZE, PLAYER_SPEED, PLATFORMS } from './constants';
import { useKeyboardControls } from './useKeyboardControls';
import { isWithinPlatformTop } from './utils';
import { Vec3 } from './types';

interface PlayerProps {
  startPosition: [number, number, number];
  onPositionChange: (position: Vec3) => void;
  respawnSignal: number;
}

const CAMERA_OFFSET = new Vector3(0, 6, 10);

export default function Player({ startPosition, onPositionChange, respawnSignal }: PlayerProps) {
  const controls = useKeyboardControls();
  const groupRef = useRef<Group>(null);
  const velocityY = useRef(0);
  const grounded = useRef(false);
  const { camera } = useThree();

  const resetPlayer = (group: Group) => {
    group.position.set(...startPosition);
    velocityY.current = 0;
    grounded.current = false;
  };

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) return;

    if (group.userData.respawnSignal !== respawnSignal) {
      group.userData.respawnSignal = respawnSignal;
      resetPlayer(group);
    }

    const moveX = (Number(controls.right) - Number(controls.left)) * PLAYER_SPEED * delta;
    const moveZ = (Number(controls.back) - Number(controls.forward)) * PLAYER_SPEED * delta;

    group.position.x += moveX;
    group.position.z += moveZ;

    if (controls.jump && grounded.current) {
      velocityY.current = JUMP_VELOCITY;
      grounded.current = false;
    }

    velocityY.current -= GRAVITY * delta;
    group.position.y += velocityY.current * delta;

    const footY = group.position.y - PLAYER_SIZE.height / 2;
    grounded.current = false;

    for (const platform of PLATFORMS) {
      const check = isWithinPlatformTop(
        { x: group.position.x, y: footY, z: group.position.z },
        platform,
        PLAYER_SIZE.width / 2,
        PLAYER_SIZE.depth / 2,
      );

      if (check.withinX && check.withinZ && check.nearTop && velocityY.current <= 0) {
        group.position.y = check.top + PLAYER_SIZE.height / 2;
        velocityY.current = 0;
        grounded.current = true;
        break;
      }
    }

    if (group.position.y < FALL_RESPAWN_Y) {
      resetPlayer(group);
    }

    onPositionChange({ x: group.position.x, y: group.position.y, z: group.position.z });

    const desiredCameraPosition = group.position.clone().add(CAMERA_OFFSET);
    camera.position.lerp(desiredCameraPosition, 0.1);
    camera.lookAt(group.position.x, group.position.y + 1.2, group.position.z);
  });

  return (
    <group ref={groupRef} position={startPosition}>
      <mesh castShadow position={[0, 0.4, 0]}>
        <boxGeometry args={[1, 1.2, 1]} />
        <meshStandardMaterial color="#3b82f6" />
      </mesh>
      <mesh castShadow position={[0, 1.35, 0]}>
        <boxGeometry args={[0.8, 0.7, 0.8]} />
        <meshStandardMaterial color="#f8d9a0" />
      </mesh>
    </group>
  );
}
