import gsap from 'gsap';
import React, { useEffect, useRef } from 'react';

export const Vision: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.vision-title', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'top 20%',
          scrub: 1,
        },
        opacity: 0,
        y: 50,
      });

      gsap.from('.vision-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          end: 'bottom 20%',
          scrub: 1,
        },
        opacity: 0,
        scale: 0.9,
        stagger: 0.2,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="vision"
      className="min-h-screen py-32 px-6 bg-black"
      data-scroll-section
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 text-center">
          <h2 className="vision-title text-4xl md:text-6xl font-bold mb-6">
            Our Core <span className="text-gradient">Vision</span>
          </h2>
          <p className="vision-title text-xl text-gray-400 max-w-2xl mx-auto">
            We are building the future of enterprise intelligence, where design
            meets deep functionality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Innovation First',
              desc: "Pushing the boundaries of what's possible with cutting-edge tech.",
              gradient: 'from-neon-indigo/20 to-transparent',
            },
            {
              title: 'Experience Driven',
              desc: 'Every pixel is crafted to provide a premium and fluid experience.',
              gradient: 'from-neon-violet/20 to-transparent',
            },
            {
              title: 'Data Centric',
              desc: 'Harnessing the power of data to drive intelligent decision-making.',
              gradient: 'from-neon-cyan/20 to-transparent',
            },
          ].map((item, i) => (
            <div
              key={i}
              className={`vision-card p-10 rounded-3xl glass border-white/5 relative overflow-hidden group`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
              />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-premium-gradient mb-6" />
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
