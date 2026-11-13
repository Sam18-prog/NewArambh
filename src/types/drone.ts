export interface DroneFlightBounds {
  minX: number;
  maxX: number;
  minY: number; // minimum altitude (ground clearance or subterranean depth)
  maxY: number; // ceiling altitude (permits high aerial flyovers)
  minZ: number;
  maxZ: number;
}

export interface DronePreset {
  id: string;
  label: string;
  position: [number, number, number];
  target: [number, number, number];
  description?: string;
}

export interface DestinationDroneConfig {
  destinationId: string;
  spawnPosition: [number, number, number];
  spawnLookAt: [number, number, number];
  boundaries: DroneFlightBounds;
  normalSpeed: number; // m/s
  turboSpeed: number;  // m/s
  verticalSpeed: number; // m/s
  presets: DronePreset[];
}

export interface DroneTelemetry {
  position: [number, number, number];
  altitude: number; // relative scene height in meters
  speedMode: 'normal' | 'turbo';
  currentSpeed: number;
  heading: number; // degrees 0-360
  activePresetId?: string;
  isNearLandmark?: boolean;
  nearbyLandmarkName?: string;
}

export interface DroneMovementInput {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
  ascend: boolean;
  descend: boolean;
  turbo: boolean;
  lookYaw: number;
  lookPitch: number;
}
