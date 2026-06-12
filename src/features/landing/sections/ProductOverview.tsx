import { BarChart3, Cpu, Globe, Layout, Shield, Zap } from 'lucide-react';
import React from 'react';

export const ProductOverview: React.FC = () => {
  return (
    <section
      id="product"
      className="py-32 px-6 bg-white relative overflow-hidden"
      data-scroll-section
    >
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-indigo/5 blur-[150px] -z-10" />

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Powerful <span className="text-gradient">Platform</span>{' '}
              Capabilities
            </h2>
            <p className="text-xl text-gray-400 leading-relaxed">
              Experience a comprehensive suite of tools designed to accelerate
              your growth and simplify complex workflows.
            </p>
          </div>
          <button className="px-8 py-4 glass rounded-2xl font-bold hover:bg-white/5 transition-all text-neon-cyan border-neon-cyan/20">
            Explore Documentation
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: Layout,
              name: 'Intelligent UI',
              desc: 'Adaptive interfaces that learn from user behavior.',
            },
            {
              icon: Shield,
              name: 'Secure by Design',
              desc: 'Enterprise-grade security baked into every layer.',
            },
            {
              icon: Zap,
              name: 'Lightning Fast',
              desc: 'Optimized for performance with sub-second response times.',
            },
            {
              icon: Globe,
              name: 'Global Scale',
              desc: 'Deploy globally with edge-compute capabilities.',
            },
            {
              icon: Cpu,
              name: 'Core Architecture',
              desc: 'Scalable microservices for modular expansion.',
            },
            {
              icon: BarChart3,
              name: 'Deep Analytics',
              desc: 'Real-time insights powered by AI-driven analysis.',
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="p-8 rounded-3xl glass border-white/5 hover:border-neon-cyan/30 transition-all group"
            >
              <div className="w-14 h-14 rounded-2xl bg-zinc-200 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <feature.icon className="text-neon-cyan w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.name}</h3>
              <p className="text-gray-500 line-clamp-2">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Feature Highlight Mockup */}
        <div className="mt-20 glass rounded-3xl overflow-hidden aspect-video relative group border-white/5">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
          <div className="flex flex-col justify-end p-10 relative z-20 h-full">
            <span className="text-neon-cyan font-mono text-sm mb-2">
              FEATURE_01
            </span>
            <h3 className="text-3xl font-bold mb-4">
              Unified Dashboard Control
            </h3>
            <p className="text-gray-400 max-w-xl">
              Manage all your operations from a single, intuitive interface.
              Custom-built widgets and real-time streaming data at your
              fingertips.
            </p>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-zinc-900 opacity-50 group-hover:scale-105 transition-transform duration-1000" />
        </div>
      </div>
    </section>
  );
};
