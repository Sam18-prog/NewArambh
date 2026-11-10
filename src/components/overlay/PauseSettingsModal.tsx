'use client';

import React from 'react';
import Link from 'next/link';
import { Play, RotateCcw, ArrowLeft, Sliders, Volume2, Shield } from 'lucide-react';
import { TouchControlSettings } from '@/types/input';

interface PauseSettingsModalProps {
  isOpen: boolean;
  onResume: () => void;
  onResetPosition: () => void;
  destinationId: string;
  destinationName: string;
  settings: TouchControlSettings;
  onUpdateSettings: (newSettings: Partial<TouchControlSettings>) => void;
  showColliders?: boolean;
  onToggleColliders?: () => void;
}

export default function PauseSettingsModal({
  isOpen,
  onResume,
  onResetPosition,
  destinationId,
  destinationName,
  settings,
  onUpdateSettings,
  showColliders = false,
  onToggleColliders,
}: PauseSettingsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md select-none animate-in fade-in duration-200">
      <div className="relative w-full max-w-md p-6 sm:p-8 rounded-3xl bg-zinc-950/95 border border-amber-500/40 shadow-2xl shadow-amber-500/10 space-y-6">
        {/* Header */}
        <div className="text-center space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold">
            Virtual Experience
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
            Exploration Paused
          </h2>
          <p className="text-xs text-zinc-400 font-medium">
            {destinationName}
          </p>
        </div>

        {/* Primary Actions */}
        <div className="space-y-3">
          {/* Resume Exploration */}
          <button
            type="button"
            onClick={onResume}
            className="w-full flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-zinc-950 font-bold text-sm shadow-lg shadow-amber-500/25 active:scale-98 transition-all"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Resume Exploration</span>
          </button>

          {/* Reset Position */}
          <button
            type="button"
            onClick={() => {
              onResetPosition();
              onResume();
            }}
            className="w-full flex items-center justify-center gap-2.5 py-3 px-5 rounded-2xl bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700/80 text-zinc-200 font-semibold text-xs active:scale-98 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
            <span>Reset Position to Entrance</span>
          </button>
        </div>

        {/* Controls & Sensitivity Settings */}
        <div className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
            <Sliders className="w-3.5 h-3.5" />
            <span>Touch Controls Settings</span>
          </div>

          {/* Sensitivity Slider */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-zinc-300">Camera Look Sensitivity</span>
              <span className="font-mono text-amber-400 text-[11px]">
                {Math.round(settings.touchLookSensitivity * 1000)}x
              </span>
            </div>
            <input
              type="range"
              min="0.001"
              max="0.007"
              step="0.0005"
              value={settings.touchLookSensitivity}
              onChange={(e) =>
                onUpdateSettings({ touchLookSensitivity: parseFloat(e.target.value) })
              }
              className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
            />
            <div className="flex justify-between text-[10px] text-zinc-500">
              <span>Precise</span>
              <span>Fast</span>
            </div>
          </div>

          {/* Invert Pitch Toggle */}
          <div className="flex items-center justify-between pt-2 border-t border-zinc-800/60">
            <span className="text-xs text-zinc-300">Invert Vertical Look</span>
            <button
              type="button"
              onClick={() => onUpdateSettings({ invertY: !settings.invertY })}
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                settings.invertY ? 'bg-amber-400' : 'bg-zinc-800'
              }`}
            >
              <span
                className={`inline-block h-3.5 w-3.5 transform rounded-full bg-zinc-950 transition-transform ${
                  settings.invertY ? 'translate-x-4.5' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Physics Wireframe Toggle */}
          {onToggleColliders && (
            <div className="flex items-center justify-between pt-2 border-t border-zinc-800/60">
              <div className="flex items-center gap-1.5 text-xs text-zinc-300">
                <Shield className="w-3.5 h-3.5 text-cyan-400" />
                <span>Show Physical Colliders</span>
              </div>
              <button
                type="button"
                onClick={onToggleColliders}
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                  showColliders ? 'bg-cyan-400' : 'bg-zinc-800'
                }`}
              >
                <span
                  className={`inline-block h-3.5 w-3.5 transform rounded-full bg-zinc-950 transition-transform ${
                    showColliders ? 'translate-x-4.5' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          )}
        </div>

        {/* Exit & Return to Details */}
        <div className="pt-2 border-t border-zinc-900">
          <Link
            href={`/explore/${destinationId}`}
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold text-zinc-400 hover:text-white hover:bg-zinc-900/60 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Exit Virtual Experience</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
