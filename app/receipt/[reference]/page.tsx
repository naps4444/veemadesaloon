// File: app/receipt/[reference]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import Loader from '@/components/Loader'; // NEW: Import the Loader component

// UPDATED: The interface now matches the data from your Mongoose model.
interface Service {
  id: string;
  variationId: string;
  serviceName: string;
  variationName: string;
  price: number;
}

const ReceiptPage = () => {
  const params = useParams() as Record<string, string | string[]>;
  const reference = Array.isArray(params?.reference) ? params.reference[0] : params?.reference;
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        // Ensure the API call is to the correct endpoint
        const res = await fetch(`/api/bookings/by-reference?ref=${reference}`);
        const data = await res.json();
        if (data.success) {
          setBooking(data.booking);
        } else {
          // Log specific backend error for debugging
          console.error('API responded with error:', data.message);
        }
      } catch (err) {
        console.error('Failed to load booking:', err);
      } finally {
        setLoading(false);
      }
    };

    if (reference) fetchBooking();
  }, [reference]);

  const downloadPDF = async () => {
    if (!booking) {
      console.error("Booking data not available for PDF generation.");
      return;
    }

    setLoading(true); // NEW: Enable loader while generating the PDF

    // Convert public logo.png to base64
    const toBase64 = async (url: string) => {
      try {
        const res = await fetch(url);
        const blob = await res.blob();
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(blob);
        });
      } catch (e) {
        console.error('Failed to load logo:', e);
        return ''; // Return an empty string on error
      }
    };

    const logoBase64 = await toBase64('/logo.png');

    const doc = new jsPDF();

    // Add logo watermark (light and centered)
    if (logoBase64) {
      doc.addImage(logoBase64, 'PNG', 10, 10, 200, 200, '', 'FAST');
    }
    
    doc.setTextColor(0, 0, 0);

    doc.setFontSize(16);
    doc.text('Veemade Salon Receipt', 20, 20);
    doc.setFontSize(12);
    doc.text(`Receipt Ref: ${reference}`, 20, 30);
    doc.text(`Name: ${booking?.name}`, 20, 38);
    doc.text(`Phone: ${booking?.phone}`, 20, 46);
    doc.text(`Email: ${booking?.email}`, 20, 54);
    doc.text(`Date: ${new Date(booking?.date).toLocaleDateString()}`, 20, 62);
    doc.text(`Time Slot: ${booking?.timeSlot}`, 20, 70);

    // UPDATED: Correctly map the service data for the table
    autoTable(doc, {
      startY: 80,
      head: [['Service', 'Variation', 'Price']],
      body: booking.services.map((s: Service) => [s.serviceName, s.variationName, `₦${s.price.toLocaleString()}`]),
      theme: 'grid',
      headStyles: { fillColor: [34, 55, 40] },
      styles: { fontSize: 11 },
    });

    const finalY = (doc as any).lastAutoTable.finalY + 10;
    doc.setFontSize(13);
    doc.text(`Total: ₦${booking?.total.toLocaleString()}`, 20, finalY);

    doc.save(`receipt-${reference}.pdf`);
    setLoading(false); // NEW: Disable loader after PDF is generated and downloaded
  };

  if (loading) return <Loader />; // NEW: Use the Loader component
  if (!booking) return <p className="text-center mt-10 text-red-500">Booking not found</p>;

  return (
    <div className="max-w-md mx-auto bg-white font-cormorant-upright shadow-lg rounded-xl p-6 border border-gray-200 mt-20 text-[#223728]">
      <h1 className="text-2xl font-bold text-center mb-4">Veemade Unisex Salon</h1>
      <p className="text-sm text-center mb-6">Booking Receipt</p>

      <div className="mb-4 text-sm">
        <p><span className="font-semibold">Customer:</span> {booking.name}</p>
        <p><span className="font-semibold">Phone:</span> {booking.phone}</p>
        <p><span className="font-semibold">Email:</span> {booking.email}</p>
        <p><span className="font-semibold">Date:</span> {new Date(booking.date).toLocaleDateString()}</p>
        <p><span className="font-semibold">Time:</span> {booking.timeSlot}</p>
      </div>

      <hr className="my-4" />

      <div>
        <h2 className="font-semibold mb-2">Services Booked:</h2>
        <ul className="text-sm space-y-2">
          {booking.services.map((service: Service, index: number) => (
            <li key={index} className="flex justify-between">
              {/* UPDATED: Display serviceName and variationName */}
              <span>{service.serviceName} ({service.variationName})</span>
              <span>₦{service.price.toLocaleString()}</span>
            </li>
          ))}
        </ul>
      </div>

      <hr className="my-4" />

      <div className="flex justify-between font-bold text-lg">
        <span>Total</span>
        <span>₦{booking.total.toLocaleString()}</span>
      </div>

      <button
        onClick={downloadPDF}
        className="mt-6 w-full bg-[#223728] hover:bg-[#5A4028] px-4 py-2 rounded text-white"
      >
        Download Receipt (PDF)
      </button>

      <p className="text-xs text-center mt-6 text-[#5A4028]">
        Thank you for booking with us!
      </p>
    </div>
  );
};

export default ReceiptPage;
