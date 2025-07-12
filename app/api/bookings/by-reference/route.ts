import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Booking from '@/models/Booking';

export async function GET(req: NextRequest) {
  await dbConnect();

  const ref = req.nextUrl.searchParams.get('ref');
  if (!ref) {
    return NextResponse.json({ success: false, message: 'Missing reference' }, { status: 400 });
  }

  try {
    const booking = await Booking.findOne({ reference: ref }).sort({ createdAt: -1 });
    if (!booking) {
      return NextResponse.json({ success: false, message: 'Booking not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, booking }, { status: 200 });
  } catch (err) {
    console.error('[GET /by-reference] Error:', err);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
