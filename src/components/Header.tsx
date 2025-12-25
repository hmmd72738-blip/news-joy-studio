import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Menu, X, Moon, Sun, Settings, User } from "lucide-react";
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
  const { user, isAdmin } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`premium-header transition-all duration-500 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="container">
        {/* Main Header Row */}
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative group">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-gold to-accent flex items-center justify-center transform transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3">
                <span className="text-primary-foreground font-display text-2xl md:text-3xl font-bold">
                  দ
                </span>
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-gold to-accent rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity" />
            </div>
            <div>
              <h1 className="font-display text-lg sm:text-xl md:text-2xl font-bold text-news-header-foreground leading-tight">
                দৈনিক প্রতিদিন
              </h1>
              <p className="hidden sm:block text-[10px] md:text-xs text-news-header-foreground/60 tracking-wider uppercase">
                সত্য • নিরপেক্ষ • আধুনিক
              </p>
            </div>
          </div>

          {/* Desktop Search */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
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
                className="w-full py-2.5 px-4 pl-11 rounded-xl bg-white/10 border border-white/10 text-news-header-foreground placeholder:text-news-header-foreground/50 focus:outline-none focus:border-gold/50 focus:bg-white/15 transition-all duration-300"
              />
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-news-header-foreground/50" />
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2">
            {isAdmin && (
              <Link
                to="/admin"
                className="p-2.5 rounded-xl bg-white/10 text-news-header-foreground hover:bg-white/20 transition-all duration-300"
                title="অ্যাডমিন প্যানেল"
              >
                <Settings className="w-5 h-5" />
              </Link>
            )}

            {!user && (
              <Link
                to="/auth"
                className="p-2.5 rounded-xl bg-white/10 text-news-header-foreground hover:bg-white/20 transition-all duration-300"
                title="লগইন"
              >
                <User className="w-5 h-5" />
              </Link>
            )}

            <button
              onClick={toggleDarkMode}
              className="p-2.5 rounded-xl bg-white/10 text-news-header-foreground hover:bg-gold/20 hover:text-gold transition-all duration-300"
              aria-label={darkMode ? "লাইট মোড" : "ডার্ক মোড"}
            >
              {darkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-lg bg-white/10 text-news-header-foreground"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-white/10 text-news-header-foreground"
            >
              {darkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white/10 text-news-header-foreground"
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
        {searchOpen && (
          <div className="md:hidden mt-4 animate-fade-in-down">
            <input
              type="text"
              placeholder="সংবাদ খুঁজুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-2.5 px-4 rounded-xl bg-white/10 border border-white/10 text-news-header-foreground placeholder:text-news-header-foreground/50 focus:outline-none focus:border-gold/50"
            />
          </div>
        )}

        {/* Navigation */}
        <nav
          className={`mt-4 ${
            mobileMenuOpen ? "block" : "hidden md:block"
          }`}
        >
          <div className="flex flex-wrap gap-1 md:gap-2">
            {categories.map((category) => (
              <button
                key={category.slug}
                onClick={() => {
                  setActiveCategory(category.slug);
                  setMobileMenuOpen(false);
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeCategory === category.slug
                    ? "bg-gradient-to-r from-gold to-accent text-primary-foreground shadow-lg"
                    : "text-news-header-foreground/80 hover:bg-white/10 hover:text-news-header-foreground"
                }`}
              >
                {category.name}
              </button>
            ))}
            
            {/* Mobile Admin/Auth Links */}
            <div className="md:hidden w-full flex gap-2 mt-2 pt-2 border-t border-white/10">
              {isAdmin ? (
                <Link
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 py-2 text-center rounded-lg bg-white/10 text-news-header-foreground text-sm"
                >
                  অ্যাডমিন প্যানেল
                </Link>
              ) : !user ? (
                <Link
                  to="/auth"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 py-2 text-center rounded-lg bg-white/10 text-news-header-foreground text-sm"
                >
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
