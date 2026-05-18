'use client';
import React from 'react';
import { ArrowRight } from 'lucide-react';
import SketchButton from "@/components/SketchButton";

export default function CTA() {
  return (
    <section className="py-4 px-6 max-w-7xl mx-auto w-full">
      <div 
        className="relative overflow-hidden rounded-2xl p-3 md:p-4 flex flex-col md:flex-row items-center justify-between gap-3 border shadow-sm"
        style={{ 
          backgroundColor: 'rgba(139, 114, 12, 0.07)',
          borderColor: 'rgba(181, 148, 16, 0.3)'
        }}
      >
        {/* Text Content */}
        <div className="flex-1 text-center md:text-left z-10 px-4">
          <h2 className="text-lg md:text-xl font-bold text-[#1A1A2E] mb-0.5 font-sketch leading-tight">
            Start Your Success Journey Today
          </h2>
          <p className="text-xs md:text-sm text-[#4A4A68] font-medium opacity-90">
            Join 50,000+ aspirants who trust ExamVault for their preparation.
          </p>
        </div>

        {/* Action Button - Curved Edge Rectangle */}
        <button 
          className="group px-7 py-3 relative rounded-xl font-sketch text-sm md:text-base text-white flex items-center gap-2 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-[#B59410]/20 overflow-hidden"
        >
          {/* Sketchy yellow background and border with pencil filter */}
          <div 
            className="absolute inset-0 bg-[#B59410] pointer-events-none"
            style={{
              filter: 'url(#pencilFilter)',
              borderRadius: 'inherit',
              zIndex: 0
            }}
          />
          {/* Crisp Text Content */}
          <span className="relative z-10 flex items-center gap-2 pointer-events-none">
            Explore Courses Now
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </span>
        </button>

        {/* Decorative Background Texture */}
        <div className="absolute top-0 right-0 w-full h-full opacity-[0.02] pointer-events-none">
          <svg width="100%" height="100%">
            <pattern id="ctaGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#B59410" strokeWidth="0.5"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#ctaGrid)" />
          </svg>
        </div>
      </div>
    </section>
  );
}
