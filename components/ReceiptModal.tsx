'use client';

import React, { RefObject } from 'react';
import { Service } from '@/types/service';

interface ReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownload: () => void;
  name: string;
  email: string;
  phone: string;
  date: string | null;
  time: string | null;
  services: Service[];
  total: number;
  receiptRef: RefObject<HTMLDivElement | null>; // ✅ Allow null here
}

const ReceiptModal = ({
  isOpen,
  onClose,
  onDownload,
  name,
  email,
  phone,
  date,
  time,
  services,
  total,
  receiptRef,
}: ReceiptModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded shadow-lg max-w-lg w-full p-6 relative">
        <h2 className="text-xl font-bold mb-4 font-cinzel">Booking Receipt</h2>

        <div ref={receiptRef} className="text-sm font-cormorant-upright">
          <p><strong>Name:</strong> {name}</p>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Phone:</strong> {phone}</p>
          <p><strong>Date:</strong> {date}</p>
          <p><strong>Time:</strong> {time}</p>
          <ul className="mt-2 space-y-1">
            {services.map((s) => (
              <li key={s.id}>
                {s.name} — ₦{s.price}
              </li>
            ))}
          </ul>
          <p className="mt-2 font-bold">Total: ₦{total}</p>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onDownload}
            className="bg-[#223728] text-white px-4 py-2 rounded font-cinzel"
          >
            Download PDF
          </button>
          <button
            onClick={onClose}
            className="border border-gray-400 px-4 py-2 rounded font-cinzel"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReceiptModal;
