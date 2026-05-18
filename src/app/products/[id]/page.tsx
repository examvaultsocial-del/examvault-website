"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Star, ChevronRight, ChevronLeft, ShieldCheck, Mail, Sparkles, CheckCircle2, ArrowLeft, Bookmark } from "lucide-react";
import Navbar from "@/app/Navbar";
import Footer from "@/app/landingpage/footer";
import { useCart } from "@/components/providers/CartProvider";

import { allProducts } from "@/lib/products";

// Custom styling helper to render creative, dynamic, color-coded tag badges with contextual inline vector icons
const getTagStyles = (tag: string) => {
  const normalized = tag.toLowerCase().trim();
  
  if (normalized === "pdf") {
    return {
      bgClass: "bg-[#D32F2F]",
      borderClass: "border-[#B71C1C]",
      icon: (
        <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      )
    };
  }
  if (normalized === "video") {
    return {
      bgClass: "bg-[#D32F2F]",
      borderClass: "border-[#B71C1C]",
      icon: (
        <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" />
        </svg>
      )
    };
  }
  if (normalized === "best seller" || normalized === "flagship") {
    return {
      bgClass: "bg-[#B59410]",
      borderClass: "border-[#A37E0B]",
      icon: (
        <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      )
    };
  }
  if (normalized === "audio book" || normalized === "audiobook") {
    return {
      bgClass: "bg-[#137333]",
      borderClass: "border-[#0F5D29]",
      icon: (
        <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
        </svg>
      )
    };
  }
  if (normalized === "new arrival" || normalized === "new") {
    return {
      bgClass: "bg-[#0066CC]",
      borderClass: "border-[#0052A3]",
      icon: (
        <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      )
    };
  }
  
  return {
    bgClass: "bg-[#4A5568]",
    borderClass: "border-[#2D3748]",
    icon: (
      <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
      </svg>
    )
  };
};

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart, setCartOpen } = useCart();
  const [activeTab, setActiveTab] = useState("about");

  const productId = Number(params?.id);
  // Find product by id, fallback to first if not found
  const product = allProducts.find(p => p.id === productId) || allProducts[0];

  const savings = product.originalPrice - product.price;
  const discountPercent = Math.round((savings / product.originalPrice) * 100);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      originalPrice: product.originalPrice,
      format: product.format,
      exam: product.exam
    });
    setCartOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-[#B59410]/30 text-[#2D2D2D]">
      <Navbar />

      <main className="flex-grow pt-8 pb-20">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20">
          
          {/* Back Navigation */}
          <button 
            onClick={() => router.push("/products")} 
            className="flex items-center gap-2 text-sm font-semibold text-[#888] hover:text-[#B59410] transition-colors mb-8 cursor-pointer focus:outline-none"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Catalog
          </button>

          {/* Core Two-Column Product Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* LEFT: Stunning Visual Mockup / Gallery Card */}
            <div className="lg:col-span-7 space-y-6">
              <div className="relative aspect-[1.45] bg-[#F8F9FA] border-2 border-[#E5E5E5] rounded-[24px] overflow-hidden p-8 flex items-center justify-center shadow-sm">
                
                {/* Visual notebook layout background */}
                <Image 
                  src="/assets/images/placeholder-pdfimage.webp"
                  alt={product.title}
                  fill
                  className="object-contain p-8 drop-shadow-2xl"
                  priority
                />

                {/* Styled notebook cover text overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center select-none pointer-events-none">
                  <span className="text-[11px] tracking-widest uppercase font-extrabold text-[#888]/80 mb-1">
                    {product.exam.toUpperCase()} PREPARATION
                  </span>
                  <h2 className="text-xl md:text-2xl font-bold text-[#1E1B4B] leading-tight px-4 bg-white/50 backdrop-blur-[2px] border border-[#d8d3c9]/40 rounded-lg py-2 line-clamp-3 max-w-[80%] shadow-md">
                    {product.subject.toUpperCase()}
                  </h2>
                  <span className="text-[10px] uppercase tracking-wider font-extrabold text-[#B59410] mt-2 bg-[#FFF9E6] px-2.5 py-0.5 rounded border border-[#FFEBB3]">
                    {product.format}
                  </span>
                </div>

                {/* Visual tags overlay */}
                <div className="absolute top-4 left-4 flex gap-2">
                  {product.tags.map(tag => {
                    const style = getTagStyles(tag);
                    return (
                      <span 
                        key={tag} 
                        className="relative inline-flex items-center gap-1 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white select-none transition-all duration-200 hover:scale-[1.03]"
                      >
                        {/* Solid background with hand-drawn sketchy filter applied ONLY to the tag, leaving text clear */}
                        <span 
                          className={`absolute inset-0 rounded-[6px] border ${style.bgClass} ${style.borderClass} pointer-events-none`}
                          style={{ filter: "url(#heavySketch)" }}
                        />
                        <span className="relative z-10 flex items-center gap-1 text-white">
                          {style.icon}
                          <span>{tag}</span>
                        </span>
                      </span>
                    );
                  })}
                </div>

                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3.5 py-1.5 rounded-full text-xs font-bold shadow flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#B59410]" />
                  <span>Interactive High-Yield Pages</span>
                </div>
              </div>

              {/* Sample Quick Previews Grid */}
              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((num) => (
                  <div key={num} className="aspect-[4/3] bg-white border border-[#E5E5E5] hover:border-[#B59410] rounded-xl p-2 flex items-center justify-center cursor-pointer transition-all shadow-sm">
                    <div className="relative w-full h-full">
                      <Image 
                        src="/assets/images/placeholder-pdfimage.webp"
                        alt="Sample Preview"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: Detail Spec & Buy Action Card */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Product Info Metadata */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="bg-[#FAF6EE] text-[#B59410] border border-[#ebdcb9] px-3 py-0.5 rounded-full text-xs font-extrabold uppercase tracking-wider">
                    {product.exam.toUpperCase()}
                  </span>
                  <span className="text-xs text-[#888] font-bold uppercase tracking-wider">&bull;</span>
                  <span className="text-xs font-extrabold text-[#B59410] uppercase tracking-wider">
                    {product.subject}
                  </span>
                </div>

                <h1 className="text-2xl md:text-3xl font-bold font-sketch leading-tight">
                  {product.title}
                </h1>

                <div className="flex items-center gap-4 py-1">
                  <div className="flex items-center gap-1.5">
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-4 h-4 fill-[#B59410] text-[#B59410]" />
                      ))}
                    </div>
                    <span className="text-sm font-bold">{product.rating}</span>
                  </div>
                  <span className="text-[#E5E5E5]">|</span>
                  <span className="text-xs text-[#888] font-semibold">{product.reviews} Verification Ratings</span>
                </div>

                <p className="text-sm text-[#4A4A4A] leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Action purchase card block */}
              <div className="bg-white border-2 border-[#E5E5E5] rounded-[24px] p-6 shadow-sm space-y-5">
                
                {/* Pricing block */}
                <div className="flex items-baseline justify-between">
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-extrabold">₹{product.price}</span>
                    <span className="text-sm text-[#888] line-through">₹{product.originalPrice}</span>
                  </div>
                  <span className="bg-green-50 text-green-700 border border-green-200 px-3 py-0.5 rounded-full text-xs font-extrabold">
                    {discountPercent}% OFF SAVE ₹{savings}
                  </span>
                </div>

                {/* Quick Spec list */}
                <div className="grid grid-cols-2 gap-4 py-3 border-y border-[#E5E5E5]/60 text-xs text-[#4A4A4A]">
                  <div>
                    <span className="block text-[#888] font-semibold mb-0.5">Format</span>
                    <strong className="text-[#2D2D2D]">{product.format} (Secure PDF)</strong>
                  </div>
                  <div>
                    <span className="block text-[#888] font-semibold mb-0.5">Syllabus Coverage</span>
                    <strong className="text-[#2D2D2D]">{product.syllabusCoverage}</strong>
                  </div>
                  <div>
                    <span className="block text-[#888] font-semibold mb-0.5">Pages count</span>
                    <strong className="text-[#2D2D2D]">{product.pagesCount} Pages</strong>
                  </div>
                  <div>
                    <span className="block text-[#888] font-semibold mb-0.5">File size</span>
                    <strong className="text-[#2D2D2D]">{product.fileSize}</strong>
                  </div>
                </div>

                {/* Add to Cart Premium Yellow curved button side-by-side with Bookmark */}
                <div className="flex gap-3">
                  <button 
                    onClick={handleAddToCart}
                    className="flex-grow py-3 px-6 bg-[#FFDE4D] hover:bg-[#E6C635] text-[#2D2D2D] border border-[#E0BE22] font-extrabold rounded-full transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span>Add to Cart</span>
                    <span className="text-base font-bold">+</span>
                  </button>
                  
                  <button className="w-12 h-12 border-2 border-[#E5E5E5] hover:border-[#B59410] hover:text-[#B59410] flex items-center justify-center rounded-full transition-colors cursor-pointer text-[#888]">
                    <Bookmark className="w-5 h-5" />
                  </button>
                </div>

                {/* Secure checkout badges */}
                <div className="bg-[#FDFBF7] border border-[#ebdcb9] rounded-xl p-3.5 space-y-2.5">
                  <div className="flex items-center gap-2.5 text-xs text-[#4A4A4A]">
                    <ShieldCheck className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span>Secure Payments (UPI, Cards, Wallets)</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-[#4A4A4A]">
                    <Mail className="w-4 h-4 text-amber-600 flex-shrink-0" />
                    <span>Instant delivery with one-time secure download link</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Interactive Specification Tabs Section */}
          <div className="mt-16 border-t border-[#E5E5E5]/60 pt-12 max-w-4w">
            <div className="flex border-b border-[#E5E5E5] mb-8 overflow-x-auto gap-8 scrollbar-none">
              {[
                { id: "about", label: "About the Material" },
                { id: "syllabus", label: "Syllabus Details" },
                { id: "strategy", label: "Preparation Strategy" },
                { id: "reviews", label: "Student Feedback" },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-4 text-sm font-bold whitespace-nowrap transition-all border-b-2 cursor-pointer ${
                    activeTab === tab.id
                      ? "border-[#B59410] text-[#B59410]"
                      : "border-transparent text-[#888] hover:text-[#2D2D2D]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Panel Renderers */}
            <div className="min-h-[200px]">
              {activeTab === "about" && (
                <div className="space-y-6 max-w-3xl">
                  <h3 className="text-lg font-bold">Comprehensive Product Coverage</h3>
                  <p className="text-sm text-[#4A4A4A] leading-relaxed">
                    Designed for aspirants who prefer structured visual learning over passive text reading. We use a dual-coding layout mapping visual sketches directly next to essential reference checklists. Each concept is condensed to fit standard A4 margins, ready to download, view on tablets, or print immediately.
                  </p>
                  
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold text-[#B59410]">Included Core Chapters & Sheets:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-[#4A4A4A]">
                      {product.features.map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "syllabus" && (
                <div className="space-y-6 max-w-3xl">
                  <h3 className="text-lg font-bold">Exam Syllabus Mapping ({product.syllabusCoverage})</h3>
                  <p className="text-sm text-[#4A4A4A] leading-relaxed">
                    Our team cross-references every visual mindmap against official syllabus benchmarks and recent 10-year Previous Years' Questions (PYQs). Here is what we map:
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-white border border-[#E5E5E5] rounded-xl text-sm">
                      <div>
                        <strong className="block">Core Conceptual Sheets</strong>
                        <span className="text-xs text-[#888]">Underpinning theory, static pillars and structural maps</span>
                      </div>
                      <span className="font-bold text-[#B59410]">45 Sheets</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white border border-[#E5E5E5] rounded-xl text-sm">
                      <div>
                        <strong className="block">PYQ Mapped Timelines</strong>
                        <span className="text-xs text-[#888]">Chronologies constructed from critical dynamic trends</span>
                      </div>
                      <span className="font-bold text-[#B59410]">22 Sheets</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "strategy" && (
                <div className="space-y-6 max-w-3xl">
                  <h3 className="text-lg font-bold">How to Use These Visual Notes</h3>
                  <div className="space-y-4 text-sm text-[#4A4A4A] leading-relaxed">
                    <p>
                      <strong>Phase 1: Concept Baseline (15 mins)</strong><br />
                      Spend 15 minutes reviewing the corresponding mindmap before starting a standard reference chapter. This establishes a structural baseline in your visual memory.
                    </p>
                    <p>
                      <strong>Phase 2: Post-Read Synthesis (5 mins)</strong><br />
                      After reading standard chapters, close the text book and trace the visual mindmap. Use a green pencil or digital marker to tick off key nodes that you recalled.
                    </p>
                    <p>
                      <strong>Phase 3: Active Recall Pre-Exam</strong><br />
                      During the last 15 days before the prelims/mains, review 10 mindmaps daily to spark quick recall of complex structures.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="space-y-6 max-w-3xl">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold">Aspirant Feedback</h3>
                    <span className="text-xs text-[#888] font-bold">Average rating based on {product.reviews} reviews</span>
                  </div>

                  <div className="space-y-4">
                    {[
                      { name: "Rahul S. (UPSC Aspirant)", date: "2 days ago", rating: 5, comment: "Absolutely marvelous. laxmikanth chapters are so heavy but these mindmaps make revising basic structure so effortless. Printed them and pasted on wall!" },
                      { name: "Ananya M. (SSC CGL Core)", date: "1 week ago", rating: 5, comment: "I loved the color mappings! Saved so much time compiling multiple standard sources. Definitely recommended!" },
                    ].map((rev, idx) => (
                      <div key={idx} className="bg-white border border-[#E5E5E5] p-5 rounded-2xl space-y-2">
                        <div className="flex items-center justify-between text-xs text-[#888]">
                          <strong className="text-[#2D2D2D]">{rev.name}</strong>
                          <span>{rev.date}</span>
                        </div>
                        <div className="flex gap-0.5">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-[#B59410] text-[#B59410]" />
                          ))}
                        </div>
                        <p className="text-xs text-[#4A4A4A] leading-relaxed">{rev.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
