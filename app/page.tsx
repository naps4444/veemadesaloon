'use client';

import { useEffect, useState } from 'react';
import Image from "next/image";
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Loader from '@/components/Loader';
import Hero from "@/components/Hero";
import Whoweare from "@/components/Whoweare";
import Boxcomp from "@/components/Boxcomp";
import Services from "@/components/Services";
import ContactUs from "@/components/ContactUs";

// ❗ Dynamically import Gallery with SSR disabled
const Gallery = dynamic(() => import('@/components/Gallery'), { ssr: false });

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay (e.g., preloading images, fonts, etc.)
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <div>
      {/* <Navbar/> */}
      <Hero />
      <Whoweare />
      <Boxcomp />
      <Services />
      <div className="my-auto">
        <Gallery />
        <ContactUs />
        {/* <Footer/> */}
      </div>
    </div>
  );
}
