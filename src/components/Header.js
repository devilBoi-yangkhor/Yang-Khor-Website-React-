import { faAngleDown, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { Dialog } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

function Header() {
const currentPath = window.location.pathname;
const [servicesLinkHovered, setServicesLinkHovered] = useState(false);
const [projectsLinkHovered, setProjectsLinkHovered] = useState(false);
const [careerLinkHovered, setCareerLinkHovered] = useState(false);

const handleServiceMouseEnter = () => {
setServicesLinkHovered(true);
};
const handleServiceMouseLeave = () => {
setServicesLinkHovered(false);
};
const handleProjectMouseEnter = () => {
setProjectsLinkHovered(true);
};
const handleProjectMouseLeave = () => {
setProjectsLinkHovered(false);
};

const handleCareerMouseEnter = () => {
setCareerLinkHovered(true);
};
const handleCareerMouseLeave = () => {
setCareerLinkHovered(false);
};

const [isOpen, setIsOpen] = useState(false);

const handleClick = () => {
setIsOpen(!isOpen);
};

// mobileView services and projects
const [servicesDropOpen, setServicesDropOpen] = useState(false);
const [projectsDropOpen, setProjectsDropOpen] = useState(false);

const handleServiceDrop = () => {
setServicesDropOpen(!servicesDropOpen);
};

const handleProjectDrop = () => {
setProjectsDropOpen(!projectsDropOpen);
};

// State to hold the transparency value of the navigation bar
const [navOpacity, setNavOpacity] = useState(0);

useEffect(() => {
// Function to handle scroll event
const handleScroll = () => {
// Calculate scroll position
const scrollPosition = window.scrollY;
console.log("position: ", scrollPosition);

// Define the threshold scroll position to change transparency
const threshold = 100; // Adjust this value as needed

// Calculate the opacity based on the scroll position
const opacity = Math.min(1, scrollPosition / threshold);
console.log("opacity: ", opacity);

// Set the opacity of the navigation bar
setNavOpacity(opacity);
};

// Add event listener for scroll
window.addEventListener("scroll", handleScroll);

// Remove event listener on component unmount
return () => {
window.removeEventListener("scroll", handleScroll);
};
}, []); // Empty dependency array ensures the effect runs only once on component mount

return (
<div className={`flex fixed top-0 z-50 w-full items-center justify-between xl:px-32 lg:px-16 px-8 py-2
  ${currentPath==="/" ? "" : "!bg-white !shadow-md" }`} style={{
        backgroundColor: `rgba(255, 255, 255, ${navOpacity})`,
        boxShadow: `0 2px 4px rgba(0, 0, 0, ${navOpacity * 0.2})`,
      }}>
  <Link to={"/"}> <img src="assets/logo.PNG" className="h-16 md:h-24 w-auto" alt="yangkhor logo" />
  </Link>

  {/* deskview */}
  <div className="lg:flex gap-5 hidden">
    <NavLink to={"/"} className={(navData)=>
      navData.isActive
      ? "text-blue-500 group relative p-2 text-sm font-semibold leading-6"
      : "text-sm font-semibold group relative leading-6 text-gray-900 p-2 hover:text-blue-500"
      }
      >
      Home
      <span className={`h-[2px] inline-block bg-blue-500 absolute left-0 -bottom-0.5 group-hover:w-full
        transition-[width] ease duration-300 ${ currentPath==="/" ? "w-full" : "w-0" }`}>
        &nbsp;
      </span>
    </NavLink>
    <NavLink to={"/about"} className={(navData)=>
      navData.isActive
      ? "text-blue-500 group relative p-2 text-sm font-semibold leading-6"
      : "text-sm font-semibold group relative leading-6 text-gray-900 p-2 hover:text-blue-500"
      }
      >
      About Us
      <span className={`h-[2px] inline-block bg-blue-500 absolute left-0 -bottom-0.5 group-hover:w-full
        transition-[width] ease duration-300 ${ currentPath==="/about" ? "w-full" : "w-0" }`}>
        &nbsp;
      </span>
    </NavLink>
    <NavLink onMouseEnter={handleServiceMouseEnter} onMouseLeave={handleServiceMouseLeave}
      className={ "p-2 text-sm font-semibold leading-6 text-gray-900 hover:text-blue-500" }>
      Services{" "}
      {servicesLinkHovered ? (
      <FontAwesomeIcon className="h-3" icon={faAngleDown} />
      ) : (
      <FontAwesomeIcon className="h-3" icon={faAngleRight} />
      )}
      {servicesLinkHovered && (
      <div className="absolute !text-gray-800 flex flex-col w-80 gap-3 bg-white rounded-md shadow-md p-5">
        <Link to={"/cloudservices"} className="group inline-block relative text-gray-800 hover:text-blue-500">
        Cloud Computing Solutions
        <span className="h-[2px] inline-block bg-blue-500 absolute left-0 -bottom-0.5
         group-hover:w-full transition-[width] ease duration-300 w-0"></span>
        </Link>
        <Link to={"/dataservices"} className="group inline-block relative text-gray-800 hover:text-blue-500">
        Data Center & Virtualization
        <span className="h-[2px] inline-block bg-blue-500 absolute left-0 -bottom-0.5
         group-hover:w-full transition-[width] ease duration-300 w-0"></span>
        </Link>
        <Link to={"/networkingservices"} className="group inline-block relative text-gray-800 hover:text-blue-500">
        Networking
        <span className="h-[2px] inline-block bg-blue-500 absolute left-0 -bottom-0.5
         group-hover:w-full transition-[width] ease duration-300 w-0"></span>
        </Link>
        <Link to={"/securityservices"} className="group inline-block relative text-gray-800 hover:text-blue-500">
        Security & Risk Management
        <span className="h-[2px] inline-block bg-blue-500 absolute left-0 -bottom-0.5
         group-hover:w-full transition-[width] ease duration-300 w-0"></span>
        </Link>
        <Link to={"/softwareservices"} className="group inline-block relative text-gray-800 hover:text-blue-500">
        Software Application
        <span className="h-[2px] inline-block bg-blue-500 absolute left-0 -bottom-0.5
         group-hover:w-full transition-[width] ease duration-300 w-0"></span>
        </Link>
        <Link to={"/microsoftservices"} className="group inline-block relative text-gray-800 hover:text-blue-500">
        Microsoft Licensing and Product Delivery
        <span className="h-[2px] inline-block bg-blue-500 absolute left-0 -bottom-0.5
         group-hover:w-full transition-[width] ease duration-300 w-0"></span>
        </Link>
      </div>
      )}
    </NavLink>
    <NavLink onMouseEnter={handleProjectMouseEnter} onMouseLeave={handleProjectMouseLeave}
      className={ "text-sm font-semibold  leading-6 text-gray-900 p-2 hover:text-blue-500" }>
      Projects{" "}
      {projectsLinkHovered ? (
      <FontAwesomeIcon className="h-3" icon={faAngleDown} />
      ) : (
      <FontAwesomeIcon className="h-3" icon={faAngleRight} />
      )}
      {projectsLinkHovered && (
      <div className="absolute !text-gray-800 flex flex-col w-80 gap-3 bg-white rounded-md shadow-md p-5">
        <Link to={"/document-management-system"}
          className="group inline-block relative text-gray-800 hover:text-blue-500">
        Document Management System (DMS)
        <span className="h-[2px] inline-block bg-blue-500 absolute left-0 -bottom-0.5
                  group-hover:w-full transition-[width] ease duration-300 w-0"></span>
        </Link>
        <Link to={"/ecms-project"} className="group inline-block relative text-gray-800 hover:text-blue-500">
        eCMS Projects
        <span className="h-[2px] inline-block bg-blue-500 absolute left-0 -bottom-0.5
                  group-hover:w-full transition-[width] ease duration-300 w-0"></span>
        </Link>

        <Link to={"/btfn-project"} className="group inline-block relative text-gray-800 hover:text-blue-500">
        BTFN Projects
        <span className="h-[2px] inline-block bg-blue-500 absolute left-0 -bottom-0.5
         group-hover:w-full transition-[width] ease duration-300 w-0"></span>
        </Link>
        <Link to={"/ICS-projects"} className="group inline-block relative text-gray-800 hover:text-blue-500">
        ICS Projects
        <span className="h-[2px] inline-block bg-blue-500 absolute left-0 -bottom-0.5
         group-hover:w-full transition-[width] ease duration-300 w-0"></span>
        </Link>
        <Link to={"/IAS-projects"} className="group inline-block relative text-gray-800 hover:text-blue-500">
        IAS Projects
        <span className="h-[2px] inline-block bg-blue-500 absolute left-0 -bottom-0.5
         group-hover:w-full transition-[width] ease duration-300 w-0"></span>
        </Link>
        <Link to={"/core-banking-system"} className="group inline-block relative text-gray-800 hover:text-blue-500">
        Core Banking System
        <span className="h-[2px] inline-block bg-blue-500 absolute left-0 -bottom-0.5
         group-hover:w-full transition-[width] ease duration-300 w-0"></span>
        </Link>
        <Link to={"/NDI-project"} className="group inline-block relative text-gray-800 hover:text-blue-500">
        NDI Projects
        <span className="h-[2px] inline-block bg-blue-500 absolute left-0 -bottom-0.5
         group-hover:w-full transition-[width] ease duration-300 w-0"></span>
        </Link>
        <Link to={"/website-development"} className="group inline-block relative text-gray-800 hover:text-blue-500">
        Website Development
        <span className="h-[2px] inline-block bg-blue-500 absolute left-0 -bottom-0.5
         group-hover:w-full transition-[width] ease duration-300 w-0"></span>
        </Link>
        <Link to={"/infrastructure-setup"} className="group inline-block relative text-gray-800 hover:text-blue-500">
        Infrastructure Set Up
        <span className="h-[2px] inline-block bg-blue-500 absolute left-0 -bottom-0.5
         group-hover:w-full transition-[width] ease duration-300 w-0"></span>
        </Link>
        <Link to={"/ecms-integrations"} className="group inline-block relative text-gray-800 hover:text-blue-500">
        eCMS Integration
        <span className="h-[2px] inline-block bg-blue-500 absolute left-0 -bottom-0.5
         group-hover:w-full transition-[width] ease duration-300 w-0"></span>
        </Link>
        <Link to={"/bsb-system"} className="group inline-block relative text-gray-800 hover:text-blue-500">
        Bhutan Standard Bureau System
        <span className="h-[2px] inline-block bg-blue-500 absolute left-0 -bottom-0.5
         group-hover:w-full transition-[width] ease duration-300 w-0"></span>
        </Link>
        <Link to={"/microsoftservices"} className="group inline-block relative text-gray-800 hover:text-blue-500">
        Microsoft Services
        <span className="h-[2px] inline-block bg-blue-500 absolute left-0 -bottom-0.5
         group-hover:w-full transition-[width] ease duration-300 w-0"></span>
        </Link>
      </div>
      )}
    </NavLink>
    <NavLink to={"/announcements"} className={(navData)=>
      navData.isActive
      ? "text-blue-500 group relative p-2 text-sm font-semibold leading-6"
      : "text-sm font-semibold group relative leading-6 text-gray-900 p-2 hover:text-blue-500"
      }
      >
      Announcements
      <span className={`h-[2px] inline-block bg-blue-500 absolute left-0 -bottom-0.5 group-hover:w-full
        transition-[width] ease duration-300 ${ currentPath==="/announcements" ? "w-full" : "w-0" }`}>
        &nbsp;
      </span>
    </NavLink>
    <NavLink onMouseEnter={handleCareerMouseEnter} onMouseLeave={handleCareerMouseLeave}
      className={ "text-sm font-semibold  leading-6 text-gray-900 p-2 hover:text-blue-500" }>
      Carrer{" "}
      {careerLinkHovered ? (
      <FontAwesomeIcon className="h-3" icon={faAngleDown} />
      ) : (
      <FontAwesomeIcon className="h-3" icon={faAngleRight} />
      )}
      {careerLinkHovered && (
      <div className="absolute !text-gray-800 flex flex-col w-80 gap-3 bg-white rounded-md shadow-md p-5">
        <Link to={"/career"} className="group inline-block relative text-gray-800 hover:text-blue-500">
        Job Vaccancy
        <span className="h-[2px] inline-block bg-blue-500 absolute left-0 -bottom-0.5
          group-hover:w-full transition-[width] ease duration-300 w-0"></span>
        </Link>
      </div>
      )}
    </NavLink>

    <NavLink to={"/agri-tech-division"} className={(navData)=>
      navData.isActive
      ? "text-blue-500 group relative p-2 text-sm font-semibold leading-6"
      : "text-sm font-semibold group relative leading-6 text-gray-900 p-2 hover:text-blue-500"
      }
      >
      Agri-Tech Division
      <span className={`h-[2px] inline-block bg-blue-500 absolute left-0 -bottom-0.5 group-hover:w-full
        transition-[width] ease duration-300 ${ currentPath==="/contact" ? "w-full" : "w-0" }`}>
        &nbsp;
      </span>
    </NavLink>
    <NavLink to={"/downloads"} className={(navData)=>
      navData.isActive
      ? "text-blue-500 group relative p-2 text-sm font-semibold leading-6"
      : "text-sm font-semibold group relative leading-6 text-gray-900 p-2 hover:text-blue-500"
      }
      >
      Downloads
      <span className={`h-[2px] inline-block bg-blue-500 absolute left-0 -bottom-0.5 group-hover:w-full
        transition-[width] ease duration-300 ${ currentPath==="/downloads" ? "w-full" : "w-0" }`}>
        &nbsp;
      </span>
    </NavLink>
  </div>

  {/* mobileView */}
  <div className="flex lg:hidden">
    <button type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
      onClick={handleClick}>
      <span className="sr-only">Open main menu</span>
      <Bars3Icon className="h-6 w-6 hover:text-blue-500" aria-hidden="true" />
    </button>
  </div>

  <Dialog as="div" className="lg:hidden" open={isOpen} onClose={setIsOpen}>
    <div className="fixed inset-0 z-50" />
    <Dialog.Panel
      className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
      <div className="flex items-center justify-between">
        <Link to="/" className="-m-1.5 p-1.5">
        <span className="sr-only">Yang Khor Private Ltd</span>
        <img className="h-16 w-auto" src="assets/logo.PNG" alt="company logo" />
        </Link>
        <button type="button" className="-m-2.5 rounded-md p-2.5 text-gray-700" onClick={handleClick}>
          <span className="sr-only">Close menu</span>
          <XMarkIcon className="h-6 w-6 hover:text-red-500" aria-hidden="true" />
        </button>
      </div>

      <div className="mt-6 flow-root">
        <hr />
        <div className="my-4 divide-y divide-gray-500/10">
          <div className="space-y-2 py-6 flex flex-col gap-5">
            <Link to={"/"} className={`p-2 rounded-md hover:bg-gray-100 hover:text-blue-500 ${ currentPath==="/"
              ? "bg-gray-100 text-blue-500" : "text-gray-800" }`}>
            Home
            </Link>
            <Link to={"/about"} className={`p-2 rounded-md hover:bg-gray-100 hover:text-blue-500 ${
              currentPath==="/about" ? "bg-gray-100 text-blue-500" : "text-gray-800" }`}>
            About Us
            </Link>
            <div className="w-full">
              <button onClick={handleServiceDrop} className={`p-2 rounded-md text-left w-full flex justify-between
                items-center hover:bg-gray-100 hover:text-blue-500 ${ servicesDropOpen ? "bg-gray-100 text-blue-500"
                : "text-gray-800" }`}>
                Services
                {servicesDropOpen ? (
                <FontAwesomeIcon className="h-3" icon={faAngleDown} />
                ) : (
                <FontAwesomeIcon className="h-3" icon={faAngleRight} />
                )}
              </button>
              <ul className={`flex flex-col gap-3 mt-3 bg-gray-50 rounded-md p-5 ${ servicesDropOpen ? "block"
                : "hidden" }`}>
                <li>
                  <Link to={"/cloudservices"} className="hover:text-blue-500 hover:underline underline-offset-2">
                  Cloud Computing Solutions
                  </Link>
                </li>
                <li>
                  <Link to={"/dataservices"} className="hover:text-blue-500 hover:underline underline-offset-2">
                  Data Center & Virtualization
                  </Link>
                </li>
                <li>
                  <Link to={"/networkingservices"} className="hover:text-blue-500 hover:underline underline-offset-2">
                  Networking
                  </Link>
                </li>
                <li>
                  <Link to={"/securityservices"} className="hover:text-blue-500 hover:underline underline-offset-2">
                  Security & Risk Management
                  </Link>
                </li>
                <li>
                  <Link to={"/softwareservices"} className="hover:text-blue-500 hover:underline underline-offset-2">
                  Software Application
                  </Link>
                </li>
                <li>
                  <Link to={"/microsoftservices"} className="hover:text-blue-500 hover:underline underline-offset-2">
                  Microsoft Licensing & Product Delivery
                  </Link>
                </li>
              </ul>
            </div>
            <div className="w-full">
              <button onClick={handleProjectDrop} className={`p-2 rounded-md text-left w-full flex justify-between
                items-center hover:bg-gray-100 hover:text-blue-500 ${ projectsDropOpen ? "bg-gray-100 text-blue-500"
                : "text-gray-800" }`}>
                Projects
                {servicesDropOpen ? (
                <FontAwesomeIcon className="h-3" icon={faAngleDown} />
                ) : (
                <FontAwesomeIcon className="h-3" icon={faAngleRight} />
                )}
              </button>
              <ul className={`flex flex-col gap-3 mt-3 bg-gray-50 rounded-md p-5 ${ projectsDropOpen ? "block"
                : "hidden" }`}>
                <li>
                  <Link to={"/document-management-system"}
                    className="hover:text-blue-500 hover:underline underline-offset-2">
                  Document Management System (DMS)
                  </Link>
                </li>
                <li>
                  <Link to={"/ecms-project"} className="hover:text-blue-500 hover:underline underline-offset-2">
                  eCMS Projects
                  </Link>
                </li>
                <li>
                  <Link to={"/btfn-project"} className="hover:text-blue-500 hover:underline underline-offset-2">
                  BTFN Projects
                  </Link>
                </li>
                <li>
                  <Link to={"/ICS-projects"} className="hover:text-blue-500 hover:underline underline-offset-2">
                  ICS Projects
                  </Link>
                </li>
                <li>
                  <Link to={"/IAS-projects"} className="hover:text-blue-500 hover:underline underline-offset-2">
                  IAS Projects
                  </Link>
                </li>
                <li>
                  <Link to={"/core-banking-system"} className="hover:text-blue-500 hover:underline underline-offset-2">
                  Core Banking System
                  </Link>
                </li>
                <li>
                  <Link to={"/NDI-project"} className="hover:text-blue-500 hover:underline underline-offset-2">
                  NDI Projects
                  </Link>
                </li>
                <li>
                  <Link to={"/website-development"} className="hover:text-blue-500 hover:underline underline-offset-2">
                  Website Development
                  </Link>
                </li>
                <li>
                  <Link to={"/infrastructure-setup"} className="hover:text-blue-500 hover:underline underline-offset-2">
                  Infrastructure Set Up
                  </Link>
                </li>
                <li>
                  <Link to={"/ecms-integrations"} className="hover:text-blue-500 hover:underline underline-offset-2">
                  eCMS Integration
                  </Link>
                </li>
                <li>
                  <Link to={"/bsb-system"} className="hover:text-blue-500 hover:underline underline-offset-2">
                  Bhutan Standard Bureau System
                  </Link>
                </li>
                <li>
                  <Link to={"/microsoftservices"} className="hover:text-blue-500 hover:underline underline-offset-2">
                  Microsoft Services
                  </Link>
                </li>
              </ul>
            </div>
            <Link to={"/announcements"} className={`p-2 rounded-md hover:bg-gray-100 hover:text-blue-500 ${
              currentPath==="/announcements" ? "bg-gray-100 text-blue-500" : "text-gray-800" }`}>
            Announcements
            </Link>
            <Link to={"/career"} className={`p-2 rounded-md hover:bg-gray-100 hover:text-blue-500 ${
              currentPath==="/career" ? "bg-gray-100 text-blue-500" : "text-gray-800" }`}>
            Career
            </Link>
            <Link to={"/agri-tech-division"} className={`p-2 rounded-md hover:bg-gray-100 hover:text-blue-500 ${
              currentPath==="/contact" ? "bg-gray-100 text-blue-500" : "text-gray-800" }`}>
            Agri-Tech Division
            </Link>
            <Link to={"/downloads"} className={`p-2 rounded-md hover:bg-gray-100 hover:text-blue-500 ${
              currentPath==="/downloads" ? "bg-gray-100 text-blue-500" : "text-gray-800" }`}>
            Downloads
            </Link>

          </div>
        </div>
      </div>
    </Dialog.Panel>
  </Dialog>
</div>
);
}

export default Header;