import { NewsItem } from "@/data/newsData";
import { Calendar, Clock, User, Facebook, Twitter, Share2 } from "lucide-react";

interface NewsArticleProps {
  news: NewsItem;
}

const NewsArticle = ({ news }: NewsArticleProps) => {
  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank');
  };

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(news.title)}&url=${encodeURIComponent(window.location.href)}`, '_blank');
  };

  const shareOnWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(news.title + ' ' + window.location.href)}`, '_blank');
  };

  return (
    <article className="glass rounded-2xl overflow-hidden mb-8 animate-fade-in-up">
      {/* Hero Image */}
      <div className="aspect-video md:aspect-[21/9] overflow-hidden">
        <img
          src={news.image}
          alt={news.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-6 md:p-8">
        {/* Category & Breaking Badge */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="category-badge">{news.category}</span>
          {news.isBreaking && (
            <span className="breaking-badge text-xs">
              ব্রেকিং
            </span>
          )}
        </div>

        {/* Title */}
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 leading-tight font-display">
          {news.title}
        </h2>

        {/* Author & Date */}
        <div className="flex flex-wrap items-center gap-4 mb-6 pb-4 border-b border-border text-sm text-muted-foreground">
          <span className="flex items-center gap-2">
            <User className="w-4 h-4" />
            {news.author}
          </span>
          <span className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {news.date}
          </span>
          <span className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            {news.readTime} পড়া
          </span>
        </div>

        {/* Excerpt - Highlighted */}
        <div className="mb-6">
          <p className="text-lg text-muted-foreground leading-relaxed px-4 py-3 bg-muted/50 rounded-lg border-l-4 border-accent">
            {news.excerpt}
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none mb-6">
          {news.content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="text-foreground leading-relaxed mb-4">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Social Share */}
        <div className="flex items-center gap-4 pt-4 border-t border-border">
          <span className="text-sm text-muted-foreground">শেয়ার করুন:</span>
          <button
            onClick={shareOnFacebook}
            className="p-2 rounded-full bg-[#1877F2] text-white hover:opacity-90 transition-opacity"
            aria-label="Share on Facebook"
          >
            <Facebook className="w-4 h-4" />
          </button>
          <button
            onClick={shareOnTwitter}
            className="p-2 rounded-full bg-[#1DA1F2] text-white hover:opacity-90 transition-opacity"
            aria-label="Share on Twitter"
          >
            <Twitter className="w-4 h-4" />
          </button>
          <button
            onClick={shareOnWhatsApp}
            className="p-2 rounded-full bg-[#25D366] text-white hover:opacity-90 transition-opacity"
            aria-label="Share on WhatsApp"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </article>
  );
};

export default NewsArticle;
