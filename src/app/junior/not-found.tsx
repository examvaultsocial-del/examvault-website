import Link from "next/link";
import JuniorNavbar from "@/app/JuniorNavbar";
import Footer from "@/app/landingpage/footer";

export const metadata = {
  title: "Page Not Found - ExamVault Junior",
  description: "The page you're looking for doesn't exist. Let's get you back on track!",
};

export default function JuniorNotFound() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <JuniorNavbar />

      <main className="flex-grow flex items-center justify-center py-20 px-6">
        <div className="max-w-md w-full text-center">
          <div className="relative bg-[#FDFBF7] p-12 border-2 border-[#2D2D2D] rounded-[24px] shadow-sm select-none"
               style={{ filter: "url(#heavySketch)" }}>

            {/* 404 Illustration */}
            <div className="text-7xl mb-6 animate-bounce" style={{ animationDuration: "2s" }}>
              🔍
            </div>

            {/* Heading */}
            <h1 className="text-5xl font-sketch text-[#2D2D2D] mb-3">
              404
            </h1>

            <h2 className="text-2xl font-bold font-sketch mb-4 text-[#2D2D2D]">
              Oops! Page Not Found
            </h2>

            {/* Description */}
            <p className="text-sm text-[#4A4A4A] leading-relaxed mb-8">
              The page you're looking for doesn't exist or has been moved. Let's get you back to learning with ExamVault Junior!
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              <Link
                href="/junior"
                className="inline-flex py-3 px-6 bg-[#B59410] hover:bg-[#9a7d0a] text-white border-2 border-[#B59410] font-extrabold rounded-full transition-all shadow-sm items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Back to Home</span>
              </Link>

              <Link
                href="/junior/products"
                className="inline-flex py-3 px-6 bg-white hover:bg-[#FDFBF7] text-[#2D2D2D] border-2 border-[#2D2D2D] font-extrabold rounded-full transition-all shadow-sm items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Browse Books</span>
              </Link>
            </div>

            {/* Decorative Element */}
            <div className="mt-8 pt-6 border-t border-[#2D2D2D]/10">
              <p className="text-[10px] uppercase tracking-widest font-bold text-[#4A4A4A]/60">
                Need Help?
              </p>
              <Link
                href="/junior/coming-soon?feature=Support"
                className="text-xs font-bold text-[#B59410] hover:text-[#2D2D2D] transition-colors mt-2 inline-block"
              >
                Contact Support →
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
