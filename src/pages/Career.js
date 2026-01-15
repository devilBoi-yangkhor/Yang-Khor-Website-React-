import React from "react";
import Header from "../components/Header";
// import { Link } from "react-router-dom";
import Footer from "../components/Footer";

function Career() {
  return (
    <div>
      <Header />
      <div className="items-center h-fit mt-16 md:mt-0 relative">
        <img
          className="object-cover w-full h-full"
          src="assets/jobhiring.PNG"
          alt="Job Hiring"
        />

        <div className="absolute top-2/3 left-1/3 transform -translate-x-1/2 -translate-y-1/2 flex space-x-4">
          {/* <Link
            to="/joblistings"
            className="rounded-md bg-blue-800 px-3.5 py-2.5 text-sm mt-5 font-semibold items-center text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            View Job Listings
          </Link> */}

          {/* <Link
            to="#"
            className="rounded-md bg-blue-800 px-3.5 py-2.5 text-sm mt-5 font-semibold items-center text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            View Job Listings - Not Availiable
          </Link> */}

          {/* <Link
            to="#"
            className="rounded-md bg-gray-500 px-3.5 py-2.5 text-sm mt-5 font-semibold text-white shadow-sm hover:bg-gray-400 cursor-pointer"
          >
            Shortlisted List- Not Availiable
          </Link>

          <Link
            to="#"
            className="rounded-md bg-gray-500 px-3.5 py-2.5 text-sm mt-5 font-semibold text-white shadow-sm hover:bg-gray-400 cursor-pointer"
          >
            Selected List - Not Availiable
          </Link> */}
        </div>

        <span className="absolute top-2/3 left-1/3 transform -translate-x-1/2 -translate-y-1/2 rounded-md bg-blue-800 px-3.5 py-2.5 text-sm mt-5 font-semibold items-center text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Not Hiring At the Moment
        </span>
      </div>

      <div className="bg-gray-50 border p-5 mt-10 text-center">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-blue-300 text-xl md:text-2xl font-bold">
          Working at Yang Khor
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2 md:p-0 md:py-10 w-5/6 mx-auto">
        <div className="bg-gray-50 border hover:shadow-lg p-2 md:p-5 rounded-md text-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-blue-300 text-lg md:text-xl font-bold">
            Company Culture
          </span>
          <p className="p-2 text-justify text-gray-600 text-sm md:text-base leading-6">
            Yang khor Private Limited is more than a workplace; it's a{" "}
            <span className="text-blue-600">
              vibrant community where innovation and collaboration flourish
            </span>
            . Embracing diversity, we foster a culture of inclusivity, valuing
            each team member's unique perspective. At the core of our ethos is a
            commitment to continuous learning, providing opportunities for
            personal and professional growth. Work-life integration is
            paramount, with flexible arrangements to support a healthy balance.
            We celebrate excellence, encourage open communication, and recognize
            achievements, creating a motivating environment. Engage with purpose
            through our social responsibility initiatives, contributing to
            positive change. Led by forward-thinking leadership,{" "}
            <span className="text-blue-600">
              Yang khor is not just a company; it's an exciting journey where
              passion meets opportunity
            </span>
            . Join us and become part of a culture that defines success through
            collaboration, innovation, and a shared commitment to excellence.
          </p>
        </div>
        <div className="bg-gray-50 border hover:shadow-lg p-5 rounded-md text-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-blue-300 text-lg md:text-xl font-bold">
            Timing
          </span>
          <p className="p-2 text-justify text-gray-600 text-sm md:text-base leading-6">
            At Yang khor Private Limited, our work timing reflects our commitment
            to employee well-being and productivity.{" "}
            <span className="text-blue-600">Monday through Friday</span>, our
            team engages in fulfilling and collaborative work experiences.
            <span className="text-blue-600">
              During the summer months, from 9 am to 6 pm
            </span>
            , employees enjoy longer daylight hours to maximize productivity and
            work-life balance.{" "}
            <span className="text-blue-600">
              As winter approaches, we adjust our timing to 9 am to 5 pm,
            </span>{" "}
            ensuring a comfortable and efficient work environment during darker
            months. Our consistent Monday-to-Friday schedule promotes a routine
            that supports work-life integration, allowing our dedicated team to
            manage their professional and personal commitments effectively. This
            thoughtful approach to work timing is part of our commitment to
            creating a positive and adaptable workplace culture at Yang Khor
            Private Limited.
          </p>
        </div>
        <div className="bg-gray-50 border hover:shadow-lg p-5 rounded-md text-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-blue-300 text-lg md:text-xl font-bold">
            Training and Learning
          </span>
          <p className="p-2 text-justify text-gray-600 text-sm md:text-base leading-6">
            At Yang khor Private Limited,{" "}
            <span className="text-blue-600">
              we prioritize continuous training and learning
            </span>{" "}
            as cornerstones of professional development. We foster a culture
            where employees are encouraged to expand their skill sets, ensuring
            they stay at the forefront of industry trends. Our comprehensive
            training programs cover a spectrum of topics, from
            <span className="text-blue-600">
              {" "}
              technical skills to leadership development, empowering our team to
              excel in their roles
            </span>
            . With access to workshops, seminars, and mentorship initiatives,
            employees at Yang Khor embark on a journey of lifelong learning. We
            believe in nurturing a growth mindset, where curiosity and
            innovation thrive. Our commitment to training not only enhances
            individual capabilities but also contributes to the collective
            success of our dynamic team. Join Yang Khor, where learning is not
            just an opportunity – it's a continuous and enriching experience.
          </p>
        </div>
        <div className="bg-gray-50 border hover:shadow-lg p-5 rounded-md text-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-blue-300 text-lg md:text-xl font-bold">
            Employee Benefits
          </span>
          <p className="p-2 text-justify text-gray-600 text-sm md:text-base leading-6">
            At Yang Khor Private Limited, we prioritize the{" "}
            <span className="text-blue-600">well-being and satisfaction</span>{" "}
            of our employees by offering a comprehensive range of benefits. Our
            competitive compensation packages include health insurance, ensuring
            that the physical well-being of our team is a top priority. We
            promote a healthy work-life balance through flexible work
            arrangements, recognizing the importance of personal and
            professional harmony. Employees at Yang Khor enjoy opportunities for{" "}
            <span className="text-blue-600">
              continuous learning and skill development, with access to
              workshops, training programs, and career advancement initiatives
            </span>
            . We value our team's hard work and dedication, and as part of our
            commitment, we provide{" "}
            <span className="text-blue-600">
              performance-based bonuses and recognition programs
            </span>
            . Join Yang Khor, where our commitment to employee benefits goes
            beyond traditional offerings, creating a supportive and rewarding
            environment for personal and professional growth.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Career;
