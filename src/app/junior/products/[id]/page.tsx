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
  const [activePreviewIndex, setActivePreviewIndex] = useState(0);

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
      exam: product.exam
    });
    setCartOpen(true);
  };

  const tabs = product.id === "JP-PDF-PARENT-AI-V1"
    ? ["about", "syllabus", "features", "security"]
    : ["about", "details"];

  if (product.id === "JP-PDF-PARENT-AI-V1") {
    return (
      <div className="min-h-screen flex flex-col font-sans selection:bg-[#B59410]/30 text-[#2D2D2D]">
        <JuniorNavbar />

        <main className="flex-grow pt-8 pb-16">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            {/* Back Navigation */}
            <button
              onClick={() => router.push("/junior/products")}
              className="flex items-center gap-2 text-sm font-semibold text-[#888] hover:text-[#B59410] transition-colors mb-6 cursor-pointer focus:outline-none"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Books
            </button>

            {/* Premium 3-Column Split Layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-start">
              
              {/* COLUMN 1: Visual Cover Preview */}
              <div className="md:col-span-4 lg:col-span-3 space-y-4 w-full max-w-sm mx-auto">
                <div className="relative aspect-[0.75] w-full bg-[#FDFBF7] border-2 border-[#E2D4B7] rounded-[24px] overflow-hidden p-6 flex items-center justify-center shadow-sm">
                  <Image
                    src={product.previews?.[activePreviewIndex] || product.image || "/assets/images/placeholder-pdfimage.webp"}
                    alt={product.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-contain p-2"
                    priority
                  />
                </div>

                {/* Previews Thumbnails List */}
                {product.previews && product.previews.length > 0 && (
                  <div className="flex gap-2 overflow-x-auto py-1 justify-center">
                    {product.previews.map((preview, index) => (
                      <button
                        key={index}
                        onClick={() => setActivePreviewIndex(index)}
                        className={`relative w-12 h-16 rounded-md overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                          activePreviewIndex === index
                            ? "border-[#B59410] scale-105 shadow-sm"
                            : "border-[#E2D4B7] opacity-60 hover:opacity-100"
                        }`}
                      >
                        <Image
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* COLUMN 2: Purchase Card & Features */}
              <div className="md:col-span-4 lg:col-span-4 bg-[#FFFDF9]/80 border-2 border-[#E2D4B7]/80 rounded-[28px] p-5 shadow-sm flex flex-col justify-between space-y-5">
                <div>
                  {/* Badges / Tags */}
                  <div className="flex gap-2 mb-3">
                    {product.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-extrabold uppercase px-2 py-0.5 bg-[#B59410]/10 border border-[#B59410]/30 rounded-md text-[#B59410]">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h1 className="text-2xl lg:text-3xl font-sketch text-[#2D2D2D] leading-tight mb-1">
                    {product.title}
                  </h1>
                  <p className="text-[11px] text-[#555] font-semibold mb-4 italic">{product.subject}</p>

                  {/* Price Block */}
                  <div className="bg-[#FFFBF0] border border-[#B59410]/20 rounded-xl p-4 mb-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-[#B59410]">₹{product.price}</span>
                      <span className="text-sm text-[#888] line-through">₹{product.originalPrice}</span>
                      <span className="ml-auto bg-[#B59410] text-white px-2 py-0.5 rounded-full text-[10px] font-extrabold">
                        Save {discountPercent}%
                      </span>
                    </div>
                    <p className="text-[10px] text-[#888] mt-1 font-semibold">One-time payment • Lifetime secure access</p>
                  </div>

                  {/* Features Bullet List */}
                  <div className="space-y-2">
                    <h4 className="font-bold text-sm text-[#2D2D2D]">Playbook Features:</h4>
                    <ul className="space-y-1.5">
                      {product.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-[#4A4A4A] font-semibold">
                          <span className="text-[#B59410] font-bold">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                      <li className="flex items-start gap-2 text-xs text-[#4A4A4A] font-semibold">
                        <span className="text-[#B59410] font-bold">✓</span>
                        <span>Formatted for mobile, tablet, and print</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Add to Cart CTA */}
                <button
                  onClick={handleAddToCart}
                  className="w-full group px-6 py-3 relative rounded-xl font-sketch text-base text-white flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] shadow-md hover:shadow-[#B59410]/20 overflow-hidden cursor-pointer"
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
              </div>

              {/* COLUMN 3: Learning Journey Timeline & Objectives */}
              <div className="md:col-span-4 lg:col-span-5 bg-[#FFFDF9]/80 border-2 border-[#E2D4B7]/80 rounded-[28px] p-5 shadow-sm space-y-5">
                <div>
                  <h3 className="font-bold text-sm text-[#2D2D2D] mb-3 border-b border-[#E2D4B7]/30 pb-2">
                    Learning Journey Roadmap
                  </h3>
                  
                  {/* Timeline */}
                  <div className="relative pl-5 border-l border-dashed border-[#B59410]/40 space-y-4 ml-2">
                    {/* Section 1 */}
                    <div className="relative">
                      <div className="absolute -left-[24px] top-1 w-2.5 h-2.5 rounded-full bg-[#FFFBF0] border border-[#B59410] flex items-center justify-center" />
                      <div className="text-xs">
                        <span className="text-[9px] font-extrabold uppercase text-[#B59410] tracking-wider block">Section 1 • Pages 1-3</span>
                        <h4 className="font-bold text-[#2D2D2D] text-xs">Why This Works & Safety</h4>
                        <p className="text-[10px] text-[#666] leading-relaxed mt-0.5">
                          Screen time limits, privacy guidelines, and parental control setup.
                        </p>
                      </div>
                    </div>

                    {/* Section 2 */}
                    <div className="relative">
                      <div className="absolute -left-[24px] top-1 w-2.5 h-2.5 rounded-full bg-[#FFFBF0] border border-[#B59410] flex items-center justify-center" />
                      <div className="text-xs">
                        <span className="text-[9px] font-extrabold uppercase text-[#B59410] tracking-wider block">Section 2 • Pages 4-5</span>
                        <h4 className="font-bold text-[#2D2D2D] text-xs">Getting Started Checklist</h4>
                        <p className="text-[10px] text-[#666] leading-relaxed mt-0.5">
                          3 primary tools setup (ChatGPT, Gemini, Claude) with a 5-minute pre-flight checklist.
                        </p>
                      </div>
                    </div>

                    {/* Section 3 */}
                    <div className="relative">
                      <div className="absolute -left-[24px] top-1 w-2.5 h-2.5 rounded-full bg-[#FFFBF0] border border-[#B59410] flex items-center justify-center" />
                      <div className="text-xs">
                        <span className="text-[9px] font-extrabold uppercase text-[#B59410] tracking-wider block">Section 3 • Pages 6-23</span>
                        <h4 className="font-bold text-[#2D2D2D] text-xs">49 Copy-Paste Prompts (Math, English, Science, Life Skills)</h4>
                        <p className="text-[10px] text-[#666] leading-relaxed mt-0.5">
                          8 Math Prompts, 8 Language Prompts, 5 Science & GK Prompts, 5 Life Skills Prompts, 15 Master Templates.
                        </p>
                      </div>
                    </div>

                    {/* Section 4 */}
                    <div className="relative">
                      <div className="absolute -left-[24px] top-1 w-2.5 h-2.5 rounded-full bg-[#FFFBF0] border border-[#B59410] flex items-center justify-center" />
                      <div className="text-xs">
                        <span className="text-[9px] font-extrabold uppercase text-[#B59410] tracking-wider block">Section 4 • Pages 24-26</span>
                        <h4 className="font-bold text-[#2D2D2D] text-xs">Verification & Critical Thinking</h4>
                        <p className="text-[10px] text-[#666] leading-relaxed mt-0.5">
                          Spotting AI errors and teaching child double-checking/inquiry.
                        </p>
                      </div>
                    </div>

                    {/* Section 5 */}
                    <div className="relative">
                      <div className="absolute -left-[24px] top-1 w-2.5 h-2.5 rounded-full bg-[#FFFBF0] border border-[#B59410] flex items-center justify-center" />
                      <div className="text-xs">
                        <span className="text-[9px] font-extrabold uppercase text-[#B59410] tracking-wider block">Section 5 • Pages 27-28</span>
                        <h4 className="font-bold text-[#2D2D2D] text-xs">Daily Trackers & Planners</h4>
                        <p className="text-[10px] text-[#666] leading-relaxed mt-0.5">
                          Daily schedules, progress maps, and printables.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Anti-Piracy Watermark Warning */}
                <div className="bg-[#FFF2F2] border border-[#EF4444]/20 rounded-xl p-3 text-[10px] text-[#4A4A4A] space-y-1">
                  <p className="font-bold text-[#EF4444] flex items-center gap-1">
                    ⚠ Anti-Piracy Watermark Protected
                  </p>
                  <p className="leading-relaxed">
                    Each downloaded PDF is dynamically embedded with your encrypted email address, mobile number, and receipt ID. Unauthorized uploads to groups (WhatsApp, Telegram) are traced automatically.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-[#B59410]/30 text-[#2D2D2D]">
      <JuniorNavbar />

      <main className="flex-grow pt-8 pb-20">
        <div className="max-w-5xl mx-auto px-4 md:px-8">

          {/* Back Navigation */}
          <button
            onClick={() => router.push("/junior/products")}
            className="flex items-center gap-2 text-sm font-semibold text-[#888] hover:text-[#B59410] transition-colors mb-6 cursor-pointer focus:outline-none"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Books
          </button>

          {/* Core Two-Column Product Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">

            {/* LEFT: Product Image */}
            <div className="md:col-span-5 lg:col-span-4 space-y-4 w-full max-w-sm mx-auto">
              <div className="relative aspect-[0.75] w-full bg-[#F8F9FA] border-2 border-[#E2D4B7] rounded-[24px] overflow-hidden p-6 flex items-center justify-center shadow-sm">
                <Image
                  src={
                    product.previews && product.previews.length > 0
                      ? product.previews[activePreviewIndex]
                      : (product.image || "/assets/images/placeholder-pdfimage.webp")
                  }
                  alt={product.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-contain p-2"
                />
              </div>

              {/* Previews Row */}
              {product.previews && product.previews.length > 0 && (
                <div className="flex gap-2 overflow-x-auto py-2">
                  {product.previews.map((preview, index) => (
                    <button
                      key={index}
                      onClick={() => setActivePreviewIndex(index)}
                      className={`relative w-14 h-18 rounded-md overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                        activePreviewIndex === index
                          ? "border-[#B59410] scale-105 shadow-sm"
                          : "border-[#E2D4B7] opacity-70 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT: Product Details */}
            <div className="md:col-span-7 lg:col-span-8 space-y-6">

              {/* Title & Meta */}
              <div>
                <h1 className="text-3xl md:text-4xl font-sketch text-[#2D2D2D] leading-tight mb-2">
                  {product.title}
                </h1>
                <p className="text-base text-[#4A4A4A] font-semibold mb-4">{product.subject}</p>

                {/* Rating & Reviews */}
                {product.reviews > 0 && (
                  <div className="flex items-center gap-4 mb-4">
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
                )}
              </div>

              {/* Price Section */}
              <div className="bg-[#FFFBF0] border-2 border-[#B59410]/30 rounded-2xl p-5 max-w-md">
                <div className="flex items-baseline gap-3 mb-1">
                  <span className="text-3xl font-bold text-[#B59410]">₹{product.price}</span>
                  <span className="text-base text-[#4A4A4A] line-through">₹{product.originalPrice}</span>
                  {discountPercent > 0 && (
                    <span className="ml-auto bg-[#B59410] text-white px-2.5 py-0.5 rounded-full text-xs font-bold">
                      Save {discountPercent}%
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#4A4A4A] font-semibold">You save ₹{savings}</p>
              </div>

              {/* Key Features */}
              <div className="space-y-2.5 max-w-md">
                <h3 className="font-bold text-[#2D2D2D] text-base">What's Included:</h3>
                <ul className="space-y-2">
                  {[
                    "Fun, visual and engaging content",
                    "Perfect for " + (product.level || "all grade levels"),
                    "Format: " + product.format,
                    "Instant digital access"
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-[#4A4A4A] text-sm font-semibold">
                      <span className="text-[#B59410] font-bold">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="w-full max-w-md group px-8 py-3.5 relative rounded-xl font-sketch text-lg text-white flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] shadow-md hover:shadow-[#B59410]/20 overflow-hidden cursor-pointer"
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
              <div className="border-t border-[#e5e5e5] pt-6 max-w-2xl">
                <div className="flex gap-4 mb-6 border-b border-[#e5e5e5]">
                  {tabs.map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`pb-3 font-bold text-sm transition-colors capitalize ${
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
                  <div className="text-[#4A4A4A] space-y-3 leading-relaxed text-sm">
                    {product.id === "JP-PDF-PARENT-AI-V1" ? (
                      <>
                        <p>
                          Welcome to the ultimate playbook for modern parenting. The <strong>Parents' AI Learning Guide</strong> is designed specifically to help you securely and effectively teach your child using generative AI.
                        </p>
                        <p className="font-bold text-[#2D2D2D] mt-2">Content Objectives:</p>
                        <ul className="list-disc pl-5 space-y-1 text-sm font-semibold">
                          <li>Empower parents to use AI as an interactive, step-by-step tutor rather than a passive digital screen.</li>
                          <li>Establish simple math, vocabulary, and science learning pathways for Grade 1 readiness.</li>
                          <li>Tackle common screen-time and parental privacy concerns with clear safety guardrails.</li>
                          <li>Promote a hybrid learning model combining digital prompts with offline worksheets.</li>
                        </ul>
                      </>
                    ) : (
                      <>
                        <p>
                          This is a carefully curated study material designed specifically for junior students.
                          It combines fun visuals with engaging content to make learning enjoyable and effective.
                        </p>
                        <p>
                          Perfect for students in {product.level || "all grade levels"}, this material helps
                          build strong foundations in {product.subject}.
                        </p>
                      </>
                    )}
                  </div>
                )}

                {activeTab === "details" && product.id !== "JP-PDF-PARENT-AI-V1" && (
                  <div className="space-y-3 text-[#4A4A4A] text-sm">
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

                {activeTab === "syllabus" && product.id === "JP-PDF-PARENT-AI-V1" && (
                  <div className="space-y-6 text-[#4A4A4A]">
                    <p className="text-sm font-bold text-[#2D2D2D] mb-4">
                      Your Learning Journey: Inside the 28-Page Playbook
                    </p>
                    <div className="relative pl-6 border-l-2 border-dashed border-[#B59410]/50 space-y-8 my-4 ml-3">
                      {/* Section 1 */}
                      <div className="relative">
                        <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-[#FFFBF0] border-2 border-[#B59410] flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#B59410]" />
                        </div>
                        <div className="bg-[#FFFDF4] p-4 rounded-xl border-2 border-[#2D2D2D]/10 hover:border-[#B59410]/30 transition-all shadow-sm">
                          <span className="text-[11px] font-extrabold uppercase text-[#B59410] tracking-wider block mb-1">Section 1 • Pages 1-3</span>
                          <h4 className="font-bold text-[#2D2D2D] text-sm">Why This Works & Safety Guardrails</h4>
                          <p className="text-xs text-[#555] mt-1 leading-relaxed">
                            Discover what generative AI is and why it helps your child learn. Covers critical screen time guidelines, child privacy filters, and parental control setup.
                          </p>
                        </div>
                      </div>

                      {/* Section 2 */}
                      <div className="relative">
                        <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-[#FFFBF0] border-2 border-[#B59410] flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#B59410]" />
                        </div>
                        <div className="bg-[#FFFDF4] p-4 rounded-xl border-2 border-[#2D2D2D]/10 hover:border-[#B59410]/30 transition-all shadow-sm">
                          <span className="text-[11px] font-extrabold uppercase text-[#B59410] tracking-wider block mb-1">Section 2 • Pages 4-5</span>
                          <h4 className="font-bold text-[#2D2D2D] text-sm">Getting Started Checklist</h4>
                          <p className="text-xs text-[#555] mt-1 leading-relaxed">
                            Setting up the 3 primary tools (ChatGPT, Gemini, Claude) with a 5-minute pre-flight checklist.
                          </p>
                        </div>
                      </div>

                      {/* Section 3 */}
                      <div className="relative">
                        <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-[#FFFBF0] border-2 border-[#B59410] flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#B59410]" />
                        </div>
                        <div className="bg-[#FFFDF4] p-4 rounded-xl border-2 border-[#2D2D2D]/10 hover:border-[#B59410]/30 transition-all shadow-sm">
                          <span className="text-[11px] font-extrabold uppercase text-[#B59410] tracking-wider block mb-1">Section 3 • Pages 6-23</span>
                          <h4 className="font-bold text-[#2D2D2D] text-sm">The 49 Master Prompts (The Core Playbook)</h4>
                          <ul className="text-xs text-[#555] mt-2 space-y-1.5 list-disc pl-4 font-semibold">
                            <li><strong>8 Math Prompts:</strong> Counting games, shape hunts, and basic addition patterns.</li>
                            <li><strong>8 English & Vocabulary Prompts:</strong> Phonics audio cues, visual storytelling guides.</li>
                            <li><strong>5 Science & GK Prompts:</strong> Explaining weather, dinosaurs, and plant life in simple terms.</li>
                            <li><strong>5 Life Skills Prompts:</strong> Emotional check-ins, routine builders, and chore charts.</li>
                            <li><strong>15 Fill-in-the-Blank Templates:</strong> Customized prompts ready for any daily topic.</li>
                          </ul>
                        </div>
                      </div>

                      {/* Section 4 */}
                      <div className="relative">
                        <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-[#FFFBF0] border-2 border-[#B59410] flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#B59410]" />
                        </div>
                        <div className="bg-[#FFFDF4] p-4 rounded-xl border-2 border-[#2D2D2D]/10 hover:border-[#B59410]/30 transition-all shadow-sm">
                          <span className="text-[11px] font-extrabold uppercase text-[#B59410] tracking-wider block mb-1">Section 4 • Pages 24-26</span>
                          <h4 className="font-bold text-[#2D2D2D] text-sm">Verification & Critical Thinking</h4>
                          <p className="text-xs text-[#555] mt-1 leading-relaxed">
                            How to spot AI errors (hallucinations) and use them to teach your child double-checking and critical inquiry skills.
                          </p>
                        </div>
                      </div>

                      {/* Section 5 */}
                      <div className="relative">
                        <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-[#FFFBF0] border-2 border-[#B59410] flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#B59410]" />
                        </div>
                        <div className="bg-[#FFFDF4] p-4 rounded-xl border-2 border-[#2D2D2D]/10 hover:border-[#B59410]/30 transition-all shadow-sm">
                          <span className="text-[11px] font-extrabold uppercase text-[#B59410] tracking-wider block mb-1">Section 5 • Pages 27-28</span>
                          <h4 className="font-bold text-[#2D2D2D] text-sm">Planning & Daily Tracker</h4>
                          <p className="text-xs text-[#555] mt-1 leading-relaxed">
                            Daily 30-minute structured learning pathways, progress mapping tables, and kid-friendly printables.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "features" && product.id === "JP-PDF-PARENT-AI-V1" && (
                  <div className="space-y-3 text-[#4A4A4A]">
                    <ul className="space-y-2 text-sm font-semibold">
                      <li className="flex gap-2">
                        <span className="text-[#B59410] font-bold">✓</span>
                        <span><strong>49 Copy-Paste Ready Prompts:</strong> Fully tested to work on ChatGPT, Claude, and Gemini.</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-[#B59410] font-bold">✓</span>
                        <span><strong>Interactive Tutor Setup:</strong> Prompts configure the AI to ask questions one-by-one rather than dumping large blocks of text.</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-[#B59410] font-bold">✓</span>
                        <span><strong>Parent-Friendly Language:</strong> Absolutely zero coding or technical jargon required.</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-[#B59410] font-bold">✓</span>
                        <span><strong>Printable Progress Planners:</strong> Out-of-the-box schedules to organize learning consistency.</span>
                      </li>
                    </ul>
                  </div>
                )}

                {activeTab === "security" && product.id === "JP-PDF-PARENT-AI-V1" && (
                  <div className="space-y-3 text-[#4A4A4A]">
                    <p className="text-sm font-semibold text-[#ef4444] flex items-center gap-1.5 mb-2">
                      <span>Anti-Piracy Security Warning:</span>
                    </p>
                    <p className="text-xs leading-relaxed">
                      This digital playbook is protected under copyright law. Each PDF download is embedded with a **dynamic digital watermark** containing the customer's registered email address, mobile number, and purchase transaction ID.
                    </p>
                    <p className="text-xs leading-relaxed">
                      Redistributing this file or hosting it on shared platforms (such as Telegram channels, WhatsApp groups, or public Google drives) is strictly prohibited. Leaks will be traced back to the source watermark, resulting in immediate account suspension and legal action.
                    </p>
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
