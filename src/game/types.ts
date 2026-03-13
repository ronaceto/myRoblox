export type GamePhase = 'start' | 'playing' | 'won';

export interface PlatformDef {
  id: string;
  position: [number, number, number];
  size: [number, number, number];
  color: string;
}

export interface CollectibleDef {
  id: string;
  position: [number, number, number];
}

export interface PortalDef {
  position: [number, number, number];
  size: [number, number, number];
}

export interface Vec3 {
  x: number;
  y: number;
  z: number;
}
