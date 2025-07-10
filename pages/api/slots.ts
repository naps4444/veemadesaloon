// pages/api/slots.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get('date');

  if (!date) return NextResponse.json({ unavailable: [] });

  const bookings = await prisma.booking.findMany({
    where: {
      date: new Date(date),
      status: 'confirmed',
    },
  });

  // Count bookings per time slot
  const slotCounts: Record<string, number> = {};
  for (const booking of bookings) {
    slotCounts[booking.timeSlot] = (slotCounts[booking.timeSlot] || 0) + 1;
  }

  // If 2 people have already booked a slot, it’s unavailable
  const unavailable = Object.keys(slotCounts).filter(slot => slotCounts[slot] >= 2);

  return NextResponse.json({ unavailable });
}
