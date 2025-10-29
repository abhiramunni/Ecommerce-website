"use client";

import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  discountPrice: number;
  taxRate: number;
  category: string;
  brand: string;
  sku: string;
  rating: number;
  totalReviews: number;
  paymentMethod: string;
}

interface AdPhoto {
  id: number;
  imageUrl: string;
}

const categories = [
  { name: "Hair Care", subcategories: ["Shampoo", "Conditioner", "Hair Oil", "Hair Mask"] },
  { name: "Home Health Care", subcategories: ["Thermometers", "Oximeters", "Blood Pressure Monitors"] },
  { name: "Makeup and Accessories", subcategories: ["Lipsticks", "Foundation", "Brushes", "Eyeliners"] },
  { name: "Medicine and Treatment", subcategories: ["Pain Relief", "Cold & Flu", "Digestive Health"] },
  { name: "Mum and Baby", subcategories: ["Baby Food", "Diapers", "Baby Lotion"] },
  { name: "Personal Care", subcategories: ["Soap", "Lotion", "Deodorant"] },
  { name: "Skin Care", subcategories: ["Face Wash", "Moisturizer", "Serums"] },
  { name: "Vitamins & Healthy Nutrition", subcategories: ["Multivitamins", "Proteins", "Supplements"] },
  { name: "Al-Dawaa Plus", subcategories: ["Membership Benefits", "Coupons"] },
  { name: "Offers", subcategories: ["Daily Deals", "Seasonal Offers", "Clearance Sale"] },
];

