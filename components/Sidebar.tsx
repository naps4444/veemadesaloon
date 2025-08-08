'use client';

import React from 'react';
import { Menu, X } from 'lucide-react';
import type { Category } from '@/types/service';

// UPDATED: Defined a new type, 'SidebarCategory', which only includes
// the properties needed by this component to fix the TypeScript error.
type SidebarCategory = {
  id: string;
  name: string;
};

interface SidebarProps {
  isOpen: boolean;
  closeSidebar: () => void;
  onCategoryClick: (categoryName: string) => void;
}

// UPDATED: The dummyCategories array now uses the new list you provided.
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

export default function Sidebar({ isOpen, closeSidebar, onCategoryClick }: SidebarProps) {
  return (
    <aside
      // This is the key change: a flex container with full height.
      // We calculate the height to be 100vh minus the header height (assuming 80px).
      // The `relative` position is necessary for the `absolute` positioning of the close button.
      className={`fixed top-0 left-0 z-40 h-[calc(100vh-80px)] md:relative md:h-auto md:w-64 md:flex md:flex-col py-10
                  w-64 transform bg-[#223728] text-white transition-transform duration-300 ease-in-out
                  ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
    >
      <div className="flex justify-end p-4 md:hidden">
        <button onClick={closeSidebar} aria-label="Close sidebar">
          <X size={24} />
        </button>
      </div>
      
      {/* This is the content area that should grow and be scrollable. */}
      {/* It will push the footer to the bottom. */}
      <div className="p-4 flex-grow overflow-y-auto">
        <h2 className="text-xl font-croissant-one mb-4 mt-20">Categories</h2>
        <ul className="space-y-2">
          {dummyCategories.map((category) => (
            <li key={category.id}>
              <a
                href={`#${category.name}`}
                // FIX: Re-added a check to ensure onCategoryClick is a function before calling it.
                onClick={() => onCategoryClick && onCategoryClick(category.name)}
                className="block p-2 rounded hover:bg-[#344a3a] transition-colors duration-200"
              >
                {category.name}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* The footer will now automatically be pushed to the bottom of the `aside` container */}
      <div className="p-4 border-t border-[#344a3a]">
        <p className="text-sm text-center">© 2025 VeeMadeSaloon</p>
      </div>
    </aside>
  );
}
