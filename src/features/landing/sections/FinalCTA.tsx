import { ArrowUpRight } from 'lucide-react';
import React from 'react';

export const FinalCTA: React.FC = () => {
  return (
    <section
      className="py-32 px-6 bg-gradient-dark relative overflow-hidden"
      data-scroll-section
    >
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,var(--color-neon-indigo)_0%,transparent_70%)] opacity-10" />
      </div>

      <div className="max-w-5xl mx-auto p-16 rounded-[3rem] glass border-white/10 text-center relative overflow-hidden group">
        <div className="absolute inset-0 bg-premium-gradient opacity-0 group-hover:opacity-10 transition-opacity duration-1000" />

        <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
          Ready to Shape the <span className="text-gradient">Future?</span>
        </h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
          Join the elite circle of visionaries who are redefining their
          industries. Start your journey with our platform today.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button className="px-12 py-5 bg-white text-black rounded-2xl font-black text-xl hover:bg-neon-cyan hover:text-white transition-all flex items-center gap-2 group/btn shadow-2xl">
            Launch Now{' '}
            <ArrowUpRight className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
          </button>
          <button className="px-12 py-5 glass rounded-2xl font-black text-xl hover:bg-white/10 transition-all border-white/10">
            Contact Sales
          </button>
        </div>
      </div>
    </section>
  );
};
