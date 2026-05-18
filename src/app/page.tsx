import Navbar from "./Navbar";
import Hero from "./landingpage/hero";
import Categories from "./landingpage/categories";
import PopularMaterials from "./landingpage/popular-materials";
import Features from "./landingpage/features";
import Process from "./landingpage/process";
import Testimonials from "./landingpage/testimonials";
import CTA from './landingpage/cta';
import Footer from './landingpage/footer';




export default function Home() {
  return (
    <main className="min-h-screen w-full flex flex-col p-4 md:p-6 lg:p-1 pt-2 md:pt-4 relative overflow-hidden">
      <Navbar />
      <Hero />
      <Categories />
      <PopularMaterials />
      <Features />
      <Process />
      <Testimonials />
      <CTA />
      <Footer />



      {/* You can add more sections here like <Features />, <Pricing />, etc. */}
    </main>
  );
}