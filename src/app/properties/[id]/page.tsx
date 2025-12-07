import Image from "next/image";
import { notFound } from "next/navigation";
import type { PropertyData } from "@/modules/property/models/property.model";
import { PROPERTIES } from "../../properties/mock-data";

interface PropertyDetailPageProps {
  params: { id: string };
}

export default function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  const { id } = params;

  const property: PropertyData | undefined = PROPERTIES.find(
    (p: PropertyData) => p.id === id
  );

  if (!property) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      {/* Top: title & meta */}
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">
            {property.type.toUpperCase()} •{" "}
            {property.purpose === "sale" ? "For Sale" : "For Rent"}
          </p>
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-900">
            {property.title}
          </h1>
          <p className="text-sm text-slate-600 mt-1 flex items-center gap-1">
            <span>📍</span>
            <span>{property.location}</span>
          </p>
        </div>

        <div className="flex flex-col items-start md:items-end gap-1">
          <span className="text-xs text-slate-400 uppercase tracking-wide">
            Price
          </span>
          <span className="text-xl font-semibold text-violet-700">
            {property.priceLabel}
          </span>
          <span className="text-xs text-slate-500">
            {property.areaLabel}
          </span>
        </div>
      </div>

      {/* Image gallery */}
      <section className="grid gap-3 md:grid-cols-3">
        <div className="md:col-span-2 relative h-64 md:h-80 rounded-3xl overflow-hidden border border-slate-100">
          <Image
            src={
              property.images[0] ??
              "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg"
            }
            alt={property.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="grid grid-rows-2 gap-3">
          {(
            property.images.slice(1, 3).length
              ? property.images.slice(1, 3)
              : property.images.slice(0, 2)
          ).map((img: string, idx: number) => (
            <div
              key={idx}
              className="relative h-32 rounded-2xl overflow-hidden border border-slate-100"
            >
              <Image
                src={img}
                alt={`${property.title}-${idx}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
          {property.images.length > 3 && (
            <div className="flex items-center justify-center rounded-2xl border border-dashed border-slate-200 text-xs text-slate-500">
              +{property.images.length - 3} more photos
            </div>
          )}
        </div>
      </section>

      {/* Key info */}
      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border bg-white p-4 shadow-sm space-y-2">
          <h2 className="text-sm font-semibold text-slate-900">
            Overview
          </h2>
          <InfoRow label="Type" value={property.type} />
          <InfoRow
            label="Status"
            value={property.purpose === "sale" ? "For Sale" : "For Rent"}
          />
          {property.rooms && (
            <InfoRow label="Configuration" value={property.rooms} />
          )}
          {property.bathrooms !== undefined && (
            <InfoRow
              label="Bathrooms"
              value={String(property.bathrooms)}
            />
          )}
          {property.floor && (
            <InfoRow label="Floor" value={property.floor} />
          )}
          {property.facing && (
            <InfoRow label="Facing" value={property.facing} />
          )}
          {property.parking !== undefined && (
            <InfoRow
              label="Parking"
              value={property.parking ? "Available" : "Not available"}
            />
          )}
        </div>

        <div className="rounded-2xl border bg-white p-4 shadow-sm space-y-2 md:col-span-2">
          <h2 className="text-sm font-semibold text-slate-900">
            Description
          </h2>
          <p className="text-sm text-slate-700 whitespace-pre-line">
            {property.description || "No description provided."}
          </p>

          {property.amenities && property.amenities.length > 0 && (
            <div className="mt-3">
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                Amenities
              </h3>
              <div className="flex flex-wrap gap-2 text-xs">
                {property.amenities.map((a: string) => (
                  <span
                    key={a}
                    className="rounded-full bg-violet-50 border border-violet-100 px-3 py-1 text-violet-700"
                  >
                    {a}
                  </span>
                ))}
              </div>
            </div>
          )}

          {property.nearbyPlaces && property.nearbyPlaces.length > 0 && (
            <div className="mt-3">
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                Nearby
              </h3>
              <div className="flex flex-wrap gap-2 text-xs">
                {property.nearbyPlaces.map((n: string) => (
                  <span
                    key={n}
                    className="rounded-full bg-slate-50 border border-slate-100 px-3 py-1 text-slate-700"
                  >
                    {n}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Contact box */}
      <section className="rounded-2xl border bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white p-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between shadow-md">
        <div>
          <p className="text-xs uppercase tracking-wide text-white/70">
            Interested in this property?
          </p>
          <p className="text-lg font-semibold">
            Contact {property.ownerName || "Owner"}
          </p>
          <p className="text-sm text-white/80 mt-1">
            Reach out on call or WhatsApp to know more or schedule a visit.
          </p>
        </div>
        <div className="flex gap-3">
          <a
            href={`tel:${property.contact}`}
            className="px-4 py-2 rounded-xl bg-white text-violet-700 text-sm font-semibold shadow hover:bg-violet-50"
          >
            Call: {property.contact}
          </a>
          <a
            href={`https://wa.me/${property.contact}`}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 rounded-xl bg-violet-500/40 border border-white/50 text-sm font-semibold hover:bg-violet-500/70"
          >
            Chat on WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="flex justify-between text-xs text-slate-600">
      <span className="text-slate-400">{label}</span>
      <span className="font-medium text-slate-800">{value}</span>
    </div>
  );
}
