import { NewsItem, prayerTimes, getBanglaDate } from "@/data/newsData";
import { TrendingUp, Clock, Calendar } from "lucide-react";

interface SidebarProps {
  popularNews: NewsItem[];
  onReadMore: (id: number) => void;
}

const Sidebar = ({ popularNews, onReadMore }: SidebarProps) => {
  return (
    <aside className="space-y-6">
      {/* Today's Date */}
      <div className="bg-card rounded-xl p-5 shadow-md">
        <div className="flex items-center gap-2 mb-3">
          <Calendar className="w-5 h-5 text-accent" />
          <h3 className="font-bold text-card-foreground">আজকের তারিখ</h3>
        </div>
        <p className="text-lg font-medium text-foreground">{getBanglaDate()}</p>
      </div>

      {/* Prayer Times */}
      <div className="bg-card rounded-xl p-5 shadow-md">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-accent" />
          <h3 className="font-bold text-card-foreground">নামাজের সময়</h3>
        </div>
        <ul className="space-y-3">
          <li className="flex justify-between items-center py-2 border-b border-border">
            <span className="text-muted-foreground">ফজর</span>
            <span className="font-semibold text-foreground">{prayerTimes.fajr}</span>
          </li>
          <li className="flex justify-between items-center py-2 border-b border-border">
            <span className="text-muted-foreground">যোহর</span>
            <span className="font-semibold text-foreground">{prayerTimes.dhuhr}</span>
          </li>
          <li className="flex justify-between items-center py-2 border-b border-border">
            <span className="text-muted-foreground">আসর</span>
            <span className="font-semibold text-foreground">{prayerTimes.asr}</span>
          </li>
          <li className="flex justify-between items-center py-2 border-b border-border">
            <span className="text-muted-foreground">মাগরিব</span>
            <span className="font-semibold text-foreground">{prayerTimes.maghrib}</span>
          </li>
          <li className="flex justify-between items-center py-2">
            <span className="text-muted-foreground">ইশা</span>
            <span className="font-semibold text-foreground">{prayerTimes.isha}</span>
          </li>
        </ul>
      </div>

      {/* Popular News */}
      <div className="bg-card rounded-xl p-5 shadow-md">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-accent" />
          <h3 className="font-bold text-card-foreground">জনপ্রিয় সংবাদ</h3>
        </div>
        <ul className="space-y-4">
          {popularNews.slice(0, 5).map((news, index) => (
            <li 
              key={news.id}
              className="flex gap-3 cursor-pointer group"
              onClick={() => onReadMore(news.id)}
            >
              <span className="flex-shrink-0 w-8 h-8 bg-accent/10 text-accent rounded-full flex items-center justify-center font-bold text-sm">
                {index + 1}
              </span>
              <div>
                <h4 className="text-sm font-medium text-card-foreground line-clamp-2 group-hover:text-accent transition-colors">
                  {news.title}
                </h4>
                <span className="text-xs text-muted-foreground">{news.category}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
