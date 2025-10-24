// src/modules/news/services/news.service.ts

import { tablesDB } from "@/lib/appwrite";
import { News, NewsData } from "../models/news.model";
import { DATABASE_ID, NEWS_TABLE_ID } from "@/lib/appwrite";

export class NewsService {
  static async getById(id: string): Promise<News> {
    const response = await tablesDB.getRow({
      databaseId: DATABASE_ID,
      tableId: NEWS_TABLE_ID,
      rowId: id,
    });
    return response as unknown as News;
  }

  static async getAll(): Promise<News[]> {
    const response = await tablesDB.listRows({
      databaseId: DATABASE_ID,
      tableId: NEWS_TABLE_ID,
    });
    return response.rows as unknown as News[];
  }

  static async create(newsData: NewsData): Promise<News> {
    const dataWithDefaults = {
      isFeatured: false,
      viewsCount: 0,
      ...newsData,
    };
    const response = await tablesDB.createRow({
      databaseId: DATABASE_ID,
      tableId: NEWS_TABLE_ID,
      rowId: "unique()",
      data: dataWithDefaults,
    });
    return response as unknown as News;
  }

  static async update(id: string, newsData: Partial<NewsData>): Promise<News> {
    const response = await tablesDB.updateRow({
      databaseId: DATABASE_ID,
      tableId: NEWS_TABLE_ID,
      rowId: id,
      data: newsData,
    });
    return response as unknown as News;
  }

  static async delete(id: string): Promise<void> {
    await tablesDB.deleteRow({
      databaseId: DATABASE_ID,
      tableId: NEWS_TABLE_ID,
      rowId: id,
    });
  }
}
