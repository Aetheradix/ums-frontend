import gsap from 'gsap';
import { ChevronRight } from 'lucide-react';
import React, { useEffect, useRef } from 'react';

export const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { ease: 'power4.out', duration: 1.5 },
    });

    tl.fromTo(
      headlineRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, delay: 0.5 }
    )
      .fromTo(
        subheadlineRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1 },
        '-=1'
      )
      .fromTo(
        ctaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1 },
        '-=0.8'
      );
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-6 text-center overflow-hidden"
      data-scroll-section
    >
      {/* Background Animated Elements */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-neon-indigo/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-neon-violet/20 blur-[100px] rounded-full animate-pulse delay-700" />
      </div>

      <div className="max-w-5xl mx-auto space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium text-neon-cyan border-neon-cyan/20 mb-4 animate-bounce">
          <span className="w-2 h-2 bg-neon-cyan rounded-full" />
          Revolutionizing the Future
        </div>

        <h1
          ref={headlineRef}
          className="text-6xl md:text-8xl font-bold tracking-tight leading-tight"
        >
          Elevate Your <span className="text-gradient">Experience</span> with
          Next-Gen Innovation
        </h1>

        <p
          ref={subheadlineRef}
          className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
        >
          A premium, high-performance platform designed for visionaries. Immerse
          yourself in a world of seamless intelligence and world-class design.
        </p>

        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8"
        >
          <button className="group relative px-8 py-4 bg-premium-gradient rounded-xl font-bold text-lg overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(99,102,241,0.4)]">
            <span className="relative z-10 flex items-center gap-2">
              Get Started{' '}
              <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-white/20 transform -skew-x-12 translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-700" />
          </button>

          <button className="px-8 py-4 glass rounded-xl font-bold text-lg hover:bg-white/10 transition-all border-white/10">
            View Vision
          </button>
        </div>
      </div>

      {/* Floating Mockup / Visual Element Placeholder */}
      <div className="mt-20 w-full max-w-4xl glass rounded-t-3xl border-b-0 p-4 pb-0 h-40 md:h-64 opacity-50 translate-y-10">
        <div className="w-full h-full bg-zinc-900 rounded-t-2xl flex items-center justify-center text-zinc-700 font-mono text-xs">
          [ IMMERSIVE_VISUAL_ELEMENT ]
        </div>
      </div>
    </section>
  );
};
