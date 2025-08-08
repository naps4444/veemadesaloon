// File: app/api/sidebar-services/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const categoriesWithServices = await prisma.category.findMany({
      orderBy: {
        name: 'asc', // Sort categories alphabetically
      },
      include: {
        services: { // Include all services for each category
          select: {
            id: true,
            name: true,
          },
           orderBy: {
            name: 'asc', // Sort services alphabetically
          },
        },
      },
    });
    return NextResponse.json(categoriesWithServices);
  } catch (error) {
    console.error("Failed to fetch sidebar categories:", error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}