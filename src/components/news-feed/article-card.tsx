import { useState } from "react";
import { Article } from "../../interfaces/articles";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Badge } from "../ui/badge";
import { Calendar, ExternalLink, Bookmark, Share2 } from 'lucide-react';
import { formatDistanceToNow } from "date-fns";
import { Button } from "../ui/button";
import { useToast } from "../../hooks/use-toast";

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { toast } = useToast();
  
  const formattedDate = formatDistanceToNow(new Date(article.publishedAt), {
    addSuffix: true,
  });

  const toggleSave = () => {
    setIsLoading(true);
    
    // Simulate saving
    setTimeout(() => {
      setIsSaved(!isSaved);
      setIsLoading(false);
      
      toast({
        title: isSaved ? "Removed from bookmarks" : "Saved to bookmarks",
        description: isSaved ? "Article removed from your bookmarks" : "Article saved to your bookmarks",
      });
    }, 300);
  };
  
  const shareArticle = () => {
    // Try to use the Web Share API if available
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.description,
        url: article.url,
      }).catch(() => {
        // Fallback if sharing fails
        copyToClipboard();
      });
    } else {
      // Fallback for browsers that don't support the Web Share API
      copyToClipboard();
    }
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(article.url).then(() => {
      toast({
        title: "Share link copied",
        description: "Article link copied to clipboard",
      });
    });
  };

  const getCategoryColor = (category?: string) => {
    const colors: Record<string, string> = {
      technology: "bg-blue-500",
      business: "bg-green-500",
      health: "bg-red-500",
      science: "bg-purple-500",
      entertainment: "bg-pink-500",
      sports: "bg-orange-500",
      politics: "bg-yellow-500",
      environment: "bg-emerald-500",
      arts: "bg-indigo-500",
      general: "bg-gray-500"
    };
    
    return category && colors[category] ? colors[category] : "bg-gray-500";
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Card className="overflow-hidden flex flex-col h-full card-hover bg-card border border-gray-200">
      <div className="relative h-48 w-full overflow-hidden bg-gray-100">
        {!imageError ? (
          <img
            src={article.urlToImage || "/placeholder.svg"}
            alt={article.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            onError={handleImageError}
          />
        ) : (
          <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-gray-200">
            <span className="text-gray-500 text-sm">No image available</span>
          </div>
        )}
        <div className="absolute top-2 right-2 flex space-x-1">
          <Badge className="bg-primary/80 hover:bg-primary backdrop-blur-sm text-white">
            {article.source.name}
          </Badge>
          {article.category && (
            <Badge className={`${getCategoryColor(article.category)} text-white`}>
              {article.category}
            </Badge>
          )}
        </div>
      </div>
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start">
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-lg hover:text-primary transition-colors line-clamp-2 group"
          >
            <span className="bg-left-bottom bg-gradient-to-r from-primary to-secondary bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500">
              {article.title}
            </span>
          </a>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSave}
            disabled={isLoading}
            className="h-8 w-8 -mt-1 -mr-2 rounded-full hover:bg-gray-100"
          >
            <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-secondary text-secondary' : ''} transition-colors`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2 flex-grow">
        <p className="text-muted-foreground text-sm line-clamp-3">
          {article.description}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0 text-xs text-muted-foreground flex justify-between items-center">
        <div className="flex items-center">
          <Calendar className="h-3 w-3 mr-1 text-primary" />
          <span>{formattedDate}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={shareArticle}
            className="h-7 w-7 rounded-full hover:bg-gray-100"
          >
            <Share2 className="h-3 w-3" />
          </Button>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-secondary hover:text-secondary/80 transition-colors"
          >
            <span className="mr-1">Read</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </CardFooter>
    </Card>
  );
}