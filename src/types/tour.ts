export interface TourStop {
  id: string;
  hotspotId: string;
  name: string;
  hindiName?: string;
  category: string;
  stopNumber: number;
  totalStops: number;
  position: [number, number, number]; // Safe camera/player position
  lookAt: [number, number, number]; // Landmark focus point
  targetYaw: number;
  targetPitch: number;
  corridorPath?: [number, number, number][]; // Safe intermediate waypoints
  shortExplanation: string;
  durationSeconds?: number;
}

export type TourState = 'idle' | 'moving' | 'viewing' | 'completed';
