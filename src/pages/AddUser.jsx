import React, { useState } from 'react';
import { firestoreDb, auth } from '../config/firebase';
import { collection, setDoc, doc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

const AddUser = () => {
    const [staff, setStaff] = useState({
        staff_email_id: '',
        staff_password: '',
        staff_role: '', 
    });
    const [errors, setErrors] = useState({});
    const [alert, setAlert] = useState({ message: '', type: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStaff({ ...staff, [name]: value });
        validateField(name, value);
    };

    const validateField = (name, value) => {
        let error = '';
        if (!value) {
            error = `${name.replace('_', ' ')} is required.`;
        }
        setErrors(prevErrors => ({ ...prevErrors, [name]: error }));
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = {};
        Object.keys(staff).forEach(key => {
            if (!staff[key] && key !== 'staff_role') {
                newErrors[key] = `${key.replace('_', ' ')} is required.`;
                isValid = false;
            }
        });
        setErrors(newErrors);
        return isValid;
    };

    const sendEmailNotification = async (email, password) => {
        const emailData = {
            to: email,
            subject: 'Welcome to Yang Khor User Management!',
            text: `Hello,\n\nYour account has been created successfully. Here are your login details:\n\nEmail: ${email}\nPassword: ${password}\n\nYou can login using this link: https://www.yangkhor.com/login\n\nBest regards,\n Yang Khor Human Resource`,
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            // Create user in Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                staff.staff_email_id,
                staff.staff_password
            );
            const user = userCredential.user;

            // Add user details to Firestore's `user_roles` collection
            const userRolesRef = doc(firestoreDb, 'user_roles', user.uid);
            await setDoc(userRolesRef, {
                email: staff.staff_email_id,
                user_id: user.uid,
                role: staff.staff_role,
                permission: 'True',
            });

            // Send email notification
            await sendEmailNotification(staff.staff_email_id, staff.staff_password);

            setAlert({ message: 'User created and added to Firestore successfully!', type: 'success' });
            setIsSubmitting(false);

            // Reset form fields
            setStaff({ staff_email_id: '', staff_password: '', staff_role: 'User' });
        } catch (error) {
            console.error('Error creating user:', error);
            // Handle email already in use error
            if (error.code === 'auth/email-already-in-use') {
                setAlert({ message: 'Email already in use. Please try another email.', type: 'error' });
            } else {
                setAlert({ message: 'Error creating user. Please try again.', type: 'error' });
            }
            setIsSubmitting(false);
        }
    };

    const handleAlertClose = () => {
        setAlert({ message: '', type: '' });
    };

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <TopBar />
                <main className="flex-1 p-6 overflow-y-auto">
                    <h2 className="text-2xl font-bold mb-4 flex items-center dark:text-gray-300">
                        Add User
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <InputField
                            name="staff_email_id"
                            value={staff.staff_email_id}
                            placeholder="Staff Email ID"
                            icon={faEnvelope}
                            handleChange={handleChange}
                            error={errors.staff_email_id}
                        />
                        <InputField
                            name="staff_password"
                            value={staff.staff_password}
                            placeholder="Staff Password"
                            icon={faLock}
                            handleChange={handleChange}
                            error={errors.staff_password}
                        />

                        <div className="border p-2 rounded w-full">
                            <label className="block font-bold text-gray-900 dark:text-white">Role</label>
                            <select
                                name="staff_role"
                                value={staff.staff_role}
                                onChange={handleChange}
                                className="w-full outline-none"
                            >
                                <option value="">Choose User Role</option>
                                <option value="User">User</option>
                                <option value="Admin">Admin</option>
                                <option value="super_admin">Super Admin</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            className="bg-blue-500 text-white p-2 rounded w-full"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Submitting...' : 'Add User'}
                        </button>
                    </form>

                    {alert.message && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300">
                            <div
                                className={`p-6 rounded-lg text-center shadow-lg transition-transform transform ${
                                    alert.type === 'success'
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-red-100 text-red-700'
                                }`}
                                style={{ transform: 'scale(1.05)' }}
                            >
                                <p className="font-semibold">{alert.message}</p>
                                <button
                                    onClick={handleAlertClose}
                                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300"
                                >
                                    OK
                                </button>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

// Input field component with an icon
const InputField = ({ name, value, placeholder, icon, handleChange, error }) => (
    <div className="border p-2 rounded w-full">
        <div className="flex items-center">
            {icon && <FontAwesomeIcon icon={icon} className="mr-2 text-gray-500" />}
            <input
                type="text"
                name={name}
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                className={`w-full outline-none ${error ? 'border-red-500' : ''}`}
            />
        </div>
        {error && <p className="mt-2 text-pink-600">{error}</p>}
    </div>
);

export default AddUser;
