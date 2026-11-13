import * as THREE from 'three';
import { DroneFlightBounds, DroneMovementInput } from '@/types/drone';
import { SceneCollider } from '@/types/collision';

export interface DronePhysicsState {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  yaw: number;
  pitch: number;
  roll: number;
  targetRoll: number;
  hoverTime: number;
  currentSpeed: number;
}

export class DroneMovementSystem {
  private bounds: DroneFlightBounds;
  private colliders: SceneCollider[];
  private normalSpeed: number;
  private turboSpeed: number;
  private verticalSpeed: number;

  constructor(
    bounds: DroneFlightBounds,
    colliders: SceneCollider[] = [],
    normalSpeed = 8.0,
    turboSpeed = 18.0,
    verticalSpeed = 6.0
  ) {
    this.bounds = bounds;
    this.colliders = colliders;
    this.normalSpeed = normalSpeed;
    this.turboSpeed = turboSpeed;
    this.verticalSpeed = verticalSpeed;
  }

  public update(
    state: DronePhysicsState,
    input: DroneMovementInput,
    delta: number
  ): DronePhysicsState {
    const clampedDelta = Math.min(delta, 0.1); // Guard against huge frame pauses
    state.hoverTime += clampedDelta;

    // 1. Determine active speed factor
    const moveSpeed = input.turbo ? this.turboSpeed : this.normalSpeed;
    const vertSpeed = input.turbo ? this.verticalSpeed * 1.5 : this.verticalSpeed;

    // 2. Compute camera-relative forward and strafe directions (on horizontal plane)
    const forward = new THREE.Vector3(-Math.sin(state.yaw), 0, -Math.cos(state.yaw)).normalize();
    const right = new THREE.Vector3(Math.cos(state.yaw), 0, -Math.sin(state.yaw)).normalize();

    // 3. Compute target translational velocity
    const targetVelocity = new THREE.Vector3(0, 0, 0);

    if (input.forward) targetVelocity.add(forward);
    if (input.backward) targetVelocity.sub(forward);
    if (input.right) targetVelocity.add(right);
    if (input.left) targetVelocity.sub(right);

    if (targetVelocity.lengthSq() > 0) {
      targetVelocity.normalize().multiplyScalar(moveSpeed);
    }

    // 4. Compute vertical target velocity (Ascend / Descend)
    let targetVy = 0;
    if (input.ascend) targetVy += vertSpeed;
    if (input.descend) targetVy -= vertSpeed;
    targetVelocity.y = targetVy;

    // 5. Smooth acceleration and deceleration (lerp velocity)
    const accelRate = targetVelocity.lengthSq() > 0 ? 8.0 : 6.0;
    state.velocity.lerp(targetVelocity, 1 - Math.exp(-accelRate * clampedDelta));

    // 6. Natural subtle hovering micro-motion when nearly stationary
    const isStationary = state.velocity.lengthSq() < 0.1;
    let hoverOffsetY = 0;
    if (isStationary) {
      hoverOffsetY = Math.sin(state.hoverTime * 1.5) * 0.025;
    }

    // 7. Update position
    state.position.x += state.velocity.x * clampedDelta;
    state.position.y += (state.velocity.y + hoverOffsetY) * clampedDelta;
    state.position.z += state.velocity.z * clampedDelta;

    // 8. Subtle bank / roll angle when strafing (capped at ±4 degrees = ~0.07 rad)
    let strafeInput = 0;
    if (input.right) strafeInput -= 1;
    if (input.left) strafeInput += 1;
    state.targetRoll = strafeInput * 0.055;
    state.roll = THREE.MathUtils.lerp(state.roll, state.targetRoll, 1 - Math.exp(-6.0 * clampedDelta));

    // 9. Apply destination boundary constraints
    this.applyBoundaries(state.position, state.velocity);

    // 10. Architectural proximity avoidance (soft repulsion from colliders)
    this.avoidColliders(state.position, state.velocity);

    // 11. Compute scalar current speed for telemetry
    state.currentSpeed = state.velocity.length();

    return state;
  }

  private applyBoundaries(pos: THREE.Vector3, vel: THREE.Vector3): void {
    if (pos.x < this.bounds.minX) {
      pos.x = this.bounds.minX;
      vel.x = Math.max(0, vel.x);
    } else if (pos.x > this.bounds.maxX) {
      pos.x = this.bounds.maxX;
      vel.x = Math.min(0, vel.x);
    }

    if (pos.y < this.bounds.minY) {
      pos.y = this.bounds.minY;
      vel.y = Math.max(0, vel.y);
    } else if (pos.y > this.bounds.maxY) {
      pos.y = this.bounds.maxY;
      vel.y = Math.min(0, vel.y);
    }

    if (pos.z < this.bounds.minZ) {
      pos.z = this.bounds.minZ;
      vel.z = Math.max(0, vel.z);
    } else if (pos.z > this.bounds.maxZ) {
      pos.z = this.bounds.maxZ;
      vel.z = Math.min(0, vel.z);
    }
  }

  private avoidColliders(pos: THREE.Vector3, vel: THREE.Vector3): void {
    const clearance = 2.2; // Safe distance around walls/domes

    for (const collider of this.colliders) {
      if (collider.type === 'box' && collider.size) {
        const [cx, cy, cz] = collider.center;
        const [sx, sy, sz] = collider.size;
        const hx = sx / 2 + clearance;
        const hy = sy / 2 + clearance;
        const hz = sz / 2 + clearance;

        if (
          pos.x > cx - hx &&
          pos.x < cx + hx &&
          pos.y > cy - hy &&
          pos.y < cy + hy &&
          pos.z > cz - hz &&
          pos.z < cz + hz
        ) {
          // Inside collision clearance zone: push out along minimal penetration axis
          const dx1 = pos.x - (cx - hx);
          const dx2 = cx + hx - pos.x;
          const dy1 = pos.y - (cy - hy);
          const dy2 = cy + hy - pos.y;
          const dz1 = pos.z - (cz - hz);
          const dz2 = cz + hz - pos.z;

          const minD = Math.min(dx1, dx2, dy1, dy2, dz1, dz2);

          if (minD === dx1) {
            pos.x = cx - hx;
            vel.x = 0;
          } else if (minD === dx2) {
            pos.x = cx + hx;
            vel.x = 0;
          } else if (minD === dy1) {
            pos.y = cy - hy;
            vel.y = 0;
          } else if (minD === dy2) {
            pos.y = cy + hy;
            vel.y = 0;
          } else if (minD === dz1) {
            pos.z = cz - hz;
            vel.z = 0;
          } else if (minD === dz2) {
            pos.z = cz + hz;
            vel.z = 0;
          }
        }
      } else if (collider.type === 'cylinder' && collider.radius && collider.height) {
        const [cx, cy, cz] = collider.center;
        const r = collider.radius + clearance;
        const h2 = collider.height / 2 + clearance;

        const dy = pos.y - cy;
        if (Math.abs(dy) < h2) {
          const dx = pos.x - cx;
          const dz = pos.z - cz;
          const distSq = dx * dx + dz * dz;
          if (distSq < r * r && distSq > 0.0001) {
            const dist = Math.sqrt(distSq);
            pos.x = cx + (dx / dist) * r;
            pos.z = cz + (dz / dist) * r;
            vel.x = 0;
            vel.z = 0;
          }
        }
      }
    }
  }
}
