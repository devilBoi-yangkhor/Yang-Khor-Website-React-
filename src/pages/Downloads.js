import Header from "../components/Header";
import Footer from "../components/Footer";
import '@react-pdf-viewer/core/lib/styles/index.css';

function Downloads() {

  const documents = [
    { id: 1, name: "Leave Form", url: "/assets/officedocs/Leave Form_YPL.pdf" },
    { id: 2, name: "Requisition Form", url: "/assets/officedocs/Requisition Form_YPL.pdf" },
    { id: 3, name: "TA DA Authorization Form", url: "/assets/officedocs/TA DA Authorization Form.pdf" },
    { id: 4, name: "TA DA Claim Form", url: "/assets/officedocs/TA DA Claim Form.pdf" },
    { id: 5, name: "Tour Report Form", url: "/assets/officedocs/Tour Report Form_YPL.pdf" },
    { id: 6, name: "No Due Certificate & Charges Handling", url: "/assets/officedocs/No Due Certificate & Charge Handing Form_YPL_Final.pdf" },
  ];  

  const handleViewClick = (url) => {
    const newTab = window.open(`/pdf-viewer?file=${encodeURIComponent(url)}`, '_blank');
    newTab.focus();
  };

  return (
    <div>
      <Header />
      <div className="p-2 mb-5 mt-28 md:mt-36 bg-white text-center">
        <h1 className="text-3xl font-bold text-gray-700 sm:text-4xl md:text-[40px] bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-blue-300 mb-5">
          Downloads
        </h1>
        <div className="bg-white hover:shadow-lg p-10 mx-auto w-5/6 rounded-md border border-gray-300 lg:flex lg:items-center">
          <ul className="divide-y divide-gray-200 w-full">
            {documents.map((document) => (
              <li
                key={document.id}
                className="py-4 flex justify-between items-center"
              >
                <span className="text-lg font-semibold">{document.name}</span>
                <div className="flex gap-4">
                  <a
                    href={document.url}
                    download={`${document.name}.pdf`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Download
                  </a>
                  <button
                    onClick={() => handleViewClick(document.url)} // Navigate to PDF Viewer page
                    className="text-green-600 hover:text-green-800"
                  >
                    View
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Downloads;
