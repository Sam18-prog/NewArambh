import * as THREE from 'three';
import {
  SceneCollider,
  BoundingBoxCollider,
  CylinderCollider,
  StepCollider,
  PlayerCollisionConfig,
} from '@/types/collision';

export interface MovementResolutionResult {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  groundElevation: number;
  hasCollided: boolean;
  collidedWith: string[];
}

export class CollisionEngine {
  private colliders: SceneCollider[];
  private playerConfig: PlayerCollisionConfig;

  // Scratch variables to avoid runtime allocations
  private tempPos: THREE.Vector3 = new THREE.Vector3();
  private tempVel: THREE.Vector3 = new THREE.Vector3();

  constructor(colliders: SceneCollider[], playerConfig: PlayerCollisionConfig) {
    this.colliders = colliders;
    this.playerConfig = playerConfig;
  }

  public setColliders(colliders: SceneCollider[]): void {
    this.colliders = colliders;
  }

  /**
   * Resolves horizontal locomotion movement, obstacle collisions,
   * tangent wall-sliding, and step/plinth elevation.
   *
   * @param currentPos Current world position of player (at eye level)
   * @param velocity Current instantaneous velocity
   * @param dt Delta time in seconds
   * @param subSteps Number of integration sub-steps for tunnel prevention (default 2)
   */
  public resolveMovement(
    currentPos: THREE.Vector3,
    velocity: THREE.Vector3,
    dt: number,
    subSteps = 2
  ): MovementResolutionResult {
    this.tempPos.copy(currentPos);
    this.tempVel.copy(velocity);

    const subDt = dt / subSteps;
    const collidedIds = new Set<string>();
    let anyCollision = false;

    const playerRadius = this.playerConfig.radius;
    const playerHeight = this.playerConfig.height;

    for (let step = 0; step < subSteps; step++) {
      // 1. Proposed horizontal translation
      this.tempPos.x += this.tempVel.x * subDt;
      this.tempPos.z += this.tempVel.z * subDt;

      // Player vertical interval (feet to head)
      const playerHeadY = this.tempPos.y;
      const playerFeetY = playerHeadY - playerHeight;

      // 2. Resolve against all static scene colliders
      for (let i = 0; i < this.colliders.length; i++) {
        const collider = this.colliders[i];

        if (collider.type === 'cylinder') {
          const hit = this.resolveCylinder(collider, playerRadius, playerFeetY, playerHeadY);
          if (hit) {
            anyCollision = true;
            collidedIds.add(collider.id);
          }
        } else if (collider.type === 'box') {
          const hit = this.resolveBox(collider, playerRadius, playerFeetY, playerHeadY);
          if (hit) {
            anyCollision = true;
            collidedIds.add(collider.id);
          }
        }
      }
    }

    // 3. Resolve Ground / Step Elevation (Mandapa Plinth, Stairs, Terraces)
    const groundElevation = this.resolveGroundElevation(this.tempPos.x, this.tempPos.z);

    return {
      position: this.tempPos.clone(),
      velocity: this.tempVel.clone(),
      groundElevation,
      hasCollided: anyCollision,
      collidedWith: Array.from(collidedIds),
    };
  }

  /**
   * Resolves collision and sliding against vertical cylinder obstacles (Pillars, Columns, Lamps).
   */
  private resolveCylinder(
    collider: CylinderCollider,
    playerRadius: number,
    playerFeetY: number,
    playerHeadY: number
  ): boolean {
    const [cx, cy, cz] = collider.center;
    const cylMinY = cy - collider.height / 2;
    const cylMaxY = cy + collider.height / 2;

    // Vertical overlap check
    if (playerHeadY < cylMinY || playerFeetY > cylMaxY) {
      return false;
    }

    // Horizontal distance in XZ plane
    const dx = this.tempPos.x - cx;
    const dz = this.tempPos.z - cz;
    const distSq = dx * dx + dz * dz;
    const minDist = playerRadius + collider.radius;

    if (distSq < minDist * minDist) {
      const dist = Math.sqrt(distSq);

      // Collision normal pointing away from cylinder center to player
      let nx = 1;
      let nz = 0;
      if (dist > 0.0001) {
        nx = dx / dist;
        nz = dz / dist;
      }

      // Push player outside cylinder boundary
      const penetration = minDist - dist;
      this.tempPos.x += nx * penetration;
      this.tempPos.z += nz * penetration;

      // Tangent sliding: eliminate velocity heading directly into obstacle
      const dot = this.tempVel.x * nx + this.tempVel.z * nz;
      if (dot < 0) {
        this.tempVel.x -= dot * nx;
        this.tempVel.z -= dot * nz;
      }

      return true;
    }

    return false;
  }

