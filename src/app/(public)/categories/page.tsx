"use client"

import { useEffect, useState } from "react"

import { motion, AnimatePresence } from "framer-motion"
import {
  Grid3X3,
  Smartphone,
  Laptop,
  Shirt,
  Home,
  Book,
  Gamepad2,
  ChevronDown,
  X,
  Stethoscope,
  Wrench,
  Scissors,
  Dumbbell,
  Monitor,
  Headphones,
  Camera,
  Watch,
  Cpu,
  HardDrive,
} from "lucide-react"
import Link from "next/link"

const categories = [
  {
    name: "Electronics",
    icon: Smartphone,
    color: "from-blue-400 to-blue-600",
    count: "2.5K",
    slug: "electronics",
    subcategories: [
      { name: "Smartphones", icon: Smartphone, slug: "smartphones" },
      { name: "Tablets", icon: Monitor, slug: "tablets" },
      { name: "Headphones", icon: Headphones, slug: "headphones" },
      { name: "Cameras", icon: Camera, slug: "cameras" },
      { name: "Smartwatches", icon: Watch, slug: "smartwatches" },
      { name: "Audio Systems", icon: Headphones, slug: "audio-systems" },
    ],
  },
  {
    name: "Computers",
    icon: Laptop,
    color: "from-purple-400 to-purple-600",
    count: "1.8K",
    slug: "computers",
    subcategories: [
      { name: "Laptops", icon: Laptop, slug: "laptops" },
      { name: "Desktops", icon: Monitor, slug: "desktops" },
      { name: "Components", icon: Cpu, slug: "components" },
      { name: "Storage", icon: HardDrive, slug: "storage" },
      { name: "Accessories", icon: Grid3X3, slug: "accessories" },
    ],
  },
  {
    name: "Fashion",
    icon: Shirt,
    color: "from-pink-400 to-pink-600",
    count: "3.2K",
    slug: "fashion",
    subcategories: [
      { name: "Men's Clothing", icon: Shirt, slug: "mens-clothing" },
      { name: "Women's Clothing", icon: Shirt, slug: "womens-clothing" },
      { name: "Shoes", icon: Grid3X3, slug: "shoes" },
      { name: "Accessories", icon: Watch, slug: "accessories" },
      { name: "Bags", icon: Grid3X3, slug: "bags" },
    ],
  },
  {
    name: "Home & Garden",
    icon: Home,
    color: "from-green-400 to-green-600",
    count: "1.9K",
    slug: "home-garden",
    subcategories: [
      { name: "Furniture", icon: Home, slug: "furniture" },
      { name: "Decor", icon: Grid3X3, slug: "decor" },
      { name: "Kitchen", icon: Grid3X3, slug: "kitchen" },
      { name: "Garden", icon: Grid3X3, slug: "garden" },
      { name: "Tools", icon: Wrench, slug: "tools" },
    ],
  },
  {
    name: "Health & Beauty",
    icon: Stethoscope,
    color: "from-red-400 to-red-600",
    count: "950",
    slug: "health-beauty",
    subcategories: [
      { name: "Skincare", icon: Grid3X3, slug: "skincare" },
      { name: "Makeup", icon: Grid3X3, slug: "makeup" },
      { name: "Hair Care", icon: Scissors, slug: "hair-care" },
      { name: "Health Supplements", icon: Stethoscope, slug: "health-supplements" },
      { name: "Personal Care", icon: Grid3X3, slug: "personal-care" },
    ],
  },
  {
    name: "Books",
    icon: Book,
    color: "from-yellow-400 to-yellow-600",
    count: "1.2K",
    slug: "books",
    subcategories: [
      { name: "Fiction", icon: Book, slug: "fiction" },
      { name: "Non-Fiction", icon: Book, slug: "non-fiction" },
      { name: "Educational", icon: Book, slug: "educational" },
      { name: "Children's Books", icon: Book, slug: "childrens-books" },
      { name: "E-books", icon: Book, slug: "ebooks" },
    ],
  },
  {
    name: "Gaming",
    icon: Gamepad2,
    color: "from-indigo-400 to-indigo-600",
    count: "800",
    slug: "gaming",
    subcategories: [
      { name: "Consoles", icon: Gamepad2, slug: "consoles" },
      { name: "PC Games", icon: Monitor, slug: "pc-games" },
      { name: "Accessories", icon: Grid3X3, slug: "accessories" },
      { name: "VR Gaming", icon: Grid3X3, slug: "vr-gaming" },
      { name: "Gaming Chairs", icon: Grid3X3, slug: "gaming-chairs" },
    ],
  },
  {
    name: "Sports & Fitness",
    icon: Dumbbell,
    color: "from-teal-400 to-teal-600",
    count: "1.1K",
    slug: "sports-fitness",
    subcategories: [
      { name: "Fitness Equipment", icon: Dumbbell, slug: "fitness-equipment" },
      { name: "Sports Gear", icon: Grid3X3, slug: "sports-gear" },
      { name: "Outdoor Activities", icon: Grid3X3, slug: "outdoor-activities" },
      { name: "Athletic Wear", icon: Shirt, slug: "athletic-wear" },
      { name: "Supplements", icon: Grid3X3, slug: "supplements" },
    ],
  },
  // Example: Property category with no subcategories
  {
    name: "Property",
    icon: Home,
    color: "from-gray-400 to-gray-600",
    count: "500",
    slug: "property",
    directUrl: "/property",
  },
]

