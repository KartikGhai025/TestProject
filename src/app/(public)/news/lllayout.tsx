// src/app/(public)/news/layout.tsx
"use client"; // only needed if using hooks (Zustand, useState, etc.)

import React from "react";

export default function NewsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
     
  
      <div>{children}</div>
    </div>
  );
}
