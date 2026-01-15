import React, { useState, useEffect } from 'react';
import { FaBell, FaEnvelope, FaUserCircle } from 'react-icons/fa';
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

const TopNav = () => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme ? savedTheme === 'dark' : false;
    });
    const [hasNotifications, setHasNotifications] = useState(false);
    const [hasMessages, setHasMessages] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const navigate = useNavigate();

    // Check if mobile to adjust padding
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const fetchUser = () => {
        const currentUser = auth.currentUser;
        setUser(currentUser);
    };

    useEffect(() => {
        fetchUser();
    }, []);

    useEffect(() => {
        const root = document.documentElement;
        if (isDarkMode) {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const toggleTheme = () => setIsDarkMode(!isDarkMode);

    const logout = async () => {
        try {
            await signOut(auth);
            console.log('User logged out');
            navigate('/');
        } catch (err) {
            console.error('Error logging out:', err);
        }
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isDropdownOpen && !event.target.closest('.user-dropdown-container')) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [isDropdownOpen]);

    return (
        <header className="bg-white dark:bg-gray-800 shadow-md p-4 flex items-center justify-between sticky top-0 z-30">
            {/* Left Section - Logo with responsive padding */}
            <div className="flex items-center">
                {/* Logo/Company Name - Add left padding on mobile */}
                <div className={`transition-all duration-300 ${isMobile ? 'ml-14' : 'ml-0'}`}>
                    <Link to="/dashboard" className="flex items-center">
                        <span className="text-xl font-bold text-gray-800 dark:text-white">
                            Yang Khor Private Limited
                        </span>
                    </Link>
                </div>
            </div>

            {/* Center Section - Empty for balance */}
            <div className="flex-1 mx-4">
                {/* Optional: Add breadcrumbs or page title here */}
            </div>

            {/* Right Section - Actions */}
            <div className="flex items-center space-x-4">
                {/* Notifications & Messages */}
                <div className="flex items-center space-x-3">
                    {/* Notification Bell */}
                    <div className="relative">
                        <button
                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 relative"
                            aria-label="Notifications"
                        >
                            <FaBell size={18} />
                            {hasNotifications && (
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                            )}
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="relative">
                        <button
                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 relative"
                            aria-label="Messages"
                        >
                            <FaEnvelope size={18} />
                            {hasMessages && (
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                            )}
                        </button>
                    </div>

                    {/* Dark Mode Toggle - Desktop */}
                    <div className="hidden md:flex items-center space-x-2">
                        <span className="text-sm text-gray-600 dark:text-gray-300 hidden lg:inline">
                            {isDarkMode ? 'Dark' : 'Light'}
                        </span>
                        <div className="relative inline-block w-10 align-middle select-none">
                            <input
                                type="checkbox"
                                name="toggle"
                                id="toggle"
                                checked={isDarkMode}
                                onChange={toggleTheme}
                                className="sr-only"
                            />
                            <label
                                htmlFor="toggle"
                                className={`block h-6 w-12 rounded-full cursor-pointer transition-colors duration-200 ${
                                    isDarkMode ? 'bg-blue-600' : 'bg-gray-300'
                                }`}
                            >
                                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform duration-200 ${
                                    isDarkMode ? 'transform translate-x-6' : 'transform translate-x-1'
                                }`}></div>
                            </label>
                        </div>
                    </div>

                    {/* Mobile Dark Mode Toggle (Compact) */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
                            aria-label="Toggle dark mode"
                        >
                            {isDarkMode ? '🌙' : '☀️'}
                        </button>
                    </div>

                    {/* User Profile */}
                    <div className="relative user-dropdown-container">
                        <button
                            onClick={toggleDropdown}
                            className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            aria-label="User menu"
                        >
                            {user?.photoURL ? (
                                <img
                                    src={user.photoURL}
                                    alt="Profile"
                                    className="w-8 h-8 rounded-full"
                                />
                            ) : (
                                <FaUserCircle className="w-8 h-8 text-gray-400" />
                            )}
                            <div className="hidden lg:block text-left">
                                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate max-w-[120px]">
                                    {user?.displayName || user?.email?.split('@')[0] || 'User'}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {user?.email?.split('@')[1] ? `@${user.email.split('@')[1]}` : ''}
                                </p>
                            </div>
                        </button>

                        {/* Dropdown Menu */}
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg w-48 py-1 z-40">
                                <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        {user?.displayName || user?.email}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        {user?.email}
                                    </p>
                                </div>
                                
                                <Link
                                    to="/profile_settings"
                                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    onClick={() => setDropdownOpen(false)}
                                >
                                    Profile Settings
                                </Link>
                                
                                <Link
                                    to="/account"
                                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    onClick={() => setDropdownOpen(false)}
                                >
                                    Account
                                </Link>

                                <div className="border-t border-gray-100 dark:border-gray-700 mt-1 pt-1">
                                    <button
                                        onClick={logout}
                                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-red-400"
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default TopNav;