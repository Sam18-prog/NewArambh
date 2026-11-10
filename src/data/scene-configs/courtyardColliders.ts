import { SceneCollider, PlayerCollisionConfig } from '@/types/collision';

export const DEFAULT_PLAYER_COLLIDER_CONFIG: PlayerCollisionConfig = {
  radius: 0.45, // Capsule collision radius in meters
  height: 1.7, // Total height
  eyeHeight: 1.7, // Camera view height above current ground surface
  maxStepHeight: 0.35, // Can climb plinths/steps up to 35cm smoothly
};

export const COURTYARD_COLLIDERS: SceneCollider[] = [
  // 1. Perimeter Walls (Prevent exiting the courtyard)
  {
    id: 'wall-north',
    type: 'box',
    center: [0, 3.75, -18],
    size: [38, 7.5, 1.4],
    description: 'North Sandstone Wall & Jharokha Base',
  },
  {
    id: 'wall-east',
    type: 'box',
    center: [18, 3.75, 0],
    size: [1.4, 7.5, 38],
    description: 'East Colonnaded Wall',
  },
  {
    id: 'wall-west',
    type: 'box',
    center: [-18, 3.75, 0],
    size: [1.4, 7.5, 38],
    description: 'West Colonnaded Wall',
  },
  {
    id: 'wall-south',
    type: 'box',
    center: [0, 1.5, 19],
    size: [38, 3.0, 1.4],
    description: 'South Perimeter Balustrade',
  },

  // 2. The 8 Mandapa Pillars (Pillared Hall Columns)
  {
    id: 'pillar-mandapa-0',
    type: 'cylinder',
    center: [4.6, 2.4, 0],
    radius: 0.48,
    height: 4.8,
    description: 'Mandapa Column East',
  },
  {
    id: 'pillar-mandapa-1',
    type: 'cylinder',
    center: [3.25, 2.4, 3.25],
    radius: 0.48,
    height: 4.8,
    description: 'Mandapa Column South-East',
  },
  {
    id: 'pillar-mandapa-2',
    type: 'cylinder',
    center: [0, 2.4, 4.6],
    radius: 0.48,
    height: 4.8,
    description: 'Mandapa Column South',
  },
  {
    id: 'pillar-mandapa-3',
    type: 'cylinder',
    center: [-3.25, 2.4, 3.25],
    radius: 0.48,
    height: 4.8,
    description: 'Mandapa Column South-West',
  },
  {
    id: 'pillar-mandapa-4',
    type: 'cylinder',
    center: [-4.6, 2.4, 0],
    radius: 0.48,
    height: 4.8,
    description: 'Mandapa Column West',
  },
  {
    id: 'pillar-mandapa-5',
    type: 'cylinder',
    center: [-3.25, 2.4, -3.25],
    radius: 0.48,
    height: 4.8,
    description: 'Mandapa Column North-West',
  },
  {
    id: 'pillar-mandapa-6',
    type: 'cylinder',
    center: [0, 2.4, -4.6],
    radius: 0.48,
    height: 4.8,
    description: 'Mandapa Column North',
  },
  {
    id: 'pillar-mandapa-7',
    type: 'cylinder',
    center: [3.25, 2.4, -3.25],
    radius: 0.48,
    height: 4.8,
    description: 'Mandapa Column North-East',
  },

  // 3. Torana Ceremonial Gateway Columns
  {
    id: 'column-torana-left',
    type: 'cylinder',
    center: [-3.5, 3.1, 16],
    radius: 0.58,
    height: 6.2,
    description: 'Torana Gateway Column Left',
  },
  {
    id: 'column-torana-right',
    type: 'cylinder',
    center: [3.5, 3.1, 16],
    radius: 0.58,
    height: 6.2,
    description: 'Torana Gateway Column Right',
  },

  // 4. Baori Stepwell Protective Rim Walls (Keeps player from falling into deep pool)
  {
    id: 'stepwell-rim-north',
    type: 'box',
    center: [-11, 0.4, -0.4],
    size: [9.2, 0.8, 0.5],
    description: 'Baori Stepwell North Rim',
  },
  {
    id: 'stepwell-rim-south',
    type: 'box',
    center: [-11, 0.4, 8.4],
    size: [9.2, 0.8, 0.5],
    description: 'Baori Stepwell South Rim',
  },
  {
    id: 'stepwell-rim-east',
    type: 'box',
    center: [-6.6, 0.4, 4],
    size: [0.5, 0.8, 9.2],
    description: 'Baori Stepwell East Rim',
  },
  {
    id: 'stepwell-rim-west',
    type: 'box',
    center: [-15.4, 0.4, 4],
    size: [0.5, 0.8, 9.2],
    description: 'Baori Stepwell West Rim',
  },

  // 5. Brass Diya Oil Lamp Stands around Mandapa
  {
    id: 'lamp-diya-1',
    type: 'cylinder',
    center: [-3.2, 0.6, -3.2],
    radius: 0.35,
    height: 1.4,
    description: 'Brass Oil Lamp Stand NW',
  },
  {
    id: 'lamp-diya-2',
    type: 'cylinder',
    center: [3.2, 0.6, -3.2],
    radius: 0.35,
    height: 1.4,
    description: 'Brass Oil Lamp Stand NE',
  },
  {
    id: 'lamp-diya-3',
    type: 'cylinder',
    center: [-3.2, 0.6, 3.2],
    radius: 0.35,
    height: 1.4,
    description: 'Brass Oil Lamp Stand SW',
  },
  {
    id: 'lamp-diya-4',
    type: 'cylinder',
    center: [3.2, 0.6, 3.2],
    radius: 0.35,
    height: 1.4,
    description: 'Brass Oil Lamp Stand SE',
  },

  // 6. Central Mandapa Raised Plinth (Climbable 30cm step)
  {
    id: 'mandapa-plinth-step',
    type: 'step',
    center: [0, 0.15, 0],
    size: [11.6, 0.3, 11.6],
    stepHeight: 0.3,
    description: 'Central Mandapa Octagonal Raised Plinth',
  },
];
