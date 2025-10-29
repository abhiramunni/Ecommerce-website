"use client";

import { useRouter, usePathname } from "next/navigation";

export default function DashboardButtons() {
  const router = useRouter();
  const pathname = usePathname();

  // ✅ Check if currently on /dashboard
  const isDashboard = pathname === "/dashboard";

  // Optional: return null if you want to skip layout content entirely
  if (!isDashboard) {
    return null; // Prevent rendering on other pages
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-3xl font-bold mb-8">Welcome to the Dashboard</h1>
      <div className="flex gap-6">
        <button
          onClick={() => router.push("/login")}
          className="px-6 py-3 text-lg rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Admin Login
        </button>
        <button
          onClick={() => router.push("/frontend")}
          className="px-6 py-3 text-lg rounded-xl bg-green-600 text-white hover:bg-green-700 transition"
        >
          Page
        </button>
      </div>
    </div>
  );
}
