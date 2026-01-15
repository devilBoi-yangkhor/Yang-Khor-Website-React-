import React, { useEffect, useState } from 'react';
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import { firestoreDb, auth } from "../config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import {
    getAuth,
    updatePassword,
    reauthenticateWithCredential,
    EmailAuthProvider,
} from 'firebase/auth';

const ProfileSettings = () => {
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');
    const [isButtonLoading, setIsButtonLoading] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const currentUser = auth.currentUser;

    // Fetch staff details by email
    useEffect(() => {
        const fetchStaffDetails = async () => {
            try {
                if (currentUser) {
                    const staffRef = collection(firestoreDb, 'office_staffs');
                    const staffQuery = query(staffRef, where('staff_email_id', '==', currentUser.email));
                    const staffSnapshot = await getDocs(staffQuery);

                    if (!staffSnapshot.empty) {
                        const staffData = staffSnapshot.docs[0].data();
                        setUserDetails(staffData);
                    } else {
                        console.error("No staff details found");
                    }
                }
            } catch (error) {
                console.error("Error fetching staff details:", error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchStaffDetails();
    }, [currentUser]);

    // Re-authenticate user before updating password
    const reauthenticate = async () => {
        if (!currentUser || !currentPassword) throw new Error('Missing credentials');

        const credential = EmailAuthProvider.credential(currentUser.email, currentPassword);
        const firebaseAuth = getAuth();
        await reauthenticateWithCredential(firebaseAuth.currentUser, credential);
    };

    // Handle password update
    const handlePasswordUpdate = async () => {
        if (!currentUser) return;

        if (!currentPassword || !newPassword) {
            setAlertMessage('Please fill all password fields');
            setAlertType('error');
            return;
        }

        setIsButtonLoading(true);
        try {
            await reauthenticate();
            const firebaseAuth = getAuth();
            await updatePassword(firebaseAuth.currentUser, newPassword);
            setAlertMessage('Password updated successfully!');
            setAlertType('success');
            setNewPassword('');
            setCurrentPassword('');
        } catch (error) {
            setAlertMessage(error.message || 'Failed to update password');
            setAlertType('error');
        } finally {
            setIsButtonLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="text-xl">Loading profile...</div>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <TopBar />
                <main className="flex-1 p-6 overflow-y-auto">
                    <h2 className="text-2xl font-bold mb-6 dark:text-gray-300">Profile Settings</h2>
                    {/* Profile Section */}
                    {userDetails && (
                        <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                            <div className="flex items-center space-x-6">
                                {/* Profile Image */}
                                <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center">
                                    <i className="fas fa-user-circle text-5xl text-blue-500"></i>
                                </div>

                                {/* User Info */}
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                                        {userDetails.staff_name}
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {userDetails.staff_designation}
                                    </p>
                                </div>
                            </div>

                            {/* Details Table */}
                            <div className="mt-6">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <tbody className="space-y-4">
                                        <tr className="flex justify-between w-full">
                                            <td className="font-medium text-gray-700 dark:text-gray-300">Name:</td>
                                            <td className="text-gray-900 dark:text-gray-200">{userDetails.staff_name}</td>
                                        </tr>
                                        <tr className="flex justify-between w-full">
                                            <td className="font-medium text-gray-700 dark:text-gray-300">Email:</td>
                                            <td className="text-gray-900 dark:text-gray-200">{userDetails.staff_email_id}</td>
                                        </tr>
                                        <tr className="flex justify-between w-full">
                                            <td className="font-medium text-gray-700 dark:text-gray-300">CID:</td>
                                            <td className="text-gray-900 dark:text-gray-200">{userDetails.staff_CID}</td>
                                        </tr>
                                        <tr className="flex justify-between w-full">
                                            <td className="font-medium text-gray-700 dark:text-gray-300">Gender:</td>
                                            <td className="text-gray-900 dark:text-gray-200">{userDetails.staff_gender}</td>
                                        </tr>
                                        <tr className="flex justify-between w-full">
                                            <td className="font-medium text-gray-700 dark:text-gray-300">Designation:</td>
                                            <td className="text-gray-900 dark:text-gray-200">{userDetails.staff_designation}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Password Update Section */}
                    <div className="max-w-lg mx-auto mt-8 bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                        <h3 className="text-xl font-semibold mb-4 dark:text-gray-200">Change Password</h3>

                        {/* Current Password */}
                        <div className="mb-4 relative">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Current Password
                            </label>
                            <input
                                type={showCurrentPassword ? "text" : "password"}
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                placeholder="Enter current password"
                            />
                            <br></br><br></br>
                            <button
                                type="button"
                                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 dark:text-gray-400"
                            >
                                <i className={`fas ${showCurrentPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                            </button>
                        </div>

                        {/* New Password */}
                        <div className="mb-4 relative">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                New Password
                            </label>
                            <input
                                type={showNewPassword ? "text" : "password"}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                placeholder="Enter new password"
                            />
                            <br></br><br></br>
                            <button
                                type="button"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 dark:text-gray-400"
                            >
                                <i className={`fas ${showNewPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                            </button>
                        </div>

                        {/* Change Password Button */}
                        <button
                            onClick={handlePasswordUpdate}
                            disabled={isButtonLoading}
                            className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition disabled:bg-blue-300"
                        >
                            {isButtonLoading ? (
                                <span className="flex items-center justify-center">
                                    <span className="animate-spin mr-2">🌀</span> Updating Password...
                                </span>
                            ) : (
                                'Change Password'
                            )}
                        </button>
                    </div>
                    <br></br>
                    {/* Alert */}
                    {alertMessage && (
                        <div
                            className={`mb-4 p-4 rounded ${
                                alertType === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}
                        >
                            {alertMessage}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default ProfileSettings;