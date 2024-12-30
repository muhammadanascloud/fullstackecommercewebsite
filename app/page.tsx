import { client } from "@/sanity/lib/client";
import ProductCard from "@/components/ProductCard";

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
          <ProductCard
          key={product._id}
          id={product._id}
          image={product.imageUrl}
          title={product.title}
          price={product.price} // Pass price as a number
          />
        ))}
      </div>
    </div>
  );
}
