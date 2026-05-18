"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, ChevronDown, ChevronLeft, ChevronRight, Star, Filter, SlidersHorizontal, X } from "lucide-react";

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

function ProductsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addToCart, setCartOpen } = useCart();

  // Active filters states
  const [selectedExam, setSelectedExam] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("Popularity");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Custom sidebar filter states
  const [maxPrice, setMaxPrice] = useState(2000);
  const [minRating, setMinRating] = useState(0);

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

  // Collapsible sections
  const [isExamOpen, setIsExamOpen] = useState(true);
  const [isTypeOpen, setIsTypeOpen] = useState(true);
  const [isRatingOpen, setIsRatingOpen] = useState(true);
  const [isViewMoreExams, setIsViewMoreExams] = useState(false);

  // Sync URL search params with state
  useEffect(() => {
    const examParam = searchParams.get("exam");
    if (examParam) {
      setSelectedExam(examParam.toLowerCase());
    } else {
      setSelectedExam("all");
    }
  }, [searchParams]);

  // Handle Exam Selection (Category Pills)
  const handleExamChange = (examId: string) => {
    setSelectedExam(examId);
    setCurrentPage(1);
    const params = new URLSearchParams(window.location.search);
    if (examId === "all") {
      params.delete("exam");
    } else {
      params.set("exam", examId);
    }
    const searchStr = params.toString();
    router.push(searchStr ? `/products?${searchStr}` : "/products");
  };

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
    setSelectedPrice("");
    setSelectedFormats([]);
    setSearchQuery("");
    setSelectedExam("all");
    setMaxPrice(2000);
    setMinRating(0);
    router.push("/products");
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

    // 2. Exam category tabs & checkboxes
    if (selectedExam !== "all" && product.exam !== selectedExam) {
      return false;
    }

    // 3. Subjects list (OR selection)
    if (selectedSubjects.length > 0 && !selectedSubjects.includes(product.subject)) {
      return false;
    }

    // 4. Price range slider logic
    if (maxPrice < 2000 && product.price > maxPrice) {
      return false;
    }

    // 5. Rating filter logic
    if (minRating > 0 && product.rating < minRating) {
      return false;
    }

    // 6. Formats list (OR selection)
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
      // Always show page 1
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

      // Always show last page
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-[#B59410]/30">
      <Navbar />

      <main className="flex-grow pt-8 pb-16">
        <div className="mb-20 max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20">
          
          {/* Header Section */}
          <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex flex-col">
              <div className="flex items-center text-xs text-[#888] font-semibold mb-3">
                <Link href="/" className="hover:text-[#2D2D2D] transition-colors">Home</Link>
                <ChevronRight className="w-3 h-3 mx-2" />
                <span className="text-[#4A4A4A]">All Products</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-sketch text-[#2D2D2D] mb-3">All Study Materials</h1>
              <p className="text-sm text-[#4A4A4A] max-w-lg">AI-generated visual notes, mind maps & smart study materials for all major competitive exams.</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden md:block">
                <svg width="64" height="40" viewBox="0 0 64 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#9A8C78] opacity-60 -mr-2">
                  <path d="M14.5 12L4 23L16 28L14.5 12Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
                  <path d="M16 28L18 35L14.5 12" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
                  <path d="M16 28L25 21" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
                  <path d="M20 35 C 24 40, 30 40, 32 34 C 34 28, 28 26, 26 30 C 24 34, 28 38, 36 34 C 42 30, 48 20, 56 16" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" strokeLinecap="round" fill="none"/>
                </svg>
              </div>
              
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
                  placeholder="Search for topics, exams, notes..."
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

          {/* Exam Category Tabs */}
          <div className="mb-10 flex items-center gap-3 overflow-x-auto pb-3 scrollbar-none" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {[
              { id: "all", label: "All Exams", count: 256 },
              { id: "upsc", label: "UPSC Civil Services", count: 48 },
              { id: "ssc", label: "SSC Exams", count: 36 },
              { id: "banking", label: "Banking Exams", count: 32 },
              { id: "state", label: "State PSC Exams", count: 28 },
              { id: "railways", label: "Railways", count: 22 },
            ].map((exam) => {
              const displayLabel = `${exam.label} (${exam.count})`;
              const isSelected = selectedExam === exam.id;
              return (
                <button
                  key={exam.id}
                  onClick={() => handleExamChange(exam.id)}
                  className={`px-5 py-2.5 text-sm font-semibold rounded-xl whitespace-nowrap transition-all border duration-200 cursor-pointer ${
                    isSelected
                      ? "bg-[#B59410] border-[#B59410] text-white shadow-sm"
                      : "bg-[#FDFBF7] border-[#d8d3c9] text-[#555] hover:text-[#2D2D2D] hover:border-[#2D2D2D]/40"
                  }`}
                >
                  {displayLabel}
                </button>
              );
            })}
            <button className="px-5 py-2.5 bg-[#FDFBF7] border border-[#d8d3c9] text-[#555] hover:text-[#2D2D2D] hover:border-[#2D2D2D]/40 text-sm font-semibold rounded-xl whitespace-nowrap flex items-center gap-1.5 transition-all cursor-pointer">
              All Categories <ChevronDown className="w-4 h-4 text-[#888]" />
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="bg-[#FDFBF7]/60 border border-[#E2D4B7] rounded-[20px] p-5 sticky top-28 shadow-sm">
                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                  <span className="font-bold text-base text-[#2D2D2D]">Filters</span>
                  {(selectedFormats.length > 0 || selectedExam !== "all" || maxPrice < 2000 || minRating > 0) && (
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
                  {/* Exam Section */}
                  <div className="py-4 border-b border-[#ebdcb9]/40 first:pt-0">
                    <button 
                      onClick={() => setIsExamOpen(!isExamOpen)}
                      className="flex items-center justify-between w-full font-bold text-sm text-[#2D2D2D] mb-3 cursor-pointer text-left focus:outline-none"
                    >
                      <span>Exam</span>
                      <ChevronDown className={`w-4 h-4 text-[#888] transition-transform duration-200 ${isExamOpen ? "rotate-180" : ""}`} />
                    </button>
                    
                    {isExamOpen && (
                      <div className="space-y-2.5 transition-all duration-200">
                        {/* All Exams checkbox */}
                        <label className="flex items-center justify-between cursor-pointer group py-0.5">
                          <div className="flex items-center gap-3">
                            <div className="relative flex items-center justify-center w-5 h-5 flex-shrink-0">
                              <input 
                                type="checkbox" 
                                checked={selectedExam === "all"}
                                onChange={() => handleExamChange("all")}
                                className="peer appearance-none w-5 h-5 border border-[#c5beaf] rounded-[5px] checked:bg-[#B59410] checked:border-[#B59410] transition-all cursor-pointer bg-white" 
                              />
                              <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none stroke-[2.5]" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.5 5L5 8.5L12.5 1" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                            <span className="text-sm font-medium text-[#4a463e]">All Exams</span>
                          </div>
                        </label>

                        {/* Individual Exams */}
                        {[
                          { id: "upsc", label: "UPSC Civil Services", count: 48 },
                          { id: "ssc", label: "SSC Exams", count: 36 },
                          { id: "banking", label: "Banking Exams", count: 32 },
                          { id: "state", label: "State PSC Exams", count: 28 },
                          { id: "railways", label: "Railways", count: 22 },
                          { id: "teaching", label: "Teaching Exams", count: 18 },
                          { id: "defence", label: "Defence Exams", count: 14 },
                        ].slice(0, isViewMoreExams ? undefined : 5).map((exam) => {
                          const isChecked = selectedExam === exam.id;
                          return (
                            <label key={exam.id} className="flex items-center justify-between cursor-pointer group py-0.5">
                              <div className="flex items-center gap-3">
                                <div className="relative flex items-center justify-center w-5 h-5 flex-shrink-0">
                                  <input 
                                    type="checkbox" 
                                    checked={isChecked}
                                    onChange={() => handleExamChange(isChecked ? "all" : exam.id)}
                                    className="peer appearance-none w-5 h-5 border border-[#c5beaf] rounded-[5px] checked:bg-[#B59410] checked:border-[#B59410] transition-all cursor-pointer bg-white" 
                                  />
                                  <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none stroke-[2.5]" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1.5 5L5 8.5L12.5 1" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                </div>
                                <span className="text-sm font-medium text-[#4a463e]">{exam.label}</span>
                              </div>
                              <span className="text-xs text-[#888] font-medium font-sans">({exam.count})</span>
                            </label>
                          );
                        })}

                        {/* View More button */}
                        <button 
                          onClick={() => setIsViewMoreExams(!isViewMoreExams)}
                          className="flex items-center gap-1 text-xs font-semibold text-[#888] hover:text-[#B59410] pt-1 cursor-pointer animate-pulse-subtle"
                        >
                          <span>{isViewMoreExams ? "View Less" : "View More"}</span>
                          <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isViewMoreExams ? "rotate-180" : ""}`} />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Type Section */}
                  <div className="py-4 border-b border-[#ebdcb9]/40">
                    <button 
                      onClick={() => setIsTypeOpen(!isTypeOpen)}
                      className="flex items-center justify-between w-full font-bold text-sm text-[#2D2D2D] mb-3 cursor-pointer text-left focus:outline-none"
                    >
                      <span>Type</span>
                      <ChevronDown className={`w-4 h-4 text-[#888] transition-transform duration-200 ${isTypeOpen ? "rotate-180" : ""}`} />
                    </button>

                    {isTypeOpen && (
                      <div className="space-y-2.5">
                        {[
                          { label: "Visual Notes", count: 128 },
                          { label: "Mind Maps", count: 64 },
                          { label: "PYQs & Solutions", count: 32 },
                          { label: "Tests & Quizzes", count: 18 },
                          { label: "Audio Books", count: 8 },
                          { label: "Combo Packs", count: 6 },
                        ].map((type) => {
                          const isChecked = selectedFormats.includes(type.label);
                          return (
                            <label key={type.label} className="flex items-center justify-between cursor-pointer group py-0.5">
                              <div className="flex items-center gap-3">
                                <div className="relative flex items-center justify-center w-5 h-5 flex-shrink-0">
                                  <input 
                                    type="checkbox" 
                                    checked={isChecked}
                                    onChange={() => handleFormatToggle(type.label)}
                                    className="peer appearance-none w-5 h-5 border border-[#c5beaf] rounded-[5px] checked:bg-[#B59410] checked:border-[#B59410] transition-all cursor-pointer bg-white" 
                                  />
                                  <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none stroke-[2.5]" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1.5 5L5 8.5L12.5 1" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                </div>
                                <span className="text-sm font-medium text-[#4a463e]">{type.label}</span>
                              </div>
                              <span className="text-xs text-[#888] font-medium font-sans">({type.count})</span>
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
                      <Link href={`/products/${product.id}`} key={product.id} className="group flex flex-col bg-white border-2 border-[#E5E5E5] rounded-2xl overflow-hidden hover:border-[#B59410] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300">
                        
                        {/* Thumbnail Container */}
                        <div className="relative aspect-[1.45] bg-[#F8F9FA] p-4 flex items-center justify-center border-b-2 border-[#E5E5E5] overflow-hidden group-hover:border-[#B59410]/30 transition-colors">
                          {/* Using the PDF Placeholder Image as base layer */}
                          <Image 
                            src="/assets/images/placeholder-pdfimage.webp"
                            alt={product.title}
                            fill
                            className="object-contain p-3 drop-shadow-md group-hover:scale-105 transition-transform duration-500"
                          />
                          
                          {/* Custom notebook text layer for dynamically visual and creative covers */}
                          <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-center select-none pointer-events-none">
                            <span className="text-[9px] tracking-widest uppercase font-bold text-[#888]/80 mb-0.5">
                              {product.exam.toUpperCase()} PREP
                            </span>
                            <span className="text-xs font-bold text-[#2d2d2d] leading-snug px-2 bg-white/40 backdrop-blur-[1px] border border-[#d8d3c9]/40 rounded py-0.5 line-clamp-2 max-w-[85%] shadow-sm">
                              {product.subject.toUpperCase()}
                            </span>
                            <span className="text-[8px] uppercase tracking-wider font-semibold text-[#B59410] mt-1">
                              {product.format}
                            </span>
                          </div>

                          {/* Dynamic Overlays on top of the placeholder to make it unique */}
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
                      <Link href={`/products/${product.id}`} key={product.id} className="group flex flex-col sm:flex-row bg-white border-2 border-[#E5E5E5] rounded-2xl overflow-hidden hover:border-[#B59410] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-0.5 transition-all duration-300">
                        
                        {/* Thumbnail Container (Left side in horizontal layout) */}
                        <div className="relative w-full sm:w-44 md:w-52 aspect-[4/3.8] sm:aspect-[4/3.8] bg-[#F8F9FA] p-4 flex items-center justify-center border-b-2 sm:border-b-0 sm:border-r-2 border-[#E5E5E5] overflow-hidden group-hover:border-[#B59410]/30 flex-shrink-0 transition-colors">
                          <Image 
                            src="/assets/images/placeholder-pdfimage.webp"
                            alt={product.title}
                            fill
                            className="object-contain p-3 drop-shadow-md group-hover:scale-105 transition-transform duration-500"
                          />
                          
                          {/* Custom notebook text layer */}
                          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center select-none pointer-events-none">
                            <span className="text-[9px] tracking-widest uppercase font-bold text-[#888]/80 mb-1">
                              {product.exam.toUpperCase()} PREP
                            </span>
                            <span className="text-xs font-bold text-[#2d2d2d] leading-snug px-2 bg-white/40 backdrop-blur-[1px] border border-[#d8d3c9]/40 rounded py-1 line-clamp-3 max-w-[85%] shadow-sm">
                              {product.subject.toUpperCase()}
                            </span>
                            <span className="text-[8px] uppercase tracking-wider font-semibold text-[#B59410] mt-1">
                              {product.format}
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
                          <div className="flex flex-col gap-1.5">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-bold text-[#B59410] uppercase tracking-wider">
                                {product.subject} &bull; {product.format}
                              </span>
                              <span className="px-2.5 py-0.5 bg-[#FAF6EE] text-[#B59410] border border-[#ebdcb9] text-[10px] font-bold uppercase tracking-wider rounded-full">
                                {product.exam.toUpperCase()}
                              </span>
                            </div>
                            
                            {/* Dynamic tags list */}
                            <div className="flex flex-row flex-wrap gap-1.5 my-1">
                              {product.tags.map(tag => {
                                const style = getTagStyles(tag);
                                return (
                                  <span 
                                    key={tag} 
                                    className="relative inline-flex items-center gap-1 px-2.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-white select-none transition-all duration-200 hover:scale-[1.03]"
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

                            <h3 className="font-bold text-[#2D2D2D] text-base md:text-lg leading-snug group-hover:text-[#B59410] transition-colors line-clamp-2">
                              {product.title}
                            </h3>
                            <div className="flex items-center gap-1.5 mt-1">
                              <div className="flex items-center gap-1">
                                <Star className="w-3.5 h-3.5 fill-[#B59410] text-[#B59410]" />
                                <span className="text-xs font-bold text-[#2D2D2D]">{product.rating}</span>
                              </div>
                              <span className="text-xs text-[#888]">({product.reviews} student reviews)</span>
                            </div>
                            <p className="text-xs text-[#4A4A4A] mt-2 line-clamp-2 leading-relaxed">
                              Complete hand-written premium revisions, detailed mapping of essential standard references, comprehensive practice sets, and meticulously structured visual aids to fast-track your {product.exam.toUpperCase()} success.
                            </p>
                          </div>

                          <div className="flex flex-row sm:items-center justify-between mt-4 pt-4 border-t border-[#E5E5E5]/50 gap-4">
                            <div className="flex items-baseline gap-2">
                              <span className="text-xl md:text-2xl font-bold text-[#2D2D2D]">₹{product.price}</span>
                              <span className="text-xs md:text-sm text-[#888] line-through">₹{product.originalPrice}</span>
                              <span className="text-[10px] font-bold text-green-600 bg-green-50 border border-green-100 px-1.5 py-0.5 rounded">
                                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                              </span>
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
                              className="px-4 py-1.5 bg-[#FFDE4D] hover:bg-[#E6C635] text-[#2D2D2D] border border-[#E0BE22] text-xs font-extrabold rounded-full transition-all shadow-sm flex items-center gap-1.5 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                            >
                              <span>Add to Cart</span>
                              <span className="text-[13px] font-extrabold">+</span>
                            </button>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center bg-white border-2 border-dashed border-[#E5E5E5] rounded-2xl p-8">
                  <div className="w-16 h-16 bg-[#FDFBF7] rounded-full flex items-center justify-center text-[#B59410] mb-4">
                    <Filter className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-[#2D2D2D] mb-1">No study materials match your filters</h3>
                  <p className="text-sm text-[#4A4A4A] max-w-sm mb-6">Try relaxing your search terms or checking different subjects, pricing, or formats.</p>
                  <button 
                    onClick={handleClearAll}
                    className="px-6 py-2.5 bg-[#B59410] hover:bg-[#9E810E] text-white font-bold text-sm rounded-xl transition-all cursor-pointer shadow-sm"
                  >
                    Reset All Filters
                  </button>
                </div>
              )}

              {/* Pagination Bar */}
              <div className="mt-12 pt-6 border-t border-[#E5E5E5]/60 flex flex-col md:flex-row items-center justify-between gap-6">
                {/* Left: Showing stats */}
                <div className="text-sm text-[#4A4A4A] font-sans font-medium order-2 md:order-1">
                  Showing <span className="font-bold text-[#2D2D2D]">{displayStartIndex}</span> to <span className="font-bold text-[#2D2D2D]">{displayEndIndex}</span> of <span className="font-bold text-[#2D2D2D]">{sortedProducts.length}</span> products
                </div>

                {/* Center: Pagination controls */}
                {totalPages > 1 && (
                  <div className="flex items-center gap-1.5 order-1 md:order-2">
                    <button 
                      disabled={currentPage === 1}
                      onClick={() => {
                        setCurrentPage(p => Math.max(1, p - 1));
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="w-10 h-10 rounded-xl border-2 border-[#E5E5E5] flex items-center justify-center text-[#4A4A4A] hover:border-[#B59410] hover:text-[#B59410] disabled:opacity-40 disabled:hover:border-[#E5E5E5] disabled:hover:text-[#4A4A4A] transition-colors bg-white cursor-pointer shadow-sm"
                    >
                      <ChevronLeft className="w-4 h-4" strokeWidth={2.5} />
                    </button>

                    {getPageNumbers().map((page, idx) => {
                      if (page === "...") {
                        return (
                          <span key={`dots-${idx}`} className="w-8 h-10 flex items-center justify-center text-[#888] font-medium font-sans">
                            ...
                          </span>
                        );
                      }
                      return (
                        <button 
                          key={`page-${page}`} 
                          onClick={() => {
                            setCurrentPage(Number(page));
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className={`w-10 h-10 rounded-xl text-sm font-bold transition-all cursor-pointer flex items-center justify-center font-sans ${
                            page === currentPage 
                              ? "bg-[#B59410] text-white border-2 border-[#B59410] shadow-md shadow-[#B59410]/20" 
                              : "bg-white border-2 border-[#E5E5E5] text-[#4A4A4A] hover:border-[#B59410] hover:text-[#B59410]"
                          }`}
                        >
                          {page}
                        </button>
                      );
                    })}

                    <button 
                      disabled={currentPage === totalPages}
                      onClick={() => {
                        setCurrentPage(p => Math.min(totalPages, p + 1));
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="w-10 h-10 rounded-xl border-2 border-[#E5E5E5] flex items-center justify-center text-[#4A4A4A] hover:border-[#B59410] hover:text-[#B59410] disabled:opacity-40 disabled:hover:border-[#E5E5E5] disabled:hover:text-[#4A4A4A] transition-colors bg-white cursor-pointer shadow-sm"
                    >
                      <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
                    </button>
                  </div>
                )}

                {/* Right: Items per page dropdown */}
                <div className="flex items-center gap-2 order-3">
                  <span className="text-sm text-[#4A4A4A] font-sans font-medium">Show:</span>
                  <div className="relative inline-block text-left">
                    <select
                      value={itemsPerPage}
                      onChange={(e) => {
                        setItemsPerPage(Number(e.target.value));
                        setCurrentPage(1);
                      }}
                      className="appearance-none bg-white border-2 border-[#E5E5E5] rounded-xl px-4 py-2 pr-8 text-sm font-bold text-[#2D2D2D] hover:border-[#B59410] focus:border-[#B59410] focus:outline-none transition-all cursor-pointer font-sans shadow-sm"
                    >
                      <option value={8}>8 per page</option>
                      <option value={12}>12 per page</option>
                      <option value={16}>16 per page</option>
                      <option value={24}>24 per page</option>
                      <option value={32}>32 per page</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#888]">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Mobile Filter Sheet Backdrop */}
        <div
          className={`fixed inset-0 bg-[#2D2D2D]/60 backdrop-blur-[3px] transition-all duration-300 z-50 lg:hidden ${
            mobileFilterOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setMobileFilterOpen(false)}
        />

        {/* Mobile Filter Drawer Sheet */}
        <div
          className={`fixed left-0 bottom-0 w-full h-[82vh] bg-[#FDFBF7] rounded-t-[30px] border-t-4 border-[#2D2D2D] shadow-2xl transition-transform duration-300 z-50 flex flex-col lg:hidden ${
            mobileFilterOpen ? "translate-y-0" : "translate-y-full"
          }`}
        >
          {/* Drag Handle Indicator */}
          <div className="w-12 h-1.5 bg-[#2D2D2D]/20 rounded-full mx-auto my-3 shrink-0" />

          {/* Header */}
          <div className="px-6 pb-4 border-b border-[#2D2D2D]/10 flex items-center justify-between bg-[#FDFBF7] shrink-0">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-[#B59410]" />
              <h3 className="font-sketch text-2xl font-bold text-[#2D2D2D]">Filters</h3>
              {(selectedFormats.length > 0 || selectedExam !== "all" || maxPrice < 2000 || minRating > 0) && (
                <span className="bg-[#B59410]/10 text-[#B59410] border border-[#B59410]/20 font-bold px-2 py-0.5 rounded-full text-[10px] font-sans">
                  Active
                </span>
              )}
            </div>
            <div className="flex items-center gap-3">
              {(selectedFormats.length > 0 || selectedExam !== "all" || maxPrice < 2000 || minRating > 0) && (
                <button
                  onClick={() => {
                    handleClearAll();
                  }}
                  className="text-xs font-bold text-[#888] hover:text-[#B59410] cursor-pointer"
                >
                  Clear All
                </button>
              )}
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1.5 rounded-full hover:bg-[#2D2D2D]/5 transition-colors"
              >
                <X className="w-5 h-5 text-[#2D2D2D]" />
              </button>
            </div>
          </div>

          {/* Scrollable Filters Content */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
            {/* Exam Section */}
            <div className="py-2 border-b border-[#ebdcb9]/40">
              <h4 className="font-bold text-sm text-[#2D2D2D] mb-3">Exam</h4>
              <div className="space-y-3">
                {/* All Exams checkbox */}
                <label className="flex items-center justify-between cursor-pointer group py-0.5">
                  <div className="flex items-center gap-3">
                    <div className="relative flex items-center justify-center w-5 h-5 flex-shrink-0">
                      <input 
                        type="checkbox" 
                        checked={selectedExam === "all"}
                        onChange={() => handleExamChange("all")}
                        className="peer appearance-none w-5 h-5 border border-[#c5beaf] rounded-[5px] checked:bg-[#B59410] checked:border-[#B59410] transition-all cursor-pointer bg-white" 
                      />
                      <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none stroke-[2.5]" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.5 5L5 8.5L12.5 1" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="text-sm font-semibold text-[#4a463e]">All Exams</span>
                  </div>
                </label>

                {/* Individual Exams */}
                {[
                  { id: "upsc", label: "UPSC Civil Services", count: 48 },
                  { id: "ssc", label: "SSC Exams", count: 36 },
                  { id: "banking", label: "Banking Exams", count: 32 },
                  { id: "state", label: "State PSC Exams", count: 28 },
                  { id: "railways", label: "Railways", count: 22 },
                  { id: "teaching", label: "Teaching Exams", count: 18 },
                  { id: "defence", label: "Defence Exams", count: 14 },
                ].map((exam) => {
                  const isChecked = selectedExam === exam.id;
                  return (
                    <label key={exam.id} className="flex items-center justify-between cursor-pointer group py-0.5">
                      <div className="flex items-center gap-3">
                        <div className="relative flex items-center justify-center w-5 h-5 flex-shrink-0">
                          <input 
                            type="checkbox" 
                            checked={isChecked}
                            onChange={() => handleExamChange(isChecked ? "all" : exam.id)}
                            className="peer appearance-none w-5 h-5 border border-[#c5beaf] rounded-[5px] checked:bg-[#B59410] checked:border-[#B59410] transition-all cursor-pointer bg-white" 
                          />
                          <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none stroke-[2.5]" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.5 5L5 8.5L12.5 1" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <span className="text-sm font-semibold text-[#4a463e]">{exam.label}</span>
                      </div>
                      <span className="text-xs text-[#888] font-bold font-sans">({exam.count})</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Type Section */}
            <div className="py-2 border-b border-[#ebdcb9]/40">
              <h4 className="font-bold text-sm text-[#2D2D2D] mb-3">Type</h4>
              <div className="space-y-3">
                {[
                  { label: "Visual Notes", count: 128 },
                  { label: "Mind Maps", count: 64 },
                  { label: "PYQs & Solutions", count: 32 },
                  { label: "Tests & Quizzes", count: 18 },
                  { label: "Audio Books", count: 8 },
                  { label: "Combo Packs", count: 6 },
                ].map((type) => {
                  const isChecked = selectedFormats.includes(type.label);
                  return (
                    <label key={type.label} className="flex items-center justify-between cursor-pointer group py-0.5">
                      <div className="flex items-center gap-3">
                        <div className="relative flex items-center justify-center w-5 h-5 flex-shrink-0">
                          <input 
                            type="checkbox" 
                            checked={isChecked}
                            onChange={() => handleFormatToggle(type.label)}
                            className="peer appearance-none w-5 h-5 border border-[#c5beaf] rounded-[5px] checked:bg-[#B59410] checked:border-[#B59410] transition-all cursor-pointer bg-white" 
                          />
                          <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none stroke-[2.5]" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.5 5L5 8.5L12.5 1" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <span className="text-sm font-semibold text-[#4a463e]">{type.label}</span>
                      </div>
                      <span className="text-xs text-[#888] font-bold font-sans">({type.count})</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Price Range Section */}
            <div className="py-2 border-b border-[#ebdcb9]/40">
              <h4 className="font-bold text-sm text-[#2D2D2D] mb-3">Price Range</h4>
              <div className="space-y-4">
                <div className="relative pt-4 pb-2">
                  <div className="h-1 bg-[#E8E1D5] rounded-full w-full relative">
                    <div 
                      className="absolute h-full bg-[#B59410] rounded-full"
                      style={{ left: '0%', right: `${100 - (maxPrice / 2000) * 100}%` }}
                    />
                  </div>
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
                  <div 
                    className="absolute w-4 h-4 bg-[#B59410] rounded-full top-1/2 -translate-y-1/2 -ml-2 pointer-events-none"
                    style={{ left: '0%' }}
                  />
                  <div 
                    className="absolute w-4 h-4 bg-[#B59410] rounded-full top-1/2 -translate-y-1/2 -ml-2 pointer-events-none"
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
            <div className="py-2">
              <h4 className="font-bold text-sm text-[#2D2D2D] mb-3">Rating</h4>
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
          </div>

          {/* Sticky Apply Button */}
          <div className="p-4 bg-[#FFFDF9] border-t-2 border-[#2D2D2D]/10 shrink-0">
            <button
              onClick={() => setMobileFilterOpen(false)}
              className="w-full py-3 bg-[#FFDE4D] hover:bg-[#E6C635] text-[#2D2D2D] border-2 border-[#2D2D2D] font-bold rounded-xl transition-all cursor-pointer shadow-sm text-center font-sketch"
              style={{
                borderRadius: "3px 5px 2px 4px / 4px 3px 5px 2px",
              }}
            >
              Apply Filters ({sortedProducts.length} Results)
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#B59410]/20 border-t-[#B59410] rounded-full animate-spin"></div>
          <p className="text-[#4A4A4A] font-semibold text-sm">Loading exam study materials...</p>
        </div>
      </div>
    }>
      <ProductsPageContent />
    </Suspense>
  );
}
