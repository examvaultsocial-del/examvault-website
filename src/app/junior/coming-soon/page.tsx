"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import JuniorNavbar from "@/app/JuniorNavbar";
import Footer from "@/app/landingpage/footer";
import SketchButton from "@/components/SketchButton";

export default function JuniorComingSoonPage() {
  const searchParams = useSearchParams();
  const rawFeature = searchParams.get("feature");
  const feature = rawFeature ? decodeURIComponent(rawFeature) : "Courses";

  const communities = [
    {
      name: "WhatsApp Community",
      cursiveTitle: "ExamVault Junior Community",
      subtitle: "Stay Connected. Stay Learning.",
      iconBg: "bg-[#25D366]/10 border-[#25D366]/30",
      cardStyle: "sketch-paper-card-gold",
      accentColor: "text-[#B59410]",
      accentBg: "bg-[#B59410]/10",
      buttonText: "Join WhatsApp Community",
      buttonHref: "https://chat.whatsapp.com/GjN9t2F1G8vK3iL1R4c6Xy",
      description: "Direct community for parents and kids. Get learning tips, activity ideas, and instant support for your child's learning journey.",
      bulletPoints: [
        "Parent-friendly learning tips",
        "Fun activity ideas & challenges",
        "Direct support from educators"
      ],
      icon: "/assets/images/junior-landingpage/social-icons/whatsapp-icon.svg"
    },
    {
      name: "Telegram Channel",
      cursiveTitle: "ExamVault Junior Updates",
      subtitle: "Daily Fun Learning Tips.",
      iconBg: "bg-[#0088cc]/10 border-[#0088cc]/30",
      cardStyle: "sketch-paper-card-blue",
      accentColor: "text-[#22577A]",
      accentBg: "bg-[#22577A]/10",
      buttonText: "Join Telegram Channel",
      buttonHref: "https://t.me/ExamVaultJunior",
      description: "Daily learning tips, fun facts, and educational content designed specifically for young learners and curious minds.",
      bulletPoints: [
        "Daily fun learning facts",
        "Creative activity ideas",
        "New book releases & updates"
      ],
      icon: "/assets/images/junior-landingpage/social-icons/telegram-icon.svg"
    },
    {
      name: "Instagram Official",
      cursiveTitle: "ExamVault Junior",
      subtitle: "Visual Learning Fun.",
      iconBg: "bg-[#E1306C]/10 border-[#E1306C]/30",
      cardStyle: "sketch-paper-card-rose",
      accentColor: "text-[#E1306C]",
      accentBg: "bg-[#E1306C]/10",
      buttonText: "Follow Instagram Page",
      buttonHref: "https://instagram.com/ExamVaultJunior",
      description: "Colorful infographics, fun learning videos, and interactive content that makes education enjoyable for kids.",
      bulletPoints: [
        "Colorful learning infographics",
        "Fun educational videos",
        "Interactive learning challenges"
      ],
      icon: "/assets/images/junior-landingpage/social-icons/instagram-icon.svg"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <JuniorNavbar />

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-6 py-6 lg:py-10 relative w-full flex flex-col items-center">

          {/* Decorative Element */}
          <div className="absolute right-[8%] lg:right-[18%] top-0 hidden md:flex flex-col items-center select-none" style={{
            filter: "url(#pencilFilter)",
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
            willChange: 'filter, transform'
          }}>
            <svg viewBox="0 0 60 60" className="w-14 h-14 stroke-[#B59410] fill-none stroke-[2.5] stroke-linecap-round stroke-linejoin-round transform rotate-12" xmlns="http://www.w3.org/2000/svg">
              <path d="M30,10 C20,10 16,18 16,26 C16,33 21,38 24,42 L24,48 L36,48 L36,42 C39,38 44,33 44,26 C44,18 40,10 30,10 Z" />
              <path d="M25,48 L35,48" />
              <path d="M26,51 L34,51" />
              <path d="M28,54 L32,54" />
              <path d="M27,38 L27,32 C27,30 29,28 30,28 C31,28 33,30 33,32 L33,38" />
              <path d="M30,2 L30,6" />
              <path d="M12,12 L16,16" />
              <path d="M48,12 L44,16" />
              <path d="M4,26 L8,26" />
              <path d="M56,26 L52,26" />
            </svg>
            <span className="text-[10px] font-notes text-[#B59410] whitespace-nowrap rotate-6 mt-1">
              Coming Soon!
            </span>
          </div>

          {/* Main Header Container */}
          <div className="text-center max-w-3xl space-y-3 mb-8 relative">
            <div className="relative inline-flex items-center px-4 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-white select-none z-10">
              <div
                className="absolute inset-0 bg-[#B59410] pointer-events-none -z-10"
                style={{
                  filter: 'url(#pencilFilter)',
                  borderRadius: '6px 10px 8px 12px / 10px 8px 11px 7px',
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden',
                  willChange: 'filter, transform'
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
              We're creating exciting new learning experiences for curious minds! Join our communities below to get notified when {feature.toLowerCase()} launches.
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
                      <Image
                        src={comm.icon}
                        alt={comm.name}
                        width={40}
                        height={40}
                        className="w-10 h-10 object-contain"
                      />
                    </div>
                    <span className="text-[10px] uppercase tracking-widest font-extrabold text-[#4A4A4A] opacity-75">
                      Join Now
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

                  {/* Divider line */}
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
              <pattern id="juniorComingSoonGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#2D2D2D" strokeWidth="0.5"/>
              </pattern>
              <rect width="100%" height="100%" fill="url(#juniorComingSoonGrid)" />
            </svg>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
