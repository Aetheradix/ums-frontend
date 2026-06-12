import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useEffect } from 'react';
import { Footer, Navbar } from './components';
import { useLocomotiveScroll } from './hooks/useLocomotiveScroll';
import {
  Benefits,
  CoreTech,
  FinalCTA,
  Hero,
  HowItWorks,
  ProductOverview,
  Roadmap,
  Vision,
} from './sections';

gsap.registerPlugin(ScrollTrigger);

export const LandingPage: React.FC = () => {
  useLocomotiveScroll();

  useEffect(() => {
    // Refresh ScrollTrigger when everything is loaded
    window.addEventListener('load', () => {
      ScrollTrigger.refresh();
    });

    return () => {
      window.removeEventListener('load', () => ScrollTrigger.refresh());
    };
  }, []);

  return (
    <div className="bg-black text-white selection:bg-indigo-500 selection:text-white min-h-screen">
      <Navbar />
      <main className="relative">
        <Hero />
        <Vision />
        <ProductOverview />
        <HowItWorks />
        <CoreTech />
        <Benefits />
        <Roadmap />
        <FinalCTA />
        <Footer />
      </main>
    </div>
  );
};
