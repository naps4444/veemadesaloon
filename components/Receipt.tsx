// components/Receipt.tsx
import { Service } from '@/types/service';

interface ReceiptProps {
  name: string;
  email: string;
  services: Service[];
  total: number;
  reference: string;
}

export default function Receipt({ name, email, services, total, reference }: ReceiptProps) {
  return (
    <div className="p-6 max-w-xl mx-auto border print:border-0">
      <h1 className="text-xl font-bold mb-2">Salon Receipt</h1>
      <p><strong>Name:</strong> {name}</p>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Reference:</strong> {reference}</p>
      <p><strong>Date:</strong> {new Date().toLocaleString()}</p>

      <hr className="my-4" />

      <ul className="space-y-2">
        {services.map((service) => (
          <li key={service.id} className="flex justify-between">
            <span>{service.name}</span>
            <span>₦{service.price}</span>
          </li>
        ))}
      </ul>

      <hr className="my-4" />

      <p className="font-bold text-lg">Total: ₦{total}</p>

      <button
        onClick={() => window.print()}
        className="mt-4 bg-black text-white px-4 py-2 rounded"
      >
        Print Receipt
      </button>
    </div>
  );
}
