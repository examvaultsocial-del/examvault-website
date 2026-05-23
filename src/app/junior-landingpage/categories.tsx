import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { GoldenUnderline } from "@/components/GoldenUnderline";

export default function JuniorCategories() {
  const levels = [
    {
      title: "Early Discovery",
      grade: "Jr KG - 1st Std",
      desc: "Fun activities, basic concepts and colorful learning for tiny explorers.",
      image: "/assets/images/junior-landingpage/bearwithmagnifuingglass-categories.png",
      href: "/products?category=junior&level=early"
    },
    {
      title: "Primary Explorer",
      grade: "2nd - 4th Std",
      desc: "Stronger concepts, interactive learning and skill building.",
      image: "/assets/images/junior-landingpage/elephentreadingbook-categories.png",
      href: "/products?category=junior&level=primary"
    },
    {
      title: "Middle Scholars",
      grade: "5th - 7th Std",
      desc: "Concept clarity, practice and confidence for school success.",
      image: "/assets/images/junior-landingpage/boysitonplanet-categories.png",
      href: "/products?category=junior&level=middle"
    }
  ];

  return (
    <section className="py-12 px-6 max-w-7xl mx-auto w-full relative">

      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl pencil-sketch inline-block relative text-[#2D2D2D]">
          Learning for Every Young Explorer
          <GoldenUnderline className="absolute top-[105%] left-1/2 -translate-x-1/2 w-48 text-[#B59410] opacity-80 h-4 pointer-events-none" />
        </h2>
      </div>

      {/* Levels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-5 lg:gap-6">
        {levels.map((lvl, index) => (
          <Link
            key={index}
            href={lvl.href}
            className="flex flex-col items-center text-center p-6 md:p-7 bg-transparent rounded-[20px] relative transition-all duration-300 group overflow-hidden cursor-pointer hover:opacity-80"
            style={{
              filter: "url(#pencilFilter)",
              border: "2.5px solid #B59410"
            }}
          >
            {/* Illustration Container - Larger */}
            <div className="w-full aspect-[3/2] flex items-center justify-center mb-4 relative">
              <Image
                src={lvl.image}
                alt={lvl.title}
                width={300}
                height={200}
                className="w-full h-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* Level Title */}
            <h3 className="text-xl md:text-2xl text-[#2D2D2D] mb-2 leading-tight font-semibold">
              {lvl.title}
            </h3>

            {/* Level Grade Badge - Sketchy with primary color */}
            <div
              className="inline-flex items-center justify-center px-3.5 py-1.5 rounded-[12px] bg-[#B59410] text-xs font-bold text-white mb-3"
              style={{
                filter: "url(#pencilFilter)"
              }}
            >
              <span>{lvl.grade}</span>
            </div>

            {/* Description */}
            <p className="text-xs text-[#5A5A75] font-semibold leading-snug mb-4 max-w-[220px]">
              {lvl.desc}
            </p>

            {/* Explore Button */}
            <div className="group/btn inline-flex items-center gap-1.5 text-xs font-sketch text-[#B59410] font-bold">
              <span className="border-b-2 border-[#B59410] group-hover/btn:border-[#B59410]/70">Explore Now</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
