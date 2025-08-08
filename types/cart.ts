// Define this new type, perhaps in a `types/cart.ts` file or directly in your component.
// I will place it in the same file for clarity.
interface CartItem {
  id: string; // A unique ID for the selected variation (e.g., `${service.id}-${variation.id}`)
  serviceId: string;
  variationId: string;
  serviceName: string;
  variationName: string;
  price: number;
}