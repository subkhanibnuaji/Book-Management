export interface CollectionBook {
  bookId: string;
  reason: string;
}

export interface ClassicPairing {
  classicBookId: string;
  classicWhyTimeless: string;
  supplementBookId: string;
  supplementWhatAdds: string;
}

export interface SpecialCollection {
  id: string;
  name: string;
  description: string;
  icon: string;
  books?: CollectionBook[];
  pairings?: ClassicPairing[];
  estimatedReadingTime?: string;
  recommendedSequence?: string;
  recommendedFor?: string;
}

export const collections: SpecialCollection[] = [
  {
    id: "ai-era-essentials",
    name: "AI-Era Essentials",
    description: "Must-read books for understanding AI in business (2020-2025). These 5 books will give you a comprehensive understanding of how AI is transforming every aspect of business.",
    icon: "🤖",
    books: [
      { bookId: "co-intelligence-2024", reason: "Individual-level AI collaboration mastery - start here to understand AI as a co-worker" },
      { bookId: "ai-first-2025", reason: "Latest AI business strategy from industry leaders who interviewed Sam Altman & Bill Gates" },
      { bookId: "hbr-guide-genai-2024", reason: "Tactical playbook for managers - immediately actionable AI implementation" },
      { bookId: "transform-genai-2025", reason: "14 leadership behaviors for driving AI transformation in organizations" },
      { bookId: "more-human-2025", reason: "Essential counterbalance - keeping humanity at the center of AI adoption" }
    ],
    estimatedReadingTime: "2-3 months",
    recommendedSequence: "Co-Intelligence → AI First → HBR Guide → Transform! → More Human"
  },
  {
    id: "cross-domain-super-books",
    name: "Cross-Domain Super-Books",
    description: "Essential books that apply across all business functions. These 5 books are the highest-leverage reads in the entire library - skills from these books will serve you in every domain.",
    icon: "🌟",
    books: [
      { bookId: "influence-2021", reason: "7 universal principles of persuasion applicable in marketing, sales, leadership, and communication" },
      { bookId: "never-split-difference-2016", reason: "High-stakes negotiation techniques that transform sales, leadership, and product conversations" },
      { bookId: "crucial-conversations", reason: "Framework for difficult conversations - essential in every role from HR to product to leadership" },
      { bookId: "culture-code-2018", reason: "Building successful teams applies to every function - safety, vulnerability, and purpose" },
      { bookId: "first-break-rules", reason: "Management principles that transcend domains - based on 80,000+ manager interviews" }
    ],
    recommendedFor: "Anyone unsure where to start - read these 5 first for maximum cross-functional impact"
  },
  {
    id: "timeless-plus-ai",
    name: "Timeless Classics + AI Supplements",
    description: "Pre-2020 books that remain valuable but benefit from AI-era companion reads. Pair the classic with its modern supplement for complete understanding.",
    icon: "🔄",
    pairings: [
      {
        classicBookId: "how-brands-grow-2010",
        classicWhyTimeless: "Evidence-based marketing laws are universal and still apply",
        supplementBookId: "ai-first-2025",
        supplementWhatAdds: "How AI changes brand building, marketing automation, and customer targeting"
      },
      {
        classicBookId: "challenger-sale-2011",
        classicWhyTimeless: "B2B sales methodology fundamentals remain critical for complex sales",
        supplementBookId: "genai-b2b-sales-2024",
        supplementWhatAdds: "AI-powered prospecting, personalization, and sales intelligence"
      },
      {
        classicBookId: "inspired-2017",
        classicWhyTimeless: "Product discovery principles and empowered product teams are timeless",
        supplementBookId: "insights-driven-pm-2024",
        supplementWhatAdds: "Data analytics and AI integration in product decisions and discovery"
      },
      {
        classicBookId: "principles-corporate-finance",
        classicWhyTimeless: "Financial theory and valuation frameworks are foundational",
        supplementBookId: "how-to-be-cfo-2024",
        supplementWhatAdds: "AI/tech integration in modern finance operations and decision-making"
      },
      {
        classicBookId: "first-break-rules",
        classicWhyTimeless: "Employee engagement principles based on massive research remain valid",
        supplementBookId: "irresistible-2022",
        supplementWhatAdds: "Post-pandemic hybrid work reality and modern employee experience"
      }
    ]
  }
];
