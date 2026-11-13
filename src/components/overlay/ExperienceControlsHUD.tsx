'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Compass,
  Maximize2,
  Minimize2,
  Sparkles,
  Camera,
  Layers,
  HelpCircle,
  Eye,
  Footprints,
  MousePointer,
  Lock,
  Shield,
  Pause,
  Map,
} from 'lucide-react';

export type ExplorationMode = 'walk' | 'inspect' | 'tour';
export type CameraPreset = 'panoramic' | 'mausoleum' | 'pool' | 'gate';

interface ExperienceControlsHUDProps {
  destinationId: string;
  destinationName: string;
  mode: ExplorationMode;
  onModeChange: (mode: ExplorationMode) => void;
  isPointerLocked: boolean;
  onRequestPointerLock: () => void;
  onSetCameraView?: (view: CameraPreset) => void;
  activeView?: string;
  showColliders?: boolean;
  onToggleColliders?: () => void;
  isTouchDevice?: boolean;
  onPause?: () => void;
  onToggle2D?: () => void;
}

export default function ExperienceControlsHUD({
  destinationId,
  destinationName,
  mode,
  onModeChange,
  isPointerLocked,
  onRequestPointerLock,
  onSetCameraView,
  activeView = 'panoramic',
  showColliders = false,
  onToggleColliders,
  isTouchDevice = false,
  onPause,
  onToggle2D,
}: ExperienceControlsHUDProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error('Failed to enter fullscreen:', err);
      });
    } else {
      document.exitFullscreen().catch((err) => {
        console.error('Failed to exit fullscreen:', err);
      });
    }
  };

  return (
    <div className="pointer-events-none absolute inset-0 z-30 flex flex-col justify-between p-4 sm:p-6 select-none">
      {/* Center Reticle / Crosshair (Active in Walk Mode) */}
      {mode === 'walk' && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="relative flex items-center justify-center">
            {/* Subtle center ring and crosshair dot */}
            <div className="w-1.5 h-1.5 rounded-full bg-white/90 shadow-sm shadow-black" />
            <div className="absolute w-6 h-6 rounded-full border border-white/20" />
          </div>
        </div>
      )}

      {/* Top Bar */}
      <header className="flex items-center justify-between gap-4">
        {/* Left: Return Link & Destination Title */}
        <div className="pointer-events-auto flex items-center gap-3">
          <Link
            href={`/explore/${destinationId}`}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold text-zinc-100 bg-zinc-950/80 hover:bg-zinc-900 border border-zinc-800/80 backdrop-blur-md shadow-lg transition-all hover:scale-105 active:scale-95 group"
          >
            <ArrowLeft className="w-4 h-4 text-amber-400 group-hover:-translate-x-0.5 transition-transform" />
            <span>Return to Details</span>
          </Link>

          <div className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-full text-xs bg-zinc-950/80 backdrop-blur-md border border-zinc-800/80 text-zinc-300">
            <span className="font-bold text-white">{destinationName}</span>
            <span className="text-zinc-600">•</span>
            <span className="inline-flex items-center gap-1 text-[11px] text-amber-400 font-semibold">
              <Sparkles className="w-3 h-3" />
              {mode === 'walk' ? 'Walk Mode' : mode === 'inspect' ? 'Inspect Mode' : 'Guided Tour'}
            </span>
          </div>
        </div>

        {/* Center: Exploration Mode Switcher */}
        <div className="pointer-events-auto flex items-center p-1 rounded-full bg-zinc-950/90 backdrop-blur-md border border-zinc-800 shadow-xl">
          <button
            type="button"
            onClick={() => onModeChange('walk')}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              mode === 'walk'
                ? 'bg-gradient-to-r from-amber-400 to-yellow-400 text-zinc-950 shadow-md shadow-amber-500/20'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            <Footprints className="w-3.5 h-3.5" />
            <span>Walk</span>
          </button>

          <button
            type="button"
            onClick={() => onModeChange('inspect')}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              mode === 'inspect'
                ? 'bg-gradient-to-r from-amber-400 to-yellow-400 text-zinc-950 shadow-md shadow-amber-500/20'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Inspect</span>
          </button>

          <button
            type="button"
            onClick={() => onModeChange('tour')}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              mode === 'tour'
                ? 'bg-gradient-to-r from-amber-400 to-yellow-400 text-zinc-950 shadow-md shadow-amber-500/20'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Tour</span>
          </button>
        </div>

        {/* Right: Pause, 2D Map, Colliders, Help & Fullscreen */}
        <div className="pointer-events-auto flex items-center gap-1.5 sm:gap-2">
          {onToggle2D && (
            <button
              type="button"
              onClick={onToggle2D}
              className="p-2 sm:p-2.5 rounded-full bg-zinc-950/80 hover:bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-amber-400 backdrop-blur-md transition-all active:scale-95"
              title="Switch to 2D Interactive Floor Plan"
              aria-label="2D Floor Plan"
            >
              <Map className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          )}
          {onPause && (
            <button
              type="button"
              onClick={onPause}
              className="p-2 sm:p-2.5 rounded-full bg-zinc-950/80 hover:bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-amber-400 backdrop-blur-md transition-all active:scale-95"
              title="Pause & Settings"
              aria-label="Pause & Settings"
            >
              <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          )}

          {onToggleColliders && (
            <button
              type="button"
              onClick={onToggleColliders}
              className={`p-2 sm:p-2.5 rounded-full border backdrop-blur-md transition-all active:scale-95 ${
                showColliders
                  ? 'bg-amber-400 text-zinc-950 border-amber-300 shadow-md shadow-amber-500/30'
                  : 'bg-zinc-950/80 hover:bg-zinc-900 border-zinc-800 text-zinc-300 hover:text-amber-400'
              }`}
              title={showColliders ? 'Hide Physical Colliders' : 'Show Physical Colliders (Debug Wireframe)'}
              aria-label="Toggle Physical Colliders"
            >
              <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          )}

          <button
            type="button"
            onClick={() => setShowHelp(!showHelp)}
            className="p-2 sm:p-2.5 rounded-full bg-zinc-950/80 hover:bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-amber-400 backdrop-blur-md transition-all active:scale-95"
            title="Controls & Instructions"
            aria-label="Controls & Instructions"
          >
            <HelpCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          <button
            type="button"
            onClick={toggleFullscreen}
            className="p-2 sm:p-2.5 rounded-full bg-zinc-950/80 hover:bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-amber-400 backdrop-blur-md transition-all active:scale-95"
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            aria-label="Toggle Fullscreen"
          >
            {isFullscreen ? (
              <Minimize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            ) : (
              <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            )}
          </button>
        </div>
      </header>

      {/* Walk Mode Pointer Lock Instruction Callout (Desktop only when pointer is unlocked) */}
      {mode === 'walk' && !isPointerLocked && !isTouchDevice && (
        <div className="pointer-events-auto self-center text-center my-auto">
          <button
            type="button"
            onClick={onRequestPointerLock}
            className="group flex flex-col items-center gap-3 px-8 py-5 rounded-3xl bg-zinc-950/90 hover:bg-zinc-950 border border-amber-500/40 hover:border-amber-400 backdrop-blur-xl shadow-2xl transition-all hover:scale-105 active:scale-95"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 group-hover:bg-amber-400 group-hover:text-zinc-950 text-amber-400 border border-amber-500/20 flex items-center justify-center transition-colors">
              <MousePointer className="w-6 h-6 stroke-[2.3]" />
            </div>
            <div className="space-y-1">
              <p className="text-sm sm:text-base font-bold text-white tracking-wide">
                Click to Enter First-Person Walk
              </p>
              <p className="text-xs text-zinc-400">
                Locks cursor for mouse look • Move with <strong className="text-amber-400">W, A, S, D</strong> or Arrow Keys
              </p>
            </div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400/80 pt-1">
              Press [ESC] at any time to release mouse
            </span>
          </button>
        </div>
      )}

      {/* Center Modal: Navigation Help */}
      {showHelp && (
        <div className="pointer-events-auto self-center max-w-sm w-full p-6 rounded-3xl bg-zinc-950/95 border border-amber-500/30 backdrop-blur-xl shadow-2xl text-center space-y-4 my-auto">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center mx-auto">
            <Compass className="w-5 h-5" />
          </div>
          <h4 className="text-base font-bold text-white">Exploration Controls Guide</h4>

          <div className="text-xs text-zinc-300 space-y-3 text-left bg-zinc-900/60 p-4 rounded-2xl border border-zinc-800">
            <div>
              <p className="font-bold text-amber-400 mb-1">Desktop Controls:</p>
              <p>• <strong>W, A, S, D / Arrows:</strong> Move &amp; strafe</p>
              <p>• <strong>Shift:</strong> Sprint</p>
              <p>• <strong>Space:</strong> Jump (context-aware)</p>
              <p>• <strong>Mouse:</strong> Look around (yaw &amp; pitch)</p>
              <p>• <strong>Escape / P:</strong> Release cursor or pause</p>
            </div>

            <div className="pt-2 border-t border-zinc-800">
              <p className="font-bold text-amber-400 mb-1">Mobile Touch Controls:</p>
              <p>• <strong>Left Joystick:</strong> Analog move &amp; strafe</p>
              <p>• <strong>Right Screen:</strong> Swipe to look around</p>
              <p>• <strong>Sprint Button:</strong> Hold to run</p>
              <p>• <strong>Pause Button:</strong> Sensitivity &amp; position reset</p>
            </div>

            <div className="pt-2 border-t border-zinc-800">
              <p className="font-bold text-amber-400 mb-1">Inspect Mode (Orbit):</p>
              <p>• <strong>Drag:</strong> Orbit camera around monument</p>
              <p>• <strong>Scroll / Pinch:</strong> Zoom in / out</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowHelp(false)}
            className="w-full py-2.5 rounded-xl text-xs font-bold text-zinc-950 bg-amber-400 hover:bg-amber-300 transition-colors"
          >
            Close Guide
          </button>
        </div>
      )}

      {/* Bottom Bar: Mode-Specific HUD Controls */}
      <footer className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {mode === 'walk' ? (
          /* Walk Mode Status Pill */
          <div className="pointer-events-auto flex items-center gap-2 sm:gap-3 px-3.5 sm:px-4 py-2 rounded-full bg-zinc-950/80 backdrop-blur-md border border-zinc-800 shadow-lg text-[11px] sm:text-xs">
            {isTouchDevice ? (
              <span className="flex items-center gap-1.5 font-semibold text-white">
                <Footprints className="w-3.5 h-3.5 text-amber-400" />
                <span>Touch Controls Active (Joystick &amp; Swipe Look)</span>
              </span>
            ) : (
              <>
                <span className="flex items-center gap-1.5 font-semibold text-white">
                  <Footprints className="w-3.5 h-3.5 text-amber-400" />
                  <span>WASD Locomotion Active</span>
                </span>
                <span className="text-zinc-600">|</span>
                {isPointerLocked ? (
                  <span className="flex items-center gap-1 text-emerald-400 font-medium">
                    <Lock className="w-3 h-3" /> Cursor Locked (Press ESC to unlock)
                  </span>
                ) : (
                  <span className="text-amber-400 font-medium">
                    Click canvas to lock mouse
                  </span>
                )}
              </>
            )}
          </div>
        ) : (
          /* Inspect Mode: Camera Preset Quick Jumps */
          onSetCameraView && (
            <div className="pointer-events-auto flex items-center gap-1.5 p-1.5 rounded-full bg-zinc-950/80 backdrop-blur-md border border-zinc-800/80 shadow-lg overflow-x-auto max-w-full">
              <span className="px-2.5 text-[10px] font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1">
                <Camera className="w-3 h-3 text-amber-400" /> Views:
              </span>

              <button
                type="button"
                onClick={() => onSetCameraView('panoramic')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  activeView === 'panoramic'
                    ? 'bg-amber-400 text-zinc-950 font-semibold'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
              >
                Overview
              </button>

              <button
                type="button"
                onClick={() => onSetCameraView('mausoleum')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  activeView === 'mausoleum'
                    ? 'bg-amber-400 text-zinc-950 font-semibold'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
              >
                Mausoleum
              </button>

              <button
                type="button"
                onClick={() => onSetCameraView('pool')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  activeView === 'pool'
                    ? 'bg-amber-400 text-zinc-950 font-semibold'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
              >
                Reflecting Pool
              </button>

              <button
                type="button"
                onClick={() => onSetCameraView('gate')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  activeView === 'gate'
                    ? 'bg-amber-400 text-zinc-950 font-semibold'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
              >
                Great Gate
              </button>
            </div>
          )
        )}

        {/* Right Info Pill */}
        <div className="pointer-events-auto hidden md:flex items-center gap-2 px-4 py-2 rounded-full text-xs text-zinc-400 bg-zinc-950/80 backdrop-blur-md border border-zinc-800/80 shadow-lg">
          {mode === 'walk' ? (
            <>
              <span className="text-zinc-300">Speed: ~4.8 m/s</span>
              <span className="text-zinc-600">|</span>
              <span className="text-amber-400 font-medium">Eye Level: 1.7m</span>
            </>
          ) : (
            <>
              <Eye className="w-3.5 h-3.5 text-amber-400" />
              <span>Drag to Orbit • Scroll to Zoom</span>
              <span className="text-zinc-600">|</span>
              <span className="flex items-center gap-1 text-zinc-400">
                <Layers className="w-3 h-3 text-emerald-400" /> PBR Materials Active
              </span>
            </>
          )}
        </div>
      </footer>
    </div>
  );
}
