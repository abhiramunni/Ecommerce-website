"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  discountPrice: number;
  taxRate: number;
  category: string;
  brand: string;
  sku: string;
  rating: number;
  totalReviews: number;
  paymentMethod: string;
  image: string;
}

interface AdPhoto {
  id: number;
  imageUrl: string;
}

export default function AddProductPage() {
  // -------------------- Product Form --------------------
  const [form, setForm] = useState({
    Name: "",
    Description: "",
    Price: "",
    DiscountPrice: "",
    TaxRate: "",
    Category: "",
    Brand: "",
    SKU: "",
    Rating: "",
    TotalReviews: "",
    PaymentMethod: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => formData.append(key, value));
      if (imageFile) formData.append("ImageFile", imageFile);

      const res = await fetch("https://localhost:7135/api/products", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setMessage("✅ Product added successfully!");
        setForm({
          Name: "",
          Description: "",
          Price: "",
          DiscountPrice: "",
          TaxRate: "",
          Category: "",
          Brand: "",
          SKU: "",
          Rating: "",
          TotalReviews: "",
          PaymentMethod: "",
        });
        setImageFile(null);
        fetchProducts();
      } else {
        let errorMessage = "Failed to add product";
        try {
          const text = await res.text();
          if (text) {
            const data = JSON.parse(text);
            errorMessage = data.error || errorMessage;
          }
        } catch {}
        setMessage(`❌ Error: ${errorMessage}`);
      }
    } catch (err: any) {
      setMessage("❌ Error: " + err.message);
    }

    setLoading(false);
  };

  // -------------------- Ad Photo Upload --------------------
  const [adPhotos, setAdPhotos] = useState<FileList | null>(null);
  const [adMessage, setAdMessage] = useState("");
  const [adLoading, setAdLoading] = useState(false);

  const handleAdPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setAdPhotos(e.target.files);
      setAdMessage("");
    }
  };

  const handleAdPhotoUpload = async () => {
    if (!adPhotos || adPhotos.length === 0) {
      setAdMessage("⚠️ Please select at least one photo.");
      return;
    }

    setAdLoading(true);
    setAdMessage("");

    const formData = new FormData();
    Array.from(adPhotos).forEach((file) => {
      formData.append("AdPhotos", file);
    });

    try {
      const res = await fetch("https://localhost:7135/api/Ads", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setAdMessage("✅ Ad photos uploaded successfully!");
        setAdPhotos(null);
        fetchAdPhotos();
      } else {
        setAdMessage("❌ Upload failed");
      }
    } catch (err: any) {
      setAdMessage("❌ Error: " + err.message);
    }

    setAdLoading(false);
  };

  // -------------------- Fetch all products and ads --------------------
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [adsList, setAdsList] = useState<AdPhoto[]>([]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("https://localhost:7135/api/products");
      setProductsList(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAdPhotos = async () => {
    try {
      const res = await axios.get("https://localhost:7135/api/Ads");
      setAdsList(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchAdPhotos();
  }, []);

  // -------------------- Delete Product --------------------
  const handleDeleteProduct = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`https://localhost:7135/api/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert("Failed to delete product");
    }
  };

  // -------------------- Delete Ad --------------------
  const handleDeleteAd = async (id: number) => {
    if (!confirm("Are you sure you want to delete this ad?")) return;
    try {
      await axios.delete(`https://localhost:7135/api/Ads/${id}`);
      fetchAdPhotos();
    } catch (err) {
      console.error(err);
      alert("Failed to delete ad");
    }
  };

  // -------------------- Categories --------------------
  const categories = [
    { name: "Body", icon: "🧴", subcategories: ["Cream", "Shampoo", "Soap", "Lotion"] },
    { name: "Devices", icon: "💻", subcategories: ["Laptops", "Desktops", "Headphones", "Smartphones"] },
    { name: "Pharmacy", icon: "💊", subcategories: ["Medicine", "Vitamins", "Supplements"] },
    { name: "Milk & Dairy", icon: "🥛", subcategories: ["Milk", "Cheese", "Yogurt"] },
    { name: "Doctor", icon: "🧑‍⚕️", subcategories: ["Consultation", "Online Appointment"] },
    { name: "Booking", icon: "📅", subcategories: ["Clinic Booking", "Lab Tests"] },
    { name: "Insurance", icon: "📄", subcategories: ["Health", "Life", "Vehicle"] },
    { name: "Lab", icon: "🔬", subcategories: ["Blood Test", "Pathology"] },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-cyan-50 to-cyan-100 flex flex-col items-center py-8 px-4 sm:px-6 space-y-10">

      {/* ---------- Add Product Form ---------- */}
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-3xl p-8 sm:p-10 border border-cyan-200 text-gray-900">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-cyan-800">
          Add New Product
        </h2>

        {message && (
          <div className={`mb-6 p-3 rounded text-center font-medium ${message.includes("❌") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5" encType="multipart/form-data">
          {/* Row 1 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input type="text" name="Name" placeholder="Product Name" value={form.Name} onChange={handleChange} required className="border border-cyan-300 bg-cyan-50 text-gray-900 p-3 rounded-lg w-full focus:ring-2 focus:ring-cyan-400 focus:outline-none" />
            <input type="text" name="SKU" placeholder="SKU" value={form.SKU} onChange={handleChange} className="border border-cyan-300 bg-cyan-50 text-gray-900 p-3 rounded-lg w-full focus:ring-2 focus:ring-cyan-400 focus:outline-none" />
          </div>

          <textarea name="Description" placeholder="Description" value={form.Description} onChange={handleChange} rows={3} className="border border-cyan-300 bg-cyan-50 text-gray-900 p-3 rounded-lg w-full focus:ring-2 focus:ring-cyan-400 focus:outline-none" />

          {/* Row 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input type="file" name="ImageFile" accept="image/*" onChange={handleFileChange} className="border border-cyan-300 bg-cyan-50 text-gray-900 p-2 rounded-lg w-full focus:ring-2 focus:ring-cyan-400 focus:outline-none" />
            <input type="number" name="Price" placeholder="Price" value={form.Price} onChange={handleChange} step="0.01" className="border border-cyan-300 bg-cyan-50 text-gray-900 p-3 rounded-lg w-full focus:ring-2 focus:ring-cyan-400 focus:outline-none" />
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input type="number" name="DiscountPrice" placeholder="Discount Price" value={form.DiscountPrice} onChange={handleChange} step="0.01" className="border border-cyan-300 bg-cyan-50 text-gray-900 p-3 rounded-lg w-full focus:ring-2 focus:ring-cyan-400 focus:outline-none" />
            <input type="number" name="TaxRate" placeholder="Tax Rate (%)" value={form.TaxRate} onChange={handleChange} step="0.01" className="border border-cyan-300 bg-cyan-50 text-gray-900 p-3 rounded-lg w-full focus:ring-2 focus:ring-cyan-400 focus:outline-none" />
            <input type="number" name="Rating" placeholder="Rating (1-5)" value={form.Rating} onChange={handleChange} min="0" max="5" step="0.1" className="border border-cyan-300 bg-cyan-50 text-gray-900 p-3 rounded-lg w-full focus:ring-2 focus:ring-cyan-400 focus:outline-none" />
          </div>

          {/* Row 4 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input type="number" name="TotalReviews" placeholder="Total Reviews" value={form.TotalReviews} onChange={handleChange} className="border border-cyan-300 bg-cyan-50 text-gray-900 p-3 rounded-lg w-full focus:ring-2 focus:ring-cyan-400 focus:outline-none" />
            
            {/* Category Dropdown */}
            <select
              name="Category"
              value={form.Category}
              onChange={handleChange}
              required
              className="border border-cyan-300 bg-cyan-50 text-gray-900 p-3 rounded-lg w-full focus:ring-2 focus:ring-cyan-400 focus:outline-none"
            >
              <option value="" disabled>Select Category & Subcategory</option>
              {categories.map((cat) => (
                <optgroup key={cat.name} label={`${cat.icon} ${cat.name}`}>
                  {cat.subcategories.map((sub) => (
                    <option key={sub} value={`${cat.name} > ${sub}`}>{sub}</option>
                  ))}
                </optgroup>
              ))}
            </select>

            <input type="text" name="Brand" placeholder="Brand" value={form.Brand} onChange={handleChange} className="border border-cyan-300 bg-cyan-50 text-gray-900 p-3 rounded-lg w-full focus:ring-2 focus:ring-cyan-400 focus:outline-none" />
          </div>

          <input type="text" name="PaymentMethod" placeholder="Payment Method" value={form.PaymentMethod} onChange={handleChange} className="border border-cyan-300 bg-cyan-50 text-gray-900 p-3 rounded-lg w-full focus:ring-2 focus:ring-cyan-400 focus:outline-none" />

          <button type="submit" disabled={loading} className="w-full py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-lg">
            {loading ? "Adding..." : "Add Product"}
          </button>
        </form>
      </div>

      {/* ---------- Ad Photo Upload ---------- */}
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-3xl p-8 sm:p-10 border border-cyan-200 text-gray-900">
        <h2 className="text-3xl font-bold mb-6 text-center text-cyan-800">
          Upload Ad Slider Images
        </h2>

        {adMessage && (
          <div className={`mb-6 p-3 rounded text-center font-medium ${adMessage.includes("❌") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
            {adMessage}
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <input type="file" multiple accept="image/*" onChange={handleAdPhotoChange} className="border border-cyan-300 bg-cyan-50 text-gray-900 p-2 rounded-lg w-full focus:ring-2 focus:ring-cyan-400 focus:outline-none" />
          <button onClick={handleAdPhotoUpload} disabled={adLoading} className="py-3 px-6 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white font-semibold rounded-xl shadow-md w-full sm:w-auto">
            {adLoading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </div>

      {/* ---------- Products List ---------- */}
      <div className="bg-white shadow-lg rounded-xl w-full max-w-5xl p-6 border border-cyan-200">
        <h2 className="text-2xl font-bold mb-4 text-cyan-800">All Products</h2>
        {productsList.length === 0 ? (
          <p>No products available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {productsList.map((p) => (
              <div key={p.id} className="border p-4 rounded-lg flex flex-col items-center">
                <img src={p.image} alt={p.name} className="w-full h-32 object-cover rounded mb-2" />
                <h3 className="font-semibold">{p.name}</h3>
                <p>${p.price.toFixed(2)}</p>
                <div className="flex gap-2 mt-2">
                  <button className="bg-yellow-400 text-white px-3 py-1 rounded">Update</button>
                  <button onClick={() => handleDeleteProduct(p.id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ---------- Ads List ---------- */}
      <div className="bg-white shadow-lg rounded-xl w-full max-w-5xl p-6 border border-cyan-200">
        <h2 className="text-2xl font-bold mb-4 text-cyan-800">All Ads</h2>
        {adsList.length === 0 ? (
          <p>No ads available.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {adsList.map((ad) => (
              <div key={ad.id} className="border p-2 rounded-lg flex flex-col items-center">
                <img src={`https://localhost:7135/${ad.imageUrl}`} alt={`Ad ${ad.id}`} className="w-full h-24 object-cover rounded mb-2" />
                <button onClick={() => handleDeleteAd(ad.id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
