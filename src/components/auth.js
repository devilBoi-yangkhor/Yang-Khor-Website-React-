import React, { useState } from 'react';
import { useAuth } from '../hooks/auth'; // Use the AuthContext
import Alert from '../components/Alert';

export const Auth = ({ showPassword, toggleShowPassword }) => {
    const { signIn, alertMessage, alertType, setAlertMessage, setAlertType } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSigningIn, setIsSigningIn] = useState(false);

    const handleSignIn = async (event) => {
        event.preventDefault();
        setIsSigningIn(true); // Show loading text

        try {
            await signIn(email, password);
            // If we reach here and signIn resolves, assume success
            // Redirect/login handled by auth context
        } catch (error) {
            // On error: show message, reset button, clear password
            setAlertMessage("Invalid email or password.");
            setAlertType("error");
            setPassword('');
            setIsSigningIn(false);
        }
    };

    return (
        <div className="mt-10 space-y-4">
            {alertMessage && (
                <Alert
                    message={alertMessage}
                    onClose={() => {
                        setAlertMessage(null);
                        setAlertType(null);
                    }}
                    type={alertType}
                />
            )}
            <form onSubmit={handleSignIn}>
                <input
                    placeholder="Email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full focus:outline-none p-2 rounded-md text-black"
                    type="email"
                />
                <div className="relative my-5">
                    <input
                        placeholder="Password..."
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full focus:outline-none p-2 rounded-md text-black"
                    />
                    <button
                        className="absolute top-1/2 transform -translate-y-1/2 right-2 text-black"
                        onClick={toggleShowPassword}
                        type="button"
                    >
                        <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                    </button>
                </div>
                <button
                    type="submit"
                    className="mb-4 px-6 py-2 bg-blue-500 text-white rounded"
                    disabled={isSigningIn}
                >
                    {isSigningIn ? "Signing In..." : "Sign In"}
                </button>
            </form>
        </div>
    );
};