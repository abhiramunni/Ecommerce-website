"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

type Product = {
  id?: number;
  name: string;
  price: string;
  image: string;
  rating: string;
  badge?: string;
};

export default function AdminDashboard() {
  const API_BASE = "https://localhost:7135/api"; // change if needed

  const [products, setProducts] = useState<Product[]>([]);
  const [heroAds, setHeroAds] = useState<string[]>([]);
  const [newProduct, setNewProduct] = useState<Product>({
    name: "",
    price: "",
    image: "",
    rating: "",
    badge: "",
  });
  const [newAdUrl, setNewAdUrl] = useState("");
  const [message, setMessage] = useState("");

  // Fetch existing products & ads
  useEffect(() => {
    // Example: fetch products from API (replace with your endpoint)
    axios.get(`${API_BASE}/Products`).then((res) => setProducts(res.data));
    // Example: fetch hero ads from API
    axios.get(`${API_BASE}/HeroAds`).then((res) => setHeroAds(res.data));
  }, []);

  // Add new product
  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      setMessage("Name, Price, and Image are required");
      return;
    }
    try {
      await axios.post(`${API_BASE}/Products`, newProduct);
      setProducts([...products, newProduct]);
      setNewProduct({ name: "", price: "", image: "", rating: "", badge: "" });
      setMessage("Product added successfully");
    } catch (err: any) {
      setMessage(err.response?.data || "Error adding product");
    }
  };

  // Add new hero ad
  const handleAddAd = async () => {
    if (!newAdUrl) {
      setMessage("Ad URL is required");
      return;
    }
    try {
      await axios.post(`${API_BASE}/HeroAds`, { url: newAdUrl });
      setHeroAds([...heroAds, newAdUrl]);
      setNewAdUrl("");
      setMessage("Ad added successfully");
    } catch (err: any) {
      setMessage(err.response?.data || "Error adding ad");
    }
  };

  // Delete product
  const handleDeleteProduct = async (id?: number) => {
    if (!id) return;
    try {
      await axios.delete(`${API_BASE}/Products/${id}`);
      setProducts(products.filter((p) => p.id !== id));
      setMessage("Product deleted successfully");
    } catch (err: any) {
      setMessage(err.response?.data || "Error deleting product");
    }
  };

  // Delete hero ad
  const handleDeleteAd = async (url: string) => {
    try {
      await axios.delete(`${API_BASE}/HeroAds`, { data: { url } });
      setHeroAds(heroAds.filter((ad) => ad !== url));
      setMessage("Ad deleted successfully");
    } catch (err: any) {
      setMessage(err.response?.data || "Error deleting ad");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {message && <p className="mb-4 text-red-500 font-medium">{message}</p>}

      {/* ---------- Add New Product ---------- */}
      <section className="mb-6 bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Add New Product</h2>
        <div className="grid gap-2 md:grid-cols-2">
          <input
            type="text"
            placeholder="Name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            className="border rounded px-2 py-1"
          />
          <input
            type="text"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            className="border rounded px-2 py-1"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newProduct.image}
            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
            className="border rounded px-2 py-1"
          />
          <input
            type="text"
            placeholder="Rating"
            value={newProduct.rating}
            onChange={(e) => setNewProduct({ ...newProduct, rating: e.target.value })}
            className="border rounded px-2 py-1"
          />
          <input
            type="text"
            placeholder="Badge (optional)"
            value={newProduct.badge}
            onChange={(e) => setNewProduct({ ...newProduct, badge: e.target.value })}
            className="border rounded px-2 py-1"
          />
        </div>
        <button
          onClick={handleAddProduct}
          className="mt-2 px-4 py-2 bg-cyan-500 text-white rounded hover:bg-cyan-600"
        >
          Add Product
        </button>
      </section>

      {/* ---------- Add New Hero Ad ---------- */}
      <section className="mb-6 bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Add Hero Ad</h2>
        <input
          type="text"
          placeholder="Ad Image URL"
          value={newAdUrl}
          onChange={(e) => setNewAdUrl(e.target.value)}
          className="border rounded px-2 py-1 w-full mb-2"
        />
        <button
          onClick={handleAddAd}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Add Ad
        </button>
      </section>

      {/* ---------- Existing Products ---------- */}
      <section className="mb-6 bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Existing Products</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {products.map((p) => (
            <div key={p.id} className="border rounded p-2 flex justify-between items-center">
              <div>
                <p className="font-medium">{p.name}</p>
                <p>${p.price}</p>
              </div>
              <button
                onClick={() => handleDeleteProduct(p.id)}
                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Existing Hero Ads ---------- */}
      <section className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Existing Hero Ads</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {heroAds.map((ad, idx) => (
            <div key={idx} className="border rounded p-2 flex justify-between items-center">
              <img src={ad} alt={`Ad ${idx + 1}`} className="h-24 object-cover" />
              <button
                onClick={() => handleDeleteAd(ad)}
                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
