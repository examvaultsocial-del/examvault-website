"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { SharedNavbar } from "@/components/SharedNavbar";
import { useCart } from "@/components/providers/CartProvider";

export default function Navbar() {
  const { cart, setCartOpen } = useCart();
  const pathname = usePathname();
  const [currentFeature, setCurrentFeature] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setCurrentFeature(params.get("feature"));
    }
  }, [pathname]);

  const mainLinks = [
    { name: "Home", href: "/", active: pathname === "/" },
    { name: "Exams", href: "#", hasDropdown: true, active: pathname === "/products" },
    { name: "Courses", href: "/coming-soon?feature=Courses", active: pathname === "/coming-soon" && currentFeature === "Courses" },
    { name: "Free Resources", href: "/coming-soon?feature=Free%20Resources", active: pathname === "/coming-soon" && currentFeature === "Free Resources" },
    { name: "About Us", href: "/coming-soon?feature=About%20Us", active: pathname === "/coming-soon" && currentFeature === "About Us" },
    { name: "Pricing", href: "/coming-soon?feature=Pricing%20Plans", active: pathname === "/coming-soon" && currentFeature === "Pricing Plans" },
  ];

  const mainDropdownItems = [
    { label: "All Exams", href: "/products" },
    { label: "UPSC Civil Services", href: "/products?exam=upsc" },
    { label: "SSC Exams", href: "/products?exam=ssc" },
    { label: "Banking Exams", href: "/products?exam=banking" },
    { label: "State PSC Exams", href: "/products?exam=state" },
    { label: "Railways", href: "/products?exam=railways" },
  ];

  const logo = (
    <Link href="/" className="flex items-center gap-2 group cursor-pointer">
      <div className="relative w-20 h-20 flex items-center justify-center">
        <Image
          src="/assets/images/logo-svg.svg"
          alt="ExamVault Logo"
          width={80}
          height={80}
          className="object-contain w-auto h-auto"
        />
      </div>
      <div className="flex flex-col justify-center">
        <span className="text-3xl font-sketch leading-none tracking-tight text-[#2D2D2D]">
          ExamVault
        </span>
        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#444] mt-1.5 opacity-90">
          Knowledge Today. Impact Tomorrow.
        </span>
      </div>
    </Link>
  );

  const desktopActions = (
    <Link href="/junior" className="z-10 shrink-0">
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
          Explore Junior
        </span>
      </button>
    </Link>
  );

  const mobileFooter = (
    <div className="border-t-2 border-[#2D2D2D]/10 pt-4 flex flex-col gap-4">
      {/* Switch Button */}
      <Link href="/junior" className="w-full">
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
            Explore Junior
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
            src="/assets/icons/whatsapp.svg"
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
            src="/assets/icons/telegram.svg"
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
            src="/assets/icons/instagram.svg"
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
      navLinks={mainLinks}
      dropdownItems={mainDropdownItems}
      cartCount={cart.length}
      onCartClick={() => setCartOpen(true)}
      desktopActions={desktopActions}
      mobileFooter={mobileFooter}
      menuTitle="Menu"
    />
  );
}
