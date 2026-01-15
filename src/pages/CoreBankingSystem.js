import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

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

export default function CoreBankingSystem() {
  return (
    <div>
      <Header />
      <div className="pt-24 md:pt-36 text-center mb-5">
        <span className="bg-clip-text text-xl md:text-3xl font-bold text-transparent bg-gradient-to-r from-primary to-accent">
          System Development Regulatory IMS
        </span>
      </div>

      {/* Client Logo Section */}
      <div className="px-5 md:px-20 lg:px-36">
        <div className="w-full border flex flex-col items-center md:flex md:flex-row md:items-center md:justify-between gap-5 border-black hover:shadow-lg shadow-none rounded-md p-5">
          <div className="h-full w-full text-center">
            <span className="bg-clip-text text-xl font-bold text-transparent bg-gradient-to-r from-primary to-accent">
              Clients
            </span>
            <div className="h-full w-full flex justify-center items-center gap-5 flex-wrap">
              <img
                src="assets/projects/all_banks.jpg"
                alt="BDBL Logo"
                className="h-20 md:h-36 object-cover rounded-full pointer-events-none"
              />
              <img
                src="assets/projects/microfinance.jpg"
                alt="Microfinance Logo"
                className="h-20 md:h-36 object-cover rounded-full pointer-events-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Projects Section */}
      <div className="px-5 md:px-20 lg:px-36 my-10 flex flex-col gap-5">

        {/* Banks & Microfinance Section */}
        <div className="space-y-3 w-full border border-black hover:shadow-lg rounded-md p-5">
          <span className="text-xl font-bold bg-clip-text bg-gradient-to-r text-transparent from-primary to-accent">
            Banks & Microfinance Organizations in Bhutan
          </span>
          <p className="text-gray-600">Our roles and responsibilities include:</p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <ListItem text="Core Banking System Development & Maintenance" />
            <ListItem text="Digital Payment Integration & Mobile Banking" />
            <ListItem text="Loan & Credit Management Systems" />
            <ListItem text="Customer Information Security & Compliance" />
            <ListItem text="Regulatory Reporting Automation" />
            <ListItem text="Support for Financial Inclusion Initiatives" />
            <ListItem text="Capacity Building & Technical Training for Staff" />
            <ListItem text="Custom Solutions for Microfinance Services" />
          </ul>
        </div>
      </div>

      <Footer />
    </div>
  );
}
