// types/service.ts

export interface Variation {
  _id: string; // Changed from 'id' to '_id'
  name: string;
  price: number;
}

export interface Service {
  _id: string; // Changed from 'id' to '_id'
  name: string;
  categoryId: string; // This will store the _id of the parent Category
  variations: Variation[];
}

export interface Category {
  _id: string; // Changed from 'id' to '_id'
  name: string;
  services: Service[];
}

// Your CartItem type can remain as 'id' if you transform _id to id when creating cart items,
// or you can adjust it to use _id for consistency if preferred.
export interface CartItem {
  id: string; // Unique ID for the selected variation (e.g., service._id-variation._id)
  serviceId: string;
  variationId: string;
  serviceName: string;
  variationName: string;
  price: number;
}
