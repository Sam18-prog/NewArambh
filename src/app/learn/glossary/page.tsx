'use client';

import React, { useState, useMemo } from 'react';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import Link from 'next/link';
import { architecturalGlossaryData } from '@/data/architecturalGlossary';
import { allDestinations } from '@/data/destinations/index';
import { Search, BookOpen, Layers, ExternalLink, Compass } from 'lucide-react';

export default function ArchitecturalGlossaryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Terms', count: architecturalGlossaryData.length },
    { id: 'Elements', label: 'Architectural Elements' },
    { id: 'Temple Architecture', label: 'Temple Architecture' },
    { id: 'Indo-Islamic', label: 'Indo-Islamic' },
    { id: 'Water Architecture', label: 'Water Architecture' },
    { id: 'Urban Planning', label: 'Urban Planning' },
  ];

  const filteredEntries = useMemo(() => {
    return architecturalGlossaryData.filter((entry) => {
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        q === '' ||
        entry.term.toLowerCase().includes(q) ||
        (entry.hindiTerm && entry.hindiTerm.includes(q)) ||
        entry.definition.toLowerCase().includes(q) ||
        entry.architecturalContext.toLowerCase().includes(q);

      const matchesCategory =
        selectedCategory === 'all' || entry.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const destMap = useMemo(() => {
    const map = new Map<string, string>();
    allDestinations.forEach((d) => map.set(d.id, d.shortName || d.name));
    return map;
  }, []);

  return (
    <div className="min-h-screen bg-[#0c0805] text-zinc-100 flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12 w-full">
        {/* Page Hero */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Architecture Explorer</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Heritage Architectural Glossary
          </h1>
          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
            A comprehensive reference dictionary of Indian architectural vocabulary — from ancient Harappan urban engineering and Maru-Gurjara temple spires to Mughal charbaghs, perforated stone jalis, and subterranean stepwells.
          </p>
        </div>

        {/* Search & Category Filter Toolbar */}
        <div className="space-y-4">
          <div className="relative max-w-xl">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search architectural terms, e.g. Chhatri, Jali, Shikhara, Stepwell..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-sm"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-amber-400 text-zinc-950 shadow-md shadow-amber-500/20'
                    : 'bg-zinc-900/80 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Entries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredEntries.map((entry) => (
            <article
              key={entry.id}
              className="p-6 rounded-3xl bg-zinc-900/50 border border-zinc-800/80 hover:border-amber-500/40 shadow-xl space-y-4 transition-all"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/20">
                    {entry.category}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {entry.term}
                  </h2>
                  {entry.hindiTerm && (
                    <div className="text-sm font-serif text-amber-300/80">
                      {entry.hindiTerm}
                    </div>
                  )}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-zinc-300 font-medium leading-relaxed">
                {entry.definition}
              </p>

              <div className="text-xs text-zinc-400 leading-relaxed bg-zinc-950/60 p-3.5 rounded-2xl border border-zinc-800/60">
                <strong className="text-zinc-200">Historical &amp; Architectural Context: </strong>
                {entry.architecturalContext}
              </div>

              {/* Related Monuments */}
              {entry.relatedDestinationIds.length > 0 && (
                <div className="pt-2 space-y-2 border-t border-zinc-800/80">
                  <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                    Observed in NewArambh Destinations:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {entry.relatedDestinationIds.map((destId) => {
                      const destTitle = destMap.get(destId) || destId;
                      return (
                        <Link
                          key={destId}
                          href={`/explore/${destId}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-zinc-900 hover:bg-amber-400 text-zinc-300 hover:text-zinc-950 border border-zinc-700/80 hover:border-amber-400 transition-all"
                        >
                          <Compass className="w-3 h-3" />
                          <span>{destTitle}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Source Reference */}
              <div className="text-[10px] text-zinc-500 pt-1 font-mono">
                Source: {entry.reference}
              </div>
            </article>
          ))}
        </div>

        {filteredEntries.length === 0 && (
          <div className="text-center py-16 space-y-3">
            <p className="text-base text-zinc-400">
              No architectural terms match &quot;{searchQuery}&quot;.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="text-xs font-bold text-amber-400 hover:underline"
            >
              Reset Search &amp; Filters
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
