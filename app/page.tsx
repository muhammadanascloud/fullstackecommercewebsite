import { client } from "@/sanity/lib/client";
import Image from "next/image";

interface Product {
  _id: string;
  title: string;
  price: number;
  imageUrl: string;
}

const fetchProducts = async (): Promise<Product[]> => {
  // GROQ Query: Fetch all products with id, title, price, and image URL
  const query = `*[_type == "product"]{
    _id,
    title,
    price,
    "imageUrl": image.asset->url
  }`;
  const products = await client.fetch(query);
  return products;
};

export default async function Home() {
  const products = await fetchProducts();

  return (
    <div className="p-8">
      {/* Hero Section */}
      <section className="mb-10 text-center">
        <h1 className="text-4xl font-bold mb-4">
          An Industrial Take on Streetwear
        </h1>
        <p className="text-gray-600 mb-6">
          Anyone can beat you but no one can beat your outfit as long as you
          wear Dine outfits.
        </p>
        <button className="bg-black text-white px-6 py-2 rounded-md">
          Start Shopping
        </button>
      </section>

      {/* Product Grid */}
      <section>
        <h2 className="text-3xl font-bold mb-6">Check What We Have</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="border rounded-lg p-4 shadow hover:shadow-lg transition"
            >
              {/* Product Image Wrapper */}
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
              <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
              {/* Product Price */}
              <p className="text-gray-700">${product.price}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
