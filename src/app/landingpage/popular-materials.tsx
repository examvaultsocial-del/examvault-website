import React from 'react';
import { Sparkles, BookOpen } from 'lucide-react';

// SVG Filters for sketchy effects
const SvgFilters = () => (
  <svg width="0" height="0" style={{ position: 'absolute' }}>
    <defs>
      <filter id="heavySketch">
        <feTurbulence type="fractalNoise" baseFrequency="0.08" numOctaves="4" result="noise" seed="3" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" />
      </filter>
    </defs>
  </svg>
);

export default function PopularMaterials() {
  return (
    <section className="pt-8 pb-16 px-6 max-w-5xl mx-auto w-full text-center">
      <SvgFilters />
      
      <div className="bg-[#FFFDF9] border-2 border-dashed border-[#E2D4B7] rounded-[32px] p-10 md:p-16 max-w-3xl mx-auto shadow-sm relative overflow-hidden select-none">
        
        {/* Background decorative sketch elements */}
        <div className="absolute top-4 right-4 text-[#B59410]/20 animate-pulse">
          <Sparkles className="w-8 h-8" />
        </div>
        <div className="absolute bottom-4 left-4 text-[#B59410]/20">
          <BookOpen className="w-8 h-8" />
        </div>

        {/* Dynamic header details */}
        <h2 className="text-3xl md:text-4xl font-sketch text-[#2D2D2D] leading-tight mb-4">
          Exams Related Visual Materials
        </h2>
        
        <p className="text-base md:text-lg text-[#555] font-semibold max-w-xl mx-auto mb-10 leading-relaxed">
          High-fidelity visual notes, interactive mind maps, and topic-wise solved PYQs for UPSC, SSC, and Banking exams are being prepared by our top educators.
        </p>

        {/* Premium Solid-Color Sketchy Badge */}
        <div className="relative inline-flex items-center justify-center px-8 py-3.5 text-sm font-extrabold uppercase tracking-wider text-white select-none">
          {/* Sketchy Solid Background Layer */}
          <div 
            className="absolute inset-0 bg-[#B59410] border-2 border-[#9a7a0a] rounded-full pointer-events-none shadow-md"
            style={{
              filter: "url(#heavySketch)",
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
              willChange: 'filter, transform'
            }}
          />
          {/* Text Layer */}
          <span className="relative z-10 flex items-center gap-2 text-white font-sketch tracking-widest text-sm font-extrabold">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            We are launching products soon...
          </span>
        </div>

      </div>
    </section>
  );
}
