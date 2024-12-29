"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-between items-center px-8 py-4 border-b">
      {/* Logo */}
      <Link href="/" className="text-2xl font-bold">
        Dine <span className="text-gray-500">Market</span>
      </Link>

      {/* Navigation Links */}
      <nav>
        <ul className="flex gap-6">
          <li>
            <Link href="/products" className="hover:text-gray-600">
              All Products
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
