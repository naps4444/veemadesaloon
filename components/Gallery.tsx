'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { AnimatePresence, motion } from 'framer-motion';
import 'swiper/css';

const allImages = [
  // Original images
  "https://res.cloudinary.com/dpm3yp0xs/image/upload/v1751149054/young-african-american-man-visiting-barbershop_1_wc5xuw.jpg",
  "https://res.cloudinary.com/dpm3yp0xs/image/upload/v1751149070/latino-hair-salon-owner-taking-care-client_qdefop.jpg",
  "https://res.cloudinary.com/dpm3yp0xs/image/upload/v1751149126/Las_mejores_8_cremas_para_peinar_el_cabello_rizado_blkepd.jpg",
  "https://res.cloudinary.com/dpm3yp0xs/image/upload/v1751149127/Indulge_in_the_luxurious_beauty_of_rich_chocolate_zrbsfj.jpg",
  "https://res.cloudinary.com/dpm3yp0xs/image/upload/v1751149127/80_Spectacular_Cuts_for_Kids_kids_Men_s_Hair_ohxmj0.jpg",
  "https://res.cloudinary.com/dpm3yp0xs/image/upload/v1751149128/Still_obsessed_nails_nailtechinago_wcstb1.jpg",
  "https://res.cloudinary.com/dpm3yp0xs/image/upload/v1751149128/41669f15-32bb-471c-9391-e7cd0ca4d2e5_eyqglc.jpg",
  "https://res.cloudinary.com/dpm3yp0xs/image/upload/v1751152524/young-african-american-man-visiting-barbershop_3_kwmmec.jpg",
  "https://res.cloudinary.com/dpm3yp0xs/image/upload/v1751149197/db9c5d16-c907-4d35-bf45-9dd894c1357a_j6qqnk.jpg",
  "https://res.cloudinary.com/dpm3yp0xs/image/upload/v1751149208/young-african-american-man-visiting-barbershop_2_jmc848.jpg",
  "https://res.cloudinary.com/dpm3yp0xs/image/upload/v1751152528/african-american-man-guy-sitting-chair-barber-works-with-beard_gb0e9y.jpg",
  "https://res.cloudinary.com/dpm3yp0xs/image/upload/v1751149237/woman-getting-her-hair-done-salon-by-male-hairdresser_seu8kb.jpg",
  "https://res.cloudinary.com/dpm3yp0xs/image/upload/v1751156516/bbbb21c3-9544-4b95-8cb1-a1e9431459af_otssv2.jpg",
  "https://res.cloudinary.com/dpm3yp0xs/image/upload/v1751156516/9980f218-dcc2-4fc0-863f-9c50e28927bc_lvdvsq.jpg",
  "https://res.cloudinary.com/dpm3yp0xs/image/upload/v1751156517/cc8ac0db-9d76-4c97-a8ec-8010c876c7e5_x1vmeg.jpg",
  "https://res.cloudinary.com/dpm3yp0xs/image/upload/v1751156517/d203c7c3-9423-4529-8657-5eca9f9fe5a2_yzzoig.jpg",
  "https://res.cloudinary.com/dpm3yp0xs/image/upload/v1751156517/847cf1ea-100b-4e06-b055-a5ae4d5e0f69_cwoc4f.jpg",
  "https://res.cloudinary.com/dpm3yp0xs/image/upload/v1751156518/Check_out_this_blog_post_to_find_out_why_sew-in_aeckmn.jpg",
  "https://res.cloudinary.com/dpm3yp0xs/image/upload/v1751156518/fb4da407-7ac4-4f27-9d13-6a1f88874198_qwsqjh.jpg",
  "https://res.cloudinary.com/dpm3yp0xs/image/upload/v1751156518/fcbcb78a-871a-4b35-9bca-729581df2af4_pjo368.jpg",
  "https://res.cloudinary.com/dpm3yp0xs/image/upload/v1751156519/The_Rise_of_Knotless_Braids_-_The_New_York_Times_tg5414.jpg",
  "https://res.cloudinary.com/dpm3yp0xs/image/upload/v1751156519/Hi_my_name_is_Angelina_and_I_am_a_Braid_Stylist_vxpplo.jpg",
  "https://res.cloudinary.com/dpm3yp0xs/image/upload/v1751156519/My_client_graduated_to_a_single_volume_row_ohjaba.jpg",
  "https://res.cloudinary.com/dpm3yp0xs/image/upload/v1751156520/d5fa97fb-b4ae-4a70-8bb5-c68517dd368c_sngbhr.jpg",

  // New images
  "https://res.cloudinary.com/dpm3yp0xs/image/upload/v1751194152/6077de10-7338-4c72-9f08-ef7f0325354b_kwhw41.jpg",
  "https://res.cloudinary.com/dpm3yp0xs/image/upload/v1751194152/1c17cad3-88eb-439b-bb80-019acf804703_bjs7zi.jpg",
  "https://res.cloudinary.com/dpm3yp0xs/image/upload/v1751194154/4175ca1c-9b31-403f-8e55-e73bd3c36c5e_zsxyim.jpg",
  "https://res.cloudinary.com/dpm3yp0xs/image/upload/v1751194154/f928a743-8af2-4990-9246-58a304e571dc_s3ph5v.jpg",
  "https://res.cloudinary.com/dpm3yp0xs/image/upload/v1751194154/90435536-d82a-442b-a06f-a9b3009dd27f_pilre2.jpg",
  "https://res.cloudinary.com/dpm3yp0xs/image/upload/v1751194154/f0224a37-4231-4b8a-b651-eb1ed3cf8a86_fgrmna.jpg",
  "https://res.cloudinary.com/dpm3yp0xs/image/upload/v1751194155/92b1956f-8884-4762-966d-ea527b66865e_jbbs4s.jpg",
  "https://res.cloudinary.com/dpm3yp0xs/image/upload/v1751194157/c5f797ec-276b-4643-a039-dc7890cc3204_hxpzrb.jpg",
  "https://res.cloudinary.com/dpm3yp0xs/image/upload/v1751194163/485cf885-0ada-4a77-b630-029a3b5714ea_hheylb.jpg",
  "https://res.cloudinary.com/dpm3yp0xs/image/upload/v1751194164/d385ab8a-cd40-4195-a93b-c565e115ff37_lgwczs.jpg",
  "https://res.cloudinary.com/dpm3yp0xs/image/upload/v1751194165/mens_hairstyles_sare5w.jpg",
  "https://res.cloudinary.com/dpm3yp0xs/image/upload/v1751194166/09d2a0d4-e5e4-45ae-8a77-beea85beb454_f7golr.jpg",
  "https://res.cloudinary.com/dpm3yp0xs/image/upload/v1751194166/Dreadlocks_For_Men_To_Try_In_2023_mnjbpy.jpg",
  "https://res.cloudinary.com/dpm3yp0xs/image/upload/v1751194167/14_Stylish_Fade_Haircuts_For_Black_Men_c1x56d.jpg",
  "https://res.cloudinary.com/dpm3yp0xs/image/upload/v1751194168/00d0f373-8cc5-4e6e-a924-7fbe940ec89d_jfuste.jpg",
  "https://res.cloudinary.com/dpm3yp0xs/image/upload/v1751194168/f9eda117-6877-4820-8661-ac447ff82eb4_a4lp1n.jpg",
  "https://res.cloudinary.com/dpm3yp0xs/image/upload/v1751194169/1f7a6ff9-758a-4700-aaae-2e3c9a71ebf4_swvtvt.jpg",
  "https://res.cloudinary.com/dpm3yp0xs/image/upload/v1751194169/53d3d333-035d-48b5-a18e-330620ce14fb_rbubsg.jpg",
  "https://res.cloudinary.com/dpm3yp0xs/image/upload/v1751194178/Clean_low_cut_fade_from_karimzcut_yffkkn.jpg",
  "https://res.cloudinary.com/dpm3yp0xs/image/upload/v1751194179/33b05a22-e0d5-426d-8dc0-dac200e285d6_dqbqat.jpg",
  "https://res.cloudinary.com/dpm3yp0xs/image/upload/v1751194179/d485b38f-be68-4eda-ae25-f9c3726a712b_clhisa.jpg",
  "https://res.cloudinary.com/dpm3yp0xs/image/upload/v1751194179/114ce04f-06e3-490d-b329-1190b601461a_juj0ug.jpg",
  "https://res.cloudinary.com/dpm3yp0xs/image/upload/v1751194180/13e633bb-c330-41ae-a056-9a8d38529bb2_ryrdo7.jpg",
  "https://res.cloudinary.com/dpm3yp0xs/image/upload/v1751194181/qvrhairofficial___The_installation_result_is_pnxww1.jpg",
  "https://res.cloudinary.com/dpm3yp0xs/image/upload/v1751194183/13585e43-abef-4e28-94f9-65152d5bb37f_x3tqos.jpg",
  "https://res.cloudinary.com/dpm3yp0xs/image/upload/v1751194184/3d84f8ef-9965-4b58-b3b1-cc551cc9e369_ko8e5h.jpg",
  "https://res.cloudinary.com/dpm3yp0xs/image/upload/v1751194184/2ece5b04-3be2-4434-bd20-a73fa0d48204_roxhe8.jpg",
  "https://res.cloudinary.com/dpm3yp0xs/image/upload/v1751194184/da17642c-cff4-4ad2-b944-258b94e678fd_bs1djg.jpg",
  "https://res.cloudinary.com/dpm3yp0xs/image/upload/v1751194190/danielleprescod___Fulani_Braids_by_Yeluchi_lc4lo0.jpg",
  "https://res.cloudinary.com/dpm3yp0xs/image/upload/v1751194191/b953272f-fa55-406c-a19f-34d213948f37_b5nd0i.jpg",
  "https://res.cloudinary.com/dpm3yp0xs/image/upload/v1751194191/Black_Leopard_Print_Nails_____Explore_stunning_nmk0fi.jpg",
  "https://res.cloudinary.com/dpm3yp0xs/image/upload/v1751194192/4b2b0714-1d5d-47d7-994b-7a19e445fce8_ciwgz7.jpg",
];

