// import { create } from "zustand";
// import { News, CreateNews } from "../types/news.types";
// import { NewsService } from "../services/news.service";

// interface NewsState {
//   news: News[];
//   loading: boolean;
//   fetchNews: () => Promise<void>;
//   addNews: (news: CreateNews) => Promise<void>; // <-- accept CreateNews directly
// }

// export const useNewsStore = create<NewsState>((set) => ({
//   news: [],
//   loading: false,
//   fetchNews: async () => {
//     set({ loading: true });
//     const data = await NewsService.getAll();
//     set({ news: data, loading: false });
//   },
//   addNews: async (news) => {
  
//     set({ loading: true });
//     const created = await NewsService.create(news); // CreateNews is allowed
//     set((state) => ({ news: [...state.news, created], loading: false }));
//   },
// }));


// src/modules/news/store/news.store.ts
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
  persist(
    (set, get) => ({
      news: [],
      loading: false,

      // Fetch all news only when not already loaded
      fetchNews: async () => {
        if (get().news.length > 0) return; // Prevent re-fetching if already in store

        set({ loading: true });
        try {
          const data = await NewsService.getAll();
          set({ news: data });
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
            news: [...state.news, created],
          }));
        } catch (error) {
          console.error("Failed to add news:", error);
        } finally {
          set({ loading: false });
        }
      },
    }),
    {
      name: "news-storage", // key for localStorage
    }
  )
);
