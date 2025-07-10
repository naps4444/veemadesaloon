// lib/paystack.ts
export function generateReference() {
  return `SALON-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}
