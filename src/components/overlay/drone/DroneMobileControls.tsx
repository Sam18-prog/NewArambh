'use client';

import React, { useRef, useState, useCallback, useEffect } from 'react';
import {
  ArrowUp,
  ArrowDown,
  Zap,
  RotateCcw,
  Footprints,
  Compass,
} from 'lucide-react';
import { MobileInputState, TouchControlSettings, DEFAULT_TOUCH_SETTINGS } from '@/types/input';

interface DroneMobileControlsProps {
  mobileInputRef: React.RefObject<MobileInputState>;
  enabled: boolean;
  onExitDrone: () => void;
  onResetPosition: () => void;
  settings?: TouchControlSettings;
  forceVisible?: boolean;
}

export default function DroneMobileControls({
  mobileInputRef,
  enabled,
  onExitDrone,
  onResetPosition,
  settings = DEFAULT_TOUCH_SETTINGS,
  forceVisible = false,
}: DroneMobileControlsProps) {
  const [isTurboActive, setIsTurboActive] = useState(false);
  const [isAscending, setIsAscending] = useState(false);
  const [isDescending, setIsDescending] = useState(false);

  // Left Joystick State
  const [isLeftTouching, setIsLeftTouching] = useState(false);
  const [leftNubPos, setLeftNubPos] = useState({ x: 0, y: 0 });
  const leftTouchId = useRef<number | null>(null);
  const leftCenter = useRef({ x: 0, y: 0 });
  const JOYSTICK_RADIUS = 50;

  // Right Look State
  const rightTouchId = useRef<number | null>(null);
  const rightPrevPos = useRef({ x: 0, y: 0 });

  // Sync state to mutable ref
  const syncInput = useCallback(() => {
    if (!mobileInputRef.current) return;
    mobileInputRef.current.droneAscend = isAscending;
    mobileInputRef.current.droneDescend = isDescending;
    mobileInputRef.current.droneTurbo = isTurboActive;
  }, [mobileInputRef, isAscending, isDescending, isTurboActive]);

  useEffect(() => {
    syncInput();
  }, [syncInput]);

  // Clean up when disabled
  useEffect(() => {
    if (!enabled && mobileInputRef.current) {
      mobileInputRef.current.joystickX = 0;
      mobileInputRef.current.joystickZ = 0;
      mobileInputRef.current.isJoystickActive = false;
      mobileInputRef.current.droneAscend = false;
      mobileInputRef.current.droneDescend = false;
      mobileInputRef.current.droneTurbo = false;
    }
  }, [enabled, mobileInputRef]);

  // LEFT JOYSTICK TOUCH HANDLERS
  const handleLeftTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (leftTouchId.current !== null) return;

    const touch = e.changedTouches[0];
    leftTouchId.current = touch.identifier;

    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    leftCenter.current = { x: cx, y: cy };

    setIsLeftTouching(true);
    handleLeftMove(touch.clientX, touch.clientY);
  };

  const handleLeftTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    for (let i = 0; i < e.changedTouches.length; i++) {
      const touch = e.changedTouches[i];
      if (touch.identifier === leftTouchId.current) {
        handleLeftMove(touch.clientX, touch.clientY);
        break;
      }
    }
  };

  const handleLeftMove = (clientX: number, clientY: number) => {
    const dx = clientX - leftCenter.current.x;
    const dy = clientY - leftCenter.current.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    let clampedDist = dist;
    let angle = 0;
    if (dist > 0.0001) {
      angle = Math.atan2(dy, dx);
      clampedDist = Math.min(dist, JOYSTICK_RADIUS);
    }

    const nubX = Math.cos(angle) * clampedDist;
    const nubY = Math.sin(angle) * clampedDist;
    setLeftNubPos({ x: nubX, y: nubY });

    // Normalize -1 to +1
    const normalizedDist = clampedDist / JOYSTICK_RADIUS;
    if (normalizedDist < settings.joystickDeadzone) {
      if (mobileInputRef.current) {
        mobileInputRef.current.joystickX = 0;
        mobileInputRef.current.joystickZ = 0;
        mobileInputRef.current.isJoystickActive = false;
      }
    } else {
      if (mobileInputRef.current) {
        mobileInputRef.current.joystickX = nubX / JOYSTICK_RADIUS;
        mobileInputRef.current.joystickZ = -nubY / JOYSTICK_RADIUS; // -Y is forward
        mobileInputRef.current.isJoystickActive = true;
      }
    }
  };

  const handleLeftTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    for (let i = 0; i < e.changedTouches.length; i++) {
      if (e.changedTouches[i].identifier === leftTouchId.current) {
        leftTouchId.current = null;
        setIsLeftTouching(false);
        setLeftNubPos({ x: 0, y: 0 });
        if (mobileInputRef.current) {
          mobileInputRef.current.joystickX = 0;
          mobileInputRef.current.joystickZ = 0;
          mobileInputRef.current.isJoystickActive = false;
        }
        break;
      }
    }
  };

  // RIGHT LOOK TOUCH HANDLERS
  const handleRightTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (rightTouchId.current !== null) return;

    const touch = e.changedTouches[0];
    rightTouchId.current = touch.identifier;
    rightPrevPos.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleRightTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    for (let i = 0; i < e.changedTouches.length; i++) {
      const touch = e.changedTouches[i];
      if (touch.identifier === rightTouchId.current) {
        const dx = touch.clientX - rightPrevPos.current.x;
        const dy = touch.clientY - rightPrevPos.current.y;
        rightPrevPos.current = { x: touch.clientX, y: touch.clientY };

        if (mobileInputRef.current) {
          const sens = settings.touchLookSensitivity;
          mobileInputRef.current.touchLookYaw -= dx * sens;
          mobileInputRef.current.touchLookPitch -= (settings.invertY ? -dy : dy) * sens;
        }
        break;
      }
    }
  };

  const handleRightTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    for (let i = 0; i < e.changedTouches.length; i++) {
      if (e.changedTouches[i].identifier === rightTouchId.current) {
        rightTouchId.current = null;
        break;
      }
    }
  };

  if (!enabled && !forceVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-40 select-none touch-none">
      {/* LEFT ZONE: FLIGHT JOYSTICK */}
      <div
        className="pointer-events-auto absolute bottom-8 left-6 w-36 h-36 rounded-full bg-black/40 border-2 border-white/20 backdrop-blur-md flex items-center justify-center touch-none shadow-2xl active:border-amber-400"
        onTouchStart={handleLeftTouchStart}
        onTouchMove={handleLeftTouchMove}
        onTouchEnd={handleLeftTouchEnd}
        onTouchCancel={handleLeftTouchEnd}
      >
        {/* Inner Guide Cross */}
        <div className="absolute w-full h-[1px] bg-white/10" />
        <div className="absolute h-full w-[1px] bg-white/10" />

        {/* Joystick Thumb Nub */}
        <div
          className={`w-14 h-14 rounded-full border-2 transition-transform duration-75 flex items-center justify-center shadow-lg ${
            isLeftTouching
              ? 'bg-amber-400 border-amber-300 shadow-amber-500/50 scale-105'
              : 'bg-zinc-800/90 border-zinc-600'
          }`}
          style={{
            transform: `translate(${leftNubPos.x}px, ${leftNubPos.y}px)`,
          }}
        >
          <div className="w-4 h-4 rounded-full bg-white/80" />
        </div>
        <div className="absolute -bottom-6 text-[10px] font-bold text-zinc-400 tracking-wider">
          FLY
        </div>
      </div>

      {/* RIGHT ZONE: CAMERA LOOK SURFACE */}
      <div
        className="pointer-events-auto absolute bottom-8 right-6 w-36 h-36 rounded-full bg-black/40 border-2 border-white/20 backdrop-blur-md flex items-center justify-center touch-none shadow-2xl active:border-amber-400"
        onTouchStart={handleRightTouchStart}
        onTouchMove={handleRightTouchMove}
        onTouchEnd={handleRightTouchEnd}
        onTouchCancel={handleRightTouchEnd}
      >
        <div className="text-zinc-500 flex flex-col items-center justify-center pointer-events-none">
          <Compass className="w-6 h-6 text-zinc-400 mb-1" />
          <span className="text-[10px] font-bold tracking-wider">LOOK</span>
        </div>
      </div>

      {/* CENTER-RIGHT ACTION BUTTONS: ASCEND, DESCEND, TURBO, RESET */}
      <div className="pointer-events-auto absolute bottom-48 right-6 flex flex-col gap-3">
        {/* Ascend Button (Hold to fly up) */}
        <button
          type="button"
          onTouchStart={() => setIsAscending(true)}
          onTouchEnd={() => setIsAscending(false)}
          onMouseDown={() => setIsAscending(true)}
          onMouseUp={() => setIsAscending(false)}
          className={`w-12 h-12 rounded-full border flex items-center justify-center backdrop-blur-md shadow-xl transition-all active:scale-90 ${
            isAscending
              ? 'bg-amber-400 border-amber-300 text-zinc-950 scale-105 shadow-amber-500/40'
              : 'bg-zinc-950/80 border-white/20 text-zinc-200'
          }`}
          title="Ascend (Hold)"
          aria-label="Ascend"
        >
          <ArrowUp className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Descend Button (Hold to fly down) */}
        <button
          type="button"
          onTouchStart={() => setIsDescending(true)}
          onTouchEnd={() => setIsDescending(false)}
          onMouseDown={() => setIsDescending(true)}
          onMouseUp={() => setIsDescending(false)}
          className={`w-12 h-12 rounded-full border flex items-center justify-center backdrop-blur-md shadow-xl transition-all active:scale-90 ${
            isDescending
              ? 'bg-amber-400 border-amber-300 text-zinc-950 scale-105 shadow-amber-500/40'
              : 'bg-zinc-950/80 border-white/20 text-zinc-200'
          }`}
          title="Descend (Hold)"
          aria-label="Descend"
        >
          <ArrowDown className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Turbo Speed Toggle Button */}
        <button
          type="button"
          onClick={() => setIsTurboActive(!isTurboActive)}
          className={`w-12 h-12 rounded-full border flex items-center justify-center backdrop-blur-md shadow-xl transition-all active:scale-90 ${
            isTurboActive
              ? 'bg-amber-400 border-amber-300 text-zinc-950 shadow-amber-500/40'
              : 'bg-zinc-950/80 border-white/20 text-zinc-300'
          }`}
          title="Toggle Turbo Speed"
          aria-label="Toggle Turbo Speed"
        >
          <Zap className={`w-5 h-5 stroke-[2.5] ${isTurboActive ? 'fill-zinc-950' : ''}`} />
        </button>
      </div>

      {/* CENTER-LEFT ACTION BUTTONS: RESET, EXIT DRONE */}
      <div className="pointer-events-auto absolute bottom-48 left-6 flex flex-col gap-3">
        {/* Reset Camera Button */}
        <button
          type="button"
          onClick={onResetPosition}
          className="w-12 h-12 rounded-full bg-zinc-950/80 hover:bg-zinc-900 border border-white/20 text-zinc-300 flex items-center justify-center backdrop-blur-md shadow-xl transition-all active:scale-90"
          title="Reset Drone Position"
          aria-label="Reset Drone Position"
        >
          <RotateCcw className="w-5 h-5 stroke-[2]" />
        </button>

        {/* Exit Drone Mode to Walk Button */}
        <button
          type="button"
          onClick={onExitDrone}
          className="w-12 h-12 rounded-full bg-zinc-950/80 hover:bg-zinc-900 border border-white/20 text-amber-400 flex items-center justify-center backdrop-blur-md shadow-xl transition-all active:scale-90"
          title="Exit to First-Person Walk"
          aria-label="Exit to Walk"
        >
          <Footprints className="w-5 h-5 stroke-[2]" />
        </button>
      </div>
    </div>
  );
}
