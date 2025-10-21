"use client"

import { useState } from "react"
import Image from "next/image"
import { Camera, Edit3, MapPin, Calendar } from "lucide-react"

export default function ProfileHeader() {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 rounded-2xl p-1 mb-8">
      <div className="bg-white rounded-xl p-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Avatar */}
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 p-1">
              <div className="w-full h-full rounded-full overflow-hidden bg-white">
                <Image
                  src="/professional-headshot.png"
                  alt="Profile"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <button className="absolute bottom-2 right-2 w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg">
              <Camera className="w-5 h-5" />
            </button>
          </div>

          {/* Profile Info */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">Sarah Johnson</h1>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Edit3 className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <p className="text-gray-600 mb-4">sarah.johnson@email.com</p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>New York, NY</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>Member since March 2023</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">24</div>
              <div className="text-sm text-gray-500">Orders</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-600">156</div>
              <div className="text-sm text-gray-500">Favorites</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">89</div>
              <div className="text-sm text-gray-500">Reviews</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
