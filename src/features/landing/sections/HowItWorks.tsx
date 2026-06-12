import gsap from 'gsap';
import React, { useEffect, useRef } from 'react';
import { seamlessIntegrations } from '../constants/data';

export const HowItWorks: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);

  console.log('Rendering HowItWorks section', {
    seamlessIntegrations,
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray('.step-card');

      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (sections.length - 1),
          end: () => '+=' + horizontalRef.current?.offsetWidth,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="how-it-works"
      className="bg-white overflow-hidden h-screen flex flex-col justify-center"
      data-scroll-section
    >
      <div className="px-6 mb-12">
        <h2 className="text-4xl md:text-6xl font-bold text-center">
          Seamless <span className="text-gradient">Workflow</span>
        </h2>
      </div>

      <div
        ref={horizontalRef}
        className="flex gap-12 px-12 items-center min-w-max"
      >
        {seamlessIntegrations.map((item, i) => (
          <div
            key={i}
            className="step-card w-[80vw] md:w-[40vw] h-[50vh] glass rounded-[2.5rem] p-12 flex flex-col justify-between border-white/5 relative group"
          >
            <div className="absolute top-0 right-0 p-8 text-8xl font-black text-white/5 group-hover:text-neon-cyan/10 transition-colors">
              {item.step}
            </div>
            <div>
              <div className="w-16 h-1 bg-neon-cyan mb-8" />
              <h3 className="text-3xl md:text-4xl font-bold mb-6">
                {item.title}
              </h3>
              <p className="text-xl text-gray-400 leading-relaxed max-w-sm">
                {item.desc}
              </p>
            </div>
            <div className="flex items-center gap-4 text-neon-cyan font-bold">
              Learn More <div className="w-10 h-px bg-neon-cyan" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
