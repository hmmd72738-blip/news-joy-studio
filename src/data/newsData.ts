export interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  categorySlug: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
  isBreaking?: boolean;
  isLead?: boolean;
}

export const categories = [
  { name: "হোম", slug: "home", icon: "Home" },
  { name: "জাতীয়", slug: "national", icon: "Flag" },
  { name: "আন্তর্জাতিক", slug: "international", icon: "Globe" },
  { name: "রাজনীতি", slug: "politics", icon: "Landmark" },
  { name: "খেলাধুলা", slug: "sports", icon: "Trophy" },
  { name: "বিনোদন", slug: "entertainment", icon: "Film" },
  { name: "প্রযুক্তি", slug: "technology", icon: "Cpu" },
  { name: "ইসলামিক", slug: "islamic", icon: "Moon" },
  { name: "মতামত", slug: "opinion", icon: "MessageSquare" },
];

export const breakingNews: string[] = [];

export const newsData: NewsItem[] = [];

export const prayerTimes = {
  fajr: "৫:১৫",
  dhuhr: "১২:০৫",
  asr: "৩:৪৫",
  maghrib: "৫:২০",
  isha: "৬:৪৫",
};

export const getBanglaDate = () => {
  const today = new Date();
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return today.toLocaleDateString('bn-BD', options);
};
