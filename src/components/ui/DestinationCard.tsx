'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Bookmark, Compass } from 'lucide-react';
import { Destination } from '@/types/destination';

interface DestinationCardProps {
  destination: Destination;
}

export default function DestinationCard({ destination }: DestinationCardProps) {
  const isUnesco = destination.heritageClassification === 'unesco';
  const displayName = destination.shortName || destination.name;
  const [isBookmarked, setIsBookmarked] = useState(false);

  const [imgSrc, setImgSrc] = useState(
    destination.thumbnailUrl || destination.heroImageUrl || '/images/destinations/discovery-monuments.jpg'
  );

  const destHref = `/explore/${destination.slug || destination.id}`;
  const threeDHref = `/explore/${destination.slug || destination.id}/3d`;

  return (
    <article className="group relative flex flex-col transition-transform duration-300">
      {/* Thumbnail Container (matching Screenshots 3, 4, 5) */}
      <div className="relative aspect-[16/10] sm:aspect-[16/10.5] rounded-3xl overflow-hidden bg-zinc-950 shadow-2xl">
        <Link href={destHref} className="block w-full h-full relative" aria-label={`View ${displayName}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imgSrc}
            alt={`${displayName} - ${destination.location}`}
            loading="lazy"
            onError={() => setImgSrc('/images/destinations/discovery-monuments.jpg')}
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
          {/* Subtle natural vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />
        </Link>

        {/* Top-Right: Bookmark Icon Button (matching Screenshots 1, 3, 4, 5) */}
        <div className="absolute top-4 right-4 z-20">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsBookmarked(!isBookmarked);
            }}
            className="w-10 h-10 rounded-full bg-zinc-950/60 hover:bg-zinc-900/90 border border-white/20 text-white flex items-center justify-center backdrop-blur-md shadow-lg transition-all active:scale-90 cursor-pointer"
            aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark destination'}
          >
            <Bookmark
              className={`w-4 h-4 transition-colors ${
                isBookmarked ? 'fill-amber-400 text-amber-400' : 'text-white'
              }`}
            />
          </button>
        </div>

        {/* Desktop Quick 3D Hover Pill (subtle, non-intrusive) */}
        <div className="absolute bottom-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-auto hidden sm:block">
          <Link
            href={threeDHref}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-zinc-950 bg-amber-400 hover:bg-amber-300 shadow-lg shadow-black/50 transition-transform active:scale-95"
            onClick={(e) => e.stopPropagation()}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>3D Walk</span>
          </Link>
        </div>
      </div>

      {/* Card Info Below Image (matching Screenshots 3, 4, 5) */}
      <div className="pt-3.5 px-1 space-y-1.5">
        <Link href={destHref} className="block group-hover:text-amber-400 transition-colors">
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
            {displayName}
          </h3>
        </Link>

        {/* Classification Badge Below Title (matching Screenshots 3, 4, 5) */}
        <div>
          {isUnesco ? (
            <span className="inline-block text-xs font-bold text-emerald-500 tracking-wide">
              UNESCO
            </span>
          ) : (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold text-sky-400 bg-sky-950/80 border border-sky-800/40">
              Cultural
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
