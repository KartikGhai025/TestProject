

import type { Models } from "appwrite";

export type PropertyType =
  | "house"
  | "flat"
  | "land"
  | "shop"
  | "office"
  | "villa"
  | "plot"
  | "warehouse";

export type ListingPurpose = "sale" | "rent";

export interface PropertyData {
  id: string;
  title: string;

  type: PropertyType;        // house, flat, land, shop, etc.
  purpose: ListingPurpose;   // sale or rent

  areaLabel: string;         // "1200 sq ft", "1000 sq yd", "2 acre"
  areaSqFt?: number;         // numeric for filtering (optional)

  furnished?: boolean;
  facing?: string;

  location: string;          // city/area, e.g. "MG Road, Indore"
  address?: string;

  price: number;             // numeric price for filters/sorting
  priceLabel: string;        // "₹25,000 / month", "₹50 Lakh"

  rooms?: string;            // "2 BHK", "3 BHK", "1 RK"
  bathrooms?: number;
  floor?: string;            // "Ground", "1st", "G+2"

  description?: string;
  amenities?: string[];
  nearbyPlaces?: string[];

  images: string[];
  contact: string;           // phone / WhatsApp link
  ownerName?: string;

  parking?: boolean;

  show: boolean;             // only show if true
  creatorId: string;
  createdAt?: string;
}


export interface Property extends Models.Document, PropertyData {}