import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface DBNewsItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image_url: string;
  category: string;
  author: string;
  is_breaking: boolean;
  is_lead: boolean;
  created_at: string;
  updated_at: string;
}

export const useNews = () => {
  const [news, setNews] = useState<DBNewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("news")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setError(error.message);
    } else {
      setNews(data || []);
    }
    setLoading(false);
  };

  const addNews = async (newsItem: Omit<DBNewsItem, "id" | "created_at" | "updated_at">) => {
    const { data, error } = await supabase
      .from("news")
      .insert([newsItem])
      .select()
      .single();

    if (error) throw error;
    setNews((prev) => [data, ...prev]);
    return data;
  };

  const updateNews = async (id: string, newsItem: Partial<DBNewsItem>) => {
    const { data, error } = await supabase
      .from("news")
      .update(newsItem)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    setNews((prev) => prev.map((n) => (n.id === id ? data : n)));
    return data;
  };

  const deleteNews = async (id: string) => {
    const { error } = await supabase.from("news").delete().eq("id", id);

    if (error) throw error;
    setNews((prev) => prev.filter((n) => n.id !== id));
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return { news, loading, error, addNews, updateNews, deleteNews, refetch: fetchNews };
};
