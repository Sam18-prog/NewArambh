export interface BoundingBoxCollider {
  id: string;
  type: 'box';
  center: [number, number, number]; // [x, y, z]
  size: [number, number, number]; // [width, height, depth]
  description?: string;
}

export interface CylinderCollider {
  id: string;
  type: 'cylinder';
  center: [number, number, number]; // [x, y, z]
  radius: number;
  height: number;
  description?: string;
}

export interface StepCollider {
  id: string;
  type: 'step';
  center: [number, number, number];
  size: [number, number, number];
  stepHeight: number;
  description?: string;
}

export type SceneCollider = BoundingBoxCollider | CylinderCollider | StepCollider;

export interface PlayerCollisionConfig {
  radius: number;
  height: number;
  eyeHeight: number;
  maxStepHeight: number;
}
