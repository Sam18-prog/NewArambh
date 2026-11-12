'use client';

import React from 'react';
import Link from 'next/link';
import {
  Trophy,
  RotateCcw,
  Footprints,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { TAJ_MAHAL_TOUR_STOPS } from '@/data/tours/tajMahalTour';

interface TourCompletionModalProps {
  isOpen: boolean;
  onReplay: () => void;
  onContinueFreeWalk: () => void;
  destinationId: string;
  destinationName: string;
}

export default function TourCompletionModal({
  isOpen,
  onReplay,
  onContinueFreeWalk,
  destinationId,
  destinationName,
}: TourCompletionModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md select-none animate-in fade-in duration-300">
      <div className="relative w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-zinc-950/95 border border-amber-500/40 shadow-2xl shadow-amber-500/15 space-y-6 text-center">
        {/* Trophy Header Icon */}
        <div className="mx-auto w-16 h-16 rounded-3xl bg-gradient-to-tr from-amber-500 to-yellow-300 text-zinc-950 flex items-center justify-center shadow-lg shadow-amber-500/30">
          <Trophy className="w-8 h-8 stroke-[2.2]" />
        </div>

        {/* Title & Congratulations */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold block">
            Guided Exploration Complete
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Journey Completed
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300 max-w-sm mx-auto leading-relaxed">
            You have explored all 5 architectural milestones of {destinationName}.
          </p>
        </div>

        {/* Visited Stops Checklist */}
        <div className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 text-left space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 font-bold block">
            Explored Architectural Landmarks
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {TAJ_MAHAL_TOUR_STOPS.map((stop) => (
              <div key={stop.id} className="flex items-center gap-2 text-zinc-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="font-medium truncate">{stop.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Choices */}
        <div className="space-y-3">
          {/* 1. Continue Free Walking */}
          <button
            type="button"
            onClick={onContinueFreeWalk}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-5 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-zinc-950 font-bold text-xs sm:text-sm shadow-lg shadow-amber-500/25 active:scale-98 transition-all"
          >
            <Footprints className="w-4 h-4" />
            <span>Continue Free Exploration</span>
          </button>

          {/* 2. Replay Tour */}
          <button
            type="button"
            onClick={onReplay}
            className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700/80 text-zinc-200 font-semibold text-xs active:scale-98 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
            <span>Replay Guided Tour</span>
          </button>

          {/* 3. Return to Details */}
          <Link
            href={`/explore/${destinationId}`}
            className="inline-flex items-center justify-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white pt-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Destination Overview</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
