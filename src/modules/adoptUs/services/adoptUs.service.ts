import { DATABASE_ID, ADOPT_US_TABLE_ID } from "@/lib/appwrite";
import type { AdoptUs, AdoptUsData } from "../models/adoptUs.model";
import { BaseTableService } from "@/lib/base-table.service";

export class AdoptUsService extends BaseTableService<AdoptUsData, AdoptUs> {
  constructor() {
    super({
      databaseId: DATABASE_ID,
      tableId: ADOPT_US_TABLE_ID,
    });
  }

  async getVisiblePets(): Promise<AdoptUs[]> {
    const all = await this.getAll();
    return all.filter((pet) => pet.show);
  }
}

export const adoptUsService = new AdoptUsService();
