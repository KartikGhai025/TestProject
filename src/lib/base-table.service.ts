import { tablesDB } from "@/lib/appwrite";

interface BaseTableConfig {
  databaseId: string;
  tableId: string;
}

export class BaseTableService<TData, TDoc> {
  protected databaseId: string;
  protected tableId: string;

  constructor(config: BaseTableConfig) {
    this.databaseId = config.databaseId;
    this.tableId = config.tableId;
  }

  async getById(id: string): Promise<TDoc> {
    const response = await tablesDB.getRow({
      databaseId: this.databaseId,
      tableId: this.tableId,
      rowId: id,
    });

    return response as unknown as TDoc;
  }

  async getAll(): Promise<TDoc[]> {
    const response = await tablesDB.listRows({
      databaseId: this.databaseId,
      tableId: this.tableId,
    });

    return response.rows as unknown as TDoc[];
  }

  async create(data: TData): Promise<TDoc> {
    const response = await tablesDB.createRow({
      databaseId: this.databaseId,
      tableId: this.tableId,
      rowId: "unique()",
      // 👇 Cast so it matches `Partial<Row> & Record<string, any>`
      data: data as any,
    });

    return response as unknown as TDoc;
  }

  async update(id: string, data: Partial<TData>): Promise<TDoc> {
    const response = await tablesDB.updateRow({
      databaseId: this.databaseId,
      tableId: this.tableId,
      rowId: id,
      // 👇 same cast here
      data: data as any,
    });

    return response as unknown as TDoc;
  }

  async delete(id: string): Promise<void> {
    await tablesDB.deleteRow({
      databaseId: this.databaseId,
      tableId: this.tableId,
      rowId: id,
    });
  }
}
