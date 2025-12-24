import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Menu, X, Moon, Sun, Settings } from "lucide-react";
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
  const { user, isAdmin } = useAuth();
  return (
    <header className="sticky top-0 z-50 bg-news-header text-news-header-foreground shadow-lg">
      {/* Top bar */}
      <div className="container py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
              <span className="text-accent-foreground font-bold text-xl">দ</span>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                দৈনিক প্রতিদিন
              </h1>
              <p className="text-xs text-news-header-foreground/70 hidden sm:block">
                সত্য ও নিরপেক্ষ সংবাদের প্রতিশ্রুতি
              </p>
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="সংবাদ খুঁজুন..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 px-4 py-2 pl-10 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 text-news-header-foreground placeholder:text-news-header-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent transition-all"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-news-header-foreground/50" />
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Admin Link */}
            {isAdmin && (
              <Link
                to="/admin"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground hover:bg-accent/90 transition-colors"
              >
                <Settings className="w-4 h-4" />
                <span className="text-sm font-medium">অ্যাডমিন</span>
              </Link>
            )}
            {!user && (
              <Link
                to="/auth"
                className="px-4 py-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors text-sm font-medium"
              >
                লগইন
              </Link>
            )}
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-full bg-primary-foreground/10"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-primary-foreground/10"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full bg-primary-foreground/10"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        {searchOpen && (
          <div className="mt-4 md:hidden animate-fade-in-up">
            <input
              type="text"
              placeholder="সংবাদ খুঁজুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 text-news-header-foreground placeholder:text-news-header-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="border-t border-primary-foreground/10">
        <div className="container">
          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-1 py-2 overflow-x-auto">
            {categories.map((cat) => (
              <li key={cat.slug}>
                <button
                  onClick={() => setActiveCategory(cat.slug)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                    activeCategory === cat.slug
                      ? "bg-accent text-accent-foreground"
                      : "hover:bg-primary-foreground/10"
                  }`}
                >
                  {cat.name}
                </button>
              </li>
            ))}
          </ul>

          {/* Mobile Nav */}
          {mobileMenuOpen && (
            <ul className="md:hidden py-4 space-y-1 animate-fade-in-up">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <button
                    onClick={() => {
                      setActiveCategory(cat.slug);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all ${
                      activeCategory === cat.slug
                        ? "bg-accent text-accent-foreground"
                        : "hover:bg-primary-foreground/10"
                    }`}
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
