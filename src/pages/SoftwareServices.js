import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

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

export default function SoftwareServices() {
  return (
    <div>
      <Header />
      <div className="pt-36 text-center">
        <span className="bg-clip-text text-xl md:text-3xl font-bold text-transparent bg-gradient-to-r from-primary to-accent">
          Software Applications
        </span>
        <SingleCard
          image="assets/softwareapplication.jpg"
          CardDescription="At Yang Khor Pvt. Ltd., we offer a comprehensive suite of software solutions tailored to meet the diverse needs of our clients nationwide. From in-house development to off-the-shelf software applications and mobile application solutions, we deliver innovation at every turn. Whether you're seeking custom-built solutions or ready-made applications, our team is dedicated to providing top-tier services that drive your business forward. Partner with us to unlock the full potential of technology and propel your organization to new heights of success."
        />
      </div>
      <Footer />
    </div>
  );
}
