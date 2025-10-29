"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const API_BASE = "https://localhost:7135/api/auth";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [message, setMessage] = useState("");

  // ----------------------- LOGIN -----------------------
  const handleLogin = async () => {
    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Name: email,       // required by backend
          username: email,   // optional
          passwordHash: password,
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        setMessage(errorText); // display backend message in UI
        return;
      }

      const data = await res.json();
      console.log("Login success:", data);
      router.push("http://localhost:3000/adding_product");
    } catch (err: any) {
      console.error(err);
      setMessage(err.message || "Login failed");
    }
  };

  // -------------------- REGISTER -----------------------
  const handleRegister = async () => {
    if (password !== rePassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Name: username,      // required by backend
          username,
          passwordHash: password,
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        setMessage(errorText);
        return;
      }

      const data = await res.text(); // backend returns plain text
      setMessage(data);
      setIsRegister(false);
    } catch (err: any) {
      console.error(err);
      setMessage(err.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-cyan-400 to-blue-600 animate-fade-in">
      <div className="bg-white/90 backdrop-blur-lg p-8 rounded-3xl shadow-2xl w-96 max-w-full animate-slide-up">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          {isRegister ? "Admin Register" : "Admin Login"}
        </h2>

        {isRegister && (
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-gray-900 transition"
          />
        )}

        <input
          type="email"
          placeholder="Email / Username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-gray-900 transition"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-gray-900 transition"
        />

        {isRegister && (
          <input
            type="password"
            placeholder="Re-enter Password"
            value={rePassword}
            onChange={(e) => setRePassword(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-gray-900 transition"
          />
        )}

        {message && (
          <p className="text-red-500 text-sm mb-4 text-center font-medium">{message}</p>
        )}

        <button
          onClick={isRegister ? handleRegister : handleLogin}
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-3 rounded-xl shadow-lg transition-all mb-4 hover:scale-105"
        >
          {isRegister ? "Register" : "Login"}
        </button>

        <p
          className="text-center text-sm text-gray-700 hover:text-gray-900 cursor-pointer transition"
          onClick={() => {
            setIsRegister(!isRegister);
            setMessage("");
          }}
        >
          {isRegister
            ? "Already have an account? Login"
            : "Don't have an account? Register"}
        </p>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease-in-out forwards;
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slideUp 0.8s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
}
