"use client";

import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* About */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-white">About Us</h4>
          <p className="text-sm">
            Get a wide range of medicines and health essentials with fast delivery
            and unbeatable offers to keep you and your loved ones healthy.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-white">Quick Links</h4>
          <ul className="space-y-1 text-sm">
            <li>
              <a href="#" className="hover:text-cyan-400 transition">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-cyan-400 transition">
                Products
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-cyan-400 transition">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-cyan-400 transition">
                Offers
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-cyan-400 transition">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-white">Follow Us</h4>
          <div className="flex gap-3">
            <a href="#" className="hover:text-cyan-400 text-2xl">
              🌐
            </a>
            <a href="#" className="hover:text-cyan-400 text-2xl">
              📘
            </a>
            <a href="#" className="hover:text-cyan-400 text-2xl">
              🐦
            </a>
            <a href="#" className="hover:text-cyan-400 text-2xl">
              📸
            </a>
            <a href="#" className="hover:text-cyan-400 text-2xl">
              🎥
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-6 py-4 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} All rights reserved.
      </div>
    </footer>
  );
}
