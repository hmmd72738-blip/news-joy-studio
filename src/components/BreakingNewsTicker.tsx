import { breakingNews } from "@/data/newsData";

const BreakingNewsTicker = () => {
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
