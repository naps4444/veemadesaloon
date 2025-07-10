// pages/api/db-test.ts
import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Simple read operation
    const bookings = await prisma.booking.findMany({ take: 1 });
    res.status(200).json({ message: 'MongoDB connected successfully', sample: bookings });
  } catch (error) {
    console.error('DB connection failed:', error);
    res.status(500).json({ error: 'Database connection failed' });
  }
}
