import React from "react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Testimonial = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  return (
    <>
      <motion.section
        className="bg-gradient-to-br from-primary to-red-500 py-10"
        ref={ref}
        initial={{ opacity: 0, y: -50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
        transition={{ duration: 1, ease: "easeIn" }}
      >
        <div className="mx-auto shadow-none md:p-10 p-5 rounded-md md:px-6 lg:px-8">
          <div className="text-center mb-5 md:mb-10">
          <span className=" text-lg pb-10 font-bold md:text-2xl bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-300">
            Team Testimonial
          </span>
          </div>
          <Swiper
            modules={[Pagination, Autoplay]}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            speed={2000}
            pagination={{ clickable: true }}
          >
            <SwiperSlide>
              <SingleTestimonial
                image="assets/ceo.jpg"
                details='"Guided by innovation and fueled by a passion for excellence, we navigate the future with a vision to inspire positive change."'
                name="Phub Gyeltshen"
                position="Chief Executive Officer."
              />
            </SwiperSlide>
            <SwiperSlide>
              <SingleTestimonial
                image="assets/coo.jpg"
                details='"At the heart of our operations is a commitment to efficiency and a relentless pursuit of operational excellence, driving our company toward new horizons."'
                name="Dawa Tshering"
                position="Chief Operation Officer."
              />
            </SwiperSlide>
            <SwiperSlide>
              <SingleTestimonial
                image="assets/staffs/deepak.jpg"
                details={`
                "At Yang Khor, the dynamic environment promotes continuous learning and innovation. Collaborating on cutting-edge projects with skilled colleagues has propelled my growth, all within a balanced and supportive work culture."`}
                name="Deepak Kumar Ghalley"
                position="Lead Software Developer."
              />
            </SwiperSlide>
            <SwiperSlide>
              <SingleTestimonial
                image="assets/staffs/karmawangchuk.jpg"
                details={`
                "As a data analyst, I flourish in a dynamic setting that encourages continual learning and collaboration on impactful projects. The supportive culture fosters personal and professional growth."`}
                name="Karma Wangchuk"
                position="Data Analyst."
              />
            </SwiperSlide>
            <SwiperSlide>
              <SingleTestimonial
                image="assets/staffs/karmawangmo.jpg"
                details={`"At Yangkhor, as an accounts officer, I excel in a dynamic environment, contributing to financial integrity and growth. The supportive culture and collaborative projects enhance my professional journey."`}
                name="Karma Wangmo"
                position="Accounts Officer."
              />
            </SwiperSlide>
            <SwiperSlide>
              <SingleTestimonial
                image="assets/staffs/dorjiwangmo.jpg"
                details={`
                "My role as a QA tester is a journey of excellence, where I meticulously ensure product quality. Engaging in innovative projects within our supportive culture propels my holistic growth."`}
                name="Dorji Wangmo"
                position="QA Expert."
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </motion.section>
    </>
  );
};

export default Testimonial;

