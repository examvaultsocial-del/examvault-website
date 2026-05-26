"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { SharedNavbar } from "@/components/SharedNavbar";
import { useCart } from "@/components/providers/CartProvider";

export default function JuniorNavbar() {
  const { cart, setCartOpen } = useCart();
  const pathname = usePathname();

  const juniorLinks = [
    { name: "Home", href: "/junior", active: pathname === "/junior" },
    { name: "Courses", href: "#", hasDropdown: true, active: false },
    { name: "Books", href: "/junior/products?category=junior", active: pathname === "/junior/products" },
    { name: "Free Resources", href: "/junior/coming-soon?feature=Free%20Resources", active: pathname === "/junior/coming-soon" },
    { name: "About Us", href: "/junior/coming-soon?feature=About%20Us", active: pathname === "/junior/coming-soon" },
    { name: "Pricing", href: "/junior/coming-soon?feature=Pricing%20Plans", active: pathname === "/junior/coming-soon" },
  ];

  const juniorDropdownItems = [
    { label: "All Junior Books", href: "/junior/products?category=junior" },
    { label: "Early Discovery (Jr KG - 1st)", href: "/junior/products?category=junior&level=early" },
    { label: "Primary Explorer (2nd - 4th)", href: "/junior/products?category=junior&level=primary" },
    { label: "Middle Scholars (5th - 7th)", href: "/junior/products?category=junior&level=middle" },
  ];

  const logo = (
    <Link href="/junior" className="flex items-center gap-3 group cursor-pointer">
      <div className="relative w-24 h-24 shrink-0">
        <Image
          src="/assets/images/logos-jr/logo.svg"
          alt="ExamVault Junior Logo"
          fill
          className="object-contain"
          priority
        />
      </div>
      <div className="flex flex-col justify-center">
        <div className="flex items-baseline gap-1.5">
          <span className="text-3xl font-sketch leading-none tracking-tight text-[#2D2D2D]">
            ExamVault
          </span>
          <span className="text-xl font-sketch text-[#B59410] leading-none">
            Junior
          </span>
        </div>
      </div>
    </Link>
  );

  const desktopActions = (
    <Link href="/" className="z-10 shrink-0">
      <button
        className="group px-6 py-2.5 relative rounded-xl font-sketch text-sm md:text-base text-white flex items-center gap-2 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-[#B59410]/20 overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-[#B59410] pointer-events-none"
          style={{
            filter: 'url(#pencilFilter)',
            borderRadius: 'inherit',
            zIndex: 0,
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
            willChange: 'filter, transform'
          }}
        />
        <span className="relative z-10 pointer-events-none">
          Exam Related
        </span>
      </button>
    </Link>
  );

  const mobileFooter = (
    <div className="border-t-2 border-[#2D2D2D]/10 pt-4 flex flex-col gap-4">
      {/* Switch Button */}
      <Link href="/" className="w-full">
        <button
          className="w-full group px-4 py-2.5 relative rounded-xl font-sketch text-sm text-white flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-[#B59410]/20 overflow-hidden"
        >
          <div
            className="absolute inset-0 bg-[#B59410] pointer-events-none"
            style={{
              filter: 'url(#pencilFilter)',
              borderRadius: 'inherit',
              zIndex: 0,
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
              willChange: 'filter, transform'
            }}
          />
          <span className="relative z-10 pointer-events-none">
            Exam Related
          </span>
        </button>
      </Link>

      <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#4A4A4A]/60">Join our Community</span>
      <div className="flex items-center gap-3">
        <a
          href="https://wa.me/yournumber"
          target="_blank"
          rel="noreferrer"
          className="w-10 h-10 flex items-center justify-center rounded-xl border-2 border-[#2D2D2D] bg-[#25D366]/10 hover:bg-[#25D366]/20 transition-all hover:scale-105 hover:-rotate-3 shadow-[2px_2px_0px_#2D2D2D] hover:shadow-[1px_1px_0px_#2D2D2D] cursor-pointer"
        >
          <Image
            src="/assets/images/junior-landingpage/social-icons/whatsapp-icon.svg"
            alt="WhatsApp"
            width={20}
            height={20}
            className="object-contain"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </a>
        <a
          href="https://t.me/yourchannel"
          target="_blank"
          rel="noreferrer"
          className="w-10 h-10 flex items-center justify-center rounded-xl border-2 border-[#2D2D2D] bg-[#229ED9]/10 hover:bg-[#229ED9]/20 transition-all hover:scale-105 hover:rotate-3 shadow-[2px_2px_0px_#2D2D2D] hover:shadow-[1px_1px_0px_#2D2D2D] cursor-pointer"
        >
          <Image
            src="/assets/images/junior-landingpage/social-icons/telegram-icon.svg"
            alt="Telegram"
            width={20}
            height={20}
            className="object-contain"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </a>
        <a
          href="https://instagram.com/yourprofile"
          target="_blank"
          rel="noreferrer"
          className="w-10 h-10 flex items-center justify-center rounded-xl border-2 border-[#2D2D2D] bg-[#E1306C]/10 hover:bg-[#E1306C]/20 transition-all hover:scale-105 hover:rotate-3 shadow-[2px_2px_0px_#2D2D2D] hover:shadow-[1px_1px_0px_#2D2D2D] cursor-pointer"
        >
          <Image
            src="/assets/images/junior-landingpage/social-icons/instagram-icon.svg"
            alt="Instagram"
            width={20}
            height={20}
            className="object-contain"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </a>
      </div>
    </div>
  );

  return (
    <SharedNavbar
      logo={logo}
      navLinks={juniorLinks}
      dropdownItems={juniorDropdownItems}
      cartCount={cart.length}
      onCartClick={() => setCartOpen(true)}
      desktopActions={desktopActions}
      mobileFooter={mobileFooter}
      menuTitle="Junior Menu"
    />
  );
}
