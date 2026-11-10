import React from 'react';
import Link from 'next/link';
import { ArrowRight, Compass, Sparkles, MapPin, Eye, Route, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function FeaturedDestination() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/20 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Demonstration Environment
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Featured Destination
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-2xl">
            Experience our first functional 3D digital demonstration—crafted using open-access
            heritage scans, PBR textures, and historical research.
          </p>
        </div>

        <Link
          href="/explore"
          className="inline-flex items-center gap-2 text-sm font-semibold text-amber-400 hover:text-amber-300 transition-colors group self-start md:self-end"
        >
          <span>View All Destinations</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Featured Showcase Card */}
      <div className="relative rounded-3xl bg-zinc-900/60 border border-zinc-800 hover:border-amber-500/40 transition-all duration-300 overflow-hidden shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Left Column: Image Card with Exploration Badges */}
          <div className="lg:col-span-7 relative min-h-[380px] lg:min-h-[520px] overflow-hidden group">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url('/images/destinations/courtyard-haveli.jpg')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-zinc-950/60 hidden lg:block" />

            {/* Floating Overlay Tags */}
            <div className="absolute top-6 left-6 flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-zinc-950/80 backdrop-blur-md text-amber-300 border border-amber-500/30">
                Forts & Palaces
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-zinc-950/80 backdrop-blur-md text-zinc-300 border border-zinc-700">
                16th–17th Century Style
              </span>
            </div>

            {/* Bottom Floating Stats */}
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs text-white/90 bg-zinc-950/80 backdrop-blur-md p-3.5 rounded-2xl border border-white/10">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 font-medium">
                  <Compass className="w-4 h-4 text-amber-400" />
                  Free WASD Walk
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <Eye className="w-4 h-4 text-amber-400" />
                  360° Inspect
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <Route className="w-4 h-4 text-amber-400" />
                  Guided Tour
                </span>
              </div>
              <span className="text-amber-400 font-bold hidden sm:inline">5 Hotspots</span>
            </div>
          </div>

          {/* Right Column: Narrative Information & Action */}
          <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
                <MapPin className="w-4 h-4" />
                <span>Rajasthan, India</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                The Royal Heritage Courtyard
              </h3>

              <p className="text-sm text-zinc-300 leading-relaxed">
                An illustrative digital environment synthesizing the architectural majesty of
                traditional Rajasthani palace courtyards, Shekhawati havelis, and carved mandapa
                colonnades.
              </p>

              {/* Transparent Disclosure Notice */}
              <div className="rounded-xl p-3.5 bg-amber-500/5 border border-amber-500/20 text-xs text-amber-200/90 flex items-start gap-2.5">
                <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Ethical Heritage Disclosure:</strong> This is an educational illustrative
                  reconstruction combining verified architectural elements, not a scanned replica
                  of a single protected monument.
                </span>
              </div>

              {/* Architectural Highlights List */}
              <div className="space-y-2 pt-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Included Architectural Highlights:
                </p>
                <ul className="text-xs text-zinc-300 space-y-1.5">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>The Central Mandapa — Octagonal pillared assembly hall</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Ornate Stone Jharokha — Overhanging convective balcony</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Geometric Baori Stepwell — Rainwater conservation pool</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Monolithic Torana Gateway & Venturi Jali Screens</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 border-t border-zinc-800/80 flex flex-col sm:flex-row gap-3">
              <Link
                href="/explore/heritage-courtyard"
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-zinc-950 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Enter Destination Portal</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/licenses"
                className="inline-flex items-center justify-center px-4 py-3.5 rounded-xl text-xs font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              >
                View Asset Credits
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
