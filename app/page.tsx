'use client';

import Image from "next/image";
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Hero from "@/components/Hero";
import Whoweare from "@/components/Whoweare";
import Boxcomp from "@/components/Boxcomp";
import Services from "@/components/Services";
import ContactUs from "@/components/ContactUs";

// ❗ Dynamically import Gallery with SSR disabled
const Gallery = dynamic(() => import('@/components/Gallery'), { ssr: false });

export default function Home() {
  return (
    <>
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
    </>
  );
}
