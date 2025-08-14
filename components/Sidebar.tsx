'use client';

import React from 'react';
import { X } from 'lucide-react';

type SidebarCategory = {
  id: string;
  name: string;
};

interface SidebarProps {
  isOpen: boolean;
  closeSidebar: () => void;
  onCategoryClick: (categoryName: string) => void;
  // ⭐ CORRECTED: The type now correctly includes `null`.
  sidebarRef: React.RefObject<HTMLDivElement | null>;
}

const dummyCategories: SidebarCategory[] = [
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

export default function Sidebar({ isOpen, closeSidebar, onCategoryClick, sidebarRef }: SidebarProps) {
  return (
    <aside
      ref={sidebarRef}
      className={`fixed top-0 left-0 z-40 w-64 h-screen py-10 transform bg-[#223728] text-white transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
                flex flex-col md:relative`}
    >
      {/* <div className="flex justify-end p-4 md:hidden">
        <button onClick={closeSidebar} aria-label="Close sidebar">
          <X size={24} />
        </button>
      </div> */}

      <div className="p-4 flex-grow overflow-y-auto hide-scrollbar pt-16">
        <h2 className="text-xl font-croissant-one mb-4 pt-6 mt-26 ">Categories</h2>
        <ul className="space-y-2">
          {dummyCategories.map((category) => (
            <li key={category.id}>
              <a
                href={`#${category.name}`}
                onClick={() => onCategoryClick && onCategoryClick(category.name)}
                className="block p-2 rounded hover:bg-[#344a3a] transition-colors duration-200"
              >
                {category.name}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-4 border-t border-[#344a3a]">
        <p className="text-sm text-center">© 2025 VeeMadeSaloon & Spa</p>
      </div>
    </aside>
  );
}