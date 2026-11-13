import { DestinationThreeConfig } from '@/types/destination';
import { TAJ_MAHAL_COLLIDERS } from './tajMahalColliders';
import { SceneCollider } from '@/types/collision';
import { getDestinationDroneConfig } from './droneConfigs';

/**
 * Standard colliders for each destination's architectural footprint
 */

// 2. Red Fort Colliders
const RED_FORT_COLLIDERS: SceneCollider[] = [
  // Outer perimeter rampart walls
  { id: 'rf-wall-west', type: 'box', center: [-42, 6, 0], size: [2, 12, 90], description: 'West Rampart' },
  { id: 'rf-wall-east', type: 'box', center: [42, 6, 0], size: [2, 12, 90], description: 'East Rampart' },
  { id: 'rf-wall-north', type: 'box', center: [0, 6, -42], size: [84, 12, 2], description: 'North Rampart' },
  { id: 'rf-wall-south', type: 'box', center: [0, 6, 48], size: [84, 12, 2], description: 'South Rampart' },
  // Lahori Gate gatehouse flanks
  { id: 'rf-lahori-left', type: 'box', center: [-12, 7, 28], size: [12, 14, 8], description: 'Lahori Gate Left Bastion' },
  { id: 'rf-lahori-right', type: 'box', center: [12, 7, 28], size: [12, 14, 8], description: 'Lahori Gate Right Bastion' },
  // Diwan-i-Aam pillared hall
  { id: 'rf-diwan-aam-back', type: 'box', center: [0, 5, -26], size: [32, 10, 4], description: 'Diwan-i-Aam Rear Wall' },
  // Diwan-i-Khas marble pavilion
  { id: 'rf-diwan-khas', type: 'box', center: [18, 5, -34], size: [16, 9, 14], description: 'Diwan-i-Khas Marble Hall' },
];

// 3. Agra Fort Colliders
const AGRA_FORT_COLLIDERS: SceneCollider[] = [
  { id: 'af-wall-west', type: 'box', center: [-42, 7, 0], size: [2.5, 14, 85], description: 'Outer Red Sandstone Curtain' },
  { id: 'af-wall-east', type: 'box', center: [42, 7, 0], size: [2.5, 14, 85], description: 'Yamuna Riverfront Rampart' },
  { id: 'af-wall-north', type: 'box', center: [0, 7, -42], size: [85, 14, 2.5], description: 'North Rampart' },
  { id: 'af-gate-amar-left', type: 'cylinder', center: [-8, 8, 25], radius: 5, height: 16, description: 'Amar Singh Gate Bastion Left' },
  { id: 'af-gate-amar-right', type: 'cylinder', center: [8, 8, 25], radius: 5, height: 16, description: 'Amar Singh Gate Bastion Right' },
  { id: 'af-jahangiri-mahal', type: 'box', center: [-18, 7, -8], size: [24, 13, 26], description: 'Jahangiri Mahal Palace Block' },
  { id: 'af-khas-mahal', type: 'box', center: [18, 6, -24], size: [20, 11, 18], description: 'Khas Mahal Pavilion' },
];

// 4. Rani-ki-Vav Colliders
const RANI_KI_VAV_COLLIDERS: SceneCollider[] = [
  // Stepped corridor side walls (prevent falling off the stepped trench)
  { id: 'rkv-wall-north', type: 'box', center: [0, 2, -18], size: [68, 8, 1.5], description: 'North Retaining Wall' },
  { id: 'rkv-wall-south', type: 'box', center: [0, 2, 18], size: [68, 8, 1.5], description: 'South Retaining Wall' },
  // Circular deep well shaft at western end
  { id: 'rkv-well-shaft', type: 'cylinder', center: [0, -4, -32], radius: 6.5, height: 16, description: 'Circular Well Shaft Boundary' },
];

// 5. Dholavira Colliders
const DHOLAVIRA_COLLIDERS: SceneCollider[] = [
  { id: 'dh-citadel-castle', type: 'box', center: [-22, 5, -14], size: [30, 9, 32], description: 'Citadel Castle Stone Bastion' },
  { id: 'dh-bailey', type: 'box', center: [-22, 3, 16], size: [24, 6, 20], description: 'Bailey Stone Rampart' },
  { id: 'dh-reservoir-wall', type: 'box', center: [24, 2, 12], size: [26, 4, 38], description: 'Rock-Cut Reservoir Parapet' },
  { id: 'dh-middle-town', type: 'box', center: [0, 3, -36], size: [48, 5, 20], description: 'Middle Town Residential Walls' },
];

// 6. Champaner-Pavagadh Colliders
const CHAMPANER_COLLIDERS: SceneCollider[] = [
  { id: 'ch-jami-sanctuary', type: 'box', center: [0, 6, -18], size: [38, 12, 14], description: 'Jami Masjid Main Prayer Hall' },
  { id: 'ch-minaret-left', type: 'cylinder', center: [-11, 14, 6], radius: 2.2, height: 28, description: 'Left 30m Fluted Minaret' },
  { id: 'ch-minaret-right', type: 'cylinder', center: [11, 14, 6], radius: 2.2, height: 28, description: 'Right 30m Fluted Minaret' },
  { id: 'ch-courtyard-wall-west', type: 'box', center: [-28, 3, 10], size: [1.8, 6, 50], description: 'Cloister Arcaded Wall' },
  { id: 'ch-courtyard-wall-east', type: 'box', center: [28, 3, 10], size: [1.8, 6, 50], description: 'Cloister Arcaded Wall' },
];

