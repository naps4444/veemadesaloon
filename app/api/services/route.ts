// File: app/api/services/route.ts

import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Import the manually defined types
import { Service, Category, CategoryWithServices } from '@/types/prisma-types';

// GET /api/services
// Fetches all services with pagination, search, and grouped by category
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const perPage = parseInt(searchParams.get('perPage') || '4');
    const searchQuery = searchParams.get('search') || '';
    // --- MODIFIED --- Get the category from the URL
    const categoryQuery = searchParams.get('category') || '';

    const skip = (page - 1) * perPage;

    // --- MODIFIED --- Construct the where clause to include a category filter
    const where = {
      ...(searchQuery && {
        name: {
          contains: searchQuery,
          mode: 'insensitive',
        },
      }),
      ...(categoryQuery && {
        category: {
          name: {
            equals: categoryQuery,
          },
        },
      }),
    };
    

    // Get the services with the necessary relations and total count
    const [services, totalCount] = await prisma.$transaction([
      prisma.service.findMany({
        where,
        take: perPage,
        skip,
        include: {
          variations: true,
          category: true,
        },
      }),
      prisma.service.count({ where }),
    ]);

    const categories: { [key: string]: CategoryWithServices } = {};
    
    // Use the custom types to ensure type safety
    services.forEach((service: Service) => {
        const categoryName = service.category.name;
        if (!categories[categoryName]) {
            categories[categoryName] = { 
                id: service.category.id, 
                name: categoryName, 
                services: [] 
            };
        }
        categories[categoryName].services.push(service);
    });

    const paginatedCategories = Object.values(categories);

    return NextResponse.json({
      categories: paginatedCategories,
      totalCount,
    });
  } catch (error) {
    console.error("GET /api/services error:", error);
    return NextResponse.json(
      { error: "Failed to fetch services" },
      { status: 500 }
    );
  }
}

// POST /api/services
// Creates a new service with associated variations
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, categoryName, variations } = body;

    // Find the category by name, or create a new one if it doesn't exist
    const category = await prisma.category.upsert({
      where: { name: categoryName },
      update: {},
      create: { name: categoryName },
    });

    const newService = await prisma.service.create({
      data: {
        name,
        categoryId: category.id,
        variations: {
          create: variations,
        },
      },
      include: { variations: true, category: true },
    });

    return NextResponse.json(newService, { status: 201 });
  } catch (error) {
    console.error("POST /api/services error:", error);
    return NextResponse.json(
      { error: "Failed to create new service" },
      { status: 500 }
    );
  }
}