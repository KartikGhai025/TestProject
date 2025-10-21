"use client"

import { useState } from "react"
import { Heart, MapPin, Bed, Bath, Square, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import Link from "next/link"

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

interface PropertyCardProps {
  property: Property
  viewMode?: "grid" | "list"
}

export function PropertyCard({ property, viewMode = "grid" }: PropertyCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)

  const formatPrice = (price: number, purpose: string) => {
    if (purpose === "rent") {
      return `₹${(price / 1000).toFixed(0)}k/month`
    }
    return `₹${(price / 100000).toFixed(1)} Lakh`
  }

  if (viewMode === "list") {
    return (
      <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
        <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
          <CardContent className="p-0">
            <div className="flex">
              <div className="relative w-48 h-32 flex-shrink-0">
                <img
                  src={property.image || "/placeholder.svg"}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2">
                  <Badge variant={property.purpose === "sell" ? "default" : "secondary"}>
                    {property.purpose === "sell" ? "For Sale" : "For Rent"}
                  </Badge>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                  onClick={() => setIsFavorite(!isFavorite)}
                >
                  <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                </Button>
              </div>
              <div className="flex-1 p-4">
                <h3 className="font-semibold text-lg mb-1">{property.title}</h3>
                <p className="text-2xl font-bold text-primary mb-2">{formatPrice(property.price, property.purpose)}</p>
                <div className="flex items-center gap-1 text-muted-foreground mb-3">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{property.location}</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <Bed className="h-4 w-4" />
                    <span>{property.bedrooms} Beds</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bath className="h-4 w-4" />
                    <span>{property.bathrooms} Baths</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Square className="h-4 w-4" />
                    <span>{property.area} sq.ft</span>
                  </div>
                </div>
                <Link href={`/property/${property.id}`}>
                  <Button className="w-full">
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div whileHover={{ y: -4, scale: 1.02 }} transition={{ duration: 0.3 }}>
      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
        <CardContent className="p-0">
          <div className="relative">
            <img
              src={property.image || "/placeholder.svg"}
              alt={property.title}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            <div className="absolute top-3 left-3">
              <Badge variant={property.purpose === "sell" ? "default" : "secondary"}>
                {property.purpose === "sell" ? "For Sale" : "For Rent"}
              </Badge>
            </div>
            {property.featured && (
              <div className="absolute top-3 right-12">
                <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">Featured</Badge>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-3 right-3 bg-white/80 hover:bg-white"
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
            </Button>
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-lg mb-1 line-clamp-1">{property.title}</h3>
            <p className="text-2xl font-bold text-primary mb-2">{formatPrice(property.price, property.purpose)}</p>
            <div className="flex items-center gap-1 text-muted-foreground mb-3">
              <MapPin className="h-4 w-4" />
              <span className="text-sm line-clamp-1">{property.location}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-1">
                <Bed className="h-4 w-4" />
                <span>{property.bedrooms}</span>
              </div>
              <div className="flex items-center gap-1">
                <Bath className="h-4 w-4" />
                <span>{property.bathrooms}</span>
              </div>
              <div className="flex items-center gap-1">
                <Square className="h-4 w-4" />
                <span>{property.area} sq.ft</span>
              </div>
            </div>
            <Link href={`/property/${property.id}`}>
              <Button className="w-full">
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
