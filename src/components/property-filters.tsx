"use client"

import { useState } from "react"
import { SlidersHorizontal, MapPin, Home, Building, Landmark, Store } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

interface PropertyFiltersProps {
  onFiltersChange: (filters: any) => void
}

export function PropertyFilters({ onFiltersChange }: PropertyFiltersProps) {
  const [filters, setFilters] = useState({
    propertyType: "",
    purpose: "sell",
    priceRange: [0, 10000000],
    bedrooms: "",
    bathrooms: "",
    location: "",
  })

  const propertyTypes = [
    { value: "house", label: "House", icon: Home },
    { value: "apartment", label: "Apartment", icon: Building },
    { value: "land", label: "Land", icon: Landmark },
    { value: "commercial", label: "Commercial", icon: Store },
  ]

  const updateFilters = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFiltersChange(newFilters)
  }

  return (
    <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-6 mb-8">
      <div className="flex items-center gap-2 mb-6">
        <SlidersHorizontal className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold">Filter Properties</h2>
      </div>

      {/* Purpose Toggle */}
      <div className="mb-6">
        <label className="text-sm font-medium mb-2 block">Purpose</label>
        <div className="flex gap-2">
          <Button
            variant={filters.purpose === "sell" ? "default" : "outline"}
            onClick={() => updateFilters("purpose", "sell")}
            className="flex-1"
          >
            For Sale
          </Button>
          <Button
            variant={filters.purpose === "rent" ? "default" : "outline"}
            onClick={() => updateFilters("purpose", "rent")}
            className="flex-1"
          >
            For Rent
          </Button>
        </div>
      </div>

      {/* Property Type */}
      <div className="mb-6">
        <label className="text-sm font-medium mb-2 block">Property Type</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {propertyTypes.map((type) => {
            const Icon = type.icon
            return (
              <Button
                key={type.value}
                variant={filters.propertyType === type.value ? "default" : "outline"}
                onClick={() => updateFilters("propertyType", type.value)}
                className="flex flex-col gap-1 h-auto py-3"
              >
                <Icon className="h-4 w-4" />
                <span className="text-xs">{type.label}</span>
              </Button>
            )
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Location Search */}
        <div>
          <label className="text-sm font-medium mb-2 block">Location</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Enter city or area"
              value={filters.location}
              onChange={(e) => updateFilters("location", e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Bedrooms */}
        <div>
          <label className="text-sm font-medium mb-2 block">Bedrooms</label>
          <Select value={filters.bedrooms} onValueChange={(value) => updateFilters("bedrooms", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="1">1 BHK</SelectItem>
              <SelectItem value="2">2 BHK</SelectItem>
              <SelectItem value="3">3 BHK</SelectItem>
              <SelectItem value="4">4+ BHK</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Bathrooms */}
        <div>
          <label className="text-sm font-medium mb-2 block">Bathrooms</label>
          <Select value={filters.bathrooms} onValueChange={(value) => updateFilters("bathrooms", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="4">4+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Price Range */}
        <div>
          <label className="text-sm font-medium mb-2 block">
            Price Range: ₹{(filters.priceRange[0] / 100000).toFixed(1)}L - ₹
            {(filters.priceRange[1] / 100000).toFixed(1)}L
          </label>
          <Slider
            value={filters.priceRange}
            onValueChange={(value) => updateFilters("priceRange", value)}
            max={10000000}
            min={0}
            step={100000}
            className="mt-2"
          />
        </div>
      </div>
    </div>
  )
}
