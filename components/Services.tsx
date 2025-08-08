'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useCartStore } from '@/store/cartStore'; // NEW: Import the Zustand store

// The categories array provided by the user.
const dummyCategories = [
  { id: '1', name: 'Braids and Extensions' },
  { id: '2', name: 'Dreadlock' },
  { id: '3', name: 'Extension Hair Plait for Men' },
  { id: '4', name: 'Facial' },
  { id: '5', name: 'Hair Coloring' },
  { id: '6', name: 'Massage' },
  { id: '7', name: 'Men Hair Cut' },
  { id: '8', name: 'Men Hair Plait' },
  { id: '9', name: 'Nails' },
  { id: '10', name: 'Natural Hair' },
  { id: '11', name: 'Pedicure and Manicure' },
  { id: '12', name: 'Take Out' },
  { id: '13', name: 'Teeth Whitening' },
  { id: '14', name: 'Wigging/Installation/Sewin' },
];

const CategoryList = () => {
  const router = useRouter();
  const setSelectedCategory = useCartStore((state) => state.setSelectedCategory); // NEW: Get the setter from Zustand

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName); // NEW: Set the category in the Zustand store
    router.push('/services');
  };

  const handleBookNow = () => {
    setSelectedCategory(null); // Optional: Clear the category when clicking "Book Now"
    router.push('/services');
  };

  return (
    <div>
      <div className="2xl:container mx-auto relative md:py-4 mb-6 mt-4">
        {/* Replicated header design from the services page */}
        <div className="flex justify-between items-center mx-auto w-11/12 relative">
          <div className="flex gap-3 relative">
            <Image src="/vertline.svg" alt="vertical line" width={20} height={20} className="w-[2px] md:absolute md:-left-3 md:w-[3px]" />
            <div className="hidden md:block md:text-[18px]">
              <h1 className="font-croissant-one">SALOON</h1>
              <h1 className="ml-3 font-cinzel-decorative">CATEGORIES</h1>
            </div>
          </div>
          <div className="md:hidden">
            <h1 className="font-croissant-one">SALOON CATEGORIES</h1>
          </div>
          <div>
            <Image src="/3horlines.svg" alt="menu" width={100} height={50} className="w-[50px] md:mb-8 md:w-[75px] absolute right-0 top-7 md:top-6" />
          </div>
        </div>

        {/* Replicated service menu section design */}
        <div className="bg-[#291F19] p-2 py-6 w-full md:w-11/12 mt-2 md:mt-4 mx-auto left-1/2 transform top-19 md:px-2 md:top-16">
          <h1 className="text-white hidden md:block text-center font-cinzel">CATEGORY MENU</h1>
          <p className="text-white text-[10px] text-center font-cormorant-upright">Explore our services</p>

          {/* Container for the two-column layout of categories */}
          <div className="md:grid md:grid-cols-2 md:gap-4 font-cinzel-decorative px-4">
            {dummyCategories.map((category) => (
              <div
                key={category.id}
                onClick={() => handleCategoryClick(category.name)}
                className="w-full cursor-pointer text-white flex items-center justify-center p-3 my-4 md:my-4 transition-transform duration-300 hover:scale-105 border border-[#B19D60] rounded-lg"
              >
                <p className="whitespace-nowrap text-sm">{category.name}</p>
              </div>
            ))}
          </div>

          {/* Book Now button */}
          <div className="flex justify-center">
            <button
              onClick={handleBookNow}
              className="w-4/12 mx-auto bg-[#B19D60] text-white py-[2px] md:py-[4px] mt-4 md:mt-8 
                         transition-transform duration-300 font-cormorant-upright 
                         hover:scale-105"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryList;