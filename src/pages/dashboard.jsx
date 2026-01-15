import React, { useState, useEffect } from 'react';
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import Charts from "../components/Charts";
import { firestoreDb, auth } from "../config/firebase"; 
import { collection, getDocs, doc, getDoc, query, where } from "firebase/firestore"; 
import { Breadcrumbs, Link } from '@mui/material'; // Import MUI components
import HomeIcon from '@mui/icons-material/Home';


const Dashboard = () => {
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalVisitors, setTotalVisitors] = useState(0);
    const [userRole, setUserRole] = useState(null);
    const [staffDetails, setStaffDetails] = useState(null);

    // Fetch current user's role
    useEffect(() => {
        const fetchUserRole = async () => {
            if (auth.currentUser) {
                try {
                    const userRolesRef = collection(firestoreDb, 'user_roles');
                    const q = query(userRolesRef, where('user_id', '==', auth.currentUser.uid));
                    const querySnapshot = await getDocs(q);

                    if (!querySnapshot.empty) {
                        querySnapshot.forEach((doc) => {
                            setUserRole(doc.data().role); // Set user role based on Firestore document
                        });
                    } else {
                        console.log('No matching user role found');
                    }
                } catch (error) {
                    console.error("Error fetching user role:", error);
                }
            }
        };

        fetchUserRole();
    }, []);

    // Fetch total users and visitors from Firestore
    useEffect(() => {
        const fetchTotalUsers = async () => {
            try {
                const querySnapshot = await getDocs(collection(firestoreDb, "user_roles"));
                setTotalUsers(querySnapshot.size);
            } catch (err) {
                console.error("Error fetching users: ", err);
            }
        };

        const fetchTotalVisitors = async () => {
            try {
                const visitorDocRef = doc(firestoreDb, "analytics", "visitorCount");
                const visitorDocSnap = await getDoc(visitorDocRef);
                if (visitorDocSnap.exists()) {
                    setTotalVisitors(visitorDocSnap.data().count);
                } else {
                    console.log("No visitor count document found.");
                }
            } catch (err) {
                console.error("Error fetching visitor count: ", err);
            }
        };

        fetchTotalUsers();
        fetchTotalVisitors();
    }, []);

    // Fetch staff details from Firestore based on current user's email
    useEffect(() => {
        const fetchStaffDetails = async () => {
            if (auth.currentUser) {
                try {
                    const staffRef = collection(firestoreDb, 'office_staffs');
                    const q = query(staffRef, where('staff_email_id', '==', auth.currentUser.email));
                    const querySnapshot = await getDocs(q);

                    if (!querySnapshot.empty) {
                        const staffDoc = querySnapshot.docs[0];  // Assuming one document per email
                        setStaffDetails(staffDoc.data()); // Set staff details
                    } else {
                        console.log('No matching staff details found');
                    }
                } catch (error) {
                    console.error("Error fetching staff details:", error);
                }
            }
        };

        fetchStaffDetails();
    }, []);

    if (!userRole) {
        return <p>Loading...</p>; // Optional: Add a loading state while fetching the role
    }

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <TopBar />
                <main className="flex-1 p-6 overflow-y-auto">
                    {/* Breadcrumbs section */}
                    <Breadcrumbs aria-label="breadcrumb" className="text-gray-900 dark:text-gray-400 mb-4">
                        <Link href="/dashboard" style={{ textDecoration: "none", display: "flex", alignItems: "center" }} className='text-gray-900 dark:text-gray-400'>
                            <HomeIcon /> Dashboard
                        </Link>                    
                    </Breadcrumbs>
                    <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                        {userRole === 'Admin' ? "Admin Dashboard" : "Staff Dashboard"}
                    </h2>

                    {userRole === 'Admin' ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                            {/* Admin-specific dashboard components */}
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center justify-between">
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">Total Users</h3>
                                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{totalUsers}</p>
                                </div>
                                <div className="text-green-500 text-3xl dark:text-green-300">👤</div>
                            </div>

                            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center justify-between">
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">Total Visitors</h3>
                                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{totalVisitors}</p>
                                </div>
                                <div className="text-blue-500 text-2xl dark:text-blue-300">👨‍🦰👩‍🦰</div>
                            </div>

                            {/* Add other admin-specific components */}
                        </div>
                    ) : (
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex justify-center space-x-4">
                            {/* User-specific dashboard components */}
                            {staffDetails && (
                                <>
                                    {/* Profile Information Card */}
                                    <div className="bg-white dark:bg-gray-800 p-10 rounded-lg shadow-md flex items-start space-x-4">
                                        <div className="flex flex-col space-y-2">
                                            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">Profile Information</h3>
                                            {/* Name */}
                                            <div className="flex space-x-2">
                                                <p className='text-gray-900 dark:text-white'>Name:</p>
                                                <p className="text-xl font-bold text-gray-900 dark:text-white">{staffDetails.staff_name}</p>
                                            </div>
                                            {/* Designation */}
                                            <div className="flex space-x-2">
                                                <p className='text-gray-900 dark:text-white'>Designation:</p>
                                                <p className="text-md font-semibold text-gray-900 dark:text-gray-400">{staffDetails.staff_designation}</p>
                                            </div>
                                        </div>
                                        <div className="text-blue-500 text-3xl dark:text-blue-300">👤</div>
                                    </div>

                                    {/* Second Card */}
                                    <div className="bg-white dark:bg-gray-800 p-10 rounded-lg shadow-md flex items-start space-x-4">
                                        <div className="flex flex-col space-y-2">
                                            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">Current Project: </h3>
                                            {/* Add any additional info here */}
                                            <div className="flex space-x-2">
                                                <p className='text-gray-900 dark:text-white'>Project Name:</p>
                                                <p className="text-md font-semibold text-gray-900 dark:text-white">{staffDetails.staff_email_id}</p>
                                            </div>
                                            <div className="flex space-x-2">
                                                <p className='text-gray-900 dark:text-white'>Phone:</p>
                                                <p className="text-md font-semibold text-gray-900 dark:text-white">{staffDetails.staff_contact}</p>
                                            </div>
                                        </div>
                                        <div className="text-green-500 text-3xl dark:text-green-300">📜</div>
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                    
                    <br />
                    {userRole === 'Admin' && (
                        <div className="col-span-2">
                            <Charts />
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Dashboard;