import React from 'react';
import Image from 'next/image';

const features = [
  {
    title: 'Exam Focused',
    description: 'Designed exactly for what exams ask.',
    icon: '/assets/features-icons/goal-icon.svg',
  },
  {
    title: 'Visual First',
    description: 'Learn faster with visual clarity.',
    icon: '/assets/features-icons/eye-icon.svg',
  },
  {
    title: 'Better Retention',
    description: 'Remember more with smart visuals.',
    icon: '/assets/features-icons/brain-icon.svg',
  },
  {
    title: 'Saves Time',
    description: 'Quick revision in less time.',
    icon: '/assets/features-icons/clock-icon.svg',
  },
  {
    title: 'Expert Curated',
    description: 'Quality checked by subject experts.',
    icon: '/assets/features-icons/expert-icon.svg',
  },
  {
    title: 'Trusted by 50K+',
    description: 'Thousands of aspirants trust our vault.',
    icon: '/assets/features-icons/verification-icon.svg',
  },
];

export default function Features() {
  return (
    <section className="pt-4 pb-10 px-6 max-w-7xl mx-auto w-full">
      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-10">
        
        {/* Left Side: Illustration - Aggressive Edge Masking */}
        <div className="w-full lg:w-[50%] relative">
          <div 
            className="relative z-10"
            style={{
              maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
              maskComposite: 'intersect',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
              WebkitMaskComposite: 'destination-in'
            }}
          >
            <Image 
              src="/assets/images/white-ambassador-car-whiter-trasnperent.webp" 
              alt="Civil Services Ambassador Car Illustration" 
              width={800} 
              height={600}
              className="w-full h-auto mix-blend-multiply opacity-90"
              priority
            />
          </div>
          {/* Natural Grounding Shadow */}
          <div className="absolute bottom-[10%] left-[10%] right-[10%] h-[5%] bg-black/5 blur-3xl rounded-[100%] pointer-events-none opacity-30" />
        </div>

        {/* Right Side: Features Content */}
        <div className="w-full lg:w-[55%] flex flex-col space-y-8">
          <div className="text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A2E] leading-tight font-sketch mb-2">
              Why Aspirants Trust ExamVault
            </h2>
          </div>

          {/* Features Grid - 3 columns, 2 rows with icons to the left of text */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-6">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="flex flex-row items-start gap-5 group"
              >
                {/* Icon Wrapper - Text to the right */}
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center mt-1">
                  <Image 
                    src={feature.icon} 
                    alt={feature.title} 
                    width={48} 
                    height={48}
                    className="w-12 h-12 group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Text Content - Aligned to the right of the icon */}
                <div className="flex flex-col space-y-0.5">
                  <h3 className="text-xl font-bold text-[#1A1A2E] leading-tight">
                    {feature.title}
                  </h3>
                  <p className="text-[15px] text-[#4A4A68] leading-relaxed font-medium">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
