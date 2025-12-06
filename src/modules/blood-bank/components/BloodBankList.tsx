"use client";

import { useEffect, useMemo, useState } from "react";
import { useBloodBankStore } from "../store/bloodbank.store";
import { Loader } from "@/components/common/Loader";

const BLOOD_GROUPS = ["All", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export default function BloodBankList() {
  const { bloodbanks, fetchBloodBanks, loading } = useBloodBankStore();

  const [search, setSearch] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("All");
  const [onlyContactable, setOnlyContactable] = useState(false);

  useEffect(() => {
    fetchBloodBanks();
  }, [fetchBloodBanks]);

  const filteredBloodbanks = useMemo(() => {
    return bloodbanks.filter((item) => {
      const matchesSearch =
        search.trim().length === 0 ||
        item.fullName.toLowerCase().includes(search.toLowerCase()) ||
        item.contact.toLowerCase().includes(search.toLowerCase());

      const matchesGroup =
        selectedGroup === "All" || item.bloodType === selectedGroup;

      const matchesContactable = !onlyContactable || item.isContact;

      return matchesSearch && matchesGroup && matchesContactable;
    });
  }, [bloodbanks, search, selectedGroup, onlyContactable]);

  if (loading) return <Loader />;

  return (
    <div className="space-y-6">
      {/* Page header */}
      <section className="rounded-3xl border border-red-100 bg-gradient-to-br from-rose-50 via-red-50 to-amber-50 px-6 py-5 shadow-sm flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-900 flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-white/80 shadow-sm text-red-500 text-lg">
              🩸
            </span>
            <span>City Blood Donor Hub</span>
          </h1>
          <p className="mt-1 text-sm text-slate-600 max-w-xl">
            Browse verified donors in your city. Filter by blood group, search
            by name or phone, and contact those who are open to being reached.
          </p>
        </div>

        {/* Quick stats pill */}
        <div className="flex flex-wrap gap-3 text-xs text-slate-700">
          <div className="rounded-2xl bg-white/80 border border-white px-4 py-2 shadow-sm">
            <p className="uppercase tracking-wide text-[10px] text-slate-400">
              Total Donors
            </p>
            <p className="text-lg font-semibold">{bloodbanks.length}</p>
          </div>
          <div className="rounded-2xl bg-white/80 border border-white px-4 py-2 shadow-sm">
            <p className="uppercase tracking-wide text-[10px] text-slate-400">
              Currently Showing
            </p>
            <p className="text-lg font-semibold">
              {filteredBloodbanks.length}
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="rounded-3xl border bg-white/80 px-4 py-4 shadow-sm backdrop-blur-sm space-y-4">
        {/* Row 1: Search + Contactable */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          {/* Search */}
          <div className="flex-1">
            <label className="block text-[11px] font-semibold uppercase tracking-wide text-slate-500 mb-1">
              Search Donor
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name or phone..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none ring-0 transition focus:border-rose-300 focus:bg-white focus:ring-2 focus:ring-rose-100"
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                ⌕
              </span>
            </div>
          </div>

          {/* Contactable toggle */}
          <div className="flex items-center justify-between md:justify-end gap-3">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              Contact Preference
            </span>
            <button
              type="button"
              onClick={() => setOnlyContactable((prev) => !prev)}
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                onlyContactable
                  ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                  : "border-slate-200 bg-slate-50 text-slate-700"
              }`}
            >
              <span
                className={`inline-flex h-4 w-7 items-center rounded-full p-[2px] transition ${
                  onlyContactable ? "bg-emerald-500" : "bg-slate-300"
                }`}
              >
                <span
                  className={`h-3 w-3 rounded-full bg-white shadow transition ${
                    onlyContactable ? "translate-x-3" : "translate-x-0"
                  }`}
                />
              </span>
              <span>
                {onlyContactable ? "Only contactable" : "Include all donors"}
              </span>
            </button>
          </div>
        </div>

        {/* Row 2: Blood group chips */}
        <div className="space-y-1">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
            Blood Group
          </p>
          <div className="flex flex-wrap gap-2">
            {BLOOD_GROUPS.map((group) => {
              const isActive = selectedGroup === group;
              return (
                <button
                  key={group}
                  type="button"
                  onClick={() => setSelectedGroup(group)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                    isActive
                      ? "border-rose-400 bg-rose-50 text-rose-700 shadow-sm"
                      : "border-slate-200 bg-slate-50 text-slate-700 hover:border-rose-200 hover:bg-rose-50"
                  }`}
                >
                  {group === "All" ? "All Groups" : group}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Summary strip */}
      <section className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500 px-1">
        <p>
          Showing{" "}
          <span className="font-semibold text-slate-800">
            {filteredBloodbanks.length}
          </span>{" "}
          donor{filteredBloodbanks.length !== 1 && "s"}
          {selectedGroup !== "All" && (
            <>
              {" "}
              with{" "}
              <span className="font-semibold text-rose-600">
                {selectedGroup}
              </span>
            </>
          )}
        </p>
        <p className="hidden sm:block">
          Registered in system:{" "}
          <span className="font-semibold text-slate-800">
            {bloodbanks.length}
          </span>
        </p>
      </section>

      {/* List / Empty */}
      {filteredBloodbanks.length === 0 ? (
        <div className="rounded-3xl border border-dashed bg-slate-50 px-6 py-10 text-center text-sm text-slate-500">
          <p className="font-semibold text-slate-700 mb-1">
            No donors match your filters
          </p>
          <p className="mb-2">
            Try clearing the search text or selecting a different blood group.
          </p>
          <p className="text-xs text-slate-400">
            Tip: remove the &quot;Only contactable&quot; filter to see everyone.
          </p>
        </div>
      ) : (
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filteredBloodbanks.map((item) => (
            <article
              key={item.$id}
              className="group relative overflow-hidden rounded-3xl border border-slate-100 bg-white/90 p-4 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:border-rose-200 hover:shadow-md"
            >
              {/* Top row */}
              <div className="mb-3 flex items-start justify-between gap-3">
                <div className="space-y-0.5">
                  <h2 className="text-base font-semibold text-slate-900">
                    {item.fullName}
                  </h2>
                  <p className="text-[11px] text-slate-500">
                    {item.gender} • {item.age} yrs
                  </p>
                </div>

                <div className="flex flex-col items-end gap-1">
                  <span className="inline-flex items-center rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-600 border border-rose-100">
                    {item.bloodType}
                  </span>
                  {item.isContact ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-700 border border-emerald-100">
                      <span className="text-[9px]">●</span> Contactable
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-50 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-500 border border-slate-100">
                      <span className="text-[9px]">●</span> Contact Hidden
                    </span>
                  )}
                </div>
              </div>

              {/* subtle divider */}
              <div className="my-2 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

              {/* Details */}
              <div className="space-y-2 text-xs text-slate-700">
                <div className="flex justify-between gap-2">
                  <span className="text-slate-500">Age</span>
                  <span className="font-medium">{item.age} years</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-slate-500">Gender</span>
                  <span className="font-medium capitalize">
                    {item.gender?.toLowerCase()}
                  </span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-slate-500">Contact</span>
                  <span className="font-medium">
                    {item.isContact ? (
                      <a
                        href={`tel:${item.contact}`}
                        className="underline underline-offset-2 decoration-rose-400 hover:no-underline"
                      >
                        {item.contact}
                      </a>
                    ) : (
                      "Not shared"
                    )}
                  </span>
                </div>
              </div>

              {/* corner accents */}
              <div className="pointer-events-none absolute -right-6 -top-6 h-16 w-16 rounded-full bg-rose-50 opacity-60 group-hover:scale-110 transition" />
              <div className="pointer-events-none absolute -left-10 -bottom-10 h-20 w-20 rounded-full bg-amber-50 opacity-50 group-hover:translate-y-1 transition" />
            </article>
          ))}
        </section>
      )}
    </div>
  );
}
