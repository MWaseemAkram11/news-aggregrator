import type { Article } from "../interfaces/articles"

export const SOURCES = [
  { id: "newsapi", name: "NewsAPI" },
  { id: "nyt", name: "New York Times" },
  { id: "guardian", name: "The Guardian" },
];

export const CATEGORIES = [
  { id: "business", name: "Business" },
  { id: "technology", name: "Technology" },
  { id: "entertainment", name: "Entertainment" },
  { id: "health", name: "Health" },
  { id: "science", name: "Science" },
  { id: "sports", name: "Sports" },
  { id: "politics", name: "Politics" },
  { id: "environment", name: "Environment" },
  { id: "arts", name: "Arts" },
];

// We'll keep the MOCK_ARTICLES array for fallback purposes
// Generate dates for the articles
const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);
const twoDaysAgo = new Date(today);
twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
const threeDaysAgo = new Date(today);
threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
const fourDaysAgo = new Date(today);
fourDaysAgo.setDate(fourDaysAgo.getDate() - 4);
const fiveDaysAgo = new Date(today);
fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);

export const MOCK_ARTICLES: Article[] = [
  {
    id: "newsapi-1",
    title: "Tech Giants Announce New AI Initiatives",
    description:
      "Major technology companies unveiled their latest artificial intelligence projects aimed at revolutionizing various industries.",
    content:
      "In a series of announcements this week, several technology giants revealed their newest artificial intelligence initiatives...",
    url: "https://example.com/tech-ai-news",
    urlToImage: "/placeholder.svg?height=200&width=400",
    publishedAt: today.toISOString(),
    source: {
      id: "newsapi",
      name: "NewsAPI",
    },
    author: "John Smith",
    category: "technology",
  },
  {
    id: "newsapi-2",
    title: "Global Markets React to Economic Data",
    description:
      "Stock markets worldwide showed mixed reactions to the latest economic indicators released by major economies.",
    content: "Financial markets across the globe displayed varied responses to economic data published yesterday...",
    url: "https://example.com/market-news",
    urlToImage: "/placeholder.svg?height=200&width=400",
    publishedAt: yesterday.toISOString(),
    source: {
      id: "newsapi",
      name: "NewsAPI",
    },
    author: "Jane Doe",
    category: "business",
  },
  {
    id: "guardian-1",
    title: "Climate Change: New Study Reveals Accelerating Impact",
    description:
      "Research indicates that the effects of climate change are occurring faster than previously predicted.",
    content:
      "A comprehensive study published in the journal Nature Climate Change suggests that global warming impacts are accelerating...",
    url: "https://example.com/climate-study",
    urlToImage: "/placeholder.svg?height=200&width=400",
    publishedAt: twoDaysAgo.toISOString(),
    source: {
      id: "guardian",
      name: "The Guardian",
    },
    author: "Emma Wilson",
    category: "environment",
  },
  {
    id: "guardian-2",
    title: "Healthcare Reform Bill Passes First Legislative Hurdle",
    description: "The controversial healthcare bill has passed its first major test in parliament after heated debate.",
    content:
      "After weeks of intense discussion, the healthcare reform bill has successfully cleared its first legislative obstacle...",
    url: "https://example.com/healthcare-bill",
    urlToImage: "/placeholder.svg?height=200&width=400",
    publishedAt: threeDaysAgo.toISOString(),
    source: {
      id: "guardian",
      name: "The Guardian",
    },
    author: "Robert Johnson",
    category: "politics",
  },
  {
    id: "nyt-1",
    title: "Broadway Returns with Record Ticket Sales",
    description: "New York's theater district sees unprecedented demand as shows resume after pandemic closures.",
    content:
      "Broadway theaters are experiencing a remarkable resurgence, with many productions reporting record-breaking ticket sales...",
    url: "https://example.com/broadway-return",
    urlToImage: "/placeholder.svg?height=200&width=400",
    publishedAt: fourDaysAgo.toISOString(),
    source: {
      id: "nyt",
      name: "New York Times",
    },
    author: "Michael Brown",
    category: "arts",
  },
  {
    id: "nyt-2",
    title: "New Breakthrough in Cancer Treatment Shows Promise",
    description:
      "Researchers announce promising results from clinical trials of a novel approach to treating certain types of cancer.",
    content:
      "A team of oncologists at Memorial Sloan Kettering Cancer Center has reported encouraging outcomes from trials of an innovative cancer therapy...",
    url: "https://example.com/cancer-breakthrough",
    urlToImage: "/placeholder.svg?height=200&width=400",
    publishedAt: fiveDaysAgo.toISOString(),
    source: {
      id: "nyt",
      name: "New York Times",
    },
    author: "Sarah Chen",
    category: "health",
  },
  {
    id: "newsapi-3",
    title: "New Smartphone Launch Breaks Sales Records",
    description:
      "The latest flagship smartphone has broken all previous sales records in its first weekend of availability.",
    content:
      "The newly released smartphone has shattered sales expectations, with millions of units sold in just the first 48 hours...",
    url: "https://example.com/smartphone-launch",
    urlToImage: "/placeholder.svg?height=200&width=400",
    publishedAt: yesterday.toISOString(),
    source: {
      id: "newsapi",
      name: "NewsAPI",
    },
    author: "Alex Johnson",
    category: "technology",
  },
  {
    id: "guardian-3",
    title: "Major Sports League Announces Expansion Teams",
    description:
      "The professional sports league will add two new teams in the upcoming season, expanding to new markets.",
    content:
      "In a press conference yesterday, league officials announced plans to add franchise teams in two new cities starting next season...",
    url: "https://example.com/sports-expansion",
    urlToImage: "/placeholder.svg?height=200&width=400",
    publishedAt: twoDaysAgo.toISOString(),
    source: {
      id: "guardian",
      name: "The Guardian",
    },
    author: "Chris Williams",
    category: "sports",
  },
  {
    id: "nyt-3",
    title: "Film Festival Announces Award Winners",
    description:
      "The prestigious international film festival has revealed this year's award recipients, with several surprise winners.",
    content:
      "The closing ceremony of the film festival featured unexpected winners in major categories, challenging industry predictions...",
    url: "https://example.com/film-festival",
    urlToImage: "/placeholder.svg?height=200&width=400",
    publishedAt: threeDaysAgo.toISOString(),
    source: {
      id: "nyt",
      name: "New York Times",
    },
    author: "David Chen",
    category: "entertainment",
  },
  {
    id: "newsapi-4",
    title: "Scientists Discover New Species in Deep Ocean",
    description: "Marine biologists have identified several previously unknown species during a deep-sea expedition.",
    content:
      "A research team exploring the ocean depths has documented multiple new marine species that have never been seen before...",
    url: "https://example.com/ocean-discovery",
    urlToImage: "/placeholder.svg?height=200&width=400",
    publishedAt: fourDaysAgo.toISOString(),
    source: {
      id: "newsapi",
      name: "NewsAPI",
    },
    author: "Maria Rodriguez",
    category: "science",
  },
]

