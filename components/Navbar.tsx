'use client';

import { useEffect, useRef, useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { HiOutlineMenuAlt3, HiOutlineX } from 'react-icons/hi';
import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/store/cartStore';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const selectedServices = useCartStore((state) => state.selectedServices);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '/services' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Swipe to close
  useEffect(() => {
    let startX: number;

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const endX = e.changedTouches[0].clientX;
      if (startX - endX < -50) {
        setIsOpen(false);
      }
    };

    const menu = menuRef.current;
    if (menu) {
      menu.addEventListener('touchstart', handleTouchStart);
      menu.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      if (menu) {
        menu.removeEventListener('touchstart', handleTouchStart);
        menu.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, []);

  return (
    <div>
      <nav className="w-full bg-[#100F15] fixed z-50 top-0 left-0 md:px-4 font-cinzel">
        <div className="bg-[#100F15] shadow-md px-2 flex justify-between items-center 2xl:container mx-auto">
          <Link href="/" className="text-xl font-bold">
            <Image src="/logo.svg" alt="Veemadeit Logo" width={100} height={100} />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex md:gap-[50px] gap-[10px] items-center">
            {navLinks.map(link => (
              <Link
                key={link.name}
                href={link.href}
                className="text-white uppercase hover:text-[#B19D60] transition"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Cart */}
          <div className="hidden md:block relative">
            <Link href="/checkout">
              <FaShoppingCart className="text-[#B19D60] hover:text-white cursor-pointer" size={20} />
              {selectedServices.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {selectedServices.length}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? (
                <HiOutlineX className="text-2xl text-white" />
              ) : (
                <HiOutlineMenuAlt3 className="text-2xl text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          ref={menuRef}
          className={`md:hidden fixed top-0 right-0 h-full w-2/4 bg-[#291F19] shadow-lg transform transition-transform duration-300 z-50
          rounded-tl-[20px] rounded-bl-[20px] ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Close X Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="text-3xl absolute top-5 right-4 text-white z-50"
          >
            <HiOutlineX />
          </button>

          <div className="p-12 flex items-center justify-center space-y-8 h-screen text-[#3E2723] relative">
            <Image
              src="/menudesign.png"
              alt="veemade saloon"
              width={190}
              height={100}
              className="absolute top-[550px] left-[50px] -translate-x-1/2 -translate-y-1/2"
            />

            <div className="flex flex-col items-center gap-[10px] text-center">
              {navLinks.map(link => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-xl font-semibold hover:text-white text-[#B19D60] transition"
                  onClick={() => setIsOpen(false)} // Close on link click
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/checkout"
                className="relative mt-2"
                onClick={() => setIsOpen(false)} // Close on cart click
              >
                <FaShoppingCart className="text-[#B19D60] hover:text-white" size={28} />
                {selectedServices.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {selectedServices.length}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
