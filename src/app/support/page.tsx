import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import Navbar from "@/app/Navbar";
import Footer from "@/app/landingpage/footer";
import { 
  HelpCircle, 
  Mail, 
  FileText, 
  ArrowRight, 
  MessageSquare,
  BookOpen
} from "lucide-react";

export const metadata: Metadata = {
  title: "Support Hub",
  description: "Find help, read FAQs, contact support, and access policy guidelines for ExamVault visual learning notes.",
};

export default function SupportHubPage() {
  return (
    <main className="min-h-screen w-full flex flex-col p-4 md:p-6 lg:p-1 pt-2 md:pt-4 relative overflow-hidden">
      <Navbar />
      
      {/* Support Content */}
      <div className="container-custom max-w-5xl mx-auto py-12 md:py-16 flex-grow z-10">
        {/* Header */}
        <div className="text-center mb-12 relative">
          <div className="sketch-burst -top-8 left-1/4 rotate-12 hidden md:block"></div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 pencil-sketch tracking-tight">
            Support Hub
          </h1>
          <p className="text-lg md:text-xl font-medium text-[#4A4A4A] max-w-xl mx-auto pen-note">
            How can we simplify your preparation journey today?
          </p>
          <div className="w-40 h-2 bg-[#B59410]/20 mx-auto mt-4 rounded-full relative overflow-hidden">
            <div className="absolute top-0 left-0 h-full w-2/3 bg-[#B59410] rounded-full"></div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Card 1: Help Center / FAQs */}
          <Link href="/help-center" className="group">
            <div className="sketch-paper-card-gold p-8 h-full flex flex-col justify-between cursor-pointer">
              <div>
                <div className="w-12 h-12 rounded-xl border-2 border-[#2D2D2D] bg-[#B59410]/10 flex items-center justify-center mb-6 shadow-[2px_2px_0px_#2D2D2D] group-hover:bg-[#B59410]/20 transition-all duration-300">
                  <HelpCircle className="w-6 h-6 text-[#B59410]" />
                </div>
                <h2 className="text-2xl font-sketch text-[#1A1A2E] mb-3">
                  Help Center & FAQs
                </h2>
                <p className="text-sm text-[#4A4A4A] leading-relaxed font-medium">
                  Got questions about downloading visual notes, PDF rendering, mobile reading, or printing guides? Browse our complete FAQ library for instant self-help.
                </p>
              </div>
              <div className="flex items-center gap-2 mt-6 text-sm font-bold text-[#B59410] group-hover:translate-x-1 transition-transform">
                <span>Browse FAQs</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>

          {/* Card 2: Contact Us */}
          <Link href="/contact" className="group">
            <div className="sketch-paper-card-blue p-8 h-full flex flex-col justify-between cursor-pointer">
              <div>
                <div className="w-12 h-12 rounded-xl border-2 border-[#2D2D2D] bg-[#229ED9]/10 flex items-center justify-center mb-6 shadow-[2px_2px_0px_#2D2D2D] group-hover:bg-[#229ED9]/20 transition-all duration-300">
                  <Mail className="w-6 h-6 text-[#229ED9]" />
                </div>
                <h2 className="text-2xl font-sketch text-[#1A1A2E] mb-3">
                  Contact Support
                </h2>
                <p className="text-sm text-[#4A4A4A] leading-relaxed font-medium">
                  Facing payment issues or need custom billing assistance? Submit a support ticket, and our team will get back to you within 4-6 business hours.
                </p>
              </div>
              <div className="flex items-center gap-2 mt-6 text-sm font-bold text-[#229ED9] group-hover:translate-x-1 transition-transform">
                <span>Send a Message</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>

          {/* Card 3: Refund Policy */}
          <Link href="/refund-policy" className="group">
            <div className="sketch-paper-card-rose p-8 h-full flex flex-col justify-between cursor-pointer">
              <div>
                <div className="w-12 h-12 rounded-xl border-2 border-[#2D2D2D] bg-[#ef4444]/10 flex items-center justify-center mb-6 shadow-[2px_2px_0px_#2D2D2D] group-hover:bg-[#ef4444]/20 transition-all duration-300">
                  <FileText className="w-6 h-6 text-[#ef4444]" />
                </div>
                <h2 className="text-2xl font-sketch text-[#1A1A2E] mb-3">
                  Refund & Payment Policy
                </h2>
                <p className="text-sm text-[#4A4A4A] leading-relaxed font-medium">
                  Review our digital product guarantees, refund processing rules for double payments, and transaction security assurances.
                </p>
              </div>
              <div className="flex items-center gap-2 mt-6 text-sm font-bold text-[#ef4444] group-hover:translate-x-1 transition-transform">
                <span>Read Refund Policy</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>

          {/* Card 4: Terms & Privacy */}
          <div className="sketch-paper-card-gold p-8 h-full flex flex-col justify-between bg-white border-2 border-[#2D2D2D] rounded-xl shadow-[6px_6px_0px_0px_#2D2D2D]">
            <div>
              <div className="w-12 h-12 rounded-xl border-2 border-[#2D2D2D] bg-[#10b981]/10 flex items-center justify-center mb-6 shadow-[2px_2px_0px_#2D2D2D]">
                <BookOpen className="w-6 h-6 text-[#10b981]" />
              </div>
              <h2 className="text-2xl font-sketch text-[#1A1A2E] mb-3">
                Legal Terms & Privacy
              </h2>
              <p className="text-sm text-[#4A4A4A] leading-relaxed font-medium">
                Learn more about your user rights, personal study licenses, PDF sharing limits, anti-piracy watermarking, and how we protect your personal data.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 mt-6">
              <Link href="/terms-conditions" className="text-xs font-bold text-[#10b981] hover:underline flex items-center gap-1">
                <span>Terms of Service</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <span className="text-[#2D2D2D]/20">|</span>
              <Link href="/privacy-policy" className="text-xs font-bold text-[#10b981] hover:underline flex items-center gap-1">
                <span>Privacy Policy</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Direct Communities Banner */}
        <div className="border-4 border-[#2D2D2D] rounded-2xl p-8 bg-[#FFFDF4] shadow-[8px_8px_0px_0px_#2D2D2D] relative overflow-hidden">
          <div className="sketch-curly-arrow right-8 top-4 hidden md:block rotate-12"></div>
          
          <div className="max-w-2xl">
            <h3 className="text-xl md:text-2xl font-sketch text-[#1A1A2E] mb-2">
              Join the ExamVault Communities
            </h3>
            <p className="text-sm text-[#4A4A4A] font-medium mb-6 leading-relaxed">
              Don't study in isolation. Connect with thousands of fellow aspirants in our official discussion groups. Get study hacks, daily visual maps, and live peer support.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="https://t.me/yourchannel" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-5 py-3 border-2 border-[#2D2D2D] bg-[#229ED9] text-white font-sketch rounded-xl shadow-[3px_3px_0px_#2D2D2D] hover:scale-102 hover:shadow-[2px_2px_0px_#2D2D2D] transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Join Telegram Channel</span>
              </a>
              
              <a 
                href="https://wa.me/yournumber" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-5 py-3 border-2 border-[#2D2D2D] bg-[#25D366] text-white font-sketch rounded-xl shadow-[3px_3px_0px_#2D2D2D] hover:scale-102 hover:shadow-[2px_2px_0px_#2D2D2D] transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Join WhatsApp Group</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
