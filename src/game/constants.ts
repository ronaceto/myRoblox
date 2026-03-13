import { CollectibleDef, PlatformDef, PortalDef } from './types';

export const PLAYER_SIZE = { width: 1, height: 1.8, depth: 1 };
export const PLAYER_SPEED = 7;
export const JUMP_VELOCITY = 9;
export const GRAVITY = 22;
export const FALL_RESPAWN_Y = -15;

export const START_POSITION: [number, number, number] = [0, 3, 0];

export const PLATFORMS: PlatformDef[] = [
  { id: 'start', position: [0, 0, 0], size: [10, 1, 10], color: '#66d9ef' },
  { id: 'p1', position: [9, 1, -1], size: [6, 1, 6], color: '#7ef29a' },
  { id: 'p2', position: [16, 2, -4], size: [5, 1, 5], color: '#f9f871' },
  { id: 'p3', position: [23, 3, -8], size: [5, 1, 5], color: '#fdb462' },
  { id: 'ramp1', position: [30, 3, -8], size: [4, 1, 5], color: '#ff9ec4' },
  { id: 'ramp2', position: [34, 4, -8], size: [4, 1, 5], color: '#ff9ec4' },
  { id: 'ramp3', position: [38, 5, -8], size: [4, 1, 5], color: '#ff9ec4' },
  { id: 'high1', position: [44, 6, -5], size: [7, 1, 7], color: '#a4b8ff' },
  { id: 'high2', position: [53, 7, -2], size: [7, 1, 7], color: '#a4b8ff' },
  { id: 'finish', position: [62, 8, 0], size: [10, 1, 10], color: '#b5ff8a' },
];

export const COLLECTIBLES: CollectibleDef[] = [
  { id: 'c1', position: [2, 2, 0] },
  { id: 'c2', position: [10, 3, -1] },
  { id: 'c3', position: [17, 4, -4] },
  { id: 'c4', position: [30, 5, -8] },
  { id: 'c5', position: [45, 8, -5] },
  { id: 'c6', position: [54, 9, -2] },
  { id: 'c7', position: [63, 10, 0] },
];

export const REQUIRED_COLLECTIBLES = COLLECTIBLES.length;

export const PORTAL: PortalDef = {
  position: [62, 9.2, 0],
  size: [3, 4, 0.6],
};
