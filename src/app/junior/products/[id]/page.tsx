"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Star, ChevronRight, ArrowLeft } from "lucide-react";
import JuniorNavbar from "@/app/JuniorNavbar";
import Footer from "@/app/landingpage/footer";
import { useCart } from "@/components/providers/CartProvider";

import { allProducts } from "@/lib/products";
import { slugify } from "@/lib/utils";

export default function JuniorProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart, setCartOpen } = useCart();
  const [activeTab, setActiveTab] = useState("about");

  const rawId = params?.id;
  // Find product by id or title slug
  const product = allProducts.find(p => {
    if (typeof rawId === "string") {
      const decodedId = decodeURIComponent(rawId);
      return String(p.id) === decodedId || slugify(p.title) === decodedId;
    }
    return p.id === Number(rawId);
  });

  // Filter to junior products only
  const isJuniorProduct = product && product.category === "junior";

  if (!product || !isJuniorProduct) {
    return (
      <div className="min-h-screen flex flex-col font-sans selection:bg-[#B59410]/30 text-[#2D2D2D]">
        <JuniorNavbar />
        <main className="flex-grow pt-16 pb-20 flex items-center justify-center">
          <div className="max-w-md w-full mx-auto px-6 text-center">
            <div className="relative bg-[#FDFBF7] p-8 border-2 border-[#2D2D2D] rounded-[24px] shadow-sm select-none"
                 style={{ filter: "url(#heavySketch)" }}>
              <div className="text-6xl mb-4">🔍</div>
              <h2 className="text-2xl font-bold font-sketch mb-3 text-[#2D2D2D]">Book Not Found</h2>
              <p className="text-sm text-[#4A4A4A] leading-relaxed mb-6">
                The book you are looking for does not exist or has been moved. Let's find another fun learning material!
              </p>
              <Link
                href="/junior/products"
                className="inline-flex py-3 px-6 bg-[#FFDE4D] hover:bg-[#E6C635] text-[#2D2D2D] border-2 border-[#2D2D2D] font-extrabold rounded-full transition-all shadow-sm items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Books</span>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const savings = product.originalPrice - product.price;
  const discountPercent = Math.round((savings / product.originalPrice) * 100);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      originalPrice: product.originalPrice,
      format: product.format,
      category: product.category
    });
    setCartOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-[#B59410]/30 text-[#2D2D2D]">
      <JuniorNavbar />

      <main className="flex-grow pt-8 pb-20">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20">

          {/* Back Navigation */}
          <button
            onClick={() => router.push("/junior/products")}
            className="flex items-center gap-2 text-sm font-semibold text-[#888] hover:text-[#B59410] transition-colors mb-8 cursor-pointer focus:outline-none"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Books
          </button>

          {/* Core Two-Column Product Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

            {/* LEFT: Product Image */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[0.75] bg-[#F8F9FA] border-2 border-[#E5E5E5] rounded-[24px] overflow-hidden p-8 flex items-center justify-center shadow-sm">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-contain p-4"
                />
              </div>
            </div>

            {/* RIGHT: Product Details */}
            <div className="lg:col-span-7 space-y-6">

              {/* Title & Meta */}
              <div>
                <h1 className="text-4xl md:text-5xl font-sketch text-[#2D2D2D] leading-tight mb-3">
                  {product.title}
                </h1>
                <p className="text-lg text-[#4A4A4A] font-semibold mb-4">{product.subject}</p>

                {/* Rating & Reviews */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(product.rating)
                              ? "fill-[#B59410] text-[#B59410]"
                              : "text-[#ddd]"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-bold text-[#2D2D2D]">{product.rating}</span>
                  </div>
                  <span className="text-sm text-[#4A4A4A] font-semibold">({product.reviews} reviews)</span>
                </div>
              </div>

              {/* Price Section */}
              <div className="bg-[#FFFBF0] border-2 border-[#B59410]/30 rounded-2xl p-6">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-4xl font-bold text-[#B59410]">₹{product.price}</span>
                  <span className="text-lg text-[#4A4A4A] line-through">₹{product.originalPrice}</span>
                  {discountPercent > 0 && (
                    <span className="ml-auto bg-[#B59410] text-white px-3 py-1 rounded-full text-sm font-bold">
                      Save {discountPercent}%
                    </span>
                  )}
                </div>
                <p className="text-sm text-[#4A4A4A] font-semibold">You save ₹{savings}</p>
              </div>

              {/* Key Features */}
              <div className="space-y-3">
                <h3 className="font-bold text-[#2D2D2D] text-lg">What's Included:</h3>
                <ul className="space-y-2">
                  {[
                    "Fun, visual and engaging content",
                    "Perfect for " + (product.level || "all grade levels"),
                    "Format: " + product.format,
                    "Instant digital access"
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-[#4A4A4A] font-semibold">
                      <span className="text-[#B59410] font-bold mt-1">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="w-full group px-8 py-4 relative rounded-xl font-sketch text-lg text-white flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-[#B59410]/20 overflow-hidden"
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
                  Add to Cart
                </span>
              </button>

              {/* Description Tabs */}
              <div className="border-t border-[#e5e5e5] pt-6">
                <div className="flex gap-4 mb-6 border-b border-[#e5e5e5]">
                  {["about", "details"].map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`pb-3 font-bold transition-colors capitalize ${
                        activeTab === tab
                          ? "text-[#B59410] border-b-2 border-[#B59410]"
                          : "text-[#4A4A4A] hover:text-[#2D2D2D]"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {activeTab === "about" && (
                  <div className="text-[#4A4A4A] space-y-3 leading-relaxed">
                    <p>
                      This is a carefully curated study material designed specifically for junior students.
                      It combines fun visuals with engaging content to make learning enjoyable and effective.
                    </p>
                    <p>
                      Perfect for students in {product.level || "all grade levels"}, this material helps
                      build strong foundations in {product.subject}.
                    </p>
                  </div>
                )}

                {activeTab === "details" && (
                  <div className="space-y-3 text-[#4A4A4A]">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="font-bold text-[#2D2D2D]">Format</p>
                        <p>{product.format}</p>
                      </div>
                      <div>
                        <p className="font-bold text-[#2D2D2D]">Subject</p>
                        <p>{product.subject}</p>
                      </div>
                      <div>
                        <p className="font-bold text-[#2D2D2D]">Grade Level</p>
                        <p>{product.level || "All Levels"}</p>
                      </div>
                      <div>
                        <p className="font-bold text-[#2D2D2D]">Access</p>
                        <p>Lifetime Digital Access</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
