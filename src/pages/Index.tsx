import { useState, useEffect } from "react";
import Header from "@/components/Header";
import BreakingNewsTicker from "@/components/BreakingNewsTicker";
import LeadNews from "@/components/LeadNews";
import NewsCard from "@/components/NewsCard";
import Sidebar from "@/components/Sidebar";
import NewsDetail from "@/components/NewsDetail";
import ScrollToTop from "@/components/ScrollToTop";
import Footer from "@/components/Footer";
import { newsData, NewsItem } from "@/data/newsData";

const Index = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeCategory, setActiveCategory] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

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

  const leadNews = filteredNews.find((news) => news.isLead) || filteredNews[0];
  const otherNews = filteredNews.filter((news) => news.id !== leadNews?.id);

  const handleReadMore = (id: number) => {
    const news = newsData.find((n) => n.id === id);
    if (news) {
      setSelectedNews(news);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    setSelectedNews(null);
  };

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
