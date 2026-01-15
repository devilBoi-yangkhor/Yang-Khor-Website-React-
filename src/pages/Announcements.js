import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const BlogCard = ({ image, date, CardTitle, CardDescription, link }) => {
  return (
    <div className="w-full flex flex-col items-center mb-10">
      {/* Centered image */}
      <div className="w-auto mb-4">
        <img src={image} alt="" className="w-full max-w-xs mx-auto" />
      </div>

      {/* Full-width text content */}
      <div className="w-full px-4 lg:px-20">
        {/* Date and Title (Link) in the same position */}
        <div className="text-center mb-4"> {/* Center both date and title */}
          {date && (
            <span className="block text-xs font-semibold leading-loose mb-2">
              {date}
            </span>
          )}
          {link ? (
            <Link
              to={link}
              className="block text-2xl font-semibold hover:text-blue-500"
            >
              {CardTitle}
            </Link>
          ) : (
            <span className="block text-2xl font-semibold">
              {CardTitle}
            </span>
          )}
        </div>

        {/* Description text */}
        <p className="text-center text-lg">
          {CardDescription}
        </p>
      </div>
    </div>
  );
};


const Announcements = () => {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center p-4 mt-5 md:mt-10 md:px-10 overflow-hidden">
        <section className="bg-white pb-10 pt-20 lg:pb-20 lg:pt-[120px]">
          <div className="container">
            <div className="-mx-4 flex flex-wrap">
              <div className="w-full px-4">
                <div className="mx-auto mb-[60px] text-center lg:mb-20">
                  <h2 className="mb-4 text-3xl font-bold sm:text-4xl md:text-[40px] bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-blue-300">
                    Our Recent News
                  </h2>
                  <p className="text-base text-gray-500">
                    Stay up-to-date with the latest news and updates from our
                    company. We are committed to keeping you informed about
                    important developments, new product launches, and exciting
                    events. Check this space regularly for the most recent
                    announcements.
                  </p>
                </div>
              </div>
            </div>

            <div className="-mx-4 flex flex-wrap">
              {/* <BlogCard
                date="Oct 04, 2024"
                CardTitle="Vacancy Post"
                CardDescription="We are seeking a motivated .NET Developer to join our software team. This role involves analyzing client requirements, developing Software Requirements Specifications (SRS), preparing technical proposals, managing project documentation, and contributing to work planning and coordination. Strong analytical abilities and excellent communication skills are critical for success in this position."
                image="assets/announcement/hiring.gif"
                link="/joblistings" // Link added to the first BlogCard
              />  */}
              <BlogCard
                date="######"
                CardTitle="Coming Soon"
                CardDescription="_________"
                image=""
              /> 
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default Announcements;
