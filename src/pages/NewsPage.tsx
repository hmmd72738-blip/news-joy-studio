import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import Header from "@/components/Header";
import CategoryBar from "@/components/CategoryBar";
import NewsDetail from "@/components/NewsDetail";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { NewsItem, categories } from "@/data/newsData";
import { useNews, DBNewsItem } from "@/hooks/useNews";
import { Loader2 } from "lucide-react";

// Helper to convert DB news to component NewsItem format
const convertToNewsItem = (dbNews: DBNewsItem): NewsItem => {
  const date = new Date(dbNews.created_at);
  const banglaDate = date.toLocaleDateString('bn-BD', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  
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

const NewsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [activeCategory, setActiveCategory] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Use cached news data - this will be instant if already loaded
  const { news: dbNews, loading } = useNews();
  
  // Memoize converted data
  const newsData = useMemo(() => dbNews.map(convertToNewsItem), [dbNews]);
  const currentNews = useMemo(() => newsData.find(n => String(n.id) === id), [newsData, id]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleBack = () => {
    navigate("/");
  };

  // Show loading only if we don't have cached data
  if (loading && dbNews.length === 0) {
    return (
      <div className="min-h-screen bg-background page-transition">
        <Header
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <CategoryBar 
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
        <main className="container py-6">
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!currentNews) {
    return (
      <div className="min-h-screen bg-background page-transition">
        <Header
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <CategoryBar 
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
        <main className="container py-6">
          <div className="text-center py-20">
            <h1 className="text-2xl font-bold text-foreground mb-4">সংবাদটি পাওয়া যায়নি</h1>
            <button
              onClick={handleBack}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              হোমে ফিরুন
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background page-transition">
      <Header
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <CategoryBar 
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      <main className="animate-fade-in">
        <NewsDetail news={currentNews} onBack={handleBack} />
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default NewsPage;
