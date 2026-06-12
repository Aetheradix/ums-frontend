import React from 'react';
import { roadmap } from '../constants/data';

export const Roadmap: React.FC = () => {
  return (
    <section id="roadmap" className="py-32 px-6 bg-white" data-scroll-section>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-bold mb-20 text-center">
          Our <span className="text-gradient">Roadmap</span>
        </h2>

        <div className="relative space-y-12">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-neon-indigo via-neon-cyan to-transparent opacity-20" />

          {roadmap.map((item, i) => (
            <div
              key={i}
              className={`flex flex-col md:flex-row items-center gap-8 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
            >
              <div className="flex-1 w-full md:w-1/2" />

              <div className="relative z-10 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full glass border-neon-cyan/50 flex items-center justify-center p-2 mb-4 md:mb-0">
                  <div className="w-4 h-4 rounded-full bg-neon-cyan shadow-[0_0_15px_rgba(6,182,212,0.8)]" />
                </div>
              </div>

              <div className="flex-1 w-full md:w-1/2 p-8 rounded-3xl glass border-white/5 hover:border-white/10 transition-colors">
                <div className="text-neon-cyan font-mono text-sm mb-2">
                  {item.phase}
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
