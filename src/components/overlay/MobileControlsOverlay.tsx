'use client';

import React, { useState, useEffect } from 'react';
import { Zap, Pause } from 'lucide-react';
import VirtualJoystick from '@/components/overlay/VirtualJoystick';
import TouchLookZone from '@/components/overlay/TouchLookZone';
import { MobileInputState, TouchControlSettings } from '@/types/input';

interface MobileControlsOverlayProps {
  mobileInputRef: React.RefObject<MobileInputState>;
  enabled: boolean;
  onPause: () => void;
  settings: TouchControlSettings;
  forceVisible?: boolean;
}

export default function MobileControlsOverlay({
  mobileInputRef,
  enabled,
  onPause,
  settings,
  forceVisible = false,
}: MobileControlsOverlayProps) {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isSprinting, setIsSprinting] = useState(false);

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

  // Sync touch sprint state to shared input ref
  const handleSprintDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSprinting(true);
    if (mobileInputRef.current) {
      mobileInputRef.current.touchSprint = true;
    }
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate?.(15);
    }
  };

  const handleSprintUp = (e: React.PointerEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSprinting(false);
    if (mobileInputRef.current) {
      mobileInputRef.current.touchSprint = false;
    }
  };

  // Joystick move handler
  const handleJoystickMove = (x: number, z: number) => {
    if (mobileInputRef.current) {
      mobileInputRef.current.joystickX = x;
      mobileInputRef.current.joystickZ = z;
      mobileInputRef.current.isJoystickActive = true;
    }
  };

  // Joystick release handler
  const handleJoystickRelease = () => {
    if (mobileInputRef.current) {
      mobileInputRef.current.joystickX = 0;
      mobileInputRef.current.joystickZ = 0;
      mobileInputRef.current.isJoystickActive = false;
    }
  };

  // Touch look delta handler
  const handleTouchLook = (yawDelta: number, pitchDelta: number) => {
    if (mobileInputRef.current) {
      mobileInputRef.current.touchLookYaw += yawDelta;
      mobileInputRef.current.touchLookPitch += pitchDelta;
    }
  };

  // Show if touch is detected or explicitly forced (e.g. for browser device emulation)
  const shouldRender = (isTouchDevice || forceVisible) && enabled;

  if (!shouldRender) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-20 select-none overflow-hidden">
      {/* 1. Right-side Camera Touch Look Surface (occupies right 60% of viewport) */}
      <TouchLookZone
        onLook={handleTouchLook}
        sensitivity={settings.touchLookSensitivity}
        invertY={settings.invertY}
        className="pointer-events-auto absolute top-16 right-0 bottom-0 w-3/5 sm:w-1/2"
      />

      {/* 2. Top-Right Mobile Pause Button */}
      <div className="pointer-events-auto absolute top-4 right-4 sm:top-6 sm:right-6">
        <button
          type="button"
          onClick={onPause}
          className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-zinc-950/80 hover:bg-zinc-900 border border-amber-500/30 text-amber-400 backdrop-blur-md shadow-lg active:scale-95 transition-transform"
          aria-label="Pause Exploration"
        >
          <Pause className="w-3.5 h-3.5 fill-current" />
          <span className="text-xs font-bold text-zinc-200">Pause</span>
        </button>
      </div>

      {/* 3. Bottom Controls Area with Safe-Area Insets */}
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4 sm:p-8 pb-[max(1.25rem,env(safe-area-inset-bottom))] pl-[max(1.25rem,env(safe-area-inset-left))] pr-[max(1.25rem,env(safe-area-inset-right))]">
        {/* Left: Virtual Joystick & Sprint Button */}
        <div className="pointer-events-auto flex flex-col items-center gap-3">
          {/* Sprint Hold Button */}
          <button
            type="button"
            onPointerDown={handleSprintDown}
            onPointerUp={handleSprintUp}
            onPointerCancel={handleSprintUp}
            onPointerLeave={handleSprintUp}
            style={{ touchAction: 'none' }}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full border text-xs font-bold transition-all shadow-xl select-none active:scale-95 ${
              isSprinting
                ? 'bg-gradient-to-r from-amber-400 to-yellow-400 text-zinc-950 border-amber-300 shadow-amber-500/30 scale-105'
                : 'bg-zinc-950/75 hover:bg-zinc-900 border-amber-500/30 text-amber-400 backdrop-blur-md'
            }`}
            aria-label="Hold to Sprint"
          >
            <Zap className={`w-3.5 h-3.5 ${isSprinting ? 'fill-current' : ''}`} />
            <span>{isSprinting ? 'Sprinting (7.5 m/s)' : 'Hold to Sprint'}</span>
          </button>

          {/* Virtual Joystick Base & Knob */}
          <VirtualJoystick
            onMove={handleJoystickMove}
            onRelease={handleJoystickRelease}
            deadzone={settings.joystickDeadzone}
            size={124}
          />
        </div>

        {/* Right: Touch Look Hint Badge (Fades after touch) */}
        <div className="pointer-events-none mb-4 hidden sm:block text-right">
          <span className="inline-block px-3 py-1.5 rounded-full text-[10px] font-semibold text-zinc-400 bg-zinc-950/60 backdrop-blur-md border border-zinc-800">
            Swipe right area to look around
          </span>
        </div>
      </div>
    </div>
  );
}
