'use client';

import React, { useEffect, useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import { toast } from 'react-hot-toast';
import Loader from '@/components/Loader'; // NEW: Import the Loader component

declare global {
  interface Window {
    PaystackPop: any;
  }
}

// Define your WhatsApp number here, same as ServicesPage for consistency
const WHATSAPP_NUMBER = '2349036682394'; // ✨ IMPORTANT: Replace with your actual WhatsApp number

export default function CheckoutPage() {
  const {
    selectedServices,
    selectedDate,
    selectedTime,
    name,
    email,
    phone,
    newsletterOptOut,
    clearCart,
    removeService,
  } = useCartStore();

  const [paystackReady, setPaystackReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // NEW: Add a loading state
  const router = useRouter();

  // Calculate total, ignoring services with price 0 for payment
  const total = selectedServices.reduce((sum, s) => (s.price > 0 ? sum + s.price : sum), 0);

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
        toast.error('Payment system failed to load. Please refresh.');
      };
      document.body.appendChild(script);
    };

    loadPaystack();
  }, []);

  const handlePaystackCallback = async (response: any) => {
    // We keep the loader on while the booking is being confirmed
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
          total, // This total only includes priced services
          date: selectedDate,
          timeSlot: selectedTime,
          newsletterOptOut,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error('Server response (not JSON):', text);
        toast.error('Booking failed.');
        setIsLoading(false); // Turn off loader on error
        return;
      }

      const data = await res.json();
      console.log('Booking confirmed:', data);
      toast.success('Booking successful!');
      clearCart();

      // The loader will remain active until the receipt page is rendered
      router.push(`/receipt/${response.reference}`);
    } catch (err) {
      console.error('Callback error:', err);
      toast.error('Booking failed due to an internal error.');
      setIsLoading(false); // Turn off loader on error
    }
  };

  const handlePaystackClose = () => {
    toast.error('Payment window closed.');
    setIsLoading(false); // Turn off loader if the user closes the payment window
  };

  const pay = () => {
    if (!paystackReady) {
      toast.error('Paystack script is not ready. Please wait.');
      return;
    }

    if (!selectedDate || !selectedTime || selectedServices.length === 0) {
      toast.error('Missing booking info. Please go back and complete your selection.');
      return;
    }

    // Check for services without a price
    const servicesWithoutPrice = selectedServices.filter(item => item.price === 0);

    if (servicesWithoutPrice.length > 0) {
      // Generate WhatsApp message including date and time
      let message = `Hello, I'd like to inquire about the prices for the following services I've added to my cart:\n\n` +
                    `Date: ${selectedDate || 'Not selected'}\n` +
                    `Time: ${selectedTime || 'Not selected'}\n\n`;

      selectedServices.forEach((item, index) => {
        message += `${index + 1}. ${item.serviceName} - ${item.variationName}`;
        if (item.price === 0) {
          message += " (Price Inquiry)";
        } else {
          message += ` (₦${item.price.toLocaleString()})`;
        }
        message += "\n";
      });
      message += "\nCould you please provide more details?";

      // Encode the message for URL and redirect to WhatsApp
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
      
      setIsLoading(true); // Show loading state briefly
      setTimeout(() => {
        window.location.href = whatsappUrl; // Changed to window.location.href
        setIsLoading(false);
      }, 1000); // Small delay for visual feedback
      
      toast.success('Redirecting to WhatsApp for price inquiry!');
      return; // Stop the function here, do not proceed to Paystack
    }

    // Only proceed to Paystack if all selected services have a price > 0
    setIsLoading(true); // Enable the loader when payment is initiated

    const handler = window.PaystackPop.setup({
      key: process.env.NEXT_PUBLIC_PAYSTACK_KEY || '',
      email: email || 'customer@example.com',
      amount: total * 100, // Paystack amount is in kobo/centavos
      currency: 'NGN',
      callback: (response: any) => handlePaystackCallback(response),
      onClose: handlePaystackClose,
    });

    handler.openIframe();
  };

  return (
    <>
      {isLoading && <Loader />} {/* Conditionally render the loader */}
      <div
        className="pt-[120px] pb-[120px] md:pb-[60px] bg-[url('https://res.cloudinary.com/dpm3yp0xs/image/upload/v1752259396/black-wooden-wall_onadlw.jpg')] bg-cover bg-no-repeat bg-center 2xl:container mx-auto"
      >
        <div className='bg-[#373522c4] rounded-lg shadow-lg md:grid md:grid-cols-2 md:justify-between md:gap-5 w-10/12 md:w-10/12 mx-auto py-10'>
          <div className='md:flex md:justify-end'>
            <div className='md:w-10/12 py-4 '>
              <h1 className="text-xl font-semibold mb-4 font-croissant-one text-center ">Booking Summary</h1>
              {selectedServices.length === 0 ? (
                <p className="text-red-600 font-dancing-script text-center">No services selected.</p>
              ) : (
                <ul className="space-y-3 text-center px-4">
                  {selectedServices.map((s) => (
                    <li
                      key={s.id}
                      className="flex justify-between items-center border-b font-cormorant-upright pb-2"
                    >
                      <span>
                        {s.serviceName} ({s.variationName}) -{' '}
                        {s.price === 0 ? (
                          <span className="text-yellow-400">Ask for price</span>
                        ) : (
                          `₦${s.price.toLocaleString()}`
                        )}
                      </span>
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
              <p className="mt-4 font-bold font-cinzel text-center">
                Total:{' '}
                {total === 0 && selectedServices.some(s => s.price === 0) ? (
                  <span className="text-yellow-400">Inquire for Price</span>
                ) : (
                  `₦${total.toLocaleString()}`
                )}
              </p>
              <button
                onClick={pay}
                disabled={selectedServices.length === 0 || !paystackReady}
                className="mt-6 bg-[#223728] text-white px-6 mx-auto py-2 rounded disabled:opacity-50 block font-cinzel"
              >
                {paystackReady ? 'Proceed' : 'Loading...'}
              </button>
            </div>
          </div>
          <div className='relative md:mt-0 mt-4 md:flex md:justify-start md:items-center'>
            <div className='mx-auto'>
              {(selectedDate || selectedTime) && (
                <div className='md:flex md:justify-between md:w-[260px] md:mx-auto md:mt-0 text-center'>
                  <p className="mt-4 md:mt-0 font-cinzel">
                    Date: <strong>{selectedDate || 'Not selected'}</strong>
                  </p>
                  <p className="mt-2 md:mt-0 font-cinzel">
                    Time: <strong>{selectedTime || 'Not selected'}</strong>
                  </p>
                </div>
              )}
              
              {(!selectedDate || !selectedTime) && (
                <div className="mt-2 font-dancing-script mx-auto text-center w-full flex justify-center items-center">
                  <Link href="/booking" className="text-[#B19D60] underline text-sm mx-auto">
                    Select Date & Time
                  </Link>
                </div>
              )}
              
              {(name || email || phone) && (
                <div className="mt-4 md:mt-6 font-cormorant-upright flex flex-col mx-auto items-center">
                  <h2 className="text-lg mt-2 font-semibold">Your Details:</h2>
                  <div className="flex flex-col justify-between lg:gap-2 w-10/12 lg:w-11/12  mx-auto text-start font-lucida-bright bg-[#223728] rounded-lg px-6 xl:px-14 py-3 mt-2">
                    <p className='md:whitespace-normal break-words'> {/* ✨ Added break-words */}
                      Name: <strong>{name || 'Not provided'}</strong>
                    </p>
                    <p className='md:whitespace-normal break-words mt-2'> {/* ✨ Added break-words */}
                      Email: <strong>{email || 'Not provided'}</strong>
                    </p>
                    <p className='md:whitespace-normal break-words mt-2'> {/* ✨ Added break-words */}
                      Phone: <strong>{phone || 'Not provided'}</strong>
                    </p>
                    {/* NEW: Display newsletter preference */}
                    {/* <p>
                      Newsletter: <strong>{newsletterOptOut ? 'No' : 'Yes'}</strong>
                    </p> */}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
