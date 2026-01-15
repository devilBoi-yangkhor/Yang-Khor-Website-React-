import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ProjectCard = ({ ImageHref, title, points, buttonHref }) => {
return (
<div
    className="w-full ring-2 bg-gray-50 ring-gray-100 hover:shadow-xl pt-5 px-5 rounded-xl transition-shadow duration-300 flex flex-col">
    {/* Image */}
    <div className="overflow-hidden rounded-lg">
        <img src={ImageHref} alt={title}
            className="w-full object-cover h-56 transform hover:scale-105 transition-transform duration-300" />
    </div>

    {/* Content */}
    <div
        className="relative z-10 -mt-8 mx-3 rounded-lg bg-white ring-1 ring-gray-100 py-6 px-5 text-center shadow-md flex-1 flex flex-col">
        <h3 className="mb-4 text-lg font-bold text-gray-800">{title}</h3>

        {/* Points */}
        <div className="grid grid-cols-1 gap-2 text-left flex-1">
            {points.map((point, index) => (
            <div key={index} className="flex items-start space-x-2">
                <span className="text-blue-600 mt-1">✔</span>
                <p className="text-gray-700 text-sm">{point}</p>
            </div>
            ))}
        </div>

        {/* Button */}
        <a href={buttonHref} target="_blank" rel="noreferrer"
            className="mt-6 inline-block rounded-md border border-blue-600 py-2 px-5 text-sm font-medium text-blue-600 transition hover:bg-blue-600 hover:text-white">
            Visit Site
        </a>
    </div>
</div>
);
};

export default function WebSiteProjects() {
return (
<div>
    <Header />

    {/* Section Title */}
    <div className="pt-24 md:pt-36 text-center">
        <h2
            className="bg-clip-text text-2xl md:text-4xl font-bold text-transparent bg-gradient-to-r from-primary to-accent">
            Website Development Projects
        </h2>
        <p className="text-gray-600 mt-2">
            Our key digital transformation projects across Bhutan
        </p>
    </div>

    {/* 3 Cards in a Row */}
    <div className="max-w-7xl mx-auto px-5 my-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* CSOA Bhutan */}
        <ProjectCard ImageHref="assets/projects/csoa.png" title="CSOA Bhutan"
            points={[ "Centralized platform for civil society organizations"
            , "Streamlined registration and compliance process" , "Digital repository for CSO activities and reports"
            , "Enhanced transparency and accountability" , "Stakeholder engagement through online portal" , ]}
            buttonHref="http://www.csoa.gov.bt/" />

        {/* Farm Project */}
        <ProjectCard ImageHref="assets/projects/agriculture.png" title="Farm Bhutan"
            points={[ "Digital platform for farm produce management" , "Farmer registration and profiling system"
            , "Marketplace for direct farm-to-consumer sales" , "Integration with supply chain logistics"
            , "Data-driven insights for agricultural planning" , ]} buttonHref="http://202.144.137.92/" />

        {/* Tourism Project */}
        <ProjectCard ImageHref="assets/projects/tourism.png" title="Tourism Bhutan"
            points={[ "Visitor information and booking platform" , "Integration with hotels and tour operators"
            , "Automated permit and visa processing" , "Cultural heritage and event showcasing"
            , "Real-time travel advisory and updates" , ]} buttonHref="https://www.bhutan.travel/" />

    </div>

    <Footer />
</div>
);
}