import React, { useState, useEffect } from 'react';
import { firestoreDb } from '../config/firebase';
import { collection, query, getDocs, where } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";

const ViewDailyReport = () => {
    const [reports, setReports] = useState([]);
    const [filteredReports, setFilteredReports] = useState([]);
    const [filterDate, setFilterDate] = useState('');
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState(""); 
    const auth = getAuth();

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const reportsRef = collection(firestoreDb, "daily_report");
                const querySnapshot = await getDocs(query(reportsRef));
                const data = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setReports(data);
                setFilteredReports(data); // Initialize filtered reports
            } catch (error) {
                console.error("Error fetching reports:", error);
            }
        };

        fetchReports();
    }, []);

    const handleFilterChange = (e) => {
        const date = e.target.value;
        setFilterDate(date);
        if (date) {
            setFilteredReports(reports.filter(report => report.date === date));
        } else {
            setFilteredReports(reports); // If no filter, show all reports
        }
    };

    // Function to send email notification
    const sendEmailNotification = async (to) => {
        const emailData = {
            to,
            subject: 'Reminder: Daily Report Submission Pending',
            text: 'This is a reminder to submit your daily report for today.'
        };

        try {
            const response = await fetch('http://localhost:5000/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(emailData),
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Email sent successfully:', result);
            } else {
                console.error('Failed to send email:', response.statusText);
            }
        } catch (error) {
            console.error('Error sending email:', error);
        }
    };

    const handleNotify = async () => {
        try {
            // Get all staff emails from the office_staffs collection
            const staffQuery = query(collection(firestoreDb, 'office_staffs'));
            const staffSnapshot = await getDocs(staffQuery);
            const staffEmails = staffSnapshot.docs.map(doc => doc.data().staff_email_id);

            // Identify staff members who have not submitted their report for the selected date
            const missingReportsEmails = staffEmails.filter(email => 
                !reports.some(report => report.email_id === email && report.date === filterDate)
            );

            if (missingReportsEmails.length === 0) {
                setAlertMessage('No staff members need notifications.');
                setAlertType('info');
                return;
            }

            // Send notifications to the staff with missing reports
            for (const email of missingReportsEmails) {
                await sendEmailNotification(email);
            }

            setAlertMessage('Email notifications sent successfully!');
            setAlertType("success");
        } catch (error) {
            console.error('Error sending notifications:', error);
            setAlertMessage('Error sending notifications.');
            setAlertType("error");
        }
    };

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <TopBar />
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-gray-800 hover:bg-gray-500 dark:text-gray-300">View Daily Reports</h1>
                    
                    {/* Date Filter and Notify Button in the same row */}
                    <div className="mt-4 flex justify-between items-center">
                        <input
                            type="date"
                            value={filterDate}
                            onChange={handleFilterChange}
                            className="px-4 py-2 border rounded dark:bg-gray-700 dark:text-white"
                        />

                        <button
                            onClick={handleNotify}
                            className="ml-4 px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600"
                        >
                            Notify Staff for Missing Reports
                        </button>
                    </div>

                    {/* Alert Box */}
                    {alertMessage && (
                        <div className={`mt-4 p-4 rounded ${alertType === "success" ? "bg-green-100 text-green-800" : alertType === "error" ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"}`}>
                            {alertMessage}
                        </div>
                    )}

                    {filteredReports.length > 0 ? (
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
                                    {filteredReports.map((report) => (
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
                        <p className="text-gray-300 hover:bg-gray-700">No reports found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ViewDailyReport;
