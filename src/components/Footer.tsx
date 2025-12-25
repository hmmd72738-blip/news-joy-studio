import { Facebook, Twitter, Youtube, Instagram, Mail, Phone, MapPin, ArrowUp } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="premium-footer text-news-header-foreground mt-16 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-40 h-40 rounded-full bg-gold blur-3xl" />
        <div className="absolute bottom-20 right-20 w-60 h-60 rounded-full bg-accent blur-3xl" />
      </div>
      
      <div className="container relative py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gold to-accent flex items-center justify-center shadow-lg">
                <span className="text-primary-foreground font-display text-3xl font-bold">
                  দ
                </span>
              </div>
              <div>
                <h3 className="text-xl font-display font-bold text-news-header-foreground">
                  দৈনিক প্রতিদিন
                </h3>
                <p className="text-[10px] text-news-header-foreground/50 uppercase tracking-widest">
                  Since 2024
                </p>
              </div>
            </div>
            <p className="text-news-header-foreground/70 text-sm leading-relaxed mb-6">
              সত্য ও নিরপেক্ষ সংবাদ পরিবেশনে প্রতিশ্রুতিবদ্ধ। আমরা বিশ্বাস করি সংবাদ হওয়া উচিত মানুষের জন্য, মানুষের কথা।
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/share/1CuDUqeDs3/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-glow"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="social-icon-glow" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="social-icon-glow" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="social-icon-glow" aria-label="YouTube">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-display font-bold mb-6 text-news-header-foreground flex items-center gap-2">
              <span className="w-8 h-0.5 bg-gradient-to-r from-gold to-accent rounded-full" />
              দ্রুত লিংক
            </h4>
            <ul className="space-y-3">
              {["আমাদের সম্পর্কে", "বিজ্ঞাপন", "গোপনীয়তা নীতি", "শর্তাবলী", "সংবাদদাতা হোন"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-news-header-foreground/70 hover:text-gold transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-gold transition-all duration-300" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-display font-bold mb-6 text-news-header-foreground flex items-center gap-2">
              <span className="w-8 h-0.5 bg-gradient-to-r from-gold to-accent rounded-full" />
              বিভাগসমূহ
            </h4>
            <ul className="space-y-3">
              {["জাতীয়", "আন্তর্জাতিক", "রাজনীতি", "খেলাধুলা", "বিনোদন", "প্রযুক্তি"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-news-header-foreground/70 hover:text-gold transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-gold transition-all duration-300" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-display font-bold mb-6 text-news-header-foreground flex items-center gap-2">
              <span className="w-8 h-0.5 bg-gradient-to-r from-gold to-accent rounded-full" />
              যোগাযোগ
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-news-header-foreground/70">
                <div className="p-2 rounded-lg bg-white/5 mt-0.5">
                  <MapPin className="w-4 h-4 text-gold" />
                </div>
                <span className="text-sm">ঢাকা, বাংলাদেশ</span>
              </li>
              <li className="flex items-center gap-3 text-news-header-foreground/70">
                <div className="p-2 rounded-lg bg-white/5">
                  <Phone className="w-4 h-4 text-gold" />
                </div>
                <a href="tel:01302108957" className="hover:text-gold transition-colors text-sm">
                  ০১৩০২১০৮৯৫৭
                </a>
              </li>
              <li className="flex items-center gap-3 text-news-header-foreground/70">
                <div className="p-2 rounded-lg bg-white/5">
                  <Mail className="w-4 h-4 text-gold" />
                </div>
                <a href="mailto:info@protidin.com" className="hover:text-gold transition-colors text-sm">
                  info@protidin.com
                </a>
              </li>
            </ul>
            
            {/* Newsletter */}
            <div className="mt-6">
              <p className="text-sm text-news-header-foreground/70 mb-3">নিউজলেটার সাবস্ক্রাইব করুন</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="ইমেইল লিখুন"
                  className="flex-1 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-news-header-foreground placeholder:text-news-header-foreground/40 focus:outline-none focus:border-gold/50"
                />
                <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-gold to-accent text-primary font-bold text-sm hover:shadow-lg hover:shadow-gold/20 transition-all">
                  সাবস্ক্রাইব
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-news-header-foreground/50">
              © ২০২৪ দৈনিক প্রতিদিন। সর্বস্বত্ব সংরক্ষিত।
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-xs text-news-header-foreground/50 hover:text-gold transition-colors">
                গোপনীয়তা নীতি
              </a>
              <a href="#" className="text-xs text-news-header-foreground/50 hover:text-gold transition-colors">
                ব্যবহারের শর্তাবলী
              </a>
              <button
                onClick={scrollToTop}
                className="p-2 rounded-full bg-white/5 hover:bg-gold text-news-header-foreground/70 hover:text-primary transition-all duration-300"
                aria-label="উপরে যান"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
