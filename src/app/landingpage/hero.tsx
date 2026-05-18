import Image from "next/image";
import Link from "next/link";
import { Brain, Eye, Target, Users, ArrowRight, FileText } from "lucide-react";
import { GoldenUnderline } from "@/components/GoldenUnderline";
import SketchButton from "@/components/SketchButton";

export default function Hero() {
  return (
    <div className="flex flex-col lg:flex-row max-w-7xl mx-auto w-full mt-2 items-start relative min-h-[600px]">
      {/* Left Typography Column */}
      <div className="flex flex-col space-y-6 max-w-2xl lg:max-w-[50%] xl:max-w-2xl text-left z-10 lg:pr-10 lg:pt-0">
        
        {/* Main Header */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl leading-[1.15] tracking-tight relative">
          <div className="pencil-sketch block">Unlock Your</div>
          <div className="pencil-sketch block mt-1">Success</div>
          <div className="flex flex-wrap items-center gap-3 mt-1">
            <span className="pencil-sketch opacity-90">with</span>
            <span className="pencil-sketch-gold relative inline-block transform -rotate-1 group">
              ExamVault
              <GoldenUnderline className="absolute top-[95%] left-[-5%] w-[110%] text-[#B59410] opacity-90 h-6 pointer-events-none" />
            </span>
          </div>
        </h1>

        {/* Subtexts */}
        <div className="space-y-2 pt-1 max-w-[500px]">
          <p className="text-[#2D2D2D] text-base md:text-lg leading-relaxed font-semibold">
            AI-generated visual notes, mind maps, and smart
            study materials for UPSC and all major
            competitive exams.
          </p>
          <p className="text-[#2D2D2D] text-base md:text-lg leading-relaxed font-semibold">
            Everything you need. One trusted vault.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-4 pt-1">
          <Link href="/products" className="z-10">
            <SketchButton 
              variant="primary" 
              icon={ArrowRight} 
              iconPosition="right"
            >
              Explore Products
            </SketchButton>
          </Link>
          <Link href="/products" className="z-10">
            <SketchButton 
              variant="outline" 
              icon={FileText} 
              iconPosition="right"
            >
              Try Free Resources
            </SketchButton>
          </Link>
        </div>

        
      </div>
      
      {/* Right Illustration Column */}
      <div className="mt-12 lg:mt-0 flex-1 lg:relative lg:w-1/2 lg:flex lg:justify-center xl:absolute xl:right-[-5%] xl:top-[-20%] xl:w-[680px] 2xl:w-[850px] flex justify-center lg:justify-end z-0 pointer-events-none xl:pointer-events-auto">
        <div className="relative w-full max-w-[450px] lg:max-w-none aspect-square mix-blend-multiply opacity-90 transition-transform duration-700">
          <Image
            src="/assets/images/vault-hero-illustration.webp"
            alt="ExamVault Illustration"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
}
