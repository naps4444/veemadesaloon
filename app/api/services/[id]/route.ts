// File: app/api/services/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db"; // Assuming this is your Mongoose connection helper
import { Service } from "@/lib/models/Service";
import { Category } from "@/lib/models/Category";
import { Variation } from "@/lib/models/Variation";
import { Types } from "mongoose";

type RouteParams = { params: { id: string } };

// GET: Fetch a single service by ID
export async function GET(_req: NextRequest, { params }: RouteParams) {
  await connectDB(); // Ensure this is the correct connect function

  try {
    if (!Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: "Invalid service ID" }, { status: 400 });
    }

    const service = await Service.findById(params.id)
      .populate("variations") // Assuming 'variations' is a ref in Service model
      .populate("categoryId"); // Assuming 'categoryId' is a ref in Service model

    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    // Mongoose documents inherently have _id. When returned via NextResponse.json,
    // Mongoose's toJSON virtuals might add an 'id' alias, but _id is also present.
    return NextResponse.json(service);
  } catch (err) {
    console.error("GET /api/services/[id] error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// PUT: Update a service by ID
export async function PUT(req: NextRequest, { params }: RouteParams) {
  await connectDB(); // Ensure this is the correct connect function

  try {
    const { id } = params;
    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid service ID" }, { status: 400 });
    }

    const body = await req.json();
    const { name, category, variations } = body;

    // Find category by name
    const existingCategory = await Category.findOne({ name: category });
    if (!existingCategory) {
      return NextResponse.json(
        { error: `Category "${category}" not found.` },
        { status: 400 }
      );
    }

    // Remove old variations
    await Variation.deleteMany({ serviceId: id });

    // Create new variations
    const createdVariations = await Variation.insertMany(
      variations.map((v: any) => ({ ...v, serviceId: id }))
    );

    // Update service
    const updatedService = await Service.findByIdAndUpdate(
      id,
      {
        name,
        categoryId: existingCategory._id,
        variations: createdVariations.map(v => v._id), // Link variations by their _id
      },
      { new: true }
    )
      .populate("variations")
      .populate("categoryId");

    if (!updatedService) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    return NextResponse.json(updatedService);
  } catch (err) {
    console.error("PUT /api/services/[id] error:", err);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

// DELETE: Remove a service by ID
export async function DELETE(_req: NextRequest, { params }: RouteParams) {
  await connectDB(); // Ensure this is the correct connect function

  try {
    const { id } = params;
    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid service ID" }, { status: 400 });
    }

    // Remove variations first, then the service
    await Variation.deleteMany({ serviceId: id });
    await Service.findByIdAndDelete(id);

    return NextResponse.json(null, { status: 204 });
  } catch (err) {
    console.error("DELETE /api/services/[id] error:", err);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
