import { categories } from "@/data/newsData";

interface CategoryBarProps {
  activeCategory: string;
  setActiveCategory: (slug: string) => void;
}

const CategoryBar = ({ activeCategory, setActiveCategory }: CategoryBarProps) => {
  return (
    <div className="bg-card border-b border-border shadow-sm sticky top-[100px] md:top-[120px] z-40">
      <div className="container">
        <nav className="flex items-center gap-1 py-2 overflow-x-auto scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.slug}
              onClick={() => setActiveCategory(category.slug)}
              className={`whitespace-nowrap px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg ${
                activeCategory === category.slug
                  ? "bg-accent text-accent-foreground"
                  : "text-foreground/70 hover:text-foreground hover:bg-muted"
              }`}
            >
              {category.name}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default CategoryBar;