  /**
   * Resolves collision and sliding against axis-aligned box obstacles (Walls, Balustrades, Stepwell rims).
   */
  private resolveBox(
    collider: BoundingBoxCollider,
    playerRadius: number,
    playerFeetY: number,
    playerHeadY: number
  ): boolean {
    const [bx, by, bz] = collider.center;
    const [sx, sy, sz] = collider.size;

    const minX = bx - sx / 2;
    const maxX = bx + sx / 2;
    const minY = by - sy / 2;
    const maxY = by + sy / 2;
    const minZ = bz - sz / 2;
    const maxZ = bz + sz / 2;

    // Vertical overlap check
    if (playerHeadY < minY || playerFeetY > maxY) {
      return false;
    }

    // Find closest point on box rectangle to player center in XZ plane
    const closestX = Math.max(minX, Math.min(maxX, this.tempPos.x));
    const closestZ = Math.max(minZ, Math.min(maxZ, this.tempPos.z));

    const dx = this.tempPos.x - closestX;
    const dz = this.tempPos.z - closestZ;
    const distSq = dx * dx + dz * dz;

    // Check if player center is strictly inside the box volume
    const isInside =
      this.tempPos.x >= minX &&
      this.tempPos.x <= maxX &&
      this.tempPos.z >= minZ &&
      this.tempPos.z <= maxZ;

    if (isInside) {
      // Find closest face to eject player safely
      const dMinX = this.tempPos.x - minX;
      const dMaxX = maxX - this.tempPos.x;
      const dMinZ = this.tempPos.z - minZ;
      const dMaxZ = maxZ - this.tempPos.z;

      const minPenetration = Math.min(dMinX, dMaxX, dMinZ, dMaxZ);

      let nx = 0;
      let nz = 0;

      if (minPenetration === dMinX) {
        nx = -1;
        this.tempPos.x = minX - playerRadius;
      } else if (minPenetration === dMaxX) {
        nx = 1;
        this.tempPos.x = maxX + playerRadius;
      } else if (minPenetration === dMinZ) {
        nz = -1;
        this.tempPos.z = minZ - playerRadius;
      } else {
        nz = 1;
        this.tempPos.z = maxZ + playerRadius;
      }

      // Damp velocity along collision normal
      const dot = this.tempVel.x * nx + this.tempVel.z * nz;
      if (dot < 0) {
        this.tempVel.x -= dot * nx;
        this.tempVel.z -= dot * nz;
      }

      return true;
    }

    // Player is outside box, check sphere-to-box distance
    if (distSq < playerRadius * playerRadius) {
      const dist = Math.sqrt(distSq);

      let nx = 1;
      let nz = 0;
      if (dist > 0.0001) {
        nx = dx / dist;
        nz = dz / dist;
      }

      const penetration = playerRadius - dist;
      this.tempPos.x += nx * penetration;
      this.tempPos.z += nz * penetration;

      // Tangent sliding
      const dot = this.tempVel.x * nx + this.tempVel.z * nz;
      if (dot < 0) {
        this.tempVel.x -= dot * nx;
        this.tempVel.z -= dot * nz;
      }

      return true;
    }

    return false;
  }

  /**
   * Computes the current ground height under player footprint.
   * Enables climbing low steps and plinths up to maxStepHeight.
   */
  private resolveGroundElevation(px: number, pz: number): number {
    let maxElevation = 0; // Default courtyard floor is at Y = 0.0

    for (let i = 0; i < this.colliders.length; i++) {
      const collider = this.colliders[i];
      if (collider.type === 'step') {
        const step = collider as StepCollider;
        const [sx, sy, sz] = step.center;
        const [w, h, d] = step.size;

        const minX = sx - w / 2;
        const maxX = sx + w / 2;
        const minZ = sz - d / 2;
        const maxZ = sz + d / 2;

        // If player is on top of this step footprint
        if (px >= minX && px <= maxX && pz >= minZ && pz <= maxZ) {
          const stepTopY = sy + h / 2;
          if (stepTopY <= this.playerConfig.maxStepHeight + maxElevation) {
            if (stepTopY > maxElevation) {
              maxElevation = stepTopY;
            }
          }
        }
      }
    }

    return maxElevation;
  }
}
