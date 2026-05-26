import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import Navbar from "@/app/Navbar";
import Footer from "@/app/landingpage/footer";
import FAQAccordion from "./FAQAccordion";
import { MessageSquare, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Help Center & FAQs",
  description: "Find answers to frequently asked questions about ExamVault's visual study notes, PDF prints, payment options, and anti-piracy policies.",
};

export default function HelpCenterPage() {
  return (
    <main className="min-h-screen w-full flex flex-col p-4 md:p-6 lg:p-1 pt-2 md:pt-4 relative overflow-hidden">
      <Navbar />

      {/* Main Content */}
      <div className="container-custom max-w-5xl mx-auto py-12 md:py-16 flex-grow z-10">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-[#4A4A4A] font-medium">
          <Link href="/support" className="hover:text-[#B59410] underline">Support</Link>
          <span className="mx-2 text-[#2D2D2D]/20">/</span>
          <span className="text-[#2D2D2D]/60">Help Center</span>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 pencil-sketch tracking-tight">
            Help Center
          </h1>
          <p className="text-lg md:text-xl font-medium text-[#4A4A4A] max-w-xl mx-auto pen-note">
            Answers to your questions about our visual study notes & orders
          </p>
          <div className="w-40 h-2 bg-[#B59410]/20 mx-auto mt-4 rounded-full relative overflow-hidden">
            <div className="absolute top-0 left-0 h-full w-1/2 bg-[#B59410] rounded-full"></div>
          </div>
        </div>

        {/* FAQs Accordion */}
        <div className="mb-16">
          <FAQAccordion />
        </div>

        {/* Bottom Call to Action */}
        <div className="sketch-paper-card-blue p-8 flex flex-col md:flex-row items-center justify-between gap-6 max-w-3xl mx-auto">
          <div>
            <h3 className="text-xl font-sketch text-[#1A1A2E] mb-2 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#229ED9]" />
              <span>Still need assistance?</span>
            </h3>
            <p className="text-sm text-[#4A4A4A] font-medium leading-relaxed">
              If your question isn't answered in the FAQs, feel free to send us a direct message. Our support team typically responds within 4-6 business hours.
            </p>
          </div>
          
          <Link href="/contact">
            <button className="whitespace-nowrap px-6 py-3 border-2 border-[#2D2D2D] bg-[#229ED9] text-white font-sketch rounded-xl shadow-[3px_3px_0px_#2D2D2D] hover:scale-102 hover:shadow-[2px_2px_0px_#2D2D2D] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#2D2D2D] transition-all cursor-pointer flex items-center gap-2">
              <span>Contact Us</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}
