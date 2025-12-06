"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Sparkles } from "lucide-react";

export  function SecondaryHeader() {
  const router = useRouter();
  const [showNav, setShowNav] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);

  // Same hide-on-scroll behavior as home
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > lastScroll && currentScroll > 80) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }
      setLastScroll(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  const handleBack = () => {
    // Try to go back, if not possible go to /home
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/home");
    }
  };

   return (
      <>
        <div
          className={`w-full fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
            showNav ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          {/* Gradient background with blur */}
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 opacity-95 backdrop-blur-md"></div>
  
          <div className="relative max-w-7xl mx-auto px-6">
            {/* Main Navigation Bar */}
            <div className="flex items-center justify-between h-24">
              {/* Logo */}
                 <button
              type="button"
              onClick={handleBack}
              className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/15 border border-white/30 text-white text-sm font-medium shadow-lg hover:bg-white/25 transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
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
  
          
  
           
            </div>
  
        
          </div>
        </div>
  
        {/* Spacer for fixed navbar */}
        <div className="h-[5rem]"></div>
      </>
    );
  return (
    <>
      <div
        className={`w-full fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
          showNav ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {/* Gradient background with blur */}
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 opacity-95 backdrop-blur-md" />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Back button */}
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/15 border border-white/30 text-white text-sm font-medium shadow-lg hover:bg-white/25 transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            {/* Brand center */}
            <Link href="/home" className="flex flex-col items-center group">
              <div className="w-11 h-11 bg-white rounded-2xl flex items-center justify-center shadow-2xl relative overflow-hidden group-hover:scale-110 transition-transform duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Sparkles className="w-6 h-6 text-violet-600 relative z-10" />
              </div>
              <span className="mt-1 text-base font-black text-white drop-shadow">
                ProjectMe
              </span>
              <span className="text-[10px] text-white/80 font-medium">
                Shop Smart, Live Better
              </span>
            </Link>

            {/* Right side empty to keep layout balanced */}
            <div className="w-[96px]" />
          </div>
        </div>
      </div>

      {/* Spacer for fixed navbar */}
      <div className="h-[5.5rem]" />
    </>
  );
}
