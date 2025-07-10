// app/receipt/[ref]/page.tsx

import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';

interface Service {
  id: string;
  name: string;
  price: number;
}

interface ReceiptPageProps {
  params: any; // Avoid destructuring in the function parameter
}

export default async function ReceiptPage(props: ReceiptPageProps) {
  const ref = props.params.ref; // Extract inside function body

  const booking = await prisma.booking.findUnique({
    where: { reference: ref },
  });

  if (!booking) return notFound();

  let parsedServices: Service[] = [];

  try {
    parsedServices = Array.isArray(booking.services)
      ? booking.services
      : typeof booking.services === 'string'
        ? JSON.parse(booking.services)
        : [];
  } catch (error) {
    console.error('Invalid services JSON:', error);
    return notFound();
  }

  return (
    <div className="p-6 mt-20 max-w-2xl mx-auto font-cinzel">
      <h1 className="text-2xl font-bold mb-6 text-center">Receipt</h1>

      <div className="border p-4 rounded shadow">
        <p><strong>Reference:</strong> {booking.reference}</p>
        <p><strong>Name:</strong> {booking.name}</p>
        <p><strong>Email:</strong> {booking.email}</p>
        <p><strong>Phone:</strong> {booking.phone}</p>
        <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
        <p><strong>Time:</strong> {booking.timeSlot}</p>

        <h2 className="mt-6 text-lg font-semibold">Services</h2>
        <ul className="list-disc ml-6">
          {parsedServices.map((service) => (
            <li key={service.id}>
              {service.name} – ₦{Number(service.price).toLocaleString()}
            </li>
          ))}
        </ul>

        <p className="mt-4 font-bold text-right">
          Total: ₦{Number(booking.total).toLocaleString()}
        </p>
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={() => window.print()}
          className="bg-[#223728] text-white px-4 py-2 rounded hover:bg-[#291F19]"
        >
          Print Receipt
        </button>
      </div>
    </div>
  );
}
