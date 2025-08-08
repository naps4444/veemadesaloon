// app/api/users/register/route.ts
import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const { email, password } = await req.json()

  const exists = await prisma.user.findUnique({ where: { email } })
  if (exists) return NextResponse.json({ error: "User exists" }, { status: 400 })

  const hashed = await bcrypt.hash(password, 10)
  const user = await prisma.user.create({
    data: { email, password: hashed, role: "admin" },
  })

  return NextResponse.json({ success: true, user: { id: user.id, email: user.email } })
}
