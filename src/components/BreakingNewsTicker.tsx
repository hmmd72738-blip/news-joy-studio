import { useNews } from "@/hooks/useNews";

const BreakingNewsTicker = () => {
  const { news } = useNews();
  
  // Filter only breaking news from database
  const breakingNews = news.filter(n => n.is_breaking).map(n => n.title);
  
  // Don't render if no breaking news
  if (breakingNews.length === 0) {
    return null;
  }

  return (
    <div className="bg-accent text-accent-foreground py-2 overflow-hidden">
      <div className="container flex items-center gap-4">
        <span className="flex-shrink-0 px-3 py-1 bg-primary-foreground/20 rounded font-bold text-sm animate-pulse-glow">
          ব্রেকিং
        </span>
        <div className="overflow-hidden flex-1">
          <div className="breaking-ticker whitespace-nowrap">
            {breakingNews.map((news, index) => (
              <span key={index} className="inline-block mx-8">
                • {news}
              </span>
            ))}
            {breakingNews.map((news, index) => (
              <span key={`repeat-${index}`} className="inline-block mx-8">
                • {news}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreakingNewsTicker;