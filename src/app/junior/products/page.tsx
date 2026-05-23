"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, ChevronDown, ChevronLeft, ChevronRight, Star, Filter, SlidersHorizontal, X } from "lucide-react";

import JuniorNavbar from "@/app/JuniorNavbar";
import Footer from "@/app/landingpage/footer";
import { useCart } from "@/components/providers/CartProvider";

import { allProducts } from "@/lib/products";
import { getTagStyles } from "@/lib/tagStyles";
import { slugify } from "@/lib/utils";

// SVG Filters for sketchy effects
const SvgFilters = () => (
  <svg width="0" height="0" style={{ position: 'absolute' }}>
    <defs>
      <filter id="pencilFilter">
        <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" result="noise" seed="2" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" />
      </filter>
      <filter id="heavySketch">
        <feTurbulence type="fractalNoise" baseFrequency="0.08" numOctaves="4" result="noise" seed="3" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" />
      </filter>
    </defs>
  </svg>
);

// Junior subjects
const juniorSubjects = [
  "English",
  "Mathematics",
  "Science",
  "Social Studies",
  "General Knowledge",
];

function JuniorProductsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addToCart, setCartOpen } = useCart();

  // Active filters states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(2000);
  const [minRating, setMinRating] = useState(0);
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("Popularity");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Collapsible sections
  const [isTypeOpen, setIsTypeOpen] = useState(true);
  const [isRatingOpen, setIsRatingOpen] = useState(true);

  // Prevent background scroll when mobile filter drawer is open
  useEffect(() => {
    if (mobileFilterOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileFilterOpen]);

  // Subject checklist toggle
  const handleSubjectToggle = (subj: string) => {
    setSelectedSubjects(prev =>
      prev.includes(subj) ? prev.filter(s => s !== subj) : [...prev, subj]
    );
    setCurrentPage(1);
  };

  // Format checklist toggle
  const handleFormatToggle = (format: string) => {
    setSelectedFormats(prev =>
      prev.includes(format) ? prev.filter(f => f !== format) : [...prev, format]
    );
    setCurrentPage(1);
  };

  // Reset all filters
  const handleClearAll = () => {
    setSelectedSubjects([]);
    setSelectedFormats([]);
    setSearchQuery("");
    setMaxPrice(2000);
    setMinRating(0);
    router.push("/junior/products");
    setCurrentPage(1);
  };

  // Filter application logic
  const filteredProducts = allProducts.filter(product => {
    // 1. Search Query
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      const matchTitle = product.title.toLowerCase().includes(q);
      const matchSubject = product.subject.toLowerCase().includes(q);
      const matchTags = product.tags.some(tag => tag.toLowerCase().includes(q));
      if (!matchTitle && !matchSubject && !matchTags) return false;
    }

    // 2. Subjects list (OR selection)
    if (selectedSubjects.length > 0 && !selectedSubjects.includes(product.subject)) {
      return false;
    }

    // 3. Price range slider logic
    if (maxPrice < 2000 && product.price > maxPrice) {
      return false;
    }

    // 4. Rating filter logic
    if (minRating > 0 && product.rating < minRating) {
      return false;
    }

    // 5. Formats list (OR selection)
    if (selectedFormats.length > 0 && !selectedFormats.includes(product.format)) {
      return false;
    }

    return true;
  });

  // Sorting application logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "Price: Low to High") {
      return a.price - b.price;
    }
    if (sortBy === "Price: High to Low") {
      return b.price - a.price;
    }
    if (sortBy === "Newest Arrivals") {
      return b.id - a.id;
    }
    // Recommended / default
    return a.id - b.id;
  });

  // Pagination bounds logic
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = sortedProducts.slice(startIndex, startIndex + itemsPerPage);

  // Reset current page if it exceeds total pages
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  const displayStartIndex = sortedProducts.length === 0 ? 0 : startIndex + 1;
  const displayEndIndex = Math.min(startIndex + itemsPerPage, sortedProducts.length);

  // Generate page numbers array beautifully
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (currentPage > 4) {
        pages.push("...");
        const start = Math.min(currentPage - 1, totalPages - 3);
        const end = Math.min(currentPage + 1, totalPages - 1);
        for (let i = start; i <= end; i++) {
          if (i > 1 && i < totalPages) {
            pages.push(i);
          }
        }
      } else {
        for (let i = 2; i <= Math.min(5, totalPages - 1); i++) {
          pages.push(i);
        }
      }
      if (currentPage < totalPages - 3) {
        pages.push("...");
      }
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-[#B59410]/30">
      <SvgFilters />
      <JuniorNavbar />

      <main className="flex-grow pt-8 pb-16">
        <div className="mb-20 max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20">

          {/* Header Section */}
          <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex flex-col">
              <div className="flex items-center text-xs text-[#888] font-semibold mb-3">
                <Link href="/junior" className="hover:text-[#2D2D2D] transition-colors">Home</Link>
                <ChevronRight className="w-3 h-3 mx-2" />
                <span className="text-[#4A4A4A]">Junior Books</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-sketch text-[#2D2D2D] mb-3">Junior Study Materials</h1>
              <p className="text-sm text-[#4A4A4A] max-w-lg">Fun, visual and engaging study materials for Jr KG to 7th Std.</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex border border-[#d8d3c9] rounded-xl overflow-hidden bg-[#FDFBF7] w-full md:w-[450px] shadow-sm items-center pr-3">
                <div className="pl-4 flex items-center justify-center text-[#888]">
                  <Search className="h-5 w-5" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Search books, subjects..."
                  className="w-full px-3 py-3 bg-transparent text-sm focus:outline-none text-[#2D2D2D] placeholder-[#a39f98]"
                />
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setCurrentPage(1);
                    }}
                    className="p-1 hover:bg-[#f2ebd9] rounded-full text-[#888] hover:text-[#2D2D2D] transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => setMobileFilterOpen(true)}
                  className="p-1.5 ml-1 text-[#888] hover:text-[#2D2D2D] lg:hidden hover:bg-[#FAF6EE] rounded-lg transition-colors flex items-center justify-center shrink-0 cursor-pointer"
                  title="Open Filters"
                >
                  <SlidersHorizontal className="h-5 w-5 text-[#B59410]" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="bg-[#FDFBF7]/60 border border-[#E2D4B7] rounded-[20px] p-5 sticky top-28 shadow-sm">
                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                  <span className="font-bold text-base text-[#2D2D2D]">Filters</span>
                  {(selectedFormats.length > 0 || maxPrice < 2000 || minRating > 0) && (
                    <button
                      onClick={handleClearAll}
                      className="text-xs font-semibold text-[#888] hover:text-[#B59410] flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      Clear All
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 6 6 18M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>

                <div className="flex flex-col">
                  {/* Subject Section */}
                  <div className="py-4 border-b border-[#ebdcb9]/40 first:pt-0">
                    <button
                      onClick={() => setIsTypeOpen(!isTypeOpen)}
                      className="flex items-center justify-between w-full font-bold text-sm text-[#2D2D2D] mb-3 cursor-pointer text-left focus:outline-none"
                    >
                      <span>Subjects</span>
                      <ChevronDown className={`w-4 h-4 text-[#888] transition-transform duration-200 ${isTypeOpen ? "rotate-180" : ""}`} />
                    </button>

                    {isTypeOpen && (
                      <div className="space-y-2.5">
                        {juniorSubjects.map((subject) => {
                          const isChecked = selectedSubjects.includes(subject);
                          return (
                            <label key={subject} className="flex items-center justify-between cursor-pointer group py-0.5">
                              <div className="flex items-center gap-3">
                                <div className="relative flex items-center justify-center w-5 h-5 flex-shrink-0">
                                  <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={() => handleSubjectToggle(subject)}
                                    className="peer appearance-none w-5 h-5 border border-[#c5beaf] rounded-[5px] checked:bg-[#B59410] checked:border-[#B59410] transition-all cursor-pointer bg-white"
                                  />
                                  <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none stroke-[2.5]" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1.5 5L5 8.5L12.5 1" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                </div>
                                <span className="text-sm font-medium text-[#4a463e]">{subject}</span>
                              </div>
                            </label>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Price Range Section */}
                  <div className="py-4 border-b border-[#ebdcb9]/40">
                    <span className="block font-bold text-sm text-[#2D2D2D] mb-3">Price Range</span>
                    <div className="space-y-4">
                      <div className="relative pt-4 pb-2">
                        {/* Visual track */}
                        <div className="h-1 bg-[#E8E1D5] rounded-full w-full relative">
                          <div
                            className="absolute h-full bg-[#B59410] rounded-full"
                            style={{ left: '0%', right: `${100 - (maxPrice / 2000) * 100}%` }}
                          />
                        </div>
                        {/* Actual transparent range input */}
                        <input
                          type="range"
                          min="0"
                          max="2000"
                          step="50"
                          value={maxPrice}
                          onChange={(e) => {
                            setMaxPrice(Number(e.target.value));
                            setCurrentPage(1);
                          }}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer accent-[#B59410] z-10"
                        />
                        {/* Custom styled thumbs */}
                        <div
                          className="absolute w-4 h-4 bg-[#B59410] rounded-full shadow top-1/2 -translate-y-1/2 -ml-2 pointer-events-none"
                          style={{ left: '0%' }}
                        />
                        <div
                          className="absolute w-4 h-4 bg-[#B59410] rounded-full shadow top-1/2 -translate-y-1/2 -ml-2 pointer-events-none"
                          style={{ left: `${(maxPrice / 2000) * 100}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-xs font-bold text-[#4a463e]">
                        <span>₹0</span>
                        <span>₹{maxPrice === 2000 ? "2000+" : maxPrice}</span>
                      </div>
                    </div>
                  </div>

                  {/* Rating Section */}
                  <div className="py-4 last:border-b-0 last:pb-0">
                    <button
                      onClick={() => setIsRatingOpen(!isRatingOpen)}
                      className="flex items-center justify-between w-full font-bold text-sm text-[#2D2D2D] mb-3 cursor-pointer text-left focus:outline-none"
                    >
                      <span>Rating</span>
                      <ChevronDown className={`w-4 h-4 text-[#888] transition-transform duration-200 ${isRatingOpen ? "rotate-180" : ""}`} />
                    </button>

                    {isRatingOpen && (
                      <div className="space-y-2.5">
                        <label className="flex items-center gap-3 cursor-pointer group py-0.5">
                          <div className="relative flex items-center justify-center w-5 h-5 flex-shrink-0">
                            <input
                              type="checkbox"
                              checked={minRating === 4}
                              onChange={() => {
                                setMinRating(minRating === 4 ? 0 : 4);
                                setCurrentPage(1);
                              }}
                              className="peer appearance-none w-5 h-5 border border-[#c5beaf] rounded-[5px] checked:bg-[#B59410] checked:border-[#B59410] transition-all cursor-pointer bg-white"
                            />
                            <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none stroke-[2.5]" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M1.5 5L5 8.5L12.5 1" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>

                          <div className="flex items-center gap-1 select-none">
                            {[1, 2, 3, 4].map((star) => (
                              <svg key={star} className="w-3.5 h-3.5 text-[#B59410] fill-[#B59410]" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                              </svg>
                            ))}
                            <svg className="w-3.5 h-3.5 text-[#c5beaf]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                            </svg>
                            <span className="text-[13px] text-[#4a463e] font-semibold ml-1">& above</span>
                          </div>
                        </label>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Content Grid */}
            <div className="flex-grow">

              {/* Active Filters / Sort & View Toggle */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <p className="text-sm text-[#888] font-medium">Showing <span className="font-bold text-[#2D2D2D]">{sortedProducts.length}</span> materials</p>

                <div className="flex items-center gap-5">
                  {/* Sort By Dropdown */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-[#555] font-medium font-sans">Sort By:</span>
                    <div className="relative group">
                      <select
                        value={sortBy}
                        onChange={(e) => {
                          setSortBy(e.target.value);
                          setCurrentPage(1);
                        }}
                        className="appearance-none bg-[#FDFBF7] border border-[#ebdcb9] rounded-xl py-2 pl-4 pr-10 text-sm font-semibold text-[#2D2D2D] focus:outline-none focus:border-[#B59410] cursor-pointer shadow-sm hover:border-[#B59410]/50 transition-colors"
                      >
                        <option value="Popularity">Popularity</option>
                        <option value="Newest Arrivals">Newest Arrivals</option>
                        <option value="Price: Low to High">Price: Low to High</option>
                        <option value="Price: High to Low">Price: High to Low</option>
                      </select>
                      <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888] pointer-events-none group-hover:text-[#2D2D2D] transition-colors" />
                    </div>
                  </div>

                  {/* View: Grid / List Toggle */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-[#555] font-medium font-sans">View:</span>
                    <div className="flex items-center bg-[#FDFBF7]/40 border border-[#ebdcb9] p-0.5 rounded-xl">
                      <button
                        onClick={() => setViewMode("grid")}
                        className={`p-1.5 rounded-lg transition-all cursor-pointer flex items-center justify-center ${
                          viewMode === "grid"
                            ? "bg-[#FAF6EE] text-[#B59410] shadow-sm border border-[#ebdcb9]"
                            : "text-[#888] hover:text-[#2D2D2D] border border-transparent"
                        }`}
                        title="Grid View"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
                          <rect x="1.5" y="1.5" width="5.5" height="5.5" rx="1.2" />
                          <rect x="9" y="1.5" width="5.5" height="5.5" rx="1.2" />
                          <rect x="1.5" y="9" width="5.5" height="5.5" rx="1.2" />
                          <rect x="9" y="9" width="5.5" height="5.5" rx="1.2" />
                        </svg>
                      </button>
                      <button
                        onClick={() => setViewMode("list")}
                        className={`p-1.5 rounded-lg transition-all cursor-pointer flex items-center justify-center ${
                          viewMode === "list"
                            ? "bg-[#FAF6EE] text-[#B59410] shadow-sm border border-[#ebdcb9]"
                            : "text-[#888] hover:text-[#2D2D2D] border border-transparent"
                        }`}
                        title="List View"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                          <line x1="2" y1="3.5" x2="14" y2="3.5" />
                          <line x1="2" y1="8" x2="14" y2="8" />
                          <line x1="2" y1="12.5" x2="14" y2="12.5" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Grid / List container */}
              {paginatedProducts.length > 0 ? (
                viewMode === "grid" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {paginatedProducts.map((product) => (
                      <Link href={`/junior/products/${slugify(product.title)}`} key={product.id} className="group flex flex-col bg-white border-2 border-[#E5E5E5] rounded-2xl overflow-hidden hover:border-[#B59410] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300">

                        {/* Thumbnail Container - 3D Notebook Stage */}
                        <div className="relative aspect-[1.45] bg-[#F8F9FA] p-4 flex items-center justify-center border-b-2 border-[#E5E5E5] overflow-hidden group-hover:border-[#B59410]/30 transition-colors [perspective:1000px]">
                          {/* 3D Notebook Object */}
                          <div
                            className="relative w-[50%] aspect-[3/4.2] bg-[#FDFBF7] shadow-md transition-all duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)] [transform-style:preserve-3d] origin-left group-hover:shadow-[12px_15px_20px_rgba(26,26,46,0.12)] group-hover:[transform:rotateY(-18deg)_scale(1.05)_translateY(-4px)]"
                            style={{
                              border: '2px solid #B59410',
                              borderRadius: '4px 10px 10px 4px',
                              willChange: 'transform'
                            }}
                          >
                            <Image
                              src="/assets/images/placeholder-pdfimage.webp"
                              alt={product.title}
                              fill
                              className="object-contain p-1 opacity-95 group-hover:opacity-100 transition-opacity"
                            />

                            {/* Book Spine Shadow */}
                            <div className="absolute inset-y-0 left-0 w-[12%] bg-gradient-to-r from-black/25 via-black/5 to-transparent pointer-events-none z-10" />
                            <div className="absolute inset-y-0 left-[10%] w-[1px] bg-white/20 pointer-events-none z-10" />
                            <div className="absolute inset-y-0 left-[11%] w-[1px] bg-black/10 pointer-events-none z-10" />

                            {/* Pages Thickness (Right Edge) */}
                            <div
                              className="absolute right-0 top-[1.5px] bottom-[1.5px] w-[6px] bg-[#F4EFE0] shadow-inner origin-left transition-all duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)]"
                              style={{
                                transform: 'rotateY(90deg) translateZ(1px)',
                                backgroundImage: 'repeating-linear-gradient(90deg, #E5D5A5 0px, #E5D5A5 1px, transparent 1px, transparent 3px)',
                                borderLeft: '1px solid rgba(181, 148, 16, 0.2)',
                                borderRadius: '0 2px 2px 0'
                              }}
                            />
                          </div>

                          {/* Custom notebook text layer */}
                          <div className="absolute inset-x-0 bottom-2.5 flex flex-col items-center justify-center p-2.5 text-center select-none pointer-events-none z-20">
                            <span className="text-[8px] font-bold text-[#2d2d2d] leading-snug px-1.5 py-0.5 bg-white/80 border border-[#d8d3c9]/60 rounded shadow-sm max-w-[85%] truncate">
                              {product.subject.toUpperCase()}
                            </span>
                          </div>

                          {/* Dynamic Overlays on top of the placeholder */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                            <span className="bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-bold text-[#2D2D2D]">View Details</span>
                            <div className="w-6 h-6 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#B59410]">
                              <ChevronRight className="w-3.5 h-3.5" strokeWidth={3} />
                            </div>
                          </div>
                        </div>

                        {/* Product Info */}
                        <div className="p-3.5 flex flex-col flex-grow">
                          {/* Dynamic tags list */}
                          <div className="flex flex-row flex-wrap gap-1 mb-2">
                            {product.tags.map(tag => {
                              const style = getTagStyles(tag);
                              return (
                                <span
                                  key={tag}
                                  className="relative inline-flex items-center gap-0.5 px-2 py-0.5 text-[8px] font-extrabold uppercase tracking-wider text-white select-none transition-all duration-200 hover:scale-[1.03]"
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
                                  <span className="relative z-10 flex items-center gap-0.5 text-white">
                                    {style.icon}
                                    <span>{tag}</span>
                                  </span>
                                </span>
                              );
                            })}
                          </div>

                          <p className="text-[10px] font-bold text-[#B59410] uppercase tracking-wider mb-0.5">
                            {product.subject}
                          </p>
                          <h3 className="font-bold text-[#2D2D2D] text-xs leading-tight mb-1.5 line-clamp-2 group-hover:text-[#B59410] transition-colors">
                            {product.title}
                          </h3>

                          <div className="flex items-center gap-1 mt-auto mb-2.5">
                            <Star className="w-3 h-3 fill-[#B59410] text-[#B59410]" />
                            <span className="text-[11px] font-bold text-[#2D2D2D]">{product.rating}</span>
                            <span className="text-[9px] text-[#888]">({product.reviews})</span>
                          </div>

                          <div className="flex items-center justify-between mt-auto pt-2.5 border-t border-[#E5E5E5]/50 gap-2">
                            <div className="flex items-baseline gap-1">
                              <span className="text-sm font-bold text-[#2D2D2D]">₹{product.price}</span>
                              <span className="text-[10px] text-[#888] line-through">₹{product.originalPrice}</span>
                            </div>

                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                addToCart({
                                  id: product.id,
                                  title: product.title,
                                  price: product.price,
                                  originalPrice: product.originalPrice,
                                  format: product.format,
                                  exam: product.exam
                                });
                                setCartOpen(true);
                              }}
                              className="px-3 py-1 bg-[#FFDE4D] hover:bg-[#E6C635] text-[#2D2D2D] border border-[#E0BE22] text-[10px] font-extrabold rounded-full transition-all shadow-sm flex items-center gap-1 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                            >
                              <span>Add to Cart</span>
                              <span className="text-[11px] font-extrabold">+</span>
                            </button>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {paginatedProducts.map((product) => (
                      <Link href={`/junior/products/${slugify(product.title)}`} key={product.id} className="group flex flex-col sm:flex-row bg-white border-2 border-[#E5E5E5] rounded-2xl overflow-hidden hover:border-[#B59410] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-0.5 transition-all duration-300">

                        {/* Thumbnail Container (Left side in horizontal layout) */}
                        <div className="relative w-full sm:w-44 md:w-52 aspect-[4/3.8] sm:aspect-[4/3.8] bg-[#F8F9FA] p-4 flex items-center justify-center border-b-2 sm:border-b-0 sm:border-r-2 border-[#E5E5E5] overflow-hidden group-hover:border-[#B59410]/30 flex-shrink-0 transition-colors [perspective:1000px]">
                          {/* 3D Notebook Object */}
                          <div
                            className="relative w-[48%] aspect-[3/4.2] bg-[#FDFBF7] shadow-md transition-all duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)] [transform-style:preserve-3d] origin-left group-hover:shadow-[12px_15px_20px_rgba(26,26,46,0.12)] group-hover:[transform:rotateY(-18deg)_scale(1.05)_translateY(-4px)]"
                            style={{
                              border: '2px solid #B59410',
                              borderRadius: '4px 10px 10px 4px',
                              willChange: 'transform'
                            }}
                          >
                            <Image
                              src="/assets/images/placeholder-pdfimage.webp"
                              alt={product.title}
                              fill
                              className="object-contain p-1 opacity-95 group-hover:opacity-100 transition-opacity"
                            />

                            {/* Book Spine Shadow */}
                            <div className="absolute inset-y-0 left-0 w-[12%] bg-gradient-to-r from-black/25 via-black/5 to-transparent pointer-events-none z-10" />
                            <div className="absolute inset-y-0 left-[10%] w-[1px] bg-white/20 pointer-events-none z-10" />
                            <div className="absolute inset-y-0 left-[11%] w-[1px] bg-black/10 pointer-events-none z-10" />

                            {/* Pages Thickness (Right Edge) */}
                            <div
                              className="absolute right-0 top-[1.5px] bottom-[1.5px] w-[6px] bg-[#F4EFE0] shadow-inner origin-left transition-all duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)]"
                              style={{
                                transform: 'rotateY(90deg) translateZ(1px)',
                                backgroundImage: 'repeating-linear-gradient(90deg, #E5D5A5 0px, #E5D5A5 1px, transparent 1px, transparent 3px)',
                                borderLeft: '1px solid rgba(181, 148, 16, 0.2)',
                                borderRadius: '0 2px 2px 0'
                              }}
                            />
                          </div>

                          {/* Custom notebook text layer */}
                          <div className="absolute inset-x-0 bottom-2.5 flex flex-col items-center justify-center p-2.5 text-center select-none pointer-events-none z-20">
                            <span className="text-[8px] font-bold text-[#2d2d2d] leading-snug px-1.5 py-0.5 bg-white/80 border border-[#d8d3c9]/60 rounded shadow-sm max-w-[85%] truncate">
                              {product.subject.toUpperCase()}
                            </span>
                          </div>

                          {/* Hover Details Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                            <span className="bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded text-[10px] font-bold text-[#2D2D2D]">View Details</span>
                            <div className="w-6 h-6 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#B59410]">
                              <ChevronRight className="w-3 h-3" strokeWidth={3} />
                            </div>
                          </div>
                        </div>

                        {/* Product Info (Right side in horizontal layout) */}
                        <div className="p-5 flex flex-col flex-grow justify-between">
                          <div>
                            {/* Tags */}
                            <div className="flex flex-row flex-wrap gap-1 mb-2">
                              {product.tags.map(tag => {
                                const style = getTagStyles(tag);
                                return (
                                  <span
                                    key={tag}
                                    className="relative inline-flex items-center gap-0.5 px-2 py-0.5 text-[8px] font-extrabold uppercase tracking-wider text-white select-none transition-all duration-200 hover:scale-[1.03]"
                                  >
                                    <span
                                      className={`absolute inset-0 rounded-[6px] border ${style.bgClass} ${style.borderClass} pointer-events-none`}
                                      style={{
                                        filter: "url(#heavySketch)",
                                        transform: 'translateZ(0)',
                                        backfaceVisibility: 'hidden',
                                        willChange: 'filter, transform'
                                      }}
                                    />
                                    <span className="relative z-10 flex items-center gap-0.5 text-white">
                                      {style.icon}
                                      <span>{tag}</span>
                                    </span>
                                  </span>
                                );
                              })}
                            </div>

                            <p className="text-[10px] font-bold text-[#B59410] uppercase tracking-wider mb-0.5">
                              {product.subject}
                            </p>
                            <h3 className="font-bold text-[#2D2D2D] text-sm leading-tight mb-2 line-clamp-2 group-hover:text-[#B59410] transition-colors">
                              {product.title}
                            </h3>

                            <p className="text-xs text-[#4A4A4A] line-clamp-2 mb-3">
                              {product.description}
                            </p>

                            <div className="flex items-center gap-1 mb-3">
                              <Star className="w-3 h-3 fill-[#B59410] text-[#B59410]" />
                              <span className="text-[11px] font-bold text-[#2D2D2D]">{product.rating}</span>
                              <span className="text-[9px] text-[#888]">({product.reviews})</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-3 border-t border-[#E5E5E5]/50 gap-3">
                            <div className="flex items-baseline gap-1">
                              <span className="text-sm font-bold text-[#2D2D2D]">₹{product.price}</span>
                              <span className="text-[10px] text-[#888] line-through">₹{product.originalPrice}</span>
                            </div>

                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                addToCart({
                                  id: product.id,
                                  title: product.title,
                                  price: product.price,
                                  originalPrice: product.originalPrice,
                                  format: product.format,
                                  exam: product.exam
                                });
                                setCartOpen(true);
                              }}
                              className="px-4 py-1.5 bg-[#FFDE4D] hover:bg-[#E6C635] text-[#2D2D2D] border border-[#E0BE22] text-[10px] font-extrabold rounded-full transition-all shadow-sm flex items-center gap-1 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                            >
                              <span>Add to Cart</span>
                              <span className="text-[11px] font-extrabold">+</span>
                            </button>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )
              ) : (
                <div className="text-center py-16">
                  <p className="text-lg font-bold text-[#4A4A4A]">No products found</p>
                  <button
                    onClick={handleClearAll}
                    className="mt-4 px-6 py-2 bg-[#B59410] text-white font-bold rounded-lg hover:bg-[#9a7d0a] transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-12 flex-wrap">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="p-2 border border-[#d8d3c9] rounded-lg hover:bg-[#FDFBF7] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  {getPageNumbers().map((page, idx) => (
                    <button
                      key={idx}
                      onClick={() => typeof page === "number" && setCurrentPage(page)}
                      disabled={page === "..."}
                      className={`px-3 py-2 rounded-lg font-bold transition-colors ${
                        currentPage === page
                          ? "bg-[#B59410] text-white"
                          : page === "..."
                          ? "cursor-not-allowed"
                          : "border border-[#d8d3c9] hover:bg-[#FDFBF7]"
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 border border-[#d8d3c9] rounded-lg hover:bg-[#FDFBF7] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
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

export default function JuniorProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-4 border-[#B59410]/20 border-t-[#B59410]"></div></div>}>
      <JuniorProductsPageContent />
    </Suspense>
  );
}
