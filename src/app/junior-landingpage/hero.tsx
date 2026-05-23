"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Brain, Eye, Smile, ShieldCheck } from "lucide-react";
import { GoldenUnderline } from "@/components/GoldenUnderline";
import SketchButton from "@/components/SketchButton";

export default function JuniorHero() {
  return (
    <section className="flex flex-col lg:flex-row max-w-7xl mx-auto w-full pt-6 md:pt-10 pb-8 items-center justify-between gap-8 px-6 relative">

      {/* Left Typography Column */}
      <div className="w-full lg:w-[48%] flex flex-col space-y-6 text-left z-10">

        {/* Main Header */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-sketch text-[#2D2D2D] leading-[1.15] tracking-tight relative pr-4">
          <span className="block">Big Dreams</span>
          <span className="block mt-1">Start with</span>
          <span className="relative inline-block mt-1 text-[#B59410]">
            Curious Minds!
            <GoldenUnderline className="absolute top-[90%] left-[-2%] w-[104%] text-[#B59410] opacity-90 h-5 pointer-events-none" />
            {/* Sketchy hand-drawn star next to Curious Minds */}
            <span className="absolute -right-8 top-2 text-2xl md:text-3xl text-[#B59410] animate-[pulse_3s_infinite]">
            </span>
          </span>
        </h1>

        {/* Subtext */}
        <p className="text-[#4A4A68] text-sm md:text-base font-semibold leading-relaxed max-w-[500px]">
          Fun, visual and engaging study materials for Jr KG to 7th Std. Learn better, understand faster and enjoy every step of your learning journey.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-4 pt-1">
          <Link href="/products?category=junior" className="z-10">
            <SketchButton
              variant="primary"
              icon={ArrowRight}
              iconPosition="right"
            >
              Explore Courses
            </SketchButton>
          </Link>
          <Link href="/coming-soon?feature=Free%20Resources" className="z-10">
            <SketchButton
              variant="outline"
              icon={ArrowRight}
              iconPosition="right"
            >
              Try Free Resources
            </SketchButton>
          </Link>
        </div>
      </div>

      {/* Right Illustration Column: Clean & Transparent */}
      <div className="mt-12 lg:mt-0 flex-1 lg:relative lg:w-1/2 lg:flex lg:justify-center xl:absolute xl:right-0 xl:top-[-35%] xl:w-[750px] 2xl:w-[950px] flex justify-center lg:justify-end z-0 pointer-events-none xl:pointer-events-auto">
        <div className="relative w-full max-w-[500px] lg:max-w-none aspect-square mix-blend-multiply opacity-90 transition-transform duration-700">
          <Image
            src="/assets/images/junior-landingpage/herosectiongirlandboy.png"
            alt="ExamVault Junior Illustration"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-contain"
            priority
          />
        </div>
      </div>

    </section>
  );
}
