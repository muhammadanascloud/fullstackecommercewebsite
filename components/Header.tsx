"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const { currentUser, logOut } = useAuth();

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

      {/* Authentication and Cart */}
      <div className="flex items-center gap-4">
        {currentUser ? (
          <>
            {/* Display logged-in user's email */}
            <span>Welcome, {currentUser.email}</span>
            {/* Logout Button */}
            <button
              onClick={logOut}
              className="bg-red-500 px-2 py-1 text-white rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            {/* Login Link */}
            <Link href="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
            {/* Sign-Up Link */}
            <Link href="/signup" className="text-blue-500 hover:underline">
              Sign-Up
            </Link>
          </>
        )}
        {/* Cart Icon */}
        <Link href="/cart" className="relative">
          <ShoppingCart size={24} />
        </Link>
      </div>
    </header>
  );
}
