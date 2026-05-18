'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { GoldenUnderline } from '@/components/GoldenUnderline';

const testimonialData = [
  {
    quote: '"The visual notes are a game changer! I can revise Polity in half the time."',
    author: 'Ananya R.',
    title: 'UPSC Aspirant',
    rating: 5
  },
  {
    quote: '"Mind maps are extremely helpful for quick revision before exams."',
    author: 'Rohit S.',
    title: 'UPSC Aspirant',
    rating: 5
  },
  {
    quote: '"Best study material I have ever used. Short, crisp and exam oriented."',
    author: 'Neha T.',
    title: 'UPSC Aspirant',
    rating: 5
  },
  {
    quote: '"The geography maps are so detailed yet easy to remember. Highly recommended!"',
    author: 'Vikram M.',
    title: 'UPSC Aspirant',
    rating: 4
  },
  {
    quote: '"Excellent current affairs compilation. Saves me hours of newspaper reading."',
    author: 'Priya K.',
    title: 'UPSC Aspirant',
    rating: 5
  },
  {
    quote: '"The ethics case studies are very well explained with practical examples."',
    author: 'Siddharth V.',
    title: 'UPSC Aspirant',
    rating: 4
  }
];

// Duplicate the list for infinite-like scrolling
const testimonials = [...testimonialData, ...testimonialData, ...testimonialData];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(testimonialData.length);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isTransitioning, setIsTransitioning] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => prev + 1);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => prev - 1);
  }, []);

  // Handle loop reset
  useEffect(() => {
    if (currentIndex >= testimonialData.length * 2) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(testimonialData.length);
      }, 700); // Match transition duration
    } else if (currentIndex < testimonialData.length) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(testimonialData.length * 2 - 1);
      }, 700);
    } else {
      setIsTransitioning(true);
    }
  }, [currentIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section className="pt-4 pb-10 px-6 max-w-7xl mx-auto w-full relative overflow-hidden">
      {/* Local high-intensity sketch filter */}
      <svg className="absolute w-0 h-0 pointer-events-none">
        <filter id="heavySketch">
          <feTurbulence type="fractalNoise" baseFrequency="0.05 0.15" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      {/* Section Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A2E] leading-tight inline-block relative font-sketch">
          Loved by Aspirants
          <GoldenUnderline className="absolute top-[105%] left-1/2 -translate-x-1/2 w-40 text-[#B59410] opacity-80 h-4 pointer-events-none" />
        </h2>
      </div>

      {/* Testimonials Container */}
      <div className="relative group px-4 xl:px-12">
        {/* Navigation Arrows */}
        <button 
          onClick={prevSlide}
          className="hidden xl:flex absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center text-[#B59410] hover:scale-110 transition-transform duration-200 z-10 bg-transparent cursor-pointer"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
        <button 
          onClick={nextSlide}
          className="hidden xl:flex absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center text-[#B59410] hover:scale-110 transition-transform duration-200 z-10 bg-transparent cursor-pointer"
        >
          <ChevronRight className="w-8 h-8" />
        </button>

        {/* Carousel View */}
        <div className="overflow-hidden py-4">
          <div 
            className={`flex ${isTransitioning ? 'transition-transform duration-700 ease-in-out' : ''}`}
            style={{ transform: `translateX(-${currentIndex * (100 / visibleCount)}%)` }}
          >
            {testimonials.map((t, index) => (
              <div 
                key={index} 
                className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 px-4 py-2"
              >
                <div 
                  className="group relative flex flex-col h-full p-6 bg-transparent transition-all duration-300 min-h-[220px]"
                >
                  {/* Sketchy Border Backdrop */}
                  <div 
                    className="absolute inset-0 z-0 pointer-events-none transition-all duration-300 bg-white/80 rounded-[24px]"
                    style={{
                      filter: 'drop-shadow(4px 6px 12px rgba(181, 148, 16, 0.12)) url(#heavySketch)',
                      borderRadius: index % 2 === 0 ? '20px 24px 18px 28px / 28px 18px 24px 20px' : '24px 18px 28px 20px / 20px 28px 18px 24px',
                      border: '2.5px solid #B59410',
                    }}
                  />
                  
                  {/* Content Wrapper */}
                  <div className="relative z-10 flex flex-col h-full justify-between">
                    <div>
                      {/* Quote */}
                      <p className="text-base text-[#1A1A2E] font-medium leading-relaxed italic mb-4">
                        {t.quote}
                      </p>

                      {/* Stars */}
                      <div className="flex gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < t.rating ? 'text-[#B59410] fill-[#B59410]' : 'text-gray-200'}`} 
                          />
                        ))}
                      </div>
                    </div>

                    {/* Author */}
                    <div className="mt-4">
                      <p className="text-sm font-bold text-[#1A1A2E]">
                        — {t.author}, <span className="text-[#4A4A68] font-semibold">{t.title}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Arrows Block */}
      <div className="flex xl:hidden justify-center items-center gap-6 mt-6">
        <button 
          onClick={prevSlide}
          className="w-10 h-10 flex items-center justify-center rounded-[10px] border-2 border-[#B59410] text-[#B59410] bg-[#B59410]/5 hover:bg-[#B59410]/15 active:scale-95 transition-all duration-150 cursor-pointer shadow-[2px_2px_0px_#B59410]"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-6 h-6" strokeWidth={2.5} />
        </button>
        <button 
          onClick={nextSlide}
          className="w-10 h-10 flex items-center justify-center rounded-[10px] border-2 border-[#B59410] text-[#B59410] bg-[#B59410]/5 hover:bg-[#B59410]/15 active:scale-95 transition-all duration-150 cursor-pointer shadow-[2px_2px_0px_#B59410]"
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-6 h-6" strokeWidth={2.5} />
        </button>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#B59410]/5 blur-[100px] rounded-full -z-10" />
      <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#B59410]/5 blur-[100px] rounded-full -z-10" />
    </section>
  );
}
