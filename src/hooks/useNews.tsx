import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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

const fetchNews = async (): Promise<DBNewsItem[]> => {
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
};

const fetchNewsById = async (id: string): Promise<DBNewsItem | null> => {
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
};

export const useNews = () => {
  const queryClient = useQueryClient();

  const { data: news = [], isLoading: loading, error } = useQuery({
    queryKey: ["news"],
    queryFn: fetchNews,
    staleTime: 1000 * 60 * 5, // 5 minutes cache
    gcTime: 1000 * 60 * 30, // 30 minutes garbage collection
  });

  const addNewsMutation = useMutation({
    mutationFn: async (newsItem: Omit<DBNewsItem, "id" | "created_at" | "updated_at">) => {
      const { data, error } = await supabase
        .from("news")
        .insert([newsItem])
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
    },
  });

  const updateNewsMutation = useMutation({
    mutationFn: async ({ id, newsItem }: { id: string; newsItem: Partial<DBNewsItem> }) => {
      const { data, error } = await supabase
        .from("news")
        .update(newsItem)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
    },
  });

  const deleteNewsMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("news").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
    },
  });

  const addNews = async (newsItem: Omit<DBNewsItem, "id" | "created_at" | "updated_at">) => {
    return addNewsMutation.mutateAsync(newsItem);
  };

  const updateNews = async (id: string, newsItem: Partial<DBNewsItem>) => {
    return updateNewsMutation.mutateAsync({ id, newsItem });
  };

  const deleteNews = async (id: string) => {
    return deleteNewsMutation.mutateAsync(id);
  };

  const refetch = () => {
    queryClient.invalidateQueries({ queryKey: ["news"] });
  };

  return { 
    news, 
    loading, 
    error: error?.message || null, 
    addNews, 
    updateNews, 
    deleteNews, 
    refetch 
  };
};

export const useNewsById = (id: string | undefined) => {
  return useQuery({
    queryKey: ["news", id],
    queryFn: () => fetchNewsById(id!),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};

export const usePrefetchNews = () => {
  const queryClient = useQueryClient();
  
  const prefetch = () => {
    queryClient.prefetchQuery({
      queryKey: ["news"],
      queryFn: fetchNews,
      staleTime: 1000 * 60 * 5,
    });
  };

  return prefetch;
};
