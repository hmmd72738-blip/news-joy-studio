import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Search, Menu, X, Moon, Sun, Settings, User, TrendingUp, Clock,
  Home, Flag, Globe, Landmark, Trophy, Film, Cpu, MessageSquare
} from "lucide-react";
import logo from "@/assets/new-logo.png";
import { categories } from "@/data/newsData";
import { useAuth } from "@/hooks/useAuth";

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  activeCategory: string;
  setActiveCategory: (slug: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const Header = ({
  darkMode,
  toggleDarkMode,
  activeCategory,
  setActiveCategory,
  searchQuery,
  setSearchQuery,
}: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const { user, isAdmin } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatBanglaDate = () => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return currentTime.toLocaleDateString('bn-BD', options);
  };

  const formatBanglaTime = () => {
    return currentTime.toLocaleTimeString('bn-BD', { 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };

  return (
    <header
      className={`premium-header transition-all duration-500 ${
        scrolled ? "py-2 shadow-2xl" : "py-3"
      }`}
    >
      {/* Top Bar - Date & Time */}
      <div className={`border-b border-white/10 transition-all duration-300 ${scrolled ? 'hidden' : 'block'}`}>
        <div className="container">
          <div className="flex items-center justify-between py-2 text-xs text-news-header-foreground/70">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {formatBanglaTime()}
              </span>
              <span className="hidden sm:inline">|</span>
              <span className="hidden sm:inline">{formatBanglaDate()}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-gold">
                <TrendingUp className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">ট্রেন্ডিং</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Main Header Row */}
        <div className="flex items-center justify-between gap-4 py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <img 
                src={logo} 
                alt="দৈনিক প্রতিদিন লোগো" 
                className="w-8 h-8 md:w-10 md:h-10 rounded-lg object-contain transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
              />
              <div className="absolute -inset-1 bg-gradient-to-r from-gold/30 to-accent/30 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div>
              <h1 className="font-masthead text-xl sm:text-2xl md:text-3xl font-normal text-news-header-foreground leading-tight group-hover:text-gold transition-colors duration-300">
                দৈনিক প্রতিদিন
              </h1>
              <p className="hidden sm:block text-[10px] md:text-xs text-news-header-foreground/60 tracking-wider">
                <span className="text-gold">সত্য</span> • <span className="text-accent">নিরপেক্ষ</span> • আধুনিক
              </p>
            </div>
          </Link>

          {/* Desktop Search */}
          <div className="hidden lg:flex flex-1 max-w-lg mx-8">
            <div
              className={`relative w-full transition-all duration-300 ${
                searchOpen ? "scale-105" : ""
              }`}
            >
              <input
                type="text"
                placeholder="সংবাদ খুঁজুন..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchOpen(true)}
                onBlur={() => setSearchOpen(false)}
                className="w-full py-3 px-5 pl-12 rounded-2xl bg-white/10 border border-white/10 text-news-header-foreground placeholder:text-news-header-foreground/50 focus:outline-none focus:border-gold/50 focus:bg-white/15 focus:ring-2 focus:ring-gold/20 transition-all duration-300"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-news-header-foreground/50" />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-news-header-foreground/50 hover:text-news-header-foreground transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            {isAdmin && (
              <Link
                to="/admin"
                className="group relative p-3 rounded-xl bg-gradient-to-r from-gold/20 to-accent/20 text-news-header-foreground hover:from-gold/30 hover:to-accent/30 transition-all duration-300"
                title="অ্যাডমিন প্যানেল"
              >
                <Settings className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" />
              </Link>
            )}

            {!user && (
              <Link
                to="/auth"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-accent to-accent/80 text-white font-medium hover:shadow-lg hover:shadow-accent/30 transition-all duration-300"
                title="লগইন"
              >
                <User className="w-4 h-4" />
                <span className="text-sm">লগইন</span>
              </Link>
            )}

            <button
              onClick={toggleDarkMode}
              className="relative p-3 rounded-xl bg-white/10 text-news-header-foreground hover:bg-white/20 transition-all duration-300 overflow-hidden group"
              aria-label={darkMode ? "লাইট মোড" : "ডার্ক মোড"}
            >
              <div className="relative z-10">
                {darkMode ? (
                  <Sun className="w-5 h-5 text-gold group-hover:rotate-180 transition-transform duration-500" />
                ) : (
                  <Moon className="w-5 h-5 group-hover:-rotate-12 transition-transform duration-300" />
                )}
              </div>
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className={`p-2.5 rounded-xl transition-all duration-300 ${
                searchOpen ? 'bg-gold/20 text-gold' : 'bg-white/10 text-news-header-foreground'
              }`}
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={toggleDarkMode}
              className="p-2.5 rounded-xl bg-white/10 text-news-header-foreground"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-gold" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2.5 rounded-xl transition-all duration-300 ${
                mobileMenuOpen ? 'bg-accent/20 text-accent' : 'bg-white/10 text-news-header-foreground'
              }`}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${searchOpen ? 'max-h-20 opacity-100 pb-3' : 'max-h-0 opacity-0'}`}>
          <div className="relative">
            <input
              type="text"
              placeholder="সংবাদ খুঁজুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-3 px-4 pl-11 rounded-xl bg-white/10 border border-white/10 text-news-header-foreground placeholder:text-news-header-foreground/50 focus:outline-none focus:border-gold/50"
            />
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-news-header-foreground/50" />
          </div>
        </div>

        {/* Navigation */}
        <nav
          className={`overflow-hidden transition-all duration-300 ${
            mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 md:max-h-none opacity-0 md:opacity-100"
          }`}
        >
          <div className="flex flex-wrap gap-1.5 md:gap-2 py-2 border-t border-white/10">
            {categories.map((category, index) => {
              const iconMap: { [key: string]: React.ReactNode } = {
                Home: <Home className="w-4 h-4" />,
                Flag: <Flag className="w-4 h-4" />,
                Globe: <Globe className="w-4 h-4" />,
                Landmark: <Landmark className="w-4 h-4" />,
                Trophy: <Trophy className="w-4 h-4" />,
                Film: <Film className="w-4 h-4" />,
                Cpu: <Cpu className="w-4 h-4" />,
                Moon: <Moon className="w-4 h-4" />,
                MessageSquare: <MessageSquare className="w-4 h-4" />,
              };
              
              return (
                <button
                  key={category.slug}
                  onClick={() => {
                    setActiveCategory(category.slug);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    activeCategory === category.slug
                      ? "bg-gradient-to-r from-gold via-gold/90 to-accent text-primary-foreground shadow-lg shadow-gold/20 scale-105"
                      : "text-news-header-foreground/80 hover:bg-white/10 hover:text-news-header-foreground hover:scale-105"
                  }`}
                  style={{
                    animationDelay: `${index * 50}ms`
                  }}
                >
                  {iconMap[category.icon]}
                  {category.name}
                </button>
              );
            })}
            
            {/* Mobile Admin/Auth Links */}
            <div className="md:hidden w-full flex gap-2 mt-3 pt-3 border-t border-white/10">
              {isAdmin ? (
                <Link
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 py-2.5 text-center rounded-xl bg-gradient-to-r from-gold/20 to-accent/20 text-news-header-foreground text-sm font-medium flex items-center justify-center gap-2"
                >
                  <Settings className="w-4 h-4" />
                  অ্যাডমিন প্যানেল
                </Link>
              ) : !user ? (
                <Link
                  to="/auth"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 py-2.5 text-center rounded-xl bg-gradient-to-r from-accent to-accent/80 text-white text-sm font-medium flex items-center justify-center gap-2"
                >
                  <User className="w-4 h-4" />
                  লগইন করুন
                </Link>
              ) : null}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
