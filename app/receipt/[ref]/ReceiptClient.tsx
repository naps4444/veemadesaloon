'use client';

import { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface Service {
  id: string;
  name: string;
  price: number;
}

interface Props {
  refId: string;
  searchParams: {
    name?: string;
    email?: string;
    phone?: string;
    date?: string;
    time?: string;
    total?: string;
    services?: string;
  };
}

export default function ReceiptClient({ refId, searchParams }: Props) {
  const receiptRef = useRef<HTMLDivElement>(null);

  const {
    name = 'N/A',
    email = 'N/A',
    phone = 'N/A',
    date = 'N/A',
    time = 'N/A',
    total = '0',
    services,
  } = searchParams;

  const parsedServices: Service[] = services ? JSON.parse(services) : [];

  const downloadPDF = async () => {
    const element = receiptRef.current;
    if (!element) return;

    const canvas = await html2canvas(element, {
      backgroundColor: '#ffffff',
      scale: 2,
      useCORS: true,
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 10, 10, pdfWidth - 20, pdfHeight);
    pdf.save('booking-receipt.pdf');
  };

  return (
    <main className="p-6 max-w-xl mx-auto print:w-full font-cormorant-upright">
      <div ref={receiptRef} className="border p-4 rounded shadow bg-white">
        <h1 className="text-2xl font-bold text-center mb-4">Booking Receipt</h1>
        <p><strong>Reference:</strong> {refId}</p>
        <p><strong>Date:</strong> {date}</p>
        <p><strong>Time:</strong> {time}</p>

        <h2 className="mt-4 text-lg font-semibold">Customer Info</h2>
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Phone:</strong> {phone}</p>

        <h2 className="mt-4 text-lg font-semibold">Services</h2>
        <ul className="list-disc list-inside">
          {parsedServices.map((s) => (
            <li key={s.id}>{s.name} - ₦{s.price}</li>
          ))}
        </ul>

        <p className="mt-4 font-bold">Total: ₦{total}</p>
      </div>

      <div className="flex gap-4 mt-6 print:hidden">
        <button onClick={() => window.print()} className="bg-black text-white px-4 py-2 rounded w-1/2">
          Print
        </button>
        <button onClick={downloadPDF} className="bg-[#223728] text-white px-4 py-2 rounded w-1/2">
          Download PDF
        </button>
      </div>
    </main>
  );
}
