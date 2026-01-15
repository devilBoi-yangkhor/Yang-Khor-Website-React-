import React, { useState, useEffect } from 'react';
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import { firestoreDb, auth,storage } from "../config/firebase";
import { collection, getDocs, query, where, addDoc } from "firebase/firestore";
import { Breadcrumbs, Link, CircularProgress, Button, IconButton, TextField, MenuItem } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import DescriptionIcon from '@mui/icons-material/Description';
import CloseIcon from '@mui/icons-material/Close';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useAuth } from '../hooks/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


// Icons Link Start
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import BabyChangingStationIcon from '@mui/icons-material/BabyChangingStation';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import SchoolIcon from '@mui/icons-material/School';
// Icons link Ends

const ApplyLeave = () => {
    // (Existing state declarations)
    const [submitting, setSubmitting] = useState(false); // New state for button submission
    const [leaveApplications, setLeaveApplications] = useState([]);
    const [staffDetails, setStaffDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formVisible, setFormVisible] = useState(false);
    const [error, setError] = useState(null);

    // Leave application form states
    const [leaveType, setLeaveType] = useState('');
    const [reason, setReason] = useState('');
    const [numDays, setNumDays] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [evidenceFile, setEvidenceFile] = useState(null); // New state for file upload

    const { currentUser } = useAuth();

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success'); // 'success' or 'error'

    // Leave types data
    const leaveTypes = [
        { name: 'Casual Leave', field: 'staff_casual_leave', total: 10, icon: <BeachAccessIcon className="text-blue-500" /> },
        { name: 'Annual Leave', field: 'staff_annual_leave', total: 30, icon: <EventAvailableIcon className="text-green-500" /> },
        { name: 'Maternity Leave (3 Months/90 Days)', field: 'staff_maternity_leave', total: 90, icon: <BabyChangingStationIcon className="text-pink-500" /> },
        { name: 'Paternity Leave (5 Working Days)', field: 'staff_paternity_leave', total: 5, icon: <FamilyRestroomIcon className="text-indigo-500" /> },
        { name: 'Medical Leave', field: 'staff_medical_leave', total: 'Varies', icon: <LocalHospitalIcon className="text-red-500" /> },
        { name: 'Preparatory Leave (5 Working Days)', field: 'staff_preparatory_leave', total: 5, icon: <SchoolIcon className="text-purple-500" /> }
    ];
        
    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitting(true); // Set submitting state to true when starting submission
    
        if ((leaveType === 'Maternity Leave (3 Months/90 Days)' || leaveType === 'Paternity Leave (5 Working Days)' || leaveType === 'Medical Leave') && !evidenceFile) {
            setAlertMessage("Please upload supporting evidence for this leave type.");
            setAlertSeverity("error");
            setOpenSnackbar(true);
            setSubmitting(false); // Reset submitting state
            return;
        }
    
        // Check for overlapping pending leave applications
        const hasOverlappingPendingApplication = leaveApplications.some(application => {
            const appStartDate = application.startDate.toDate();
            const appEndDate = application.endDate.toDate();
    
            // Check if the new leave application overlaps with any existing pending application
            return (
                application.status === "Pending" &&
                ((startDate >= appStartDate && startDate <= appEndDate) || 
                (endDate >= appStartDate && endDate <= appEndDate) || 
                (startDate <= appStartDate && endDate >= appEndDate))
            );
        });
    
        if (hasOverlappingPendingApplication) {
            setAlertMessage("You already have a pending leave application for these dates.");
            setAlertSeverity("error");
            setOpenSnackbar(true);
            setSubmitting(false); // Reset submitting state
            return;
        }
    
        try {
            // Upload the file if it exists
            let evidenceFileUrl = null;
            if (evidenceFile) {
                const storageRef = ref(storage, `evidence/${evidenceFile.name}`);
                await uploadBytes(storageRef, evidenceFile);
                evidenceFileUrl = await getDownloadURL(storageRef);
            }
    
            // Application data object
            const applicationData = {
                leaveType,
                reason,
                startDate,
                endDate,
                numDays,
                applicationSubmittedBy: currentUser.email,
                evidenceFile: evidenceFileUrl,
                status: 'Pending', // Default status
            };
    
            // Save the application data to Firestore
            const docRef = await addDoc(collection(firestoreDb, 'leave_applications'), applicationData);
    
            // Send the email notification only after successfully saving to Firestore
            const emailData = {
                to: 'accounts@yangkhor.com', // HR email
                subject: `Leave Application Submitted by ${currentUser.email}`,
                text: `
                    A leave application has been submitted with the following details:
    
                    Submitted By: ${currentUser.email}
                    Leave Type: ${leaveType}
                    Start Date: ${new Date(startDate).toLocaleDateString()}
                    End Date: ${new Date(endDate).toLocaleDateString()}
                    Number of Days: ${numDays}
                    Reason: ${reason}
                    Status: Pending
                `
            };
    
            // Send email notification (Make sure to implement the API request in the backend to handle this)
            await fetch('http://localhost:5000/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(emailData),
            });
    
            // Show success alert
            setAlertMessage("Application submitted successfully and email notification sent!");
            setAlertSeverity("success");
            setOpenSnackbar(true);
    
            // Reset form fields
            setLeaveType('');
            setReason('');
            setStartDate(null);
            setEndDate(null);
            setNumDays('');
            setEvidenceFile(null); // Reset file input after submission
            setFormVisible(false);
    
        } catch (error) {
            console.error('Error submitting application:', error.message);
            setAlertMessage("Failed to submit application.");
            setAlertSeverity("error");
            setOpenSnackbar(true);
        } finally {
            setSubmitting(false); // Reset submitting state regardless of success or failure
        }
    };  

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) { // 5 MB limit
                setAlertMessage("File size exceeds the 5MB limit.");
                setAlertSeverity("error");
                setOpenSnackbar(true);
                return;
            }
            if (!['application/pdf', 'image/png', 'image/jpeg'].includes(file.type)) {
                setAlertMessage("Invalid file type. Only PDF or images are allowed.");
                setAlertSeverity("error");
                setOpenSnackbar(true);
                return;
            }
            setEvidenceFile(file);
        }
    };
    

    useEffect(() => {
        const fetchStaffDetails = async () => {
            try {
                if (auth.currentUser) {
                    const staffRef = collection(firestoreDb, 'office_staffs');
                    const staffQuery = query(staffRef, where('staff_email_id', '==', auth.currentUser.email));
                    const staffSnapshot = await getDocs(staffQuery);

                    if (!staffSnapshot.empty) {
                        const staffData = staffSnapshot.docs[0].data();
                        setStaffDetails(staffData);
                    } else {
                        setError("No staff details found.");
                    }
                } else {
                    setError("No authenticated user.");
                }
            } catch (err) {
                console.error("Error fetching staff details:", err);
                setError("Failed to fetch staff details.");
            } finally {
                setLoading(false);
            }
        };

        fetchStaffDetails();
    }, []);

    useEffect(() => {
        const fetchLeaveApplications = async () => {
            try {
                if (currentUser?.email) {
                    const leaveRef = collection(firestoreDb, 'leave_applications');
                    const leaveQuery = query(leaveRef, where('applicationSubmittedBy', '==', currentUser.email));
                    const leaveSnapshot = await getDocs(leaveQuery);
    
                    if (!leaveSnapshot.empty) {
                        const applications = leaveSnapshot.docs.map(doc => ({
                            id: doc.id,
                            ...doc.data()
                        }));
                        setLeaveApplications(applications);
                    } else {
                        setLeaveApplications([]); // No applications found
                    }
                }
            } catch (error) {
                console.error("Error fetching leave applications:", error.message);
            }
        };
    
        fetchLeaveApplications();
    }, [currentUser]);

    
    useEffect(() => {
        if (startDate && endDate) {
            // Normalize date to midnight to avoid time differences
            const start = new Date(startDate.setHours(0, 0, 0, 0));
            const end = new Date(endDate.setHours(0, 0, 0, 0));
    
            if (start.getTime() === end.getTime()) {
                // Same day → 0.5 days
                setNumDays(0.5);
            } else {
                // Calculate difference in days
                const timeDiff = end - start;
                const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
                setNumDays(daysDiff > 0 ? daysDiff : 0);
            }
        } else {
            setNumDays('');
        }
    }, [startDate, endDate]);

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <CircularProgress />
            </div>
        );
    }

    if (error) {
        return <p className="text-red-500 text-center mt-10">{error}</p>;
    }

    const toggleFormVisibility = () => setFormVisible(!formVisible);

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <TopBar />
                <main className="flex-1 p-6 overflow-y-auto">
                    {/* Breadcrumbs */}
                    <Breadcrumbs aria-label="breadcrumb" className="text-gray-900 dark:text-gray-400 mb-4">
                        <Link href="/dashboard" className='text-gray-900 dark:text-gray-400 flex items-center'>
                            <HomeIcon /> Dashboard
                        </Link>
                        <Link href="/apply_leave" className='text-gray-900 dark:text-gray-400 flex items-center'>
                            <DescriptionIcon /> Leave Application
                        </Link>
                    </Breadcrumbs>

                    <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Leave Records</h2>

                    <div className="grid gap-6 md:grid-cols-2">
                    {leaveTypes.map((leave) => {
                        const leaveTaken = staffDetails ? staffDetails[leave.field] || 0 : 0;
                        const leaveLeft = leave.total === 'Varies' ? 'Depends' : leave.total - leaveTaken;

                        // Special formatting only for Annual Leave
                        if (leave.name === 'Annual Leave') {
                            // Show only the accumulated/taken days
                            return (
                                <div key={leave.field} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                                    <div className="flex items-center mb-4">
                                        {leave.icon}
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white ml-2">Annual Leave</h3>
                                    </div>
                                    <div className="text-center mt-4">
                                        <p className="text-3xl font-bold text-gray-900 dark:text-white">{leaveTaken}</p>
                                        <p className="mt-2 text-sm text-gray-900 dark:text-white">Leave Accumulated</p>
                                    </div>
                                </div>
                            );
                        }

                        // Render normal card for other leave types
                        const leaveStatus = leaveTaken > 0 ? (
                            <div key={leave.field} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                                <div className="flex items-center mb-4">
                                    {leave.icon}
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white ml-2">{leave.name}</h3>
                                </div>
                                <div className="flex justify-between">
                                    <div className="text-center">
                                        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">Total Leave</h3>
                                        <p className="text-3xl font-bold text-gray-900 dark:text-white">{leave.total}</p>
                                    </div>
                                    <div className="text-center">
                                        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">Leave Taken</h3>
                                        <p className="text-3xl font-bold text-gray-900 dark:text-white">{leaveTaken}</p>
                                    </div>
                                    <div className="text-center">
                                        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">Leave Left</h3>
                                        <p className="text-3xl font-bold text-gray-900 dark:text-white">{leaveLeft}</p>
                                    </div>
                                </div>
                            </div>
                        ) : null;

                        return leaveStatus;
                    })}
                    </div>
                    <br/>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mt-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Leave Application History</h3>
                        {leaveApplications.length > 0 ? (
                            <div className="overflow-auto max-h-64">
                                <table className="min-w-full text-gray-900 dark:text-white">
                                    <thead>
                                        <tr>
                                            <th className="border-b dark:border-gray-700 px-4 py-2 text-left">Leave Type</th>
                                            <th className="border-b dark:border-gray-700 px-4 py-2 text-left">Start Date</th>
                                            <th className="border-b dark:border-gray-700 px-4 py-2 text-left">End Date</th>
                                            <th className="border-b dark:border-gray-700 px-4 py-2 text-left">Days</th>
                                            <th className="border-b dark:border-gray-700 px-4 py-2 text-left">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {leaveApplications.map((application) => (
                                            <tr key={application.id}>
                                                <td className="border-b dark:border-gray-700 px-4 py-2">{application.leaveType}</td>
                                                <td className="border-b dark:border-gray-700 px-4 py-2">
                                                    {application.startDate ? new Date(application.startDate.toDate()).toLocaleDateString() : 'N/A'}
                                                </td>
                                                <td className="border-b dark:border-gray-700 px-4 py-2">
                                                    {application.endDate ? new Date(application.endDate.toDate()).toLocaleDateString() : 'N/A'}
                                                </td>
                                                <td className="border-b dark:border-gray-700 px-4 py-2">
                                                    {application.numDays || 'Pending'}
                                                </td>
                                                <td className="border-b dark:border-gray-700 px-4 py-2">
                                                    {application.status || 'Pending'}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className="text-gray-500 dark:text-gray-400">No leave applications found.</p>
                        )}
                    </div>

                    {/* Apply for Leave Button */}
                    <div className="mt-8 text-center">
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            style={{ transition: 'transform 0.3s', backgroundColor: '#3f51b5' }}
                            onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                            onClick={toggleFormVisibility}
                        >
                            Apply for Leave
                        </Button>
                    </div>

                    {/* Leave Application Form */}
                    {formVisible && (
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mt-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Leave Application Form</h3>
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    select
                                    label="Leave Type"
                                    value={leaveType}
                                    onChange={(e) => setLeaveType(e.target.value)}
                                    fullWidth
                                    required
                                    margin="normal"
                                    className="text-lg font-semibold text-gray-900 dark:text-white mb-4"
                                >
                                    {leaveTypes.map((leave) => (
                                        <MenuItem key={leave.field} value={leave.name}>
                                            {leave.name}
                                        </MenuItem>
                                    ))}
                                </TextField>

                                <TextField
                                    label="Reason (Specify morning/afternoon here)"
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                    fullWidth
                                    required
                                    margin="normal"
                                />

                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        label="Start Date"
                                        value={startDate}
                                        onChange={(newValue) => setStartDate(newValue)}
                                        renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
                                    />
                                    <DatePicker
                                        label="End Date"
                                        value={endDate}
                                        onChange={(newValue) => setEndDate(newValue)}
                                        renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
                                    />
                                </LocalizationProvider>

                                <TextField
                                    label="Number of Days"
                                    value={numDays}
                                    fullWidth
                                    margin="normal"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />

                                {/* New file input field for evidence upload */}
                                {(leaveType === 'Maternity Leave (3 Months/90 Days)' || 
                                    leaveType === 'Paternity Leave (5 Working Days)' || 
                                    leaveType === 'Medical Leave') && (
                                    <div>
                                        <label>Attach Evidence File</label>
                                        <TextField
                                            type="file"
                                            onChange={handleFileChange}
                                            fullWidth
                                            margin="normal"
                                            InputProps={{
                                                accept: "application/pdf,image/*", // Accept PDF or image files
                                            }}
                                        />
                                    </div>
                                )}

                                <div className="flex justify-between mt-4">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        disabled={submitting} // Disable button while submitting
                                    >
                                        {submitting ? "Submitting..." : "Submit Application"}
                                    </Button>
                                    <IconButton onClick={toggleFormVisibility}>
                                        <CloseIcon />
                                    </IconButton>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Snackbar for alerts */}
                    <Snackbar
                        open={openSnackbar}
                        autoHideDuration={6000}
                        onClose={() => setOpenSnackbar(false)}
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    >
                        <MuiAlert elevation={6} severity={alertSeverity} onClose={() => setOpenSnackbar(false)} sx={{ width: '100%' }}>
                            {alertMessage}
                        </MuiAlert>
                    </Snackbar>

                </main>
            </div>
        </div>
    );
};

export default ApplyLeave;
