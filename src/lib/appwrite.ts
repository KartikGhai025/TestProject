"use client"; // since we are using it in client-side components

import { Client, TablesDB } from "appwrite";

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

export const tablesDB = new TablesDB(client);

export const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
export const NEWS_TABLE_ID = process.env.NEXT_PUBLIC_APPWRITE_NEWS_TABLE_ID!;
