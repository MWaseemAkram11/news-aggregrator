import { createContext, useContext, useState, type ReactNode } from "react";
import type { Article } from "../interfaces/articles";

interface NewsContextType {
  savedArticles: Article[];
  saveArticle: (article: Article) => void;
  removeArticle: (articleId: string) => void;
  isSaved: (articleId: string) => boolean;
}

const NewsContext = createContext<NewsContextType | undefined>(undefined);

export function NewsProvider({ children }: { children: ReactNode }) {
  const [savedArticles, setSavedArticles] = useState<Article[]>([]);

  const saveArticle = (article: Article) => {
    setSavedArticles((prev) => {
      if (prev.some((a) => a.id === article.id)) {
        return prev;
      }
      return [...prev, article];
    });
  };

  const removeArticle = (articleId: string) => {
    setSavedArticles((prev) => prev.filter((article) => article.id !== articleId));
  };

  const isSaved = (articleId: string) => {
    return savedArticles.some((article) => article.id === articleId);
  };

  return (
    <NewsContext.Provider value={{ savedArticles, saveArticle, removeArticle, isSaved }}>
      {children}
    </NewsContext.Provider>
  );
}

export function useNews() {
  const context = useContext(NewsContext);
  if (context === undefined) {
    throw new Error("useNews must be used within a NewsProvider");
  }
  return context;
}