import React, { useEffect, useState } from 'react';
import { firestoreDb } from '../config/firebase';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";

const StaffAttendanceHR = () => {
    const [leaveApplications, setLeaveApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [alertMessage, setAlertMessage] = useState(""); // For success/error alert
    const [alertType, setAlertType] = useState(""); // To control alert styling
    const [remarks, setRemarks] = useState({});  // Track remarks for each application
    const [isButtonLoading, setIsButtonLoading] = useState(false);  // Loading state for button

    useEffect(() => {
        const fetchLeaveApplications = async () => {
            try {
                const querySnapshot = await getDocs(collection(firestoreDb, 'leave_applications'));
                const applicationsData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setLeaveApplications(applicationsData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching leave applications: ", error);
                setLoading(false);
            }
        };
        fetchLeaveApplications();
    }, []);

    const handleRemarksChange = (e, applicationId) => {
        setRemarks({
            ...remarks,
            [applicationId]: e.target.value,
        });
    };

    // Function to send the detailed email to CEO
    const sendEmailNotification = async (to, action, leaveType, numDays, applicationSubmittedBy, remarks) => {
        const emailData = {
            to,
            subject: `Leave Application Status Update`,
            text: `The leave application for ${leaveType} has been checked and updated!. 
                    Total Days: ${numDays}
                    Remarks: ${remarks}
                    Submitted by: ${applicationSubmittedBy}
                    Please review the details and take the necessary actions.`,
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

    const handleAction = async (action, id, leaveType, numDays, applicationSubmittedBy) => {
        setIsButtonLoading(true);  // Start loading animation
    
        try {
            // Only update the remarks field, not the status
            const leaveDocRef = doc(firestoreDb, 'leave_applications', id);
            await updateDoc(leaveDocRef, {
                remarks: remarks[id],
                status: "Updated" // Update the status
            });    
            // Send email notification to CEO with all details including remarks
            await sendEmailNotification('dawa.tshering@yangkhor.com', action, leaveType, numDays, applicationSubmittedBy, remarks[id]);
    
            // Success alert
            setAlertMessage(`Leave Application ID: ${id} has been updated successfully.`);
            setAlertType("success");
        } catch (error) {
            console.error(`Error processing Leave Application ID: ${id}`, error);
            setAlertMessage(`Error processing Leave Application ID: ${id}. Please try again.`);
            setAlertType("error");
        } finally {
            setIsButtonLoading(false);  // Stop loading animation
        }
    };    

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <TopBar />
                <main className="flex-1 p-6 overflow-y-auto">
                    <h2 className="text-2xl font-bold mb-6 dark:text-gray-300">Staff Leave Application</h2>

                    {loading ? (
                        <p className="text-center text-gray-500">Loading leave applications...</p>
                    ) : (
                        <div className="overflow-x-auto rounded-lg shadow">
                            {alertMessage && (
                                <div className={`absolute inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50`}>
                                    <div className={`p-6 rounded-lg text-sm ${alertType === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                                        <p>{alertMessage}</p>
                                        <button
                                            onClick={() => {
                                                setAlertMessage("");
                                                window.location.reload(); // Refresh the page after dismissing the alert
                                            }}
                                            className="mt-4 text-blue-500 hover:text-blue-700"
                                        >
                                            OK
                                        </button>
                                    </div>
                                </div>
                            )}

                            <table className="min-w-full sm:min-w-0 bg-white dark:bg-gray-800">
                                <thead className="bg-gray-100 dark:bg-gray-700">
                                    <tr>
                                        <th className="text-left p-2 sm:p-4 font-medium text-gray-500 dark:text-gray-300">Sl.No.</th>
                                        <th className="text-left p-2 sm:p-4 font-medium text-gray-500 dark:text-gray-300">Staff Email</th>
                                        <th className="text-left p-2 sm:p-4 font-medium text-gray-500 dark:text-gray-300">Leave Type</th>
                                        <th className="text-left p-2 sm:p-4 font-medium text-gray-500 dark:text-gray-300">Total Days</th>
                                        <th className="text-left p-2 sm:p-4 font-medium text-gray-500 dark:text-gray-300">Status</th>
                                        <th className="text-left p-2 sm:p-4 font-medium text-gray-500 dark:text-gray-300">Remarks</th>
                                        <th className="text-left p-2 sm:p-4 font-medium text-gray-500 dark:text-gray-300">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {leaveApplications.map((app, index) => (
                                        <tr key={app.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                            <td className="p-2 sm:p-2 text-gray-600 dark:text-gray-300">{index + 1}</td>
                                            <td className="p-2 sm:p-2 text-gray-600 dark:text-gray-300">{app.applicationSubmittedBy}</td>
                                            <td className="p-2 sm:p-2 text-gray-600 dark:text-gray-300">{app.leaveType}</td>
                                            <td className="p-2 sm:p-2 text-gray-600 dark:text-gray-300">{app.numDays}</td>
                                            <td className="p-2 sm:p-2 text-gray-600 dark:text-gray-300">{app.status || 'Pending'}</td>
                                            <td className="p-2 sm:p-2 text-gray-600 dark:text-gray-300">
                                                <input
                                                    type="text"
                                                    value={remarks[app.id] || ""}
                                                    onChange={(e) => handleRemarksChange(e, app.id)}
                                                    className="p-2 border rounded w-full"
                                                    placeholder="Enter remarks"
                                                />
                                            </td>
                                            <td className="p-2 sm:p-2 text-gray-600 dark:text-gray-300">
                                                {(!app.status || app.status === 'Pending') ? (
                                                    <button
                                                        onClick={() => handleAction('Approved', app.id, app.leaveType, app.numDays, app.applicationSubmittedBy)}
                                                        className="text-sm px-4 py-2 bg-blue-500 text-white rounded"
                                                        disabled={isButtonLoading || app.status === "Updated"}
                                                    >
                                                        {isButtonLoading ? (
                                                            <div className="w-5 h-5 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
                                                        ) : (
                                                            'Update'
                                                        )}
                                                    </button>
                                                ) : (
                                                    <span className="text-gray-500 italic">Updated</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default StaffAttendanceHR;
