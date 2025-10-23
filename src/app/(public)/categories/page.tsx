"use client"
import { useEffect, useState } from "react"
import * as Icons from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export default function CategoriesPage() {
 const categories = [
  { name: "Adopt Us", slug: "adopt-us", icon: "PawPrint", color: "bg-orange-500" },
  { name: "Blood Bank", slug: "blood-bank", icon: "Droplet", color: "bg-red-500" },
  { name: "Doctors", slug: "doctors", icon: "Stethoscope", color: "bg-green-600" },
  { name: "Cafes & Restaurants", slug: "cafes-restaurants", icon: "Coffee", color: "bg-amber-600" },
  { name: "Coaching", slug: "coaching", icon: "BookOpen", color: "bg-indigo-500" },
  { name: "Colleges", slug: "colleges", icon: "GraduationCap", color: "bg-blue-600" },
  { name: "Emergency Services", slug: "emergency-services", icon: "AlertTriangle", color: "bg-red-600" },
  { name: "Foodies Timeline", slug: "foodies-timeline", icon: "UtensilsCrossed", color: "bg-pink-600" },
  { name: "Funzone", slug: "funzone", icon: "PartyPopper", color: "bg-yellow-500" },
  { name: "Gym", slug: "gym", icon: "Dumbbell", color: "bg-gray-700" },
  { name: "Influencers", slug: "influencers", icon: "Camera", color: "bg-purple-500" },
  { name: "Jobs", slug: "jobs", icon: "BriefcaseBusiness", color: "bg-blue-500" },
  { name: "Loan", slug: "loan", icon: "CreditCard", color: "bg-teal-500" },
  { name: "Lost & Found", slug: "lost-and-found", icon: "Search", color: "bg-cyan-600" },
  { name: "Matrimonial", slug: "matrimonial", icon: "Heart", color: "bg-rose-500" },
  { name: "New Openings", slug: "new-openings", icon: "Sparkles", color: "bg-fuchsia-500" },
  { name: "Preowned Vehicles", slug: "preowned-vehicles", icon: "Car", color: "bg-emerald-600" },
  { name: "Properties", slug: "properties", icon: "Home", color: "bg-lime-600" },
  { name: "Sale", slug: "sale", icon: "Tag", color: "bg-orange-600" },
  { name: "Schools", slug: "schools", icon: "School", color: "bg-indigo-600" },
  { name: "Services", slug: "services", icon: "Wrench", color: "bg-sky-500" },
  { name: "Social Work", slug: "social-work", icon: "HandHeart", color: "bg-red-400" },
  { name: "Sports", slug: "sports", icon: "Trophy", color: "bg-yellow-600" },
  { name: "Tour & Travels", slug: "tour-travels", icon: "Plane", color: "bg-teal-600" },
]


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Browse Categories
          </h1>
          <p className="text-xl text-gray-600">Find exactly what you're looking for</p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {categories.map((category) => {
            const LucideIcon = Icons[category.icon as keyof typeof Icons] as React.ElementType

            return (
              <div
                key={category.slug}
                className="p-6 bg-white rounded-3xl shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-1 text-center cursor-pointer"
                onClick={() => (window.location.href = `/${category.slug}`)}
              >
                <div
                  className={`w-16 h-16 ${category.color} rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}
                >
                  {LucideIcon && <LucideIcon className="w-8 h-8 text-white" />}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{category.name}</h3>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
