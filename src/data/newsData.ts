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

export const breakingNews = [
  "জরুরি: সরকার নতুন অর্থনৈতিক নীতিমালা ঘোষণা করেছে",
  "ঢাকায় আন্তর্জাতিক বাণিজ্য মেলা শুরু হচ্ছে আগামীকাল",
  "বাংলাদেশ ক্রিকেট দল সিরিজ জিতেছে ২-১ ব্যবধানে",
  "নতুন শিক্ষা আইন পাস হয়েছে সংসদে",
];

export const newsData: NewsItem[] = [
  {
    id: 1,
    title: "দেশের অর্থনীতিতে নতুন গতি: জিডিপি প্রবৃদ্ধি ৭.৫% ছাড়িয়েছে",
    excerpt: "সরকারের নতুন অর্থনৈতিক নীতিমালার ফলে দেশের অর্থনীতি নতুন গতি পেয়েছে। এবারের অর্থবছরে জিডিপি প্রবৃদ্ধি ৭.৫% ছাড়িয়ে গেছে।",
    content: `দেশের অর্থনীতি এখন নতুন এক অধ্যায়ে প্রবেশ করেছে। সরকারের সাম্প্রতিক অর্থনৈতিক নীতিমালার সফল বাস্তবায়নের ফলে এবারের অর্থবছরে জিডিপি প্রবৃদ্ধি ৭.৫% এর বেশি হয়েছে।

অর্থ মন্ত্রণালয়ের সূত্র জানায়, রপ্তানি খাতে উল্লেখযোগ্য অগ্রগতি এবং দেশীয় শিল্পের বিকাশ এই প্রবৃদ্ধির মূল চালিকাশক্তি।

বিশেষজ্ঞদের মতে, এই ধারা অব্যাহত থাকলে আগামী বছরগুলোতে দেশের অর্থনীতি আরও শক্তিশালী হবে।`,
    category: "জাতীয়",
    categorySlug: "national",
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&q=80",
    author: "মোহাম্মদ আলী",
    date: "২৪ ডিসেম্বর, ২০২৪",
    readTime: "৫ মিনিট",
    isBreaking: true,
    isLead: true,
  },
  {
    id: 2,
    title: "বাংলাদেশ-ভারত দ্বিপাক্ষিক বাণিজ্য চুক্তি স্বাক্ষরিত",
    excerpt: "উভয় দেশের মধ্যে নতুন বাণিজ্য চুক্তি স্বাক্ষরিত হয়েছে যা দুই দেশের অর্থনৈতিক সম্পর্ককে আরও মজবুত করবে।",
    content: "বাংলাদেশ ও ভারতের মধ্যে একটি ঐতিহাসিক দ্বিপাক্ষিক বাণিজ্য চুক্তি স্বাক্ষরিত হয়েছে...",
    category: "আন্তর্জাতিক",
    categorySlug: "international",
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&q=80",
    author: "ফাতেমা খান",
    date: "২৩ ডিসেম্বর, ২০২৪",
    readTime: "৪ মিনিট",
  },
  {
    id: 3,
    title: "জাতীয় নির্বাচন কমিশন নতুন ভোটার তালিকা প্রকাশ করেছে",
    excerpt: "আগামী নির্বাচনের জন্য নতুন ভোটার তালিকা প্রকাশ করা হয়েছে। এবার ১ কোটি ২০ লাখ নতুন ভোটার যুক্ত হয়েছেন।",
    content: "জাতীয় নির্বাচন কমিশন আজ নতুন ভোটার তালিকা প্রকাশ করেছে...",
    category: "রাজনীতি",
    categorySlug: "politics",
    image: "https://images.unsplash.com/photo-1494172961521-33799ddd43a5?w=800&q=80",
    author: "রহিম উদ্দিন",
    date: "২৩ ডিসেম্বর, ২০২৪",
    readTime: "৩ মিনিট",
  },
  {
    id: 4,
    title: "বাংলাদেশ ক্রিকেট দল টি-টোয়েন্টি সিরিজে দুর্দান্ত জয় পেয়েছে",
    excerpt: "তামিম ইকবালের অসাধারণ ইনিংসের সুবাদে বাংলাদেশ টি-টোয়েন্টি সিরিজে ঐতিহাসিক জয় পেয়েছে।",
    content: "বাংলাদেশ ক্রিকেট দল আজ এক ঐতিহাসিক জয় অর্জন করেছে...",
    category: "খেলাধুলা",
    categorySlug: "sports",
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&q=80",
    author: "সাকিব হাসান",
    date: "২২ ডিসেম্বর, ২০২৪",
    readTime: "৪ মিনিট",
  },
  {
    id: 5,
    title: "ঢালিউড সিনেমা শিল্পে নতুন জোয়ার: ৫০টি নতুন চলচ্চিত্র মুক্তির অপেক্ষায়",
    excerpt: "বাংলাদেশের চলচ্চিত্র শিল্পে নতুন জোয়ার এসেছে। আগামী বছর ৫০টিরও বেশি নতুন সিনেমা মুক্তি পাবে।",
    content: "বাংলাদেশের চলচ্চিত্র শিল্প এখন নতুন যুগে প্রবেশ করেছে...",
    category: "বিনোদন",
    categorySlug: "entertainment",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&q=80",
    author: "নাজমা বেগম",
    date: "২২ ডিসেম্বর, ২০২৪",
    readTime: "৫ মিনিট",
  },
  {
    id: 6,
    title: "দেশে ৫জি নেটওয়ার্ক সেবা চালু হচ্ছে আগামী মাসে",
    excerpt: "বাংলাদেশে ৫জি নেটওয়ার্ক সেবা চালু হতে যাচ্ছে। প্রথম পর্যায়ে ঢাকা ও চট্টগ্রামে এই সেবা পাওয়া যাবে।",
    content: "বাংলাদেশে ৫জি প্রযুক্তির যুগ শুরু হতে যাচ্ছে...",
    category: "প্রযুক্তি",
    categorySlug: "technology",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
    author: "তানভীর আহমেদ",
    date: "২১ ডিসেম্বর, ২০২৪",
    readTime: "৬ মিনিট",
  },
  {
    id: 7,
    title: "রমজান মাসের প্রস্তুতি: ইসলামিক ফাউন্ডেশনের বিশেষ কর্মসূচি",
    excerpt: "আসন্ন রমজান মাসকে সামনে রেখে ইসলামিক ফাউন্ডেশন বিশেষ কর্মসূচি ঘোষণা করেছে।",
    content: "ইসলামিক ফাউন্ডেশন রমজান মাসের জন্য বিশেষ প্রস্তুতি নিচ্ছে...",
    category: "ইসলামিক",
    categorySlug: "islamic",
    image: "https://images.unsplash.com/photo-1564769625392-651b89c75a77?w=800&q=80",
    author: "হাফেজ আব্দুল্লাহ",
    date: "২১ ডিসেম্বর, ২০২৪",
    readTime: "৩ মিনিট",
  },
  {
    id: 8,
    title: "শিক্ষা ব্যবস্থায় ডিজিটাল রূপান্তর: বিশেষজ্ঞদের মতামত",
    excerpt: "দেশের শিক্ষা ব্যবস্থায় ডিজিটাল রূপান্তর নিয়ে বিশেষজ্ঞরা তাদের মতামত ব্যক্ত করেছেন।",
    content: "শিক্ষা ব্যবস্থায় প্রযুক্তির ব্যবহার নিয়ে চলছে ব্যাপক আলোচনা...",
    category: "মতামত",
    categorySlug: "opinion",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
    author: "ড. করিম সাহেব",
    date: "২০ ডিসেম্বর, ২০২৪",
    readTime: "৭ মিনিট",
  },
];

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
