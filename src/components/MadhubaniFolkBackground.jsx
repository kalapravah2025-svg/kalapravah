import React from 'react';

/**
 * Authentic Madhubani Twin Peacocks Canvas Fixed Background
 * Guaranteed 100% full screen coverage (scaled 108% to crop out image border framing for seamless wall-to-wall coverage)
 * Rendered at an ultra-subtle, elegant opacity level (14% opacity + 55% parchment veil overlay)
 */
export default function MadhubaniFolkBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none w-full h-full gpu-accelerated">
      
      {/* 1. SOFT TRANSLUCENT PARCHMENT VEIL OVERLAY FOR TEXT READABILITY */}
      <div className="absolute inset-0 bg-[#FAF8F3]/55 z-10" />

      {/* 2. AUTHENTIC MADHUBANI ARTWORK (SAME AS CELESTIAL GLOBE) */}
      <img
        src="/images/artwork_sphere_surya_chandra.jpg"
        alt="Madhubani Surya Chandra Canvas Background"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover object-center scale-108 sm:scale-110 opacity-[0.14] mix-blend-multiply z-0 pointer-events-none"
      />

    </div>
  );
}
