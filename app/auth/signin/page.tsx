"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    setLoading(true);
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false, // important: disable redirect to control it
    });

    setLoading(false);

    if (res?.ok) {
      router.push("/admin/dashboard");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 text-black">
      <h1 className="text-2xl font-bold mb-4">Sign In</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="block mb-2 border p-2 w-full"
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="block mb-4 border p-2 w-full"
        required
      />

      <button
        type="submit"
        className="bg-black text-white px-4 py-2"
        disabled={loading}
      >
        {loading ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}
