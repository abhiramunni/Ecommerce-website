"use client";
import { useEffect, useState } from "react";

export default function ProductCategories() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log("Fetching products...");
        const res = await fetch("http://localhost:7135/api/Products");

        console.log("Response status:", res.status);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data = await res.json();
        console.log("Fetched data:", data);

        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(err.message);
      }
    };

    fetchProducts();
  }, []);

  if (error) {
    return (
      <p className="text-center text-red-500 mt-6">
        ⚠️ Failed to load products: {error}
      </p>
    );
  }

  if (!products.length)
    return <p className="text-center text-gray-500 mt-6">Loading products...</p>;

  // Group products by category
  const grouped = products.reduce((acc, p) => {
    const category = p.category;
    if (!acc[category]) acc[category] = [];
    acc[category].push(p);
    return acc;
  }, {});

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Product Categories</h1>
      {Object.entries(grouped).map(([category, items]) => (
        <div key={category} className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">{category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {items.map((product) => (
              <div key={product.id} className="p-4 border rounded-xl shadow">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded-lg mb-3"
                />
                <h3 className="text-lg font-bold">{product.name}</h3>
                <p>₹{product.discountPrice}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
