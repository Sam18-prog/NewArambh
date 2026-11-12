import { SceneCollider, PlayerCollisionConfig } from '@/types/collision';

export const DEFAULT_PLAYER_COLLIDER_CONFIG: PlayerCollisionConfig = {
  radius: 0.45, // Capsule collision radius in meters
  height: 1.7, // Total height
  eyeHeight: 1.7, // Camera view height above current ground surface
  maxStepHeight: 0.35, // Can climb steps up to 35cm smoothly
};

export const TAJ_MAHAL_COLLIDERS: SceneCollider[] = [
  // 1. Outer Perimeter Walls
  {
    id: 'wall-perimeter-west',
    type: 'box',
    center: [-52, 3.0, 10],
    size: [1.8, 6.0, 150],
    description: 'West Sandstone Enclosure Wall',
  },
  {
    id: 'wall-perimeter-east',
    type: 'box',
    center: [52, 3.0, 10],
    size: [1.8, 6.0, 150],
    description: 'East Sandstone Enclosure Wall',
  },
  {
    id: 'wall-perimeter-north',
    type: 'box',
    center: [0, 2.0, -62],
    size: [105, 4.0, 2.0],
    description: 'North Yamuna Riverfront Wall',
  },
  {
    id: 'gate-south-boundary',
    type: 'box',
    center: [0, 7.5, 72],
    size: [36, 15.0, 4.0],
    description: 'Darwaza-i-rauza Southern Threshold',
  },

  // 2. Darwaza-i-rauza Gate Wings (Leaving central portal clear)
  {
    id: 'gate-wing-west',
    type: 'box',
    center: [-10.5, 7.5, 68],
    size: [11.0, 15.0, 8.0],
    description: 'Great Gate West Wing',
  },
  {
    id: 'gate-wing-east',
    type: 'box',
    center: [10.5, 7.5, 68],
    size: [11.0, 15.0, 8.0],
    description: 'Great Gate East Wing',
  },

  // 3. Main Mausoleum Chamber (Rauza-i-Munawwara)
  {
    id: 'mausoleum-core',
    type: 'box',
    center: [0, 10.9, -25],
    size: [23.6, 15.0, 23.6],
    description: 'Main Mausoleum Symmetrical Chamber Walls',
  },
  {
    id: 'mausoleum-chamfer-nw',
    type: 'box',
    center: [-11.2, 10.9, -36.2],
    size: [5.0, 15.0, 5.0],
    description: 'Mausoleum North-West Chamfered Corner',
  },
  {
    id: 'mausoleum-chamfer-ne',
    type: 'box',
    center: [11.2, 10.9, -36.2],
    size: [5.0, 15.0, 5.0],
    description: 'Mausoleum North-East Chamfered Corner',
  },
  {
    id: 'mausoleum-chamfer-sw',
    type: 'box',
    center: [-11.2, 10.9, -13.8],
    size: [5.0, 15.0, 5.0],
    description: 'Mausoleum South-West Chamfered Corner',
  },
  {
    id: 'mausoleum-chamfer-se',
    type: 'box',
    center: [11.2, 10.9, -13.8],
    size: [5.0, 15.0, 5.0],
    description: 'Mausoleum South-East Chamfered Corner',
  },

  // 4. Four Monumental Corner Minarets
  {
    id: 'minaret-sw',
    type: 'cylinder',
    center: [-24.5, 18.0, -0.5],
    radius: 2.1,
    height: 34.0,
    description: 'Monumental South-West Minaret',
  },
  {
    id: 'minaret-se',
    type: 'cylinder',
    center: [24.5, 18.0, -0.5],
    radius: 2.1,
    height: 34.0,
    description: 'Monumental South-East Minaret',
  },
  {
    id: 'minaret-nw',
    type: 'cylinder',
    center: [-24.5, 18.0, -49.5],
    radius: 2.1,
    height: 34.0,
    description: 'Monumental North-West Minaret',
  },
  {
    id: 'minaret-ne',
    type: 'cylinder',
    center: [24.5, 18.0, -49.5],
    radius: 2.1,
    height: 34.0,
    description: 'Monumental North-East Minaret',
  },

  // 5. Reflecting Pool Side Stone Curbs (Keep player on paved marble pathways)
  {
    id: 'pool-curb-west',
    type: 'box',
    center: [-3.4, 0.5, 36],
    size: [0.6, 1.0, 50.0],
    description: 'Reflecting Canal West Stone Curb',
  },
  {
    id: 'pool-curb-east',
    type: 'box',
    center: [3.4, 0.5, 36],
    size: [0.6, 1.0, 50.0],
    description: 'Reflecting Canal East Stone Curb',
  },
  {
    id: 'pool-curb-south',
    type: 'box',
    center: [0, 0.5, 61],
    size: [7.2, 1.0, 0.6],
    description: 'Reflecting Canal South End Curb',
  },
  {
    id: 'pool-curb-north',
    type: 'box',
    center: [0, 0.5, 11],
    size: [7.2, 1.0, 0.6],
    description: 'Reflecting Canal North End Curb',
  },
];
