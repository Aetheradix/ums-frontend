import { Command } from 'lucide-react';
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer
      className="py-20 px-6 bg-white border-t border-white/5"
      data-scroll-section
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Command className="text-neon-cyan w-8 h-8" />
              <span className="text-2xl font-bold tracking-tighter">
                PLATFORM
              </span>
            </div>
            <p className="text-gray-500 leading-relaxed">
              Empowering the next generation of digital excellence through
              innovative design and powerful technology.
            </p>
            <div className="flex gap-4">
              {[Command, Command, Command, Command].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-xl glass flex items-center justify-center text-gray-400 hover:text-white hover:border-neon-cyan/50 transition-all"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6">Product</h4>
            <ul className="space-y-4 text-gray-500">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Solutions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Updates
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-gray-500">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Vision
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Newsletter</h4>
            <p className="text-gray-500 mb-6 font-medium">
              Join our mission and stay updated.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email Address"
                className="bg-zinc-100 border border-white/2 rounded-xl px-4 py-2 flex-1 focus:outline-none focus:border-neon-cyan/50"
              />
              <button className="bg-white text-black font-bold px-4 rounded-xl hover:bg-neon-cyan hover:text-white transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
          <p>© 2026 PLATFORM. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
