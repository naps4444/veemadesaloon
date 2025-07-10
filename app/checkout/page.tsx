'use client';

import React, { useEffect, useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';

declare global {
  interface Window {
    PaystackPop: any;
  }
}

export default function CheckoutPage() {
  const {
    selectedServices,
    selectedDate,
    selectedTime,
    name,
    email,
    phone,
    clearCart,
    removeService,
  } = useCartStore();

  const [paystackReady, setPaystackReady] = useState(false);
  const router = useRouter();

  const total = selectedServices.reduce((sum, s) => sum + s.price, 0);

  useEffect(() => {
    const loadPaystack = () => {
      if (window.PaystackPop) {
        setPaystackReady(true);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://js.paystack.co/v1/inline.js';
      script.async = true;
      script.onload = () => setPaystackReady(true);
      script.onerror = () => {
        console.error('Failed to load Paystack script');
        alert('Payment system failed to load. Please refresh.');
      };
      document.body.appendChild(script);
    };

    loadPaystack();
  }, []);

  const handlePaystackCallback = async (response: any) => {
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reference: response.reference,
          name,
          email,
          phone,
          services: selectedServices,
          total,
          date: selectedDate,
          timeSlot: selectedTime,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error('Server response (not JSON):', text);
        alert('Booking failed.');
        return;
      }

      const data = await res.json();
      console.log('Booking confirmed:', data);

      clearCart();

      // Redirect to receipt page with query data
      const query = new URLSearchParams({
  name: name || '',
  email: email || '',
  phone: phone || '',
  date: selectedDate || '',
  time: selectedTime || '',
  total: total.toString(),
  services: JSON.stringify(selectedServices),
}).toString();

router.push(`/receipt/${response.reference}`);



    } catch (err) {
      console.error('Callback error:', err);
      alert('Booking failed due to an internal error.');
    }
  };

  const handlePaystackClose = () => {
    alert('Payment window closed.');
  };

  const pay = () => {
    if (!paystackReady) {
      alert('Paystack script is not ready. Please wait.');
      return;
    }

    if (!selectedDate || !selectedTime || selectedServices.length === 0) {
      alert('Missing booking info. Please go back and complete your selection.');
      return;
    }

    const handler = window.PaystackPop.setup({
      key: process.env.NEXT_PUBLIC_PAYSTACK_KEY || '',
      email: email || 'customer@example.com',
      amount: total * 100,
      currency: 'NGN',
      callback: (response: any) => handlePaystackCallback(response),
      onClose: handlePaystackClose,
    });

    handler.openIframe();
  };

  return (
    <div className="p-3 mt-20 2xl:container mx-auto ">
      <h1 className="text-xl font-semibold mb-4 font-croissant-one text-center">Booking Summary</h1>

      {selectedServices.length === 0 ? (
        <p className="text-red-600 font-dancing-script text-center">No services selected.</p>
      ) : (
        <ul className="space-y-3 text-center">
          {selectedServices.map((s) => (
            <li
              key={s.id}
              className="flex justify-between items-center border-b font-cormorant-upright pb-2"
            >
              <span>{s.name} - ₦{s.price}</span>
              <button
                onClick={() => removeService(s.id)}
                className="text-red-500 hover:text-red-700 "
                aria-label="Remove service"
              >
                <X size={18} />
              </button>
            </li>
          ))}
        </ul>
      )}

      <p className="mt-4 font-bold font-cinzel text-center">Total: ₦{total}</p>

      <button
        onClick={pay}
        disabled={selectedServices.length === 0 || !paystackReady}
        className="mt-6 bg-[#223728] text-white px-6 mx-auto py-2 rounded disabled:opacity-50 block font-cinzel"
      >
        {paystackReady ? 'Pay Now' : 'Loading...'}
      </button>

      <div className='relative mb-10'>
              <div className='md:flex md:justify-between md:w-[300px] md:mx-auto md:mt-8 text-center'>
        <p className="mt-4 font-cinzel">
        Date: <strong>{selectedDate || 'Not selected'}</strong>
      </p>
      <p className="mt-4 font-cinzel">
        Time: <strong>{selectedTime || 'Not selected'}</strong>
      </p>
      <Image
  src="https://res.cloudinary.com/dpm3yp0xs/image/upload/v1751993887/Untitled_design_x8nf5x.png"
  alt="Sunflower"
  height={100}
  width={100}
  className="block w-full absolute  -z-10"
/>

      
      
      </div>





      

      {(!selectedDate || !selectedTime) && (
        <div className="mt-2 font-dancing-script mx-auto text-center">
          <Link href="/select-slot" className="text-[#B19D60] underline text-sm">
            Select Date & Time
          </Link>
        </div>
      )}

      <div className="mt-6 md:mt-10 font-cormorant-upright flex flex-col  mx-auto items-center">
        <h2 className="text-lg font-semibold mb-2">Your Details</h2>

        <div className='md:grid md:grid-cols-3 md:justify-between md:w-10/12 lg:w-8/12 text-center font-lucida-bright'>
        <p>Name: <strong>{name || 'Not provided'}</strong></p>
        <p>Email: <strong>{email || 'Not provided'}</strong></p>
        <p>Phone: <strong>{phone || 'Not provided'}</strong></p>
        </div>
       
      </div>
        </div>
    </div>
  );
}
