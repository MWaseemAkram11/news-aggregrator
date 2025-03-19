import type { Article } from "../../interfaces/articles"
import ArticleCard from "./article-card"
import { Skeleton } from "../ui/skeleton"
import { GlobeLoader } from "../ui/loader"

interface NewsFeedProps {
  articles: Article[]
  isLoading: boolean
}

export default function NewsFeed({ articles, isLoading }: NewsFeedProps) {
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-primary">Latest News</h2>
          <div className="flex items-center space-x-2">
            <GlobeLoader size="sm" />
            <span className="text-sm text-muted-foreground">Updating...</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="space-y-3 rounded-lg border border-gray-200 p-3 bg-card">
              <Skeleton className="h-40 w-full rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <div className="flex justify-between">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-4 w-1/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (articles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center p-8 border border-dashed border-gray-300 rounded-lg bg-gray-50">
        <h3 className="text-xl font-medium">No articles found</h3>
        <p className="text-muted-foreground mt-2 max-w-md">
          Try adjusting your search or filter criteria to find more articles
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-primary">Latest News</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  )
}