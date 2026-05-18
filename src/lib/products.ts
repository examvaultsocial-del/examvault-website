export interface Product {
  id: number;
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
}

export const allProducts: Product[] = [
  {
    id: 1,
    title: "UPSC Indian Polity - Visually Structured Core Mindmaps",
    exam: "upsc",
    subject: "Polity",
    price: 499,
    originalPrice: 999,
    rating: 4.9,
    reviews: 328,
    format: "Visual Notes",
    tags: ["Best Seller"],
    description: "Master Indian Polity with high-fidelity visual summaries, structured concept maps, and core constitutional articles. Perfect for rapid revision and long-term visual recall.",
    features: [
      "Covers Laxmikanth chapters visually",
      "Historical Background & Preamble mindmaps",
      "Fundamental Rights & Directive Principles diagrams",
      "Parliament & Judiciary high-yield flowcharts",
      "Latest constitutional amendments included"
    ],
    pagesCount: 142,
    fileSize: "24 MB",
    syllabusCoverage: "92% of Polity Syllabus"
  },
  {
    id: 2,
    title: "UPSC Modern Indian History - Hand-Drawn Timelines & Maps",
    exam: "upsc",
    subject: "History",
    price: 399,
    originalPrice: 799,
    rating: 4.8,
    reviews: 210,
    format: "Mind Maps",
    tags: ["PDF"],
    description: "Track the complex chronology of Modern Indian History with beautifully mapped hand-drawn timelines and critical location charts.",
    features: [
      "1857 Revolt location maps & triggers",
      "Governor Generals & Viceroys chronology",
      "Socio-Religious Reform Movements summaries",
      "Gandhian Era & Indian National Congress timelines",
      "Revolutionary movements visual guide"
    ],
    pagesCount: 96,
    fileSize: "18 MB",
    syllabusCoverage: "88% of Modern History"
  },
  {
    id: 3,
    title: "SSC CGL Quantitative Aptitude - Video Mastery Course",
    exam: "ssc",
    subject: "Science",
    price: 1499,
    originalPrice: 2999,
    rating: 4.7,
    reviews: 580,
    format: "Tests & Quizzes",
    tags: ["Video"],
    description: "Skip the heavy math text books. Master CGL Quantitative Aptitude with practical shortcuts, visual derivation rules, and comprehensive mock questions.",
    features: [
      "15 High-Definition visual lectures",
      "Arithmetic shortcuts & formula tables",
      "Geometry visual proofs and cheatsheets",
      "5 Full-length sectional tests with logic walk-throughs",
      "Lifetime updates to latest CGL pattern questions"
    ],
    pagesCount: 220,
    fileSize: "1.2 GB (Video Stream + PDFs)",
    syllabusCoverage: "95% of SSC CGL Math Syllabus"
  },
  {
    id: 4,
    title: "Banking Economy & Financial Awareness Quick Revision Charts",
    exam: "banking",
    subject: "Economy",
    price: 249,
    originalPrice: 499,
    rating: 4.6,
    reviews: 142,
    format: "Visual Notes",
    tags: ["New Arrival"],
    description: "Accelerate your banking exam prep with visual breakdowns of complex economic concepts, banking structures, and financial institutions.",
    features: [
      "RBI Monetary Policy parameters visual sheet",
      "Banking & Financial terminology charts",
      "Inflation, Banking Ombudsman & NPAs demystified",
      "Union Budget & Economic Survey mindmaps",
      "Digital Banking & UPI ecosystem timelines"
    ],
    pagesCount: 65,
    fileSize: "12 MB",
    syllabusCoverage: "90% of Banking General Awareness"
  },
  {
    id: 5,
    title: "State PSC Physical & Indian Geography Visual Handbook",
    exam: "state",
    subject: "Geography",
    price: 599,
    originalPrice: 1199,
    rating: 4.8,
    reviews: 185,
    format: "Visual Notes",
    tags: ["PDF"],
    description: "An elegant geography prep guide featuring rich hand-drawn sketches of physiological mappings, weather structures, and resource distributions.",
    features: [
      "Indian River Systems & origin points visual catalog",
      "Soil distribution & agricultural zone maps",
      "Atmospheric Circulation & Monsoon cycles flowcharts",
      "Mountain systems & passes high-resolution charts",
      "PYQ-based state geography high-yield cards"
    ],
    pagesCount: 168,
    fileSize: "32 MB",
    syllabusCoverage: "94% of Geography GS"
  },
  {
    id: 6,
    title: "Railways RRB NTPC General Science Comprehensive Mock Series",
    exam: "railways",
    subject: "Science",
    price: 199,
    originalPrice: 399,
    rating: 4.5,
    reviews: 290,
    format: "PYQs & Solutions",
    tags: ["PDF"],
    description: "Crack the Railways General Science section with visual physics, chemistry, and biology diagrams paired with comprehensive practice PYQs.",
    features: [
      "Human Physiology & body system diagram sheets",
      "Periodic Table key groupings & chemical reactions",
      "Mechanics & Optics formulas visual cards",
      "10 Sectional Mock tests with detailed sketch keys",
      "Latest RRB NTPC solved PYQs"
    ],
    pagesCount: 88,
    fileSize: "15 MB",
    syllabusCoverage: "89% of RRB NTPC GS"
  },
  {
    id: 7,
    title: "UPSC Physical Geography (GS Paper I) Complete Video Lectures",
    exam: "upsc",
    subject: "Geography",
    price: 2499,
    originalPrice: 4999,
    rating: 4.9,
    reviews: 412,
    format: "Combo Packs",
    tags: ["Video"],
    description: "An immersive, beautifully recorded video curriculum unlocking physical geography through visual graphics, 3D terrains, and visual mindmaps.",
    features: [
      "22 Full video sessions detailing core concepts",
      "Geomorphology, Climatology, and Oceanography maps",
      "Includes 180 printable visual revision sheets",
      "Integrated previous years' questions analysis",
      "Direct email channel to syllabus creators for doubts"
    ],
    pagesCount: 350,
    fileSize: "2.4 GB (Videos + PDF Guides)",
    syllabusCoverage: "98% of Physical Geography"
  },
  {
    id: 8,
    title: "SSC CGL History & Culture Sketch revision Booklet",
    exam: "ssc",
    subject: "History",
    price: 299,
    originalPrice: 599,
    rating: 4.6,
    reviews: 165,
    format: "Mind Maps",
    tags: ["PDF"],
    description: "Revise SSC History & Culture in one sitting! This booklet condenses huge volumes into fast, memorable sketches.",
    features: [
      "Ancient Indus Valley Civilization visual guide",
      "Mughal Art, Culture, and Architecture illustrations",
      "Indian classical dance & folk music sketch lists",
      "Sufi & Bhakti Movements structured mindmaps",
      "High-yield facts flashcards for CGL General Studies"
    ],
    pagesCount: 78,
    fileSize: "14 MB",
    syllabusCoverage: "87% of History Syllabus"
  },
  {
    id: 9,
    title: "Banking General Awareness Full Prep Mock Test Pack",
    exam: "banking",
    subject: "Polity",
    price: 499,
    originalPrice: 999,
    rating: 4.5,
    reviews: 310,
    format: "Tests & Quizzes",
    tags: ["PDF"],
    description: "Boost your score in General Awareness with standard full prep banking mock examinations backed by visual explanation summaries.",
    features: [
      "12 Full-length Mock Tests with answer explanations",
      "Static Banking Awareness visual checklists",
      "Financial markets & regulatory bodies guides",
      "Updated with current affairs pointers",
      "Interactive scorecard analysis charts"
    ],
    pagesCount: 154,
    fileSize: "21 MB",
    syllabusCoverage: "91% of Banking Exam Syllabus"
  },
  {
    id: 10,
    title: "State PSC Indian Polity & Governance Video Syllabus Guide",
    exam: "state",
    subject: "Polity",
    price: 1899,
    originalPrice: 3799,
    rating: 4.8,
    reviews: 95,
    format: "PYQs & Solutions",
    tags: ["Video"],
    description: "A premium video syllabus guide tracing State Governance patterns, Panchayati Raj systems, and local administrative setups visually.",
    features: [
      "State Legislature & Governor functions visual mapping",
      "73rd & 74th Constitutional Amendments deep-dive charts",
      "12 Video lessons explaining key polity statutes",
      "Interactive revision exercises with flowcharts",
      "Includes downloadable PDF workbook sheets"
    ],
    pagesCount: 190,
    fileSize: "1.8 GB (Videos & Files)",
    syllabusCoverage: "93% of State PSC Polity GS"
  },
  {
    id: 11,
    title: "UPSC Economy Core Concepts & Budget Visual Breakdown",
    exam: "upsc",
    subject: "Economy",
    price: 349,
    originalPrice: 699,
    rating: 4.7,
    reviews: 180,
    format: "Visual Notes",
    tags: ["Best Seller"],
    description: "Navigate economic policy, taxation, national income, and annual budgets using visual flowcharts, structural charts, and dynamic trend lines.",
    features: [
      "National Income (GDP, GNP, GVA) conceptual maps",
      "Fiscal Policy & Direct/Indirect tax structures",
      "Latest Union Budget core focus areas & infographics",
      "Inflation, Banking, and Money Supply models",
      "Economic Survey summary maps"
    ],
    pagesCount: 84,
    fileSize: "16 MB",
    syllabusCoverage: "91% of Economy GS Syllabus"
  },
  {
    id: 12,
    title: "SSC CGL Economy & Static General Knowledge Booklet",
    exam: "ssc",
    subject: "Economy",
    price: 199,
    originalPrice: 399,
    rating: 4.5,
    reviews: 210,
    format: "Visual Notes",
    tags: ["PDF"],
    description: "A lightweight, printable revision handbook compiling high-yield economic models and static GK charts for maximum efficiency.",
    features: [
      "Five-Year Plans summary timeline",
      "Indian Tax structure & GST diagram",
      "Core terminology index sheets",
      "Currency & Financial Institutions handbook",
      "Interactive quick-revision GK tables"
    ],
    pagesCount: 55,
    fileSize: "9 MB",
    syllabusCoverage: "85% of Static GS Core"
  },
  {
    id: 13,
    title: "Banking Quantitative Aptitude Sectional Mock Examinations",
    exam: "banking",
    subject: "Science",
    price: 299,
    originalPrice: 599,
    rating: 4.6,
    reviews: 175,
    format: "Tests & Quizzes",
    tags: ["PDF"],
    description: "Master quick calculations, data interpretation, and quantitative speed drills with mock test sets built for real Banking patterns.",
    features: [
      "10 Sectional Speed mock drill packs",
      "Data Interpretation visual shortcuts handbook",
      "Quadratic Equations and Number Series templates",
      "Simplified calculation trick cards",
      "Comprehensive answers and shortcut guide"
    ],
    pagesCount: 110,
    fileSize: "14 MB",
    syllabusCoverage: "92% of Quant section"
  },
  {
    id: 14,
    title: "State PSC Ancient & Medieval History Timelines",
    exam: "state",
    subject: "History",
    price: 449,
    originalPrice: 899,
    rating: 4.7,
    reviews: 120,
    format: "PYQs & Solutions",
    tags: ["PDF"],
    description: "A chronological mapping of ancient civilisations, Dynasties, administrative patterns, and architecture for rapid State PSC revision.",
    features: [
      "Indus Valley Civilisation architectural sketches",
      "Mauryan & Gupta Administrative system flowcharts",
      "Delhi Sultanate & Mughal chronological timelines",
      "Temple Architecture visual classification cards",
      "PYQ-based state specific historical highlights"
    ],
    pagesCount: 135,
    fileSize: "28 MB",
    syllabusCoverage: "90% of Ancient & Medieval GS"
  },
  {
    id: 15,
    title: "Railways General Studies (GS) Polity Mock Series Level 1-3",
    exam: "railways",
    subject: "Polity",
    price: 149,
    originalPrice: 299,
    rating: 4.4,
    reviews: 135,
    format: "PYQs & Solutions",
    tags: ["PDF"],
    description: "Practical level-based mock test series tracing core constitutional acts, fundamental laws, and parliamentary formats.",
    features: [
      "Level 1 (Basic Acts), Level 2 (Amendments), Level 3 (Deep Logic)",
      "Important Constitutional Articles checklist",
      "President, Parliament, and Judiciary tables",
      "15 Mock question papers with solution cards",
      "Value revision flash pages"
    ],
    pagesCount: 95,
    fileSize: "11 MB",
    syllabusCoverage: "88% of Railways GS Polity"
  },
  {
    id: 16,
    title: "UPSC Ecology, Environment & Science Concept Cards",
    exam: "upsc",
    subject: "Science",
    price: 299,
    originalPrice: 599,
    rating: 4.8,
    reviews: 245,
    format: "Visual Notes",
    tags: ["Best Seller"],
    description: "High-yield visual flashcards covering ecology functions, environment treaties, national parks, biodiversity hotspots, and core science modules.",
    features: [
      "Ecosystem & Food Web function charts",
      "International Environment Conventions summary cards",
      "National Parks & Biosphere Maps visual layouts",
      "Biogeochemical Cycles flowchart sheets",
      "Latest Science & Tech visual core trends"
    ],
    pagesCount: 112,
    fileSize: "19 MB",
    syllabusCoverage: "94% of UPSC GS Paper III Environment"
  },
  {
    id: 17,
    title: "SSC CGL Indian & World Geography Dynamic Mind Maps",
    exam: "ssc",
    subject: "Geography",
    price: 399,
    originalPrice: 799,
    rating: 4.7,
    reviews: 312,
    format: "Mind Maps",
    tags: ["PDF"],
    description: "Accelerate geographic learning with dynamic mindmaps tracing physical systems, resource distribution, and world geography mappings.",
    features: [
      "Indian Physiography (Himalayas, Plains, Peninsular) mindmaps",
      "Climatic zones & Soil mapping diagrams",
      "World geography core features & straits maps",
      "Mineral & Industrial zones visual listings",
      "Quick revision charts for major world rivers"
    ],
    pagesCount: 120,
    fileSize: "22 MB",
    syllabusCoverage: "93% of CGL Geography GS"
  },
  {
    id: 18,
    title: "Banking History & National Movement Mock Practice Set",
    exam: "banking",
    subject: "History",
    price: 199,
    originalPrice: 399,
    rating: 4.5,
    reviews: 88,
    format: "PYQs & Solutions",
    tags: ["PDF"],
    description: "Improve performance in static general studies sections with customized Mock sets mapping modern history and national struggles.",
    features: [
      "1857-1947 struggle timelines and questions",
      "Indian National Congress presidents & decisions index",
      "Important historical acts & impact sheets",
      "8 Full Mock revision question tests",
      "Short explanation charts"
    ],
    pagesCount: 82,
    fileSize: "13 MB",
    syllabusCoverage: "86% of History general awareness"
  },
  {
    id: 19,
    title: "State PSC General Science & Modern Tech Video Lecture Set",
    exam: "state",
    subject: "Science",
    price: 1599,
    originalPrice: 3199,
    rating: 4.6,
    reviews: 74,
    format: "Audio Books",
    tags: ["Audio Book"],
    description: "A premium video syllabus guide covering core Physics, Chemistry, Biology, Space technology, Defense systems, and IT developments.",
    features: [
      "16 Interactive video lectures with expert guides",
      "Bio Systems & Human Health diagrams",
      "Space missions & satellite tech flowcharts",
      "Includes complete 250-page visual study notes",
      "Dedicated test cards with solutions"
    ],
    pagesCount: 250,
    fileSize: "2.1 GB (Video streams + PDFs)",
    syllabusCoverage: "95% of State GS Science & Tech"
  },
  {
    id: 20,
    title: "Railways RRB Indian Geography Visual Masterclass Notes",
    exam: "railways",
    subject: "Geography",
    price: 279,
    originalPrice: 550,
    rating: 4.7,
    reviews: 156,
    format: "Visual Notes",
    tags: ["New Arrival"],
    description: "A masterclass compilation of visual maps, river trajectories, climate zones, and resource reserves mapped specifically for RRB examinations.",
    features: [
      "Detailed Indian River systems visual flow guide",
      "Agriculture and Crop zones quick diagrams",
      "Transport, Railways zones & Headquarters maps",
      "National Parks & Sanctuaries visual index",
      "Previous RRB Geography PYQs with sketch keys"
    ],
    pagesCount: 104,
    fileSize: "16 MB",
    syllabusCoverage: "90% of Railways GS Geography"
  }
];
