import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const WebCard = ({ ImageHref, title, description, button, buttonHref }) => {
  return (
    <div className="w-full ring-2 bg-gray-50 ring-gray-100 hover:shadow-lg pt-5 px-5 rounded-xl transition-shadow duration-300">
      <div className="relative mb-12">
        {/* Image */}
        <div className="overflow-hidden rounded-lg">
          <img
            src={ImageHref}
            alt={title}
            className="w-full object-cover transform hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 mx-7 -mt-20 rounded-lg bg-white ring-1 ring-gray-100 py-8 px-5 text-center shadow-md">
          <h3 className="mb-5 text-xl font-bold text-gray-800">{title}</h3>
          <p className="mb-6 text-gray-700 italic text-base leading-7 text-justify">
            {description}
          </p>
          <a
            href={buttonHref}
            target="_blank"
            rel="noreferrer"
            className="inline-block rounded-md border border-blue-600 py-2 px-6 text-sm font-medium text-blue-600 transition hover:bg-blue-600 hover:text-white"
          >
            {button}
          </a>
        </div>
      </div>
    </div>
  );
};

export default function ECMSProject() {
  return (
    <div>
      <Header />

      {/* Section Title */}
      <div className="pt-24 md:pt-36 text-center">
        <h2 className="bg-clip-text text-2xl md:text-4xl font-bold text-transparent bg-gradient-to-r from-primary to-accent">
          eCMS Project
        </h2>
        <p className="text-gray-600 mt-2">
          Showcasing our implementation for the Department of Revenue & Customs
        </p>
      </div>

      {/* Single Project */}
      <div className="max-w-4xl mx-auto px-5 my-12">
        <WebCard
          ImageHref="assets/projects/drc.png"
          title="Department of Revenue & Customs (DRC) | Ministry of Finance"
          description="The Department of Revenue and Customs (DRC) is the largest department under the Ministry of Finance. Located in Thimphu with eight regional offices and a liaison office in Kolkata, it is mandated to collect the national revenue through assessment and collection of taxes, duties, and fees. Our eCMS deployment has streamlined their document management processes, enhancing efficiency and transparency."
          button="Visit site"
          buttonHref="https://www.drc.gov.bt/"
        />
      </div>

      <Footer />
    </div>
  );
}
