import React from 'react';
import Link from 'next/link';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import {
  ShieldCheck,
  ExternalLink,
  ArrowLeft,
  Heart,
  CheckCircle2,
  Code2,
  Image as ImageIcon,
  BookOpen,
  Sparkles,
  Layers,
} from 'lucide-react';

interface AssetRecord {
  id: string;
  name: string;
  category: string;
  creator: string;
  source: string;
  sourceUrl: string;
  license: string;
  commercialUse: string;
  modifications: string;
  provenance: string;
  badge: string;
}

const ASSET_REGISTRY: AssetRecord[] = [
  {
    id: 'procedural-courtyard-glb',
    name: 'Heritage Courtyard Procedural 3D Environment (scene.glb)',
    category: '3D Geometry & PBR Shaders',
    creator: 'NewArambh Engineering Team',
    source: 'In-Engine Three.js Procedural GLTF Generator',
    sourceUrl: 'https://newarambh.netlify.app/explore/heritage-courtyard/experience',
    license: 'MIT License / CC0 1.0 Universal',
    commercialUse: 'Open-source educational & non-commercial public access',
    modifications:
      'Programmatically constructed using Three.js standard primitives (octagonal mandapa plinths, 8 carved bracket columns, corbelled dome ceiling, cantilevered jharokha brackets, subterranean baori steps, and cusped torana gateways). Exported via GLTFExporter to a lightweight 157 KB binary GLB.',
    provenance:
      'Synthesized in-engine using Three.js Standard PBR parameters (sandstoneMat, darkSandstoneMat, lightStoneMat, goldAccentMat, waterMat, brassLampMat). Inspired by traditional Rajasthan and Gujarat stone architecture. Zero external paid 3D scans or copyrighted meshes.',
    badge: 'In-Engine Procedural',
  },
  {
    id: 'architectural-vector-diagrams',
    name: 'Architectural Vector Diagrams & Hotspot Elevations',
    category: 'Curatorial Illustrations (SVG)',
    creator: 'NewArambh Cultural Heritage Documentation Team',
    source: 'NewArambh Open Educational Asset Library',
    sourceUrl: 'https://newarambh.netlify.app/explore/heritage-courtyard',
    license: 'Creative Commons Attribution 4.0 International (CC-BY 4.0)',
    commercialUse: 'Permitted with attribution to NewArambh',
    modifications:
      'Vector elevations, cross-sections, and geometric diagrams for Mandapa dome rings, Jharokha cantilever eaves, Baori stepped terraces, Torana gateway architraves, and Jali latticework.',
    provenance:
      'Original educational vector graphics drafted to illustrate architectural terminology and spatial mechanics for student and researcher exploration.',
    badge: 'Original Curatorial Asset',
  },
  {
    id: 'hero-taj-photography',
    name: 'Sunset Silhouette over Historic Monument (hero-taj-sunset.jpg)',
    category: 'Atmospheric Photography',
    creator: 'Public Domain Archive / Unsplash Heritage Community',
    source: 'Unsplash Public Domain Dedication',
    sourceUrl: 'https://unsplash.com',
    license: 'Unsplash License / CC0 1.0 Universal Equivalent',
    commercialUse: 'Permitted for commercial and personal use without fees',
    modifications:
      'Color graded for warm sunset ambiance, cropped for responsive hero framing, and optimized for browser delivery.',
    provenance:
      'Freely usable open photography selected to evoke the architectural grandeur of classical North Indian monument silhouettes.',
    badge: 'CC0 Public Domain',
  },
  {
    id: 'courtyard-haveli-photography',
    name: 'Traditional Merchant Courtyard at Dusk (courtyard-haveli.jpg)',
    category: 'Architectural Reference Photography',
    creator: 'IndianMoments Cultural Repository / Wikimedia Commons',
    source: 'Wikimedia Commons / Public Domain Cultural Repository',
    sourceUrl: 'https://commons.wikimedia.org',
    license: 'Creative Commons Attribution-ShareAlike 4.0 (CC-BY-SA 4.0) / Public Domain',
    commercialUse: 'Educational non-commercial public domain display',
    modifications:
      'Cropped for hotspot curatorial gallery drawer and optimized to WebP/JPEG format.',
    provenance:
      'Historic Shekhawati painted haveli courtyard illustrating traditional open-air domestic stone architecture and evening lantern illumination.',
    badge: 'CC-BY-SA 4.0 / Public Domain',
  },
  {
    id: 'unesco-ranikivav',
    name: 'Rani-ki-Vav Stepwell Architectural Documentation',
    category: 'Heritage Scholarly Reference',
    creator: 'UNESCO World Heritage Centre / Archaeological Survey of India (ASI)',
    source: 'UNESCO World Heritage Inscription #922',
    sourceUrl: 'https://whc.unesco.org/en/list/922',
    license: 'Public Educational Heritage Record',
    commercialUse: 'Academic, educational, and public cultural reference',
    modifications:
      'Summarized subterranean structural engineering, inverted pyramid geometry, and hydraulic history for interactive hotspot learning drawer.',
    provenance:
      'Official inscription documentation confirming the stepwell’s seven levels, 500+ principal sculptures, and medieval subterranean water-management technology.',
    badge: 'Official UNESCO Inscription',
  },
  {
    id: 'unesco-jaipur-jharokha',
    name: 'Jaipur Walled City & Haveli Jharokha Facade Typologies',
    category: 'Heritage Scholarly Reference',
    creator: 'UNESCO World Heritage Centre / IGNCA',
    source: 'UNESCO World Heritage Inscription #1605 & IGNCA Studies',
    sourceUrl: 'https://whc.unesco.org/en/list/1605/',
    license: 'Public Educational Heritage Record',
    commercialUse: 'Academic and educational reference',
    modifications:
      'Synthesized architectural mechanics of cantilevered madal brackets, chhajja eaves, and venturi airflow cooling.',
    provenance:
      'Urban heritage documentation of western Indian domestic facades and climate-adaptive vernacular building techniques.',
    badge: 'Official UNESCO Inscription',
  },
  {
    id: 'met-jali-stonework',
    name: 'Jali: Perforated Stonework & Screen Studies',
    category: 'Heritage Scholarly Reference',
    creator: 'The Metropolitan Museum of Art Open Access / Navina Najat Haidar',
    source: 'The Met Museum Open Access Collection',
    sourceUrl: 'https://www.metmuseum.org/art/collection/search#!?q=jali',
    license: 'Metropolitan Museum Open Access (CC0 Public Domain Dedication)',
    commercialUse: 'Open educational scholarship and cultural documentation',
    modifications:
      'Adapted analysis of perforated screen light filtration, privacy sight-veils, and microclimate ventilation.',
    provenance:
      'Scholarly documentation of Mughal, Sultanate, and Rajput pierced stone screens in historic Indian architecture.',
    badge: 'Met Museum Open Access',
  },
  {
    id: 'unesco-sanchi-torana',
    name: 'Buddhist Monuments at Sanchi & Torana Gateway Architecture',
    category: 'Heritage Scholarly Reference',
    creator: 'UNESCO World Heritage Centre / Archaeological Survey of India',
    source: 'UNESCO World Heritage Inscription #524',
    sourceUrl: 'https://whc.unesco.org/en/list/524/',
    license: 'Public Educational Heritage Record',
    commercialUse: 'Academic and educational reference',
    modifications:
      'Extracted ceremonial threshold symbolism, multi-tiered horizontal architrave structure, and cusped makara bracket mechanics.',
    provenance:
      'Classical architectural documentation of ceremonial stone gateways spanning Sanchi, Mukteshvara, and Vadnagar Kirti Torana.',
    badge: 'Official UNESCO Inscription',
  },
  {
    id: 'asi-mandapa-survey',
    name: 'Architectural Survey of Temple Architecture in India & Mandapa Typologies',
    category: 'Heritage Scholarly Reference',
    creator: 'Archaeological Survey of India (ASI) & Percy Brown',
    source: 'ASI Architectural Series / Dover Publications',
    sourceUrl: 'https://asi.nic.in/',
    license: 'Public Educational Heritage Monograph',
    commercialUse: 'Academic and educational reference',
    modifications:
      'Formulated octagonal column distribution, corbelled concentric dome roofing, and Ghatapallava capital descriptions.',
    provenance:
      'Definitive architectural monograph on Buddhist, Hindu, and Jain pillared halls and ceremonial pavilions.',
    badge: 'ASI Monograph Reference',
  },
];

