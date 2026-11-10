import React from 'react';
import Link from 'next/link';
import { Landmark, Castle, Building2, Trees, Church, History, ArrowRight } from 'lucide-react';

interface CategoryItem {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  sampleCount: string;
}

const CATEGORIES: CategoryItem[] = [
  {
    id: 'religious',
    name: 'Religious Places',
    description: 'Sacred temples, shrines, and spiritual sanctuaries engineered with ancient sacred geometry.',
    icon: Church,
    accentColor: 'from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-400',
    sampleCount: '1 Destination',
  },
  {
    id: 'monuments',
    name: 'Historical Monuments',
    description: 'Iconic stone memorials, ceremonial gateways, and enduring architectural landmarks.',
    icon: History,
    accentColor: 'from-orange-500/20 to-rose-500/10 border-orange-500/30 text-orange-400',
    sampleCount: '1 Destination',
  },
  {
    id: 'forts-palaces',
    name: 'Forts & Palaces',
    description: 'Medieval hill citadels, regal havelis, and desert fortresses with ornate royal courtyards.',
    icon: Castle,
    accentColor: 'from-yellow-500/20 to-amber-500/10 border-yellow-500/30 text-yellow-400',
    sampleCount: '2 Destinations',
  },
  {
    id: 'museums',
    name: 'Museums & Collections',
    description: 'Archaeological ruins, universal monastic universities, and ancient artifact galleries.',
    icon: Landmark,
    accentColor: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-400',
    sampleCount: '1 Destination',
  },
  {
    id: 'heritage',
    name: 'Heritage Architecture',
    description: 'Intricate granite colonnades, stepped baori reservoirs, and pierced stone jali screens.',
    icon: Building2,
    accentColor: 'from-cyan-500/20 to-blue-500/10 border-cyan-500/30 text-cyan-400',
    sampleCount: '1 Destination',
  },
  {
    id: 'natural',
    name: 'Natural Attractions',
    description: 'Monolithic rock-cut cliff sanctuaries, living stone excavations, and sacred ravines.',
    icon: Trees,
    accentColor: 'from-indigo-500/20 to-violet-500/10 border-indigo-500/30 text-indigo-400',
    sampleCount: '1 Destination',
  },
];

export default function CategoryGrid() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-zinc-800/60">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">
          Curated Heritage Collections
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Explore by Category
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base">
          Navigate diverse realms of heritage—from grand royal courtyards to ancient rock-cut canyons
          and sacred temple colonnades.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          return (
            <Link
              key={cat.id}
              href={`/explore?category=${cat.id}`}
              className="group relative rounded-2xl p-7 bg-zinc-900/40 hover:bg-zinc-900/80 border border-zinc-800 hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between space-y-6 overflow-hidden shadow-lg hover:-translate-y-1"
            >
              <div className="space-y-4">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.accentColor} border flex items-center justify-center transition-transform group-hover:scale-110`}
                >
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                  {cat.name}
                </h3>

                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-zinc-800/80 text-xs">
                <span className="text-zinc-400 font-medium">{cat.sampleCount}</span>
                <span className="flex items-center gap-1 font-semibold text-amber-400 group-hover:translate-x-1 transition-transform">
                  Browse <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
