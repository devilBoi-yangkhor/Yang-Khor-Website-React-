import React, { useState, useEffect, useRef } from 'react';
import { FaHome, FaFileSignature, FaCog, FaChevronDown, FaUsers, FaBed, FaFile, FaCalendarCheck, FaTimes, FaBars } from 'react-icons/fa';
import { BiSolidReport } from "react-icons/bi";
import { LuFileSearch } from "react-icons/lu";
import { Link } from "react-router-dom";
import { getDocs, collection, query, where, doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { auth, firestoreDb } from '../config/firebase';

const Sidebar = () => {
    const [isStaffDropdownOpen, setIsStaffDropdownOpen] = useState(false);
    const [isWeeklyDropdownOpen, setIsWeeklyDropdownOpen] = useState(false);
    const [isDispatchDropdownOpen, setIsDispatchDropdownOpen] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isSuperUser, setIsSuperUser] = useState(false);
    const [isUser, setIsUser] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const sidebarRef = useRef(null);

    // Handle window resize for mobile detection
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        // Close sidebar when clicking outside on mobile
        const handleClickOutside = (event) => {
            if (isMobile && sidebarRef.current && !sidebarRef.current.contains(event.target) && isMobileMenuOpen) {
                setIsMobileMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            window.removeEventListener('resize', checkMobile);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMobile, isMobileMenuOpen]);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        if (isMobile) {
            setIsMobileMenuOpen(false);
        }
    };

    const toggleStaffDropdown = () => setIsStaffDropdownOpen(prevState => !prevState);
    const toggleWeeklyDropdown = () => setIsWeeklyDropdownOpen(!isWeeklyDropdownOpen);
    const toggleDispatchDropdown = () => setIsDispatchDropdownOpen(!isDispatchDropdownOpen);

    const markAsRead = async () => {
        const userEmail = auth.currentUser?.email;
        
        if (!userEmail) {
            console.error('User email is undefined, cannot mark leave as read');
            return;
        }
    
        try {
            const leaveAppsQuery = query(
                collection(firestoreDb, 'leave_applications'),
                where('applicationSubmittedBy', '==', userEmail),
                where('isRead', '==', false)
            );
    
            const snapshot = await getDocs(leaveAppsQuery);
    
            snapshot.forEach(async (docSnapshot) => {
                const docRef = doc(firestoreDb, 'leave_applications', docSnapshot.id);
                await updateDoc(docRef, { isRead: true });
            });
    
        } catch (error) {
            console.error('Error marking leave as read:', error);
        }
    };

    // Navigation link handler
    const handleNavClick = () => {
        closeMobileMenu();
        // Close all dropdowns on mobile when navigating
        if (isMobile) {
            setIsStaffDropdownOpen(false);
            setIsWeeklyDropdownOpen(false);
            setIsDispatchDropdownOpen(false);
        }
    };

    useEffect(() => {
        const checkAuthStatus = () => {
            if (auth.currentUser) {
                setIsAuthenticated(true);
            }
        };

        checkAuthStatus();

        if (!isAuthenticated) return;

        const unsubscribe = onSnapshot(
            query(
                collection(firestoreDb, 'leave_applications'),
                where('applicationSubmittedBy', '==', auth.currentUser?.email)
            ),
            (snapshot) => {
                snapshot.forEach((doc) => {
                    const data = doc.data();
                    if (data.status !== 'Pending' && !data.isRead) {
                    }
                });
            }
        );

        return () => unsubscribe();
    }, [isAuthenticated]);

    useEffect(() => {
        const fetchUserRole = async () => {
            if (auth.currentUser) {
                try {
                    const userRolesRef = collection(firestoreDb, 'user_roles');
                    const q = query(userRolesRef, where('user_id', '==', auth.currentUser.uid));
                    const querySnapshot = await getDocs(q);
    
                    if (!querySnapshot.empty) {
                        querySnapshot.forEach((doc) => {
                            const userData = doc.data();
                            if (userData.role === 'Admin') {
                                setIsAdmin(true);
                            } else if (userData.role === 'super_admin') {
                                setIsSuperUser(true);
                            } else if (userData.role === 'user') {
                                setIsUser(true);
                            }
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
    }, [isAuthenticated]);

    // Mobile menu styles
    const mobileMenuOverlay = isMobileMenuOpen ? 'fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-300' : 'hidden';
    const sidebarTransform = isMobile 
        ? (isMobileMenuOpen 
            ? 'translate-x-0' 
            : '-translate-x-full')
        : 'translate-x-0';

    const scrollbarStyles = {
        scrollbarWidth: 'thin',
        scrollbarColor: '#4A5568 #1A202C',
        WebkitScrollbar: {
            width: '8px',
        },
        WebkitScrollbarTrack: {
            background: '#1A202C',
        },
        WebkitScrollbarThumb: {
            backgroundColor: '#4A5568',
            borderRadius: '4px',
            border: '2px solid #1A202C',
        }
    };

    return (
        <>
            {/* Mobile Hamburger Button - Only shows when sidebar is closed on mobile */}
            {isMobile && !isMobileMenuOpen && (
                <button
                    onClick={toggleMobileMenu}
                    className="fixed top-4 left-4 z-50 p-3 bg-gray-300 dark:bg-gray-800 text-white rounded-lg md:hidden shadow-lg hover:bg-gray-500 transition-all duration-300"
                    aria-label="Open menu"
                >
                    <FaBars size={24} />
                </button>
            )}

            {/* Overlay for mobile */}
            <div 
                className={`${mobileMenuOverlay} md:hidden`}
                onClick={closeMobileMenu}
                aria-hidden="true"
            />

            {/* Sidebar */}
            <div
                ref={sidebarRef}
                style={scrollbarStyles}
                className={`
                    fixed md:relative
                    h-screen
                    w-64
                    bg-gray-900
                    text-white
                    flex
                    flex-col
                    shadow-lg
                    overflow-y-auto
                    z-40
                    transition-transform
                    duration-300
                    ease-in-out
                    ${sidebarTransform}
                `}
            >
                <div className="relative z-10 flex flex-col flex-grow">
                    {/* Sidebar Header */}
                    <div className="flex items-center justify-between h-16 shadow-md px-4">
                        <h1 className="text-lg font-semibold">YangKhor Private Ltd</h1>
                        {isMobile && (
                            <button
                                onClick={closeMobileMenu}
                                className="md:hidden p-2 hover:bg-gray-700 rounded-lg transition-colors"
                                aria-label="Close menu"
                            >
                                <FaTimes className="w-5 h-5" />
                            </button>
                        )}
                    </div>

                    {/* Sidebar Navigation */}
                    <nav className="flex-1 p-4 flex flex-col">
                        <ul>
                            <li className="mb-2">
                                <Link 
                                    to="/dashboard" 
                                    className="flex items-center p-3 text-gray-300 hover:bg-gray-700 rounded-lg transition-all"
                                    onClick={handleNavClick}
                                >
                                    <FaHome className="mr-3 flex-shrink-0" /> 
                                    <span className="truncate">Home</span>
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link
                                    to="/apply_leave"
                                    className="flex items-center p-3 text-gray-300 hover:bg-gray-700 rounded-lg transition-all"
                                    onClick={() => {
                                        markAsRead();
                                        handleNavClick();
                                    }}
                                >
                                    <FaBed className="mr-3 flex-shrink-0" /> 
                                    <span className="truncate">Apply For Leave</span>
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link 
                                    to="/user_projects" 
                                    className="flex items-center p-3 text-gray-300 hover:bg-gray-700 rounded-lg transition-all"
                                    onClick={handleNavClick}
                                >
                                    <FaFileSignature className="mr-3 flex-shrink-0" /> 
                                    <span className="truncate">Projects</span>
                                </Link>
                            </li>
                            {isUser && (
                                <li className="mb-2">
                                    <Link 
                                        to="/daily_report" 
                                        className="flex items-center p-3 text-gray-300 hover:bg-gray-700 rounded-lg transition-all"
                                        onClick={handleNavClick}
                                    >
                                        <FaCalendarCheck className="mr-3 flex-shrink-0" /> 
                                        <span className="truncate">Weekly Report</span>
                                    </Link>
                                </li>
                            )}
                            
                            {/* Admin Links (Conditional) */}
                            {isAdmin && (
                                <>
                                    <li className="mb-2">
                                        <div 
                                            className="flex items-center p-3 text-gray-300 hover:bg-gray-700 rounded-lg cursor-pointer transition-all" 
                                            onClick={toggleWeeklyDropdown}
                                        >
                                            <FaCalendarCheck className="mr-3 flex-shrink-0" /> 
                                            <span className="flex-1 truncate">Weekly Report</span>
                                            <span className={`ml-2 transform transition-transform ${isWeeklyDropdownOpen ? 'rotate-180' : ''}`}>
                                                <FaChevronDown />
                                            </span>
                                        </div>
                                        <div className={`transition-all duration-300 overflow-hidden ${isWeeklyDropdownOpen ? 'max-h-40' : 'max-h-0'}`}>
                                            <ul className="ml-6 mt-2">
                                                <li className="mb-2">
                                                    <Link 
                                                        to="/daily_report" 
                                                        className="flex items-center p-3 text-gray-300 hover:bg-gray-700 rounded-lg transition-all"
                                                        onClick={handleNavClick}
                                                    >
                                                        <span className="truncate">Submit Weekly Report</span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link 
                                                        to="/view_daily_report" 
                                                        className="block p-2 text-gray-300 hover:bg-gray-600 rounded-lg transition-all truncate"
                                                        onClick={handleNavClick}
                                                    >
                                                        View Weekly Reports
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li className="mb-2">
                                        <Link 
                                            to="/monthly_report" 
                                            className="flex items-center p-3 text-gray-300 hover:bg-gray-700 rounded-lg transition-all"
                                            onClick={handleNavClick}
                                        >
                                            <BiSolidReport className="mr-3 flex-shrink-0" /> 
                                            <span className="truncate">Monthly Report</span>
                                        </Link>
                                    </li>
                                    <li className="mb-2">
                                        <Link 
                                            to="/staff_attendence_hr" 
                                            className="flex items-center p-3 text-gray-300 hover:bg-gray-700 rounded-lg transition-all"
                                            onClick={handleNavClick}
                                        >
                                            <LuFileSearch className="mr-3 flex-shrink-0" /> 
                                            <span className="truncate">Leave Applications</span>
                                        </Link>
                                    </li>
                                    <li className="mb-2">
                                        <div 
                                            className="flex items-center p-3 text-gray-300 hover:bg-gray-700 rounded-lg cursor-pointer transition-all" 
                                            onClick={toggleDispatchDropdown}
                                        >
                                            <FaFile className="mr-3 flex-shrink-0" /> 
                                            <span className="flex-1 truncate">Dispatch</span>
                                            <span className={`ml-2 transform transition-transform ${isDispatchDropdownOpen ? 'rotate-180' : ''}`}>
                                                <FaChevronDown />
                                            </span>
                                        </div>
                                        <div className={`transition-all duration-300 overflow-hidden ${isDispatchDropdownOpen ? 'max-h-40' : 'max-h-0'}`}>
                                            <ul className="ml-6 mt-2">
                                                <li className="mb-2">
                                                    <Link 
                                                        to="/dispatch_form" 
                                                        className="flex items-center p-3 text-gray-300 hover:bg-gray-700 rounded-lg transition-all"
                                                        onClick={handleNavClick}
                                                    >
                                                        <span className="truncate">Dispatch File</span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link 
                                                        to="/dispatch_history" 
                                                        className="block p-2 text-gray-300 hover:bg-gray-600 rounded-lg transition-all truncate"
                                                        onClick={handleNavClick}
                                                    >
                                                        Dispatch List
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                    {/* Staff Dropdown */}
                                    <li className="mb-2">
                                        <div 
                                            className="flex items-center p-3 text-gray-300 hover:bg-gray-700 rounded-lg cursor-pointer transition-all" 
                                            onClick={toggleStaffDropdown}
                                        >
                                            <FaUsers className="mr-3 flex-shrink-0" /> 
                                            <span className="flex-1 truncate">Staffs</span>
                                            <span className={`ml-2 transform transition-transform ${isStaffDropdownOpen ? 'rotate-180' : ''}`}>
                                                <FaChevronDown />
                                            </span>
                                        </div>
                                        <div className={`transition-all duration-300 overflow-hidden ${isStaffDropdownOpen ? 'max-h-40' : 'max-h-0'}`}>
                                            <ul className="ml-6 mt-2">
                                                <li className="mb-2">
                                                    <Link 
                                                        to="/add_staff" 
                                                        className="flex items-center p-3 text-gray-300 hover:bg-gray-700 rounded-lg transition-all"
                                                        onClick={handleNavClick}
                                                    >
                                                        <span className="truncate">Add Staff</span>
                                                    </Link>
                                                </li>
                                                <li className="mb-2">
                                                    <Link 
                                                        to="/add_user" 
                                                        className="flex items-center p-3 text-gray-300 hover:bg-gray-700 rounded-lg transition-all"
                                                        onClick={handleNavClick}
                                                    >
                                                        <span className="truncate">Add User</span>
                                                    </Link>
                                                </li>
                                                <li className="mb-2">
                                                    <Link 
                                                        to="/staff_list" 
                                                        className="block p-2 text-gray-300 hover:bg-gray-600 rounded-lg transition-all truncate"
                                                        onClick={handleNavClick}
                                                    >
                                                        Staff List
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                </>
                            )}

                            {/* Superuser Links (Conditional) */}
                            {isSuperUser && (
                                <>
                                    <li className="mb-2">
                                        <Link 
                                            to="/staff_attendence"
                                            className="flex items-center p-3 text-gray-300 hover:bg-gray-700 rounded-lg transition-all"
                                            onClick={handleNavClick}
                                        >
                                            <FaCog className="mr-3 flex-shrink-0" />
                                            <span className="truncate">Leave Applications</span>
                                        </Link>
                                    </li>

                                    {/* Staff Dropdown */}
                                    <li className="mb-2">
                                        <div 
                                            className="flex items-center p-3 text-gray-300 hover:bg-gray-700 rounded-lg cursor-pointer transition-all" 
                                            onClick={toggleStaffDropdown}
                                        >
                                            <FaUsers className="mr-3 flex-shrink-0" /> 
                                            <span className="flex-1 truncate">Staffs</span>
                                            <span className={`ml-2 transform transition-transform ${isStaffDropdownOpen ? 'rotate-180' : ''}`}>
                                                <FaChevronDown />
                                            </span>
                                        </div>
                                        <div className={`transition-all duration-300 overflow-hidden ${isStaffDropdownOpen ? 'max-h-40' : 'max-h-0'}`}>
                                            <ul className="ml-6 mt-2">
                                                <li className="mb-2">
                                                    <Link 
                                                        to="/add_staff" 
                                                        className="flex items-center p-3 text-gray-300 hover:bg-gray-700 rounded-lg transition-all"
                                                        onClick={handleNavClick}
                                                    >
                                                        <span className="truncate">Add Staff</span>
                                                    </Link>
                                                </li>
                                                <li className="mb-2">
                                                    <Link 
                                                        to="/add_staff" 
                                                        className="flex items-center p-3 text-gray-300 hover:bg-gray-700 rounded-lg transition-all"
                                                        onClick={handleNavClick}
                                                    >
                                                        <span className="truncate">Add User</span>
                                                    </Link>
                                                </li>
                                                <li className="mb-2">
                                                    <Link 
                                                        to="/staff_list" 
                                                        className="block p-2 text-gray-300 hover:bg-gray-600 rounded-lg transition-all truncate"
                                                        onClick={handleNavClick}
                                                    >
                                                        Staff List
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                </>
                            )}
                        </ul>
                        
                        {/* Company Logo */}
                        <div className="mt-auto p-4 flex justify-center">
                            <img 
                                src="assets/logo.png" 
                                alt="Company Logo" 
                                className="w-32 h-32 object-contain opacity-80 hover:opacity-100 transition-opacity duration-300" 
                            />
                        </div>
                    </nav>
                </div>
            </div>
        </>
    );
};

export default Sidebar;