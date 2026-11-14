'use client';

import React, { useState } from 'react';
import { Calendar, Clock, BookOpen, ExternalLink, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { TimelineEvent } from '@/types/destination';

interface HistoricalTimelineProps {
  destinationName: string;
  events: TimelineEvent[];
  className?: string;
}

export default function HistoricalTimeline({
  destinationName,
  events,
  className = '',
}: HistoricalTimelineProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  if (!events || events.length === 0) return null;

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
            <Calendar className="w-4 h-4" />
            <span>Chronological Milestones &amp; Archival Records</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
            Historical Timeline of {destinationName}
          </h3>
        </div>
        <span className="text-xs font-mono text-zinc-500">
          {events.length} Documented Epochs
        </span>
      </div>

      <div className="relative pl-6 sm:pl-8 before:absolute before:inset-0 before:left-3 sm:before:left-4 before:w-0.5 before:bg-gradient-to-b before:from-amber-400 before:via-zinc-800 before:to-zinc-900 space-y-6 pt-2">
        {events.map((event, idx) => {
          const isExpanded = expandedIndex === idx;
          const isApproximate =
            event.year.toLowerCase().includes('c.') ||
            event.year.toLowerCase().includes('circa') ||
            event.year.toLowerCase().includes('traditional') ||
            event.year.toLowerCase().includes('bce') ||
            event.year.toLowerCase().includes('century');

          return (
            <div key={idx} className="relative group">
              {/* Timeline Node Dot */}
              <div
                className={`absolute -left-[27px] sm:-left-[35px] top-1.5 w-4 h-4 rounded-full border-2 transition-transform duration-300 ${
                  isExpanded
                    ? 'bg-amber-400 border-zinc-950 scale-125 shadow-lg shadow-amber-500/50'
                    : 'bg-zinc-950 border-amber-500/60 group-hover:border-amber-400'
                }`}
              />

              <div
                onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                className={`rounded-2xl p-5 border transition-all cursor-pointer ${
                  isExpanded
                    ? 'bg-zinc-900/90 border-amber-500/40 shadow-xl'
                    : 'bg-zinc-950/60 hover:bg-zinc-900/60 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                        {event.year}
                      </span>
                      {isApproximate && (
                        <span className="text-[10px] text-zinc-400 italic">
                          (Approximate / Traditional chronology)
                        </span>
                      )}
                    </div>
                    <h4 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                      {event.title}
                    </h4>
                  </div>

                  <button
                    type="button"
                    className="p-1 rounded-lg text-zinc-400 hover:text-white shrink-0 mt-0.5"
                    aria-label={isExpanded ? 'Collapse event' : 'Expand event'}
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                {/* Event Description */}
                <p className={`text-xs sm:text-sm text-zinc-300 leading-relaxed mt-2.5 ${!isExpanded ? 'line-clamp-2' : ''}`}>
                  {event.description}
                </p>

                {/* Expanded Source Details */}
                {isExpanded && event.source && (
                  <div className="mt-3 pt-3 border-t border-zinc-800/80 flex items-center gap-2 text-[11px] text-zinc-400">
                    <BookOpen className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Source: <strong className="text-zinc-200">{event.source}</strong></span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
