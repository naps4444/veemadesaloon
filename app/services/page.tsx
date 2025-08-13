'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useCartStore } from '@/store/cartStore'; // UPDATED: Import the Zustand store
import ServiceCard from '@/components/ServiceCard';
import { toast } from 'react-hot-toast';
import Sidebar from '@/components/Sidebar';
import { Menu } from 'lucide-react';

// Using the latest types/service.ts, which define _id
import type { Category, Service, Variation, CartItem } from '@/types/service';

const ITEMS_PER_PAGE = 4;

export default function ServicesPage() {
  const router = useRouter();
  const { selectedServices, addService, removeService } = useCartStore();
  const selectedCategory = useCartStore((state) => state.selectedCategory); // UPDATED: Get category from Zustand
  const setSelectedCategory = useCartStore((state) => state.setSelectedCategory); // UPDATED: Get the setter for sidebar
  const [bgImage, setBgImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalServices, setTotalServices] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const totalPages = Math.ceil(totalServices / ITEMS_PER_PAGE);

  const updateBackground = useCallback(() => {
    const isDesktop = window.innerWidth >= 768;
    setBgImage(
      isDesktop
        ? 'https://res.cloudinary.com/dpm3yp0xs/image/upload/v1752239513/desbrown_hlthgr.png'
        : 'https://res.cloudinary.com/dpm3yp0xs/image/upload/v1752239517/mobbrown_bzxp1s.png'
    );
  }, []);

  const fetchServices = useCallback(async () => {
    setLoading(true);
    try {
      const categoryParam = selectedCategory ? `&category=${selectedCategory}` : '';
      const response = await fetch(
        `/api/services?page=${currentPage}&perPage=${ITEMS_PER_PAGE}&search=${searchQuery}${categoryParam}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch services');
      }
      const data = await response.json();
      if (data && Array.isArray(data.categories)) {
        setCategories(data.categories);
        setTotalServices(data.totalCount);
      } else {
        setCategories([]);
        setTotalServices(0);
        console.error('API response does not contain a valid categories array.');
      }
    } catch (error) {
      console.error('Error fetching services:', error);
      toast.error('Failed to load services. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchQuery, selectedCategory]);

  useEffect(() => {
    updateBackground();
    window.addEventListener('resize', updateBackground);
    fetchServices();
    
    return () => {
      window.removeEventListener('resize', updateBackground);
    };
  }, [updateBackground, fetchServices]);

  const handleCategoryClick = useCallback((categoryName: string) => {
    setSearchQuery('');
    setCurrentPage(1);
    setSelectedCategory(categoryName); // UPDATED: Use the Zustand setter for the category
    setIsSidebarOpen(false);
  }, [setSelectedCategory]);

  // isSelected should now use variation._id for comparison
  const isSelected = (variationId: string) =>
    selectedServices.some((s) => s.variationId === variationId);

  const toggleVariation = (service: Service, variation: Variation) => {
    // Correctly use _id for service and variation
    const cartItemId = `${service._id}-${variation._id}`;
    const existingItem = selectedServices.find((item) => item.id === cartItemId);
    
    if (existingItem) {
      removeService(cartItemId);
    } else {
      const cartItem: CartItem = {
        id: cartItemId,
        serviceId: service._id,     // Use service._id
        variationId: variation._id, // Use variation._id
        serviceName: service.name,
        variationName: variation.name,
        price: variation.price,
      };
      addService(cartItem);
    }
  };

  const handleBooking = () => {
    if (selectedServices.length === 0) {
      toast.error('Please select at least one service variation.');
      return;
    }
    setBookingLoading(true);
    setTimeout(() => router.push('/booking'), 1000);
  };

  return (
    <div
      className="min-h-screen 2xl:container mx-auto bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="flex h-full">
        <Sidebar
          isOpen={isSidebarOpen}
          closeSidebar={() => setIsSidebarOpen(false)}
          onCategoryClick={handleCategoryClick}
        />
        <main className="flex-grow p-4 md:p-8 overflow-y-auto">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="md:hidden fixed top-20 left-4 z-50 p-2 rounded-full bg-[#223728] text-white shadow-lg"
            aria-label="Open sidebar"
          >
            <Menu size={24} />
          </button>
          <div className="max-w-6xl mx-auto pt-20">
            <div className="flex justify-between items-center bg-[#22372889] rounded pb-4 px-4">
              <div className="flex gap-3 items-center mt-5">
                <Image src="/vertline.svg" alt="line" width={3} height={50} className="w-[3px]" />
                <div className="text-white">
                  <h1 className="font-croissant-one text-lg md:text-xl">
                    {selectedCategory || 'SALOON'}
                  </h1>
                  <h1 className="font-cinzel-decorative text-lg md:text-xl">SERVICES</h1>
                </div>
              </div>
              <Image src="/3horlines.svg" alt="lines" width={75} height={75} className="w-[50px] md:w-[75px]" />
            </div>
            <h2 className="text-center font-cinzel text-xl md:text-2xl mb-1 hidden md:block md:mt-5">
              SERVICE MENU
            </h2>
            <p className="text-center text-xs font-cormorant-upright mb-6 mt-5 md:mt-1">
              Tick Box Services Needed
            </p>
            <div className="flex justify-center mb-6">
              <input
                type="text"
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full max-w-md px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-700 bg-white text-[#223728] placeholder-gray-400"
              />
            </div>
            {loading ? (
              <div className="grid md:grid-cols-2 gap-4 font-cinzel-decorative">
                {Array(ITEMS_PER_PAGE)
                  .fill(0)
                  .map((_, i) => (
                    <div key={`skeleton-${i}`} className="p-4 bg-[#223728] rounded space-y-2">
                      <Skeleton height={20} width="60%" />
                      <Skeleton height={15} width="80%" />
                      <Skeleton height={25} width="40%" />
                    </div>
                  ))}
              </div>
            ) : (
              categories.map((category) => (
                <div key={category._id}>
                  <h3 className="text-white text-xl font-bold mt-8 mb-4">
                    {category.name}
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4 font-cinzel-decorative">
                    {category.services.map((service) => (
                      <ServiceCard
                        key={service._id}
                        service={service}
                        selectedServices={selectedServices}
                        toggleVariation={toggleVariation}
                        isSelected={isSelected}
                      />
                    ))}
                  </div>
                </div>
              ))
            )}
            {!loading && totalServices > ITEMS_PER_PAGE && (
              <div className="flex justify-center items-center mt-8 space-x-4">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="bg-[#223728] text-white py-2 px-4 rounded disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="text-white">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="bg-[#223728] text-white py-2 px-4 rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
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
        </main>
      </div>
    </div>
  );
}
