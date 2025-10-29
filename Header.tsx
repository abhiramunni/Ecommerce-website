"use client";

import React from "react";
import { Search, Mic, Camera, Globe, Heart, ShoppingCart } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-[#002748] text-white h-[95px] px-10 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-full">
        
        {/* Logo */}
        <div className="flex items-center h-full mr-6">
          <img src="/logo.png" alt="Al-Dawaa Logo" className="h-auto w-auto max-h-full" />
        </div>

        {/* Search Bar */}
        <div className="w-[400px] h-[48px] mx-4">
          <div className="flex items-center bg-white rounded-full px-3 shadow-md h-full">
            <Search className="text-gray-400 w-4.5 h-4.5" />
            <input
              type="text"
              placeholder="Search"
              className="flex-1 px-2 text-gray-800 text-sm focus:outline-none h-full"
            />
            <Mic className="text-gray-400 w-4.5 h-4.5 mx-2 cursor-pointer" />
            <Camera className="text-gray-400 w-4.5 h-4.5 cursor-pointer" />
          </div>
        </div>

        {/* Right Menu */}
        <div className="flex items-center space-x-8 text-base font-semibold">

          {/* Booking | Store Locator */}
          <div className="flex items-center space-x-2">
            <button className="cursor-pointer hover:text-blue-900 transition-colors duration-200 font-semibold">
              Booking
            </button>
            <span className="text-white">|</span>
            <button className="cursor-pointer hover:text-blue-900 transition-colors duration-200 font-semibold">
              Store Locator
            </button>
          </div>

          {/* Sign In / Register & Globe & Favorites */}
          <div className="flex items-center space-x-6">
            <button className="cursor-pointer hover:text-blue-900 transition-colors duration-200 font-semibold">
              Sign In / Register
            </button>

            <button className="flex items-center gap-3 cursor-pointer hover:text-blue-900 transition-colors duration-200 font-semibold">
              <Globe className="w-4 h-4" />
              <span>العربية</span>
            </button>

            <button className="flex items-center gap-3 cursor-pointer hover:text-blue-900 transition-colors duration-200 font-semibold">
              <Heart className="w-4 h-4" />
              <span>Favorites</span>
            </button>
          </div>

          {/* Cart */}
          <button className="flex items-center gap-3 cursor-pointer hover:text-blue-900 transition-colors duration-200 font-semibold">
            <ShoppingCart className="w-4 h-4" />
            <span>My cart</span>
          </button>
        </div>
      </div>
    </header>
  );
}
