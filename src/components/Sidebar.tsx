import { NewsItem, prayerTimes, getBanglaDate } from "@/data/newsData";
import { TrendingUp, Clock, Eye, Calendar, Moon } from "lucide-react";

interface SidebarProps {
  popularNews: NewsItem[];
  onReadMore: (id: number | string) => void;
}

const Sidebar = ({ popularNews, onReadMore }: SidebarProps) => {
  // Take top 5 news for popular section
  const topNews = popularNews.slice(0, 5);

  return (
    <aside className="space-y-6">
      {/* Today's Date */}
      <div className="glass rounded-2xl p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-gold/20 to-accent/20">
            <Calendar className="w-5 h-5 text-gold" />
          </div>
          <h3 className="font-display font-bold text-foreground">আজকের তারিখ</h3>
        </div>
        <p className="text-lg font-display font-medium text-foreground">{getBanglaDate()}</p>
      </div>

      {/* Prayer Times */}
      <div className="glass rounded-2xl p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-xl bg-gradient-to-br from-accent to-accent/50">
            <Moon className="w-5 h-5 text-accent-foreground" />
          </div>
          <h3 className="font-display font-bold text-foreground">নামাজের সময়</h3>
        </div>
        <ul className="space-y-2">
          {[
            { name: "ফজর", time: prayerTimes.fajr },
            { name: "যোহর", time: prayerTimes.dhuhr },
            { name: "আসর", time: prayerTimes.asr },
            { name: "মাগরিব", time: prayerTimes.maghrib },
            { name: "ইশা", time: prayerTimes.isha },
          ].map((prayer, index) => (
            <li 
              key={prayer.name}
              className="flex justify-between items-center py-2 px-3 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <span className="text-muted-foreground text-sm">{prayer.name}</span>
              <span className="font-display font-semibold text-foreground">{prayer.time}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Popular News */}
      {topNews.length > 0 && (
        <div className="glass rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2 rounded-xl bg-gradient-to-br from-accent to-accent/50">
              <TrendingUp className="w-5 h-5 text-accent-foreground" />
            </div>
            <h3 className="font-display text-lg font-bold text-foreground">
              জনপ্রিয় সংবাদ
            </h3>
          </div>

          <div className="space-y-3">
            {topNews.map((news, index) => (
              <article
                key={news.id}
                className="group flex gap-3 cursor-pointer p-2 -mx-2 rounded-xl hover:bg-muted/50 transition-colors duration-300"
                onClick={() => onReadMore(news.id)}
              >
                {/* Number */}
                <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-accent to-accent/50 flex items-center justify-center text-accent-foreground font-display font-bold text-base">
                  {index + 1}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-display text-sm font-semibold text-foreground leading-snug line-clamp-2 group-hover:text-accent transition-colors duration-300">
                    {news.title}
                  </h4>
                  <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {news.readTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      ১.২k
                    </span>
                  </div>
                </div>

                {/* Image */}
                <div className="flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden">
                  <img
                    src={news.image}
                    alt={news.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      )}

      {/* Ad Space */}
      <div className="glass rounded-2xl p-5 text-center">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-4">
          বিজ্ঞাপন
        </p>
        <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-gradient-to-br from-gold/20 to-accent/20 flex items-center justify-center">
              <span className="text-2xl">📢</span>
            </div>
            <p className="text-sm text-muted-foreground font-display">
              বিজ্ঞাপনের জন্য যোগাযোগ করুন
            </p>
            <p className="text-xs text-muted-foreground/70 mt-1">
              ০১৩০২১০৮৯৫৭
            </p>
          </div>
        </div>
      </div>

      {/* Social Stats */}
      <div className="glass rounded-2xl p-5">
        <h3 className="font-display text-base font-bold text-foreground mb-4">
          সামাজিক মাধ্যমে আমরা
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {[
            { platform: "Facebook", count: "১২K", color: "from-blue-500 to-blue-600" },
            { platform: "Twitter", count: "৮K", color: "from-sky-400 to-sky-500" },
            { platform: "YouTube", count: "৫K", color: "from-red-500 to-red-600" },
            { platform: "Instagram", count: "১০K", color: "from-pink-500 to-purple-500" },
          ].map((social) => (
            <div
              key={social.platform}
              className="p-3 rounded-xl bg-muted/50 text-center hover:scale-105 transition-transform cursor-pointer"
            >
              <p className={`font-display font-bold text-lg bg-gradient-to-r ${social.color} bg-clip-text text-transparent`}>
                {social.count}
              </p>
              <p className="text-[10px] text-muted-foreground">{social.platform}</p>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
