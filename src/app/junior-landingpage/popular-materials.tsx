"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, ArrowRight } from "lucide-react";
import { useCart, CartItem } from "@/components/providers/CartProvider";

export default function JuniorPopularMaterials() {
  const { addToCart, cart } = useCart();

  const books = [
    {
      id: "jr-math-1-3",
      title: "Maths Made Fun",
      grade: "1st - 3rd Std",
      price: 149,
      originalPrice: 299,
      format: "PDF Book",
      exam: "Junior Math",
      rating: 4.8,
      reviews: "1.2K",
      image: "/assets/images/placeholder-pdfimage.webp"
    },
    {
      id: "jr-sci-4-5",
      title: "Visual Science Explorer",
      grade: "4th - 5th Std",
      price: 159,
      originalPrice: 320,
      format: "Interactive PDF",
      exam: "Junior Science",
      rating: 4.9,
      reviews: "950",
      image: "/assets/images/placeholder-pdfimage.webp"
    },
    {
      id: "jr-eng-kg-1",
      title: "English Adventures",
      grade: "Jr KG - 1st Std",
      price: 129,
      originalPrice: 250,
      format: "Activity PDF",
      exam: "Junior English",
      rating: 4.7,
      reviews: "1.8K",
      image: "/assets/images/placeholder-pdfimage.webp"
    },
    {
      id: "jr-math-oly-5-7",
      title: "Maths Olympiad Prep",
      grade: "5th - 7th Std",
      price: 199,
      originalPrice: 399,
      format: "Visual Guide",
      exam: "Junior Math",
      rating: 4.9,
      reviews: "720",
      image: "/assets/images/placeholder-pdfimage.webp"
    },
    {
      id: "jr-gk-2-4",
      title: "GK Explorer",
      grade: "2nd - 4th Std",
      price: 139,
      originalPrice: 280,
      format: "Infographics Book",
      exam: "Junior GK",
      rating: 4.8,
      reviews: "1.1K",
      image: "/assets/images/placeholder-pdfimage.webp"
    },
    {
      id: "jr-sci-ch-6-7",
      title: "Science Challenge",
      grade: "6th - 7th Std",
      price: 179,
      originalPrice: 350,
      format: "Study Book",
      exam: "Junior Science",
      rating: 4.8,
      reviews: "640",
      image: "/assets/images/placeholder-pdfimage.webp"
    }
  ];

  const handleBuy = (book: typeof books[0]) => {
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
    <section className="pt-4 pb-10 px-6 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#2D2D2D] leading-tight">
            Popular Books Loved by Kids
          </h2>
          <p className="text-xs md:text-sm text-[#4A4A4A] font-bold mt-2">
            Highly visual, simplified, and aligned with Indian educational standards.
          </p>
        </div>
        <Link
          href="/products?category=junior"
          className="flex items-center gap-2 text-sm font-bold text-[#B59410] hover:text-[#9a7a0a] transition-colors group"
        >
          View All Books <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {books.map((book) => {
          const isInCart = cart.some((item) => item.id === book.id);

          return (
            <Link
              key={book.id}
              href={`/products/${book.id}`}
              className="flex flex-col space-y-2 group cursor-pointer"
            >
              {/* Book Thumbnail Container - Real 3D Book Feel */}
              <div className="relative group [perspective:1000px] w-full aspect-[3/4.2]">
                {/* Main Book Structure */}
                <div
                  className="relative w-full h-full bg-[#FDFBF7] shadow-md transition-all duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)] [transform-style:preserve-3d] origin-left group-hover:shadow-[15px_20px_25px_rgba(45,45,45,0.15)] group-hover:[transform:rotateY(-16deg)_scale(1.02)_translateY(-6px)]"
                  style={{
                    border: "2px solid #B59410",
                    borderRadius: "4px 12px 12px 4px",
                    willChange: "transform"
                  }}
                >
                  {/* Front Cover Image */}
                  <div className="absolute inset-0 w-full h-full overflow-hidden" style={{ borderRadius: "2px 10px 10px 2px" }}>
                    <Image
                      src={book.image}
                      alt={book.title}
                      fill
                      className="object-contain p-1 opacity-95 group-hover:opacity-100 transition-opacity"
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
                    className="absolute right-0 top-[2px] bottom-[2px] w-[8px] bg-[#F4EFE0] shadow-inner origin-left transition-all duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)]"
                    style={{
                      transform: "rotateY(90deg) translateZ(1px)",
                      backgroundImage: "repeating-linear-gradient(90deg, #E5D5A5 0px, #E5D5A5 1px, transparent 1px, transparent 3px)",
                      borderLeft: "1px solid rgba(181, 148, 16, 0.2)",
                      borderRadius: "0 2px 2px 0"
                    }}
                  />
                </div>
              </div>

              {/* Book Details */}
              <div className="flex flex-col space-y-0.5 pt-1">
                <h3 className="text-sm font-bold text-[#2D2D2D] leading-tight group-hover:text-[#B59410] transition-colors line-clamp-2">
                  {book.title}
                </h3>
                <p className="text-xs text-[#5A5A75] font-semibold opacity-80">
                  {book.grade}
                </p>
                <div className="flex items-center gap-1 pt-1">
                  <span className="text-lg font-black text-[#B59410]">₹{book.price}</span>
                  <span className="text-xs text-[#4A4A4A] font-semibold line-through opacity-50">₹{book.originalPrice}</span>
                </div>
                <div className="flex items-center gap-1.5 pt-1">
                  <Star className="w-4 h-4 text-[#B59410] fill-[#B59410]" />
                  <span className="text-sm font-bold text-[#2D2D2D]">{book.rating}</span>
                  <span className="text-[11px] text-[#4A4A4A]/60 font-semibold">({book.reviews})</span>
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleBuy(book);
                  }}
                  disabled={isInCart}
                  className={`mt-2 w-full py-2 border-2 border-[#B59410] rounded-lg flex items-center justify-center transition-all duration-200 active:scale-90 font-bold text-xs ${
                    isInCart
                      ? "bg-[#25D366]/10 text-[#25D366] border-[#25D366] cursor-not-allowed"
                      : "bg-[#B59410] text-white hover:bg-[#cba81a] shadow-[2px_2px_0px_#2D2D2D] active:translate-y-0.5 active:shadow-[1px_1px_0px_#2D2D2D] cursor-pointer hover:cursor-pointer"
                  }`}
                  title={isInCart ? "Added to Cart" : "Add to Cart"}
                >
                  {isInCart ? "Added" : "Add to Cart"}
                </button>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
