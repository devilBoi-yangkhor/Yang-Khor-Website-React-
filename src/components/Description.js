import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

function Description() {

  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  
  return (
    <motion.div
      className="bg-white px-5 md:px-36 rounded-md mb-10"
      ref={ref}
      initial={{ opacity: 0, y: -50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
      transition={{ duration: 1, ease: "easeIn" }}
    >
      <div className="border border-black rounded-md py-10 px-5 hover:shadow-lg flex flex-col items-center gap-5 justify-evenly md:flex md:flex-row">
        <div className="flex flex-col gap-5 text-justify items-center md:w-2/3">
          <h1 className="text-2xl text-center">
            We Drive Your{" "}
            <span className="font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-blue-300">
              Business
            </span>{" "}
            To Possibilities
          </h1>
          <p className="leading-7 md:leading-10 text-sm md:text-base text-gray-600">
            Yang Khor Private Limited have been passionately delivering
            customized business solutions that help organizations accelerate
            revenue growth, increase market penetration, optimize operating
            costs and improve employee productivity, by embedding communication
            in their business processes.
          </p>
        </div>
        <Link
          to="/contact"
          className="rounded-md bg-blue-800 px-3.5 py-2.5 text-sm font-semibold items-center text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Get In Touch
        </Link>
      </div>
    </motion.div>
  );
}

export default Description;
