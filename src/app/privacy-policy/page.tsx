import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import Navbar from "@/app/Navbar";
import Footer from "@/app/landingpage/footer";
import { Eye, Shield, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Read ExamVault's privacy policy. Learn how we collect, store, and protect student information and transactions.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen w-full flex flex-col p-4 md:p-6 lg:p-1 pt-2 md:pt-4 relative overflow-hidden">
      <Navbar />

      {/* Main Content */}
      <div className="container-custom max-w-4xl mx-auto py-12 md:py-16 flex-grow z-10">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-[#4A4A4A] font-medium">
          <Link href="/support" className="hover:text-[#B59410] underline">Support</Link>
          <span className="mx-2 text-[#2D2D2D]/20">/</span>
          <span className="text-[#2D2D2D]/60">Privacy Policy</span>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 pencil-sketch tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-lg md:text-xl font-medium text-[#4A4A4A] max-w-xl mx-auto pen-note">
            How we protect your personal information and study account details
          </p>
          <div className="w-40 h-2 bg-[#B59410]/20 mx-auto mt-4 rounded-full relative overflow-hidden">
            <div className="absolute top-0 left-0 h-full w-5/6 bg-[#B59410] rounded-full"></div>
          </div>
        </div>

        {/* Policy Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Quick Summary Sticky (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="sketch-paper-card-blue p-6 space-y-4">
              <h4 className="font-sketch text-lg text-[#1A1A2E] flex items-center gap-1.5">
                <ShieldCheck className="w-5 h-5 text-[#229ED9]" />
                <span>Privacy Digest</span>
              </h4>
              
              <ul className="space-y-3 text-xs text-[#4A4A4A] font-medium leading-relaxed">
                <li className="flex gap-2 items-start">
                  <Eye className="w-4 h-4 text-[#229ED9] shrink-0" />
                  <span><strong>Zero Sell Policy:</strong> We do not sell or lease student database records to marketing aggregators.</span>
                </li>
                <li className="flex gap-2 items-start">
                  <Eye className="w-4 h-4 text-[#229ED9] shrink-0" />
                  <span><strong>No Card Storage:</strong> Payment cards and bank details are handled solely by Razorpay.</span>
                </li>
                <li className="flex gap-2 items-start">
                  <Eye className="w-4 h-4 text-[#229ED9] shrink-0" />
                  <span><strong>Secure Servers:</strong> Account data and file download logs are safely stored on encrypted Supabase clusters.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Main Legal Content (8 Cols) */}
          <div className="lg:col-span-8 bg-white border-2 border-[#2D2D2D] rounded-xl p-8 shadow-[4px_4px_0px_0px_#2D2D2D] space-y-6 text-sm md:text-base text-[#4A4A4A] leading-relaxed font-medium">
            
            {/* Section 1 */}
            <section className="space-y-2">
              <h3 className="text-xl font-sketch text-[#1A1A2E] border-b-2 border-[#2D2D2D]/10 pb-2">
                1. Information We Collect
              </h3>
              <p>
                ExamVault collects basic information required to process digital orders, manage accounts, and deliver study materials:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-sm">
                <li>
                  <strong>Personal Identity:</strong> Your full name, email address, and mobile number provided during registration or checkout.
                </li>
                <li>
                  <strong>Order Logs:</strong> Information about products purchased, order date, and transaction reference details.
                </li>
                <li>
                  <strong>System Logs:</strong> IP address, device type, and download metrics collected during file delivery (primarily for license verification and watermarking).
                </li>
              </ul>
            </section>

            {/* Section 2 */}
            <section className="space-y-2">
              <h3 className="text-xl font-sketch text-[#1A1A2E] border-b-2 border-[#2D2D2D]/10 pb-2">
                2. How We Use Your Data
              </h3>
              <p>
                We use collected information strictly to manage your student experience:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-sm">
                <li>
                  Processing payments, generating invoice receipts, and delivering PDF download links.
                </li>
                <li>
                  Compiling dynamic anti-piracy watermarks to embed inside purchased PDF files (refer to our Terms & Conditions).
                </li>
                <li>
                  Sending syllabus updates, revision alerts, and product announcement newsletters.
                </li>
                <li>
                  Resolving technical issues and billing inquiries raised with our support desk.
                </li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="space-y-2">
              <h3 className="text-xl font-sketch text-[#1A1A2E] border-b-2 border-[#2D2D2D]/10 pb-2">
                3. Secure Payment Gateway (Razorpay)
              </h3>
              <p>
                All credit/debit card, UPI, netbanking, and mobile wallet transactions are routed securely to our payment gateway provider, Razorpay.
              </p>
              <p>
                ExamVault does not store or process payment card numbers, CVVs, or bank netbanking passwords. Razorpay processes all transactional details on highly secure servers using industry-grade SSL encryption and PCI-DSS compliance.
              </p>
            </section>

            {/* Section 4 */}
            <section className="space-y-2">
              <h3 className="text-xl font-sketch text-[#1A1A2E] border-b-2 border-[#2D2D2D]/10 pb-2">
                4. Third-Party Service Providers
              </h3>
              <p>
                We share data with third-party service providers only when necessary to perform essential operations:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-sm">
                <li>
                  <strong>Supabase:</strong> For cloud hosting, secure user database, and storage logs.
                </li>
                <li>
                  <strong>Resend:</strong> For transactional email delivery (purchase links and verification codes).
                </li>
                <li>
                  <strong>Razorpay:</strong> For payment routing and invoice settlement.
                </li>
              </ul>
              <p>
                All partner services operate under strict confidentiality clauses and are prohibited from using your personal data for independent marketing purposes.
              </p>
            </section>

            {/* Section 5 */}
            <section className="space-y-2">
              <h3 className="text-xl font-sketch text-[#1A1A2E] border-b-2 border-[#2D2D2D]/10 pb-2">
                5. Cookies & Local Storage
              </h3>
              <p>
                We use cookies and browser local storage to improve website functionality:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-sm">
                <li>
                  Saving products in your shopping cart drawer as you browse.
                </li>
                <li>
                  Keeping you logged in to your account.
                </li>
                <li>
                  Analyzing standard web traffic data (Google Analytics) to improve product layouts.
                </li>
              </ul>
              <p>
                You can configure your browser to reject cookies, though doing so might affect cart functionality.
              </p>
            </section>

            {/* Section 6 */}
            <section className="space-y-2">
              <h3 className="text-xl font-sketch text-[#1A1A2E] border-b-2 border-[#2D2D2D]/10 pb-2">
                6. Legal Compliance & Rights
              </h3>
              <p>
                We protect your data in compliance with the **Indian Information Technology Act, 2000** and other applicable digital rules. You have the right to request access to your stored records, request correction of inaccurate details, or opt-out of marketing communications by clicking the unsubscribe link inside our emails.
              </p>
            </section>
          </div>
        </div>

        {/* Security Notice Banner */}
        <div className="sketch-paper-card-gold p-8 text-center max-w-2xl mx-auto bg-white border-2 border-[#2D2D2D] rounded-xl shadow-[4px_4px_0px_0px_#2D2D2D]">
          <h4 className="text-xl font-sketch text-[#1A1A2E] mb-2 flex items-center justify-center gap-2">
            <Shield className="w-5 h-5 text-[#B59410]" />
            <span>Data Protection Officer</span>
          </h4>
          <p className="text-sm text-[#4A4A4A] font-medium leading-relaxed max-w-xl mx-auto">
            For privacy questions, access requests, or to ask for deletion of your registered data logs, please contact our Data Protection Officer at <span className="font-semibold text-[#1A1A2E]">privacy@examvault.in</span>.
          </p>
        </div>
      </div>

      <Footer />
    </main>
  );
}
