import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import Navbar from "@/app/Navbar";
import Footer from "@/app/landingpage/footer";
import ContactForm from "./ContactForm";
import { Mail, MessageSquare, Clock, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with ExamVault support. Email us or submit a ticket for help with PDF downloads, orders, and exam materials.",
};

export default function ContactUsPage() {
  return (
    <main className="min-h-screen w-full flex flex-col p-4 md:p-6 lg:p-1 pt-2 md:pt-4 relative overflow-hidden">
      <Navbar />

      {/* Main Content */}
      <div className="container-custom max-w-5xl mx-auto py-12 md:py-16 flex-grow z-10">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-[#4A4A4A] font-medium">
          <Link href="/support" className="hover:text-[#B59410] underline">Support</Link>
          <span className="mx-2 text-[#2D2D2D]/20">/</span>
          <span className="text-[#2D2D2D]/60">Contact Us</span>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 pencil-sketch tracking-tight">
            Contact Us
          </h1>
          <p className="text-lg md:text-xl font-medium text-[#4A4A4A] max-w-xl mx-auto pen-note">
            Have a question or running into technical trouble? Let's fix it.
          </p>
          <div className="w-40 h-2 bg-[#B59410]/20 mx-auto mt-4 rounded-full relative overflow-hidden">
            <div className="absolute top-0 left-0 h-full w-2/3 bg-[#B59410] rounded-full"></div>
          </div>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Info Side (Left 5 Cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="sketch-paper-card-blue p-8 space-y-6">
              <h4 className="text-xl font-sketch text-[#1A1A2E] mb-4">
                Support Channels
              </h4>

              {/* Channel 1: Email */}
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-lg border-2 border-[#2D2D2D] bg-[#229ED9]/10 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-[#229ED9]" />
                </div>
                <div>
                  <h5 className="font-bold text-xs uppercase tracking-wider text-[#1A1A2E] mb-0.5">Email Support</h5>
                  <p className="text-sm font-semibold text-[#B59410] mb-1">
                    support@examvault.in
                  </p>
                  <p className="text-xs text-[#4A4A4A] leading-relaxed font-medium">
                    Send transaction receipts, bulk order inquiries, and technical concerns.
                  </p>
                </div>
              </div>

              {/* Channel 2: Resolution Hours */}
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-lg border-2 border-[#2D2D2D] bg-[#B59410]/10 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-[#B59410]" />
                </div>
                <div>
                  <h5 className="font-bold text-xs uppercase tracking-wider text-[#1A1A2E] mb-0.5">Resolution Window</h5>
                  <p className="text-sm font-bold text-[#2D2D2D] mb-1">
                    4 - 6 Business Hours
                  </p>
                  <p className="text-xs text-[#4A4A4A] leading-relaxed font-medium">
                    Active hours: 9:00 AM to 8:00 PM IST (Monday to Saturday).
                  </p>
                </div>
              </div>

              {/* Channel 3: Community */}
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-lg border-2 border-[#2D2D2D] bg-[#10b981]/10 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5 text-[#10b981]" />
                </div>
                <div>
                  <h5 className="font-bold text-xs uppercase tracking-wider text-[#1A1A2E] mb-0.5">Community Help</h5>
                  <p className="text-xs text-[#4A4A4A] leading-relaxed font-medium mb-2">
                    Connect with administrators and peer students directly on WhatsApp and Telegram.
                  </p>
                  <div className="flex gap-3">
                    <a href="https://wa.me/yournumber" target="_blank" rel="noreferrer" className="text-xs font-bold text-[#10b981] hover:underline">
                      WhatsApp Support
                    </a>
                    <span className="text-[#2D2D2D]/20">|</span>
                    <a href="https://t.me/yourchannel" target="_blank" rel="noreferrer" className="text-xs font-bold text-[#10b981] hover:underline">
                      Telegram Help
                    </a>
                  </div>
                </div>
              </div>

              {/* Location Reference */}
              <div className="flex gap-4 items-start border-t border-[#2D2D2D]/10 pt-6">
                <div className="w-10 h-10 rounded-lg border-2 border-[#2D2D2D] bg-[#ef4444]/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#ef4444]" />
                </div>
                <div>
                  <h5 className="font-bold text-xs uppercase tracking-wider text-[#1A1A2E] mb-0.5">Corporate Office</h5>
                  <p className="text-xs text-[#4A4A4A] leading-relaxed font-medium">
                    ExamVault EdTech Private Limited,<br />
                    Bengaluru, Karnataka, India - 560001
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side (Right 7 Cols) */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
