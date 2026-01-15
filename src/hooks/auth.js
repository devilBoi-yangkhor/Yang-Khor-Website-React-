// src/hooks/auth.js
import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase'; // Ensure correct path to firebase config
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [alertMessage, setAlertMessage] = useState(null);
    const [alertType, setAlertType] = useState(null);

    const navigate = useNavigate(); // Initialize useNavigate inside the provider

    const signIn = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setAlertMessage("Login successful!");
            setAlertType("success");
            navigate('/dashboard');
        } catch (error) {
            setAlertMessage(error.message);
            setAlertType("error");
            throw error; // 🔁 Re-throw the error so parent can catch it
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        });

        return unsubscribe; // Cleanup subscription on unmount
    }, []);

    const value = {
        currentUser,
        signIn,
        alertMessage,
        alertType,
        setAlertMessage,
        setAlertType
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
