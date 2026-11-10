import { TourStop } from '@/types/tour';

export const COURTYARD_TOUR_STOPS: TourStop[] = [
  {
    id: 'tour-stop-1-torana',
    hotspotId: 'torana-gateway',
    name: 'Torana Gateway',
    hindiName: 'तोरण द्वार',
    category: 'Sacred & Ceremonial Entrances',
    stopNumber: 1,
    totalStops: 5,
    position: [0.0, 1.7, 12.0],
    lookAt: [0.0, 3.2, 16.0],
    targetYaw: Math.PI, // Looking South towards the entrance gateway
    targetPitch: 0.32,
    shortExplanation:
      'We begin our journey at the ceremonial Torana archway, the traditional sacred threshold where visitors leave secular concerns behind to enter the sanctuary precinct.',
    durationSeconds: 12,
  },
  {
    id: 'tour-stop-2-stepwell',
    hotspotId: 'baori-stepwell',
    name: 'Baori Stepwell',
    hindiName: 'पारंपरिक बावड़ी',
    category: 'Hydraulic & Subterranean Architecture',
    stopNumber: 2,
    totalStops: 5,
    position: [-11.0, 1.7, 9.5],
    lookAt: [-11.0, 0.0, 4.0],
    targetYaw: 0.0, // Looking North into the subterranean pool
    targetPitch: -0.32,
    corridorPath: [
      [0.0, 1.7, 12.0],
      [-5.5, 1.7, 10.0],
      [-11.0, 1.7, 9.5],
    ],
    shortExplanation:
      'Descending to the western courtyard, we discover the Baori stepwell—an ingenious subterranean marvel designed to preserve scarce monsoon rainwater and provide cool community retreats.',
    durationSeconds: 14,
  },
  {
    id: 'tour-stop-3-mandapa',
    hotspotId: 'mandapa-central',
    name: 'Central Mandapa',
    hindiName: 'केंद्रीय मंडप',
    category: 'Pavilion & Vault Architecture',
    stopNumber: 3,
    totalStops: 5,
    position: [0.0, 2.0, 3.8],
    lookAt: [0.0, 3.2, 0.0],
    targetYaw: 0.0, // Looking North into the central dome
    targetPitch: 0.28,
    corridorPath: [
      [-11.0, 1.7, 9.5],
      [-5.5, 1.7, 6.0],
      [0.0, 2.0, 3.8],
    ],
    shortExplanation:
      'Ascending the central octagonal plinth, we enter the Mandapa. Eight hand-carved stone columns support a corbelled lantern dome built from concentric stone rings without mortar keys.',
    durationSeconds: 15,
  },
  {
    id: 'tour-stop-4-jharokha',
    hotspotId: 'jharokha-balcony',
    name: 'Stone Jharokha',
    hindiName: 'पारंपरिक झरोखा',
    category: 'Facade & Passive Climate Architecture',
    stopNumber: 4,
    totalStops: 5,
    position: [0.0, 1.7, -11.5],
    lookAt: [0.0, 4.2, -17.2],
    targetYaw: 0.0, // Looking North towards the upper balcony
    targetPitch: 0.40,
    corridorPath: [
      [0.0, 2.0, 3.8],
      [0.0, 1.7, -4.0],
      [0.0, 1.7, -11.5],
    ],
    shortExplanation:
      'Facing the north sandstone wall, gaze up at the cantilevered Jharokha balcony. Engineered with fluted eaves and stone brackets, it creates passive air circulation while framing courtyard views.',
    durationSeconds: 14,
  },
  {
    id: 'tour-stop-5-jali',
    hotspotId: 'jali-screen',
    name: 'Jali Stonework',
    hindiName: 'उत्कीर्ण प्रस्तर जाली',
    category: 'Ornamentation & Light Modulation',
    stopNumber: 5,
    totalStops: 5,
    position: [12.0, 1.7, 0.0],
    lookAt: [17.3, 2.5, 0.0],
    targetYaw: -Math.PI / 2, // Looking East towards the carved gallery
    targetPitch: 0.15,
    corridorPath: [
      [0.0, 1.7, -11.5],
      [6.0, 1.7, -6.0],
      [12.0, 1.7, 0.0],
    ],
    shortExplanation:
      'Our final stop brings us to the East Colonnade’s geometric Jali screen. Carved from solid stone, its intricate openwork accelerates desert breezes via the Venturi effect, diffusing harsh glare into soft light.',
    durationSeconds: 15,
  },
];