export default function AlDawaaClone() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [cart, setCart] = useState<{ id: number; name: string; price: number; qty: number }[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [adPhotos, setAdPhotos] = useState<AdPhoto[]>([]);
  const [adLoading, setAdLoading] = useState(true);
  const [hoveredCategoryIndex, setHoveredCategoryIndex] = useState<number | null>(null);

  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 800,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: true,
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch("https://localhost:7135/api/products");
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      const data: Product[] = await res.json();
      setProducts(data.sort((a, b) => b.id - a.id));
      setError(null);
    } catch (err: any) {
      console.error("Failed to fetch products:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchAdPhotos = async () => {
    try {
      const res = await axios.get("https://localhost:7135/api/Ads");
      setAdPhotos(res.data);
    } catch (err: any) {
      console.error("Failed to fetch ad photos:", err.message);
    } finally {
      setAdLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchAdPhotos();
  }, []);

  // Hide dropdown when scrolling
  useEffect(() => {
    const handleScroll = () => {
      setHoveredCategoryIndex(null);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) return prev.map((p) => (p.id === product.id ? { ...p, qty: p.qty + 1 } : p));
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const handleToggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]));
  };

  const handleRemoveFromCart = (id: number) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 overflow-x-hidden">
      {/* Top Menu / Category Dropdown */}
      <section className="bg-[#003366] shadow px-2 sm:px-4 py-3 sticky top-0 z-50">
        <div className="flex justify-center gap-[50px] items-center relative">
          {/* Categories Dropdown */}
          <div
            className="relative font-sans"
            onMouseEnter={() => {
              if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
              setHoveredCategoryIndex(0);
            }}
            onMouseLeave={() => {
              closeTimeoutRef.current = setTimeout(() => setHoveredCategoryIndex(null), 1500);
            }}
          >
            {/* Categories Button */}
            <button className="px-6 py-3 flex items-center gap-2 rounded-md hover:bg-gradient-to-r from-[#004080] to-[#0066cc] transition text-white font-semibold shadow-lg text-lg">
              Categories
            </button>

            {/* First-level categories */}
            {hoveredCategoryIndex !== null && (
              <ul className="absolute top-full left-0 mt-2 bg-white text-gray-900 rounded-lg shadow-xl min-w-[240px] border border-gray-200">
                {categories.map((cat, i) => (
                  <li
                    key={i}
                    className="relative"
                    onMouseEnter={() => {
                      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
                      setHoveredCategoryIndex(i);
                    }}
                    onMouseLeave={() => {
                      closeTimeoutRef.current = setTimeout(() => setHoveredCategoryIndex(null), 5000);
                    }}
                  >
                    {/* Category as button without hover box */}
                    <button className="w-full text-left px-5 py-3 text-gray-800 font-semibold text-lg mx-4">
                      {cat.name} ▸
                    </button>

                    {/* Subcategories */}
                    {hoveredCategoryIndex === i && (
                      <ul
                        className="absolute top-0 left-full ml-2 bg-white text-gray-900 shadow-xl rounded-lg min-w-[200px] border border-gray-200"
                        onMouseEnter={() => {
                          if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
                        }}
                        onMouseLeave={() => {
                          closeTimeoutRef.current = setTimeout(() => setHoveredCategoryIndex(null), 5000);
                        }}
                      >
                        {cat.subcategories.map((sub, j) => (
                          <li
                            key={j}
                            className="px-5 py-3 cursor-pointer whitespace-nowrap text-gray-700 font-semibold text-lg border-b border-gray-300 border-opacity-30 last:border-b-0 mx-2 transition hover:text-blue-600"
                          >
                            {sub}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Other Menu Items */}
          {["Services", "Prescription", "Popular Brands", "Offers", "Gift Card"].map((item, idx) => (
            <button
              key={idx}
              className="px-6 py-2 rounded hover:bg-[#004080] transition text-white font-medium"
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      {/* Hero Slider */}
      <div className="w-full">
        {adLoading ? (
          <div className="flex items-center justify-center h-[300px] sm:h-[400px] md:h-[500px] bg-gray-100 animate-pulse">
            <span className="text-2xl font-bold animate-pulse">Loading Ads...</span>
          </div>
        ) : adPhotos.length > 0 ? (
          <Slider {...sliderSettings}>
            {adPhotos.map((photo) => (
              <div
                key={photo.id}
                className="relative w-full h-[500px] bg-gray-200 flex items-center justify-center"
              >
                <img
                  src={`https://localhost:7135/${photo.imageUrl}`}
                  alt={`Ad ${photo.id}`}
                  className="w-full h-full object-cover rounded"
                  width="1600"
                  height="600"
                />
              </div>
            ))}
          </Slider>
        ) : (
          <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-[500px] bg-gray-200 flex items-center justify-center text-2xl font-bold text-gray-700">
            No Ads Available
          </div>
        )}
      </div>

      {/* Services Section */}
<section className="my-8 px-2 sm:px-4 md:px-6">
  <div className="flex justify-between items-center mb-4 max-w-7xl mx-auto">
    <h3 className="text-xl sm:text-2xl font-semibold">Services</h3>
    <button className="text-blue-600 font-semibold text-lg sm:text-xl hover:no-underline">
      See All
    </button>
  </div>

  <div className="relative max-w-7xl mx-auto">
    {/* Left Arrow */}
    <button
      className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 hover:bg-gray-100 shadow"
      onClick={() => {
        const container = document.getElementById("services-carousel");
        if (container)
          container.scrollBy({ left: -container.offsetWidth / 2, behavior: "smooth" });
      }}
    >
      ◀
    </button>

    {/* Right Arrow */}
    <button
      className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 hover:bg-gray-100 shadow"
      onClick={() => {
        const container = document.getElementById("services-carousel");
        if (container)
          container.scrollBy({ left: container.offsetWidth / 2, behavior: "smooth" });
      }}
    >
      ▶
    </button>

    {/* Cards Container */}
    <div
      id="services-carousel"
      className="flex justify-start items-center overflow-x-hidden gap-4 py-2 px-12"
    >
      {[
        {
          title: "Online Consultation",
          description: "Book a doctor consultation online",
          image: "https://via.placeholder.com/200x150?text=Consultation",
        },
        {
          title: "Medicine Delivery",
          description: "Get medicines delivered to your doorstep",
          image: "https://via.placeholder.com/200x150?text=Delivery",
        },
        {
          title: "Lab Tests",
          description: "Book lab tests from home",
          image: "https://via.placeholder.com/200x150?text=Lab+Tests",
        },
        {
          title: "Health Packages",
          description: "Choose health packages as per your needs",
          image: "https://via.placeholder.com/200x150?text=Packages",
        },
        {
          title: "Wellness Tips",
          description: "Daily wellness and health tips",
          image: "https://via.placeholder.com/200x150?text=Wellness",
        },
        {
          title: "Emergency Services",
          description: "Access emergency services anytime",
          image: "https://via.placeholder.com/200x150?text=Emergency",
        },
      ].map((service, idx) => (
        <div
          key={idx}
          className="flex-none w-1/4 border border-gray-300 rounded-lg overflow-hidden bg-white"
        >
          {/* Image */}
          <div className="w-full h-40">
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="p-2 h-20 flex flex-col justify-center">
            <h4 className="font-semibold text-lg">{service.title}</h4>
            <p className="text-sm text-gray-600">{service.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
{/* Buttons below Services Cards with icons */}
<div className="flex justify-center gap-4 mt-6">
  {[
    { text: "New Arrivals", icon: "📦" },
    { text: "Best Sellers", icon: "⭐" },
    { text: "Favorites", icon: "❤️" },
  ].map((btn, idx) => (
    <button
      key={idx}
      className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-300 rounded-full text-gray-800 font-semibold hover:bg-blue-500 hover:text-white transition text-lg"
    >
      <span className="text-lg">{btn.icon}</span>
      <span>{btn.text}</span>
    </button>
  ))}
</div>

      {/* Products Section */}
<main className="max-w-full sm:max-w-7xl mx-auto px-2 sm:px-4 md:px-6 py-6">
  {/* Recently Added Products */}
  <section className="mb-8">
    <h3 className="text-xl sm:text-2xl font-semibold mb-4">Recently Added Products</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
      {products.slice(0, 8).map((p) => (
        <div
          key={p.id}
          className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition cursor-pointer w-52 flex flex-col"
        >
          <h4 className="text-sm font-medium mb-2">{p.name}</h4>
          <img
            src={p.image}
            alt={p.name}
            className="w-full h-56 object-cover rounded mb-2"
          />
          <div className="flex justify-between mt-auto text-sm mb-2">
            <span>${p.price.toFixed(2)}</span>
            <span>⭐ {p.rating}</span>
          </div>
          <div className="flex gap-2 mt-2">
            <button
              className={`flex-1 py-1 rounded font-medium text-sm transition ${
                favorites.includes(p.id)
                  ? "bg-pink-500 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
              onClick={() => handleToggleFavorite(p.id)}
            >
              {favorites.includes(p.id) ? "❤️" : "🤍"}
            </button>
            <button
              className="flex-1 py-1 bg-cyan-500 hover:bg-cyan-600 text-white rounded font-medium text-sm transition"
              onClick={() => handleAddToCart(p)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  </section>

  {/* Top Offers Section */}
  <section>
    <h3 className="text-xl sm:text-2xl font-semibold mb-4"></h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
      {products.slice(8, 16).map((p) => (
        <div
          key={p.id}
          className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition cursor-pointer w-52 flex flex-col"
        >
          <h4 className="text-sm font-medium mb-2">{p.name}</h4>
          <img
            src={p.image}
            alt={p.name}
            className="w-full h-56 object-cover rounded mb-2"
          />
          <div className="flex justify-between mt-auto text-sm mb-2">
            <span>${p.price.toFixed(2)}</span>
            <span>⭐ {p.rating}</span>
          </div>
          <div className="flex gap-2 mt-2">
            <button
              className={`flex-1 py-1 rounded font-medium text-sm transition ${
                favorites.includes(p.id)
                  ? "bg-pink-500 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
              onClick={() => handleToggleFavorite(p.id)}
            >
              {favorites.includes(p.id) ? "❤️" : "🤍"}
            </button>
            <button
              className="flex-1 py-1 bg-cyan-500 hover:bg-cyan-600 text-white rounded font-medium text-sm transition"
              onClick={() => handleAddToCart(p)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  </section>
</main>
{/* Secondary Categories Section */}
<section className="py-8">
  <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6">
    {/* Title aligned to left and smaller */}
    <h3 className="text-2xl sm:text-3xl mb-8 text-left">Categories</h3>

    <div className="grid grid-cols-2 sm:grid-cols-5 gap-[1px] justify-items-center">
      {[
        { name: "Skin Care", image: "/skincare.png" },
        { name: "Hair Care", image: "/haircare.png" },
        { name: "Makeup", image: "/makeuop.png" },
        { name: "Medicine & Treatments", image: "/medicine.png" },
        { name: "Personal Care", image: "/personal care.png" },
        { name: "Mum & Baby", image: "/mum and baby.png" },
        { name: "Vitamins & Health", image: "/vitamibns.png" },
        { name: "Home Health Care", image: "/home health care.png" },
        { name: "Offers", image: "/offers.png" },
        { name: "AlDawaa Plus", image: "/aldawaplus.png" },
      ].map((cat, idx) => (
        <div
          key={idx}
          className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform"
        >
          {/* Bigger square image with rounded corners */}
          <div className="w-44 h-44 sm:w-48 sm:h-48 overflow-hidden rounded-3xl bg-gray-100 flex items-center justify-center">
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-lg sm:text-xl font-medium text-center mt-3">{cat.name}</span>
        </div>
      ))}
    </div>
  </div>
</section>
      {/* Hero Slider */}
      <div className="w-full">
        {adLoading ? (
          <div className="flex items-center justify-center h-[300px] sm:h-[400px] md:h-[500px] bg-gray-100 animate-pulse">
            <span className="text-2xl font-bold animate-pulse">Loading Ads...</span>
          </div>
        ) : adPhotos.length > 0 ? (
          <Slider {...sliderSettings}>
            {adPhotos.map((photo) => (
              <div
                key={photo.id}
                className="relative w-full h-[500px] bg-gray-200 flex items-center justify-center"
              >
                <img
                  src={`https://localhost:7135/${photo.imageUrl}`}
                  alt={`Ad ${photo.id}`}
                  className="w-full h-full object-cover rounded"
                  width="1600"
                  height="600"
                />
              </div>
            ))}
          </Slider>
        ) : (
          <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-[500px] bg-gray-200 flex items-center justify-center text-2xl font-bold text-gray-700">
            No Ads Available
          </div>
        )}
      </div>
            {/* Products Section */}
<main className="max-w-full sm:max-w-7xl mx-auto px-2 sm:px-4 md:px-6 py-6">
  {/* Recently Added Products */}
  <section className="mb-8">
    <h3 className="text-xl sm:text-2xl font-semibold mb-4">Best Seller</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
      {products.slice(0, 8).map((p) => (
        <div
          key={p.id}
          className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition cursor-pointer w-52 flex flex-col"
        >
          <h4 className="text-sm font-medium mb-2">{p.name}</h4>
          <img
            src={p.image}
            alt={p.name}
            className="w-full h-56 object-cover rounded mb-2"
          />
          <div className="flex justify-between mt-auto text-sm mb-2">
            <span>${p.price.toFixed(2)}</span>
            <span>⭐ {p.rating}</span>
          </div>
          <div className="flex gap-2 mt-2">
            <button
              className={`flex-1 py-1 rounded font-medium text-sm transition ${
                favorites.includes(p.id)
                  ? "bg-pink-500 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
              onClick={() => handleToggleFavorite(p.id)}
            >
              {favorites.includes(p.id) ? "❤️" : "🤍"}
            </button>
            <button
              className="flex-1 py-1 bg-cyan-500 hover:bg-cyan-600 text-white rounded font-medium text-sm transition"
              onClick={() => handleAddToCart(p)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  </section>

  {/* Top Offers Section */}
  <section>
    <h3 className="text-xl sm:text-2xl font-semibold mb-4"></h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
      {products.slice(8, 16).map((p) => (
        <div
          key={p.id}
          className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition cursor-pointer w-52 flex flex-col"
        >
          <h4 className="text-sm font-medium mb-2">{p.name}</h4>
          <img
            src={p.image}
            alt={p.name}
            className="w-full h-56 object-cover rounded mb-2"
          />
          <div className="flex justify-between mt-auto text-sm mb-2">
            <span>${p.price.toFixed(2)}</span>
            <span>⭐ {p.rating}</span>
          </div>
          <div className="flex gap-2 mt-2">
            <button
              className={`flex-1 py-1 rounded font-medium text-sm transition ${
                favorites.includes(p.id)
                  ? "bg-pink-500 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
              onClick={() => handleToggleFavorite(p.id)}
            >
              {favorites.includes(p.id) ? "❤️" : "🤍"}
            </button>
            <button
              className="flex-1 py-1 bg-cyan-500 hover:bg-cyan-600 text-white rounded font-medium text-sm transition"
              onClick={() => handleAddToCart(p)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  </section>
</main>
      {/* Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-2 overflow-x-hidden">
          <div className="bg-white rounded-xl w-full max-w-md p-4 sm:p-6 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-lg sm:text-xl"
              onClick={() => setShowCart(false)}
            >
              ✖
            </button>
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Your Cart</h3>
            {cart.length === 0 ? (
              <p className="text-sm sm:text-base">Your cart is empty.</p>
            ) : (
              <div className="space-y-2 max-h-64 sm:max-h-80 overflow-y-auto">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center border-b pb-1 text-xs sm:text-sm"
                  >
                    <span>
                      {item.name} x {item.qty}
                    </span>
                    <span>${(item.price * item.qty).toFixed(2)}</span>
                    <button
                      className="text-red-500 hover:text-red-700 ml-2"
                      onClick={() => handleRemoveFromCart(item.id)}
                    >
                      ✖
                    </button>
                  </div>
                ))}
                <div className="mt-2 font-semibold flex justify-between text-sm sm:text-base">
                  <span>Total:</span>
                  <span>${cart.reduce((acc, c) => acc + c.price * c.qty, 0).toFixed(2)}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
