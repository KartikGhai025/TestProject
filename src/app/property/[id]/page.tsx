"use client"

import { notFound } from "next/navigation"
import {
  ArrowLeft,
  MapPin,
  Bed,
  Bath,
  Square,
  Car,
  Wifi,
  Dumbbell,
  Shield,
  Waves,
  TreePine,
  Share,
  Heart,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PropertyGallery } from "@/components/property-gallery"
import { ContactAgent } from "@/components/contact-agent"
import { SimilarProperties } from "@/components/similar-properties"
import Link from "next/link"
import { motion } from "framer-motion"

// Mock property data
const getProperty = (id: string) => {
  const property = {
    "1": {
      id: "1",
      title: "Modern Luxury Apartment",
      price: "$750,000",
      location: "Downtown District, City Center",
      bedrooms: 2,
      bathrooms: 2,
      area: "1,200 sq ft",
      type: "Apartment",
      status: "For Sale",
      yearBuilt: 2022,
      parking: 1,
      description:
        "Experience luxury living in this stunning modern apartment located in the heart of the city. This beautifully designed 2-bedroom, 2-bathroom unit features floor-to-ceiling windows, premium finishes, and breathtaking city views. The open-concept layout seamlessly connects the living, dining, and kitchen areas, creating the perfect space for both relaxation and entertainment.",
      features: [
        "Floor-to-ceiling windows",
        "Premium hardwood floors",
        "Stainless steel appliances",
        "In-unit washer/dryer",
        "Walk-in closets",
        "Private balcony",
        "Central air conditioning",
        "Smart home features",
      ],
      amenities: [
        { icon: Wifi, name: "High-speed Internet" },
        { icon: Dumbbell, name: "Fitness Center" },
        { icon: Shield, name: "24/7 Security" },
        { icon: Waves, name: "Swimming Pool" },
        { icon: Car, name: "Parking Garage" },
        { icon: TreePine, name: "Rooftop Garden" },
      ],
      images: [
        "/city-infrastructure-development.png",
        "/city-infrastructure-development.png",
        "/city-infrastructure-development.png",
        "/city-infrastructure-development.png",
        "/city-infrastructure-development.png",
      ],
      agent: {
        id: "agent1",
        name: "Sarah Johnson",
        title: "Senior Real Estate Agent",
        avatar: "/professional-headshot.png",
        phone: "+1 (555) 123-4567",
        email: "sarah.johnson@realty.com",
        rating: 4.8,
        reviews: 127,
      },
      coordinates: { lat: 40.7128, lng: -74.006 },
    },
  }

  return property[id as keyof typeof property] || null
}

export default function PropertyDetailPage({ params }: { params: { id: string } }) {
  const property = getProperty(params.id)

  if (!property) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Breadcrumb & Back Button */}
        <div className="flex items-center gap-4">
          <Link href="/properties">
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Property
            </Button>
          </Link>
          <div className="text-sm text-gray-500">Home / Property / {property.title}</div>
        </div>

        {/* Property Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4"
        >
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">{property.title}</h1>
              <Badge variant="secondary" className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                {property.status}
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="h-5 w-5" />
              <span className="text-lg">{property.location}</span>
            </div>
            <div className="flex items-center gap-6 text-gray-700">
              <div className="flex items-center gap-1">
                <Bed className="h-5 w-5" />
                <span>{property.bedrooms} Bedrooms</span>
              </div>
              <div className="flex items-center gap-1">
                <Bath className="h-5 w-5" />
                <span>{property.bathrooms} Bathrooms</span>
              </div>
              <div className="flex items-center gap-1">
                <Square className="h-5 w-5" />
                <span>{property.area}</span>
              </div>
              <div className="flex items-center gap-1">
                <Car className="h-5 w-5" />
                <span>{property.parking} Parking</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-4">
            <div className="text-right">
              <div className="text-3xl lg:text-4xl font-bold text-orange-600">{property.price}</div>
              <div className="text-gray-600">Built in {property.yearBuilt}</div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon">
                <Share className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Property Gallery */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <PropertyGallery images={property.images} title={property.title} />
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Property Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Card className="bg-gradient-to-br from-white to-orange-50/30 border-orange-200/50 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-900">About This Property</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed text-lg">{property.description}</p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Features */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <Card className="bg-gradient-to-br from-white to-purple-50/30 border-purple-200/50 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-900">Property Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {property.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 bg-white/60 rounded-lg border border-purple-100"
                      >
                        <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Amenities */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <Card className="bg-gradient-to-br from-white to-blue-50/30 border-blue-200/50 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-900">Building Amenities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {property.amenities.map((amenity, index) => (
                      <div
                        key={index}
                        className="flex flex-col items-center gap-2 p-4 bg-white/60 rounded-xl border border-blue-100 hover:shadow-md transition-shadow"
                      >
                        <amenity.icon className="h-8 w-8 text-blue-600" />
                        <span className="text-sm font-medium text-gray-700 text-center">{amenity.name}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Map Placeholder */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <Card className="bg-gradient-to-br from-white to-green-50/30 border-green-200/50 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-900">Location & Neighborhood</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gradient-to-br from-green-100 to-blue-100 rounded-xl flex items-center justify-center border-2 border-dashed border-green-300">
                    <div className="text-center text-gray-600">
                      <MapPin className="h-12 w-12 mx-auto mb-2 text-green-600" />
                      <p className="font-medium">Interactive Map</p>
                      <p className="text-sm">Location: {property.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column - Contact Agent */}
          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
              <ContactAgent agent={property.agent} propertyTitle={property.title} />
            </motion.div>
          </div>
        </div>

        {/* Similar Properties */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <SimilarProperties currentPropertyId={property.id} />
        </motion.div>
      </div>
    </div>
  )
}
