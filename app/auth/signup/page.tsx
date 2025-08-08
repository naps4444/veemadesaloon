"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        const error = await res.json();
        alert(error.message || "Signup failed");
        return;
      }

      router.push("/auth/signin");
    } catch (error) {
      console.error("Signup error:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 text-black">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="block mb-2"
      />
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="block mb-2"
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="block mb-4"
      />
      <button type="submit" className="bg-black text-white px-4 py-2">
        Sign Up
      </button>
    </form>
  );
}
