"use client";

import React from "react";
import Image from "next/image";

interface ProductCardProps {
  id: string;
  title: string;
  price: number; // Expecting a number for proper formatting
  image: string;
}

export default function ProductCard({
  id,
  title,
  price,
  image,
}: ProductCardProps) {
  const userId = "guest_123"; // Hardcoded userId for demo purposes

  const handleAddToCart = async () => {
    try {
      await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          productId: id,
          productName: title,
          productPrice: price, // Send price as a number
          quantity: 1,
        }),
      });
      alert("Item added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
      {/* Display Product Image */}
      <Image
        src={image}
        alt={title}
        width={300}
        height={300}
        className="w-full h-auto"
      />

      <div className="p-4">
        {/* Display Product Title */}
        <h2 className="text-lg font-semibold">{title}</h2>

        {/* Display Price */}
        <p className="text-gray-800 font-bold mt-2">${price.toFixed(2)}</p>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="bg-blue-500 text-white px-4 py-2 mt-4 rounded hover:bg-blue-600"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
