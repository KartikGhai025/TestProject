// // src/app/(public)/layout.tsx
// import Header from "@/components/layout/Header";
// import Navbar from "@/components/layout/Navbar";
// import Footer from "@/components/layout/Footer";

// export default function MainLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <div className="flex flex-col min-h-screen">
//       <Header />
//       <Navbar />
//       <main className="flex-1 container mx-auto p-4">{children}</main>
//       <Footer />
//     </div>
//   );
// }

import type React from "react"
import type { Metadata } from "next"
// import { GeistSans } from "geist/font/sans"
// import { GeistMono } from "geist/font/mono"
import "@/styles/globals.css"
import { DesktopNavigation } from "@/components/desktop-navigation"
import { MobileNavigation } from "@/components/mobile-navigation"
import { MobileTopBar } from "@/components/mobile-topbar"

export const metadata: Metadata = {
  title: "ProjectMe",
  description: "Created with love in India",
  generator: "Next.js",
}

export default function RootLayout({children,
}: Readonly<{
  children: React.ReactNode
}>) {


  return (
   
      <main>
        <div className="hidden md:block">
          <DesktopNavigation />
        </div>
        <div className="md:hidden">
          <MobileTopBar />
        </div>
        <main className="pt-16 md:pt-32 pb-24 md:pb-0">
          {children}
        </main>
        <div className="md:hidden">
          <MobileNavigation />
        </div>
      </main>
 
  )
}

