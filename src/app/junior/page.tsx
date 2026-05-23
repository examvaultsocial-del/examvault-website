"use client";

import React from "react";
import JuniorNavbar from "@/app/JuniorNavbar";
import JuniorHero from "@/app/junior-landingpage/hero";
import JuniorCategories from "@/app/junior-landingpage/categories";
import JuniorPopularMaterials from "@/app/junior-landingpage/popular-materials";
import JuniorFeatures from "@/app/junior-landingpage/features";
import JuniorProcess from "@/app/junior-landingpage/process";
import JuniorCTA from "@/app/junior-landingpage/cta";
import JuniorFooter from "@/app/junior-landingpage/footer";

export default function JuniorPage() {
  return (
    <main className="min-h-screen relative overflow-x-hidden">
      {/* Navbar */}
      <JuniorNavbar />

      {/* Hero Header */}
      <JuniorHero />

      {/* Learning Pathways / Categories */}
      <JuniorCategories />

      {/* Popular Visual Materials */}
      <JuniorPopularMaterials />

      {/* Key Core Features */}
      <JuniorFeatures />

      {/* How it Works Process */}
      <JuniorProcess />

      {/* Interactive CTA Card */}
      <JuniorCTA />

      {/* Branded Footer */}
      <JuniorFooter />
    </main>
  );
}
