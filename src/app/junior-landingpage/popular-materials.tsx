"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, ArrowRight } from "lucide-react";
import { useCart, CartItem } from "@/components/providers/CartProvider";

export default function JuniorPopularMaterials() {
  const { addToCart, cart } = useCart();

  const book = {
    id: "JP-PDF-PARENT-AI-V1",
    title: "Parents' AI Learning Guide",
    grade: "Jr KG - 1st Std",
    price: 49,
    originalPrice: 79,
    format: "PDF Guide",
    exam: "Junior Parent AI",
    rating: 5.0,
    reviews: "0",
    image: "/assets/images/products/junior/JP-PDF-PARENT-AI-V1/cover.png"
  };

  const isInCart = cart.some((item) => item.id === book.id);

  const handleBuy = () => {
    const item: CartItem = {
      id: book.id,
      title: `${book.title} (${book.grade})`,
      price: book.price,
      originalPrice: book.originalPrice,
      format: book.format,
      exam: book.exam
    };
    addToCart(item);
  };

  return (
    <section className="pt-8 pb-16 px-6 max-w-5xl mx-auto w-full">
      {/* Centered Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-[#2D2D2D] leading-tight">
          Featured Material
        </h2>
        <p className="text-xs md:text-sm text-[#555] font-bold mt-2 max-w-md mx-auto">
          Highly visual, simplified, and aligned with educational standards to help kids learn faster.
        </p>
      </div>

      {/* Featured Centered Showcase Box */}
      <div className="bg-[#FFFDF9] border-2 border-[#E2D4B7] rounded-[36px] p-8 md:p-12 shadow-sm max-w-3xl mx-auto relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
          
          {/* LEFT: 3D Book Cover Showcase (Enlarged) */}
          <Link
            href={`/junior/products/${book.id}`}
            className="group [perspective:1000px] w-52 sm:w-60 aspect-[3/4.2] flex-shrink-0 cursor-pointer"
          >
            {/* Main Book Structure */}
            <div
              className="relative w-full h-full bg-[#FDFBF7] shadow-lg transition-all duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)] [transform-style:preserve-3d] origin-left group-hover:shadow-[20px_25px_30px_rgba(45,45,45,0.18)] group-hover:[transform:rotateY(-18deg)_scale(1.03)_translateY(-4px)]"
              style={{
                border: "2.5px solid #B59410",
                borderRadius: "6px 16px 16px 6px",
                willChange: "transform"
              }}
            >
              {/* Front Cover Image */}
              <div className="absolute inset-0 w-full h-full overflow-hidden" style={{ borderRadius: "4px 14px 14px 4px" }}>
                <Image
                  src={book.image}
                  alt={book.title}
                  fill
                  className="object-contain p-1.5 opacity-95 group-hover:opacity-100 transition-opacity"
                  priority
                />

                {/* Book Spine Shadow Effect */}
                <div className="absolute inset-y-0 left-0 w-[12%] bg-gradient-to-r from-black/25 via-black/5 to-transparent pointer-events-none z-10" />

                {/* Spine Highlight / Crease */}
                <div className="absolute inset-y-0 left-[10%] w-[1px] bg-white/20 pointer-events-none z-10" />
                <div className="absolute inset-y-0 left-[11%] w-[1px] bg-black/10 pointer-events-none z-10" />

                {/* Glossy/Paper Texture Overlay */}
                <div className="absolute inset-0 bg-white/5 mix-blend-overlay pointer-events-none" />
              </div>

              {/* 3D Pages Thickness (Right Edge) */}
              <div
                className="absolute right-0 top-[3px] bottom-[3px] w-[10px] bg-[#F4EFE0] shadow-inner origin-left transition-all duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)]"
                style={{
                  transform: "rotateY(90deg) translateZ(1px)",
                  backgroundImage: "repeating-linear-gradient(90deg, #E5D5A5 0px, #E5D5A5 1px, transparent 1px, transparent 3px)",
                  borderLeft: "1px solid rgba(181, 148, 16, 0.2)",
                  borderRadius: "0 3px 3px 0"
                }}
              />
            </div>
          </Link>

          {/* RIGHT: Book Details & Quick Purchase info */}
          <div className="flex flex-col space-y-4 text-center md:text-left flex-grow">
            <div>
              {/* Badges */}
              <div className="flex gap-2 justify-center md:justify-start mb-2">
                <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 bg-[#B59410]/10 border border-[#B59410]/30 rounded-md text-[#B59410]">
                  pdf
                </span>
                <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 bg-[#B59410]/10 border border-[#B59410]/30 rounded-md text-[#B59410]">
                  AI-learning
                </span>
              </div>

              <Link href={`/junior/products/${book.id}`}>
                <h3 className="text-xl sm:text-2xl font-bold text-[#2D2D2D] leading-tight hover:text-[#B59410] transition-colors cursor-pointer">
                  {book.title}
                </h3>
              </Link>
              <p className="text-xs sm:text-sm text-[#5A5A75] font-semibold mt-1">
                {book.grade} • {book.format}
              </p>
            </div>

            {/* Price Section */}
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="text-2xl font-black text-[#B59410]">₹{book.price}</span>
              <span className="text-sm text-[#4A4A4A] font-semibold line-through opacity-50">₹{book.originalPrice}</span>
              <span className="bg-[#B59410] text-white px-2 py-0.5 rounded-full text-[9px] font-bold">
                Save 38%
              </span>
            </div>

            {/* Quick Pitch list */}
            <ul className="space-y-1.5 text-xs text-[#555] font-semibold text-left max-w-sm mx-auto md:mx-0">
              <li className="flex gap-2">
                <span className="text-[#B59410]">✓</span>
                <span>49 copy-paste ready prompts for kids learning</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#B59410]">✓</span>
                <span>Dino-Tutor setup & digital safety guidelines</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#B59410]">✓</span>
                <span>Includes 15 custom fill-in-the-blank templates</span>
              </li>
            </ul>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2 w-full max-w-sm mx-auto md:mx-0">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleBuy();
                }}
                disabled={isInCart}
                className={`flex-grow py-3 border-2 border-[#B59410] rounded-xl flex items-center justify-center transition-all duration-200 active:scale-95 font-bold text-sm ${
                  isInCart
                    ? "bg-[#25D366]/10 text-[#25D366] border-[#25D366] cursor-not-allowed"
                    : "bg-[#B59410] text-white hover:bg-[#cba81a] shadow-[3px_3px_0px_#2D2D2D] active:translate-y-0.5 active:shadow-[1px_1px_0px_#2D2D2D] cursor-pointer hover:cursor-pointer"
                }`}
              >
                {isInCart ? "Added to Cart" : "Add to Cart"}
              </button>

              <Link
                href={`/junior/products/${book.id}`}
                className="py-3 px-6 border-2 border-[#2D2D2D]/30 text-[#2D2D2D] font-bold text-sm rounded-xl text-center hover:bg-[#2D2D2D]/5 transition-all active:scale-95"
              >
                Learn More
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
