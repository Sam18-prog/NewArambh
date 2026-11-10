import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import destinationsData from '@/data/destinations.json';
import { Destination } from '@/types/destination';
import {
  Compass,
  Eye,
  Route,
  MapPin,
  Clock,
  Layers,
  ArrowRight,
  ShieldAlert,
  ArrowLeft,
  Sparkles,
  Info,
  ExternalLink,
  CheckCircle2,
  Map,
} from 'lucide-react';

const destinations: Destination[] = destinationsData as Destination[];

export async function generateStaticParams() {
  return destinations.map((d) => ({
    destinationId: d.id,
  }));
}

export default async function DestinationDetailPage({
  params,
}: {
  params: Promise<{ destinationId: string }>;
}) {
  const { destinationId } = await params;
  const destination = destinations.find((d) => d.id === destinationId);

  if (!destination) {
    notFound();
  }

  const isDemo = destination.isDemo;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col selection:bg-amber-500/30 selection:text-amber-200">
      <Header />

      <main className="flex-1 pb-20">
        {/* Navigation Breadcrumbs & Back Button */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-amber-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Destinations</span>
          </Link>
        </div>

        {/* Hero Banner Section inspired by Visual Direction Image 3 (Mukunda Haveli Courtyard) */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="relative rounded-[2rem] sm:rounded-[2.5rem] border border-amber-500/30 overflow-hidden shadow-2xl bg-zinc-950 min-h-[500px] sm:min-h-[580px] flex items-end">
            {/* Background Photographic Image */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-100 hover:scale-105"
              style={{ backgroundImage: `url('${destination.heroImageUrl}')` }}
            />
            {/* Vignette and Dark Fog Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/90 via-zinc-950/50 to-transparent" />

            {/* Top Badges */}
            <div className="absolute top-6 left-6 right-6 flex flex-wrap items-center justify-between gap-3 z-10">
              <div className="flex flex-wrap gap-2">
                <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-zinc-950/80 backdrop-blur-md text-amber-300 border border-amber-500/30">
                  {destination.categoryLabel}
                </span>
                <span className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-zinc-950/80 backdrop-blur-md text-zinc-300 border border-zinc-700">
                  {destination.reconstructionType}
                </span>
              </div>

              {isDemo && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-amber-400 text-zinc-950 shadow-lg">
                  <Sparkles className="w-3.5 h-3.5" />
                  Demonstration Prototype
                </span>
              )}
            </div>

            {/* Floating Glassmorphic Story Card (Visual Direction Image 3 Aesthetic) */}
            <div className="relative z-10 p-6 sm:p-10 lg:p-12 max-w-2xl space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
                <MapPin className="w-4 h-4 shrink-0" />
                <span>{destination.location}</span>
                <span className="text-zinc-600">•</span>
                <span className="text-zinc-300">{destination.period}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                {destination.name}
              </h1>

              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
                {destination.subtitle}
              </p>

              {/* Enter Virtual Experience Primary CTA Button */}
              <div className="pt-3 flex flex-wrap items-center gap-3">
                <Link
                  href={`/explore/${destination.id}/experience`}
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm font-bold text-zinc-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-300 hover:from-amber-300 hover:to-yellow-200 shadow-xl shadow-amber-500/25 hover:shadow-amber-500/35 transition-all hover:scale-105 active:scale-95"
                >
                  <Compass className="w-5 h-5 stroke-[2.3]" />
                  <span>Enter 3D Experience</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.3]" />
                </Link>

                <Link
                  href={`/explore/${destination.id}/experience?mode=2d`}
                  className="inline-flex items-center gap-2 px-6 py-4 rounded-full text-sm font-semibold text-zinc-200 hover:text-white bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700/80 transition-all hover:scale-105 active:scale-95"
                >
                  <Map className="w-4 h-4 text-amber-400" />
                  <span>2D Floor Plan</span>
                </Link>

                <div className="flex items-center gap-4 text-xs text-zinc-300 bg-zinc-950/80 backdrop-blur-md px-4 py-3 rounded-full border border-white/10">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    {destination.stats.estimatedVisitMinutes} min
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-amber-400" />
                    {destination.stats.hotspotsCount} Hotspots
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Body Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left 8 Columns: Narrative, Highlights, Gallery, Disclosures */}
            <div className="lg:col-span-8 space-y-12">
              {/* Overview & Story */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-white tracking-tight">Overview & Description</h2>
                <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                  {destination.description}
                </p>
              </section>

              {/* Historical Context Narrative */}
              <section className="space-y-4 rounded-3xl p-8 bg-zinc-900/40 border border-zinc-800">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
                  <Info className="w-4 h-4" />
                  <span>Historical & Architectural Context</span>
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  {destination.historicalContext.architecturalStyle}
                </h3>
                <p className="text-xs text-amber-300/80 font-medium">
                  Cultural Significance: {destination.historicalContext.significance}
                </p>

                <div className="space-y-3 pt-2 text-sm text-zinc-300 leading-relaxed">
                  {destination.historicalContext.detailedStory.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>
              </section>

              {/* 5 Architectural Highlights (Hotspots Preview) */}
              <section className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">
                      Architectural Highlights & Hotspots
                    </h2>
                    <p className="text-xs text-zinc-400 mt-1">
                      Interactive points of interest accessible directly in the 3D walkthrough
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    {destination.highlights.length} Points
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {destination.highlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      className="rounded-2xl p-5 bg-zinc-900/50 border border-zinc-800 hover:border-amber-500/30 transition-all space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider">
                          {highlight.category}
                        </span>
                        <span className="text-xs font-bold text-zinc-500">#{idx + 1}</span>
                      </div>
                      <h4 className="text-base font-bold text-white">{highlight.title}</h4>
                      <p className="text-xs text-zinc-400 leading-relaxed">{highlight.description}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Image Gallery */}
              {destination.galleryImages.length > 0 && (
                <section className="space-y-6">
                  <h2 className="text-2xl font-bold text-white tracking-tight">Curatorial Gallery</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {destination.galleryImages.map((img, idx) => (
                      <div
                        key={idx}
                        className="group rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 space-y-2"
                      >
                        <div className="aspect-[16/10] overflow-hidden relative">
                          <div
                            className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                            style={{ backgroundImage: `url('${img.url}')` }}
                          />
                        </div>
                        <div className="p-4 space-y-1">
                          <p className="text-xs text-zinc-300 font-medium leading-relaxed">
                            {img.caption}
                          </p>
                          {img.credit && (
                            <p className="text-[10px] text-zinc-500 uppercase tracking-wider">
                              Source: {img.credit}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Transparent Disclosure & Academic Integrity Notice */}
              <section className="rounded-3xl p-6 sm:p-8 bg-amber-950/20 border border-amber-500/30 space-y-4">
                <div className="flex items-center gap-2.5 text-amber-400 font-bold text-sm">
                  <ShieldAlert className="w-5 h-5 shrink-0" />
                  <span>Ethical Reconstruction & Public Transparency Disclosure</span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  NewArambh is committed to absolute historical transparency. This digital environment
                  is an <strong>Illustrative Demonstration Reconstruction</strong> designed to showcase
                  spatial web technologies and Western Indian architectural principles. We do not claim this
                  model to be a laser-scanned archaeological replica of an existing state monument.
                </p>

                {/* Asset Citations Table */}
                <div className="pt-2 space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-amber-300">
                    Open-Access Source Attribution:
                  </p>
                  <div className="space-y-2">
                    {destination.assetCredits.map((credit, idx) => (
                      <div
                        key={idx}
                        className="rounded-xl p-3 bg-zinc-950/60 border border-zinc-800 text-xs text-zinc-300 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                      >
                        <div>
                          <span className="font-semibold text-white">{credit.assetName}</span> —{' '}
                          <span className="text-zinc-400">{credit.creator}</span>
                        </div>
                        <div className="flex items-center gap-2 text-zinc-400 shrink-0">
                          <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-[10px]">
                            {credit.license}
                          </span>
                          <span className="text-zinc-500">({credit.source})</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href="/licenses"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300"
                  >
                    <span>View Complete Platform Asset Register</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </section>
            </div>

            {/* Right 4 Columns: Exploration Modes & Metadata Sidebar */}
            <aside className="lg:col-span-4 space-y-8">
              {/* Experience Launch Box */}
              <div className="rounded-3xl p-6 sm:p-7 bg-zinc-900/60 border border-zinc-800 shadow-xl space-y-5 sticky top-28">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20">
                    <Compass className="w-3.5 h-3.5" />
                    Live 3D Viewport
                  </div>
                  <h3 className="text-xl font-bold text-white">Ready to Enter?</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Step directly into the 3D environment. Explore the courtyard, inspect stone
                    carvings, and experience the guided path.
                  </p>
                </div>

                <Link
                  href={`/explore/${destination.id}/experience`}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl text-sm font-bold text-zinc-950 bg-amber-400 hover:bg-amber-300 shadow-lg shadow-amber-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Compass className="w-4 h-4 stroke-[2.5]" />
                  <span>Enter Virtual Experience</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </Link>

                {/* Available Modes Checklist */}
                <div className="pt-4 border-t border-zinc-800 space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    Supported Modes in this Destination:
                  </p>

                  <div className="space-y-2.5 text-xs">
                    <div className="flex items-center gap-2.5 text-zinc-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <div>
                        <span className="font-semibold">Walk Mode</span>
                        <p className="text-[11px] text-zinc-400">WASD keyboard & mouse look</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 text-zinc-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <div>
                        <span className="font-semibold">360° Inspection</span>
                        <p className="text-[11px] text-zinc-400">Orbit around architectural features</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 text-zinc-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <div>
                        <span className="font-semibold">Guided Route</span>
                        <p className="text-[11px] text-zinc-400">Automated 5-stop cinematic tour</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Metadata Stats */}
                <div className="pt-4 border-t border-zinc-800 space-y-3 text-xs">
                  <div className="flex justify-between py-1 border-b border-zinc-800/60">
                    <span className="text-zinc-500">Classification:</span>
                    <span className="font-semibold text-zinc-300">{destination.categoryLabel}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-zinc-800/60">
                    <span className="text-zinc-500">Location:</span>
                    <span className="font-semibold text-zinc-300">{destination.location}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-zinc-800/60">
                    <span className="text-zinc-500">Period:</span>
                    <span className="font-semibold text-zinc-300">{destination.period}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-zinc-500">Hotspots:</span>
                    <span className="font-semibold text-amber-400">{destination.stats.hotspotsCount} Interactive Points</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
