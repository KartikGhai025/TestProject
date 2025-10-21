"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Bed, Bath, Square, MapPin } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

interface Property {
  id: string
  title: string
  price: string
  location: string
  bedrooms: number
  bathrooms: number
  area: string
  image: string
  type: string
}

interface SimilarPropertiesProps {
  currentPropertyId: string
}

export function SimilarProperties({ currentPropertyId }: SimilarPropertiesProps) {
  // Mock similar properties data
  const similarProperties: Property[] = [
    {
      id: "2",
      title: "Cozy Family House",
      price: "$450,000",
      location: "Maple Street, Downtown",
      bedrooms: 3,
      bathrooms: 2,
      area: "1,800 sq ft",
      image: "/city-infrastructure-development.png",
      type: "House",
    },
    {
      id: "3",
      title: "Modern Office Space",
      price: "$2,500/month",
      location: "Business District",
      bedrooms: 0,
      bathrooms: 2,
      area: "1,200 sq ft",
      image: "/city-infrastructure-development.png",
      type: "Commercial",
    },
    {
      id: "4",
      title: "Luxury Villa",
      price: "$1,200,000",
      location: "Hillside Avenue",
      bedrooms: 5,
      bathrooms: 4,
      area: "3,500 sq ft",
      image: "/city-infrastructure-development.png",
      type: "Villa",
    },
  ].filter((property) => property.id !== currentPropertyId)

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Similar Properties</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {similarProperties.map((property, index) => (
          <motion.div
            key={property.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="group hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-orange-50/30 border-orange-200/50 overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={property.image || "/placeholder.svg"}
                  alt={property.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white"
                >
                  <Heart className="h-4 w-4" />
                </Button>
                <div className="absolute top-3 left-3">
                  <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    {property.type}
                  </span>
                </div>
              </div>

              <CardContent className="p-4 space-y-3">
                <div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                    {property.title}
                  </h3>
                  <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                    <MapPin className="h-3 w-3" />
                    {property.location}
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600">
                  {property.bedrooms > 0 && (
                    <div className="flex items-center gap-1">
                      <Bed className="h-4 w-4" />
                      {property.bedrooms}
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Bath className="h-4 w-4" />
                    {property.bathrooms}
                  </div>
                  <div className="flex items-center gap-1">
                    <Square className="h-4 w-4" />
                    {property.area}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xl font-bold text-orange-600">{property.price}</span>
                  <Link href={`/properties/${property.id}`}>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                    >
                      View Details
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
