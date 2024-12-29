// app/cart/page.tsx
"use client"; // Mark this file as a client component
import React, { useState, useEffect } from "react";

export default function CartPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Hardcoded userId for demonstration
  const userId = "guest_123"; 

  const fetchCart = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/cart?userId=${userId}`);
      const data = await res.json();
      setItems(data.items || []);
    } catch (error) {
      console.error("Failed to fetch cart", error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    try {
      await fetch("/api/cart", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, productId, quantity }),
      });
      fetchCart();
    } catch (error) {
      console.error("Error updating quantity", error);
    }
  };

  const removeItem = async (productId: string) => {
    try {
      await fetch("/api/cart", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, productId }),
      });
      fetchCart();
    } catch (error) {
      console.error("Error removing item", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  if (loading) return <p>Loading cart...</p>;

  const totalPrice = items.reduce((acc, item) => acc + (item.productPrice * item.quantity), 0);

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.productId}
              className="flex items-center justify-between border p-4"
            >
              <div>
                <p className="font-semibold">{item.productName}</p>
                <p>${(item.productPrice / 100).toFixed(2)}</p>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() =>
                    updateQuantity(item.productId, item.quantity - 1)
                  }
                  disabled={item.quantity <= 1}
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() =>
                    updateQuantity(item.productId, item.quantity + 1)
                  }
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  +
                </button>
                <button
                  onClick={() => removeItem(item.productId)}
                  className="text-red-500 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="text-right font-semibold">
            Total: ${(totalPrice / 100).toFixed(2)}
          </div>
        </div>
      )}
    </main>
  );
}
