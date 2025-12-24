import { Facebook, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-news-header text-news-header-foreground mt-12">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-xl">দ</span>
              </div>
              <h3 className="text-xl font-bold">দৈনিক প্রতিদিন</h3>
            </div>
            <p className="text-news-header-foreground/70 text-sm leading-relaxed">
              সত্য ও নিরপেক্ষ সংবাদ পরিবেশনে প্রতিশ্রুতিবদ্ধ। আমরা বিশ্বাস করি সংবাদ হওয়া উচিত মানুষের জন্য, মানুষের কথা।
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">দ্রুত লিংক</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-news-header-foreground/70 hover:text-accent transition-colors">আমাদের সম্পর্কে</a></li>
              <li><a href="#" className="text-news-header-foreground/70 hover:text-accent transition-colors">বিজ্ঞাপন</a></li>
              <li><a href="#" className="text-news-header-foreground/70 hover:text-accent transition-colors">গোপনীয়তা নীতি</a></li>
              <li><a href="#" className="text-news-header-foreground/70 hover:text-accent transition-colors">যোগাযোগ</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-4">যোগাযোগ</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-news-header-foreground/70">
                <MapPin className="w-4 h-4 text-accent" />
                <span>ঢাকা, বাংলাদেশ</span>
              </li>
              <li className="flex items-center gap-2 text-news-header-foreground/70">
                <Phone className="w-4 h-4 text-accent" />
                <a href="tel:01302108957" className="hover:text-accent transition-colors">০১৩০২১০৮৯৫৭</a>
              </li>
              <li className="flex items-center gap-2 text-news-header-foreground/70">
                <Mail className="w-4 h-4 text-accent" />
                <span>info@protidin.com</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-lg font-bold mb-4">সামাজিক মাধ্যম</h4>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/share/1CuDUqeDs3/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-news-header-foreground/10 hover:bg-accent hover:text-accent-foreground transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-3 rounded-full bg-news-header-foreground/10 hover:bg-accent hover:text-accent-foreground transition-all"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-3 rounded-full bg-news-header-foreground/10 hover:bg-accent hover:text-accent-foreground transition-all"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-news-header-foreground/10 mt-8 pt-8 text-center text-sm text-news-header-foreground/50">
          <p>© ২০২৪ দৈনিক প্রতিদিন। সর্বস্বত্ব সংরক্ষিত।</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
