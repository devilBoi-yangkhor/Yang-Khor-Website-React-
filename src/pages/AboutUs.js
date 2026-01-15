import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const TeamCard = ({ imageSrc, name, profession }) => {
  return (
    <>
      <div className="w-fit h-fit justify-center items-center">
        <div className="mx-auto">
          <div className="relative overflow-hidden rounded-lg ring-2 ring-gray-100 hover:shadow-lg hover:opacity-70">
            <img
              src={imageSrc}
              alt="photounavailable"
              className="h-80 w-80 object-cover"
            />
            <div className="absolute bottom-5 left-0 w-full text-center">
              <div className="relative mx-5 overflow-hidden rounded-lg bg-white px-3 py-5">
                <h3 className="text-base font-semibold">{name}</h3>
                <p className="text-xs text-gray-500">{profession}</p>
                <div>
                  <span className="absolute bottom-0 left-0">
                    <svg
                      width={61}
                      height={30}
                      viewBox="0 0 61 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx={16}
                        cy={45}
                        r={45}
                        fill="#13C296"
                        fillOpacity="0.11"
                      />
                    </svg>
                  </span>
                  <span className="absolute right-0 top-0">
                    <svg
                      width={20}
                      height={25}
                      viewBox="0 0 20 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="0.706257"
                        cy="24.3533"
                        r="0.646687"
                        transform="rotate(-90 0.706257 24.3533)"
                        fill="#3056D3"
                      />
                      <circle
                        cx="6.39669"
                        cy="24.3533"
                        r="0.646687"
                        transform="rotate(-90 6.39669 24.3533)"
                        fill="#3056D3"
                      />
                      <circle
                        cx="12.0881"
                        cy="24.3533"
                        r="0.646687"
                        transform="rotate(-90 12.0881 24.3533)"
                        fill="#3056D3"
                      />
                      <circle
                        cx="17.7785"
                        cy="24.3533"
                        r="0.646687"
                        transform="rotate(-90 17.7785 24.3533)"
                        fill="#3056D3"
                      />
                      <circle
                        cx="0.706257"
                        cy="18.6624"
                        r="0.646687"
                        transform="rotate(-90 0.706257 18.6624)"
                        fill="#3056D3"
                      />
                      <circle
                        cx="6.39669"
                        cy="18.6624"
                        r="0.646687"
                        transform="rotate(-90 6.39669 18.6624)"
                        fill="#3056D3"
                      />
                      <circle
                        cx="12.0881"
                        cy="18.6624"
                        r="0.646687"
                        transform="rotate(-90 12.0881 18.6624)"
                        fill="#3056D3"
                      />
                      <circle
                        cx="17.7785"
                        cy="18.6624"
                        r="0.646687"
                        transform="rotate(-90 17.7785 18.6624)"
                        fill="#3056D3"
                      />
                      <circle
                        cx="0.706257"
                        cy="12.9717"
                        r="0.646687"
                        transform="rotate(-90 0.706257 12.9717)"
                        fill="#3056D3"
                      />
                      <circle
                        cx="6.39669"
                        cy="12.9717"
                        r="0.646687"
                        transform="rotate(-90 6.39669 12.9717)"
                        fill="#3056D3"
                      />
                      <circle
                        cx="12.0881"
                        cy="12.9717"
                        r="0.646687"
                        transform="rotate(-90 12.0881 12.9717)"
                        fill="#3056D3"
                      />
                      <circle
                        cx="17.7785"
                        cy="12.9717"
                        r="0.646687"
                        transform="rotate(-90 17.7785 12.9717)"
                        fill="#3056D3"
                      />
                      <circle
                        cx="0.706257"
                        cy="7.28077"
                        r="0.646687"
                        transform="rotate(-90 0.706257 7.28077)"
                        fill="#3056D3"
                      />
                      <circle
                        cx="6.39669"
                        cy="7.28077"
                        r="0.646687"
                        transform="rotate(-90 6.39669 7.28077)"
                        fill="#3056D3"
                      />
                      <circle
                        cx="12.0881"
                        cy="7.28077"
                        r="0.646687"
                        transform="rotate(-90 12.0881 7.28077)"
                        fill="#3056D3"
                      />
                      <circle
                        cx="17.7785"
                        cy="7.28077"
                        r="0.646687"
                        transform="rotate(-90 17.7785 7.28077)"
                        fill="#3056D3"
                      />
                      <circle
                        cx="0.706257"
                        cy="1.58989"
                        r="0.646687"
                        transform="rotate(-90 0.706257 1.58989)"
                        fill="#3056D3"
                      />
                      <circle
                        cx="6.39669"
                        cy="1.58989"
                        r="0.646687"
                        transform="rotate(-90 6.39669 1.58989)"
                        fill="#3056D3"
                      />
                      <circle
                        cx="12.0881"
                        cy="1.58989"
                        r="0.646687"
                        transform="rotate(-90 12.0881 1.58989)"
                        fill="#3056D3"
                      />
                      <circle
                        cx="17.7785"
                        cy="1.58989"
                        r="0.646687"
                        transform="rotate(-90 17.7785 1.58989)"
                        fill="#3056D3"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

function AboutUs() {
  return (
    <div>
      <Header />
      <div className="p-2 mt-28 md:mt-36 bg-white text-center">
        <div className="pb-5">
          <span className="mb-10 text-3xl font-bold text-gray-700 sm:text-4xl md:text-[40px] bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-blue-300">
            About Us
          </span>
        </div>
        <div className="flex flex-col justify-evenly gap-5 bg-white hover:shadow-lg p-10 mx-auto w-5/6 rounded-md border border-black lg:flex lg:flex-row items-center">
          <img
            className="object-cover h-80 md:h-96"
            src="assets/about.jpg"
            alt="about"
          />
          <p className="text-sm md:text-base lg:w-1/2 text-gray-600 text-justify leading-7 md:leading-10">
            Yang Khor Pvt. Ltd is a leading In-country Technology Solutions
            Provider supplying solution in terms of hardware, software, support,
            and services as a complete package. Yang Khor Pvt. Ltd has been
            serving its purpose since 2005, it has now emerged to be
            unprecedented leader as a Solution Integrator with a differentiated
            vertical approach providing innovative solutions. Yang Khor Pvt. Ltd
            uses its solution integration capabilities to integrate best of
            breed products through its key technology alliance partners to
            provide “End to End” solutions. Provide customized business
            solutions that help organizations accelerate revenue growth,
            increase market penetration, optimize operating costs, and improve
            employee productivity, by embedding communication in their business
            processes.
          </p>
        </div>

        <div className="hover:shadow-lg mb-10 mx-auto w-5/6 bg-white border border-black flex flex-col lg:flex lg:flex-row justify-evenly mt-10 rounded-md p-10">
          <div className="text-center w-full lg:w-1/2 mt-5">
            <span className="bg-clip-text text-xl md:text-3xl font-bold text-transparent bg-gradient-to-r from-blue-800 to-blue-300">
              Our Vision
            </span>
            <p className="text-sm md:text-base italic text-gray-600 text-center leading-7 md:leading-10">
              "Transform ideas into innovative value to enhance the growth of
              industries, markets, and lives in our country in the booming
              Digital Era."
            </p>
          </div>
          <div className="text-center w-full lg:w-1/2 mt-5">
            <span className="bg-clip-text text-xl md:text-3xl font-bold text-transparent bg-gradient-to-r from-blue-800 to-blue-300">
              Our Mission
            </span>
            <p className="text-sm md:text-base italic text-gray-600 text-center leading-7 md:leading-10">
              "To provide the best and the most affordable technology solutions
              to our customers."
            </p>
          </div>
        </div>

        <section className="bg-white">
          <div className="mx-auto w-5/6">
            <div className="-mx-4 flex flex-wrap">
              <div className="w-full px-4">
                <div className="mx-auto mb-[60px] max-w-[510px] text-center">
                  <div className="pb-5">
                    <span className="mb-3 p-2 text-3xl font-bold leading-[1.2] text-gray-700 sm:text-4xl md:text-[40px] bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-blue-300">
                      Management
                    </span>
                  </div>
                  <p className="text-base italic text-gray-500">
                    "Good MANAGEMENT consists in showing average people how to
                    do the work of SUPERIOR people."
                  </p>
                  <p className="text-lg italic">- John D. Rockefeller</p>
                </div>
              </div>
            </div>

            <div className="hover:shadow-lg mb-10 bg-white border border-black py-10 rounded-md">
              <div className="grid grid-cols-1 px-2 md:px-0 place-items-center mb-10">
                <TeamCard
                  name="Phub Gyeltshen"
                  profession="Chief Executive Officer"
                  imageSrc="assets/ceo.jpg"
                />
              </div>
              <div className="grid grid-cols-1 px-2 md:px-0 md:grid-cols-3 gap-5 place-items-center">
                <TeamCard
                  name="Dawa Tshering"
                  profession="Chief Operation Officer/Project Manager/Team Leader"
                  imageSrc="assets/coo.jpg"
                />
                <TeamCard
                  name="Tshewang Dendup"
                  profession="Chief Technology Officer/Database Expert"
                  imageSrc="assets/cto.jpg"
                />
                <TeamCard
                  name="Phub Dorji"
                  profession="Admin/General Manager"
                  imageSrc="assets/admin.jpg"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="mt-5 mx-auto w-5/6">
            <div className="-mx-4 flex flex-wrap">
              <div className="w-full px-4">
                <div className="mx-auto mb-[60px] max-w-[510px] text-center">
                  <div className="pb-5">
                    <span className="mb-3 p-2 text-3xl font-bold leading-[1.2] text-gray-700 sm:text-4xl md:text-[40px] bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-blue-300">
                      Our Team
                    </span>
                  </div>
                  <p className="text-base italic text-gray-500">
                    "Great things in business are never done by one person.
                    They're done by a team of people."
                  </p>
                  <p className="text-lg italic">- Steve Jobs</p>
                </div>
              </div>
            </div>

            <div className="hover:shadow-lg mb-10 border border-black bg-white py-10 rounded-md">
              <div className="pb-10">
                <span className="text-center text-lg pb-10 font-bold md:text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-blue-300">
                  Software Development Team
                </span>
              </div>
              <div className="grid grid-cols-1 px-2 md:px-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 place-items-center">
              <TeamCard
                  name="Subash Mongar"
                  profession="Lead Software Developer"
                  imageSrc="assets/staffs/subashmongar.PNG"
                />
                <TeamCard
                  name="Deepak Kumar Ghalley"
                  profession="Lead Software Developer"
                  imageSrc="assets/staffs/deepak.jpg"
                />
                
                <TeamCard
                  name="Jigme Choeling"
                  profession="Senior Software Developer"
                  imageSrc="assets/staffs/jigme.jpg"
                />
                <TeamCard
                  name="Pema Drakpa"
                  profession="Senior Software Developer"
                  imageSrc="assets/staffs/pemadrakpa.jpg"
                />
                <TeamCard
                  name="Pema Wangmo"
                  profession="Software Developer"
                  imageSrc="assets/staffs/pemawangmo.jpg"
                />
                <TeamCard
                  name="Ugyen Dendup"
                  profession="Software Developer"
                  imageSrc="assets/staffs/ugyendendup.jpg"
                />
                <TeamCard
                  name="Pema Tshering"
                  profession="Software Developer"
                  imageSrc="assets/staffs/pemaTshering.png"
                />
                <TeamCard
                  name="Jigme Wangchuk"
                  profession="Software Developer"
                  imageSrc="assets/staffs/JigmeWangchuk.jpg"
                />
                <TeamCard
                  name="Singye Lhadon"
                  profession="Software Developer"
                  imageSrc="assets/staffs/SingyeLhadon.jpg"
                />
                <TeamCard
                  name="Sonam Pelden"
                  profession="Software Developer"
                  imageSrc="assets/staffs/SonamPelden.jpg"
                />
                <TeamCard
                  name="Rinchen Jamtsho"
                  profession="Software Developer"
                  imageSrc="assets/staffs/rinchenJamtsho.jpg"
                />
              </div>
            </div>


            <div className="hover:shadow-lg mb-10 border border-black bg-white py-10 rounded-md">
              <div className="pb-10">
                <span className="text-center text-lg pb-10 font-bold md:text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-blue-300">
                  Data Science Team
                </span>
              </div>
              <div className="grid grid-cols-1 px-2 md:px-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 place-items-center">
                <TeamCard
                  name="Karma Wangchuk"
                  profession="Senior Data Analyst"
                  imageSrc="assets/staffs/karmawangchuk.jpg"
                />
                <TeamCard
                  name="Namgay Wangchuk"
                  profession="Senior Data Analyst"
                  imageSrc="assets/staffs/namgay.jpg"
                />
                <TeamCard
                  name="Kezang Dawa"
                  profession="Data Analyst"
                  imageSrc="assets/staffs/kezangdawa.jpg"
                />
                <TeamCard
                  name="Dik Bdr Ghalley"
                  profession="Data Analyst"
                  imageSrc="assets/staffs/dikbdrghalley.jpg"
                />
                <TeamCard
                  name="Domtu Dukpa"
                  profession="Data Analyst"
                  imageSrc="assets/staffs/dupthoDorji.jpg"
                />
              </div>
            </div>

            <div className="hover:shadow-lg mb-10 border border-black bg-white py-10 rounded-md">
              <div className="pb-10">
                <span className="text-center text-lg pb-10 font-bold md:text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-blue-300">
                  Infra & Network Team
                </span>
              </div>
              <div className="grid grid-cols-1 px-2 md:px-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 place-items-center">
                <TeamCard
                  name="Tashi Dendup"
                  profession="Network & Infra Head"
                  imageSrc="assets/staffs/tashidendup.jpg"
                />
                <TeamCard
                  name="Madav Dhaurali"
                  profession="Network & Infra"
                  imageSrc="assets/staffs/madavDhaurali.jpg"
                />
                <TeamCard
                  name="Dorji Chodup"
                  profession="Network & Infra"
                  imageSrc="assets/staffs/dorjiChodup.jpg"
                />
              </div>
            </div>

            <div className="hover:shadow-lg mb-10 bg-white border border-black py-10 rounded-md">
              <div className="pb-10">
                <span className="text-center text-lg pb-10 font-bold md:text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-blue-300">
                  HRD & Admin Team
                </span>
              </div>
              <div className="grid grid-cols-1 px-2 md:px-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 place-items-center">
                <TeamCard
                  name="Birang Rai"
                  profession="Tender/Procurement Officer"
                  imageSrc="assets/staffs/ganja.jpg"
                />
                <TeamCard
                  name="Karma Wangmo"
                  profession="Accounts/HR Officer"
                  imageSrc="assets/staffs/karmawangmo.jpg"
                />
              </div>
            </div>
            <div className="hover:shadow-lg mb-10 bg-white border border-black py-10 rounded-md">
              <div className="pb-10">
                <span className="text-center text-lg pb-10 font-bold md:text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-blue-300">
                  Business Analyst & Marketing Team
                </span>
              </div>
              <div className="grid grid-cols-1 px-2 md:px-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 place-items-center">
                <TeamCard
                  name="Nermit Lepcha"
                  profession="Business Analyst & Marketing Officer"
                  imageSrc="assets/staffs/nermitlepcha.jpg"
                />
                <TeamCard
                  name="Sonam Yangzom"
                  profession="Business Analyst & Marketing Assitant"
                  imageSrc="assets/staffs/sonamYangzom.png"
                />
                <TeamCard
                  name="Damchoe Zam"
                  profession="Technical Writer"
                  imageSrc="assets/staffs/damchoe.jpg"
                />
              </div>
            </div>
            <div className="hover:shadow-lg border border-black bg-white mb-10 py-10 rounded-md">
              <div className="pb-10">
                <span className="text-center text-lg pb-10 font-bold md:text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-blue-300">
                  Quality Assurance (QA) Testing Team
                </span>
              </div>
              <div className="grid grid-cols-1 px-2 md:px-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 place-items-center">
                <TeamCard
                  name="Dechen Lhamo"
                  profession="QA Tester"
                  imageSrc="assets/staffs/dechenlhamo.jpg"
                />
                <TeamCard
                  name="Dechen Dema"
                  profession="QA Tester"
                  imageSrc="assets/staffs/dechendema.jpg"
                />
                <TeamCard
                  name="Chencho Wangmo"
                  profession="QA Tester"
                  imageSrc="assets/staffs/chencho.jpg"
                />
                <TeamCard
                  name="Dema Yangzom"
                  profession="QA Tester"
                  imageSrc="assets/staffs/demaYangzom.jpeg"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default AboutUs;
