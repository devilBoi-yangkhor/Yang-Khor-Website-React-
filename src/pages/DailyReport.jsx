import React, { useState, useEffect } from 'react';
import { firestoreDb } from '../config/firebase';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";

const DailyReport = () => {
    const [reports, setReports] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        date: '',
        email_id: '',
        report_text: ''
    });
    const [showAlert, setShowAlert] = useState(false);
    const [errorAlert, setErrorAlert] = useState(false);
    const [submitDisabled, setSubmitDisabled] = useState(false);
    const auth = getAuth();

    useEffect(() => {
        const fetchDailyReports = async (user) => {
            if (user) {
                try {
                    const reportsRef = collection(firestoreDb, "daily_report");
                    const q = query(reportsRef, where("email_id", "==", user.email));
                    const querySnapshot = await getDocs(q);
                    const data = querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    setReports(data);
                    setFormData((prev) => ({
                        ...prev,
                        email_id: user.email
                    }));
                } catch (error) {
                    console.error("Error fetching daily reports:", error);
                }
            }
        };

        // Ensuring the user is loaded properly
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                fetchDailyReports(user);
            } else {
                console.warn("No user logged in.");
            }
        });

        return () => unsubscribe(); // Cleanup the listener
    }, []);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Check if report for the same date already exists
        const isDuplicate = reports.some(report => report.date === formData.date && report.email_id === formData.email_id);
        if (isDuplicate) {
            setErrorAlert(true);
            setSubmitDisabled(true);
            return;
        }
        
        try {
            await addDoc(collection(firestoreDb, "daily_report"), formData);
            setShowAlert(true);  // Show the modal alert
            setShowForm(false);
        } catch (error) {
            console.error("Error submitting report:", error);
        }
    };

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <TopBar />
                <div className="flex justify-end p-4">
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                        onClick={() => setShowForm(true)}
                    >
                        Add Report
                    </button>
                </div>

                {showForm && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white dark:bg-gray-800 dark:text-white p-8 rounded-lg shadow-lg w-96 relative">
                            <button 
                                className="absolute top-2 right-2 text-lg dark:text-white"
                                onClick={() => setShowForm(false)}
                            >
                                &times;
                            </button>
                            <h2 className="text-xl font-bold mb-4">Add New Report</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <label className="block">
                                    Date:
                                    <input
                                        type="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleInputChange}
                                        className="w-full mt-2 p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        required
                                    />
                                </label>
                                <label className="block">
                                    Email:
                                    <input
                                        type="email"
                                        name="email_id"
                                        value={formData.email_id}
                                        readOnly
                                        className="w-full mt-2 p-2 border rounded bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    />
                                </label>
                                <label className="block">
                                    Report Details:
                                    <textarea
                                        name="report_text"
                                        value={formData.report_text}
                                        onChange={handleInputChange}
                                        className="w-full mt-2 p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        required
                                    />
                                </label>
                                {errorAlert && (
                                    <p className="text-red-500 dark:text-red-400">
                                        Report already submitted for this date.
                                    </p>
                                )}
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-green-500 text-white rounded w-full hover:bg-green-600"
                                    disabled={submitDisabled}
                                >
                                    Submit Report
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                {showAlert && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white dark:bg-gray-800 dark:text-white p-8 rounded-lg shadow-lg w-96 relative">
                            <h2 className="text-xl font-bold text-green-600 dark:text-green-500">Success</h2>
                            <p className="mt-2 text-gray-700 dark:text-white">Report submitted successfully!</p>
                            <div className="mt-4 text-right">
                                <button
                                    onClick={() => window.location.reload()}  // Page reload on "OK"
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                >
                                    OK
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="p-6">
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-300">Daily Reports</h1>
                    {reports.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="table-auto w-full border-collapse border border-gray-300 dark:border-gray-700 mt-4 shadow-lg rounded-lg">
                                {/* Table Header */}
                                <thead>
                                    <tr className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 uppercase text-sm leading-normal">
                                        <th className="border border-gray-300 dark:border-gray-600 px-6 py-3 text-left">Date</th>
                                        <th className="border border-gray-300 dark:border-gray-600 px-6 py-3 text-left">Email</th>
                                        <th className="border border-gray-300 dark:border-gray-600 px-6 py-3 text-left">Report</th>
                                    </tr>
                                </thead>

                                {/* Table Body */}
                                <tbody>
                                    {reports.map((report) => (
                                        <tr key={report.id}>
                                            <td className="border border-gray-300 dark:border-gray-600 px-6 py-4 text-gray-700 dark:text-gray-300">
                                                {report.date}
                                            </td>
                                            <td className="border border-gray-300 dark:border-gray-600 px-6 py-4 text-gray-700 dark:text-gray-300 font-bold">
                                                {report.email_id}
                                            </td>
                                            <td className="border border-gray-300 dark:border-gray-600 px-6 py-4 text-gray-700 dark:text-gray-300">
                                                {report.report_text}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-gray-300 hover:bg-gray-700">No reports found for your account.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DailyReport;
