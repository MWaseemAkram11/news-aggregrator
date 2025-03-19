import type { Article } from "../interfaces/articles";
import type { SearchParams } from "../interfaces/search-params";

// API Keys
const NEWS_API_KEY = import.meta.env.VITE_THE_NEWS_API_KEY;
const NYT_API_KEY = import.meta.env.VITE_NYT_API_KEY;
const GUARDIAN_API_KEY = import.meta.env.VITE_GUARDIAN_API_KEY;

// Function to fetch from NewsAPI
async function fetchFromNewsAPI(params: SearchParams): Promise<Article[]> {
  try {
    // Build the query parameters
    const queryParams = new URLSearchParams();
    
    // Add search query if provided
    if (params.query) {
      queryParams.append("q", params.query);
    } else {
      // Default to top headlines if no query
      queryParams.append("q", "");
    }
    
    // Add date filters if provided
    if (params.fromDate) {
      queryParams.append("from", params.fromDate);
    }
    
    if (params.toDate) {
      queryParams.append("to", params.toDate);
    }
    
    // Add API key
    queryParams.append("apiKey", NEWS_API_KEY);
    
    // Sort by publishedAt by default
    queryParams.append("sortBy", "publishedAt");
    
    // Limit to 10 results
    queryParams.append("pageSize", "10");
    
    // Make the API request
    const response = await fetch(`https://newsapi.org/v2/everything?${queryParams.toString()}`);
    
    if (!response.ok) {
      throw new Error(`NewsAPI error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Transform the response to our Article format
    return data.articles.map((article: any, index: number) => ({
      id: `newsapi-${index}-${Date.now()}`,
      title: article.title || "No title available",
      description: article.description || "No description available",
      content: article.content || "No content available",
      url: article.url || "#",
      urlToImage: article.urlToImage || "/placeholder.svg",
      publishedAt: article.publishedAt || new Date().toISOString(),
      source: {
        id: "newsapi",
        name: article.source?.name || "NewsAPI",
      },
      author: article.author || "Unknown",
      category: determineCategory(article.title, article.description),
    }));
  } catch (error) {
    console.error("Error fetching from NewsAPI:", error);
    return [];
  }
}

// Function to fetch from New York Times API
async function fetchFromNYT(params: SearchParams): Promise<Article[]> {
  try {
    // Determine which section to fetch
    let section = "home"; // Default section
    
    // Map categories to NYT sections
    if (params.categories.length > 0) {
      const categoryMap: Record<string, string> = {
        "business": "business",
        "technology": "technology",
        "entertainment": "arts",
        "health": "health",
        "science": "science",
        "sports": "sports",
        "politics": "politics",
        "arts": "arts",
      };
      
      // Use the first matching category
      for (const category of params.categories) {
        if (categoryMap[category]) {
          section = categoryMap[category];
          break;
        }
      }
    }
    
    // Make the API request
    const response = await fetch(`https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=${NYT_API_KEY}`);
    
    if (!response.ok) {
      throw new Error(`NYT API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Filter by query if provided
    let articles = data.results || [];
    
    if (params.query) {
      const query = params.query.toLowerCase();
      articles = articles.filter((article: any) => 
        article.title?.toLowerCase().includes(query) || 
        article.abstract?.toLowerCase().includes(query)
      );
    }
    
    // Transform the response to our Article format
    return articles.slice(0, 10).map((article: any, index: number) => ({
      id: `nyt-${index}-${Date.now()}`,
      title: article.title || "No title available",
      description: article.abstract || "No description available",
      content: article.abstract || "No content available",
      url: article.url || "#",
      urlToImage: article.multimedia?.[0]?.url || "/placeholder.svg",
      publishedAt: article.published_date || new Date().toISOString(),
      source: {
        id: "nyt",
        name: "New York Times",
      },
      author: article.byline?.replace("By ", "") || "New York Times",
      category: article.section || determineCategory(article.title, article.abstract),
    }));
  } catch (error) {
    console.error("Error fetching from NYT API:", error);
    return [];
  }
}

// Function to fetch from The Guardian API
async function fetchFromGuardian(params: SearchParams): Promise<Article[]> {
  try {
    // Build the query parameters
    const queryParams = new URLSearchParams();
    
    // Add search query if provided
    if (params.query) {
      queryParams.append("q", params.query);
    }
    
    // Add date filters if provided
    if (params.fromDate) {
      queryParams.append("from-date", params.fromDate);
    }
    
    if (params.toDate) {
      queryParams.append("to-date", params.toDate);
    }
    
    // Add section filter if categories are provided
    if (params.categories.length > 0) {
      const categoryMap: Record<string, string> = {
        "business": "business",
        "technology": "technology",
        "entertainment": "culture",
        "health": "society",
        "science": "science",
        "sports": "sport",
        "politics": "politics",
        "environment": "environment",
        "arts": "artanddesign",
      };
      
      // Use the first matching category
      for (const category of params.categories) {
        if (categoryMap[category]) {
          queryParams.append("section", categoryMap[category]);
          break;
        }
      }
    }
    
    // Add API key
    queryParams.append("api-key", GUARDIAN_API_KEY);
    
    // Add show fields parameter to get more content
    queryParams.append("show-fields", "headline,trailText,body,thumbnail");
    
    // Limit to 10 results
    queryParams.append("page-size", "10");
    
    // Make the API request
    const response = await fetch(`https://content.guardianapis.com/search?${queryParams.toString()}`);
    
    if (!response.ok) {
      throw new Error(`Guardian API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Transform the response to our Article format
    return data.response.results.map((article: any, index: number) => ({
      id: `guardian-${index}-${Date.now()}`,
      title: article.webTitle || "No title available",
      description: article.fields?.trailText || "No description available",
      content: article.fields?.body || "No content available",
      url: article.webUrl || "#",
      urlToImage: article.fields?.thumbnail || "/placeholder.svg",
      publishedAt: article.webPublicationDate || new Date().toISOString(),
      source: {
        id: "guardian",
        name: "The Guardian",
      },
      author: "The Guardian",
      category: article.sectionName?.toLowerCase() || determineCategory(article.webTitle, article.fields?.trailText),
    }));
  } catch (error) {
    console.error("Error fetching from Guardian API:", error);
    return [];
  }
}

// Helper function to determine category from title and description
function determineCategory(title: string = "", description: string = ""): string {
  const content = (title + " " + description).toLowerCase();
  
  const categoryKeywords: Record<string, string[]> = {
    "business": ["business", "economy", "market", "stock", "finance", "company", "industry"],
    "technology": ["tech", "technology", "software", "hardware", "app", "digital", "computer", "ai", "artificial intelligence"],
    "entertainment": ["entertainment", "movie", "film", "music", "celebrity", "hollywood", "tv", "television"],
    "health": ["health", "medical", "medicine", "disease", "doctor", "hospital", "patient", "treatment"],
    "science": ["science", "scientific", "research", "study", "discovery", "space", "physics", "biology"],
    "sports": ["sport", "sports", "game", "match", "player", "team", "championship", "tournament", "league"],
    "politics": ["politics", "political", "government", "election", "president", "minister", "policy", "vote"],
    "environment": ["environment", "climate", "pollution", "sustainable", "green", "renewable", "energy", "carbon"],
    "arts": ["art", "arts", "culture", "museum", "gallery", "exhibition", "artist", "painting", "sculpture"],
  };
  
  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    for (const keyword of keywords) {
      if (content.includes(keyword)) {
        return category;
      }
    }
  }
  
  return "general";
}

// Main function to fetch articles from all sources
export async function fetchArticles(params: SearchParams): Promise<Article[]> {
  try {
    // Determine which sources to fetch from
    const sourcesToFetch = params.sources.length > 0 ? params.sources : ["newsapi", "nyt", "guardian"];
    
    // Create an array of promises for each source
    const promises: Promise<Article[]>[] = [];
    
    if (sourcesToFetch.includes("newsapi")) {
      promises.push(fetchFromNewsAPI(params));
    }
    
    if (sourcesToFetch.includes("nyt")) {
      promises.push(fetchFromNYT(params));
    }
    
    if (sourcesToFetch.includes("guardian")) {
      promises.push(fetchFromGuardian(params));
    }
    
    // Wait for all promises to resolve
    const results = await Promise.all(promises);
    
    // Combine and sort the results
    let allArticles = results.flat();
    
    // Sort by date (newest first)
    allArticles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    
    return allArticles;
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
}