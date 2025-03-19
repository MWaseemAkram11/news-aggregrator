import { useEffect, useState } from "react";
import Header from "../components/layout/header";
import NewsFeed from "../components/news-feed/news-feed";
import Sidebar from "../components/layout/sidebar";
import Footer from "../components/layout/footer";
import type { Article } from "../interfaces/articles";
import type { SearchParams } from "../interfaces/search-params";
import { fetchArticles } from "../services/news-service";
import { useToast } from "../hooks/use-toast";
import { GlobeLoader } from "../components/ui/loader";

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useState<SearchParams>({
    query: "",
    sources: [],
    categories: [],
    fromDate: "",
    toDate: "",
  });
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const loadArticles = async () => {
      try {
        setIsSearching(true);
        // Simulate API loading
        setTimeout(async () => {
          const data = await fetchArticles(searchParams);
          setArticles(data);
          setIsSearching(false);
          setIsLoading(false);
          
          // Show toast when search is complete
          if (searchParams.query || searchParams.sources.length > 0 || searchParams.categories.length > 0) {
            toast({
              title: "Search complete",
              description: `Found ${data.length} articles matching your criteria`,
            });
          }
        }, 1500);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch articles. Please try again later.",
          variant: "destructive",
        });
        console.error("Error fetching articles:", error);
        setIsSearching(false);
        setIsLoading(false);
      }
    };

    loadArticles();
  }, [searchParams, toast]);

  const handleSearch = (query: string) => {
    setSearchParams((prev) => ({ ...prev, query }));
  };

  const handleSourceChange = (sources: string[]) => {
    setSelectedSources(sources);
    setSearchParams((prev) => ({ ...prev, sources }));
  };

  const handleCategoryChange = (categories: string[]) => {
    setSelectedCategories(categories);
    setSearchParams((prev) => ({ ...prev, categories }));
  };

  const handleDateChange = (fromDate: string, toDate: string) => {
    setSearchParams((prev) => ({ ...prev, fromDate, toDate }));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header onSearch={handleSearch} />
      
      {isLoading && !isSearching ? (
        <div className="flex-1 flex flex-col items-center justify-center">
          <GlobeLoader size="lg" />
          <h2 className="mt-6 text-xl font-medium">Loading NewsHub</h2>
          <p className="text-muted-foreground mt-2">Fetching the latest news for you...</p>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row flex-1 container mx-auto px-4 py-6 gap-6">
          <Sidebar
            selectedSources={selectedSources}
            selectedCategories={selectedCategories}
            onSourceChange={handleSourceChange}
            onCategoryChange={handleCategoryChange}
            onDateChange={handleDateChange}
            isSearching={isSearching}
          />
          <main className="flex-1">
            <NewsFeed articles={articles} isLoading={isSearching} />
          </main>
        </div>
      )}
      <Footer />
    </div>
  );
}