import React from 'react';
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { GoldenUnderline } from "@/components/GoldenUnderline";

export default function JuniorProcess() {
  const steps = [
    {
      number: "1.",
      title: "Choose",
      desc: "Pick the perfect book for your child.",
      icon: "/assets/process-icons/search-mignifiying.svg"
    },
    {
      number: "2.",
      title: "Buy",
      desc: "Get instant access with a secure payment.",
      icon: "/assets/process-icons/cart-store.svg"
    },
    {
      number: "3.",
      title: "Download",
      desc: "Download the PDF and start learning.",
      icon: "/assets/process-icons/cloud-download.svg"
    },
    {
      number: "4.",
      title: "Enjoy & Learn",
      desc: "Watch your child learn, grow and shine!",
      icon: "/assets/images/junior-landingpage/star-process-icon-new.svg"
    }
  ];

  return (
    <section className="pt-4 pb-10 px-6 max-w-7xl mx-auto w-full">
      {/* Section Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-[#2D2D2D] leading-tight inline-block relative font-sketch">
          How Learning Becomes Fun!
          <GoldenUnderline className="absolute top-[105%] left-1/2 -translate-x-1/2 w-40 text-[#B59410] opacity-80 h-4 pointer-events-none" />
        </h2>
      </div>

      {/* Steps Container */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-10 xl:gap-12">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            {/* Step Item */}
            <div className="flex flex-col items-center text-center space-y-2 max-w-[220px] group">
              {/* Icon Container */}
              <div className={`relative flex items-center justify-center transition-transform duration-500 group-hover:scale-110 w-24 h-24`}>
                <Image
                  src={step.icon}
                  alt={step.title}
                  width={96}
                  height={96}
                  className="w-full h-full object-contain mix-blend-multiply"
                />
              </div>

              {/* Text Content */}
              <div className="flex flex-col space-y-1 w-full items-center">
                <h3 className="text-xl font-bold text-[#2D2D2D] flex items-center justify-center gap-1.5">
                  <span className="text-[#B59410] font-sketch">{step.number}</span>
                  <span>{step.title}</span>
                </h3>
                <p className="text-[13px] text-[#5A5A75] font-semibold leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>

            {/* Arrow between steps (except last) */}
            {index < steps.length - 1 && (
              <>
                {/* Desktop Horizontal Arrow */}
                <div className="hidden lg:flex items-center justify-center text-[#B59410]/40 -mt-20">
                  <ArrowRight strokeWidth={1.5} className="w-8 h-8" />
                </div>
                {/* Mobile/Tablet Vertical Arrow */}
                <div className="flex lg:hidden items-center justify-center text-[#B59410]/40 py-1">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="animate-bounce" style={{ animationDuration: "3s" }}>
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <polyline points="19 12 12 19 5 12"></polyline>
                  </svg>
                </div>
              </>
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}
