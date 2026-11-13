'use client';

import React, { Suspense, useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';
import SceneEnvironment from '@/components/canvas/SceneEnvironment';
import Monument3DSelector from '@/components/three/monuments/Monument3DSelector';
import ModelErrorBoundary from '@/components/canvas/ModelErrorBoundary';
import PlayerController from '@/components/canvas/PlayerController';
import CollisionSystem from '@/components/canvas/CollisionSystem';
import LoadingScreen from '@/components/overlay/LoadingScreen';
import ExperienceControlsHUD, { ExplorationMode, CameraPreset } from '@/components/overlay/ExperienceControlsHUD';
import MobileControlsOverlay from '@/components/overlay/MobileControlsOverlay';
import PauseSettingsModal from '@/components/overlay/PauseSettingsModal';
import HotspotManager from '@/components/canvas/HotspotManager';
import HotspotPrompt from '@/components/overlay/HotspotPrompt';
import HotspotDrawer from '@/components/overlay/HotspotDrawer';
import GuidedTourHUD from '@/components/overlay/GuidedTourHUD';
import TourCompletionModal from '@/components/overlay/TourCompletionModal';
import GuidedTourNavigator from '@/components/canvas/GuidedTourNavigator';
import Fallback2DView from '@/components/fallback/Fallback2DView';
import DroneCameraController from '@/components/canvas/drone/DroneCameraController';
import DroneHUD from '@/components/overlay/drone/DroneHUD';
import DroneMobileControls from '@/components/overlay/drone/DroneMobileControls';
import { getDestinationDroneConfig } from '@/data/scene-configs/droneConfigs';
import { DroneTelemetry } from '@/types/drone';
import { MobileInputState, TouchControlSettings, DEFAULT_TOUCH_SETTINGS } from '@/types/input';
import { EducationalHotspot } from '@/types/hotspot';
import { getHotspotsByDestination, getHotspotById } from '@/lib/hotspots/getHotspots';
import { getTourStopsByDestination } from '@/lib/tours/getTourStops';
import { getDestinationThreeConfig } from '@/data/scene-configs/destinationScenes';
import { checkWebGLSupport } from '@/lib/webgl/detectWebGL';

interface ExperienceCanvasProps {
  destinationId: string;
  destinationName: string;
  modelUrl?: string;
}

const CAMERA_PRESETS: Record<string, { position: [number, number, number]; target: [number, number, number] }> = {
  panoramic: { position: [0, 22, 70], target: [0, 10, -25] },
  mausoleum: { position: [0, 6, 8], target: [0, 10, -25] },
  pool: { position: [0, 3, 52], target: [0, 1.5, 36] },
  gate: { position: [0, 4, 58], target: [0, 7.5, 68] },
};

function SmoothCameraController({
  activeView,
  controlsRef,
  presets = CAMERA_PRESETS,
}: {
  activeView: CameraPreset;
  controlsRef: React.RefObject<OrbitControlsImpl | null>;
  presets?: Record<string, { position: [number, number, number]; target: [number, number, number] }>;
}) {
  const currentPreset = presets[activeView] || presets.panoramic || CAMERA_PRESETS.panoramic;
  const targetPos = useRef(new THREE.Vector3(...currentPreset.position));
  const targetLook = useRef(new THREE.Vector3(...currentPreset.target));

  useEffect(() => {
    const p = presets[activeView] || presets.panoramic || CAMERA_PRESETS.panoramic;
    targetPos.current.set(...p.position);
    targetLook.current.set(...p.target);
  }, [activeView, presets]);

  useFrame(({ camera }) => {
    camera.position.lerp(targetPos.current, 0.05);
    if (controlsRef.current) {
      controlsRef.current.target.lerp(targetLook.current, 0.05);
      controlsRef.current.update();
    }
  });

  return null;
}

export default function ExperienceCanvas({
  destinationId,
  destinationName,
}: ExperienceCanvasProps) {
  // Destination 3D scene configuration & Tour Stops
  const sceneConfig = useMemo(() => getDestinationThreeConfig(destinationId), [destinationId]);
  const tourStops = useMemo(() => getTourStopsByDestination(destinationId), [destinationId]);
  const droneConfig = useMemo(
    () => sceneConfig.droneConfig || getDestinationDroneConfig(destinationId),
    [sceneConfig, destinationId]
  );

  // WebGL Support & 2D Fallback state
  const [webGLSupport] = useState(() => checkWebGLSupport());
  const [is2DMode, setIs2DMode] = useState(() => {
    if (typeof window === 'undefined') return false;
    const support = checkWebGLSupport();
    const params = new URLSearchParams(window.location.search);
    const explicitlyRequested2D = params.get('mode') === '2d';
    // Enter 2D ONLY if explicitly requested via query param or if WebGL is genuinely unsupported
    return explicitlyRequested2D || !support.isSupported;
  });

  // Switch to 3D and clear mode=2d from URL
  const handleSwitchTo3D = useCallback(() => {
    setIs2DMode(false);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.delete('mode');
      window.history.replaceState(null, '', url.pathname + (url.search ? url.search : ''));
    }
  }, []);

  // Switch to 2D and sync mode=2d to URL
  const handleSwitchTo2D = useCallback(() => {
    setIs2DMode(true);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('mode', '2d');
      window.history.replaceState(null, '', url.pathname + url.search);
    }
  }, []);

  const [mode, setMode] = useState<ExplorationMode>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const m = params.get('mode');
      if (m === 'drone') return 'drone';
      if (m === 'tour') return 'tour';
      if (m === 'inspect') return 'inspect';
    }
    return 'walk';
  });

  const [activeView, setActiveView] = useState<CameraPreset>('panoramic');
  const [isPointerLocked, setIsPointerLocked] = useState(false);
  const [showColliders, setShowColliders] = useState(false);

  // Drone View Specific States
  const [droneTelemetry, setDroneTelemetry] = useState<DroneTelemetry>({
    position: droneConfig.spawnPosition,
    altitude: droneConfig.spawnPosition[1],
    speedMode: 'normal',
    currentSpeed: 0,
    heading: 0,
  });
  const [activeDronePreset, setActiveDronePreset] = useState<string | null>(null);
  const [nearbyDroneLandmark, setNearbyDroneLandmark] = useState<EducationalHotspot | null>(null);
  const [focusedLandmarkId, setFocusedLandmarkId] = useState<string | null>(null);

  // Mobile Touch & Pause States
  const [isPaused, setIsPaused] = useState(false);
  const [touchSettings, setTouchSettings] = useState<TouchControlSettings>(DEFAULT_TOUCH_SETTINGS);
  const [resetSignal, setResetSignal] = useState(0);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Educational Hotspot States
  const hotspots = useMemo(() => getHotspotsByDestination(destinationId), [destinationId]);
  const [nearbyHotspot, setNearbyHotspot] = useState<EducationalHotspot | null>(null);
  const [selectedHotspot, setSelectedHotspot] = useState<EducationalHotspot | null>(null);

  // Guided Tour States
  const [isTourActive, setIsTourActive] = useState(false);
  const [tourStopIndex, setTourStopIndex] = useState(0);
  const [isTourPaused, setIsTourPaused] = useState(false);
  const [isTourCompleted, setIsTourCompleted] = useState(false);

  // Shared unified mobile input ref (updated by touch overlay, read by PlayerController)
  const mobileInput = useRef<MobileInputState>({
    joystickX: 0,
    joystickZ: 0,
    isJoystickActive: false,
    touchSprint: false,
    touchLookYaw: 0,
    touchLookPitch: 0,
    isPaused: false,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<OrbitControlsImpl | null>(null);

  // Detect touch capability
  useEffect(() => {
    const checkTouch = () => {
      const hasTouch =
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(pointer: coarse)').matches;
      setIsTouchDevice(hasTouch);
    };

    checkTouch();

    const onFirstTouch = () => {
      setIsTouchDevice(true);
    };

    window.addEventListener('touchstart', onFirstTouch, { once: true });
    return () => {
      window.removeEventListener('touchstart', onFirstTouch);
    };
  }, []);

  // Sync pause & inspection states into mutable input ref
  const shouldPause = isPaused || selectedHotspot !== null || isTourActive;
  useEffect(() => {
    mobileInput.current.isPaused = shouldPause;
    if (shouldPause) {
      mobileInput.current.joystickX = 0;
      mobileInput.current.joystickZ = 0;
      mobileInput.current.isJoystickActive = false;
      mobileInput.current.touchSprint = false;
      mobileInput.current.touchLookYaw = 0;
      mobileInput.current.touchLookPitch = 0;

      // Release desktop pointer lock if active when panel or tour opens
      if (document.pointerLockElement) {
        document.exitPointerLock();
      }
    }
  }, [shouldPause]);

  // Keyboard shortcut listener (KeyP to toggle pause)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'KeyP' && selectedHotspot === null && !isTourActive) {
        setIsPaused((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedHotspot, isTourActive]);

  // Pointer Lock change listener (Desktop)
  useEffect(() => {
    const handlePointerLockChange = () => {
      const isLocked =
        document.pointerLockElement !== null &&
        containerRef.current !== null &&
        containerRef.current.contains(document.pointerLockElement);
      setIsPointerLocked(isLocked);
    };

    document.addEventListener('pointerlockchange', handlePointerLockChange);
    return () => {
      document.removeEventListener('pointerlockchange', handlePointerLockChange);
    };
  }, []);

  // Request Pointer Lock on explicit user interaction (Desktop only) with safe error suppression
  const requestPointerLock = useCallback(() => {
    if ((mode !== 'walk' && mode !== 'drone') || isTouchDevice || shouldPause) return;

    const canvasElement = containerRef.current?.querySelector('canvas');
    if (canvasElement && document.pointerLockElement !== canvasElement) {
      try {
        const promise = canvasElement.requestPointerLock();
        if (promise && typeof (promise as unknown as Promise<void>).catch === 'function') {
          (promise as unknown as Promise<void>).catch(() => {
            // Silently suppress expected user cancellation or focus mismatch
          });
        }
      } catch {
        // Silently suppress if browser does not support pointerLock
      }
    }
  }, [mode, isTouchDevice, shouldPause]);

  // Handle Mode Change (Walk vs Drone vs Inspect vs Tour)
  const handleModeChange = useCallback((newMode: ExplorationMode) => {
    setMode(newMode);

    // Sync mode parameter to URL without reloading
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (newMode === 'walk') {
        url.searchParams.delete('mode');
      } else {
        url.searchParams.set('mode', newMode);
      }
      window.history.replaceState(null, '', url.pathname + (url.search ? url.search : ''));
    }

    // Reset mobile input
    mobileInput.current.joystickX = 0;
    mobileInput.current.joystickZ = 0;
    mobileInput.current.isJoystickActive = false;
    mobileInput.current.touchSprint = false;
    mobileInput.current.touchLookYaw = 0;
    mobileInput.current.touchLookPitch = 0;
    mobileInput.current.droneAscend = false;
    mobileInput.current.droneDescend = false;
    mobileInput.current.droneTurbo = false;

    setActiveDronePreset(null);
    setNearbyDroneLandmark(null);

    if (newMode === 'tour') {
      setIsTourActive(true);
      setTourStopIndex(0);
      setIsTourCompleted(false);
      setNearbyHotspot(null);
      if (document.pointerLockElement) {
        document.exitPointerLock();
      }
    } else {
      setIsTourActive(false);
      if (newMode === 'inspect') {
        if (document.pointerLockElement) {
          document.exitPointerLock();
        }
      } else {
        setIsPointerLocked(false);
      }
    }
  }, []);

  // Guided Tour Navigation handlers
  const handleNextTourStop = useCallback(() => {
    if (tourStopIndex < tourStops.length - 1) {
      setTourStopIndex((prev) => prev + 1);
    } else {
      setIsTourCompleted(true);
    }
  }, [tourStopIndex, tourStops.length]);

  const handlePrevTourStop = useCallback(() => {
    setTourStopIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const handleExitTour = useCallback(() => {
    setIsTourActive(false);
    setMode('walk');
  }, []);

  const handleReplayTour = useCallback(() => {
    setIsTourCompleted(false);
    setIsTourActive(true);
    setTourStopIndex(0);
    setMode('tour');
  }, []);

  const handleContinueFreeWalk = useCallback(() => {
    setIsTourCompleted(false);
    setIsTourActive(false);
    setMode('walk');
  }, []);

  const handleOpenTourDetails = useCallback(() => {
    const currentStop = tourStops[tourStopIndex];
    if (currentStop) {
      const found = getHotspotById(destinationId, currentStop.hotspotId);
      if (found) {
        setSelectedHotspot(found);
      }
    }
  }, [destinationId, tourStopIndex, tourStops]);

  // When clicking on canvas in Walk or Drone Mode, request pointer lock on desktop
  const handleCanvasClick = useCallback(() => {
    if (isTouchDevice || shouldPause) return;
    if ((mode === 'walk' || mode === 'drone') && !isPointerLocked) {
      requestPointerLock();
    }
  }, [mode, isPointerLocked, shouldPause, isTouchDevice, requestPointerLock]);

  // Render 2D Fallback View if enabled or if WebGL is unsupported
  if (is2DMode || !webGLSupport.isSupported) {
    return (
      <Fallback2DView
        destinationId={destinationId}
        destinationName={destinationName}
        onSwitchTo3D={handleSwitchTo3D}
        canSwitchTo3D={webGLSupport.isSupported}
        webGLError={!webGLSupport.isSupported ? webGLSupport.error : undefined}
      />
    );
  }

  return (
    <div
      ref={containerRef}
      onClick={handleCanvasClick}
      className={`relative w-screen h-screen overflow-hidden bg-[#0c0603] ${
        mode === 'walk' && isPointerLocked ? 'cursor-none' : 'cursor-default'
      }`}
    >
      {/* 2D Loading Screen connected to Drei useProgress */}
      <LoadingScreen
        destinationName={destinationName}
        onSwitchTo2D={handleSwitchTo2D}
      />

      {/* Experience HUD: DroneHUD when in Drone View, ExperienceControlsHUD otherwise */}
      {mode === 'drone' && !isTourActive ? (
        <DroneHUD
          destinationId={destinationId}
          destinationName={destinationName}
          telemetry={droneTelemetry}
          presets={droneConfig.presets}
          activePresetId={activeDronePreset}
          onSelectPreset={(pId) => setActiveDronePreset(pId)}
          onClearPreset={() => setActiveDronePreset(null)}
          onResetPosition={() => setResetSignal((s) => s + 1)}
          onModeChange={handleModeChange}
          isPointerLocked={isPointerLocked}
          onRequestPointerLock={requestPointerLock}
          nearbyLandmark={nearbyDroneLandmark}
          onFocusLandmark={(landmarkId) => setFocusedLandmarkId(landmarkId)}
          onOpenLandmarkDetails={(hotspot) => setSelectedHotspot(hotspot)}
          onToggle2D={handleSwitchTo2D}
          onPause={() => setIsPaused(true)}
          isTouchDevice={isTouchDevice}
        />
      ) : (
        <ExperienceControlsHUD
          destinationId={destinationId}
          destinationName={destinationName}
          mode={mode}
          onModeChange={handleModeChange}
          isPointerLocked={isPointerLocked}
          onRequestPointerLock={requestPointerLock}
          activeView={activeView}
          onSetCameraView={(view) => setActiveView(view)}
          showColliders={showColliders}
          onToggleColliders={() => setShowColliders((prev) => !prev)}
          isTouchDevice={isTouchDevice}
          onPause={() => setIsPaused(true)}
          onToggle2D={handleSwitchTo2D}
        />
      )}

      {/* Guided Tour HUD (Active during Guided Tour Mode) */}
      {isTourActive && !isTourCompleted && selectedHotspot === null && tourStops[tourStopIndex] && (
        <GuidedTourHUD
          currentStop={tourStops[tourStopIndex]}
          currentIndex={tourStopIndex}
          totalStops={tourStops.length}
          isPaused={isTourPaused}
          onNext={handleNextTourStop}
          onPrev={handlePrevTourStop}
          onTogglePause={() => setIsTourPaused((p) => !p)}
          onExit={handleExitTour}
          onOpenDetails={handleOpenTourDetails}
        />
      )}

      {/* Tour Completion Celebration Dialog */}
      <TourCompletionModal
        isOpen={isTourCompleted}
        onReplay={handleReplayTour}
        onContinueFreeWalk={handleContinueFreeWalk}
        destinationId={destinationId}
        destinationName={destinationName}
      />

      {/* Proximity Interaction Prompt (Press E / Tap to Discover) */}
      <HotspotPrompt
        hotspot={selectedHotspot || isPaused || isTourActive ? null : nearbyHotspot}
        onActivate={setSelectedHotspot}
        isTouchDevice={isTouchDevice}
      />

      {/* Educational Information Drawer / Modal */}
      <HotspotDrawer
        hotspot={selectedHotspot}
        isOpen={selectedHotspot !== null}
        onClose={() => setSelectedHotspot(null)}
      />

      {/* Mobile Touch Controls for Walk Mode */}
      <MobileControlsOverlay
        mobileInputRef={mobileInput}
        enabled={mode === 'walk' && !shouldPause && !isTourActive}
        onPause={() => setIsPaused(true)}
        settings={touchSettings}
        forceVisible={isTouchDevice}
        allowJump={sceneConfig.allowJump}
      />

      {/* Mobile Touch Controls for Drone View Mode */}
      <DroneMobileControls
        mobileInputRef={mobileInput}
        enabled={mode === 'drone' && !shouldPause && !isTourActive}
        onExitDrone={() => handleModeChange('walk')}
        onResetPosition={() => setResetSignal((s) => s + 1)}
        settings={touchSettings}
        forceVisible={isTouchDevice}
      />

      {/* Pause & Touch Settings Modal */}
      <PauseSettingsModal
        isOpen={isPaused}
        onResume={() => setIsPaused(false)}
        onResetPosition={() => setResetSignal((s) => s + 1)}
        destinationId={destinationId}
        destinationName={destinationName}
        settings={touchSettings}
        onUpdateSettings={(newSettings) =>
          setTouchSettings((prev) => ({ ...prev, ...newSettings }))
        }
        showColliders={showColliders}
        onToggleColliders={() => setShowColliders((prev) => !prev)}
      />

      {/* Core 3D WebGL Canvas with Outer DOM Error Boundary */}
      <ModelErrorBoundary
        fallbackDestinationId={destinationId}
        onFallback2D={handleSwitchTo2D}
        onRetry={() => {
          if (typeof window !== 'undefined') window.location.reload();
        }}
      >
        <Canvas
          shadows
          camera={{ position: sceneConfig.spawnPosition || [0, 2.0, 52], fov: 60, near: 0.1, far: 300 }}
          gl={{
            antialias: true,
            alpha: false,
            powerPreference: 'high-performance',
          }}
          className="w-full h-full"
        >
          <Suspense fallback={null}>
            {/* Lighting, Sky & Fog Environment */}
            <SceneEnvironment preset={sceneConfig.skyPreset} />

            {/* Architectural 3D Monument Reconstruction */}
            <Monument3DSelector destinationId={destinationId} />

            {/* Educational Hotspots & Proximity Manager */}
            <HotspotManager
              hotspots={hotspots}
              onNearbyChange={setNearbyHotspot}
              onSelect={setSelectedHotspot}
              nearbyHotspotId={nearbyHotspot?.id}
            />

            {/* Physical Collision Wireframe Overlay (Visual Inspection) */}
            <CollisionSystem colliders={sceneConfig.colliders || []} visible={showColliders} />

            {/* Mode 1: First-Person Walk Mode Player Controller */}
            {mode === 'walk' && !isTourActive && (
              <PlayerController
                enabled={true}
                isLocked={isPointerLocked}
                spawnPosition={sceneConfig.spawnPosition}
                walkSpeed={5.2}
                sprintSpeed={8.5}
                mouseSensitivity={0.0022}
                boundaries={sceneConfig.boundaries}
                colliders={sceneConfig.colliders || []}
                mobileInputRef={mobileInput}
                resetSignal={resetSignal}
                allowJump={sceneConfig.allowJump}
              />
            )}

            {/* Mode 2: Interactive Drone View Aerial Camera Controller */}
            {mode === 'drone' && !isTourActive && (
              <DroneCameraController
                config={droneConfig}
                colliders={sceneConfig.colliders || []}
                mobileInputRef={mobileInput}
                isLocked={isPointerLocked}
                enabled={true}
                activePresetId={activeDronePreset}
                onClearPreset={() => setActiveDronePreset(null)}
                onTelemetryUpdate={setDroneTelemetry}
                resetSignal={resetSignal}
                hotspots={hotspots}
                onNearbyLandmark={setNearbyDroneLandmark}
                focusedLandmarkId={focusedLandmarkId}
                onClearFocusedLandmark={() => setFocusedLandmarkId(null)}
              />
            )}

            {/* Mode 2: Model Inspection Mode with OrbitControls */}
            {mode === 'inspect' && !isTourActive && (
              <>
                <SmoothCameraController
                  activeView={activeView}
                  controlsRef={controlsRef}
                  presets={sceneConfig.cameraPresets}
                />
                <OrbitControls
                  ref={controlsRef}
                  makeDefault
                  maxPolarAngle={Math.PI / 2 - 0.04} // Prevent camera going beneath ground
                  minDistance={4.0}
                  maxDistance={120}
                  enableDamping
                  dampingFactor={0.06}
                />
              </>
            )}

            {/* Mode 3: Guided Tour Waypoint Navigator */}
            {isTourActive && tourStops[tourStopIndex] && (
              <GuidedTourNavigator
                activeStop={tourStops[tourStopIndex]}
                enabled={isTourActive}
              />
            )}
          </Suspense>
        </Canvas>
      </ModelErrorBoundary>
    </div>
  );
}
