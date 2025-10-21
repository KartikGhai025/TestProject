import Link from "next/link";
export default function Navbar() {
  return (
    <nav className="bg-blue-500 text-white p-2 flex space-x-4">
      <Link href="/">Home</Link>
      <Link href="/news">News</Link>
    </nav>
  );
}