"use client";

import React from "react";
import Image from "next/image";
import AddToCartButton from "./AddToCartButton";

interface ProductCardProps {
  id: string;
  image: string;
  title: string;
  price: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  image,
  title,
  price,
}) => {
  const item = {
    id: `${id}-${Date.now()}`, // Unique ID for each cart item
    productId: id,
    title,
    image,
    price,
    quantity: 1,
  };

  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
      <Image
        src={image}
        alt={title}
        width={300}
        height={300}
        className="w-full h-auto"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-gray-800 font-bold mt-2">${price}</p>
        <div className="mt-4">
          <AddToCartButton item={item} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
