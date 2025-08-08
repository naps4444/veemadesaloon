// File: app/api/services/[id]/route.ts
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const service = await prisma.service.findUnique({
      where: { id: params.id },
      include: { variations: true },
    });

    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    return NextResponse.json(service);
  } catch (err) {
    console.error("GET /api/services/[id] error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { name, category, variations } = body;

    // Find the category by its name to get its ID
    const existingCategory = await prisma.category.findUnique({
      where: { name: category },
    });

    if (!existingCategory) {
      return NextResponse.json(
        { error: `Category with name "${category}" not found.` },
        { status: 400 }
      );
    }
    
    // Use the category's ID to update the service
    const updated = await prisma.service.update({
      where: { id: params.id },
      data: {
        name,
        categoryId: existingCategory.id, // Use the correct ID for the relationship
        variations: {
          deleteMany: {}, // Clear old variations
          create: variations,
        },
      },
      include: { variations: true },
    });

    return NextResponse.json(updated);
  } catch (err) {
    console.error("PUT /api/services/[id] error:", err);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Wrap the deletion in a transaction to ensure both records are deleted
    await prisma.$transaction([
      prisma.variation.deleteMany({
        where: { serviceId: params.id },
      }),
      prisma.service.delete({
        where: { id: params.id },
      }),
    ]);

    return new Response(null, { status: 204 });
  } catch (err) {
    console.error("DELETE /api/services/[id] error:", err);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}