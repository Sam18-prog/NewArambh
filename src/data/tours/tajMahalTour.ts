import { TourStop } from '@/types/tour';

export const TAJ_MAHAL_TOUR_STOPS: TourStop[] = [
  {
    id: 'tour-stop-1-great-gate',
    hotspotId: 'hotspot-reflecting-pool',
    name: 'The Great Gate (Darwaza-i-rauza)',
    hindiName: 'दरवाज़ा-ए-रौज़ा (शाही प्रवेश द्वार)',
    category: 'Sacred Threshold & Axis',
    stopNumber: 1,
    totalStops: 5,
    position: [0.0, 2.0, 62.0],
    lookAt: [0.0, 16.0, -25.0],
    targetYaw: 0.0, // Looking North along the reflecting canal axis
    targetPitch: 0.18,
    shortExplanation:
      'We commence our exploration at the grand southern portal of Darwaza-i-rauza. Through its vaulted arch, the radiant white marble mausoleum is framed symmetrically at the distant horizon.',
    durationSeconds: 14,
  },
  {
    id: 'tour-stop-2-reflecting-pool',
    hotspotId: 'hotspot-reflecting-pool',
    name: 'Al-Hawd al-Kawthar (Reflecting Pool)',
    hindiName: 'अल-हौज़ अल-कौसर (प्रतिबिंबित जल कुंड)',
    category: 'Hydraulic & Landscape Design',
    stopNumber: 2,
    totalStops: 5,
    position: [0.0, 1.8, 36.0],
    lookAt: [0.0, 14.0, -25.0],
    targetYaw: 0.0,
    targetPitch: 0.22,
    corridorPath: [
      [0.0, 2.0, 62.0],
      [0.0, 1.8, 48.0],
      [0.0, 1.8, 36.0],
    ],
    shortExplanation:
      'Advancing to the central marble lotus tank, observe how the crystal water mirrors the entire monument. The Charbagh four-quadrant garden represents the four rivers of paradise described in scripture.',
    durationSeconds: 15,
  },
  {
    id: 'tour-stop-3-minaret',
    hotspotId: 'hotspot-minarets',
    name: 'Corner Minaret & Seismic Engineering',
    hindiName: 'दक्षिण-पूर्वी मीनार (भूकंपीय वास्तुकला)',
    category: 'Structural & Seismic Innovation',
    stopNumber: 3,
    totalStops: 5,
    position: [18.0, 4.2, 4.0],
    lookAt: [24.5, 20.0, -0.5],
    targetYaw: -0.75, // Looking up at the South-East minaret
    targetPitch: 0.46,
    corridorPath: [
      [0.0, 1.8, 36.0],
      [8.0, 1.8, 20.0],
      [18.0, 4.2, 4.0],
    ],
    shortExplanation:
      'Standing beneath the 40-meter South-East Minaret. Notice its three tiered balconies and subtle outward tilt—engineered so that in any earthquake, the tower falls away from the sacred tomb chamber.',
    durationSeconds: 14,
  },
  {
    id: 'tour-stop-4-pishtaq',
    hotspotId: 'hotspot-pishtaq',
    name: 'The Grand Pishtaq & Calligraphy',
    hindiName: 'भव्य पिश्ताक (कुरानिक सुलेख)',
    category: 'Facade & Epigraphy',
    stopNumber: 4,
    totalStops: 5,
    position: [0.0, 4.2, -6.0],
    lookAt: [0.0, 12.0, -13.2],
    targetYaw: 0.0, // Looking directly North into the grand portal
    targetPitch: 0.38,
    corridorPath: [
      [18.0, 4.2, 4.0],
      [8.0, 4.2, 0.0],
      [0.0, 4.2, -6.0],
    ],
    shortExplanation:
      'Approaching the South Pishtaq. The monumental pointed vault is framed in black marble Quranic calligraphy designed with optical perspective correction so letters appear uniform from the ground.',
    durationSeconds: 15,
  },
  {
    id: 'tour-stop-5-dome',
    hotspotId: 'hotspot-dome',
    name: 'Central Onion Dome & Chhatris',
    hindiName: 'केंद्रीय अमृत गुंबद एवं छतरियां',
    category: 'Imperial Funerary Crown',
    stopNumber: 5,
    totalStops: 5,
    position: [-8.0, 4.2, -10.0],
    lookAt: [0.0, 26.0, -25.0],
    targetYaw: 0.35, // Looking North-East up towards the dome
    targetPitch: 0.62,
    corridorPath: [
      [0.0, 4.2, -6.0],
      [-5.0, 4.2, -8.0],
      [-8.0, 4.2, -10.0],
    ],
    shortExplanation:
      'Gazing skyward at the double-shell bulbous dome soaring 73 meters high. Flanked by four pillared chhatris and capped with a gilded bronze Kalash finial, it forms the eternal crown of the Taj Mahal.',
    durationSeconds: 16,
  },
];
