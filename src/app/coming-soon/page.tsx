import React, { Suspense } from "react";
import Navbar from "../Navbar";
import Footer from "../landingpage/footer";
import ComingSoonContent from "./ComingSoonContent";

export const metadata = {
  title: "Coming Soon - ExamVault",
  description: "Exciting updates are coming to ExamVault. Join our active preparation communities to stay ahead and get notified on launch!",
};

export default function ComingSoonPage() {
  return (
    <main className="min-h-screen w-full flex flex-col p-4 md:p-6 lg:p-1 pt-2 md:pt-4 relative overflow-hidden">
      <Navbar />
      
      {/* Dynamic Content wrapped in hydration-safe Suspense */}
      <Suspense fallback={
        <div className="flex-1 flex flex-col items-center justify-center py-32 space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#2D2D2D]/20 border-t-[#B59410]"></div>
          <p className="text-sm font-bold text-[#4A4A4A] animate-pulse">Loading coming soon playground...</p>
        </div>
      }>
        <ComingSoonContent />
      </Suspense>
      
      <Footer />
    </main>
  );
}
