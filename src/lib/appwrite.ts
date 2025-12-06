"use client"; // since we are using it in client-side components

import { Client, TablesDB } from "appwrite";

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

export const tablesDB = new TablesDB(client);
export const ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
export const PROJECTID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
export const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;

// Bucket IDs
export const MAIN_BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_MAIN_BUCKET_ID!;

// Table IDs
export const ADOPT_US_TABLE_ID = process.env.NEXT_PUBLIC_APPWRITE_ADOPT_US_TABLE_ID!;
export const NEWS_TABLE_ID = process.env.NEXT_PUBLIC_APPWRITE_NEWS_TABLE_ID!;
export const BLOODBANK_TABLE_ID = process.env.NEXT_PUBLIC_APPWRITE_BLOODBANK_TABLE_ID!;
export const ADOPTUS_TABLE_ID = process.env.NEXT_PUBLIC_APPWRITE_ADOPTUS_TABLE_ID!;