// 7. Sarnath Colliders
const SARNATH_COLLIDERS: SceneCollider[] = [
  { id: 'sn-dhamek-core', type: 'cylinder', center: [0, 14, 0], radius: 14, height: 28, description: 'Dhamek Stupa Solid Core' },
  { id: 'sn-ashoka-pedestal', type: 'cylinder', center: [-18, 2, -12], radius: 2.5, height: 4, description: 'Ashoka Pillar Enclosure' },
  { id: 'sn-monastery-foundations', type: 'box', center: [18, 2, -18], size: [18, 3, 24], description: 'Dharmarajika Vihara Ruin Block' },
  { id: 'sn-chaukhandi-mound', type: 'box', center: [0, 6, -38], size: [28, 11, 28], description: 'Chaukhandi Stupa Terraced Mound' },
];

// 8. Somnath Colliders
const SOMNATH_COLLIDERS: SceneCollider[] = [
  { id: 'sm-shikhara-sanctum', type: 'box', center: [0, 14, -12], size: [18, 28, 18], description: 'Garbhagriha & 155ft Shikhara Spire' },
  { id: 'sm-sabha-mandap', type: 'box', center: [0, 7, 6], size: [22, 13, 18], description: 'Pillared Sabha Mandap Hall' },
  { id: 'sm-digvijay-gate-left', type: 'box', center: [-10, 6, 36], size: [8, 11, 6], description: 'Digvijay Dwar Left Gatehouse' },
  { id: 'sm-digvijay-gate-right', type: 'box', center: [10, 6, 36], size: [8, 11, 6], description: 'Digvijay Dwar Right Gatehouse' },
  { id: 'sm-sea-promenade-wall', type: 'box', center: [0, 2, -34], size: [80, 4, 2], description: 'Arabian Sea Coast Parapet' },
  { id: 'sm-baan-stambh', type: 'cylinder', center: [24, 5, -28], radius: 1.2, height: 10, description: 'Historic Baan Stambh Arrow Pillar' },
];

// 9. Dwarkadhish Colliders
const DWARKADHISH_COLLIDERS: SceneCollider[] = [
  { id: 'dw-jagat-mandir-core', type: 'box', center: [0, 16, -8], size: [20, 32, 20], description: 'Jagat Mandir 78m Shikhara' },
  { id: 'dw-mandap-72-pillars', type: 'box', center: [0, 7, 8], size: [24, 13, 16], description: '72-Pillared Sabha Mandap' },
  { id: 'dw-swarga-dwar-gate', type: 'box', center: [0, 5, 32], size: [16, 9, 6], description: 'Swarga Dwar 56-Step Entry Gate' },
  { id: 'dw-moksha-dwar', type: 'box', center: [16, 5, -8], size: [6, 9, 12], description: 'Moksha Dwar Northern Exit' },
  { id: 'dw-gomti-river-wall', type: 'box', center: [-26, 2, 0], size: [2, 5, 60], description: 'Gomti Riverfront Ghat Parapet' },
];

