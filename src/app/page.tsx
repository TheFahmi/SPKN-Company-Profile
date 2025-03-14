'use client';

import React, { useEffect, useState } from 'react';
import HeroSection from './components/home/HeroSection';
import KeunggulanSection from './components/home/KeunggulanSection';
import ProdukSection from './components/home/ProdukSection';
import TestimonialSection from './components/home/TestimonialSection';
import PengalamanSection from './components/home/PengalamanSection';
import CTASection from './components/home/CTASection';

export default function Home() {
  const [isVisible, setIsVisible] = useState({
    hero: true, // Set hero to true by default for immediate rendering
    keunggulan: false,
    produk: false,
    testimonial: false,
    pengalaman: false,
    cta: false
  });

  useEffect(() => {
    // Helper function to check if element is in viewport
    const isInViewport = (element: Element | null) => {
      if (!element) return false;
      const rect = element.getBoundingClientRect();
      return rect.top <= window.innerHeight * 0.75;
    };
    
    // Use requestAnimationFrame for better performance
    let rafId: number;
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (!ticking && Math.abs(currentScrollY - lastScrollY) > 20) {
        // Only update if scrolled more than 20px to reduce calculations
        rafId = window.requestAnimationFrame(() => {
          const sections = ['keunggulan', 'produk', 'testimonial', 'pengalaman', 'cta'];
          
          sections.forEach(section => {
            const element = document.getElementById(section);
            if (element) {
              const inView = isInViewport(element);
              setIsVisible(prev => {
                // Only update state if visibility changed
                if (prev[section as keyof typeof prev] !== inView) {
                  return { ...prev, [section]: inView };
                }
                return prev;
              });
            }
          });
          
          ticking = false;
          lastScrollY = currentScrollY;
        });
        ticking = true;
      }
    };

    // Call once to check initial visibility
    setTimeout(() => {
      const sections = ['keunggulan', 'produk', 'testimonial', 'pengalaman', 'cta'];
      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element && isInViewport(element)) {
          setIsVisible(prev => ({ ...prev, [section]: true }));
        }
      });
    }, 100);
    
    // Add passive event listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Keunggulan Kami Section */}
      <KeunggulanSection isVisible={isVisible.keunggulan} />

      {/* Produk & Layanan Section */}
      <ProdukSection isVisible={isVisible.produk} />

      {/* Testimonial Section */}
      <TestimonialSection isVisible={isVisible.testimonial} />

      {/* Pengalaman Kami Section */}
      <PengalamanSection isVisible={isVisible.pengalaman} />

      {/* CTA Section */}
      <CTASection isVisible={isVisible.cta} />
    </>
  );
}