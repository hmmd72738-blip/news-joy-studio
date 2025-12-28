import { useState, useEffect } from "react";
import Header from "@/components/Header";
import BreakingNewsTicker from "@/components/BreakingNewsTicker";
import NewsArticle from "@/components/NewsArticle";
import Sidebar from "@/components/Sidebar";
import ScrollToTop from "@/components/ScrollToTop";
import Footer from "@/components/Footer";
import { NewsItem, categories } from "@/data/newsData";
import { useNews, DBNewsItem } from "@/hooks/useNews";
import { Newspaper, Loader2 } from "lucide-react";

// Helper to convert DB news to component NewsItem format
const convertToNewsItem = (dbNews: DBNewsItem): NewsItem => {
  const date = new Date(dbNews.created_at);
  const banglaDate = date.toLocaleDateString('bn-BD', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  
  // Find category slug from categories list
  const categoryData = categories.find(c => c.name === dbNews.category);
  const categorySlug = categoryData?.slug || 'national';
  
  return {
    id: dbNews.id as unknown as number,
    title: dbNews.title,
    excerpt: dbNews.excerpt,
    content: dbNews.content,
    category: dbNews.category,
    categorySlug: categorySlug,
    image: dbNews.image_url,
    author: dbNews.author,
    date: banglaDate,
    readTime: "৩ মিনিট",
    isBreaking: dbNews.is_breaking,
    isLead: dbNews.is_lead,
  };
};

const Index = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeCategory, setActiveCategory] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  
  const { news: dbNews, loading } = useNews();
  
  // Convert DB news to component format
  const newsData = dbNews.map(convertToNewsItem);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const filteredNews = newsData.filter((news) => {
    const matchesCategory = activeCategory === "home" || news.categorySlug === activeCategory;
    const matchesSearch = news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          news.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort by date (newest first) - lead news first
  const sortedNews = [...filteredNews].sort((a, b) => {
    if (a.isLead && !b.isLead) return -1;
    if (!a.isLead && b.isLead) return 1;
    return 0;
  });

  return (
    <div className="min-h-screen bg-card pt-[130px] md:pt-[160px]">
      <Header
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <main className="container py-6">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* News Articles */}
            <div className="lg:col-span-2">

              {sortedNews.length > 0 ? (
                <div className="space-y-8">
                  {sortedNews.map((news, index) => (
                    <div
                      key={news.id}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <NewsArticle news={news} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                    <Newspaper className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground font-display text-lg">
                    কোনো সংবাদ পাওয়া যায়নি।
                  </p>
                  <p className="text-muted-foreground/70 text-sm mt-2">
                    অন্য বিভাগে খুঁজে দেখুন অথবা পরে আবার চেষ্টা করুন।
                  </p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Sidebar popularNews={newsData} />
            </div>
          </div>
        )}
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
