// app/api/users/register/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { dbConnect } from "@/lib/mongoose";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const { email, password } = await req.json();

    // Check if user exists
    const exists = await User.findOne({ email });
    if (exists) {
      return NextResponse.json({ error: "User exists" }, { status: 400 });
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Create new user
    const user = await User.create({
      email,
      password: hashed,
      role: "admin", // You can change this default
    });

    return NextResponse.json({
      success: true,
      user: { id: user._id, email: user.email },
    });
  } catch (error) {
    console.error("Error registering user:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
