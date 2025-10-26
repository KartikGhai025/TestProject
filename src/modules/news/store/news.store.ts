"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { News, NewsData } from "../models/news.model";
import { NewsService } from "../services/news.service";

interface NewsState {
  news: News[];
  loading: boolean;
  fetchNews: () => Promise<void>;
  addNews: (news: NewsData) => Promise<void>;
}

export const useNewsStore = create<NewsState>()(

    (set, get) => ({
      news: [],
      loading: false,

      // Fetch all news only when not already loaded
      fetchNews: async () => {
        if (get().news.length > 0) return;

        set({ loading: true });
        try {
          const data = await NewsService.getAll();
          set({ news: data.sort((a, b) => (b.$createdAt > a.$createdAt ? 1 : -1)) });
        } catch (error) {
          console.error("Failed to fetch news:", error);
        } finally {
          set({ loading: false });
        }
      },

      // Add news
      addNews: async (newsData: NewsData) => {
        set({ loading: true });
        try {
          const created = await NewsService.create(newsData);
          set((state) => ({
            news: [created, ...state.news], // prepend newest
          }));
        } catch (error) {
          console.error("Failed to add news:", error);
        } finally {
          set({ loading: false });
        }
      },
    }
  )
);
