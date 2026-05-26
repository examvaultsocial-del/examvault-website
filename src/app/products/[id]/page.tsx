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
import { getTagStyles } from "@/lib/tagStyles";
import { slugify } from "@/lib/utils";

export default function ProductDetailPage() {
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

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col font-sans selection:bg-[#B59410]/30 text-[#2D2D2D]">
        <Navbar />
        <main className="flex-grow pt-16 pb-20 flex items-center justify-center">
          <div className="max-w-md w-full mx-auto px-6 text-center">
            <div className="relative bg-[#FDFBF7] p-8 border-2 border-[#2D2D2D] rounded-[24px] shadow-sm select-none"
                 style={{ filter: "url(#heavySketch)" }}>
              <div className="text-6xl mb-4">🔍</div>
              <h2 className="text-2xl font-bold font-sketch mb-3 text-[#2D2D2D]">Material Not Found</h2>
              <p className="text-sm text-[#4A4A4A] leading-relaxed mb-6">
                The visual notes or mindmaps you are looking for do not exist or have been moved. Let's find another high-yield prep material!
              </p>
              <Link 
                href="/products"
                className="inline-flex py-3 px-6 bg-[#FFDE4D] hover:bg-[#E6C635] text-[#2D2D2D] border-2 border-[#2D2D2D] font-extrabold rounded-full transition-all shadow-sm items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Catalog</span>
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
              {/* Core 3D Stage Wrapper with Perspective */}
              <div className="relative aspect-[1.45] bg-[#F8F9FA] border-2 border-[#E5E5E5] rounded-[24px] overflow-hidden p-8 flex items-center justify-center shadow-sm [perspective:1200px] group/detail">
                
                {/* 3D Notebook Object */}
                <div 
                  className="relative w-[34%] aspect-[3/4.2] bg-[#FDFBF7] shadow-xl transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] [transform-style:preserve-3d] origin-left group-hover/detail:shadow-[20px_25px_30px_rgba(26,26,46,0.15)] group-hover/detail:[transform:rotateY(-24deg)_scale(1.06)_translateY(-8px)]"
                  style={{
                    border: '3px solid #B59410',
                    borderRadius: '6px 14px 14px 6px',
                    willChange: 'transform'
                  }}
                >
                  <Image
                    src="/assets/images/placeholder-pdfimage.webp"
                    alt={product.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-contain p-2 opacity-95 transition-opacity"
                    priority
                  />
                  
                  {/* Book Spine Highlight & Depth Shadow */}
                  <div className="absolute inset-y-0 left-0 w-[12%] bg-gradient-to-r from-black/25 via-black/5 to-transparent pointer-events-none z-10" />
                  <div className="absolute inset-y-0 left-[10%] w-[1px] bg-white/20 pointer-events-none z-10" />
                  <div className="absolute inset-y-0 left-[11%] w-[1px] bg-black/10 pointer-events-none z-10" />
                  
                  {/* Realistic fanning pages on the right edge */}
                  <div 
                    className="absolute right-0 top-[2px] bottom-[2px] w-[8px] bg-[#F4EFE0] shadow-inner origin-left transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
                    style={{
                      transform: 'rotateY(90deg) translateZ(1px)',
                      backgroundImage: 'repeating-linear-gradient(90deg, #E5D5A5 0px, #E5D5A5 1px, transparent 1px, transparent 3.5px)',
                      borderLeft: '1px solid rgba(181, 148, 16, 0.2)',
                      borderRadius: '0 3px 3px 0'
                    }}
                  />
                </div>

                {/* Styled notebook cover text overlay */}
                <div className="absolute bottom-6 left-6 right-6 flex flex-col items-start select-none pointer-events-none z-20">
                  <span className="text-[10px] tracking-widest uppercase font-extrabold text-[#888] mb-1">
                    {product.exam.toUpperCase()} PREP
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-[#2d2d2d] bg-white/95 border border-[#d8d3c9]/60 px-2.5 py-0.5 rounded shadow-sm">
                      {product.subject.toUpperCase()}
                    </span>
                    <span className="text-[9px] uppercase tracking-wider font-extrabold text-[#B59410] bg-[#FFF9E6] px-2.5 py-0.5 rounded border border-[#FFEBB3]">
                      {product.format}
                    </span>
                  </div>
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
                          style={{
                            filter: "url(#heavySketch)",
                            transform: 'translateZ(0)',
                            backfaceVisibility: 'hidden',
                            willChange: 'filter, transform'
                          }}
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
