"use client";

import React, { useEffect, useState } from "react";
import { useCart } from "./providers/CartProvider";
import { X, Trash2, ShoppingBag, ArrowRight, Lock, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const CartDrawer: React.FC = () => {
  const { cart, removeFromCart, cartOpen, setCartOpen } = useCart();
  const [isMounted, setIsMounted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Prevent background body scroll when cart is open
  useEffect(() => {
    if (cartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [cartOpen]);

  if (!isMounted) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = "Full Name is required";
    
    if (!formData.email.trim()) {
      newErrors.email = "Email Address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone Number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/[^0-9]/g, ""))) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      // Step 1: Request a new Razorpay Order from the server API
      const response = await fetch("/api/checkout/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
          },
          items: cart.map((item) => ({
            id: item.id,
            title: item.title,
            price: item.price,
            format: item.format,
            exam: item.exam,
          })),
        }),
      });

      const orderData = await response.json();

      if (!response.ok) {
        throw new Error(orderData.message || "Failed to create checkout order");
      }

      // Step 2: Open Razorpay Payment Overlay
      // We will load the Razorpay SDK dynamically if not already loaded
      const loadRazorpay = () => {
        return new Promise((resolve) => {
          const script = document.createElement("script");
          script.src = "https://checkout.razorpay.com/v1/checkout.js";
          script.onload = () => resolve(true);
          script.onerror = () => resolve(false);
          document.body.appendChild(script);
        });
      };

      const sdkLoaded = await loadRazorpay();
      if (!sdkLoaded) {
        alert("Secure Payment SDK failed to load. Are you offline?");
        setIsSubmitting(false);
        return;
      }

      const options = {
        key: orderData.razorpayKeyId, // Set dynamic key passed from backend
        amount: orderData.amount, // Amount in paise/cents
        currency: "INR",
        name: "ExamVault Store",
        description: `Secure checkout for ${cart.length} study guides`,
        order_id: orderData.razorpayOrderId,
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: "#B59410", // Primary Gold Theme Accent
        },
        handler: async function (response: any) {
          // This callback executes when payment is successful
          setIsSubmitting(true);
          try {
            // Verify payment on the server
            const verifyRes = await fetch("/api/checkout/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
                orderId: orderData.orderId, // Internal database order ID
              }),
            });

            const verifyData = await verifyRes.json();
            if (verifyRes.ok && verifyData.success) {
              // Clear cart on success
              window.location.href = `/checkout/success?orderId=${orderData.orderId}`;
            } else {
              throw new Error(verifyData.message || "Payment verification failed");
            }
          } catch (err: any) {
            alert(`Payment verification failed: ${err.message}`);
            setIsSubmitting(false);
          }
        },
        modal: {
          ondismiss: function () {
            setIsSubmitting(false);
          },
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();

    } catch (err: any) {
      console.error("Checkout failed:", err);
      alert(`Checkout failed: ${err.message || "Something went wrong"}`);
      setIsSubmitting(false);
    }
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
  const originalTotal = cart.reduce((sum, item) => sum + (item.originalPrice || item.price), 0);
  const savings = originalTotal - subtotal;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-[#2D2D2D]/60 backdrop-blur-[3px] transition-all duration-300 z-50 ${
          cartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setCartOpen(false)}
      />

      {/* Cart Drawer */}
      <div
        className={`fixed right-0 top-0 h-full w-full sm:w-[460px] bg-[#FDFBF7] shadow-2xl border-l-4 border-[#2D2D2D] transition-transform duration-300 z-50 flex flex-col ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="p-6 border-b-2 border-[#2D2D2D]/10 flex items-center justify-between bg-[#FFFDF9]">
          <div className="flex items-center gap-2">
            <Image
              src="/assets/process-icons/cart-store.svg"
              alt="Cart Illustration"
              width={32}
              height={32}
              className="w-8 h-8 object-contain mix-blend-multiply"
            />
            <h2 className="text-2xl font-sketch text-[#2D2D2D] font-bold">Your Study Cart</h2>
            {cart.length > 0 && (
              <span className="bg-[#B59410]/10 text-[#B59410] border border-[#B59410]/30 font-bold px-2 py-0.5 rounded-full text-xs font-sans">
                {cart.length} item{cart.length > 1 ? "s" : ""}
              </span>
            )}
          </div>
          <button
            onClick={() => setCartOpen(false)}
            className="p-1.5 rounded-full hover:bg-[#2D2D2D]/5 transition-colors group"
          >
            <X className="w-5 h-5 text-[#2D2D2D] group-hover:scale-110 transition-transform" />
          </button>
        </div>

        {/* Content Section */}
        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-[#FDFBF7]">
            <div className="relative w-36 h-36 mb-6 flex items-center justify-center border-4 border-dashed border-[#2D2D2D]/20 rounded-full overflow-hidden bg-white/20">
              <Image 
                src="/assets/process-icons/cart-store.svg"
                alt="Empty Cart Illustration"
                width={112}
                height={112}
                className="w-24 h-24 object-contain mix-blend-multiply transition-transform duration-500 hover:scale-110"
              />
            </div>
            <h3 className="text-xl font-sketch font-bold text-[#2D2D2D] mb-2">Your Cart is Empty</h3>
            <p className="text-sm font-sans text-[#4A4A4A] max-w-xs mb-8">
              Explore our range of premium visual infographics, detailed PDF notes, and revision mindmaps to accelerate your learning.
            </p>
            <button
              onClick={() => {
                setCartOpen(false);
              }}
              className="relative px-6 py-2.5 font-sketch text-[#2D2D2D] font-bold hover:translate-y-[-2px] hover:shadow-md transition-all active:scale-95 duration-150 bg-transparent border-0 cursor-pointer overflow-visible group"
            >
              {/* Sketchy Background Border Panel */}
              <div 
                className="absolute inset-0 z-0 bg-[#FCD34D] border-2 border-[#2D2D2D] transition-all duration-300"
                style={{
                  filter: 'url(#heavySketch)',
                  borderRadius: "3px 5px 2px 4px / 4px 3px 5px 2px",
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden',
                  willChange: 'filter, transform'
                }}
              />
              <span className="relative z-10 block">
                Browse Library
              </span>
            </button>
          </div>
        ) : (
          <>
            {/* Scrollable Cart Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-[#FDFBF7]">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="p-4 bg-white border-2 border-[#2D2D2D]/90 rounded-xl relative shadow-sm hover:shadow transition-shadow flex flex-col justify-between"
                  style={{
                    borderRadius: "4px 3px 5px 3px / 3px 5px 3px 4px",
                  }}
                >
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      {/* Format Badge & Exam */}
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-[10px] font-sans font-bold uppercase tracking-wider bg-[#B59410]/10 text-[#B59410] border border-[#B59410]/20 px-1.5 py-0.5 rounded">
                          {item.format}
                        </span>
                        <span className="text-[10px] font-sans font-semibold uppercase bg-[#2D2D2D]/5 text-[#2D2D2D]/70 px-1.5 py-0.5 rounded">
                          {item.exam}
                        </span>
                      </div>
                      
                      {/* Item Title */}
                      <h4 className="text-sm font-bold text-[#2D2D2D] leading-snug line-clamp-2">
                        {item.title}
                      </h4>
                    </div>

                    {/* Delete Item Button */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1 rounded text-red-500 hover:bg-red-50 transition-colors group shrink-0"
                      title="Remove study guide"
                    >
                      <Trash2 className="w-4 h-4 group-hover:scale-105 transition-transform" />
                    </button>
                  </div>

                  {/* Pricing Details */}
                  <div className="flex justify-between items-end mt-4 pt-2.5 border-t border-[#2D2D2D]/10">
                    <span className="text-xs text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded">
                      Instant PDF Download
                    </span>
                    <div className="flex items-center gap-2">
                      {item.originalPrice && item.originalPrice > item.price && (
                        <span className="text-xs line-through text-[#8A8A8A] font-semibold">
                          ₹{item.originalPrice}
                        </span>
                      )}
                      <span className="text-base font-bold text-[#2D2D2D]">
                        ₹{item.price}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Guest Checkout Panel */}
            <div className="px-4 py-3 sm:px-6 sm:py-4 bg-[#FFFDF9] border-t-2 border-[#2D2D2D]/20 shadow-[0_-4px_10px_rgba(0,0,0,0.02)] shrink-0">
              <div className="flex items-center gap-1.5 mb-2.5 sm:mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B59410]" />
                <h4 className="text-xs uppercase tracking-wider font-bold text-[#2D2D2D]">
                  Secure Delivery Info (No Sign-In Required)
                </h4>
              </div>

              <form onSubmit={handleCheckoutSubmit} className="space-y-2 sm:space-y-3">
                {/* Scrollable fields container for mobile keyboard height protection */}
                <div className="space-y-2 sm:space-y-3 max-h-[160px] sm:max-h-none overflow-y-auto pr-1 -mr-1 py-0.5">
                {/* Full Name */}
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your Full Name"
                    disabled={isSubmitting}
                    className="w-full bg-white text-[#2D2D2D] placeholder-[#8A8A8A] border-2 border-[#2D2D2D]/80 focus:border-[#B59410] focus:outline-none rounded-lg py-2 px-3 text-sm transition-colors font-medium"
                  />
                  {errors.name && (
                    <p className="text-[10px] text-red-500 font-semibold mt-0.5 px-1">{errors.name}</p>
                  )}
                </div>

                {/* Email Address */}
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email (Where to send study materials)"
                    disabled={isSubmitting}
                    className="w-full bg-white text-[#2D2D2D] placeholder-[#8A8A8A] border-2 border-[#2D2D2D]/80 focus:border-[#B59410] focus:outline-none rounded-lg py-2 px-3 text-sm transition-colors font-medium"
                  />
                  {errors.email && (
                    <p className="text-[10px] text-red-500 font-semibold mt-0.5 px-1">{errors.email}</p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="10-Digit Mobile Number"
                    disabled={isSubmitting}
                    className="w-full bg-white text-[#2D2D2D] placeholder-[#8A8A8A] border-2 border-[#2D2D2D]/80 focus:border-[#B59410] focus:outline-none rounded-lg py-2 px-3 text-sm transition-colors font-medium"
                  />
                  {errors.phone && (
                    <p className="text-[10px] text-red-500 font-semibold mt-0.5 px-1">{errors.phone}</p>
                  )}
                </div>
              </div>

              {/* Savings Summary Banner */}
                {savings > 0 && (
                  <div className="bg-green-50/80 border border-green-200 rounded-lg p-2 flex items-center justify-between text-xs text-green-700 font-bold mb-1">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-green-600 shrink-0" />
                      <span>Study Bundle Savings:</span>
                    </span>
                    <span>-₹{savings}</span>
                  </div>
                )}

                {/* Payment Actions Container */}
                <div className="pt-2 border-t border-[#2D2D2D]/10">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-bold text-[#4A4A4A]">Total Price:</span>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-[#2D2D2D]">₹{subtotal}</span>
                      <p className="text-[9px] text-[#8A8A8A] font-semibold font-sans">Inclusive of all taxes</p>
                    </div>
                  </div>

                  {/* Pay Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-4 font-sketch text-lg font-bold text-[#2D2D2D] bg-[#FCD34D] border-2 border-[#2D2D2D] rounded-lg shadow-sm hover:translate-y-[-2px] hover:shadow-md transition-all active:scale-95 duration-150 flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                    style={{
                      borderRadius: "3px 6px 2px 5px / 5px 3px 4px 3px",
                    }}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Connecting Securely...</span>
                      </div>
                    ) : (
                      <>
                        <Lock className="w-4 h-4 text-[#2D2D2D] group-hover:scale-110 transition-transform" />
                        <span>Pay ₹{subtotal} Securely</span>
                        <ArrowRight className="w-5 h-5 text-[#2D2D2D] group-hover:translate-x-1 transition-transform ml-1" />
                      </>
                    )}
                  </button>
                  
                  {/* Trust Footer */}
                  <p className="text-[10px] text-center text-[#8A8A8A] mt-2 font-medium flex items-center justify-center gap-1.5">
                    <Lock className="w-3 h-3 text-[#8A8A8A] shrink-0" />
                    <span>SSL Encrypted Checkout System</span>
                  </p>
                </div>
              </form>
            </div>
          </>
        )}
      </div>
      {/* Local high-intensity sketch filter */}
      <svg className="absolute w-0 h-0 pointer-events-none">
        <filter id="heavySketch">
          <feTurbulence type="fractalNoise" baseFrequency="0.05 0.15" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
    </>
  );
};
