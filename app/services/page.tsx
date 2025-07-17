'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useCartStore } from '@/store/cartStore';
import ServiceCard from '@/components/ServiceCard';
import { Service } from '@/types/service';
import { toast } from 'react-hot-toast';

export default function ServicesPage() {
  const router = useRouter();
  const { selectedServices, addService, removeService } = useCartStore();
  const [bgImage, setBgImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState<Service[]>([]);
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    const updateBackground = () => {
      const isDesktop = window.innerWidth >= 768;
      setBgImage(
        isDesktop
          ? 'https://res.cloudinary.com/dpm3yp0xs/image/upload/v1752239513/desbrown_hlthgr.png'
          : 'https://res.cloudinary.com/dpm3yp0xs/image/upload/v1752239517/mobbrown_bzxp1s.png'
      );
    };

    updateBackground();
    window.addEventListener('resize', updateBackground);

    // Simulate fetching services
    const timer = setTimeout(() => {
      setServices([
        { id: '1', name: "Massage Chair Session", price: 5000 },
        { id: '2', name: "Teeth Whitening Laser", price: 15000 },
        { id: '3', name: "Foot Washing & Scrub", price: 4000 },
        { id: '4', name: "Unisex Haircut", price: 5000 },
        { id: '5', name: "Hair Coloring", price: 8000 },
        { id: '6', name: "Unisex Hair Wash", price: 2500 },
        { id: '7', name: "Dreadlock Maintenance", price: 12000 },
        { id: '8', name: "Unisex Shaving & Trimming", price: 3000 },
        { id: '9', name: "Ladies Overall Hair Styling", price: 10000 },
        { id: '10', name: "Unisex Hair Relaxing", price: 6000 },
        { id: '11', name: "Men's Hair & Beard Care", price: 7000 },
        { id: '12', name: "Unisex Blow Dry", price: 2000 },
        { id: '13', name: "Hair Steam Treatment", price: 7000 },
        { id: '14', name: "Unisex Beard Care", price: 4000 },
        { id: '15', name: "Braiding (All Genders)", price: 10000 },
        { id: '16', name: "Nail Tech (Full Manicure)", price: 6000 },
        { id: '17', name: "Unisex Hair Detangling", price: 3500 },
        { id: '18', name: "Facial Cleansing & Mask", price: 8000 },
        { id: '19', name: "Scalp Massage", price: 5000 },
        { id: '20', name: "Kids Hair Styling", price: 4000 },
        { id: '21', name: "French Tip Pedicure", price: 7000 },
      ]);
      setLoading(false);
    }, 1500);

    return () => {
      window.removeEventListener('resize', updateBackground);
      clearTimeout(timer);
    };
  }, []);

  const isSelected = (id: string) => selectedServices.some((s) => s.id === id);

  const toggleService = (id: string) => {
    const service = services.find((s) => s.id === id);
    if (!service) return;
    isSelected(id) ? removeService(id) : addService(service);
  };

  const handleBooking = () => {
    if (selectedServices.length === 0) {
      toast.error('Please select at least one service.');
      return;
    }
    setBookingLoading(true);
    setTimeout(() => router.push('/booking'), 1000);
  };

  return (
    <div
      className="min-h-screen bg-no-repeat bg-cover bg-center px-4 py-6 md:px-8"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="max-w-6xl mx-auto pt-20">
        {/* Header */}
        <div className="flex justify-between items-center bg-[#22372889] rounded pb-4 px-4">
          <div className="flex gap-3 items-center mt-5">
            <Image src="/vertline.svg" alt="line" width={3} height={50} className="w-[3px]" />
            <div className="text-white">
              <h1 className="font-croissant-one text-lg md:text-xl">SALOON</h1>
              <h1 className="font-cinzel-decorative text-lg md:text-xl">SERVICES</h1>
            </div>
          </div>
          <Image src="/3horlines.svg" alt="lines" width={75} height={75} className="w-[50px] md:w-[75px]" />
        </div>

        {/* Service Menu */}
        <h2 className="text-center font-cinzel text-xl md:text-2xl mb-1 hidden md:block md:mt-5">
          SERVICE MENU
        </h2>
        <p className="text-center text-xs font-cormorant-upright mb-6 mt-5 md:mt-1">
          Tick Box Services Needed
        </p>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-4 font-cinzel-decorative">
          {loading
            ? Array(6).fill(0).map((_, i) => (
                <div key={i} className="p-4 bg-[#223728] rounded space-y-2">
                  <Skeleton height={20} width="60%" />
                  <Skeleton height={15} width="80%" />
                  <Skeleton height={25} width="40%" />
                </div>
              ))
            : services.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  selected={isSelected(service.id)}
                  toggle={() => toggleService(service.id)}
                />
              ))}
        </div>

        {/* Book Now */}
        <div className="flex pb-10 justify-center mt-8">
          <button
            disabled={bookingLoading}
            className="bg-[#223728] text-white py-2 px-6 rounded font-cormorant-upright transition-transform hover:scale-105"
            onClick={handleBooking}
          >
            {bookingLoading ? 'Processing...' : 'Book Now'}
          </button>
        </div>
      </div>
    </div>
  );
}
