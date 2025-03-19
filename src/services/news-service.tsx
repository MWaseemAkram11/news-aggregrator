import type { Article } from "../interfaces/article";
import type { SearchParams } from "../interfaces/search-params";
import { MOCK_ARTICLES } from "../data/mock-data";

export async function fetchArticles(params: SearchParams): Promise<Article[]> {
  // This is a mock implementation that filters the mock data based on search params
  let filteredArticles = [...MOCK_ARTICLES];

  // Filter by query
  if (params.query) {
    const query = params.query.toLowerCase();
    filteredArticles = filteredArticles.filter(
      (article) => article.title.toLowerCase().includes(query) || article.description.toLowerCase().includes(query),
    );
  }

  // Filter by sources
  if (params.sources && params.sources.length > 0) {
    filteredArticles = filteredArticles.filter((article) => params.sources.includes(article.source.id));
  }

  // Filter by categories
  if (params.categories && params.categories.length > 0) {
    filteredArticles = filteredArticles.filter(
      (article) => article.category && params.categories.includes(article.category),
    );
  }

  // Filter by date range
  if (params.fromDate) {
    const fromDate = new Date(params.fromDate);
    filteredArticles = filteredArticles.filter((article) => new Date(article.publishedAt) >= fromDate);
  }

  if (params.toDate) {
    const toDate = new Date(params.toDate);
    toDate.setHours(23, 59, 59, 999); // End of the day
    filteredArticles = filteredArticles.filter((article) => new Date(article.publishedAt) <= toDate);
  }

  return filteredArticles;
}