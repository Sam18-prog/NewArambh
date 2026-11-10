import React from 'react';
import Link from 'next/link';
import { MapPin, Compass, Eye, Route, ArrowRight, Sparkles } from 'lucide-react';
import { Destination } from '@/types/destination';

interface DestinationCardProps {
  destination: Destination;
}

export default function DestinationCard({ destination }: DestinationCardProps) {
  const isDemo = destination.isDemo;

  return (
    <article className="group relative rounded-3xl bg-zinc-900/50 hover:bg-zinc-900/90 border border-zinc-800/80 hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl hover:-translate-y-1">
      {/* Thumbnail Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-zinc-950">
        <div
          className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{ backgroundImage: `url('${destination.thumbnailUrl}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />

        {/* Top Floating Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
          <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-zinc-950/80 backdrop-blur-md text-amber-300 border border-amber-500/30 shadow-md">
            {destination.categoryLabel}
          </span>

          {isDemo ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-zinc-950 shadow-md">
              <Sparkles className="w-3 h-3" />
              DEMO READY
            </span>
          ) : (
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-zinc-900/80 text-zinc-400 border border-zinc-700">
              UPCOMING
            </span>
          )}
        </div>

        {/* Bottom Mode Indicators */}
        <div className="absolute bottom-3 left-4 right-4 flex items-center gap-3 text-[11px] text-zinc-300">
          {destination.availableModes.includes('walk') && (
            <span className="flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-md">
              <Compass className="w-3 h-3 text-amber-400" /> Walk
            </span>
          )}
          {destination.availableModes.includes('inspect') && (
            <span className="flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-md">
              <Eye className="w-3 h-3 text-amber-400" /> Inspect
            </span>
          )}
          {destination.availableModes.includes('tour') && (
            <span className="flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-md">
              <Route className="w-3 h-3 text-amber-400" /> Tour
            </span>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs text-amber-400/90 font-medium">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{destination.location}</span>
          </div>

          <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1">
            {destination.name}
          </h3>

          <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
            {destination.description}
          </p>
        </div>

        {/* Card Footer & Navigation Link */}
        <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between">
          <div className="text-[11px] text-zinc-400">
            <span>{destination.stats.hotspotsCount} Hotspots</span>
            <span className="mx-1.5">•</span>
            <span>{destination.stats.estimatedVisitMinutes} min</span>
          </div>

          <Link
            href={`/explore/${destination.id}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-zinc-950 bg-amber-400 hover:bg-amber-300 transition-all group-hover:shadow-md group-hover:shadow-amber-500/20"
          >
            <span>Explore</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
}
