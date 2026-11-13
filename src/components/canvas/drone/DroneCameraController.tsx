'use client';

import { useEffect, useRef, useCallback, useMemo } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { DestinationDroneConfig, DroneTelemetry, DroneMovementInput } from '@/types/drone';
import { SceneCollider } from '@/types/collision';
import { EducationalHotspot } from '@/types/hotspot';
import { MobileInputState } from '@/types/input';
import { useKeyboardControls } from '@/hooks/useKeyboardControls';
import { DroneMovementSystem, DronePhysicsState } from './DroneMovementSystem';

interface DroneCameraControllerProps {
  config: DestinationDroneConfig;
  colliders?: SceneCollider[];
  mobileInputRef?: React.RefObject<MobileInputState>;
  isLocked: boolean;
  enabled: boolean;
  activePresetId?: string | null;
  onClearPreset?: () => void;
  onTelemetryUpdate?: (telemetry: DroneTelemetry) => void;
  resetSignal?: number;
  hotspots?: EducationalHotspot[];
  onNearbyLandmark?: (hotspot: EducationalHotspot | null) => void;
  focusedLandmarkId?: string | null;
  onClearFocusedLandmark?: () => void;
}

function resetTouchLookDeltas(m: MobileInputState) {
  m.touchLookYaw = 0;
  m.touchLookPitch = 0;
}

