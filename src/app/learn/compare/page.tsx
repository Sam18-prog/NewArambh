'use client';

import React, { useState } from 'react';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import Link from 'next/link';
import { allDestinations } from '@/data/destinations/index';
import {
  Compass,
  ArrowRight,
  Sparkles,
  MapPin,
  Calendar,
  Layers,
  Award,
  BookOpen,
  ArrowLeftRight,
  ExternalLink,
} from 'lucide-react';

export default function MonumentComparisonPage() {
  const [destAId, setDestAId] = useState<string>('taj-mahal');
  const [destBId, setDestBId] = useState<string>('agra-fort');

  const destA = allDestinations.find((d) => d.id === destAId) || allDestinations[0];
  const destB = allDestinations.find((d) => d.id === destBId) || allDestinations[1];

  const swapDestinations = () => {
    setDestAId(destBId);
    setDestBId(destAId);
  };

  const getMaterials = (id: string): string => {
    switch (id) {
      case 'taj-mahal':
        return 'Makrana pure white marble, red sandstone for auxiliary buildings, semi-precious stone inlays (pietra dura).';
      case 'red-fort':
        return 'Local red sandstone defensive walls, Makrana white marble for private royal pavilions (Diwan-i-Khas, Khas Mahal).';
      case 'rani-ki-vav':
        return 'Dhrangadhra sandstone finely carved with over 500 major sculptures; subterranean brick retaining structures.';
      case 'dholavira':
        return 'Dressed limestone and sandstone blocks, sundried mud-bricks, stone-cut bedrock for reservoirs.';
      case 'somnath':
        return 'Yellowish-buff Sompura sandstone (Prabhas Patan local stone) carved in classical Maru-Gurjara style.';
      case 'dwarkadhish':
        return 'Soft limestone and local sandstone, calcified limestone pillars (72 columns), five-tiered spire.';
      case 'agra-fort':
        return 'Red sandstone sourced from Tantpur, white marble additions under Shah Jahan, glazed tile accents.';
      case 'champaner-pavagadh':
        return 'Local yellow sandstone with delicate openwork jali carving, basal rock foundations on Pavagadh volcanic hill.';
      case 'sarnath':
        return 'Chunar fine-grained buff sandstone for Ashoka Pillar & Dhamek casing; baked brick core for stupas and monasteries.';
      default:
        return 'Traditional indigenous stone and masonry.';
    }
  };

  const getArchitecturalStyle = (id: string): string => {
    switch (id) {
      case 'taj-mahal':
        return 'High Classical Mughal Architecture (synthesis of Persian, Timurid, and Indian styles).';
      case 'red-fort':
        return 'Peak Mughal Palace-Fortress Architecture with Shahjahani formal order.';
      case 'rani-ki-vav':
        return 'Maru-Gurjara (Solanki / Chaulukya) Subterranean Stepwell Architecture.';
      case 'dholavira':
        return 'Mature Harappan (Indus Valley Civilization) Urban Citadel & Hydraulic Engineering.';
      case 'somnath':
        return 'Maru-Gurjara (Chaulukya) Kailash Mahameru Prasad Temple Style.';
      case 'dwarkadhish':
        return 'Maru-Gurjara / Western Indian Solanki Temple Architecture (Jagat Mandir plan).';
      case 'agra-fort':
        return 'Early-to-Mid Imperial Mughal (Akbari Red Sandstone transitioning to Shahjahani Marble).';
      case 'champaner-pavagadh':
        return 'Indo-Islamic Gujarat Sultanate Style with traditional Hindu and Jain sculptural elements.';
      case 'sarnath':
        return 'Ancient Mauryan through Classical Gupta Buddhist Monastic Architecture.';
      default:
        return 'Indian Classical Heritage Architecture.';
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0805] text-zinc-100 flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12 w-full">
        {/* Page Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20">
            <ArrowLeftRight className="w-3.5 h-3.5" />
            <span>Comparative Architecture Study</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Monument Comparison
          </h1>
          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
            Examine two Indian heritage monuments side by side. Compare their construction materials, historical dynasties, architectural styles, UNESCO status, and landmark features through verified curatorial dossiers.
          </p>
        </div>

        {/* Selection Bar */}
        <div className="p-6 rounded-3xl bg-zinc-900/60 border border-zinc-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="w-full md:w-5/12 space-y-2">
            <label htmlFor="compare-monument-a-select" className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
              Monument A:
            </label>
            <select
              id="compare-monument-a-select"
              value={destAId}
              onChange={(e) => setDestAId(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm font-semibold focus:outline-none focus:border-amber-400"
            >
              {allDestinations.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.shortName || d.name} ({d.city}, {d.state})
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={swapDestinations}
            className="p-3 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 shadow-lg transition-transform active:scale-90 shrink-0"
            title="Swap Monuments"
            aria-label="Swap Monuments"
          >
            <ArrowLeftRight className="w-5 h-5 text-amber-400" />
          </button>

          <div className="w-full md:w-5/12 space-y-2">
            <label htmlFor="compare-monument-b-select" className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
              Monument B:
            </label>
            <select
              id="compare-monument-b-select"
              value={destBId}
              onChange={(e) => setDestBId(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm font-semibold focus:outline-none focus:border-amber-400"
            >
              {allDestinations.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.shortName || d.name} ({d.city}, {d.state})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Side-by-Side Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card A */}
          <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800/80 shadow-xl space-y-6">
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={destA.heroImageUrl}
                alt={destA.name}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute top-3 left-3">
                {destA.heritageClassification === 'unesco' ? (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 backdrop-blur-md">
                    UNESCO #{destA.unescoInscriptionYear}
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 backdrop-blur-md">
                    Culturally Significant
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {destA.name}
              </h2>
              {destA.hindiName && (
                <div className="text-base font-serif text-amber-300/80">
                  {destA.hindiName}
                </div>
              )}
            </div>

            <Link
              href={`/explore/${destA.id}`}
              className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-amber-300"
            >
              <span>Explore {destA.shortName || destA.name}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card B */}
          <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800/80 shadow-xl space-y-6">
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={destB.heroImageUrl}
                alt={destB.name}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute top-3 left-3">
                {destB.heritageClassification === 'unesco' ? (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 backdrop-blur-md">
                    UNESCO #{destB.unescoInscriptionYear}
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 backdrop-blur-md">
                    Culturally Significant
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {destB.name}
              </h2>
              {destB.hindiName && (
                <div className="text-base font-serif text-amber-300/80">
                  {destB.hindiName}
                </div>
              )}
            </div>

            <Link
              href={`/explore/${destB.id}`}
              className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-amber-300"
            >
              <span>Explore {destB.shortName || destB.name}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Detailed Comparison Table */}
        <div className="rounded-3xl border border-zinc-800 overflow-hidden shadow-2xl bg-zinc-950/60">
          <div className="p-6 bg-zinc-900/80 border-b border-zinc-800">
            <h3 className="text-lg font-bold text-white tracking-tight">
              Architectural &amp; Historical Attribute Breakdown
            </h3>
          </div>

          <div className="divide-y divide-zinc-800/80 text-xs sm:text-sm">
            {/* Attribute: Location */}
            <div className="grid grid-cols-1 md:grid-cols-12 p-5 gap-3 items-start">
              <div className="md:col-span-3 font-bold text-amber-400 flex items-center gap-2">
                <MapPin className="w-4 h-4 shrink-0" />
                <span>Geographical Location</span>
              </div>
              <div className="md:col-span-4 text-zinc-200">
                {destA.location} ({destA.state})
              </div>
              <div className="md:col-span-5 text-zinc-200">
                {destB.location} ({destB.state})
              </div>
            </div>

            {/* Attribute: Period & Dynasty */}
            <div className="grid grid-cols-1 md:grid-cols-12 p-5 gap-3 items-start bg-zinc-900/30">
              <div className="md:col-span-3 font-bold text-amber-400 flex items-center gap-2">
                <Calendar className="w-4 h-4 shrink-0" />
                <span>Historical Era &amp; Dynasty</span>
              </div>
              <div className="md:col-span-4 text-zinc-200">
                {destA.period}
              </div>
              <div className="md:col-span-5 text-zinc-200">
                {destB.period}
              </div>
            </div>

            {/* Attribute: Architectural Style */}
            <div className="grid grid-cols-1 md:grid-cols-12 p-5 gap-3 items-start">
              <div className="md:col-span-3 font-bold text-amber-400 flex items-center gap-2">
                <Layers className="w-4 h-4 shrink-0" />
                <span>Architectural Tradition</span>
              </div>
              <div className="md:col-span-4 text-zinc-200 leading-relaxed">
                {getArchitecturalStyle(destA.id)}
              </div>
              <div className="md:col-span-5 text-zinc-200 leading-relaxed">
                {getArchitecturalStyle(destB.id)}
              </div>
            </div>

            {/* Attribute: Primary Construction Materials */}
            <div className="grid grid-cols-1 md:grid-cols-12 p-5 gap-3 items-start bg-zinc-900/30">
              <div className="md:col-span-3 font-bold text-amber-400 flex items-center gap-2">
                <Compass className="w-4 h-4 shrink-0" />
                <span>Primary Materials</span>
              </div>
              <div className="md:col-span-4 text-zinc-200 leading-relaxed">
                {getMaterials(destA.id)}
              </div>
              <div className="md:col-span-5 text-zinc-200 leading-relaxed">
                {getMaterials(destB.id)}
              </div>
            </div>

            {/* Attribute: Classification */}
            <div className="grid grid-cols-1 md:grid-cols-12 p-5 gap-3 items-start">
              <div className="md:col-span-3 font-bold text-amber-400 flex items-center gap-2">
                <Award className="w-4 h-4 shrink-0" />
                <span>Heritage Status</span>
              </div>
              <div className="md:col-span-4 text-zinc-200">
                {destA.heritageClassification === 'unesco'
                  ? `Inscribed as UNESCO World Heritage Site in ${destA.unescoInscriptionYear}`
                  : 'Protected Culturally Significant Monument'}
              </div>
              <div className="md:col-span-5 text-zinc-200">
                {destB.heritageClassification === 'unesco'
                  ? `Inscribed as UNESCO World Heritage Site in ${destB.unescoInscriptionYear}`
                  : 'Protected Culturally Significant Monument'}
              </div>
            </div>

            {/* Attribute: Documented Stops */}
            <div className="grid grid-cols-1 md:grid-cols-12 p-5 gap-3 items-start bg-zinc-900/30">
              <div className="md:col-span-3 font-bold text-amber-400 flex items-center gap-2">
                <BookOpen className="w-4 h-4 shrink-0" />
                <span>Curated Landmark Stops</span>
              </div>
              <div className="md:col-span-4 text-zinc-200">
                {destA.landmarks.length} architectural stops documented
              </div>
              <div className="md:col-span-5 text-zinc-200">
                {destB.landmarks.length} architectural stops documented
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
