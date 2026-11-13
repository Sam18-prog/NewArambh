import React from 'react';
import Link from 'next/link';
import { Compass, ArrowRight, Play, Sparkles, MapPin, Layers, ShieldCheck } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-6 pb-16">
      <div className="max-w-7xl mx-auto">
        {/* Luxury Framed Container */}
        <div className="relative rounded-[2rem] sm:rounded-[2.5rem] border border-amber-500/30 overflow-hidden shadow-2xl shadow-amber-950/40 bg-zinc-950">
          {/* Background Heritage Sunset Image with Gradient Overlays */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
            style={{ backgroundImage: `url('/images/destinations/taj-mahal.jpg')` }}
          />

          {/* Cinematic Vignette and Atmospheric Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-zinc-950/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-transparent" />
          <div className="absolute inset-0 bg-amber-500/5 mix-blend-color-dodge pointer-events-none" />

          {/* Inner Content Grid */}
          <div className="relative z-10 px-6 sm:px-12 lg:px-16 pt-16 sm:pt-24 pb-14 min-h-[640px] flex flex-col justify-between">
            {/* Top Badge */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-amber-300 bg-amber-500/10 border border-amber-500/30 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5" />
                Walk Through History, From Anywhere
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-md">
                <ShieldCheck className="w-3.5 h-3.5" />
                100% Free &amp; Open Access
              </span>
            </div>

            {/* Main Hero Typography & Split Card Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end my-10">
              {/* Left Column: Monumental Headline & CTAs */}
              <div className="lg:col-span-7 space-y-6">
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white uppercase leading-[1.08]">
                  Explore the <br />
                  <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-300 bg-clip-text text-transparent">
                    World Beyond
                  </span>{' '}
                  <br />
                  Boundaries
                </h1>

                <p className="text-zinc-300 text-base sm:text-lg max-w-xl leading-relaxed">
                  Experience the world’s cultural heritage, sacred monuments, and architectural wonders through immersive 3D exploration.
                </p>

                {/* Primary & Secondary Action Buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    href="/explore"
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-bold text-zinc-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-300 hover:from-amber-300 hover:to-yellow-200 shadow-lg shadow-amber-500/25 hover:shadow-amber-500/35 transition-all hover:scale-105 active:scale-95"
                  >
                    <Compass className="w-4 h-4 stroke-[2.5]" />
                    <span>Explore 9 Destinations</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </Link>

                  <Link
                    href="/explore/taj-mahal/3d"
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full text-sm font-semibold text-zinc-200 bg-zinc-900/80 hover:bg-zinc-800/90 border border-zinc-700/80 hover:border-amber-400/50 backdrop-blur-md transition-all hover:scale-105 active:scale-95 group"
                  >
                    <div className="w-5 h-5 rounded-full bg-amber-400/20 flex items-center justify-center text-amber-400 group-hover:bg-amber-400 group-hover:text-zinc-950 transition-colors">
                      <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                    </div>
                    <span>Launch 3D Walkthrough</span>
                  </Link>
                </div>
              </div>

              {/* Right Column: Floating Frosted Destination Card */}
              <div className="lg:col-span-5">
                <div className="rounded-2xl p-6 sm:p-7 backdrop-blur-xl bg-zinc-950/70 border border-amber-500/30 shadow-2xl space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5 text-amber-400 font-semibold tracking-wider uppercase">
                      <MapPin className="w-3.5 h-3.5" />
                      Featured Demonstration
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-amber-500/10 text-amber-300 border border-amber-500/20">
                      UNESCO #252
                    </span>
                  </div>

                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
                      The Taj Mahal
                    </h2>
                    <p className="text-xs text-zinc-400 mt-1">
                      Agra, Uttar Pradesh, India • 1631–1648 CE
                    </p>
                  </div>

                  <p className="text-sm text-zinc-300 leading-relaxed">
                    Step inside an authentic interactive digital exploration of the white Makrana marble masterpiece,
                    symmetrical minarets, grand vaulted iwans, and Charbagh reflecting gardens.
                  </p>

                  <div className="pt-2 flex items-center justify-between border-t border-zinc-800/80">
                    <div className="flex items-center gap-2 text-xs text-zinc-400">
                      <Layers className="w-3.5 h-3.5 text-amber-400" />
                      <span>5 Landmark Stops</span>
                    </div>
                    <Link
                      href="/explore/taj-mahal"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors group"
                    >
                      <span>Explore Taj Mahal</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Luxury Metric Counters */}
            <div className="pt-8 border-t border-zinc-800/60 grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">100% Free</p>
                <p className="text-xs tracking-wider uppercase text-zinc-400 mt-1">Zero Cost &amp; Open Access</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-amber-400 tracking-tight">9 Sites</p>
                <p className="text-xs tracking-wider uppercase text-zinc-400 mt-1">India&apos;s Heritage</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">54 Stops</p>
                <p className="text-xs tracking-wider uppercase text-zinc-400 mt-1">Documented Landmarks</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-amber-400 tracking-tight">7 UNESCO</p>
                <p className="text-xs tracking-wider uppercase text-zinc-400 mt-1">World Heritage Inscriptions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
