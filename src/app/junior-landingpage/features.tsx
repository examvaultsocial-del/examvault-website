import Image from "next/image";

export default function JuniorFeatures() {
  const features = [
    {
      title: "Concepts Made Simple",
      desc: "Complex topics explained in a child-friendly way.",
      icon: "/assets/images/junior-landingpage/features-icon/puzzle-icon.svg"
    },
    {
      title: "Builds Confidence",
      desc: "Encourages independent learning and growth.",
      icon: "/assets/images/junior-landingpage/features-icon/trophy-icon.svg"
    },
    {
      title: "Loved by Kids",
      desc: "Fun visuals and activities make learning enjoyable.",
      icon: "/assets/images/junior-landingpage/features-icon/smile-icon.svg"
    },
    {
      title: "Supports School Learning",
      desc: "Perfect companion for school studies.",
      icon: "/assets/images/junior-landingpage/features-icon/book-icon.svg"
    },
    {
      title: "Screen-Friendly PDFs",
      desc: "Easy to read on all devices.",
      icon: "/assets/images/junior-landingpage/features-icon/tablet-icon.svg"
    },
    {
      title: "Safe & Age-Appropriate",
      desc: "Curated content for every age and stage.",
      icon: "/assets/images/junior-landingpage/features-icon/trust-icon.svg"
    }
  ];

  return (
    <section className="py-12 px-6 max-w-7xl mx-auto w-full">
      <div className="flex flex-col lg:flex-row items-start justify-between gap-12">

        {/* Left Side: Illustration */}
        <div className="w-full lg:w-[35%] flex justify-center lg:justify-start">
          <div className="relative w-full max-w-[500px]">
            <Image
              src="/assets/images/junior-landingpage/featuressection-girl.png"
              alt="Why Parents Love ExamVault Junior"
              width={500}
              height={600}
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

        {/* Right Side: Features Grid */}
        <div className="w-full lg:w-[70%]">
          {/* Title */}
          <div className="mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2D2D2D] leading-tight">
              Why Parents Love ExamVault Junior
            </h2>
          </div>

          {/* Features Grid - 2 rows x 3 columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {features.map((feat, index) => (
              <div key={index} className="flex flex-row items-start gap-3">
                {/* Icon */}
                <div className="w-16 h-16 flex items-center justify-center flex-shrink-0">
                  <Image
                    src={feat.icon}
                    alt={feat.title}
                    width={64}
                    height={64}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Text Content */}
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-sm font-bold text-[#2D2D2D] leading-tight">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-[#5A5A75] font-medium leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
