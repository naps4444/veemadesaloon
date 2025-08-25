"use client";

import React from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

// Dynamically import Leaflet (fixes SSR issue with Next.js)
const Map = dynamic(() => import("./LeafletMap"), { ssr: false });

const ContactPage = () => {
  return (
    <main className="px-6 sm:px-12 md:px-20 lg:px-32 py-16 bg-[#1C1C1C] text-gray-100">
      {/* Page Header Design */}
      <div className="flex justify-between items-center bg-[#22372889] rounded pb-4 mt-8 px-4">
        <div className="flex gap-3 items-center mt-5">
          <Image
            src="/vertline.svg"
            alt="line"
            width={3}
            height={50}
            className="w-[3px]"
          />
          <div className="text-white">
            <h1 className="font-croissant-one text-lg md:text-xl">CONTACT</h1>
            <h1 className="font-cinzel-decorative text-lg md:text-xl">US</h1>
          </div>
        </div>
        <Image
          src="/3horlines.svg"
          alt="lines"
          width={75}
          height={75}
          className="w-[50px] md:w-[75px]"
        />
      </div>

      {/* Contact Info Section */}
      <section className="max-w-4xl mx-auto text-center mt-10">
        <h2 className="text-2xl font-semibold text-[#2E7D32] mb-6 font-cinzel">
          Get in Touch
        </h2>
        <p className="text-gray-300 leading-relaxed mb-8 text-base sm:text-lg md:text-xl font-cormorant-upright">
          We’d love to hear from you! Whether you’re booking an appointment,
          asking about our services, or just saying hello, feel free to reach
          out.
        </p>
        <div className="grid sm:grid-cols-3 gap-6 font-lucida-bright text-gray-300">
          <div className="p-4 bg-[#22372889] rounded-lg shadow">
            <h3 className="font-semibold text-[#A0522D] mb-2">Phone</h3>
            <p>+234 903 668 2394</p>
          </div>
          <div className="p-4 bg-[#22372889] rounded-lg shadow">
            <h3 className="font-semibold text-[#A0522D] mb-2">Email</h3>
            <p>veemadesaloon@gmail.com</p>
          </div>
          <div className="p-4 bg-[#22372889] rounded-lg shadow">
            <h3 className="font-semibold text-[#A0522D] mb-2">Address</h3>
            <p>Lagos, Nigeria</p>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="max-w-3xl mx-auto mt-12">
        <form className="bg-[#22372889] p-6 rounded-2xl shadow-lg space-y-5 font-cormorant-upright">
          <div className="grid sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 rounded-lg bg-[#1C1C1C] text-white border border-[#2E7D32] focus:outline-none focus:ring-2 focus:ring-[#A0522D]"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 rounded-lg bg-[#1C1C1C] text-white border border-[#2E7D32] focus:outline-none focus:ring-2 focus:ring-[#A0522D]"
            />
          </div>
          <input
            type="tel"
            placeholder="Your Phone"
            className="w-full px-4 py-3 rounded-lg bg-[#1C1C1C] text-white border border-[#2E7D32] focus:outline-none focus:ring-2 focus:ring-[#A0522D]"
          />
          <textarea
            placeholder="Your Message"
            rows={5}
            className="w-full px-4 py-3 rounded-lg bg-[#1C1C1C] text-white border border-[#2E7D32] focus:outline-none focus:ring-2 focus:ring-[#A0522D]"
          />
          <button
            type="submit"
            className="w-full bg-[#A0522D] hover:bg-[#8B4513] text-white py-3 rounded-lg font-medium transition-all"
          >
            Send Message
          </button>
        </form>
      </section>

      {/* Leaflet Map Section */}
      <section className="max-w-6xl mx-auto mt-16">
        <h2 className="text-2xl font-semibold text-[#2E7D32] mb-6 text-center font-cinzel">
          Find Us
        </h2>
        <div className="h-[400px] w-full rounded-xl overflow-hidden shadow-lg">
          <Map />
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
