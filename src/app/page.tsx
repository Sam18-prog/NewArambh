import React from 'react';
import Header from '@/components/ui/Header';
import HeroSection from '@/components/ui/HeroSection';
import FeaturedDestination from '@/components/ui/FeaturedDestination';
import CategoryGrid from '@/components/ui/CategoryGrid';
import HowItWorks from '@/components/ui/HowItWorks';
import WhyNewArambh from '@/components/ui/WhyNewArambh';
import UpcomingFeatures from '@/components/roadmap/UpcomingFeatures';
import Footer from '@/components/ui/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col selection:bg-amber-500/30 selection:text-amber-200">
      <Header />
      <main className="flex-1 space-y-8">
        <HeroSection />
        <FeaturedDestination />
        <CategoryGrid />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <UpcomingFeatures />
        </div>
        <HowItWorks />
        <WhyNewArambh />
      </main>
      <Footer />
    </div>
  );
}
