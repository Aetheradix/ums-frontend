import { Command, Menu, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'py-4' : 'py-8'}`}
    >
      <div
        className={`mx-auto max-w-7xl px-6 flex items-center justify-between transition-all duration-500 ${scrolled ? 'glass py-3 rounded-2xl mx-6  shadow-2xl' : ''}`}
      >
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-premium-gradient rounded-xl flex items-center justify-center shadow-lg transform rotate-3">
            <Command className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-bold tracking-tighter">PLATFORM</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {['Vision', 'Product', 'Timeline', 'Careers'].map(item => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium text-gray-400 hover:text-white transition-colors relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-neon-cyan transition-all group-hover:w-full" />
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <button className="px-6 py-2.5 bg-white text-black font-bold rounded-xl hover:bg-neon-cyan hover:text-white transition-all transform active:scale-95">
            Launch App
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/95 z-40 transition-all duration-500 flex flex-col items-center justify-center gap-12 md:hidden ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
      >
        {['Vision', 'Product', 'Timeline', 'Careers'].map(item => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-4xl font-bold tracking-tight hover:text-neon-cyan transition-colors"
            onClick={() => setIsOpen(false)}
          >
            {item}
          </a>
        ))}
        <button className="px-10 py-4 bg-premium-gradient rounded-2xl font-bold text-xl">
          Launch App
        </button>
      </div>
    </nav>
  );
};