export default function CategoriesPage() {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState<string | null>(null)


  // ✅ Prevent background scroll when drawer is open
  useEffect(() => {
    if (mobileDrawerOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileDrawerOpen])

  const handleCategoryClick = (category: typeof categories[0]) => {
    if (category.subcategories && category.subcategories.length > 0) {
      if (window.innerWidth < 768) setMobileDrawerOpen(category.slug)
    } else if (category.directUrl) {
      window.location.href = category.directUrl
    } else {
      window.location.href = `/${category.slug}`
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Browse Categories
          </h1>
          <p className="text-xl text-gray-600">Find exactly what you're looking for</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 relative">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <div key={category.name} className="relative">
                <motion.div
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group relative"
                  whileHover={{ scale: 1.05, y: -5 }}
                  onHoverStart={() => setHoveredCategory(category.slug)}
                  onHoverEnd={() => setHoveredCategory(null)}
                  onClick={() => handleCategoryClick(category)}
                >
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{category.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{category.count} products</p>

                  {/* Desktop subcategories indicator */}
                  {category.subcategories && category.subcategories.length > 0 && (
                    <div className="hidden md:flex items-center justify-center">
                      <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                    </div>
                  )}
                </motion.div>

                {/* Desktop Mega Dropdown */}
                <AnimatePresence>
                  {hoveredCategory === category.slug && category.subcategories && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-80 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 p-6 z-50 hidden md:block"
                      onMouseEnter={() => setHoveredCategory(category.slug)}
                      onMouseLeave={() => setHoveredCategory(null)}
                    >
                      <h4 className="text-lg font-semibold text-gray-800 mb-4">{category.name}</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {category.subcategories.map((sub) => {
                          const SubIcon = sub.icon
                          return (
                            <Link
                              key={sub.slug}
                              href={`/categories/${category.slug}/${sub.slug}`}
                              className="flex items-center gap-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-200 group/sub"
                            >
                              <div
                                className={`w-8 h-8 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center group-hover/sub:scale-110 transition-transform`}
                              >
                                <SubIcon className="w-4 h-4 text-white" />
                              </div>
                              <span className="text-sm font-medium text-gray-700 group-hover/sub:text-gray-900">
                                {sub.name}
                              </span>
                            </Link>
                          )
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {mobileDrawerOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 md:hidden"
              onClick={() => setMobileDrawerOpen(null)}
            >
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto pb-24 scrollbar-hide"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-800">
                    {categories.find((c) => c.slug === mobileDrawerOpen)?.name}
                  </h3>
                  <button
                    onClick={() => setMobileDrawerOpen(null)}
                    className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"
                  >
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {categories
                    .find((c) => c.slug === mobileDrawerOpen)
                    ?.subcategories?.map((sub) => {
                      const SubIcon = sub.icon
                      const category = categories.find((c) => c.slug === mobileDrawerOpen)!
                      return (
                        <Link
                          key={sub.slug}
                          href={`/categories/${category.slug}/${sub.slug}`}
                          className="flex items-center gap-4 p-4 rounded-xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-200"
                          onClick={() => setMobileDrawerOpen(null)}
                        >
                          <div
                            className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center`}
                          >
                            <SubIcon className="w-6 h-6 text-white" />
                          </div>
                          <span className="text-lg font-medium text-gray-700">{sub.name}</span>
                        </Link>
                      )
                    })}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-12 bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Popular This Week</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {["Smartphones", "Laptops", "Sneakers", "Headphones", "Watches", "Gaming Chairs"].map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-sm font-medium hover:from-purple-200 hover:to-pink-200 transition-colors cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
