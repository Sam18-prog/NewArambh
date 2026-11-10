'use client';

import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useKeyboardControls } from '@/hooks/useKeyboardControls';
import { CollisionEngine } from '@/lib/collision/CollisionEngine';
import {
  COURTYARD_COLLIDERS,
  DEFAULT_PLAYER_COLLIDER_CONFIG,
} from '@/data/scene-configs/courtyardColliders';
import { SceneCollider, PlayerCollisionConfig } from '@/types/collision';
import { MobileInputState } from '@/types/input';

interface PlayerControllerProps {
  enabled: boolean;
  isLocked: boolean;
  spawnPosition?: [number, number, number];
  walkSpeed?: number;
  sprintSpeed?: number;
  mouseSensitivity?: number;
  boundaries?: { minX: number; maxX: number; minZ: number; maxZ: number };
  colliders?: SceneCollider[];
  playerConfig?: PlayerCollisionConfig;
  mobileInputRef?: React.RefObject<MobileInputState | null>;
  resetSignal?: number;
}

// Scratch vectors outside component to prevent GC pressure
const _forward = new THREE.Vector3();
const _right = new THREE.Vector3();
const _moveDir = new THREE.Vector3();
const _desiredVelocity = new THREE.Vector3();

export default function PlayerController({
  enabled,
  isLocked,
  spawnPosition = [0, 1.7, 12],
  walkSpeed = 4.8,
  sprintSpeed = 7.5,
  mouseSensitivity = 0.0022,
  boundaries = { minX: -18.5, maxX: 18.5, minZ: -18.5, maxZ: 18.5 },
  colliders = COURTYARD_COLLIDERS,
  playerConfig = DEFAULT_PLAYER_COLLIDER_CONFIG,
  mobileInputRef,
  resetSignal = 0,
}: PlayerControllerProps) {
  const keys = useKeyboardControls(enabled);

  // Dedicated collision engine instance
  const collisionEngine = useRef<CollisionEngine | null>(null);
  if (collisionEngine.current == null) {
    collisionEngine.current = new CollisionEngine(colliders, playerConfig);
  }

  // Update engine colliders if props change
  useEffect(() => {
    if (collisionEngine.current) {
      collisionEngine.current.setColliders(colliders);
    }
  }, [colliders]);

  // Player position & velocity state in space
  const position = useRef(new THREE.Vector3(...spawnPosition));
  const velocity = useRef(new THREE.Vector3(0, 0, 0));
  const currentGroundElevation = useRef(0);

  // Orientation: yaw (heading around Y) and pitch (up/down around X)
  const yaw = useRef(0);
  const pitch = useRef(0);
  const needsReset = useRef(true);
  const lastResetSignal = useRef(resetSignal);

  // When enabled toggles, flag that position needs to align to spawn on next frame
  useEffect(() => {
    if (enabled) {
      needsReset.current = true;
    }
  }, [enabled]);

  // Pointer Lock mouse look listener (Desktop pointer lock)
  useEffect(() => {
    if (!enabled) return;

    const handleMouseMove = (event: MouseEvent) => {
      if (!isLocked) return;

      // Update yaw (heading) and pitch (altitude)
      yaw.current -= event.movementX * mouseSensitivity;
      pitch.current -= event.movementY * mouseSensitivity;

      // Clamp vertical pitch to ~85 degrees to avoid somersaulting
      const MAX_PITCH = 1.48; // ~84.8 degrees in radians
      pitch.current = Math.max(-MAX_PITCH, Math.min(MAX_PITCH, pitch.current));
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [enabled, isLocked, mouseSensitivity]);

  // Frame update: compute movement kinematics, resolve collisions, and apply to camera
  useFrame(({ camera }, delta) => {
    if (!enabled) return;

    // Check for explicit position reset trigger (e.g. from Pause menu or initial spawn)
    if (needsReset.current || resetSignal !== lastResetSignal.current) {
      position.current.set(...spawnPosition);
      velocity.current.set(0, 0, 0);
      currentGroundElevation.current = 0;
      yaw.current = 0;
      pitch.current = 0;
      needsReset.current = false;
      lastResetSignal.current = resetSignal;
    }

    // Check Mobile Input state (Touch look & pause state)
    if (mobileInputRef?.current) {
      const mobile = mobileInputRef.current;

      // If exploration is paused, freeze movement and return immediately
      if (mobile.isPaused) {
        velocity.current.set(0, 0, 0);
        return;
      }

      // Consume touch look rotation deltas
      if (mobile.touchLookYaw !== 0 || mobile.touchLookPitch !== 0) {
        yaw.current += mobile.touchLookYaw;
        pitch.current += mobile.touchLookPitch;

        // Clamp vertical pitch to ~85 degrees
        const MAX_PITCH = 1.48;
        pitch.current = Math.max(-MAX_PITCH, Math.min(MAX_PITCH, pitch.current));

        // Reset consumed deltas
        mobile.touchLookYaw = 0;
        mobile.touchLookPitch = 0;
      }
    }

    // Apply orientation to camera
    camera.rotation.order = 'YXZ';
    camera.rotation.y = yaw.current;
    camera.rotation.x = pitch.current;
    camera.rotation.z = 0;

    // Clamp delta to avoid large position skips on tab defocus
    const dt = Math.min(delta, 0.1);

    // 1. Gather Desktop Keyboard inputs
    const { forward, backward, left, right, sprint } = keys.current;
    let moveForward = (forward ? 1 : 0) - (backward ? 1 : 0);
    let moveRight = (right ? 1 : 0) - (left ? 1 : 0);
    let isSprinting = sprint;

    // 2. Combine with Mobile Joystick / Sprint inputs (prioritizes active joystick)
    if (mobileInputRef?.current) {
      const mobile = mobileInputRef.current;
      if (mobile.isJoystickActive) {
        moveRight = mobile.joystickX;
        moveForward = mobile.joystickZ;
      }
      if (mobile.touchSprint) {
        isSprinting = true;
      }
    }

    // Compute horizontal forward & right vectors on XZ plane
    _forward.set(-Math.sin(yaw.current), 0, -Math.cos(yaw.current)).normalize();
    _right.set(Math.cos(yaw.current), 0, -Math.sin(yaw.current)).normalize();

    // Combine input axes into world-space movement direction
    _moveDir.set(0, 0, 0);
    if (Math.abs(moveForward) > 0.001) {
      _moveDir.addScaledVector(_forward, moveForward);
    }
    if (Math.abs(moveRight) > 0.001) {
      _moveDir.addScaledVector(_right, moveRight);
    }

    // Diagonal normalization: preserves smooth analog magnitude while clamping max to 1.0
    const moveMagnitude = _moveDir.length();
    if (moveMagnitude > 1.0) {
      _moveDir.divideScalar(moveMagnitude);
    }

    // Determine target speed based on walk vs sprint
    const currentSpeed = isSprinting ? sprintSpeed : walkSpeed;
    _desiredVelocity.copy(_moveDir).multiplyScalar(currentSpeed);

    // Smooth exponential acceleration & friction deceleration (damping factor = 12)
    const damping = 1 - Math.exp(-12 * dt);
    velocity.current.lerp(_desiredVelocity, damping);

    // Physical Collision & Tangent Wall-Sliding Resolution
    if (collisionEngine.current) {
      const resolution = collisionEngine.current.resolveMovement(
        position.current,
        velocity.current,
        dt,
        2 // 2 sub-steps for anti-tunneling
      );

      // Apply resolved position and sliding velocity
      position.current.x = resolution.position.x;
      position.current.z = resolution.position.z;
      velocity.current.copy(resolution.velocity);

      // Smooth step climbing / descent elevation
      const targetElevation = resolution.groundElevation;
      const stepDamping = 1 - Math.exp(-14 * dt);
      currentGroundElevation.current += (targetElevation - currentGroundElevation.current) * stepDamping;
      position.current.y = currentGroundElevation.current + playerConfig.eyeHeight;
    } else {
      // Fallback if engine unavailable
      position.current.x += velocity.current.x * dt;
      position.current.z += velocity.current.z * dt;
      position.current.y = spawnPosition[1];
    }

    // Enforce courtyard outer boundaries as an ultimate safety margin
    position.current.x = Math.max(boundaries.minX, Math.min(boundaries.maxX, position.current.x));
    position.current.z = Math.max(boundaries.minZ, Math.min(boundaries.maxZ, position.current.z));

    // Update camera position
    camera.position.copy(position.current);
  });

  return null;
}
