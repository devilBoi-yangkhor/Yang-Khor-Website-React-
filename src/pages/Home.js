import React, { useState } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Description from "../components/Description";
import Partners from "../components/Partners";
import Footer from "../components/Footer";
import CountUp from "react-countup";
import ScrollTrigger from "react-scroll-trigger";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Testimonial from "../components/Testimonial";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import Gallery from "../components/Gallery";
import ParticlesConfig from "../components/ParticleConfig";

const ListItem = ({ text }) => {
  return (
    <li className="flex text-base text-gray-600">
      <span className="mr-2.5 mt-0.5 text-blue-500">
        <svg
          width={20}
          height={20}
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_980_24852)">
            <path
              d="M10 0.5625C4.78125 0.5625 0.5625 4.78125 0.5625 10C0.5625 15.2188 4.78125 19.4688 10 19.4688C15.2188 19.4688 19.4688 15.2188 19.4688 10C19.4688 4.78125 15.2188 0.5625 10 0.5625ZM10 18.0625C5.5625 18.0625 1.96875 14.4375 1.96875 10C1.96875 5.5625 5.5625 1.96875 10 1.96875C14.4375 1.96875 18.0625 5.59375 18.0625 10.0312C18.0625 14.4375 14.4375 18.0625 10 18.0625Z"
              fill="currentColor"
            />
            <path
              d="M12.6875 7.09375L8.96875 10.7188L7.28125 9.0625C7 8.78125 6.5625 8.8125 6.28125 9.0625C6 9.34375 6.03125 9.78125 6.28125 10.0625L8.28125 12C8.46875 12.1875 8.71875 12.2813 8.96875 12.2813C9.21875 12.2813 9.46875 12.1875 9.65625 12L13.6875 8.125C13.9688 7.84375 13.9688 7.40625 13.6875 7.125C13.4063 6.84375 12.9688 6.84375 12.6875 7.09375Z"
              fill="currentColor"
            />
          </g>
          <defs>
            <clipPath id="clip0_980_24852">
              <rect width={20} height={20} fill="white" />
            </clipPath>
          </defs>
        </svg>
      </span>
      {text}
    </li>
  );
};

