import { PlatformDef, Vec3 } from './types';

export const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

export function isWithinPlatformTop(
  position: Vec3,
  platform: PlatformDef,
  halfWidth: number,
  halfDepth: number,
  tolerance = 0.35,
) {
  const [px, py, pz] = platform.position;
  const [sx, sy, sz] = platform.size;
  const top = py + sy / 2;

  const withinX = position.x + halfWidth > px - sx / 2 && position.x - halfWidth < px + sx / 2;
  const withinZ = position.z + halfDepth > pz - sz / 2 && position.z - halfDepth < pz + sz / 2;
  const nearTop = Math.abs(position.y - top) <= tolerance;

  return { withinX, withinZ, nearTop, top };
}

export function distanceSq(a: Vec3, b: Vec3) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  const dz = a.z - b.z;
  return dx * dx + dy * dy + dz * dz;
}
