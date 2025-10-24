// // src/modules/news/types/news.types.ts
// import type { Models } from "appwrite";

// // Full document type returned by Appwrite
// export interface News extends Models.Document {
//   title: string;
//   description: string;
//   category: string;
//   content: string;
//   summary: string;
//   authorId: string;
//   publicationDate: string;
// }

// // Only fields needed to create a document
// export type CreateNews = Pick<News, "title" | "description" | "authorId" | "publicationDate"> & {
//   category?: string;
//   content?: string;
//   summary?: string;
// };
