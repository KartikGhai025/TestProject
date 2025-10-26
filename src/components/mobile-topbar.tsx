"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, User, ShoppingBag, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function MobileTopBar() {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 backdrop-blur-md border-b border-white/20 shadow-lg">
      <div className="px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/home" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Sparkles className="w-6 h-6 text-violet-600 relative z-10" />
          </div>
          <span className="text-lg font-bold text-white drop-shadow-lg">
            ProjectMe
          </span>
        </Link>

        {/* Search Bar */}
        <div className="flex-1 mx-2 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/70" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-3 py-2 w-full rounded-full border border-white/30 bg-white/20 backdrop-blur-md text-white placeholder-white/70 focus:outline-none focus:ring-1 focus:ring-white/50 focus:border-transparent transition"
          />
        </div>

        {/* Account Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full p-2 bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30 transition"
            >
              <User className="w-5 h-5 text-white" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 bg-white/95 backdrop-blur-md">
            <DropdownMenuItem asChild>
              <Link href="/account">My Account</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Sign Out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
