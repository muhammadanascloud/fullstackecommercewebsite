"use client";

import React, { useState } from "react";

interface RemoveFromCartButtonProps {
  cartItemId: string;
  onRemove: (id: string) => void; // Callback function to update UI
}

const RemoveFromCartButton: React.FC<RemoveFromCartButtonProps> = ({
  cartItemId,
  onRemove,
}) => {
  const [loading, setLoading] = useState(false);

  const handleRemove = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/cart", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cartItemId }),
      });

      if (!response.ok) throw new Error("Failed to remove item.");
      onRemove(cartItemId); // Update cart UI after successful deletion
    } catch (error) {
      console.error("Error removing item:", error);
      alert("Error removing item.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleRemove}
      disabled={loading}
      className={`bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ${
        loading ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {loading ? "Removing..." : "Remove"}
    </button>
  );
};

export default RemoveFromCartButton;
