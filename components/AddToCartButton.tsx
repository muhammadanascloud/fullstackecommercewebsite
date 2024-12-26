"use client";

import React from "react";
import { useAuth } from "@/context/AuthContext";

interface AddToCartButtonProps {
  item: {
    productId: string;
    quantity: number;
  };
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ item }) => {
  const { currentUser } = useAuth();

  const handleAddToCart = async () => {
    if (!currentUser) {
      alert("Please log in to add items to the cart!");
      return;
    }

    const res = await fetch("/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: currentUser.uid,
        productId: item.productId,
        quantity: item.quantity,
      }),
    });

    if (res.ok) {
      alert("Item added to cart!");
    } else {
      alert("Failed to add item to cart.");
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
      Add to Cart
    </button>
  );
};

export default AddToCartButton;
