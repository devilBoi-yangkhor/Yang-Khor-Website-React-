import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const WebCard = ({ ImageHref, title, description, button, buttonHref }) => {
  return (
    <>
      <div
        className={`w-full ring-2 bg-gray-50 ring-gray-100 hover:shadow-lg pt-5 px-5 rounded-md`}
      >
        <div className="relative mb-12">
          <div className="overflow-hidden rounded-[10px]">
            <img src={ImageHref} alt="portfolio" className="w-full" />
          </div>
          <div className="relative z-10 mx-7 -mt-20 rounded-lg bg-gray-50 ring-1 ring-gray-100 py-[34px] px-3 text-center">
            <h3 className="mb-5 text-xl font-bold">{title}</h3>
            <p className="mb-4 text-gray-700 italic text-opacity-80 text-base leading-8 text-justify">
              {description}
            </p>
            <a
              href={buttonHref}
              target="_blank"
              rel="noreferrer"
              className="hover:bg-blue-500 inline-block rounded-md border border-stroke py-[10px] px-7 text-sm font-medium transition hover:text-white"
            >
              {button}
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

const SoftCard = ({ project, user, scope }) => {
  return (
    <div className="w-full p-4 mx-auto bg-gray-50 rounded-md shadow-md transition duration-300 transform hover:scale-105">
      <h2 className="text-2xl font-semibold mb-2">{project}</h2>
      <p className="text-gray-700 mb-2">
        <span className="font-semibold">Client:</span> {user}
      </p>
      <div className="text-gray-700">
        <span className="font-semibold">Scope of work:</span>
        <ul className="list-disc ml-5">
          {scope.map((scopes, index) => (
            <li key={index} className="mb-1">
              {scopes}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Products = () => {
  const [category, setCategory] = useState("WebApp");

  return (
    <>
      <Header />

      <section className="pt-28 overflow-hidden md:pt-32 pb-12 lg:pt-[120px] lg:pb-[90px]">
        <div className="mx-auto w-5/6">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full px-4">
              <div className="mx-auto mb-[60px] max-w-[510px] text-center">
                <span className="mb-3 text-3xl leading-[1.208] font-bold sm:text-4xl md:text-[40px] bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-blue-300">
                  Our Recent Projects
                </span>
                <p className="text-base italic text-gray-500">
                  "A project is complete when it starts working for you, rather
                  than you working for it."
                </p>
                <p className="text-lg italic text-gray-600">- Scott Allen</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={() => setCategory("WebApp")}
              className={`px-5 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300 transition duration-300 ${
                category === "WebApp"
                  ? "bg-blue-500 text-white shadow-md"
                  : "bg-gray-200 text-black hover:bg-blue-100"
              }`}
            >
              Web App
            </button>
            <button
              onClick={() => setCategory("SoftwareServices")}
              className={`px-5 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300 transition duration-300 ${
                category === "SoftwareServices"
                  ? "bg-blue-500 text-white shadow-md"
                  : "bg-gray-200 text-black hover:bg-blue-100"
              }`}
            >
              Software Services
            </button>
            
          </div>

          <div className={`${category === "WebApp" ? "block" : "hidden"}`}>
            <div className="mt-10 grid grid-col-1 md:grid-cols-2 gap-5">
              <WebCard
                ImageHref="assets/btfn.PNG"
                title="Development and Implementation of Bhutan (BTFN)"
                description="The Bhutan TradeFin Net (BTFN) System records and measures all cross-border transactions on real time basis. With a single submission of documents to multiple regulatory agencies through a single integrated platform of the BTFN, the cross-border transactions can be facilitated, fulfilling the trade formalities of the traders."
                button="Visit site"
                buttonHref="https://www.btfn.bt/"
              />
              <WebCard
                ImageHref="assets/ecms.PNG"
                title="Electronic Custom Management System (eCMS)"
                description="eCMS is a web-based application, that is accessible to all citizens and businesses wishing to conduct international trade that will consist, inter alia, of Customs Agents (Brokers), Importers, Exporters, freight forwarders and private citizens via the internet."
                button="Visit site"
                buttonHref="https://www.ecms.gov.bt/"
              />
              <WebCard
                ImageHref="assets/zest.PNG"
                title="Zest System development and enhancement"
                description="Civil Service Information System (CSIS) a vital Goverment central human resource system which manages the data of all civil servants from recruitment to separation."
                button="Visit site"
                buttonHref="https://zest.rcsc.gov.bt/"
              />
              <WebCard
                ImageHref="assets/csoa.PNG"
                title="CSOA-IMS System Enhancement"
                description="CSOA website revamping and CSOA system development."
                button="Visit site"
                buttonHref="http://www.csoa.org.bt/public/w"
              />
            </div>
          </div>
          <div
            className={`${
              category === "SoftwareServices" ? "block" : "hidden"
            }`}
          >
            <div className="mt-10 grid md:grid-cols-2 grid-cols-1 gap-10">
              <SoftCard
                project={"OutSourcing of System Audit"}
                user={"National Pension and Provident Fund (NPPF)"}
                scope={[
                  "Application Security Audit ",
                  "Infrastructure Security Audit ",
                  "Performance Audit ",
                  "Availability Audit ",
                  "Data Quality Assessment ",
                  "SLA Audit",
                  "Project Documentation Audit ",
                ]}
              />
              <SoftCard
                project={"Outsourcing of System Audit"}
                user={"Bhutan Development Bank Limited (BDBL)"}
                scope={[
                  "Core Banking Migration Audit",
                  "Data Migration Validation",
                  "Audit of Information Security Architecture and Implementation of Information Security Policy",
                  "Operating System Audit of Servers Systems and Networking Equipment",
                  "Audit of DBMS and Data Security",
                  "Audit of Internet Banking and Mobile Banking Infrastructures",
                ]}
              />
              <SoftCard
                project={"Integrated Civil Service (ICS)"}
                user={"GovTech Agency (Rural Timber Permit Services)"}
                scope={[
                  "Chief Forest Officer to Chief Forest Officer forwarding of application",
                  "Capture Manual Records and past records of citizens who have availed the Subsidized rural timber",
                  "Range to BEAT/ Guard Past",
                  "Permit for Firewood and poles ",
                  "Permit for Forest Product Removal from Private Land",
                ]}
              />
              <SoftCard
                project={"Integrated Civil Service (ICS)"}
                user={"GovTech Agency (Student Information Services)"}
                scope={[
                  "Development of National Level Education Repository (NLER) to facilite access to education history of citizens using a single access. ",
                  "Integration of NLER with eCMS using DITT API to access statement of marks/ records for a particular level. Users can access records of single level at one time for levels PP-IX and XI. ",
                  "Integration of NLER with BCSEA RPA using DITT API to fetch statement of marks for class X and XI. ",
                ]}
              />
              <SoftCard
                project={"Integrated Civil Service (ICS)"}
                user={"GovTech Agency (GIS and Pension Services)"}
                scope={[
                  "Software User Requirements Study",
                  "Devlopment of the dashboard where in a GIS(RICBL) and Pension (NPPF) provided by two different organization is being integrated to provide the centralized for the easy use by the citizen",
                  "Integration with the external system was also part of the service. (Zest, ePEMS, BCRC) ",
                ]}
              />
              <SoftCard
                project={"Regulatory Information and Management System (RIMS)"}
                user={"Drug Regulatory Authority "}
                scope={[
                  "Development of the system",
                  "Registration Division: manages authorization processing, ensuring compliance",
                  "Competent Person: allows experts to oversee product authorization",
                  "Medical Product: full registration, abridge, expedited",
                  "Technical Authorization: approves technically assessed products",
                  "Import Authorization: manages approval for imported products",
                  "Export Authorization: oversees approval for products intended for export",
                ]}
              />
              <SoftCard
                project={"PMAS"}
                user={"Bhutan Standard Bureau"}
                scope={[
                  "Development of report bank ",
                  "Introduce management system application ",
                  "Online renewal (To be incorporated with e-payment system in future) ",
                  "Report analysis ",
                  "Changes within the existing system and  ",
                  "User Feedback system ",
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Products;
