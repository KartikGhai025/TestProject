"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, MessageCircle, Calendar } from "lucide-react"
import Image from "next/image"

interface Agent {
  id: string
  name: string
  title: string
  avatar: string
  phone: string
  email: string
  rating: number
  reviews: number
}

interface ContactAgentProps {
  agent: Agent
  propertyTitle: string
}

export function ContactAgent({ agent, propertyTitle }: ContactAgentProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: `I'm interested in ${propertyTitle}. Please contact me with more information.`,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Contact form submitted:", formData)
  }

  return (
    <Card className="bg-gradient-to-br from-white to-orange-50/30 border-orange-200/50 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold text-gray-900">Contact Agent</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Agent Info */}
        <div className="flex items-center gap-4 p-4 bg-white/60 rounded-xl border border-orange-100">
          <div className="relative w-16 h-16 rounded-full overflow-hidden">
            <Image src={agent.avatar || "/placeholder.svg"} alt={agent.name} fill className="object-cover" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{agent.name}</h3>
            <p className="text-sm text-gray-600">{agent.title}</p>
            <div className="flex items-center gap-1 mt-1">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < Math.floor(agent.rating) ? "text-yellow-400" : "text-gray-300"}>
                    ★
                  </span>
                ))}
              </div>
              <span className="text-sm text-gray-600 ml-1">
                {agent.rating} ({agent.reviews} reviews)
              </span>
            </div>
          </div>
        </div>

        {/* Quick Contact Buttons */}
        <div className="grid grid-cols-3 gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2 border-green-200 hover:bg-green-50 bg-transparent"
          >
            <Phone className="h-4 w-4 text-green-600" />
            Call
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2 border-blue-200 hover:bg-blue-50 bg-transparent"
          >
            <Mail className="h-4 w-4 text-blue-600" />
            Email
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2 border-purple-200 hover:bg-purple-50 bg-transparent"
          >
            <MessageCircle className="h-4 w-4 text-purple-600" />
            Chat
          </Button>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Input
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="border-orange-200 focus:border-orange-400"
              />
            </div>
            <div>
              <Input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="border-orange-200 focus:border-orange-400"
              />
            </div>
          </div>

          <Input
            type="tel"
            placeholder="Your Phone Number"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="border-orange-200 focus:border-orange-400"
          />

          <Textarea
            placeholder="Your Message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="border-orange-200 focus:border-orange-400 min-h-[100px]"
          />

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3"
          >
            Send Message
          </Button>
        </form>

        {/* Schedule Tour Button */}
        <Button
          variant="outline"
          className="w-full border-2 border-orange-300 hover:bg-orange-50 text-orange-700 font-semibold py-3 bg-transparent"
        >
          <Calendar className="h-5 w-5 mr-2" />
          Schedule a Tour
        </Button>
      </CardContent>
    </Card>
  )
}