export const DESTINATION_SCENE_CONFIGS: Record<string, DestinationThreeConfig> = {
  'taj-mahal': {
    spawnPosition: [0, 1.8, 52],
    spawnLookAt: [0, 8, -25],
    boundaries: { minX: -48, maxX: 48, minZ: -56, maxZ: 66 },
    allowJump: true,
    modelUrl: '/models/taj-mahal/scene.glb',
    colliders: TAJ_MAHAL_COLLIDERS,
    skyPreset: 'daylight',
    cameraPresets: {
      panoramic: { position: [0, 22, 70], target: [0, 10, -25] },
      mausoleum: { position: [0, 6, 8], target: [0, 10, -25] },
      pool: { position: [0, 3, 52], target: [0, 1.5, 36] },
      gate: { position: [0, 4, 58], target: [0, 7.5, 68] },
    },
  },
  'red-fort': {
    spawnPosition: [0, 1.8, 44],
    spawnLookAt: [0, 6, 0],
    boundaries: { minX: -42, maxX: 42, minZ: -42, maxZ: 50 },
    allowJump: true,
    colliders: RED_FORT_COLLIDERS,
    skyPreset: 'sunset',
    cameraPresets: {
      panoramic: { position: [0, 24, 62], target: [0, 8, 0] },
      lahoriGate: { position: [0, 8, 38], target: [0, 11, 26] },
      diwanIAam: { position: [0, 5, -8], target: [0, 6, -24] },
      diwanIKhas: { position: [16, 5, -28], target: [16, 5, -34] },
    },
  },
  'agra-fort': {
    spawnPosition: [0, 1.8, 38],
    spawnLookAt: [0, 5, 0],
    boundaries: { minX: -42, maxX: 42, minZ: -42, maxZ: 48 },
    allowJump: true,
    colliders: AGRA_FORT_COLLIDERS,
    skyPreset: 'daylight',
    cameraPresets: {
      panoramic: { position: [0, 25, 58], target: [0, 8, 0] },
      amarSinghGate: { position: [0, 8, 32], target: [0, 8, 22] },
      jahangiriMahal: { position: [-15, 6, 0], target: [-15, 6, -12] },
      khasMahal: { position: [15, 6, -16], target: [15, 6, -26] },
    },
  },
  'rani-ki-vav': {
    spawnPosition: [0, 1.8, 34],
    spawnLookAt: [0, -3, 0],
    boundaries: { minX: -16, maxX: 16, minZ: -38, maxZ: 38 },
    allowJump: false,
    colliders: RANI_KI_VAV_COLLIDERS,
    skyPreset: 'daylight',
    cameraPresets: {
      panoramic: { position: [0, 18, 42], target: [0, -4, 0] },
      descent: { position: [0, 3, 28], target: [0, -2, 10] },
      vishnuNiche: { position: [0, -3, -8], target: [0, -4, -18] },
      wellShaft: { position: [0, 2, -28], target: [0, -7, -30] },
    },
  },
  'dholavira': {
    spawnPosition: [0, 1.8, 38],
    spawnLookAt: [0, 4, 0],
    boundaries: { minX: -50, maxX: 50, minZ: -50, maxZ: 50 },
    allowJump: true,
    colliders: DHOLAVIRA_COLLIDERS,
    skyPreset: 'desert',
    cameraPresets: {
      panoramic: { position: [0, 24, 56], target: [0, 4, 0] },
      citadelCastle: { position: [-18, 7, 8], target: [-18, 5, -12] },
      reservoir: { position: [22, 4, 18], target: [22, -1, 0] },
      middleTown: { position: [0, 5, -18], target: [0, 3, -32] },
    },
  },
  'champaner-pavagadh': {
    spawnPosition: [0, 1.8, 36],
    spawnLookAt: [0, 8, 0],
    boundaries: { minX: -38, maxX: 38, minZ: -38, maxZ: 42 },
    allowJump: true,
    colliders: CHAMPANER_COLLIDERS,
    skyPreset: 'sunset',
    cameraPresets: {
      panoramic: { position: [0, 22, 52], target: [0, 8, 0] },
      minarets: { position: [0, 8, 22], target: [0, 14, 6] },
      prayerHall: { position: [0, 4, -2], target: [0, 5, -16] },
      pavagadhHill: { position: [0, 14, -8], target: [0, 35, -80] },
    },
  },
  'sarnath': {
    spawnPosition: [0, 1.8, 38],
    spawnLookAt: [0, 10, 0],
    boundaries: { minX: -42, maxX: 42, minZ: -42, maxZ: 46 },
    allowJump: true,
    colliders: SARNATH_COLLIDERS,
    skyPreset: 'daylight',
    cameraPresets: {
      panoramic: { position: [0, 22, 56], target: [0, 10, 0] },
      dhamekStupa: { position: [0, 5, 20], target: [0, 11, 0] },
      ashokaPillar: { position: [-15, 3, 4], target: [-15, 3, -8] },
      chaukhandiStupa: { position: [18, 7, -18], target: [18, 10, -32] },
    },
  },
  'somnath': {
    spawnPosition: [0, 1.8, 38],
    spawnLookAt: [0, 10, 0],
    boundaries: { minX: -42, maxX: 42, minZ: -42, maxZ: 48 },
    allowJump: false,
    colliders: SOMNATH_COLLIDERS,
    skyPreset: 'coastal',
    cameraPresets: {
      panoramic: { position: [0, 24, 58], target: [0, 10, 0] },
      shikhara: { position: [0, 6, 18], target: [0, 16, -10] },
      sabhaMandap: { position: [0, 4, 10], target: [0, 5, -2] },
      baanStambh: { position: [22, 4, -18], target: [22, 4, -40] },
    },
  },
  'dwarkadhish': {
    spawnPosition: [0, 1.8, 36],
    spawnLookAt: [0, 10, 0],
    boundaries: { minX: -38, maxX: 38, minZ: -38, maxZ: 42 },
    allowJump: false,
    colliders: DWARKADHISH_COLLIDERS,
    skyPreset: 'coastal',
    cameraPresets: {
      panoramic: { position: [0, 24, 54], target: [0, 11, 0] },
      jagatMandir: { position: [0, 7, 18], target: [0, 16, -6] },
      dhwajaSpire: { position: [0, 11, 14], target: [0, 24, -6] },
      gomtiGhat: { position: [-18, 4, 16], target: [-18, 0, 32] },
    },
  },
};

export function getDestinationThreeConfig(destinationId: string): DestinationThreeConfig {
  const normalized = destinationId.replace(/-temple$/, '');
  const config = DESTINATION_SCENE_CONFIGS[normalized] || DESTINATION_SCENE_CONFIGS['taj-mahal'];
  return {
    ...config,
    droneConfig: getDestinationDroneConfig(normalized),
  };
}
