import { create } from 'zustand';

// Define the CartItem type to match the object you're creating in the frontend.
// This is what will be stored in the cart.
export interface CartItem {
  id: string; // A unique ID for the selected variation (e.g., `${service.id}-${variation.id}`)
  serviceId: string;
  variationId: string;
  serviceName: string;
  variationName: string;
  price: number;
}

interface CartState {
  selectedServices: CartItem[]; // Changed to an array of CartItem
  selectedDate: string | null;
  selectedTime: string | null;
  name: string;
  email: string;
  phone: string;
  newsletterOptOut: boolean;
  selectedCategory: string | null; // NEW: Added state for the selected category

  addService: (item: CartItem) => void;
  removeService: (id: string) => void;
  setDate: (date: string) => void;
  setTime: (time: string) => void;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setPhone: (phone: string) => void;
  setNewsletterOptOut: (optOut: boolean) => void;
  setSelectedCategory: (category: string | null) => void; // NEW: Added setter for the category
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  selectedServices: [],
  selectedDate: null,
  selectedTime: null,
  name: '',
  email: '',
  phone: '',
  newsletterOptOut: false,
  selectedCategory: null, // NEW: Initialized category state

  addService: (item) =>
    set((state) => ({
      selectedServices: [...state.selectedServices, item],
    })),

  removeService: (id) =>
    set((state) => ({
      selectedServices: state.selectedServices.filter((s) => s.id !== id),
    })),

  setDate: (date) => set({ selectedDate: date }),
  setTime: (time) => set({ selectedTime: time }),
  setName: (name) => set({ name }),
  setEmail: (email) => set({ email }),
  setPhone: (phone) => set({ phone }),
  setNewsletterOptOut: (optOut) => set({ newsletterOptOut: optOut }),
  setSelectedCategory: (category) => set({ selectedCategory: category }), // NEW: Setter for the selected category

  clearCart: () =>
    set({
      selectedServices: [],
      selectedDate: null,
      selectedTime: null,
      name: '',
      email: '',
      phone: '',
      newsletterOptOut: false,
      selectedCategory: null,
    }),
}));