import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import User from "@/models/User";
import { dbConnect } from "@/lib/mongoose";

export async function POST(req: Request) {
  try {
    await dbConnect();
    console.log("✅ Connected to MongoDB");

    const { name, email, password } = await req.json();

    // Validate inputs
    if (!name || !email || !password) {
      console.warn("⚠️ Missing fields", { name, email, password });
      return NextResponse.json(
        { message: "All fields (name, email, password) are required" },
        { status: 400 }
      );
    }

    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.warn("⚠️ User already exists:", email);
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("🔐 Password hashed");

    // Create user with hardcoded admin role
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "admin", // 🔐 Force default role to "admin"
    });

    console.log("✅ Admin user created:", newUser.email);

    return NextResponse.json(
      {
        message: "Admin user created successfully",
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("❌ Signup error:", error.message || error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
