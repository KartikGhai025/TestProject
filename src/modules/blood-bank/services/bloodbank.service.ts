// src/modules/bloodbank/services/bloodbank.service.ts

import { tablesDB } from "@/lib/appwrite";
import { BloodBank, BloodBankData } from "../models/bloodbank.model";
import { DATABASE_ID, BLOODBANK_TABLE_ID } from "@/lib/appwrite";

export class BloodBankService {
  /**
   * Fetch a single bloodbank record by ID
   */
  static async getById(id: string): Promise<BloodBank> {
    const response = await tablesDB.getRow({
      databaseId: DATABASE_ID,
      tableId: BLOODBANK_TABLE_ID,
      rowId: id,
    });

    return response as unknown as BloodBank;
  }

  /**
   * Fetch all bloodbank records
   */
  static async getAll(): Promise<BloodBank[]> {
    const response = await tablesDB.listRows({
      databaseId: DATABASE_ID,
      tableId: BLOODBANK_TABLE_ID,
      // queries: [Query.orderDesc("$createdAt")],
    });

    return response.rows as unknown as BloodBank[];
  }

  /**
   * Create a new bloodbank record
   */
  static async create(data: BloodBankData): Promise<BloodBank> {
    const response = await tablesDB.createRow({
      databaseId: DATABASE_ID,
      tableId: BLOODBANK_TABLE_ID,
      rowId: "unique()", // auto-generate ID
      data,
    });

    return response as unknown as BloodBank;
  }

  /**
   * Update bloodbank record by ID
   */
  static async update(id: string, data: Partial<BloodBankData>): Promise<BloodBank> {
    const response = await tablesDB.updateRow({
      databaseId: DATABASE_ID,
      tableId: BLOODBANK_TABLE_ID,
      rowId: id,
      data,
    });

    return response as unknown as BloodBank;
  }

  /**
   * Delete record
   */
  static async delete(id: string): Promise<void> {
    await tablesDB.deleteRow({
      databaseId: DATABASE_ID,
      tableId: BLOODBANK_TABLE_ID,
      rowId: id,
    });
  }
}
