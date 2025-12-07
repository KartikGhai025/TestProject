"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type {
  PropertyData,
  PropertyType,
  ListingPurpose,
} from "@/modules/property/models/property.model";
import { PROPERTIES } from "../properties/mock-data";

const PROPERTY_TYPES: (PropertyType | "all")[] = [
  "all",
  "house",
  "flat",
  "land",
  "shop",
  "office",
  "villa",
  "warehouse",
];

const PURPOSE_TABS: { label: string; value: ListingPurpose | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Buy", value: "sale" },
  { label: "Rent", value: "rent" },
];

export default function PropertyListPage() {
  const [search, setSearch] = useState<string>("");
  const [selectedType, setSelectedType] =
    useState<PropertyType | "all">("all");
  const [selectedPurpose, setSelectedPurpose] =
    useState<ListingPurpose | "all">("all");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");

  const filtered = useMemo<PropertyData[]>(() => {
    return PROPERTIES.filter((p: PropertyData) => {
      if (!p.show) return false;

      const matchesSearch =
        search.trim().length === 0 ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.location.toLowerCase().includes(search.toLowerCase());

      const matchesType =
        selectedType === "all" ? true : p.type === selectedType;

      const matchesPurpose =
        selectedPurpose === "all" ? true : p.purpose === selectedPurpose;

      const min = minPrice ? Number(minPrice) : undefined;
      const max = maxPrice ? Number(maxPrice) : undefined;

      const matchesPrice =
        (min === undefined || p.price >= min) &&
        (max === undefined || p.price <= max);

      return matchesSearch && matchesType && matchesPurpose && matchesPrice;
    });
  }, [search, selectedType, selectedPurpose, minPrice, maxPrice]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900 flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-violet-100 text-violet-700 text-lg">
              🏠
            </span>
            <span>Property Portal</span>
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Quickly browse houses, flats, plots and shops for sale or rent.
          </p>
        </div>
        <p className="text-xs text-slate-500">
          Showing{" "}
          <span className="font-semibold text-slate-900">
            {filtered.length}
          </span>{" "}
          of {PROPERTIES.length} properties
        </p>
      </header>

      {/* Filters */}
      <section className="rounded-3xl border bg-white shadow-sm p-4 space-y-4">
        {/* Row 1: search + purpose tabs */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex-1">
            <label className="block text-[11px] font-semibold uppercase tracking-wide text-slate-500 mb-1">
              Search
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search by title or location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none ring-0 transition focus:border-violet-300 focus:bg-white focus:ring-2 focus:ring-violet-100"
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                ⌕
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              Purpose
            </span>
            <div className="inline-flex rounded-full bg-slate-100 p-1">
              {PURPOSE_TABS.map((tab) => (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() =>
                    setSelectedPurpose(tab.value as ListingPurpose | "all")
                  }
                  className={`px-3 py-1.5 text-xs rounded-full font-medium transition ${
                    selectedPurpose === tab.value
                      ? "bg-white shadow text-violet-700"
                      : "text-slate-600 hover:bg-white/60"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Row 2: type chips + price range */}
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex-1">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 mb-1">
              Property Type
            </p>
            <div className="flex flex-wrap gap-2">
              {PROPERTY_TYPES.map((t) => {
                const isActive = selectedType === t;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() =>
                      setSelectedType(t as PropertyType | "all")
                    }
                    className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                      isActive
                        ? "bg-violet-50 border-violet-300 text-violet-700 shadow-sm"
                        : "bg-slate-50 border-slate-200 text-slate-700 hover:border-violet-200 hover:bg-violet-50"
                    }`}
                  >
                    {t === "all"
                      ? "All"
                      : t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-2 lg:w-72">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              Budget (₹)
            </p>
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs outline-none focus:border-violet-300 focus:bg-white focus:ring-2 focus:ring-violet-100"
              />
              <span className="text-xs text-slate-400">to</span>
              <input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs outline-none focus:border-violet-300 focus:bg-white focus:ring-2 focus:ring-violet-100"
              />
            </div>
          </div>
        </div>
      </section>

      {/* List or empty */}
      {filtered.length === 0 ? (
        <div className="rounded-3xl border border-dashed bg-slate-50 px-6 py-10 text-center text-sm text-slate-500">
          <p className="font-semibold text-slate-700 mb-1">
            No properties found
          </p>
          <p>Try changing filters or clearing the search.</p>
        </div>
      ) : (
        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((p: PropertyData) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </section>
      )}
    </div>
  );
}

function PropertyCard({ property }: { property: PropertyData }) {
  const {
    id,
    title,
    location,
    type,
    purpose,
    priceLabel,
    areaLabel,
    rooms,
    images,
  } = property;

  const imageUrl: string =
    images[0] ??
    "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg";

  return (
    <Link
      href={`/properties/${id}`}
      className="group rounded-3xl border border-slate-100 bg-white overflow-hidden shadow-sm hover:shadow-md transition hover:-translate-y-1 flex flex-col"
    >
      <div className="relative h-44 w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 left-2 flex gap-2">
          <span className="rounded-full bg-white/90 px-2 py-1 text-[10px] font-semibold text-slate-700">
            {type.toUpperCase()}
          </span>
          <span className="rounded-full bg-violet-600/90 px-2 py-1 text-[10px] font-semibold text-white">
            {purpose === "sale" ? "For Sale" : "For Rent"}
          </span>
        </div>
        <div className="absolute bottom-2 left-2 rounded-full bg-black/60 px-3 py-1 text-xs text-white">
          {areaLabel}
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col gap-2">
        <h2 className="text-sm font-semibold text-slate-900 line-clamp-2">
          {title}
        </h2>
        <p className="text-xs text-slate-500 flex items-center gap-1">
          <span>📍</span>
          <span className="line-clamp-1">{location}</span>
        </p>

        <div className="mt-1 flex items-center justify-between text-xs">
          <div className="flex flex-col">
            <span className="text-slate-400">Price</span>
            <span className="font-semibold text-violet-700">
              {priceLabel}
            </span>
          </div>
          {rooms && rooms.trim() !== "" && (
            <div className="flex flex-col items-end">
              <span className="text-slate-400">Config</span>
              <span className="font-medium text-slate-700">{rooms}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
