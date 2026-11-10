import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import destinationsData from '@/data/destinations.json';
import { Destination } from '@/types/destination';
import {
  Compass,
  ArrowLeft,
  Sparkles,
  Layers,
  Footprints,
  Eye,
  Route,
  CheckCircle2,
  Cpu,
  Monitor,
  Box,
} from 'lucide-react';

const destinations: Destination[] = destinationsData as Destination[];

export async function generateStaticParams() {
  return destinations.map((d) => ({
    destinationId: d.id,
  }));
}

export default async function ExperiencePortalPage({
  params,
}: {
  params: Promise<{ destinationId: string }>;
}) {
  const { destinationId } = await params;
  const destination = destinations.find((d) => d.id === destinationId);

  if (!destination) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col selection:bg-amber-500/30 selection:text-amber-200">
      <Header />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-10">
        {/* Breadcrumb Back */}
        <div>
          <Link
            href={`/explore/${destination.id}`}
            className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-amber-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to {destination.name}</span>
          </Link>
        </div>

        {/* Portal Hero Card */}
        <div className="rounded-[2.5rem] p-8 sm:p-12 bg-zinc-900/60 border border-amber-500/30 shadow-2xl relative overflow-hidden space-y-8">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Header */}
          <div className="space-y-3 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              Virtual Experience Gateway
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {destination.name}
            </h1>
            <p className="text-sm text-zinc-300 max-w-2xl">
              Virtual 3D Environment Stage. The 3D rendering canvas, Draco GLB loader, and physics
              controller are scheduled for activation in <strong>Milestone 2</strong>.
            </p>
          </div>

          {/* Technical Specifications Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="rounded-2xl p-6 bg-zinc-950/80 border border-zinc-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <Box className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">GLB Geometry Engine</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Target download: &lt; 25 MB with Draco mesh compression. High-fidelity PBR sandstone
                materials and ambient sky occlusion.
              </p>
              <div className="pt-2 text-[11px] text-amber-400 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Milestone 2 Ready
              </div>
            </div>

            <div className="rounded-2xl p-6 bg-zinc-950/80 border border-zinc-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                <Footprints className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">First-Person Kinematics</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                WASD keyboard locomotion, Pointer Lock mouse look, and dual-zone touch controls for
                smartphones with ground collision clamping.
              </p>
              <div className="pt-2 text-[11px] text-amber-400 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Milestone 3 Controller
              </div>
            </div>

            <div className="rounded-2xl p-6 bg-zinc-950/80 border border-zinc-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">5 Interactive Hotspots</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Spatial 3D trigger rings, historical educational modals, curatorial audio narration,
                and Catmull-Rom spline guided tour.
              </p>
              <div className="pt-2 text-[11px] text-amber-400 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Milestone 5 &amp; 6 Ready
              </div>
            </div>
          </div>

          {/* Controls Reference Box */}
          <div className="rounded-2xl p-6 bg-zinc-950/90 border border-zinc-800 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Monitor className="w-4 h-4 text-amber-400" />
              Controls Reference Summary
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1">
                <p className="font-semibold text-zinc-200">Desktop Movement</p>
                <p className="text-zinc-400">[W, A, S, D] or Arrow Keys to walk</p>
                <p className="text-zinc-400">[Shift] to sprint</p>
              </div>
              <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1">
                <p className="font-semibold text-zinc-200">Looking Around</p>
                <p className="text-zinc-400">Click canvas to lock cursor</p>
                <p className="text-zinc-400">Mouse movement to orient camera</p>
              </div>
              <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1">
                <p className="font-semibold text-zinc-200">Interaction</p>
                <p className="text-zinc-400">Walk near hotspot &amp; press [E]</p>
                <p className="text-zinc-400">[T] to toggle Guided Tour</p>
              </div>
            </div>
          </div>

          {/* Navigation Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-zinc-800">
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <Cpu className="w-4 h-4 text-emerald-400" />
              <span>WebGL2 Engine Compatibility Confirmed</span>
            </div>

            <Link
              href={`/explore/${destination.id}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Destination Details</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
