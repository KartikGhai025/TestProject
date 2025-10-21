"use client"

import { useState } from "react"
import {  Bell, Heart } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Search, User, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const navLinks = [
  { href: "/home", label: "Home" },
  { href: "/categories", label: "Categories" },
  { href: "/stores", label: "Stores" },
  { href: "/news", label: "News" },
]

export function DesktopNavigation() {
  const pathname = usePathname()
    const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="hidden md:block fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b">
      {/* Top bar with logo, search, and account */}
    

  <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              ProjectMe
            </span>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className={`relative transition-all duration-300 ${isSearchFocused ? "scale-105" : ""}`}>
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search stores, categories, news..."
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
            </div>
          </div>

          {/* Right Actions */}
         {/* Right Actions */}
<div className="flex items-center gap-4">
  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
    <Bell className="w-6 h-6 text-gray-600" />
    <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center">
      <span className="text-white text-xs font-bold">3</span>
    </div>
  </button>

  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
    <Heart className="w-6 h-6 text-gray-600" />
  </button>

  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
    <ShoppingBag className="w-6 h-6 text-gray-600" />
    <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
      <span className="text-white text-xs font-bold">2</span>
    </div>
  </button>

  {/* Account button as link */}
  <Link
    href="/account"
    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
  >
    <User className="w-6 h-6 text-gray-600" />
  </Link>
</div>

        </div>
      </div>

      {/* Colorful navigation row */}
      <div className="px-6 py-3 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50">
        <nav className="max-w-7xl mx-auto">
          <ul className="flex space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <li key={link.href} className="relative">
                  <Link
                    href={link.href}
                    className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                      isActive
                        ? "text-purple-600 bg-white/80 shadow-sm"
                        : "text-gray-700 hover:text-purple-600 hover:bg-white/50"
                    }`}
                  >
                    {link.label}
                  </Link>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -bottom-3 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </div>
  )
}
