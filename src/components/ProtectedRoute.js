// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; // Custom hook to check authentication status

const PrivateRoute = ({ element: Component, ...rest }) => {
    const { isAuthenticated, loading } = useAuth(); // Implement useAuth to check authentication

    if (loading) {
        return <div>Loading...</div>; // Or any loading indicator you prefer
    }

    return isAuthenticated ? Component : <Navigate to="/login" />;
};

export default PrivateRoute;
