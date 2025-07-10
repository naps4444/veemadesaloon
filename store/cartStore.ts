import { create } from 'zustand';
import { Service } from '@/types/service';

interface CartState {
  selectedServices: Service[];
  selectedDate: string | null;
  selectedTime: string | null;
  name: string;
  email: string;
  phone: string;
  addService: (service: Service) => void;
  removeService: (id: string) => void;
  setDate: (date: string) => void;
  setTime: (time: string) => void;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setPhone: (phone: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  selectedServices: [],
  selectedDate: null,
  selectedTime: null,
  name: '',
  email: '',
  phone: '',

  addService: (service) =>
    set((state) => {
      const exists = state.selectedServices.some((s) => s.id === service.id);
      if (exists) return state; // Prevent duplicates
      return {
        selectedServices: [...state.selectedServices, service],
      };
    }),

  removeService: (id) =>
    set((state) => ({
      selectedServices: state.selectedServices.filter((s) => s.id !== id),
    })),

  setDate: (date) => set({ selectedDate: date }),
  setTime: (time) => set({ selectedTime: time }),
  setName: (name) => set({ name }),
  setEmail: (email) => set({ email }),
  setPhone: (phone) => set({ phone }),

  clearCart: () =>
    set({
      selectedServices: [],
      selectedDate: null,
      selectedTime: null,
      name: '',
      email: '',
      phone: '',
    }),
}));
