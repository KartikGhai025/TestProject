"use client";

import { useState } from "react";
import Link from "next/link";
import { Bell, Heart, Search, User, ShoppingBag, Sparkles } from "lucide-react";

const navLinks = [
  { href: "/home", label: "Home" },
  { href: "/categories", label: "Categories" },
  { href: "/stores", label: "Stores" },
  { href: "/news", label: "News" },
];

export  function DesktopNavigation() {
  const [activeLink, setActiveLink] = useState("/home");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <>
      <div className="w-full fixed top-0 left-0 right-0 z-50">
        {/* Gradient background with blur */}
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 opacity-95 backdrop-blur-md"></div>

        <div className="relative max-w-7xl mx-auto px-6">
          {/* Main Navigation Bar */}
          <div className="flex items-center justify-between h-24">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group z-10">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Sparkles className="w-7 h-7 text-violet-600 relative z-10" />
              </div>
              <div>
                <span className="block text-2xl font-black text-white drop-shadow-lg">
                  ProjectMe
                </span>
                <span className="block text-xs text-white/80 font-medium -mt-1">
                  Shop Smart, Live Better
                </span>
              </div>
            </Link>

            {/* Center Navigation */}
            <nav className="hidden lg:flex items-center gap-2 bg-white/20 backdrop-blur-xl rounded-full p-2 shadow-lg border border-white/30">
              {navLinks.map((link) => {
                const isActive = activeLink === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 ${
                      isActive
                        ? "bg-white text-violet-600 shadow-xl"
                        : "text-white hover:bg-white/30"
                    }`}
                    onClick={() => setActiveLink(link.href)}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right Section */}
            <div className="flex items-center gap-4 z-10">
              {/* Icon Buttons */}
              <button className="relative p-3 bg-white/20 backdrop-blur-md hover:bg-white/30 rounded-full transition-all duration-300 group border border-white/30">
                <Bell className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  <span className="text-white text-xs font-black">3</span>
                </div>
              </button>

              <button className="relative p-3 bg-white/20 backdrop-blur-md hover:bg-white/30 rounded-full transition-all duration-300 group border border-white/30">
                <Heart className="w-5 h-5 text-white group-hover:scale-110 transition-all" />
              </button>

              <button className="relative p-3 bg-white/20 backdrop-blur-md hover:bg-white/30 rounded-full transition-all duration-300 group border border-white/30">
                <ShoppingBag className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-xs font-black">2</span>
                </div>
              </button>

              <Link
                href="/account"
                className="p-3 bg-white/20 backdrop-blur-md hover:bg-white/30 rounded-full transition-all duration-300 group border border-white/30"
              >
                <User className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Search Bar Below */}
          <div className="pb-6 mt-4 lg:mt-6">
            <div
              className={`relative transition-all duration-300 ${
                isSearchFocused ? "scale-[1.01]" : ""
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-white/20 rounded-2xl blur-xl"></div>
              <div className="relative flex items-center">
                <Search
                  className={`absolute left-5 w-5 h-5 transition-all duration-300 ${
                    isSearchFocused ? "text-violet-600" : "text-white/70"
                  }`}
                />
                <input
                  type="text"
                  placeholder="What are you looking for today?"
                  className="w-full pl-14 pr-6 py-4 bg-white/90 backdrop-blur-md border-2 border-white/50 rounded-2xl focus:outline-none focus:border-white focus:bg-white transition-all text-gray-800 placeholder-gray-500 font-medium shadow-2xl"
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                />
                <button className="absolute right-3 px-6 py-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer for fixed navbar */}
      <div className="h-[11rem]"></div>
    </>
  );
}
