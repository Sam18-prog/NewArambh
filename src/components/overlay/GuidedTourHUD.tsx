'use client';

import React from 'react';
import {
  Compass,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  X,
  BookOpen,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { TourStop } from '@/types/tour';

interface GuidedTourHUDProps {
  currentStop: TourStop;
  currentIndex: number;
  totalStops: number;
  isPaused: boolean;
  onNext: () => void;
  onPrev: () => void;
  onTogglePause: () => void;
  onExit: () => void;
  onOpenDetails: () => void;
}

export default function GuidedTourHUD({
  currentStop,
  currentIndex,
  totalStops,
  isPaused,
  onNext,
  onPrev,
  onTogglePause,
  onExit,
  onOpenDetails,
}: GuidedTourHUDProps) {
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === totalStops - 1;
  const progressPercent = ((currentIndex + 1) / totalStops) * 100;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 sm:bottom-8 z-40 flex flex-col items-center justify-end px-4 sm:px-6 select-none animate-in fade-in slide-in-from-bottom-6 duration-300">
      <div className="pointer-events-auto w-full max-w-2xl rounded-3xl bg-zinc-950/95 border border-amber-500/40 backdrop-blur-xl shadow-2xl shadow-amber-500/15 overflow-hidden">
        {/* Progress Bar Line */}
        <div className="w-full h-1 bg-zinc-800">
          <div
            className="h-full bg-gradient-to-r from-amber-400 to-yellow-400 transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Content Box */}
        <div className="p-4 sm:p-5 space-y-3">
          {/* Header Row: Category, Stop Counter & Exit */}
          <div className="flex items-center justify-between gap-2 border-b border-zinc-800/80 pb-2.5">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-md bg-amber-400/15 text-amber-400">
                <Compass className="w-3.5 h-3.5 animate-spin-slow" />
              </span>
              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold">
                Guided Tour • Stop {currentStop.stopNumber} of {totalStops}
              </span>
            </div>

            <button
              type="button"
              onClick={onExit}
              className="flex items-center gap-1 text-[11px] font-semibold text-zinc-400 hover:text-white px-2.5 py-1 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 transition-colors"
              title="Exit Guided Tour"
            >
              <X className="w-3 h-3" />
              <span>Exit Tour</span>
            </button>
          </div>

          {/* Title & Short Explanation */}
          <div className="space-y-1">
            <div className="flex items-baseline gap-2">
              <h3 className="text-base sm:text-lg font-bold text-white tracking-wide">
                {currentStop.name}
              </h3>
              {currentStop.hindiName && (
                <span className="text-xs text-amber-300/80 font-medium hidden sm:inline">
                  {currentStop.hindiName}
                </span>
              )}
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed line-clamp-2 sm:line-clamp-none">
              {currentStop.shortExplanation}
            </p>
          </div>

          {/* Controls Bar: Prev, Read Full Story, Next, Pause */}
          <div className="flex items-center justify-between gap-2 pt-1">
            {/* Left: Previous Button */}
            <button
              type="button"
              onClick={onPrev}
              disabled={isFirst}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all active:scale-95 ${
                isFirst
                  ? 'opacity-40 cursor-not-allowed border-zinc-800 text-zinc-600 bg-zinc-900/50'
                  : 'bg-zinc-900 hover:bg-zinc-800 border-zinc-700 text-zinc-200 hover:text-white'
              }`}
              aria-label="Previous Stop"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Previous</span>
            </button>

            {/* Center: In-Depth Details Button */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onOpenDetails}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-zinc-950 bg-amber-400 hover:bg-amber-300 shadow-md shadow-amber-500/20 active:scale-95 transition-all"
                title="Read In-Depth Architectural Details"
              >
                <BookOpen className="w-3.5 h-3.5 fill-current" />
                <span>Read Full Story</span>
              </button>

              <button
                type="button"
                onClick={onTogglePause}
                className="p-1.5 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white transition-colors"
                title={isPaused ? 'Resume Tour Auto-Timer' : 'Pause Tour Auto-Timer'}
                aria-label={isPaused ? 'Resume Tour' : 'Pause Tour'}
              >
                {isPaused ? <Play className="w-3.5 h-3.5 fill-current" /> : <Pause className="w-3.5 h-3.5 fill-current" />}
              </button>
            </div>

            {/* Right: Next / Finish Button */}
            <button
              type="button"
              onClick={onNext}
              className="flex items-center gap-1 px-4 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-zinc-950 shadow-md shadow-amber-500/20 active:scale-95 transition-all"
              aria-label={isLast ? 'Complete Tour' : 'Next Stop'}
            >
              <span>{isLast ? 'Finish Tour' : 'Next Stop'}</span>
              {isLast ? <CheckCircle2 className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
