import { useNews } from "@/hooks/useNews";
import { Zap } from "lucide-react";

interface BreakingNewsTickerProps {
  hasBreakingNews?: (hasNews: boolean) => void;
}

const BreakingNewsTicker = () => {
  const { news } = useNews();
  
  // Filter only breaking news from database
  const breakingNews = news.filter(n => n.is_breaking).map(n => n.title);
  
  // Don't render if no breaking news
  if (breakingNews.length === 0) {
    return null;
  }

  return (
    <div className="breaking-ticker-container text-accent-foreground py-3 overflow-hidden">
      <div className="container flex items-center gap-4">
        {/* Breaking Badge */}
        <div className="flex-shrink-0 flex items-center gap-2 breaking-badge">
          <Zap className="w-4 h-4" />
          <span className="font-display font-bold text-sm">ব্রেকিং</span>
        </div>
        
        {/* Ticker */}
        <div className="overflow-hidden flex-1 relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-accent to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-accent to-transparent z-10" />
          
          <div className="breaking-ticker whitespace-nowrap flex">
            {breakingNews.map((title, index) => (
              <span key={index} className="inline-flex items-center mx-8 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-gold mr-3 animate-pulse" />
                {title}
              </span>
            ))}
            {/* Duplicate for seamless loop */}
            {breakingNews.map((title, index) => (
              <span key={`repeat-${index}`} className="inline-flex items-center mx-8 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-gold mr-3 animate-pulse" />
                {title}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreakingNewsTicker;
