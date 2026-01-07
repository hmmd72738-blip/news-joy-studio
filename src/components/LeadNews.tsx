import { NewsItem } from "@/data/newsData";
import { Clock, User, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

interface LeadNewsProps {
  news: NewsItem;
}

const LeadNews = ({ news }: LeadNewsProps) => {
  return (
    <Link to={`/news/${news.id}`} className="block">
      <article className="hero-card group cursor-pointer">
        <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden">
          {/* Image */}
          <img
            src={news.image}
            alt={news.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="eager"
          />
          
          {/* Gradient Overlay */}
          <div className="hero-overlay absolute inset-0" />
          
          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 lg:p-14">
            {/* Category Badge */}
            <div className="mb-4 animate-fade-in-up">
              {news.isBreaking ? (
                <span className="breaking-badge font-display">
                  ব্রেকিং নিউজ
                </span>
              ) : (
                <span className="category-badge font-display">
                  {news.category}
                </span>
              )}
            </div>
            
            {/* Title */}
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4 group-hover:text-gold transition-colors duration-300 line-clamp-3 text-balance animate-fade-in-up stagger-1">
              {news.title}
            </h2>
            
            {/* Excerpt - Highlighted */}
            <div className="hidden md:block mb-6 animate-fade-in-up stagger-2">
              <p className="text-white/90 text-lg leading-relaxed line-clamp-2 max-w-3xl px-4 py-3 bg-white/10 backdrop-blur-sm rounded-lg border-l-4 border-gold">
                {news.excerpt}
              </p>
            </div>
            
            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-white/70 text-sm animate-fade-in-up stagger-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
                <span className="font-medium">{news.author}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>{news.date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>{news.readTime} পড়তে সময় লাগবে</span>
              </div>
            </div>
            
            {/* Read More Button */}
            <div className="mt-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
              <span className="btn-premium inline-flex items-center gap-2 text-sm">
                পুরো খবর পড়ুন
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default LeadNews;
