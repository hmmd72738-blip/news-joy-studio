import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useNews, DBNewsItem } from "@/hooks/useNews";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import {
  Plus,
  Edit,
  Trash2,
  LogOut,
  Home,
  Newspaper,
  AlertCircle,
} from "lucide-react";
import { categories } from "@/data/newsData";

const Admin = () => {
  const { user, isAdmin, loading: authLoading, signOut } = useAuth();
  const { news, loading: newsLoading, addNews, updateNews, deleteNews } = useNews();
  const navigate = useNavigate();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<DBNewsItem | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    image_url: "",
    category: "",
    author: "সম্পাদকীয় বিভাগ",
    is_breaking: false,
    is_lead: false,
  });

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (editingNews) {
      setFormData({
        title: editingNews.title,
        excerpt: editingNews.excerpt,
        content: editingNews.content,
        image_url: editingNews.image_url,
        category: editingNews.category,
        author: editingNews.author,
        is_breaking: editingNews.is_breaking,
        is_lead: editingNews.is_lead,
      });
    } else {
      setFormData({
        title: "",
        excerpt: "",
        content: "",
        image_url: "",
        category: "",
        author: "সম্পাদকীয় বিভাগ",
        is_breaking: false,
        is_lead: false,
      });
    }
  }, [editingNews]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.excerpt || !formData.content || !formData.category) {
      toast.error("সকল প্রয়োজনীয় ফিল্ড পূরণ করুন");
      return;
    }

    try {
      if (editingNews) {
        await updateNews(editingNews.id, formData);
        toast.success("সংবাদ সফলভাবে আপডেট হয়েছে");
      } else {
        await addNews(formData);
        toast.success("নতুন সংবাদ সফলভাবে যোগ হয়েছে");
      }
      setIsDialogOpen(false);
      setEditingNews(null);
    } catch (error: any) {
      toast.error(error.message || "একটি ত্রুটি ঘটেছে");
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      await deleteNews(deleteId);
      toast.success("সংবাদ সফলভাবে মুছে ফেলা হয়েছে");
      setDeleteId(null);
    } catch (error: any) {
      toast.error(error.message || "মুছে ফেলতে ব্যর্থ হয়েছে");
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4" />
          <p className="text-muted-foreground">লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">অ্যাক্সেস নিষিদ্ধ</h1>
          <p className="text-muted-foreground mb-6">
            আপনার অ্যাডমিন প্যানেলে প্রবেশের অনুমতি নেই। শুধুমাত্র অ্যাডমিন ব্যবহারকারীরা এখানে প্রবেশ করতে পারবেন।
          </p>
          <div className="flex gap-4 justify-center">
            <Button variant="outline" onClick={() => navigate("/")}>
              <Home className="w-4 h-4 mr-2" />
              হোমে যান
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              লগআউট
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-4 px-6 shadow-lg">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Newspaper className="w-8 h-8" />
            <div>
              <h1 className="text-xl font-bold">অ্যাডমিন প্যানেল</h1>
              <p className="text-sm opacity-80">দৈনিক প্রতিদিন</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="secondary" size="sm" onClick={() => navigate("/")}>
              <Home className="w-4 h-4 mr-2" />
              হোমপেজ
            </Button>
            <Button variant="destructive" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              লগআউট
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8">
        {/* Add News Button */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">সংবাদ ব্যবস্থাপনা</h2>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingNews(null)}>
                <Plus className="w-4 h-4 mr-2" />
                নতুন সংবাদ যোগ করুন
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingNews ? "সংবাদ সম্পাদনা" : "নতুন সংবাদ যোগ করুন"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="title">শিরোনাম *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="সংবাদের শিরোনাম লিখুন"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="excerpt">সংক্ষিপ্ত বিবরণ *</Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    placeholder="সংবাদের সংক্ষিপ্ত বিবরণ লিখুন"
                    rows={2}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">পূর্ণ বিবরণ *</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="সংবাদের পূর্ণ বিবরণ লিখুন"
                    rows={6}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">ক্যাটাগরি *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="ক্যাটাগরি নির্বাচন করুন" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories
                          .filter((c) => c.slug !== "home")
                          .map((category) => (
                            <SelectItem key={category.slug} value={category.name}>
                              {category.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="author">লেখক</Label>
                    <Input
                      id="author"
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      placeholder="লেখকের নাম"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image_url">ছবির URL</Label>
                  <Input
                    id="image_url"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div className="flex gap-6">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="is_breaking"
                      checked={formData.is_breaking}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, is_breaking: checked })
                      }
                    />
                    <Label htmlFor="is_breaking">ব্রেকিং নিউজ</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="is_lead"
                      checked={formData.is_lead}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, is_lead: checked })
                      }
                    />
                    <Label htmlFor="is_lead">লিড নিউজ</Label>
                  </div>
                </div>

                <div className="flex justify-end gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    বাতিল
                  </Button>
                  <Button type="submit">
                    {editingNews ? "আপডেট করুন" : "যোগ করুন"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* News List */}
        {newsLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4" />
            <p className="text-muted-foreground">সংবাদ লোড হচ্ছে...</p>
          </div>
        ) : news.length === 0 ? (
          <div className="text-center py-12 bg-card border border-border rounded-lg">
            <Newspaper className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">কোনো সংবাদ নেই</p>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              প্রথম সংবাদ যোগ করুন
            </Button>
          </div>
        ) : (
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-4 font-medium">শিরোনাম</th>
                    <th className="text-left p-4 font-medium">ক্যাটাগরি</th>
                    <th className="text-left p-4 font-medium">লেখক</th>
                    <th className="text-left p-4 font-medium">স্ট্যাটাস</th>
                    <th className="text-right p-4 font-medium">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {news.map((item) => (
                    <tr key={item.id} className="hover:bg-muted/50 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          {item.image_url && (
                            <img
                              src={item.image_url}
                              alt=""
                              className="w-12 h-12 object-cover rounded"
                            />
                          )}
                          <span className="line-clamp-2 max-w-xs">{item.title}</span>
                        </div>
                      </td>
                      <td className="p-4">{item.category}</td>
                      <td className="p-4">{item.author}</td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          {item.is_breaking && (
                            <span className="px-2 py-1 text-xs bg-destructive/10 text-destructive rounded">
                              ব্রেকিং
                            </span>
                          )}
                          {item.is_lead && (
                            <span className="px-2 py-1 text-xs bg-accent/10 text-accent rounded">
                              লিড
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setEditingNews(item);
                              setIsDialogOpen(true);
                            }}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive"
                            onClick={() => setDeleteId(item.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>আপনি কি নিশ্চিত?</AlertDialogTitle>
            <AlertDialogDescription>
              এই সংবাদটি স্থায়ীভাবে মুছে ফেলা হবে। এই কাজটি পূর্বাবস্থায় ফেরানো যাবে না।
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>বাতিল</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              মুছে ফেলুন
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Admin;
