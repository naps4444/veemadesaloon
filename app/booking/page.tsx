import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Booking from '@/models/Booking';

// GET /api/bookings?date=YYYY-MM-DD
export async function GET(req: NextRequest) {
  await dbConnect();

  const dateParam = req.nextUrl.searchParams.get('date');
  if (!dateParam) {
    return NextResponse.json(
      { success: false, message: 'Missing or invalid date query param' },
      { status: 400 }
    );
  }

  try {
    const selectedDate = new Date(dateParam);
    selectedDate.setHours(0, 0, 0, 0);

    const nextDay = new Date(selectedDate);
    nextDay.setDate(nextDay.getDate() + 1);

    const bookings = await Booking.find({
      date: { $gte: selectedDate, $lt: nextDay }
    });

    return NextResponse.json({ success: true, bookings }, { status: 200 });
  } catch (error) {
    console.error('[GET] Fetch bookings error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// POST /api/bookings
// Trigger this after successful Paystack confirmation
export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const body = await req.json();
    const { name, email, phone, services, reference, total, date, timeSlot } = body;

    if (!name || !email || !phone || !services || !reference || !total || !date || !timeSlot) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);

    const existingCount = await Booking.countDocuments({
      date: selectedDate,
      timeSlot,
      status: 'confirmed'
    });

    if (existingCount >= 2) {
      return NextResponse.json(
        { success: false, message: 'This time slot is fully booked.' },
        { status: 400 }
      );
    }

    const newBooking = await Booking.create({
      name,
      email,
      phone,
      services,
      reference,
      total,
      date: selectedDate,
      timeSlot,
      status: 'confirmed'
    });

    return NextResponse.json({ success: true, booking: newBooking }, { status: 201 });
  } catch (error) {
    console.error('[POST] Booking error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
