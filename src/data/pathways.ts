export interface PathwayPhase {
  name: string;
  duration: string;
  books: { bookId: string; note?: string }[];
}

export interface ReadingPathway {
  id: string;
  name: string;
  description: string;
  duration: string;
  icon: string; // emoji
  targetAudience: string[];
  result: string;
  phases: PathwayPhase[];
}

export const pathways: ReadingPathway[] = [
  {
    id: "consultant-toolkit",
    name: "Consultant's Toolkit",
    description:
      "A comprehensive reading pathway designed to build the well-rounded skill set expected of top-tier management consultants. Covers people leadership, commercial acumen, product and finance fundamentals, and modern AI literacy so you can walk into any client engagement with confidence.",
    duration: "6-9 months",
    icon: "\uD83D\uDCBC",
    targetAudience: [
      "Aspiring management consultants",
      "Early-career strategy professionals",
      "Generalists who want to sharpen across multiple business domains",
    ],
    result:
      "You will emerge with a balanced foundation across people management, sales and marketing, product strategy, corporate finance, and AI — the core pillars consultants draw on daily.",
    phases: [
      {
        name: "People Foundation",
        duration: "Months 1-2",
        books: [
          {
            bookId: "first-break-rules",
            note: "Understand what great managers actually do differently",
          },
          {
            bookId: "culture-code-2018",
            note: "Learn the mechanics behind high-performing team cultures",
          },
          {
            bookId: "dare-to-lead-2018",
            note: "Build the courage and vulnerability needed to lead change",
          },
          {
            bookId: "crucial-conversations",
            note: "Master high-stakes dialogue — a daily consulting necessity",
          },
        ],
      },
      {
        name: "Commercial Skills",
        duration: "Months 3-4",
        books: [
          {
            bookId: "how-brands-grow-2010",
            note: "Ground your marketing advice in evidence-based brand science",
          },
          {
            bookId: "challenger-sale-2011",
            note: "Learn the consultative selling approach that wins complex deals",
          },
          {
            bookId: "building-storybrand-2017",
            note: "Clarify messaging frameworks you can apply to any client brand",
          },
          {
            bookId: "never-split-difference-2016",
            note: "Sharpen negotiation tactics for client and stakeholder discussions",
          },
        ],
      },
      {
        name: "Product & Finance",
        duration: "Months 5-6",
        books: [
          {
            bookId: "inspired-2017",
            note: "Grasp how the best technology companies build products customers love",
          },
          {
            bookId: "crossing-chasm-2014",
            note: "Understand go-to-market strategy for disruptive innovations",
          },
          {
            bookId: "valuation-mckinsey",
            note: "The gold-standard reference for corporate valuation and financial analysis",
          },
          {
            bookId: "essays-warren-buffett",
            note: "Absorb timeless principles on capital allocation and business quality",
          },
        ],
      },
      {
        name: "AI Supplement",
        duration: "Month 7",
        books: [
          {
            bookId: "co-intelligence-2024",
            note: "Frame AI as a collaborative partner rather than a replacement tool",
          },
          {
            bookId: "ai-first-2025",
            note: "See how AI reshapes strategy, operations, and competitive advantage",
          },
          {
            bookId: "hbr-guide-genai-2024",
            note: "Practical playbook for deploying generative AI in enterprise settings",
          },
        ],
      },
    ],
  },
  {
    id: "ai-first-leader",
    name: "AI-First Business Leader",
    description:
      "A focused three-month pathway for leaders who need to quickly develop fluency in artificial intelligence — from foundational concepts through organizational transformation to real-world business integration. You will learn to think AI-first without losing sight of the human, strategic, and commercial dimensions of leadership.",
    duration: "3 months",
    icon: "\uD83E\uDD16",
    targetAudience: [
      "C-suite executives and senior leaders",
      "Directors of digital transformation",
      "Business leaders responsible for AI adoption strategy",
      "Entrepreneurs building AI-native companies",
    ],
    result:
      "You will be able to articulate a clear AI strategy, lead transformation initiatives with confidence, and integrate AI thinking into product, brand, and competitive decisions.",
    phases: [
      {
        name: "AI Foundations",
        duration: "Month 1",
        books: [
          {
            bookId: "co-intelligence-2024",
            note: "Build a mental model for working alongside AI as a thinking partner",
          },
          {
            bookId: "ai-first-2025",
            note: "Understand what it means to put AI at the center of business strategy",
          },
          {
            bookId: "hbr-guide-genai-2024",
            note: "Get actionable frameworks for deploying generative AI in the enterprise",
          },
          {
            bookId: "all-in-on-ai-2024",
            note: "Study real organizations that have gone all-in on artificial intelligence",
          },
        ],
      },
      {
        name: "Transformation & Leadership",
        duration: "Month 2",
        books: [
          {
            bookId: "transform-genai-2025",
            note: "Learn structured approaches to transforming your organization with generative AI",
          },
          {
            bookId: "more-human-2025",
            note: "Ensure AI adoption amplifies human strengths instead of diminishing them",
          },
          {
            bookId: "leadership-not-solo-2024",
            note: "Build the collaborative leadership capacity needed to drive AI change",
          },
          {
            bookId: "dare-to-lead-2018",
            note: "Develop the brave leadership style that AI-era uncertainty demands",
          },
        ],
      },
      {
        name: "AI + Business Integration",
        duration: "Month 3",
        books: [
          {
            bookId: "competing-age-ai-2020",
            note: "Understand how AI restructures industries and competitive dynamics",
          },
          {
            bookId: "coming-wave-2023",
            note: "Anticipate the societal and regulatory forces shaping AI's trajectory",
          },
          {
            bookId: "how-brands-grow-2010",
            note: "Ground your AI-enhanced marketing in proven brand growth principles",
          },
          {
            bookId: "inspired-2017",
            note: "Connect AI capabilities to customer-centric product development",
          },
        ],
      },
    ],
  },
  {
    id: "executive-well-rounded",
    name: "Executive Well-Rounded",
    description:
      "A broad three-month curriculum that gives senior leaders exposure to every major business function — people and leadership, commercial and product, and finance and cross-functional skills. Each month tackles a different domain with six books, creating a dense but rewarding sprint toward executive-level breadth.",
    duration: "3 months",
    icon: "\uD83C\uDF1F",
    targetAudience: [
      "Newly appointed executives and general managers",
      "Senior leaders transitioning to cross-functional roles",
      "High-potential managers preparing for executive promotion",
      "Founders scaling beyond a single functional specialty",
    ],
    result:
      "You will possess working fluency across people leadership, sales and marketing, product management, corporate finance, negotiation, and influence — the complete toolkit for executive decision-making.",
    phases: [
      {
        name: "People & Leadership",
        duration: "Month 1",
        books: [
          {
            bookId: "irresistible-2022",
            note: "Redesign your organization around agility, growth, and employee experience",
          },
          {
            bookId: "first-break-rules",
            note: "Discover what distinguishes truly great managers from average ones",
          },
          {
            bookId: "culture-code-2018",
            note: "Decode the signals that create cohesive, high-performing cultures",
          },
          {
            bookId: "remote-not-distant-2022",
            note: "Lead distributed teams without sacrificing connection or accountability",
          },
          {
            bookId: "dare-to-lead-2018",
            note: "Embrace vulnerability and courage as leadership superpowers",
          },
          {
            bookId: "crucial-conversations",
            note: "Navigate the difficult dialogues that define executive effectiveness",
          },
        ],
      },
      {
        name: "Commercial & Product",
        duration: "Month 2",
        books: [
          {
            bookId: "how-brands-grow-2010",
            note: "Understand the empirical laws that govern brand and market growth",
          },
          {
            bookId: "building-storybrand-2017",
            note: "Craft clear, compelling brand narratives that cut through noise",
          },
          {
            bookId: "challenger-sale-2011",
            note: "Equip your sales organization with a high-performance methodology",
          },
          {
            bookId: "spin-selling-1988",
            note: "Master the questioning framework behind consultative selling",
          },
          {
            bookId: "inspired-2017",
            note: "Learn how world-class product teams discover and deliver value",
          },
          {
            bookId: "crossing-chasm-2014",
            note: "Bridge the gap between early adopters and mainstream market success",
          },
        ],
      },
      {
        name: "Finance & Cross-Functional",
        duration: "Month 3",
        books: [
          {
            bookId: "valuation-mckinsey",
            note: "Develop rigorous corporate valuation and value-creation skills",
          },
          {
            bookId: "essays-warren-buffett",
            note: "Learn capital allocation and business judgment from the best investor alive",
          },
          {
            bookId: "getting-to-yes",
            note: "Apply principled negotiation to deals, partnerships, and internal alignment",
          },
          {
            bookId: "never-split-difference-2016",
            note: "Add tactical empathy and calibrated questions to your negotiation repertoire",
          },
          {
            bookId: "influence-2021",
            note: "Understand the psychology of persuasion that underpins executive influence",
          },
          {
            bookId: "cfo-guidebook-2024",
            note: "Gain fluency in the financial leadership frameworks CFOs rely on",
          },
        ],
      },
    ],
  },
  {
    id: "functional-expert-product",
    name: "Functional Expert: Product Management",
    description:
      "A deep-dive pathway for product managers who want to move from competent to exceptional. Starts with core product craft, layers on leadership and strategic thinking, broadens into complementary commercial and influence skills, and finishes with specialized modern methodologies. Designed to be completed in three to six months depending on your pace.",
    duration: "3-6 months",
    icon: "\uD83D\uDE80",
    targetAudience: [
      "Product managers looking to level up",
      "Senior PMs preparing for Director or VP of Product roles",
      "Engineers or designers transitioning into product management",
      "Product leaders building a team-wide reading curriculum",
    ],
    result:
      "You will command a complete product management toolkit — from discovery and delivery through organizational leadership, stakeholder influence, and modern specialized practices like continuous discovery and product-led growth.",
    phases: [
      {
        name: "Foundations",
        duration: "Month 1",
        books: [
          {
            bookId: "inspired-2017",
            note: "The definitive guide to how the best product teams operate",
          },
          {
            bookId: "lean-product-playbook-2015",
            note: "A step-by-step framework for achieving product-market fit",
          },
          {
            bookId: "continuous-discovery-2021",
            note: "Build a sustainable habit of customer-centric discovery",
          },
          {
            bookId: "crossing-chasm-2014",
            note: "Understand market adoption dynamics critical to product strategy",
          },
        ],
      },
      {
        name: "Leadership & Strategy",
        duration: "Month 2",
        books: [
          {
            bookId: "empowered-2020",
            note: "Learn how to build truly empowered, autonomous product teams",
          },
          {
            bookId: "escaping-build-trap-2018",
            note: "Shift your organization from output-focused to outcome-driven",
          },
          {
            bookId: "culture-code-2018",
            note: "Foster the psychological safety your product team needs to innovate",
          },
          {
            bookId: "crucial-conversations",
            note: "Handle the tough stakeholder and cross-functional conversations PMs face daily",
          },
        ],
      },
      {
        name: "Complementary Skills",
        duration: "Month 3",
        books: [
          {
            bookId: "influence-2021",
            note: "Master the science of persuasion to drive alignment without authority",
          },
          {
            bookId: "never-split-difference-2016",
            note: "Negotiate scope, timelines, and priorities with tactical precision",
          },
          {
            bookId: "building-storybrand-2017",
            note: "Apply narrative frameworks to product positioning and messaging",
          },
          {
            bookId: "how-brands-grow-2010",
            note: "Connect product decisions to the market dynamics that drive growth",
          },
        ],
      },
      {
        name: "Specialized",
        duration: "Months 4-6",
        books: [
          {
            bookId: "shape-up-2019",
            note: "Explore Basecamp's alternative to sprints for shaping and building products",
          },
          {
            bookId: "insights-driven-pm-2024",
            note: "Leverage data and customer insights to make sharper product decisions",
          },
          {
            bookId: "product-momentum-gap-2023",
            note: "Diagnose and close the gap between product vision and execution velocity",
          },
          {
            bookId: "product-led-growth-2019",
            note: "Design your product to be the primary engine of acquisition and retention",
          },
        ],
      },
    ],
  },
];