export default function DroneCameraController({
  config,
  colliders = [],
  mobileInputRef,
  isLocked,
  enabled,
  activePresetId,
  onClearPreset,
  onTelemetryUpdate,
  resetSignal = 0,
  hotspots = [],
  onNearbyLandmark,
  focusedLandmarkId,
  onClearFocusedLandmark,
}: DroneCameraControllerProps) {
  const { camera } = useThree();
  const keys = useKeyboardControls(enabled);

  // Initialize physics movement system
  const movementSystem = useRef<DroneMovementSystem>(
    new DroneMovementSystem(
      config.boundaries,
      colliders,
      config.normalSpeed,
      config.turboSpeed,
      config.verticalSpeed
    )
  );

  // Update system if bounds or colliders change
  useEffect(() => {
    movementSystem.current = new DroneMovementSystem(
      config.boundaries,
      colliders,
      config.normalSpeed,
      config.turboSpeed,
      config.verticalSpeed
    );
  }, [config, colliders]);

  // Compute initial yaw/pitch from spawn position and lookAt target
  const initialLook = useMemo(() => {
    const [sx, sy, sz] = config.spawnPosition;
    const [tx, ty, tz] = config.spawnLookAt;
    const dir = new THREE.Vector3(tx - sx, ty - sy, tz - sz).normalize();
    const yaw = Math.atan2(-dir.x, -dir.z);
    const pitch = Math.asin(THREE.MathUtils.clamp(dir.y, -0.99, 0.99));
    return { yaw, pitch };
  }, [config.spawnPosition, config.spawnLookAt]);

  // Drone State initialized once using React recommended null check
  const droneState = useRef<DronePhysicsState | null>(null);
  if (droneState.current == null) {
    droneState.current = {
      position: new THREE.Vector3(...config.spawnPosition),
      velocity: new THREE.Vector3(0, 0, 0),
      yaw: initialLook.yaw,
      pitch: initialLook.pitch,
      roll: 0,
      targetRoll: 0,
      hoverTime: 0,
      currentSpeed: 0,
    };
  }

  // Preset transition targets
  const presetTarget = useRef<{
    position: THREE.Vector3;
    lookAt: THREE.Vector3;
    active: boolean;
  }>({
    position: new THREE.Vector3(),
    lookAt: new THREE.Vector3(),
    active: false,
  });

  // Handle Preset selection
  useEffect(() => {
    if (activePresetId) {
      const preset = config.presets.find((p) => p.id === activePresetId);
      if (preset) {
        presetTarget.current.position.set(...preset.position);
        presetTarget.current.lookAt.set(...preset.target);
        presetTarget.current.active = true;
      }
    } else {
      presetTarget.current.active = false;
    }
  }, [activePresetId, config.presets]);

  // Handle reset position signal
  const prevResetSignal = useRef(resetSignal);
  useEffect(() => {
    if (resetSignal !== prevResetSignal.current && droneState.current) {
      prevResetSignal.current = resetSignal;
      droneState.current.position.set(...config.spawnPosition);
      droneState.current.velocity.set(0, 0, 0);
      droneState.current.yaw = initialLook.yaw;
      droneState.current.pitch = initialLook.pitch;
      droneState.current.roll = 0;
      presetTarget.current.active = false;
      onClearPreset?.();
    }
  }, [resetSignal, config.spawnPosition, initialLook.yaw, initialLook.pitch, onClearPreset]);

  // Focus on selected landmark
  useEffect(() => {
    if (focusedLandmarkId && droneState.current) {
      const targetHotspot = hotspots.find((h) => h.id === focusedLandmarkId);
      if (targetHotspot) {
        const hPos = new THREE.Vector3(...targetHotspot.position);
        const dir = hPos.clone().sub(droneState.current.position).normalize();
        const targetYaw = Math.atan2(-dir.x, -dir.z);
        const targetPitch = Math.asin(THREE.MathUtils.clamp(dir.y, -0.99, 0.99));
        droneState.current.yaw = targetYaw;
        droneState.current.pitch = targetPitch;
      }
      onClearFocusedLandmark?.();
    }
  }, [focusedLandmarkId, hotspots, onClearFocusedLandmark]);

  // Desktop Pointer Lock mouse rotation listener
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!enabled || !isLocked || !droneState.current) return;

      const sensitivity = 0.0022;
      droneState.current.yaw -= e.movementX * sensitivity;
      droneState.current.pitch -= e.movementY * sensitivity;

      // Clamp vertical pitch to avoid gimbal flip (-85° to +85°)
      const maxPitch = (85 * Math.PI) / 180;
      droneState.current.pitch = THREE.MathUtils.clamp(
        droneState.current.pitch,
        -maxPitch,
        maxPitch
      );

      // Mouse input breaks preset transition into free flight
      if (presetTarget.current.active && (Math.abs(e.movementX) > 2 || Math.abs(e.movementY) > 2)) {
        presetTarget.current.active = false;
        onClearPreset?.();
      }
    },
    [enabled, isLocked, onClearPreset]
  );

  useEffect(() => {
    if (enabled && isLocked) {
      document.addEventListener('mousemove', handleMouseMove);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, [enabled, isLocked, handleMouseMove]);

  // Proximity landmark discovery accumulator
  const frameCounter = useRef(0);

  // Main R3F Animation Frame Loop
  useFrame((_, delta) => {
    if (!enabled || !droneState.current) return;

    frameCounter.current++;

    // 1. Read Mobile Input if available
    const m = mobileInputRef?.current;
    if (m && !m.isPaused) {
      if (m.touchLookYaw !== 0 || m.touchLookPitch !== 0) {
        droneState.current.yaw += m.touchLookYaw;
        droneState.current.pitch += m.touchLookPitch;

        const maxPitch = (85 * Math.PI) / 180;
        droneState.current.pitch = THREE.MathUtils.clamp(
          droneState.current.pitch,
          -maxPitch,
          maxPitch
        );

        resetTouchLookDeltas(m);

        if (presetTarget.current.active) {
          presetTarget.current.active = false;
          onClearPreset?.();
        }
      }
    }

    // 2. Synthesize unified input
    const isJoyActive = m?.isJoystickActive || false;
    const joyX = m?.joystickX || 0;
    const joyZ = m?.joystickZ || 0;

    const hasKeyboardMove =
      keys.current.forward ||
      keys.current.backward ||
      keys.current.left ||
      keys.current.right ||
      keys.current.ascend ||
      keys.current.descend;

    const hasTouchMove =
      isJoyActive ||
      (m?.droneAscend ?? false) ||
      (m?.droneDescend ?? false);

    // If user commands manual movement while preset transition is running, cancel preset
    if ((hasKeyboardMove || hasTouchMove) && presetTarget.current.active) {
      presetTarget.current.active = false;
      onClearPreset?.();
    }

    // 3. Preset interpolation vs Free Flight Physics
    if (presetTarget.current.active) {
      // Smoothly lerp position toward target
      droneState.current.position.lerp(presetTarget.current.position, 0.045);

      // Compute look direction toward preset lookAt
      const lookDir = presetTarget.current.lookAt.clone().sub(droneState.current.position).normalize();
      const targetYaw = Math.atan2(-lookDir.x, -lookDir.z);
      const targetPitch = Math.asin(THREE.MathUtils.clamp(lookDir.y, -0.99, 0.99));

      droneState.current.yaw = THREE.MathUtils.lerp(droneState.current.yaw, targetYaw, 0.05);
      droneState.current.pitch = THREE.MathUtils.lerp(droneState.current.pitch, targetPitch, 0.05);
      droneState.current.roll = THREE.MathUtils.lerp(droneState.current.roll, 0, 0.05);
      droneState.current.velocity.set(0, 0, 0);
      droneState.current.currentSpeed = 0;
    } else {
      const droneInput: DroneMovementInput = {
        forward: keys.current.forward || joyZ > 0.25,
        backward: keys.current.backward || joyZ < -0.25,
        left: keys.current.left || joyX < -0.25,
        right: keys.current.right || joyX > 0.25,
        ascend: keys.current.ascend || (m?.droneAscend ?? false),
        descend: keys.current.descend || (m?.droneDescend ?? false),
        turbo: keys.current.sprint || (m?.droneTurbo ?? false),
        lookYaw: 0,
        lookPitch: 0,
      };

      movementSystem.current.update(droneState.current, droneInput, delta);
    }

    // 4. Update Three.js camera position and rotation
    camera.position.copy(droneState.current.position);

    const euler = new THREE.Euler(
      droneState.current.pitch,
      droneState.current.yaw,
      droneState.current.roll,
      'YXZ'
    );
    camera.quaternion.setFromEuler(euler);

    // 5. Periodic Landmark Proximity Check (~6 times/sec)
    if (frameCounter.current % 10 === 0 && hotspots.length > 0) {
      let closest: EducationalHotspot | null = null;
      let minDistance = 24.0; // 24m detection radius for aerial discovery

      for (const h of hotspots) {
        const hPos = new THREE.Vector3(...h.position);
        const dist = camera.position.distanceTo(hPos);
        if (dist < minDistance) {
          minDistance = dist;
          closest = h;
        }
      }

      onNearbyLandmark?.(closest);
    }

    // 6. Telemetry update (~10 times/sec)
    if (frameCounter.current % 6 === 0 && onTelemetryUpdate) {
      const headingDeg = THREE.MathUtils.euclideanModulo(
        THREE.MathUtils.radToDeg(-droneState.current.yaw),
        360
      );

      const isTurbo = keys.current.sprint || (m?.droneTurbo ?? false);

      onTelemetryUpdate({
        position: [
          Number(camera.position.x.toFixed(1)),
          Number(camera.position.y.toFixed(1)),
          Number(camera.position.z.toFixed(1)),
        ],
        altitude: Number(camera.position.y.toFixed(1)),
        speedMode: isTurbo ? 'turbo' : 'normal',
        currentSpeed: Number(droneState.current.currentSpeed.toFixed(1)),
        heading: Math.round(headingDeg),
        activePresetId: presetTarget.current.active ? activePresetId || undefined : undefined,
      });
    }
  });

  return null;
}
