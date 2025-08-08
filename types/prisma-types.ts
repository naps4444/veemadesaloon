// File: src/types/prisma-types.ts

// Define the types manually
export type Category = {
  id: string;
  name: string;
};

export type Variation = {
  id: string;
  name: string;
  price: number;
  serviceId: string;
};

// Define the Service type with its relations
export type Service = {
  id: string;
  name: string;
  categoryId: string;
  category: Category;
  variations: Variation[];
};

// A type for the API response, grouping services under a category
export type CategoryWithServices = Category & {
  services: Service[];
};