// src/modules/news/models/news.model.ts

import type { Models } from "appwrite";

// Data for creating a news item
export interface NewsData {
  title: string;                  // required
  description: string;            // required
   authorName: string;            // required
  tags?: string[];                // optional, max 20
  images?: string[];              // optional, max 150
  category: string;               // required
  isFeatured?: boolean;           // optional, default false
  viewsCount?: number;            // optional
  source: string;                 // required
}

// Full news document from Appwrite
export interface News extends Models.Document, NewsData {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
}
