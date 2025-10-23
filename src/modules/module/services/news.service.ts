// src/modules/news/services/news.service.ts

import { tablesDB } from "@/lib/appwrite";
import { News, NewsData } from "../models/news.model";
import { DATABASE_ID, NEWS_TABLE_ID } from "@/lib/appwrite";

export class NewsService {
  /**
   * Fetches a single news document by its ID.
   */
  static async getById(id: string): Promise<News> {
    const response = await tablesDB.getRow({
      databaseId: DATABASE_ID,
      tableId: NEWS_TABLE_ID,
      rowId: id,
    });
    // Cast to 'unknown' then to 'News' to apply our specific type.
    return response as unknown as News;
  }

  /**
   * Fetches all news documents.
   */
  static async getAll(): Promise<News[]> {
    const response = await tablesDB.listRows({
      databaseId: DATABASE_ID,
      tableId: NEWS_TABLE_ID,
      // You can add queries here, e.g., to sort or filter
      // queries: [Query.orderDesc('$createdAt')]
    });
    // Cast the generic array to our specific News array type.
    return response.rows as unknown as News[];
  }

  /**
   * Creates a new news document.
   */
  static async create(newsData: NewsData): Promise<News> {
    const response = await tablesDB.createRow({
      databaseId: DATABASE_ID,
      tableId: NEWS_TABLE_ID,
      rowId: "unique()", // Appwrite will generate a unique ID
      data: newsData,   // The data must match the NewsData interface
    });
    return response as unknown as News;
  }

  /**
   * Updates an existing news document.
   */
  static async update(id: string, newsData: Partial<NewsData>): Promise<News> {
    const response = await tablesDB.updateRow({
      databaseId: DATABASE_ID,
      tableId: NEWS_TABLE_ID,
      rowId: id,
      data: newsData, // `Partial` allows updating only some fields
    });
    return response as unknown as News;
  }

  /**
   * Deletes a news document by its ID.
   */
  static async delete(id: string): Promise<void> {
    await tablesDB.deleteRow({
      databaseId: DATABASE_ID,
      tableId: NEWS_TABLE_ID,
      rowId: id,
    });
  }
}