import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import { addDoc, collection, query, orderBy, limit, getDocs, where } from "firebase/firestore";
import { firestoreDb as db } from "../config/firebase";
import { getAuth } from "firebase/auth"; // Import Firebase Auth

const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result; // Use the full base64 string, including MIME type
            resolve(base64String);
        };
        reader.onerror = (error) => {
            reject(error);
        };
        reader.readAsDataURL(file); // This gives the full data URI, including MIME type
    });
};
const DispatchForm = () => {
    const [formUploading, setFormUploading] = useState(false);
    const [formData, setFormData] = useState({
        dispatchNumber: "",
        uploadDate: "",
        details: "",
        file: ""
    });
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [isDuplicate, setIsDuplicate] = useState(false);

    const auth = getAuth();
    const user = auth.currentUser;
    const userEmail = user ? user.email : "unknown@example.com"; // Use the user's email

    // Fetch the last dispatch number and increment it
    useEffect(() => {
        const fetchLastDispatchNumber = async () => {
            const q = query(collection(db, "yangkhorDispatchFile"), orderBy("dispatchNumber", "desc"), limit(1));
            const querySnapshot = await getDocs(q);
    
            if (!querySnapshot.empty) {
                const lastDispatch = querySnapshot.docs[0].data();
                const lastDispatchNumber = lastDispatch.dispatchNumber;
                const year = new Date().getFullYear();
                const newDispatchNumber = await generateDispatchNumber(lastDispatchNumber, year); // Ensure this is awaited
                setFormData((prevData) => ({
                    ...prevData,
                    dispatchNumber: newDispatchNumber
                }));
            } else {
                const year = new Date().getFullYear();
                const newDispatchNumber = `YangKhor/${year}/001`;
                setFormData({
                    dispatchNumber: newDispatchNumber,
                    uploadDate: "",
                    details: "",
                    file: ""
                });
            }
        };
    
        fetchLastDispatchNumber();
    }, []);
    useEffect(() => {
        const fetchLastDispatchNumber = async () => {
            const q = query(collection(db, "yangkhorDispatchFile"), orderBy("dispatchNumber", "desc"), limit(1));
            const querySnapshot = await getDocs(q);
    
            if (!querySnapshot.empty) {
                const lastDispatch = querySnapshot.docs[0].data();
                const lastDispatchNumber = lastDispatch.dispatchNumber;
                const year = new Date().getFullYear();
                const newDispatchNumber = await generateDispatchNumber(lastDispatchNumber, year); // Ensure this is awaited
                setFormData((prevData) => ({
                    ...prevData,
                    dispatchNumber: newDispatchNumber
                }));
            } else {
                const year = new Date().getFullYear();
                const newDispatchNumber = `YangKhor/${year}/001`;
                setFormData({
                    dispatchNumber: newDispatchNumber,
                    uploadDate: "",
                    details: "",
                    file: ""
                });
            }
        };
    
        fetchLastDispatchNumber();
    }, []);    

    const generateDispatchNumber = (lastDispatchNumber, currentYear) => {
        const q = query(
            collection(db, "yangkhorDispatchFile"),
            where("dispatchNumber", ">=", `YangKhor/${currentYear}/0000`),
            where("dispatchNumber", "<=", `YangKhor/${currentYear}/9999`),
            orderBy("dispatchNumber", "desc"),
            limit(1)
        );
    
        return getDocs(q).then((querySnapshot) => {
            let nextNumber = "001"; 
            if (!querySnapshot.empty) {
                const lastDispatchNumber = querySnapshot.docs[0].data().dispatchNumber;
                const match = lastDispatchNumber.match(/(\d{3})$/); // Match last 3 digits
                if (match) {
                    nextNumber = (parseInt(match[0], 10) + 1).toString().padStart(3, '0'); // Increment number
                }
            }
            return `YangKhor/${currentYear}/${nextNumber}`;
        });
    };    

    const handleDispatchNumberChange = async (e) => {
        const value = e.target.value;
        setFormData({ ...formData, dispatchNumber: value });

        if (value) {
            const q = query(collection(db, "yangkhorDispatchFile"), where("dispatchNumber", "==", value));
            const querySnapshot = await getDocs(q);
            setIsDuplicate(!querySnapshot.empty);
        } else {
            setIsDuplicate(false);
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setFormUploading(true);
        setShowSuccessAlert(false); 

        try {
            const q = query(collection(db, "yangkhorDispatchFile"), where("dispatchNumber", "==", formData.dispatchNumber));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                alert("Dispatch Number already exists! Please use a unique number.");
                setFormUploading(false);
                return;
            }

            let convertedFile = "";
            if (formData.file) {
                // Assuming convertFileToBase64 is defined elsewhere
                convertedFile = await convertFileToBase64(formData.file);
            }

            const formDataToSubmit = {
                ...formData,
                file: convertedFile,
                dispatchUploadedBy: userEmail,
            };

            await addDoc(collection(db, "yangkhorDispatchFile"), formDataToSubmit);
            setShowSuccessAlert(true);
            setFormData({
                dispatchNumber: "",
                uploadDate: "",
                details: "",
                file: ""
            });
        } catch (err) {
            console.error(err);
            alert("Error while uploading");
        } finally {
            setFormUploading(false);
        }
    };

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900 overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <TopBar />
                <main className="flex-1 p-1 flex items-center justify-center">
                    <div className="w-full max-w-4xl rounded-sm border border-stroke bg-white dark:bg-gray-800 shadow-lg p-6.5">
                        <h3 className="mb-5 block text-md font-bold text-black dark:text-white text-center">
                            Dispatch Documents Form
                        </h3>

                        {showSuccessAlert && (
                            <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                                <strong className="font-bold">Success!</strong>
                                <span className="block sm:inline"> Your form has been successfully uploaded.</span>
                                <span
                                    className="absolute top-0 bottom-0 right-0 px-4 py-3"
                                    onClick={() => setShowSuccessAlert(false)}
                                >
                                    <svg
                                        className="fill-current h-6 w-6 text-green-500"
                                        role="button"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                    >
                                        <title>Close</title>
                                        <path d="M14.348 5.652a1 1 0 10-1.414-1.414L10 7.586 7.066 4.652a1 1 0 00-1.414 1.414L8.586 10l-2.934 2.934a1 1 0 101.414 1.414L10 12.414l2.934 2.934a1 1 0 001.414-1.414L11.414 10l2.934-2.934z" />
                                    </svg>
                                </span>
                            </div>
                        )}

                        <form onSubmit={handleFormSubmit} className="p-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="dispatchNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Dispatch Number
                                    </label>
                                    <input
                                        id="dispatchNumber"
                                        name="dispatchNumber"
                                        onChange={handleDispatchNumberChange}
                                        type="text"
                                        value={formData.dispatchNumber} 
                                        placeholder="YangKhor/year/document_number"
                                        className="w-full rounded-md border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black dark:text-white dark:bg-gray-900 dark:border-stroke dark:focus:ring-2 dark:focus:ring-primary focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    />
                                    {isDuplicate && (
                                        <p className="mt-2 text-sm text-red-500 dark:text-red-400">
                                            Dispatch Number already exists! Please use a unique number.
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="uploadDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Upload Date
                                    </label>
                                    <input
                                        id="uploadDate"
                                        name="uploadDate"
                                        type="date"
                                        value={formData.uploadDate}
                                        onChange={(e) => {
                                            setFormData({ ...formData, uploadDate: e.target.value });
                                        }}
                                        className="w-full rounded-md border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black dark:text-white dark:bg-gray-900 dark:border-stroke dark:focus:ring-2 dark:focus:ring-primary focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="details" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Details
                                    </label>
                                    <textarea
                                        id="details"
                                        rows="3"
                                        name="details"
                                        value={formData.details}
                                        placeholder="Your message here..."
                                        onChange={(e) => {
                                            setFormData({ ...formData, details: e.target.value });
                                        }}
                                        className="w-full rounded-md border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black dark:text-white dark:bg-gray-900 dark:border-stroke dark:focus:ring-2 dark:focus:ring-primary focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    />
                                </div>
                                <div className="flex flex-col items-center">
                                    <label htmlFor="file" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Dispatch File (Screenshots, docs, pdf)
                                    </label>
                                    <div className="flex items-center">
                                        <input
                                            id="file"
                                            onChange={(e) => {
                                                setFormData({
                                                    ...formData,
                                                    file: e.target.files[0],
                                                });
                                            }}
                                            name="file"
                                            type="file"
                                            className="hidden"
                                        />
                                        <label
                                            htmlFor="file"
                                            className="cursor-pointer bg-blue-600 text-white px-5 py-3 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-700 dark:hover:bg-blue-800"
                                        >
                                            Select File
                                        </label>
                                    </div>
                                    {formData.file && (
                                        <span className="mt-2 text-sm text-gray-600 dark:text-gray-400 truncate">
                                            {formData.file.name}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <button
                                type="submit"
                                className={`${
                                    formUploading || isDuplicate
                                        ? "cursor-not-allowed bg-gray-500 text-white px-6 py-3 rounded-lg"
                                        : "px-6 py-3 mt-4 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-700 dark:hover:bg-blue-800"
                                }`}
                                disabled={formUploading || isDuplicate}
                            >
                                {formUploading ? "Uploading..." : "Submit"}
                            </button>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DispatchForm;
