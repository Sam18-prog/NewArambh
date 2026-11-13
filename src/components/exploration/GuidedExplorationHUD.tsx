'use client';

import React from 'react';
import { Landmark } from '@/types/landmark';
import { Destination } from '@/types/destination';
import {
  Compass,
  Route,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  RotateCcw,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

interface GuidedExplorationHUDProps {
  destination: Destination;
  currentStopIndex: number;
  totalStops: number;
  activeLandmark: Landmark;
  isTourMode: boolean;
  onToggleTourMode: () => void;
  onPreviousStop: () => void;
  onNextStop: () => void;
  onSelectStopIndex: (index: number) => void;
  onOpenDetails: () => void;
  onFinishTour?: () => void;
  isTourFinished?: boolean;
  onRestartTour?: () => void;
}

export default function GuidedExplorationHUD({
  destination,
  currentStopIndex,
  totalStops,
  activeLandmark,
  isTourMode,
  onToggleTourMode,
  onPreviousStop,
  onNextStop,
  onSelectStopIndex,
  onOpenDetails,
  onFinishTour,
  isTourFinished = false,
  onRestartTour,
}: GuidedExplorationHUDProps) {
  const progressPercent = Math.round(((currentStopIndex + 1) / totalStops) * 100);
  const isLastStop = currentStopIndex === totalStops - 1;
  const isFirstStop = currentStopIndex === 0;

  return (
    <div className="w-full flex flex-col gap-3 pointer-events-auto">
      {/* Top Floating Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 sm:p-4 rounded-2xl bg-zinc-950/90 backdrop-blur-xl border border-amber-900/40 shadow-2xl text-xs">
        {/* Left: Mode Switcher & Destination Tag */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleTourMode}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition-all ${
              isTourMode
                ? 'bg-amber-400 text-zinc-950 shadow-md shadow-amber-500/20'
                : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            <Route className="w-3.5 h-3.5" />
            <span>Guided Tour</span>
          </button>

          <button
            type="button"
            onClick={onToggleTourMode}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-medium transition-all ${
              !isTourMode
                ? 'bg-amber-400 text-zinc-950 shadow-md shadow-amber-500/20'
                : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Free Explore</span>
          </button>
        </div>

        {/* Center / Right: Progress Counter & Stop Dropdown */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-zinc-300">
            <span className="text-[11px] text-zinc-400 uppercase tracking-wider font-semibold">
              Stop
            </span>
            <select
              value={currentStopIndex}
              onChange={(e) => onSelectStopIndex(Number(e.target.value))}
              aria-label="Select tour stop"
              className="bg-zinc-900 border border-zinc-700 text-amber-300 text-xs font-bold rounded-lg px-2.5 py-1 focus:outline-none focus:ring-1 focus:ring-amber-500"
            >
              {destination.landmarks.map((l, idx) => (
                <option key={l.id} value={idx}>
                  {idx + 1}. {l.name}
                </option>
              ))}
            </select>
            <span className="text-zinc-500 text-[11px]">of {totalStops}</span>
          </div>

          {/* Quick Details Trigger */}
          <button
            type="button"
            onClick={onOpenDetails}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 font-semibold transition-all"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Read Full Story</span>
          </button>
        </div>
      </div>

      {/* Tour Progress Bar & Current Stop Title Card */}
      {isTourMode && (
        <div className="p-4 rounded-2xl bg-zinc-950/80 backdrop-blur-xl border border-amber-900/30 shadow-xl space-y-3">
          {/* Progress Strip */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[11px] text-zinc-400">
              <span className="font-semibold text-amber-300">
                Stop {currentStopIndex + 1}: {activeLandmark.name}
              </span>
              <span className="font-mono text-zinc-500">{progressPercent}%</span>
            </div>
            <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Active Landmark Preview */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
            <p className="text-xs text-zinc-300 line-clamp-1 italic">
              {activeLandmark.shortDescription}
            </p>

            {/* Stepper Buttons */}
            <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
              <button
                type="button"
                onClick={onPreviousStop}
                disabled={isFirstStop}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold text-zinc-300 bg-zinc-900 hover:bg-zinc-800 hover:text-white disabled:opacity-30 disabled:pointer-events-none border border-zinc-800 transition-colors inline-flex items-center gap-1"
                aria-label="Previous tour stop"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Prev</span>
              </button>

              {isLastStop ? (
                <button
                  type="button"
                  onClick={onFinishTour}
                  className="px-4 py-1.5 rounded-xl text-xs font-bold text-zinc-950 bg-gradient-to-r from-amber-400 to-yellow-300 hover:from-amber-300 hover:to-yellow-200 transition-all shadow-md shadow-amber-500/20 inline-flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Complete Journey</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onNextStop}
                  className="px-4 py-1.5 rounded-xl text-xs font-bold text-zinc-950 bg-amber-400 hover:bg-amber-300 transition-all shadow-md shadow-amber-500/20 inline-flex items-center gap-1"
                  aria-label="Next tour stop"
                >
                  <span>Next Stop</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tour Completion Celebration Banner */}
      {isTourFinished && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-950/70 via-zinc-900/90 to-amber-950/70 border border-amber-500/50 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left animate-in fade-in zoom-in-95 duration-300">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-zinc-950 uppercase tracking-wider">
              <Sparkles className="w-3 h-3" /> Journey Completed
            </div>
            <h4 className="text-base font-extrabold text-white">
              You Have Explored All {totalStops} Landmarks of {destination.name}!
            </h4>
            <p className="text-xs text-zinc-400">
              Continue exploring freely on the map or dive into the full architectural research dossiers.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {onRestartTour && (
              <button
                type="button"
                onClick={onRestartTour}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-200 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 transition-colors inline-flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                <span>Restart Tour</span>
              </button>
            )}
            <button
              type="button"
              onClick={onOpenDetails}
              className="px-4 py-2 rounded-xl text-xs font-bold text-zinc-950 bg-amber-400 hover:bg-amber-300 transition-colors inline-flex items-center gap-1.5 shadow-md shadow-amber-500/25"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Review Landmarks</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
