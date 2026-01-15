import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const SingleCard = ({ image, CardDescription }) => {
  return (
    <>
      <div className="overflow-hidden bg-white shadow-none my-10 flex flex-col md:flex-row md:items-start items-center gap-5 justify-center md:px-36 px-5">
        <img
          src={image}
          alt="cloudcomputing"
          className="w-80 h-80 object-cover rounded-md pointer-events-none"
        />

        <div className="flex flex-col px-5 gap-5">
          <p className="text-base text-justify text-gray-600 leading-relaxed">
            {CardDescription}
          </p>
          <Link
            to="/contact"
            className="rounded-md w-fit bg-blue-800 px-3.5 py-2.5 text-sm font-semibold items-center text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Contact for More Details
          </Link>
        </div>
      </div>
    </>
  );
};

function CloudServices() {
  return (
    <>
      <Header />
      <div className="pt-36 text-center">
        <span className="bg-clip-text text-xl md:text-3xl font-bold text-transparent bg-gradient-to-r from-primary to-accent">
          Cloud Computing Services
        </span>
        <SingleCard
          image="assets/cloud-computing.jpg"
          CardDescription="Discover the power of Yang Khor Pvt. Ltd., your gateway to cutting-edge off-the-shelf solutions and Microsoft-powered cloud computing solutions. Unleash rapid innovation, harness flexible resources, and seize the benefits of scale like never before. Elevate your business with our transformative technologies, delivering speed, agility, and unparalleled efficiency. Join the ranks of forward-thinking enterprises embracing the future of digital excellence with Yang Khor Pvt. Ltd."
        />
      </div>
      <Footer />
    </>
  );
}

export default CloudServices;
