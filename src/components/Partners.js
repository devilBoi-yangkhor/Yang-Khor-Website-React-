import React from "react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

function Partners() {
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  return (
    <div>
      <motion.div
        className="bg-gradient-to-br from-primary to-red-500 shadow-none px-12 py-24"
        ref={ref}
        initial={{ opacity: 0, y: -50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
        transition={{ duration: 1, ease: "easeIn" }}
      >
        <div className="mx-auto max-w-7xl text-center px-6 lg:px-8">
          <div className="pb-5">
            <span className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-300">
              Partners
            </span>
          </div>
          <p className="text-center leading-8 text-sm md:text-base text-white pb-5">
            "Partnership is the cornerstone of shared success. Together, we
            navigate challenges, leverage strengths, and create a synergy that
            transforms possibilities into achievements. The goal is to build something
            remarkable collaboratively."
          </p>
          <div className="py-5">
          <Swiper
            modules={[Pagination, Autoplay]}
            slidesPerView={2}
            spaceBetween={20}
            loop={true}
            autoplay={{ delay: 0, disableOnInteraction: false }}
            speed={3000}
            breakpoints={{
              640: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 50,
              },
            }}
          >
            <SwiperSlide>
              <img
                className="max-h-16 min-h-10 border rounded-md w-full object-cover"
                src="assets/partnerslogo/acronislogo.JPG"
                alt="Acronis"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="max-h-16 min-h-10 border rounded-md w-full object-cover"
                src="assets/partnerslogo/fortinetlogo.JPG"
                alt="Fortinet"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="max-h-16 min-h-10 border rounded-md w-full object-cover"
                src="assets/partnerslogo/hplogo.JPG"
                alt="Hp"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="max-h-16 min-h-10 border rounded-md w-full object-cover"
                src="assets/partnerslogo/microsoft.JPG"
                alt="Microsoft"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="max-h-16 min-h-10 border rounded-md w-full object-cover"
                src="assets/partnerslogo/veeamlogo.JPG"
                alt="Veeam"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="max-h-16 min-h-10 border rounded-md w-full object-cover"
                src="assets/partnerslogo/vmwarelogo.JPG"
                alt="Vmware"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="max-h-16 min-h-10 border rounded-md w-full object-cover"
                src="assets/partnerslogo/crimsonlogiclogo.JPG"
                alt="cl"
              />
            </SwiperSlide>
          </Swiper>
          </div>
          {/* <div className="grid items-center grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7">
            <img
              className="max-h-12 w-full object-contain"
              src="assets/acronis.png"
              alt="Acronis"
              width={158}
              height={48}
            />
            <img
              className="max-h-24 w-full object-contain"
              src="assets/fortinet.png"
              alt="Fortinet"
            />
            <img
              className="max-h-20 w-full object-contain"
              src="assets/hp.png"
              alt="Hp"
              width={158}
              height={48}
            />
            <img
              className="max-h-12 w-full object-contain"
              src="assets/microsoft.png"
              alt="Microsoft"
              width={158}
              height={48}
            />
            <img
              className="max-h-12 w-full object-contain"
              src="assets/veeam.png"
              alt="Veeam"
              width={158}
              height={48}
            />
            <img
              className="max-h-20 w-full object-contain"
              src="assets/vmware.png"
              alt="Vmware"
              width={158}
              height={48}
            />
            <img
              className="max-h-12 w-full object-contain"
              src="assets/cl_logo.png"
              alt="Vmware"
              width={158}
              height={48}
            />
          </div> */}
        </div>
      </motion.div>
    </div>
  );
}

export default Partners;
