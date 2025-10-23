"use client"

import { useState, useMemo } from "react"
import { PropertyFilters } from "@/components/property-filters"
import { PropertyCard } from "@/components/property-card"
import { FeaturedProperties } from "@/components/featured-properties"
import { PropertySorting } from "@/components/property-sorting"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

// Mock data for properties
const mockProperties = [
  {
    id: "1",
    title: "Luxury 3BHK Apartment in Downtown",
    price: 8500000,
    location: "Downtown, Mumbai",
    bedrooms: 3,
    bathrooms: 2,
    area: 1200,
    image: "/city-infrastructure-development.png",
    purpose: "sell" as const,
    type: "apartment",
    featured: true,
  },
  {
    id: "2",
    title: "Cozy 2BHK House with Garden",
    price: 25000,
    location: "Suburbs, Pune",
    bedrooms: 2,
    bathrooms: 1,
    area: 900,
    image: "/city-infrastructure-development.png",
    purpose: "rent" as const,
    type: "house",
    featured: true,
  },
  {
    id: "3",
    title: "Commercial Space in Business District",
    price: 12000000,
    location: "Business District, Bangalore",
    bedrooms: 0,
    bathrooms: 2,
    area: 2000,
    image: "/city-infrastructure-development.png",
    purpose: "sell" as const,
    type: "commercial",
    featured: true,
  },
  {
    id: "4",
    title: "Spacious 4BHK Villa",
    price: 15000000,
    location: "Whitefield, Bangalore",
    bedrooms: 4,
    bathrooms: 3,
    area: 2500,
    image: "/city-infrastructure-development.png",
    purpose: "sell" as const,
    type: "house",
  },
  {
    id: "5",
    title: "Modern 1BHK Studio Apartment",
    price: 18000,
    location: "Koramangala, Bangalore",
    bedrooms: 1,
    bathrooms: 1,
    area: 600,
    image: "/city-infrastructure-development.png",
    purpose: "rent" as const,
    type: "apartment",
  },
  {
    id: "6",
    title: "Prime Land for Development",
    price: 25000000,
    location: "Electronic City, Bangalore",
    bedrooms: 0,
    bathrooms: 0,
    area: 5000,
    image: "/city-infrastructure-development.png",
    purpose: "sell" as const,
    type: "land",
  },
  {
    id: "7",
    title: "Furnished 2BHK Apartment",
    price: 30000,
    location: "Indiranagar, Bangalore",
    bedrooms: 2,
    bathrooms: 2,
    area: 1100,
    image: "/city-infrastructure-development.png",
    purpose: "rent" as const,
    type: "apartment",
  },
  {
    id: "8",
    title: "Retail Shop in Mall",
    price: 8000000,
    location: "Forum Mall, Bangalore",
    bedrooms: 0,
    bathrooms: 1,
    area: 800,
    image: "/city-infrastructure-development.png",
    purpose: "sell" as const,
    type: "commercial",
  },
]

export default function PropertiesPage() {
  const [filters, setFilters] = useState({
    propertyType: "",
    purpose: "sell",
    priceRange: [0, 10000000],
    bedrooms: "",
    bathrooms: "",
    location: "",
  })
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("newest")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  const filteredAndSortedProperties = useMemo(() => {
    const filtered = mockProperties.filter((property) => {
      if (filters.purpose && property.purpose !== filters.purpose) return false
      if (filters.propertyType && property.type !== filters.propertyType) return false
      if (filters.bedrooms && property.bedrooms.toString() !== filters.bedrooms) return false
      if (filters.bathrooms && property.bathrooms.toString() !== filters.bathrooms) return false
      if (filters.location && !property.location.toLowerCase().includes(filters.location.toLowerCase())) return false
      if (property.price < filters.priceRange[0] || property.price > filters.priceRange[1]) return false
      return true
    })

    // Sort properties
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "area-large":
          return b.area - a.area
        case "popular":
          return b.featured ? 1 : -1
        default:
          return 0
      }
    })

    return filtered
  }, [filters, sortBy])

  const totalPages = Math.ceil(filteredAndSortedProperties.length / itemsPerPage)
  const paginatedProperties = filteredAndSortedProperties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Find Your Dream Property
          </h1>
          <p className="text-muted-foreground">Discover the perfect home, apartment, or commercial space for you</p>
        </div>

        <PropertyFilters onFiltersChange={setFilters} />

        <FeaturedProperties properties={mockProperties} />

        <PropertySorting
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          sortBy={sortBy}
          onSortChange={setSortBy}
          totalResults={filteredAndSortedProperties.length}
        />

        <div
          className={`${
            viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"
          } mb-8`}
        >
          {paginatedProperties.map((property) => (
            <PropertyCard key={property.id} property={property} viewMode={viewMode} />
          ))}
        </div>

        {filteredAndSortedProperties.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No properties found matching your criteria.</p>
            <p className="text-sm text-muted-foreground mt-2">Try adjusting your filters to see more results.</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="outline"
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className="w-10"
                >
                  {page}
                </Button>
              ))}
            </div>

            <Button
              variant="outline"
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
