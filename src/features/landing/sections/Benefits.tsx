import React from 'react';
import { benifitsStats } from '../constants/data';

export const Benefits: React.FC = () => {
  return (
    <section
      id="benefits"
      className="py-32 px-6 bg-zinc-950"
      data-scroll-section
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <div className="grid grid-cols-2 gap-4">
              {benifitsStats.map((stat, i) => (
                <div
                  key={i}
                  className="p-8 rounded-3xl glass border-white/5 text-center"
                >
                  <div className="text-4xl font-bold text-neon-cyan mb-2">
                    {stat.val}
                  </div>
                  <div className="text-sm text-gray-500 uppercase tracking-widest">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="order-1 md:order-2 space-y-8">
            <h2 className="text-4xl md:text-6xl font-bold leading-tight">
              Tangible <span className="text-gradient">Impact</span> for
              Business
            </h2>
            <p className="text-xl text-gray-400">
              We don't just build software; we create competitive advantages.
              Our platform empowers teams to focus on what matters most—growth
              and innovation.
            </p>
            <ul className="space-y-4">
              {[
                'Reduced complexity by 60%',
                'Streamlined cross-team collaboration',
                'Real-time visibility into every operation',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-lg">
                  <div className="w-6 h-6 rounded-full bg-neon-indigo/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-neon-indigo" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
