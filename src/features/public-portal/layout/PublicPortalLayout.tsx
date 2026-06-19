import React, { Suspense, useState, useEffect } from 'react';
import useLenis from '../hooks/useLenis';
import useScrollReveal from '../hooks/useScrollReveal';
import useGSAPAnimations from '../hooks/useGSAPAnimations';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ScrollProgress from '../components/ui/ScrollProgress';
import BackToTop from '../components/ui/BackToTop';
import Preloader from '../components/ui/Preloader';

export default function PublicPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showPreloader, setShowPreloader] = useState(() => {
    return !sessionStorage.getItem('octagon_intro_seen');
  });

  useLenis();
  useScrollReveal();
  useGSAPAnimations();

  useEffect(() => {
    if (showPreloader) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      window.dispatchEvent(new Event('scroll'));
      window.dispatchEvent(new Event('resize'));
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showPreloader]);

  const handlePreloaderComplete = () => {
    setShowPreloader(false);
    sessionStorage.setItem('octagon_intro_seen', 'true');
  };

  return (
    <div className="octagon-theme min-h-screen relative bg-white text-navy selection:bg-blue-100 selection:text-blue-700">
      {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}
      <ScrollProgress />
      <Navbar />
      <Suspense fallback={<div className="min-h-screen" />}>
        {children}
      </Suspense>
      <Footer />
      <BackToTop />
    </div>
  );
}
