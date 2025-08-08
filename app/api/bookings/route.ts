// File: app/api/bookings/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/mongoose';
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
export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const body = await req.json();
    // UPDATED: Now destructuring the newsletterOptOut field from the body
    const { name, email, phone, services, reference, total, date, timeSlot, newsletterOptOut } = body;
    
    console.log('Received payload:', body);

    // UPDATED: Added newsletterOptOut to the validation check
    if (!name || !email || !phone || !services || !reference || !total || !date || !timeSlot || typeof newsletterOptOut === 'undefined') {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    if (!Array.isArray(services) || services.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Services must be a non-empty array' },
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

    // UPDATED: Passing the newsletterOptOut field to the new Booking
    const newBooking = await Booking.create({
      name,
      email,
      phone,
      services,
      reference,
      total,
      date: selectedDate,
      timeSlot,
      newsletterOptOut, // Added new field
      status: 'confirmed'
    });

    return NextResponse.json({ success: true, booking: newBooking }, { status: 201 });
  } catch (error: any) {
    console.error('[POST] Booking error:', error.message, error.stack);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
