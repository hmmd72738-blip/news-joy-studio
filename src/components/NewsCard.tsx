import { NewsItem } from "@/data/newsData";
import { Clock, ThumbsUp, MessageCircle, Share2 } from "lucide-react";
import { Link } from "react-router-dom";

interface NewsCardProps {
  news: NewsItem;
}

const NewsCard = ({ news }: NewsCardProps) => {
  return (
    <Link to={`/news/${news.id}`} className="block">
      <article className="news-card group cursor-pointer h-full flex flex-col">
        {/* Image Container */}
        <div className="relative overflow-hidden aspect-[16/10]">
          <img
            src={news.image}
            alt={news.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          
          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <span className="category-badge font-display text-[10px]">
              {news.category}
            </span>
          </div>
          
          {/* Breaking Badge */}
          {news.isBreaking && (
            <div className="absolute top-3 right-3">
              <span className="breaking-badge text-[10px]">
                ব্রেকিং
              </span>
            </div>
          )}
          
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        {/* Content */}
        <div className="flex-1 flex flex-col p-5">
          {/* Title */}
          <h3 className="font-display text-lg md:text-xl font-bold text-card-foreground leading-snug mb-3 line-clamp-2 group-hover:text-accent transition-colors duration-300">
            {news.title}
          </h3>
          
          {/* Excerpt - Highlighted */}
          <div className="mb-4 flex-1">
            <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 px-3 py-2 bg-muted/50 rounded-md border-l-2 border-accent">
              {news.excerpt}
            </p>
          </div>
          
          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-border/50">
            {/* Author & Date */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-accent/50 flex items-center justify-center text-accent-foreground text-xs font-bold">
                {news.author.charAt(0)}
              </div>
              <div>
                <p className="text-xs font-medium text-card-foreground">{news.author}</p>
                <p className="text-[10px] text-muted-foreground">{news.date}</p>
              </div>
            </div>
            
            {/* Read Time */}
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="w-3.5 h-3.5" />
              <span className="text-xs">{news.readTime}</span>
            </div>
          </div>
          
          {/* Reaction Icons */}
          <div className="flex items-center gap-4 mt-4 pt-3 border-t border-border/30">
            <button 
              className="flex items-center gap-1.5 text-muted-foreground hover:text-accent transition-colors"
              onClick={(e) => e.preventDefault()}
            >
              <ThumbsUp className="w-4 h-4" />
              <span className="text-xs">পছন্দ</span>
            </button>
            <button 
              className="flex items-center gap-1.5 text-muted-foreground hover:text-accent transition-colors"
              onClick={(e) => e.preventDefault()}
            >
              <MessageCircle className="w-4 h-4" />
              <span className="text-xs">মন্তব্য</span>
            </button>
            <button 
              className="flex items-center gap-1.5 text-muted-foreground hover:text-accent transition-colors ml-auto"
              onClick={(e) => e.preventDefault()}
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default NewsCard;
