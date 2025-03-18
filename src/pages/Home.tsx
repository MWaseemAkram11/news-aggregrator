import { useState } from "react";
import Header from "../components/layout/header"
import Sidebar from "../components/layout/sidebar"
import Footer from "../components/layout/footer";
import type { SearchParams } from "../interfaces/search-params";
import type { Article } from "../interfaces/articles";
import { GlobeLoader } from "../components/ui/loader";

const Home = () => {

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
                <p className="text-center">This is the main content section.............</p>
            </main>
        </div>
        )}
        <Footer />
    </div>
  )
}

export default Home