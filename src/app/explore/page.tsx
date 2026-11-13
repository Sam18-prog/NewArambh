'use client';

import React, { useState, useMemo } from 'react';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import DestinationCard from '@/components/ui/DestinationCard';
import { allDestinations } from '@/data/destinations/index';
import { Search, SlidersHorizontal, X, Compass, Sparkles } from 'lucide-react';

function ExploreFilterableGrid() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return new URLSearchParams(window.location.search).get('category') || 'all';
    }
    return 'all';
  });
  const [selectedState, setSelectedState] = useState<string>('all');

  const filterTabs: { id: string; label: string; count?: number }[] = [
    { id: 'all', label: 'All Destinations', count: allDestinations.length },
    {
      id: 'unesco',
      label: 'UNESCO World Heritage',
      count: allDestinations.filter((d) => d.heritageClassification === 'unesco').length,
    },
    {
      id: 'cultural',
      label: 'Culturally Significant',
      count: allDestinations.filter((d) => d.heritageClassification === 'cultural').length,
    },
    {
      id: 'forts-palaces',
      label: 'Forts & Palaces',
      count: allDestinations.filter((d) => d.category === 'forts-palaces').length,
    },
    {
      id: 'religious',
      label: 'Religious Places & Temples',
      count: allDestinations.filter((d) => d.category === 'religious').length,
    },
    {
      id: 'stepwells',
      label: 'Stepwells & Water Architecture',
      count: allDestinations.filter((d) => d.tags.includes('Stepwell') || d.category === 'heritage').length,
    },
    {
      id: 'archaeological',
      label: 'Archaeological Sites',
      count: allDestinations.filter((d) => d.tags.includes('Harappan') || d.tags.includes('Excavation') || d.tags.includes('Archaeology')).length,
    },
    {
      id: 'buddhist',
      label: 'Buddhist Heritage',
      count: allDestinations.filter((d) => d.tags.includes('Buddhist') || d.tags.includes('Stupa')).length,
    },
  ];

  const states = [
    { id: 'all', label: 'All States / Regions' },
    { id: 'Uttar Pradesh', label: 'Uttar Pradesh' },
    { id: 'Delhi', label: 'National Capital Territory of Delhi' },
    { id: 'Gujarat', label: 'Gujarat' },
  ];

  const filteredDestinations = useMemo(() => {
    return allDestinations.filter((dest) => {
      // Search query filter
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        q === '' ||
        dest.name.toLowerCase().includes(q) ||
        (dest.hindiName && dest.hindiName.includes(q)) ||
        dest.subtitle.toLowerCase().includes(q) ||
        dest.city.toLowerCase().includes(q) ||
        dest.state.toLowerCase().includes(q) ||
        dest.location.toLowerCase().includes(q) ||
        dest.tags.some((t) => t.toLowerCase().includes(q)) ||
        dest.landmarks.some(
          (l) =>
            l.name.toLowerCase().includes(q) ||
            l.shortDescription.toLowerCase().includes(q) ||
            l.category.toLowerCase().includes(q)
        );

      // Category / Classification filter
      let matchesFilter = true;
      if (selectedFilter === 'unesco') {
        matchesFilter = dest.heritageClassification === 'unesco';
      } else if (selectedFilter === 'cultural') {
        matchesFilter = dest.heritageClassification === 'cultural';
      } else if (selectedFilter === 'forts-palaces') {
        matchesFilter = dest.category === 'forts-palaces';
      } else if (selectedFilter === 'religious') {
        matchesFilter = dest.category === 'religious';
      } else if (selectedFilter === 'stepwells') {
        matchesFilter = dest.tags.includes('Stepwell') || dest.id === 'rani-ki-vav';
      } else if (selectedFilter === 'archaeological') {
        matchesFilter = dest.id === 'dholavira' || dest.id === 'champaner-pavagadh';
      } else if (selectedFilter === 'buddhist') {
        matchesFilter = dest.id === 'sarnath';
      }

      // State filter
      const matchesState = selectedState === 'all' || dest.state === selectedState;

      return matchesSearch && matchesFilter && matchesState;
    });
  }, [searchQuery, selectedFilter, selectedState]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedFilter('all');
    setSelectedState('all');
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Page Header (matching official brand & Screenshots) */}
      <div className="mb-10 space-y-2">
        <div className="text-sm font-semibold tracking-wide text-zinc-400">
          NewArambh
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
          Walk Through History, From Anywhere.
        </h1>
        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-2xl">
          Discover India&apos;s cultural heritage through interactive digital experiences.
        </p>
      </div>

      {/* Search Bar & State Filter */}
      <div className="space-y-6 mb-10">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="w-5 h-5 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by monument name, Hindi name, city, state, or landmark..."
              className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all shadow-inner"
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

          {/* State Selector Dropdown */}
          <div className="flex items-center gap-2 self-start md:self-auto w-full md:w-auto">
            <SlidersHorizontal className="w-4 h-4 text-zinc-400 shrink-0 hidden sm:block" />
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="px-4 py-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-sm text-zinc-300 focus:outline-none focus:ring-2 focus:ring-amber-500 w-full sm:w-auto font-medium"
            >
              {states.map((st) => (
                <option key={st.id} value={st.id}>
                  {st.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSelectedFilter(tab.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                selectedFilter === tab.id
                  ? 'bg-amber-400 text-zinc-950 shadow-md shadow-amber-500/20'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    selectedFilter === tab.id
                      ? 'bg-zinc-950/20 text-zinc-950 font-bold'
                      : 'bg-zinc-800 text-zinc-400'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count Bar */}
      <div className="flex items-center justify-between pb-6 mb-8 border-b border-zinc-800/80 text-xs text-zinc-400">
        <div>
          Showing <span className="font-bold text-white">{filteredDestinations.length}</span>{' '}
          {filteredDestinations.length === 1 ? 'Heritage Destination' : 'Heritage Destinations'}
        </div>
        {(searchQuery || selectedFilter !== 'all' || selectedState !== 'all') && (
          <button
            type="button"
            onClick={resetFilters}
            className="text-amber-400 hover:text-amber-300 underline underline-offset-4 font-medium"
          >
            Reset All Filters
          </button>
        )}
      </div>

      {/* Destination Grid (matching Screenshots 3, 4, 5: 2-column layout) */}
      {filteredDestinations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
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
          <h3 className="text-lg font-bold text-white">No Destinations Match Your Filter</h3>
          <p className="text-xs text-zinc-400">
            Try adjusting your search keywords or resetting your active state and category filters.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="px-5 py-2.5 rounded-full text-xs font-semibold bg-amber-400 text-zinc-950 hover:bg-amber-300 transition-colors shadow-md"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}

function ExploreCatalogSkeleton() {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 animate-pulse">
      {/* Page Header Skeleton */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="w-48 h-6 bg-zinc-900 rounded-full mx-auto" />
        <div className="w-80 h-12 bg-zinc-900 rounded-2xl mx-auto" />
        <div className="w-full max-w-lg h-5 bg-zinc-900/60 rounded mx-auto" />
      </div>

      {/* Search Bar Skeleton */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1 w-full h-12 bg-zinc-900/80 rounded-2xl" />
          <div className="w-full md:w-56 h-12 bg-zinc-900/80 rounded-2xl" />
        </div>
        <div className="flex gap-2 overflow-hidden">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="w-28 h-8 bg-zinc-900 rounded-full shrink-0" />
          ))}
        </div>
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="rounded-3xl overflow-hidden bg-zinc-900/50 border border-zinc-800/80 h-96 flex flex-col justify-between p-6 space-y-4"
          >
            <div className="w-full h-44 bg-zinc-800/60 rounded-2xl" />
            <div className="space-y-2">
              <div className="w-3/4 h-5 bg-zinc-800/80 rounded" />
              <div className="w-1/2 h-4 bg-zinc-800/50 rounded" />
            </div>
            <div className="w-full h-10 bg-zinc-800/40 rounded-xl" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ExplorePage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col selection:bg-amber-500/30 selection:text-amber-200">
      <Header />
      <main className="flex-1">
        <ExploreFilterableGrid />
      </main>
      <Footer />
    </div>
  );
}
