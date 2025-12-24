import { useState, useEffect } from "react";
import Header from "@/components/Header";
import BreakingNewsTicker from "@/components/BreakingNewsTicker";
import LeadNews from "@/components/LeadNews";
import NewsCard from "@/components/NewsCard";
import Sidebar from "@/components/Sidebar";
import NewsDetail from "@/components/NewsDetail";
import ScrollToTop from "@/components/ScrollToTop";
import Footer from "@/components/Footer";
import { NewsItem, categories } from "@/data/newsData";
import { useNews, DBNewsItem } from "@/hooks/useNews";

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
    id: dbNews.id as unknown as number, // Use string id
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
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  
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

  // If the selected article no longer exists, return to list view
  useEffect(() => {
    if (selectedNews && !newsData.some((n) => String(n.id) === String(selectedNews.id))) {
      setSelectedNews(null);
    }
  }, [selectedNews, newsData]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const filteredNews = newsData.filter((news) => {
    const matchesCategory = activeCategory === "home" || news.categorySlug === activeCategory;
    const matchesSearch = news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          news.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const leadNews = filteredNews.find((news) => news.isLead) || filteredNews[0];
  const otherNews = filteredNews.filter((news) => String(news.id) !== String(leadNews?.id));

  const handleReadMore = (id: number | string) => {
    const news = newsData.find((n) => String(n.id) === String(id));
    if (news) {
      setSelectedNews(news);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    setSelectedNews(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">সংবাদ লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <BreakingNewsTicker />

      <main className="container py-8">
        {selectedNews ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <NewsDetail news={selectedNews} onBack={handleBack} />
            </div>
            <div className="lg:col-span-1">
              <Sidebar popularNews={newsData} onReadMore={handleReadMore} />
            </div>
          </div>
        ) : (
          <>
            {/* Lead News */}
            {leadNews && (
              <section className="mb-8">
                <LeadNews news={leadNews} onReadMore={handleReadMore} />
              </section>
            )}

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* News Grid */}
              <div className="lg:col-span-2">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-foreground">
                    {activeCategory === "home" ? "সর্বশেষ সংবাদ" : 
                      newsData.find(n => n.categorySlug === activeCategory)?.category || "সর্বশেষ সংবাদ"}
                  </h2>
                  <div className="h-1 flex-1 ml-4 bg-gradient-to-r from-accent to-transparent rounded-full" />
                </div>

                {otherNews.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {otherNews.map((news, index) => (
                      <div
                        key={news.id}
                        className="animate-fade-in-up"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <NewsCard news={news} onReadMore={handleReadMore} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <p>কোনো সংবাদ পাওয়া যায়নি।</p>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <Sidebar popularNews={newsData} onReadMore={handleReadMore} />
              </div>
            </div>
          </>
        )}
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;