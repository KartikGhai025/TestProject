// src/modules/news/models/news.model.ts

import type { Models } from "appwrite";

// This interface represents the data you provide when CREATING a news item.
export interface NewsData {
  title: string;
  content: string;
  author: string;
  authorId: string;
  description?: string;
  category?: string;
  summary?: string;
  publicationDate?: string;
}

// This interface represents the full news document you GET from Appwrite.
export interface News extends Models.Document, NewsData {}