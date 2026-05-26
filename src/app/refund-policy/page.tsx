import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import Navbar from "@/app/Navbar";
import Footer from "@/app/landingpage/footer";
import { AlertCircle, CheckCircle2, ShieldAlert } from "lucide-react";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy",
  description: "Read ExamVault's refund policy. Learn about technical file delivery issues, refund request processes, and transaction security.",
};

export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen w-full flex flex-col p-4 md:p-6 lg:p-1 pt-2 md:pt-4 relative overflow-hidden">
      <Navbar />

      {/* Main Content */}
      <div className="container-custom max-w-4xl mx-auto py-12 md:py-16 flex-grow z-10">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-[#4A4A4A] font-medium">
          <Link href="/support" className="hover:text-[#B59410] underline">Support</Link>
          <span className="mx-2 text-[#2D2D2D]/20">/</span>
          <span className="text-[#2D2D2D]/60">Refund Policy</span>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 pencil-sketch tracking-tight">
            Refund & Cancellation Policy
          </h1>
          <p className="text-lg md:text-xl font-medium text-[#4A4A4A] max-w-xl mx-auto pen-note">
            Clear terms about digital downloads, failed links, and payments
          </p>
          <div className="w-40 h-2 bg-[#B59410]/20 mx-auto mt-4 rounded-full relative overflow-hidden">
            <div className="absolute top-0 left-0 h-full w-3/4 bg-[#B59410] rounded-full"></div>
          </div>
        </div>

        {/* Policy Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Quick Summary Sticky (3 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="sketch-paper-card-rose p-6 space-y-4">
              <h4 className="font-sketch text-lg text-[#1A1A2E] flex items-center gap-1.5">
                <ShieldAlert className="w-5 h-5 text-[#ef4444]" />
                <span>Policy Digest</span>
              </h4>
              
              <ul className="space-y-3 text-xs text-[#4A4A4A] font-medium leading-relaxed">
                <li className="flex gap-2 items-start">
                  <CheckCircle2 className="w-4 h-4 text-[#ef4444] shrink-0" />
                  <span><strong>All Sales Final:</strong> Downloadable visual PDF files are generally non-refundable once purchased.</span>
                </li>
                <li className="flex gap-2 items-start">
                  <CheckCircle2 className="w-4 h-4 text-[#ef4444] shrink-0" />
                  <span><strong>7-Day Window:</strong> File download failures, file corruption, or mismatched items must be reported within 7 days.</span>
                </li>
                <li className="flex gap-2 items-start">
                  <CheckCircle2 className="w-4 h-4 text-[#ef4444] shrink-0" />
                  <span><strong>Double Charge:</strong> Double payments processed by mistake are fully refunded back to source within 5-7 days.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Main Legal Content (8 Cols) */}
          <div className="lg:col-span-8 bg-white border-2 border-[#2D2D2D] rounded-xl p-8 shadow-[4px_4px_0px_0px_#2D2D2D] space-y-6 text-sm md:text-base text-[#4A4A4A] leading-relaxed font-medium">
            
            {/* Section 1 */}
            <section className="space-y-2">
              <h3 className="text-xl font-sketch text-[#1A1A2E] border-b-2 border-[#2D2D2D]/10 pb-2">
                1. Digital Nature of Products
              </h3>
              <p>
                ExamVault provides visual study guides, mind maps, flowcharts, and educational content compiled into downloadable digital formats (PDF). Because these materials are instantly delivered and downloaded to your local device immediately upon payment completion, **all standard purchases are final and non-refundable**.
              </p>
              <p>
                Once a PDF document is retrieved from our server links, it is permanently in your possession and cannot be physically returned. This is in accordance with standard digital content regulations in India.
              </p>
            </section>

            {/* Section 2 */}
            <section className="space-y-2">
              <h3 className="text-xl font-sketch text-[#1A1A2E] border-b-2 border-[#2D2D2D]/10 pb-2">
                2. Technical Delivery Issues
              </h3>
              <p>
                We stand behind our technology. If you encounter any of the following issues, we will gladly resolve them:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-sm">
                <li>
                  <strong>Failed Delivery:</strong> If you did not receive a redirect link or email download links after a successful transaction.
                </li>
                <li>
                  <strong>Corrupted Files:</strong> If the PDF file downloaded from our server is corrupted, unreadable, or displays rendering errors.
                </li>
                <li>
                  <strong>Wrong Content:</strong> If the file delivered is a different subject or category from the one shown in your invoice.
                </li>
              </ul>
              <p>
                In such cases, we will first attempt to deliver a clean, updated copy of the purchased materials to your verified email within 24 hours. If we fail to deliver the files after our technical support review, we will process a complete refund.
              </p>
            </section>

            {/* Section 3 */}
            <section className="space-y-2">
              <h3 className="text-xl font-sketch text-[#1A1A2E] border-b-2 border-[#2D2D2D]/10 pb-2">
                3. Double Charges & Payment Failures
              </h3>
              <p>
                In case of connectivity dropouts or gateway sync delays, you might get charged twice for a single order or get charged for a failed order:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-sm">
                <li>
                  <strong>Duplicate Payments:</strong> If you paid twice for the same subject/product due to a system lag, please report it. The duplicate charge will be fully refunded to your source account.
                </li>
                <li>
                  <strong>Charged on Failed Order:</strong> If the bank debited your balance but the checkout screen flagged the order as failed, the payment gateway (Razorpay) will automatically trigger a reversal. The amount is typically refunded to your bank account within 3 to 5 business days.
                </li>
              </ul>
            </section>

            {/* Section 4 */}
            <section className="space-y-2">
              <h3 className="text-xl font-sketch text-[#1A1A2E] border-b-2 border-[#2D2D2D]/10 pb-2">
                4. Refund Request Process
              </h3>
              <p>
                To request a refund or raise a delivery dispute, please follow these steps within **seven (7) days** of transaction:
              </p>
              <ol className="list-decimal pl-5 space-y-2 text-sm">
                <li>
                  Send an email to <span className="font-semibold text-[#1A1A2E]">support@examvault.in</span> with the subject line <code>Refund Request - [Your Order ID]</code>.
                </li>
                <li>
                  Include your purchase email address, registered phone number, and a screenshot of the payment receipt or Razorpay transaction ID.
                </li>
                <li>
                  Provide a brief description of the technical issue (e.g. failed download link, corrupted file, or duplicate charge).
                </li>
              </ol>
              <p>
                Our billing team will verify your transaction records and download log status. Approved refunds are credited back to the original payment source (UPI account, credit/debit card, or bank account) within 5 to 7 business days.
              </p>
            </section>
          </div>
        </div>

        {/* Contact Banner */}
        <div className="sketch-paper-card-blue p-8 text-center max-w-2xl mx-auto">
          <h4 className="text-xl font-sketch text-[#1A1A2E] mb-2 flex items-center justify-center gap-2">
            <AlertCircle className="w-5 h-5 text-[#229ED9]" />
            <span>Have a payment dispute?</span>
          </h4>
          <p className="text-sm text-[#4A4A4A] font-medium leading-relaxed mb-4 max-w-xl mx-auto">
            Please don't hesitate to reach out. We resolve payment issues, duplicate charges, and file delivery problems on high priority to protect your study time.
          </p>
          <Link href="/contact" className="text-sm font-bold text-[#229ED9] hover:underline flex items-center justify-center gap-1">
            <span>Open a Billing Ticket</span>
            <span>&rarr;</span>
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}
