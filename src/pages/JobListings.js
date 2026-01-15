import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet"; // Import Helmet
import Footer from "../components/Footer";
import '@react-pdf-viewer/core/lib/styles/index.css'; // Ensure this is imported
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js`;

const tableStyle = {
  border: '1px solid black',
  borderCollapse: 'collapse',
  width: '100%',
};
const thStyle = {
  border: '1px solid black',
  padding: '8px',
  textAlign: 'left',
};

const tdStyle = {
  border: '1px solid black',
  padding: '8px',
  textAlign: 'left',
};

function JobListings() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle viewing PDFs
  const handleViewClick = (url) => {
    const newTab = window.open(`/pdf-viewer?file=${encodeURIComponent(url)}`, '_blank');
    newTab.focus();
  };

  return (
    <div>
      <Helmet>
        <title>Job Listings - Vacancy Announcement</title>
        <meta property="og:title" content="Vacancy Announcement" />
        <meta property="og:description" content="" />
        <meta property="og:image" content="assets/logo.png" /> {/* Replace with the actual image URL */}
        <meta property="og:url" content="https://yangkhor.com/joblistings" /> {/* Replace with the actual URL of this page */}
        <meta property="og:type" content="website" />
      </Helmet>

      <header className="w-full flex items-center bg-white top-0 fixed justify-between px-4 md:px-10 shadow-lg py-3">
        {/* Header Code */}
        <div className="flex items-center gap-4">
          <Link to="/">
            <img className="h-16 md:h-20" src="assets/logo.PNG" alt="Yangkhor logo" />
          </Link>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-blue-300 text-lg md:text-2xl">
            Recruitment System and Vacancy Management
          </span>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Bars3Icon className="h-6 w-6 hover:text-blue-500" aria-hidden="true" />
          </button>
        </div>
        {/* Dialog Code */}
        <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link to="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Yang Khor Private Ltd</span>
                <img className="h-16 w-auto" src="assets/logo.PNG" alt="company logo" />
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <XMarkIcon className="h-6 w-6 hover:text-red-500" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                {/* Other Nav Links */}
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>

      <div className="mt-28 md:mt-32 mx-auto w-5/6">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-blue-300 text-lg md:text-2xl">
          Vacancy Announcement
        </span>
        <br /><br />
        {/* Table */}
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Sl. No</th>
              <th style={thStyle}>Designation</th>
              <th style={thStyle}>No. of Post</th>
              <th style={thStyle}>Qualification & Experiences</th>
              <th style={thStyle}>Type</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={tdStyle}>1</td>
              <td style={tdStyle}>Software Developer</td>
              <td style={tdStyle}>4 slot</td>
              <td style={tdStyle}>Bachelor’s degree in Computer Science or related field (or equivalent experience) <br></br>
              Proficiency in JavaScript/Python/Java/C#. <br></br>
              Experience with React/Node.js/.NET/Django/SQL <br></br>
              Strong problem-solving and algorithmic thinking.
              </td>
              <td style={tdStyle}>Full Time</td>
            </tr>
          </tbody>
        </table>

        {/* Job Description */}
        <div className="text-sm md:text-base justify-center mt-5">
          Interested candidates may submit their application through email at <span className="text-blue-500 font-bold">   
          <a href="mailto:info@yangkhor.com?subject=Inquiry&body=Hello%20Yangkhor%20Team,">info@yangkhor.com</a></span> with following documents.
          The last date of submission will be on <span className="text-blue-500 font-bold"> 15th June 2025.</span> <br></br>
          Submit the copy of the following documents: <br/><br/>
          <span className="text-black-500 font-bold mb-5">ToR Attachment: </span>
          {/* ToR Attachment Links */}
          <br />
          (Download the TOR file  for post applying)
          <div className="p-5">
            <ul>
              <li>
                <span className="text-black-500 font-bold">1. Software Developer	: </span>
                <button
                  className="text-blue-500 font-bold"
                  onClick={() => handleViewClick('assets/officedocs/Vacancy_Software Developer_ToR.pdf')}
                >
                  View & Download
                </button>
              </li>
            </ul>
            <br />
          </div>
          <span className="text-black-500 font-bold">Job Application Form: </span>
            <a className="text-blue-500 font-bold" href="assets/officedocs/Job Application_YPL_Final.pdf" download>Click here to download</a>
            <br />
          <div className="p-5">
            <ul>
              <li>1. Curriculum Vitae/Resume (CV)</li>
              <li>2. Copy of Academic Transcripts (X, XII, Degree, masters etc.)</li>
              <li>3. Relevant experience / training certificates, if any.</li>
              <li>4. Copy of valid citizenship identity card.</li>
              <li>5. Valid Security Clearance Certificate (online screenshot).</li>
              <li>6. Medical Fitness Certificate,</li>
              <li>7. No Objection Certificate from the current employer, if employed.</li>
              <li>8. Filled job application form.</li>
            </ul>
          </div>
          Application with incomplete documents will not be accepted.
          <br />
          Only shortlisted candidates will be intimated for selection interview. For further information and details please contact HRO/ Admin Section @ <span className="text-blue-500 font-bold">17368131/ 17604711</span> during office hours.
        </div>

        {/* Footer */}
        <div className="py-10">
          <hr className="border" />
          <span className="text-gray-700 text-xs">
            Please be informed that applications should be submitted only through the online system...
          </span>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default JobListings;
