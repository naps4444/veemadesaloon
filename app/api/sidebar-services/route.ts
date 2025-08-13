// File: app/api/sidebar-services/route.ts
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db'; // Import your Mongoose connection
import { Category } from '@/lib/models/Category'; // Import your Mongoose Category model
import { Service } from '@/lib/models/Service';   // Import your Mongoose Service model
// Correct import: Use the frontend-facing types which expect _id
import type { Category as CategoryType, Service as ServiceType } from '@/types/service';
import { Types } from 'mongoose'; // Import Types for ObjectId for explicit type definition

// Define an interface for the lean category document after population
interface PopulatedCategoryLean {
  _id: Types.ObjectId; // MongoDB ObjectId
  name: string;
  // Assuming 'services' is the populated path and it contains an array of ServiceType
  services: ServiceType[]; // This is the populated array of services
  __v?: number; // Mongoose internal version key, often present in lean results
}

export async function GET() {
  try {
    await connectDB(); // Ensure connection to MongoDB

    // Fetch categories and populate their services
    // Explicitly type the populated 'services' to ensure it matches ServiceType[]
    // and select both '_id' and 'name' for the populated services.
    const categoriesWithServices = await Category.find({})
      .sort({ name: 1 }) // Sort categories alphabetically (1 for asc)
      .populate<{ services: ServiceType[] }>({
        path: 'services', // Assuming 'services' is a virtual populate field or direct reference in your Category model
        model: Service,   // Specify the model to populate
        select: '_id name', // Select both _id and name for services
        options: { sort: { name: 1 } }, // Sort populated services alphabetically
      })
      .lean<PopulatedCategoryLean[]>(); // ✨ Explicitly cast the lean result to PopulatedCategoryLean[]

    // Manually format the lean category documents for the frontend response.
    // Now categoryDoc is correctly typed as PopulatedCategoryLean,
    // so `categoryDoc.name` and `categoryDoc.services` can be accessed directly.
    const formattedCategories = categoriesWithServices.map(categoryDoc => {
      const services = (categoryDoc.services || []) // Ensure services array is not null/undefined
        .filter((service): service is ServiceType => service !== null && service !== undefined) // Basic null/undefined filter
        .map(serviceDoc => ({
          id: serviceDoc._id.toString(), // Convert ObjectId to string and rename to id
          name: serviceDoc.name,
        }));

      return {
        id: categoryDoc._id.toString(), // Convert ObjectId to string and rename to id
        name: categoryDoc.name,
        services: services,
      };
    });

    return NextResponse.json(formattedCategories);
  } catch (error) {
    console.error("Failed to fetch sidebar categories:", error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
