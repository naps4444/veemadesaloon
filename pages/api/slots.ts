// pages/api/slots.ts

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Booking } from "@/lib/models/Booking";

export async function GET(req: Request) {
  // Connect to MongoDB
  await connectDB();

  const { searchParams } = new URL(req.url);
  const dateParam = searchParams.get("date");

  if (!dateParam) return NextResponse.json({ unavailable: [] });

  const date = new Date(dateParam);

  // Fetch confirmed bookings for the given date
  const bookings = await Booking.find({ date, status: "confirmed" }).lean();

  // Count bookings per time slot
  const slotCounts: Record<string, number> = {};
  bookings.forEach((booking) => {
    slotCounts[booking.timeSlot] = (slotCounts[booking.timeSlot] || 0) + 1;
  });

  // If 2 or more people have booked a slot, it’s unavailable
  const unavailable = Object.keys(slotCounts).filter(
    (slot) => slotCounts[slot] >= 2
  );

  return NextResponse.json({ unavailable });
}
