import React from "react";
import Image from "next/image";

const AboutPage = () => {
  return (
    <main className="px-6 sm:px-6 md:px-20 lg:px-32 py-16 bg-[#1C1C1C] text-gray-100">
      {/* Page Header Design */}
      <div className="flex justify-between items-center bg-[#22372889] rounded mt-8 pb-4 px-4">
        <div className="flex gap-3 items-center mt-5">
          <Image
            src="/vertline.svg"
            alt="line"
            width={3}
            height={50}
            className="w-[3px]"
          />
          <div className="text-white">
            <h1 className="font-croissant-one text-lg md:text-xl">
              ABOUT
            </h1>
            <h1 className="font-cinzel-decorative text-lg md:text-xl">
              VEEMADE
            </h1>
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

      {/* Intro Section */}
      <section className="max-w-4xl mt-[30px] mx-auto text-center">
        {/* <h1 className="text-[30px] font-bold text-[#2E7D32] mb-6">
          About Veemade Unisex Salon & Spa
        </h1> */}
        <p className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-300 mb-8 font-cormorant-upright">
          At <span className="font-semibold text-[#A0522D]">Veemade</span>, we believe self-care is more than beauty —
          it’s a lifestyle. Our unisex salon and spa is designed to help you relax, refresh,
          and feel your best. With a team of skilled stylists and therapists, we blend
          creativity, precision, and passion to deliver an experience you’ll always look forward to.
        </p>
      </section>

      {/* Image Grid Section */}
      <section className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto my-12">
        <img
          src="https://images.unsplash.com/photo-1580618672591-eb180b1a973f"
          alt="Professional haircut"
          className="w-full h-64 object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform"
        />
        <img
          src="https://res.cloudinary.com/dpm3yp0xs/image/upload/v1755684594/download_21_su0btp.png"
          alt="Relaxing spa session"
          className="w-full h-64 object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform"
        />
        <img
          src="https://res.cloudinary.com/dpm3yp0xs/image/upload/v1755685019/download_23_a5eexa.png"
          alt="Luxury nail care"
          className="w-full h-64 object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform"
        />
      </section>

      {/* Mission & Why Choose Us */}
      <section className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto mt-12">
        <div>
          <h2 className="text-2xl font-semibold text-[#2E7D32] mb-4 font-cinzel">Our Mission</h2>
          <p className="text-gray-300 leading-relaxed font-lucida-bright">
            To redefine beauty and wellness by providing premium salon and spa services in a
            serene, welcoming environment. We are committed to ensuring every client leaves
            feeling confident, radiant, and cared for.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-[#A0522D] mb-4 font-cinzel">Why Choose Us?</h2>
          <ul className="text-gray-300 space-y-3 list-disc list-inside font-lucida-bright">
            <li>Expert stylists & spa therapists</li>
            <li>Modern techniques with a personal touch</li>
            <li>Relaxing atmosphere for both men & women</li>
            <li>Commitment to hygiene, care, and excellence</li>
          </ul>
        </div>
      </section>

      {/* Closing Call-to-Action */}
      <section className="max-w-4xl mx-auto text-center mt-16">
        <h2 className="text-2xl font-semibold text-[#2E7D32] mb-4 font-cinzel">
          Experience the Veemade Difference
        </h2>
        <p className="text-gray-300 leading-relaxed mb-6 font-lucida-bright">
          Whether you’re coming in for a quick haircut, a spa day, or a total transformation,
          we’re here to make it unforgettable. Step into Veemade — where beauty meets relaxation.
        </p>
        <a
          href="/services"
          className="inline-block px-6 py-3 bg-[#A0522D] text-white font-medium text-lg mt-8 rounded-2xl shadow-md hover:bg-[#8B4513] transition-all font-cinzel-decorative"
        >
          Explore Our Services
        </a>
      </section>
    </main>
  );
};

export default AboutPage;
