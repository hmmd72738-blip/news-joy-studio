import { NewsItem } from "@/data/newsData";
import { Calendar, ArrowRight } from "lucide-react";

interface NewsCardProps {
  news: NewsItem;
  onReadMore: (id: number | string) => void;
}

const NewsCard = ({ news, onReadMore }: NewsCardProps) => {
  return (
    <article 
      className="bg-card rounded-xl overflow-hidden shadow-md news-card-hover cursor-pointer group"
      onClick={() => onReadMore(news.id)}
    >
      <div className="aspect-[16/10] overflow-hidden">
        <img
          src={news.image}
          alt={news.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="p-5">
        <span className="category-badge text-xs mb-3 inline-block">
          {news.category}
        </span>
        <h3 className="text-lg font-bold text-card-foreground mb-2 line-clamp-2 group-hover:text-accent transition-colors">
          {news.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {news.excerpt}
        </p>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1 text-xs text-news-date">
            <Calendar className="w-3 h-3" />
            {news.date}
          </span>
          <span className="flex items-center gap-1 text-sm font-medium text-accent group-hover:gap-2 transition-all">
            বিস্তারিত
            <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </article>
  );
};

export default NewsCard;
