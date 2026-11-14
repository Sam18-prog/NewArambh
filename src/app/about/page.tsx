import React from 'react';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import Link from 'next/link';
import { Compass, Sparkles, ShieldAlert, Award, ArrowRight, Layers, BookOpen } from 'lucide-react';

export const metadata = {
  title: 'About NewArambh — Walk Through History, From Anywhere',
  description:
    'Experience the world’s cultural heritage, sacred monuments, and architectural wonders through immersive 3D and interactive digital exploration.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0c0805] text-zinc-100 flex flex-col">
      <Header />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12 w-full">
        {/* Hero Section */}
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20">
            <Compass className="w-3.5 h-3.5" />
            <span>Platform Philosophy</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
            Walk Through History, From Anywhere.
          </h1>
          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed">
            Experience the world’s cultural heritage, sacred monuments, and architectural wonders through immersive 3D exploration and open educational access.
          </p>
        </div>

        {/* Mission Card */}
        <section className="p-8 sm:p-10 rounded-3xl bg-zinc-900/50 border border-amber-500/30 shadow-2xl space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Our Mission &amp; Purpose
          </h2>
          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
            NewArambh was founded on a simple principle: cultural heritage belongs to humanity, yet physical distance, economic barriers, and geopolitical borders prevent billions of people from walking through history’s greatest monuments.
          </p>
          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
            By combining modern web technologies (Next.js 16, Three.js, React Three Fiber, SVG interactive blueprints, and browser-native speech narration), NewArambh enables students, educators, architects, and travellers worldwide to explore India’s monumental heritage directly in their browser — without downloads, paywalls, or hardware barriers.
          </p>
        </section>

        {/* Three Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Curatorial Integrity</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Every date, dynasty, and architectural claim is verified against official UNESCO World Heritage dossiers and Archaeological Survey of India (ASI) monographs.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Zero Software Budget</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Built with $0.00 spent on proprietary tools or paid API subscriptions, relying on open-source web ecosystems and public domain cultural documentation.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Browser-First Immersive Tech</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Interactive 2D site blueprints, First-Person 3D walkthroughs, and Aerial Drone View modes engineered to run fluidly on standard modern mobile devices and desktops.
            </p>
          </div>
        </div>

        {/* Transparency Section */}
        <section className="p-8 rounded-3xl bg-amber-950/20 border border-amber-500/30 space-y-4">
          <div className="flex items-center gap-2.5 text-amber-400 font-bold text-sm">
            <ShieldAlert className="w-5 h-5 shrink-0" />
            <span>Open Educational Licensing &amp; Legal Attribution</span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            All photography, vector blueprints, and 3D architectural studies are released under Creative Commons, public domain, or open educational fair-use licences. We maintain complete, transparent records of every creator, source, and licence on our platform.
          </p>
          <div className="pt-2">
            <Link
              href="/licenses"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-zinc-950 bg-amber-400 hover:bg-amber-300 transition-colors"
            >
              <span>View Platform Asset Register</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
