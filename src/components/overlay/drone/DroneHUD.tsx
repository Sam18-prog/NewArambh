'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Compass,
  Footprints,
  Sparkles,
  Maximize2,
  Minimize2,
  RotateCcw,
  Zap,
  HelpCircle,
  X,
  Eye,
  Crosshair,
  Layers,
  Map,
  Pause,
  Camera,
} from 'lucide-react';
import { DronePreset, DroneTelemetry } from '@/types/drone';
import { EducationalHotspot } from '@/types/hotspot';
import { ExplorationMode } from '@/types/destination';

interface DroneHUDProps {
  destinationId: string;
  destinationName: string;
  telemetry: DroneTelemetry;
  presets: DronePreset[];
  activePresetId?: string | null;
  onSelectPreset: (presetId: string) => void;
  onClearPreset: () => void;
  onResetPosition: () => void;
  onModeChange: (mode: ExplorationMode) => void;
  isPointerLocked: boolean;
  onRequestPointerLock: () => void;
  nearbyLandmark?: EducationalHotspot | null;
  onFocusLandmark?: (landmarkId: string) => void;
  onOpenLandmarkDetails?: (hotspot: EducationalHotspot) => void;
  onToggle2D?: () => void;
  onPause?: () => void;
  isTouchDevice?: boolean;
}

