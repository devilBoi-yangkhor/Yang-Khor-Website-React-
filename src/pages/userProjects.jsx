import React, { useRef, useState} from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { collection, getDocs } from "firebase/firestore"; // Import Firestore functions
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";

// Main component for User Projects
const UserProjects = () => {
    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <TopBar />
                <main className="flex-1 p-6 overflow-y-auto">
                    <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Projects</h2>
                    <DragCards />
                    <ProjectSummary />
                </main>
            </div>
        </div>
    );
};

// DragCards Component
const DragCards = () => {
    return (
        <section className="relative grid min-h-screen w-full place-content-center overflow-hidden bg-neutral-950">
            <h2 className="relative z-0 text-[20vw] font-black text-neutral-800 md:text-[200px]">
                ASTRO<span className="text-indigo-500">.</span>
            </h2>
            <Cards />
        </section>
    );
};

// Cards Component
const Cards = () => {
    const containerRef = useRef(null);

    return (
        <div className="absolute inset-0 z-10" ref={containerRef}>
            {cardData.map((card, index) => (
                <Card key={index} {...card} containerRef={containerRef} />
            ))}
        </div>
    );
};

const cardData = [
    {
        src: "https://images.unsplash.com/photo-1635373670332-43ea883bb081?q=80&w=2781&auto=format&fit=crop",
        alt: "Image 1",
        rotate: "6deg",
        top: "20%",
        left: "25%",
        className: "w-36 md:w-56"
    },
    {
        src: "https://images.unsplash.com/photo-1576174464184-fb78fe882bfd?q=80&w=2787&auto=format&fit=crop",
        alt: "Image 2",
        rotate: "12deg",
        top: "45%",
        left: "60%",
        className: "w-24 md:w-48"
    },
    {
        src: "https://images.unsplash.com/photo-1503751071777-d2918b21bbd9?q=80&w=2670&auto=format&fit=crop",
        alt: "Image 3",
        rotate: "-6deg",
        top: "20%",
        left: "40%",
        className: "w-52 md:w-80"
    },
];

// Card Component for Dragging
const Card = ({ containerRef, src, alt, top, left, rotate, className }) => {
    const [zIndex, setZIndex] = useState(0);

    const updateZIndex = () => {
        setZIndex((prev) => prev + 1);
    };

    return (
        <motion.img
            onMouseDown={updateZIndex}
            style={{
                top,
                left,
                rotate,
                zIndex,
            }}
            className={twMerge(
                "drag-elements absolute w-48 bg-neutral-200 p-1 pb-4",
                className
            )}
            src={src}
            alt={alt}
            drag
            dragConstraints={containerRef}
            dragElastic={0.65}
        />
    );
};

// Project Summary Table Component
const ProjectSummary = () => {
    return (
        <div className="mt-10">
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Project Summary</h3>
            <table className="min-w-full bg-white dark:bg-gray-800">
                <thead>
                    <tr>
                        <th className="py-2 px-4 bg-gray-200 dark:bg-gray-700">Project Name</th>
                        <th className="py-2 px-4 bg-gray-200 dark:bg-gray-700">Description</th>
                        <th className="py-2 px-4 bg-gray-200 dark:bg-gray-700">Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="py-2 px-4 border-b">Project Alpha</td>
                        <td className="py-2 px-4 border-b">A cutting-edge AI project</td>
                        <td className="py-2 px-4 border-b">In Progress</td>
                    </tr>
                    <tr>
                        <td className="py-2 px-4 border-b">Project Beta</td>
                        <td className="py-2 px-4 border-b">A blockchain-based application</td>
                        <td className="py-2 px-4 border-b">Completed</td>
                    </tr>
                    <tr>
                        <td className="py-2 px-4 border-b">Project Gamma</td>
                        <td className="py-2 px-4 border-b">An e-commerce platform</td>
                        <td className="py-2 px-4 border-b">In Progress</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default UserProjects;
