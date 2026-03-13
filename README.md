# BlockWorld Sprint

BlockWorld Sprint is a lightweight single-player 3D browser mini-game MVP inspired by playful obstacle-and-exploration experiences. You control a blocky character, collect glowing cubes across floating platforms, unlock a portal, and sprint to the finish.

## Stack

- React + TypeScript
- Vite
- Three.js via `@react-three/fiber`
- `@react-three/drei` for sky helpers

## Features (MVP)

- Start screen, gameplay, and win overlay
- WASD + Arrow-key movement
- Jumping, gravity, and simple platform collision
- Third-person follow camera
- Floating obstacle course with ramps/elevations
- 7 glowing collectibles
- Locked portal that activates after collecting all cubes
- Fall respawn back to start
- Restart support for full run reset

## Getting started

```bash
npm install
npm run dev
```

Open the local Vite URL shown in terminal.

## Build

```bash
npm run build
```

Build output goes to `dist/`.

## Preview production build

```bash
npm run preview
```

## Deploy to Netlify (static)

1. Push repository to GitHub.
2. In Netlify, create a new site from that repository.
3. Set build command to:
   - `npm run build`
4. Set publish directory to:
   - `dist`
5. Deploy.

No environment variables are required for this MVP.
