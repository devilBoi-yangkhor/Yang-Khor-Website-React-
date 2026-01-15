import React, { useEffect, useState } from 'react';
import { firestoreDb } from '../config/firebase';
import { collection, getDocs, doc, updateDoc,query, where } from 'firebase/firestore';
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";

const StaffAttendance = () => {
    const [leaveApplications, setLeaveApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openDropdown, setOpenDropdown] = useState(null); // Track open dropdown by row ID
    const [alertMessage, setAlertMessage] = useState(""); // For success/error alert
    const [alertType, setAlertType] = useState(""); // To control alert styling

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

    const updateLeaveBalance = async (email, leaveType, numDays) => {
        try {
            console.log("Fetching staff document for email:", email); // Debug log to check email
    
            // Query Firestore to find the document by staff_email_id
            const q = query(collection(firestoreDb, 'office_staffs'), where('staff_email_id', '==', email));
            const querySnapshot = await getDocs(q);
    
            console.log("Query snapshot size:", querySnapshot.size); // Debug log to check query result size
    
            if (!querySnapshot.empty) {
                const staffDoc = querySnapshot.docs[0]; // Get the first matching document
                const staffData = staffDoc.data(); // Get the document data
                
                console.log("Staff data:", staffData); // Log the full staff data for review
    
                // Find the appropriate field based on leave type
                let leaveField = "";
                switch (leaveType) {
                    case 'Casual Leave':
                        leaveField = 'staff_casual_leave';
                        break;
                    case 'Annual Leave':
                        leaveField = 'staff_annual_leave';
                        break;
                    case 'Maternity Leave (3 Months/90 Days)':
                        leaveField = 'staff_maternity_leave';
                        break;
                    case 'Paternity Leave (5 Working Days)':
                        leaveField = 'staff_paternity_leave';
                        break;
                    case 'Medical Leave':
                        leaveField = 'staff_medical_leave';
                        break;
                    case 'Preparatory Leave (5 Working Days)':
                        leaveField = 'staff_preparatory_leave';
                        break;
                    default:
                        console.log(`Unknown leave type: ${leaveType}`);
                        return;
                }
    
                // Get current leave balance, convert to number, and add the requested days
                const currentLeaveBalance = parseInt(staffData[leaveField]) || 0;
                const updatedLeaveBalance = currentLeaveBalance - numDays;
    
                // Update the leave balance in Firestore
                await updateDoc(staffDoc.ref, { [leaveField]: updatedLeaveBalance.toString() });
    
                console.log(`Updated ${leaveField} for ${email} to ${updatedLeaveBalance}`);
            } else {
                console.log(`Staff document not found for email: ${email}`); // Debug log to check document status
            }
        } catch (error) {
            console.error("Error updating leave balance: ", error);
        }
    };
    
    let emailTimeout;

    const sendEmailNotification = async (to, action, leaveType) => {
        if (emailTimeout) clearTimeout(emailTimeout); // Clear existing timeout

        emailTimeout = setTimeout(async () => {
            const emailData = {
                to,
                subject: `Your Leave Application has been ${action}`,
                text: `Your leave application for ${leaveType} has been ${action}.`
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
        }, 300); // Debounce for 300ms
    };
    
    const handleAction = async (action, id, email, leaveType, numDays, applicationSubmittedBy) => {
        try {
            // Update Firestore leave application status
            const leaveDocRef = doc(firestoreDb, 'leave_applications', id);
            await updateDoc(leaveDocRef, { status: action });
    
            // If approved, update leave balance
            if (action === 'Approved') {
                await updateLeaveBalance(email, leaveType, numDays);
            }
    
            // Send email notification
            await sendEmailNotification(applicationSubmittedBy, action, leaveType);
    
            // Success alert
            setAlertMessage(`Leave Application ID: ${id} successfully ${action.toLowerCase()}.`);
            setAlertType("success");
    
            // Close dropdown for the current row
            setOpenDropdown(null);
        } catch (error) {
            console.error(`Error processing Leave Application ID: ${id}`, error);
            setAlertMessage(`Error processing Leave Application ID: ${id}. Please try again.`);
            setAlertType("error");
        }
    };    
    
    const toggleDropdown = (id) => {
        setOpenDropdown(openDropdown === id ? null : id); // Toggle open/close for the clicked row
    };

    const handleCloseAlert = () => {
        setAlertMessage("");
        window.location.reload(); // Refresh the page after clicking OK
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
                            {/* Centered Alert Box */}
                            {alertMessage && (
                                <div className={`absolute inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50`}>
                                    <div className={`p-6 rounded-lg text-sm ${alertType === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                                        {alertMessage}
                                        <button
                                            onClick={handleCloseAlert}
                                            className="ml-4 px-3 py-1 text-white bg-blue-500 rounded focus:outline-none focus:ring"
                                        >
                                            OK
                                        </button>
                                    </div>
                                </div>
                            )}

                            <table className="min-w-full sm:min-w-0 bg-white dark:bg-gray-800">
                                <thead className="bg-gray-100 dark:bg-gray-700">
                                    <tr>
                                        <th className="text-left p-2 sm:p-4 font-medium text-gray-500 dark:text-gray-300 text-xs sm:text-sm">Sl.No.</th>
                                        <th className="text-left p-2 sm:p-4 font-medium text-gray-500 dark:text-gray-300 text-xs sm:text-sm">Staff Email</th>
                                        <th className="text-left p-2 sm:p-4 font-medium text-gray-500 dark:text-gray-300 text-xs sm:text-sm">Leave Type</th>
                                        <th className="text-left p-2 sm:p-4 font-medium text-gray-500 dark:text-gray-300 text-xs sm:text-sm">Reason</th>
                                        <th className="text-left p-2 sm:p-4 font-medium text-gray-500 dark:text-gray-300 text-xs sm:text-sm">Num Days</th>
                                        <th className="text-left p-2 sm:p-4 font-medium text-gray-500 dark:text-gray-300 text-xs sm:text-sm hidden lg:table-cell">Start Date</th>
                                        <th className="text-left p-2 sm:p-4 font-medium text-gray-500 dark:text-gray-300 text-xs sm:text-sm hidden lg:table-cell">End Date</th>
                                        <th className="text-left p-2 sm:p-4 font-medium text-gray-500 dark:text-gray-300 text-xs sm:text-sm">Evidence</th>
                                        <th className="text-left p-2 sm:p-4 font-medium text-gray-500 dark:text-gray-300 text-xs sm:text-sm">HR Remarks</th>
                                        <th className="text-left p-2 sm:p-4 font-medium text-gray-500 dark:text-gray-300 text-xs sm:text-sm">Status</th>
                                        <th className="text-left p-2 sm:p-4 font-medium text-gray-500 dark:text-gray-300 text-xs sm:text-sm">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {leaveApplications.map((app, index) => (
                                        <tr key={app.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                            <td className="p-2 sm:p-2 text-gray-600 dark:text-gray-300 text-xs sm:text-sm">{index + 1}</td>
                                            <td className="p-2 sm:p-2 text-gray-600 dark:text-gray-300 text-xs sm:text-sm">{app.applicationSubmittedBy}</td>
                                            <td className="p-2 sm:p-2 text-gray-600 dark:text-gray-300 text-xs sm:text-sm">{app.leaveType}</td>
                                            <td className="p-2 sm:p-2 text-gray-600 dark:text-gray-300 text-xs sm:text-sm">{app.reason}</td>
                                            <td className="p-2 sm:p-2 text-gray-600 dark:text-gray-300 text-xs sm:text-sm">{app.numDays}</td>
                                            <td className="p-2 sm:p-2 text-gray-600 dark:text-gray-300 text-xs sm:text-sm hidden lg:table-cell">{app.startDate?.toDate().toLocaleDateString()}</td>
                                            <td className="p-2 sm:p-2 text-gray-600 dark:text-gray-300 text-xs sm:text-sm hidden lg:table-cell">{app.endDate?.toDate().toLocaleDateString()}</td>
                                            <td className="p-2 sm:p-2 text-gray-600 dark:text-gray-300 text-xs sm:text-sm">
                                                {app.evidenceFile ? (
                                                    <a href={app.evidenceFile} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                                        View Evidence
                                                    </a>
                                                ) : 'No evidence'}
                                            </td>
                                            <td className="p-2 sm:p-2 text-gray-600 dark:text-gray-300 text-xs sm:text-sm">{app.remarks}</td>
                                            <td className="p-2 sm:p-4 text-gray-600 dark:text-gray-300 text-xs sm:text-sm">{app.status || 'Pending'}</td>
                                            <td className="p-2 sm:p-4 text-gray-600 dark:text-gray-300 text-xs sm:text-sm">
                                                {(!app.status || app.status === 'Updated') && (
                                                    <div 
                                                        className="relative inline-block text-left w-full hover:bg-gray-100 dark:hover:bg-gray-700" 
                                                        // Ensure the hover effect applies across the full width of the cell
                                                    >
                                                        <button
                                                            onClick={() => toggleDropdown(app.id)}
                                                            className="text-xs sm:text-sm text-gray-500 dark:text-gray-300 px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded w-full text-left"
                                                            aria-haspopup="true"
                                                        >
                                                            Action
                                                        </button>
                                                        {openDropdown === app.id && (
                                                            <div className="absolute right-0 w-48 mt-2 bg-white dark:bg-gray-800 border rounded-lg shadow-lg z-10">
                                                                <div className="py-2">
                                                                    <button
                                                                        onClick={() => handleAction('Approved', app.id, app.applicationSubmittedBy, app.leaveType, app.numDays, app.applicationSubmittedBy)}
                                                                        className="block px-4 py-2 text-sm text-green-600 hover:bg-green-100 dark:hover:bg-green-700 dark:text-green-400 w-full text-left"
                                                                    >
                                                                        Approve
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleAction('Rejected', app.id, app.applicationSubmittedBy, app.leaveType, app.numDays, app.applicationSubmittedBy)}
                                                                        className="block px-4 py-2 text-sm text-red-600 hover:bg-red-100 dark:hover:bg-red-700 dark:text-red-400 w-full text-left"
                                                                    >
                                                                        Reject
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
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

export default StaffAttendance;