function Home() {
  const [counterOn, setCounterOn] = useState(false);

  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  return (
    <div className="overflow-hidden bg-white">
      <Header />
      <div className="h-screen relative">
        <ParticlesConfig />
        <Hero />
      </div>
      <div>
        <div className="">
          <div className="mx-auto bg-gradient-to-br from-primary to-red-500  hover:shadow-lg ring-2 ring-gray-100 md:py-20 py-5 px-5 md:px-36">
            <p className="text-sm md:text-base text-white px-5 text-justify leading-7 md:leading-10">
              Yang Khor Private Limited is a leading technology solution
              provider in the country. With over 18+ years of experience in the
              technology industry, we specialize in providing our customers with
              a tailored service at an affordable price. Our customers benefit
              from a bespoke service that is tailored to each customer's needs.
              Quality of service and the commitment of our team have ensured the
              highest level of customer satisfaction.
            </p>
            <br />
            <dl className="grid grid-cols-2 gap-x-8 gap-y-16 text-center lg:grid-cols-4">
              <ScrollTrigger
                onEnter={() => setCounterOn(true)}
                onExit={() => setCounterOn(false)}
              >
                <div className="flex flex-col gap-4">
                  <span className="font-bold text-4xl text-secondary">
                    {counterOn && (
                      <CountUp start={0} end={18} duration={5} delay={0} />
                    )}
                    + years
                  </span>
                  <span className="font-bold text-lg text-accent">
                    Industrial Experience
                  </span>
                </div>
              </ScrollTrigger>
              <ScrollTrigger
                onEnter={() => setCounterOn(true)}
                onExit={() => setCounterOn(false)}
              >
                <div className="flex flex-col gap-4">
                  <span className="font-bold text-4xl text-secondary">
                    {counterOn && (
                      <CountUp start={0} end={50} duration={5} delay={0} />
                    )}
                    +
                  </span>
                  <span className="font-bold text-lg text-accent">
                    In-Country Products
                  </span>
                </div>
              </ScrollTrigger>
              <ScrollTrigger
                onEnter={() => setCounterOn(true)}
                onExit={() => setCounterOn(false)}
              >
                <div className="flex flex-col gap-4">
                  <span className="font-bold text-4xl text-secondary">
                    {counterOn && (
                      <CountUp start={0} end={20} duration={5} delay={0} />
                    )}
                    +
                  </span>
                  <span className="font-bold text-lg text-accent">
                    Happy Clients
                  </span>
                </div>
              </ScrollTrigger>
              <ScrollTrigger
                onEnter={() => setCounterOn(true)}
                onExit={() => setCounterOn(false)}
              >
                <div className="flex flex-col gap-4">
                  <span className="font-bold text-4xl text-secondary">
                    {counterOn && (
                      <CountUp start={0} end={15} duration={5} delay={0} />
                    )}
                    +
                  </span>
                  <span className="font-bold text-lg text-accent">
                    Skilled Team
                  </span>
                </div>
              </ScrollTrigger>
            </dl>
          </div>
        </div>
      </div>
      <div className="flex bg-white flex-col lg:flex lg:flex-row lg:gap-x-5 gap-x-0 gap-y-5 lg:gap-y-0 justify-evenly py-10 px-5 md:px-36">
        <div className="space-y-3 w-full border border-black lg:w-1/2 hover:shadow-lg bg-transparent shadow-none rounded-md p-5">
          <span className="text-xl md:text-3xl font-bold bg-clip-text bg-gradient-to-r text-transparent from-primary to-accent">
            Objectives
          </span>
          <p className="text-gray-600">
            Our objectives are to provide our clients with:
          </p>
          <div className="w-full">
            <ul className="space-y-3">
              <ListItem text="Reliable and faster services and solutions in a better way." />
              <ListItem text="Improved customer satisfaction by facilitating sustainable services" />
              <ListItem text="Cost-effective and quality solutions to react to the IT revolution." />
              <ListItem text="Solutions to overcome the problems faced due to continuous technological growth." />
            </ul>
          </div>
        </div>
        <div className="space-y-3 w-full lg:w-1/2 hover:shadow-lg shadow-none bg-transparent border border-black rounded-md p-5">
          <span className="bg-clip-text text-xl md:text-3xl font-bold text-transparent bg-gradient-to-r from-primary to-accent">
            What we do!
          </span>
          <p className="text-justify text-gray-600 leading-7">
            We, at Yang Khor Private Limited, have been passionately delivering
            customized business solutions that help organizations accelerate
            revenue growth, increase market penetration, optimize operating
            costs and improve employee productivity, by embedding communication
            in their business processes. We use our solution integration
            capabilities to integrate best of breed products through its key
            technology alliance partners to provide “End to End” solutions.
          </p>
        </div>
      </div>
      <Description />
      <Testimonial />
      

      <Gallery />

      <motion.div
        className="bg-white shadow-none p-5 mb-10"
        ref={ref}
        initial={{ opacity: 0, y: -50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
        transition={{ duration: 1, ease: "easeIn" }}
      >
        <div className="flex justify-evenly">
          <div className="text-center w-full xl:w-1/2">
            <p className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-blue-300">
              Yang Khor's Software Development Technology
            </p>
            <br />
            <p className="text-gray-600 text-sm md:text-base text-justify mx-10 leading-8">
              "Our software development technology is at the forefront of
              innovation. Leveraging cutting-edge frameworks and languages, we
              engineer robust, scalable solutions. Our commitment to staying
              ahead ensures our products align with the ever-evolving tech
              landscape, delivering excellence to our clients."
            </p>
            <div className="py-5">
              <Swiper
                modules={[Pagination, Autoplay]}
                slidesPerView={3}
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
                  <a
                    href="https://www.php.net/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <p className="p-2 border h-14 flex items-center justify-center bg-white text-black shadow-lg font-bold hover:bg-blue-500 hover:translate-y-2 hover:text-white rounded-md duration-500">
                      PHP
                    </p>
                  </a>
                </SwiperSlide>
                <SwiperSlide>
                  <a
                    href="https://laravel.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <p className="p-2 h-14 flex items-center justify-center border bg-white text-black shadow-lg font-bold hover:bg-blue-500 hover:translate-y-2 hover:text-white rounded-md duration-500">
                      Laravel
                    </p>
                  </a>
                </SwiperSlide>
                <SwiperSlide>
                  <a
                    href="https://reactnative.dev/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <p className="p-2 h-14 flex items-center justify-center border bg-white text-black shadow-lg font-bold hover:bg-blue-500 hover:translate-y-2 hover:text-white rounded-md duration-500">
                      React Native
                    </p>
                  </a>
                </SwiperSlide>
                <SwiperSlide>
                  <a href="https://react.dev/" target="_blank" rel="noreferrer">
                    <p className="h-14 flex p-2 items-center justify-center border bg-white text-black shadow-lg font-bold hover:bg-blue-500 hover:translate-y-2 hover:text-white rounded-md duration-500">
                      React Js
                    </p>
                  </a>
                </SwiperSlide>
                <SwiperSlide>
                  <a
                    href="https://www.python.org/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <p className="p-2 h-14 flex items-center justify-center border bg-white text-black shadow-lg font-bold hover:bg-blue-500 hover:translate-y-2 hover:text-white rounded-md duration-500">
                      Python
                    </p>
                  </a>
                </SwiperSlide>
                <SwiperSlide>
                  <a
                    href="https://www.java.com/en/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <p className="p-2 h-14 flex items-center justify-center border bg-white text-black shadow-lg font-bold hover:bg-blue-500 hover:translate-y-2 hover:text-white rounded-md duration-500">
                      Java
                    </p>
                  </a>
                </SwiperSlide>
                <SwiperSlide>
                  <a
                    href="https://docs.spring.io/spring-framework/docs/3.2.x/spring-framework-reference/html/mvc.html"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <p className="p-2 h-14 flex items-center justify-center border bg-white text-black shadow-lg font-bold hover:bg-blue-500 hover:translate-y-2 hover:text-white rounded-md duration-500">
                      Spring MVC
                    </p>
                  </a>
                </SwiperSlide>
                <SwiperSlide>
                  <a
                    href="https://spring.io/projects/spring-boot"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <p className="p-2 h-14 flex items-center justify-center border bg-white text-black shadow-lg font-bold hover:bg-blue-500 hover:translate-y-2 hover:text-white rounded-md duration-500">
                      Spring Boot
                    </p>
                  </a>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
          <div className="hidden xl:block xl:border xl:p-2 xl:shadow-lg">
            <video className="h-80 rounded" style={{pointerEvents: 'none'}} autoPlay loop muted>
              <source src="assets/codebg.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </motion.div>

      <Partners />
      <Footer />
    </div>
  );
}

export default Home;
