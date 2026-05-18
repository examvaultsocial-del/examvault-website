import React from 'react';
import Link from 'next/link';
import { 
  Users, 
  FileCheck, 
  Landmark, 
  Map, 
  ClipboardList, 
  History, 
  Monitor, 
  BookOpen 
} from 'lucide-react';
import { GoldenUnderline } from '@/components/GoldenUnderline';

const categories = [
  {
    title: 'UPSC Civil Services',
    icon: Users,
    color: '#B59410',
    href: '/products?exam=upsc'
  },
  {
    title: 'SSC Exams',
    icon: FileCheck,
    color: '#B59410',
    href: '/products?exam=ssc'
  },
  {
    title: 'Banking Exams',
    icon: Landmark,
    color: '#B59410',
    href: '/products?exam=banking'
  },
  {
    title: 'State PSC Exams',
    icon: Map,
    color: '#B59410',
    href: '/products?exam=state'
  },
  {
    title: 'Current Affairs (Visual)',
    icon: ClipboardList,
    color: '#B59410',
    href: '/coming-soon'
  },
  {
    title: 'PYQs & Solutions',
    icon: History,
    color: '#B59410',
    href: '/coming-soon'
  },
  {
    title: 'Tests & Quizzes',
    icon: Monitor,
    color: '#B59410',
    href: '/coming-soon'
  },
  {
    title: 'All Courses',
    icon: BookOpen,
    color: '#B59410',
    href: '/products'
  }
];

export default function Categories() {
  return (
    <section className="pt-0 pb-10 px-6 max-w-7xl mx-auto w-full relative">
      {/* Local high-intensity sketch filter for more pronounced hand-drawn borders */}
      <svg className="absolute w-0 h-0 pointer-events-none">
        <filter id="heavySketch">
          <feTurbulence type="fractalNoise" baseFrequency="0.05 0.15" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      {/* Section Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl pencil-sketch inline-block relative">
          Find What You Need – Instantly
          <GoldenUnderline className="absolute top-[105%] left-1/2 -translate-x-1/2 w-48 text-[#B59410] opacity-80 h-4 pointer-events-none" />
        </h2>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-2 sm:gap-4">
        {categories.map((cat, index) => (
          <Link 
            key={index}
            href={cat.href}
            className="group relative flex flex-col items-center justify-center py-3.5 px-1 sm:p-4 md:p-6 transition-all duration-300 cursor-pointer text-center space-y-2 sm:space-y-4 overflow-visible"
            style={{
              backgroundColor: 'transparent',
            }}
          >
            {/* Sketchy Border & Shadow Overlay - Applying drop-shadow BEFORE the sketch filter to make the shadow itself sketchy */}
            <div 
              className="absolute inset-0 z-0 pointer-events-none transition-all duration-300"
              style={{
                filter: 'drop-shadow(4px 8px 12px rgba(138, 109, 9, 0.25)) url(#heavySketch)',
                borderRadius: index % 2 === 0 ? '4px 8px 6px 12px / 12px 6px 8px 4px' : '10px 5px 12px 6px / 6px 12px 5px 10px',
                border: '2.5px solid #B59410', // Forced gold color
                background: 'transparent'
              }}
            />

            {/* Icon Container - Now with Sketchy Feel */}
            <div 
              className="relative z-10 w-9.5 h-9.5 sm:w-12 sm:h-12 flex items-center justify-center bg-[#B59410]/10 rounded-xl group-hover:scale-110 transition-transform duration-300"
              style={{
                filter: 'url(#heavySketch)', // Applying sketch feel to icons
              }}
            >
              <cat.icon 
                className="w-5 h-5 sm:w-7 sm:h-7 text-[#B59410]" 
                strokeWidth={2} // Thicker strokes for a better pencil feel
              />
            </div>

            {/* Title - Clean, non-sketchy text */}
            <span className="relative z-10 text-[11px] sm:text-sm font-semibold text-[#2D2D2D] leading-snug px-0.5 break-words max-w-full">
              {cat.title}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
