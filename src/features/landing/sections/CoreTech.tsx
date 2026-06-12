import { Database, Layers, Network, Share2 } from 'lucide-react';
import React from 'react';

export const CoreTech: React.FC = () => {
  return (
    <section
      id="tech"
      className="py-32 px-6 bg-black relative overflow-hidden"
      data-scroll-section
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1 space-y-8">
          <h2 className="text-4xl md:text-6xl font-bold">
            The Core <span className="text-gradient">Engine</span>
          </h2>
          <p className="text-xl text-gray-400 leading-relaxed">
            Our architecture is built on a foundation of reliability and extreme
            performance. We leverage modern microservices and edge-computing to
            deliver results at the speed of thought.
          </p>

          <div className="space-y-4 pt-4">
            {[
              {
                icon: Database,
                label: 'Distributed Infrastructure',
                desc: 'No single point of failure.',
              },
              {
                icon: Network,
                label: 'Neural Mesh Routing',
                desc: 'Intelligent traffic management.',
              },
              {
                icon: Layers,
                label: 'Atomic Components',
                desc: 'Extremely modular design system.',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex gap-4 p-4 rounded-2xl hover:bg-white/5 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-zinc-900 flex items-center justify-center group-hover:bg-neon-cyan/20 transition-colors">
                  <item.icon className="text-neon-cyan w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold">{item.label}</h4>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 relative aspect-square w-full max-w-lg">
          {/* Animated Tech Diagram Placeholder */}
          <div className="absolute inset-0 border-2 border-dashed border-white/10 rounded-full animate-[spin_60s_linear_infinite]" />
          <div className="absolute inset-[15%] border-2 border-dotted border-white/20 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
          <div className="absolute inset-[30%] glass rounded-full flex items-center justify-center">
            <Share2 className="text-neon-cyan w-16 h-16 animate-pulse" />
          </div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 glass rounded-lg flex items-center justify-center border-neon-indigo/50">
            <Cpu className="text-neon-indigo w-6 h-6" />
          </div>
        </div>
      </div>
    </section>
  );
};

const Cpu = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="16" height="16" x="4" y="4" rx="2" />
    <rect width="6" height="6" x="9" y="9" rx="1" />
    <path d="M15 2v2" />
    <path d="M15 20v2" />
    <path d="M2 15h2" />
    <path d="M2 9h2" />
    <path d="M20 15h2" />
    <path d="M20 9h2" />
    <path d="M9 2v2" />
    <path d="M9 20v2" />
  </svg>
);
