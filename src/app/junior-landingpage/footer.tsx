"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { SendHorizontal } from "lucide-react";

export default function JuniorFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-transparent pt-12 pb-6 px-6 md:px-12 lg:px-20 relative overflow-hidden border-t border-[#B59410]/20 mt-12">
      {/* Grid Container */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4 pb-8">
        
        {/* Brand Column */}
        <div className="lg:col-span-1 space-y-3">
          <Link href="/junior" className="flex items-center group">
            <div className="relative w-48 h-12">
              <Image
                src="/assets/images/logos-jr/full-typo.svg"
                alt="ExamVault Junior Logo"
                fill
                className="object-contain object-left"
              />
            </div>
          </Link>
          
          <p className="text-xs text-[#4A4A4A] leading-relaxed max-w-[200px] font-medium italic opacity-75">
            Empowering curious kids with visual and engaging learning books.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-4 pt-2">
            <Link href="#" className="text-[#4A4A4A] hover:text-[#B59410] transition-colors duration-300">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </Link>
            <Link href="#" className="text-[#4A4A4A] hover:text-[#B59410] transition-colors duration-300">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"></path>
              </svg>
            </Link>
            <Link href="#" className="text-[#4A4A4A] hover:text-[#B59410] transition-colors duration-300">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.14 1 12 1 12s0 3.86.42 5.58a2.78 2.78 0 0 0 1.94 2c1.72.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.86 23 12 23 12s0-3.86-.42-5.58z"></path>
                <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"></polygon>
              </svg>
            </Link>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="space-y-3 lg:border-l lg:border-[#B59410]/10 lg:pl-6">
          <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#1A1A2E]">Quick Links</h4>
          <ul className="space-y-1.5">
            {["Home", "Courses", "Books", "Free Worksheets", "Pricing"].map((item) => (
              <li key={item}>
                <Link href="#" className="text-[13px] text-[#4A4A4A] hover:text-[#B59410] transition-colors duration-200 font-semibold">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Explore Levels Column */}
        <div className="space-y-3 lg:border-l lg:border-[#B59410]/10 lg:pl-6">
          <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#1A1A2E]">Explore Levels</h4>
          <ul className="space-y-1.5">
            {[
              { label: "Early Discovery (Jr KG - 1st)", href: "/products?category=junior&level=early" },
              { label: "Primary Explorer (2nd - 4th)", href: "/products?category=junior&level=primary" },
              { label: "Middle Scholars (5th - 7th)", href: "/products?category=junior&level=middle" },
              { label: "All Junior Books", href: "/products?category=junior" },
              { label: "Free Resources", href: "/coming-soon?feature=Free%20Resources" }
            ].map((item, idx) => (
              <li key={idx}>
                <Link href={item.href} className="text-[13px] text-[#4A4A4A] hover:text-[#B59410] transition-colors duration-200 font-semibold">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support Column */}
        <div className="space-y-3 lg:border-l lg:border-[#B59410]/10 lg:pl-6">
          <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#1A1A2E]">Support</h4>
          <ul className="space-y-1.5">
            {["Help Center", "Contact Us", "Refund Policy", "Terms & Conditions", "Privacy Policy"].map((item) => (
              <li key={item}>
                <Link href="#" className="text-[13px] text-[#4A4A4A] hover:text-[#B59410] transition-colors duration-200 font-semibold">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Stay Updated Column */}
        <div className="space-y-3 lg:border-l lg:border-[#B59410]/10 lg:pl-6">
          <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#1A1A2E]">Stay Updated</h4>
          <p className="text-[13px] text-[#4A4A4A] font-semibold opacity-85">
            Get free worksheets, new releases & offers.
          </p>
          <div className="relative group">
            <input 
              type="email" 
              placeholder="Enter parent email" 
              className="w-full bg-[#B59410]/5 border border-[#B59410]/20 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-[#B59410]/50 transition-all duration-300 pr-12 font-semibold text-[#2D2D2D]"
            />
            <button className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 bg-[#B59410] text-white rounded-lg hover:scale-105 transition-transform duration-200 cursor-pointer">
              <SendHorizontal className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="mt-8 pt-6 border-t border-[#B59410]/10 text-center">
        <p className="text-[10px] text-[#4A4A4A] font-bold opacity-60 uppercase tracking-widest">
          © {currentYear} ExamVault Junior. All rights reserved.
        </p>
      </div>

      {/* Subtle Background Texture */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none -z-10">
        <svg width="100%" height="100%">
          <pattern id="juniorFooterGrid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#B59410" strokeWidth="0.5"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#juniorFooterGrid)" />
        </svg>
      </div>
    </footer>
  );
}
