import { NewsItem } from "@/data/newsData";
import { ArrowLeft, Calendar, Clock, User, Facebook, Twitter, Share2 } from "lucide-react";

interface NewsDetailProps {
  news: NewsItem;
  onBack: () => void;
}

const NewsDetail = ({ news, onBack }: NewsDetailProps) => {
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
    <article className="animate-fade-in-up">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>ফিরে যান</span>
      </button>

      {/* Hero Image */}
      <div className="aspect-video rounded-2xl overflow-hidden mb-6">
        <img
          src={news.image}
          alt={news.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Category & Meta */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <span className="category-badge">{news.category}</span>
        {news.isBreaking && (
          <span className="px-3 py-1 bg-accent text-accent-foreground text-xs font-bold rounded-full">
            ব্রেকিং
          </span>
        )}
      </div>

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
        {news.title}
      </h1>

      {/* Author & Date */}
      <div className="flex flex-wrap items-center gap-6 mb-6 pb-6 border-b border-border">
        <span className="flex items-center gap-2 text-muted-foreground">
          <User className="w-5 h-5" />
          {news.author}
        </span>
        <span className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="w-5 h-5" />
          {news.date}
        </span>
        <span className="flex items-center gap-2 text-muted-foreground">
          <Clock className="w-5 h-5" />
          {news.readTime} পড়া
        </span>
      </div>

      {/* Social Share */}
      <div className="flex items-center gap-4 mb-8">
        <span className="text-sm text-muted-foreground">শেয়ার করুন:</span>
        <button
          onClick={shareOnFacebook}
          className="p-2 rounded-full bg-[#1877F2] text-primary-foreground hover:opacity-90 transition-opacity"
          aria-label="Share on Facebook"
        >
          <Facebook className="w-5 h-5" />
        </button>
        <button
          onClick={shareOnTwitter}
          className="p-2 rounded-full bg-[#1DA1F2] text-primary-foreground hover:opacity-90 transition-opacity"
          aria-label="Share on Twitter"
        >
          <Twitter className="w-5 h-5" />
        </button>
        <button
          onClick={shareOnWhatsApp}
          className="p-2 rounded-full bg-[#25D366] text-primary-foreground hover:opacity-90 transition-opacity"
          aria-label="Share on WhatsApp"
        >
          <Share2 className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="prose prose-lg max-w-none">
        <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
          {news.excerpt}
        </p>
        {news.content.split('\n\n').map((paragraph, index) => (
          <p key={index} className="text-foreground leading-relaxed mb-4">
            {paragraph}
          </p>
        ))}
      </div>
    </article>
  );
};

export default NewsDetail;
