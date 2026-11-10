'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import DestinationCard from '@/components/ui/DestinationCard';
import destinationsData from '@/data/destinations.json';
import { Destination, DestinationCategory } from '@/types/destination';
import { Search, SlidersHorizontal, X, Compass, Sparkles } from 'lucide-react';

const allDestinations: Destination[] = destinationsData as Destination[];

function ExploreFilterableGrid() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedMode, setSelectedMode] = useState<string>('all');

  const categories: { id: string; label: string }[] = [
    { id: 'all', label: 'All Destinations' },
    { id: 'forts-palaces', label: 'Forts & Palaces' },
    { id: 'religious', label: 'Religious Places' },
    { id: 'monuments', label: 'Monuments' },
    { id: 'museums', label: 'Museums' },
    { id: 'heritage', label: 'Heritage Architecture' },
    { id: 'natural', label: 'Natural Attractions' },
  ];

  const filteredDestinations = useMemo(() => {
    return allDestinations.filter((dest) => {
      // Search query filter
      const matchesSearch =
        searchQuery.trim() === '' ||
        dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      // Category filter
      const matchesCategory =
        selectedCategory === 'all' || dest.category === (selectedCategory as DestinationCategory);

      // Mode filter
      const matchesMode =
        selectedMode === 'all' ||
        (selectedMode === 'walk' && dest.availableModes.includes('walk')) ||
        (selectedMode === 'tour' && dest.availableModes.includes('tour')) ||
        (selectedMode === 'inspect' && dest.availableModes.includes('inspect'));

      return matchesSearch && matchesCategory && matchesMode;
    });
  }, [searchQuery, selectedCategory, selectedMode]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedMode('all');
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/20">
          <Compass className="w-3.5 h-3.5" />
          Destination Discovery Catalog
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Explore Destinations
        </h1>
        <p className="text-zinc-400 text-sm sm:text-base">
          Browse our catalogue of digitally recreated historic sites, temples, fortresses, and
          architectural wonders. Filter by category, exploration mode, or search by keyword.
        </p>
      </div>

      {/* Search Bar & Mode Selector */}
      <div className="space-y-6 mb-12">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="w-5 h-5 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by monument name, location, or architectural feature..."
              className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Mode Selector */}
          <div className="flex items-center gap-2 self-start md:self-auto w-full md:w-auto">
            <SlidersHorizontal className="w-4 h-4 text-zinc-400 shrink-0 hidden sm:block" />
            <select
              value={selectedMode}
              onChange={(e) => setSelectedMode(e.target.value)}
              className="px-4 py-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-sm text-zinc-300 focus:outline-none focus:ring-2 focus:ring-amber-500 w-full sm:w-auto"
            >
              <option value="all">All Exploration Modes</option>
              <option value="walk">First-Person Walk Mode</option>
              <option value="inspect">Model Inspection Mode</option>
              <option value="tour">Guided Tour Mode</option>
            </select>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-amber-400 text-zinc-950 shadow-md shadow-amber-500/20'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count Bar */}
      <div className="flex items-center justify-between pb-6 mb-8 border-b border-zinc-800/80 text-xs text-zinc-400">
        <div>
          Showing <span className="font-bold text-white">{filteredDestinations.length}</span>{' '}
          {filteredDestinations.length === 1 ? 'Destination' : 'Destinations'}
        </div>
        {(searchQuery || selectedCategory !== 'all' || selectedMode !== 'all') && (
          <button
            type="button"
            onClick={resetFilters}
            className="text-amber-400 hover:text-amber-300 underline underline-offset-4 font-medium"
          >
            Reset All Filters
          </button>
        )}
      </div>

      {/* Destination Grid */}
      {filteredDestinations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map((dest) => (
            <DestinationCard key={dest.id} destination={dest} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="rounded-3xl p-12 bg-zinc-900/30 border border-zinc-800 text-center max-w-md mx-auto space-y-4 my-12">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center mx-auto">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">No Destinations Match Your Query</h3>
          <p className="text-xs text-zinc-400">
            Try adjusting your search keywords or resetting your active category and mode filters.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="px-5 py-2.5 rounded-full text-xs font-semibold bg-amber-400 text-zinc-950 hover:bg-amber-300 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}

export default function ExplorePage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col selection:bg-amber-500/30 selection:text-amber-200">
      <Header />
      <main className="flex-1">
        <Suspense
          fallback={
            <div className="py-24 text-center text-zinc-500 text-sm">
              Loading destination catalog...
            </div>
          }
        >
          <ExploreFilterableGrid />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