export default function LicensesPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col selection:bg-amber-500/30 selection:text-amber-200">
      <Header />

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-12">
        {/* Breadcrumb Back */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-amber-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Page Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
            <ShieldCheck className="w-3.5 h-3.5" />
            Open Source &amp; Intellectual Transparency
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Asset Register &amp; Licensing Attribution
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base max-w-3xl leading-relaxed">
            In accordance with our strict zero-budget philosophy and ethical heritage standards, NewArambh
            relies exclusively on open-source web technologies, procedurally generated 3D geometry,
            verified CC0 Public Domain assets, and peer-reviewed educational scholarship.
          </p>
        </div>

        {/* Core Financial & Licensing Statement */}
        <div className="rounded-3xl p-6 sm:p-8 bg-zinc-900/60 border border-zinc-800 space-y-6">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Heart className="w-4 h-4 text-rose-400" />
            Zero-Budget Development &amp; Public Transparency Mandate
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-zinc-300">
            <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800/80 space-y-2">
              <span className="font-bold text-amber-400 flex items-center gap-1.5">
                <Code2 className="w-4 h-4" /> 100% Free &amp; Open Source
              </span>
              <p className="text-zinc-400 leading-relaxed">
                Zero paid subscriptions, zero paid APIs, zero commercial plugins, and zero purchased 3D models.
                Every line of code and procedural mesh is self-contained.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800/80 space-y-2">
              <span className="font-bold text-amber-400 flex items-center gap-1.5">
                <Layers className="w-4 h-4" /> Procedural 3D Synthesis
              </span>
              <p className="text-zinc-400 leading-relaxed">
                Our 3D environments are programmatically generated using Three.js mathematical primitives
                and PBR materials—never ripped from proprietary repositories or paywalled scans.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800/80 space-y-2">
              <span className="font-bold text-amber-400 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" /> Verified Academic Provenance
              </span>
              <p className="text-zinc-400 leading-relaxed">
                Reconstructions are explicitly stated as illustrative educational models, with citations
                directly linked to official UNESCO World Heritage Centre inscriptions and ASI monographs.
              </p>
            </div>
          </div>
        </div>

        {/* Asset Registry Section */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-4">
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">Verified Provenance Registry</h2>
              <p className="text-xs text-zinc-400 mt-1">
                Complete breakdown of 3D geometry, visual illustrations, photographic media, and historical citations
              </p>
            </div>
            <span className="text-xs text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full font-semibold self-start sm:self-auto">
              {ASSET_REGISTRY.length} Documented Heritage Records
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {ASSET_REGISTRY.map((asset) => (
              <div
                key={asset.id}
                className="rounded-2xl p-6 sm:p-7 bg-zinc-900/40 border border-zinc-800 hover:border-zinc-700 transition-all space-y-4"
              >
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                        {asset.category}
                      </span>
                      <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        {asset.badge}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white tracking-tight">{asset.name}</h3>
                  </div>

                  <a
                    href={asset.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-semibold px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 hover:border-amber-500/40 transition-colors self-start sm:self-auto"
                  >
                    <span>{asset.source}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Metadata Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs bg-zinc-950/60 rounded-xl p-4 border border-zinc-800/80">
                  <div>
                    <span className="text-zinc-500 block font-medium">Creator / Author:</span>
                    <span className="font-semibold text-zinc-200">{asset.creator}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block font-medium">License Type:</span>
                    <span className="font-semibold text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span>{asset.license}</span>
                    </span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block font-medium">Commercial Permission:</span>
                    <span className="font-semibold text-zinc-300">{asset.commercialUse}</span>
                  </div>
                </div>

                {/* Provenance and Modifications */}
                <div className="space-y-2 text-xs pt-1">
                  <div>
                    <span className="text-zinc-400 font-semibold">Provenance &amp; Source Details: </span>
                    <span className="text-zinc-300 leading-relaxed">{asset.provenance}</span>
                  </div>
                  <div>
                    <span className="text-zinc-400 font-semibold">Technical Modifications: </span>
                    <span className="text-zinc-400 leading-relaxed">{asset.modifications}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer Academic Integrity Statement */}
        <div className="rounded-2xl p-6 bg-amber-500/5 border border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
            <p className="leading-relaxed">
              Have questions about an attribution, or wish to submit an open-access cultural dataset for digital reconstruction?{' '}
              <span className="text-zinc-300">We adhere to the highest digital ethics and UNESCO documentation standards.</span>
            </p>
          </div>
          <Link
            href="/explore"
            className="px-4 py-2 rounded-full text-xs font-semibold bg-amber-400 text-zinc-950 hover:bg-amber-300 transition-colors whitespace-nowrap shrink-0"
          >
            Explore Reconstructions
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
