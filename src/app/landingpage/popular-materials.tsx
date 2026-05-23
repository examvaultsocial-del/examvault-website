import React from 'react';
import Image from 'next/image';
import { Star, ArrowRight } from 'lucide-react';

const materials = [
  {
    title: 'Indian Polity',
    subtitle: 'Visual Notes',
    price: '199',
    rating: '4.8',
    reviews: '2.3K',
    image: '/assets/images/placeholder-pdfimage.webp'
  },
  {
    title: 'Modern History',
    subtitle: 'Visual Notes',
    price: '199',
    rating: '4.7',
    reviews: '1.8K',
    image: '/assets/images/placeholder-pdfimage.webp'
  },
  {
    title: 'Indian Geography',
    subtitle: 'Mind Maps',
    price: '179',
    rating: '4.8',
    reviews: '1.5K',
    image: '/assets/images/placeholder-pdfimage.webp'
  },
  {
    title: 'Indian Economy',
    subtitle: 'Visual Notes',
    price: '199',
    rating: '4.8',
    reviews: '1.9K',
    image: '/assets/images/placeholder-pdfimage.webp'
  },
  {
    title: 'Environment & Ecology',
    subtitle: 'Visual Notes',
    price: '179',
    rating: '4.7',
    reviews: '1.2K',
    image: '/assets/images/placeholder-pdfimage.webp'
  },
  {
    title: 'UPSC PYQs Topic',
    subtitle: 'Wise Solutions',
    price: '249',
    rating: '4.9',
    reviews: '2.6K',
    image: '/assets/images/placeholder-pdfimage.webp'
  }
];

export default function PopularMaterials() {
  return (
    <section className="pt-4 pb-10 px-6 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A2E] leading-tight">
            Popular UPSC Study Material
          </h2>
        </div>
        <button className="flex items-center gap-2 text-sm font-bold text-[#4A4A68] hover:text-[#B59410] transition-colors group">
          View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Materials Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {materials.map((item, index) => (
          <div key={index} className="flex flex-col space-y-2 group cursor-pointer">
            {/* Book Thumbnail Container - Real 3D Book Feel */}
            <div className="relative group [perspective:1000px] w-full aspect-[3/4.2]">
              {/* Main Book Structure */}
              <div 
                className="relative w-full h-full bg-[#FDFBF7] shadow-md transition-all duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)] [transform-style:preserve-3d] origin-left group-hover:shadow-[15px_20px_25px_rgba(26,26,46,0.15)] group-hover:[transform:rotateY(-16deg)_scale(1.02)_translateY(-6px)]"
                style={{
                  border: '2px solid #B59410',
                  borderRadius: '4px 12px 12px 4px', // Spine feel
                  willChange: 'transform'
                }}
              >
                {/* Front Cover Image */}
                <div className="absolute inset-0 w-full h-full overflow-hidden" style={{ borderRadius: '2px 10px 10px 2px' }}>
                  <Image 
                    src={item.image} 
                    alt={item.title}
                    fill
                    className="object-contain p-1 opacity-95 group-hover:opacity-100 transition-opacity"
                  />
                  
                  {/* Book Spine Shadow Effect */}
                  <div className="absolute inset-y-0 left-0 w-[12%] bg-gradient-to-r from-black/25 via-black/5 to-transparent pointer-events-none z-10" />
                  
                  {/* Spine Highlight / Crease */}
                  <div className="absolute inset-y-0 left-[10%] w-[1px] bg-white/20 pointer-events-none z-10" />
                  <div className="absolute inset-y-0 left-[11%] w-[1px] bg-black/10 pointer-events-none z-10" />
                  
                  {/* Glossy/Paper Texture Overlay */}
                  <div className="absolute inset-0 bg-white/5 mix-blend-overlay pointer-events-none" />
                </div>

                {/* 3D Pages Thickness (Right Edge) */}
                <div 
                  className="absolute right-0 top-[2px] bottom-[2px] w-[8px] bg-[#F4EFE0] shadow-inner origin-left transition-all duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)]"
                  style={{
                    transform: 'rotateY(90deg) translateZ(1px)',
                    backgroundImage: 'repeating-linear-gradient(90deg, #E5D5A5 0px, #E5D5A5 1px, transparent 1px, transparent 3px)',
                    borderLeft: '1px solid rgba(181, 148, 16, 0.2)',
                    borderRadius: '0 2px 2px 0'
                  }}
                />
              </div>
            </div>

            {/* Book Details */}
            <div className="flex flex-col space-y-0.5 pt-1">
              <h3 className="text-base font-bold text-[#1A1A2E] leading-tight group-hover:text-[#B59410] transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-[#4A4A68] font-semibold opacity-80">
                {item.subtitle}
              </p>
              <div className="flex items-center gap-1 pt-1">
                <span className="text-lg font-black text-[#1A1A2E]">₹{item.price}</span>
              </div>
              <div className="flex items-center gap-1.5 pt-1">
                <Star className="w-4 h-4 text-[#B59410] fill-[#B59410]" />
                <span className="text-sm font-bold text-[#4A4A68]">{item.rating}</span>
                <span className="text-[11px] text-[#4A4A68]/60 font-semibold">({item.reviews})</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
