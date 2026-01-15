// src/hooks/useAuth.js
import { useState, useEffect } from 'react';
import { auth } from '../config/firebase';

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setIsAuthenticated(!!user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return { isAuthenticated, loading };
};
