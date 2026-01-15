import React, { useState } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css'; // Make sure FontAwesome CSS is imported
import { Auth } from "../components/auth";
export default function ExampleV2() {
  const [showPassword, setIsShowPassword] = useState(false);

  const toggleShowPassword = (event) => {
    event.preventDefault(); // Prevent the default button behavior
    setIsShowPassword(!showPassword);
  };

  return (
    <section className="h-full bg-neutral-200 dark:bg-neutral-700">
      <div className="container h-full p-10">
        <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
          <div className="w-full">
            <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-500">
              <div className="g-0 lg:flex lg:flex-wrap">
                {/* <!-- Left column container--> */}
                <div className="px-4 md:px-0 lg:w-6/12">
                  <div className="md:mx-6 md:p-12">
                    {/* <!--Logo--> */}
                    <div className="text-center">
                      <img
                        className="mx-auto w-48"
                        src="assets/logo.PNG"
                        alt="logo"
                      />
                      <h4 className="mb-4 mt-1 pb-1 text-xl font-semibold">
                        Yang Khor Private Limited
                      </h4>
                    </div>

                    <p className="mb-4">Please login to your account</p>
                    {/* <!--Username and Password input through Auth component--> */}
                    <Auth showPassword={showPassword} toggleShowPassword={toggleShowPassword} /> {/* Pass props */}
                    
                  </div>
                </div>

                {/* <!-- Right column container with background and description--> */}
                <div
                  className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none"
                  style={{
                    background:
                      "linear-gradient(to right, #04EEF9, #09B3BB, #2D9ACD, #2D78CD)",
                  }}
                >
                  <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                    <h4 className="mb-6 text-xl font-semibold">
                      We are more than just a company
                    </h4>
                    <p className="text-sm">
                      This login page is exclusively for the staff members of
                      Yang Khor. Currently, access is restricted and no
                      credentials are available for visitors. However, we may
                      consider providing access in the future!! :)
                      <br/><br/>
                      <button
                          className="mb-4 px-6 py-2 bg-red-500 text-white rounded"
                      >
                          <i className="fa-brands fa-google"></i>
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
