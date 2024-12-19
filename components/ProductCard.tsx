import Image from "next/image";

interface ProductCardProps {
  image: string;
  title: string;
  category: string;
  price: string;
}

export default function ProductCard({
  image,
  title,
  category,
  price,
}: ProductCardProps) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
      <Image src={image} alt={title} width={300} height={300} />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-gray-500">{category}</p>
        <p className="text-gray-800 font-bold mt-2">${price}</p>
      </div>
    </div>
  );
}
