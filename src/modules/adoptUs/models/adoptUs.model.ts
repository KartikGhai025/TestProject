import type { Models } from "appwrite";


export interface AdoptUsData {
  name: string;
  breed: string;
  description: string;
  show:boolean;
  contact: string;
  images: string[];
}

export interface AdoptUs extends Models.Document, AdoptUsData {}