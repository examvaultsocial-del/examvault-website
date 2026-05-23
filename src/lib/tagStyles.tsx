import React from "react";

export interface TagStyle {
  bgClass: string;
  borderClass: string;
  icon: React.ReactNode;
}

export const getTagStyles = (tag: string): TagStyle => {
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
