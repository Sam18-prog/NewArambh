'use client';

import React, { useState } from 'react';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import Link from 'next/link';
import { allDestinations } from '@/data/destinations/index';
import HistoricalTimeline from '@/components/exploration/HistoricalTimeline';
import { Calendar, Clock, MapPin, Compass, ArrowRight, Layers } from 'lucide-react';

export default function TimelinesExplorerPage() {
  const [selectedDestId, setSelectedDestId] = useState<string>('taj-mahal');

  const selectedDestination =
    allDestinations.find((d) => d.id === selectedDestId) || allDestinations[0];

  return (
    <div className="min-h-screen bg-[#0c0805] text-zinc-100 flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12 w-full">
        {/* Page Hero */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20">
            <Calendar className="w-3.5 h-3.5" />
            <span>Chronological Archives</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Heritage Timelines &amp; Epochs
          </h1>
          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
            Follow the chronological evolution of India’s most monumental architectural wonders across five millennia — from Bronze Age urban planning at Dholavira and the Buddha&apos;s first sermon at Sarnath, to medieval subterranean stepwells in Patan and imperial Mughal marble citadels.
          </p>
        </div>

        {/* Destination Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-zinc-800">
          {allDestinations.map((dest) => (
            <button
              key={dest.id}
              type="button"
              onClick={() => setSelectedDestId(dest.id)}
              className={`px-4 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedDestId === dest.id
                  ? 'bg-amber-400 text-zinc-950 shadow-md shadow-amber-500/20'
                  : 'bg-zinc-900/80 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              {dest.shortName || dest.name}
            </button>
          ))}
        </div>

        {/* Active Destination Card & Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 space-y-6">
            <div className="rounded-3xl p-6 bg-zinc-900/60 border border-zinc-800 shadow-xl space-y-4 sticky top-28">
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedDestination.heroImageUrl}
                  alt={selectedDestination.name}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                  {selectedDestination.categoryLabel}
                </span>
                <h2 className="text-2xl font-bold text-white tracking-tight">
                  {selectedDestination.name}
                </h2>
                <p className="text-xs text-zinc-400">
                  {selectedDestination.location}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800/80 text-xs text-zinc-300 space-y-1">
                <div className="text-[11px] font-bold text-amber-400">Era &amp; Period:</div>
                <div>{selectedDestination.period}</div>
              </div>

              <Link
                href={`/explore/${selectedDestination.id}`}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-bold text-zinc-950 bg-amber-400 hover:bg-amber-300 transition-all shadow-md active:scale-95"
              >
                <span>Explore Complete Site</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-8 bg-zinc-900/40 p-6 sm:p-8 rounded-3xl border border-zinc-800 shadow-xl">
            <HistoricalTimeline
              destinationName={selectedDestination.name}
              events={selectedDestination.timeline}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
