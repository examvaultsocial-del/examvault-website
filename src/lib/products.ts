export interface Product {
  id: string | number;
  title: string;
  exam: string;
  subject: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  format: string;
  tags: string[];
  description: string;
  features: string[];
  pagesCount: number;
  fileSize: string;
  syllabusCoverage: string;
  category?: string;
  image?: string;
  level?: string;
  previews?: string[];
}

export const allProducts: Product[] = [
  {
    id: "JP-PDF-PARENT-AI-V1",
    title: "Parents' AI Learning Guide",
    exam: "Junior Parent AI",
    subject: "Parents' Playbook: Teach Smarter",
    price: 49,
    originalPrice: 79,
    rating: 5.0,
    reviews: 0,
    format: "PDF Guide",
    tags: ["pdf", "AI-learning"],
    description: "Empower your parenting with 49 copy-paste ready AI prompts designed to teach reading, math, science, and life skills to your 5-6 year old child.",
    features: [
      "49 Copy-Paste Ready Prompts",
      "Dino-Tutor Persona Setup",
      "Comprehensive Safety Guide",
      "Printable Trackers & Worksheets"
    ],
    pagesCount: 28,
    fileSize: "12.5 MB",
    syllabusCoverage: "100% Core Competencies",
    category: "junior",
    image: "/assets/images/products/junior/JP-PDF-PARENT-AI-V1/cover.png",
    level: "Jr KG - 1st Std",
    previews: [
      "/assets/images/products/junior/JP-PDF-PARENT-AI-V1/cover.png",
      "/assets/images/products/junior/JP-PDF-PARENT-AI-V1/index.png",
      "/assets/images/products/junior/JP-PDF-PARENT-AI-V1/preview-1.png",
      "/assets/images/products/junior/JP-PDF-PARENT-AI-V1/preview-2.png",
      "/assets/images/products/junior/JP-PDF-PARENT-AI-V1/preview-3.png"
    ]
  }
];
