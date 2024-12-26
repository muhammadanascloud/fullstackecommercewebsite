"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export default function CartPage() {
  const { currentUser } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const fetchCart = async () => {
      if (!currentUser) return;
      try {
        const res = await fetch(`/api/cart?userId=${currentUser.uid}`);
        const data = await res.json();

        console.log("API response data:", data); // <-- Log API response
        setCartItems(data);
      } catch (error) {
        console.error("Error fetching cart items:", error); // <-- Log errors
      }
    };

    fetchCart();
  }, [currentUser]);

  if (!currentUser) {
    return <p>Please log in to view your cart.</p>;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Your Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty. Add some products!</p>
      ) : (
        <div className="grid gap-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center border p-4 rounded-lg shadow hover:shadow-lg"
            >
              <Image
                src={item.image}
                alt={item.name}
                width={100}
                height={100}
                className="rounded"
              />
              <div className="flex-1 px-4">
                <p className="text-lg font-semibold">{item.name}</p>
                <p className="text-gray-600">Price: ${item.price}</p>
                <p className="text-gray-600">Quantity: {item.quantity}</p>
                <p className="text-gray-800 font-bold">
                  Total: ${item.price * item.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
