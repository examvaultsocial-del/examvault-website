"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Navbar from "@/app/Navbar";
import Footer from "@/app/landingpage/footer";

export default function SecureDownloadPage() {
  const params = useParams();
  const token = params.token as string;

  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [bookTitle, setBookTitle] = useState("");
  const [expiryText, setExpiryText] = useState("");

  useEffect(() => {
    if (!token) {
      setError("Secure token is missing in download request URL.");
      setLoading(false);
      return;
    }

    const checkTokenMetadata = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/download", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token, peek: true }),
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Failed to query download token status.");
        }

        setBookTitle(data.bookTitle);
        
        const hoursLeft = Math.max(
          0,
          Math.round((new Date(data.expiresAt).getTime() - Date.now()) / (1000 * 60 * 60))
        );
        setExpiryText(hoursLeft > 0 ? `${hoursLeft} hours remaining` : "Expires soon");
      } catch (err: any) {
        console.error("Token verification error:", err);
        setError(err.message || "Invalid, expired, or previously triggered download link.");
      } finally {
        setLoading(false);
      }
    };

    checkTokenMetadata();
  }, [token]);

  const handlePhysicalDownload = async () => {
    try {
      setDownloading(true);
      setError("");

      const res = await fetch("/api/download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to process download link verification.");
      }

      // Convert base64 bytes to blob and trigger real browser download attachment
      const byteCharacters = atob(data.fileDataBase64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "application/pdf" });
      
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = data.fileName;
      document.body.appendChild(a);
      a.click();
      
      // Cleanup
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      setSuccess(true);
    } catch (err: any) {
      console.error("Download error:", err);
      setError(err.message || "Download request failed. The link may have just been locked.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow max-w-2xl w-full mx-auto px-4 py-16 md:py-24">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-400 mb-4"></div>
            <h3 className="text-xl font-bold text-black">Decrypting Download Passcode...</h3>
          </div>
        ) : error ? (
          <div className="border-4 border-black p-8 bg-rose-50 rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-2 bg-rose-500 border-b-2 border-black"></div>
            <div className="text-rose-500 text-5xl mb-4 font-black">⚠️</div>
            <h2 className="text-2xl font-black text-black tracking-tight mb-2">Link Expired or Invalid</h2>
            <p className="text-neutral-700 text-sm mb-6 leading-relaxed">
              {error}
            </p>
            <div className="bg-white border-2 border-black p-4 rounded-xl text-left text-xs mb-6 text-neutral-600 font-medium leading-relaxed">
              <strong>💡 Why did this happen?</strong>
              <p className="mt-1">
                To prevent illegal file sharing and respect copyright, all download links sent by email expire automatically under these conditions:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>They were clicked more than once (includes email scanning software).</li>
                <li>The 48-hour download window has closed.</li>
              </ul>
              <p className="mt-2 font-bold text-black">
                Need a replacement link? Please contact support@examvault.in with your transaction details.
              </p>
            </div>
            <Link
              href="/"
              className="inline-block bg-[#FCD34D] hover:bg-amber-400 text-black font-black px-6 py-3 border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all"
            >
              Return to Store
            </Link>
          </div>
        ) : success ? (
          <div className="border-4 border-black p-8 bg-emerald-50 rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-2 bg-emerald-500 border-b-2 border-black"></div>
            <div className="text-emerald-500 text-5xl mb-4">✅</div>
            <h2 className="text-2xl font-black text-black tracking-tight mb-2">Download Started!</h2>
            <p className="text-neutral-700 text-sm mb-6 leading-relaxed">
              Your visual guide <strong className="text-black">{bookTitle}</strong> is downloading. If it didn't start automatically, please click below to contact support.
            </p>
            <div className="bg-amber-50 border-2 border-amber-400 p-4 rounded-xl text-left text-xs text-neutral-700 font-medium leading-relaxed mb-6">
              <strong>🔒 Note on Link Locking:</strong>
              <p className="mt-1">
                This secure URL passcode has now been permanently locked. Please save the downloaded PDF files to a safe directory on your computer or phone for permanent lifetime access.
              </p>
            </div>
            <Link
              href="/products"
              className="inline-block bg-[#FCD34D] hover:bg-amber-400 text-black font-black px-6 py-3 border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all"
            >
              Back to Store Catalog
            </Link>
          </div>
        ) : (
          <div className="border-4 border-black rounded-3xl p-6 md:p-10 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-4 bg-amber-300 border-b-4 border-black"></div>
            
            <div className="text-center mt-4">
              <span className="inline-block bg-amber-100 border border-amber-300 px-3 py-1 rounded-full text-xs font-bold text-amber-800 mb-4 uppercase tracking-wider">
                🔒 Secure One-Time Gate
              </span>
              <h1 className="text-2xl md:text-4xl font-black text-black tracking-tight leading-tight mb-2">
                Download Visual Revision Guide
              </h1>
              <p className="text-neutral-500 text-xs md:text-sm font-bold">
                Security Passcode Verified • {expiryText}
              </p>
            </div>

            <div className="my-8 border-2 border-black rounded-2xl p-5 bg-[#FAF8F5] text-center">
              <span className="text-3xl block mb-2">📖</span>
              <h2 className="text-lg md:text-xl font-black text-black leading-snug">
                {bookTitle}
              </h2>
              <p className="text-xs text-neutral-400 font-bold mt-1">
                HIGH-RESOLUTION PDF ARCHIVE
              </p>
            </div>

            <div className="bg-amber-50 border-2 border-amber-400 rounded-xl p-4 mb-8 text-xs md:text-sm font-medium leading-relaxed text-amber-800">
              <strong>⚠️ Please Read Before Clicking:</strong>
              <p className="mt-1">
                Clicking the button below will instantly download your study notes and permanently invalidate this URL passcode. Ensure your internet connection is active and stable before starting.
              </p>
            </div>

            <div className="text-center">
              <button
                onClick={handlePhysicalDownload}
                disabled={downloading}
                className="w-full sm:w-auto bg-[#FCD34D] hover:bg-amber-400 disabled:bg-neutral-200 text-black font-black text-base px-8 py-4 border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] disabled:shadow-none disabled:translate-y-0 transition-all duration-150"
              >
                {downloading ? "Downloading PDF Guide..." : "Confirm & Download PDF Now"}
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
