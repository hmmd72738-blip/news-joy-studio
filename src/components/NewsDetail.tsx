import { NewsItem } from "@/data/newsData";
import { ArrowLeft, Calendar, Clock, User, Facebook, Twitter, Share2, Link2, Check } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface NewsDetailProps {
  news: NewsItem;
  onBack: () => void;
}

const NewsDetail = ({ news, onBack }: NewsDetailProps) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank');
  };

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(news.title)}&url=${encodeURIComponent(window.location.href)}`, '_blank');
  };

  const shareOnWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(news.title + ' ' + window.location.href)}`, '_blank');
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast({
        title: "লিংক কপি হয়েছে!",
        description: "লিংকটি ক্লিপবোর্ডে কপি করা হয়েছে।",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "কপি করতে ব্যর্থ",
        description: "লিংক কপি করা যায়নি।",
        variant: "destructive",
      });
    }
  };

  return (
    <article className="animate-fade-in-up">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors px-4"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>ফিরে যান</span>
      </button>

      {/* Hero Image */}
      <div className="w-full overflow-hidden mb-6">
        <img
          src={news.image}
          alt={news.title}
          className="w-full h-auto object-cover"
        />
      </div>

      <div className="px-4 md:px-8 lg:px-16">

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
        <button
          onClick={copyLink}
          className="p-2 rounded-full bg-muted text-muted-foreground hover:bg-muted/80 transition-colors"
          aria-label="Copy Link"
        >
          {copied ? <Check className="w-5 h-5 text-green-500" /> : <Link2 className="w-5 h-5" />}
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
      </div>
    </article>
  );
};

export default NewsDetail;
