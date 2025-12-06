import type { Models } from "appwrite";


export interface BloodBankData {
  fullName: string;
  contact: string;
  isContact: boolean;
  userId?: string;
  age: number;
  gender: string;
  bloodType: string;
}

export interface BloodBank extends Models.Document, BloodBankData {}