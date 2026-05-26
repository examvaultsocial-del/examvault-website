"use client";

import React, { useState } from "react";
import { CheckCircle2, AlertCircle, Loader2, Send } from "lucide-react";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    examCategory: "UPSC Civil Services",
    inquiryType: "Technical Issue",
    orderId: "",
    message: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [ticketId, setTicketId] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.name.trim()) newErrors.name = "Please enter your name.";
    if (!form.email.trim()) {
      newErrors.email = "Please enter your email.";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!form.message.trim()) newErrors.message = "Please write a message.";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");

    // Mock API Call delay
    setTimeout(() => {
      // Generate a random ticket ID
      const randomId = `EV-${Math.floor(10000 + Math.random() * 90000)}`;
      setTicketId(randomId);
      setStatus("success");
    }, 1500);
  };

  if (status === "success") {
    return (
      <div className="sketch-paper-card-gold p-8 text-center max-w-lg mx-auto animate-scale-in">
        <div className="w-16 h-16 rounded-full border-4 border-[#2D2D2D] bg-[#22c55e]/10 flex items-center justify-center mx-auto mb-6 shadow-[3px_3px_0px_#2D2D2D]">
          <CheckCircle2 className="w-8 h-8 text-[#22c55e]" />
        </div>
        
        <h3 className="text-3xl font-sketch text-[#1A1A2E] mb-2">
          Ticket Received!
        </h3>
        <p className="font-medium text-sm text-[#4A4A4A] mb-6 pen-note text-lg">
          "We've logged your request in our system."
        </p>

        <div className="border-t-2 border-dashed border-[#2D2D2D]/20 pt-6 pb-6 text-left space-y-3 font-mono text-xs max-w-sm mx-auto">
          <div className="flex justify-between">
            <span className="text-[#4A4A4A]">Ticket Reference:</span>
            <span className="font-bold text-[#1A1A2E]">{ticketId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#4A4A4A]">Name:</span>
            <span className="font-bold text-[#1A1A2E]">{form.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#4A4A4A]">Inquiry:</span>
            <span className="font-bold text-[#1A1A2E]">{form.inquiryType}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#4A4A4A]">Category:</span>
            <span className="font-bold text-[#1A1A2E]">{form.examCategory}</span>
          </div>
        </div>

        <p className="text-sm text-[#4A4A4A] leading-relaxed font-medium mb-6">
          A confirmation receipt and copy of this request have been sent to <span className="font-semibold text-[#1A1A2E]">{form.email}</span>. Our support team will address your issue within 4 to 6 business hours.
        </p>

        <button
          onClick={() => {
            setForm({
              name: "",
              email: "",
              examCategory: "UPSC Civil Services",
              inquiryType: "Technical Issue",
              orderId: "",
              message: "",
            });
            setStatus("idle");
          }}
          className="px-6 py-2.5 border-2 border-[#2D2D2D] bg-white text-[#2D2D2D] font-sketch rounded-xl shadow-[3px_3px_0px_#2D2D2D] hover:bg-[#B59410]/5 transition-all cursor-pointer"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="sketch-paper-card-rose p-8 space-y-6">
      <h3 className="text-2xl font-sketch text-[#1A1A2E] mb-2">
        Send Us a Message
      </h3>
      <p className="text-xs text-[#4A4A4A] font-medium leading-relaxed mb-6">
        Please fill out the form below. For order-specific issues, providing your Order ID helps us resolve them much faster.
      </p>

      {/* Name Input */}
      <div>
        <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-[#1A1A2E] mb-2">
          Full Name <span className="text-[#ef4444]">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          disabled={status === "submitting"}
          className={`w-full bg-[#B59410]/5 border-2 border-[#2D2D2D] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#B59410] transition-colors font-medium ${
            errors.name ? "border-[#ef4444] bg-[#ef4444]/5" : ""
          }`}
          placeholder="e.g. Rahul Sharma"
        />
        {errors.name && (
          <div className="flex items-center gap-1 mt-1 text-[#ef4444] text-xs font-semibold">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{errors.name}</span>
          </div>
        )}
      </div>

      {/* Email Input */}
      <div>
        <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-[#1A1A2E] mb-2">
          Email Address <span className="text-[#ef4444]">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          disabled={status === "submitting"}
          className={`w-full bg-[#B59410]/5 border-2 border-[#2D2D2D] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#B59410] transition-colors font-medium ${
            errors.email ? "border-[#ef4444] bg-[#ef4444]/5" : ""
          }`}
          placeholder="e.g. rahul@example.com"
        />
        {errors.email && (
          <div className="flex items-center gap-1 mt-1 text-[#ef4444] text-xs font-semibold">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{errors.email}</span>
          </div>
        )}
      </div>

      {/* Grid: Category & Issue Type */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Exam Category */}
        <div>
          <label htmlFor="examCategory" className="block text-xs font-bold uppercase tracking-wider text-[#1A1A2E] mb-2">
            Exam Category
          </label>
          <select
            id="examCategory"
            name="examCategory"
            value={form.examCategory}
            onChange={handleChange}
            disabled={status === "submitting"}
            className="w-full bg-[#FFFDF4] border-2 border-[#2D2D2D] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#B59410] transition-colors font-medium cursor-pointer"
          >
            <option>UPSC Civil Services</option>
            <option>SSC Exams</option>
            <option>Banking Exams</option>
            <option>State PSC Exams</option>
            <option>Other Categories</option>
          </select>
        </div>

        {/* Inquiry Type */}
        <div>
          <label htmlFor="inquiryType" className="block text-xs font-bold uppercase tracking-wider text-[#1A1A2E] mb-2">
            Inquiry Type
          </label>
          <select
            id="inquiryType"
            name="inquiryType"
            value={form.inquiryType}
            onChange={handleChange}
            disabled={status === "submitting"}
            className="w-full bg-[#FFFDF4] border-2 border-[#2D2D2D] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#B59410] transition-colors font-medium cursor-pointer"
          >
            <option>Technical Issue</option>
            <option>Billing/Payment Query</option>
            <option>Content Feedback</option>
            <option>General Inquiry</option>
          </select>
        </div>
      </div>

      {/* Order ID / Transaction ID */}
      <div>
        <label htmlFor="orderId" className="block text-xs font-bold uppercase tracking-wider text-[#1A1A2E] mb-2">
          Order ID / Transaction ID <span className="text-[#4A4A4A]/50 font-normal">(Optional)</span>
        </label>
        <input
          type="text"
          id="orderId"
          name="orderId"
          value={form.orderId}
          onChange={handleChange}
          disabled={status === "submitting"}
          className="w-full bg-[#B59410]/5 border-2 border-[#2D2D2D] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#B59410] transition-colors font-medium"
          placeholder="e.g. pay_N1x2Y3z4 (from Razorpay receipt)"
        />
      </div>

      {/* Message Input */}
      <div>
        <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-[#1A1A2E] mb-2">
          Your Message <span className="text-[#ef4444]">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={form.message}
          onChange={handleChange}
          disabled={status === "submitting"}
          className={`w-full bg-[#B59410]/5 border-2 border-[#2D2D2D] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#B59410] transition-colors font-medium resize-none ${
            errors.message ? "border-[#ef4444] bg-[#ef4444]/5" : ""
          }`}
          placeholder="Detail your inquiry or issue here..."
        />
        {errors.message && (
          <div className="flex items-center gap-1 mt-1 text-[#ef4444] text-xs font-semibold">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{errors.message}</span>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full py-4 border-2 border-[#2D2D2D] bg-[#B59410] text-white font-sketch text-base rounded-xl shadow-[4px_4px_0px_#2D2D2D] hover:scale-101 hover:shadow-[3px_3px_0px_#2D2D2D] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#2D2D2D] transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed select-none"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Submitting Ticket...</span>
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            <span>Submit Support Ticket</span>
          </>
        )}
      </button>
    </form>
  );
}
