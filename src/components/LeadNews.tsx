import { NewsItem } from "@/data/newsData";
import { Calendar, Clock, User } from "lucide-react";

interface LeadNewsProps {
  news: NewsItem;
  onReadMore: (id: number) => void;
}

const LeadNews = ({ news, onReadMore }: LeadNewsProps) => {
  return (
    <article 
      className="relative overflow-hidden rounded-2xl cursor-pointer group news-card-hover"
      onClick={() => onReadMore(news.id)}
    >
      <div className="aspect-[16/9] md:aspect-[21/9]">
        <img
          src={news.image}
          alt={news.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="category-badge">{news.category}</span>
          {news.isBreaking && (
            <span className="px-3 py-1 bg-accent text-accent-foreground text-xs font-bold rounded-full animate-pulse-glow">
              ব্রেকিং
            </span>
          )}
        </div>
        <h2 className="text-2xl md:text-4xl font-bold text-primary-foreground mb-4 leading-tight">
          {news.title}
        </h2>
        <p className="text-primary-foreground/80 text-lg mb-4 line-clamp-2 hidden md:block">
          {news.excerpt}
        </p>
        <div className="flex flex-wrap items-center gap-4 text-sm text-primary-foreground/70">
          <span className="flex items-center gap-1">
            <User className="w-4 h-4" />
            {news.author}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {news.date}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {news.readTime} পড়া
          </span>
        </div>
      </div>
    </article>
  );
};

export default LeadNews;
