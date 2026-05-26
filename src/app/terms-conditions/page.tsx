import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import Navbar from "@/app/Navbar";
import Footer from "@/app/landingpage/footer";
import { Info, Lock, Scale } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Read ExamVault's terms and conditions. Learn about digital product single-user licensing, copyright limits, and anti-piracy protection.",
};

export default function TermsConditionsPage() {
  return (
    <main className="min-h-screen w-full flex flex-col p-4 md:p-6 lg:p-1 pt-2 md:pt-4 relative overflow-hidden">
      <Navbar />

      {/* Main Content */}
      <div className="container-custom max-w-4xl mx-auto py-12 md:py-16 flex-grow z-10">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-[#4A4A4A] font-medium">
          <Link href="/support" className="hover:text-[#B59410] underline">Support</Link>
          <span className="mx-2 text-[#2D2D2D]/20">/</span>
          <span className="text-[#2D2D2D]/60">Terms & Conditions</span>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 pencil-sketch tracking-tight">
            Terms & Conditions
          </h1>
          <p className="text-lg md:text-xl font-medium text-[#4A4A4A] max-w-xl mx-auto pen-note">
            Rules governing our visual notes, licenses, and piracy protection
          </p>
          <div className="w-40 h-2 bg-[#B59410]/20 mx-auto mt-4 rounded-full relative overflow-hidden">
            <div className="absolute top-0 left-0 h-full w-2/3 bg-[#B59410] rounded-full"></div>
          </div>
        </div>

        {/* Policy Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Quick Summary Sticky (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="sketch-paper-card-gold p-6 space-y-4">
              <h4 className="font-sketch text-lg text-[#1A1A2E] flex items-center gap-1.5">
                <Lock className="w-5 h-5 text-[#B59410]" />
                <span>License Summary</span>
              </h4>
              
              <ul className="space-y-3 text-xs text-[#4A4A4A] font-medium leading-relaxed">
                <li className="flex gap-2 items-start">
                  <Info className="w-4 h-4 text-[#B59410] shrink-0" />
                  <span><strong>Personal Use Only:</strong> Purchase grants a single-user license. Do not distribute.</span>
                </li>
                <li className="flex gap-2 items-start">
                  <Info className="w-4 h-4 text-[#B59410] shrink-0" />
                  <span><strong>Watermarking:</strong> Files are embedded with purchaser's identity to track leaks.</span>
                </li>
                <li className="flex gap-2 items-start">
                  <Info className="w-4 h-4 text-[#B59410] shrink-0" />
                  <span><strong>No Resale:</strong> Reselling, adapting, or hosting files on shared drives is strictly illegal.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Main Legal Content (8 Cols) */}
          <div className="lg:col-span-8 bg-white border-2 border-[#2D2D2D] rounded-xl p-8 shadow-[4px_4px_0px_0px_#2D2D2D] space-y-6 text-sm md:text-base text-[#4A4A4A] leading-relaxed font-medium">
            
            {/* Section 1 */}
            <section className="space-y-2">
              <h3 className="text-xl font-sketch text-[#1A1A2E] border-b-2 border-[#2D2D2D]/10 pb-2">
                1. Acceptance of Terms
              </h3>
              <p>
                Welcome to ExamVault. By accessing, browsing, or purchasing digital products from our website, you agree to comply with and be bound by these Terms & Conditions. These terms govern the delivery and usage of all visual study notes, PDFs, infographics, and other resources provided by ExamVault EdTech. If you disagree with any part of these terms, please do not purchase our materials.
              </p>
            </section>

            {/* Section 2 */}
            <section className="space-y-2">
              <h3 className="text-xl font-sketch text-[#1A1A2E] border-b-2 border-[#2D2D2D]/10 pb-2">
                2. License & Permitted Usage
              </h3>
              <p>
                When you purchase a PDF study guide from ExamVault, we grant you a **non-exclusive, non-transferable, single-user license** for personal study and exam preparation.
              </p>
              <div className="bg-[#FFFDF4] border-l-4 border-[#B59410] p-4 text-sm space-y-2 rounded-r-lg">
                <p className="font-bold text-[#1A1A2E]">Permitted Activities:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Downloading the files to your personal devices for self-study.</li>
                  <li>Printing a physical hardcopy of the notes solely for your personal study use.</li>
                  <li>Annotating and adding handwritten notes to your personal copies.</li>
                </ul>
                <p className="font-bold text-[#1A1A2E] mt-3">Prohibited Activities:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Sharing the PDF files via email, WhatsApp, Telegram, Google Drive, or any other media.</li>
                  <li>Posting or hosting our content on public websites or student forums.</li>
                  <li>Reselling, leasing, translating, or commercially distributing our visual materials.</li>
                  <li>Printing multiple copies for sale or distribution to students in tutoring centers.</li>
                </ul>
              </div>
            </section>

            {/* Section 3 */}
            <section className="space-y-2">
              <h3 className="text-xl font-sketch text-[#1A1A2E] border-b-2 border-[#2D2D2D]/10 pb-2">
                3. Copyright & Intellectual Property
              </h3>
              <p>
                All visual infographics, charts, layouts, structure, text summaries, and graphical illustrations contained in our PDF guides are the exclusive intellectual property of ExamVault EdTech. While content is generated with the assistance of advanced artificial intelligence models, all designs have been manually composed, fact-checked, and formatted. Our work is protected under the Indian Copyright Act, 1957, and international copyright treaties.
              </p>
            </section>

            {/* Section 4 */}
            <section className="space-y-2">
              <h3 className="text-xl font-sketch text-[#1A1A2E] border-b-2 border-[#2D2D2D]/10 pb-2">
                4. Anti-Piracy & Digital Watermarking
              </h3>
              <p>
                Digital piracy severely impacts our ability to develop high-quality revision resources at affordable prices. To protect our content, ExamVault employs **dynamic digital watermarking technology**:
              </p>
              <p>
                Every downloaded PDF file is uniquely compiled for the purchaser, embedding your registered email address, mobile number, and payment ID across the pages in both visible headers and invisible metadata trackers.
              </p>
              <p>
                If we discover any ExamVault PDF files shared on Telegram channels, WhatsApp groups, shared Google drives, or internet forums, we will decode the embedded watermarks to identify the source purchaser. The source user's license will be immediately terminated without a refund, their access blocklisted, and we will initiate legal proceedings under civil and criminal intellectual property laws.
              </p>
            </section>

            {/* Section 5 */}
            <section className="space-y-2">
              <h3 className="text-xl font-sketch text-[#1A1A2E] border-b-2 border-[#2D2D2D]/10 pb-2">
                5. Product Pricing & Transactions
              </h3>
              <p>
                Prices for all visual packages, bundles, and single revisions are listed in Indian Rupees (INR). We reserve the right to modify pricing, structure discounts, or withdraw product listings at any time without prior notice.
              </p>
              <p>
                Transactions are processed through Razorpay. You agree to provide accurate and complete email, phone, and billing details during checkout to guarantee successful invoice generation and link delivery.
              </p>
            </section>

            {/* Section 6 */}
            <section className="space-y-2">
              <h3 className="text-xl font-sketch text-[#1A1A2E] border-b-2 border-[#2D2D2D]/10 pb-2">
                6. Educational Disclaimer
              </h3>
              <p>
                ExamVault's visual notes are revision aids created to assist students in conceptual understanding and rapid recall. While our team exerts high caution to verify all statistics, historical data, and political provisions, competitive exam syllabi are vast and subject to modification.
              </p>
              <p>
                Our guides should serve as a supplement, not a replacement, for standard government resources, official portals, and primary textbooks. ExamVault is not responsible for any selection outcomes, grading marks, or factual interpretations in examination halls.
              </p>
            </section>
          </div>
        </div>

        {/* Corporate Legal Notice Banner */}
        <div className="sketch-paper-card-blue p-8 text-center max-w-2xl mx-auto">
          <h4 className="text-xl font-sketch text-[#1A1A2E] mb-2 flex items-center justify-center gap-2">
            <Scale className="w-5 h-5 text-[#229ED9]" />
            <span>Legal Jurisdiction</span>
          </h4>
          <p className="text-sm text-[#4A4A4A] font-medium leading-relaxed max-w-xl mx-auto">
            These terms are governed by the laws of India. Any legal disputes or claims arising from the use of this website or the purchase of our visual materials shall be subject to the exclusive jurisdiction of the courts in Bengaluru, Karnataka.
          </p>
        </div>
      </div>

      <Footer />
    </main>
  );
}
