"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Sparkles, Download, Lock, ArrowRight, Home, AlertTriangle, BookOpen } from "lucide-react";
import Navbar from "@/app/Navbar";
import Footer from "@/app/landingpage/footer";
import SketchButton from "@/components/SketchButton";

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [downloadLinks, setDownloadLinks] = useState<any[]>([]);

  // If order_id or email is missing, we check if mock=true is explicitly set
  // Or automatically default to mock if accessed directly without transaction parameters
  const rawOrderId = searchParams.get("order_id");
  const rawEmail = searchParams.get("email");
  const isMock = searchParams.get("mock") === "true" || (process.env.NODE_ENV !== "production" && !rawOrderId && !rawEmail);

  const orderId = rawOrderId || "order_mock_123456";
  const paymentId = searchParams.get("payment_id") || "pay_mock_7891011";
  const signature = searchParams.get("signature") || "sig_mock_abcdef";
  const email = rawEmail || "student@example.com";

  useEffect(() => {
    if (isMock) {
      // Instantly load mock preview data for visual manual verification
      setOrderDetails({
        orderId: orderId,
        email: email,
        paymentId: paymentId,
      });
      setDownloadLinks([
        {
          book_title: "Class 10 CBSE Math Visual Guide - Complete Algebra & Geometry Cheat Sheets",
          tokenUrl: "#mock-download-math",
        },
        {
          book_title: "Physics Formula Sketchbook - Mechanics & Electromagnetism Visual Notes",
          tokenUrl: "#mock-download-physics",
        },
        {
          book_title: "Chemistry Reaction Smart Mapper - Inorganic & Organic Visual Pathways",
          tokenUrl: "#mock-download-chemistry",
        }
      ]);
      setLoading(false);
      return;
    }

    if (!rawOrderId || !rawEmail) {
      setError("Missing transaction parameters. Redirecting to home...");
      const timer = setTimeout(() => {
        router.push("/");
      }, 4000);
      return () => clearTimeout(timer);
    }

    const verifyCheckout = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/checkout/verify-payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            razorpay_order_id: orderId,
            razorpay_payment_id: paymentId,
            razorpay_signature: signature,
            customer_email: email,
            is_mock_payment: false,
          }),
        });

        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.error || "Failed to verify transaction signature.");
        }

        setOrderDetails({
          orderId: data.orderId,
          email: email,
          paymentId: paymentId,
        });
        setDownloadLinks(data.tokens || []);
      } catch (err: any) {
        console.error("Verification error:", err);
        setError(err.message || "An unexpected error occurred while locking your payment.");
      } finally {
        setLoading(false);
      }
    };

    verifyCheckout();
  }, [orderId, paymentId, signature, email, isMock, rawOrderId, rawEmail, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 relative bg-transparent">
        {/* Playful hand-drawn custom loader matching aesthetic */}
        <div className="relative w-24 h-24 mb-4">
          <div 
            className="absolute inset-0 border-4 border-[#2D2D2D] rounded-full border-t-[#B59410] animate-spin" 
            style={{ borderRadius: "48% 52% 50% 50% / 45% 55% 45% 55%" }}
          />
          <div 
            className="absolute inset-2 border-2 border-dashed border-[#2D2D2D] rounded-full animate-reverse-spin" 
            style={{ borderRadius: "52% 48% 45% 55% / 55% 45% 55% 45%" }}
          />
        </div>
        <h2 className="text-xl font-sketch font-bold text-[#2D2D2D] text-center tracking-tight animate-pulse">
          Verifying Payment & Generating One-Time Links...
        </h2>
        <p className="text-neutral-500 mt-2 text-xs max-w-sm text-center font-sans font-medium">
          Securing your purchase in our logs. Please do not close or reload this page.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 relative bg-transparent">
        <div className="relative p-6 max-w-md w-full text-center">
          {/* Wobbly backing error card container */}
          <div 
            className="absolute inset-0 border-[3px] border-[#2D2D2D] bg-[#FFF8F8] shadow-[5px_5px_0px_0px_#2D2D2D] pointer-events-none"
            style={{
              filter: "url(#pencilFilter)",
              borderRadius: '16px 225px 14px 255px / 255px 14px 225px 16px',
              zIndex: 0,
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
              willChange: 'filter, transform'
            }}
          />
          
          {/* Content layer - 100% crisp and readable */}
          <div className="relative z-10">
            <div className="text-rose-500 flex justify-center mb-3">
              <AlertTriangle size={40} className="stroke-[2.5]" />
            </div>
            <h2 className="text-xl font-sketch font-bold text-[#2D2D2D] tracking-tight mb-2">Checkout Error</h2>
            <p className="text-neutral-600 text-xs mb-5 leading-relaxed font-sans font-medium">{error}</p>
            
            <SketchButton 
              variant="primary" 
              onClick={() => router.push("/")}
              className="py-2 px-6 text-sm"
            >
              Return to Storefront
            </SketchButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-transparent">
      <Navbar />

      <main className="flex-grow max-w-2xl w-full mx-auto px-4 py-6 md:py-8">
        {/* Main Success Container */}
        <div className="relative p-4 md:p-6 mb-6">
          {/* Wobbly backing receipt background card */}
          <div 
            className="absolute inset-0 border-[3px] border-[#2D2D2D] bg-[#FFFDF4] shadow-[6px_6px_0px_0px_#2D2D2D] pointer-events-none" 
            style={{ 
              filter: "url(#pencilFilter)", 
              borderRadius: '16px 255px 18px 225px/225px 18px 255px 16px',
              zIndex: 0,
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
              willChange: 'filter, transform'
            }}
          />

          {/* Crisp, non-distorted receipt layers */}
          <div className="relative z-10">
            <div className="text-center mt-1">
              {/* WebM animation loop in sketchy wobbly frame */}
              <div className="relative w-20 h-20 md:w-24 md:h-24 mx-auto mb-3.5">
                {/* Sketched circle backdrop shadow */}
                <div 
                  className="absolute inset-0 border-[3px] border-[#2D2D2D] bg-[#FAF8F5] shadow-[3px_3px_0px_0px_#2D2D2D]" 
                  style={{ 
                    filter: "url(#pencilFilter)", 
                    borderRadius: "48% 52% 50% 50% / 45% 55% 45% 55%",
                    zIndex: 0,
                    transform: 'translateZ(0)',
                    backfaceVisibility: 'hidden',
                    willChange: 'filter, transform'
                  }}
                />
                
                {/* Animated video inside crisp circle */}
                <div className="absolute inset-1 rounded-full overflow-hidden z-10 flex items-center justify-center bg-white">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover scale-[1.05]"
                  >
                    <source src="/assets/animations/success.webm" type="video/webm" />
                  </video>
                </div>
                
                {/* Playful sparkles rotating */}
                <Sparkles className="absolute -top-2 -right-2 text-[#B59410] animate-bounce-slow" size={18} />
                <Sparkles className="absolute -bottom-1 -left-2 text-[#B59410] animate-pulse-slow opacity-80" size={14} />
              </div>

              <h1 className="text-2xl md:text-3.5xl font-sketch font-bold text-[#2D2D2D] mb-1">
                Order <span className="text-[#B59410]">Confirmed!</span>
              </h1>
              
              <p className="text-neutral-600 font-sans font-medium text-xs md:text-sm max-w-md mx-auto leading-relaxed mt-1">
                Congratulations! Your payment has been verified. Your secure visual guides are listed below and a receipt copy was sent to <span className="font-bold text-black border-b border-[#B59410]">{orderDetails?.email}</span>.
              </p>
            </div>

            {/* Anti-piracy warning sticker card */}
            <div className="relative p-3.5 md:p-4 my-4">
              {/* Wobbly backing warning sticker */}
              <div 
                className="absolute inset-0 border-2 border-amber-600 bg-amber-50/70 shadow-[2px_2px_0px_0px_rgba(217,119,6,0.2)] pointer-events-none" 
                style={{ 
                  filter: "url(#pencilFilter)", 
                  borderRadius: '8px 12px 10px 14px / 12px 10px 14px 8px',
                  zIndex: 0,
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden',
                  willChange: 'filter, transform'
                }}
              />
              
              <div className="relative z-10 flex items-start gap-3">
                <Lock className="text-amber-800 shrink-0 mt-0.5" size={18} />
                <div>
                  <h4 className="font-sketch font-bold text-amber-900 text-sm md:text-base">
                    Crucial Security & Anti-Piracy Notice
                  </h4>
                  <ul className="text-[11px] md:text-xs text-amber-800 mt-1.5 space-y-1 list-disc list-inside leading-relaxed font-sans font-medium">
                    <li>Each download link is active for <strong className="text-black font-extrabold">exactly ONE click</strong>.</li>
                    <li>Do not click the links inside email screening/scanners, or they will invalidate.</li>
                    <li>Links expire automatically in <strong className="text-black font-extrabold">48 hours</strong>.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Study guides downloads card stack */}
            <div className="space-y-3">
              <h3 className="text-base md:text-lg font-sketch font-bold text-[#2D2D2D] border-b border-dashed border-[#2D2D2D]/30 pb-2 flex items-center gap-2">
                <BookOpen className="text-[#B59410]" size={20} /> Your Study Guides:
              </h3>

              {downloadLinks.map((item, idx) => (
                <div key={idx} className="relative p-3.5 md:p-4 transition-all duration-200 hover:-translate-y-0.5">
                  {/* Background wobbly card shape */}
                  <div 
                    className="absolute inset-0 border-2 border-[#2D2D2D] bg-[#FAF8F5] shadow-[3px_3px_0px_0px_#2D2D2D] pointer-events-none"
                    style={{
                      filter: "url(#pencilFilter)",
                      borderRadius: '12px 8px 14px 10px / 8px 12px 10px 14px',
                      zIndex: 0,
                      transform: 'translateZ(0)',
                      backfaceVisibility: 'hidden',
                      willChange: 'filter, transform'
                    }}
                  />
                  
                  {/* Item contents */}
                  <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="max-w-md">
                      <h4 className="font-sketch font-bold text-sm md:text-base text-[#2D2D2D] leading-snug mb-1">
                        {item.book_title}
                      </h4>
                      <div className="flex gap-2 items-center text-xs font-bold font-sans">
                        <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></span>
                          Ready to Download
                        </span>
                        <span className="text-neutral-400 font-normal">•</span>
                        <span className="text-neutral-500">PDF Document</span>
                      </div>
                    </div>
                    
                    <a href={item.tokenUrl} className="shrink-0 w-full sm:w-auto">
                      <SketchButton variant="primary" icon={Download} iconPosition="left" className="py-2 px-5 text-sm w-full sm:w-auto">
                        Download (1-Click)
                      </SketchButton>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Retro notepad grid logger */}
            <div className="relative mt-6 p-3.5">
              {/* Notepad grid line backing */}
              <div 
                className="absolute inset-0 border-2 border-dashed border-neutral-300 bg-[#FAF8F5]/80 pointer-events-none"
                style={{
                  filter: "url(#pencilFilter)",
                  borderRadius: '8px 10px 9px 11px / 10px 8px 11px 9px',
                  zIndex: 0,
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden',
                  willChange: 'filter, transform'
                }}
              />
              
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4 text-[10px] md:text-xs font-sans font-bold text-neutral-500">
                <div>
                  <span className="block text-neutral-400 font-medium mb-0.5 tracking-wider">ORDER ID:</span>
                  <span className="font-mono text-[#2D2D2D] break-all bg-white/60 px-1 py-0.5 rounded border border-neutral-200">{orderDetails?.orderId}</span>
                </div>
                <div>
                  <span className="block text-neutral-400 font-medium mb-0.5 tracking-wider">TRANSACTION ID:</span>
                  <span className="font-mono text-[#2D2D2D] break-all bg-white/60 px-1 py-0.5 rounded border border-neutral-200">{orderDetails?.paymentId}</span>
                </div>
                <div>
                  <span className="block text-neutral-400 font-medium mb-0.5 tracking-wider">EMAIL LOGGED:</span>
                  <span className="text-[#2D2D2D] break-all bg-white/60 px-1 py-0.5 rounded border border-neutral-200">{orderDetails?.email}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic page actions */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-6">
          <Link href="/products" className="w-full sm:w-auto">
            <SketchButton 
              variant="outline" 
              icon={ArrowRight} 
              iconPosition="right"
              className="w-full sm:w-auto text-sm px-6 py-2.5"
            >
              Browse More Exam Guides
            </SketchButton>
          </Link>
          
          <Link href="/" className="w-full sm:w-auto">
            <SketchButton 
              variant="secondary" 
              icon={Home} 
              iconPosition="left"
              className="w-full sm:w-auto text-sm px-6 py-2.5"
            >
              Return to Homepage
            </SketchButton>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col items-center justify-center bg-transparent">
        <div className="relative w-16 h-16 animate-spin">
          <div className="absolute inset-0 border-4 border-[#2D2D2D] border-t-[#B59410] rounded-full"></div>
        </div>
      </div>
    }>
      <CheckoutSuccessContent />
    </Suspense>
  );
}