const SingleTestimonial = ({ image, details, name, position }) => {
  return (
    <div className="relative px-5 mb-10 flex justify-center">
      <div className="relative w-full md:pb-16 md:w-11/12 lg:w-10/12 xl:w-8/12">
        <div className="w-full items-center md:flex">
          <div className="relative mb-12 flex items-center w-full max-w-[310px] md:mb-0 md:mr-12 md:max-w-[250px] lg:mr-14 lg:max-w-[280px] 2xl:mr-16">
            <img src={image} alt="img" className="h-60 w-full object-cover rounded-2xl" />
            <span className="absolute -left-6 -top-6 z-[-1] hidden sm:block">
              <DotShape />
            </span>
            <span className="absolute -bottom-6 -right-6 z-[-1]">
              <svg
                width="64"
                height="64"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 32C3 15.9837 15.9837 3 32 3C48.0163 2.99999 61 15.9837 61 32C61 48.0163 48.0163 61 32 61C15.9837 61 3 48.0163 3 32Z"
                  stroke="#ffffff"
                  strokeWidth="6"
                />
              </svg>
            </span>
          </div>
          <div className="w-full">
            <div>
              <p className="mb-11 italic leading-[1.81] text-sm text-textColor md:text-base">
                {details}
              </p>

              <span className="mb-2 text-[22px] font-bold leading-[27px] bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-300">
                {name}
              </span>
              <p className="text-base text-accent">{position}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DotShape = () => {
  return (
    <>
      <svg
        width="77"
        height="77"
        viewBox="0 0 77 77"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="1.66343"
          cy="74.5221"
          r="1.66343"
          transform="rotate(-90 1.66343 74.5221)"
          fill="#ffffff"
        />
        <circle
          cx="1.66343"
          cy="30.94"
          r="1.66343"
          transform="rotate(-90 1.66343 30.94)"
          fill="#ffffff"
        />
        <circle
          cx="16.3016"
          cy="74.5221"
          r="1.66343"
          transform="rotate(-90 16.3016 74.5221)"
          fill="#ffffff"
        />
        <circle
          cx="16.3016"
          cy="30.94"
          r="1.66343"
          transform="rotate(-90 16.3016 30.94)"
          fill="#ffffff"
        />
        <circle
          cx="30.9398"
          cy="74.5221"
          r="1.66343"
          transform="rotate(-90 30.9398 74.5221)"
          fill="#ffffff"
        />
        <circle
          cx="30.9398"
          cy="30.94"
          r="1.66343"
          transform="rotate(-90 30.9398 30.94)"
          fill="#ffffff"
        />
        <circle
          cx="45.578"
          cy="74.5221"
          r="1.66343"
          transform="rotate(-90 45.578 74.5221)"
          fill="#ffffff"
        />
        <circle
          cx="45.578"
          cy="30.94"
          r="1.66343"
          transform="rotate(-90 45.578 30.94)"
          fill="#ffffff"
        />
        <circle
          cx="60.2162"
          cy="74.5216"
          r="1.66343"
          transform="rotate(-90 60.2162 74.5216)"
          fill="#ffffff"
        />
        <circle
          cx="74.6634"
          cy="74.5216"
          r="1.66343"
          transform="rotate(-90 74.6634 74.5216)"
          fill="#ffffff"
        />
        <circle
          cx="60.2162"
          cy="30.9398"
          r="1.66343"
          transform="rotate(-90 60.2162 30.9398)"
          fill="#ffffff"
        />
        <circle
          cx="74.6634"
          cy="30.9398"
          r="1.66343"
          transform="rotate(-90 74.6634 30.9398)"
          fill="#ffffff"
        />
        <circle
          cx="1.66343"
          cy="59.8839"
          r="1.66343"
          transform="rotate(-90 1.66343 59.8839)"
          fill="#ffffff"
        />
        <circle
          cx="1.66343"
          cy="16.3017"
          r="1.66343"
          transform="rotate(-90 1.66343 16.3017)"
          fill="#3056D3"
        />
        <circle
          cx="16.3016"
          cy="59.8839"
          r="1.66343"
          transform="rotate(-90 16.3016 59.8839)"
          fill="#ffffff"
        />
        <circle
          cx="16.3016"
          cy="16.3017"
          r="1.66343"
          transform="rotate(-90 16.3016 16.3017)"
          fill="#ffffff"
        />
        <circle
          cx="30.9398"
          cy="59.8839"
          r="1.66343"
          transform="rotate(-90 30.9398 59.8839)"
          fill="#ffffff"
        />
        <circle
          cx="30.9398"
          cy="16.3017"
          r="1.66343"
          transform="rotate(-90 30.9398 16.3017)"
          fill="#ffffff"
        />
        <circle
          cx="45.578"
          cy="59.8839"
          r="1.66343"
          transform="rotate(-90 45.578 59.8839)"
          fill="#ffffff"
        />
        <circle
          cx="45.578"
          cy="16.3017"
          r="1.66343"
          transform="rotate(-90 45.578 16.3017)"
          fill="#ffffff"
        />
        <circle
          cx="60.2162"
          cy="59.8839"
          r="1.66343"
          transform="rotate(-90 60.2162 59.8839)"
          fill="#ffffff"
        />
        <circle
          cx="74.6634"
          cy="59.8839"
          r="1.66343"
          transform="rotate(-90 74.6634 59.8839)"
          fill="#ffffff"
        />
        <circle
          cx="60.2162"
          cy="16.3017"
          r="1.66343"
          transform="rotate(-90 60.2162 16.3017)"
          fill="#ffffff"
        />
        <circle
          cx="74.6634"
          cy="16.3017"
          r="1.66343"
          transform="rotate(-90 74.6634 16.3017)"
          fill="#ffffff"
        />
        



        <circle
          cx="1.66343"
          cy="45.2455"
          r="1.66343"
          transform="rotate(-90 1.66343 45.2455)"
          fill="#ffffff"
        />
        <circle
          cx="1.66343"
          cy="1.66342"
          r="1.66343"
          transform="rotate(-90 1.66343 1.66342)"
          fill="#ffffff"
        />
        <circle
          cx="16.3016"
          cy="45.2455"
          r="1.66343"
          transform="rotate(-90 16.3016 45.2455)"
          fill="#ffffff"
        />
        <circle
          cx="16.3016"
          cy="1.66342"
          r="1.66343"
          transform="rotate(-90 16.3016 1.66342)"
          fill="#ffffff"
        />
        <circle
          cx="30.9398"
          cy="45.2455"
          r="1.66343"
          transform="rotate(-90 30.9398 45.2455)"
          fill="#ffffff"
        />
        <circle
          cx="30.9398"
          cy="1.66342"
          r="1.66343"
          transform="rotate(-90 30.9398 1.66342)"
          fill="#ffffff"
        />
        <circle
          cx="45.578"
          cy="45.2455"
          r="1.66343"
          transform="rotate(-90 45.578 45.2455)"
          fill="#ffffff"
        />
        <circle
          cx="45.578"
          cy="1.66344"
          r="1.66343"
          transform="rotate(-90 45.578 1.66344)"
          fill="#ffffff"
        />
        <circle
          cx="60.2162"
          cy="45.2458"
          r="1.66343"
          transform="rotate(-90 60.2162 45.2458)"
          fill="#ffffff"
        />
        <circle
          cx="74.6634"
          cy="45.2458"
          r="1.66343"
          transform="rotate(-90 74.6634 45.2458)"
          fill="#ffffff"
        />
        <circle
          cx="60.2162"
          cy="1.66371"
          r="1.66343"
          transform="rotate(-90 60.2162 1.66371)"
          fill="#ffffff"
        />
        <circle
          cx="74.6634"
          cy="1.66371"
          r="1.66343"
          transform="rotate(-90 74.6634 1.66371)"
          fill="#ffffff"
        />
      </svg>
    </>
  );
};
