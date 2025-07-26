'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useCartStore } from '@/store/cartStore';
import { toast } from 'react-hot-toast';
import { useState } from 'react';

const allServices = [
  { id: 1, name: "Massage Chair Session", price: 5000 },
  { id: 2, name: "Teeth Whitening Laser", price: 15000 },
  { id: 3, name: "Foot Washing & Scrub", price: 4000 },
  { id: 4, name: "Unisex Haircut", price: 5000 },
  { id: 5, name: "Hair Coloring", price: 8000 },
  { id: 6, name: "Unisex Hair Wash", price: 2500 },
  { id: 7, name: "Dreadlock Maintenance", price: 12000 },
  { id: 8, name: "Unisex Shaving & Trimming", price: 3000 },
  { id: 9, name: "Ladies Overall Hair Styling", price: 10000 },
  { id: 10, name: "Unisex Hair Relaxing", price: 6000 },
  { id: 11, name: "Men's Hair & Beard Care", price: 7000 },
  { id: 12, name: "Unisex Blow Dry", price: 2000 },
  { id: 13, name: "Hair Steam Treatment", price: 7000 },
  { id: 14, name: "Unisex Beard Care", price: 4000 },
  { id: 15, name: "Braiding (All Genders)", price: 10000 },
  { id: 16, name: "Nail Tech (Full Manicure)", price: 6000 },
  { id: 17, name: "Unisex Hair Detangling", price: 3500 },
  { id: 18, name: "Facial Cleansing & Mask", price: 8000 },
  { id: 19, name: "Scalp Massage", price: 5000 },
  { id: 20, name: "Kids Hair Styling", price: 4000 },
];

const Services = () => {
  const [bookingLoading, setBookingLoading] = useState(false); // ✅ Moved here
  const router = useRouter();
  const { selectedServices, addService, removeService } = useCartStore();

  const toggleService = (service: (typeof allServices)[0]) => {
    const exists = selectedServices.find((s) => Number(s.id) === Number(service.id));
    if (exists) {
      removeService(String(service.id));
    } else {
      addService({ ...service, id: String(service.id) });
    }
  };

  const handleBookNow = () => {
    if (selectedServices.length === 0) {
      toast.error('Please select at least one service.');
      return;
    }

    setBookingLoading(true);
    setTimeout(() => {
      router.push('/booking');
    }, 800); // optional delay for feedback
  };

  const firstHalf = allServices.slice(0, 10);
  const secondHalf = allServices.slice(10);

  return (
    <div>
      <div className="2xl:container mx-auto relative md:py-4 mb-6 mt-4">
        <div className="flex justify-between items-center mx-auto w-11/12 relative">
          <div className="flex gap-3 relative">
            <Image src="/vertline.svg" alt="vertical line" width={20} height={20} className="w-[2px] md:absolute md:-left-3 md:w-[3px]" />
            <div className="hidden md:block md:text-[18px]">
              <h1 className="font-croissant-one">SALOON</h1>
              <h1 className="ml-3 font-cinzel-decorative">SERVICES</h1>
            </div>
          </div>

          <div className="md:hidden">
            <h1 className="font-croissant-one">SALOON SERVICES</h1>
          </div>

          <div>
            <Image src="/3horlines.svg" alt="menu" width={100} height={50} className="w-[50px] md:mb-8 md:w-[75px] absolute right-0 top-7 md:top-6" />
          </div>
        </div>

        <div className="bg-[#291F19] p-2 py-6 w-full md:w-11/12 mt-2 md:mt-4 mx-auto left-1/2 transform top-19 md:px-2 md:top-16">
          <h1 className="text-white hidden md:block text-center font-cinzel">SERVICE MENU</h1>
          <p className="text-white text-[10px] text-center font-cormorant-upright">Tick Box Services Needed</p>

          <div className="md:grid md:grid-cols-2 md:gap-8 font-cinzel-decorative">
            {[firstHalf, secondHalf].map((half, colIndex) => (
              <div key={colIndex}>
                {half.map((service) => (
                  <label
                    key={service.id}
                    className="w-full cursor-pointer text-white flex justify-between items-center gap-4 my-4 md:my-8 transition-transform duration-300 hover:scale-105"
                  >
                    <div className="flex items-center gap-2 shrink-0">
                      <input
                        type="checkbox"
                        className="w-4 h-4 accent-[#B19D60]"
                        checked={selectedServices.some((s) => Number(s.id) === service.id)}
                        onChange={() => toggleService(service)}
                      />
                      <p className="whitespace-nowrap text-sm">{service.name}</p>
                    </div>
                    <div className="hidden md:block flex-1 h-[1px] bg-white mx-2"></div>
                    <p className="whitespace-nowrap text-sm">₦{service.price.toLocaleString()}</p>
                  </label>
                ))}
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleBookNow}
              disabled={bookingLoading}
              className={`w-4/12 mx-auto bg-[#B19D60] text-white py-[2px] md:py-[4px] mt-4 md:mt-8 
                transition-transform duration-300 font-cormorant-upright 
                ${bookingLoading ? 'opacity-60 cursor-not-allowed' : 'hover:scale-105'}`}
            >
              {bookingLoading ? 'Processing...' : 'Book Now'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
