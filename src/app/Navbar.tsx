"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu, X, ChevronUp } from "lucide-react";
import { NavbarUnderline } from "@/components/NavbarUnderline";
import { useCart } from "@/components/providers/CartProvider";

export default function Navbar() {
  const { cart, setCartOpen } = useCart();
  const pathname = usePathname();
  const [currentFeature, setCurrentFeature] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExamsOpen, setMobileExamsOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setCurrentFeature(params.get("feature"));
    }
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock background scroll when mobile menu is open
  useEffect(() => {
    if (typeof document !== "undefined") {
      if (mobileMenuOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    }
    return () => {
      if (typeof document !== "undefined") {
        document.body.style.overflow = "";
      }
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: "Home", href: "/", active: pathname === "/" },
    { name: "Exams", href: "#", hasDropdown: true, active: pathname === "/products" },
    { name: "Courses", href: "/coming-soon?feature=Courses", active: pathname === "/coming-soon" && currentFeature === "Courses" },
    { name: "Free Resources", href: "/coming-soon?feature=Free%20Resources", active: pathname === "/coming-soon" && currentFeature === "Free Resources" },
    { name: "About Us", href: "/coming-soon?feature=About%20Us", active: pathname === "/coming-soon" && currentFeature === "About Us" },
    { name: "Pricing", href: "/coming-soon?feature=Pricing%20Plans", active: pathname === "/coming-soon" && currentFeature === "Pricing Plans" },
  ];

  return (
    <nav className="w-full py-2 px-6 md:px-12 lg:px-20 flex items-center justify-between relative z-50">
      {/* Logo Section */}
      <Link href="/" className="flex items-center gap-2 group cursor-pointer">
        <div className="relative w-20 h-20 flex items-center justify-center">
          <Image
            src="/assets/images/logo-svg.svg"
            alt="ExamVault Logo"
            width={70}
            height={70}
            className="object-contain"
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

      {/* Navigation Links */}
      <div className="hidden lg:flex items-center gap-8">
        {navLinks.map((link) => {
          if (link.hasDropdown) {
            return (
              <div
                key={link.name}
                className="relative group flex flex-col items-center cursor-pointer"
              >
                <div className="flex items-center gap-1.5 py-2">
                  <span className="text-base font-sans text-[#4A4A4A] group-hover:text-[#2D2D2D] transition-colors duration-300 font-semibold">
                    {link.name}
                  </span>
                  <ChevronDown className="w-4 h-4 text-[#B59410] opacity-70 group-hover:rotate-180 transition-transform duration-300" strokeWidth={2} />
                </div>

                {/* Hand-drawn Underline for Hover */}
                <div className="absolute top-[85%] left-0 w-0 group-hover:w-full transition-all duration-300 overflow-hidden">
                  <NavbarUnderline className="w-full text-[#2D2D2D] opacity-40 h-1.5 pointer-events-none" />
                </div>

                {/* Beautiful Dropdown Card */}
                <div className="absolute top-[100%] left-1/2 -translate-x-1/2 mt-1 w-56 bg-white border-2 border-[#E5E5E5] rounded-2xl shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 z-50 p-2 flex flex-col gap-1">
                  {[
                    { label: "All Exams", href: "/products" },
                    { label: "UPSC Civil Services", href: "/products?exam=upsc" },
                    { label: "SSC Exams", href: "/products?exam=ssc" },
                    { label: "Banking Exams", href: "/products?exam=banking" },
                    { label: "State PSC Exams", href: "/products?exam=state" },
                    { label: "Railways", href: "/products?exam=railways" },
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-2.5 text-sm text-[#4A4A4A] hover:bg-[#FDFBF7] hover:text-[#B59410] rounded-xl transition-colors font-bold"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            );
          }

          return (
            <Link
              key={link.name}
              href={link.href}
              className="relative group flex flex-col items-center"
            >
              {/* Caret for Home */}
              {link.name === "Home" && (
                <span className="absolute -top-4 text-sm font-bold text-[#B59410] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  ^
                </span>
              )}
              
              <div className="flex items-center gap-1.5 py-2">
                <span className={`text-base font-sans transition-colors duration-300 ${link.active ? 'text-[#2D2D2D] font-bold' : 'text-[#4A4A4A] group-hover:text-[#2D2D2D]'}`}>
                  {link.name}
                </span>
              </div>

              {/* Hand-drawn Underline for Active/Hover */}
              {link.active ? (
                <NavbarUnderline className="absolute top-[85%] left-0 w-full text-[#B59410] opacity-90 h-1.5 pointer-events-none" />
              ) : (
                <div className="absolute top-[85%] left-0 w-0 group-hover:w-full transition-all duration-300 overflow-hidden">
                  <NavbarUnderline className="w-full text-[#2D2D2D] opacity-40 h-1.5 pointer-events-none" />
                </div>
              )}
            </Link>
          );
        })}

        {/* Divider */}
        <span className="w-px h-6 bg-[#2D2D2D]/10" />

        {/* Desktop Shopping Cart Icon */}
        <button
          onClick={() => setCartOpen(true)}
          className="relative p-2.5 rounded-full border-2 border-[#2D2D2D]/15 hover:border-[#2D2D2D] bg-[#FFFDF9] transition-all hover:scale-105 hover:rotate-3 duration-200 cursor-pointer shadow-sm group"
          title="Open Shopping Cart"
        >
          <div className="w-7 h-7 relative flex items-center justify-center">
            <Image
              src="/assets/process-icons/cart-store.svg"
              alt="Cart Store"
              fill
              className="object-contain"
            />
          </div>
          {cart.length > 0 && (
            <span 
              className="absolute -top-1.5 -right-1.5 bg-[#FCD34D] text-[#2D2D2D] border-2 border-[#2D2D2D] font-extrabold text-[10px] w-5.5 h-5.5 flex items-center justify-center rounded-full shadow-sm animate-bounce"
              style={{ animationDuration: "2.5s" }}
            >
              {cart.length}
            </span>
          )}
        </button>
      </div>

      {/* Mobile Actions (Cart & Hamburger) */}
      <div className="lg:hidden flex items-center gap-3">
        {/* Mobile Cart Button */}
        <button
          onClick={() => setCartOpen(true)}
          className="relative p-2 rounded-full border-2 border-[#2D2D2D]/15 hover:border-[#2D2D2D] bg-[#FFFDF9] transition-all hover:scale-105 duration-200 cursor-pointer shadow-sm"
          title="Open Shopping Cart"
        >
          <div className="w-6 h-6 relative flex items-center justify-center">
            <Image
              src="/assets/process-icons/cart-store.svg"
              alt="Cart Store"
              fill
              className="object-contain"
            />
          </div>
          {cart.length > 0 && (
            <span 
              className="absolute -top-1.5 -right-1.5 bg-[#FCD34D] text-[#2D2D2D] border-2 border-[#2D2D2D] font-extrabold text-[9px] w-5 h-5 flex items-center justify-center rounded-full shadow-sm animate-bounce"
              style={{ animationDuration: "2.5s" }}
            >
              {cart.length}
            </span>
          )}
        </button>

        {/* Hamburger Icon */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="text-[#2D2D2D] p-2 hover:bg-[#2D2D2D]/5 rounded-full transition-colors cursor-pointer"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      <div 
        className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop overlay */}
        <div 
          onClick={() => setMobileMenuOpen(false)}
          className="absolute inset-0 bg-[#2D2D2D]/40 backdrop-blur-sm transition-opacity duration-300"
        />

        {/* Sliding Panel */}
        <div 
          className={`absolute right-0 top-0 bottom-0 w-[290px] sm:w-[340px] bg-[#FFFDF9] border-l-4 border-[#2D2D2D] p-6 shadow-[0_0_50px_rgba(0,0,0,0.15)] flex flex-col justify-between transition-transform duration-300 ease-out z-10 ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col gap-6">
            {/* Header */}
            <div className="flex items-center justify-between border-b-2 border-[#2D2D2D]/10 pb-4">
              <span className="font-sketch text-3xl text-[#2D2D2D]">Menu</span>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 border-2 border-[#2D2D2D] rounded-[10px] hover:bg-[#FFDE4D] hover:-rotate-3 active:scale-95 transition-all duration-150 cursor-pointer bg-white shadow-[2px_2px_0px_#2D2D2D]"
                aria-label="Close menu"
              >
                <X className="w-5 h-5 text-[#2D2D2D]" />
              </button>
            </div>

            {/* Nav Links List */}
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => {
                if (link.hasDropdown) {
                  return (
                    <div key={link.name} className="flex flex-col">
                      <button
                        onClick={() => setMobileExamsOpen(!mobileExamsOpen)}
                        className="flex items-center justify-between py-2 text-lg font-bold text-[#4A4A4A] hover:text-[#B59410] transition-colors text-left"
                      >
                        <span>{link.name}</span>
                        {mobileExamsOpen ? (
                          <ChevronUp className="w-5 h-5 text-[#B59410]" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-[#B59410]" />
                        )}
                      </button>
                      
                      {/* Mobile Dropdown Sub-menu */}
                      <div 
                        className={`pl-4 flex flex-col gap-1.5 overflow-hidden transition-all duration-300 ${
                          mobileExamsOpen ? "max-h-[300px] mt-2 mb-1 opacity-100" : "max-h-0 opacity-0"
                        }`}
                      >
                        {[
                          { label: "All Exams", href: "/products" },
                          { label: "UPSC Civil Services", href: "/products?exam=upsc" },
                          { label: "SSC Exams", href: "/products?exam=ssc" },
                          { label: "Banking Exams", href: "/products?exam=banking" },
                          { label: "State PSC Exams", href: "/products?exam=state" },
                          { label: "Railways", href: "/products?exam=railways" },
                        ].map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block px-3 py-2 text-sm text-[#4A4A4A] hover:text-[#B59410] font-semibold border-l-2 border-dashed border-[#B59410]/45 hover:border-[#B59410] transition-colors pl-3"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block py-2 text-lg font-bold transition-colors ${
                      link.active 
                        ? "text-[#B59410] border-b-2 border-dashed border-[#B59410] w-fit" 
                        : "text-[#4A4A4A] hover:text-[#B59410]"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Social Links Footer */}
          <div className="border-t-2 border-[#2D2D2D]/10 pt-4 flex flex-col gap-3">
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
                className="w-10 h-10 flex items-center justify-center rounded-xl border-2 border-[#2D2D2D] bg-[#E1306C]/10 hover:bg-[#E1306C]/20 transition-all hover:scale-105 hover:-rotate-3 shadow-[2px_2px_0px_#2D2D2D] hover:shadow-[1px_1px_0px_#2D2D2D] cursor-pointer"
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
        </div>
      </div>
    </nav>
  );
}
