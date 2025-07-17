'use client';

import { useCartStore } from '@/store/cartStore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import Image from 'next/image';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-hot-toast';

const times = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
];

export default function Booking() {
  const {
    selectedDate,
    selectedTime,
    setDate,
    setTime,
    setName,
    setEmail,
    setPhone
  } = useCartStore();

  const [takenSlots, setTakenSlots] = useState<{ [key: string]: number }>({});
  const [date, setDateInput] = useState<Date | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [tempName, setTempName] = useState('');
  const [tempEmail, setTempEmail] = useState('');
  const [tempPhone, setTempPhone] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!date) return;

    const formattedDate = date.toLocaleDateString('en-CA');
    const fetchTaken = async () => {
      try {
        const res = await fetch(`/api/bookings?date=${formattedDate}`);
        const result = await res.json();

        const bookings = Array.isArray(result) ? result : result.bookings;
        if (!Array.isArray(bookings)) {
          console.error('Invalid bookings data:', result);
          return;
        }

        const countMap: { [key: string]: number } = {};
        for (const booking of bookings) {
          countMap[booking.timeSlot] = (countMap[booking.timeSlot] || 0) + 1;
        }
        setTakenSlots(countMap);
      } catch (error) {
        console.error('Failed to fetch taken slots:', error);
      }
    };

    fetchTaken();
  }, [date]);

  const handleProceed = () => {
    if (!date || !selectedTime) {
      toast.error('Please select a date and time');
      return;
    }
    setShowModal(true);
  };

  const handleModalSubmit = () => {
    if (!tempName.trim() || !tempEmail.trim() || !tempPhone.trim()) {
      toast.error('Please enter all details');
      return;
    }

    const formattedDate = date?.toLocaleDateString('en-CA') || '';
    setDate(formattedDate);
    setName(tempName.trim());
    setEmail(tempEmail.trim());
    setPhone(tempPhone.trim());
    setShowModal(false);
    router.push('/checkout');
  };

  return (
    <div
      className="
        p-6 pt-[120px] 2xl:container mx-auto relative min-h-screen
        bg-[url('https://res.cloudinary.com/dpm3yp0xs/image/upload/v1752234775/mobbbg_idet3u.svg')]
        md:bg-[url('https://res.cloudinary.com/dpm3yp0xs/image/upload/v1752234774/desbbg_kvzphr.svg')]
        bg-cover bg-no-repeat 
      "
    >
      <h1 className="text-xl mb-4 font-semibold text-center font-croissant-one">Select Date & Time</h1>

      <div className="md:flex justify-center w-full relative">
        {loading ? (
          <>
            {/* Calendar skeleton */}
            <div className="max-w-md flex justify-center md:mt-6 relative z-20">
              <Skeleton height={300} width={280} borderRadius={12} />
            </div>

            {/* Time slots skeleton */}
            <div className="grid grid-cols-3 gap-2 mt-6 md:ml-6 relative">
              {[...Array(9)].map((_, idx) => (
                <Skeleton
  key={idx}
  height={40}
  width={90}
  borderRadius={8}
  baseColor="rgba(34, 55, 40, 0.25)"
  highlightColor="rgba(255, 255, 255, 0.05)"
/>

              ))}
            </div>
          </>
        ) : (
          <>
            <div className="max-w-md flex justify-center md:mt-6 relative z-20">
              <DatePicker
                selected={date}
                onChange={(d) => setDateInput(d)}
                inline
                calendarClassName="custom-calendar"
                dayClassName={(d) =>
                  date && d.toDateString() === date.toDateString() ? 'selected-day' : ''
                }
              />
              <Image
                src="/sunflower.png"
                alt="Sunflower"
                height={100}
                width={100}
                className="block w-[150px] md:w-[200px] absolute -left-8 md:-left-24 -z-10"
              />
            </div>

            <div className="grid grid-cols-3 gap-2 mt-6 md:ml-6 relative">
              <Image
                src="/greenflower.png"
                alt="Green Flower veemade"
                height={100}
                width={100}
                className="hidden md:block w-[100px] absolute -right-24 top-1/2 animate-spin-slow"
              />
              {times.map((time) => {
                const isFullyBooked = (takenSlots[time] || 0) >= 2;
                return (
                  <button
                    key={time}
                    onClick={() => setTime(time)}
                    disabled={isFullyBooked}
                    className={`p-2 rounded border transition duration-200 font-cinzel 
                      ${selectedTime === time ? 'bg-[#223728] text-white' : ''}
                      ${isFullyBooked ? 'bg-gray-200 cursor-not-allowed' : 'hover:bg-[#291F19] '}
                    `}
                  >
                    {time}
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>

      {!loading && (
        <div className="mt-10 text-center">
          <button
            className="bg-[#223728] text-white px-6 py-2 rounded transition duration-300 ease-in-out hover:bg-[#291F19] font-cinzel"
            onClick={handleProceed}
          >
            Proceed to Checkout
          </button>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded shadow-md w-[90%] max-w-sm relative">
            <Image
              src="/modrose.png"
              height={100}
              width={100}
              alt="veemade rose"
              className="absolute top-2 -right-1"
            />
            <h2 className="text-lg font-semibold mb-4 font-croissant-one text-[#223728]">Enter your details</h2>

            <input
              type="text"
              placeholder="Name"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              className="w-full mb-3 p-2 border rounded placeholder-[#223728] font-cormorant-upright outline-none text-[#223728]"
            />
            <input
              type="email"
              placeholder="Email"
              value={tempEmail}
              onChange={(e) => setTempEmail(e.target.value)}
              className="w-full mb-3 p-2 border rounded placeholder-[#223728] font-cormorant-upright outline-none text-[#223728]"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={tempPhone}
              onChange={(e) => setTempPhone(e.target.value)}
              className="w-full mb-4 p-2 border rounded placeholder-[#223728] font-cormorant-upright outline-none text-[#223728]"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded font-croissant-one"
              >
                Cancel
              </button>
              <button
                onClick={handleModalSubmit}
                className="bg-[#223728] text-white px-4 py-2 rounded font-croissant-one"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
