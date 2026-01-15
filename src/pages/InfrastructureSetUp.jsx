import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ListItem = ({ text }) => {
return (
<li className="flex text-base text-gray-600">
    <span className="mr-2.5 mt-0.5 text-blue-500">
        <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_980_24852)">
                <path
                    d="M10 0.5625C4.78125 0.5625 0.5625 4.78125 0.5625 10C0.5625 15.2188 4.78125 19.4688 10 19.4688C15.2188 19.4688 19.4688 15.2188 19.4688 10C19.4688 4.78125 15.2188 0.5625 10 0.5625ZM10 18.0625C5.5625 18.0625 1.96875 14.4375 1.96875 10C1.96875 5.5625 5.5625 1.96875 10 1.96875C14.4375 1.96875 18.0625 5.59375 18.0625 10.0312C18.0625 14.4375 14.4375 18.0625 10 18.0625Z"
                    fill="currentColor" />
                <path
                    d="M12.6875 7.09375L8.96875 10.7188L7.28125 9.0625C7 8.78125 6.5625 8.8125 6.28125 9.0625C6 9.34375 6.03125 9.78125 6.28125 10.0625L8.28125 12C8.46875 12.1875 8.71875 12.2813 8.96875 12.2813C9.21875 12.2813 9.46875 12.1875 9.65625 12L13.6875 8.125C13.9688 7.84375 13.9688 7.40625 13.6875 7.125C13.4063 6.84375 12.9688 6.84375 12.6875 7.09375Z"
                    fill="currentColor" />
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

export default function InfrastructureSetUp() {
return (
<div>
    <Header />
    <div className="pt-24 md:pt-36 text-center mb-5">
        <span
            className="bg-clip-text text-xl md:text-3xl font-bold text-transparent bg-gradient-to-r from-primary to-accent">
            Infrastructure Set Up
        </span>
    </div>

    {/* Infrastructure Projects Section */}
    <div className="px-5 md:px-20 lg:px-36 my-10 flex flex-col gap-5">

        {/* GMC-Electronic Customs Management System */}
        <div className="space-y-3 w-full border border-black hover:shadow-lg rounded-md p-5">
            <span className="text-xl font-bold bg-clip-text bg-gradient-to-r text-transparent from-primary to-accent">
                GMC - Electronic Customs Management System (Gelephu Mindfulness City)
            </span>
            <p className="text-gray-600">Infrastructure setup using modern containerization and orchestration:</p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <ListItem text="Deployment of services using Docker containers for consistent environment setup" />
                <ListItem text="Orchestrated multiple services and microservices using Kubernetes clusters" />
                <ListItem text="Automated scaling and self-healing mechanisms for application reliability" />
                <ListItem text="CI/CD pipelines integrated for rapid deployment and testing" />
                <ListItem text="Monitoring and logging using Prometheus & Grafana for system health" />
                <ListItem text="Secure network policies and container isolation for enhanced security" />
                <ListItem text="High availability setup with load balancers and replica sets" />
                <ListItem text="Backup and disaster recovery plans implemented for critical data" />
            </ul>
        </div>

    </div>

    <Footer />
</div>
);
}