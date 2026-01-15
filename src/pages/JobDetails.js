import React from "react";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, NavLink } from "react-router-dom";
import Footer from "../components/Footer";

function JobDetails() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div>
      <header className="w-full flex items-center bg-white top-0 fixed justify-between px-4 md:px-10 shadow-lg py-3">
        <div className="flex items-center gap-4">
          <img
            className="h-16 md:h-20"
            src="assets/logo.PNG"
            alt="Yang Khor logo"
          />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-blue-300 text-lg md:text-2xl">
            Recruitment System
          </span>
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon
              className="h-6 w-6 hover:text-blue-500"
              aria-hidden="true"
            />
          </button>
        </div>

        <div className="hidden lg:flex lg:gap-10">
          <Link className="text-gray-900 text-sm leading-6 font-semibold hover:text-blue-500 hover:uppercase">
            How to apply?
          </Link>
          <Link className="text-gray-900 text-sm leading-6 font-semibold hover:text-blue-500 hover:uppercase">
            Track Your application
          </Link>
          <NavLink
            to="/login"
            className={(navData) =>
              navData.isActive
                ? "text-blue-500 text-sm font-semibold leading-6 uppercase"
                : "text-sm font-semibold leading-6 text-gray-900 hover:text-blue-500 hover:uppercase"
            }
          >
            Log in <span aria-hidden="true">&rarr;</span>
          </NavLink>
        </div>
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link to="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Yang Khor Private Ltd</span>
                <img
                  className="h-16 w-auto"
                  src="assets/logo.PNG"
                  alt="company logo"
                />
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon
                  className="h-6 w-6 hover:text-red-500"
                  aria-hidden="true"
                />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="flex flex-col py-6">
                  <NavLink
                    to="/login"
                    className={(navData) =>
                      navData.isActive
                        ? "-mx-3 block rounded-lg px-3 py-2 text-sm font-semibold leading-7 text-blue-500 bg-gray-50"
                        : "-mx-3 block rounded-lg px-3 py-2 text-sm font-semibold leading-7 text-gray-900 hover:text-blue-500 hover:bg-gray-50"
                    }
                  >
                    How to Apply?
                  </NavLink>
                  <NavLink
                    to="/login"
                    className={(navData) =>
                      navData.isActive
                        ? "-mx-3 block rounded-lg px-3 py-2 text-sm font-semibold leading-7 text-blue-500 bg-gray-50"
                        : "-mx-3 block rounded-lg px-3 py-2 text-sm font-semibold leading-7 text-gray-900 hover:text-blue-500 hover:bg-gray-50"
                    }
                  >
                    Track Your application
                  </NavLink>
                </div>
                <div className="py-6">
                  <NavLink
                    to="/login"
                    className={(navData) =>
                      navData.isActive
                        ? "-mx-3 block rounded-lg px-3 py-2 text-sm font-semibold leading-7 text-blue-500 bg-gray-50"
                        : "-mx-3 block rounded-lg px-3 py-2 text-sm font-semibold leading-7 text-gray-900 hover:text-blue-500 hover:bg-gray-50"
                    }
                  >
                    Log in
                  </NavLink>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>

      <div className="mt-28 md:mt-32 px-4 md:px-16">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-blue-300 text-lg md:text-2xl">
          Job Openings
        </span>
        <div className="flex flex-col md:flex md:flex-row justify-center gap-5 py-5">
          <div className="border rounded-md flex flex-col items-center p-4 gap-2">
            <img className="h-32" src="assets/jobavatar.png" alt="jobavatar" />
            <span className="font-bold">Software Developer</span>
            <span className="text-sm">
              <b>Deadline:</b> 20 Dec, 2023
            </span>
            <span className="text-sm">
              <b>Placement:</b> Thimphu
            </span>
            <span className="text-sm">
              <b>Slot:</b> 1
            </span>
            <Link
              to="/jobdetails"
              className="rounded-md bg-blue-800 px-3.5 py-2.5 text-sm font-semibold items-center text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              View details
            </Link>
          </div>
          <div className="border rounded-md md:w-2/3 w-full p-2 md:p-5">
            <span className="font-bold">Job Criteria</span>
          </div>
        </div>

        <div className="py-10">
          <hr className="border" />
          <span className="text-gray-700 text-xs">
            Please be informed that applications should be submitted only
            through online system. Applications submitted in hard copies and
            emails or applications not meeting the specified criteria and
            incomplete documents/information shall not be accepted. For further
            information, please contact HR Section at telephone number{" "}
            <b>+975-2-335378</b> and email ID- <b>info@yangkhor.com</b> during
            office hours (
            <b>9:00 AM-4:30 PM with lunch break from 1:00 PM-2 PM</b>).
          </span>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default JobDetails;
