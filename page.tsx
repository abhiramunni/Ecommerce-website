"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 text-gray-900">
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse"></div>
      </div>

      {/* Card Container */}
      <div className="z-10 w-full max-w-lg px-8 py-10 bg-white/30 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 flex flex-col items-center">
        {/* Logo */}


        {/* Title */}
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">
          Welcome to Your Dashboard
        </h1>
        <p className="text-gray-600 text-center mb-10">
          Manage your content and explore your frontend experience easily.
        </p>

        {/* Dashboard Buttons */}
        <div className="flex flex-col sm:flex-row gap-6">
          <button
            onClick={() => router.push("/login")}
            className="px-8 py-3 text-lg font-medium rounded-xl bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-md hover:shadow-xl hover:scale-105 transform transition duration-300"
          >
            Admin Login
          </button>
          <button
            onClick={() => router.push("/frontend")}
            className="px-8 py-3 text-lg font-medium rounded-xl bg-gradient-to-r from-green-500 to-teal-400 text-white shadow-md hover:shadow-xl hover:scale-105 transform transition duration-300"
          >
            Visit Page
          </button>
        </div>

        {/* Footer */}
        <footer className="mt-12 flex gap-8 text-sm text-gray-700">
        </footer>
      </div>
    </div>
  );
}
