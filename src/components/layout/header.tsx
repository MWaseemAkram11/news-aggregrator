import { useState, useEffect } from "react";
import { Search, Menu, X, Globe } from 'lucide-react';
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface HeaderProps {
  onSearch: (query: string) => void;
}

export default function Header({ onSearch }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    onSearch(searchQuery);
    
    // Simulate search completion
    setTimeout(() => {
      setIsSearching(false);
    }, 1500);
  };

  return (
    <header className={`sticky top-0 z-10 transition-all duration-300 ${
      scrolled ? "shadow-md" : ""
    } glass-effect border-b border-gray-200`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Globe className="h-6 w-6 text-primary" />
            <span className="text-2xl font-bold gradient-heading">News Aggregrator</span>
          </div>

          {/* Desktop Search */}
          <form
            onSubmit={handleSubmit}
            className="hidden md:flex items-center flex-1 max-w-md mx-4"
          >
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search for news..."
                className="pl-10 w-full bg-white/80 border-gray-200 focus:ring-2 focus:ring-primary/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button 
              type="submit" 
              className="ml-2 button-primary"
              disabled={isSearching}
            >
              {isSearching ? "Searching..." : "Search"}
            </Button>
          </form>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden rounded-full hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Search and Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 space-y-4">
            <form onSubmit={handleSubmit} className="flex items-center">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search for news..."
                  className="pl-10 w-full bg-white/80 border-gray-200"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button 
                type="submit" 
                className="ml-2 button-primary"
                disabled={isSearching}
              >
                {isSearching ? "..." : "Search"}
              </Button>
            </form>
            <nav className="flex flex-col space-y-2">
              <Button variant="ghost" className="justify-start hover:bg-gray-100">
                Home
              </Button>
              <Button variant="ghost" className="justify-start hover:bg-gray-100">
                Bookmarks
              </Button>
              <Button variant="ghost" className="justify-start hover:bg-gray-100">
                Settings
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}