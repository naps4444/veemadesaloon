// File: app/api/services/route.ts

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Category, ICategory } from "@/lib/models/Category";
import { Service, IService } from "@/lib/models/Service";
import { Variation, IVariation } from "@/lib/models/Variation";
import { FilterQuery, Types } from "mongoose";

// Lean category type
export interface ICategoryLean extends Omit<ICategory, "_id"> {
  _id: Types.ObjectId;
}

// Lean service type
export interface IServiceLean extends Omit<IService, keyof Document> {
  _id: Types.ObjectId;
  categoryId: Types.ObjectId | ICategoryLean;
}

// Lean variation type
export interface IVariationLean extends Omit<IVariation, "_id"> {
  _id: Types.ObjectId;
}

// Combined type for responses
type ServiceWithRelations = IServiceLean & {
  category: ICategoryLean;
  variations: IVariationLean[];
};

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const perPage = parseInt(searchParams.get("perPage") || "4", 10);
    const searchQuery = searchParams.get("search") || "";
    const categoryQuery = searchParams.get("category") || "";

    const skip = (page - 1) * perPage;

    const query: FilterQuery<IService> = {};
    if (searchQuery) {
      query.name = { $regex: searchQuery, $options: "i" };
    }

    if (categoryQuery) {
      const category = await Category.findOne({ name: categoryQuery })
        .lean<ICategoryLean | null>();
      if (category) {
        query.categoryId = category._id;
      } else {
        return NextResponse.json({ categories: [], totalCount: 0 });
      }
    }

    const services = await Service.find(query)
      .skip(skip)
      .limit(perPage)
      .populate<{ categoryId: ICategoryLean }>("categoryId")
      .lean<IServiceLean[]>()
      .then((docs) =>
        docs.map((doc) => ({
          ...doc,
          categoryId: doc.categoryId as ICategoryLean,
        }))
      );

    const servicesWithRelations: ServiceWithRelations[] = await Promise.all(
      services.map(async (service) => {
        const variations = await Variation.find({ serviceId: service._id })
          .lean<IVariationLean[]>();
        return {
          ...service,
          variations,
          category: service.categoryId as ICategoryLean,
        };
      })
    );

    // Group services by category
    const categoriesMap: Record<
      string,
      { _id: string; name: string; services: ServiceWithRelations[] } // ✨ Changed 'id' to '_id' here
    > = {};

    servicesWithRelations.forEach((service) => {
      const categoryName = service.category.name;
      const categoryIdObj = service.category._id; // This is an ObjectId
      const categoryIdStr = categoryIdObj.toString(); // Convert to string for the key

      if (!categoriesMap[categoryIdStr]) { // ✨ Use categoryIdStr as the map key for uniqueness
        categoriesMap[categoryIdStr] = {
          _id: categoryIdStr, // ✨ Set _id here directly
          name: categoryName,
          services: [],
        };
      }

      categoriesMap[categoryIdStr].services.push(service); // Push service into the correct category
    });

    const totalCount = await Service.countDocuments(query);

    return NextResponse.json({
      categories: Object.values(categoriesMap),
      totalCount,
    });
  } catch (error) {
    console.error("GET /api/services error:", error);
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { name, categoryName, variations } = body;

    // Upsert category
    let category = await Category.findOne({ name: categoryName });
    if (!category) {
      category = await Category.create({ name: categoryName });
    }

    // Create service
    const newService = await Service.create({
      name,
      categoryId: category._id,
    });

    // Create variations
    if (variations && Array.isArray(variations)) {
      const variationDocs = variations.map((v: Partial<IVariation>) => ({
        ...v,
        serviceId: newService._id,
      }));
      await Variation.insertMany(variationDocs);
    }

    // Fetch service with populated category and variations
    const serviceWithRelations = await Service.findById(newService._id)
      .populate<{ categoryId: ICategoryLean }>("categoryId")
      .lean<IServiceLean | null>();

    if (!serviceWithRelations) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    const serviceVariations = await Variation.find({ serviceId: newService._id })
      .lean<IVariationLean[]>();

    return NextResponse.json(
      {
        ...serviceWithRelations,
        variations: serviceVariations,
        category: serviceWithRelations.categoryId as ICategoryLean,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/services error:", error);
    return NextResponse.json({ error: "Failed to create new service" }, { status: 500 });
  }
}
