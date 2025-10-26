"use client"

import React from "react"
import Link from "next/link"
import { ShoppingBag, Heart, User, Globe, Mail } from "lucide-react"

const categories = [
  { name: "Grocery", icon: ShoppingBag },
  { name: "Fashion", icon: Heart },
  { name: "Electronics", icon: Globe },
  { name: "Books", icon: Mail },
]

const featuredStores = [
  { name: "Fresh Mart", img: "https://fastly.picsum.photos/id/37/2000/1333.jpg?hmac=vpYLNsQZwU2szsZc4Uo17cW786vR0GEUVq4icaKopQI" },
  { name: "Tech Hub", img: "https://fastly.picsum.photos/id/36/4179/2790.jpg?hmac=OCuYYm0PkDCMwxWhrtoSefG5UDir4O0XCcR2x-aSPjs" },
  { name: "Fashion Point", img: "https://fastly.picsum.photos/id/42/3456/2304.jpg?hmac=dhQvd1Qp19zg26MEwYMnfz34eLnGv8meGk_lFNAJR3g" },
]

const testimonials = [
  { name: "Anita S.", feedback: "ProjectMe helped me find local stores and deals easily!" },
  { name: "Rohit K.", feedback: "Great platform for discovering services in my city!" },
]

const blogPosts = [
  { title: "Top 10 stores to visit this month", img: "https://fastly.picsum.photos/id/57/2448/3264.jpg?hmac=ewraXYesC6HuSEAJsg3Q80bXd1GyJTxekI05Xt9YjfQ" },
  { title: "How to shop smart online", img: "https://fastly.picsum.photos/id/58/1280/853.jpg?hmac=YO3QnOm9TpyM5DqsJjoM4CHg8oIq4cMWLpd9ALoP908" },
]

export default function HomePage() {
  return (
    <main className="bg-gray-50">

      {/* Hero Banner */}
      <section className="relative bg-gradient-to-r from-purple-600 to-pink-500 text-white h-[600px] flex items-center justify-center">
        <div className="text-center max-w-3xl px-4">
          <h1 className="text-5xl font-bold mb-4">Discover Everything in Your City</h1>
          <p className="text-lg mb-6">ProjectMe connects you with local stores, services, NGOs, and opportunities around you.</p>
          <Link
            href="/stores"
            className="px-8 py-4 bg-white text-purple-600 font-bold rounded-full shadow-lg hover:shadow-2xl transition"
          >
            Explore Stores
          </Link>
        </div>
        <img
          src="https://fastly.picsum.photos/id/45/4592/2576.jpg?hmac=Vc7_kMYufvy96FxocZ1Zx6DR1PNsNQXF4XUw1mZ2dlc"
          alt="Hero"
          className="absolute bottom-0 right-0 w-1/3 rounded-tl-3xl hidden lg:block object-cover"
        />
      </section>

      {/* Categories */}
      <section className="py-16">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-7xl mx-auto px-4">
          {categories.map((cat) => (
            <div key={cat.name} className="bg-white rounded-2xl shadow p-6 flex flex-col items-center hover:shadow-lg transition">
              <cat.icon className="w-10 h-10 mb-3 text-purple-600" />
              <span className="font-semibold text-gray-700">{cat.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Stores */}
      <section className="py-16 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Featured Stores</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4">
          {featuredStores.map((store) => (
            <Link key={store.name} href="/stores" className="bg-white rounded-2xl shadow hover:shadow-lg overflow-hidden transition flex flex-col">
              <img src={store.img} alt={store.name} className="h-48 w-full object-cover" />
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800">{store.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Special Offers / Deals */}
      <section className="py-16">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Special Deals</h2>
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((deal) => (
            <div key={deal} className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition">
              <img
                src="https://fastly.picsum.photos/id/43/1280/831.jpg?hmac=glK-rQ0ppFClW-lvjk9FqEWKog07XkOxJf6Xg_cU9LI"
                alt="Deal"
                className="h-40 w-full object-cover rounded-xl mb-4"
              />
              <h3 className="font-semibold text-gray-800 mb-2">50% off on Electronics</h3>
              <p className="text-gray-500 text-sm">Limited time offer. Grab your favorite products now!</p>
            </div>
          ))}
        </div>
      </section>

      {/* NGOs / Social Section */}
      <section className="py-16 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">NGOs & Social Groups</h2>
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((ngo) => (
            <div key={ngo} className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition">
              <h3 className="font-bold text-lg text-gray-800 mb-2">Helping Hands NGO</h3>
              <p className="text-gray-500 text-sm">We help the underprivileged in our city with food and education.</p>
            </div>
          ))}
        </div>
      </section>

      {/* Jobs Section */}
      <section className="py-16">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Jobs & Opportunities</h2>
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4].map((job) => (
            <div key={job} className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition">
              <h3 className="font-bold text-gray-800 mb-1">Software Developer</h3>
              <p className="text-gray-500 text-sm mb-2">Full-time · Remote · 3+ years experience</p>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition">
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-purple-50">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">What People Say</h2>
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-white rounded-2xl shadow p-6 hover:shadow-md transition">
              <p className="text-gray-700 italic mb-4">"{t.feedback}"</p>
              <p className="font-bold text-gray-800">{t.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Blog / News */}
      <section className="py-16">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Latest Articles</h2>
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <Link key={post.title} href="/news" className="bg-white rounded-2xl shadow hover:shadow-md overflow-hidden transition">
              <img src={post.img} alt={post.title} className="h-48 w-full object-cover" />
              <div className="p-4">
                <h3 className="font-bold text-gray-800">{post.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-2xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Subscribe to our Newsletter</h2>
          <p className="text-gray-500 mb-6">Get updates on new stores, deals, and events in your city.</p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <input
              type="email"
              placeholder="Your email"
              className="px-4 py-3 rounded-full w-full sm:w-auto flex-grow border border-gray-300 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition"
            />
            <button className="px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-purple-600 text-white py-10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <h3 className="font-bold mb-2 text-lg">ProjectMe</h3>
            <p>Connecting your city like never before. Discover stores, services, NGOs, and more.</p>
          </div>
          <div>
            <h3 className="font-bold mb-2 text-lg">Quick Links</h3>
            <ul>
              <li><Link href="/stores" className="hover:underline">Stores</Link></li>
              <li><Link href="/news" className="hover:underline">News</Link></li>
              <li><Link href="/categories" className="hover:underline">Categories</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2 text-lg">Contact</h3>
            <p>Email: contact@projectme.com</p>
            <p>Phone: +91 1234567890</p>
          </div>
        </div>
        <p className="text-center mt-6 text-sm">© 2025 ProjectMe. All rights reserved.</p>
      </footer>

    </main>
  )
}
