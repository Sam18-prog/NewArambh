import React from 'react';
import { Globe2, GraduationCap, Archive, LockOpen, Sparkles, HeartHandshake } from 'lucide-react';

export default function WhyNewArambh() {
  const pillars = [
    {
      title: 'Democratizing Cultural Heritage',
      description:
        'Physical travel to ancient forts, temples, and international monuments is often limited by financial constraints, distance, or physical mobility. NewArambh makes spatial exploration accessible to anyone with a browser.',
      icon: Globe2,
    },
    {
      title: 'Deep Curatorial Learning',
      description:
        'Unlike flat 2D photography or video panoramas, exploring a space in real-time 3D provides a true sense of scale, proportion, acoustic volume, and architectural logic alongside factual curatorial annotations.',
      icon: GraduationCap,
    },
    {
      title: 'Digital Preservation of Endangered Sites',
      description:
        'Natural weathering, climate shifts, and human density threaten ancient monuments worldwide. By creating faithful 3D models and digital environments, we help archive humanity’s cultural treasures for future generations.',
      icon: Archive,
    },
    {
      title: '100% Free & Open-Access Ecosystem',
      description:
        'Built entirely from home with open-source web technologies, CC0 public-domain assets, and free hosting tiers. No subscription fees, no locked paywalls, and no hidden monetization.',
      icon: LockOpen,
    },
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-zinc-800/60">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Mission Overview */}
        <div className="lg:col-span-5 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            Our Vision & Mission
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Why We Are Building <br />
            <span className="bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">
              NewArambh
            </span>
          </h2>

          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
            NewArambh — literally <em>&quot;A New Beginning&quot;</em> — was born from a fundamental conviction:
            the world’s magnificent historical architecture, sacred sanctuaries, and cultural
            masterpieces should belong to everyone, not just those who can afford international travel.
          </p>

          <p className="text-sm text-zinc-400 leading-relaxed">
            By fusing modern web 3D engines (Three.js and WebGL) with museum-grade historical curation,
            we enable students, researchers, elders, and travelers to step inside living history
            from their smartphones and laptops.
          </p>

          <div className="pt-2 flex items-center gap-3 text-xs text-amber-400 font-semibold">
            <HeartHandshake className="w-5 h-5" />
            <span>Dedicated to Ethical Heritage Curation & Open Education</span>
          </div>
        </div>

        {/* Right Column: 4 Core Pillars Grid */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl p-6 bg-zinc-900/50 border border-zinc-800/80 hover:border-amber-500/30 transition-all duration-300 space-y-3 shadow-lg"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white tracking-tight">{pillar.title}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">{pillar.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
