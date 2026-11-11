import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import destinationsData from '@/data/destinations.json';
import courtyardHotspotsData from '@/data/hotspots/heritage-courtyard.json';
import { Destination } from '@/types/destination';
import { EducationalHotspot } from '@/types/hotspot';
import {
  Compass,
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
  Move,
  Footprints,
  Eye,
  Route,
} from 'lucide-react';

const destinations: Destination[] = destinationsData as Destination[];
const courtyardHotspots: EducationalHotspot[] = courtyardHotspotsData as EducationalHotspot[];

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
  const isCourtyard = destination.id === 'heritage-courtyard';
  const hotspotsList = isCourtyard ? courtyardHotspots : [];

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

        {/* Hero Banner Section */}
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

            {/* Floating Story Card */}
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

              {/* Enter Virtual Experience Primary CTA Buttons */}
              <div className="pt-3 flex flex-wrap items-center gap-3">
                <Link
                  href={`/explore/${destination.id}/experience`}
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm font-bold text-zinc-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-300 hover:from-amber-300 hover:to-yellow-200 shadow-xl shadow-amber-500/25 hover:shadow-amber-500/35 transition-all hover:scale-105 active:scale-95"
                >
                  <Compass className="w-5 h-5 stroke-[2.3]" />
                  <span>Enter 3D Walkthrough</span>
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
              {/* Overview & Description */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-white tracking-tight">Overview &amp; Description</h2>
                <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                  {destination.description}
                </p>
              </section>

              {/* Historical Context Narrative */}
              <section className="space-y-4 rounded-3xl p-8 bg-zinc-900/40 border border-zinc-800">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
                  <Info className="w-4 h-4" />
                  <span>Historical &amp; Architectural Context</span>
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

              {/* 5 Architectural Hotspots with Visual Cards */}
              <section className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">
                      Architectural Landmarks &amp; Hotspots
                    </h2>
                    <p className="text-xs text-zinc-400 mt-1">
                      Curated educational hotspots with in-engine interactive markers and deep historical references
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 self-start sm:self-auto">
                    {hotspotsList.length > 0 ? hotspotsList.length : destination.highlights.length} Points of Interest
                  </span>
                </div>

                {/* Hotspot Cards Grid */}
                <div className="grid grid-cols-1 gap-4">
                  {hotspotsList.length > 0
                    ? hotspotsList.map((hotspot, idx) => (
                        <div
                          key={hotspot.id}
                          className="rounded-2xl p-5 sm:p-6 bg-zinc-900/50 border border-zinc-800 hover:border-amber-500/30 transition-all flex flex-col sm:flex-row gap-5 items-start"
                        >
                          {/* Landmark Vector/Photo Thumbnail */}
                          {hotspot.gallery.length > 0 && (
                            <div className="w-full sm:w-40 sm:h-28 rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800/80 shrink-0 relative aspect-[16/10] sm:aspect-auto">
                              <div
                                className="w-full h-full bg-cover bg-center hover:scale-105 transition-transform duration-500"
                                style={{ backgroundImage: `url('${hotspot.gallery[0].url}')` }}
                              />
                            </div>
                          )}

                          {/* Content Details */}
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                                  {hotspot.category}
                                </span>
                                {hotspot.hindiName && (
                                  <span className="text-xs text-zinc-400 font-medium hidden sm:inline">
                                    {hotspot.hindiName}
                                  </span>
                                )}
                              </div>
                              <span className="text-xs font-mono font-bold text-zinc-500">
                                Stop #{idx + 1}
                              </span>
                            </div>

                            <h4 className="text-lg font-bold text-white tracking-tight">
                              {hotspot.name}
                            </h4>

                            <p className="text-xs text-zinc-300 leading-relaxed">
                              {hotspot.shortDescription}
                            </p>

                            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs border-t border-zinc-800/60">
                              <span className="text-[11px] text-zinc-400">
                                Proximity Radius: {hotspot.interactionRadius}m
                              </span>

                              <Link
                                href={`/explore/${destination.id}/experience`}
                                className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors"
                              >
                                <span>Explore in 3D</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))
                    : destination.highlights.map((highlight, idx) => (
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

              {/* Interactive Floor Plan Section */}
              <section className="rounded-3xl p-6 sm:p-8 bg-zinc-900/40 border border-zinc-800 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20">
                      <Map className="w-3 h-3" />
                      Zero-WebGL Alternative
                    </div>
                    <h3 className="text-xl font-bold text-white tracking-tight">
                      Interactive 2D Architectural Floor Plan
                    </h3>
                  </div>
                  <Link
                    href={`/explore/${destination.id}/experience?mode=2d`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-zinc-950 bg-amber-400 hover:bg-amber-300 transition-all self-start sm:self-auto"
                  >
                    <span>Open Floor Plan</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  For visitors with older hardware, mobile devices with constrained GPUs, or anyone who
                  prefers a calm bird’s-eye perspective, NewArambh provides a full-featured 2D SVG floor plan.
                  Click or tap any numbered landmark to open the curatorial drawer and inspect historical citations.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-zinc-300">
                  <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800/80 space-y-1">
                    <span className="font-semibold text-amber-400 block">Instant Loading</span>
                    <p className="text-zinc-400 text-[11px]">Renders in under 100ms with zero heavy 3D shaders or WebGL initialization.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800/80 space-y-1">
                    <span className="font-semibold text-amber-400 block">Compass Orientation</span>
                    <p className="text-zinc-400 text-[11px]">Architecturally aligned with cardinal directions, plinth bounds, and step colliders.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800/80 space-y-1">
                    <span className="font-semibold text-amber-400 block">Deep Curatorial Content</span>
                    <p className="text-zinc-400 text-[11px]">Access all 5 landmark descriptions, image galleries, and UNESCO source references.</p>
                  </div>
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
                  <span>Ethical Reconstruction &amp; Public Transparency Disclosure</span>
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

                <div className="space-y-3">
                  <Link
                    href={`/explore/${destination.id}/experience`}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl text-sm font-bold text-zinc-950 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 shadow-lg shadow-amber-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <Compass className="w-4 h-4 stroke-[2.5]" />
                    <span>Enter 3D Walkthrough</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </Link>

                  <Link
                    href={`/explore/${destination.id}/experience?mode=2d`}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl text-xs font-semibold text-zinc-200 bg-zinc-950 border border-zinc-800 hover:border-amber-500/40 hover:text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <Map className="w-4 h-4 text-amber-400" />
                    <span>Launch 2D Floor Plan</span>
                  </Link>
                </div>

                {/* Available Modes Checklist */}
                <div className="pt-4 border-t border-zinc-800 space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    Supported Modes in this Destination:
                  </p>

                  <div className="space-y-2.5 text-xs">
                    <div className="flex items-center gap-2.5 text-zinc-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <div>
                        <span className="font-semibold flex items-center gap-1.5">
                          <Footprints className="w-3.5 h-3.5 text-amber-400" /> Walk Mode
                        </span>
                        <p className="text-[11px] text-zinc-400">WASD keyboard &amp; mouse look (or dual touch joystick)</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 text-zinc-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <div>
                        <span className="font-semibold flex items-center gap-1.5">
                          <Eye className="w-3.5 h-3.5 text-cyan-400" /> 360° Inspection
                        </span>
                        <p className="text-[11px] text-zinc-400">Orbit around architectural features &amp; camera presets</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 text-zinc-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <div>
                        <span className="font-semibold flex items-center gap-1.5">
                          <Route className="w-3.5 h-3.5 text-emerald-400" /> Guided Route
                        </span>
                        <p className="text-[11px] text-zinc-400">Automated 5-stop cinematic tour with narrated HUD</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 text-zinc-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <div>
                        <span className="font-semibold flex items-center gap-1.5">
                          <Map className="w-3.5 h-3.5 text-amber-400" /> 2D Floor Plan
                        </span>
                        <p className="text-[11px] text-zinc-400">Instant interactive SVG view with zero-GPU fallback</p>
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
