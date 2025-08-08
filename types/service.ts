// types/service.ts

export interface Variation {
  id: string;
  name: string;
  price: number;
}

export interface Service {
  id: string;
  name: string;
  categoryId: string; // <-- This is the property that was missing.
  variations: Variation[];
}

export interface Category {
  id: string;
  name: string;
  services: Service[];
}

// You can also place the CartItem type here for consistency
export interface CartItem {
  id: string; // Unique ID for the selected variation
  serviceId: string;
  variationId: string;
  serviceName: string;
  variationName: string;
  price: number;
}