import React from "react";
import "../index.css";


const Hero = () => {
  return (
    <div className="absolute w-full h-screen">
      <div className="px-5 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-300 flex flex-col gap-5 w-full h-full items-center justify-center">
        <span className="md:text-6xl text-5xl font-bold">Yang Khor Private Limited</span>
        <span>Your Technology Partner for Software Innovation and Value-adding Solutions</span>
      </div>
    </div>
  );
};

export default Hero;
