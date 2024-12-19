"use client";

import Link from "next/link";
import { ShoppingCart, Search } from "lucide-react";

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
            <Link href="/female" className="hover:text-gray-600">
              Female
            </Link>
          </li>
          <li>
            <Link href="/male" className="hover:text-gray-600">
              Male
            </Link>
          </li>
          <li>
            <Link href="/kids" className="hover:text-gray-600">
              Kids
            </Link>
          </li>
          <li>
            <Link href="/products" className="hover:text-gray-600">
              All Products
            </Link>
          </li>
        </ul>
      </nav>

      {/* Search Bar and Cart Icon */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="border rounded px-2 py-1"
          />
          <Search className="absolute right-2 top-2 text-gray-400" size={16} />
        </div>
        <Link href="/cart" className="relative">
          <ShoppingCart size={24} />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
            0
          </span>
        </Link>
      </div>
    </header>
  );
}
