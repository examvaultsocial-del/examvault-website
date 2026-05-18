"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import SketchButton from "@/components/SketchButton";

export default function ComingSoonContent() {
  const searchParams = useSearchParams();
  const rawFeature = searchParams.get("feature");
  const feature = rawFeature ? decodeURIComponent(rawFeature) : "Courses";

  const communities = [
    {
      name: "WhatsApp Community",
      cursiveTitle: "ExamVault Community",
      subtitle: "Stay Connected. Stay Ahead.",
      iconBg: "bg-[#25D366]/10 border-[#25D366]/30",
      cardStyle: "sketch-paper-card-gold",
      accentColor: "text-[#B59410]",
      accentBg: "bg-[#B59410]/10",
      buttonText: "Join WhatsApp Community",
      buttonHref: "https://chat.whatsapp.com/GjN9t2F1G8vK3iL1R4c6Xy",
      description: "Direct community groups for real-time exam notifications, group discussions, and immediate query resolution with our educators.",
      bulletPoints: [
        "Direct support & strategy sharing",
        "Daily challenge practice questions",
        "Instant alerts on study guides release"
      ],
      logo: (
        <svg viewBox="0 0 60 60" className="w-10 h-10 stroke-[#25D366] fill-none stroke-[2.5] stroke-linecap-round stroke-linejoin-round" xmlns="http://www.w3.org/2000/svg">
          {/* Main sketched speech bubble with phone contour */}
          <path d="M30,11 C19.5,11 11,19 11,29 C11,35 14,40.5 18,44 L15,53 L24.5,50 C26.2,50.7 28.1,51 30,51 C40.5,51 49,43 49,33 C49,23 40.5,11 30,11 Z" />
          {/* Sketched telephone receiver inside */}
          <path d="M22,23 C22.5,23.5 24,25.5 24.5,26.5 C25,27.5 24.5,28.5 24,29 C23.5,29.5 23,30 23.5,31 C24,32 25.5,34.5 27,36 C28.5,37.5 30,38.5 31,38 C32,37.5 32.5,37 33.5,36.5 C34.5,36 35.5,36.5 36.5,37 C37.5,37.5 39.5,39 40,39.5 C40.5,40 40,41 39,41.5 C38,42 34.5,42.5 32,40 C29.5,37.5 25.5,32.5 24,30 C22.5,27.5 22,24 23,23 C24,22 21.5,22.5 22,23 Z" />
        </svg>
      )
    },
    {
      name: "Telegram Channel",
      cursiveTitle: "ExamVault Updates",
      subtitle: "Daily Updates. Smart Preparation.",
      iconBg: "bg-[#0088cc]/10 border-[#0088cc]/30",
      cardStyle: "sketch-paper-card-blue",
      accentColor: "text-[#22577A]",
      accentBg: "bg-[#22577A]/10",
      buttonText: "Join Telegram Channel",
      buttonHref: "https://t.me/ExamVaultOfficial",
      description: "Our core resource dropzone. Access exclusive visual cheat sheets, standard curriculum mind maps, and live quiz polls.",
      bulletPoints: [
        "Free printable PDF notes & guides",
        "Weekly standard strategy checklists",
        "Interactive preparation quiz analytics"
      ],
      logo: (
        <svg viewBox="0 0 60 60" className="w-10 h-10 stroke-[#0088cc] fill-none stroke-[2.5] stroke-linecap-round stroke-linejoin-round" xmlns="http://www.w3.org/2000/svg">
          {/* Hand-drawn circular border */}
          <circle cx="30" cy="30" r="21" className="opacity-80" />
          {/* Sketched paper airplane */}
          <path d="M44,16 L14,30 L27,35 L44,16 Z" />
          <path d="M27,35 L33,45 L44,16 Z" />
          <path d="M27,35 L31,39" />
        </svg>
      )
    },
    {
      name: "Instagram Official",
      cursiveTitle: "ExamVault Official",
      subtitle: "Visual Bytes. Micro-Learning.",
      iconBg: "bg-[#E1306C]/10 border-[#E1306C]/30",
      cardStyle: "sketch-paper-card-rose",
      accentColor: "text-[#E1306C]",
      accentBg: "bg-[#E1306C]/10",
      buttonText: "Follow Instagram Page",
      buttonHref: "https://instagram.com/ExamVaultOfficial",
      description: "Quick revision hacks on your social feed. Browse high-yield graphics, interactive reel series, and standard prep tricks.",
      bulletPoints: [
        "Stunning bite-sized infographic summaries",
        "Weekly memory tricks & revision hacks",
        "Behind-the-scenes visual updates"
      ],
      logo: (
        <svg viewBox="0 0 60 60" className="w-10 h-10 stroke-[2.5] stroke-linecap-round stroke-linejoin-round fill-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="instaGradCS" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F9CE34" />
              <stop offset="30%" stopColor="#EE2A7B" />
              <stop offset="100%" stopColor="#6228D7" />
            </linearGradient>
          </defs>
          {/* Sketched outer frame camera */}
          <rect x="14" y="14" width="32" height="32" rx="9" stroke="url(#instaGradCS)" />
          {/* Sketched outer camera lens ring */}
          <circle cx="30" cy="30" r="9" stroke="url(#instaGradCS)" />
          {/* Sketched flash dot */}
          <circle cx="40" cy="20" r="1.5" fill="url(#instaGradCS)" stroke="url(#instaGradCS)" />
        </svg>
      )
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-6 lg:py-10 relative w-full flex flex-col items-center">
      
      {/* Decorative Hand-drawn Lightbulb (Creative active brainstorm indicator) */}
      <div className="absolute right-[8%] lg:right-[18%] top-0 hidden md:flex flex-col items-center select-none" style={{ filter: "url(#pencilFilter)" }}>
        <svg viewBox="0 0 60 60" className="w-14 h-14 stroke-[#B59410] fill-none stroke-[2.5] stroke-linecap-round stroke-linejoin-round transform rotate-12" xmlns="http://www.w3.org/2000/svg">
          {/* Bulb shape */}
          <path d="M30,10 C20,10 16,18 16,26 C16,33 21,38 24,42 L24,48 L36,48 L36,42 C39,38 44,33 44,26 C44,18 40,10 30,10 Z" />
          {/* Screw base */}
          <path d="M25,48 L35,48" />
          <path d="M26,51 L34,51" />
          <path d="M28,54 L32,54" />
          {/* Filament inside */}
          <path d="M27,38 L27,32 C27,30 29,28 30,28 C31,28 33,30 33,32 L33,38" />
          {/* Sparks/Rays representing ideas */}
          <path d="M30,2 L30,6" />
          <path d="M12,12 L16,16" />
          <path d="M48,12 L44,16" />
          <path d="M4,26 L8,26" />
          <path d="M56,26 L52,26" />
        </svg>
        <span className="text-[10px] font-notes text-[#B59410] whitespace-nowrap rotate-6 mt-1">
          Active Brainstorm!
        </span>
      </div>

      {/* Main Header Container */}
      <div className="text-center max-w-3xl space-y-3 mb-8 relative">
        <div className="relative inline-flex items-center px-4 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-white select-none z-10">
          {/* Hand-drawn sketchy curved rectangle tag backing */}
          <div 
            className="absolute inset-0 bg-[#B59410] pointer-events-none -z-10"
            style={{
              filter: 'url(#pencilFilter)',
              borderRadius: '6px 10px 8px 12px / 10px 8px 11px 7px',
            }}
          />
          <span className="text-white relative top-[0.5px]">Under Active Development</span>
        </div>

        <h1 className="text-3xl md:text-4xl lg:text-5xl text-[#2D2D2D] leading-tight tracking-tight relative flex flex-col md:flex-row items-center justify-center gap-2 md:gap-3">
          <span className="font-sketch font-bold text-[#B59410] px-2 py-0.5 select-none capitalize">
            {feature}
          </span>
          <span className="font-sketch inline-block font-bold">
            is Coming Soon!
          </span>
        </h1>

        <p className="text-xs md:text-sm text-[#4A4A4A] leading-relaxed font-sans font-medium max-w-2xl mx-auto pt-2">
          We are sketching, drafting, and detailing this visual playground to build the ultimate preparation workspace. 
          Join our active communities below to receive free exclusive notes and live notifications the second we launch!
        </p>
      </div>

      {/* Social Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full relative z-10 px-2 max-w-6xl mx-auto">
        {communities.map((comm) => (
          <div
            key={comm.name}
            className={`${comm.cardStyle} p-5 lg:p-6 flex flex-col justify-between items-stretch group`}
          >
            {/* Top Info */}
            <div className="space-y-4">
              {/* Logo Backing */}
              <div className="flex items-center justify-between">
                <div 
                  className={`${comm.iconBg} w-14 h-14 rounded-2xl flex items-center justify-center border-2 border-[#2D2D2D] shadow-sm transform -rotate-3 group-hover:rotate-3 transition-transform duration-300`}
                >
                  {comm.logo}
                </div>
                <span className="text-[10px] uppercase tracking-widest font-extrabold text-[#4A4A4A] opacity-75">
                  Official Join
                </span>
              </div>

              {/* Title Section */}
              <div className="space-y-0.5">
                <p className="text-2xl font-notes text-[#2D2D2D] group-hover:text-[#B59410] transition-colors tracking-tight leading-tight">
                  {comm.cursiveTitle}
                </p>
                <p className="text-[11px] uppercase font-extrabold tracking-wider text-[#4A4A4A]/60">
                  {comm.subtitle}
                </p>
              </div>

              {/* Description */}
              <p className="text-xs md:text-sm text-[#4A4A4A] font-medium leading-relaxed">
                {comm.description}
              </p>

              {/* Divider line styled with a sketch feel */}
              <div className="w-full h-0.5 bg-[#2D2D2D]/10 relative">
                <div className="absolute inset-0 bg-[#2D2D2D]/20 transform rotate-1" />
              </div>

              {/* Highlights Checklist */}
              <div className="space-y-1.5 pt-1">
                {comm.bulletPoints.map((point) => (
                  <div key={point} className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#B59410] border-2 border-[#2D2D2D] mt-1 shrink-0" />
                    <span className="text-[11px] md:text-xs text-[#4A4A4A] font-bold leading-tight">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Button Action */}
            <div className="pt-4">
              <Link href={comm.buttonHref} target="_blank" rel="noopener noreferrer" className="block w-full">
                <SketchButton
                  variant="primary"
                  className="w-full py-2.5 text-center justify-center font-bold text-xs"
                >
                  {comm.buttonText}
                </SketchButton>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Aesthetic paper lines running across background */}
      <div className="absolute top-1/4 left-0 w-full h-full opacity-[0.015] pointer-events-none -z-10">
        <svg width="100%" height="100%">
          <pattern id="comingSoonGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#2D2D2D" strokeWidth="0.5"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#comingSoonGrid)" />
        </svg>
      </div>
    </div>
  );
}
