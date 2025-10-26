// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { motion } from "framer-motion";
// import { Home, Grid3X3, Store, Newspaper, User } from "lucide-react";

// const navItems = [
//   { href: "/home", label: "Home", icon: Home },
//   { href: "/categories", label: "Categories", icon: Grid3X3 },
//   { href: "/stores", label: "Stores", icon: Store },
//   { href: "/news", label: "News", icon: Newspaper },
//   { href: "/account", label: "Account", icon: User },
// ];

// export function MobileNavigation() {
//   const pathname = usePathname();

//   return (
//     <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 px-4 py-3">
//       <nav className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 rounded-full p-2 shadow-lg backdrop-blur-md border border-white/20">
//         <ul className="flex justify-around items-center">
//           {navItems.map((item) => {
//             const isActive = pathname === item.href;
//             const Icon = item.icon;

//             return (
//               <li key={item.href} className="relative w-full">
//                 <Link
//                   href={item.href}
//                   className="flex flex-col items-center justify-center py-2 px-3 rounded-2xl transition-all duration-300 group"
//                 >
//                   {isActive && (
//                     <motion.div
//                       layoutId="mobileActiveTab"
//                       className="absolute inset-0 bg-white/30 rounded-2xl shadow-lg"
//                       initial={false}
//                       transition={{ type: "spring", stiffness: 500, damping: 30 }}
//                     />
//                   )}
//                   <div className="relative z-10 flex flex-col items-center">
//                     <Icon
//                       className={`w-6 h-6 mb-1 transition-transform duration-200 ${
//                         isActive ? "text-white scale-110" : "text-white/70 group-hover:text-white"
//                       }`}
//                     />
//                     <span
//                       className={`text-xs font-medium transition-colors ${
//                         isActive ? "text-white" : "text-white/70 group-hover:text-white"
//                       }`}
//                     >
//                       {item.label}
//                     </span>
//                   </div>
//                 </Link>
//               </li>
//             );
//           })}
//         </ul>
//       </nav>
//     </div>
//   );
// }




//------------------------

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/home", label: "Home" },
  { href: "/categories", label: "Categories" },
  { href: "/stores", label: "Stores" },
  { href: "/news", label: "News" },
];

export function MobileNavigation() {
  const pathname = usePathname();

  return (
    <div className="md:hidden fixed bottom-4 left-4 right-4 z-50">
      <nav className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-1 shadow-lg">
        <ul className="flex justify-around">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <li key={item.href} className="flex-1">
                <Link
                  href={item.href}
                  className={`block text-center py-2 px-4 rounded-full font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-white text-purple-600 shadow-md"
                      : "text-white hover:bg-white/20"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
