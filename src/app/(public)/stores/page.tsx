"use client"

import React from "react"
import Link from "next/link"
import { Store } from "lucide-react"

interface StoreItem {
  id: string
  name: string
  category: string
  logo?: string
  description?: string
}

// Dummy data — replace with your backend/API later
const stores: StoreItem[] = [
  { id: "1", name: "Fresh Mart", category: "Grocery", logo: "https://fastly.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI" },
  { id: "2", name: "Tech Hub", category: "Electronics", logo: "https://fastly.picsum.photos/id/49/1280/792.jpg?hmac=NnUJy0O9-pXHLmY2loqVs2pJmgw9xzuixgYOk4ALCXU" },
  { id: "3", name: "Fashion Point", category: "Clothing", logo: "https://fastly.picsum.photos/id/57/2448/3264.jpg?hmac=ewraXYesC6HuSEAJsg3Q80bXd1GyJTxekI05Xt9YjfQ" },
  { id: "4", name: "Book World", category: "Books", logo: "https://fastly.picsum.photos/id/17/2500/1667.jpg?hmac=HD-JrnNUZjFiP2UZQvWcKrgLoC_pc_ouUSWv8kHsJJY" },
]

export default function StoresPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Stores</h1>

      {stores.length === 0 ? (
        <div className="text-center py-20 bg-white/80 rounded-2xl shadow">
          <Store className="w-12 h-12 mx-auto text-gray-400 mb-2" />
          <p className="text-gray-600">No stores found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stores.map((store) => (
            <Link
              key={store.id}
              href={`/stores/${store.id}`}
              className="bg-white rounded-2xl shadow hover:shadow-md transition overflow-hidden flex flex-col"
            >
              <div className="w-full h-40 bg-gray-100 flex items-center justify-center">
                {store.logo ? (
                  <img
                    src={store.logo}
                    alt={store.name}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <Store className="w-12 h-12 text-gray-400" />
                )}
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <h2 className="font-semibold text-lg text-gray-800 mb-1">{store.name}</h2>
                <p className="text-gray-500 text-sm mb-2">{store.category}</p>
                <p className="text-gray-600 text-sm line-clamp-3">
                  {store.description || "No description available."}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  )
}