export default function DroneHUD({
  destinationId,
  destinationName,
  telemetry,
  presets,
  activePresetId,
  onSelectPreset,
  onClearPreset,
  onResetPosition,
  onModeChange,
  isPointerLocked,
  onRequestPointerLock,
  nearbyLandmark,
  onFocusLandmark,
  onOpenLandmarkDetails,
  onToggle2D,
  onPause,
  isTouchDevice = false,
}: DroneHUDProps) {
  const [showHelp, setShowHelp] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Convert compass degrees to 8-point compass label
  const getCompassDirection = (deg: number) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(deg / 45) % 8;
    return directions[index];
  };

  return (
    <div className="pointer-events-none absolute inset-0 z-30 flex flex-col justify-between p-4 sm:p-6 select-none">
      {/* Center Drone Flight Reticle (Active when pointer locked) */}
      {!isTouchDevice && isPointerLocked && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="relative flex items-center justify-center">
            {/* Center crosshair dot */}
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-sm shadow-black" />
            {/* Flight reticle brackets */}
            <div className="absolute w-8 h-8 rounded-full border border-amber-400/40" />
            <div className="absolute w-12 h-1 border-t border-b border-amber-400/20" />
            <div className="absolute h-12 w-1 border-l border-r border-amber-400/20" />
          </div>
        </div>
      )}

      {/* TOP BAR */}
      <header className="flex items-center justify-between gap-4">
        {/* Left: Return & Destination / Mode Badge */}
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
            <span className="inline-flex items-center gap-1.5 text-[11px] text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/30">
              <Crosshair className="w-3 h-3 text-amber-400 animate-pulse" />
              Drone View
            </span>
          </div>
        </div>

        {/* Center: Exploration Mode Selector (Walk | Drone | Tour) */}
        <div className="pointer-events-auto flex items-center p-1 rounded-full bg-zinc-950/90 backdrop-blur-md border border-zinc-800 shadow-xl">
          <button
            type="button"
            onClick={() => onModeChange('walk')}
            className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold text-zinc-400 hover:text-white hover:bg-zinc-900 transition-all cursor-pointer"
          >
            <Footprints className="w-3.5 h-3.5" />
            <span>Walk</span>
          </button>

          <button
            type="button"
            onClick={() => onModeChange('drone')}
            className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-amber-400 to-yellow-400 text-zinc-950 shadow-md shadow-amber-500/20 transition-all cursor-pointer"
          >
            <Crosshair className="w-3.5 h-3.5" />
            <span>Drone</span>
          </button>

          <button
            type="button"
            onClick={() => onModeChange('tour')}
            className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold text-zinc-400 hover:text-white hover:bg-zinc-900 transition-all cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Tour</span>
          </button>
        </div>

        {/* Right Utility Buttons: 2D Map, Pause, Help & Fullscreen */}
        <div className="pointer-events-auto flex items-center gap-1.5 sm:gap-2">
          {onToggle2D && (
            <button
              type="button"
              onClick={onToggle2D}
              className="p-2 sm:p-2.5 rounded-full bg-zinc-950/80 hover:bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-amber-400 backdrop-blur-md transition-all active:scale-95 cursor-pointer"
              title="Switch to 2D Floor Plan"
              aria-label="2D Floor Plan"
            >
              <Map className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          )}

          {onPause && (
            <button
              type="button"
              onClick={onPause}
              className="p-2 sm:p-2.5 rounded-full bg-zinc-950/80 hover:bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-amber-400 backdrop-blur-md transition-all active:scale-95 cursor-pointer"
              title="Pause & Settings"
              aria-label="Pause"
            >
              <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          )}

          <button
            type="button"
            onClick={() => setShowHelp(!showHelp)}
            className={`p-2 sm:p-2.5 rounded-full border backdrop-blur-md transition-all active:scale-95 cursor-pointer ${
              showHelp
                ? 'bg-amber-400 text-zinc-950 border-amber-300 shadow-md shadow-amber-500/30'
                : 'bg-zinc-950/80 hover:bg-zinc-900 border-zinc-800 text-zinc-300 hover:text-amber-400'
            }`}
            title="Drone Flight Controls Guide"
            aria-label="Flight Controls Guide"
          >
            <HelpCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          <button
            type="button"
            onClick={toggleFullscreen}
            className="p-2 sm:p-2.5 rounded-full bg-zinc-950/80 hover:bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-amber-400 backdrop-blur-md transition-all active:scale-95 hidden sm:block cursor-pointer"
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

      {/* MIDDLE FLOATING NOTIFICATION: AERIAL LANDMARK DISCOVERY (Section 8) */}
      {nearbyLandmark && (
        <div className="pointer-events-auto self-center max-w-md w-full mx-4 my-2 p-3 sm:p-4 rounded-2xl bg-zinc-950/90 border border-amber-500/40 backdrop-blur-xl shadow-2xl flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                Landmark Discovered
              </div>
              <div className="text-xs sm:text-sm font-bold text-white truncate">
                {nearbyLandmark.name}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {onFocusLandmark && (
              <button
                type="button"
                onClick={() => onFocusLandmark(nearbyLandmark.id)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 hover:text-white transition-all cursor-pointer flex items-center gap-1"
                title="Point camera at landmark"
              >
                <Eye className="w-3 h-3 text-amber-400" />
                <span className="hidden sm:inline">Focus</span>
              </button>
            )}

            {onOpenLandmarkDetails && (
              <button
                type="button"
                onClick={() => onOpenLandmarkDetails(nearbyLandmark)}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-400 hover:bg-amber-300 text-zinc-950 transition-all shadow-md cursor-pointer"
              >
                Details
              </button>
            )}
          </div>
        </div>
      )}

      {/* DESKTOP CLICK-TO-FLY PROMPT (when not pointer locked and not on touch) */}
      {!isTouchDevice && !isPointerLocked && !showHelp && (
        <div className="pointer-events-auto self-center bg-zinc-950/90 border border-amber-500/30 backdrop-blur-md px-5 py-2.5 rounded-full shadow-2xl text-center flex items-center gap-2 cursor-pointer hover:border-amber-400 transition-all"
          onClick={onRequestPointerLock}
        >
          <Crosshair className="w-4 h-4 text-amber-400 animate-spin" />
          <span className="text-xs font-semibold text-zinc-200">
            Click anywhere on screen for <strong className="text-amber-400">Mouse Flight Control</strong>
          </span>
        </div>
      )}

      {/* BOTTOM TELEMETRY & CONTROLS SECTION */}
      <footer className="space-y-3">
        {/* Row 1: Cinematic Aerial Camera Presets */}
        <div className="pointer-events-auto flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-zinc-950/90 border border-zinc-800 text-zinc-400 shrink-0">
            <Camera className="w-3 h-3 text-amber-400" />
            <span>Aerial Presets:</span>
          </div>

          {presets.map((p) => {
            const isSelected = activePresetId === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => onSelectPreset(p.id)}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-amber-400 text-zinc-950 font-bold shadow-md shadow-amber-500/20'
                    : 'bg-zinc-950/80 hover:bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white'
                }`}
                title={p.description || p.label}
              >
                {p.label}
              </button>
            );
          })}

          {activePresetId && (
            <button
              type="button"
              onClick={onClearPreset}
              className="px-3 py-1 rounded-full text-xs font-semibold bg-zinc-800 text-amber-300 hover:bg-zinc-700 transition-all cursor-pointer whitespace-nowrap"
            >
              Resume Free Flight
            </button>
          )}

          <button
            type="button"
            onClick={onResetPosition}
            className="p-1.5 rounded-full bg-zinc-950/80 hover:bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-amber-400 transition-all cursor-pointer ml-auto shrink-0"
            title="Reset Drone Position (R)"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Row 2: Flight Telemetry Bar (Altitude, Speed, Heading, Coordinates) */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Telemetry Gauges */}
          <div className="pointer-events-auto flex flex-wrap items-center gap-2">
            {/* Relative Altitude */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-950/90 border border-zinc-800 backdrop-blur-md shadow-md">
              <span className="text-[10px] uppercase font-bold text-zinc-500">Altitude</span>
              <span className="font-mono font-bold text-amber-400">
                {telemetry.altitude >= 0 ? `+${telemetry.altitude}` : telemetry.altitude}m
              </span>
              <span className="text-[10px] text-zinc-600">(rel)</span>
            </div>

            {/* Flight Speed Mode */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-950/90 border border-zinc-800 backdrop-blur-md shadow-md">
              <Zap className={`w-3 h-3 ${telemetry.speedMode === 'turbo' ? 'text-amber-400 fill-amber-400' : 'text-zinc-500'}`} />
              <span className="text-[10px] uppercase font-bold text-zinc-500">Speed</span>
              <span className="font-mono font-bold text-white">
                {telemetry.currentSpeed} m/s
              </span>
              <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                telemetry.speedMode === 'turbo'
                  ? 'bg-amber-400 text-zinc-950'
                  : 'bg-zinc-800 text-zinc-400'
              }`}>
                {telemetry.speedMode === 'turbo' ? 'TURBO' : 'NORMAL'}
              </span>
            </div>

            {/* Heading Compass */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-950/90 border border-zinc-800 backdrop-blur-md shadow-md">
              <Compass className="w-3 h-3 text-amber-400" />
              <span className="font-mono font-bold text-white">
                {telemetry.heading}° {getCompassDirection(telemetry.heading)}
              </span>
            </div>
          </div>

          {/* Quick Controls Cheat Sheet (Desktop) */}
          {!isTouchDevice && (
            <div className="hidden md:flex items-center gap-2 text-[11px] text-zinc-400 bg-zinc-950/70 px-3 py-1 rounded-full border border-zinc-800/80">
              <span><strong className="text-zinc-200">WASD</strong> Fly</span>
              <span className="text-zinc-700">•</span>
              <span><strong className="text-zinc-200">Space</strong> Ascend</span>
              <span className="text-zinc-700">•</span>
              <span><strong className="text-zinc-200">Ctrl</strong> Descend</span>
              <span className="text-zinc-700">•</span>
              <span><strong className="text-zinc-200">Shift</strong> Turbo</span>
              <span className="text-zinc-700">•</span>
              <span><strong className="text-zinc-200">R</strong> Reset</span>
            </div>
          )}
        </div>
      </footer>

      {/* HELP DRAWER / MODAL (Desktop Drone Controls Reference) */}
      {showHelp && (
        <div className="pointer-events-auto fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-3xl bg-zinc-950 border border-amber-500/30 p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <Crosshair className="w-4 h-4" />
                </div>
                <h3 className="text-lg font-black text-white">Drone View Controls</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowHelp(false)}
                className="p-1.5 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
                aria-label="Close Help"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800">
                  <span className="text-zinc-400">Fly Forward / Back</span>
                  <span className="font-mono font-bold text-amber-400">W / S</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800">
                  <span className="text-zinc-400">Strafe Left / Right</span>
                  <span className="font-mono font-bold text-amber-400">A / D</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800">
                  <span className="text-zinc-400">Ascend (Fly Up)</span>
                  <span className="font-mono font-bold text-amber-400">Space</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800">
                  <span className="text-zinc-400">Descend (Fly Down)</span>
                  <span className="font-mono font-bold text-amber-400">Ctrl / C</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800">
                  <span className="text-zinc-400">Camera Rotation</span>
                  <span className="font-mono font-bold text-amber-400">Mouse</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800">
                  <span className="text-zinc-400">Turbo Speed Boost</span>
                  <span className="font-mono font-bold text-amber-400">Shift</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800">
                  <span className="text-zinc-400">Reset Position</span>
                  <span className="font-mono font-bold text-amber-400">R</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800">
                  <span className="text-zinc-400">Release Mouse Look</span>
                  <span className="font-mono font-bold text-amber-400">Esc</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 leading-relaxed">
                <strong>Flight Guidance:</strong> The virtual drone uses physical acceleration and hovering physics. You can fly freely around domes, spires, and courtyards within the destination&apos;s architectural flight boundary.
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowHelp(false)}
                className="px-5 py-2.5 rounded-full text-xs font-bold bg-amber-400 text-zinc-950 hover:bg-amber-300 transition-colors shadow-md cursor-pointer"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
