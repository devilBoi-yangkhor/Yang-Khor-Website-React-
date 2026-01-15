import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";

function Footer() {
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  return (
    <div>
      <motion.footer
        className="text-center bottom-0 bg-white border-t-2 border-gray-500 px-5 pt-10 md:px-36"
        ref={ref}
        initial={{ opacity: 0, y: -50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
        transition={{ duration: 1, ease: "easeIn" }}
      >
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2">
          {/* Footer Column 1 */}
          <div className="text-left text-gray-600">
            <h4 className="text-2xl md:text-3xl font-semibold mb-4 ">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-300">
                Yang Khor Private Ltd
              </span>
            </h4>
            <p className="text-sm py-1">Office Address:</p>
            <p className="text-sm py-1">3rd Floor, NPPF Housing Colony, 285 Rabten Lam SW</p>
            <p className="text-sm py-1">Thimphu - 11001, Bhutan</p>
            <br></br>
            <p className="text-sm py-1">
              <span className="font-bold">Phone: </span>
              <span>+975-2-335378</span>
            </p>
            <p className="text-sm py-1">
              <span className="font-bold">Email: </span>
              <span>info@yangkhor.com</span>
            </p>
            <div className="flex gap-4 mt-5">
              <Link
              to="/contact"
              className="px-5 py-2 text-sm font-semibold rounded-lg
                        bg-white/30 backdrop-blur-sm border border-black/20
                        text-black hover:bg-white/20 hover:border-blue-500
                        hover:scale-105 transform transition-all duration-300"
            >
              Contact Us
            </Link>

            <Link
              to="/login"
              className="px-5 py-2 text-sm font-semibold rounded-lg
                        bg-white/10 backdrop-blur-sm border border-black/20
                        text-black hover:bg-white/20 hover:border-blue-500
                        hover:scale-105 transform transition-all duration-300"
            >
              Log In
            </Link>
            </div>
          </div>

          {/* Footer Column 2 */}
          {/* <div className="text-left">
            <h4 className="text-lg font-semibold mb-4">Useful Links</h4>
            <ul className="text-sm">
              <li className="py-1">
                <a href="" className="hover:text-blue-500">
                  About Us
                </a>
              </li>
              <li className="py-1">
                <a href="" className="hover:text-blue-500">
                  Services
                </a>
              </li>
              <li className="py-1">
                <a href="" className="hover:text-blue-500">
                  Careers
                </a>
              </li>
              <li className="py-1">
                <a href="" className="hover:text-blue-500">
                  Contact Us
                </a>
              </li>
              <li className="py-1">
                <a href="" className="hover:text-blue-500">
                  Download
                </a>
              </li>
            </ul>
          </div> */}

          {/* Footer Column 3 */}
          {/* <div className="text-left">
            <h4 className="text-lg font-semibold mb-4">Partners</h4>
            <a href="">
              <p className="text-sm py-1 hover:text-blue-500">Acronis</p>
            </a>
            <a href="">
              <p className="text-sm py-1 hover:text-blue-500">Fortinet</p>
            </a>
            <a href="">
              <p className="text-sm py-1 hover:text-blue-500">
                Hewlett-Packard (hp)
              </p>
            </a>
            <a href="">
              <p className="text-sm py-1 hover:text-blue-500">Microsoft</p>
            </a>
            <a href="">
              <p className="text-sm py-1 hover:text-blue-500">Veeam</p>
            </a>
            <a href="">
              <p className="text-sm py-1 hover:text-blue-500">VMWare</p>
            </a>
          </div> */}

          <div className="text-left">
            <h4 className="text-lg font-semibold mb-4 text-gray-600">
              Our Location
            </h4>
            <div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3540.0199831345376!2d89.6308633740427!3d27.46863723598212!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e195a51fcdf5a7%3A0x70c6073eeb87a4ab!2sYang%20Khor%20Private%20Limited!5e0!3m2!1sen!2sbt!4v1761909907795!5m2!1sen!2sbt"
                className="h-full w-full rounded border"
                title="maplocation"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>

        <div className="flex gap-5 justify-center pt-10">
          {/* Facebook */}
          <a
            className="bg-gray-200 p-2 rounded-full hover:bg-blue-500 hover:text-white"
            href="https://www.facebook.com/YangKhor.2016/"
            target="_blank"
            rel="noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            className="bg-gray-200 p-2 rounded-full hover:bg-blue-500 hover:text-white"
            href="https://www.linkedin.com/company/yang-khor-private-limited/about/"
            target="_blank"
            rel="noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="h-5"
              viewBox="0 0 50 50"
            >
              <path d="M 9 4 C 6.2504839 4 4 6.2504839 4 9 L 4 41 C 4 43.749516 6.2504839 46 9 46 L 41 46 C 43.749516 46 46 43.749516 46 41 L 46 9 C 46 6.2504839 43.749516 4 41 4 L 9 4 z M 9 6 L 41 6 C 42.668484 6 44 7.3315161 44 9 L 44 41 C 44 42.668484 42.668484 44 41 44 L 9 44 C 7.3315161 44 6 42.668484 6 41 L 6 9 C 6 7.3315161 7.3315161 6 9 6 z M 14 11.011719 C 12.904779 11.011719 11.919219 11.339079 11.189453 11.953125 C 10.459687 12.567171 10.011719 13.484511 10.011719 14.466797 C 10.011719 16.333977 11.631285 17.789609 13.691406 17.933594 A 0.98809878 0.98809878 0 0 0 13.695312 17.935547 A 0.98809878 0.98809878 0 0 0 14 17.988281 C 16.27301 17.988281 17.988281 16.396083 17.988281 14.466797 A 0.98809878 0.98809878 0 0 0 17.986328 14.414062 C 17.884577 12.513831 16.190443 11.011719 14 11.011719 z M 14 12.988281 C 15.392231 12.988281 15.94197 13.610038 16.001953 14.492188 C 15.989803 15.348434 15.460091 16.011719 14 16.011719 C 12.614594 16.011719 11.988281 15.302225 11.988281 14.466797 C 11.988281 14.049083 12.140703 13.734298 12.460938 13.464844 C 12.78117 13.19539 13.295221 12.988281 14 12.988281 z M 11 19 A 1.0001 1.0001 0 0 0 10 20 L 10 39 A 1.0001 1.0001 0 0 0 11 40 L 17 40 A 1.0001 1.0001 0 0 0 18 39 L 18 33.134766 L 18 20 A 1.0001 1.0001 0 0 0 17 19 L 11 19 z M 20 19 A 1.0001 1.0001 0 0 0 19 20 L 19 39 A 1.0001 1.0001 0 0 0 20 40 L 26 40 A 1.0001 1.0001 0 0 0 27 39 L 27 29 C 27 28.170333 27.226394 27.345035 27.625 26.804688 C 28.023606 26.264339 28.526466 25.940057 29.482422 25.957031 C 30.468166 25.973981 30.989999 26.311669 31.384766 26.841797 C 31.779532 27.371924 32 28.166667 32 29 L 32 39 A 1.0001 1.0001 0 0 0 33 40 L 39 40 A 1.0001 1.0001 0 0 0 40 39 L 40 28.261719 C 40 25.300181 39.122788 22.95433 37.619141 21.367188 C 36.115493 19.780044 34.024172 19 31.8125 19 C 29.710483 19 28.110853 19.704889 27 20.423828 L 27 20 A 1.0001 1.0001 0 0 0 26 19 L 20 19 z M 12 21 L 16 21 L 16 33.134766 L 16 38 L 12 38 L 12 21 z M 21 21 L 25 21 L 25 22.560547 A 1.0001 1.0001 0 0 0 26.798828 23.162109 C 26.798828 23.162109 28.369194 21 31.8125 21 C 33.565828 21 35.069366 21.582581 36.167969 22.742188 C 37.266572 23.901794 38 25.688257 38 28.261719 L 38 38 L 34 38 L 34 29 C 34 27.833333 33.720468 26.627107 32.990234 25.646484 C 32.260001 24.665862 31.031834 23.983076 29.517578 23.957031 C 27.995534 23.930001 26.747519 24.626988 26.015625 25.619141 C 25.283731 26.611293 25 27.829667 25 29 L 25 38 L 21 38 L 21 21 z"></path>
            </svg>
          </a>
        </div>

        {/* Additional copyright info */}
        <div className="mt-8 h-full border-t py-5 border-gray-500">
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} Yang Khor Private Ltd. All Rights
            Reserved.
          </p>
          <p className="text-sm text-gray-400">Some Pictures are from <a className="text-blue-500" href="https://support.freepik.com/s/article/Attribution-How-when-and-where?language=en_US&_gl=1*3ddoht*_ga*MTI1NTA3MjIzOS4xNzA5MDIzMTM4*_ga_QWX66025LC*MTcwOTAyMzEzOC4xLjEuMTcwOTAyMzU0OS41MS4wLjA.*_ga_18B6QPTJPC*MTcwOTAyMzEzOC4xLjEuMTcwOTAyMzU0OS41MS4wLjA." target="_blank" rel="noreferrer">Freepik</a></p>
        </div>
      </motion.footer>
    </div>
  );
}

export default Footer;