const getRandomSet = (count: number, exclude: string[] = []) => {
  const filtered = allImages.filter((img) => !exclude.includes(img));
  const shuffled = [...filtered].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const Gallery = () => {
  const [visibleImages, setVisibleImages] = useState(() => getRandomSet(6));
  const [imageVersions, setImageVersions] = useState<number[]>(Array(6).fill(0));

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleImages((current) => {
        const randomIndex = Math.floor(Math.random() * 6);
        const exclude = [...current];
        const available = allImages.filter((img) => !exclude.includes(img));
        const newImage = available[Math.floor(Math.random() * available.length)] || current[randomIndex];

        const updated = [...current];
        updated[randomIndex] = newImage;

        // Update versions to force motion key change
        setImageVersions((versions) => {
          const newVersions = [...versions];
          newVersions[randomIndex] += 1;
          return newVersions;
        });

        return updated;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full py-6 -mt-6 bg-[#5A4028] 2xl:container mx-auto md:px-6">
      <h1 className="text-center text-xl font-bold text-[#B19D60] font-croissant-one mb-4">GALLERY</h1>

      {/* Mobile Swiper Carousel */}
      <div className="block md:hidden bg-[url('/gbg.svg')] bg-cover bg-center p-6 space-y-4">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop
          spaceBetween={16}
          slidesPerView={1}
          direction="horizontal"
          className="w-full"
        >
          {allImages.map((src, idx) => (
            <SwiperSlide key={idx}>
              <div className="flex justify-center">
                <Image
                  src={src}
                  alt={`gallery ${idx + 1}`}
                  width={500}
                  height={500}
                  className="w-11/12 h-auto object-contain rounded-xl"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Tablet & Desktop Grid */}
      <div className="hidden md:grid grid-cols-3 gap-4 bg-[url('/gbg.svg')] bg-cover bg-center p-6">
        {visibleImages.map((src, idx) => (
          <div key={idx} className="relative w-full h-72 rounded-lg overflow-hidden shadow-md">
            <div className="absolute inset-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${src}-${imageVersions[idx]}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={src}
                    alt={`gallery ${idx}`}
                    fill
                    className="object-cover rounded-lg"
                    sizes="(min-width: 768px) 33vw, 100vw"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
