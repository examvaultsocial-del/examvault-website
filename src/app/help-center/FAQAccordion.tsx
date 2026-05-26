"use client";

import React, { useState } from "react";
import { 
  ChevronDown, 
  ChevronUp, 
  Download, 
  CreditCard, 
  ShieldAlert, 
  RefreshCw 
} from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  items: FAQItem[];
}

export default function FAQAccordion() {
  const [activeCategory, setActiveCategory] = useState<string>("downloads");
  const [openIndexes, setOpenIndexes] = useState<{ [key: string]: boolean }>({});

  const toggleAccordion = (categoryId: string, index: number) => {
    const key = `${categoryId}-${index}`;
    setOpenIndexes((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const faqData: FAQCategory[] = [
    {
      id: "downloads",
      name: "Products & Downloads",
      icon: <Download className="w-5 h-5" />,
      items: [
        {
          question: "In what format are the study materials delivered?",
          answer: "All our visual learning notes are delivered as high-resolution PDF documents. You can instantly download them upon purchase and open them on any smartphone, tablet, laptop, or desktop reader.",
        },
        {
          question: "Can I print the visual maps and flowcharts?",
          answer: "Yes, absolutely! All infographics, comparison tables, and mind maps in our PDFs are compiled at 300 DPI (high-definition print standard). They are optimized for standard A4 paper size, ensuring that all micro-details and text remain perfectly crisp when printed.",
        },
        {
          question: "Are these visual notes sufficient on their own to clear the exams?",
          answer: "Our visual materials are designed to simplify complex concepts and serve as ultimate revision notes. While they cover high-yield syllabus areas, competitive examinations (like UPSC) require deep reading. We recommend using our visual maps alongside standard reference textbooks to serve as a strong conceptual anchor and fast revision tool.",
        },
      ],
    },
    {
      id: "payments",
      name: "Payments & Billing",
      icon: <CreditCard className="w-5 h-5" />,
      items: [
        {
          question: "Which payment methods are accepted?",
          answer: "We support a wide range of secure payment options through our partner payment gateway, Razorpay. You can pay using UPI (Google Pay, PhonePe, Paytm, BHIM), Netbanking (all major Indian banks), Credit or Debit Cards (Visa, Mastercard, RuPay), and popular mobile wallets.",
        },
        {
          question: "My transaction succeeded, but I did not receive the download link. What should I do?",
          answer: "Immediately after checkout, you should be redirected to the download screen. A secure copy of the download link is also sent to your email. If you don't receive it within 10 minutes, please check your Spam/Promotions folder. If it is still missing, email support@examvault.in or send us a WhatsApp message with your transaction ID and purchase email, and we will manually deliver the files within 2 hours.",
        },
        {
          question: "Is my payment information secure?",
          answer: "Yes. All payments are processed through Razorpay's 100% secure, PCI-DSS compliant payment system. ExamVault does not collect, access, or store any of your sensitive credit card or netbanking login credentials.",
        },
      ],
    },
    {
      id: "licensing",
      name: "Licensing & Copyright",
      icon: <ShieldAlert className="w-5 h-5" />,
      items: [
        {
          question: "Can I share my purchased PDFs with fellow aspirants?",
          answer: "No. Each purchase of our visual notes grants a strictly non-transferable, single-user personal study license. Redistributing, uploading to public drives, or sharing our files on Telegram channels and WhatsApp groups is a direct violation of our copyrights under the Indian Copyright Act, 1957.",
        },
        {
          question: "What is dynamic digital watermarking?",
          answer: "To prevent unauthorized sharing and protect our content, every downloaded PDF is embedded with a unique, dynamic, and non-removable digital watermark. This watermark encodes your purchase email, mobile number, and transaction ID across the pages. In the event of leakage, we trace the source watermark and immediately suspend access, blacklist the user, and initiate legal proceedings.",
        },
        {
          question: "Do you offer institutional licenses for coaching centers?",
          answer: "Currently, our standard products are licensed only for individual students. If you run a tutoring center or coaching institute and wish to license our visual infographics for group study, please reach out to us at licensing@examvault.in to discuss custom bulk pricing packages.",
        },
      ],
    },
    {
      id: "updates",
      name: "Updates & Syllabus Changes",
      icon: <RefreshCw className="w-5 h-5" />,
      items: [
        {
          question: "How often is the content updated?",
          answer: "We review and update our study notes annually to match changes in exam trends, syllabus modifications, and current affairs relevance (especially for UPSC Prelims/Mains). Our design team constantly refines visual layouts to make learning even easier.",
        },
        {
          question: "Will I get access to future updates of my purchased notes?",
          answer: "Yes. When you purchase a subject pack, you receive free minor updates (e.g., typos, factual corrections, current affairs additions) for that specific subject package during the active examination cycle (up to the next exam date). Major structural updates or brand new subject releases require a separate purchase.",
        },
      ],
    },
  ];

  const currentCategory = faqData.find((cat) => cat.id === activeCategory) || faqData[0];

  return (
    <div className="w-full">
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-3 mb-10 justify-center">
        {faqData.map((category) => {
          const isActive = activeCategory === category.id;
          return (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-2 px-5 py-3 border-2 border-[#2D2D2D] rounded-xl font-sketch text-sm shadow-[3px_3px_0px_#2D2D2D] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#2D2D2D] transition-all cursor-pointer ${
                isActive 
                  ? "bg-[#B59410] text-white" 
                  : "bg-white text-[#2D2D2D] hover:bg-[#B59410]/5"
              }`}
            >
              {category.icon}
              <span>{category.name}</span>
            </button>
          );
        })}
      </div>

      {/* Accordion List */}
      <div className="space-y-4 max-w-3xl mx-auto">
        {currentCategory.items.map((item, idx) => {
          const isOpen = !!openIndexes[`${currentCategory.id}-${idx}`];
          return (
            <div 
              key={idx}
              className="border-2 border-[#2D2D2D] rounded-xl bg-white overflow-hidden shadow-[4px_4px_0px_0px_#2D2D2D] transition-all"
            >
              {/* Header Toggle */}
              <button
                onClick={() => toggleAccordion(currentCategory.id, idx)}
                className="w-full flex items-center justify-between p-5 text-left font-sketch text-base md:text-lg text-[#1A1A2E] hover:bg-[#B59410]/5 transition-colors cursor-pointer select-none"
              >
                <span className="pr-4">{item.question}</span>
                {isOpen ? (
                  <ChevronUp className="w-5 h-5 shrink-0 text-[#B59410]" />
                ) : (
                  <ChevronDown className="w-5 h-5 shrink-0 text-[#2D2D2D]" />
                )}
              </button>

              {/* Collapsible Content */}
              {isOpen && (
                <div className="border-t-2 border-[#2D2D2D]/10 p-5 bg-[#FFFDF4] text-sm md:text-base text-[#4A4A4A] leading-relaxed font-medium">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
