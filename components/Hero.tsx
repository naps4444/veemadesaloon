'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const Hero = () => {
  const arrowRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading (can also be replaced with image load event)
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1500);

    const handleScroll = () => {
      if (window.scrollY === 0 && arrowRef.current) {
        arrowRef.current.classList.remove('animate-move-bounce');
        void arrowRef.current.offsetWidth;
        arrowRef.current.classList.add('animate-move-bounce');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 z-[9999] bg-black bg-opacity-80 flex items-center justify-center">
        <div className="sk-folding-cube">
          <div className="sk-cube1 sk-cube"></div>
          <div className="sk-cube2 sk-cube"></div>
          <div className="sk-cube4 sk-cube"></div>
          <div className="sk-cube3 sk-cube"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="2xl:container mx-auto">
      <div
        className="w-full h-screen md:h-[300px] lg:h-[500px] bg-[url('/heromob.svg')] md:bg-[url('/hero.svg')] bg-cover bg-center mt-[70px] flex flex-col justify-center items-center relative"
        role="img"
        aria-label="Hero Image"
      >
        <Image
          src="/unlogo.svg"
          alt="veemade"
          width={100}
          height={100}
          className="absolute w-8 top-7 left-6"
        />

        <div
          ref={arrowRef}
          className="absolute top-4 right-2 md:right-6 w-2 animate-move-bounce"
        >
          <Image
            src="/arrdown.svg"
            alt="arrow"
            width={100}
            height={100}
          />
        </div>

        <h1 className="text-white text-center font-cinzel-decorative text-[40px] lg:text-[42px] lg:w-5/12 mx-auto">
          WHERE SHARP MEETS STYLE
        </h1>

        <p className="mx-auto w-11/12 text-center mt-2 font-lavishly-yours text-[20px] text-[#B19D60]">
          Professional cuts. Personalized experience.
        </p>

        <div
          className="border-[1px] border-[#938250] flex justify-center items-center px-4 py-1 gap-2 mt-20 cursor-pointer transition duration-200 ease-in-out hover:bg-[#938250] hover:border-transparent hover:scale-105 group text-white hover:text-black"
        >
          <Link href="/services">
            <button className="font-cinzel">Book Appointment</button>
          </Link>
          <Image
            src="/rightarr.svg"
            alt="icon"
            width={100}
            height={100}
            className="w-2"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
