'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Loader from '@/components/Loader';
import Hero from '@/components/Hero';
import Whoweare from '@/components/Whoweare';
import Boxcomp from '@/components/Boxcomp';
import Services from '@/components/Services';
import ContactUs from '@/components/ContactUs';

const Gallery = dynamic(() => import('@/components/Gallery'), { ssr: false });

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black">
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <Hero />
      <Whoweare />
      <Boxcomp />
      <Services />
      <div className="my-auto">
        <Gallery />
        <ContactUs />
      </div>
    </div>
  );
}
