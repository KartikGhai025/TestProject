"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PropertyCard } from "./property-card"
import { useState, useEffect } from "react"

interface Property {
  id: string
  title: string
  price: number
  location: string
  bedrooms: number
  bathrooms: number
  area: number
  image: string
  purpose: "sell" | "rent"
  type: string
  featured?: boolean
}

interface FeaturedPropertiesProps {
  properties: Property[]
}

export function FeaturedProperties({ properties }: FeaturedPropertiesProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const featuredProperties = properties.filter((p) => p.featured)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, featuredProperties.length - 2))
  }

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + Math.max(1, featuredProperties.length - 2)) % Math.max(1, featuredProperties.length - 2),
    )
  }

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [featuredProperties.length])

  if (featuredProperties.length === 0) return null

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Featured Properties
        </h2>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={prevSlide}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={nextSlide}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out gap-6"
          style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
        >
          {featuredProperties.map((property) => (
            <div key={property.id} className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3">
              <PropertyCard property={property} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
