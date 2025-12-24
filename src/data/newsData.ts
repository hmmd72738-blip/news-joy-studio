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
  { name: "হোম", slug: "home" },
  { name: "জাতীয়", slug: "national" },
  { name: "আন্তর্জাতিক", slug: "international" },
  { name: "রাজনীতি", slug: "politics" },
  { name: "খেলাধুলা", slug: "sports" },
  { name: "বিনোদন", slug: "entertainment" },
  { name: "প্রযুক্তি", slug: "technology" },
  { name: "ইসলামিক", slug: "islamic" },
  { name: "মতামত", slug: "opinion" },
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
