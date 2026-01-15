import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css/autoplay";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";

// import required modules
import { EffectCoverflow } from "swiper/modules";

export default function Gallery() {
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  return (
    <motion.div
      className="bg-white mx-auto shadow-none px-5 py-10 mb-10"
      ref={ref}
      initial={{ opacity: 0, y: -50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
      transition={{ duration: 1, ease: "easeIn" }}
    >
      <div className="flex flex-col w-full items-center justify-center">
        <p className="text-xl md:text-2xl mb-5 md:mb-10 font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-blue-300">
          Our Moments
        </p>
        <p className="w-5/6 mb-5 md:mb-10 leading-88 text-base md:text-base text-gray-600">
          "Embark on a visual odyssey through our company's gallery, curated
          with pride. Witness our journey, achievements, and craftsmanship. Join
          us in celebrating moments that define our identity and success."
        </p>
        <div className="w-full mb-5">
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={1}
            modules={[Pagination, EffectCoverflow, Autoplay]}
            loop={true}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            speed={2000}
            pagination={{ clickable: true }}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 4,
              slideShadows: true,
            }}
            breakpoints={{
              768: {
                slidesPerView: 2,
                spaceBetween: 40,
              },
            }}
            className="h-80 w-full rounded-full md:w-5/6"
          >
            <SwiperSlide className="flex items-center justify-center rounded-md text-lg font-bold">
              <img
                src="assets/yangkhorgallery/galleryimg1.jpg"
                className="object-cover h-full w-full"
                alt="image1"
              />
            </SwiperSlide>
            <SwiperSlide className="flex items-center justify-center rounded-md text-lg font-bold">
              <img
                src="assets/yangkhorgallery/galleryimg7.jpg"
                className="object-cover h-full w-full"
                alt="image2"
              />
            </SwiperSlide>
            <SwiperSlide className="flex items-center justify-center rounded-md text-lg font-bold">
              <img
                src="assets/yangkhorgallery/galleryimg2.jpg"
                className="object-cover h-full w-full"
                alt="image3"
              />
            </SwiperSlide>
            <SwiperSlide className="flex items-center justify-center rounded-md text-lg font-bold">
              <img
                src="assets/yangkhorgallery/galleryimg3.jpg"
                className="object-cover h-full w-full"
                alt="image4"
              />
            </SwiperSlide>
            <SwiperSlide className="flex items-center justify-center rounded-md text-lg font-bold">
              <img
                src="assets/yangkhorgallery/galleryimg4.jpg"
                className="object-cover h-full w-full"
                alt="image5"
              />
            </SwiperSlide>
            <SwiperSlide className="flex items-center justify-center rounded-md text-lg font-bold">
              <img
                src="assets/yangkhorgallery/galleryimg6.jpg"
                className="object-cover h-full w-full"
                alt="image6"
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </motion.div>
  );
}
