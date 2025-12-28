import { categories } from "@/data/newsData";
import { Home, Flag, Globe, Landmark, Trophy, Film, Cpu, Moon, MessageSquare } from "lucide-react";

interface CategoryBarProps {
  activeCategory: string;
  setActiveCategory: (slug: string) => void;
}

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

const CategoryBar = ({ activeCategory, setActiveCategory }: CategoryBarProps) => {
  return (
    <div className="bg-card border-b border-border shadow-sm sticky top-[100px] md:top-[120px] z-40">
      <div className="container">
        <nav className="flex items-center gap-1 py-2 overflow-x-auto scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.slug}
              onClick={() => setActiveCategory(category.slug)}
              className={`flex items-center gap-2 whitespace-nowrap px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg ${
                activeCategory === category.slug
                  ? "bg-accent text-accent-foreground"
                  : "text-foreground/70 hover:text-foreground hover:bg-muted"
              }`}
            >
              {iconMap[category.icon]}
              {category.name}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default CategoryBar;

