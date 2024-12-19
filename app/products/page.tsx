import { client } from "@/sanity/lib/client";
import Image from "next/image";

// Define TypeScript interface for Product
interface Product {
  _id: string;
  title: string;
  price: number;
  imageUrl: string;
}

// Utility function to fetch products from Sanity CMS
const fetchProducts = async (): Promise<Product[]> => {
  const query = `*[_type == "product"]{
    _id,
    title,
    price,
    "imageUrl": image.asset->url
  }`;
  return await client.fetch(query);
};

export default async function ProductsPage() {
  const products = await fetchProducts();

  return (
    <div className="p-8">
      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-6">All Products</h1>
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product: Product) => (
          <div
            key={product._id}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition"
          >
            {/* Product Image */}
            <div className="relative w-full h-48 mb-4">
              <Image
                src={product.imageUrl}
                alt={product.title}
                layout="fill"
                objectFit="cover"
                className="rounded"
              />
            </div>
            {/* Product Title */}
            <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
            {/* Product Price */}
            <p className="text-gray-700">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
