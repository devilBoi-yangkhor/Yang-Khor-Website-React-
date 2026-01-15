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

export default function SecurityServices() {
  return (
    <div>
      <Header />
      <div className="pt-36 text-center">
        <span className="bg-clip-text text-xl md:text-3xl font-bold text-transparent bg-gradient-to-r from-primary to-accent">
          Security & Risk Management
        </span>
        <SingleCard
          image="assets/security.jpg"
          CardDescription="Experience the pinnacle of security with Yang Khor Pvt. Ltd. Our expertise extends across both application and infrastructure levels, ensuring comprehensive protection for your digital assets. Backed by certified technical prowess, we deliver cutting-edge solutions tailored to safeguard your business from every angle. Rest assured, our dedicated team stands ready to fortify your defenses and provide unparalleled peace of mind to our valued clients."
        />
      </div>
      <Footer />
    </div>
  );
}
